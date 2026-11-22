import { createContext, useContext } from 'react';
import { translateUI } from './ui';

/* ============================================================
   語言上下文（locale.js）
   App 持有語言狀態（use-language.js），經此下發；各組件 useLocale() 取語言、useT() 取界面字串。
   舊時 locale 逐層傳參，年表、輿圖、行星、群像諸圖未接，故一律中文——今統一走上下文。
   ============================================================ */

export const LocaleContext = createContext({ locale: 'zh', setLocale: () => {} });
export const useLocale = () => useContext(LocaleContext).locale;
export const useSetLocale = () => useContext(LocaleContext).setLocale;
export const isEn = (locale) => locale === 'en';

/* t(鍵, 變量)：鍵為中文原文，見 ui.js */
export function useT() {
  const locale = useLocale();
  return (key, vars) => translateUI(locale, key, vars);
}
