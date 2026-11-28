/* ============================================================
   繁簡互通（檢索用）
   界面一律繁體、資料保持簡體（凡例）：讀者照繁體占位語打「雁門關」，資料只有「雁门关」，
   字面比對必落空。故查詢逐字轉簡（toSimp）再試一次——原字與轉後之字兩試，
   「乾元」之「乾」不因 OpenCC 首選「干」而漏，「著」「于」之類亦然。
   只轉查詢、不轉資料；對照表見 t2s-table.js（npm run t2s 生成，只含站內所需千餘對）。
   ============================================================ */
import { T2S_PAIRS } from "./t2s-table.js";

let MAP = null;
const map = () => {
  if (MAP) return MAP;
  MAP = new Map();
  const cs = Array.from(T2S_PAIRS);
  for (let i = 0; i + 1 < cs.length; i += 2) MAP.set(cs[i], cs[i + 1]);
  return MAP;
};

/* 逐字轉簡；無可轉者原樣返回（同一字串，可作 === 判斷） */
export function toSimp(s) {
  if (!s) return s;
  const m = map();
  let out = "", changed = false;
  for (const ch of s) {
    const v = m.get(ch);
    if (v) { out += v; changed = true; } else out += ch;
  }
  return changed ? out : s;
}

/* 查詢諸寫法：原字在前、轉簡在後，相同則只一個 */
export function zhVariants(q) {
  const s = toSimp(q);
  return s === q ? [q] : [q, s];
}

/* 字面包含之判斷，繁簡兩試：zhIncludes(查詢) 返回 (字串) => 是否命中；查詢空則恆真 */
export function zhIncludes(q) {
  if (!q) return () => true;
  const s = toSimp(q);
  if (s === q) return (str) => !!str && str.includes(q);
  return (str) => !!str && (str.includes(q) || str.includes(s));
}
