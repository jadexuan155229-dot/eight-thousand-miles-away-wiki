/* ============================================================
   數據一致性校驗 (scripts/check-data.js)
   校驗 wiki-data.js 五庫之間的引用完整性——渲染層大量直取
   byId[id].xxx / LOC_COORDS[l]，一個錯 id 即白屏或靜默丟點，
   此處先於瀏覽器把錯攔下。隨 npm run lint 執行；亦可單跑：
     node scripts/check-data.js
   錯誤（exit 1）：會導致崩潰或數據靜默丟失的引用錯。
   警告（exit 0）：可疑但站點尚能運行的問題。
   ============================================================ */
import { fc, CHARACTERS, EVENTS, RELATIONS, LOC_COORDS, TRACK_SUPPLEMENTS, GEO_BASE } from "../src/wiki-data.js";
import { CHAR_TERMS } from "../src/novel/char-terms.js";
import { SHOCKS, ECHOES } from "../src/echoes-data.js";
import { FACTIONS, GRANTS, POSTS, POST_FULL, TENURES } from "../src/posts-data.js";
import { POST_FAC_SLUG, parseRoute, routeHash } from "../src/router.js";
import { echoModesEn } from "../src/i18n/echoes.en.js";
import { SEAL_SVG_FILE } from "../src/seals.js";
import { missingFontChars } from "./font-chars.js";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { UI_KEYS } from "../src/i18n/ui.js";
import { charactersEn } from "../src/i18n/characters.en.js";
import { factionsEn } from "../src/i18n/factions.en.js";
import { placesEn } from "../src/i18n/places.en.js";
import { relationsEn } from "../src/i18n/relations.en.js";
import { eventsEn } from "../src/i18n/events.en.js";
import { novelEn } from "../src/i18n/novel.en.js";
import { TIER1 } from "../src/i18n/tiers.js";
import { NAME_LABELS, ALT_LABELS } from "../src/i18n/name-labels.js";
import { postsEn, groupsEn, ranksEn, marksEn, honoursEn } from "../src/i18n/posts.en.js";
import { NOVELS } from "../src/novel/index.js";
import { translatedFields, readStamps, hashOf } from "./i18n-fields.js";

const errors = [];
let coverageLine = "";
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

/* ---------- 任職 ----------
   posts-data.js：人物、職位格、起止、依據裡寫的年表編號（如 757.10B）須存在；
   同一職位格內同一人的任期不應重疊（重疊多半是止點漏改）；
   職位格須標門派（FACTIONS）；勳散（GRANTS）同校人物、年月、依據 */
const postIds = new Set(POSTS.map((p) => p.id));
const facIds = new Set(FACTIONS.map((f) => f.id));
for (const p of POSTS) {
  if (!POST_FULL[p.id]) err(`POSTS ${p.id}`, "POST_FULL 缺全稱");
  if (!facIds.has(p.fac)) err(`POSTS ${p.id}`, `fac 不在 FACTIONS：${p.fac}`);
}
if (postIds.size !== POSTS.length) err("POSTS", "職位格 id 重複");
for (const f of FACTIONS) if (!POST_FAC_SLUG[f.id]) err(`FACTIONS ${f.id}`, "router.js POST_FAC_SLUG 缺此門派的哈希段");
for (const sl of Object.values(POST_FAC_SLUG)) if (charIds.has(sl)) err(`POST_FAC_SLUG ${sl}`, "與人物 id 重名，#/posts/<段> 將無法區分");
/* 編制圖路由往返：新舊兩式都得解回原意 */
for (const [h, want] of [["#/posts", { fac: "苍云", char: null }], ["#/posts/lanchuanyun", { fac: "苍云", char: "lanchuanyun" }],
  ["#/posts/tiance", { fac: "天策", char: null }], ["#/posts/tiance/chengkai", { fac: "天策", char: "chengkai" }],
  ["#/posts/tangjun", { fac: "唐军", char: null }], ["#/posts/tangjun/chengduo", { fac: "唐军", char: "chengduo" }]]) {
  const r = parseRoute(h);
  if (r.fac !== want.fac || r.char !== want.char) err(`router ${h}`, `解析為 ${r.fac}/${r.char}`);
  if (routeHash(r) !== h) err(`router ${h}`, `回寫為 ${routeHash(r)}`);
}
const KINDS_T = new Set(["正授", "署理", "代領", "代领", "兼領", "兼领", "停職", "停职", "暫任", "暂任", "差遣", "無名目", "无名目", "充任"]);
const evRef = /^(\d{3})\.(\d{1,2})([A-Z]\d?)?$|^(\d{3})$/;
/* 依據年表條目整條標「（待定）」「（待定；…）」而任期未標 draft：讀者會把待定的情節當成定了的。
   只認整條待定；「葬處待定」「月份待核」之類細節不算 */
const WHOLE_TBD = /（待定[）；]/;
const checkSrc = (tag, src, who, draft) => {
  for (const ref of src || []) {
    const m = ref.match(evRef);
    if (!m) continue; /* 〈文稿〉與「卡」不校 */
    const y = Number(m[1] || m[4]), mo = m[2] != null ? Number(m[2]) : null, q = m[3] || null;
    const evs = EVENTS.filter((e) => e.year === y && (mo == null || e.month === mo) && (q == null || e.seq === q));
    if (!evs.length) err(tag, `依據 ${ref} 在年表中找不到（年月序號不符？）`);
    if (!draft && evs.some((e) => (e.chars || []).includes(who) && WHOLE_TBD.test(e.title))) warn(tag, `依據 ${ref} 在年表中整條待定，任期卻未標 draft`);
  }
};
TENURES.forEach((t, i) => {
  const tag = `TENURES[${i}] ${t.who}·${t.post}`;
  if (!charIds.has(t.who)) err(tag, `who 引用不存在的人物 id：${t.who}`);
  if (!postIds.has(t.post)) err(tag, `post 不在 POSTS：${t.post}`);
  if (!KINDS_T.has(t.kind)) err(tag, `kind 非法：${t.kind}`);
  for (const m of [t.m0, t.m1]) if (m != null && (m < 1 || m > 12)) err(tag, `月份非法：${m}`);
  const a = t.y0 == null ? -Infinity : t.y0 + ((t.m0 || 1) - 1) / 12;
  const b = t.y1 == null ? Infinity : t.y1 + ((t.m1 || 1) - 1) / 12;
  if (a > b) err(tag, `起止倒置：${t.y0}.${t.m0} > ${t.y1}.${t.m1}`);
  const c = CHARACTERS.find((x) => x.id === t.who);
  if (c && c.death != null && t.y0 != null && t.y0 > c.death) err(tag, `任期起於卒年 ${c.death} 之後`);
  // 試訓收的本是少年（年表 764：程骞入天策府試訓，時年十一），不算任職，不報年幼
  if (c && c.birth != null && t.y0 != null && t.y0 - c.birth < 12 && t.post !== "sx-sx") warn(tag, `任期起時年僅 ${t.y0 - c.birth}`);
  if (!Array.isArray(t.src) || !t.src.length) warn(tag, "缺 src（依據）");
  checkSrc(tag, t.src, t.who, t.draft);
});
GRANTS.forEach((g, i) => {
  const tag = `GRANTS[${i}] ${g.who}`;
  if (!charIds.has(g.who)) err(tag, `who 引用不存在的人物 id：${g.who}`);
  if (typeof g.y !== "number") err(tag, "缺授予年");
  if (g.m != null && (g.m < 1 || g.m > 12)) err(tag, `月份非法：${g.m}`);
  if (!g.xun && !g.san && !g.guan) err(tag, "勳、散、贈官皆空");
  if (g.san && !g.pin) warn(tag, "散官缺品");
  const c = CHARACTERS.find((x) => x.id === g.who);
  if (c && c.death != null && g.y > c.death) err(tag, `授於卒年 ${c.death} 之後`);
  if (g.zeng && c && c.death != null && g.y !== c.death) warn(tag, `追贈不在卒年 ${c.death}`);
  if (!Array.isArray(g.src) || !g.src.length) warn(tag, "缺 src（依據）");
  checkSrc(tag, g.src, g.who, g.draft);
});
/* 下一段待核，上一段的「如何下」卻把那段情節寫成定論（如「出成都討崔旰」）：
   同一人、上一段止點＝待核段起點，且 end 含待核段職銜的主幹（括號前）即報 */
for (const d of TENURES.filter((t) => t.draft)) {
  const core = (d.rank || "").split("（")[0];
  if (core.length < 2) continue;
  for (const p of TENURES) {
    if (p === d || p.draft || p.who !== d.who || p.y1 !== d.y0 || (p.m1 ?? null) !== (d.m0 ?? null)) continue;
    if ((p.end || "").includes(core)) warn(`TENURES ${p.who}·${p.post}`, `下一段（${d.post}）待核，本段「如何下」卻寫了「${core}」`);
  }
}
for (let i = 0; i < TENURES.length; i++) for (let j = i + 1; j < TENURES.length; j++) {
  const s1 = TENURES[i], s2 = TENURES[j];
  if (s1.post !== s2.post || s1.who !== s2.who) continue;
  const lo = (t) => (t.y0 == null ? -Infinity : t.y0 + ((t.m0 || 1) - 1) / 12), hi = (t) => (t.y1 == null ? Infinity : t.y1 + ((t.m1 || 1) - 1) / 12);
  if (Math.max(lo(s1), lo(s2)) < Math.min(hi(s1), hi(s2)) - 1e-6) warn(`TENURES[${i}]/[${j}] ${s1.who}·${s1.post}`, "同人同格任期重疊");
}

/* ---------- 英譯 ----------
   英文為覆蓋層（src/i18n/*.en.js），中文庫一字不動。此處查三件事：
   錯（exit 1）：英譯指向不存在的人物 id、檔案行標。
   警告：中文已改而英文未核（戳不符）、新譯未蓋戳；以中文為鍵的英譯其鍵已不在庫中（中文改過，英文成孤兒）；
         站內界面用了 ui.js 沒有的鍵、ui.js 有而站內不用的鍵。
   末尾另出一行覆蓋率，供分級推進時看進度（docs/english-edition.md）。 */
{
  const { fields, problems } = translatedFields();
  for (const p of problems) (p.level === "err" ? err : warn)(`英譯 ${p.key}`, p.msg);
  const stamps = readStamps();
  for (const f of fields) {
    if (!(f.key in stamps)) warn(`英譯 ${f.key}`, "新譯未蓋戳——跑 npm run i18n:stamp");
    else if (stamps[f.key] !== hashOf(f.zh)) warn(`英譯 ${f.key}`, `中文已改，英文待核（核後 npm run i18n:stamp -- --restamp ${f.key}）`);
  }
  for (const k of Object.keys(stamps)) if (!fields.some((f) => f.key === k)) warn(`英譯戳 ${k}`, "此字段已無英譯——跑 npm run i18n:stamp -- --prune");

  /* 以中文為鍵者：鍵不在庫中即孤兒。年表另給最近似之現題，便於改鍵 */
  const titles = EVENTS.map((e) => e.title);
  const near = (k) => {
    const grams = (x) => new Set([...x].slice(0, -1).map((ch, i) => ch + x[i + 1]));
    const a = grams(k);
    let best = null, bs = 0;
    for (const t of titles) {
      const b = grams(t);
      const inter = [...a].filter((g) => b.has(g)).length;
      const sc = inter / (a.size + b.size - inter || 1);
      if (sc > bs) { bs = sc; best = t; }
    }
    return bs > 0.3 ? `；最近似的現題：「${best.slice(0, 24)}…」` : "";
  };
  for (const k of Object.keys(eventsEn)) if (!titles.includes(k)) warn(`英譯 年表「${k.slice(0, 18)}…」`, `題目已不在 EVENTS（中文改過？）${near(k)}`);
  const placeKeys = new Set([...Object.keys(LOC_COORDS), ...GEO_BASE.labels.map((l) => l.t.replace(/ /g, ""))]);
  for (const k of Object.keys(placesEn)) if (!placeKeys.has(k)) warn(`英譯 地名「${k}」`, "不在 LOC_COORDS 與底圖標籤之中");
  const relTypes = new Set(RELATIONS.flatMap((r) => r.t.split("·")));
  for (const k of Object.keys(relationsEn)) if (!relTypes.has(k)) warn(`英譯 關係類型「${k}」`, "庫中已無此類型");
  const facs = new Set([...CHARACTERS.flatMap((c) => c.belong), ...EVENTS.flatMap((e) => e.fac || [])]);
  for (const f of facs) if (!factionsEn[f]) warn(`英譯 門派「${f}」`, "尚無英譯（i18n/factions.en.js）——英文界面將顯中文");
  for (const k of Object.keys(factionsEn)) if (!facs.has(k)) warn(`英譯 門派「${k}」`, "庫中已無此門派");
  const novelTitles = new Set(NOVELS.flatMap((n) => [n.tag, n.title, ...n.chapters.flatMap((ch) => [ch.title, ...(ch.chapters || []).map((x) => x.title)])]));
  for (const k of Object.keys(novelEn)) if (!novelTitles.has(k)) warn(`英譯 文庫「${k}」`, "文庫結構中已無此題");

  /* 名號標籤：數據層 names 只許 NAME_LABELS；覆蓋層 alt 只許 ALT_LABELS；覆蓋層 names 只譯汉名 */
  for (const c of CHARACTERS) for (const [k] of c.names || []) if (!NAME_LABELS.includes(k)) err(`人物 ${c.id}`, `名號標籤「${k}」不在 ${NAME_LABELS.join("、")} 之中`);
  for (const [id, x] of Object.entries(charactersEn)) {
    for (const [k] of x.alt || []) if (!ALT_LABELS.includes(k)) err(`英譯 ${id}.alt`, `標籤「${k}」不在 ${ALT_LABELS.join("、")} 之中`);
    for (const k of Object.keys(x.names || {})) if (k !== "汉名") err(`英譯 ${id}.names`, `只譯汉名；「${k}」為拉丁字名號，原樣用即可`);
  }

  /* 編制（i18n/posts.en.js）：缺譯報警告（英文界面回落中文），孤兒報警告（中文鍵已改） */
  for (const p of POSTS) {
    const e = postsEn[p.id];
    if (!e) { warn(`英譯 編制 ${p.id}`, `職位「${p.label}」尚無英譯`); continue; }
    if (!e.label || !e.full) warn(`英譯 編制 ${p.id}`, "缺 label 或 full");
    if (p.hint && !e.hint) warn(`英譯 編制 ${p.id}`, "中文有懸停說明（hint），英文缺");
  }
  for (const k of Object.keys(postsEn)) if (!POSTS.some((p) => p.id === k)) warn(`英譯 編制 ${k}`, "posts-data.js 已無此職位");
  const groups = new Set(POSTS.map((p) => p.group));
  for (const g of groups) if (!groupsEn[g]) warn(`英譯 編制分組「${g}」`, "尚無英譯");
  for (const k of Object.keys(groupsEn)) if (!groups.has(k)) warn(`英譯 編制分組「${k}」`, "posts-data.js 已無此分組");
  const rankSet = new Set(TENURES.filter((t) => t.rank).map((t) => t.rank));
  for (const r of rankSet) if (!ranksEn[r]) warn(`英譯 職名「${r}」`, "任期自寫職名尚無英譯——英文界面回落中文");
  for (const k of Object.keys(ranksEn)) if (!rankSet.has(k)) warn(`英譯 職名「${k}」`, "任期中已無此職名（中文改過？）");
  const markSet = new Set(FACTIONS.flatMap((f) => f.marks.map((m) => m.label)));
  for (const m of markSet) if (!marksEn[m]) warn(`英譯 編制標記「${m}」`, "尚無英譯");
  const honourSet = new Set(GRANTS.flatMap((g) => [g.guan, g.xun, g.san, g.pin].filter(Boolean)));
  for (const h of honourSet) if (!honoursEn[h]) warn(`英譯 勳散「${h}」`, "尚無英譯——該條英文回落中文");
  for (const k of Object.keys(honoursEn)) if (!honourSet.has(k)) warn(`英譯 勳散「${k}」`, "GRANTS 中已無此項");

  /* 界面字串：靜態掃 t("…")（余波頁另用 echoes.en.js，不在此列）；動態鍵（t(label) 之類）以「源碼中出現此字串」為用 */
  const SRC_DIR = new URL("../src/", import.meta.url);
  const srcText = ["wiki.jsx", "posts.jsx", "novel-reader.jsx", "landing.jsx", "i18n/names.jsx", "i18n/content.js", "i18n/name-labels.js"].map((f) => readFileSync(new URL(f, SRC_DIR), "utf8")).join("\n");
  /* 動態鍵有出自數據層者：檔案八目之行標（wiki-data.js 之 F）、任期類別（posts-data.js 之 kind） */
  const dataText = ["wiki-data.js", "posts-data.js"].map((f) => readFileSync(new URL(f, SRC_DIR), "utf8")).join("\n");
  const used = new Set([...srcText.matchAll(/\b(?:t|t_|tr)\(\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]));
  const uiSet = new Set(UI_KEYS);
  for (const k of used) if (!uiSet.has(k)) warn(`界面英譯「${k}」`, "站內在用而 i18n/ui.js 無此鍵——英文界面將顯中文");
  for (const k of UI_KEYS) if (!used.has(k) && !srcText.includes(`"${k}"`) && !dataText.includes(`"${k}"`)) warn(`界面英譯「${k}」`, "ui.js 有而站內不用——中文鍵改過？");

  /* 覆蓋率 */
  const ids = new Set(CHARACTERS.map((c) => c.id));
  const trd = Object.entries(charactersEn).filter(([id]) => ids.has(id));
  const hasProfile = (x) => x.profile && Object.values(x.profile).some((v) => v);
  const t1 = TIER1.filter((id) => charactersEn[id] && hasProfile(charactersEn[id])).length;
  const anecTotal = CHARACTERS.reduce((n, c) => n + (c.anecdotes || []).length, 0);
  const anecDone = fields.filter((f) => /\.anecdotes\.\d+$/.test(f.key)).length;
  const locDone = Object.keys(LOC_COORDS).filter((l) => placesEn[l]).length;
  /* 任期：職銜有英譯者（自有 en.title，或自寫職名／職位全稱已譯） */
  const tenDone = TENURES.filter((x) => x.en?.title || (x.rank ? ranksEn[x.rank] : postsEn[x.post]?.full)).length;
  const pct = (a, b) => `${a}/${b}`;
  coverageLine = `英譯覆蓋：界面 ${pct([...used].filter((k) => uiSet.has(k)).length, used.size)} · 人名 ${pct(trd.filter(([, x]) => x.name).length, CHARACTERS.length)} · 檔案 ${pct(trd.filter(([, x]) => hasProfile(x)).length, CHARACTERS.length)}（T1 ${t1}/${TIER1.length}） · 軼事 ${pct(anecDone, anecTotal)} · 年表 ${pct(EVENTS.filter((e) => eventsEn[e.title]).length, EVENTS.length)} · 地名 ${pct(locDone, Object.keys(LOC_COORDS).length)} · 門派 ${pct([...facs].filter((f) => factionsEn[f]).length, facs.size)} · 關係類型 ${pct([...relTypes].filter((k) => relationsEn[k]).length, relTypes.size)} · 任期 ${pct(tenDone, TENURES.length)}`;
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
if (coverageLine) console.log(coverageLine);
console.log(
  `check-data：人物 ${CHARACTERS.length} · 事件 ${EVENTS.length} · 關係 ${RELATIONS.length} · 地點 ${Object.keys(LOC_COORDS).length} · 補點 ${Object.values(TRACK_SUPPLEMENTS).flat().length} · 詞條 ${CHAR_TERMS.length} · 震源 ${SHOCKS.length} · 回響 ${ECHOES.length}（待核 ${ECHOES.filter((x) => x.draft).length}） · 任期 ${TENURES.length}（待核 ${TENURES.filter((t) => t.draft).length}） · 勳散 ${GRANTS.length}（待核 ${GRANTS.filter((g) => g.draft).length}） —— ` +
  (errors.length ? `${errors.length} 錯` : "無錯") + (warns.length ? `，${warns.length} 警告` : "")
);
if (errors.length) process.exit(1);
