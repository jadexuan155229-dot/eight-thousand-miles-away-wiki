import { postsEn, groupsEn, ranksEn, marksEn, honoursEn } from "./posts.en";
import { tenureNotesEn } from "./tenures.en";
import { POST_FULL, tenureTitle, tenureSpan, grantLabel } from "../posts-data";

/* ============================================================
   編制英译查表（posts-content.js）：皆返回 [文字, 是否回落中文]，同 content.js 之 charField。
   職名：有自寫職名（rank）者查 ranksEn；否則用職位全稱 postsEn.full。
   任期上下文（how / end / note）查 tenures.en.js，以中文原文為鍵；值為 false 者英文不出。
   中文一改（rank、label 以中文為鍵），英文即回落中文，不會錯配。
   ============================================================ */
const EN = (l) => l === "en";
const pick = (en, zh) => (en != null ? [en, false] : [zh, true]);

export const postLabelTx = (locale, p) => (EN(locale) ? pick(postsEn[p.id]?.label, p.label) : [p.label, false]);
export const postHintTx = (locale, p) => (!p.hint ? [null, false] : EN(locale) ? pick(postsEn[p.id]?.hint, p.hint) : [p.hint, false]);
export const groupTx = (locale, g) => (EN(locale) ? pick(groupsEn[g], g) : [g, false]);
export const markTx = (locale, m) => (EN(locale) ? pick(marksEn[m], m) : [m, false]);

export function tenureTitleTx(locale, t) {
  if (!EN(locale)) return [tenureTitle(t), false];
  if (t.rank) return pick(ranksEn[t.rank], t.rank);
  return pick(postsEn[t.post]?.full, POST_FULL[t.post]);
}

/* 任期起止（檔案「任職履歷」與編制圖浮簽、讀屏標籤共用）：英文作 745.9–760.10，（约）作 (approx.)，
   起年不詳之全角問號作半角 */
export const tenureSpanText = (locale, t) =>
  EN(locale) ? tenureSpan(t).replace(/（约）/g, " (approx.)").replace("—", "–").replace(/？/g, "?") : tenureSpan(t);

/* 勳散：(追赠)官；勳；散（品）。任一項無英译即整條回落中文 */
export function grantTx(locale, g) {
  if (!EN(locale)) return [grantLabel(g), false];
  const parts = [g.guan, g.xun, g.san].filter(Boolean);
  if (parts.some((x) => !honoursEn[x]) || (g.pin && !honoursEn[g.pin])) return [grantLabel(g), true];
  const text = [g.guan && honoursEn[g.guan], g.xun && honoursEn[g.xun], g.san && `${honoursEn[g.san]} (${honoursEn[g.pin]})`].filter(Boolean).join("; ");
  return [(g.zeng ? "Posthumously: " : "") + text, false];
}

/* 任期上下文：返回 [文字, 是否回落中文]；中文為空或英文標 false（只寫給作者的備注）則 [null, false] */
export function tenureNoteTx(locale, zh) {
  if (!zh) return [null, false];
  if (!EN(locale)) return [zh, false];
  const e = tenureNotesEn[zh];
  if (e === false) return [null, false];
  return pick(e, zh);
}

/* 依據：年表編號照出；「卡」作 profile；〈…〉是作者的工作文稿，英文不出篇名，幾條併作一條 manuscript(s)（作者 2026-11-23 定） */
export function tenureSrcTx(locale, src) {
  if (!EN(locale)) return src.join("；");
  const isMs = (s) => /^〈.*〉$/.test(s);
  const ms = src.filter(isMs).length;
  const first = src.findIndex(isMs);
  return src
    .filter((s, i) => !isMs(s) || i === first)
    .map((s) => (isMs(s) ? (ms > 1 ? "manuscripts" : "manuscript") : s === "卡" ? "profile" : s))
    .join("; ");
}
