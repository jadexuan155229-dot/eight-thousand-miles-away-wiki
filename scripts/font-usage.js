// 三枚中文字體在站上實際用到哪些字（scripts/font-usage.js）
//
//   node scripts/font-usage.js      → 寫 scripts/font-usage.json
//
// 字體切片（scripts/subset-fonts.py --reslice）據此排字：每枚字體各自按「出現在幾個頁面上」排先後，
// 頁頁都有的界面用字、人名地名進前幾片，只在一兩頁出現的字排後面——瀏覽器只下頁上用到的那幾片，
// 常見頁面因而只需前面幾片。源碼字頻排不出這個：界面用字在源碼裡只出現一兩次，卻在每一頁上。
// 做法同 history-check.js：以 Vite 起臨時開發服務器、用本機 Chrome 逐頁打開
// （中英兩版的各頁籤、編制三門、余波各震源、每份檔案彈窗、文庫各章），
// 讀每個文字節點的實際字族，記每枚字體每個字出現在幾頁上。找不到 Chrome 時以 CHROME_PATH 指定。
// 只在要整套重切時跑；平常補字（npm run fonts）不必。

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { chromium } from "playwright-core";
import { CHARACTERS } from "../src/wiki-data.js";
import { SHOCKS } from "../src/echoes-data.js";
import { FLAT } from "../src/novel/index.js";
import { POST_FAC_SLUG } from "../src/router.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "scripts", "font-usage.json");
const FAMILIES = ["HuiwenZhengKai", "HuiwenMingChao", "JingHuaLaoSong"];

const server = await createServer({ logLevel: "error", server: { host: "127.0.0.1", port: 0, strictPort: false } });
await server.listen();
const url = server.resolvedUrls.local[0];

let browser;
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
} catch (err) {
  await server.close();
  console.error("找不到 Chrome。請安裝 Google Chrome，或以 CHROME_PATH 指向瀏覽器可執行文件。");
  console.error(String(err.message || err).split("\n")[0]);
  process.exit(1);
}

/* 頁面清單：[語言前綴, 哈希]；空哈希＝卷首 */
const hashes = [
  "", "#/chars", "#/timeline", "#/map", "#/network", "#/community", "#/echoes", "#/novel",
  ...Object.values(POST_FAC_SLUG).map((s) => `#/posts/${s}`),
  ...SHOCKS.map((s) => `#/echoes/${s.id}`),
  ...CHARACTERS.map((c) => `#/chars/${c.id}`),
];
const pages = [
  ...hashes.map((h) => ["", h]),
  ...[...hashes, "#/about"].map((h) => ["en/", h]),
  ...FLAT.filter((f) => f.ch.file).map((f) => ["", `#/novel/${f.path}`]), /* 正文中英同，只走一遍 */
];

const usage = Object.fromEntries(FAMILIES.map((f) => [f, {}]));
let done = 0;
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("cy-landing-seen", "1"); } catch { /* 無妨 */ } });
  const seen = await ctx.newPage();
  for (const [pre, hash] of pages) {
    /* 卷首另開一個無痕上下文（不帶「已看過卷首」），其餘頁共用一頁 */
    const fresh = hash === "" ? await browser.newContext({ viewport: { width: 1280, height: 900 } }) : null;
    const page = fresh ? await fresh.newPage() : seen;
    if (!fresh) await page.goto("about:blank");
    await page.goto(new URL(pre + hash, url).href, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const got = await page.evaluate((fams) => {
      const per = Object.fromEntries(fams.map((f) => [f, new Set()]));
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        const el = n.parentElement;
        if (!el) continue;
        const cs = getComputedStyle(el);
        if (cs.display === "none") continue;
        const fam = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
        if (!per[fam]) continue;
        for (const ch of n.textContent) if (ch.codePointAt(0) > 0x7f) per[fam].add(ch);
      }
      return Object.fromEntries(Object.entries(per).map(([f, s]) => [f, [...s].join("")]));
    }, FAMILIES);
    for (const f of FAMILIES) for (const ch of got[f]) usage[f][ch] = (usage[f][ch] || 0) + 1;
    if (fresh) await fresh.close();
    if (++done % 50 === 0) console.log(`font-usage：已讀 ${done}/${pages.length} 頁`);
  }
} finally {
  await browser.close();
  await server.close();
}

writeFileSync(OUT, JSON.stringify({ pages: pages.length, fonts: usage }) + "\n");
console.log(`font-usage：${pages.length} 頁；` + FAMILIES.map((f) => `${f} ${Object.keys(usage[f]).length} 字`).join("，") + ` → scripts/font-usage.json`);
