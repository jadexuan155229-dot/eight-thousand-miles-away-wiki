/* ============================================================
   英文界面之拉丁字（latin-faces.js）
   站內文字幾乎都內聯寫死三枚中文字體（汇文正楷、汇文明朝、京华老宋），英文落在其中，
   用的便是中文字體自帶的拉丁字——字形與字距皆為漢字而設，英文排出來既散且怪。
   做法：英文界面下，為這三個字族名各補一組只含拉丁字的 @font-face（unicode-range），
   漢字仍走原字體。內聯樣式一處不改。中文界面撤去此表，中文頁上的數字、拉丁字一如其舊。
   字（2026-11-26 作者於四套候選中定 B）：
     - 正楷之位（卷首題名、頁面大標題與節題、余波引言、About 正文、編制圖人名職銜）配 Alegreya，
       書法筆意近正楷，又是正文字體，十一二號小字亦清楚；
     - 明朝、老宋之位（界面、按鈕、圖上標籤、年表）配 Literata，與檔案卡同用一枚。
   兩枚皆自托管（OFL，見 assets/fonts/ 下 *-OFL.txt），不再先找讀者本機的 Iowan、Palatino：
   原先 Mac 見 Iowan、Windows 見 Palatino、安卓與 Linux 見 Literata，人人所見不同。
   描述符須與原字面全同（不寫 font-weight／font-style，即常規 400）：同族同描述符之諸面方合成一面、
   按 unicode-range 分字，且後定義者優先。另立粗體一面（font-weight: 700）則粗體漢字找不到同重之面，
   落到系統黑體（11-26 實測），故粗體、斜體仍同原字體一樣由瀏覽器合成。
   ============================================================ */
import literataUrl from "../assets/fonts/Literata-latin-wght-normal.woff2?url";
import literataExtUrl from "../assets/fonts/Literata-latin-ext-wght-normal.woff2?url";
import alegreyaUrl from "../assets/fonts/Alegreya-latin-400-normal.woff2?url";
import alegreyaExtUrl from "../assets/fonts/Alegreya-latin-ext-400-normal.woff2?url";

/* 基本拉丁一面、拉丁擴展一面（帶長音符之名：Rādīn、Kyōya、Āsemūn）。
   擴展一面不可省：否則 ā、ō 落回中文字體自帶之字形，與左右拉丁字母混排 */
const LATIN = "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";
const LATIN_EXT = "U+0100-0130, U+0132-0151, U+0154-02AF, U+1E00-1EFF";
const FACES = {
  HuiwenZhengKai: [alegreyaUrl, alegreyaExtUrl],
  HuiwenMingChao: [literataUrl, literataExtUrl],
  JingHuaLaoSong: [literataUrl, literataExtUrl],
};
const CSS = Object.entries(FACES).flatMap(([f, [base, ext]]) => [[LATIN, base], [LATIN_EXT, ext]].map(
  ([range, url]) => `@font-face{font-family:"${f}";src:url("${url}") format("woff2");font-display:swap;unicode-range:${range}}`,
)).join("\n");

const ID = "latin-faces";
export function setLatinFaces(on) {
  const el = document.getElementById(ID);
  if (on && !el) {
    const style = document.createElement("style");
    style.id = ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  } else if (!on && el) {
    el.remove();
  }
}
