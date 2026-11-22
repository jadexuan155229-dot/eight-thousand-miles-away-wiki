import { useEffect, useLayoutEffect, useState } from 'react';
import { setLatinFaces } from './latin-faces';

/* ============================================================
   語言由網址定（use-language.js）
   中文在站根 <base>/，英文在 <base>en/（en/index.html，見 vite.config.js 多頁入口）。
   網址即事實源：英文鏈接 <base>en/#/chars/minfangcheng 發給誰、在哪刷新都是英文；
   社交平台預覽不跑腳本，故英文 meta、lang 也寫死在 en/index.html 裡。
   站內切換語言不重載：replaceState 換路徑（哈希原樣保留），同步 <html lang> 與標題。
   replaceState 只改當前一條歷史記錄，此前諸條仍是舊語言的路徑；前進後退於同一文檔內換條、
   不重載，故每逢 popstate 重讀路徑定語言——不然退回 /#/chars 而界面仍是英文，刷新或轉發
   即與眼前所見不同。切換語言本身不另記一條（不算一次導航），後退即回上一頁、按上一頁網址之語言。
   回歸測試：npm run check:history。
   舊版存在 localStorage 的 cy-language 不再讀——否則同一條鏈接在不同人手裡語言不同。
   ============================================================ */

const BASE = import.meta.env.BASE_URL; /* '/eight-thousand-miles-away-wiki/' */
export const EN_PATH = `${BASE}en/`;
const TITLE = {
  zh: '八千里路 · Eight Thousand Miles Away | 人山人海 · 档案',
  en: 'Eight Thousand Miles Away | Characters: Archive',
};

export function readLanguage() {
  try {
    return window.location.pathname.startsWith(EN_PATH) ? 'en' : 'zh';
  } catch { return 'zh'; }
}

/* 某語言下此頁的網址：路徑換根，查詢串與哈希不動 */
export function languageHref(locale) {
  const { search, hash } = window.location;
  return `${locale === 'en' ? EN_PATH : BASE}${search}${hash}`;
}

export function useLanguage() {
  const [locale, setLocale] = useState(readLanguage);
  /* 拉丁字表須在繪製前就位，免英文頁先閃一下中文字體的拉丁字 */
  useLayoutEffect(() => { setLatinFaces(locale === 'en'); }, [locale]);
  /* 前進後退：網址為準 */
  useEffect(() => {
    const onPop = () => setLocale(readLanguage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    const lang = locale === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang;
    document.title = TITLE[lang];
    if (readLanguage() !== locale) {
      try { window.history.replaceState(window.history.state, '', languageHref(locale)); }
      catch { /* 沙箱或 file:// 下改不了地址：只在內存裡換語言 */ }
    }
  }, [locale]);
  return [locale, setLocale];
}
