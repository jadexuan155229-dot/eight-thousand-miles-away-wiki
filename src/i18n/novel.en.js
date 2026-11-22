// English overlay for the library's structure (src/novel/index.js): storyline tags and titles,
// volume titles, and the named chapters (定场, 序). Numbered chapters (第一章 …) are rendered
// as "Chapter 1 …" without an entry. The prose itself is not translated (tier T3).
// Keys are the Chinese source text.
// 2026-11-22 T0 working draft, literal-leaning; 负我蛾眉、思停 revised after the author's notes (docs/t0-review.md).
export const novelEn = {
  // 各章通例
  定场: 'Opening',
  序: 'Prologue',

  // 故事线：标签 · 题名
  生逢: 'Born to It',
  大寺烈焰冲天: 'The Great Temple Burns to the Sky',
  门墙: 'Within the Walls', // 卷：师门之墙
  青岭: 'Green Ridge',
  她的遗迹: 'What She Left Behind',
  登楼: 'Climbing the Tower',
  未到关前: 'Before the Pass',
  种桃: 'Planting Peaches',
  负我蛾眉: 'Failing My Lady', // 蛾眉指女子；略如李庭泽对岑菡说的话（作者 2026-11-22）
  郎心: 'His Heart',
  他年对坐炉边: 'Someday, Facing Each Other by the Fire',
  思停: 'A Halting Thought', // 逆用《一代宗师》「宁在一思进，莫在一思停」；halting 兼停步与迟疑（作者 2026-11-22 释）
  那里没有麋鹿: 'There Are No Deer There',
  于林之下: 'Beneath the Trees', // 卷：《诗·邶风·击鼓》「于以求之？于林之下」
};
