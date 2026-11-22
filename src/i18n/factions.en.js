// English overlay for faction and affiliation tags (CHARACTERS.belong, EVENTS.fac).
// Keys are the Chinese source text, so the Chinese fallback is lossless.
//
// The JX3 sects follow the Notion glossary 「人山人海英译术语表 / 剑三门派总表」:
// proper names in pinyin (P5), the institution word translated by what the body actually is
// (army, monastery, manor, clan, school…), one exception (丐帮 → the Beggars' Guild).
// In running prose group names take "the" (the Tiance Command, the Tang Clan); place-style
// names do not (Wanhua Valley, Chunyang Palace). These are labels, so the article is dropped.
// Pinyin alone, where it is needed, is the full syllable string: 凌雪阁 → Lingxuege.
// Non-sect tags: ethnonyms and polities from the 术语主表 (T046–T056), the rest are drafts
// marked below.
export const factionsEn = {
  // 剑三门派总表（Notion）
  苍云: 'Cangyun Army',
  天策: 'Tiance Command',
  万花: 'Wanhua Valley',
  七秀: 'Qixiu House',
  少林: 'Shaolin Monastery',
  纯阳: 'Chunyang Palace',
  藏剑: 'Cangjian Manor',
  五毒: 'Wudu Order',
  唐门: 'Tang Clan',
  明教: 'Mingjiao',
  丐帮: "Beggars' Guild",
  长歌: 'Changge School',
  霸刀: 'Badao Manor',
  蓬莱: 'Penglai',
  凌雪阁: 'Lingxue Pavilion',
  衍天宗: 'Yantian School',
  药宗: 'Beitian School of Medicine',
  万灵: 'Wanling Manor',
  段氏: 'Duan Clan',
  // 术语主表（Notion）：族称、阵营
  '奚人/狼牙': 'Xi / Langya Army',
  羌: 'Qiang',
  鲜卑: 'Xianbei',
  柔然: 'Rouran',
  南诏: 'Nanzhao',
  西域: 'Western Regions',
  // 工作稿：门派总表与术语主表未收
  唐军: 'Tang army',
  红衣教: 'Hongyi Order', // 按「教 → Order」（同 the Wudu Order）
  靺鞨: 'Mohe',
  苗疆: 'Miaojiang',
  波斯: 'Persia',
  平民: 'Commoners',
  史实: 'Historical record',
};
