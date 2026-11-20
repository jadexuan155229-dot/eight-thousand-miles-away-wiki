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
