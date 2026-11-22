/* ============================================================
   英译字段清点 (scripts/i18n-fields.js)
   人物英译按「人物 id + 字段」对应中文（characters.en.js），中文一改，英文不会自己知道。
   故每条已译字段记一枚中文原文的短哈希（src/i18n/stamps.json）：
     check-data 比对哈希，中文改了即报「英文待核」；
     npm run i18n:stamp 给新译字段盖戳，审过之后以 --restamp 重盖。
   本档只管清点与哈希，供上述两处共用。
   年表、地名、关系类型、界面字串以中文原文为键，中文一改即自动回落中文，不需盖戳。
   ============================================================ */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { CHARACTERS } from "../src/wiki-data.js";
import { charactersEn } from "../src/i18n/characters.en.js";

export const STAMP_FILE = new URL("../src/i18n/stamps.json", import.meta.url);
export const hashOf = (zh) => createHash("sha1").update(typeof zh === "string" ? zh : JSON.stringify(zh ?? "")).digest("hex").slice(0, 10);
/* false＝有意不譯（軼事、高光），亦算已處理，照樣蓋戳：中文改了仍須重看要不要譯 */
const has = (v) => v != null && v !== "" && !(typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);

const SCALAR = ["name", "zi", "hao", "epithet", "birthplace", "gloss", "names"];
const LISTS = ["anecdotes", "highlight"];

/* 已译字段：[{ key: "lvdingyi.profile.官职身份", id, zh, en }] ；问题另返回 problems（id 不存在、行标不存在、条数超出） */
export function translatedFields() {
  const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
  const out = [], problems = [];
  for (const [id, tr] of Object.entries(charactersEn)) {
    const c = byId[id];
    if (!c) { problems.push({ level: "err", key: id, msg: `characters.en.js 有 ${id}，人物库无此 id` }); continue; }
    for (const f of SCALAR) if (has(tr[f])) out.push({ key: `${id}.${f}`, id, zh: c[f], en: tr[f] });
    const rows = Object.fromEntries((c.profile || []).map(([k, v]) => [k, v]));
    for (const [label, en] of Object.entries(tr.profile || {})) {
      if (!(label in rows)) { problems.push({ level: "err", key: `${id}.profile.${label}`, msg: `档案行标「${label}」不在八目之中` }); continue; }
      if (has(en)) out.push({ key: `${id}.profile.${label}`, id, zh: rows[label], en });
    }
    for (const f of LISTS) {
      const zhList = c[f] || [];
      (tr[f] || []).forEach((en, i) => {
        if (!has(en)) return;
        if (i >= zhList.length) { problems.push({ level: "warn", key: `${id}.${f}.${i}`, msg: `英译第 ${i + 1} 条，中文只有 ${zhList.length} 条` }); return; }
        out.push({ key: `${id}.${f}.${i}`, id, zh: zhList[i], en });
      });
    }
  }
  return { fields: out, problems };
}

export function readStamps() {
  if (!existsSync(STAMP_FILE)) return {};
  return JSON.parse(readFileSync(STAMP_FILE, "utf8"));
}
export function writeStamps(stamps) {
  const sorted = Object.fromEntries(Object.entries(stamps).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  writeFileSync(STAMP_FILE, JSON.stringify(sorted, null, 2) + "\n");
}
