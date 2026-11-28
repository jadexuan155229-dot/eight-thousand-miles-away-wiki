/* ============================================================
   紀年 (era.js) —— 年號、月名、事件排序
   自 wiki.jsx 析出：年表、輿圖之外，全站檢索（search.js）亦據此匹配年號，
   兩處同源，免一處改元另一處不知。純函數，無 React
   ============================================================ */
export const sortEvents = (a, b) =>
  a.year - b.year || (a.month ?? 0) - (b.month ?? 0) || (a.seq ?? "").localeCompare(b.seq ?? "");

export const CN = ["", "元", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十"];
export const CN_MONTH = ["", "正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
/* 年號紀年：體例遵庫中原文（「至德二年」「天宝四年」「开元二十六年」），用「年」不用「载」 */
export function eraOf(y) {
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
export const ERA_NOTES = { 756: "七月改元至德", 758: "二月改元乾元", 760: "闰四月改元上元", 762: "四月改元宝应", 763: "七月改元广德" };
export const ERA_NOTES_EN = { 756: "Zhide from the 7th month", 758: "Qianyuan from the 2nd month", 760: "Shangyuan from the intercalary 4th month", 762: "Baoying from the 4th month", 763: "Guangde from the 7th month" };

/* English display derives its era and ordinal from the same chronology as Chinese. */
export function englishEraOf(y) {
  return eraZhToEn(eraOf(y));
}
/* 「天宝十五年」→ "Tianbao 15"：年號表與 eraOf 同源；年中改元之分軌（ERA_SWITCH）亦經此轉 */
export function eraZhToEn(era) {
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

/* 年中改元者，月份標籤分軌（byMonth 僅施於單年段；756 七月改元至德） */
export const ERA_SWITCH = { 756: { at: 7, before: "天宝十五年", after: "至德元年" } };
export const eraOfYM = (y, m) => {
  const s = ERA_SWITCH[y];
  if (s && m != null) return m < s.at ? s.before : s.after;
  return eraOf(y);
};
