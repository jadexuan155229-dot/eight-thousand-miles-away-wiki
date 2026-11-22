// English overlay for place names (LOC_COORDS keys, EVENTS.loc, the base map's region labels).
// Keys are the Chinese source text. Policy (苍云英译术语表): pinyin, county for 县,
// Hucker for administrative units; the author confirms each (docs/english-edition.md).
// Only the base map's circuit and region labels are filled so far; the 69 event places
// wait for the T0 pass.
export const placesEn = {
  // 底图：唐十道及域外泛称（GEO_BASE.labels，去掉字间空格作键）
  隴右: 'Longyou', 關內: 'Guannei', 河東: 'Hedong', 河北: 'Hebei', 河南: 'Henan',
  山南: 'Shannan', 劍南: 'Jiannan', 淮南: 'Huainan', 江南: 'Jiangnan', 嶺南: 'Lingnan',
  安西: 'Anxi', 北庭: 'Beiting', 吐蕃: 'Tibet', 大漠: 'The Gobi',
};
