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
const W = 1000, PLOT_L = 250, PLOT_R = 930, UNDATED_X = 962;
const ROW_H = 42, BAND_H = 30, TOP = 58, SHOCK_ROW_H = 56;

const posOf = (y, m) => y + (m != null ? (m - 1) / 12 : 0.5);

function nodeText(n) {
  if (n.y == null) return "";
  return `${n.y}${n.m != null ? `.${n.m}` : ""}${n.q || ""}`;
}

export default function Echoes({ shockId, who, locale, onRoute, onOpenProfile }) {
  const shock = SHOCKS.find((s) => s.id === shockId) || SHOCKS[0];
  const t = (k) => echoUi(locale, k);
  const [focusWho, setFocusWho] = useState(null); /* 键盘焦点环：SVG 的 <g> 不吃 CSS outline，自绘 */
  const rows = useMemo(() => ECHOES.filter((e) => e.shock === shock.id).sort((a, b) => a.order - b.order), [shock.id]);
  const dead = rows.filter((e) => e.band === "dead");
  const living = rows.filter((e) => e.band !== "dead");
  const selected = rows.find((e) => e.who === who) || null;

  /* 横轴：自最早的定年节点（或震源）到最晚者 */
  const { x0, x1 } = useMemo(() => {
    const ys = rows.flatMap((e) => e.arc.filter((n) => n.y != null).map((n) => posOf(n.y, n.m)));
    const sp = posOf(shock.year, shock.month);
    return { x0: Math.floor(Math.min(sp, ...ys) - 0.2), x1: Math.ceil(Math.max(sp, ...ys) + 0.2) };
  }, [rows, shock]);
  const xOf = (p) => PLOT_L + ((p - x0) / (x1 - x0)) * (PLOT_R - PLOT_L);
  const shockP = posOf(shock.year, shock.month);
  const shockX = xOf(shockP);

  /* 纵向排布：震源行 → 逝者行 → 各带（带题 + 本带诸行） */
  const layout = [];
  let y = TOP;
  layout.push({ kind: "shock", y });
  y += SHOCK_ROW_H;
  dead.forEach((e) => { layout.push({ kind: "row", e, y, dead: true }); y += ROW_H; });
  shock.bands.filter(([k]) => k !== "dead").forEach(([k, label]) => {
    const inBand = living.filter((e) => e.band === k);
    if (!inBand.length) return;
    layout.push({ kind: "band", label: bandLabel(locale, shock.id, k, label), y });
    y += BAND_H;
    inBand.forEach((e) => { layout.push({ kind: "row", e, y, dead: false }); y += ROW_H; });
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
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 760, width: "100%", height: "auto" }} role="img"
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
            const dated = e.arc.filter((n) => n.y != null).sort((a, b) => posOf(a.y, a.m) - posOf(b.y, b.m));
            const undated = e.arc.filter((n) => n.y == null);
            const seen = {};
            const pts = dated.map((n) => {
              const k = `${n.y}.${n.m}`;
              const j = (seen[k] = (seen[k] || 0) + 1) - 1;
              return { n, x: xOf(posOf(n.y, n.m)) + j * 9, p: posOf(n.y, n.m) };
            });
            const fade = (p) => Math.max(0.16, 0.7 - (p - shockP) * 0.022);
            let prev = { x: shockX, p: shockP };
            return (
              <g key={e.who} style={{ cursor: "pointer", outline: "none" }}
                role="button" tabIndex={0} aria-pressed={!!on} aria-label={`${tr?.name || c.name}：${modeText(locale, e.mode)}`}
                onClick={() => onRoute({ shock: shock.id, who: on ? null : e.who })}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onRoute({ shock: shock.id, who: on ? null : e.who }); } }}
                onFocus={(ev) => { if (ev.target.matches(":focus-visible")) setFocusWho(e.who); }}
                onBlur={() => setFocusWho((w) => (w === e.who ? null : w))}>
                {focusWho === e.who && <rect x="6" y={it.y + 1} width={W - 12} height={ROW_H - 2} fill="none" stroke={T.accent} strokeWidth="1.5" rx="3" />}
                {on && <rect x="8" y={it.y + 2} width={W - 16} height={ROW_H - 4} fill={T.panelHi} rx="3" />}
                {/* 谱线与节点：未选中行整体退后一档，行首姓名与记忆方式仍清晰可读 */}
                <g opacity={dim ? 0.45 : 1}>
                {/* 谱线：自震源起，分段渐淡 */}
                {pts.map(({ x, p }, k) => {
                  const seg = (
                    <line key={k} x1={prev.x} x2={x} y1={cy} y2={cy} stroke={col} strokeOpacity={fade(p)} strokeWidth="1.2"
                      strokeDasharray={it.dead ? "2 4" : undefined} />
                  );
                  prev = { x, p };
                  return seg;
                })}
                {/* 节点 */}
                {pts.map(({ n, x, p }, k) => (
                  <circle key={k} cx={x} cy={cy} r={on ? 5 : 4} fill={it.dead ? T.panel : col} fillOpacity={Math.max(0.5, fade(p) + 0.2)}
                    stroke={col} strokeOpacity={Math.max(0.5, fade(p) + 0.2)} strokeWidth="1.3">
                    <title>{`${nodeText(n)}　${n.note}`}</title>
                  </circle>
                ))}
                {undated.length > 0 && (
                  <g>
                    <circle cx={UNDATED_X} cy={cy} r="4" fill="none" stroke={col} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 2" />
                    {undated.length > 1 && <text x={UNDATED_X + 8} y={cy + 4} fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint}>{undated.length}</text>}
                  </g>
                )}
                </g>
                {/* 行首：姓名 + 记忆方式 */}
                <text x={it.dead ? 34 : 20} y={cy - 2} fontFamily="JingHuaLaoSong" fontSize="15" fill={on ? T.ink : T.muted}>{tr?.name || c.name}</text>
                <text x={it.dead ? 34 : 20} y={cy + 14} fontFamily="HuiwenZhengKai" fontSize="12.5" fill={on ? T.ink : T.muted} fillOpacity={on ? 0.95 : 0.8}>{modeText(locale, e.mode)}</text>
                <rect x="0" y={it.y} width={W} height={ROW_H} fill="transparent" />
              </g>
            );
          })}
          <text x={W - 12} y={H - 4} textAnchor="end" fontFamily="HuiwenZhengKai" fontSize="10" fill={T.faint} fillOpacity="0.7">{shockAxis(locale, shock)}　↓</text>
        </svg>
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
                  {n.card && <span title={t("人物卡")} style={{ marginLeft: 8, fontSize: 10.5, color: T.faint, border: `1px solid ${T.line}`, padding: "0 5px", borderRadius: 3 }}>卡</span>}
                </div>
              </div>
            ))}
          </section>
        );
      })()}
    </div>
  );
}
