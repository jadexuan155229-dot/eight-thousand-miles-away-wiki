import { useEffect, useState } from 'react'
import Wiki from './wiki.jsx'
import Landing from './landing.jsx'
import { LocaleContext } from './i18n/locale'
import { useLanguage } from './i18n/use-language'
import { enBulkReady, loadEnBulk } from './i18n/en-bulk'
import { wantLanding } from './landing-gate'


function App() {
  const [landing, setLanding] = useState(wantLanding)
  /* 語言狀態居此，經 LocaleContext 下發站內與定場（語言由網址定，見 i18n/use-language.js） */
  const [locale, setLocale] = useLanguage()
  /* 英文大表（i18n/en-bulk.js）：英文頁裸址首訪先顯定場，定場不用大表，故不等它即繪製（main.jsx），
     站內（Wiki）則待大表到了才掛上——站內諸 useMemo 只認 locale，先以回落的中文掛上、表到後不會重算。
     讀者在表到之前點「入卷」，定場暫不放行，表到即入（landing.jsx canEnter）；載不下來也放行（逐處回落中文）。
     其餘情形（中文、英文深鏈、同會話再訪）main.jsx 已先等表，此處 bulkReady 一開始即為真 */
  const [bulkReady, setBulkReady] = useState(enBulkReady)
  useEffect(() => {
    if (locale !== 'en' || bulkReady) return
    const done = () => setBulkReady(true)
    loadEnBulk().then(done, done)
  }, [locale, bulkReady])
  const wikiReady = locale !== 'en' || bulkReady
  /* 換膚不重掛：Wiki 自行訂閱皮膚（useSkin），整棵重渲染而不重建，
     篩選、檢索、輿圖動線、年表展開、閱讀位置一概不動（見 theme.js 換膚一節）。
     定場（夜景燭照）不隨膚，恆為原樣 */
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {wikiReady && <Wiki onOpenLanding={() => setLanding(true)} landingOpen={landing} />}
      {landing && <Landing canEnter={wikiReady} onEnter={() => setLanding(false)} />}
    </LocaleContext.Provider>
  )
}

export default App
