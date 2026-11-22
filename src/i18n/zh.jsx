import { createElement } from "react";
import { useLocale } from "./locale";

/* 回落中文之包装：英文界面下，尚未译出的文字原樣顯示中文，
   標 lang="zh"（讀屏、斷行、字族皆按中文處理）與 class="zh-src"（英文字族覆寫不及之，見 index.css）。
   中文界面下原樣返回，不多包一層 */
export function Zh({ as = "span", className, children, ...rest }) {
  const locale = useLocale();
  if (locale !== "en") return children;
  return createElement(as, { lang: "zh", className: className ? `zh-src ${className}` : "zh-src", ...rest }, children);
}

/* [文字, 是否回落] → 回落則包 Zh；content.js 諸查表函數之返回值直接可用 */
export function Tx({ v, as, className, ...rest }) {
  const [text, zh] = v;
  if (!zh) return text;
  return <Zh as={as} className={className} {...rest}>{text}</Zh>;
}
