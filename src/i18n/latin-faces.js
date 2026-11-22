/* ============================================================
   英文界面之拉丁字（latin-faces.js）
   站內文字幾乎都內聯寫死三枚中文字體（汇文正楷、汇文明朝、京华老宋），英文落在其中，
   用的便是中文字體自帶的拉丁字——字形與字距皆為漢字而設，英文排出來既散且怪。
   做法：英文界面下，為這三個字族名各補一組只含拉丁字的 @font-face（unicode-range），
   拉丁字遂改用 Iowan／Palatino（與英文檔案卡同一棧），本機無此諸體者用自托管的 Literata；
   漢字仍走原字體。內聯樣式一處不改。中文界面撤去此表，中文頁上的數字、拉丁字一如其舊。
   描述符須與原字面全同（不寫 font-weight／font-style，即常規 400）：同族同描述符之諸面方合成一面、
   按 unicode-range 分字，且後定義者優先；若另寫字重區間，瀏覽器會把它當作另一面來挑，原字面仍會被選中。
   粗體、斜體同原字體一樣由瀏覽器合成。
   ============================================================ */
import normalUrl from "../assets/fonts/Literata-latin-wght-normal.woff2?url";
import extUrl from "../assets/fonts/Literata-latin-ext-wght-normal.woff2?url";

/* 基本拉丁一面、拉丁擴展一面（帶長音符之名：Rādīn、Kyōya、Āsemūn）。
   擴展一面不可省：否則 ā、ō 落回中文字體自帶之字形，與左右 Palatino 字母混排 */
const RANGES = [
  ["U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", normalUrl],
  ["U+0100-0130, U+0132-0151, U+0154-02AF, U+1E00-1EFF", extUrl],
];
const FAMILIES = ["HuiwenZhengKai", "HuiwenMingChao", "JingHuaLaoSong"];
/* local() 須用字體全名或 PostScript 名；Mac 之 Iowan、Palatino，Windows 之 Palatino Linotype、Book Antiqua */
const LOCAL = ["Iowan Old Style Roman", "IowanOldStyle-Roman", "Palatino", "Palatino-Roman", "Palatino Linotype", "PalatinoLinotype-Roman", "Book Antiqua", "BookAntiqua"];
const srcOf = (url) => [...LOCAL.map((n) => `local("${n}")`), `url("${url}") format("woff2")`].join(", ");
const CSS = FAMILIES.flatMap((f) =>
  RANGES.map(([range, url]) => `@font-face{font-family:"${f}";src:${srcOf(url)};font-display:swap;unicode-range:${range}}`),
).join("\n");

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
