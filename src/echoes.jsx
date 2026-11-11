import { useMemo, useState } from "react";
import { fc, CHARACTERS } from "./wiki-data";
import { SHOCKS, ECHOES } from "./echoes-data";
import { T } from "./theme";
import { characterTranslation } from "./i18n/characters.en";
import { shockTitle, shockGist, shockAxis, bandLabel, modeText, echoUi } from "./i18n/echoes.en";

/* ============================================================
   余波 (echoes.jsx) —— 笼罩多人的几场事件，与每个人记住它的方式
   版式如乐谱：一震源一页，横轴为年，一人一行（谱线）；
   节点是此事在其后岁月里重新浮出的时刻，自震源起连线，随年距渐淡。
   纵轴为各震源自拟的刻度（震源.axis），按 bands 分带；逝者不入分带，
   贴在震源行之下，与震源同为全图起点。
   记忆方式（echo.mode）是这一层的核心声部，行首以汇文正楷淡墨出之。
   本层登记为「作者按」，与事实层分声——页首注明，不混入人物档案。
   ============================================================ */

const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));

/* 版面常量（SVG 用户空间） */
const W = 1000, PLOT_L = 250, PLOT_R = 930, UNDATED_X = 962, PRE_X = 218, PRE_YEARS = 10; /* 早于震源十年以上的节点收进左侧「前事」栏，不拉长横轴 */
const ROW_H = 42, BAND_H = 30, TOP = 58, SHOCK_ROW_H = 56;

const posOf = (y, m) => y + (m != null ? (m - 1) / 12 : 0.5);

/* 行内短题：取节点说明的第一小句（5–14 字内遇标点即断），否则截 13 字 */
function shortNote(note) {
  const m = note.slice(0, 15).search(/[，；：。—]/);
  if (m >= 4) return note.slice(0, m);
  return note.length > 14 ? `${note.slice(0, 13)}…` : note;
}
/* 估字宽（SVG 用户单位）：汉字全宽，西文数字约半宽 */
const textW = (str, size) => [...str].reduce((w, ch) => w + (ch.charCodeAt(0) > 0xff ? size : size * 0.56), 0);
const wrapText = (str, n) => { const out = []; const cs = [...str]; for (let i = 0; i < cs.length; i += n) out.push(cs.slice(i, i + n).join("")); return out; };
const LANE_H = 17, LABEL_FS = 11;

/* 年表以外之节点的来源小标：句末注《某篇》者＝文稿，注（关系）者＝关系，余为人物卡 */
function srcLabel(n, locale) {
  const en = locale === "en";
  if (/（《[^》]+》）$/.test(n.note)) return en ? "manuscript" : "文稿";
  if (/（关系）$/.test(n.note)) return en ? "relations" : "关系";
  return en ? "profile" : "卡";
}

function nodeText(n) {
  if (n.y == null) return "";
  return `${n.y}${n.m != null ? `.${n.m}` : ""}${n.q || ""}`;
}

export default function Echoes({ shockId, who, locale, onRoute, onOpenProfile }) {
  const shock = SHOCKS.find((s) => s.id === shockId) || SHOCKS[0];
  const t = (k) => echoUi(locale, k);
  const [focusWho, setFocusWho] = useState(null); /* 键盘焦点环：SVG 的 <g> 不吃 CSS outline，自绘 */
  const [hover, setHover] = useState(null); /* { who, k, n, x, cy }：悬停的节点，出浮签并点亮他行同年同月者 */
  const rows = useMemo(() => ECHOES.filter((e) => e.shock === shock.id).sort((a, b) => a.order - b.order), [shock.id]);
  const dead = rows.filter((e) => e.band === "dead");
  const living = rows.filter((e) => e.band !== "dead");
  const selected = rows.find((e) => e.who === who) || null;

  /* 横轴：自最早的定年节点（或震源）到最晚者 */
  const { x0, x1 } = useMemo(() => {
    const sp = posOf(shock.year, shock.month);
    const ys = rows.flatMap((e) => e.arc.filter((n) => n.y != null).map((n) => posOf(n.y, n.m))).filter((p) => p >= sp - PRE_YEARS);
    return { x0: Math.floor(Math.min(sp, ...ys) - 0.2), x1: Math.ceil(Math.max(sp, ...ys) + 0.2) };
  }, [rows, shock]);
  const xOf = (p) => PLOT_L + ((p - x0) / (x1 - x0)) * (PLOT_R - PLOT_L);
  const shockP = posOf(shock.year, shock.month);
  const shockX = xOf(shockP);

  /* 一行的定年节点及其横坐标（同年同月者右移错开） */
  const ptsOf = (e) => {
    const seen = {};
    return e.arc.filter((n) => n.y != null).sort((a, b) => posOf(a.y, a.m) - posOf(b.y, b.m)).map((n) => {
      const k = `${n.y}.${n.m}`;
      const j = (seen[k] = (seen[k] || 0) + 1) - 1;
      const p = posOf(n.y, n.m);
      return { n, x: p < shockP - PRE_YEARS ? PRE_X : xOf(p) + j * 11, p };
    });
  };
  /* 选中行：节点下直接落字（年月＋短题），贪心分道避让 */
  const selLabels = (() => {
    if (!selected) return { labels: [], lanes: 0 };
    const ends = [];
    const labels = ptsOf(selected).map(({ n, x }) => {
      const date = nodeText(n), short = shortNote(n.note);
      const w = textW(date, LABEL_FS) + 6 + textW(short, LABEL_FS);
      const lx = Math.max(PLOT_L - 30, Math.min(x - 5, W - 12 - w));
      let lane = ends.findIndex((end) => end + 18 <= lx);
      if (lane < 0) { lane = ends.length; ends.push(0); }
      ends[lane] = lx + w;
      return { n, x, lx, w, lane, date, short };
    });
    return { labels, lanes: ends.length };
  })();
  const rowH = (e) => ROW_H + (selected && selected.who === e.who && selLabels.lanes ? selLabels.lanes * LANE_H + 12 : 0);

  /* 纵向排布：震源行 → 逝者行 → 各带（带题 + 本带诸行） */
  const layout = [];
  let y = TOP;
  layout.push({ kind: "shock", y });
  y += SHOCK_ROW_H;
  dead.forEach((e) => { layout.push({ kind: "row", e, y, h: rowH(e), dead: true }); y += rowH(e); });
  shock.bands.filter(([k]) => k !== "dead").forEach(([k, label]) => {
    const inBand = living.filter((e) => e.band === k);
    if (!inBand.length) return;
    layout.push({ kind: "band", label: bandLabel(locale, shock.id, k, label), y });
    y += BAND_H;
    inBand.forEach((e) => { layout.push({ kind: "row", e, y, h: rowH(e), dead: false }); y += rowH(e); });
  });
  const H = y + 24;
  const ticks = [];
  for (let yr = x0; yr <= x1; yr++) ticks.push(yr);

  return (
    <div lang={locale === "en" ? "en" : "zh"}>
      <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontFamily: "HuiwenZhengKai", fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", margin: 0 }}>{t("余波")}</h2>
        <span title={t("層註")} style={{ fontFamily: "HuiwenZhengKai", fontSize: 11, color: T.seal, border: `1px solid ${T.seal}88`, padding: "0 7px", borderRadius: 3, letterSpacing: "0.15em" }}>{t("作者按")}</span>
      </div>
      <p style={{ fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.muted, lineHeight: 1.9, maxWidth: 700, margin: "0 0 20px" }}>
        {locale === "en" ? t("導語") : "几场笼罩多人的事件。每个人按与它的距离安放，各以自己的方式记住它——点一个名字，看此事在其后岁月里怎样重新浮出。本层为作者按，与事实层分声。"}
      </p>

      {/* 震源选择 */}
      <div role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
        {SHOCKS.map((s) => {
          const on = s.id === shock.id;
          return (
            <button key={s.id} role="tab" aria-selected={on} onClick={() => onRoute({ shock: s.id, who: null })}
              style={{ textAlign: "left", background: on ? T.panelHi : "none", border: `1px solid ${on ? T.accent + "99" : T.line}`, borderRadius: 3, padding: "8px 14px", cursor: "pointer", color: on ? T.ink : T.muted }}>
              <div style={{ fontFamily: "HuiwenZhengKai", fontSize: 11, color: on ? T.accent : T.faint, letterSpacing: "0.1em" }}>{s.year}.{s.month}</div>
              <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 15, marginTop: 1 }}>{shockTitle(locale, s)}</div>
            </button>
          );
        })}
      </div>

      <div style={{ fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.muted, marginBottom: 6 }}>
        {shockGist(locale, shock)} <span style={{ color: T.faint }}>· {t("在場姿態")}：{shockAxis(locale, shock)}</span>
      </div>

      <div style={{ overflowX: "auto", background: T.panel, border: `1px solid ${T.line}`, borderRadius: 3 }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 760, width: "100%", height: "auto" }} role="img" onMouseLeave={() => setHover(null)}
          aria-label={`${shockTitle(locale, shock)} — ${shockAxis(locale, shock)}`}>
          {/* 年刻度 */}
          {ticks.map((yr) => {
            const major = yr % 5 === 0;
            return (
              <g key={yr}>
                <line x1={xOf(yr)} x2={xOf(yr)} y1={TOP - 14} y2={H - 14} stroke={T.line} strokeOpacity={major ? 0.7 : 0.25} strokeWidth="1" />
                {(major || yr === x0) && (
                  <text x={xOf(yr)} y={TOP - 22} textAnchor="middle" fontFamily="HuiwenZhengKai" fontSize="11" fill={T.faint}>{yr}</text>
                )}
              </g>
            );
          })}
          <text x={UNDATED_X} y={TOP - 22} textAnchor="middle" fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint}>{t("無定年")}</text>
          {rows.some((e) => e.arc.some((n) => n.y != null && posOf(n.y, n.m) < shockP - PRE_YEARS)) && (
            <text x={PRE_X} y={TOP - 22} textAnchor="middle" fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint}>{t("前事")}</text>
          )}

          {/* 震源竖线 */}
          <line x1={shockX} x2={shockX} y1={TOP - 14} y2={H - 14} stroke={T.accent} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 4" />

          {layout.map((it, i) => {
            if (it.kind === "shock") {
              return (
                <g key="shock">
                  <circle cx={shockX} cy={it.y + 18} r="8" fill="none" stroke={T.accent} strokeWidth="1.6" />
                  <circle cx={shockX} cy={it.y + 18} r="3.2" fill={T.accent} />
                  <text x="20" y={it.y + 14} fontFamily="JingHuaLaoSong" fontSize="16" fill={T.ink}>{shockTitle(locale, shock)}</text>
                  <text x="20" y={it.y + 33} fontFamily="HuiwenZhengKai" fontSize="11.5" fill={T.faint}>{shock.year}.{shock.month} · {t("震源")}</text>
                </g>
              );
            }
            if (it.kind === "band") {
              return (
                <g key={`b${i}`}>
                  <text x="20" y={it.y + 19} fontFamily="HuiwenZhengKai" fontSize="11.5" letterSpacing="1.5" fill={T.faint}>{it.label}</text>
                  <line x1="20" x2={PLOT_R + 10} y1={it.y + 25} y2={it.y + 25} stroke={T.line} strokeOpacity="0.5" strokeWidth="1" />
                </g>
              );
            }
            const { e } = it;
            const c = byId[e.who];
            const col = fc(c.belong[0]);
            const on = selected && selected.who === e.who;
            const dim = selected && !on;
            const cy = it.y + ROW_H / 2;
            const tr = characterTranslation(locale, c.id);
            const undated = e.arc.filter((n) => n.y == null);
            const pts = ptsOf(e);
            const lit = (n) => hover && hover.shock === shock.id && n.m != null && hover.n.y === n.y && hover.n.m === n.m; /* 与悬停节点同年同月 */
            const fade = (p) => Math.max(0.16, 0.7 - (p - shockP) * 0.022);
            let prev = { x: shockX, p: shockP };
            return (
              <g key={e.who} style={{ cursor: "pointer", outline: "none" }}
                role="button" tabIndex={0} aria-pressed={!!on} aria-label={`${tr?.name || c.name}：${modeText(locale, e.mode)}${e.draft ? `（${t("待核")}）` : ""}`}
                onClick={() => onRoute({ shock: shock.id, who: on ? null : e.who })}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onRoute({ shock: shock.id, who: on ? null : e.who }); } }}
                onFocus={(ev) => { if (ev.target.matches(":focus-visible")) setFocusWho(e.who); }}
                onBlur={() => setFocusWho((w) => (w === e.who ? null : w))}>
                {focusWho === e.who && <rect x="6" y={it.y + 1} width={W - 12} height={it.h - 2} fill="none" stroke={T.accent} strokeWidth="1.5" rx="3" />}
                {on && <rect x="8" y={it.y + 2} width={W - 16} height={it.h - 4} fill={T.panelHi} rx="3" />}
                {/* 谱线与节点：未选中行整体退后一档，行首姓名与记忆方式仍清晰可读 */}
                <g opacity={dim ? 0.6 : 1}>
                {/* 谱线：自震源起，分段渐淡 */}
                {pts.map(({ x, p }, k) => {
                  const seg = (
                    <line key={k} x1={prev.x} x2={x} y1={cy} y2={cy} stroke={col} strokeOpacity={fade(p)} strokeWidth="1.2"
                      strokeDasharray={it.dead ? "2 4" : undefined} />
                  );
                  prev = { x, p };
                  return seg;
                })}
                {/* 节点：实心＝年表条目，空心＝人物卡轶事；悬停时他行同年同月者一并点亮 */}
                {pts.map(({ n, x, p }, k) => {
                  const hot = lit(n);
                  const op = hot ? 1 : Math.max(0.78, fade(p) + 0.3);
                  return (
                    <g key={k}>
                      {hot && <circle cx={x} cy={cy} r="9.5" fill="none" stroke={T.ink} strokeOpacity="0.55" strokeWidth="1" />}
                      <circle cx={x} cy={cy} r={hot ? 6.5 : on ? 5.5 : 5} fill={n.card ? T.panel : col} fillOpacity={n.card ? 1 : op}
                        stroke={col} strokeOpacity={op} strokeWidth={n.card ? 1.6 : 1.2} />
                    </g>
                  );
                })}
                {undated.length > 0 && (
                  <g>
                    <circle cx={UNDATED_X} cy={cy} r="4" fill="none" stroke={col} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 2" />
                    {undated.length > 1 && <text x={UNDATED_X + 8} y={cy + 4} fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint}>{undated.length}</text>}
                  </g>
                )}
                </g>
                {/* 行首：姓名 + 记忆方式 */}
                <text x={it.dead ? 34 : 20} y={cy - 2} fontFamily="JingHuaLaoSong" fontSize="15" fill={on ? T.ink : T.muted}>{tr?.name || c.name}</text>
                {/* 起草待核：行首姓名后一枚小标，与「作者定」之行区分 */}
                {e.draft && (
                  <text x={(it.dead ? 34 : 20) + textW(tr?.name || c.name, 15) + 8} y={cy - 3} fontFamily="HuiwenZhengKai" fontSize="10" fill={T.seal} fillOpacity="0.85">{t("待核")}</text>
                )}
                <text x={it.dead ? 34 : 20} y={cy + 14} fontFamily="HuiwenZhengKai" fontSize="12.5" fill={on ? T.ink : T.muted} fillOpacity={on ? 0.95 : 0.8}>{modeText(locale, e.mode)}</text>
                {/* 选中行：字直接落在点下 */}
                {on && selLabels.labels.map((L, k) => {
                  const ly = it.y + ROW_H + 6 + L.lane * LANE_H + 9;
                  const ax = Math.max(L.lx + 3, Math.min(L.x, L.lx + L.w - 3));
                  return (
                    <g key={`l${k}`}>
                      <polyline points={`${L.x},${cy + 7} ${L.x},${ly - 14} ${ax},${ly - 10}`} fill="none" stroke={col} strokeOpacity="0.45" strokeWidth="0.8" />
                      <text x={L.lx} y={ly} fontFamily="HuiwenZhengKai" fontSize={LABEL_FS}>
                        <tspan fill={T.accent}>{L.date}</tspan>
                        <tspan dx="6" fill={T.ink} fillOpacity="0.9">{L.short}</tspan>
                      </text>
                    </g>
                  );
                })}
                <rect x="0" y={it.y} width={W} height={it.h} fill="transparent" />
                {/* 节点感应区（在整行感应层之上） */}
                {pts.map(({ n, x }, k) => (
                  <circle key={`h${k}`} cx={x} cy={cy} r="9" fill="transparent"
                    onMouseEnter={() => setHover({ shock: shock.id, who: e.who, k, n, x, cy })}
                    onMouseLeave={() => setHover((h) => (h && h.who === e.who && h.k === k ? null : h))} />
                ))}
              </g>
            );
          })}
          {/* 悬停：同年同月的竖向引线 + 浮签 */}
          {hover && hover.shock === shock.id && (() => {
            const lines = wrapText(hover.n.note, 24);
            const date = nodeText(hover.n) + (hover.n.card ? `　${t("年表以外")}·${srcLabel(hover.n, locale)}` : "");
            const bw = Math.max(textW(date, 11.5), ...lines.map((l) => textW(l, 12))) + 22;
            const bh = 26 + lines.length * 17;
            const bx = Math.max(8, Math.min(hover.x - 14, W - 8 - bw));
            const by = hover.cy - 14 - bh < 4 ? hover.cy + 14 : hover.cy - 14 - bh;
            return (
              <g pointerEvents="none">
                {hover.n.m != null && posOf(hover.n.y, hover.n.m) >= shockP - PRE_YEARS && <line x1={xOf(posOf(hover.n.y, hover.n.m))} x2={xOf(posOf(hover.n.y, hover.n.m))} y1={TOP - 14} y2={H - 14} stroke={T.ink} strokeOpacity="0.22" strokeWidth="1" />}
                <rect x={bx} y={by} width={bw} height={bh} rx="3" fill={T.bg || T.panel} stroke={T.line} />
                <text x={bx + 11} y={by + 17} fontFamily="HuiwenZhengKai" fontSize="11.5" fill={T.accent}>{date}</text>
                {lines.map((l, i) => (
                  <text key={i} x={bx + 11} y={by + 35 + i * 17} fontFamily="HuiwenZhengKai" fontSize="12" fill={T.ink}>{l}</text>
                ))}
              </g>
            );
          })()}
          <text x={W - 12} y={H - 4} textAnchor="end" fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint} fillOpacity="0.7">{shockAxis(locale, shock)}　↓</text>
        </svg>
      </div>

      {/* 图例 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 8, fontFamily: "HuiwenZhengKai", fontSize: 11.5, color: T.faint }}>
        <span>● {locale === "en" ? "from the chronology" : "年表条目"}</span>
        <span>○ {locale === "en" ? "outside the chronology (profiles, relations, manuscript)" : "年表以外（人物卡、关系、文稿）"}</span>
        <span>◌ {t("無定年")}</span>
        {rows.some((e) => e.draft) && <span style={{ color: T.seal }}>{t("待核")}{locale === "en" ? ": not yet reviewed by the author" : "：作者尚未逐行核定"}</span>}
        <span>{locale === "en" ? "Hover a point to see what it is, and who else it reached that month." : "悬停一点：看它是什么事，以及同月还落在谁身上"}</span>
      </div>

      {/* 选中一行：展开其回响 */}
      {selected && (() => {
        const c = byId[selected.who];
        const col = fc(c.belong[0]);
        const tr = characterTranslation(locale, c.id);
        const band = shock.bands.find(([k]) => k === selected.band);
        return (
          <section aria-live="polite" style={{ marginTop: 18, padding: "18px 22px", background: T.panel, border: `1px solid ${T.line}`, borderLeft: `3px solid ${col}`, borderRadius: 3 }}>
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "JingHuaLaoSong", fontSize: 19, color: T.ink }}>{tr?.name || c.name}</span>
              {selected.draft && (
                <span title={locale === "en" ? t("待核註") : "起草待核：作者尚未逐行核定"} style={{ fontFamily: "HuiwenZhengKai", fontSize: 11, color: T.seal, border: `1px dashed ${T.seal}88`, padding: "0 7px", borderRadius: 3, letterSpacing: "0.15em" }}>{t("待核")}</span>
              )}
              <span style={{ fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.muted }}>
                {bandLabel(locale, shock.id, selected.band, band ? band[1] : selected.stance)}
                {/* 在场姿态是这个人自己的位置，分带只是刻度：二者不同则并列；姿态原文为中文，英文版也保留 */}
                {(selected.stance !== (band && band[1]) || (selected.stanceNote && selected.stanceNote !== (band && band[1]))) && (
                  <span lang="zh">
                    {selected.stance !== (band && band[1]) ? `　${selected.stance}` : ""}
                    {selected.stanceNote && selected.stanceNote !== (band && band[1]) ? `；${selected.stanceNote}` : ""}
                  </span>
                )}
              </span>
              <button onClick={() => onOpenProfile(c.id)} style={{ marginLeft: "auto", fontFamily: "HuiwenZhengKai", fontSize: 12, color: T.muted, background: "none", border: `1px solid ${T.line}`, borderRadius: 3, padding: "2px 10px", cursor: "pointer" }}>
                {t("查看檔案")}
              </button>
            </div>
            <div style={{ fontFamily: "HuiwenZhengKai", fontSize: 24, color: T.ink, letterSpacing: "0.06em", margin: "14px 0 4px" }}>{selected.mode}</div>
            {locale === "en" && <div style={{ fontStyle: "italic", fontSize: 15, color: T.muted, marginBottom: 4 }}>{modeText(locale, selected.mode)}</div>}
            <div style={{ fontFamily: "HuiwenZhengKai", fontSize: 11, color: T.faint, letterSpacing: "0.15em", margin: "16px 0 6px" }}>{t("回響節點")}</div>
            {selected.arc.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginTop: 7 }}>
                <div style={{ minWidth: 72, fontFamily: "HuiwenZhengKai", fontSize: 13, color: n.y != null ? T.accent : T.faint }}>{n.y != null ? nodeText(n) : "—"}</div>
                <div lang="zh" style={{ fontFamily: "HuiwenZhengKai", fontSize: 14, color: T.ink, lineHeight: 1.8 }}>
                  {n.note}
                  {n.card && <span title={t("年表以外")} style={{ marginLeft: 8, fontSize: 10.5, color: T.faint, border: `1px solid ${T.line}`, padding: "0 5px", borderRadius: 3 }}>{srcLabel(n, locale)}</span>}
                </div>
              </div>
            ))}
          </section>
        );
      })()}
    </div>
  );
}
