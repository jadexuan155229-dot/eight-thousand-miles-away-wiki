import { useState, useMemo, useEffect, useRef } from "react";
import { fc as fcRaw, CHARACTERS, EVENTS, RELATIONS, LOC_COORDS, TRACK_SUPPLEMENTS, GEO_BASE } from "./wiki-data";
import { serif, T, SKINS, tone, toneText, useSkin, useNarrow, useCoarsePointer, getSkin, dimAccent, BAND_DARK } from "./theme";

/* 門派色隨膚調（見 theme.js tone）：wiki-data 的 fc 是數據層、亦供 vite.config 在 Node 下讀，不宜引入皮膚狀態，故在此包一層 */
const fc = (f) => tone(fcRaw(f));
/* 門派色作字時用此（素紙下守 3:1，見 theme.js toneText）；框線、色條仍用 fc */
const fcText = (f) => toneText(fcRaw(f));
import { parseRoute, routeHash } from "./router";
import { FLAT } from "./novel";
import NOVEL_MENTIONS from "virtual:novel-mentions";
import { SEAL_SVG_FILE } from "./seals";
import NovelReader from "./novel-reader";
import Echoes from "./echoes";
import Posts from "./posts";
import About from "./about";
import { grantsOf, tenureFac, tenuresOf, tenureSpan } from "./posts-data";
import { tenureTitleTx, tenureNoteTx, grantTx } from "./i18n/posts-content";
import { SHOCKS, ECHOES } from "./echoes-data";
import { shockTitle, modeText } from "./i18n/echoes.en";
import { useLocale, useSetLocale, useT } from "./i18n/locale";
import { eventCountText, libraryCountText } from "./i18n/ui";
import { charEn, charName, hasEnName, charField, profileRow, listField, facName, placeName, relName, eventTitle, novelTitle, coverage, nameItems, nameItemsEn, namesText, hasCourtesyLine } from "./i18n/content";
import { Zh, Tx } from "./i18n/zh";
import { TIER1 } from "./i18n/tiers";
import { CourtesyLine } from "./i18n/names";

/* ============================================================
   八千里路 · 人山人海 檔案 — 可視化站點原型 v4
   題頭體例：名·字 — 別號 — 四字概覽 — 一字品評 — 訓詁
   檔案八目：官职身份 / 体貌特征 / 性格 / 偶像 / 武学 /
             随身物件 / 喜好 / 专擅 —— 有明文者依原文，
             敘事體者由行文提煉，無可考者留目而空。
   生卒、出身、門派、事件繫年悉依 Notion 兩庫。
   ============================================================ */

const TYPE_GROUP = [
  [["授业", "传功", "问对"], "#7FB0D8"],
  [["遗承"], "#9B7EC8"],
  [["伴侣", "夫妻", "有情", "私情", "倾慕"], "#D88BA8"],
  [["亲缘"], "#B08968"],
  [["杀伐"], "#C05050"],
  [["嫌隙"], "#C8B45A"],
  [["未遂", "未说开", "未见"], "#8B94A0"],
  [["恩义", "知遇", "知契", "荐引", "救援", "收留", "照护", "代护", "调停", "受托", "医患", "同盟", "宽宥"], "#C9A15C"],
];
function relRaw(t) {
  const first = t.split("·")[0];
  for (const [ks, c] of TYPE_GROUP) if (ks.includes(first)) return c;
  return "#7FA980";
}
const relColor = (t) => tone(relRaw(t));
/* 一對人物之間的關係條目可有數條（如程凯—岚川云：夫妻、未见；闵方城—连朔：授业、私情、杀伐）。
   一線只容一色，取其「主關係」：虛線類（da：未见、未说开）唯無他條時取之；
   持續而雙向者（無 d）先於單向一事（d:1）；同類取歷時最長（無止年者作最長），再同取首條。
   懸停時諸條並列，主關係只定線色。 */
const pairKey = (a, b) => (a < b ? a + "|" + b : b + "|" + a);
const RELS_BY_PAIR = new Map();
for (const r of RELATIONS) {
  const k = pairKey(r.a, r.b);
  if (!RELS_BY_PAIR.has(k)) RELS_BY_PAIR.set(k, []);
  RELS_BY_PAIR.get(k).push(r);
}
const relSpan = (r) => (r.y1 ?? 9999) - (r.y0 ?? 0);
function primaryRel(rs) {
  if (!rs || !rs.length) return null;
  const pool = rs.some((r) => !r.da) ? rs.filter((r) => !r.da) : rs;
  return [...pool].sort((x, y) => (x.d ? 1 : 0) - (y.d ? 1 : 0) || relSpan(y) - relSpan(x))[0];
}
/* 關係色譜之圖例：群像網絡與行星關係圖共用（色取 TYPE_GROUP 之代表，隨膚調） */
const REL_KEY = [["傳承", "#7FB0D8"], ["遺承", "#9B7EC8"], ["情愛", "#D88BA8"], ["恩義", "#C9A15C"], ["誼", "#7FA980"], ["親緣", "#B08968"], ["嫌隙", "#C8B45A"], ["殺伐", "#C05050"]];
/* 行星圖例之同類亮起：按色反查一條關係屬圖例哪一類（未遂、未说开、未见一組不入 REL_KEY，另記為「未見」） */
const KEY_RAW = { ...Object.fromEntries(REL_KEY), 未見: "#8B94A0" };
const KEY_OF_RAW = Object.fromEntries(Object.entries(KEY_RAW).map(([l, c]) => [c, l]));
const relKeyOf = (r) => KEY_OF_RAW[relRaw(r.t)];
/* pick：{ active, onToggle, onClear }。給出時諸類作按鈕（行星圖窄屏用，與圖內圖例同一狀態），並添「僅同事」「未見」二項；
   Enter／空格由按鈕原生處理，Esc 收起（與圖內圖例同，讀屏所報之文亦如此提示） */
function RelKey({ note, style, pick }) {
  const t = useT();
  const items = REL_KEY.map(([l, cc]) => [l, tone(cc), "—", t(l)]);
  if (pick) items.push(["僅同事", T.muted, "—", t("僅同事")], ["未見", tone(KEY_RAW.未見), "- -", t("未見／未說開")]);
  return (
    <div className="flex flex-wrap" style={{ gap: pick ? 6 : 14, marginBottom: 4, justifyContent: "center", ...style }}>
      {items.map(([id, col, mark, label]) =>
        pick ? (
          <button key={id} type="button" aria-pressed={pick.active === id} aria-label={t("只亮此類：{label}", { label })}
            onClick={() => pick.onToggle(id)}
            onKeyDown={(ev) => { if (ev.key === "Escape") pick.onClear(); }}
            style={{ fontSize: 11, fontFamily: gUI, color: col, background: pick.active === id ? T.panelHi : "none", cursor: "pointer",
              border: `1px solid ${pick.active === id ? col : "transparent"}`, borderRadius: 3, padding: "3px 6px" }}>
            {mark} {label}
          </button>
        ) : (
          <span key={id} style={{ fontSize: 11, fontFamily: gUI, color: col }}>{mark} {label}</span>
        ))}
      {note && <span style={{ fontSize: 11, fontFamily: gUI, color: T.faint, alignSelf: "center" }}>{note}</span>}
    </div>
  );
}
function relActive(r, Y) {
  return (r.y0 == null || r.y0 <= Y) && (r.y1 == null || Y <= r.y1 || r.ph);
}
function relPosthumous(r, Y) {
  return !!r.ph && r.y1 != null && Y > r.y1;
}

const CENTERS_META = [
  { id: "minfangcheng", tag: "蒼雲線" },
  { id: "chengkai", tag: "天策線" },
];
const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
/* 英译覆蓋數：覆蓋層為靜態模組，算一次即可（頁頭英文版說明用） */
const COVERAGE = coverage(CHARACTERS, EVENTS);
const sortEvents = (a, b) =>
  a.year - b.year || (a.month ?? 0) - (b.month ?? 0) || (a.seq ?? "").localeCompare(b.seq ?? "");

const CN = ["", "元", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十"];
const CN_MONTH = ["", "正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
/* 年號紀年：體例遵庫中原文（「至德二年」「天宝四年」「开元二十六年」），用「年」不用「载」 */
function eraOf(y) {
  if (y == null) return "";
  /* 713 前仅收录站内所需诸年（651—679 波斯史实线；680 陆危楼生、700 宣康生、702 朗迪恩生、707 立明教／陆南信生）。
     按：674 上元元年为高宗年号，与肃宗上元（760）同号异代，eraOf 逐年返回，两不相扰。 */
  const EARLY = { 651: "永徽二年", 654: "永徽五年", 661: "龙朔元年", 663: "龙朔三年", 674: "上元元年", 678: "仪凤三年", 679: "调露元年", 680: "永隆元年", 700: "久视元年", 702: "长安二年", 705: "神龙元年", 707: "景龙元年", 708: "景龙二年", 710: "景云元年" };
  if (EARLY[y]) return EARLY[y];
  if (y >= 713 && y <= 741) return `开元${CN[y - 712]}年`;
  if (y >= 742 && y <= 756) return `天宝${CN[y - 741]}年`;
  if (y === 757) return "至德二年";
  if (y === 758) return "乾元元年";
  if (y === 759) return "乾元二年";
  if (y === 760) return "上元元年";
  if (y === 761) return "上元二年";
  if (y === 762) return "宝应元年";
  if (y === 763) return "宝应二年";
  if (y === 764) return "广德二年";
  if (y === 765) return "永泰元年";
  if (y >= 766 && y <= 779) return `大历${CN[y - 765]}年`;
  if (y >= 780 && y <= 783) return `建中${CN[y - 779]}年`;
  if (y === 784) return "兴元元年";
  if (y >= 785 && y <= 805) return `贞元${CN[y - 784]}年`;
  return "";
}
/* 年中改元者附注 */
const ERA_NOTES = { 756: "七月改元至德", 758: "二月改元乾元", 760: "闰四月改元上元", 762: "四月改元宝应", 763: "七月改元广德" };
const ERA_NOTES_EN = { 756: "Zhide from the 7th month", 758: "Qianyuan from the 2nd month", 760: "Shangyuan from the intercalary 4th month", 762: "Baoying from the 4th month", 763: "Guangde from the 7th month" };

/* English display derives its era and ordinal from the same chronology as Chinese. */
function englishEraOf(y) {
  return eraZhToEn(eraOf(y));
}
/* 「天宝十五年」→ "Tianbao 15"：年號表與 eraOf 同源；年中改元之分軌（ERA_SWITCH）亦經此轉 */
function eraZhToEn(era) {
  const match = (era || "").match(/^(.+?)(元|[一二三四五六七八九十]+)年$/);
  if (!match) return "?";
  const names = {
    永徽: "Yonghui", 龙朔: "Longshuo", 上元: "Shangyuan", 仪凤: "Yifeng",
    调露: "Tiaolu", 永隆: "Yonglong", 久视: "Jiushi", 长安: "Chang'an",
    神龙: "Shenlong", 景龙: "Jinglong", 景云: "Jingyun", 开元: "Kaiyuan",
    天宝: "Tianbao", 至德: "Zhide", 乾元: "Qianyuan", 宝应: "Baoying",
    广德: "Guangde", 永泰: "Yongtai", 大历: "Dali", 建中: "Jianzhong",
    兴元: "Xingyuan", 贞元: "Zhenyuan",
  };
  return `${names[match[1]] ?? match[1]} ${CN.indexOf(match[2])}`;
}

function lifespan(c) {
  if (c.birth == null && c.death == null) return "生卒待补";
  const b = c.birth != null ? `${c.birth}（${eraOf(c.birth)}）` : "？";
  const d = c.death != null ? `${c.death}（${eraOf(c.death)}）` : "";
  return `${b} — ${d}`;
}
/* 英文生卒：公元年與年號分兩段（小卡分行、詳情卡並排）；卒年空則如中文留空，不寫問號 */
const lifespanYearsEn = (c) => `${c.birth ?? "?"}–${c.death ?? ""}`;
const lifespanEraEn = (c) => (c.death != null ? `${c.birth != null ? englishEraOf(c.birth) : "?"} – ${englishEraOf(c.death)}` : englishEraOf(c.birth));
function lifespanFor(locale, c) {
  if (locale !== "en") return lifespan(c);
  if (c.birth == null && c.death == null) return "Dates not yet recorded";
  return `${lifespanYearsEn(c)} (${lifespanEraEn(c)})`;
}
/* 任期起止：英文界面下「（约）」作 approx.、長橫作連接號 */
const tenureSpanFor = (locale, x) => (locale === "en" ? tenureSpan(x).replace(/（约）/g, " (approx.)").replace("—", "–") : tenureSpan(x));
/* 英文月份：唐历為陰历，從漢学通例作序數（the tenth month），不換作公历月名 */
const ORD = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const monthEn = (m) => `${ORD[m]} month`;
function coCountsFor(centerId) {
  const n = {};
  for (const e of EVENTS) {
    if (!e.chars.includes(centerId)) continue;
    for (const id of e.chars) if (id !== centerId) n[id] = (n[id] || 0) + 1;
  }
  return n;
}

/* 紅泥方印：一字品評（印泥肌理與邊緣缺口見 index.css .seal-stamp）
   字形方案："a" 宋系收細版；"b" 輕隸意版（.seal-stamp--li） */
const SEAL_FONT_VARIANT = "b";
/* 筆畫繁複、小印中偏擠的字：dense 狀態下字形再縮約 5% */
const SEAL_DENSE_CH = new Set(["峭", "霸", "敏", "逸", "健"]);
/* 改用 SVG 印章的人物見 seals.js。紅面僅佔 viewBox 約 87%，四邊各留約 6.5% 透明邊，
   故放大係數把紅面還原到與文字印章外框相當；
   大印按等高換算約需 1.15，實看偏輕故加大到 1.20；NUDGE_Y 為視覺中心微調 */
const SEAL_SVG_SCALE = { sm: 1.15, lg: 1.2 };
const SEAL_SVG_NUDGE_Y = 1;
function Seal({ ch, size = 15, svg }) {
  const t = useT();
  if (!ch) return null;
  const sm = size < 18;
  /* 小印字縮一成（繁複字再縮 5%）、橫向補回內邊距，外框尺寸不變；豎向由外層行高撐住 */
  const chScale = sm ? (SEAL_DENSE_CH.has(ch) ? 0.855 : 0.9) : 1;
  /* 兩種印章共用這一套盒模型：外框尺寸與基線位置由字號、行高、內邊距決定 */
  const box = {
    fontSize: size,
    padding: `${Math.round(size * 0.18)}px ${Math.round(size * 0.3) + (size * (1 - chScale)) / 2}px`,
    lineHeight: 1, display: "inline-block",
  };
  /* SVG 印章：外殼用同一 box 加一枚隱藏字撐出等寬、等高、等基線的占位盒，
     不套 .seal-stamp 的紅底／肌理／缺口；img 絕對定位鋪滿，縮放不參與排版 */
  if (svg) {
    return (
      <span className="seal-svg-shell" style={box} title={t("品评")}>
        <span style={{ fontSize: `${chScale}em`, visibility: "hidden" }}>{ch}</span>
        <img className="seal-svg" src={`${import.meta.env.BASE_URL}images/seals/${svg}`} alt=""
          style={{ transform: `translateY(${SEAL_SVG_NUDGE_Y}px) scale(${sm ? SEAL_SVG_SCALE.sm : SEAL_SVG_SCALE.lg})` }} />
      </span>
    );
  }
  return (
    <span className={SEAL_FONT_VARIANT === "b" ? "seal-stamp seal-stamp--li" : "seal-stamp"}
      data-size={sm ? "sm" : "lg"} style={{
      ...box, color: T.onAccent, backgroundColor: T.seal,
    }} title={t("品评")}><span className="seal-stamp-ch" style={{ fontSize: `${chScale}em` }}>{ch}</span></span>
  );
}

/* 宣紙肌理範圍：全站人物，無一例外——初時只及馬翊一卡，繼而天策、蒼雲，今遍及一百二十人。
   此判定遂恆真，暫留作單一開關：若日後要收回某派或某人，改此一處即可，
   大小兩卡與 index.css 諸規則悉聽其令，不必四處翻找。
   （若確定不再收回，可連同各處 tt 分支一併化去，屆時 index.css 中
     .texture-test-sm 的幾條 !important 覆寫亦宜併回 CharCard 的內聯樣式。）
   綾邊底色隨門派而變，全站計有二十五色；門派為空者（程鈞）落到 fc 的中立灰回退。
   樣式見 index.css 同名段。大小兩卡皆據此判定：
     小卡 .texture-test-sm —— 紙紋（減配）+ 斑駁 + 左側綾邊（承原頂部門派色條），
                              且字號自豎排左欄改為橫綴於名後、名下漸變金線分隔、
                              線下生卒／出身／事件三行標目；
     詳情卡 .texture-test  —— 紙紋 + 斑駁 + 名號行下漸變金線 + 檔案行線左端泛金。
   範圍外之人一律照舊；試驗作廢時刪此函數與其數處引用、並刪 index.css 同名段。 */
const isTextureTest = () => true;


/* 試驗卡的隨派色變量，一併注入大小兩卡。皆自 fc(belong[0])（即原頂部色條之色）派生，
   dimAccent 之 grayT 取 0 即循原色相不作灰化，故各派自帶其色。
   band-a/b/c 綾邊底色三檔（僅小卡用）：×0.72 / ×0.52 / ×0.70，
     代入天策 #7E3038 仍得原先的 #5B2328 / #42191D / #582227，故天策諸卡觀感不變。
     初版就地寫死天策派生值，趙廷之（平民·天策，belong[0] 為平民）一入範圍即不敷用。
   stain 斑駁右上那圈的暈色（大小兩卡皆用）：原取全站高亮橘紅 #B5442D，
     那本是通用強調色、非門派色，只是恰與天策相得；蒼雲一入範圍，冷鐵灰的卡上憑空一團暖紅，
     突兀可見。故一併改隨派色——天策仍暖，蒼雲轉冷，各如其分。
     透明度自 0.06 提至 0.07：門派色多較 #B5442D 為暗，同透明度下浮色更淺，略補之
   素紙另取一檔壓暗值 ×0.88 / ×0.70 / ×0.85：fc 在紙上已是為淺底壓深過的色（如纯阳中藍成深藏青），
     再照玄墨乘 0.52 便近乎墨塊，綾邊上 overlay／soft-light 的噪紋（中間調上最顯、愈暗愈弱）幾不可見，
     且深條直貼米白紙，比玄墨下沉重得多。少壓一截，紙上綾邊回到中間調，紋理與門派色俱見（作者 2026-11-21）。
     須在渲染期取皮膚（getSkin），不可抄成模塊常量——換膚不重掛，整棵重渲染時此處隨之重算。
   BAND_DARK 與 dimAccent 定義在 theme.js：門派色卡腳本（scripts/swatch-cards.js）亦用，免抄兩份 */
const ttVars = (main) => {
  const [a, b, c] = BAND_DARK[getSkin()] || BAND_DARK.night;
  return {
    "--tt-band-a": dimAccent(fc(main), 0, a, 1),
    "--tt-band-b": dimAccent(fc(main), 0, b, 1),
    "--tt-band-c": dimAccent(fc(main), 0, c, 1),
    "--tt-stain": dimAccent(fc(main), 0, 0, 0.07),
  };
};

/* ---------------- 檔案卡 ---------------- */
/* 英文界面：標目、生卒（由年號表推出，人人可得）、門派隨界面為英文；
   姓名、表字、出身、稱號等逐字段查译文，無則回落中文並標 zh-src（見 i18n/content.js）。
   舊時以「此人有無译文」整卡切換，未译之人在英文界面下連標目也是中文 */
function NameLine({ c, locale }) {
  return hasEnName(locale, c)
    ? <>{charName(locale, c)} <span className="profile-hanzi" lang="zh">{c.name}</span></>
    : <Zh>{c.name}</Zh>;
}
/* 名號一行：字、本名、波斯语名、日文读法、汉名，見 i18n/names.jsx */
function CourtesyText({ c }) {
  return <CourtesyLine c={c} />;
}
function CharCard({ c, onOpen }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const tr = charEn(locale, c.id);
  const main = c.belong[0];
  const evCount = EVENTS.filter((e) => e.chars.includes(c.id)).length;
  const tt = isTextureTest(c);
  return (
    <div
      onClick={() => onOpen(c)}
      className={`cursor-pointer flex${tt ? " texture-test-sm" : ""}${en ? " profile-en" : ""}`}
      lang={en ? "en" : "zh"}
      style={{ background: T.panel, borderTop: `3px solid ${fc(main)}`, borderRight: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, borderLeft: `1px solid ${T.line}`, padding: "16px 14px 14px 16px", gap: 12, transition: "background .15s", fontFamily: "HuiwenZhengKai", ...(tt ? ttVars(main) : null) }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.panelHi)}
      onMouseLeave={(e) => (e.currentTarget.style.background = T.panel)}
    >
      {!tt && (
        <div style={{ writingMode: "vertical-rl", fontFamily: "HuiwenZhengKai", fontSize: 12, letterSpacing: "0.35em", color: T.faint, borderRight: `1px solid ${T.line}`, paddingRight: 8, minHeight: 88 }}>
          <CourtesyText c={c} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* 試驗卡的欄距放寬到 14，並於字號後另加 6px 右外距（合即 20），
            使印章距姓名約 14 + 字號寬 + 20 ≈ 77px——與原版「姓名 + 繫年N事 + 印」
            所形成的間距（約 75px）相當。原版諸卡欄距 10 不變 */}
        <div className="flex items-baseline flex-wrap profile-heading" style={{ gap: tt ? 14 : 10 }}>
          <span className="profile-name" style={{ fontFamily: "HuiwenMingChao", fontSize: 22, color: T.ink, fontWeight: 400, fontSynthesis: "none" }}><NameLine c={c} locale={locale} /></span>
          {tt && hasCourtesyLine(locale, c) && <span className="profile-courtesy" style={{ fontFamily: "HuiwenMingChao", fontSize: 13, color: nameItems(c).length ? T.muted : T.faint, marginRight: 6 }}><CourtesyText c={c} /></span>}
          {!tt && evCount > 0 && <span style={{ fontSize: 11, color: T.faint }}>{eventCountText(locale, evCount)}</span>}
          <Seal ch={c.pin} size={15} svg={SEAL_SVG_FILE[c.id]} />
        </div>
        {/* 稱號英译（解釋性副標題）：小卡只在有译文時並出原文與英文，未译者小卡不出稱號（同中文小卡） */}
        {tr?.epithet && <div className="profile-epithet" style={{ color: T.muted, fontSize: 12, margin: "6px 0" }}><span lang="zh">{c.epithet}</span><em>{tr.epithet}</em></div>}
        {tt ? (
          /* 金線下改為標目分行：生卒／出身／事件各佔一行，仿詳情卡「檔案」區的標目體例
             （左標目定寬、右值自適應），惟字級與行距按小卡收緊。
             原先擠作一行、以「·」相隔的寫法，遇程凱這等籍貫帶括注者即折成三四行而失序。
             值為空仍留行（同詳情卡檔案區之例），使名單內諸卡結構齊一、便於並置對照 */
          /* 行距按壓緊後的定值：行內距 1、行高 1.5——三行合約 62px，
             較初版（行內距 2、行高 1.65）省下 12px */
          <div style={{ marginTop: 1 }}>
            {[["生卒", en ? (c.birth == null && c.death == null ? lifespanFor(locale, c) : <>
              <span className="profile-lifespan-years">{lifespanYearsEn(c)}</span>
              <span className="profile-lifespan-era">{lifespanEraEn(c)}</span>
            </>) : lifespan(c)], ["出身", c.birthplace ? <Tx key="bp" v={charField(locale, c, "birthplace")} /> : ""], ["事件", evCount > 0 ? eventCountText(locale, evCount) : ""]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 10, padding: "1px 0" }}>
                <div className="profile-label" style={{ minWidth: 34, fontFamily: "HuiwenZhengKai", fontSize: 11, letterSpacing: "0.12em", color: T.faint, paddingTop: 1 }}>{t(k)}</div>
                <div style={{ flex: 1, minWidth: 0, fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: v ? T.muted : T.faint, lineHeight: 1.5 }}>{v || ""}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>
            {lifespanFor(locale, c)}
            {c.birthplace && <><span style={{ margin: "0 8px", color: T.faint }}>·</span><Tx v={charField(locale, c, "birthplace")} /></>}
          </div>
        )}
        {/* 門派籤：試驗卡於標目三行之下另起一行，留白略寬於行距即可分出層次（14 → 9，壓緊） */}
        <FacTags belong={c.belong} style={{ marginTop: tt ? 9 : 10 }} />
      </div>
    </div>
  );
}

/* 門派籤：大小兩卡共用；英文界面下門派名查 factions.en.js */
function FacTags({ belong, style }) {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="flex flex-wrap" style={{ gap: 6, ...style }}>
      {(belong.length ? belong : [null]).map((f) => (
        <span key={f ?? "none"} style={{ fontSize: 11, color: fcText(f ?? "门派待补"), border: `1px solid ${fc(f ?? "门派待补")}55`, padding: "1px 7px", borderRadius: "3px" }}>{f ? facName(locale, f) : t("门派待补")}</span>
      ))}
    </div>
  );
}

/* 人名籤（關係、同事、年表涉事人物）：英文界面有英文名則用之，懸停見漢字；無則回落中文 */
function ChipName({ c }) {
  const locale = useLocale();
  return hasEnName(locale, c) ? <span title={c.name}>{charName(locale, c)}</span> : <Zh>{c.name}</Zh>;
}

/* 英文界面下某區塊整段回落中文時，於區塊標題旁注一小籤 */
function ZhNote() {
  const t = useT();
  return <span className="zh-note" title={t("未译註")} style={{ marginLeft: 8, fontSize: 10.5, letterSpacing: 0, color: T.faint, border: `1px solid ${T.line}`, padding: "0 5px", borderRadius: 3 }}>{t("中文原文")}</span>;
}

/* ---------------- 詳情面板 ---------------- */

function DetailPanel({ c, onClose, onOpenChar, onOpenNovel, onOpenEcho, onOpenPosts }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const tr = c ? charEn(locale, c.id) : null;
  const [showAll, setShowAll] = useState(false);
  /* Esc 關閉：與文庫批注卡對齊；hook 須居早退之前，開啟時方掛監聽 */
  useEffect(() => {
    if (!c) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [c, onClose]);
  /* 見於文庫：正文以本名精確計數（表字、別號短而易誤中，不入檢索）；
     僅列有命中之章。計數於構建期預算（見 vite.config.js 之 virtual:novel-mentions），
     故正文已切為懶加載塊、不入主包，此面板仍不需拉正文即秒出。
     按「線（·卷）」聚合為可展開塊——屬卷之章歸【線·卷】，散章歸【線】，
     同線可並出兩塊（卷與散章於目錄本同級）；塊上僅標章數，處數在章 chip */
  const mentionGroups = useMemo(() => {
    if (!c) return [];
    const groups = [];
    const byKey = {};
    for (const f of FLAT) {
      const n = (NOVEL_MENTIONS[f.ch.file] || {})[c.id] || 0;
      if (n === 0) continue;
      const key = f.group ? `${f.novel.id}/${f.group.id}` : f.novel.id;
      if (!byKey[key]) {
        byKey[key] = { key, label: f.group ? `${novelTitle(locale, f.novel.tag)}·${novelTitle(locale, f.group.title)}` : novelTitle(locale, f.novel.tag), chapters: [] };
        groups.push(byKey[key]);
      }
      byKey[key].chapters.push({ f, n });
    }
    return groups;
  }, [c, locale]);
  /* 塊展開態：可多開，默認全收；換人自動全收 */
  const [openGroups, setOpenGroups] = useState(() => new Set());
  useEffect(() => { setOpenGroups(new Set()); }, [c]);
  const toggleGroup = (k) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  if (!c) return null;
  const tt = isTextureTest(c); /* 宣紙肌理試驗範圍，見文件上方 */
  const related = EVENTS.filter((e) => e.chars.includes(c.id)).sort(sortEvents);
  const co = {};
  for (const e of related) for (const id of e.chars) if (id !== c.id) co[id] = (co[id] || 0) + 1;
  const coList = Object.entries(co).sort((a, b) => b[1] - a[1]);
  const anecdotes = listField(locale, c, "anecdotes");
  const shownAnecdotes = showAll ? anecdotes : anecdotes.slice(0, 4);
  const highlights = listField(locale, c, "highlight");
  /* 檔案彈窗強調色：隨人物門派色動態派生（訓詁豎線、高光框、軼事圓點、滾動條）。
     已啟用：天策、紅衣教、明教、霸刀、長歌、凌雪閣、萬花、七秀、純陽、丐幫、蓬萊、藏劍、唐門、五毒、
     少林、藥宗、衍天宗、萬靈、段氏、平民（判序從門派底紋 factionMark 之先後，雙屬者取先者；
     平民不入底紋鏈，殿於末位，俟其正屬門派啟用即自讓位）；
     奚人/狼牙、南詔亦不入底紋鏈，同置末段。id 特判（仿底紋鏈嵐川雲、盧秉毓之體例，悉依作者定色）：
     朗迪恩（西域·平民雙標籤）、魯雅從西域；程釗、程鐸從唐軍（程鋒、程宇乃天策·唐軍雙屬，
     今從天策，故唐軍不整體入鏈）；
     紅衣教排在明教之前：其人（玛奈丽、歌莉）皆紅衣教·明教雙屬、以紅衣教為第一門派（作者 2026-11-21 定）；
     未啟用者維持全站橘紅與原滾動條紅棕，後續門派擴此判斷即可 */
  const profileFaction = ["langdien", "luya"].includes(c.id) ? "西域"
    : ["chengzhao", "chengduo"].includes(c.id) ? "唐军"
    : c.belong.includes("天策") ? "天策"
    : c.belong.includes("红衣教") ? "红衣教"
    : c.belong.includes("明教") ? "明教"
    : c.belong.includes("霸刀") ? "霸刀"
    : c.belong.includes("长歌") ? "长歌"
    : c.belong.includes("凌雪阁") ? "凌雪阁"
    : c.belong.includes("万花") ? "万花"
    : c.belong.includes("七秀") ? "七秀"
    : c.belong.includes("纯阳") ? "纯阳"
    : c.belong.includes("丐帮") ? "丐帮"
    : c.belong.includes("蓬莱") ? "蓬莱"
    : c.belong.includes("藏剑") ? "藏剑"
    : c.belong.includes("唐门") ? "唐门"
    : c.belong.includes("五毒") ? "五毒"
    : c.belong.includes("少林") ? "少林"
    : c.belong.includes("药宗") ? "药宗"
    : c.belong.includes("衍天宗") ? "衍天宗"
    : c.belong.includes("万灵") ? "万灵"
    : c.belong.includes("段氏") ? "段氏"
    : c.belong.includes("奚人/狼牙") ? "奚人/狼牙"
    : c.belong.includes("南诏") ? "南诏"
    : c.belong.includes("平民") ? "平民" : null;
  /* 蒼雲例外（作者定則）：僅滾動條（thumb/箭頭）隨門派鐵灰，文內強調（訓詁豎線、高光框、
     軼事圓點）維持全站橘紅——故滾動條色自 scrollFaction 派生，與 profileFaction 解耦；
     判定沿用底紋鏈之嵐川雲、盧秉毓排除 */
  const scrollFaction = profileFaction
    || (c.belong.includes("苍云") && !["lanchuanyun", "lubingyu"].includes(c.id) ? "苍云" : null);
  const profileAccent = profileFaction ? fc(profileFaction) : T.accent;
  const profileAccentSoft = scrollFaction ? dimAccent(fc(scrollFaction), 0.4, 0.25, 0.62) : "rgba(126,78,76,0.62)";
  const profileAccentHover = scrollFaction ? dimAccent(fc(scrollFaction), 0.35, 0.08, 0.82) : "rgba(158,91,86,0.82)";
  // 門派底紋：從屬蒼雲者顯示蒼雲紋（嵐川雲、盧秉毓雙屬他派，按設定除外），
  // 從屬天策、明教、霸刀、長歌、凌雪閣、萬花、七秀者顯示各自紋樣；
  // 紅衣教排在明教前（玛奈丽、歌莉以紅衣教為第一門派，兼屬明教）；
  // 同一詳情卡僅取一種，其餘門派暫無底紋
  const factionMark = c.id === "cenquan" ? "cenquan"
    : c.belong.includes("苍云") && !["lanchuanyun", "lubingyu"].includes(c.id) ? "cangyun"
    : c.belong.includes("天策") ? "tiance"
    : c.belong.includes("红衣教") ? "hongyijiao"
    : c.belong.includes("明教") ? "mingjiao"
    : c.belong.includes("霸刀") ? "badao"
    : c.belong.includes("长歌") ? "changge"
    : c.belong.includes("凌雪阁") ? "lingxuege"
    : c.belong.includes("万花") ? "wanhua"
    : c.belong.includes("七秀") ? "qixiu"
    : c.belong.includes("纯阳") ? "chunyang"
    : c.belong.includes("丐帮") ? "gaibang"
    : c.belong.includes("蓬莱") ? "penglai"
    : c.belong.includes("藏剑") ? "cangjian"
    : c.belong.includes("唐门") ? "tangmen"
    : c.belong.includes("五毒") ? "wudu"
    : c.belong.includes("少林") ? "shaolin"
    : c.belong.includes("药宗") ? "yaozong"
    : c.belong.includes("衍天宗") ? "yantianzong"
    : c.belong.includes("万灵") ? "wanling"
    : c.belong.includes("段氏") ? "duanshi"
    : c.belong.includes("唐军") ? "tangjun" : null;

  const SectionLabel = ({ children, zh }) => (
    <div style={{ fontSize: 12, letterSpacing: "0.3em", color: T.faint, marginBottom: 8 }}>{children}{zh && <ZhNote />}</div>
  );
  /* 一節之內諸條皆回落中文 → 節題旁注「中文原文」；部分已译則不注（各條自帶 lang） */
  const allZh = (rows) => en && rows.length > 0 && rows.every(([, zh]) => zh);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: T.xBackdrop, zIndex: 50, padding: 20 }} onClick={() => { setShowAll(false); onClose(); }}>
      {/* 宣紙肌理試驗：範圍見上方 isTextureTest，樣式全在 index.css 同名段 */}
      <div className={`${tt ? "texture-test" : ""}${en ? " profile-en" : ""}`} lang={en ? "en" : "zh"} onClick={(e) => e.stopPropagation()} style={{ ...(tt ? ttVars(c.belong[0]) : null), background: T.panel, border: `1px solid ${T.line}`, maxWidth: 700, width: "100%", maxHeight: "86vh", position: "relative", overflow: "hidden", isolation: "isolate", display: "flex", flexDirection: "column" }}>
        {factionMark && (
          <div className={`faction-watermark faction-watermark--${factionMark}`} aria-hidden="true">
            {/* 藥宗自定義灰度：feColorMatrix 藍通道負權重，使黃（低藍）亮於白（高藍），
                中心層次得以翻轉；外圍翠綠/淺綠相對關係不變。CSS 濾鏡無法做到跨色相翻轉 */}
            {factionMark === "yaozong" && (
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <filter id="yaozong-tone" colorInterpolationFilters="sRGB">
                  <feColorMatrix type="matrix" values="0.6 0.5 -0.5 0 0.2  0.6 0.5 -0.5 0 0.2  0.6 0.5 -0.5 0 0.2  0 0 0 1 0" />
                </filter>
              </svg>
            )}
          </div>
        )}
        <div className="char-modal-scroll" style={{ overflowY: "auto", minHeight: 0, padding: "28px 32px 32px", position: "relative", zIndex: 1, fontFamily: "HuiwenZhengKai", "--profile-accent": profileAccent, "--profile-accent-soft": profileAccentSoft, "--profile-accent-hover": profileAccentHover }}>
        {/* 人物檔案彈窗縱向滾動條深色化：僅作用於 .char-modal-scroll，不及全站；
            thumb 取門派派生色（--profile-accent-soft/hover，自容器內聯變量注入），track 維持深灰透明 */}
        <style>{`
.char-modal-scroll{scrollbar-width:thin;scrollbar-color:var(--profile-accent-soft) ${T.xScrollTrackSoft}}
.char-modal-scroll::-webkit-scrollbar{width:8px}
.char-modal-scroll::-webkit-scrollbar-track{background:${T.xScrollTrackSoft}}
.char-modal-scroll::-webkit-scrollbar-thumb{background:var(--profile-accent-soft);border-radius:4px}
.char-modal-scroll::-webkit-scrollbar-thumb:hover{background:var(--profile-accent-hover)}
.char-modal-scroll::-webkit-scrollbar-button{background:var(--profile-accent-soft)}/* 僅著色：不設尺寸，環境無箭頭時此規則自然無效 */
`}</style>
        {c.pin && <div style={{ position: "absolute", top: 26, right: 60 }}><Seal ch={c.pin} size={22} svg={SEAL_SVG_FILE[c.id]} /></div>}
        <button aria-label={t("關閉檔案")} onClick={() => { setShowAll(false); onClose(); }} style={{ position: "absolute", top: 20, right: 22, color: T.muted, fontSize: 20, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}>×</button>

        {/* 試驗卡的欄距 12 → 14，字號再加 6px 左外距，故姓名與其後小字相距 20px。
            按小卡的比例折算（22px 名配 14px 距，約 0.64 倍字高），30px 名恰配 19–20px。
            此處無印章之慮（印為絕對定位，浮於卡角，不入此行），故不設右外距。
            範圍外諸卡維持 12。

            tt-rule（名號行下的漸變金線）僅在無稱號時掛：
            有稱號者，其下本就自帶一道下劃線，那才是此卡的主分隔線——
            金線漸變由 index.css 的「檔案行線」規則一併罩到它身上，不必在此重複一道；
            兩線相距僅三十餘像素，並出則刺目。馬翊、程凱等無稱號者，此線正補其位 */}
        <div className={`flex items-baseline flex-wrap profile-heading${tt && !c.epithet ? " tt-rule" : ""}`} style={{ gap: tt ? 14 : 12, paddingRight: 70 }}>
          <span className="profile-name" style={{ fontFamily: "HuiwenMingChao", fontSize: 30, color: T.ink, fontWeight: 400, fontSynthesis: "none" }}><NameLine c={c} locale={locale} /></span>
          {nameItems(c).length > 0 && hasCourtesyLine(locale, c) && <span className="profile-courtesy" style={{ fontFamily: "HuiwenMingChao", fontSize: 15, color: T.muted, marginLeft: tt ? 6 : 0 }}><CourtesyText c={c} /></span>}
          {c.hao && <span style={{ fontFamily: "HuiwenZhengKai", fontSize: 13, color: T.faint }}>{tr?.hao ? `“${tr.hao}”` : <Zh>「{c.hao}」</Zh>}</span>}
        </div>
        {c.epithet && (
          /* 稱號：英文界面下有译文則原文與英文副標題並出；未译則只出原文（zh-src，字族不被覆寫） */
          <div className={tr?.epithet ? "profile-epithet" : en ? "zh-src" : undefined} lang={en && !tr?.epithet ? "zh" : undefined} style={{ fontFamily: "HuiwenZhengKai", fontSize: 16, color: T.ink, letterSpacing: "0.5em", marginTop: 10, paddingBottom: 10, borderBottom: `1px solid ${T.line}`, display: "inline-block", paddingRight: 24 }}>
            {tr?.epithet ? <><span lang="zh">{c.epithet}</span><em>{tr.epithet}</em></> : c.epithet}
          </div>
        )}
        <div style={{ fontSize: 13, color: T.muted, marginTop: 10 }}>
          {lifespanFor(locale, c)} {c.birthplace && <>· <Tx v={charField(locale, c, "birthplace")} /></>}
        </div>
        <FacTags belong={c.belong} style={{ marginTop: 8 }} />
        {/* 英文界面：T1 名單以外的檔案屬 T2 工作译本（docs/english-edition.md），標明之，與年表頁頭同一句式 */}
        {en && tr?.profile && !TIER1.includes(c.id) && (
          <p style={{ fontFamily: "JingHuaLaoSong", fontSize: 12.5, color: T.muted, lineHeight: 1.6, margin: "10px 0 0", maxWidth: 560 }}>
            This profile is a working translation: names and terms are checked, but the author has not reviewed the wording line by line.
          </p>
        )}

        {c.gloss && (
          /* 有門派底紋的人物：訓詁塊半透明底（alpha 0.58），讓底層紋樣連續透出；其餘人物維持不透明 */
          <div style={{ marginTop: 22, borderLeft: `2px solid ${profileAccent}`, background: factionMark ? `${T.panelHi}94` : T.panelHi, padding: "12px 16px" }}>
            <SectionLabel zh={en && !tr?.gloss}>{t("名字訓詁")}</SectionLabel>
            <div className="profile-prose profile-gloss" style={{ fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.muted, lineHeight: 2.05 }}>
              {tr?.gloss ? (typeof tr.gloss === "string" ? tr.gloss : <>
                {tr.gloss.passages.map(({ work, section, quote }) => (
                  <p key={work}><cite>{work}</cite>, {section}: {quote}</p>
                ))}
                <p className="profile-gloss-explanation">{tr.gloss.explanation}</p>
              </>) : <Zh>{c.gloss}</Zh>}
            </div>
          </div>
        )}

        {c.profile && (() => {
          const rows = c.profile.map(([k, v]) => [k, ...profileRow(locale, c, k, v)]);
          return (
            <div style={{ marginTop: 24 }}>
              <SectionLabel zh={allZh(rows.filter(([, v]) => v).map(([, v, zh]) => [v, zh]))}>{t("檔案")}</SectionLabel>
              {rows.map(([k, v, zh]) => (
                <div key={k} style={{ display: "flex", gap: 14, padding: "7px 0", borderBottom: `1px solid ${T.line}44` }}>
                  <div className="profile-label" style={{ minWidth: 68, fontSize: 12, letterSpacing: "0.12em", color: T.faint, fontFamily: "HuiwenZhengKai", paddingTop: 3 }}>{t(k)}</div>
                  <div className={`profile-prose${zh ? " zh-src" : ""}`} lang={zh ? "zh" : undefined} style={{ flex: 1, fontFamily: "HuiwenZhengKai", fontSize: 14, color: v ? T.ink : T.faint, lineHeight: 1.9, minHeight: 20 }}>{v ?? ""}</div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* 任職履歷：自任職庫（posts-data.js）生成；跨職位者在編制圖上各有一色。
            一人任職跨兩個門派（如嵐川雲）時逐條標門派；勳、散另列於後，不上編制圖 */}
        {(() => {
          const ts = tenuresOf(c.id);
          const gs = grantsOf(c.id);
          if (!ts.length && !gs.length) return null;
          const facs = [...new Set(ts.map(tenureFac))];
          return (
            <div style={{ marginTop: 24 }}>
              <SectionLabel>{t("任職履歷")}</SectionLabel>
              {ts.map((x, i) => {
                /* 職銜英译查 i18n/posts.en.js，上下文（how / end / note）查 i18n/tenures.en.js（皆見 posts-content.js）；逐項回落中文 */
                const [how, howZh] = tenureNoteTx(locale, x.how);
                const [end, endZh] = tenureNoteTx(locale, x.end);
                const [note, noteZh] = tenureNoteTx(locale, x.note);
                const piece = (s, z) => (z ? <Zh>{s}</Zh> : s);
                const [title, titleZh] = tenureTitleTx(locale, x);
                return (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "6px 0", borderBottom: `1px solid ${T.line}44` }}>
                    <div style={{ width: 118, flexShrink: 0, fontSize: 12, color: T.accent, fontFamily: "HuiwenZhengKai", paddingTop: 3 }}>{tenureSpanFor(locale, x)}</div>
                    <div className="profile-prose" style={{ flex: 1, fontFamily: "HuiwenZhengKai", fontSize: 14, color: T.ink, lineHeight: 1.85 }}>
                      {facs.length > 1 && <span style={{ marginRight: 8, fontSize: 11, color: T.faint }}>{facName(locale, tenureFac(x))}</span>}
                      {titleZh ? <Zh>{title}</Zh> : title}
                      {x.kind !== "正授" && <span style={{ marginLeft: 8, fontSize: 11, color: T.muted, border: `1px ${x.kind === "差遣" ? "solid" : "dashed"} ${T.line}`, padding: "0 6px", borderRadius: 3 }}>{t(x.kind)}</span>}
                      {x.draft && <span title={note || undefined} style={{ marginLeft: 8, fontSize: 10.5, color: T.seal, border: `1px dashed ${T.seal}88`, padding: "0 5px", borderRadius: 3 }}>{t("待核")}</span>}
                      {(how || end) && (
                        <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.75 }}>
                          {how && piece(how, howZh)}
                          {how && end && (en ? " " : "　")}
                          {end && <>→ {piece(end, endZh)}</>}
                        </div>
                      )}
                      {/* 待核的任期把缘由（note）直接写出来，与编制图浮签一致；不靠悬停 */}
                      {x.draft && note && <div style={{ fontSize: 12, color: T.seal, lineHeight: 1.7 }}>{piece(note, noteZh)}</div>}
                    </div>
                  </div>
                );
              })}
              {gs.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 11.5, color: T.faint, fontFamily: "HuiwenZhengKai", marginBottom: 2 }}>{t("勳、散")}</div>
                  {gs.map((g, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "3px 0" }}>
                      <div style={{ width: 118, flexShrink: 0, fontSize: 12, color: T.accent, fontFamily: "HuiwenZhengKai" }}>{g.m ? `${g.y}.${g.m}` : g.y}{g.approx ? t("（约）") : ""}</div>
                      <div className="profile-prose" style={{ flex: 1, fontFamily: "HuiwenZhengKai", fontSize: 13.5, color: T.ink, lineHeight: 1.8 }}>
                        {(([txt, z]) => (z ? <Zh>{txt}</Zh> : txt))(grantTx(locale, g))}
                        {g.draft && <span title={g.note} style={{ marginLeft: 8, fontSize: 10.5, color: T.seal, border: `1px dashed ${T.seal}88`, padding: "0 5px", borderRadius: 3 }}>{t("待核")}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {facs.map((f) => (
                  <button key={f} onClick={() => { setShowAll(false); onOpenPosts(f); }}
                    style={{ fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "3px 12px", borderRadius: 3, cursor: "pointer" }}>
                    {t("在編制圖中看")}{facs.length > 1 ? ` · ${facName(locale, f)}` : ""} ›
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {anecdotes.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <SectionLabel zh={allZh(anecdotes)}>{t("個人軼事")}</SectionLabel>
            {shownAnecdotes.map(([a, zh], i) => (
              <p key={i} className={zh ? "zh-src" : undefined} lang={zh ? "zh" : undefined} style={{ fontFamily: "HuiwenZhengKai", fontSize: 14, color: T.ink, lineHeight: 1.95, margin: "0 0 12px" }}>
                <span style={{ color: profileAccent, marginRight: 8 }}>・</span>{a}
              </p>
            ))}
            {anecdotes.length > 4 && (
              <button onClick={() => setShowAll(!showAll)} style={{ fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "4px 14px", cursor: "pointer" }}>
                {showAll ? t("收起") : t("展開其餘 {n} 條", { n: anecdotes.length - 4 })}
              </button>
            )}
          </div>
        )}

        {highlights.length > 0 && (
          <div style={{ marginTop: 24, borderTop: `1px solid ${profileAccent}55`, borderRight: `1px solid ${profileAccent}55`, borderBottom: `1px solid ${profileAccent}55`, borderLeft: `3px solid ${profileAccent}`, padding: "12px 16px" }}>
            <SectionLabel zh={allZh(highlights)}>{t("高光")}</SectionLabel>
            {highlights.map(([h, zh], i) => (
              <div key={i} className={zh ? "zh-src" : undefined} lang={zh ? "zh" : undefined} style={{ fontFamily: "HuiwenZhengKai", fontSize: 14, color: T.ink, lineHeight: 1.95 }}>{h}</div>
            ))}
          </div>
        )}

        {(() => {
          const rels = RELATIONS.filter((r) => r.a === c.id || r.b === c.id);
          if (!rels.length) return null;
          return (
            <div style={{ marginTop: 24 }}>
              <SectionLabel>{t("關係（自關係庫）")}</SectionLabel>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {rels.map((r, i) => {
                  const o = byId[r.a === c.id ? r.b : r.a];
                  const relEn = relName(locale, r.t);
                  return (
                    <button key={i} onClick={() => { setShowAll(false); onOpenChar(o); }}
                      style={{ fontSize: 12.5, fontFamily: "HuiwenZhengKai", color: T.ink, background: T.panelHi, border: `1px ${r.da ? "dashed" : "solid"} ${relColor(r.t)}88`, padding: "4px 10px", borderRadius: "3px", cursor: "pointer", textAlign: "left" }}>
                      <ChipName c={o} />
                      <span style={{ color: relColor(r.t), marginLeft: 8, fontSize: 11 }}>{en && /[\u4e00-\u9fff]/.test(relEn) ? <Zh>{relEn}</Zh> : relEn}</span>
                      <span style={{ color: T.faint, marginLeft: 6, fontSize: 10.5 }}>
                        {r.y0 ?? "？"}{r.y1 != null && r.y1 !== r.y0 ? `${en ? "–" : "—"}${r.y1}` : ""}{r.ph ? ` · ${t("殁后")}` : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {coList.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <SectionLabel>{t("同事人物（共見事件計數）")}</SectionLabel>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {coList.map(([id, n]) => (
                <button key={id} onClick={() => { setShowAll(false); onOpenChar(byId[id]); }} style={{ fontSize: 13, fontFamily: "HuiwenZhengKai", color: T.ink, background: T.panelHi, border: `1px solid ${T.line}`, padding: "4px 10px", borderRadius: "3px", cursor: "pointer" }}>
                  <ChipName c={byId[id]} /><span style={{ color: T.muted, marginLeft: 8, fontSize: 11 }}>{n}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 所系之事：余波层的轻入口——作者按，不入事实层；有回响才出现 */}
        {(() => {
          const mine = ECHOES.filter((x) => x.who === c.id);
          if (!mine.length) return null;
          return (
            <div style={{ marginTop: 24 }}>
              <SectionLabel>{t("所系之事")}</SectionLabel>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {mine.map((x) => {
                  const sh = SHOCKS.find((q) => q.id === x.shock);
                  return (
                    <button key={x.shock} onClick={() => { setShowAll(false); onOpenEcho(x.shock, c.id); }}
                      style={{ textAlign: "left", fontFamily: "HuiwenZhengKai", background: "none", border: `1px solid ${T.line}`, borderRadius: 3, padding: "6px 12px", cursor: "pointer" }}>
                      <div style={{ fontSize: 11, color: T.faint }}>{sh.year}.{sh.month} · {shockTitle(locale, sh)}</div>
                      <div style={{ fontSize: 14, color: T.ink, marginTop: 2 }}>
                        {modeText(locale, x.mode)}
                        {x.draft && <span title={t("起草待核：作者尚未逐行核定")} style={{ marginLeft: 8, fontSize: 10.5, color: T.seal, border: `1px dashed ${T.seal}88`, padding: "0 5px", borderRadius: 3 }}>{t("待核")}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {related.length > 0 ? (
          <div style={{ marginTop: 24 }}>
            <SectionLabel zh={allZh(related.map((e) => [null, eventTitle(locale, e) === e.title]))}>{t("繫年事件（依 年·月·序號）")}</SectionLabel>
            {(() => {
              let ly = null;
              return related.map((e, i) => {
                const firstOfYear = e.year !== ly;
                ly = e.year;
                const title = eventTitle(locale, e);
                const zh = en && title === e.title;
                return (
                  <div key={i} style={{ display: "flex", gap: 14, marginTop: 10 }}>
                    <div style={{ minWidth: 78 }}>
                      <div style={{ fontFamily: "HuiwenZhengKai", color: T.accent, fontSize: 13 }}>
                        {e.year}{e.month != null && (en ? `.${e.month}` : `·${e.month}月`)}{e.seq && ` ${e.seq}`}
                      </div>
                      {firstOfYear && (
                        <div style={{ fontFamily: "HuiwenZhengKai", fontSize: 10.5, color: T.faint, marginTop: 1 }}>{en ? englishEraOf(e.year) : eraOf(e.year)}</div>
                      )}
                    </div>
                    <div className={zh ? "zh-src" : undefined} lang={zh || !en ? "zh" : "en"} style={{ fontSize: 13, color: T.ink, lineHeight: 1.75, fontFamily: "HuiwenZhengKai" }}>{title}</div>
                  </div>
                );
              });
            })()}
          </div>
        ) : (
          <div style={{ marginTop: 24, fontSize: 13, color: T.faint, fontFamily: "HuiwenZhengKai" }}>{t("事件庫中暫無此人繫年條目。")}</div>
        )}

        {mentionGroups.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <SectionLabel>{t("見於文庫（本名計數）")}</SectionLabel>
            {mentionGroups.map((g) => {
              const open = openGroups.has(g.key);
              return (
                <div key={g.key} style={{ marginBottom: 6 }}>
                  <button onClick={() => toggleGroup(g.key)}
                    style={{ display: "block", textAlign: "left", fontSize: 12.5, fontFamily: "HuiwenZhengKai", color: T.ink, background: T.panelHi, border: `1px solid ${T.line}`, padding: "4px 10px", borderRadius: "3px", cursor: "pointer" }}>
                    <span style={{ color: T.accent, fontSize: 10, marginRight: 6 }}>{open ? "▾" : "▸"}</span>
                    {en && /[\u4e00-\u9fff]/.test(g.label) ? <Zh>【{g.label}】</Zh> : en ? g.label : `【${g.label}】`}
                    <span style={{ color: T.muted, marginLeft: 8, fontSize: 11 }}>{libraryCountText(locale, g.chapters.length, "chapters")}</span>
                  </button>
                  {open && (
                    <div className="flex flex-wrap" style={{ gap: 8, margin: "8px 0 10px 22px" }}>
                      {g.chapters.map(({ f, n }) => (
                        <button key={f.path} onClick={() => { setShowAll(false); onOpenNovel(f.path); }}
                          style={{ fontSize: 12.5, fontFamily: "HuiwenZhengKai", color: T.ink, background: T.panelHi, border: `1px solid ${T.line}`, padding: "4px 10px", borderRadius: "3px", cursor: "pointer" }}>
                          {(() => { const ct = novelTitle(locale, f.ch.title); return en && ct === f.ch.title ? <Zh>{ct}</Zh> : ct; })()}<span style={{ color: T.muted, marginLeft: 8, fontSize: 11 }}>{libraryCountText(locale, n, "mentions")}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 年表 ---------------- */
/* ---------------- 事件年表：自適應分段折疊 + 側欄目錄 ---------------- */
/* 段界為顯式常量：疏處以紀元歸併，亂世十年（755—765）細分，尾部合段。
   日後調整段界，改 from / to / label 即可，歸桶、計數、色帶自動跟隨。
   歸桶規則：取第一個 year <= to 的段；早於首段者入首段，晚於末段者入末段。 */
const TIMELINE_SECTIONS = [
  { key: "s00", from: 651, to: 706, label: "永徽—神龙", en: "Yonghui – Shenlong" },
  { key: "s01", from: 707, to: 736, label: "景龙—开元二十四年", en: "Jinglong – Kaiyuan 24" },
  { key: "s02", from: 737, to: 744, label: "开元二十五年—天宝三年", en: "Kaiyuan 25 – Tianbao 3" },
  { key: "s03", from: 745, to: 751, label: "天宝四年—十年", en: "Tianbao 4–10" },
  { key: "s04", from: 752, to: 754, label: "天宝十一年—十三年", en: "Tianbao 11–13" },
  { key: "s05", from: 755, to: 755, label: "天宝十四年", en: "Tianbao 14" },
  { key: "s06", from: 756, to: 756, label: "天宝十五年—至德元年", en: "Tianbao 15 – Zhide 1", byMonth: true },
  { key: "s07", from: 757, to: 757, label: "至德二年", en: "Zhide 2", byMonth: true },
  { key: "s08", from: 758, to: 759, label: "乾元元年—二年", en: "Qianyuan 1–2" },
  { key: "s09", from: 760, to: 761, label: "上元元年—二年", en: "Shangyuan 1–2" },
  { key: "s10", from: 762, to: 763, label: "宝应元年—二年", en: "Baoying 1–2" },
  { key: "s11", from: 764, to: 765, label: "广德二年—永泰元年", en: "Guangde 2 – Yongtai 1" },
  { key: "s12", from: 766, to: 800, label: "大历—贞元", en: "Dali – Zhenyuan" },
];
const CN_DIG = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const cnCount = (n) => {
  if (n < 10) return CN_DIG[n];
  if (n < 20) return "十" + (n % 10 ? CN_DIG[n % 10] : "");
  if (n < 100) return CN_DIG[Math.floor(n / 10)] + "十" + (n % 10 ? CN_DIG[n % 10] : "");
  return String(n);
};
const secYears = (s) => (s.from === s.to ? String(s.from) : `${s.from}–${s.to}`);
const secLabel = (locale, s) => (locale === "en" ? s.en : s.label);
/* 「若干事」：中文用漢字數目，英文用阿拉伯數字並分單複數（ui.js「{n}事」） */
const evCount = (locale, t, n) => t("{n}事", { n: locale === "en" ? n : cnCount(n) });
/* 年中改元者，月份標籤分軌（byMonth 僅施於單年段；756 七月改元至德） */
const ERA_SWITCH = { 756: { at: 7, before: "天宝十五年", after: "至德元年" } };
const eraOfYM = (y, m) => {
  const s = ERA_SWITCH[y];
  if (s && m != null) return m < s.at ? s.before : s.after;
  return eraOf(y);
};

/* 門派色帶：段內各門派事件占比壓成一根橫向色帶；未標門派以中性深灰收尾 */
function FacBand({ segs, none, height = 4, maxWidth }) {
  const locale = useLocale();
  const t = useT();
  if (segs.length === 0 && none === 0) return null;
  return (
    <div style={{ display: "flex", height, maxWidth: maxWidth || "100%", overflow: "hidden", opacity: 0.9 }}>
      {segs.map(([f, n]) => (
        <div key={f} style={{ flexGrow: n, flexBasis: 0, background: fc(f) }} title={`${facName(locale, f)}${locale === "en" ? ": " : "："}${n}`} />
      ))}
      {none > 0 && <div style={{ flexGrow: none, flexBasis: 0, background: T.neutral }} title={t("门派未标：{n}", { n: none })} />}
    </div>
  );
}

/* 事件行：年表主列表単條，供平鋪與月組兩種佈局共用 */
function EvRow({ e, showYear, onOpenChar, onOpenEcho }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  /* 震源锚事件：年表行上留一个淡淡的入口，通向余波页；未传 onOpenEcho 的视图（舆图）不出 */
  const shocks = onOpenEcho ? SHOCKS.filter((s) => s.ev.year === e.year && s.ev.month === e.month && e.title.includes(s.ev.has)) : []; /* 一事可为多个震源之锚 */
  const title = eventTitle(locale, e);
  const titleZh = en && title === e.title;
  return (
    <div style={{ position: "relative", padding: "0 0 24px 26px", fontFamily: "HuiwenZhengKai" }}>
      <div style={{ position: "absolute", left: -5, top: 7, width: 9, height: 9, background: showYear ? T.accent : T.faint, transform: "rotate(45deg)" }} />
      {showYear && (
        <div style={{ position: "absolute", left: -66, top: 1, fontFamily: "HuiwenZhengKai", fontSize: 16, color: T.accent, width: 48, textAlign: "right" }}>{e.year}</div>
      )}
      <div className="flex items-baseline flex-wrap" style={{ gap: 8 }}>
        <span style={{ fontFamily: "HuiwenZhengKai", fontSize: 12.5, color: T.muted, minWidth: 52 }}>
          {e.month != null ? (en ? monthEn(e.month) : `${e.month} 月`) : t("月份未标")}
        </span>
        {showYear && (
          <span style={{ fontFamily: "HuiwenZhengKai", fontSize: 12, color: T.muted }}>
            {en
              ? `(${englishEraOf(e.year)}${ERA_NOTES_EN[e.year] ? `; ${ERA_NOTES_EN[e.year]}` : ""})`
              : `（${eraOf(e.year)}${e.month != null ? ` ${CN_MONTH[e.month]}` : ""}${ERA_NOTES[e.year] ? `；${ERA_NOTES[e.year]}` : ""}）`}
          </span>
        )}
        {e.seq && (
          <span style={{ fontSize: 11, fontFamily: "HuiwenZhengKai", color: T.onAccent, background: T.accent, padding: "0 6px", borderRadius: "3px", lineHeight: "16px" }}>{e.seq}</span>
        )}
        {e.add && (
          <span style={{ fontSize: 11, fontFamily: "HuiwenZhengKai", color: tone("#C9A15C"), border: `1px solid ${tone("#C9A15C")}55`, padding: "0 6px", borderRadius: "3px" }} title={t("採自人設文檔，尚未錄入 Notion 事件庫")}>{t("增補")}</span>
        )}
        {shocks.map((shock) => (
          <button key={shock.id} onClick={() => onOpenEcho(shock.id)} title={t("余波：{title}——此事笼罩之人与其记忆方式", { title: shockTitle(locale, shock) })}
            style={{ fontSize: 11, fontFamily: "HuiwenZhengKai", color: T.seal, background: "none", border: `1px solid ${T.seal}66`, padding: "0 7px", borderRadius: "3px", lineHeight: "16px", cursor: "pointer" }}>{t("余波")}{shocks.length > 1 ? (en ? `: ${shockTitle(locale, shock).split(": ").pop()}` : `·${shock.title.split("·").pop()}`) : ""} ›</button>
        ))}
        {e.fac.length === 0 && <span style={{ fontSize: 11, color: T.faint, border: `1px dashed ${T.faint}`, padding: "0 6px", borderRadius: "3px" }}>{t("门派未标")}</span>}
        {e.fac.map((f) => (
          <span key={f} style={{ fontSize: 11, color: fcText(f), border: `1px solid ${fc(f)}44`, padding: "0 6px", borderRadius: "3px" }}>{facName(locale, f)}</span>
        ))}
        {e.loc.map((l) => (
          <span key={l} style={{ fontSize: 11, color: T.faint }}>{en && placeName(locale, l) === l ? <Zh>{l}</Zh> : placeName(locale, l)}</span>
        ))}
      </div>
      <div className={titleZh ? "zh-src" : undefined} lang={titleZh || !en ? "zh" : "en"} style={{ fontFamily: "HuiwenZhengKai", fontSize: 15, color: T.ink, lineHeight: 1.8, marginTop: 5, maxWidth: 660 }}>{title}</div>
      {e.chars.length > 0 && (
        <div className="flex flex-wrap" style={{ gap: 6, marginTop: 7 }}>
          {e.chars.map((id) => (
            <button key={id} onClick={() => onOpenChar(byId[id])} style={{ fontSize: 11.5, fontFamily: "HuiwenZhengKai", color: fcText(byId[id].belong[0]), border: `1px solid ${fc(byId[id].belong[0])}44`, background: "none", padding: "1px 8px", borderRadius: "3px", cursor: "pointer" }}>
              <ChipName c={byId[id]} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Timeline({ onOpenChar, onOpenEcho }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const NONE_FAC = "__none__"; /* 「门派未标」一級標籤之內部鍵 */
  const ETH_GROUP = "__ethnic__"; /* 【族属/地属】傘形標籤之內部鍵 */
  const [fsel, setFsel] = useState("all"); /* 一級：門派及同級標籤 */
  const [who, setWho] = useState("all"); /* 二級：人物 */
  const [q, setQ] = useState(""); /* 事件檢索：事名、人物（名／表字）、地點、門派、編號 */
  const [expanded, setExpanded] = useState(() => new Set()); /* 默認全折疊 */
  const [expandedMonths, setExpandedMonths] = useState(() => new Set()); /* 月組次級折疊，鍵形如 "s07:10"，未標月為 -1 */
  const [active, setActive] = useState(null); /* scroll-spy 當前段 */
  const [tocHover, setTocHover] = useState(null); /* 側欄目錄懸停項 → hover 浮起 */
  const secRefs = useRef({});
  const narrow = useNarrow();
  const searching = q.trim() !== ""; /* 檢索中強制展開命中段與月組，清空即恢復原折疊狀態 */

  const inEvents = useMemo(
    () =>
      [...new Set(EVENTS.flatMap((e) => e.chars))].sort(
        (a, b) => EVENTS.filter((e) => e.chars.includes(b)).length - EVENTS.filter((e) => e.chars.includes(a)).length
      ),
    []
  );

  /* 族屬／地屬類標籤：顯式常量，運行時與實有標籤求交集（無事者不顯示）；增刪改此行即可 */
  const ETHNIC_TAGS = ["鲜卑", "羌", "奚人/狼牙", "靺鞨", "西域", "柔然", "南诏", "波斯", "苗疆"];
  /* 一級標籤：事件 fac 標籤 ∪ 涉事人物所屬門派（鮮卑、靺鞨等無事件標籤者由後者補入）。
     計數為成員包含式：事件標籤含 f，或涉事人物隸屬 f。 */
  const facList = useMemo(() => {
    const set = new Set();
    for (const e of EVENTS) {
      e.fac.forEach((f) => set.add(f));
      e.chars.forEach((id) => byId[id].belong.forEach((b) => set.add(b)));
    }
    const inFac = (e, f) => e.fac.includes(f) || e.chars.some((id) => byId[id].belong.includes(f));
    const arr = [...set]
      .map((f) => ({ f, n: EVENTS.filter((e) => inFac(e, f)).length }))
      .sort((a, b) => b.n - a.n);
    const main = arr.filter((x) => !ETHNIC_TAGS.includes(x.f));
    const ethnic = arr.filter((x) => ETHNIC_TAGS.includes(x.f));
    const ethnicUnion = EVENTS.filter((e) => ethnic.some(({ f }) => inFac(e, f))).length;
    return { main, ethnic, ethnicUnion, none: EVENTS.filter((e) => e.fac.length === 0).length };
  }, []);
  const isEthnic = (f) => facList.ethnic.some((x) => x.f === f);

  /* 二級人物：隸屬所選門派且見於事件者；「门派未标」下列未標事件之涉事人物 */
  const subPersons = useMemo(() => {
    if (fsel === "all") return [];
    if (fsel === NONE_FAC) return inEvents.filter((id) => EVENTS.some((e) => e.fac.length === 0 && e.chars.includes(id)));
    return inEvents.filter((id) => byId[id].belong.includes(fsel));
  }, [fsel, inEvents]);

  /* 篩選 → 排序 → 歸桶；目錄計數與色帶隨篩選實時重算 */
  const sections = useMemo(() => {
    const kw = q.trim();
    /* 英文界面：中文原文照查，另查英文译名、译題、年號（不分大小寫） */
    const kwl = kw.toLowerCase();
    const enHit = (str) => en && !!str && str.toLowerCase().includes(kwl);
    const hit = (e) =>
      kw === "" ||
      e.title.includes(kw) ||
      (e.seq || "").includes(kw) ||
      e.loc.some((l) => l.includes(kw) || enHit(placeName(locale, l))) ||
      e.fac.some((f) => f.includes(kw) || enHit(facName(locale, f))) ||
      eraOfYM(e.year, e.month).includes(kw) ||
      enHit(eventTitle(locale, e)) || enHit(englishEraOf(e.year)) ||
      e.chars.some((id) => byId[id].name.includes(kw) || namesText(byId[id]).includes(kw) || enHit(charName(locale, byId[id])));
    const byFaction = (e) =>
      who !== "all" || /* 已選人物則取其完整編年 */
      fsel === "all" ||
      (fsel === NONE_FAC
        ? e.fac.length === 0
        : fsel === ETH_GROUP
        ? facList.ethnic.some(({ f }) => e.fac.includes(f) || e.chars.some((id) => byId[id].belong.includes(f)))
        : e.fac.includes(fsel) || e.chars.some((id) => byId[id].belong.includes(fsel)));
    const shown = EVENTS.filter((e) => (who === "all" || e.chars.includes(who)) && byFaction(e) && hit(e)).sort(sortEvents);
    const buckets = TIMELINE_SECTIONS.map((s) => ({ ...s, evs: [] }));
    for (const e of shown) {
      const b = buckets.find((s) => e.year <= s.to) || buckets[buckets.length - 1];
      b.evs.push(e);
    }
    return buckets.map((b) => {
      const tally = {};
      let none = 0;
      for (const e of b.evs) {
        if (e.fac.length === 0) none += 1;
        else for (const f of e.fac) tally[f] = (tally[f] || 0) + 1;
      }
      return { ...b, none, segs: Object.entries(tally).sort((x, y) => y[1] - x[1]) };
    });
  }, [who, fsel, q, facList, en, locale]);

  /* scroll-spy：主列表滾至何段，目錄對應條目高亮 */
  useEffect(() => {
    const onScroll = () => {
      let cur = null;
      for (const s of TIMELINE_SECTIONS) {
        const el = secRefs.current[s.key];
        if (el && el.getBoundingClientRect().top <= 120) cur = s.key;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 段首吸頂與否：吸頂時方鋪底色（素紙另鋪底紙紋，見 index.css .tl-sec-head），平時透明——
     舊時段首恆鋪 T.bg 純色，紙上純色疊在底紙紋理上，諸段首連成一整塊淺框。
     判準：其所在段已越線而上（段之外框 top 在線上方），段首下緣仍在線下（仍壓著段內之事），且此段展開
     （外框高於段首）。不以「段首貼線」為準：滾至展開段末尾時，段首受外框底邊所推、逐步移出吸頂線，
     其時仍蓋在末尾諸事之上，若即刻轉透明，字便疊在一起（review P2）。
     收起之段整段即段首，過線時不壓任何內容，以「外框高於段首」排除之，免每過一段閃一抹影 */
  const [stuckKey, setStuckKey] = useState(null);
  useEffect(() => {
    const line = narrow ? 42 : 0;
    let raf = 0;
    const check = () => {
      raf = 0;
      let k = null;
      for (const s of TIMELINE_SECTIONS) {
        const el = secRefs.current[s.key];
        if (!el || !el.parentElement) continue;
        const r = el.getBoundingClientRect(), pr = el.parentElement.getBoundingClientRect();
        if (pr.top < line - 1 && r.bottom > line && pr.height > r.height + 1) k = s.key;
      }
      setStuckKey(k);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [narrow, expanded, searching]);

  const toggle = (key) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  const monthKeysOf = (s) => {
    const seen = new Set();
    for (const e of s.evs) {
      const m = e.month == null ? -1 : e.month;
      seen.add(`${s.key}:${m}`);
    }
    return [...seen];
  };
  const toggleAllMonths = (s) => {
    const keys = monthKeysOf(s);
    setExpandedMonths((prev) => {
      const allOpen = keys.every((k) => prev.has(k));
      const next = new Set(prev);
      keys.forEach((k) => (allOpen ? next.delete(k) : next.add(k)));
      return next;
    });
  };
  const toggleMonth = (gk) =>
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      next.has(gk) ? next.delete(gk) : next.add(gk);
      return next;
    });
  const expandAll = () => {
    setExpanded(new Set(sections.filter((s) => s.evs.length > 0).map((s) => s.key)));
    const mk = [];
    for (const s of sections) {
      if (!s.byMonth) continue;
      const seen = new Set();
      for (const e of s.evs) {
        const m = e.month == null ? -1 : e.month;
        if (!seen.has(m)) { seen.add(m); mk.push(`${s.key}:${m}`); }
      }
    }
    setExpandedMonths(new Set(mk));
  };
  const collapseAll = () => { setExpanded(new Set()); setExpandedMonths(new Set()); };
  /* 目錄點擊 = 展開 + 平滑滾動 二合一 */
  const jumpTo = (key) => {
    setExpanded((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
    requestAnimationFrame(() => {
      const el = secRefs.current[key];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  /* 目錄條目（寬屏側欄與窄屏芯片共用數據） */
  const Toc = () => (
    <div className="toc-scroll" style={{ width: 180, flexShrink: 0, position: "sticky", top: 16, maxHeight: "calc(100vh - 32px)", overflowY: "auto", overflowX: "hidden", paddingRight: 12 }}>
      {/* 目錄縱向滾動條深色化：僅作用於 .toc-scroll，不及全站 */}
      <style>{`
.toc-scroll{scrollbar-width:thin;scrollbar-color:${T.xScrollThumb} ${T.xScrollTrack}}
.toc-scroll::-webkit-scrollbar{width:8px}
.toc-scroll::-webkit-scrollbar-track{background:${T.xScrollTrack}}
.toc-scroll::-webkit-scrollbar-thumb{background:${T.xScrollThumb};border-radius:4px}
.toc-scroll::-webkit-scrollbar-thumb:hover{background:${T.xScrollThumbHi}}
`}</style>
      <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 10.5, letterSpacing: en ? "0.12em" : "0.4em", color: T.faint, marginBottom: 10 }}>{t("分段目錄")}</div>
      {sections.map((s) => {
        const empty = s.evs.length === 0;
        const isActive = active === s.key;
        const hov = tocHover === s.key && !empty;
        return (
          <button
            key={s.key}
            disabled={empty}
            onClick={() => jumpTo(s.key)}
            onMouseEnter={() => { if (!empty) setTocHover(s.key); }}
            onMouseLeave={() => setTocHover((h) => (h === s.key ? null : h))}
            style={{
              display: "block", width: "100%", textAlign: "left", background: hov ? T.xWash : "none",
              border: "none", borderLeft: isActive ? `2px solid ${T.accent}` : `2px solid transparent`,
              padding: hov ? "11px 12px 12px 14px" : "7px 8px 8px 10px", /* hover 四向各擴 4px，負 margin 補償，不擠鄰項 */
              margin: hov ? "-4px" : 0,
              cursor: empty ? "default" : "pointer", opacity: empty ? 0.35 : 1,
              transform: hov ? "translateX(6px) translateY(-2px) scale(1.025)" : "none",
              boxShadow: hov ? T.xWashLift : "none",
              borderRadius: hov ? "4px" : 0,
              transition: "transform .18s ease, box-shadow .18s ease, background .18s ease",
            }}>
            <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 12.5, color: isActive ? T.ink : T.muted, lineHeight: 1.5 }}>{secLabel(locale, s)}</div>
            <div style={{ fontFamily: "JingHuaLaoSong", fontSize: 10.5, color: T.faint, margin: "2px 0 5px" }}>
              {secYears(s)} · {evCount(locale, t, s.evs.length)}
            </div>
            <FacBand segs={s.segs} none={s.none} />
          </button>
        );
      })}
      <div className="flex" style={{ gap: 6, marginTop: 12, paddingLeft: 10 }}>
        <button onClick={expandAll} style={{ fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "2px 8px", cursor: "pointer" }}>{t("全部展開")}</button>
        <button onClick={collapseAll} style={{ fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "2px 8px", cursor: "pointer" }}>{t("全部收起")}</button>
      </div>
    </div>
  );

  /* 窄屏：目錄退化為列表頂部橫向可滑動分段芯片 */
  const TocStrip = () => (
    <div style={{ position: "sticky", top: 0, zIndex: 5, background: T.bg, display: "flex", gap: 6, overflowX: "auto", padding: "8px 0 10px", marginBottom: 4, borderBottom: `1px solid ${T.line}` }}>
      {sections.map((s) => {
        const empty = s.evs.length === 0;
        const isActive = active === s.key;
        return (
          <button
            key={s.key}
            disabled={empty}
            onClick={() => jumpTo(s.key)}
            style={{
              flexShrink: 0, fontFamily: "JingHuaLaoSong", fontSize: 11.5,
              color: isActive ? T.onAccent : T.muted,
              background: isActive ? T.accent : "transparent",
              border: `1px solid ${isActive ? T.accent : T.line}`,
              padding: "2px 10px", cursor: empty ? "default" : "pointer", opacity: empty ? 0.35 : 1,
            }}>
            {secYears(s)} · {evCount(locale, t, s.evs.length)}
          </button>
        );
      })}
      <button onClick={expandAll} style={{ flexShrink: 0, fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "2px 8px", cursor: "pointer" }}>{t("全展")}</button>
      <button onClick={collapseAll} style={{ flexShrink: 0, fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "2px 8px", cursor: "pointer" }}>{t("全收")}</button>
    </div>
  );

  return (
    <div>
      {narrow && <TocStrip />}
      <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
        {!narrow && <Toc />}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 英文界面：年表屬 T2 工作译本（docs/english-edition.md），標明之；條數已見於頁頭總說明，不重出 */}
          {en && (
            <p style={{ fontFamily: "JingHuaLaoSong", fontSize: 12.5, color: T.muted, lineHeight: 1.6, margin: "0 0 14px", maxWidth: 660 }}>
              The chronology is a working translation: names and terms are checked, but the author has not reviewed the wording line by line.
            </p>
          )}
          <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: fsel === "all" ? 18 : 10 }}>
            <Chip active={fsel === "all"} onClick={() => { setFsel("all"); setWho("all"); }} label={t("全部")} fontFamily="JingHuaLaoSong" />
            {facList.main.map(({ f, n }) => (
              <Chip key={f} active={fsel === f} onClick={() => { setFsel(f); setWho("all"); }} label={`${facName(locale, f)} ${n}`} fontFamily="JingHuaLaoSong" />
            ))}
            {facList.ethnic.length > 0 && (
              <Chip
                active={fsel === ETH_GROUP || isEthnic(fsel)}
                onClick={() => { setFsel(ETH_GROUP); setWho("all"); }}
                label={t("族属/地属 {n}", { n: facList.ethnicUnion })} fontFamily="JingHuaLaoSong" />
            )}
            {facList.none > 0 && (
              <Chip active={fsel === NONE_FAC} onClick={() => { setFsel(NONE_FAC); setWho("all"); }} label={t("门派未标 {n}", { n: facList.none })} fontFamily="JingHuaLaoSong" />
            )}
          </div>
          {(fsel === ETH_GROUP || isEthnic(fsel)) && (
            <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: isEthnic(fsel) ? 10 : 18, paddingLeft: 4, borderLeft: `2px solid ${T.line}` }}>
              <span style={{ fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.faint, margin: "0 4px" }}>{t("族属/地属 · 标签")}</span>
              {facList.ethnic.map(({ f, n }) => (
                <Chip key={f} active={fsel === f}
                  onClick={() => { setFsel((prev) => (prev === f ? ETH_GROUP : f)); setWho("all"); }}
                  label={`${facName(locale, f)} ${n}`} fontFamily="JingHuaLaoSong" />
              ))}
            </div>
          )}
          {fsel !== "all" && fsel !== ETH_GROUP && (
            <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 18, paddingLeft: 4, borderLeft: `2px solid ${T.line}` }}>
              <span style={{ fontSize: 11, fontFamily: "JingHuaLaoSong", color: T.faint, margin: "0 4px" }}>
                {fsel === NONE_FAC ? t("未标事件 · 人物") : t("{f} · 人物", { f: facName(locale, fsel) })}
              </span>
              {subPersons.map((id) => (
                <Chip key={id} active={who === id} onClick={() => setWho((prev) => (prev === id ? "all" : id))} label={charName(locale, byId[id])} fontFamily="JingHuaLaoSong" />
              ))}
              {subPersons.length === 0 && (
                <span style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.faint }}>{t("此標籤下無入事人物檔案")}</span>
              )}
            </div>
          )}
          {/* 色例：年表分段之門派色帶（FacBand）舊惟浮字可辨，今於此可查全譜 */}
          <div style={{ marginBottom: 10 }}><FactionKey /></div>
          <div style={{ marginBottom: 18 }}>
            <span style={{ position: "relative", display: "inline-block" }}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("檢索事名、人物、地點、門派、紀年")}
                style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: "3px", color: T.ink, fontSize: 13, fontFamily: "HuiwenZhengKai", padding: "6px 12px 6px 34px", outline: "none", minWidth: 300 }} />
              <SearchTag fontFamily="HuiwenZhengKai" />
            </span>
          </div>
          {sections.every((s) => s.evs.length === 0) && (
            <div style={{ color: T.faint, fontFamily: serif, padding: 40, textAlign: "center" }}>{t("無合於此檢索之事。")}</div>
          )}
          {sections.map((s) => {
            const empty = s.evs.length === 0;
            const open = (searching || expanded.has(s.key)) && !empty;
            return (
              <div key={s.key} style={{ marginBottom: open ? 10 : 0 }}>
                <div
                  ref={(el) => { secRefs.current[s.key] = el; }}
                  className="tl-sec-head" data-stuck={stuckKey === s.key ? "" : undefined}
                  onClick={() => !empty && toggle(s.key)}
                  style={{
                    /* 吸頂時方鋪底（見 stuckKey）；用 backgroundColor 而非 background 簡寫，素紙之底紙紋（CSS background-image）方不被蓋掉 */
                    position: "sticky", top: narrow ? 42 : 0, zIndex: 3, backgroundColor: stuckKey === s.key ? T.bg : "transparent",
                    borderBottom: `1px solid ${T.line}`, padding: "10px 0 9px",
                    cursor: empty ? "default" : "pointer", opacity: empty ? 0.35 : 1,
                    scrollMarginTop: narrow ? 46 : 4,
                  }}>
                  <div className="flex items-baseline flex-wrap" style={{ gap: 10 }}>
                    <span style={{ color: T.accent, fontSize: 12, width: 13, display: "inline-block" }}>{open ? "▾" : "▸"}</span>
                    <span style={{ fontFamily: "HuiwenMingChao", fontSize: 15.5, color: T.ink }}>{secLabel(locale, s)}</span>
                    <span style={{ fontFamily: "HuiwenMingChao", fontSize: 12, color: T.muted }}>
                      {secYears(s)} · {empty ? t("無事") : evCount(locale, t, s.evs.length)}
                    </span>
                    {s.byMonth && open && !searching && (
                      <button
                        onClick={(ev) => { ev.stopPropagation(); toggleAllMonths(s); }}
                        style={{ marginLeft: "auto", fontSize: 11, fontFamily: "HuiwenMingChao", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "1px 8px", cursor: "pointer" }}>
                        {monthKeysOf(s).every((k) => expandedMonths.has(k)) ? t("收起諸月") : t("展開諸月")}
                      </button>
                    )}
                  </div>
                  <div style={{ marginTop: 7, marginLeft: 23 }}>
                    <FacBand segs={s.segs} none={s.none} maxWidth={340} />
                  </div>
                </div>
                {open && (
                  <div style={{ borderLeft: `1px solid ${T.line}`, marginLeft: 40, paddingTop: 18 }}>
                    {(() => {
                      let lastYear = null;
                      const row = (e, key) => {
                        const showYear = e.year !== lastYear;
                        lastYear = e.year;
                        return <EvRow key={key} e={e} showYear={showYear} onOpenChar={onOpenChar} onOpenEcho={onOpenEcho} />;
                      };
                      if (!s.byMonth) return s.evs.map((e, i) => row(e, i));
                      /* 月份次級折疊：evs 已按 sortEvents 排定（未標月居首），依次歸組 */
                      const groups = [];
                      for (const e of s.evs) {
                        const m = e.month == null ? -1 : e.month;
                        const last = groups[groups.length - 1];
                        if (last && last.m === m) last.evs.push(e);
                        else groups.push({ m, evs: [e] });
                      }
                      return groups.map((g) => {
                        const gk = `${s.key}:${g.m}`;
                        const gOpen = searching || expandedMonths.has(gk);
                        const mLabel = g.m === -1 ? t("月份未標") : en ? monthEn(g.m) : CN_MONTH[g.m];
                        return (
                          <div key={gk}>
                            <div
                              onClick={() => toggleMonth(gk)}
                              style={{ position: "relative", padding: "0 0 18px 26px", cursor: "pointer", userSelect: "none" }}>
                              <div style={{ position: "absolute", left: -8, top: 4, width: 13, height: 13, border: `1px solid ${T.accent}`, background: gOpen ? T.accent : T.bg, transform: "rotate(45deg)" }} />
                              <span style={{ color: T.accent, fontSize: 11, marginRight: 8 }}>{gOpen ? "▾" : "▸"}</span>
                              <span style={{ fontFamily: "HuiwenMingChao", fontSize: 13.5, color: gOpen ? T.ink : T.muted }}>{mLabel}</span>
                              {g.m !== -1 && (
                                <span style={{ fontFamily: "HuiwenMingChao", fontSize: 11.5, color: T.faint, marginLeft: 8 }}>{en ? eraZhToEn(eraOfYM(s.from, g.m)) : `${eraOfYM(s.from, g.m)}${mLabel}`}</span>
                              )}
                              <span style={{ fontFamily: "HuiwenMingChao", fontSize: 11.5, color: T.faint, marginLeft: 10 }}>{evCount(locale, t, g.evs.length)}</span>
                            </div>
                            {gOpen && g.evs.map((e, i) => row(e, `${gk}-${i}`))}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 三幅圖（行星、群像、輿地）之字：舊皆作 serif 回退系統宋體，全站既已遷入汇文字族，
   獨此三幅仍是另一套字。今從站內既有之例分派——人名從人物卡姓名之例用明朝體，
   其餘（地名、門派、紀年、軌名、圖例、說明、浮框）從界面控件之例用京華老宋。
   兩者皆已註冊於 index.css；老宋未裁子集，明朝之子集經核可覆全站可渲染漢字，無回退之虞。 */
const gName = `"HuiwenMingChao",${serif}`;
const gUI = `"JingHuaLaoSong",${serif}`;

/* ---------------- 圖幅縮放平移：滑鼠與觸屏共用 ---------------- */
/* 三幅圖（行星、群像、輿地）共用。k 為倍率，t 為平移（viewBox 座標）。
   k===1 時一概不接管手勢：touchAction 交還瀏覽器，單指仍可劃過圖幅翻頁，
   放大須先按 ＋；k>1 後才吃掉手勢，做單指平移與雙指捏合（以兩指中點為錨）。 */
function usePanZoom(w, h) {
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 });
  /* 回調恒讀最新 view：pointerup 與排隊中的 pointermove 更新可交錯，
     閉包裡的 view 會滯後，據之計算則圖幅跳變 */
  const viewRef = useRef(view);
  viewRef.current = view;
  const ptsRef = useRef(new Map()); /* pointerId → 當前屏幕座標，多指並存 */
  const dragRef = useRef(null);     /* 單指／滑鼠拖曳起點暫存 */
  const pinchRef = useRef(null);    /* 捏合起手：兩指距離、中點、當時 view */
  const movedRef = useRef(0);       /* 拖曳位移量：>5 則抑制本次點選，防拖後誤觸 */
  const wheelElRef = useRef(null);  /* 掛原生 wheel 監聽之幅面元素 */

  const clampK = (k) => Math.min(8, Math.max(1, k));
  /* 以幅面中心為錨：＋／－ 按鈕走此路 */
  const zoomBy = (f) =>
    setView((v) => {
      const k2 = clampK(v.k * f);
      if (k2 === 1) return { k: 1, tx: 0, ty: 0 };
      const cx = w / 2, cy = h / 2;
      return { k: k2, tx: cx - (k2 / v.k) * (cx - v.tx), ty: cy - (k2 / v.k) * (cy - v.ty) };
    });
  const reset = () => setView({ k: 1, tx: 0, ty: 0 });

  /* 滾輪／觸控板捏合縮放：以游標為錨連續放縮。
     React 19 於根節點掛 wheel 為 passive，JSX onWheel 內 preventDefault 無效，
     故走原生 non-passive 監聽。靜止(k===1)時平常滾輪讓位頁面捲動；
     唯捏合（觸控板雙指，瀏覽器合成 ctrlKey）可於原始大小起手放大——同 Google 地圖之例。 */
  useEffect(() => {
    const el = wheelElRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const v = viewRef.current;
      if (v.k === 1 && !e.ctrlKey) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      const s = w / rect.width; /* 屏幕像素 → viewBox 座標 */
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;             /* 行 → 像素 */
      else if (e.deltaMode === 2) dy *= rect.height; /* 頁 → 像素 */
      /* 捏合 delta 細碎、滾輪成塊，分授係數，手感歸一 */
      const k2 = clampK(v.k * Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0018)));
      if (k2 === v.k) return; /* 已抵夾限，不攔頁面捲動 */
      e.preventDefault();
      if (k2 === 1) { setView({ k: 1, tx: 0, ty: 0 }); return; }
      const cx = (e.clientX - rect.left) * s, cy = (e.clientY - rect.top) * s;
      const gx = (cx - v.tx) / v.k, gy = (cy - v.ty) / v.k;
      setView({ k: k2, tx: cx - k2 * gx, ty: cy - k2 * gy });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [w, h]);

  const endPointer = (e) => {
    const pts = ptsRef.current;
    pts.delete(e.pointerId);
    /* 安卓上指針或已自行釋放，release 之則擲 NotFoundError，故先問後放並兜住 */
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch { /* 已釋放，無妨 */ }
    if (pts.size < 2) pinchRef.current = null;
    /* 捏合鬆開一指：以殘留之指重新起手，免圖幅跳變 */
    if (pts.size === 1) {
      const [r] = [...pts.values()];
      const v = viewRef.current;
      dragRef.current = { x: r.x, y: r.y, tx: v.tx, ty: v.ty, cap: true };
    } else if (pts.size === 0) {
      dragRef.current = null;
    }
  };

  const handlers = {
    onPointerDown: (e) => {
      /* 位移量無條件歸零：k===1 時亦然。否則「放大→拖動→復位」後
         movedRef 永停於 >5，此後一切點選盡被當作拖後誤觸吞掉 */
      movedRef.current = 0;
      const v = viewRef.current;
      if (v.k === 1) return;
      const pts = ptsRef.current;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size >= 2) {
        /* 雙指捏合：即刻捕獲兩指，免一指滑出幅面而斷 */
        for (const id of pts.keys()) {
          try { e.currentTarget.setPointerCapture?.(id); } catch { /* 捕獲不成則退為普通事件流 */ }
        }
        const [a, b] = [...pts.values()];
        pinchRef.current = {
          d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2,
          k: v.k, tx: v.tx, ty: v.ty,
        };
        dragRef.current = null;
      } else {
        /* 單指／滑鼠：暫不捕獲。指針一經捕獲，pointerup 即改投幅面本身，
           click 隨之落在幅面而非所點之地，點位、人物節點盡失靈；
           故待真拖過閾（onPointerMove）方捕獲 */
        dragRef.current = { x: e.clientX, y: e.clientY, tx: v.tx, ty: v.ty, cap: false };
      }
    },
    onPointerMove: (e) => {
      const pts = ptsRef.current;
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const cw = e.currentTarget.clientWidth || e.currentTarget.getBoundingClientRect().width;
      if (!cw) return; /* 幅面尚未布局，此刻換算必得 Infinity */
      const s = w / cw; /* 屏幕像素 → viewBox 座標 */
      const p = pinchRef.current;
      if (p && pts.size >= 2) {
        const [a, b] = [...pts.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (!d || !p.d) return;
        const rect = e.currentTarget.getBoundingClientRect();
        /* 起手中點所指之內容座標，須始終落在當下中點之下 */
        const ax = (p.mx - rect.left) * s, ay = (p.my - rect.top) * s;
        const gx = (ax - p.tx) / p.k, gy = (ay - p.ty) / p.k;
        const cx = ((a.x + b.x) / 2 - rect.left) * s, cy = ((a.y + b.y) / 2 - rect.top) * s;
        const k2 = clampK(p.k * (d / p.d));
        movedRef.current = 99; /* 捏合畢不誤觸點選 */
        setView({ k: k2, tx: cx - k2 * gx, ty: cy - k2 * gy });
        return;
      }
      /* 必先取出快照再入 setView：updater 由 React 稍後執行，屆時
         pointerup 可能已將 dragRef 置空，於彼時解引用即擲錯而白屏 */
      const g = dragRef.current;
      if (!g) return;
      if (!g.cap) {
        /* 屏幕位移逾 4px 方認作拖曳並捕獲指針；未逾者仍是點選 */
        if (Math.abs(e.clientX - g.x) + Math.abs(e.clientY - g.y) <= 4) return;
        g.cap = true;
        try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* 捕獲不成則退為普通事件流 */ }
      }
      const dx = (e.clientX - g.x) * s, dy = (e.clientY - g.y) * s;
      movedRef.current = Math.max(movedRef.current, Math.abs(dx) + Math.abs(dy));
      setView((v) => ({ ...v, tx: g.tx + dx, ty: g.ty + dy }));
    },
    onPointerUp: endPointer,
    onPointerCancel: endPointer,
  };
  /* 指針捕獲既已接管，拖出幅外不必中斷，故不掛 onPointerLeave */
  const gestureStyle = {
    cursor: view.k > 1 ? (dragRef.current ? "grabbing" : "grab") : "default",
    touchAction: view.k > 1 ? "none" : "auto",
  };
  return { view, zoomBy, reset, handlers, gestureStyle, movedRef, wheelElRef };
}

/* 縮放三鈕：放大／縮小／復位，三幅圖共用 */
function ZoomBtns({ view, zoomBy, reset }) {
  const locale = useLocale();
  const tr = useT();
  /* 復位鈕中文作「回」字；英文界面作「1×」（回到原始倍率），免一枚漢字當圖示 */
  return (
    <div style={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: 6, zIndex: 3, alignItems: "center" }}>
      {[["＋", () => zoomBy(1.3), "放大"], ["－", () => zoomBy(1 / 1.3), "縮小"], [locale === "en" ? "1×" : "回", reset, "復位"]].map(([t, fn, tt]) => (
        <button key={tt} title={tr(tt)} aria-label={tr(tt)} onClick={fn}
          style={{ width: 30, height: 30, fontFamily: gUI, fontSize: locale === "en" && tt === "復位" ? 11 : 14, color: T.ink, background: T.panelHi, border: `1px solid ${T.line}`, borderRadius: "3px", cursor: "pointer", padding: 0, opacity: tt !== "放大" && view.k === 1 ? 0.45 : 1 }}>
          {t}
        </button>
      ))}
      {view.k > 1 && <span style={{ fontFamily: gUI, fontSize: 10.5, color: T.faint }}>{view.k.toFixed(1)}×</span>}
    </div>
  );
}

/* 橢圓上取 n 個等弧長之角。
   按：橢圓等角非等弧——長軸兩端弧速最慢，等角鋪陳必於彼處堆疊。
   故先分段積分弧長成表，再按目標弧長反查角度。S 取 2048 段，誤差遠細於一像素。 */
function ellipseAngles(rx, ry, n) {
  const S = 2048, cum = [0];
  const speed = (t) => Math.hypot(rx * Math.sin(t), ry * Math.cos(t));
  for (let i = 1; i <= S; i++) {
    const t0 = ((i - 1) / S) * Math.PI * 2, t1 = (i / S) * Math.PI * 2;
    cum.push(cum[i - 1] + ((speed(t0) + speed(t1)) / 2) * ((Math.PI * 2) / S));
  }
  const total = cum[S], out = [];
  let j = 0; /* 目標弧長遞增，游標單向前行即可，不必每次重掃 */
  for (let i = 0; i < n; i++) {
    const target = (i / n) * total;
    while (j < S && cum[j + 1] < target) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    out.push(((j + (target - cum[j]) / seg) / S) * Math.PI * 2);
  }
  return out;
}

/* 門派色例：FACTION_COLORS 今定三十二色、人物庫在用者三十一，此前無一處可查其全——
   （按：CharCard 一節舊注尚云「全站計有二十五色」，數已不符，其數屢增而注未隨。此處故不寫死。）
   人物卡的門派籤雖著色，只見其人所屬；
   篩選籤又是中性色，不載門派之義。而年表色帶、輿圖環段、行星與群像諸圖，色即是義，
   無例可對則色成謎。故立此共用色例，默認收起，一按展開；計數取自人物庫，
   故所列即全站在用之色，門派增刪自隨數據而動，不另立表以免與 fc 失步。
   「门派未标」一項落到 fc 的中立灰回退，與圖中無門派者同色，非為虛設。 */
const FACTION_KEY_LIST = (() => {
  const n = {};
  for (const c of CHARACTERS) for (const f of (c.belong.length ? c.belong : ["门派未标"])) n[f] = (n[f] || 0) + 1;
  return Object.entries(n).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
})();
function FactionKey() {
  const locale = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <button onClick={() => setOpen(!open)}
        style={{ fontSize: 11.5, fontFamily: gUI, color: open ? T.ink : T.muted, background: "none", border: `1px solid ${open ? T.accent : T.line}`, padding: "2px 10px", borderRadius: "3px", cursor: "pointer" }}>
        {t("門派色例")} {open ? t("收起") : t("{n} 色", { n: FACTION_KEY_LIST.length })}
      </button>
      {open && (
        <div className="flex flex-wrap" style={{ gap: "7px 15px", marginTop: 8 }}>
          {FACTION_KEY_LIST.map(([f, n]) => (
            <span key={f} className="flex items-center" style={{ gap: 5, fontSize: 11.5, fontFamily: gUI, color: T.muted }}>
              {/* 作圈而非實心塊：與圖中星體之描邊同其形，一望即知所指 */}
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.panel, border: `1.6px solid ${fc(f)}`, flex: "0 0 auto" }} />
              {f === "门派未标" ? t(f) : facName(locale, f)}<span style={{ color: T.faint }}>{n}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* 軌道星之徑：環已判三檔（≥6／3–5／1–2），徑則於檔內再別多寡，尺寸一通道舊本閒置。
   開方而非按數——n 自一至二十，線性則巨細懸絕，一事者小不可辨。
   橋星雙繫兩核、不入任一檔，故存中庸之徑；遠軌俱零共見，一律最小。
   圈徑三等（作者定）：雙核 40、次星 30、其餘諸星依共見數。次星為岚川云、陆晚月、陆羽鸣，徑不隨共見數；
   所居之軌仍按共見數（軌道之義不變）。舊時圈徑全由共見數出，岚川云與兩核共見最多（27、26 事）
   卻因身為橋星只得 20、排第十六，陆羽鸣與程凯僅共一事、排第四十九——圖上的主次與人物的分量對不上。
   其餘諸星原式 15+2·sqrt(n)（17–25.4px），今同比收為 13.5+1.7·sqrt(n)（15.2–22.3px）、橋星 20 → 18：
   次序一仍其舊，只讓出次星一檔，次星直徑遂大於其餘諸星之最大者三成半；
   且全圖最緊處由 −4.3px（狄元恪、连朔相疊）轉為 +1.6px，中位星距 13 → 16px。 */
const orbitR = (n) => 13.5 + Math.sqrt(n) * 1.7;
const SECONDARY_IDS = new Set(["lanchuanyun", "luwanyue", "luyuming"]);
/* 橋星偏向：舊時橋星一律疊在雙核連線的中垂線上，四圈一柱，與其共見之偏全然無涉——
   关岳與闵方城共見 29 事、與程凯僅 2 事，卻與兩核等距。今依其比 (b−a)/(a+b) 定側：
   偏差不足 0.3 者居中列（今唯岚川云，27 比 26），餘者靠向所偏之核。
   數據不偏而作者另有所定者記於此：陈瑞和兩核各二事，作者定靠程凯（1 為程凯側，−1 為闵方城側）。 */
const BRIDGE_SIDE = { chenruihe: 1 };
const SEC_R = 30, BRIDGE_R = 18;
const starR = (id, base) => (SECONDARY_IDS.has(id) ? SEC_R : base);
/* 線寬同理開方：舊作 0.5+0.28n，一事得 0.78px 幾不可見、二十事得 6.1px 粗如短棒，
   八倍之差兩端俱失。今收於 1.7–5.5px，細者可辨、粗者不橫。 */
const linkW = (n) => 0.6 + Math.sqrt(n) * 1.1;
/* 圈內姓名之字號：舊按字數分三檔而不問圈之大小，故四字名於小圈中擠出邊外。
   今取「字數所定之上限」與「圈徑所容之寬」二者之小——圈大則止於上限不至肥大，
   圈小則隨徑而縮。下限 7.5px：再小則不可讀，寧令長名微溢圈緣（鄰星尚有數像素之隙）。 */
const NAME_CAP = { 2: [12.5, 11], 3: [10.5, 9], 4: [9, 8] };
function nodeFontSize(len, r, dim) {
  const cap = (NAME_CAP[Math.min(Math.max(len, 2), 4)] || NAME_CAP[4])[dim ? 1 : 0];
  return Math.max(7.5, Math.min(cap, (r * 1.8) / Math.max(len, 1)));
}

/* ---------------- 行星式關係圖：雙星系統 ---------------- */
/* 兩核：閔方城（蒼雲線）與程凱（天策線）。
   軌道悉由《事件与年份》與各核之共見計數自動生成；
   與兩核共見皆 ≥2 者為「橋星」，居於雙星連線之中央；
   與兩核皆無共見者列於環抱全系之遠軌。 */
/* 幅面：舊作 1200×830，於 maxWidth 1160 下渲染得 802px 高，尋常筆記本一屏不納。
   今收至 760（渲染 735px）。所省之高，一半出自遠軌圓點由 15 收至 14——
   點小一像素，橢圓即可矮三十，而餘隙反持平（7.9px，舊 8.0px）；
   餘者出自三環與雙星間距同比略縮。W/H 立為常量，viewBox 與手勢層共讀，免二處失步。 */
const PW = 1200, PH = 760, PCX = [360, 840], PCY = PH / 2, FAR_R = 14;
function Planetary({ onOpenChar }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const [hover, setHover] = useState(null);
  const { view, zoomBy, reset, handlers, gestureStyle, movedRef, wheelElRef } = usePanZoom(PW, PH);
  const coarse = useCoarsePointer();
  const narrow = useNarrow();
  /* 圖例同類亮起。keyPin：點選（滑鼠點、觸屏輕觸、鍵盤 Enter／空格）所定、常亮至再點或 Esc；
     keyHover：滑鼠懸停圖例之預覽。實際所亮 keyHi = keyHover ?? keyPin；懸停一星時暫讓位於該星（移開即復）。
     各值為 REL_KEY 之名，或「僅同事」「未見」。keyFocus：鍵盤焦點所在之項（畫焦點框）。 */
  const [keyPin, setKeyPin] = useState(null);
  const [keyHover, setKeyHover] = useState(null);
  const [keyFocus, setKeyFocus] = useState(null);
  const keyHi = hover ? null : keyHover ?? keyPin;
  const toggleKey = (id) => { setHover(null); setKeyPin((p) => (p === id ? null : id)); };
  const CX = PCX, CY = PCY;
  const layout = useMemo(() => {
    const counts = CENTERS_META.map((m) => coCountsFor(m.id));
    /* 外軌收至 218：兩核相距 500，舊值 248 令兩系外軌之間僅餘四像素，
       而唯一之橋星恰坐此夾縫。今中縫得六十四像素，橋星圓周不再壓兩圈虛線。
       maxSpan 為扇面上限（圈之幾分）：讓道於雙星之間的橋區，而讓多讓寡因環而異——
       橋線所經在外，故外環讓足 0.27 圈，內環去核近、不涉其事，讓 0.21 即可。
       此一鬆，蒼雲系內軌九人之封頂星距由 53.5px 昇至 58px，全幅最緊處遂不復在此。 */
    const RINGS = [
      { label: "內軌", note: "共見 ≥6 事", r: 102, maxSpan: 0.79, test: (n) => n >= 6 },
      { label: "中軌", note: "共見 3–5 事", r: 163, maxSpan: 0.76, test: (n) => n >= 3 && n <= 5 },
      { label: "外軌", note: "共見 1–2 事", r: 211, maxSpan: 0.73, test: (n) => n >= 1 && n <= 2 },
    ];
    const centerIds = CENTERS_META.map((m) => m.id);
    const shared = [], far = [], sys = [[], []];
    for (const c of CHARACTERS) {
      if (centerIds.includes(c.id)) continue;
      const a = counts[0][c.id] || 0, b = counts[1][c.id] || 0;
      if (Math.min(a, b) >= 2) shared.push({ c, a, b });
      else if (a === 0 && b === 0) far.push(c);
      else if (a >= b) sys[0].push({ c, n: a });
      else sys[1].push({ c, n: b });
    }
    shared.sort((x, y) => y.a + y.b - (x.a + x.b));
    /* 各系星體：面向外側展開，避讓雙星之間的橋區。
       扇面不再一概鋪滿——舊法無論幾人皆攤足 0.73 圈，故蒼雲系中軌二人相隔
       四百餘像素、天策系內軌一人獨佔一環，環環看去皆空。今按人數定扇面：
       星距恒取 GAP，扇面即 n·GAP/r，逾本環之 maxSpan 則封頂（僅蒼雲系內軌
       九人觸頂，星距 58px）。餘者一律 72px，環之弧長遂自成人數之量度。 */
    const GAP = 72;
    const rings = sys.map((members, k) => {
      const outward = k === 0 ? Math.PI : 0;
      return RINGS.map((ring, ri) => {
        const ms = members
          .filter((m) => ring.test(m.n))
          .sort((x, y) => (x.c.belong[0] || "").localeCompare(y.c.belong[0] || "") || y.n - x.n);
        /* 次星圈大，於環上按其多出之徑多佔一份弧長；無次星之環，權皆為一，與舊法全同 */
        const W = ms.map((m) => (SECONDARY_IDS.has(m.c.id) ? 1 + (2 * (SEC_R - orbitR(m.n))) / GAP : 1));
        const tot = W.reduce((a, b) => a + b, 0);
        const span = Math.min(Math.PI * 2 * ring.maxSpan, (tot * GAP) / ring.r);
        const start = outward - span / 2 + ri * 0.22;
        let acc = 0;
        return {
          ...ring,
          nodes: ms.map((m, i) => {
            const ang = start + ((acc + W[i] / 2) / tot) * span;
            acc += W[i];
            return { ...m, r: starR(m.c.id, orbitR(m.n)), x: CX[k] + ring.r * Math.cos(ang), y: CY + ring.r * Math.sin(ang), k, ringR: ring.r };
          }),
        };
      });
    });
    /* 橋星：共見不偏者居雙星連線中央，縱向錯落；偏於一核者（及作者所定者，見 BRIDGE_SIDE）
       此處先不落位，待諸星與遠軌俱定後再於所偏之核一側擇地（見下「偏側橋星」） */
    const sideOf = (m) => (m.c.id in BRIDGE_SIDE ? BRIDGE_SIDE[m.c.id]
      : Math.abs(m.b - m.a) / (m.a + m.b) >= 0.3 ? Math.sign(m.b - m.a) : 0);
    const mid = shared.filter((m) => sideOf(m) === 0);
    const bridge = mid.map((m, i) => ({
      ...m, r: starR(m.c.id, BRIDGE_R), x: PW / 2, y: CY + (i - (mid.length - 1) / 2) * 72,
    }));
    /* 遠軌：環抱全系之橢圓。人多而環促——與兩核俱無共見者常逾七十，
       舊法按等角平鋪，長軸兩端最近鄰僅二十九像素而圓徑四十，過半相疊。
       今改等弧長取位，復令奇偶兩列內外錯開（LANE），同列間距倍之。
       數為奇時末一枚落回中列，免首尾同列於接縫處相撞。 */
    /* 徑略收（552→540 / 356→322）：橫者為軌外之門派署名讓出邊白，縱者為收幅面之高。 */
    const FAR = { rx: 540, ry: 322 }, LANE = 16;
    const sortedFar = far.sort((x, y) => (x.belong[0] || "").localeCompare(y.belong[0] || ""));
    const nf = sortedFar.length;
    /* 取兩倍之角：偶位為星體所居，奇位為兩星之間的半步，門派弧段即以半步為界 */
    const angs2 = ellipseAngles(FAR.rx, FAR.ry, nf * 2);
    const farAng = (i) => -Math.PI / 2 + angs2[((i % (nf * 2)) + nf * 2) % (nf * 2)];
    const farNodes = sortedFar.map((c, i) => {
      const ang = farAng(2 * i);
      const d = nf % 2 === 1 && i === nf - 1 ? 0 : i % 2 ? LANE : -LANE;
      return { c, r: starR(c.id, FAR_R), x: PW / 2 + (FAR.rx + d) * Math.cos(ang), y: CY + (FAR.ry + d) * Math.sin(ang) };
    });
    /* 次星微調：環分三層、層距僅五十至六十，次星圈大，按序落位時常恰夾在內外兩環的鄰星之間
       （陆晚月居中軌，初落 63°，內有程锋 61°、外有陆南信 68°，僅隔 4px）。
       故令其在本環上左右各容半步（GAP/2 弧長），取與全圖諸星最寬之一角；
       計入雙門派之外圈（r+4）與兩核之外環（47）。不寫死角度，人物增減後自會重求。 */
    {
      const all = [
        ...rings.flatMap((s) => s.flatMap((ring) => ring.nodes)), ...bridge, ...farNodes,
        ...CX.map((x) => ({ x, y: CY, r: 47, c: { belong: [] } })),
      ];
      const outerR = (n) => n.r + (n.c.belong.length > 1 ? 4 : 0);
      for (const n of all.filter((q) => q.ringR && SECONDARY_IDS.has(q.c.id))) {
        const a0 = Math.atan2(n.y - CY, n.x - CX[n.k]), half = GAP / 2 / n.ringR;
        let best = null;
        for (let t = -half; t <= half + 1e-9; t += half / 48) {
          const x = CX[n.k] + n.ringR * Math.cos(a0 + t), y = CY + n.ringR * Math.sin(a0 + t);
          let g = Infinity;
          for (const q of all) if (q !== n) g = Math.min(g, Math.hypot(x - q.x, y - q.y) - outerR(n) - outerR(q));
          if (!best || g > best.g + 1e-9) best = { g, x, y };
        }
        n.x = best.x; n.y = best.y;
      }
      /* 偏側橋星：落於所偏之核面向橋區之一側——軸線上下各 12°–60°、距核 125–150
         （內軌與中軌之間；軸線左右各留一段給中列）。橋星雙繫兩核，靠向一側後其遠端之線
         須橫越橋區，故擇地不只看與諸星之隙，並看：此處離他星之連線多遠、己之兩線離他星多遠。
         三者取小，求其最大。依共見多寡依次落位，後落者計入先落者之線。
         程凯面向橋區之下半（左下）有程骞、叶忱、叶添灯、陆羽鸣諸外軌星之放射線，無處不壓線，
         故陈瑞和實落其左上；闵方城一側二人上下近乎對稱。 */
      const segD = (px, py, x1, y1, x2, y2) => {
        const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / L2));
        return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
      };
      const sysNodes = rings.flatMap((s) => s.flatMap((ring) => ring.nodes));
      for (const m of shared.filter((q) => sideOf(q) !== 0)) {
        const k = sideOf(m) < 0 ? 0 : 1, axis = k === 0 ? 0 : Math.PI;
        const me = { ...m, r: starR(m.c.id, BRIDGE_R) };
        const lines = [
          ...sysNodes.map((n) => [CX[n.k], CY, n.x, n.y]),
          ...bridge.flatMap((n) => [[CX[0], CY, n.x, n.y], [CX[1], CY, n.x, n.y]]),
        ];
        const stars = [...all, ...bridge.filter((n) => !all.includes(n))];
        let best = null;
        for (let d = 125; d <= 150; d += 2.5) {
          for (let deg = -60; deg <= 60; deg += 1) {
            if (Math.abs(deg) < 12) continue;
            const a = axis + (k === 0 ? 1 : -1) * (deg * Math.PI) / 180;
            const x = CX[k] + d * Math.cos(a), y = CY + d * Math.sin(a);
            let g = Infinity, gl = Infinity, gs = Infinity;
            for (const q of stars) g = Math.min(g, Math.hypot(x - q.x, y - q.y) - outerR(me) - outerR(q));
            for (const L of lines) gl = Math.min(gl, segD(x, y, ...L) - outerR(me));
            for (const q of stars) if (q.r < 47) for (const cx of CX) gs = Math.min(gs, segD(q.x, q.y, cx, CY, x, y) - outerR(q));
            const sc = Math.min(g - 8, gl, gs);
            if (!best || sc > best.sc) best = { sc, x, y };
          }
        }
        bridge.push({ ...me, x: best.x, y: best.y });
      }
    }
    /* 遠軌本已按門派排序、色塊天然成段，舊時軌線卻是通體一色的虛線，
       七十七枚散點遂只讀作噪。今於軌線上按段著門派之色，逾三人者更署其名，
       一環即分作二十四段——同色相鄰者為同門，不必逐一辨圈色。 */
    const farRuns = [];
    sortedFar.forEach((c, i) => {
      const f = c.belong[0] || "";
      const last = farRuns[farRuns.length - 1];
      if (last && last.f === f) last.i1 = i;
      else farRuns.push({ f, i0: i, i1: i });
    });
    return { rings, bridge, farNodes, farRuns, farAng, FAR, LANE, RINGS };
  }, []);

  const pos = {};
  CENTERS_META.forEach((m, k) => { pos[m.id] = { x: CX[k], y: CY }; });
  layout.rings.forEach((sysRings) => sysRings.forEach((ring) => ring.nodes.forEach((n) => { pos[n.c.id] = { x: n.x, y: n.y }; })));
  layout.bridge.forEach((n) => { pos[n.c.id] = { x: n.x, y: n.y }; });
  layout.farNodes.forEach((n) => { pos[n.c.id] = { x: n.x, y: n.y }; });

  /* 核線（各星繫於其核之線）今按與該核之主關係著色；已由核線表出的一對，弦線不再重畫。
     舊時弦線一概略去涉及兩核之關係，故懸停程锋竟不見其與程凯為何關係；今此類關係由核線承載，
     而系內星與「另一核」之關係（不在核線上）改由弦線補出。 */
  const spokeKeys = new Set([
    ...layout.rings.flatMap((sysRings, k) => sysRings.flatMap((ring) => ring.nodes.map((n) => pairKey(n.c.id, CENTERS_META[k].id)))),
    ...layout.bridge.flatMap((n) => CENTERS_META.map((m) => pairKey(n.c.id, m.id))),
  ]);
  /* 弦線按「一對人」歸併：一對可有數條關係，舊法逐條各畫一弧，弧形全同、字疊於一點不可讀；
     今一對一弧，色取主關係，字列諸條。 */
  const chordPairs = hover
    ? [...new Set(RELATIONS.filter((r) => (r.a === hover || r.b === hover) && pos[r.a] && pos[r.b] && !spokeKeys.has(pairKey(r.a, r.b)))
      .map((r) => pairKey(r.a, r.b)))]
    : [];
  /* 次星三角：岚川云—陆晚月（嫌隙、救援、挚友）、岚川云—陆羽鸣（杀伐、宽宥）、陆晚月—陆羽鸣（授业）。
     陆晚月、陆羽鸣與兩核俱無直接關係，按共見數只落在程凯外側之軌，圈之大小若無此三角，便無從解釋。
     故常駐淡畫；懸停其中一人時讓位於懸停弦線（同一對不重畫）。 */
  const secIds = [...SECONDARY_IDS];
  const secPairs = secIds.flatMap((a, i) => secIds.slice(i + 1).map((b) => pairKey(a, b)))
    .filter((k) => RELS_BY_PAIR.has(k));
  /* 核線一覽：[星, 第幾核, 共見數]。系內星繫本核，橋星兩核各一 */
  const spokes = [
    ...layout.rings.flatMap((sysRings, k) => sysRings.flatMap((ring) => ring.nodes.map((n) => [n, k, n.n]))),
    ...layout.bridge.flatMap((n) => [[n, 0, n.a], [n, 1, n.b]]),
  ];
  /* 圖例同類亮起：凡一對之間有此類關係者皆亮（不必是主關係——闵方城—连朔主為授业，指「殺伐」時亦亮，
     且臨時染作殺伐之色）；核線以外的同類關係補畫弦線（不標字）；無此類關係之星淡去，雙核常明。
     「未見」一項兼收 da（未遂、未说开、未见而作虛線者，如魏谦—阿会朗之杀伐）。 */
  const matchKey = (key, r) => (key === "未見" ? !!r.da || relKeyOf(r) === "未見" : relKeyOf(r) === key);
  /* 返回：不亮者 null；僅同事者 true；其餘返回所匹配諸條之主條（定虛實） */
  const hitKey = (key, rs) => (key === "僅同事" ? !rs || null : (rs && primaryRel(rs.filter((r) => matchKey(key, r)))) || null);
  const keySets = (key) => {
    const chords = key === "僅同事" ? []
      : [...new Set(RELATIONS.filter((r) => matchKey(key, r) && pos[r.a] && pos[r.b] && !spokeKeys.has(pairKey(r.a, r.b))).map((r) => pairKey(r.a, r.b)))];
    const litSpokes = spokes.filter(([n, k]) => hitKey(key, RELS_BY_PAIR.get(pairKey(n.c.id, CENTERS_META[k].id))));
    return { chords, lit: new Set([...chords.flatMap((k) => k.split("|")), ...litSpokes.map(([n]) => n.c.id)]), nPairs: chords.length + litSpokes.length };
  };
  const keyCol = keyHi === "僅同事" ? T.muted : keyHi ? tone(KEY_RAW[keyHi]) : null;
  const keyHit = (rs) => hitKey(keyHi, rs);
  const keyNow = keyHi ? keySets(keyHi) : null;
  const keyPairs = keyNow ? keyNow.chords : [];
  const keyLit = keyNow ? keyNow.lit : null;
  /* 讀屏：圖中所亮者無從目見，故於點選時以文字報其數（懸停預覽不報） */
  const KEY_LABEL = { 未見: "未見／未說開" };
  const pinStats = keyPin ? (keyPin === keyHi ? keyNow : keySets(keyPin)) : null;
  /* 弦線之弧：舊法令控制點自全圖中心沿「中心→中點」方向外推 70——岚川云今居正中，
     凡其一端的弦，中點方向與弦本身同線，外推之後仍是直線，看去與核線無別、且直穿程凯下方諸星。
     今改為垂直於弦本身曲出，曲向（左右）與曲度（弦長之 12%–32%）六擇一：取弧上諸點離他星最遠者。
     標籤亦不再定在弧之中點，而取弧中段（t 0.3–0.7）離他星最遠之一點，並畫在星圈之上。 */
  const allStars = [
    ...layout.rings.flatMap((s) => s.flatMap((ring) => ring.nodes)), ...layout.bridge, ...layout.farNodes,
    ...CX.map((x) => ({ x, y: CY, r: 47, c: { id: "", belong: [] } })),
  ];
  const starGap = (x, y, skip) => {
    let g = Infinity;
    for (const q of allStars) if (!skip.includes(q.c.id)) g = Math.min(g, Math.hypot(x - q.x, y - q.y) - q.r - (q.c.belong.length > 1 ? 4 : 0));
    return g;
  };
  const chordPath = (a, b) => {
    const p1 = pos[a], p2 = pos[b], skip = [a, b];
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2, L = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
    const nx = -(p2.y - p1.y) / L, ny = (p2.x - p1.x) / L;
    const at = (cx, cy, t) => [(1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cx + t * t * p2.x, (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cy + t * t * p2.y];
    let best = null;
    for (const sgn of [1, -1]) for (const k of [0.12, 0.22, 0.32]) {
      const cx = mx + sgn * nx * k * L, cy = my + sgn * ny * k * L;
      let g = Infinity;
      for (let i = 1; i < 16; i++) { const [x, y] = at(cx, cy, i / 16); g = Math.min(g, starGap(x, y, skip)); }
      if (!best || g > best.g + 0.5) best = { g, cx, cy };
    }
    let lab = null;
    for (let i = 0; i <= 8; i++) {
      const [x, y] = at(best.cx, best.cy, 0.3 + (0.4 * i) / 8), g = starGap(x, y, skip);
      if (!lab || g > lab.g) lab = { g, x, y };
    }
    return { d: `M ${p1.x} ${p1.y} Q ${best.cx} ${best.cy} ${p2.x} ${p2.y}`, lx: lab.x, ly: lab.y };
  };
  const relLabel = (rs) => rs.map((r) => relName(locale, r.t)).join(en ? " / " : "／");
  const haloText = { paintOrder: "stroke", stroke: T.bg, strokeWidth: 3, strokeLinejoin: "round" };

  /* 星核與節點皆以渲染函數呼之（理同輿圖 renderSpot：內嵌元件逢懸停重繪即卸載重掛，吞去 click） */
  const renderStar = (k) => {
    const c = byId[CENTERS_META[k].id];
    return (
      <g key={"star" + k} style={{ cursor: "pointer" }} onClick={() => { if (movedRef.current > 5) return; onOpenChar(c); }}>
        <title>{hasEnName(locale, c) ? `${charName(locale, c)} ${c.name}` : c.name}</title>
        <text x={CX[k]} y={CY - 66} textAnchor="middle"
          style={{ fontFamily: gUI, fontSize: 11.5, fill: fcText(c.belong[0]), letterSpacing: en ? "0.12em" : "0.45em" }}>
          {t(CENTERS_META[k].tag)}
        </text>
        <circle cx={CX[k]} cy={CY} r={40} fill={T.panel} stroke={T.accent} strokeWidth={2.4} />
        <circle cx={CX[k]} cy={CY} r={47} fill="none" stroke={T.accent} strokeWidth={0.7} opacity={0.5} />
        <text x={CX[k]} y={CY - 7} textAnchor="middle" style={{ fontFamily: gName, fontSize: 16, fill: T.ink, fontWeight: 700 }}>{c.name}</text>
        <text x={CX[k]} y={CY + 10} textAnchor="middle" style={{ fontFamily: gUI, fontSize: 10.5, fill: T.muted }}>{c.birth} {en ? "–" : "—"} {c.death}</text>
        <text x={CX[k]} y={CY + 24} textAnchor="middle" style={{ fontFamily: gUI, fontSize: en ? 7.5 : 8.5, fill: T.faint }}>{en ? `${englishEraOf(c.birth)} – ${englishEraOf(c.death)}` : `${eraOf(c.birth)} — ${eraOf(c.death)}`}</text>
        {/* 英文名：雙核圈大，名下另起一行；其餘星圈小，英文名只入懸停（見 renderNode） */}
        {hasEnName(locale, c) && <text x={CX[k]} y={CY + 62} textAnchor="middle" style={{ fontFamily: gName, fontSize: 12, fill: T.muted }}>{charName(locale, c)}</text>}
      </g>
    );
  };

  /* dim：遠軌之星。與兩核俱無共見者逾全譜六成，若與有事者同其大小明度，
     則畫面最艷之一環恰是信息最薄之一環，主客倒置。故縮其徑、褪其色、
     底填幅色如鑿孔——懸停即復原大小與墨色，點選之途不減。 */
  const renderNode = (n, countLabel, dim) => {
    const hi = hover === n.c.id;
    const soft = dim && !hi;
    const r0 = n.r + (hi ? (dim ? 4 : 3) : 0);
    /* 次星：圈徑之外，線加粗、名加大加粗，與雙核同一筆意而低一等（雙核 16px 粗體、線 2.4） */
    const sec = SECONDARY_IDS.has(n.c.id);
    const fs = sec ? 13.5 : nodeFontSize(n.c.name.length, n.r, dim);
    return (
      <g key={n.c.id} style={{ cursor: "pointer" }} opacity={keyLit && !keyLit.has(n.c.id) ? 0.22 : 1}
        onMouseEnter={() => { if (!coarse) setHover(n.c.id); }}
        onMouseLeave={() => { if (!coarse) setHover(null); }}
        /* 觸屏無懸停：首觸牽出其關係弧，再觸方開檔案 */
        onClick={() => { if (movedRef.current > 5) return; if (coarse && hover !== n.c.id) { setHover(n.c.id); setKeyPin(null); return; } onOpenChar(n.c); }}>
        <title>{hasEnName(locale, n.c) ? `${charName(locale, n.c)} ${n.c.name}` : n.c.name}</title>
        {coarse && <circle cx={n.x} cy={n.y} r={30} fill="transparent" />}
        <circle cx={n.x} cy={n.y} r={r0} fill={soft ? T.bg : T.panel} stroke={fc(n.c.belong[0])}
          strokeWidth={soft ? 1.2 : sec ? 2.2 : 1.6} strokeOpacity={soft ? 0.55 : 1} />
        {n.c.belong.length > 1 && (
          <circle cx={n.x} cy={n.y} r={r0 + 4} fill="none" stroke={fc(n.c.belong[1])}
            strokeWidth={sec ? 1 : 0.8} opacity={soft ? 0.35 : 0.7} />
        )}
        <text x={n.x} y={n.y + (sec ? 5 : 4)} textAnchor="middle"
          style={{ fontFamily: gName, fontSize: fs, fill: soft ? T.muted : T.ink, fontWeight: sec ? 700 : undefined }}>
          {n.c.name}
        </text>
        {/* 共見數改懸停始現：四十條同級灰字常駐，鋪成一層霧而已；
            其量今由徑與線寬並載，欲知確數者懸停（觸屏首觸）即得。 */}
        {(countLabel || hasEnName(locale, n.c)) && hi && (
          <text x={n.x} y={n.y + r0 + 15} textAnchor="middle"
            style={{ fontFamily: gUI, fontSize: 10.5, fill: T.accent }}>
            {[hasEnName(locale, n.c) && charName(locale, n.c), countLabel].filter(Boolean).join(" · ")}
          </text>
        )}
      </g>
    );
  };

  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      <ZoomBtns view={view} zoomBy={zoomBy} reset={reset} />
      <svg viewBox={`0 0 ${PW} ${PH}`} ref={wheelElRef}
        style={{ width: "100%", maxWidth: 1160, display: "block", margin: "0 auto", ...gestureStyle }}
        {...handlers}>
        <g transform={`translate(${view.tx} ${view.ty}) scale(${view.k})`}>
        {/* 襯底：觸屏點空處即卸下所選人物（及圖例所指之類），關係弦線隨之收起 */}
        <rect x={-4000} y={-4000} width={9000} height={9000} fill="transparent"
          onClick={() => { if (movedRef.current > 5) return; setHover(null); setKeyPin(null); }} />
        {/* 遠軌：兩列星體分居軌線內外，線居中為準。線按門派分段著色，逾三人者署名。
            署名沿軌切向書寫，故無論名之長短，徑向只佔字高十許像素，不慮出幅。 */}
        {(() => {
          const { rx, ry } = layout.FAR, PAD = 0.012;
          const pt = (a, dr) => [PW / 2 + (rx + dr) * Math.cos(a), CY + (ry + dr) * Math.sin(a)];
          const LAB = layout.LANE + FAR_R + 17; /* 外列圓心 + 圓徑 + 留白 */
          return layout.farRuns.map((run) => {
            const a0 = layout.farAng(2 * run.i0 - 1) + PAD, a1 = layout.farAng(2 * run.i1 + 1) - PAD;
            const sweep = ((a1 - a0) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            const [x0, y0] = pt(a0, 0), [x1, y1] = pt(a1, 0);
            const col = fc(run.f);
            const am = layout.farAng(run.i0 + run.i1);
            const [lx, ly] = pt(am, LAB);
            /* 切向：橢圓非圓，須用真切線 (-rx·sin, ry·cos)；正規至 ±90° 免字倒懸 */
            let rot = (Math.atan2((ry + LAB) * Math.cos(am), -(rx + LAB) * Math.sin(am)) * 180) / Math.PI;
            if (rot > 90) rot -= 180; else if (rot < -90) rot += 180;
            return (
              <g key={"fr" + run.i0}>
                <path d={`M ${x0} ${y0} A ${rx} ${ry} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x1} ${y1}`}
                  fill="none" stroke={col} strokeWidth={1.2} strokeDasharray="2 5" opacity={0.5} />
                {run.i1 - run.i0 >= 2 && (
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
                    transform={`rotate(${rot.toFixed(2)} ${lx.toFixed(1)} ${ly.toFixed(1)})`}
                    style={{ fontFamily: gUI, fontSize: 9.5, fill: fcText(run.f), opacity: 0.75, letterSpacing: "0.08em" }}>
                    {run.f ? facName(locale, run.f) : t("無門派")}
                  </text>
                )}
              </g>
            );
          });
        })()}
        {/* 各系軌道 */}
        {layout.RINGS.map((ring, ri) => (
          <g key={ri}>
            {[0, 1].map((k) => (
              <circle key={k} cx={CX[k]} cy={CY} r={ring.r} fill="none" stroke={T.line} strokeDasharray="2 5" />
            ))}
          </g>
        ))}
        {/* 圖例：軌道之義。舊法每環之名於兩核頭頂各書一遍，六字之中三為重出，
            又正壓十二點鐘方向之星體；今並歸幅左之空處，環上不再有壓字。
            此隅在遠軌橢圓之外，四環由內而外以縮進示之。 */}
        <g transform="translate(28, 40)">
          <text x={0} y={0} style={{ fontFamily: gUI, fontSize: 11, fill: T.muted }}>{t("虛線諸環：與本系之核共見事數")}</text>
          {[...layout.RINGS.map((r) => [r.label, r.note]), ["遠軌", "與兩核俱無共見（作淡圓點）"]].map(([nm, note], i) => (
            <text key={nm} x={i * 8} y={20 + i * 15} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.faint }}>
              {t(nm)}{en ? "  " : "　"}{t(note)}
            </text>
          ))}
        </g>
        {/* 圖例：線之義。與左上之軌道圖例上下相對——左上說環，左下說線。
            關係色例舊在圖下、隔著一段說明，看圖時須上下翻找；今入圖內，同在縮放層中，隨圖平移。
            此隅在遠軌橢圓之外，右鄰玛奈丽與「明教」署名（x 約 226 起），故全塊收在 x 215 以內。
            窄屏時全圖縮至三成上下，此間字不可讀，故窄屏圖下仍留 RelKey（見下）。 */}
        {/* 圖例諸項可指：懸停預覽、點選常亮（觸屏輕觸；鍵盤 Tab 至此、Enter／空格切換、Esc 收起），全圖只亮此類（見 keyPin）。
            作 role=button 並報 aria-pressed，寫法同余波之譜線行。透明底塊補足字與色線間之空隙，兼作焦點框 */}
        {/* 英文版：類名長於二字，改作三欄三行，整塊上移六像素（玛奈丽在其上方，仍有餘隙）；
            寬仍收在 x 215 以內。提示語不入圖——圖下說明已有，題字旁放不下 */}
        <g transform={`translate(28, ${en ? PH - 100 : PH - 94})`}>
          <text x={0} y={0} style={{ fontFamily: gUI, fontSize: 11, fill: T.muted }}>{t("線色：兩人之關係")}</text>
          {!en && <text x={96} y={0} style={{ fontFamily: gUI, fontSize: 9.5, fill: T.faint }}>{coarse ? t("輕觸一類即亮") : t("懸停即亮，點選常亮")}</text>}
          {(en ? [
            ...REL_KEY.map(([l, cc], i) => [l, (i % 3) * 76, 18 + Math.floor(i / 3) * 15, 14, tone(cc), undefined, 72]),
            ["僅同事", 0, 63, 14, T.line, undefined, 112],
            ["未見", 0, 78, 16, tone(KEY_RAW.未見), "6 4", 140, "未見／未說開"],
          ] : [
            ...REL_KEY.map(([l, cc], i) => [l, (i % 4) * 46, 18 + Math.floor(i / 4) * 15, 14, tone(cc), undefined, 44]),
            ["僅同事", 0, 51, 14, T.line, undefined, 52],
            ["未見", 62, 51, 16, tone(KEY_RAW.未見), "6 4", 86, "未見／未說開"],
          ]).map(([id, x, y, len, col, dash, w, label]) => (
            <g key={id} style={{ cursor: "pointer", outline: "none" }} opacity={keyHi && keyHi !== id ? 0.35 : 1}
              role="button" tabIndex={0} aria-pressed={keyPin === id} aria-label={t("只亮此類：{label}", { label: t(label || id) })}
              onMouseEnter={() => { if (!coarse) { setHover(null); setKeyHover(id); } }}
              onMouseLeave={() => { if (!coarse) setKeyHover(null); }}
              onClick={() => { if (movedRef.current > 5) return; toggleKey(id); }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggleKey(id); }
                else if (ev.key === "Escape") setKeyPin(null);
              }}
              onFocus={(ev) => { if (ev.target.matches(":focus-visible")) setKeyFocus(id); }}
              onBlur={() => setKeyFocus((f) => (f === id ? null : f))}>
              <rect x={x - 3} y={y - 12} width={w} height={16} rx={2} fill={keyPin === id ? T.panelHi : "transparent"}
                stroke={keyFocus === id ? T.accent : "none"} strokeWidth={1.2} />
              <line x1={x} y1={y - 3.5} x2={x + len} y2={y - 3.5} stroke={id === "僅同事" && keyHi === id ? T.muted : col} strokeWidth={keyHi === id ? 3.4 : 2.4} strokeDasharray={dash} />
              <text x={x + len + 4} y={y} style={{ fontFamily: gUI, fontSize: 10.5, fill: keyHi === id ? T.ink : T.faint }}>{t(label || id)}</text>
            </g>
          ))}
          {[1, 6, 20].map((n, i) => (
            <line key={n} x1={i * 13} y1={en ? 89.5 : 62.5} x2={i * 13 + 10} y2={en ? 89.5 : 62.5} stroke={T.muted} strokeWidth={linkW(n)} opacity={0.6} />
          ))}
          <text x={44} y={en ? 93 : 66} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.faint }}>{t("線粗＝與核共見事數")}</text>
        </g>
        {/* 核線：系內星與橋星繫於其核之線。粗細仍為共見數（開方），色為與該核之主關係（見 primaryRel）；
            無關係條目、僅同事者仍作灰線。虛線類關係（未见、未说开）若為唯一者，核線作虛線。 */}
        {spokes.map(([n, k, cnt]) => {
          const rs = RELS_BY_PAIR.get(pairKey(n.c.id, CENTERS_META[k].id)), pr = primaryRel(rs);
          const hi = hover === n.c.id;
          let stroke = pr ? relColor(pr.t) : T.line, dash = pr && pr.da;
          let op = hover && !hi ? 0.2 : hi ? 1 : pr ? 0.72 : 0.85;
          if (keyHi) {
            const m = keyHit(rs);
            if (m) { stroke = keyCol; dash = m !== true && m.da; op = 1; } else op = 0.1;
          }
          return (
            <line key={n.c.id + "l" + k} x1={CX[k]} y1={CY} x2={n.x} y2={n.y}
              stroke={stroke} strokeWidth={linkW(cnt)} strokeDasharray={dash ? "6 4" : undefined} opacity={op} />
          );
        })}
        {/* 次星三角：常駐淡畫，懸停其中一人時讓位於懸停弦線 */}
        {secPairs.filter((key) => !keyHi && !(hover && key.split("|").includes(hover))).map((key) => {
          const [a, b] = key.split("|"), pr = primaryRel(RELS_BY_PAIR.get(key));
          return (
            <path key={"sec" + key} d={chordPath(a, b).d} fill="none" stroke={relColor(pr.t)} strokeWidth={1.4}
              strokeDasharray={pr.da ? "5 4" : undefined} opacity={hover ? 0.15 : 0.6} />
          );
        })}
        {/* 懸停弦線：星體間之關係，一對一弧 */}
        {chordPairs.map((key) => {
          const [a, b] = key.split("|"), pr = primaryRel(RELS_BY_PAIR.get(key));
          return (
            <path key={"ch" + key} d={chordPath(a, b).d} fill="none" stroke={relColor(pr.t)} strokeWidth={1.3}
              strokeDasharray={pr.da ? "5 4" : "none"} opacity={0.9} />
          );
        })}
        {/* 圖例同類亮起之弦線：核線以外的同類關係，不標字（多者至四十餘對，標字成霧）；色一律取所指之類 */}
        {keyPairs.map((key) => {
          const [a, b] = key.split("|"), m = keyHit(RELS_BY_PAIR.get(key));
          return (
            <path key={"kc" + key} d={chordPath(a, b).d} fill="none" stroke={keyCol} strokeWidth={1.4}
              strokeDasharray={m.da ? "5 4" : undefined} opacity={0.85} />
          );
        })}
        {renderStar(0)}
        {renderStar(1)}
        {layout.rings.flatMap((sysRings) =>
          sysRings.flatMap((ring) =>
            ring.nodes.map((n) => renderNode(n, t("共 {n} 事", { n: n.n })))
          )
        )}
        {layout.bridge.map((n) => renderNode(n, t("閔 {a} · 程 {b}", { a: n.a, b: n.b })))}
        {layout.farNodes.map((n) => renderNode(n, null, true))}
        {/* 弦線之字：畫在星圈之上（位置見 chordPath）。次星三角之字常駐，懸停他人時隨線淡去 */}
        {[
          ...secPairs.filter((key) => !keyHi && !(hover && key.split("|").includes(hover))).map((key) => [key, hover ? 0.2 : 0.85, 9.5]),
          ...chordPairs.map((key) => [key, 1, 10]),
        ].map(([key, op, fs]) => {
          const [a, b] = key.split("|"), rs = RELS_BY_PAIR.get(key), pr = primaryRel(rs);
          const { lx, ly } = chordPath(a, b);
          return (
            <text key={"cl" + key} x={lx} y={ly + 3.5} textAnchor="middle"
              style={{ fontFamily: gUI, fontSize: fs, fill: relColor(pr.t), opacity: op, ...haloText }}>{relLabel(rs)}</text>
          );
        })}
        {/* 懸停一星：其核線上標出與該核之諸條關係（無則註「僅同事」）。標於兩圈之間的線段中點 */}
        {hover && [
          ...layout.rings.flatMap((sysRings, k) => sysRings.flatMap((ring) => ring.nodes.filter((n) => n.c.id === hover).map((n) => [n, k]))),
          ...layout.bridge.filter((n) => n.c.id === hover).flatMap((n) => [[n, 0], [n, 1]]),
        ].map(([n, k]) => {
          const rs = RELS_BY_PAIR.get(pairKey(n.c.id, CENTERS_META[k].id)) || [], pr = primaryRel(rs);
          const dx = n.x - CX[k], dy = n.y - CY, dl = Math.hypot(dx, dy) || 1;
          const f = (47 + (dl - 47 - n.r) / 2) / dl;
          return (
            <text key={"sl" + n.c.id + k} x={CX[k] + dx * f} y={CY + dy * f + 3.5} textAnchor="middle"
              style={{ fontFamily: gUI, fontSize: 10.5, fill: pr ? relColor(pr.t) : T.muted, ...haloText }}>
              {rs.length ? relLabel(rs) : t("僅同事")}
            </text>
          );
        })}
        </g>
      </svg>
      {en ? (
        /* 說明文字英文工作稿（待作者審）：同中文分段，人名暫用中文原名之拼音 */
        <div lang="en" style={{ fontSize: 12.5, color: T.faint, textAlign: "center", marginTop: 4, fontFamily: gUI, lineHeight: 1.6 }}>
          {t("行星說明")} {t("左下圖例可指：")} {coarse ? t("輕觸一類，全圖只亮此類關係（再觸收起）") : t("懸停一類預覽，點選或以鍵盤 Enter 常亮（再點或 Esc 收起），全圖只亮此類關係")}{t("——核線中凡有此類者改染此色（不必是主關係），他人之間的同類關係補畫弦線，餘星淡去。")}
          {" "}{coarse ? t("輕觸一人牽出其關係弦線，再觸方開檔案；放大後可雙指捏合、單指平移。") : t("點選任一人開啟檔案。")}
        </div>
      ) : (
      <div style={{ fontSize: 12, color: T.faint, textAlign: "center", marginTop: 4, fontFamily: gUI }}>
        雙星系統：閔方城（蒼雲線）與程凱（天策線）同格為核。軌道由《事件与年份》中與各核共見事件之計數自動生成，圈徑與線粗亦然（皆按開方），
        環之弧長即其人數；懸停一人即見確數。繫於核之線，色為其人與該核之關係（數條者取其主，懸停並列諸條），灰線為僅同事而無關係條目。
        唯岚川云、陆晚月、陆羽鸣三人為次星，圈徑另定、介於雙核與其餘諸星之間，所居之軌仍按共見數；三人彼此之關係常駐淡畫。
        與兩核共見皆不少於二事者為橋星，雙繫於兩核，不入軌檔故存中庸之徑：共見不偏者居雙星之間，偏於一核者靠向該核一側（陈瑞和兩核各二事，依作者所定靠程凯）。
        遠軌之線按門派分段著色，逾三人者署名於軌外。
        左下圖例可指：{coarse ? "輕觸一類，全圖只亮此類關係（再觸收起）" : "懸停一類預覽，點選或以鍵盤 Enter 常亮（再點或 Esc 收起），全圖只亮此類關係"}——核線中凡有此類者改染此色（不必是主關係），他人之間的同類關係補畫弦線，餘星淡去。
        {coarse ? "輕觸一人牽出其關係弦線，再觸方開檔案；放大後可雙指捏合、單指平移。" : "點選任一人開啟檔案。"}
      </div>
      )}
      {/* 寬屏時線之圖例已入圖內左下；窄屏圖中字太小，圖下另列一份 */}
      {narrow && <RelKey note={t("線粗＝共見事數")} pick={{ active: keyPin, onToggle: toggleKey, onClear: () => setKeyPin(null) }} style={{ marginTop: 8 }} />}
      <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {pinStats ? t("已只亮「{label}」：{pairs} 對關係，涉 {people} 人（雙核不計）。再按一次或 Esc 收起。", { label: t(KEY_LABEL[keyPin] || keyPin), pairs: pinStats.nPairs, people: [...pinStats.lit].filter((id) => !CENTERS_META.some((m) => m.id === id)).length }) : ""}
      </span>
      <FactionKey />
    </div>
  );
}

/* ---------------- 群像網絡：門派聚類 · 時間滑桿 ---------------- */
const PHASES = [["壹 · 前史", 744], ["貳 · 亂前", 750], ["叁 · 亂中", 756], ["肆 · 主線", 762]];
function Community({ onOpenChar }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  const [Y, setY] = useState(765);
  const [hover, setHover] = useState(null);
  const { view, zoomBy, reset, handlers, gestureStyle, movedRef, wheelElRef } = usePanZoom(1120, 1050);
  const coarse = useCoarsePointer();
  const { nodes, pos, centers } = useMemo(() => {
    const groups = {};
    CHARACTERS.forEach((c) => {
      const f = c.belong[0] || "其他";
      (groups[f] = groups[f] || []).push(c);
    });
    const sorted = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
    /* 苍云居中；外围门派按「大小相间」排列，使相邻群圆半径之和均匀，避免重叠 */
    const periph = sorted.filter((f) => f !== "苍云");
    const names = ["苍云"];
    for (let i = 0, j = periph.length - 1; i <= j; i++, j--) {
      names.push(periph[i]);
      if (i !== j) names.push(periph[j]);
    }
    const CX0 = 560, CY0 = 535, GR = 382;
    const pos = {}, nodes = [], centers = [];
    names.forEach((f, gi) => {
      const members = groups[f];
      const central = f === "苍云";
      const ga = -Math.PI / 2 + ((gi - 1) / (names.length - 1)) * Math.PI * 2;
      const gx = central ? CX0 : CX0 + GR * Math.cos(ga);
      const gy = central ? CY0 : CY0 + GR * Math.sin(ga);
      const cr = 26 + Math.sqrt(members.length) * 26;
      centers.push({ f, gx, gy, cr, n: members.length });
      members.forEach((c, i) => {
        const ang = i * 2.399963;
        const rad = members.length === 1 ? 0 : cr * Math.sqrt((i + 0.6) / members.length);
        const x = gx + rad * Math.cos(ang), y = gy + rad * Math.sin(ang);
        pos[c.id] = { x, y };
        nodes.push({ c, x, y, f });
      });
    });
    return { nodes, pos, centers };
  }, []);
  const active = RELATIONS.filter((r) => pos[r.a] && pos[r.b] && relActive(r, Y));

  return (
    <div>
      <div className="flex flex-wrap items-center" style={{ gap: 8, marginBottom: 6 }}>
        {PHASES.map(([label, y]) => (
          <Chip key={label} active={Y === y} onClick={() => setY(y)} label={t(label)} />
        ))}
        <input type="range" min={730} max={765} value={Y} onChange={(e) => setY(+e.target.value)}
          style={{ flex: 1, minWidth: 180, accentColor: T.accent }} />
        <span style={{ fontFamily: gUI, fontSize: 16, color: T.accent, minWidth: 170, textAlign: "right" }}>
          {en ? `${Y} (${englishEraOf(Y)})` : `${Y}（${eraOf(Y)}）`}
        </span>
      </div>
      <RelKey note={t("虛線＝未遂／未說開／未見 · 硃砂點線＝歿後延續 · 虛環＝其人已歿")} />
      <div style={{ overflowX: "auto", position: "relative" }}>
        <ZoomBtns view={view} zoomBy={zoomBy} reset={reset} />
        <svg viewBox="0 0 1120 1050" ref={wheelElRef}
          style={{ width: "100%", maxWidth: 1100, display: "block", margin: "0 auto", ...gestureStyle }}
          {...handlers}>
          <g transform={`translate(${view.tx} ${view.ty}) scale(${view.k})`}>
          {/* 襯底：觸屏點空處即卸下所選人物，關係邊隨之復原 */}
          <rect x={-4000} y={-4000} width={9000} height={9000} fill="transparent"
            onClick={() => { if (movedRef.current > 5) return; setHover(null); }} />
          {centers.map((g) => (
            <text key={g.f} x={g.gx} y={g.gy - g.cr - 10} textAnchor="middle"
              style={{ fontFamily: gUI, fontSize: en ? 12 : 13, fill: fcText(g.f), letterSpacing: en ? "0.04em" : "0.3em", opacity: 0.8 }}>
              {g.f === "其他" ? t(g.f) : facName(locale, g.f)}
            </text>
          ))}
          {active.map((r, i) => {
            const p1 = pos[r.a], p2 = pos[r.b];
            const posth = relPosthumous(r, Y);
            const hi = hover && (r.a === hover || r.b === hover);
            const dim = hover && !hi;
            return (
              <g key={i}>
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={posth ? T.accent : relColor(r.t)}
                  strokeWidth={hi ? 1.8 : 1}
                  strokeDasharray={posth ? "2 5" : r.da ? "6 4" : "none"}
                  opacity={dim ? 0.07 : posth ? 0.5 : hi ? 1 : 0.45} />
                {hi && (
                  <text x={(p1.x + p2.x) / 2} y={(p1.y + p2.y) / 2 - 4} textAnchor="middle"
                    style={{ fontFamily: gUI, fontSize: 10.5, fill: posth ? T.accent : relColor(r.t) }}>
                    {relName(locale, r.t)}{posth ? t("（歿後）") : ""}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map((n) => {
            if (n.c.birth != null && n.c.birth > Y) return null;
            const dead = n.c.death != null && Y > n.c.death;
            const hi = hover === n.c.id;
            return (
              <g key={n.c.id} style={{ cursor: "pointer" }} opacity={dead ? 0.38 : 1}
                onMouseEnter={() => { if (!coarse) setHover(n.c.id); }}
                onMouseLeave={() => { if (!coarse) setHover(null); }}
                /* 觸屏無懸停：首觸顯其關係諸邊，再觸方開檔案 */
                onClick={() => { if (movedRef.current > 5) return; if (coarse && hover !== n.c.id) { setHover(n.c.id); return; } onOpenChar(n.c); }}>
                {/* 觸屏加大點選域：節點在窄屏上實徑僅數像素，另置一透明圓承接手指 */}
                <title>{hasEnName(locale, n.c) ? `${charName(locale, n.c)} ${n.c.name}` : n.c.name}</title>
                {coarse && <circle cx={n.x} cy={n.y} r={26} fill="transparent" />}
                <circle cx={n.x} cy={n.y} r={hi ? 19 : 15.5} fill={T.panel}
                  stroke={fc(n.f)} strokeWidth={hi ? 2 : 1.3} strokeDasharray={dead ? "3 3" : "none"} />
                <text x={n.x} y={n.y + 3.5} textAnchor="middle"
                  style={{ fontFamily: gName, fontSize: n.c.name.length > 3 ? 8 : n.c.name.length > 2 ? 9.5 : 11, fill: T.ink }}>
                  {n.c.name}
                </text>
                {/* 英文名不入小圈（圈徑十五像素），懸停時標於圈下 */}
                {hi && hasEnName(locale, n.c) && (
                  <text x={n.x} y={n.y + 33} textAnchor="middle" style={{ fontFamily: gUI, fontSize: 10.5, fill: T.accent, paintOrder: "stroke", stroke: T.bg, strokeWidth: 3 }}>{charName(locale, n.c)}</text>
                )}
              </g>
            );
          })}
          </g>
        </svg>
      </div>
      {en ? (
        <div lang="en" style={{ fontSize: 12.5, color: T.faint, textAlign: "center", marginTop: 4, fontFamily: gUI, lineHeight: 1.6 }}>{t("群像說明")}</div>
      ) : (
      <div style={{ fontSize: 12, color: T.faint, textAlign: "center", marginTop: 4, fontFamily: gUI }}>
        諸邊依《人物关系》庫著錄，並自《东都天策府组人设》《西域组·大漠沙如雪》等諸人設文本增補——按門派聚類；拖動滑桿觀關係之生滅——邊之顯隱依起讫，硃砂點線為歿後之延續。兩核（閔方城、程凱）在此降格為普通節點：中心性不再被預設，而由網絡自證。
      </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label, fontFamily = gUI }) {
  return (
    <button onClick={onClick} style={{ fontSize: 12.5, fontFamily, color: active ? T.onAccent : T.muted, background: active ? T.accent : "transparent", border: `1px solid ${active ? T.accent : T.line}`, padding: "3px 12px", borderRadius: "3px", cursor: "pointer" }}>
      {label}
    </button>
  );
}

/* 檢索框內「查」字小方標：純視覺標識，不可點——配合外層 position:relative 容器與 input 左側讓位 padding 使用 */
const SearchTag = ({ fontFamily = gUI }) => (
  <span style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 18, display: "flex", alignItems: "center", justifyContent: "center", background: T.accent, color: T.onAccent, fontSize: 11, fontFamily, borderRadius: "3px", pointerEvents: "none" }}>查</span>
);

const NOLOC_KEY = "__noloc__"; /* 無地點事件之內部鍵 */
const TRACK_COLORS = ["#6C9FDE", "#D96A8B", "#5FBFAE"]; /* 動線識別色：霽青・桃緋・青瓷——高辨識、無門派義 */



/* 弧環分段：一地多門派時以門派色弧環表其比例；極坐標取 SVG 慣例（-90° 起順時針） */
function ringArc(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.cos((a - 90) * Math.PI / 180), cy + r * Math.sin((a - 90) * Math.PI / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(Math.min(a1, a0 + 359.9));
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/* ---------------- 山河輿圖 ---------------- */
function GeoMap({ onOpenChar }) {
  const locale = useLocale();
  const t = useT();
  const en = locale === "en";
  /* 地名：英文界面查 places.en.js，無則原樣（SVG 中不包 Zh） */
  const pn = (l) => placeName(locale, l);
  const NONE_FAC = "__none__";
  const ETH_GROUP = "__ethnic__";
  const [fsel, setFsel] = useState("all");
  const [who, setWho] = useState("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null); /* 選中地名（或 NOLOC_KEY）→ 側欄編年 */
  const [hover, setHover] = useState(null);
  const [allLabels, setAllLabels] = useState(false); /* 地名全顯開關 */
  const { view, zoomBy, reset, handlers, gestureStyle, movedRef, wheelElRef } = usePanZoom(1000, 720);
  const coarse = useCoarsePointer();
  const [trackSel, setTrackSel] = useState([]); /* 動線人物（點選即顯，至多三人；滿員再選則汰最舊） */
  const toggleTrack = (id) =>
    setTrackSel((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 3 ? [...prev.slice(1), id] : [...prev, id]));
  /* 第三期：時間三態 —— all 全程；cum 累積至所選年（含）；year 僅當年切片 */
  const [tmode, setTmode] = useState("all");
  const [tyear, setTyear] = useState(756); /* 默認落在天寶十五年——亂之樞紐 */
  const YR = useMemo(() => {
    let mn = Infinity, mx = -Infinity;
    for (const e of EVENTS) { if (e.year < mn) mn = e.year; if (e.year > mx) mx = e.year; }
    return { min: mn, max: mx };
  }, []);
  const inTime = (e) => tmode === "all" || (tmode === "cum" ? e.year <= tyear : e.year === tyear);
  const [hoverSeg, setHoverSeg] = useState(null); /* 悬停動線段：{ti,i,x,y,w,...}，浮出繫此段之事 */
  useEffect(() => { setHoverSeg(null); }, [trackSel, tmode, tyear]);
  const narrow = useNarrow(920);

  const inEvents = useMemo(
    () =>
      [...new Set(EVENTS.flatMap((e) => e.chars))].sort(
        (a, b) => EVENTS.filter((e) => e.chars.includes(b)).length - EVENTS.filter((e) => e.chars.includes(a)).length
      ),
    []
  );
  const ETHNIC_TAGS = ["鲜卑", "羌", "奚人/狼牙", "靺鞨", "西域", "柔然", "南诏", "波斯", "苗疆"];
  const facList = useMemo(() => {
    const set = new Set();
    for (const e of EVENTS) {
      e.fac.forEach((f) => set.add(f));
      e.chars.forEach((id) => byId[id].belong.forEach((b) => set.add(b)));
    }
    const inFac = (e, f) => e.fac.includes(f) || e.chars.some((id) => byId[id].belong.includes(f));
    const arr = [...set]
      .map((f) => ({ f, n: EVENTS.filter((e) => inFac(e, f)).length }))
      .sort((a, b) => b.n - a.n);
    const main = arr.filter((x) => !ETHNIC_TAGS.includes(x.f));
    const ethnic = arr.filter((x) => ETHNIC_TAGS.includes(x.f));
    return { main, ethnic, none: EVENTS.filter((e) => e.fac.length === 0).length };
  }, []);
  const subPersons = useMemo(() => {
    if (fsel === "all") return [];
    if (fsel === NONE_FAC) return inEvents.filter((id) => EVENTS.some((e) => e.fac.length === 0 && e.chars.includes(id)));
    if (fsel === ETH_GROUP) return inEvents.filter((id) => byId[id].belong.some((b) => ETHNIC_TAGS.includes(b)));
    return inEvents.filter((id) => byId[id].belong.includes(fsel));
  }, [fsel, inEvents]);

  /* 篩選謂詞與年表同構：門派兩級（含族屬傘）、人物、檢索 */
  const shown = useMemo(() => {
    const kw = q.trim();
    const kwl = kw.toLowerCase();
    const enHit = (str) => en && !!str && str.toLowerCase().includes(kwl);
    const hit = (e) =>
      kw === "" ||
      e.title.includes(kw) ||
      (e.seq || "").includes(kw) ||
      e.loc.some((l) => l.includes(kw) || enHit(placeName(locale, l))) ||
      e.fac.some((f) => f.includes(kw) || enHit(facName(locale, f))) ||
      eraOfYM(e.year, e.month).includes(kw) ||
      enHit(eventTitle(locale, e)) || enHit(englishEraOf(e.year)) ||
      e.chars.some((id) => byId[id].name.includes(kw) || namesText(byId[id]).includes(kw) || enHit(charName(locale, byId[id])));
    const byFaction = (e) =>
      who !== "all" ||
      fsel === "all" ||
      (fsel === NONE_FAC
        ? e.fac.length === 0
        : fsel === ETH_GROUP
        ? facList.ethnic.some(({ f }) => e.fac.includes(f) || e.chars.some((id) => byId[id].belong.includes(f)))
        : e.fac.includes(fsel) || e.chars.some((id) => byId[id].belong.includes(fsel)));
    return EVENTS.filter((e) => (who === "all" || e.chars.includes(who)) && byFaction(e) && hit(e) && inTime(e)).sort(sortEvents);
  }, [who, fsel, q, facList, tmode, tyear, en, locale]);

  /* 聚合：每地一點，計數、門派色分佈隨篩選重算；一事多地各計一次（與檢索「地點命中」同理） */
  const spots = useMemo(() => {
    const m = {};
    let noloc = 0;
    for (const e of shown) {
      if (e.loc.length === 0) { noloc += 1; continue; }
      for (const l of e.loc) {
        if (!m[l]) m[l] = { n: 0, tally: {}, none: 0 };
        m[l].n += 1;
        if (e.fac.length === 0) m[l].none += 1;
        else for (const f of e.fac) m[l].tally[f] = (m[l].tally[f] || 0) + 1;
      }
    }
    return { m, noloc };
  }, [shown]);

  const selEvents = useMemo(() => {
    if (!sel) return [];
    if (sel === NOLOC_KEY) return shown.filter((e) => e.loc.length === 0);
    return shown.filter((e) => e.loc.includes(sel));
  }, [sel, shown]);

  /* 動線候選：名下落點（經 tloc 裁定、並補點）涉兩處以上相異地者；沿 inEvents（事件數降序）排列 */
  const trackables = useMemo(
    () =>
      inEvents.filter((id) => {
        const locs = new Set();
        for (const e of EVENTS) if (e.chars.includes(id)) {
          const l = e.tloc && Object.prototype.hasOwnProperty.call(e.tloc, id) ? e.tloc[id] : e.loc.length > 0 ? e.loc[0] : null;
          if (l != null) locs.add(l);
        }
        for (const s of TRACK_SUPPLEMENTS[id] || []) locs.add(s.loc);
        return locs.size >= 2;
      }),
    [inEvents]
  );
  /* 動線推導：取人物完整編年（不受當前篩選）併入補點，依 sortEvents 同構之比較排定；
     落點裁定三序：補點直取其 loc → 事件問 tloc 覆寫（null＝其人不在，走無地點語義）→ 取 loc[0] 為錨；
     連續同地併為一駐；無地點（或裁為不在）之事居間者記 gapBefore（該段虛線）。
     起點補點（year: null）恆居首，標「起」。駐點按地歸組出「序·年」標註，重返之地諸次並列一行。 */
  const tracks = useMemo(
    () =>
      trackSel.map((id, ti) => {
        const supps = (TRACK_SUPPLEMENTS[id] || [])
          .filter((s) => (s.year == null ? tmode !== "year" : inTime(s)))
          .map((s) => ({ ...s, supp: true })); /* 動線隨時間三態同步；無紀年起點於逐年模式不顯 */
        const evs = EVENTS.filter((e) => e.chars.includes(id) && inTime(e)).concat(supps)
          .sort((a, b) => ((a.year ?? -9999) - (b.year ?? -9999)) || ((a.month ?? 0) - (b.month ?? 0)) || (a.seq ?? "").localeCompare(b.seq ?? ""));
        const stays = [];
        let pendingGap = false;
        for (const e of evs) {
          const l = e.supp ? e.loc
            : e.tloc && Object.prototype.hasOwnProperty.call(e.tloc, id) ? e.tloc[id]
            : e.loc.length > 0 ? e.loc[0] : null;
          if (l == null) { if (stays.length > 0) pendingGap = true; continue; }
          const c = LOC_COORDS[l];
          if (!c || c.x == null) continue;
          const last = stays[stays.length - 1];
          if (last && last.loc === l) { last.toYear = e.year ?? last.toYear; pendingGap = false; continue; } /* 並駐延展迄年 */
          stays.push({ loc: l, x: c.x, y: c.y, year: e.year ?? null, toYear: e.year ?? null, gapBefore: pendingGap,
            ev: e.supp ? { year: e.year, month: e.month ?? null, title: `〔輿圖補點〕${e.note}`, supp: true, note: e.note } : e }); /* ev＝到達首見之事（或補點注記），此段之文獻出處 */
          pendingGap = false;
        }
        const byLoc = {};
        stays.forEach((s, i) => {
          (byLoc[s.loc] = byLoc[s.loc] || { x: s.x, y: s.y, visits: [] }).visits.push(`${i + 1}·${s.year ?? "起"}`);
        });
        return { id, ti, color: TRACK_COLORS[ti % TRACK_COLORS.length], stays, locLabels: Object.entries(byLoc) }; /* 原色：此 memo 不隨膚重算，取用處再 tone() */
      }),
    [trackSel, tmode, tyear]
  );
  const rOf = (n) => Math.min(3.5 + 2.0 * Math.sqrt(n), 32); /* 環徑緩放，防北疆巨核吞鄰 */
  const offBoxes = { "西": { x: 34, y: 300 }, "東": { x: 966, y: 300 } };
  const offNames = { "西": [], "東": [] };
  Object.entries(LOC_COORDS).forEach(([name, c]) => { if (c.kind === "off") offNames[c.dir].push(name); });

  /* 單地點位：暈染面／弧環／中心符號（圓＝城邑，菱＝門派）。
     以渲染函數而非內嵌元件呼之：內嵌元件每次重繪皆為新型別，懸停一變即整批卸載重掛，
     按下與鬆開落在前後兩個節點上，click 便發不出來 */
  const renderSpot = (name) => {
    const c = LOC_COORDS[name];
    const d = spots.m[name];
    if (!c || c.kind === "off") return null;
    const n = d ? d.n : 0;
    const isSel = sel === name, isHov = hover === name;
    const z = view.k; /* 語義縮放：尺寸類量反除倍率，屏幕恆定；坐標隨變換拉開 */
    const r = rOf(Math.max(n, 1)) / z;
    const segs = d ? Object.entries(d.tally).sort((a, b) => b[1] - a[1]) : [];
    const segTotal = segs.reduce((s, [, v]) => s + v, 0) + (d ? d.none : 0);
    const dim = n === 0 ? 0.18 : (hover || sel) && !isSel && !isHov ? 0.45 : 1;
    let acc = 0;
    return (
      <g key={name} style={{ cursor: n > 0 ? "pointer" : "default", opacity: dim, transition: "opacity .15s" }}
        onMouseEnter={() => { if (!coarse) setHover(name); }}
        onMouseLeave={() => { if (!coarse) setHover(null); }}
        onClick={() => { if (movedRef.current > 5) return; if (n > 0) setSel(isSel ? null : name); }}>
        {c.kind === "region" && (
          <ellipse cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} fill={segs[0] ? fc(segs[0][0]) : T.faint} opacity={0.10}
            transform={c.rot ? `rotate(${c.rot} ${c.x} ${c.y})` : undefined} stroke={T.line} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        )}
        {n > 0 && segTotal > 0 && (segs.length + (d.none ? 1 : 0)) > 1 ? (
          <>
            {segs.map(([f, v]) => {
              const a0 = (acc / segTotal) * 360; acc += v;
              const a1 = (acc / segTotal) * 360;
              return <path key={f} d={ringArc(c.x, c.y, r, a0, a1)} fill="none" stroke={fc(f)} strokeWidth={(isSel || isHov ? 4 : 3) / z} />;
            })}
            {d.none > 0 && (() => {
              const a0 = (acc / segTotal) * 360;
              return <path d={ringArc(c.x, c.y, r, a0, 360)} fill="none" stroke={T.neutral} strokeWidth={(isSel || isHov ? 4 : 3) / z} />;
            })()}
          </>
        ) : n > 0 ? (
          <circle cx={c.x} cy={c.y} r={r} fill="none" stroke={segs[0] ? fc(segs[0][0]) : T.neutral} strokeWidth={(isSel || isHov ? 4 : 3) / z} />
        ) : null}
        {isSel && <circle cx={c.x} cy={c.y} r={r + 5 / z} fill="none" stroke={T.accent} strokeWidth={1 / z} strokeDasharray={`${3 / z} ${3 / z}`} />}
        {c.kind === "sect" ? (
          <rect x={c.x - 4 / z} y={c.y - 4 / z} width={8 / z} height={8 / z} transform={`rotate(45 ${c.x} ${c.y})`}
            fill={n > 0 ? T.panelHi : T.bg} stroke={isSel || isHov ? T.accent : T.muted} strokeWidth={1.2 / z} />
        ) : c.kind === "city" ? (
          <circle cx={c.x} cy={c.y} r={3.2 / z} fill={n > 0 ? T.ink : T.faint} stroke={T.bg} strokeWidth={0.8 / z} />
        ) : null}
        {(allLabels || n >= Math.max(1, Math.ceil(3 / z)) || isSel || isHov) && (() => {
          const off = { n: [0, -r - 7 / z], s: [0, r + 15 / z], e: [r + 6 / z, 4 / z], w: [-r - 6 / z, 4 / z] }[c.la || "e"];
          return (
            <text x={c.x + off[0]} y={c.y + off[1]} textAnchor={c.la === "e" ? "start" : c.la === "w" ? "end" : "middle"}
              style={{ fontFamily: gUI, fontSize: (isSel || isHov ? 12.5 : 11) / z, fill: isSel || isHov ? T.ink : T.muted, paintOrder: "stroke", stroke: T.bg, strokeWidth: 3 / z }}>
              {pn(name)}{n > 0 ? ` ${n}` : ""}
            </text>
          );
        })()}
      </g>
    );
  };

  /* 點位感應層：每地一枚透明圓盤，覆滿環內（環本空心，點環中空處原無反應），
     徑至少 9px（觸屏 14px）；繪於動線之上，免動線感應帶搶去點選；
     大環先繪、小環後繪，相鄰小邑不為大環所掩 */
  const hitOrder = Object.keys(LOC_COORDS)
    .filter((nm) => (LOC_COORDS[nm].kind === "city" || LOC_COORDS[nm].kind === "sect") && (spots.m[nm]?.n || 0) > 0)
    .sort((a, b) => spots.m[b].n - spots.m[a].n);
  const renderSpotHit = (name) => {
    const c = LOC_COORDS[name];
    const z = view.k;
    const r = Math.max(rOf(spots.m[name].n) / z, (coarse ? 14 : 9) / z);
    return (
      <circle key={name} cx={c.x} cy={c.y} r={r} fill="transparent" style={{ cursor: "pointer" }}
        onMouseEnter={() => { if (!coarse) setHover(name); }}
        onMouseLeave={() => { if (!coarse) setHover(null); }}
        onClick={() => { if (movedRef.current > 5) return; setSel(sel === name ? null : name); }} />
    );
  };

  /* 離圖框：羅盤方位小匣，域外遠地之歸處 */
  const renderOffBox = (dir) => {
    const names = offNames[dir].filter((nm) => (spots.m[nm]?.n || 0) > 0 || allLabels);
    if (names.length === 0) return null;
    const b = offBoxes[dir];
    const anchor = dir === "西" ? "start" : "end";
    return (
      <g>
        <text x={b.x} y={b.y - 14} textAnchor={anchor} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.faint, letterSpacing: "0.3em" }}>
          {dir === "西" ? `◁ ${t("絕域之西")}` : `${t("絕域之東")} ▷`}
        </text>
        {names.map((nm, i) => {
          const n = spots.m[nm]?.n || 0;
          const isSel = sel === nm, isHov = hover === nm;
          const y = b.y + i * 24;
          const seg = spots.m[nm] ? Object.entries(spots.m[nm].tally).sort((a, c) => c[1] - a[1])[0] : null;
          return (
            <g key={nm} style={{ cursor: n > 0 ? "pointer" : "default", opacity: n > 0 ? 1 : 0.35 }}
              onMouseEnter={() => { if (!coarse) setHover(nm); }}
              onMouseLeave={() => { if (!coarse) setHover(null); }}
              onClick={() => { if (movedRef.current > 5) return; if (n > 0) setSel(sel === nm ? null : nm); }}>
              <rect x={dir === "西" ? b.x : b.x - 92} y={y - 13} width={92} height={19}
                fill={isSel ? T.panelHi : "none"} stroke={isSel || isHov ? T.accent : T.line} strokeWidth={1} />
              <text x={dir === "西" ? b.x + 6 : b.x - 6} y={y} textAnchor={anchor}
                style={{ fontFamily: gUI, fontSize: 11, fill: seg ? fc(seg[0]) : T.muted }}>
                {pn(nm)}{n > 0 ? ` ${n}` : ""}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const selCoord = sel && sel !== NOLOC_KEY ? LOC_COORDS[sel] : null;
  const startMark = t("（起）");

  return (
    <div>
      {/* 一級：門派及同級標籤 */}
      <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 8 }}>
        <Chip active={fsel === "all"} onClick={() => { setFsel("all"); setWho("all"); }} label={`${t("全部")} ${EVENTS.length}`} fontFamily="JingHuaLaoSong" />
        {facList.main.map(({ f, n }) => (
          <Chip key={f} active={fsel === f} onClick={() => { setFsel(fsel === f ? "all" : f); setWho("all"); }} label={`${facName(locale, f)} ${n}`} fontFamily="JingHuaLaoSong" />
        ))}
        {facList.ethnic.length > 0 && (
          <Chip active={fsel === ETH_GROUP || facList.ethnic.some((x) => x.f === fsel)}
            onClick={() => { setFsel(fsel === ETH_GROUP ? "all" : ETH_GROUP); setWho("all"); }} label={t("【族属/地属】")} fontFamily="JingHuaLaoSong" />
        )}
        {facList.none > 0 && (
          <Chip active={fsel === NONE_FAC} onClick={() => { setFsel(fsel === NONE_FAC ? "all" : NONE_FAC); setWho("all"); }} label={t("门派未标 {n}", { n: facList.none })} fontFamily="JingHuaLaoSong" />
        )}
      </div>
      {/* 族屬傘形展開之次級標籤 */}
      {fsel === ETH_GROUP && (
        <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 8 }}>
          {facList.ethnic.map(({ f, n }) => (
            <Chip key={f} active={false} onClick={() => { setFsel(f); setWho("all"); }} label={`${facName(locale, f)} ${n}`} fontFamily="JingHuaLaoSong" />
          ))}
        </div>
      )}
      {facList.ethnic.some((x) => x.f === fsel) && (
        <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.faint }}>{t("【族属/地属】")} ·</span>
          <Chip active={true} onClick={() => setFsel(ETH_GROUP)} label={facName(locale, fsel)} fontFamily="JingHuaLaoSong" />
        </div>
      )}
      {/* 二級：人物 */}
      {fsel !== "all" && subPersons.length > 0 && (
        <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.faint }}>{t("屬下之人 ·")}</span>
          <Chip active={who === "all"} onClick={() => setWho("all")} label={t("不限")} fontFamily="JingHuaLaoSong" />
          {subPersons.map((id) => (
            <Chip key={id} active={who === id} onClick={() => setWho(who === id ? "all" : id)} label={charName(locale, byId[id])} fontFamily="JingHuaLaoSong" />
          ))}
        </div>
      )}
      <div style={{ marginBottom: 8 }}>
        <span style={{ position: "relative", display: "inline-block" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("檢索事名、人物、地點、門派、年號")}
            style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: "3px", color: T.ink, fontSize: 12.5, fontFamily: "HuiwenZhengKai", padding: "5px 10px 5px 32px", outline: "none", minWidth: en ? 320 : 200 }} />
          <SearchTag fontFamily="HuiwenZhengKai" />
        </span>
      </div>
      <div className="flex items-center" style={{ gap: 12, marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontFamily: "JingHuaLaoSong", color: T.muted }}>{t("計入 {n} 事 · {m} 地", { n: shown.length, m: Object.keys(spots.m).length })}</span>
        <Chip active={allLabels} onClick={() => setAllLabels(!allLabels)} label={t("地名全顯")} fontFamily="JingHuaLaoSong" />
        {spots.noloc > 0 && (
          <button onClick={() => setSel(sel === NOLOC_KEY ? null : NOLOC_KEY)}
            style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: sel === NOLOC_KEY ? T.ink : T.faint, background: "none", border: `1px dashed ${sel === NOLOC_KEY ? T.accent : T.faint}`, padding: "2px 10px", borderRadius: "3px", cursor: "pointer" }}>
            {t("無地點 {n} 事", { n: spots.noloc })}
          </button>
        )}
      </div>
      {/* 時間滑桿：全程／累積至／僅當年 */}
      <div className="flex flex-wrap items-center" style={{ gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.faint }}>{t("時間 ·")}</span>
        <Chip active={tmode === "all"} onClick={() => setTmode("all")} label={t("全程")} fontFamily="JingHuaLaoSong" />
        <Chip active={tmode === "cum"} onClick={() => setTmode("cum")} label={t("累積至")} fontFamily="JingHuaLaoSong" />
        <Chip active={tmode === "year"} onClick={() => setTmode("year")} label={t("僅當年")} fontFamily="JingHuaLaoSong" />
        {tmode !== "all" && (
          <>
            <input type="range" min={YR.min} max={YR.max} value={tyear} onChange={(e) => setTyear(+e.target.value)}
              style={{ width: 280, accentColor: T.accent, verticalAlign: "middle" }} />
            <span style={{ fontFamily: "JingHuaLaoSong", fontSize: 14, color: T.ink }}>
              {tyear}
              <span style={{ fontSize: 12, color: T.muted }}>{eraOf(tyear) ? (en ? ` (${englishEraOf(tyear)})` : `（${eraOf(tyear)}）`) : ""}</span>
            </span>
          </>
        )}
      </div>
      {/* 色例：輿圖環段依門派著色（一地多門派分段），此可查其義 */}
      <div style={{ marginBottom: 4 }}><FactionKey /></div>
      {/* 動線選人行：點選即顯，至多三人並比 */}
      <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.faint }}>{t("動線（點選即顯，至多三人）·")}</span>
        {trackSel.length > 0 && (
          <button onClick={() => setTrackSel([])}
            style={{ fontSize: 11.5, fontFamily: "JingHuaLaoSong", color: T.muted, background: "none", border: `1px solid ${T.line}`, padding: "2px 10px", cursor: "pointer" }}>
            {t("清空")}
          </button>
        )}
        {trackables.map((id) => {
          const ti = trackSel.indexOf(id);
          return (
            <button key={id} onClick={() => toggleTrack(id)}
              style={{ fontSize: 12, fontFamily: "JingHuaLaoSong", padding: "2px 10px", cursor: "pointer", background: ti >= 0 ? T.panelHi : "none", color: ti >= 0 ? tone(TRACK_COLORS[ti]) : T.muted, border: `1px solid ${ti >= 0 ? tone(TRACK_COLORS[ti]) : T.line}`, borderRadius: "3px" }}>
              {charName(locale, byId[id])}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexDirection: narrow ? "column" : "row" }}>
        {/* 圖幅 */}
        <div style={{ flex: "1 1 auto", minWidth: 0, border: `1px solid ${T.line}`, background: T.panel, position: "relative" }}>
          <ZoomBtns view={view} zoomBy={zoomBy} reset={reset} />
          <svg viewBox="0 0 1000 720" ref={wheelElRef}
            style={{ width: "100%", display: "block", ...gestureStyle }}
            {...handlers}>
            <g transform={`translate(${view.tx} ${view.ty}) scale(${view.k})`}>
            {/* 襯底：觸屏點空處即收起動線浮框 */}
            <rect x={-4000} y={-4000} width={9000} height={9000} fill="transparent"
              onClick={() => { if (movedRef.current > 5) return; setHoverSeg(null); }} />
            {/* 底圖：示意手繪 */}
            <path d={GEO_BASE.coast} fill="none" stroke={T.muted} strokeWidth={1.3} opacity={0.55} vectorEffect="non-scaling-stroke" />
            <path d={GEO_BASE.north} fill="none" stroke={T.faint} strokeWidth={1} strokeDasharray="6 5" opacity={0.6} vectorEffect="non-scaling-stroke" />
            <path d={GEO_BASE.tubo} fill="none" stroke={T.faint} strokeWidth={1} strokeDasharray="6 5" opacity={0.6} vectorEffect="non-scaling-stroke" />
            <path d={GEO_BASE.huanghe} fill="none" stroke={T.river} strokeWidth={1.4} opacity={0.55} vectorEffect="non-scaling-stroke" />
            <path d={GEO_BASE.changjiang} fill="none" stroke={T.river} strokeWidth={1.4} opacity={0.55} vectorEffect="non-scaling-stroke" />
            {GEO_BASE.labels.map((l) => (
              <text key={l.t} x={l.x} y={l.y} textAnchor="middle"
                style={{ fontFamily: gUI, fontSize: en ? 12 : 13, fill: T.faint, letterSpacing: en ? "0.12em" : "0.5em", opacity: 0.65 }}>{en ? pn(l.t.replace(/ /g, "")) : l.t}</text>
            ))}
            {/* 泛稱面先繪（襯底），點位後繪 */}
            {Object.keys(LOC_COORDS).filter((nm) => LOC_COORDS[nm].kind === "region").map((nm) => renderSpot(nm))}
            {Object.keys(LOC_COORDS).filter((nm) => LOC_COORDS[nm].kind === "city" || LOC_COORDS[nm].kind === "sect").map((nm) => renderSpot(nm))}
            {/* 第二期：人物動線 —— 弧線僅表先後曾在，非循此路行；虛線段居間有無地點之事 */}
            {tracks.map((trk) => {
              const t = trk; /* 此處 t 為動線（舊名照留，免改下文諸處）；译字改用 startMark */
              const sh = (t.ti - (tracks.length - 1) / 2) * 6 / view.k; /* 多線並比微錯位，免駐點疊死 */
              const P = (p) => [p.x + sh, p.y + sh * 0.6];
              const tc = tone(t.color); /* 隨膚調色，於渲染期求值 */
              return (
                <g key={t.id} style={{ cursor: "pointer" }} onClick={() => { if (movedRef.current > 5) return; onOpenChar(byId[t.id]); }}>
                  {t.stays.map((s, i) => {
                    if (i === 0) return null;
                    const [ax, ay] = P(t.stays[i - 1]), [bx, by] = P(s);
                    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
                    const bow = Math.min(len * 0.22, 34) * (i % 2 ? 1 : -1); /* 弓向交替，往返不疊 */
                    const cx = (ax + bx) / 2 - (dy / len) * bow, cy = (ay + by) / 2 + (dx / len) * bow;
                    const d = `M ${ax.toFixed(1)} ${ay.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
                    const segHov = hoverSeg && hoverSeg.ti === t.ti && hoverSeg.i === i;
                    const onSegMove = (ev2) => {
                      const box = ev2.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
                      setHoverSeg({ ti: t.ti, i, x: ev2.clientX - box.left, y: ev2.clientY - box.top, w: box.width, color: t.color, name: charName(locale, byId[t.id]), prev: t.stays[i - 1], s });
                    };
                    return (
                      <g key={i}>
                        <path d={d} fill="none" stroke={T.bg} strokeWidth={(segHov ? 4.8 : 3.6) / view.k} opacity={0.7} />
                        <path d={d} fill="none" stroke={tc} strokeWidth={(segHov ? 2.8 : 1.7) / view.k}
                          opacity={segHov ? 1 : hoverSeg ? 0.3 : 0.9}
                          strokeDasharray={s.gapBefore ? `${5 / view.k} ${4 / view.k}` : undefined} />
                        {/* 觸屏指腹粗於鼠尖，感應帶加寬一倍有餘 */}
                        <path d={d} fill="none" stroke="transparent" strokeWidth={(coarse ? 26 : 12) / view.k} style={{ pointerEvents: "stroke" }}
                          onMouseEnter={(ev2) => { if (!coarse) onSegMove(ev2); }}
                          onMouseMove={(ev2) => { if (!coarse) onSegMove(ev2); }}
                          onMouseLeave={() => { if (!coarse) setHoverSeg(null); }}
                          /* 觸屏無懸停：輕觸此段即浮出繫此段之事，不轉開檔案——檔案由駐點與人名承接 */
                          onClick={(ev2) => { if (!coarse) return; ev2.stopPropagation(); if (movedRef.current > 5) return; onSegMove(ev2); }} />
                      </g>
                    );
                  })}
                  {t.stays.map((s, i) => {
                    const [x, y] = P(s);
                    return <circle key={"n" + i} cx={x} cy={y} r={3.2 / view.k} fill={tc} stroke={T.bg} strokeWidth={1 / view.k} />;
                  })}
                  {t.locLabels.map(([loc, g]) => {
                    const [x, y] = P(g);
                    return (
                      <text key={loc} x={x + 6 / view.k} y={y + (15 + t.ti * 11) / view.k}
                        style={{ fontFamily: gUI, fontSize: 9.5 / view.k, fill: tc, paintOrder: "stroke", stroke: T.bg, strokeWidth: 2.5 / view.k }}>
                        {en ? g.visits.join(", ").replace(/起/g, t("起")) : g.visits.join("、")}
                      </text>
                    );
                  })}
                  {t.stays[0] && (() => {
                    const [x, y] = P(t.stays[0]);
                    return (
                      <text x={x - 7 / view.k} y={y - 7 / view.k} textAnchor="end"
                        style={{ fontFamily: gName, fontSize: 11.5 / view.k, fill: tc, fontWeight: 700, paintOrder: "stroke", stroke: T.bg, strokeWidth: 3 / view.k }}>
                        {charName(locale, byId[t.id])}{startMark}
                      </text>
                    );
                  })()}
                </g>
              );
            })}
            {/* 點位感應層（見 renderSpotHit） */}
            {hitOrder.map((nm) => renderSpotHit(nm))}
            </g>
            {renderOffBox("西")}
            {renderOffBox("東")}
            {/* 圖例 */}
            {/* 圖例末行基線須在 viewBox 高 720 之內：舊置 620，末行落在 728，被裁去半行有餘，今中文上移至 604。
                英文句長，多出兩行，置 572 */}
            <g transform={`translate(34, ${en ? 572 : 604})`}>
              <circle cx={6} cy={0} r={3.2} fill={T.ink} /><text x={16} y={4} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.muted }}>{t("實名城邑")}</text>
              <rect x={2} y={20} width={8} height={8} transform="rotate(45 6 24)" fill={T.panelHi} stroke={T.muted} strokeWidth={1} /><text x={16} y={28} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.muted }}>{t("門派駐地／自設地")}</text>
              <ellipse cx={6} cy={48} rx={9} ry={5} fill={T.faint} opacity={0.25} stroke={T.line} strokeDasharray="2 3" /><text x={16} y={52} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.muted }}>{t("區域泛稱（事件計入面心）")}</text>
              {(en ? ["輿圖圖例一", "輿圖圖例二", "輿圖圖例三", "輿圖圖例四", "輿圖圖例五"] : [
                "環徑按事件數開方縮放；一地多門派以門派色分段。",
                "底圖為示意手繪，方位可據、比例不稱。動線由事件推導、兼採作者訂正之補點，",
                "僅表先後曾在、非循此路行；虛線段居間有無地點之事；駐點注「序·年」。",
              ]).map((line, i) => (
                <text key={i} x={0} y={76 + i * 16} style={{ fontFamily: gUI, fontSize: 10.5, fill: T.faint }}>{en ? t(line) : line}</text>
              ))}
            </g>
          </svg>
          {/* 動線悬浮框：繫此段之事——到達之首見；標題逾百字截斷，全文由側欄承接 */}
          {hoverSeg && (() => {
            const flip = hoverSeg.x > hoverSeg.w * 0.55;
            const ev = hoverSeg.s.ev;
            const ttl = ev.supp ? `${t("〔輿圖補點〕")}${ev.note}` : eventTitle(locale, ev);
            const cap = en && ttl !== ev.title ? 220 : 100; /* 英文同等篇幅字元多，截斷放寬 */
            /* 觸屏改浮於指上方，免為指腹所掩 */
            const tf = [flip ? "translateX(-100%)" : "", coarse ? "translateY(-100%)" : ""].filter(Boolean).join(" ");
            return (
              <div style={{ position: "absolute", left: hoverSeg.x + (flip ? -14 : 14), top: hoverSeg.y + (coarse ? -14 : 12), transform: tf || "none", maxWidth: 300, background: T.panelHi, border: `1px solid ${T.line}`, boxShadow: T.xShadowTip, padding: "10px 13px", pointerEvents: "none", zIndex: 4 }}>
                <div style={{ fontFamily: gUI, fontSize: 12.5, color: tone(hoverSeg.color), marginBottom: 4 }}>
                  {en
                    ? `${hoverSeg.name} · ${pn(hoverSeg.prev.loc)} (until ${hoverSeg.prev.toYear ?? t("起")}) → ${pn(hoverSeg.s.loc)} (${hoverSeg.s.year ?? t("起")})`
                    : `${hoverSeg.name} · ${hoverSeg.prev.loc}（迄${hoverSeg.prev.toYear ?? "起"}）→ ${hoverSeg.s.loc}（${hoverSeg.s.year ?? "起"}）`}
                </div>
                {hoverSeg.s.gapBefore && (
                  <div style={{ fontFamily: gUI, fontSize: 11, color: T.faint, marginBottom: 4 }}>{t("其間有無地點之事，故弧作虛線。")}</div>
                )}
                <div style={{ fontFamily: gUI, fontSize: 12.5, color: T.ink, lineHeight: 1.75 }}>
                  <span style={{ color: T.muted, fontSize: 11.5 }}>{en
                    ? `(${englishEraOf(ev.year)}${ev.month != null ? `, ${monthEn(ev.month)}` : ""}) `
                    : `（${eraOf(ev.year)}${ev.month != null ? ` ${CN_MONTH[ev.month]}` : ""}）`}</span>
                  <span lang={en && ttl === ev.title ? "zh" : undefined}>{ttl.length > cap ? ttl.slice(0, cap) + (en ? "…" : "……") : ttl}</span>
                </div>
                <div style={{ fontFamily: gUI, fontSize: 10.5, color: T.faint, marginTop: 5 }}>{t("繫此段者為到達之首見，未必為位移之因；全文點駐地開側欄。")}</div>
              </div>
            );
          })()}
        </div>
        {/* 側欄：選中地之編年 */}
        {sel && (
          <div style={{ flex: narrow ? "1 1 auto" : "0 0 360px", width: narrow ? "100%" : 360, maxHeight: narrow ? "none" : 640, overflowY: "auto", border: `1px solid ${T.line}`, background: T.panel, padding: "14px 16px 6px 20px" }}>
            <div className="flex items-baseline" style={{ gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: gUI, fontSize: 17, color: T.ink, fontWeight: 700 }}>
                {sel === NOLOC_KEY ? t("無地點之事") : en && pn(sel) === sel ? <Zh>{sel}</Zh> : pn(sel)}
              </span>
              <span style={{ fontFamily: gUI, fontSize: 12, color: T.muted }}>{t("{n} 事", { n: selEvents.length })}</span>
              <button onClick={() => setSel(null)} aria-label={t("關閉")} style={{ marginLeft: "auto", background: "none", border: "none", color: T.faint, fontSize: 16, cursor: "pointer" }}>×</button>
            </div>
            {selCoord && selCoord.note && (
              <div style={{ fontFamily: gUI, fontSize: 11.5, color: T.faint, marginBottom: 8 }}>{en ? <>{t("按：")}<Zh>{selCoord.note}</Zh></> : `按：${selCoord.note}。`}</div>
            )}
            <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 14, marginLeft: 40 }}>
              {selEvents.map((e, i) => {
                const showYear = i === 0 || selEvents[i - 1].year !== e.year;
                return <EvRow key={i} e={e} showYear={showYear} onOpenChar={onOpenChar} />;
              })}
              {selEvents.length === 0 && (
                <div style={{ fontFamily: gUI, fontSize: 12.5, color: T.faint, padding: "10px 0 20px" }}>{t("當前篩選下此地無事。")}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- 主應用 ---------------- */
/* ---------------- 頁頭下拉（語言、紙色） ----------------
   觸發鈕與「卷首」同尺寸同字（京華老宋 13、字距 0.2em），惟框色取 T.line、不著朱。
   菜單為 menu + menuitemradio：當前項 aria-checked，左綴高亮小點。
   鍵盤：觸發鈕上下箭頭鍵、Enter、Space 開並聚焦當前項；菜單內上下箭頭循環、Home/End 首末、
   Enter/Space 選定、Esc 收起並回焦觸發鈕、Tab 收起放行。點菜單外即收。
   選定後焦點回到觸發鈕。換紙色會整棵重掛站內（見 App.jsx），觸發鈕隨之重生——
   故選定前記下 id，由「值已變」之後的那一次渲染（換語言是原鈕、換紙色是新鈕）接回焦點。 */
let headerMenuRefocus = null;
function HeaderMenu({ id, label, hint, options, value, onChange, locale }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null), btnRef = useRef(null), itemRefs = useRef([]);
  const en = locale === "en";
  useEffect(() => {
    if (headerMenuRefocus === id) { headerMenuRefocus = null; btnRef.current?.focus({ preventScroll: true }); }
  }, [id, value]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    const cur = Math.max(0, options.findIndex((o) => o.value === value));
    itemRefs.current[cur]?.focus({ preventScroll: true }); /* 聚焦不捲頁：頁頭半出視口時展開，頁面不應跳回頂端 */
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- 只在開合時聚焦一次，選項與值變動不重跑
  const close = (refocus) => { setOpen(false); if (refocus) btnRef.current?.focus({ preventScroll: true }); };
  const pick = (v) => {
    if (v === value) { close(true); return; }
    headerMenuRefocus = id;
    setOpen(false);
    onChange(v);
  };
  const onMenuKey = (e) => {
    const n = options.length;
    const at = itemRefs.current.indexOf(document.activeElement);
    const go = (i) => { e.preventDefault(); itemRefs.current[(i + n) % n]?.focus(); };
    if (e.key === "ArrowDown") go(at + 1);
    else if (e.key === "ArrowUp") go(at - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(n - 1);
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === "Tab") setOpen(false);
  };
  return (
    <div ref={wrapRef} className="header-menu" style={{ "--hm-hover": T.panelHi, "--hm-focus": T.accent }}>
      <button ref={btnRef} type="button" aria-haspopup="menu" aria-expanded={open} title={hint}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === "ArrowDown" && !open) { e.preventDefault(); setOpen(true); } }}
        className="header-menu-trigger"
        style={{ fontFamily: en ? undefined : "JingHuaLaoSong", color: open ? T.ink : T.muted, border: `1px solid ${open ? T.accent : T.line}` }}>
        {label}
        <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" style={{ marginLeft: 6, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>
          <path d="M.5.5 4 4 7.5.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </button>
      {open && (
        <div role="menu" aria-label={label} onKeyDown={onMenuKey} className="header-menu-list"
          style={{ background: T.panel, border: `1px solid ${T.line}`, boxShadow: T.xShadow }}>
          {options.map((o, i) => {
            const on = o.value === value;
            return (
              <button key={o.value} ref={(el) => (itemRefs.current[i] = el)} type="button" role="menuitemradio" aria-checked={on}
                lang={o.lang} tabIndex={-1} onClick={() => pick(o.value)} className="header-menu-item"
                style={{ fontFamily: o.lang === "en" || (en && !o.lang) ? undefined : "JingHuaLaoSong", color: on ? T.ink : T.muted }}>
                <span aria-hidden="true" className="header-menu-dot" style={{ background: on ? T.accent : "transparent" }} />
                {o.swatch && <span aria-hidden="true" className="header-menu-swatch" style={{ background: o.swatch, borderColor: T.line }} />}
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Wiki({ onOpenLanding }) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const en = locale === "en";
  const [skin, setSkin] = useSkin();
  const t = useT();
  /* 路由：哈希為唯一事實源（見 router.js 體例）。寫入即改哈希，
     hashchange（含瀏覽器前進後退）回灌 state；nav 同步 setHash 一份，
     免事件異步間隙內連續導航取到舊值——事件再至時值相同，React 自行免渲染 */
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const route = useMemo(() => parseRoute(hash), [hash]);
  const nav = (patch, replace = false) => {
    const h = routeHash({ ...route, ...patch });
    if (h === hash) return;
    setHash(h);
    if (replace) window.history.replaceState(null, "", h);
    else window.location.hash = h;
  };
  const tab = route.tab;
  const openChar = route.char ? byId[route.char] || null : null; /* 壞 id 鏈接：不開彈窗、不作報錯 */
  const setTab = (k) => nav({ tab: k });
  const setOpenChar = (c) => nav({ char: c ? c.id : null });
  const [faction, setFaction] = useState("全部");
  const [q, setQ] = useState("");

  const factions = ["全部", ...new Set(CHARACTERS.flatMap((c) => c.belong))];
  /* 英文界面：另查英文名、表字、稱號、出身（不分大小寫）；中文照查 */
  const ql = q.toLowerCase();
  const enHit = (str) => en && !!str && str.toLowerCase().includes(ql);
  const shown = CHARACTERS.filter(
    (c) => {
      const tr = charEn(locale, c.id);
      return (faction === "全部" || c.belong.includes(faction)) &&
      (q === "" ||
        c.name.includes(q) ||
        namesText(c).includes(q) ||
        (c.epithet || "").includes(q) ||
        (c.hao || "").includes(q) ||
        (c.pin || "").includes(q) ||
        (c.birthplace || "").includes(q) ||
        enHit(tr?.name) || enHit(tr?.zi) || enHit(tr?.hao) || enHit(tr?.epithet) || enHit(tr?.birthplace) ||
        (en && nameItemsEn(c).some(([, v]) => enHit(v))));
    }
  );

  return (
    <div className="site-root" style={{ minHeight: "100vh", backgroundColor: T.bg, color: T.ink, padding: "0 0 60px" }}>
      <header style={{ borderBottom: `1px solid ${T.line}`, padding: "34px 28px 22px", display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
        <div>
          {/* 題頭：英文界面上行作英文站名與年代；「人山人海 · 檔案」英文作 Characters: Archive（作者 2026-11-22 定），冒號同中文之點著朱 */}
          <div lang={en ? "en" : undefined} style={{ fontFamily: "HuiwenZhengKai", fontSize: 11, letterSpacing: en ? "0.12em" : "0.5em", color: T.faint }}>{en ? "Eight Thousand Miles Away · 715–800 · Kaiyuan 3 to Zhenyuan 16" : "七一五 — 八〇〇 · 開元三年至貞元十六年"}</div>
          <h1 lang={en ? "en" : undefined} style={{ fontFamily: "HuiwenZhengKai", fontSize: en ? 32 : 34, fontWeight: 700, margin: "6px 0 0", letterSpacing: en ? "0.01em" : "0.08em" }}>
            {en ? <>Characters<span style={{ color: T.accent }}>:</span> Archive</> : <>人山人海 <span style={{ color: T.accent }}>·</span> 檔案</>}
          </h1>
        </div>
        <nav className={locale === "en" ? "nav-en" : undefined} aria-label={t("站內導航")} lang={locale} style={{ display: "flex", flexWrap: "wrap", gap: 4, marginLeft: "auto" }}>
          {/* About 只在英文導航：向英文讀者交代唐代背景與剑三來源，中文讀者不需要 */}
          {[["chars", "人物檔案"], ["timeline", "事件年表"], ["map", "山河輿圖"], ["network", "行星關係圖"], ["community", "群像網絡"], ["echoes", "余波"], ["novel", "文庫"], ...(en ? [["about", "關於"]] : [])].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ fontFamily: "JingHuaLaoSong", fontSize: 15, padding: "8px 18px", background: "none", border: "none", borderBottom: tab === k || (k === "chars" && tab === "posts") ? `2px solid ${T.accent}` : "2px solid transparent", color: tab === k || (k === "chars" && tab === "posts") ? T.ink : T.muted, cursor: "pointer" }}>
              {t(label)}
            </button>
          ))}
          {/* 回卷首：重開入站定場（landing.jsx），印形以應「入卷」朱印 */}
          {onOpenLanding && (
            <button onClick={onOpenLanding} title={t("回到卷首")}
              style={{ fontFamily: "JingHuaLaoSong", fontSize: 13, padding: "5px 10px", marginLeft: 12, alignSelf: "center", background: "none", border: `1px solid ${T.seal}`, borderRadius: 3, color: T.seal, cursor: "pointer", letterSpacing: "0.2em", textIndent: "0.2em" }}>
              {t("卷首")}
            </button>
          )}
          {/* 語言、紙色：各一枚下拉，與「卷首」並作三鈕（色板與換膚機制見 theme.js） */}
          <HeaderMenu id="lang" label={t("語言")} hint="语言 / Language" locale={locale}
            value={locale} onChange={setLocale}
            options={[{ value: "zh", label: "中文", lang: "zh" }, { value: "en", label: "English", lang: "en" }]} />
          <HeaderMenu id="skin" label={t("紙色")} locale={locale}
            value={skin} onChange={setSkin}
            options={[["night", "玄墨"], ["paper", "素紙"]].map(([value, label]) => ({ value, label: t(label), swatch: SKINS[value].bg }))} />
        </nav>
      </header>

      {/* 英文版進度說明：數目由覆蓋層實算（i18n/content.js coverage），译一人、译一事，此處自動更新 */}
      {en && <p className="translation-scope" lang="en" style={{ color: T.muted }}>
        {t("英文版說明", COVERAGE)}
        {tab !== "about" && <>{" "}<button type="button" onClick={() => setTab("about")}
          style={{ font: "inherit", color: T.accent, background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textDecorationColor: `${T.accent}66`, textUnderlineOffset: 3 }}>{t("初來者请看")}</button></>}
      </p>}
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 24px 0" }}>
        {(tab === "chars" || tab === "posts") && (
          /* 人物檔案的兩個子視圖：檔案一覽／編制（任職圖） */
          <div role="group" aria-label={t("人物檔案")} style={{ display: "flex", gap: 6, marginBottom: 18 }}>
            {[["chars", "檔案一覽"], ["posts", "編制"]].map(([k, label]) => (
              <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)}
                style={{ fontFamily: "JingHuaLaoSong", fontSize: 13.5, padding: "4px 14px", background: tab === k ? T.panelHi : "none", border: `1px solid ${tab === k ? T.accent + "99" : T.line}`, borderRadius: 3, color: tab === k ? T.ink : T.muted, cursor: "pointer" }}>
                {t(label)}
              </button>
            ))}
          </div>
        )}
        {tab === "posts" && <Posts onOpenChar={setOpenChar} fac={route.fac} onFac={(f) => nav({ fac: f })} />}
        {tab === "chars" && (
          <>
            <div className="flex flex-wrap items-center" style={{ gap: 8, marginBottom: 20 }}>
              {factions.map((f) => (
                <Chip key={f} active={faction === f} onClick={() => setFaction(f)} label={f === "全部" ? t(f) : facName(locale, f)} fontFamily="JingHuaLaoSong" />
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ position: "relative", display: "inline-block" }}>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("檢索姓名、表字、概覽、品評")}
                  style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: "3px", color: T.ink, fontSize: 13, fontFamily: "HuiwenZhengKai", padding: "6px 12px 6px 34px", outline: "none", minWidth: en ? 360 : 220 }} />
                <SearchTag fontFamily="HuiwenZhengKai" />
              </span>
            </div>
            <div className="char-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", columnGap: 14 }}>
              {shown.map((c) => (
                <CharCard key={c.id} c={c} onOpen={setOpenChar} />
              ))}
            </div>
            {shown.length === 0 && (
              <div style={{ color: T.faint, fontFamily: serif, padding: 40, textAlign: "center" }}>{t("無合於此檢索之檔案。")}</div>
            )}
          </>
        )}
        {tab === "timeline" && <Timeline onOpenChar={setOpenChar} onOpenEcho={(shock) => nav({ tab: "echoes", char: null, shock, who: null })} />}
        {tab === "network" && <Planetary onOpenChar={setOpenChar} />}
        {tab === "map" && <GeoMap onOpenChar={setOpenChar} />}
        {tab === "community" && <Community onOpenChar={setOpenChar} />}
        {tab === "echoes" && (
          <Echoes shockId={route.shock} who={route.who} locale={locale}
            onRoute={(p) => nav({ shock: p.shock, who: p.who })}
            onOpenProfile={(id) => nav({ tab: "chars", char: id })} />
        )}
        {tab === "about" && <About onNav={(k) => { setTab(k); window.scrollTo(0, 0); }} />}
        {tab === "novel" && <NovelReader path={route.novelPath} onNav={(p, replace) => nav({ novelPath: p }, replace)} />}
      </main>

      <DetailPanel c={openChar} onClose={() => setOpenChar(null)} onOpenChar={setOpenChar}
        onOpenNovel={(p) => nav({ tab: "novel", novelPath: p })}
        onOpenEcho={(shock, who) => nav({ tab: "echoes", char: null, shock, who })}
        onOpenPosts={(f) => nav({ tab: "posts", fac: f || "苍云", char: null })} />
    </div>
  );
}
