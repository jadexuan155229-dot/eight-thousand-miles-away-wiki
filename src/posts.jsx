import { useEffect, useMemo, useRef, useState } from "react";
import { CHARACTERS } from "./wiki-data";
import { FACTIONS, POSTS, TENURES, tenureFac, tenureSpan, tenureTitle } from "./posts-data";
import { T, tone } from "./theme";
import { useLocale, useT } from "./i18n/locale";
import { charName, facName } from "./i18n/content";
import { postLabelTx, postHintTx, groupTx, markTx, tenureTitleTx } from "./i18n/posts-content";

/* ============================================================
   編制 (posts.jsx) —— 门派职位 × 年份的任期图（苍云、天策、唐军，顶上切换）
   一行一个职位格（单位 × 职位），按单位分组；一段任期一条色带。
   跨两个以上职位格的人各给一色，一眼看出谁从哪里走到哪里；
   只任一职的人用中性灰。实带＝正授、署理、暂任；虚线＝代领、兼领、
   停职、无名目、充任；细线＝出征差遣，不占编制。
   同一格内任期重叠（如武库）自动分道。悬停或聚焦出浮签并点亮此人
   各段任期；点选打开档案。
   数据见 posts-data.js（Notion「人山人海 · 任職」先改，此处随之）。
   ============================================================ */

const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));

const W = 1000, PLOT_L = 168, PLOT_R = 984, TOP = 44, ROW_H = 26, LANE_H = 20, GROUP_H = 26;
const pos = (y, m) => y + (m != null ? (m - 1) / 12 : 0);
const textW = (str, size) => [...str].reduce((w, ch) => w + (ch.charCodeAt(0) > 0xff ? size : size * 0.56), 0);

/* 跨职位格者着色；色取暗底上可辨、彼此不近的六种，余者中性。
   跨格者多于色数时（天策补入外门、营伍诸人后），只给跨三格以上者着色，免得同色两人互相冒认 */
const MOVER_COLORS = ["#D29A4A", "#C8673E", "#5FA88A", "#8E84D6", "#7FA3C8", "#C98BA8"];
const NEUTRAL = "#6E7885";
const SOLID = new Set(["正授", "署理", "暂任"]);

/* 门派说明。年轴范围与参照线在 posts-data.js 的 FACTIONS（苍云：一场败、一场乱、一个人） */
const INTRO = {
  苍云: ["苍云编制，依文稿〈重看人物、军队体系〉：伍、火、队、旅、团、营，破阵营辖三团。一行一个职位，一条一段任期。",
    "Cangyun Army posts by year, following the author’s own establishment (squad, troop, company, regiment, battalion). One row per post; one band per tenure. Content remains in Chinese."],
  天策: ["天策编制：府中诸将、府僚（天策上将府旧制）、营伍（参照折冲府）。一行一个职位，一条一段任期。录有府中十人，另有万花、凌雪阁来府任职者四人列于末组；剑三原有的府中诸将不上图。",
    "Tiance Command posts: the household’s senior officers, its staff (after the old Tiance Grand General’s household), and its field units (after the regimental garrisons). Ten of the household’s own people, plus four from Wanhua Valley and Lingxue Pavilion who served there, in the last group; the game’s own senior officers are left off. Content remains in Chinese."],
  唐军: ["唐军编制：唐军不是一个营，按方镇分组——北庭、安西行营、剑南、河东与东都、朔方军、京西与北道、山南西道。职名文中多未写，推定的起止标「（约）」，推定的职名写在浮签备注里。边将所带的卫府武官之衔（果毅都尉、将军之类）写进职衔，不另立格。",
    "Tang army posts, grouped by command rather than by unit: Beiting, the Anxi field army, Jiannan, Hedong and the Eastern Capital, the Shuofang army, the western capital frontier, and Shannan West. Most titles are inferred; inferred dates are marked, and inferred titles are noted in the tooltip. Honorary guard titles (such as regimental vice-commandant) are folded into the rank text rather than given a row. Content remains in Chinese."],
};

export default function Posts({ onOpenChar, fac = "苍云", onFac }) {
  const locale = useLocale();
  const en = locale === "en";
  const t_ = useT();
  /* 任期起止：英文界面下「（约）」作 approx.、長橫作連接號（同檔案卡任職履歷） */
  const spanOf = (t) => (en ? tenureSpan(t).replace(/（约）/g, " (approx.)").replace("—", "–") : tenureSpan(t));
  /* 悬停与键盘焦点分开记：{ i, x, y }（i 为 TENURES 下标；x、y 相对外框）。浮签先看鼠标，鼠标移走就退回焦点那一段，
     免得鼠标扫过就把键盘打开的浮签关掉；Esc 两个都收 */
  const [hov, setHov] = useState(null);
  const [foc, setFoc] = useState(null);
  const hover = hov || foc;
  const clearTip = () => { setHov(null); setFoc(null); };
  /* 浮签在时，Esc 一律收起——挂在 document 上，因为鼠标悬停打开浮签时键盘焦点可能根本不在任期段上 */
  const tipOn = !!(hov || foc);
  useEffect(() => {
    if (!tipOn) return undefined;
    const onKey = (e) => { if (e.key === "Escape") { setHov(null); setFoc(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [tipOn]);
  const wrapRef = useRef(null);
  const F = FACTIONS.find((f) => f.id === fac) || FACTIONS[0];
  /* 换门派（不论是点切换钮，还是从档案卡的链接、浏览器后退进来）时收起浮签：原先聚焦的那段已不在图上，
     浏览器不一定为被移除的元素发 blur，不收就会留下另一张图的浮签 */
  const [tipFac, setTipFac] = useState(F.id);
  if (tipFac !== F.id) { setTipFac(F.id); setHov(null); setFoc(null); }
  const [Y0, Y1] = F.range;
  /* 英文職名長於中文（Deputy Military Commissioner），左欄放寬 */
  const plotL = en ? 222 : PLOT_L;
  const xOf = (p) => plotL + ((p - Y0) / (Y1 - Y0)) * (PLOT_R - plotL);
  const marks = F.marks.map((m) => ({ ...m, p: pos(m.y, m.m) }));
  /* 本门派的任期，带原下标 */
  const mine = useMemo(() => TENURES.map((t, i) => ({ t, i })).filter(({ t }) => tenureFac(t) === F.id), [F.id]);

  const colorOf = useMemo(() => {
    const posts = {};
    for (const { t } of mine) (posts[t.who] ??= new Set()).add(t.post);
    let movers = Object.keys(posts).filter((w) => posts[w].size > 1);
    if (movers.length > MOVER_COLORS.length) movers = movers.filter((w) => posts[w].size >= 3);
    /* 按首任先后分色，色随人走、不随排名 */
    const first = (w) => Math.min(...mine.filter(({ t }) => t.who === w).map(({ t }) => (t.y0 == null ? F.range[0] : pos(t.y0, t.m0))));
    movers.sort((a, b) => first(a) - first(b));
    const map = Object.fromEntries(movers.map((w, i) => [w, MOVER_COLORS[i % MOVER_COLORS.length]]));
    /* map 存原色；tone() 在每次調用時求值，換膚不必重算此 memo */
    return (w) => (map[w] ? tone(map[w]) : NEUTRAL);
  }, [mine, F.range]);
  const movers = useMemo(() => [...new Set(mine.map(({ t }) => t.who))].filter((w) => colorOf(w) !== NEUTRAL), [mine, colorOf]);

  /* 版面：分组标题 + 每格若干道（任期重叠者分道） */
  const { layout, H } = useMemo(() => {
    const out = [];
    let y = TOP, lastGroup = null;
    const [y0, y1] = F.range;
    for (const p of POSTS.filter((q) => q.fac === F.id)) {
      if (p.group !== lastGroup) {
        out.push({ kind: "group", label: p.group, y });
        y += GROUP_H;
        lastGroup = p.group;
      }
      const items = mine.filter(({ t }) => t.post === p.id)
        .map(({ t, i }) => ({ t, i, a: t.y0 == null ? y0 : pos(t.y0, t.m0), b: t.y1 == null ? y1 : pos(t.y1, t.m1) }))
        .sort((r, s) => r.a - s.a);
      const laneEnd = [];
      for (const r of items) {
        let k = laneEnd.findIndex((e) => e <= r.a + 1e-6);
        if (k < 0) { k = laneEnd.length; laneEnd.push(0); }
        laneEnd[k] = r.b;
        r.lane = k;
      }
      const lanes = Math.max(1, laneEnd.length);
      const h = ROW_H + (lanes - 1) * LANE_H;
      out.push({ kind: "row", post: p, items, y, h });
      y += h;
    }
    return { layout: out, H: y + 14 };
  }, [mine, F.id, F.range]);

  const hot = hover ? TENURES[hover.i].who : null;
  const ticks = [];
  for (let yr = Y0; yr <= Y1; yr++) ticks.push(yr);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* 门派切换 */}
      <div role="group" aria-label={t_("門派")} style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {FACTIONS.map((f) => (
          <button key={f.id} type="button" aria-pressed={f.id === F.id} onClick={() => { clearTip(); onFac?.(f.id); }}
            style={{ fontFamily: "HuiwenZhengKai", fontSize: 13, padding: "2px 12px", background: f.id === F.id ? T.panelHi : "none", border: `1px solid ${f.id === F.id ? T.muted : T.line}`, borderRadius: 3, color: f.id === F.id ? T.ink : T.muted, cursor: "pointer" }}>
            {facName(locale, f.id)}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.muted, lineHeight: 1.9, margin: "0 0 10px" }}>
        {INTRO[F.id][en ? 1 : 0]}
      </p>
      {/* 图例：跨职位者各一色；线型 */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", fontFamily: "HuiwenZhengKai", fontSize: 12, color: T.muted, marginBottom: 10 }}>
        {movers.map((w) => (
          <button key={w} type="button" onClick={() => onOpenChar(byId[w])}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: T.muted, fontFamily: "HuiwenZhengKai", fontSize: 12 }}>
            <span style={{ width: 11, height: 11, borderRadius: 2, background: colorOf(w) }} />
            {charName(locale, byId[w])}
          </button>
        ))}
        <span style={{ color: T.faint }}>|</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 9, borderRadius: 2, background: NEUTRAL }} />{en ? "appointed" : "正授、署理"}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 9, borderRadius: 2, border: `1px dashed ${T.muted}` }} />{en ? "acting / concurrent / no title" : "代领、兼领、充任、停职、无名目"}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 3, borderRadius: 2, background: T.muted }} />{en ? "campaign command" : "出征差遣"}</span>
      </div>

      <div style={{ overflowX: "auto", background: T.panel, border: `1px solid ${T.line}`, borderRadius: 3 }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 760, width: "100%", height: "auto" }} role="group"
          aria-label={en ? `${facName(locale, F.id)} posts, ${Y0}–${Y1}. Each tenure is a button that opens the profile.` : `${F.id}编制任期图，${Y0}—${Y1}。每段任期是一个按钮，可打开档案`} onMouseLeave={() => setHov(null)}>
          <defs>
            {/* 起点不明／在任至卷末：色带在左右缘渐隐 */}
            <linearGradient id="posts-fade-l" x1="0" x2="1"><stop offset="0" stopColor={T.panel} stopOpacity="1" /><stop offset="1" stopColor={T.panel} stopOpacity="0" /></linearGradient>
            <linearGradient id="posts-fade-r" x1="0" x2="1"><stop offset="0" stopColor={T.panel} stopOpacity="0" /><stop offset="1" stopColor={T.panel} stopOpacity="1" /></linearGradient>
          </defs>
          {ticks.map((yr) => {
            const major = yr % 5 === 0;
            return (
              <g key={yr} aria-hidden="true">
                <line x1={xOf(yr)} x2={xOf(yr)} y1={TOP - 10} y2={H - 10} stroke={T.line} strokeOpacity={major ? 0.7 : 0.22} strokeWidth="1" />
                {major && <text x={xOf(yr)} y={TOP - 18} textAnchor="middle" fontFamily="HuiwenZhengKai" fontSize="11" fill={T.faint}>{yr}</text>}
              </g>
            );
          })}
          {marks.map((m) => (
            <g key={m.label} aria-hidden="true">
              <line x1={xOf(m.p)} x2={xOf(m.p)} y1={TOP - 6} y2={H - 10} stroke={T.accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" />
              <text x={xOf(m.p) + (m.left ? -4 : 4)} y={TOP - 4} textAnchor={m.left ? "end" : "start"} fontFamily="HuiwenZhengKai" fontSize="10" fill={T.accent} fillOpacity="0.75">{markTx(locale, m.label)[0]}</text>
            </g>
          ))}

          {layout.map((it, k) => {
            if (it.kind === "group") {
              return (
                <g key={`g${k}`} aria-hidden="true">
                  <text x="16" y={it.y + 18} fontFamily="JingHuaLaoSong" fontSize="13.5" letterSpacing={en ? 0.3 : 1} fill={T.ink}>{groupTx(locale, it.label)[0]}</text>
                  <line x1="16" x2={PLOT_R} y1={it.y + 24} y2={it.y + 24} stroke={T.line} strokeOpacity="0.6" strokeWidth="1" />
                </g>
              );
            }
            const { post, items, y } = it;
            return (
              /* 读屏：一个职位格是一组，组名「单位 · 职位」；格内每段任期是一个按钮 */
              <g key={post.id} role="group" aria-label={`${groupTx(locale, post.group)[0]} · ${postLabelTx(locale, post)[0]}`}>
                <text aria-hidden="true" x="30" y={y + ROW_H / 2 + 4} fontFamily="HuiwenZhengKai" fontSize={en ? 12 : 12.5} fill={T.muted}>
                  {postLabelTx(locale, post)[0]}
                  {post.hint && <title>{postHintTx(locale, post)[0]}</title>}
                </text>
                {items.map(({ t, i, a, b, lane }, k) => {
                  const col = colorOf(t.who);
                  const x1 = xOf(a), x2 = Math.max(xOf(b), x1 + 3);
                  const cy = y + ROW_H / 2 + lane * LANE_H;
                  const dim = hot && hot !== t.who;
                  const on = hot === t.who;
                  const name = charName(locale, byId[t.who]);
                  /* 自寫職名與職位格名不同者，名後綴之（英文綴其英译） */
                  const label = t.rank && !t.rank.startsWith(post.label) ? `${name} · ${en ? tenureTitleTx(locale, t)[0] : t.rank}` : name;
                  const fitLabel = textW(label, 11.5) + 10 < x2 - x1 ? label : textW(name, 11.5) + 10 < x2 - x1 ? name : "";
                  const place = (e) => {
                    const box = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                    const wrap = wrapRef.current.getBoundingClientRect();
                    const sx = box.width / W;
                    const x = box.left - wrap.left + ((x1 + x2) / 2) * sx;
                    return { i, x: Math.min(Math.max(x - 150, 0), Math.max(0, wrap.width - 300)), y: box.top - wrap.top + (cy + 13) * sx };
                  };
                  const open = () => onOpenChar(byId[t.who]);
                  const thin = t.kind === "差遣";
                  const solid = SOLID.has(t.kind);
                  /* 细线写不下字，名字挂在线尾；同道后面紧接着别人、或到了右缘，就不挂 */
                  const room = Math.min(PLOT_R, ...items.filter((o, j) => j !== k && o.lane === lane && o.a >= b).map((o) => xOf(o.a))) - x2;
                  const tail = thin && textW(name, 10.5) + 10 < room ? name : "";
                  return (
                    <g key={i} opacity={dim ? 0.32 : 1} tabIndex={0} role="button" style={{ cursor: "pointer", outline: "none" }}
                      aria-label={en ? `${name}, ${tenureTitleTx(locale, t)[0]}, ${spanOf(t)}, ${t_(t.kind)}${t.draft ? `, ${t_("待核")}` : ""}` : `${name}，${tenureTitle(t)}，${tenureSpan(t)}，${t.kind}${t.draft ? "，待核" : ""}`}
                      aria-describedby={hover && hover.i === i ? "posts-tip" : undefined}
                      onMouseEnter={(e) => setHov(place(e))} onFocus={(e) => setFoc(place(e))} onBlur={() => setFoc(null)} onClick={open}
                      /* 鼠标离开这一段只收鼠标那一份（且只收自己的，免得盖掉刚移入的下一段）；键盘焦点若还在，浮签退回焦点那段 */
                      onMouseLeave={() => setHov((h) => (h && h.i === i ? null : h))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } /* Esc 由上面 document 上的监听统一处理 */
                      }}>
                      {thin ? (
                        <line x1={x1} x2={x2} y1={cy} y2={cy} stroke={col} strokeWidth={on ? 5 : 4} strokeLinecap="round" />
                      ) : (
                        <rect x={x1} y={cy - 8} width={x2 - x1} height="16" rx="2.5"
                          fill={col} fillOpacity={solid ? (t.kind === "正授" ? 0.85 : 0.45) : 0.14}
                          stroke={solid ? (on ? T.ink : "none") : col} strokeOpacity={on ? 0.9 : 0.85} strokeWidth={on ? 1.3 : 1}
                          strokeDasharray={solid ? undefined : "3 2"} />
                      )}
                      {t.y0 == null && <rect x={x1} y={cy - 9} width="34" height="18" fill="url(#posts-fade-l)" />}
                      {t.y1 == null && <rect x={x2 - 30} y={cy - 9} width="30" height="18" fill="url(#posts-fade-r)" />}
                      {t.draft && <circle cx={x1 + 3} cy={cy - 8} r="2.6" fill={T.seal} />}
                      {tail && (
                        <text x={x2 + 5} y={cy + 3.5} fontFamily="HuiwenZhengKai" fontSize="10.5" pointerEvents="none" fill={T.muted}>{tail}</text>
                      )}
                      {!thin && fitLabel && (
                        <text x={x1 + 5} y={cy + 4} fontFamily="HuiwenZhengKai" fontSize="11.5" pointerEvents="none"
                          fill={solid && t.kind === "正授" ? T.onBar : T.ink} fillOpacity={solid ? 0.95 : 0.85}>{fitLabel}</text>
                      )}
                      {/* 感应区：细线与短带都放宽到整道高；细线尾挂了名字的，连名字一并算进去 */}
                      <rect x={x1 - 2} y={cy - 10} width={x2 - x1 + 4 + (tail ? textW(tail, 10.5) + 6 : 0)} height="20" fill="transparent" />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {hover && (() => {
        const t = TENURES[hover.i];
        const c = byId[t.who];
        return (
          <div id="posts-tip" role="tooltip" style={{ position: "absolute", left: hover.x, top: hover.y, width: 300, boxSizing: "border-box", pointerEvents: "none",
            background: T.panelHi, border: `1px solid ${colorOf(t.who)}88`, borderRadius: 3, padding: "8px 12px", fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.ink, lineHeight: 1.75, zIndex: 5 }}>
            {/* 英文界面：標目、職銜、任期類別英文（職銜查 i18n/posts.en.js）；上下文、備注暫回落中文 */}
            <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 14 }}>
              {charName(locale, c)}<span lang={tenureTitleTx(locale, t)[1] ? "zh" : undefined} style={{ color: T.muted, marginLeft: 8 }}>{tenureTitleTx(locale, t)[0]}</span>
            </div>
            <div style={{ color: T.accent, fontSize: 12 }}>{spanOf(t)}<span style={{ color: T.faint, marginLeft: 8 }}>{t_(t.kind)}</span>
              {t.draft && <span style={{ color: T.seal, marginLeft: 8 }}>{t_("待核")}</span>}</div>
            {(en && t.en ? t.en.how : t.how) && <div><span style={{ color: T.faint }}>{t_("上　")}</span><span lang={en && !t.en ? "zh" : undefined}>{en && t.en ? t.en.how : t.how}</span></div>}
            {(en && t.en ? t.en.end : t.end) && <div><span style={{ color: T.faint }}>{t_("下　")}</span><span lang={en && !t.en ? "zh" : undefined}>{en && t.en ? t.en.end : t.end}</span></div>}
            {t.note && <div lang={en ? "zh" : undefined} style={{ color: T.muted }}>{t.note}</div>}
            <div style={{ color: T.faint, fontSize: 11.5 }}>{t_("依据：")}{t.src.join(en ? "; " : "；")}</div>
          </div>
        );
      })()}
    </div>
  );
}
