/* ============================================================
   全站檢索 · 索引與比對 (search.js) —— 純函數，無 React
   六類：人物、事件、地點、餘波（震源與各行）、編制（按組）、文庫（按章）。
   比對：字面包含，不作分詞、不作正則；
     - 繁簡兩試（查詢逐字轉簡，見 i18n/t2s.js）；
     - 拉丁字母不分大小寫、不計變音符（Lu Dingyi 中 Lü Dingyi），拼音 lv 作 lü（同 enMatcher）；
     - 英文界面另查英文譯名、譯題、地名、年號，中文原文照查。
   排序：每類之內先「名」後「文」——w0 名號、事名、地名、題名；w1 出身、地點、年號、要旨；
     w2 檔案正文、軼事、余波各行之注。查詢與名號全同者居首。同級者依資料原序（事件依年月）。
   索引按語言建一次、存於模組（數據靜態）；文庫正文懶載，另按正文映射建一次。
   ============================================================ */
import { CHARACTERS, EVENTS } from "./wiki-data";
import { SHOCKS, ECHOES } from "./echoes-data";
import { POSTS } from "./posts-data";
import { FLAT } from "./novel";
import { eraOfYM, englishEraOf, sortEvents } from "./era";
import { charEn, charName, profileRow, listField, nameItems, nameItemsEn, placeName, eventTitle, novelTitle } from "./i18n/content";
import { shockTitle, shockGist, stanceText, stanceNoteText, arcNoteText, modeText } from "./i18n/echoes-tx";
import { groupTx, postLabelTx } from "./i18n/posts-content";
import { zhVariants } from "./i18n/t2s";

/* ---------- 折疊：小寫、去變音符、曲撇號作直撇號 ----------
   比對在折疊後之串上做，高亮要回到原串：逐碼元折疊並記下每個折疊碼元出自原串何處（map）。
   純漢字之串無可折疊者 map 為 null，即恆等，免為數十萬字正文白建索引 */
const LATIN_FOLD = /[A-Z\u00C0-\u024F\u1E00-\u1EFF\u2018\u2019\u02BC]/;
const MARKS = /\p{M}/u;
const needsFold = (s) => LATIN_FOLD.test(s) || MARKS.test(s);
const foldUnit = (c) => c.normalize("NFD").replace(/\p{M}/gu, "").replace(/[\u2018\u2019\u02bc]/g, "'").toLowerCase();
function fold(s) {
  if (!needsFold(s)) return { f: s, map: null };
  let f = "";
  const map = [];
  for (let i = 0; i < s.length; i++) {
    const g = foldUnit(s[i]);
    for (let j = 0; j < g.length; j++) { f += g[j]; map.push(i); }
  }
  return { f, map };
}
/* 折疊座標 → 原串座標 [起, 迄) */
const span = (fld, a, len) => (fld.map ? [fld.map[a], fld.map[a + len - 1] + 1] : [a, a + len]);

/* 查詢諸寫法（已折疊、去重）：原字、轉簡；拼音 lv → lu */
export function queryKeys(q) {
  const out = [];
  for (const v of zhVariants(q.trim())) {
    const k = fold(v).f.replace(/\b([ln])v/g, "$1u");
    if (k && !out.includes(k)) out.push(k);
  }
  return out;
}

/* 一欄：原文、折疊、級別、標籤（摘錄前所注之欄名，界面鍵）、是否即標題 */
function field(out, text, w, lab = null, title = false) {
  if (typeof text !== "string" || !text.trim()) return;
  const { f, map } = fold(text);
  out.push({ t: text, f, map, w, lab, title });
}

/* ---------- 建索引 ---------- */
function charDocs(locale) {
  const en = locale === "en";
  return CHARACTERS.map((c, order) => {
    const fs = [];
    const tr = en ? charEn(locale, c.id) : null;
    field(fs, en ? charName(locale, c) : c.name, 0, null, true);
    if (en && charName(locale, c) !== c.name) field(fs, c.name, 0, null, true);
    if (en && tr?.name) field(fs, tr.name.replace(/\s+/g, ""), 0, null, true); /* minfangcheng 連寫亦中 */
    for (const [lab, v] of nameItems(c)) field(fs, v, 0, lab);
    if (en) for (const [lab, v, zh] of nameItemsEn(c)) if (!zh) field(fs, v, 0, lab);
    field(fs, c.hao, 0); field(fs, c.epithet, 0);
    if (en) { field(fs, tr?.hao, 0); field(fs, tr?.epithet, 0); }
    field(fs, c.birthplace, 1, "出身");
    if (en) field(fs, tr?.birthplace, 1, "出身");
    field(fs, c.pin, 1, "品評");
    /* 正文諸欄：中文照原文；英文取頁上所顯（有譯用譯，無譯回落中文；有意不譯者略） */
    for (const [lab, zh] of c.profile || []) field(fs, en ? profileRow(locale, c, lab, zh)[0] : zh, 2, lab);
    for (const [lab, key] of [["個人軼事", "anecdotes"], ["高光", "highlight"]]) {
      for (const [v] of en ? listField(locale, c, key) : (c[key] || []).map((x) => [x])) field(fs, v, 2, lab);
    }
    if (c.gloss && !(en && tr?.gloss === false)) {
      const g = en && tr?.gloss ? (typeof tr.gloss === "string" ? tr.gloss : tr.gloss.explanation) : c.gloss;
      field(fs, typeof g === "string" ? g : c.gloss, 2, "名字訓詁");
    }
    return { kind: "char", key: `c:${c.id}`, order, fields: fs, c };
  });
}

function eventDocs(locale) {
  const en = locale === "en";
  const idx = new Map(EVENTS.map((e, i) => [e, i]));
  return EVENTS.slice().sort(sortEvents).map((e, order) => {
    const fs = [];
    field(fs, en ? eventTitle(locale, e) : e.title, 0, null, true);
    if (en && eventTitle(locale, e) !== e.title) field(fs, e.title, 0, null, true);
    for (const l of e.loc) { field(fs, l, 1, "地點"); if (en) field(fs, placeName(locale, l), 1, "地點"); }
    field(fs, eraOfYM(e.year, e.month), 1, "年號");
    if (en) field(fs, englishEraOf(e.year), 1, "年號");
    return { kind: "event", key: `e:${idx.get(e)}`, order, fields: fs, e };
  });
}

function placeDocs(locale) {
  const n = {};
  for (const e of EVENTS) for (const l of e.loc) n[l] = (n[l] || 0) + 1;
  return Object.entries(n).sort((a, b) => b[1] - a[1]).map(([l, count], order) => {
    const fs = [];
    field(fs, placeName(locale, l), 0, null, true);
    if (locale === "en") field(fs, l, 0, null, true);
    return { kind: "place", key: `p:${l}`, order, fields: fs, name: l, count };
  });
}

/* 餘波：震源一條（題、要旨）；各行一條（立場、注、方式、諸節點之注）——人名不入此類，免查一人即列其全部各行 */
function echoDocs(locale) {
  const en = locale === "en";
  const out = SHOCKS.map((s, order) => {
    const fs = [];
    field(fs, shockTitle(locale, s), 0, null, true);
    if (en) field(fs, s.title, 0, null, true);
    field(fs, shockGist(locale, s), 1);
    if (en) field(fs, s.gist, 1);
    return { kind: "shock", key: `s:${s.id}`, order, fields: fs, s };
  });
  ECHOES.forEach((r, i) => {
    const fs = [];
    field(fs, en ? stanceText(locale, r.stance) : r.stance, 1);
    field(fs, en ? stanceNoteText(locale, r.stanceNote) : r.stanceNote, 1);
    field(fs, en ? modeText(locale, r.mode) : r.mode, 1);
    for (const a of r.arc || []) field(fs, en ? arcNoteText(locale, a.note) : a.note, 2);
    out.push({ kind: "echo", key: `r:${r.shock}:${r.who}`, order: SHOCKS.length + i, fields: fs, r, s: SHOCKS.find((x) => x.id === r.shock) });
  });
  return out;
}

/* 編制：一組一條（門派 · 組名），組名與其下諸職名可查 */
function postDocs(locale) {
  const groups = [];
  const byKey = {};
  for (const p of POSTS) {
    const k = `${p.fac}|${p.group}`;
    if (!byKey[k]) groups.push((byKey[k] = { fac: p.fac, group: p.group, posts: [] }));
    byKey[k].posts.push(p);
  }
  return groups.map((g, order) => {
    const fs = [];
    field(fs, groupTx(locale, g.group)[0], 0, null, true);
    if (locale === "en") field(fs, g.group, 0, null, true);
    const labels = [...new Set(g.posts.map((p) => postLabelTx(locale, p)[0]))];
    field(fs, labels.join(locale === "en" ? ", " : "、"), 1);
    if (locale === "en") field(fs, [...new Set(g.posts.map((p) => p.label))].join("、"), 1);
    return { kind: "post", key: `g:${g.fac}:${g.group}`, order, fields: fs, fac: g.fac, group: g.group, labels };
  });
}

function textDocs(locale, texts) {
  return FLAT.map((f, order) => {
    const fs = [];
    const titles = [f.novel.tag, f.novel.title, f.group && f.group.title, f.ch.title].filter(Boolean);
    for (const t of titles) { field(fs, t, 0); if (locale === "en" && novelTitle(locale, t) !== t) field(fs, novelTitle(locale, t), 0); }
    const body = (texts && f.ch.file && texts[f.ch.file]) || "";
    field(fs, body, 1, "正文");
    return { kind: "text", key: `t:${f.path}`, order, fields: fs, f, body: fs.find((x) => x.lab === "正文") || null };
  });
}

let CACHE = { locale: null, docs: null };
let TEXT_CACHE = { locale: null, texts: undefined, docs: null };
function docsFor(locale) {
  if (CACHE.locale !== locale) CACHE = { locale, docs: [...charDocs(locale), ...eventDocs(locale), ...placeDocs(locale), ...echoDocs(locale), ...postDocs(locale)] };
  return CACHE.docs;
}
function textDocsFor(locale, texts) {
  if (TEXT_CACHE.locale !== locale || TEXT_CACHE.texts !== texts) TEXT_CACHE = { locale, texts, docs: textDocs(locale, texts) };
  return TEXT_CACHE.docs;
}

/* ---------- 比對 ---------- */
/* 一文檔：取級別最高（w 最小）之命中欄；同級取先列者。名號全同者 rank 作 -1 居首 */
function matchDoc(d, keys) {
  let best = null;
  for (const fld of d.fields) {
    if (best && fld.w > best.rank) continue; /* 同級仍看：後列之名號或與查詢全同 */
    for (const k of keys) {
      const a = fld.f.indexOf(k);
      if (a < 0) continue;
      const rank = fld.w === 0 && fld.f === k ? -1 : fld.w;
      if (!best || rank < best.rank) best = { rank, fld, k, at: a };
      break;
    }
  }
  return best;
}

/* 原串上諸命中處 [[起, 迄), …]（標題高亮用） */
export function hitRanges(text, keys) {
  if (!text) return [];
  const fld = { ...fold(text) };
  for (const k of keys) {
    const out = [];
    let at = 0, p;
    while ((p = fld.f.indexOf(k, at)) !== -1) { out.push(span(fld, p, k.length)); at = p + k.length; }
    if (out.length) return out;
  }
  return [];
}

/* 摘錄：命中前後各截若干字，空白併作一格，截處示省略號 */
function snippet(fld, a, len, pad = 22) {
  const [s0, e0] = span(fld, a, len);
  const t = fld.t;
  const s = Math.max(0, s0 - pad), e = Math.min(t.length, e0 + pad + 8);
  const clean = (x) => x.replace(/\s+/g, " ");
  return { pre: (s > 0 ? "…" : "") + clean(t.slice(s, s0)), hit: t.slice(s0, e0), post: clean(t.slice(e0, e)) + (e < t.length ? "…" : ""), lab: fld.lab };
}

const countIn = (f, k) => { let n = 0, at = 0, p; while ((p = f.indexOf(k, at)) !== -1) { n++; at = p + k.length; } return n; };

export const GROUPS = ["char", "event", "place", "echo", "post", "text"];
const TITLE_SEEN = 34; /* 標題前若干字（窄屏兩行約此數）之內的命中，標題上高亮即見 */

/* 檢索：返回 { keys, groups: { char: [...], … }, total }；查詢空返回 null。
   texts：文庫正文映射（未載入為 null，則文庫只查題名）。
   每條：{ key, kind, rank, doc, keys, snip?, n? }——標題取何文字、去往何處由界面據 doc 定 */
export function siteSearch(locale, q, texts) {
  const keys = queryKeys(q || "");
  if (keys.length === 0) return null;
  const groups = Object.fromEntries(GROUPS.map((g) => [g, []]));
  for (const d of docsFor(locale)) {
    const m = matchDoc(d, keys);
    if (!m) continue;
    const g = d.kind === "shock" ? "echo" : d.kind;
    /* 標題命中者不另出摘錄——除非命中處落在標題三十餘字之後（界面標題至多兩行，再後即截去，讀者看不到命中在哪） */
    const late = m.fld.title && span(m.fld, m.at, m.k.length)[0] > TITLE_SEEN;
    groups[g].push({ key: d.key, kind: d.kind, rank: m.rank, order: d.order, doc: d, keys, snip: m.fld.title && !late ? null : snippet(m.fld, m.at, m.k.length) });
  }
  for (const d of textDocsFor(locale, texts)) {
    const titleHit = d.fields.some((fld) => fld.w === 0 && keys.some((k) => fld.f.includes(k)));
    let n = 0, snip = null;
    if (d.body) {
      const k = keys.find((x) => d.body.f.includes(x));
      if (k) { n = countIn(d.body.f, k); snip = snippet(d.body, d.body.f.indexOf(k), k.length); }
    }
    if (!titleHit && n === 0) continue;
    groups.text.push({ key: d.key, kind: "text", rank: titleHit ? 0 : 1, order: d.order, doc: d, keys, snip, n });
  }
  let total = 0;
  for (const g of GROUPS) {
    groups[g].sort((a, b) => a.rank - b.rank || a.order - b.order);
    total += groups[g].length;
  }
  return { keys, groups, total };
}
