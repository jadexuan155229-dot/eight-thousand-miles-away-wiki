// 鏈接預覽圖：截站內人物檔案首頁，存作 public/og-en.png（英文）或 public/og.png（中文）。
//
//   npm run og            # 英文：public/og-en.png（en/index.html 引用）
//   npm run og -- zh      # 中文：public/og.png（會覆蓋現有中文預覽圖，慎用）
//
// 做法同 swatch-cards.js：以 Vite 起臨時開發服務器，用本機 Chrome（playwright-core 不另下瀏覽器）打開，
// 1200×630 截首屏。跳過入站定場（sessionStorage），等字體載畢再截。
// 英譯推進後（人名、卷首譯出）重跑一次即可，不必手工截圖。
// 找不到 Chrome 時，以環境變量 CHROME_PATH 指向瀏覽器可執行文件。

import { resolve } from "node:path";
import { createServer } from "vite";
import { chromium } from "playwright-core";

const zh = process.argv.slice(2).includes("zh");
const out = resolve("public", zh ? "og.png" : "og-en.png");

const server = await createServer({ logLevel: "error", server: { host: "127.0.0.1", port: 0, strictPort: false } });
await server.listen();
const url = server.resolvedUrls.local[0]; /* 已含 base：http://127.0.0.1:端口/eight-thousand-miles-away-wiki/ */

let browser;
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
} catch (err) {
  await server.close();
  console.error("找不到 Chrome。請安裝 Google Chrome，或以 CHROME_PATH 指向瀏覽器可執行文件。");
  console.error(String(err.message || err).split("\n")[0]);
  process.exit(1);
}

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => { try { sessionStorage.setItem("cy-landing-seen", "1"); } catch { /* 無妨 */ } });
  await page.goto(`${url}${zh ? "" : "en/"}#/chars`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: out });
  console.log(`og：已存 ${out}`);
} finally {
  await browser.close();
  await server.close();
}
