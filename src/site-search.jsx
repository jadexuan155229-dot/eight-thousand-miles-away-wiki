/* ============================================================
   全站檢索 · 檢索框 (site-search.jsx)
   頁頭「檢索」鈕、/ 鍵、Ctrl／Cmd K 打開；比對與排序見 search.js。
   結構：對話框（aria-modal）內一枚 combobox 輸入框，下接分組 listbox——
     焦點始終留在輸入框，上下鍵以 aria-activedescendant 移動選中項，Enter 前往，Esc 關閉；
     滑鼠移過即選中、點擊前往（mousedown 不奪焦點）。Tab 只在輸入框與關閉鈕之間轉。
   中文輸入法組詞期間只更新顯示、不觸發檢索，組詞時之 Enter 不當作前往。
   每類先出數條，餘者以「展開其餘 n 條」一項收起（亦為選項，Enter 即展開）。
   去處（onGo 之參數）由 Wiki 據之導航：人物開檔案彈窗，事件、地點、文庫章節各至其頁並定位。
   文庫正文懶加載：首次打開時方拉 texts.js，未到之前文庫只查題名。
   ============================================================ */
import { useState, useEffect, useMemo, useRef } from "react";
import { T } from "./theme";
import { useLocale, useT } from "./i18n/locale";
import { charName, facName, eventTitle, placeName, novelTitle } from "./i18n/content";
import { shockTitle, shockGist, modeText } from "./i18n/echoes-tx";
import { groupTx } from "./i18n/posts-content";
import { eraOfYM, englishEraOf, CN_MONTH } from "./era";
import { loadTexts } from "./novel";
import { CHARACTERS } from "./wiki-data";
import { siteSearch, GROUPS } from "./search";
import { hitRanges } from "./match";

const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
/* 各類先出幾條；其餘收在「展開其餘 n 條」 */
const CAP = { char: 5, event: 6, place: 4, echo: 4, post: 3, text: 4 };
const LABEL = { char: "人物", event: "事件", place: "地點", echo: "餘波", post: "編制", text: "文庫" };
const ORD = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const ZH_FONT = "HuiwenZhengKai";
const EN_FONT = '"Literata EN", "Songti SC", serif';
/* 單個拉丁字母幾乎處處命中，等多打一兩個再查；漢字一字即查 */
const tooShort = (q) => /^[a-z]$/i.test(q.trim());
const isMac = typeof navigator !== "undefined" && /Mac|iP(hone|ad|od)/.test(navigator.platform || navigator.userAgent || "");

/* 高亮：原串上諸命中處包 <mark> */
function Hl({ text, keys }) {
  const rs = hitRanges(text, keys);
  if (rs.length === 0) return text;
  const out = [];
  let at = 0;
  rs.forEach(([s, e], i) => {
    if (s > at) out.push(text.slice(at, s));
    out.push(<mark key={i} className="ss-mark" style={{ background: T.hit, color: T.ink }}>{text.slice(s, e)}</mark>);
    at = e;
  });
  if (at < text.length) out.push(text.slice(at));
  return out;
}

const hasHan = (s) => /[\u3400-\u9fff]/.test(s || "");

/* 一條結果之顯示：標題、右側小注、次行（摘錄或背景）；去處 */
function view(it, locale, t) {
  const en = locale === "en";
  const d = it.doc;
  const fac = (fs) => fs.map((f) => facName(locale, f)).join(" · ");
  switch (it.kind) {
    case "char": {
      const title = charName(locale, d.c);
      /* 英文界面顯英文名者，次行補中文原名（查中文名時高亮落在此行） */
      return { title, meta: fac(d.c.belong), line: title !== d.c.name ? d.c.name : null, go: { kind: "char", id: d.c.id } };
    }
    case "event": {
      const e = d.e;
      const when = en
        ? `${englishEraOf(e.year)}${e.month != null ? `, ${ORD[e.month]} month` : ""}`
        : `${eraOfYM(e.year, e.month)}${e.month != null ? ` ${CN_MONTH[e.month]}` : ""}`;
      const locs = e.loc.map((l) => placeName(locale, l)).join(en ? ", " : "、");
      return { title: eventTitle(locale, e), meta: String(e.year), line: locs ? `${when} · ${locs}` : when, go: { kind: "event", ev: e } };
    }
    case "place": return { title: placeName(locale, d.name), meta: t("{n} 事", { n: d.count }), go: { kind: "place", name: d.name } };
    case "shock": return { title: shockTitle(locale, d.s), meta: String(d.s.year), line: shockGist(locale, d.s), go: { kind: "echo", shock: d.s.id, who: null } };
    case "echo": {
      const c = byId[d.r.who];
      return { title: `${c ? charName(locale, c) : d.r.who} · ${shockTitle(locale, d.s)}`, line: modeText(locale, d.r.mode), go: { kind: "echo", shock: d.r.shock, who: d.r.who } };
    }
    case "post": return { title: groupTx(locale, d.group)[0], meta: facName(locale, d.fac), line: d.labels.join(en ? ", " : "、"), go: { kind: "posts", fac: d.fac } };
    case "text": {
      const f = d.f, nt = (zh) => novelTitle(locale, zh);
      const title = en ? `${nt(f.novel.tag)} · ${f.group ? `${nt(f.group.title)} · ` : ""}${nt(f.ch.title)}` : `【${f.novel.tag}】${f.group ? `${f.group.title} · ` : ""}${f.ch.title}`;
      return { title, meta: it.n > 0 ? (en ? `${it.n} ${it.n === 1 ? "match" : "matches"}` : `${it.n} 處`) : "", go: { kind: "novel", path: f.path } };
    }
    default: return { title: "", go: null };
  }
}

export default function SiteSearch({ open, onClose, onGo }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const [value, setValue] = useState(""); /* 輸入框顯示值 */
  const [q, setQ] = useState(""); /* 檢索所用（組詞完成後方更新） */
  const [composing, setComposing] = useState(false);
  const [texts, setTexts] = useState(null);
  const [textsFailed, setTextsFailed] = useState(false);
  const [active, setActive] = useState(0);
  const [more, setMore] = useState(() => new Set()); /* 已展開之類 */
  const inputRef = useRef(null), closeRef = useRef(null), dialogRef = useRef(null);
  const openerRef = useRef(null);

  /* 打開：記下觸發之物（關閉時交還）、聚焦輸入框並全選上回所查；首次打開時拉文庫正文 */
  useEffect(() => {
    if (!open) return;
    const a = document.activeElement;
    openerRef.current = a instanceof HTMLElement && a !== document.body ? a : null;
    inputRef.current?.focus();
    inputRef.current?.select();
    if (!texts && !textsFailed) loadTexts().then(setTexts, () => setTextsFailed(true));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- 只在開時跑一次

  const res = useMemo(() => (open && !tooShort(q) ? siteSearch(locale, q, texts) : null), [open, q, texts, locale]);
  useEffect(() => { setActive(0); setMore(new Set()); }, [q]);

  /* 攤平為選項序列：結果條與「展開其餘」條 */
  const opts = useMemo(() => {
    const out = [];
    if (!res) return out;
    for (const g of GROUPS) {
      const items = res.groups[g];
      if (items.length === 0) continue;
      const shown = more.has(g) ? items : items.slice(0, CAP[g]);
      shown.forEach((it) => out.push({ type: "item", g, it }));
      if (shown.length < items.length) out.push({ type: "more", g, n: items.length - shown.length });
    }
    return out;
  }, [res, more]);
  const cur = Math.min(active, Math.max(0, opts.length - 1));
  const optId = (i) => `ss-opt-${i}`;
  useEffect(() => {
    if (!open) return;
    document.getElementById(optId(cur))?.scrollIntoView({ block: "nearest" });
  }, [cur, open, opts]);

  if (!open) return null;

  const restore = () => { const o = openerRef.current; if (o?.isConnected) o.focus({ preventScroll: true }); };
  const close = () => { restore(); onClose(); };
  const activate = (i) => {
    const o = opts[i];
    if (!o) return;
    if (o.type === "more") { setMore((m) => new Set(m).add(o.g)); return; }
    const v = view(o.it, locale, t);
    if (!v.go) return;
    /* 先交還焦點、再導航：檔案彈窗據此記其觸發之物，關彈窗後焦點回到原處 */
    restore();
    onGo(o.it.kind === "text" ? { ...v.go, q: q.trim() } : v.go);
  };
  const onKeyDown = (e) => {
    const n = opts.length;
    if (e.key === "ArrowDown") { e.preventDefault(); if (n) setActive((cur + 1) % n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (n) setActive((cur - 1 + n) % n); }
    else if (e.key === "Enter") {
      if (composing || e.nativeEvent.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      activate(cur);
    } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
  };
  /* Tab 不出框：輸入框 ↔ 關閉鈕 */
  const trapTab = (e) => {
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== "Tab") return;
    e.preventDefault();
    (document.activeElement === inputRef.current ? closeRef.current : inputRef.current)?.focus();
  };

  const hasQ = q.trim() !== "";
  const status = !hasQ ? "" : tooShort(q) ? t("再多打一兩個字母") : res && res.total > 0 ? t("{n} 條結果", { n: res.total }) : t("未檢得");
  const fontOf = (s) => (en && !hasHan(s) ? EN_FONT : ZH_FONT);

  return (
    <div className="ss-backdrop" style={{ background: T.xBackdrop }} onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t("全站檢索")} lang={en ? "en" : "zh"} onKeyDown={trapTab}
        className="ss-panel" style={{ background: T.panel, border: `1px solid ${T.line}`, boxShadow: T.xShadow, "--ss-focus": T.accent }}>
        <div className="ss-head" style={{ borderBottom: `1px solid ${T.line}` }}>
          <span aria-hidden="true" className="ss-tag" style={{ background: T.accent, color: T.onAccent, fontFamily: ZH_FONT }}>查</span>
          <input ref={inputRef} type="text" className="ss-input" value={value}
            role="combobox" aria-expanded={opts.length > 0} aria-controls="ss-list" aria-autocomplete="list"
            aria-activedescendant={opts.length > 0 ? optId(cur) : undefined} aria-label={t("全站檢索")}
            placeholder={t("檢索人物、事件、地點、文庫……")} autoComplete="off" spellCheck={false} enterKeyHint="go"
            onChange={(e) => { setValue(e.target.value); if (!composing) setQ(e.target.value); }}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={(e) => { setComposing(false); setValue(e.currentTarget.value); setQ(e.currentTarget.value); }}
            onKeyDown={onKeyDown}
            style={{ color: T.ink, fontFamily: en ? EN_FONT : ZH_FONT }} />
          <button ref={closeRef} type="button" className="ss-close" onClick={close} aria-label={t("關閉")}
            style={{ color: T.muted, border: `1px solid ${T.line}`, fontFamily: en ? EN_FONT : ZH_FONT }}>Esc</button>
        </div>
        <div className="ss-status" role="status" aria-live="polite" style={{ color: T.muted, fontFamily: en ? EN_FONT : ZH_FONT }}>
          {status}
          {hasQ && !texts && !textsFailed && !tooShort(q) && <span>{status ? (en ? " · " : "　") : ""}{t("文庫正文載入中……")}</span>}
        </div>
        <div className="ss-body">
          {!hasQ && (
            <div className="ss-hint" style={{ color: T.muted, fontFamily: en ? EN_FONT : ZH_FONT }}>
              <p>{t("可檢人物、事件、地點、餘波、編制與文庫正文；繁簡皆可。")}</p>
              <p className="ss-keys" style={{ color: T.muted }}>{t("隨處按 / 或 {mod} K 打開", { mod: isMac ? "Cmd" : "Ctrl" })}</p>
            </div>
          )}
          <div role="listbox" id="ss-list" aria-label={t("檢索結果")} className="ss-list">
            {res && GROUPS.map((g) => {
              const items = res.groups[g];
              if (items.length === 0) return null;
              return (
                <div key={g} role="group" aria-labelledby={`ss-g-${g}`} className="ss-group">
                  <div id={`ss-g-${g}`} role="presentation" className="ss-ghead" style={{ color: T.muted, fontFamily: en ? EN_FONT : "JingHuaLaoSong", letterSpacing: en ? "0.06em" : undefined }}>
                    {t(LABEL[g])}<span className="ss-gcount">{items.length}</span>
                  </div>
                  {opts.map((o, i) => {
                    if (o.g !== g) return null;
                    const on = i === cur;
                    const common = {
                      id: optId(i), role: "option", "aria-selected": on,
                      onMouseDown: (e) => e.preventDefault(), onMouseMove: () => { if (!on) setActive(i); }, onClick: () => activate(i),
                      style: { background: on ? T.panelHi : "transparent", boxShadow: on ? `inset 2px 0 0 ${T.accent}` : "none" },
                    };
                    if (o.type === "more") {
                      return <div key="more" {...common} className="ss-opt ss-more"><span style={{ color: T.muted, fontFamily: en ? EN_FONT : ZH_FONT }}>{t("展開其餘 {n} 條", { n: o.n })}</span></div>;
                    }
                    const v = view(o.it, locale, t);
                    const s = o.it.snip;
                    return (
                      <div key={o.it.key} {...common} className="ss-opt">
                        <div className="ss-row1">
                          <span className="ss-title" lang={hasHan(v.title) && en ? "zh" : undefined} style={{ color: T.ink, fontFamily: fontOf(v.title) }}><Hl text={v.title} keys={o.it.keys} /></span>
                          {v.meta && <span className="ss-meta" style={{ color: T.muted, fontFamily: fontOf(v.meta) }}>{v.meta}</span>}
                        </div>
                        {s ? (
                          <div className="ss-row2" style={{ color: T.muted, fontFamily: fontOf(s.pre + s.hit + s.post) }} lang={en && hasHan(s.pre + s.hit + s.post) ? "zh" : undefined}>
                            {s.lab && <span className="ss-lab" style={{ color: T.muted, fontFamily: en ? EN_FONT : ZH_FONT }} lang={en ? "en" : undefined}>{t(s.lab)}{en ? ": " : "："}</span>}
                            {s.pre}<mark className="ss-mark" style={{ background: T.hit, color: T.ink }}>{s.hit}</mark>{s.post}
                          </div>
                        ) : v.line ? (
                          <div className="ss-row2" lang={en && hasHan(v.line) ? "zh" : undefined} style={{ color: T.muted, fontFamily: fontOf(v.line) }}><Hl text={v.line} keys={o.it.keys} /></div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {opts.length > 0 && (
          <div className="ss-foot" aria-hidden="true" style={{ color: T.muted, borderTop: `1px solid ${T.line}`, fontFamily: en ? EN_FONT : ZH_FONT }}>
            {t("上下鍵選擇　Enter 前往　Esc 關閉")}
          </div>
        )}
      </div>
    </div>
  );
}
