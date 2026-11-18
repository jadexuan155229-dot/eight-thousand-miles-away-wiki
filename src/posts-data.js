/* ============================================================
   任職 (posts-data.js) —— 事實層：各人在門派編制中的任期（先做苍云）
   Notion「人山人海 · 任職」先改，此處隨之（「Notion 先改，wiki 随之」）。
   編制依文稿〈重看人物、軍隊體系〉：伍、火、队、旅、团、营、军；破阵营辖三团。
   POSTS：图上一行＝一个职位格（单位 × 职位），按 group 分组、按数组次序排；
   TENURES：一段任期一行；同一人换职、同职复任各为一行。
     y0/m0 起，y1/m1 止；y0 为 null＝起点不明（图上自左缘淡入），
     y1 为 null＝在任至卷末或止点不明（画到右缘）。
     kind 性质：正授 / 署理 / 代领 / 兼领 / 停职 / 暂任 / 差遣 / 无名目
       （正授、署理、暂任实带；代领、兼领、停职、无名目虚线；差遣细线）。
     rank：图上显示的职衔原文，空则用所在行名。
     src：依据——年表条目编号（如 757.10B，check-data 校验其存在）、
       〈文稿篇名〉、「卡」（人物卡）。
     approx：["y0"] / ["y1"] 起止推定。draft：起草待核。
   ============================================================ */

export const POSTS = [
  { id: "cy-lead", group: "统帅", label: "统帅" },
  { id: "pz-lead", group: "破阵营", label: "统领" },
  { id: "pz-real", group: "破阵营", label: "营中实掌", hint: "统领王不空之下，破阵营实务的那一份：先在闵方城手里而没有名目，他缺席时由人代掌；763 年关岳做营副，这份实权第一次有了名目" },
  { id: "pz-vice", group: "破阵营", label: "营副" },
  { id: "t1-lead", group: "一团", label: "长官" },
  { id: "t1-vice", group: "一团", label: "副官" },
  { id: "t1-lv", group: "一团", label: "旅帅" },
  { id: "t2-lead", group: "二团", label: "长官" },
  { id: "t2-vice", group: "二团", label: "副官" },
  { id: "t3-lead", group: "三团", label: "长官" },
  { id: "t3-vice", group: "三团", label: "副官" },
  { id: "yz-jiao", group: "营直", label: "教官" },
  { id: "yz-chi", group: "营直", label: "斥候首" },
  { id: "yz-ji", group: "营直", label: "军纪官" },
  { id: "dui", group: "营直", label: "队正" },
  { id: "xy-lead", group: "出征差遣", label: "主将" },
  { id: "xy-vice", group: "出征差遣", label: "副将" },
  { id: "wk", group: "堡内与关外", label: "武库" },
  { id: "nw", group: "堡内与关外", label: "女卫营" },
  { id: "yt", group: "堡内与关外", label: "雁塔" },
];
/* 单位全称：档案卡「任职履历」与浮签用（行名只写「长官」，须冠以单位） */
export const POST_FULL = {
  "cy-lead": "苍云统帅", "pz-lead": "破阵营统领", "pz-real": "破阵营营中实掌", "pz-vice": "破阵营营副",
  "t1-lead": "一团长官", "t1-vice": "一团副官", "t1-lv": "一团旅帅", "t2-lead": "二团长官", "t2-vice": "二团副官",
  "t3-lead": "三团长官", "t3-vice": "三团副官", "yz-jiao": "教官", "yz-chi": "斥候首", "yz-ji": "军纪官", "dui": "队正",
  "xy-lead": "出征主将", "xy-vice": "出征副将", "wk": "武库", "nw": "女卫营", "yt": "雁塔",
};

export const TENURES = [
  { post: "cy-lead", who: "xuezhi", y0: null, m0: null, y1: 745, m1: 9, kind: "正授", how: "奉旨立玄甲军", end: "雁门关之役战殁", src: ["745.9", "卡"] },
  { post: "cy-lead", who: "zswq", y0: 745, m0: 9, y1: null, m1: null, kind: "正授", how: "薛直之后继任", src: ["746.3", "卡"], approx: ["y0"] },
  { post: "pz-lead", who: "wbk", y0: null, m0: null, y1: null, m1: null, kind: "正授", src: ["〈杀马〉"], note: "年表无条目；文稿称「佛爷」" },
  { post: "pz-real", who: "minfangcheng", y0: 747, m0: 9, y1: 760, m1: 10, kind: "无名目", how: "考课坐实团主官；破阵营战力核心，「几乎如统领」", end: "羁押待罪", src: ["747.9", "760.10C", "〈动物世界〉"], note: "统领王不空之下，破阵营实务向在闵方城手里，没有名目" },
  { post: "pz-real", who: "diyuanke", y0: 760, m0: 10, y1: 761, m1: 1, kind: "代领", rank: "掌破阵营事", how: "闵方城羁押，掌破阵营事", end: "演阵后关岳于主帐正位", src: ["760.10C", "761.1A"], approx: ["y1"] },
  { post: "pz-real", who: "guanyue", y0: 762, m0: 9, y1: 762, m1: 12, kind: "代领", rank: "代领破阵营", how: "闵方城、狄元恪率行营南下，暂代领破阵营", end: "行营返雁门", src: ["762.9C", "762.10G"] },
  { post: "pz-vice", who: "guanyue", y0: 763, m0: 10, y1: null, m1: null, kind: "正授", how: "闵方城推举", src: ["763.10B", "764.1B"], note: "营中实掌第一次有了名目；推举即任，764.1 以新营副守关" },
  { post: "t1-lead", who: "minfangcheng", y0: 745, m0: 11, y1: 747, m1: 9, kind: "署理", how: "雁门关之役后重组，以战功署理", end: "首次考课坐实", src: ["745.11"] },
  { post: "t1-lead", who: "minfangcheng", y0: 747, m0: 9, y1: 760, m1: 10, kind: "正授", how: "首次恢复考课，擂台坐实，称将军", end: "羁押待罪，后幽居", src: ["747.9", "760.10C"] },
  { post: "t1-lead", who: "guanyue", y0: 760, m0: 10, y1: 762, m1: 9, kind: "代领", how: "闵方城羁押、幽居，不许入营带兵", end: "统帅文书许闵方城归营", src: ["〈狄、邱、樊〉"], note: "761.1–761.3 闵方城戴罪带兵出凤州" },
  { post: "t1-lead", who: "minfangcheng", y0: 762, m0: 9, y1: 764, m1: 3, kind: "正授", how: "统帅文书许其病愈归营", end: "退居二线", src: ["762.9B", "764.3"], note: "763.8 起上书乞骸骨、掩门不出" },
  { post: "t1-lead", who: "qiuhong", y0: 764, m0: 3, y1: null, m1: null, kind: "正授", how: "继任闵方城", src: ["763.10B", "764.3"] },
  { post: "t1-vice", who: "guanyue", y0: 745, m0: 11, y1: 763, m1: 10, kind: "正授", how: "闵方城指他为副，时破阵营建制从头编起", end: "升营副", src: ["〈连朔〉"], approx: ["y0"] },
  { post: "t1-vice", who: "fanzhang", y0: 764, m0: 8, y1: null, m1: null, kind: "正授", how: "人前试艺，出狄元恪帐下", src: ["763.10B", "764.8"], approx: ["y0"] },
  { post: "t1-lv", who: "lianshuo", y0: 757, m0: 9, y1: 760, m1: 9, kind: "正授", how: "河西擢（马邑先登记功在前）", end: "死于东陉雪岭山洞，报作战亡", src: ["757.9", "760.9A"] },
  { post: "t2-lead", who: "lifei", y0: 745, m0: 11, y1: 757, m1: 10, kind: "正授", how: "雁门关之役后重组擢", end: "擂台一败于邱鸿，伤重退役", src: ["745.11", "757.10B"] },
  { post: "t2-lead", who: "diyuanke", y0: 757, m0: 10, y1: 764, m1: 9, kind: "正授", how: "空降", end: "南归太原，任河东节度行军司马", src: ["757.10B", "764.9"] },
  { post: "t2-lead", who: "guanyue", y0: 764, m0: 9, y1: null, m1: null, kind: "兼领", how: "以营副暂兼领，再遴选主将", src: ["764.9"], note: "新主将未定" },
  { post: "t2-vice", who: "xuechu", y0: 745, m0: 11, y1: 757, m1: 10, kind: "正授", how: "雁门关之役后重组擢", end: "请辞，回武库", src: ["745.11", "757.10H"], note: "营中单以字行，称季韬将军" },
  { post: "t2-vice", who: "qiuhong", y0: 757, m0: 10, y1: 760, m1: 10, kind: "正授", how: "擂台一后任命", end: "断臂", src: ["757.10B", "760.10A"] },
  { post: "t2-vice", who: "qiuhong", y0: 760, m0: 10, y1: 761, m1: 1, kind: "停职", how: "断臂养伤，未免职；760.11 请辞未准", end: "演阵后复职", src: ["760.10A", "760.11B"] },
  { post: "t2-vice", who: "qiuhong", y0: 761, m0: 1, y1: 764, m1: 3, kind: "正授", how: "演阵后复二团副将之职", end: "调一团长官", src: ["761.1A", "764.3"] },
  { post: "t3-lead", who: "lvdingyi", y0: 745, m0: 11, y1: 755, m1: 12, kind: "正授", how: "雁门关之役后重组擢", end: "行军途中病故，秘不发丧", src: ["745.11", "755.12"], note: "未置副将", en: { title: "Commander, Third Regiment", how: "Appointed in the reorganisation after the Battle of Yanmen Pass", end: "died on campaign; his death was kept secret" } },
  { post: "t3-lead", who: "jinchenbai", y0: 755, m0: 12, y1: null, m1: null, kind: "正授", how: "吕定仪临终授意暂领；闵方城「你去」，捧印", src: ["755.12"] },
  { post: "t3-vice", who: "louqiao", y0: 757, m0: 10, y1: null, m1: null, kind: "正授", how: "晋", src: ["757.10G"], approx: ["y0"] },
  { post: "yz-jiao", who: "lanchuanyun", y0: 757, m0: 10, y1: 762, m1: 11, kind: "正授", how: "闵方城进言，统帅允，未经二、三团考校", end: "返天策府", src: ["757.10D", "762.11"], note: "兼统辖全营抽出的五十名斥候" },
  { post: "yz-jiao", who: "qiuhong", y0: 760, m0: 11, y1: 761, m1: 1, kind: "暂任", how: "请辞后暂留为教官", end: "演阵后复二团副将", src: ["760.11B", "761.1A"] },
  { post: "yz-chi", who: "biansaiyuan", y0: 757, m0: 12, y1: null, m1: null, kind: "正授", how: "岚川云提拔", src: ["卡", "〈登楼 C20〉"], approx: ["y0"], note: "起点推定为757冬全营抽人训斥候之时", draft: true },
  { post: "yz-ji", who: "diyuanke", y0: 757, m0: 9, y1: 757, m1: 10, kind: "正授", how: "入苍云后初任", end: "空降二团长官", src: ["757.9B"] },
  { post: "dui", who: "guanshan", y0: null, m0: null, y1: 745, m1: 9, kind: "正授", end: "雁门关之役阵亡", src: ["745.9", "卡"], note: "闵方城时在其队中" },
  { post: "dui", who: "liaoqun", y0: 763, m0: 7, y1: 763, m1: 10, kind: "正授", rank: "队正（灵武留驻）", how: "自请留驻灵武", end: "灵武那一队召回，十月回到雁门", src: ["763.7B", "763.9B"], note: "此后是否仍任队正不明" },
  { post: "xy-lead", who: "minfangcheng", y0: 761, m0: 1, y1: 761, m1: 3, kind: "差遣", rank: "主将（凤州，戴罪）", how: "戴罪领兵出凤州", src: ["761.1B", "761.2"] },
  { post: "xy-vice", who: "guanyue", y0: 761, m0: 1, y1: 761, m1: 3, kind: "差遣", rank: "副将（凤州）", how: "以旧制为副", src: ["761.1B"] },
  { post: "xy-lead", who: "minfangcheng", y0: 762, m0: 9, y1: 762, m1: 10, kind: "差遣", rank: "主将（洛阳行营）", how: "点兵组建行军，会兵洛阳", end: "昭觉寺重伤", src: ["762.9C", "762.10"] },
  { post: "xy-lead", who: "diyuanke", y0: 762, m0: 10, y1: 762, m1: 12, kind: "差遣", rank: "统管行营（洛阳）", how: "闵方城重伤后统管行营", end: "率军返雁门", src: ["762.11B"] },
  { post: "xy-lead", who: "minfangcheng", y0: 763, m0: 7, y1: 763, m1: 8, kind: "差遣", rank: "主将（援甘州）", how: "请命出援故土甘州", end: "无功而返", src: ["763.7"] },
  { post: "xy-vice", who: "guanyue", y0: 763, m0: 7, y1: 763, m1: 8, kind: "差遣", rank: "副将（援甘州）", how: "随行", src: ["763.8"] },
  { post: "wk", who: "xuechu", y0: null, m0: null, y1: 745, m1: 11, kind: "正授", how: "少年入武库，管理保养军械", end: "擢二团副官", src: ["卡"] },
  { post: "wk", who: "xuechu", y0: 757, m0: 10, y1: null, m1: null, kind: "正授", how: "请辞副官，请回武库修缮甲兵", src: ["757.10H"] },
  { post: "wk", who: "lubingyu", y0: 758, m0: 10, y1: null, m1: null, kind: "正授", rank: "锻刀", how: "逐出师门后至武库，在薛褚手下锻刀", src: ["758.10"] },
  { post: "wk", who: "rujin", y0: 750, m0: null, y1: null, m1: null, kind: "正授", rank: "皮甲工匠", how: "十六岁纳入苍云", src: ["卡"], approx: ["y0"] },
  { post: "nw", who: "jinghuishi", y0: null, m0: null, y1: 761, m1: 2, kind: "正授", rank: "军医，协理女卫营", end: "凤州，为救边赛远而死", src: ["卡", "761.2"] },
  { post: "nw", who: "helan", y0: 756, m0: null, y1: null, m1: null, kind: "正授", rank: "医女", how: "入女卫营，为景惠时弟子", src: ["755.12C", "760.11"], approx: ["y0"], note: "760.11 景惠时停职期间调度医帐；后承静息帐" },
  { post: "yt", who: "louyi", y0: 745, m0: 7, y1: null, m1: null, kind: "正授", rank: "雁塔守备长官", how: "父楼准坠塔，十五岁临危受命", src: ["卡"], approx: ["y0"] },
];
