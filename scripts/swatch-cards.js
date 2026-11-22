// 門派色卡：玄墨、素紙各出一張 PNG，存作配色參照。
//
//   npm run swatches                  # 輸出到 swatches/（已入 .gitignore）
//   npm run swatches -- --out 某目錄   # 另指輸出目錄
//
// 做法：以 Vite 起一個臨時開發服務器，用本機的 Chrome（playwright-core 不另下瀏覽器）打開站點，
// 在頁內直接 import 站點自己的 theme.js／wiki-data.js 取色——tone、toneText、dimAccent、BAND_DARK、PAPER_TONE
// 與站點同一份，色卡與站上所見一致；每格套用小卡的 .texture-test-sm，綾邊、金線、紙紋、字體皆是站內原樣。
// 找不到 Chrome 時，以環境變量 CHROME_PATH 指向瀏覽器可執行文件。
//
// 卡上的說明文字以匯文明朝／正楷、京華老宋渲染，須在字體子集之內（scripts/font-subset-chars.txt）；
// 改動下方文案時留意，表外之字會回落系統字體。

import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const outDir = resolve(args.includes("--out") ? args[args.indexOf("--out") + 1] : "swatches");
mkdirSync(outDir, { recursive: true });

const git = (cmd) => { try { return execSync(`git ${cmd}`, { encoding: "utf8" }).trim(); } catch { return ""; } };
const sha = git("rev-parse --short HEAD") || "未知";
const dirty = git("status --porcelain -- src") !== "";
const now = new Date();
const isoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const CN = "〇一二三四五六七八九";
const cnNum = (n) => (n < 10 ? CN[n] : n < 20 ? "十" + (n % 10 ? CN[n % 10] : "") : CN[Math.floor(n / 10)] + "十" + (n % 10 ? CN[n % 10] : ""));
const cnDate = `${[...String(now.getFullYear())].map((d) => CN[d]).join("")}年${cnNum(now.getMonth() + 1)}月${cnNum(now.getDate())}日`;
const version = `版本 ${sha}${dirty ? " · 含未提交改动" : ""}`;

const server = await createServer({ logLevel: "error", server: { host: "127.0.0.1", port: 0, strictPort: false } });
await server.listen();
const url = server.resolvedUrls.local[0];
const base = server.config.base;

let browser;
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
} catch (err) {
  await server.close();
  console.error("找不到 Chrome。請安裝 Google Chrome，或以 CHROME_PATH 指向瀏覽器可執行文件，例如：");
  console.error('  CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run swatches');
  console.error(String(err.message || err).split("\n")[0]);
  process.exit(1);
}

/* 頁內：取色、疊一層色卡。返回色數 */
const BUILD = async ([skin, base, cnDate, version]) => {
  const th = await import(`${base}src/theme.js`);
  const { CHARACTERS, EVENTS, fc } = await import(`${base}src/wiki-data.js`);
  th.setSkin(skin);
  const T = th.T;
  /* 序同站內「門派色例」：按人數，同數按名；無人者（如史实）殿後，按其年表事數 */
  const members = {}, events = {};
  for (const c of CHARACTERS) for (const f of (c.belong.length ? c.belong : ["门派未标"])) members[f] = (members[f] || 0) + 1;
  for (const e of EVENTS) for (const f of e.fac || []) events[f] = (events[f] || 0) + 1;
  const order = Object.entries(members).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([f]) => f);
  for (const [f] of Object.entries(events).sort((a, b) => b[1] - a[1])) if (!order.includes(f)) order.push(f);
  const facs = order.map((f) => {
    const raw = fc(f).toUpperCase(), col = th.tone(raw);
    return { f, raw, col, txt: th.toneText(raw), members: members[f] || 0, events: events[f] || 0,
      hand: skin === "paper" && Object.prototype.hasOwnProperty.call(th.PAPER_TONE, raw),
      band: th.BAND_DARK[skin].map((d) => th.dimAccent(col, 0, d, 1)), stain: th.dimAccent(col, 0, 0, 0.07) };
  });

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const meta = (x) => (x.members === 0 ? `仅见于年表 · ${x.events} 事` : x.f === "门派未标" ? `无门派 · ${x.members} 人` : `${x.members} 人`);
  const card = (x) => `
    <div class="texture-test-sm" style="display:flex;box-sizing:border-box;background:${T.panel};border:1px solid ${T.line};border-top:3px solid ${x.col};font-family:HuiwenZhengKai;--tt-band-a:${x.band[0]};--tt-band-b:${x.band[1]};--tt-band-c:${x.band[2]};--tt-stain:${x.stain}">
      <div style="flex:1;display:flex;flex-direction:column;min-width:0">
        <div class="items-baseline" style="display:flex;align-items:baseline;gap:9px">
          <span style="font-family:HuiwenMingChao;font-size:19px;color:${T.ink}">${esc(x.f)}</span>
          <span style="font-size:11.5px;color:${T.faint}">${meta(x)}</span>
          <span style="margin-left:auto;font-size:11px;color:${x.txt};border:1px solid ${x.col}55;padding:1px 7px;border-radius:3px">${esc(x.f)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:9px">
          <span style="width:52px;height:34px;border-radius:2px;background:${x.col};flex:0 0 auto;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.08)"></span>
          <span style="display:flex;flex-direction:column;gap:3px;font-size:13px;letter-spacing:0.02em">
            <span style="color:${T.muted}">色 <span style="color:${T.ink}">${x.col}</span></span>
            <span style="color:${T.muted}">字 <span style="color:${x.txt}">${x.txt}</span></span>
          </span>
        </div>
        ${skin === "paper" ? `<div style="margin-top:auto;padding-top:6px;font-size:11px;color:${T.faint}">玄墨原色 ${x.raw} · ${x.hand ? "手定" : "自动换算"}</div>` : ""}
      </div>
    </div>`;

  document.getElementById("swatch-sheet")?.remove();
  const el = document.createElement("div");
  el.id = "swatch-sheet";
  const paperBg = skin === "paper" ? "background-image:var(--paper-grain);background-size:var(--paper-grain-size);background-blend-mode:multiply,multiply,multiply;" : "";
  el.style.cssText = `position:absolute;left:0;top:0;z-index:99999;width:1508px;box-sizing:border-box;padding:40px 46px 34px;background-color:${T.bg};${paperBg}color:${T.ink};font-family:HuiwenZhengKai`;
  el.innerHTML = `
    <div style="display:flex;align-items:baseline;gap:20px;padding-bottom:14px;margin-bottom:24px;border-bottom:1px solid ${T.line}">
      <span style="font-family:HuiwenMingChao;font-size:30px;letter-spacing:0.08em">人山人海 · 檔案</span>
      <span style="font-family:HuiwenMingChao;font-size:22px;color:${T.accent};letter-spacing:0.12em">門派色卡 · ${skin === "paper" ? "素紙" : "玄墨"}</span>
      <span style="margin-left:auto;font-family:JingHuaLaoSong;font-size:13px;color:${T.faint}">${cnDate} · ${esc(version)} · ${facs.length} 色</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">${facs.map(card).join("")}</div>
    <div style="margin-top:22px;font-family:JingHuaLaoSong;font-size:12.5px;color:${T.faint};line-height:1.8">
      色＝色条、框线、图表用色　字＝门派签字色（以 4.5:1 对卡面${skin === "paper" ? "；七秀、藏剑放宽至 3:1" : "；天策、凌雪阁、红衣教、唐军四红保留原色"}）　按人数排列，同数按名${skin === "paper" ? "　手定＝素纸专门定色，余为玄墨原色自动换算" : ""}
    </div>`;
  document.body.appendChild(el);
  window.scrollTo(0, 0);
  await Promise.all(["30px HuiwenMingChao", "13px HuiwenZhengKai", "13px JingHuaLaoSong"].map((f) => document.fonts.load(f, "人山人海檔案")));
  await document.fonts.ready;
  return facs.length;
};

try {
  for (const [skin, name] of [["night", "玄墨"], ["paper", "素纸"]]) {
    const ctx = await browser.newContext({ viewport: { width: 1508, height: 1500 }, deviceScaleFactor: 2 });
    await ctx.addInitScript((s) => localStorage.setItem("cy-skin", s), skin);
    const page = await ctx.newPage();
    await page.goto(`${url}#/chars`, { waitUntil: "networkidle" });
    const n = await page.evaluate(BUILD, [skin, base, cnDate, version]);
    await page.waitForTimeout(400);
    const file = resolve(outDir, `门派色卡-${name}-${isoDate}.png`);
    await page.locator("#swatch-sheet").screenshot({ path: file });
    console.log(`${name}：${n} 色 → ${file}`);
    await ctx.close();
  }
} finally {
  await browser.close();
  await server.close();
}
