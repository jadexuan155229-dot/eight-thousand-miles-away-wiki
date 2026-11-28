/* ============================================================
   繁→简 檢索對照表 (scripts/t2s-table.js)
   界面用繁體、資料用簡體：讀者照著繁體占位語打「雁門關」，資料裡只有「雁门关」。
   檢索時把查詢逐字轉簡再試一次（src/i18n/t2s.js），所需對照表即本腳本所裁：
     全表 scripts/t2s-full.txt（OpenCC 生成，三千七百餘對）→ 只留「簡體一側見於站內」者
     → src/i18n/t2s-table.js（千餘對，隨主包發出）。
   站內未用之簡字，其繁體查了也必無所得，故不必帶。
     - 直接執行：重裁並寫入 src/i18n/t2s-table.js（npm run t2s）
     - 只查不寫：表與站內用字不合即列出並以 exit 1 退出（CI 用，見 .github/workflows/checks.yml）
       node scripts/t2s-table.js --check
   站內新添之字若有繁體異寫，跑一次 npm run t2s 即可；不跑亦不出錯，只是那幾個字的繁體查不到。
   src/i18n/t2s-table.js 之繁體字只供比對、從不顯示，故字體子集不收（見 font-chars.js SKIP）。
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { siteChars } from "./font-chars.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FULL = join(ROOT, "scripts", "t2s-full.txt");
export const T2S_TABLE = join(ROOT, "src", "i18n", "t2s-table.js");

export function buildTable() {
  const have = siteChars(); /* 不含 t2s-table.js 自身（font-chars SKIP），免表中繁字反過來撐大本表 */
  const pairs = [];
  for (const line of readFileSync(FULL, "utf8").split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const cs = Array.from(line);
    for (let i = 0; i + 1 < cs.length; i += 2) if (have.has(cs[i + 1])) pairs.push(cs[i] + cs[i + 1]);
  }
  const rows = [];
  for (let i = 0; i < pairs.length; i += 32) rows.push(`  "${pairs.slice(i, i + 32).join("")}",`);
  return `/* 自動生成，勿手改：npm run t2s（scripts/t2s-table.js 據 scripts/t2s-full.txt 裁出站內所需者）。
   每對兩字，前繁後簡；共 ${pairs.length} 對。用法見 t2s.js */
export const T2S_PAIRS = [
${rows.join("\n")}
].join("");
`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const want = buildTable();
  let cur = "";
  try { cur = readFileSync(T2S_TABLE, "utf8"); } catch { /* 尚無此檔 */ }
  if (cur === want) {
    console.log("t2s：繁簡對照表與站內用字相合");
  } else if (process.argv.includes("--check")) {
    console.error("t2s：繁簡對照表與站內用字不合（站內添了新字，或表被手改）。");
    console.error("改法：跑 npm run t2s，提交 src/i18n/t2s-table.js。");
    process.exit(1);
  } else {
    writeFileSync(T2S_TABLE, want);
    console.log(`t2s：已重裁 src/i18n/t2s-table.js（${want.match(/共 (\d+) 對/)[1]} 對）`);
  }
}
