/* ============================================================
   字面比對之規矩 (match.js) —— 全站檢索（search.js）與文庫閱讀器（novel-reader.jsx）同用一套，
   免兩處規矩不一：檢索框裡找得到，進章卻不高亮、不定位。
     - 字面包含，不作分詞、不作正則；
     - 繁簡兩試（查詢逐字轉簡，見 i18n/t2s.js）；
     - 拉丁字母不分大小寫、不計變音符（Lu Dingyi 中 Lü Dingyi），曲撇號作直撇號，拼音 lv 作 lü（同 enMatcher）。
   比對在「折疊」後之串上做，高亮要回到原串：逐碼元折疊並記下每個折疊碼元出自原串何處（map）。
   純漢字之串無可折疊者 map 為 null，即恆等，免為正文白建索引。純函數，無 React
   ============================================================ */
import { zhVariants } from "./i18n/t2s.js";

const LATIN_FOLD = /[A-Z\u00C0-\u024F\u1E00-\u1EFF\u2018\u2019\u02BC]/;
const MARKS = /\p{M}/u;
const needsFold = (s) => LATIN_FOLD.test(s) || MARKS.test(s);
const foldUnit = (c) => c.normalize("NFD").replace(/\p{M}/gu, "").replace(/[\u2018\u2019\u02bc]/g, "'").toLowerCase();

/* 長串（正文一章）之折疊存起：閱讀器每鍵都要重查各章，免逐鍵重折。章數有限，不設上限 */
const CACHE = new Map();
export function fold(s) {
  if (!needsFold(s)) return { t: s, f: s, map: null };
  if (s.length > 400 && CACHE.has(s)) return CACHE.get(s);
  let f = "";
  const map = [];
  for (let i = 0; i < s.length; i++) {
    const g = foldUnit(s[i]);
    for (let j = 0; j < g.length; j++) { f += g[j]; map.push(i); }
  }
  const out = { t: s, f, map };
  if (s.length > 400) CACHE.set(s, out);
  return out;
}

/* 折疊座標 → 原串座標 [起, 迄) */
export const span = (fld, a, len) => (fld.map ? [fld.map[a], fld.map[a + len - 1] + 1] : [a, a + len]);

/* 查詢諸寫法（已折疊、去重）：原字在前、轉簡在後；拼音 lv → lu。查詢空返回 [] */
export function queryKeys(q) {
  const out = [];
  for (const v of zhVariants((q || "").trim())) {
    const k = fold(v).f.replace(/\b([ln])v/g, "$1u");
    if (k && !out.includes(k)) out.push(k);
  }
  return out;
}

/* 是否命中（任一寫法） */
export const hasKeys = (text, keys) => {
  if (!text || keys.length === 0) return false;
  const f = fold(text).f;
  return keys.some((k) => f.includes(k));
};

/* 原串上諸命中處 [[起, 迄), …]：取第一個有命中之寫法（一串之內不混用兩種寫法） */
export function hitRanges(text, keys) {
  if (!text || keys.length === 0) return [];
  const fld = fold(text);
  for (const k of keys) {
    const out = [];
    let at = 0, p;
    while ((p = fld.f.indexOf(k, at)) !== -1) { out.push(span(fld, p, k.length)); at = p + k.length; }
    if (out.length) return out;
  }
  return [];
}

/* 摘錄：原串上 [s0, e0) 前後各截若干字，空白併作一格，截處示省略號 */
export function snippetAt(text, s0, e0, pre = 22, post = 30) {
  const s = Math.max(0, s0 - pre), e = Math.min(text.length, e0 + post);
  const clean = (x) => x.replace(/\s+/g, " ");
  return { pre: (s > 0 ? "…" : "") + clean(text.slice(s, s0)), hit: text.slice(s0, e0), post: clean(text.slice(e0, e)) + (e < text.length ? "…" : "") };
}
