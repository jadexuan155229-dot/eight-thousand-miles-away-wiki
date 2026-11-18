import { useMemo, useRef, useState } from "react";
import { CHARACTERS } from "./wiki-data";
import { POSTS, TENURES, tenureSpan, tenureTitle } from "./posts-data";
import { T } from "./theme";
import { characterTranslation } from "./i18n/characters.en";

/* ============================================================
   編制 (posts.jsx) —— 苍云职位 × 年份的任期图
   一行一个职位格（单位 × 职位），按单位分组；一段任期一条色带。
   跨两个以上职位格的人各给一色，一眼看出谁从哪里走到哪里；
   只任一职的人用中性灰。实带＝正授、署理、暂任；虚线＝代领、兼领、
   停职、无名目；细线＝出征差遣，不占编制。
   同一格内任期重叠（如武库）自动分道。悬停或聚焦出浮签并点亮此人
   各段任期；点选打开档案。
   数据见 posts-data.js（Notion「人山人海 · 任職」先改，此处随之）。
   ============================================================ */

const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));

const Y0 = 737, Y1 = 766; /* 横轴：薛直在任之末到闵方城身后 */
const W = 1000, PLOT_L = 168, PLOT_R = 984, TOP = 44, ROW_H = 26, LANE_H = 20, GROUP_H = 26;
const pos = (y, m) => y + (m != null ? (m - 1) / 12 : 0);
const xOf = (p) => PLOT_L + ((p - Y0) / (Y1 - Y0)) * (PLOT_R - PLOT_L);
const textW = (str, size) => [...str].reduce((w, ch) => w + (ch.charCodeAt(0) > 0xff ? size : size * 0.56), 0);

/* 跨职位格者着色；色取暗底上可辨、彼此不近的五种，余者中性 */
const MOVER_COLORS = ["#D29A4A", "#C8673E", "#5FA88A", "#8E84D6", "#7FA3C8", "#C98BA8"];
const NEUTRAL = "#6E7885";
const SOLID = new Set(["正授", "署理", "暂任"]);

/* 年表上三个参照：一场败、一场乱、一个人 */
const MARKS = [
  { p: pos(745, 9), label: "雁门关之役" },
  { p: pos(755, 11), label: "安史乱起" },
  { p: pos(765, 1), label: "闵方城卒", left: true },
];

export default function Posts({ locale, onOpenChar }) {
  const en = locale === "en";
  const [hover, setHover] = useState(null); /* { i, x, y }：悬停或聚焦的任期；x、y 相对外框 */
  const wrapRef = useRef(null);

  const colorOf = useMemo(() => {
    const posts = {};
    for (const t of TENURES) (posts[t.who] ??= new Set()).add(t.post);
    const movers = Object.keys(posts).filter((w) => posts[w].size > 1);
    /* 按首任先后分色，色随人走、不随排名 */
    const first = (w) => Math.min(...TENURES.filter((t) => t.who === w).map((t) => (t.y0 == null ? Y0 : pos(t.y0, t.m0))));
    movers.sort((a, b) => first(a) - first(b));
    const map = Object.fromEntries(movers.map((w, i) => [w, MOVER_COLORS[i % MOVER_COLORS.length]]));
    return (w) => map[w] || NEUTRAL;
  }, []);
  const movers = useMemo(() => [...new Set(TENURES.map((t) => t.who))].filter((w) => colorOf(w) !== NEUTRAL), [colorOf]);

  /* 版面：分组标题 + 每格若干道（任期重叠者分道） */
  const { layout, H } = useMemo(() => {
    const out = [];
    let y = TOP, lastGroup = null;
    for (const p of POSTS) {
      if (p.group !== lastGroup) {
        out.push({ kind: "group", label: p.group, y });
        y += GROUP_H;
        lastGroup = p.group;
      }
      const items = TENURES.map((t, i) => ({ t, i, a: t.y0 == null ? Y0 : pos(t.y0, t.m0), b: t.y1 == null ? Y1 : pos(t.y1, t.m1) }))
        .filter((r) => r.t.post === p.id)
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
  }, []);

  const hot = hover ? TENURES[hover.i].who : null;
  const ticks = [];
  for (let yr = Y0; yr <= Y1; yr++) ticks.push(yr);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <p style={{ fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.muted, lineHeight: 1.9, margin: "0 0 10px" }}>
        {en
          ? "Cangyun posts by year, following the author’s own establishment (squad, troop, company, regiment, battalion). One row per post; one band per tenure. Content remains in Chinese."
          : "苍云编制，依文稿〈重看人物、军队体系〉：伍、火、队、旅、团、营，破阵营辖三团。一行一个职位，一条一段任期。"}
      </p>
      {/* 图例：跨职位者各一色；线型 */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", fontFamily: "HuiwenZhengKai", fontSize: 12, color: T.muted, marginBottom: 10 }}>
        {movers.map((w) => (
          <button key={w} type="button" onClick={() => onOpenChar(byId[w])}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: T.muted, fontFamily: "HuiwenZhengKai", fontSize: 12 }}>
            <span style={{ width: 11, height: 11, borderRadius: 2, background: colorOf(w) }} />
            {characterTranslation(locale, w)?.name || byId[w].name}
          </button>
        ))}
        <span style={{ color: T.faint }}>|</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 9, borderRadius: 2, background: NEUTRAL }} />{en ? "appointed" : "正授、署理"}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 9, borderRadius: 2, border: `1px dashed ${T.muted}` }} />{en ? "acting / concurrent / no title" : "代领、兼领、停职、无名目"}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 18, height: 3, borderRadius: 2, background: T.muted }} />{en ? "campaign command" : "出征差遣"}</span>
      </div>

      <div style={{ overflowX: "auto", background: T.panel, border: `1px solid ${T.line}`, borderRadius: 3 }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 760, width: "100%", height: "auto" }} role="img"
          aria-label={en ? "Cangyun posts, 737–766" : "苍云编制任期图，737—766"} onMouseLeave={() => setHover(null)}>
          <defs>
            {/* 起点不明／在任至卷末：色带在左右缘渐隐 */}
            <linearGradient id="posts-fade-l" x1="0" x2="1"><stop offset="0" stopColor={T.panel} stopOpacity="1" /><stop offset="1" stopColor={T.panel} stopOpacity="0" /></linearGradient>
            <linearGradient id="posts-fade-r" x1="0" x2="1"><stop offset="0" stopColor={T.panel} stopOpacity="0" /><stop offset="1" stopColor={T.panel} stopOpacity="1" /></linearGradient>
          </defs>
          {ticks.map((yr) => {
            const major = yr % 5 === 0;
            return (
              <g key={yr}>
                <line x1={xOf(yr)} x2={xOf(yr)} y1={TOP - 10} y2={H - 10} stroke={T.line} strokeOpacity={major ? 0.7 : 0.22} strokeWidth="1" />
                {major && <text x={xOf(yr)} y={TOP - 18} textAnchor="middle" fontFamily="HuiwenZhengKai" fontSize="11" fill={T.faint}>{yr}</text>}
              </g>
            );
          })}
          {MARKS.map((m) => (
            <g key={m.label}>
              <line x1={xOf(m.p)} x2={xOf(m.p)} y1={TOP - 6} y2={H - 10} stroke={T.accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" />
              <text x={xOf(m.p) + (m.left ? -4 : 4)} y={TOP - 4} textAnchor={m.left ? "end" : "start"} fontFamily="HuiwenZhengKai" fontSize="10" fill={T.accent} fillOpacity="0.75">{m.label}</text>
            </g>
          ))}

          {layout.map((it, k) => {
            if (it.kind === "group") {
              return (
                <g key={`g${k}`}>
                  <text x="16" y={it.y + 18} fontFamily="JingHuaLaoSong" fontSize="13.5" letterSpacing="1" fill={T.ink}>{it.label}</text>
                  <line x1="16" x2={PLOT_R} y1={it.y + 24} y2={it.y + 24} stroke={T.line} strokeOpacity="0.6" strokeWidth="1" />
                </g>
              );
            }
            const { post, items, y } = it;
            return (
              <g key={post.id}>
                <text x="30" y={y + ROW_H / 2 + 4} fontFamily="HuiwenZhengKai" fontSize="12.5" fill={T.muted}>
                  {post.label}
                  {post.hint && <title>{post.hint}</title>}
                </text>
                {items.map(({ t, i, a, b, lane }) => {
                  const col = colorOf(t.who);
                  const x1 = xOf(a), x2 = Math.max(xOf(b), x1 + 3);
                  const cy = y + ROW_H / 2 + lane * LANE_H;
                  const dim = hot && hot !== t.who;
                  const on = hot === t.who;
                  const name = characterTranslation(locale, t.who)?.name || byId[t.who].name;
                  const label = t.rank && !t.rank.startsWith(post.label) ? `${name} · ${t.rank}` : name;
                  const fitLabel = textW(label, 11.5) + 10 < x2 - x1 ? label : textW(name, 11.5) + 10 < x2 - x1 ? name : "";
                  const show = (e) => {
                    const box = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                    const wrap = wrapRef.current.getBoundingClientRect();
                    const sx = box.width / W;
                    const x = box.left - wrap.left + ((x1 + x2) / 2) * sx;
                    setHover({ i, x: Math.min(Math.max(x - 150, 0), Math.max(0, wrap.width - 300)), y: box.top - wrap.top + (cy + 13) * sx });
                  };
                  const open = () => onOpenChar(byId[t.who]);
                  const thin = t.kind === "差遣";
                  const solid = SOLID.has(t.kind);
                  return (
                    <g key={i} opacity={dim ? 0.32 : 1} tabIndex={0} role="button" style={{ cursor: "pointer", outline: "none" }}
                      aria-label={`${name}，${tenureTitle(t)}，${tenureSpan(t)}，${t.kind}`}
                      onMouseEnter={show} onFocus={show} onBlur={() => setHover(null)} onClick={open}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}>
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
                      {!thin && fitLabel && (
                        <text x={x1 + 5} y={cy + 4} fontFamily="HuiwenZhengKai" fontSize="11.5" pointerEvents="none"
                          fill={solid && t.kind === "正授" ? "#15181D" : T.ink} fillOpacity={solid ? 0.95 : 0.85}>{fitLabel}</text>
                      )}
                      {/* 感应区：细线与短带都放宽到整道高 */}
                      <rect x={x1 - 2} y={cy - 10} width={x2 - x1 + 4} height="20" fill="transparent" />
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
          <div role="tooltip" style={{ position: "absolute", left: hover.x, top: hover.y, width: 300, boxSizing: "border-box", pointerEvents: "none",
            background: T.panelHi, border: `1px solid ${colorOf(t.who)}88`, borderRadius: 3, padding: "8px 12px", fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.ink, lineHeight: 1.75, zIndex: 5 }}>
            <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 14 }}>
              {c.name}<span style={{ color: T.muted, marginLeft: 8 }}>{tenureTitle(t)}</span>
            </div>
            <div style={{ color: T.accent, fontSize: 12 }}>{tenureSpan(t)}<span style={{ color: T.faint, marginLeft: 8 }}>{t.kind}</span>
              {t.draft && <span style={{ color: T.seal, marginLeft: 8 }}>待核</span>}</div>
            {t.how && <div><span style={{ color: T.faint }}>上　</span>{t.how}</div>}
            {t.end && <div><span style={{ color: T.faint }}>下　</span>{t.end}</div>}
            {t.note && <div style={{ color: T.muted }}>{t.note}</div>}
            <div style={{ color: T.faint, fontSize: 11.5 }}>依据：{t.src.join("；")}</div>
          </div>
        );
      })()}
    </div>
  );
}
