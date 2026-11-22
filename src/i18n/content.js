/* ============================================================
   內容英译查表（content.js）
   數據層（wiki-data.js 等）只存中文；英文另成覆蓋層（*.en.js），按此處諸函數取用。
   通則：英文界面下有译文則用译文，無則原樣回落中文——逐字段回落，不整卡回落。
   回落之處在 HTML 中以 <Zh>（zh.jsx）包起，標 lang="zh"、class="zh-src"，
   英文字族覆寫不及之（見 index.css「英文界面」一節）。SVG 文字只回字串，不包。
   ============================================================ */
import { charactersEn } from "./characters.en";
import { factionsEn } from "./factions.en";
import { placesEn } from "./places.en";
import { relationsEn } from "./relations.en";
import { eventsEn } from "./events.en";
import { novelEn } from "./novel.en";

const EN = (locale) => locale === "en";
const has = (v) => v != null && v !== "";

/* ---------- 人物 ---------- */
export const charEn = (locale, id) => (EN(locale) ? charactersEn[id] ?? null : null);
/* 有英文名則英文名，無則中文名（列表、圖上用；檔案卡標題另並列漢字） */
export const charName = (locale, c) => (EN(locale) && has(charactersEn[c.id]?.name) ? charactersEn[c.id].name : c.name);
export const hasEnName = (locale, c) => EN(locale) && has(charactersEn[c.id]?.name);
/* 單字段：返回 [文字, 是否回落中文] */
export function charField(locale, c, key) {
  const v = EN(locale) ? charactersEn[c.id]?.[key] : null;
  return has(v) ? [v, false] : [c[key], EN(locale)];
}
export function profileRow(locale, c, label, zh) {
  const v = EN(locale) ? charactersEn[c.id]?.profile?.[label] : null;
  return has(v) ? [v, false] : [zh, EN(locale) && has(zh)];
}
/* 軼事、高光：按下標對齊中文；回 [[文字, 是否回落], …]。
   英译作 false＝有意不译（作者按、寫給自己的備忘之類，作者 2026-11-22 定）：英文界面略去此條，不回落中文 */
export function listField(locale, c, key) {
  const en = EN(locale) ? charactersEn[c.id]?.[key] : null;
  return (c[key] || [])
    .map((zh, i) => (en?.[i] === false ? null : has(en?.[i]) ? [en[i], false] : [zh, EN(locale)]))
    .filter(Boolean);
}

/* ---------- 名號：字、本名、波斯语名、日文读法、汉名（作者 2026-11-22 定） ----------
   數據層 c.zi 只放漢式表字；其餘名號放 c.names = [[標籤, 值], …]：
     本名     明教波斯人、苗人之原名（Rukh、Nof Langb Chib）——漢名乃後取或音译
     波斯语名 以漢名為主、另有波斯語名者（程骞、程宇、唐煦、唐熙）
     日文读法 日本人物之名的日語讀法（岚川云 Arashikawa Kumo、阿辉 Hikaru）
     汉名     入中土後所取漢名（春山遥入蓬莱後之方遥）
   顯示次序：汉名、字、其餘。 */
export { NAME_LABELS, ALT_LABELS } from "./name-labels";
export function nameItems(c) {
  const ns = c.names || [];
  return [...ns.filter(([k]) => k === "汉名"), ...(c.zi ? [["字", c.zi]] : []), ...ns.filter(([k]) => k !== "汉名")];
}
/* 供檢索：諸名號之值連成一串 */
export const namesText = (c) => nameItems(c).map(([, v]) => v).join(" ");
/* 英文：[標籤, 值, 是否回落中文]。
   字、汉名查覆蓋層（zi、names.汉名），無則回落；拉丁字母之名號原樣用。
   名號之值即英文名者略去（苗人本名、林叶矢與春山遥之日文读法已作英文名，免重出）。
   覆蓋層另可有 alt：[[標籤, 值]]，只在英文出（今無人用）。
   岚川云、岚川靖彦、阿辉英文名用中文读法（Lanchuan Yun、Lanchuan Jingyan、Ahui），日文读法只在名號一行出
   （Notion 方针 P12；作者 2026-11-22 重申：正文一律中文读法）。 */
export function nameItemsEn(c) {
  const tr = charactersEn[c.id] || {};
  const same = (v) => has(tr.name) && v.toLowerCase() === tr.name.toLowerCase();
  const out = [];
  for (const [k, v] of nameItems(c)) {
    if (k === "字") out.push(has(tr.zi) ? [k, tr.zi, false] : [k, v, true]);
    else if (k === "汉名") out.push(has(tr.names?.汉名) ? [k, tr.names.汉名, false] : [k, v, true]);
    else if (!same(v)) out.push([k, v, /[\u4e00-\u9fff]/.test(v)]);
  }
  for (const [k, v] of tr.alt || []) out.push([k, v, false]);
  return out;
}

/* 名號一行出不出：英文下名號皆已併入英文名者不出（見 names.jsx） */
export const hasCourtesyLine = (locale, c) => (EN(locale) ? nameItems(c).length === 0 || nameItemsEn(c).length > 0 : true);

/* ---------- 門派、地名、關係類型 ---------- */
export const facName = (locale, f) => (EN(locale) ? factionsEn[f] ?? f : f);
export const placeName = (locale, l) => (EN(locale) ? placesEn[l] ?? l : l);
export const hasPlace = (locale, l) => EN(locale) && has(placesEn[l]);
export const relName = (locale, t) => (EN(locale) ? t.split("·").map((p) => relationsEn[p] ?? p).join(" · ") : t);
export const hasRel = (locale, t) => EN(locale) && t.split("·").every((p) => has(relationsEn[p]));

/* ---------- 年表 ---------- */
export const eventTitle = (locale, e) => (EN(locale) ? eventsEn[e.title] ?? e.title : e.title);
export const hasEventTitle = (locale, e) => EN(locale) && has(eventsEn[e.title]);

/* ---------- 文庫結構 ---------- */
const NUM = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
export function novelTitle(locale, zh) {
  if (!EN(locale) || !zh) return zh;
  if (has(novelEn[zh])) return novelEn[zh];
  const m = zh.match(/^第([一二三四五六七八九十])章$/);
  return m ? `Chapter ${NUM.indexOf(m[1]) + 1}` : zh;
}
export const hasNovelTitle = (locale, zh) => EN(locale) && novelTitle(locale, zh) !== zh;

/* ---------- 覆蓋計數（頁頭說明、check-data 共用） ---------- */
export function coverage(CHARACTERS, EVENTS) {
  const ids = new Set(CHARACTERS.map((c) => c.id));
  const tr = Object.entries(charactersEn).filter(([id]) => ids.has(id));
  return {
    characters: CHARACTERS.length,
    names: tr.filter(([, x]) => has(x.name)).length,
    profiles: tr.filter(([, x]) => x.profile && Object.values(x.profile).some(has)).length,
    events: EVENTS.length,
    eventTitles: EVENTS.filter((e) => has(eventsEn[e.title])).length,
  };
}
