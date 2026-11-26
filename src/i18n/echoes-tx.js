/* 余波英译查表（echoes-tx.js）：表在 echoes.en.js，經 en-bulk.js 懶載；未載時一律回落中文 */
import { echoModesEn, shocksEn, bandsEn, echoUiEn, stancesEn, stanceNotesEn, arcNotesEn } from "./en-bulk";

const look = (map, locale, zh) => {
  if (!zh || locale !== "en") return [zh, false];
  const e = map[zh];
  return e == null || e === "" ? [zh, true] : [e, false];
};
/* 皆回 [文字, 是否回落]，可直接交 <Tx>。表須在調用時讀（活绑定），不可先取存 */
export const stanceText = (locale, zh) => look(stancesEn, locale, zh);
export const stanceNoteText = (locale, zh) => look(stanceNotesEn, locale, zh);
export const arcNoteText = (locale, zh) => look(arcNotesEn, locale, zh);

export const shockTitle = (locale, s) => locale === "en" ? shocksEn[s.id]?.title ?? s.title : s.title;
export const shockGist = (locale, s) => locale === "en" ? shocksEn[s.id]?.gist ?? s.gist : s.gist;
export const shockAxis = (locale, s) => locale === "en" ? shocksEn[s.id]?.axis ?? s.axis : s.axis;
export const bandLabel = (locale, shockId, key, zh) => locale === "en" ? bandsEn[shockId]?.[key] ?? zh : zh;
export const modeText = (locale, mode) => locale === "en" ? echoModesEn[mode] ?? mode : mode;
export const echoUi = (locale, key) => locale === "en" ? echoUiEn[key] ?? key : key;
