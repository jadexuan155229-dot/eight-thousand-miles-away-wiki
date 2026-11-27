/* 定場僅攔「裸址直達」：帶哈希深鏈（自分享而來）與同會話再訪皆直入站內。
   App.jsx（是否先顯定場）與 main.jsx（英文頁是否先等英文大表）共用此判斷 */
export function wantLanding() {
  if (/#\/./.test(window.location.hash)) return false
  try {
    if (sessionStorage.getItem('cy-landing-seen')) return false
  } catch { /* 讀不到就當首訪 */ }
  return true
}
