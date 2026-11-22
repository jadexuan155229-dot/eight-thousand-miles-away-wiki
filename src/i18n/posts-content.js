import { postsEn, groupsEn, ranksEn, marksEn, honoursEn } from "./posts.en";
import { POST_FULL, tenureTitle, grantLabel } from "../posts-data";

/* ============================================================
   編制英译查表（posts-content.js）：皆返回 [文字, 是否回落中文]，同 content.js 之 charField。
   職名：任期自有 en.title 者先用；有自寫職名（rank）者查 ranksEn；否則用職位全稱 postsEn.full。
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
  if (t.en?.title) return [t.en.title, false];
  if (t.rank) return pick(ranksEn[t.rank], t.rank);
  return pick(postsEn[t.post]?.full, POST_FULL[t.post]);
}

/* 勳散：(追赠)官；勳；散（品）。任一項無英译即整條回落中文 */
export function grantTx(locale, g) {
  if (!EN(locale)) return [grantLabel(g), false];
  const parts = [g.guan, g.xun, g.san].filter(Boolean);
  if (parts.some((x) => !honoursEn[x]) || (g.pin && !honoursEn[g.pin])) return [grantLabel(g), true];
  const text = [g.guan && honoursEn[g.guan], g.xun && honoursEn[g.xun], g.san && `${honoursEn[g.san]} (${honoursEn[g.pin]})`].filter(Boolean).join("; ");
  return [(g.zeng ? "Posthumously: " : "") + text, false];
}
