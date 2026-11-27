import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// 文庫正文提及計數（構建期算，供人物檔案「見於文庫」面板）。
// 正文已切為懶加載塊、不入主包（見 src/novel/texts.js）；但檔案卡要顯示
// 各章提及次數，若運行時去數就得把整部正文拉進來、廢了懶加載。故在此於
// 構建期直接讀原始 .txt，按本名精確計數（與舊 mentionGroups 同法：非重疊、
// 步進本名長度），產出微小映射 { 相對novel檔名: { 人物id: 次數 } } 作虛擬模組
// `virtual:novel-mentions`。人物名、章節結構在應用側，故此處只按檔名為鍵。
function novelMentions() {
  const V = 'virtual:novel-mentions'
  const RESOLVED = '\0' + V
  const NOVEL_DIR = fileURLToPath(new URL('./src/novel/', import.meta.url))
  const DATA = fileURLToPath(new URL('./src/wiki-data.js', import.meta.url))
  const listTxt = (dir, base = '') => {
    const out = []
    for (const name of readdirSync(dir)) {
      const p = dir + name
      if (statSync(p).isDirectory()) out.push(...listTxt(p + '/', base + name + '/'))
      else if (name.endsWith('.txt')) out.push(base + name)
    }
    return out
  }
  return {
    name: 'novel-mentions',
    resolveId(id) { if (id === V) return RESOLVED },
    async load(id) {
      if (id !== RESOLVED) return
      const { CHARACTERS } = await import('./src/wiki-data.js')
      this.addWatchFile(DATA)
      const mentions = {}
      for (const file of listTxt(NOVEL_DIR)) {
        const full = NOVEL_DIR + file
        this.addWatchFile(full)
        const text = readFileSync(full, 'utf8')
        const counts = {}
        for (const c of CHARACTERS) {
          if (!c.name) continue
          let n = 0, at = 0, p
          while ((p = text.indexOf(c.name, at)) !== -1) { n++; at = p + c.name.length }
          if (n > 0) counts[c.id] = n
        }
        mentions[file] = counts
      }
      return `export default ${JSON.stringify(mentions)};`
    },
  }
}

// 英文頁預載英文大表塊（src/i18n/en-bulk.js）：英文大表另成一塊、只在英文界面動態載入，
// 但直達英文頁時須等它載完才繪製；不預載則主包下完、執行到 import() 才去取，兩段串行。
// 構建時找出該塊之檔名，在 en/index.html 頭部補一小段腳本，按需補一條 modulepreload，與主包並行下載。中文頁不加。
// 按需：裸址首訪先顯定場（判斷同 src/landing-gate.js），定場不等大表，此時預載反與主包搶頻寬、拖慢首屏，
// 故不預載，由 App.jsx 在主包跑起後續載；帶哈希深鏈或同會話再訪才預載。
function preloadEnBulk() {
  let base = '/'
  return {
    name: 'preload-en-bulk',
    apply: 'build',
    configResolved(c) { base = c.base },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle || !/[\\/]en[\\/]index\.html$/.test(ctx.filename)) return
        const chunk = Object.values(ctx.bundle).find((c) => c.type === 'chunk' && c.facadeModuleId?.endsWith('/src/i18n/en-bulk-data.js'))
        if (!chunk) return
        const href = JSON.stringify(base + chunk.fileName)
        const js = `try{if(/#\\/./.test(location.hash)||sessionStorage.getItem('cy-landing-seen')){var l=document.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=${href};document.head.appendChild(l)}}catch(e){}`
        return [{ tag: 'script', children: js, injectTo: 'head-prepend' }]
      },
    },
  }
}

// https://vite.dev/config/
// base：部署到 GitHub Pages 项目站（<user>.github.io/eight-thousand-miles-away-wiki/）时，
// 站点在子路径下，资产须带此前缀，否则从根请求全部 404。
// 多頁入口：中文 index.html 在站根，英文 en/index.html 在 en/——同一應用，語言由路徑定
// （見 src/i18n/use-language.js）。英文另立一頁，是為了讓鏈接預覽讀到英文 meta 與 lang。
export default defineConfig({
  base: '/eight-thousand-miles-away-wiki/',
  plugins: [react(), novelMentions(), preloadEnBulk()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
      },
    },
  },
})
