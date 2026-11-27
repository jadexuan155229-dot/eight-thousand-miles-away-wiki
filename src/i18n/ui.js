/* ============================================================
   界面字串（ui.js）——只收界面，不收內容
   鍵即中文原文：中文界面原樣顯示鍵，英文界面查此表，查無則回落中文，故無损。
   變量以 {名} 佔位，中英同用：t("展開其餘 {n} 條", { n: 3 })。
   英文值可為函數 (vars) => 字串，處理單複數。
   改中文鍵時須同改此表之鍵——check-data 會報「站內用而表中無」與「表中有而站內不用」。
   例外：「說明文字」一節是圖幅下的長段說明，中文原段仍寫在 JSX 裡（中文界面一字不動），
   此處用短鍵（行星說明、群像說明……）只存英文。說明文字的英文作者已審（2026-11-22）。
   余波頁另有一套（i18n/echoes.en.js 的 echoUiEn），不在此表。
   ============================================================ */
const pl = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

const en = {
  凡例: 'About', /* 中文末一籤；英文界面此籤作 關於 → About，不經此鍵，留此以備 */
  跳至正文: 'Skip to content',
  /* ---------- 導航與通用 ---------- */
  人物檔案: 'Characters', 事件年表: 'Timeline', 山河輿圖: 'Map',
  行星關係圖: 'Orbital Relations', 群像網絡: 'Character Network', 餘波: 'Aftershocks', 文庫: 'Library',
  卷首: 'Opening', 回到卷首: 'Return to opening',
  語言: 'Language', 紙色: 'Theme', 玄墨: 'Ink', 素紙: 'Paper',
  關閉檔案: 'Close profile', 站內導航: 'Main navigation', 關閉: 'Close',
  關於: 'About',
  初來者請看: 'New here? Read about the work and its world →',
  年份: 'Year', // 群像、輿圖年份滑杆之讀屏名
  英文版說明短: 'English edition in progress.', 詳情: 'Details', // 手機上收起的一句與展開鈕
  檔案一覽: 'Profiles', 編制: 'Posts',
  門派: 'Faction', 全部: 'All', 待核: 'Draft',
  中文原文: 'Chinese original',
  未譯註: 'Not yet translated: shown in the original Chinese.',
  /* 數目由覆蓋層實算。舊稿末句說「其餘皆中文」，今余波、編制、任期皆已译完，唯文庫正文（T3）仍是中文，故改說實情 */
  英文版說明: ({ profiles, written, eventTitles, events }) => {
    const all = (n, of, what) => (n === of ? `all ${of} ${what}` : `${n} of ${of} ${what}`);
    return `English edition in progress. The interface, ${all(profiles, written, 'character profiles written so far')}, ${all(eventTitles, events, 'chronology entries')}, the Posts charts and the Aftershocks are in English, mostly as working translations. The library’s prose is still in the original Chinese.`;
  },
  '檢索姓名、表字、概覽、品評': 'Search names, courtesy names, epithets, birthplaces', // 英文檢索實查姓名、名號、稱號、出身；品評是一字印，英文查不著，不提
  '無合於此檢索之檔案。': 'No profiles match this search.',

  /* ---------- 人物檔案 ---------- */
  生卒: 'Lifespan', 出身: 'Birthplace', 事件: 'Events', 字: 'Courtesy name',
  /* 名號標籤（wiki-data.js 之 names，見 i18n/content.js）；中文读法只見於英文覆蓋層之 alt */
  本名: 'Original name', 波斯语名: 'Persian name', 日文读法: 'Japanese reading', 汉名: 'Chinese name', 中文读法: 'Chinese reading',
  字號待補: 'Courtesy name not yet recorded', 門派待補: 'Faction not yet recorded',
  品評: 'One-character appraisal',
  名字訓詁: 'Name and allusions', 檔案: 'Profile',
  官职身份: 'Position & background', 体貌特征: 'Appearance & health', 性格: 'Personality',
  偶像: 'Influences', 武学: 'Martial arts', 随身物件: 'Personal possessions', 喜好: 'Interests', 专擅: 'Expertise',
  任職履歷: 'Posts held', 在編制圖中看: 'See on the posts chart', '勳、散': 'Merit grade and prestige rank',
  '（約）': ' (approx.)',
  個人軼事: 'Anecdotes', 高光: 'Highlight', 收起: 'Hide',
  '展開其餘 {n} 條': ({ n }) => `Show ${n} more`,
  '關係（自關係庫）': 'Relationships (from the relationship database)',
  歿後: 'posthumous',
  '同事人物（共見事件計數）': 'Co-occurring characters (shared event counts)',
  所繫之事: 'Events that bear on them',
  '起草待核：作者尚未逐行核定': 'Drafted, not yet reviewed line by line by the author.',
  '繫年事件（依 年·月·序號）': 'Dated events (by year · month · sequence)',
  '事件庫中暫無此人繫年條目。': 'No dated events for this character yet.',
  '見於文庫（本名計數）': 'Library appearances (name counts)',
  /* 任期類別（posts-data.js TENURES[].kind）：Hucker 體例，作者 2026-11-22 定 */
  正授: 'substantive', 署理: 'acting', 代领: 'deputizing', 兼领: 'concurrent', 停职: 'suspended',
  暂任: 'interim', 差遣: 'commission', 无名目: 'no formal title', 充任: 'serving as',

  /* ---------- 年表 ---------- */
  分段目錄: 'Sections',
  '{n}事': ({ n }) => pl(n, 'event'),
  無事: 'no events',
  全部展開: 'Expand all', 全部收起: 'Collapse all', 全展: 'Expand', 全收: 'Collapse',
  收起諸月: 'Collapse months', 展開諸月: 'Expand months',
  月份未標: 'Month not recorded',
  '族屬/地屬 {n}': 'Peoples & regions {n}', '族屬/地屬 · 標籤': 'Peoples & regions · tags', '【族屬/地屬】': 'Peoples & regions',
  門派未標: 'Faction not marked', '門派未標 {n}': 'Faction not marked {n}', '門派未標：{n}': 'Faction not marked: {n}',
  '未標事件 · 人物': 'Unmarked events · people', '{f} · 人物': '{f} · people',
  此標籤下無入事人物檔案: 'No profiled character appears in events under this tag.',
  '檢索事名、人物、地點、門派、紀年': 'Search events, people, places, factions, eras',
  '無合於此檢索之事。': 'No events match this search.',
  增補: 'Supplement',
  '採自人設文檔，尚未錄入 Notion 事件庫': 'Taken from the character documents; not yet in the Notion event database',
  '餘波：{title}——此事籠罩之人與其記憶方式': 'Aftershocks: {title}. Who it hangs over, and how each remembers it',

  /* ---------- 圖幅通用 ---------- */
  門派色例: 'Faction colours', '{n} 色': ({ n }) => `(${n})`,
  放大: 'Zoom in', 縮小: 'Zoom out', 復位: 'Reset zoom',
  /* 關係色譜之類名（wiki.jsx REL_KEY）：作者 2026-11-22 定 */
  傳承: 'Teaching', 遺承: 'Legacy', 情愛: 'Love', 恩義: 'Grace & duty', 誼: 'Friendship',
  親緣: 'Kinship', 嫌隙: 'Rift', 殺伐: 'Bloodshed',
  僅同事: 'Shared events only', 未見: 'Never met', '未見／未說開': 'Never met / left unsaid',
  '只亮此類：{label}': 'Highlight only: {label}',

  /* ---------- 行星關係圖 ---------- */
  蒼雲線: 'Cangyun line', 天策線: 'Tiance line', 無門派: 'No faction',
  '虛線諸環：與本系之核共見事數': 'Dotted rings: events shared with that system’s centre',
  淡弧: 'Faint arcs', '次星三人之間的關係（常駐）': 'ties among the secondary stars', // 英文再長即壓朗迪恩、鲁雅；「常駐」由淡弧入圖例自明
  內軌: 'Inner orbit', 中軌: 'Middle orbit', 外軌: 'Outer orbit', 遠軌: 'Far orbit',
  '共見 ≥6 事': '6 or more shared events', '共見 3–5 事': '3–5 shared events', '共見 1–2 事': '1–2 shared events',
  '與兩核俱無共見（作淡圓點）': 'none shared (faint dots)',
  '線色：兩人之關係': 'Line colour: the relationship',
  輕觸一類即亮: 'Tap a type to highlight it', '懸停即亮，點選常亮': 'Hover to preview, click to pin',
  '線粗＝與核共見事數': 'Line weight = events shared with the centre', '線粗＝共見事數': 'Line weight = shared events',
  '共 {n} 事': ({ n }) => pl(n, 'shared event'),
  '閔 {a} · 程 {b}': 'Min {a} · Cheng {b}',
  '已只亮「{label}」：{pairs} 對關係，涉 {people} 人（雙核不計）。再按一次或 Esc 收起。':
    ({ label, pairs, people }) => `Showing only “${label}”: ${pl(pairs, 'pair')}, ${pl(people, 'person', 'people')} (not counting the two centres). Press again or Esc to clear.`,

  /* ---------- 群像網絡 ---------- */
  '壹 · 前史': 'I · Before', '貳 · 亂前': 'II · Eve of the rebellion', '叁 · 亂中': 'III · The rebellion', '肆 · 主線': 'IV · Main story',
  '虛線＝未遂／未說開／未見 · 硃砂點線＝歿後延續 · 虛環＝其人已歿': 'Dashed = unfulfilled / left unsaid / never met · Cinnabar dots = continues after death · Dashed ring = has died',
  其他: 'Other', '（歿後）': ' (posthumous)',

  /* ---------- 山河輿圖 ---------- */
  不限: 'Anyone', '屬下之人 ·': 'People ·',
  '檢索事名、人物、地點、門派、年號': 'Search events, people, places, factions, eras',
  '計入 {n} 事 · {m} 地': ({ n, m }) => `${pl(n, 'event')} · ${pl(m, 'place')}`,
  地名全顯: 'Show all place names',
  '無地點 {n} 事': ({ n }) => `${pl(n, 'event')} without a place`,
  '時間 ·': 'Time ·', 全程: 'All years', 累積至: 'Up to', 僅當年: 'That year only',
  '動線（點選即顯，至多三人）·': 'Routes (click to show, up to three) ·',
  清空: 'Clear', 絕域之西: 'Far west', 絕域之東: 'Far east',
  起: 'start', '（起）': ' (start)',
  實名城邑: 'Historical city', '門派駐地／自設地': 'Sect seat / invented place', '區域泛稱（事件計入面心）': 'Region (events counted at its centre)',
  '〔輿圖補點〕': '[Map correction] ',
  '其間有無地點之事，故弧作虛線。': 'Events without a place fall in between, so the arc is dashed.',
  '繫此段者為到達之首見，未必為位移之因；全文點駐地開側欄。': 'This is the first event at the destination, not necessarily the reason for the move. Click the stop to read everything in the side panel.',
  無地點之事: 'Events without a place',
  '{n} 事': ({ n }) => pl(n, 'event'),
  '按：': 'Note: ',
  '當前篩選下此地無事。': 'No events here under the current filters.',

  /* ---------- 編制 ---------- */
  '上　': 'In: ', '下　': 'Out: ', '依據：': 'Sources: ',

  /* ---------- 文庫 ---------- */
  文庫目錄: 'Contents', '檢索書目、篇章': 'Search titles and chapters',
  自目錄擇章而入: 'Choose a chapter from the contents.',
  '凡 {n} 線 · 閱讀位置自動保存': ({ n }) => `${pl(n, 'storyline')} · your place is saved automatically`,
  卷: 'part', '{n} 字': ({ n }) => `${n.toLocaleString('en')} characters`,
  ' · 命中 {n} 處': ({ n }) => ` · ${pl(n, 'match', 'matches')}`,
  未檢得相關文字: 'No matching text.',
  '正文待錄。': 'Text not yet entered.', '正文載入中……': 'Loading text…',
  閱讀設置: 'Reading settings', 字號: 'Size', 行距: 'Spacing', 底色: 'Page', /* 素紙見上（紙色選單） */
  緊: 'Tight', 常: 'Normal', 疏: 'Loose', 恢復默認: 'Reset',
  '{name} 檔案批註': '{name}: profile note',

  /* ---------- 定場 ---------- */
  '入站定場：八千里路': 'Opening scene: Eight Thousand Miles Away',
  '入卷：進入檔案站': 'Enter the archive',
  '移燭照覽山河 · 鈐印入卷': 'Move the candle to light the land · press the seal to enter',
  '拂過屏幕，燭照山河 · 鈐印入卷': 'Swipe to light the land · tap the seal to enter',

  /* ---------- 說明文字（作者已審 2026-11-22；中文原段在 JSX 內） ---------- */
  行星說明: 'A binary system: Min Fangcheng (the Cangyun line) and Cheng Kai (the Tiance line) share the centre as equals. The orbits are generated from the number of events each person shares with each centre in the chronology, and so are circle sizes and line weights (all by square root); the length of a ring’s arc shows how many people sit on it. Hover over anyone to see the exact count. A line to a centre is coloured by that person’s relationship with the centre (where there are several, the main one; hover to see them all); a grey line means shared events with no recorded relationship. Lanchuan Yun, Lu Wanyue and Lu Yuming alone are secondary stars: their circles are sized between the two centres and everyone else, while their orbits still follow shared events, and the relationships among the three are always drawn faintly. Anyone who shares at least two events with each centre is a bridge star, tied to both and given a middle size: a balanced one sits between the two centres, and one leaning toward a centre sits on its side (Chen Ruihe shares two events with each and, by the author’s choice, sits on Cheng Kai’s side). The far orbit is coloured by faction, and named where more than three people of a faction sit together.',
  '左下圖例可指：': 'The legend at lower left is interactive:',
  '懸停一類預覽，點選或以鍵盤 Enter 常亮（再點或 Esc 收起），全圖只亮此類關係': 'hover over a type to preview it, click it or press Enter to pin it (click again or press Esc to clear), and the chart shows only that kind of relationship',
  '輕觸一類，全圖只亮此類關係（再觸收起）': 'tap a type and the chart shows only that kind of relationship (tap again to clear)',
  '——核線中凡有此類者改染此色（不必是主關係），他人之間的同類關係補畫弦線，餘星淡去。': '. Lines to the centres that include it take its colour (even when it is not the main relationship), the same kind of relationship between other people is drawn as arcs, and everyone else fades.',
  '輕觸一人牽出其關係弦線，再觸方開檔案；放大後可雙指捏合、單指平移。': 'Tap a person to draw their relationships, and tap again to open the profile. Once zoomed in, pinch to zoom and drag with one finger to pan.',
  '點選任一人開啟檔案。': 'Click anyone to open their profile.',
  群像說明: 'The edges follow the relationship database, supplemented from the author’s character documents, and the people are clustered by faction. Drag the slider to watch relationships begin and end: each edge shows only between its start and end years, and a cinnabar dotted line continues past a death. The two centres (Min Fangcheng and Cheng Kai) are ordinary nodes here: their centrality is not assumed, and has to show itself in the network.',
  輿圖圖例一: 'Ring size grows with the square root of the event count; where several factions meet, the ring is split by colour.',
  輿圖圖例二: 'The base map is a hand-drawn sketch: directions hold, scale does not.',
  輿圖圖例三: 'Routes are inferred from the events, with the author’s own corrections added,',
  輿圖圖例四: 'and show only where someone was and in what order, not the road they took.',
  輿圖圖例五: 'A dashed stretch has events without a place in between; stops are marked “order·year”.',
  文庫英文說明: 'The library holds the novel in its original Chinese. It is not yet available in English.',
  文庫正文說明: 'Original Chinese text. Names in the text open a short profile note.',
};

/* 界面一律繁體、數據保持簡體（作者 2026-11-27 定）。數據裡的詞兼作界面標目者——檔案八目、名號標籤——
   數據原樣不動（諸處以之為鍵），只在中文界面顯示時轉作繁體；英文照查上表 */
const ZH_SHOW = {
  官职身份: '官職身份', 体貌特征: '體貌特徵', 武学: '武學', 随身物件: '隨身物件', 专擅: '專擅',
  汉名: '漢名', 波斯语名: '波斯語名', 日文读法: '日文讀法', 中文读法: '中文讀法',
};
export function translateUI(locale, key, vars) {
  const v = locale === 'en' ? en[key] ?? key : ZH_SHOW[key] ?? key;
  if (typeof v === 'function') return v(vars || {});
  return vars ? v.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : v;
}
/* 供 check-data：表中諸鍵 */
export const UI_KEYS = Object.keys(en);
export const eventCountText = (locale, count) => locale === 'en'
  ? pl(count, 'dated event') : `繫年 ${count} 事`;
export const libraryCountText = (locale, count, kind) => locale === 'en'
  ? (kind === 'chapters' ? pl(count, 'chapter') : pl(count, 'mention'))
  : `${count} ${kind === 'chapters' ? '章' : '處'}`;
