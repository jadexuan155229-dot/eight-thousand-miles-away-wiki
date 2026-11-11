/* ============================================================
   數據一致性校驗 (scripts/check-data.js)
   校驗 wiki-data.js 五庫之間的引用完整性——渲染層大量直取
   byId[id].xxx / LOC_COORDS[l]，一個錯 id 即白屏或靜默丟點，
   此處先於瀏覽器把錯攔下。隨 npm run lint 執行；亦可單跑：
     node scripts/check-data.js
   錯誤（exit 1）：會導致崩潰或數據靜默丟失的引用錯。
   警告（exit 0）：可疑但站點尚能運行的問題。
   ============================================================ */
import { fc, CHARACTERS, EVENTS, RELATIONS, LOC_COORDS, TRACK_SUPPLEMENTS } from "../src/wiki-data.js";
import { CHAR_TERMS } from "../src/novel/char-terms.js";
import { SHOCKS, ECHOES } from "../src/echoes-data.js";
import { echoModesEn } from "../src/i18n/echoes.en.js";
import { SEAL_SVG_FILE } from "../src/seals.js";
import { missingFontChars } from "./font-chars.js";
import { readdirSync, existsSync } from "node:fs";

const errors = [];
const warns = [];
const err = (where, msg) => errors.push(`${where}  ${msg}`);
const warn = (where, msg) => warns.push(`${where}  ${msg}`);

/* fc() 對未知門派回退中立灰——以此探測 FACTION_COLORS 未收錄之名 */
const GRAY = fc("__unknown__");
const knownFac = (f) => fc(f) !== GRAY;

/* 事件定位線索：序號 + 年 + 題頭截斷 */
const evTag = (e, i) => `EVENTS[${i}] ${e.year ?? "?"}年「${String(e.title || "").slice(0, 18)}…」`;

/* ---------- 人物 ---------- */
const charIds = new Set();
CHARACTERS.forEach((c, i) => {
  const tag = `CHARACTERS[${i}] ${c.name || c.id || "?"}`;
  if (!c.id) err(tag, "缺 id");
  else if (charIds.has(c.id)) err(tag, `id 重複：${c.id}`);
  else charIds.add(c.id);
  if (!c.name) err(tag, "缺 name");
  if (!Array.isArray(c.belong)) err(tag, "belong 須為數組");
  else for (const f of c.belong) if (!knownFac(f)) warn(tag, `belong 門派「${f}」不在 FACTION_COLORS（將顯中立灰）`);
  if (c.birth != null && c.death != null && c.birth > c.death) err(tag, `生卒倒置：${c.birth} > ${c.death}`);
  for (const y of [c.birth, c.death]) if (y != null && (y < 600 || y > 820)) warn(tag, `生卒年 ${y} 逾常理範圍（600–820），恐系筆誤`);
});

/* ---------- 事件 ---------- */
EVENTS.forEach((e, i) => {
  const tag = evTag(e, i);
  if (typeof e.year !== "number") err(tag, `year 非數字：${e.year}`);
  else if (e.year < 600 || e.year > 820) warn(tag, `year ${e.year} 逾常理範圍（600–820），恐系筆誤`);
  if (e.month != null && (e.month < 1 || e.month > 12)) err(tag, `month 非法：${e.month}`);
  if (!e.title) err(tag, "缺 title");
  if (!Array.isArray(e.chars)) { err(tag, "chars 須為數組"); return; }
  for (const id of e.chars) if (!charIds.has(id)) err(tag, `chars 引用不存在的人物 id：${id}（渲染層 byId[id] 將崩潰）`);
  if (new Set(e.chars).size !== e.chars.length) warn(tag, "chars 有重複 id（共現計數將重複累計）");
  for (const l of e.loc || []) if (!LOC_COORDS[l]) err(tag, `loc「${l}」不在 LOC_COORDS（輿圖將靜默丟點）`);
  for (const f of e.fac || []) if (!knownFac(f)) warn(tag, `fac 門派「${f}」不在 FACTION_COLORS（將顯中立灰）`);
  for (const [id, l] of Object.entries(e.tloc || {})) {
    if (!charIds.has(id)) err(tag, `tloc 鍵引用不存在的人物 id：${id}`);
    else if (!e.chars.includes(id)) err(tag, `tloc 鍵 ${id} 不在本事 chars 中（覆寫無效，恐系錯位）`);
    if (l != null && !LOC_COORDS[l]) err(tag, `tloc 值「${l}」不在 LOC_COORDS`);
  }
});

/* ---------- 關係 ---------- */
RELATIONS.forEach((r, i) => {
  const tag = `RELATIONS[${i}] ${r.a}—${r.b}「${r.t || "?"}」`;
  for (const id of [r.a, r.b]) if (!charIds.has(id)) err(tag, `引用不存在的人物 id：${id}`);
  if (r.a === r.b) err(tag, "a 與 b 同人");
  if (!r.t) err(tag, "缺 t（關係類型）");
  if (r.y0 != null && r.y1 != null && r.y0 > r.y1) err(tag, `年段倒置：y0 ${r.y0} > y1 ${r.y1}`);
});

/* ---------- 動線補點 ---------- */
for (const [id, list] of Object.entries(TRACK_SUPPLEMENTS)) {
  if (!charIds.has(id)) { err(`TRACK_SUPPLEMENTS.${id}`, "鍵引用不存在的人物 id"); continue; }
  list.forEach((s, i) => {
    const tag = `TRACK_SUPPLEMENTS.${id}[${i}]`;
    if (!s.loc || !LOC_COORDS[s.loc]) err(tag, `loc「${s.loc}」不在 LOC_COORDS`);
    if (s.year == null && !s.origin) err(tag, "year 為空而非 origin 起點（體例：year: null 僅限 origin: true）");
    if (s.month != null && (s.month < 1 || s.month > 12)) err(tag, `month 非法：${s.month}`);
  });
}

/* ---------- 文庫詞條 ---------- */
const seenTerms = new Map(); /* term → 首見 id：同 term 重複即「同名」，須人工映射（見 docs/wenku-margin-note.md 待辦） */
CHAR_TERMS.forEach((t, i) => {
  const tag = `CHAR_TERMS[${i}]「${t.term || "?"}」`;
  if (!t.term || typeof t.term !== "string") err(tag, "缺 term");
  if (!charIds.has(t.id)) err(tag, `id 引用不存在的人物：${t.id}（批注卡將查無此人、點擊無效）`);
  if (t.term) {
    if (seenTerms.has(t.term)) err(tag, `term 重複（先見於 id: ${seenTerms.get(t.term)}）——同名人物須人工映射，不能並列詞條`);
    else seenTerms.set(t.term, t.id);
  }
});
/* 有 readerNote 而無詞條：接入只做了一半（正文名字不可點），提醒補 char-terms.js */
const termIds = new Set(CHAR_TERMS.map((t) => t.id));
for (const c of CHARACTERS) {
  if (c.readerNote != null && !termIds.has(c.id)) warn(`CHARACTERS ${c.name}`, "有 readerNote 而無 CHAR_TERMS 詞條——正文名字不可點，接入未完成");
}

/* ---------- 余波（震源與回響） ----------
   余波層為作者按，與事實層分聲，但引用的人物與事件須可查：
   錯（exit 1）：who 不在 CHARACTERS；band 不在本震源 bands；震源錨事件在 EVENTS 中查無；一人一震源重複
   警告：有月份之節點在 EVENTS 同年同月無條目（可能出自人物卡，亦可能是年月筆誤）；mode 無英譯 */
const shockIds = new Set();
for (const s of SHOCKS) {
  const tag = `SHOCKS「${s.title}」`;
  if (shockIds.has(s.id)) err(tag, `id 重複：${s.id}`);
  shockIds.add(s.id);
  const hit = EVENTS.some((e) => e.year === s.ev.year && e.month === s.ev.month && String(e.title).includes(s.ev.has));
  if (!hit) err(tag, `錨事件查無：${s.ev.year}年${s.ev.month}月、題含「${s.ev.has}」不在 EVENTS`);
  if (!s.axis) err(tag, "缺 axis（縱軸刻度）");
  if (!Array.isArray(s.bands) || !s.bands.length) err(tag, "缺 bands");
}
const echoSeen = new Set();
const bandKeys = Object.fromEntries(SHOCKS.map((s) => [s.id, new Set(s.bands.map((b) => b[0]))]));
ECHOES.forEach((x, i) => {
  const who = CHARACTERS.find((c) => c.id === x.who);
  const tag = `ECHOES[${i}] ${who ? who.name : x.who}·${x.shock}`;
  if (!shockIds.has(x.shock)) { err(tag, `shock 引用不存在的震源：${x.shock}`); return; }
  if (!who) err(tag, `who 引用不存在的人物 id：${x.who}`);
  if (!bandKeys[x.shock].has(x.band)) err(tag, `band「${x.band}」不在本震源 bands`);
  const key = `${x.shock}/${x.who}`;
  if (echoSeen.has(key)) err(tag, "同一人於同一震源有兩條回響（體例：一人一震源一行）");
  echoSeen.add(key);
  if (!x.mode) err(tag, "缺 mode（記憶方式）");
  else if (!echoModesEn[x.mode]) warn(tag, `mode「${x.mode}」尚無英譯（i18n/echoes.en.js）`);
  for (const n of x.arc || []) {
    if (n.y != null && (n.y < 700 || n.y > 820)) warn(tag, `節點年 ${n.y} 逾常理範圍`);
    if (n.m != null && (n.m < 1 || n.m > 12)) err(tag, `節點月非法：${n.m}`);
    if (n.y != null && n.m != null && !EVENTS.some((e) => e.year === n.y && e.month === n.m))
      warn(tag, `節點 ${n.y}.${n.m}${n.q || ""}「${n.note.slice(0, 14)}…」在 EVENTS 無同年同月條目（出自人物卡則無妨）`);
  }
});

/* ---------- 印章圖 ---------- */
/* 映射表指向的檔案若被改名或刪除，瀏覽器只渲染一枚破圖、構建不報錯，
   故在此比對映射表、人物表與 public/images/seals/ 三方 */
const SEAL_DIR = new URL("../public/images/seals/", import.meta.url);
const sealFiles = new Set(
  (existsSync(SEAL_DIR) ? readdirSync(SEAL_DIR) : []).filter((f) => f.endsWith(".svg"))
);
const usedSeal = new Set();
for (const [id, file] of Object.entries(SEAL_SVG_FILE)) {
  const tag = `SEAL_SVG_FILE.${id}`;
  if (!charIds.has(id)) err(tag, `鍵引用不存在的人物 id（該人物查表得 undefined，將靜默退回文字印章）`);
  else {
    const c = CHARACTERS.find((x) => x.id === id);
    if (!c.pin) err(tag, `${c.name} 無 pin（一字品評）——Seal 直接返回 null，印章不會出現`);
  }
  if (!sealFiles.has(file)) err(tag, `檔案不存在：public/images/seals/${file}（頁面將渲染破圖）`);
  else usedSeal.add(file);
}
for (const f of sealFiles) {
  if (!usedSeal.has(f)) warn(`public/images/seals/${f}`, "無人引用——上傳後忘了寫進 seals.js 的 SEAL_SVG_FILE？");
}

/* ---------- 地點 ---------- */
const KINDS = new Set(["city", "sect", "region", "off"]);
for (const [name, c] of Object.entries(LOC_COORDS)) {
  const tag = `LOC_COORDS「${name}」`;
  if (!KINDS.has(c.kind)) err(tag, `kind 非法：${c.kind}`);
  if (typeof c.x !== "number" || typeof c.y !== "number") err(tag, "缺 x/y 座標");
  if (c.kind === "off" && c.dir !== "西" && c.dir !== "東") err(tag, `off 條目 dir 須為「西」或「東」：${c.dir}`);
}

/* ---------- 字體子集 ----------
   明朝、正楷、老宋只帶字符表所列之字，表外之字靜默回落系統字體——
   站內用字有表外者即報；npm run fonts 補表並重裁子集後自消。 */
const missingGlyphs = missingFontChars();
if (missingGlyphs.length) {
  const shown = missingGlyphs.slice(0, 40).join("") + (missingGlyphs.length > 40 ? "……" : "");
  warn("字體子集", `站內用字 ${missingGlyphs.length} 個不在 scripts/font-subset-chars.txt，明朝、正楷、老宋處將回落系統字體：${shown}——跑 npm run fonts`);
}

/* ---------- 結果 ---------- */
for (const w of warns) console.log(`  ⚠ ${w}`);
for (const e of errors) console.log(`  ✗ ${e}`);
console.log(
  `check-data：人物 ${CHARACTERS.length} · 事件 ${EVENTS.length} · 關係 ${RELATIONS.length} · 地點 ${Object.keys(LOC_COORDS).length} · 補點 ${Object.values(TRACK_SUPPLEMENTS).flat().length} · 詞條 ${CHAR_TERMS.length} · 震源 ${SHOCKS.length} · 回響 ${ECHOES.length}（待核 ${ECHOES.filter((x) => x.draft).length}） —— ` +
  (errors.length ? `${errors.length} 錯` : "無錯") + (warns.length ? `，${warns.length} 警告` : "")
);
if (errors.length) process.exit(1);
