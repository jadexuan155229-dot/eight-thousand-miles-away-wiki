import { useState, useEffect } from "react";

/* 全站視覺常量：宋體字族與底色板，自 wiki.jsx 抽出以供諸視圖共用 */
export const serif = '"Songti SC","Noto Serif SC","Noto Serif CJK SC","SimSun",serif';

/* ══ 皮膚 ══════════════════════════════════════════════════════════════
   兩套色板，鍵名一一對應：
     玄墨 night —— 原深色底，數值一字未改；
     素紙 paper —— 米白宣紙底，取敦煌配色「焦糖栗子泥」五色：
       焦糖栗 #7B3C1B（原圖標作 #26081c，係誤標；此為取樣實色）→ 全站高亮
       石綠   #7C8D56 → 選區、河道
       灰     #A7A39D → 中性（門派未標、未遂之類）
       杏黃   #FDCD8F → 懸停、檢索命中之淡染
       駝     #BC9674 → 分隔線、金線
   T 是活對象：換膚時就地改寫其值（Object.assign），故諸處 `${T.line}44`
   這類十六進位拼透明度的寫法照常可用，dimAccent 等解析 hex 的函數亦不受影響。
   換膚不重掛組件：Wiki 訂閱皮膚，整棵重渲染，篩選、輿圖、年表、閱讀位置等狀態原樣保留。
   代價是兩條規矩——
     一、模塊頂層不可把 T 的值（或 fc、tone 的結果）抄進常量，換膚後便成舊值；
         取 T 之樣式一律寫在渲染期，或寫成函數（如文庫的 rowLabel、navBtn）；
     二、useMemo／useState 裡不可緩存算好的顏色：存原色，取用時再 tone()
         （如輿圖動線 tracks、編制圖 colorOf）。
   T 只放十六進位色（可拼透明度者）；整串 rgba、陰影之類另置 T 的 x 開頭諸鍵，不可再拼。 */
const NIGHT = {
  bg: "#15181D", panel: "#1D2229", panelHi: "#232A33", line: "#2E3640",
  ink: "#E7E2D6", muted: "#8B94A0", faint: "#5B6470",
  accent: "#B5442D", /* 全站高亮：橘红 */
  seal: "#A13B4B",   /* 品評印章：復古胭脂紅，別於高亮橘紅與天策暗紅 */
  onAccent: "#E7E2D6", /* 高亮底、印底上的字 */
  neutral: "#3A424D",  /* 門派未標之類的中性條 */
  onBar: "#15181D",    /* 編制圖實授色帶上的字 */
  river: "#5B7A93",    /* 輿圖河道 */
  hit: "#B5442D55",    /* 檢索命中淡染（已含透明度） */
  xBackdrop: "rgba(10,12,15,.72)",                 /* 彈窗遮罩 */
  xShadow: "0 8px 28px rgba(0,0,0,0.4)",           /* 浮卡陰影 */
  xShadowTip: "0 4px 18px rgba(0,0,0,.45)",        /* 浮簽陰影 */
  xShadowSheet: "0 2px 20px rgba(0,0,0,0.4)",      /* 文庫紙面陰影 */
  xWash: "rgba(255,255,255,0.045)",                /* 目錄懸停淡染 */
  xWashLift: "0 8px 24px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.045)",
  xScrollThumb: "#5B6470", xScrollThumbHi: "#788493", xScrollTrack: "#171B21",
  xScrollTrackSoft: "rgba(255,255,255,0.035)",
};
const PAPER = {
  bg: "#F1E9DA", panel: "#F8F3E8", panelHi: "#F8EAD4", line: "#D6C4A8",
  ink: "#2D221A", muted: "#6E5D4D", faint: "#958370",
  accent: "#8B401E", /* 焦糖栗：取樣實色 #7B3C1B 略提一分明度，作高亮不致發悶 */
  seal: "#A13B4B",   /* 胭脂印不換：紙上鈐朱，本是原物 */
  onAccent: "#F6EFE2",
  neutral: "#A7A39D",
  onBar: "#2D221A",
  river: "#6F8D7A",  /* 石綠偏青：青綠山水之水色 */
  hit: "#FDCD8FB0",  /* 杏黃 */
  xBackdrop: "rgba(58,40,26,.34)",
  xShadow: "0 8px 26px rgba(92,62,32,0.16), 0 1px 3px rgba(92,62,32,0.10)",
  xShadowTip: "0 4px 16px rgba(92,62,32,.18)",
  xShadowSheet: "0 2px 18px rgba(92,62,32,0.14)",
  xWash: "rgba(188,150,116,0.10)",
  xWashLift: "0 6px 18px rgba(92,62,32,0.12), 0 0 0 1px rgba(188,150,116,0.28)",
  xScrollThumb: "#C9B394", xScrollThumbHi: "#BC9674", xScrollTrack: "#EAE0CD",
  xScrollTrackSoft: "rgba(120,90,60,0.06)",
};
export const SKINS = { night: NIGHT, paper: PAPER };
export const SKIN_KEY = "cy-skin";

const readSkin = () => {
  try { return window.localStorage.getItem(SKIN_KEY) === "paper" ? "paper" : "night"; }
  catch { return "night"; }
};
let skin = typeof window !== "undefined" ? readSkin() : "night";
export const T = { ...SKINS[skin] };

/* 文檔層：<html data-skin> 供 index.css 的素紙段落圈定；地址欄色隨之 */
function applyDocument(k) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.skin = k;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", SKINS[k].bg);
}
applyDocument(skin);

const listeners = new Set();
export const getSkin = () => skin;
export function setSkin(k) {
  if (!SKINS[k] || k === skin) return;
  skin = k;
  Object.assign(T, SKINS[k]);
  toneCache.clear();
  inkCache.clear();
  applyDocument(k);
  try { window.localStorage.setItem(SKIN_KEY, k); } catch { /* 存不下：本次會話內照常切換 */ }
  listeners.forEach((f) => f(k));
}
export function useSkin() {
  const [s, set] = useState(skin);
  useEffect(() => {
    listeners.add(set);
    set(skin); /* 掛載前若已換膚，補一次 */
    return () => listeners.delete(set);
  }, []);
  return [s, setSkin];
}

/* 隨膚調色：門派色、關係色、動線色原為暗底而定（多處注明「暗底上可辨」），
   淺色者直落米白紙上會發虛。玄墨下原樣返回；素紙下：
   一、明度按比例壓縮，不是一刀切。初版把對比不足 3:1 者各自壓暗到恰好 3:1——
       同一底色上等對比即等明度，凡被壓者全落在同一明度，暗底上靠深淺區分的諸色
       （少林檀金／藏劍金黃／萬靈鸷金、西域／狼牙、明教／史實）在紙上幾乎並成一色。
       今在 OKLCH 裡把明度 L ∈ [0.45, 0.786]（0.786 即最淺之門派色）線性壓進 [0.45, 0.625]，
       L ≤ 0.45 者不動；色相不動，彩度只在出色域時才收。暗底上的深淺次序遂在紙上保住。
   二、壓完仍不足 3:1 者再降明度補足（3:1 為字色底線）。
   三、少數色手定，見 PAPER_TONE。
   輸出仍為六位 hex，可照常拼透明度、可交 dimAccent 解析。 */
const PAPER_TONE = {
  /* 藏劍、萬靈：暗底上兩色本就只隔一層色相（銀杏柠黃 vs 琥珀鸷金），明度相近，
     壓縮之後仍嫌太近；且紙上守 3:1 的最飽和黃只得一種發綠的暗黃，「金」意全失。
     故手定：藏劍取暖金、放寬到 2.6:1（黃色系在淺底上本出不了高對比，以色相換辨識）；
     萬靈往琥珀橙推一步、仍守 3:1。與明教、西域、少林諸鄰色皆拉開 */
  "#DBB53C": "#B08E05", /* 藏劍 */
  "#E3A81C": "#BD7200", /* 萬靈 */
  /* 紅色一族：凌雪阁、天策、红衣教三色暗底上同在 L≈0.42、色相只差十度上下（天策—凌雪阁色差 0.032，
     暗底亦然——其後玄墨的凌雪阁、红衣教亦已調開，見 wiki-data.js），紙上深色更易並看；且素紙高亮換作焦糖栗後，與唐军只差 0.025（暗底上唐军原本特意別於高亮橘红），
     南诏亦被壓近胭脂印。故五色手定，各守原注之性——
       凌雪阁 凝血玄绛：最暗最冷，偏紫；红衣教 黑血赤：沉黑、正红高饱和；
       天策 暗酒红：居中，與原色幾無二致；唐军 砖赭红：提亮、帶橙，遠離高亮與印；
       南诏 山茶红：最明、更艳。
     連同印、高亮與七秀、史实、明教諸鄰色，最近一對由 0.025 拉開到 0.058 */
  "#811A50": "#701241", /* 凌雪阁（玄墨原色 2026-11 由 #7D2440 調為 #811A50） */
  "#7E3038": "#832C40", /* 天策 */
  "#9E170C": "#710E07", /* 红衣教（玄墨原色 2026-11 由 #8E1E22 調為 #9E170C） */
  "#9C4E38": "#B14935", /* 唐军 */
  "#C94F63": "#C23D5C", /* 南诏 */
  /* 七秀 锦鲤粉：粉感靠高明度、中彩度撐著，守 3:1 一壓便成灰玫瑰，粉調全失。
     故同藏劍之例放寬到 2.5:1，色相守暗底上的粉中帶一點锦鲤暖（≈16°）。 */
  "#E08389": "#DC747E", /* 七秀 */
  /* 壓縮之後仍嫌近的三對（紙上色差約為暗底的一半多）：
     明教—史实：明教往焰紅推一步（史实不動，周遭唐军、丐帮、少林已擠，動之無益）；
     蓬莱—段氏：蓬莱偏青綠海潮、段氏守淺淡偏藍之霧（放寬到 3.0 邊上）；
     苍云—无门派：无门派去盡藍調、作真中性灰，與苍云冷鐵色分開（苍云不動）。 */
  "#D07A2E": "#BA5D1D", /* 明教 */
  "#7FA9B4": "#558B8E", /* 蓬莱 */
  "#9FB8CB": "#7389A1", /* 段氏 */
  "#858B93": "#838280", /* 无门派（fc 回退色） */
  /* 唐门（作者要更明顯的孔雀藍）：深潭藍經壓縮後彩度只剩 0.076，紙上成了灰藍。
     今色相往青移（233° → 222°），彩度推到 sRGB 在此明度下的上限（約 0.100），明度提到 0.54，
     落在纯阳正藍與长歌翠羽青之間。初定 L 0.52（#007495），再亮便撞长歌；长歌往綠讓開之後再提一檔。
     今與鲜卑隔 0.067、纯阳 0.069、药宗 0.075、长歌 0.077 */
  "#38718F": "#007B98", /* 唐门 */
  /* 长歌 翠羽青（作者要再綠一點）：壓縮後落在 206°，紙上偏青藍、與唐门孔雀藍相鄰。
     今往綠移到 194°、略提明度（0.57 → 0.60），翠羽更見；與蓬莱隔 0.045、药宗 0.057，與唐门拉開到 0.076 以上 */
  "#3BA8B4": "#049392", /* 长歌 */
  /* 霸刀、五毒（作者要兩紫各更鮮亮）：暗底上二色本就深，霸刀 L 0.447 不入壓縮、紙上原樣，五毒壓縮後彩度只 0.129，
     在米白紙上俱發悶，而此一帶色相 sRGB 可容彩度約 0.27，所用不過一半。
     今各守其性而提彩度、略提明度：
       霸刀 深绀紫 仍偏藍（289°）、仍較五毒深：C 0.146 → 0.20，L 0.447 → 0.47；
       五毒 深紫 往紅挪一點（305° → 309°）、仍較霸刀明：C 0.129 → 0.18，L 0.49 → 0.52。
     二者色差由 0.063 拉開到 0.085；與衍天宗 0.070／0.092、柔然 0.156／0.109、万花 0.193／0.129，俱不更近 */
  "#54419F": "#5E38C1", /* 霸刀 */
  "#7D55A6": "#8742B5", /* 五毒 */
  /* 万花 藕紫（作者要更鮮亮的粉紫）：壓縮後彩度只 0.082，紙上成灰藕色，且與柔然灰紫只隔 0.048、幾並一色。
     今色相不動（338°），彩度推到 0.14、明度略提（0.579 → 0.59），粉紫始見；
     與柔然拉開到 0.089，與七秀 0.123、南诏 0.097、五毒 0.114，俱遠在全表最近一對之上 */
  "#C08BB0": "#B1599A", /* 万花 */
};
const TONE_L0 = 0.45, TONE_LN = 0.786, TONE_LT = 0.625;
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const unlin = (v) => Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055));
const rgbOf = (hex) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrastOn = (rgb, bgRgb) => { const a = lum(rgb), b = lum(bgRgb); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
function toOklch([r8, g8, b8]) {
  const r = lin(r8), g = lin(g8), b = lin(b8);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}
/* 回 sRGB；出色域則回 null */
function fromOklch(L, C, H) {
  const A = C * Math.cos(H), B = C * Math.sin(H);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const lr = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  if (lr.some((v) => v < -0.001 || v > 1.001)) return null;
  return lr.map((v) => unlin(Math.min(Math.max(v, 0), 1)));
}
const toneCache = new Map();
export function tone(hex, min = 3) {
  if (skin !== "paper" || typeof hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const up = hex.toUpperCase();
  if (PAPER_TONE[up]) return PAPER_TONE[up];
  const key = up + min;
  if (toneCache.has(key)) return toneCache.get(key);
  const bg = rgbOf(PAPER.bg);
  let [L, C, H] = toOklch(rgbOf(up));
  if (L > TONE_L0) L = TONE_L0 + (TONE_LT - TONE_L0) * Math.min(1, (L - TONE_L0) / (TONE_LN - TONE_L0));
  const fit = () => { let out; while (!(out = fromOklch(L, C, H)) && C > 0) C -= 0.003; return out || rgbOf(up); };
  let out = fit();
  while (contrastOn(out, bg) < min && L > 0.2) { L -= 0.004; out = fit(); }
  const res = "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
  toneCache.set(key, res);
  return res;
}

/* 字色專用（門派籤、圖上門派名之類的小字）：兩膚皆守 4.5:1。
   門派色原為「認色」而定，作 11px 小字時多半不夠——玄墨下天策對面板僅 1.8:1，素紙下藏劍、七秀放寬後不到 3:1。
   字色另算，框線、綾邊、圖上色塊仍用原定色（fc／tone）。
   做法同 tone()：明度按比例壓縮而非一刀切到 4.5:1（一刀切則諸字同明度，紅色一族又並成一色）：
     素紙：OKLCH 的 L ∈ [0.30, 0.64] 壓進 [0.30, 0.52]（0.52 以上對 T.bg 不足 4.5:1）；
     玄墨：L ∈ [0.38, 0.80] 抬進 [0.66, 0.90]（0.65 以下對 T.panelHi 不足 4.5:1）。
   如此兩膚字色最近一對色差（素紙 0.031、玄墨 0.029）與圖形色（0.030、0.031）相當。
   色相不動，彩度只在出色域時才收；壓抬之後仍不足者再補足。
   參照面取該膚最不利者：素紙取 T.bg（諸卡面更淺）、玄墨取 T.panelHi（懸停與浮簽底，比卡面、頁底都亮）。 */
const TEXT_MIN = 4.5;
const TEXT_MAP = {
  paper: { surface: PAPER.bg, from: [0.30, 0.64], to: [0.30, 0.52], dir: -1 },
  night: { surface: NIGHT.panelHi, from: [0.38, 0.80], to: [0.66, 0.90], dir: 1 },
};
/* 例外（作者定），鍵為玄墨原色：
   素紙：七秀、藏劍的字只守 3:1——4.5:1 時七秀成深玫瑰、藏劍成暗褐，粉與金盡失；
   玄墨：紅色一族（天策、凌雪阁、红衣教、唐军）的字不抬，照用原色——
     紅本是深色，深底上抬到 4.5:1 所需明度（≈0.65）便成粉、成紫、成肉粉色；
     若只抬到仍算紅的明度、把彩度拉滿，則成刺眼的正紅，且天策、红衣教、南诏三色並成一色，
     對比也只到 3:1 上下。兩害相權，留原色（對卡面 1.8 至 2.7:1），由框線、綾邊同色相佐。 */
const TEXT_EXCEPT = {
  paper: { "#E08389": 3, "#DBB53C": 3 }, /* 七秀、藏劍 */
  night: { "#7E3038": 0, "#811A50": 0, "#9E170C": 0, "#9C4E38": 0 }, /* 天策、凌雪阁、红衣教、唐军：0＝不調 */
};
const inkCache = new Map();
export function toneText(hex) {
  const c = tone(hex);
  if (typeof c !== "string" || !/^#[0-9a-fA-F]{6}$/.test(c)) return c;
  const ex = TEXT_EXCEPT[skin][hex.toUpperCase()];
  if (ex === 0) return c;
  const key = skin + c;
  if (inkCache.has(key)) return inkCache.get(key);
  const m = TEXT_MAP[skin], surf = rgbOf(m.surface);
  let [L, C, H] = toOklch(rgbOf(c));
  if (!ex) {
    const t = Math.min(1, Math.max(0, (L - m.from[0]) / (m.from[1] - m.from[0])));
    if (m.dir < 0 ? L > m.from[0] : true) L = m.to[0] + (m.to[1] - m.to[0]) * t;
  }
  const min = ex || TEXT_MIN;
  const fit = () => { let o; while (!(o = fromOklch(L, C, H)) && C > 0) C -= 0.003; return o || rgbOf(c); };
  let out = ex ? rgbOf(c) : fit();
  while (contrastOn(out, surf) < min && L > 0.05 && L < 0.99) { L += 0.004 * m.dir; out = fit(); }
  const res = "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
  inkCache.set(key, res);
  return res;
}

/* 窄屏偵測：僅視圖層響應式之用，不涉數據 */
export function useNarrow(bp = 780) {
  const [narrow, setNarrow] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const onR = () => setNarrow(window.innerWidth < bp);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [bp]);
  return narrow;
}

/* 粗指針偵測：觸屏無懸停，凡「懸停方見」之信息須另闢點選之途。
   隨設備接駁而變（平板外接滑鼠、二合一翻轉），故監聽而非只取初值 */
export function useCoarsePointer() {
  const q = "(pointer: coarse)";
  const [coarse, setCoarse] = useState(
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(q);
    const onC = (e) => setCoarse(e.matches);
    mq.addEventListener("change", onC);
    return () => mq.removeEventListener("change", onC);
  }, []);
  return coarse;
}
