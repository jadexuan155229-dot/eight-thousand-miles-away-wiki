/* ============================================================
   哈希路由 (router.js) —— 不引路由庫
   哈希為唯一事實源：頁籤、檔案彈窗、文庫章節均由此派生，
   刷新不丟、鏈接可分享、瀏覽器前進後退可用。
   體例：
     #/<頁籤>            chars / posts / timeline / map / network / community / echoes / novel
                         （posts＝人物檔案之「編制」子視圖，導航上仍亮「人物檔案」）
     #/<頁籤>/<人物id>    非文庫頁籤第二段＝打開的檔案彈窗
     #/posts[/<門派>][/<人物id>]   編制圖：門派段用拼音（cangyun / tiance），
                                     省略即苍云——舊鏈接 #/posts、#/posts/<人物id> 照舊可用
     #/novel/<線>/<章>[/<子章>]   文庫章節，同 FLAT 路徑
     #/echoes[/<震源id>[/<人物id>]]  余波頁：第二段＝震源，第三段＝選中之行（不開檔案彈窗，
                                     查看檔案走 #/chars/<人物id>）
   未知頁籤回落 chars；文庫路徑不編碼人物（入文庫即收檔案彈窗）。
   ============================================================ */
export const TABS = ["chars", "posts", "timeline", "map", "network", "community", "echoes", "novel"];
/* 編制圖門派 ↔ 哈希段。人物 id 不得與此重名（check-data 校驗） */
export const POST_FAC_SLUG = { 苍云: "cangyun", 天策: "tiance" };
const SLUG_FAC = Object.fromEntries(Object.entries(POST_FAC_SLUG).map(([f, s]) => [s, f]));

export function parseRoute(h) {
  const seg = (h || "")
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean)
    .map((s) => { try { return decodeURIComponent(s); } catch { return s; } });
  const tab = TABS.includes(seg[0]) ? seg[0] : "chars";
  if (tab === "novel") return { tab, char: null, novelPath: seg.length > 1 ? seg.slice(1).join("/") : null };
  if (tab === "echoes") return { tab, char: null, novelPath: null, shock: seg[1] || null, who: seg[2] || null };
  if (tab === "posts") {
    const fac = SLUG_FAC[seg[1]];
    return fac ? { tab, fac, char: seg[2] || null, novelPath: null } : { tab, fac: "苍云", char: seg[1] || null, novelPath: null };
  }
  return { tab, char: seg[1] || null, novelPath: null };
}

export function routeHash(r) {
  if (r.tab === "novel") return r.novelPath ? `#/novel/${r.novelPath}` : "#/novel";
  if (r.tab === "echoes") return r.shock ? (r.who ? `#/echoes/${r.shock}/${r.who}` : `#/echoes/${r.shock}`) : "#/echoes";
  if (r.tab === "posts") {
    const f = r.fac && r.fac !== "苍云" ? `/${POST_FAC_SLUG[r.fac]}` : "";
    return `#/posts${f}${r.char ? `/${r.char}` : ""}`;
  }
  return r.char ? `#/${r.tab}/${r.char}` : `#/${r.tab}`;
}
