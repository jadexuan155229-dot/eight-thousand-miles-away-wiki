import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { wantLanding } from './landing-gate'
import { readLanguage } from './i18n/use-language'
import { loadEnBulk } from './i18n/en-bulk'

/* 三枚中文字体按字频切片的 @font-face 表（百余 KB，见 scripts/subset-fonts.py）：动态载入，
   另成一个 CSS 块，不并入挡首屏的 index.css；页上文字照旧 font-display: swap，表到即按片下载 */
import('./assets/fonts/cjk-faces.css').then(() => {
  /* 英文界面另有拉丁字面（i18n/latin-faces.js），须定义在此表之后方能优先；
     表若晚到（开发服务器下即如此），把拉丁字面挪回最后 */
  const el = document.getElementById('latin-faces')
  if (el) document.head.appendChild(el)
})

/* 開發期錯誤浮層：手機上無從開控制台，未捕獲之錯只見白屏。
   此層把錯誤與堆棧直接印在頁面上，便於真機點檢。僅 DEV，不入打包。 */
if (import.meta.env.DEV) {
  const show = (title, detail) => {
    let box = document.getElementById('__errbox')
    if (!box) {
      box = document.createElement('div')
      box.id = '__errbox'
      box.style.cssText =
        'position:fixed;left:0;right:0;bottom:0;max-height:55vh;overflow:auto;z-index:99999;' +
        'background:#2A1416;color:#F2D7D5;border-top:2px solid #B5442D;padding:10px 12px;' +
        'font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word'
      const btn = document.createElement('button')
      btn.textContent = '清除'
      btn.style.cssText =
        'position:sticky;top:0;float:right;background:#B5442D;color:#fff;border:0;' +
        'padding:3px 10px;border-radius:3px;font:12px sans-serif'
      btn.onclick = () => box.remove()
      box.appendChild(btn)
      document.body.appendChild(box)
    }
    const p = document.createElement('div')
    p.style.cssText = 'margin-top:6px;padding-top:6px;border-top:1px solid #5A2A2E'
    p.textContent = `${title}\n${detail}`
    box.appendChild(p)
  }
  window.addEventListener('error', (e) =>
    show(`✖ ${e.message}`, e.error?.stack || `${e.filename}:${e.lineno}:${e.colno}`)
  )
  window.addEventListener('unhandledrejection', (e) =>
    show('✖ 未處理的 Promise 拒絕', e.reason?.stack || String(e.reason))
  )
}

const start = () => createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
/* 英文頁：先等英文大表載完再繪製（en-bulk.js），免先閃一屏回落的中文；載不下來也照常繪製（逐處回落中文）。
   唯裸址首訪先顯定場：定場不用大表，不必等——先繪製，大表由 App.jsx 續載，站內待表到才掛上 */
if (readLanguage() === 'en' && !wantLanding()) loadEnBulk().then(start, start)
else start()
