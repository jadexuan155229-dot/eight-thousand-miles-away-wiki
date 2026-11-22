// 前進後退與語言：網址路徑（站根＝中文，en/＝英文）、<html lang>、界面三者須一致。
//
//   npm run check:history
//
// 站內切換語言以 replaceState 換路徑，此前諸條歷史記錄仍是舊語言之路徑；前進後退
// 若不重讀路徑，退回舊條目時界面會停在新語言（見 src/i18n/use-language.js）。
// 本檔以 Vite 起臨時開發服務器、用本機 Chrome 走三組前進後退，逐步比對三者；
// 有一步不合即 exit 1。做法同 og-image.js：找不到 Chrome 時以 CHROME_PATH 指定。

import { createServer } from "vite";
import { chromium } from "playwright-core";

const server = await createServer({ logLevel: "error", server: { host: "127.0.0.1", port: 0, strictPort: false } });
await server.listen();
const url = server.resolvedUrls.local[0]; /* 已含 base */
const BASE = new URL(url).pathname;

let browser;
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
} catch (err) {
  await server.close();
  console.error("找不到 Chrome。請安裝 Google Chrome，或以 CHROME_PATH 指向瀏覽器可執行文件。");
  console.error(String(err.message || err).split("\n")[0]);
  process.exit(1);
}

let bad = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => { try { sessionStorage.setItem("cy-landing-seen", "1"); } catch { /* 無妨 */ } });

  const check = async (tag) => {
    const s = await page.evaluate(() => ({
      path: location.pathname, hash: location.hash, lang: document.documentElement.lang,
      h1: document.querySelector("h1")?.textContent || "",
    }));
    const urlLang = s.path.startsWith(`${BASE}en/`) ? "en" : "zh";
    const uiLang = /Characters/.test(s.h1) ? "en" : "zh";
    const ok = urlLang === uiLang && s.lang === uiLang;
    if (!ok) bad++;
    console.log(`${ok ? "  合" : "✗ 不合"}  ${tag.padEnd(22)} ${s.path.slice(BASE.length - 1)}${s.hash}  網址 ${urlLang} · html ${s.lang} · 界面 ${uiLang}`);
  };
  const settle = () => page.waitForTimeout(500);
  const open = async (path) => { await page.goto(`${url}${path}`, { waitUntil: "networkidle" }); await settle(); };
  const nav = async (tab) => { await page.evaluate((t) => { location.hash = `#/${t}`; }, tab); await settle(); };
  const switchTo = async (label) => {
    await page.locator("button").filter({ hasText: /^(語言|语言|Language)/ }).first().click();
    await page.getByText(label, { exact: true }).first().click();
    await settle();
  };
  const back = async () => { await page.goBack(); await settle(); };
  const forward = async () => { await page.goForward(); await settle(); };

  console.log("一、中文兩頁，第二頁換英文，後退、前進");
  await open("#/chars"); await check("中文 人物");
  await nav("timeline"); await check("中文 年表");
  await switchTo("English"); await check("換英文");
  await back(); await check("後退");
  await forward(); await check("前進");

  console.log("二、英文兩頁，第二頁換中文，後退、前進");
  await open("en/#/chars"); await check("英文 人物");
  await nav("map"); await check("英文 輿圖");
  await switchTo("中文"); await check("換中文");
  await back(); await check("後退");
  await forward(); await check("前進");

  console.log("三、來回換兩次，退到底再進到底，末了刷新");
  await open("#/chars"); await check("中文 人物");
  await switchTo("English"); await check("換英文");
  await nav("network"); await check("英文 行星");
  await switchTo("中文"); await check("換中文");
  await nav("community"); await check("中文 群像");
  for (let i = 1; i <= 2; i++) { await back(); await check(`後退 ${i}`); }
  await page.reload({ waitUntil: "networkidle" }); await settle(); await check("刷新");
  for (let i = 1; i <= 2; i++) { await forward(); await check(`前進 ${i}`); }
} finally {
  await browser.close();
  await server.close();
}
console.log(bad ? `check:history：${bad} 步不合` : "check:history：前進後退各步，網址、html lang、界面三者一致");
process.exit(bad ? 1 : 0);
