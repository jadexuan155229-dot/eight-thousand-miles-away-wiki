import { useLocale, useT } from "./locale";
import { nameItems, nameItemsEn } from "./content";
import { Zh } from "./zh";

/* 名號一行（檔案小卡、詳情卡、文庫批注共用）：中文作「字 斯征 · 波斯语名 Parvāz」，
   英文作 "Courtesy name: Sizheng · Persian name: Parvāz"。見 content.js「名號」一節。
   中文一個名號都無，作「字号待补」；英文名號皆已併入英文名者（苗人、日本人物），不出 */
export function CourtesyLine({ c }) {
  const locale = useLocale();
  const t = useT();
  if (locale !== "en") {
    const items = nameItems(c);
    return items.length ? items.map(([k, v]) => `${k} ${v}`).join(" · ") : t("字号待补");
  }
  if (nameItems(c).length === 0) return t("字号待补");
  return nameItemsEn(c).map(([k, v, zh], i) => (
    <span key={k}>{i > 0 && " · "}{t(k)}: {zh ? <Zh>{v}</Zh> : v}</span>
  ));
}
