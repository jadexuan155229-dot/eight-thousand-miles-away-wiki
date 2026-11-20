import { useState } from 'react'
import Wiki from './wiki.jsx'
import Landing from './landing.jsx'

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
  /* 換膚不重掛：Wiki 自行訂閱皮膚（useSkin），整棵重渲染而不重建，
     篩選、檢索、輿圖動線、年表展開、閱讀位置一概不動（見 theme.js 換膚一節）。
     定場（夜景燭照）不隨膚，恆為原樣 */
  return (
    <>
      <Wiki onOpenLanding={() => setLanding(true)} />
      {landing && <Landing onEnter={() => setLanding(false)} />}
    </>
  )
}

export default App
