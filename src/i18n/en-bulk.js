/* ============================================================
   英文大宗覆蓋層（en-bulk.js）：檔案、年表、余波、編制、任期五表懶載
   五表（characters / events / echoes / posts / tenures .en.js）合計八百餘 KB，
   原與中文數據同在主包，中文讀者也要全數下載。今另成一塊（en-bulk-data.js），
   只在英文界面才載：
     - 直達英文頁：main.jsx 先等此塊載完再繪製（en/index.html 另有 modulepreload，與主包並行下載）；
     - 站內由中文換英文、或前進後退回到英文頁：use-language.js 先載此塊，載完才換。
   各表以 let 導出，載入後就地換值；ES 模塊導出是活绑定，content.js、posts-content.js、
   echoes-tx.js 諸查表函數照舊直接取用，不必改調用處。未載之前各表為空，查表一律回落中文。
   check-data 等腳本直接讀各 .en.js，不經此處。
   ============================================================ */
export let charactersEn = {};
export let eventsEn = {};
export let tenureNotesEn = {};
export let postsEn = {}, groupsEn = {}, ranksEn = {}, marksEn = {}, honoursEn = {};
export let echoModesEn = {}, shocksEn = {}, bandsEn = {}, echoUiEn = {}, stancesEn = {}, stanceNotesEn = {}, arcNotesEn = {};
export let enBulkReady = false;

let pending = null;
/* 多次調用共用同一 Promise；載入失敗則清掉，下次再試（其間查表回落中文） */
export function loadEnBulk() {
  pending ||= import("./en-bulk-data.js").then(
    (m) => {
      ({ charactersEn, eventsEn, tenureNotesEn, postsEn, groupsEn, ranksEn, marksEn, honoursEn,
        echoModesEn, shocksEn, bandsEn, echoUiEn, stancesEn, stanceNotesEn, arcNotesEn } = m);
      enBulkReady = true;
    },
    (err) => { pending = null; throw err; },
  );
  return pending;
}
