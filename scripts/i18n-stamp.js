/* ============================================================
   英译盖戳 (scripts/i18n-stamp.js)
     npm run i18n:stamp                       给新译、未盖戳的字段盖戳（已有戳的不动）
     npm run i18n:stamp -- --restamp lvdingyi 审过之后重盖：按前缀匹配，可写到字段
                                              （lvdingyi.profile.性格、lvdingyi.anecdotes.3）
     npm run i18n:stamp -- --prune            删去已不在译文里的戳
   戳 = 盖戳当时中文原文的短哈希。中文改了，check-data 报「英文待核」；
   照新中文改好英文（或确认不必改）之后 --restamp，警告即消。
   切勿一改中文就 --restamp 全部：那等于说英文都已核过。
   ============================================================ */
import { translatedFields, readStamps, writeStamps, hashOf } from "./i18n-fields.js";

const args = process.argv.slice(2);
const restamp = args.includes("--restamp") ? args.slice(args.indexOf("--restamp") + 1).filter((a) => !a.startsWith("--")) : [];
const prune = args.includes("--prune");

const { fields, problems } = translatedFields();
for (const p of problems) console.log(`  ${p.level === "err" ? "✗" : "⚠"} ${p.key}  ${p.msg}`);
const stamps = readStamps();
let added = 0, redone = 0, removed = 0;
const live = new Set(fields.map((f) => f.key));
for (const f of fields) {
  const h = hashOf(f.zh);
  if (!(f.key in stamps)) { stamps[f.key] = h; added++; }
  else if (restamp.some((p) => f.key === p || f.key.startsWith(`${p}.`)) && stamps[f.key] !== h) { stamps[f.key] = h; redone++; }
}
if (prune) for (const k of Object.keys(stamps)) if (!live.has(k)) { delete stamps[k]; removed++; }
writeStamps(stamps);
console.log(`i18n:stamp：新盖 ${added} · 重盖 ${redone}${prune ? ` · 删去 ${removed}` : ""} · 共 ${Object.keys(stamps).length} 戳`);
