// English overlay for place names (LOC_COORDS keys, EVENTS.loc, the base map's region labels).
// Keys are the Chinese source text. Policy (人山人海英译术语表): pinyin, county for 县,
// Hucker for administrative units. These are map labels, so the short form is used
// (Yunzhou, not Yunzhou (Yunzhong Commandery)); the full forms belong in profile prose.
// Entries come from the Notion 地名 table where it has a confirmed (已定) rendering;
// the four the opening map needed are pinyin, as settled by the author. The rest (T0 pass,
// 2026-11-22 working draft, docs/t0-review.md) follow the table's conventions: pinyin for
// Chinese places, Pass / Fortress / County / Monastery / Mount for 关 城 县 寺 山, sect seats
// under the sect's English name; places outside the Tang take their established English
// names (Kucha, Tokharistan), as 吐蕃 Tibet and 波斯 Persia already do.
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

  // 卷首地图所需、地名表未收者：拼音（作者 2026-11-22 定）
  '河北-范阳': 'Fanyang', // 地名表作 Youzhou (Fanyang Commandery)，图上取郡名，同中文标签
  邺城: 'Yecheng',
  睢阳: 'Suiyang',
  灵武: 'Lingwu',

  // T0 工作稿（2026-11-22）
  // 河东、关内：军镇与州
  振武军: 'Zhenwu Army',
  静边军: 'Jingbian Army',
  '河东-绛州': 'Jiangzhou',
  上党郡: 'Shangdang',
  // 两京之间
  新丰: 'Xinfeng',
  '天策府/北邙山': 'Tiance Command, Beimang',
  '嵩山-少林寺': 'Shaolin Monastery',
  河阳: 'Heyang',
  陕州: 'Shanzhou',
  同州: 'Tongzhou',
  // 山南、剑南（梁州加注汉中：与凉州同音）
  凌雪太白山: 'Mount Taibai (Lingxue)',
  凤州: 'Fengzhou',
  梁州: 'Liangzhou (Hanzhong)',
  蜀中: 'Shu',
  // 河北、河南东部与海上
  平卢: 'Pinglu',
  青州: 'Qingzhou',
  蓬莱: 'Penglai',
  东海: 'Eastern Sea',
  // 淮南、江南
  淮扬: 'Huaiyang',
  '庐州-巢县': 'Chao County',
  '庐州-合肥': 'Hefei',
  湖州: 'Huzhou',
  '杭州-西湖': 'West Lake',
  '杭州-灵隐寺': 'Lingyin Monastery',
  '杭州-藏剑山庄': 'Cangjian Manor',
  '越州-天台山': 'Mount Tiantai',
  台州: 'Taizhou',
  长歌门: 'Changge School',
  // 陇右、西域
  石堡城: 'Shibao Fortress',
  沙州: 'Shazhou',
  西州: 'Xizhou',
  '西域-龙门': 'Longmen Desert',
  // 唐境以外：通行英文名
  '安西-龟兹': 'Kucha',
  吐火罗: 'Tokharistan',
  小勃律: 'Little Balur',
  波斯: 'Persia',
  疾陵城: 'Zaranj',
  // 西南、东北
  蝴蝶泉: 'Butterfly Spring',
  西南山区村落: 'Southwestern hill villages',
  药宗故地: 'Beitian School (old seat)',
};
