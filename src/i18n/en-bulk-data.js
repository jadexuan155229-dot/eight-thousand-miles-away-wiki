/* 英文大宗覆蓋層之實體：僅經 en-bulk.js 的 loadEnBulk() 動態 import 觸及，Vite 故切成獨立塊、不入主包 */
export { charactersEn } from "./characters.en.js";
export { eventsEn } from "./events.en.js";
export { tenureNotesEn } from "./tenures.en.js";
export { postsEn, groupsEn, ranksEn, marksEn, honoursEn } from "./posts.en.js";
export { echoModesEn, shocksEn, bandsEn, echoUiEn, stancesEn, stanceNotesEn, arcNotesEn } from "./echoes.en.js";
