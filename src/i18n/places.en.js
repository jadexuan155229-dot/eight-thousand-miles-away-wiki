// English overlay for place names (LOC_COORDS keys, EVENTS.loc, the base map's region labels).
// Keys are the Chinese source text. Policy (人山人海英译术语表): pinyin, county for 县,
// Hucker for administrative units. These are map labels, so the short form is used
// (Yunzhou, not Yunzhou (Yunzhong Commandery)); the full forms belong in profile prose.
// Entries come from the Notion 地名 table where it has a confirmed (已定) rendering;
// the rest are marked as drafts. The remaining places wait for the T0 pass.
export const placesEn = {
  // 底图：唐十道及域外泛称（GEO_BASE.labels，去掉字间空格作键）
  隴右: 'Longyou', 關內: 'Guannei', 河東: 'Hedong', 河北: 'Hebei', 河南: 'Henan',
  山南: 'Shannan', 劍南: 'Jiannan', 淮南: 'Huainan', 江南: 'Jiangnan', 嶺南: 'Lingnan',
  安西: 'Anxi', 北庭: 'Beiting', 吐蕃: 'Tibet', 大漠: 'The Gobi',

  // Notion 地名表 已定
  雁门关: 'Yanmen Pass',
  雁塔: 'Yanta Tower',
  霸刀山庄: 'Badao Manor',
  '云州-云中': 'Yunzhou',
  太原府: 'Taiyuan',
  中受降城: 'Middle Shouxiang Fortress',
  五原郡: 'Wuyuan',
  朔州: 'Shuozhou',
  代州: 'Daizhou',
  长安: "Chang'an",
  洛阳: 'Luoyang',
  潼关: 'Tong Pass',
  蒲州: 'Puzhou',
  凤翔: 'Fengxiang',
  邠州: 'Binzhou',
  宁州: 'Ningzhou',
  '河北-常山': 'Changshan',
  营州: 'Yingzhou',
  甘州: 'Ganzhou',
  '河西/凉州': 'Hexi / Liangzhou',
  西域: 'Western Regions',
  南诏: 'Nanzhao',
  '日本-奈良': 'Nara',
  万花谷: 'Wanhua Valley',

  // 工作稿（卷首地图所需，地名表未收；拼音）
  '河北-范阳': 'Fanyang', // 地名表作 Youzhou (Fanyang Commandery)，图上取郡名，同中文标签
  邺城: 'Yecheng',
  睢阳: 'Suiyang',
  灵武: 'Lingwu',
};
