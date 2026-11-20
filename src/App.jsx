import { useState } from 'react'
import Wiki from './wiki.jsx'
import Landing from './landing.jsx'
import { useSkin } from './theme'

/* 定場僅攔「裸址直達」：帶哈希深鏈（自分享而來）與同會話再訪皆直入站內 */
function wantLanding() {
  if (/#\/./.test(window.location.hash)) return false
  try {
    if (sessionStorage.getItem('cy-landing-seen')) return false
  } catch { /* 讀不到就當首訪 */ }
  return true
}

function App() {
  const [landing, setLanding] = useState(wantLanding)
  /* 換膚：T 已就地改值，此處以 key 整棵重掛站內，清掉各視圖 useMemo 裡的舊色。
     路由、所開檔案、閱讀位置皆在網址與 localStorage，重掛不丟；
     僅篩選、檢索框這類臨時狀態歸零。定場（夜景燭照）不隨膚，恆為原樣 */
  const [skin] = useSkin()
  return (
    <>
      <Wiki key={skin} onOpenLanding={() => setLanding(true)} />
      {landing && <Landing onEnter={() => setLanding(false)} />}
    </>
  )
}

export default App
