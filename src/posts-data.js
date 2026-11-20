/* ============================================================
   任職 (posts-data.js) —— 事實層：各人在門派編制中的任期（苍云、天策）
   Notion「人山人海 · 任職」先改，此處隨之（「Notion 先改，wiki 随之」）。
   苍云編制依文稿〈重看人物、軍隊體系〉：伍、火、队、旅、团、营、军；破阵营辖三团。
   天策依 docs/tiance-posts-draft.md：府中诸将／府僚（天策上将府旧制）／营伍（参照折冲府）。
   POSTS：图上一行＝一个职位格（单位 × 职位），fac 门派，按 group 分组、按数组次序排；
   TENURES：一段任期一行；同一人换职、同职复任各为一行。
     y0/m0 起，y1/m1 止；y0 为 null＝起点不明（图上自左缘淡入），
     y1 为 null＝在任至卷末或止点不明（画到右缘）。
     kind 性质：正授 / 署理 / 代领 / 兼领 / 停职 / 暂任 / 差遣 / 无名目 / 充任
       （正授、署理、暂任实带；代领、兼领、停职、无名目、充任虚线；差遣细线）。
       充任：府中差遣而无品级者，如天策的斥候首。
     rank：图上显示的职衔原文，空则用所在行名。
     src：依据——年表条目编号（如 757.10B，check-data 校验其存在）、
       〈文稿篇名〉、「卡」（人物卡）。
     approx：["y0"] / ["y1"] 起止推定。draft：起草待核。
   GRANTS：勋官、散官的授予（不是职位，不上图，只进档案卡履历）。
     y/m 授予之时；xun 勋官；san 散官，pin 其品；approx 系年推定（授予本身有据、年月是推的）；
     draft 待核（授予本身尚未经作者裁定）。
   ============================================================ */

export const POSTS = [
  { id: "cy-lead", fac: "苍云", group: "统帅", label: "统帅" },
  { id: "pz-lead", fac: "苍云", group: "破阵营", label: "统领" },
  { id: "pz-real", fac: "苍云", group: "破阵营", label: "营中实掌", hint: "统领王不空之下，破阵营实务的那一份：先在闵方城手里而没有名目，他缺席时由人代掌；763 年关岳做营副，这份实权第一次有了名目" },
  { id: "pz-vice", fac: "苍云", group: "破阵营", label: "营副" },
  { id: "t1-lead", fac: "苍云", group: "一团", label: "长官" },
  { id: "t1-vice", fac: "苍云", group: "一团", label: "副官" },
  { id: "t1-lv", fac: "苍云", group: "一团", label: "旅帅" },
  { id: "t2-lead", fac: "苍云", group: "二团", label: "长官" },
  { id: "t2-vice", fac: "苍云", group: "二团", label: "副官" },
  { id: "t3-lead", fac: "苍云", group: "三团", label: "长官" },
  { id: "t3-vice", fac: "苍云", group: "三团", label: "副官" },
  { id: "yz-jiao", fac: "苍云", group: "营直", label: "教官" },
  { id: "yz-chi", fac: "苍云", group: "营直", label: "斥候首" },
  { id: "yz-ji", fac: "苍云", group: "营直", label: "军纪官" },
  { id: "dui", fac: "苍云", group: "营直", label: "队正" },
  { id: "xy-lead", fac: "苍云", group: "出征差遣", label: "主将" },
  { id: "xy-vice", fac: "苍云", group: "出征差遣", label: "副将" },
  { id: "wk", fac: "苍云", group: "堡内与关外", label: "武库" },
  { id: "nw", fac: "苍云", group: "堡内与关外", label: "女卫营" },
  { id: "yt", fac: "苍云", group: "堡内与关外", label: "雁塔" },
  /* ---------- 天策（依 docs/tiance-posts-draft.md，2026-11-20 作者定） ---------- */
  { id: "tc-jl", fac: "天策", group: "府中诸将", label: "教练使", hint: "府中诸将之一，掌教练。原是杨宁的位子" },
  { id: "tc-bm", fac: "天策", group: "府中诸将", label: "兵马使", hint: "府中诸将之一，掌兵马。原是徐长海的位子" },
  { id: "tc-bc", fac: "天策", group: "府僚", label: "兵曹参军事", hint: "天策上将府旧制六曹之一，掌兵士簿帐、差点" },
  { id: "tc-cj", fac: "天策", group: "府僚", label: "参军事", hint: "天策上将府旧制，掌出使及杂检校" },
  { id: "tg-xw", fac: "天策", group: "天弓营", label: "校尉", hint: "营伍参照折冲府：校尉领三百人" },
  { id: "tg-fw", fac: "天策", group: "天弓营", label: "副尉", hint: "营中俗称副将" },
  { id: "tg-lv", fac: "天策", group: "天弓营", label: "旅帅", hint: "领百人" },
  { id: "ch-xw", fac: "天策", group: "斥候", label: "校尉", hint: "回府后掌斥候遴训与情报；职名为编制草稿所拟" },
  { id: "ch-shou", fac: "天策", group: "斥候", label: "斥候首", hint: "府中差遣，无品级" },
  { id: "ch-lv", fac: "天策", group: "斥候", label: "旅帅" },
  { id: "ch-bing", fac: "天策", group: "斥候", label: "天杀营", hint: "冷天锋帐下，受训于叔宝阁" },
  { id: "ly-lh", fac: "天策", group: "留营", label: "留后", hint: "756.2 府城破、统领与军师西撤后，留下的残营由谁领" },
  { id: "ly-zw", fac: "天策", group: "留营", label: "以阵亡论", hint: "名录上已是亡人，不能复官带兵" },
  { id: "tc-tg", fac: "天策", group: "行营与外借", label: "潼关残军" },
  { id: "tc-cy", fac: "天策", group: "行营与外借", label: "在苍云", hint: "苍云那边的任职见苍云编制图" },
  { id: "tc-lz", fac: "天策", group: "行营与外借", label: "借往灵州" },
];
/* 单位全称：档案卡「任职履历」与浮签用（行名只写「长官」，须冠以单位） */
export const POST_FULL = {
  "cy-lead": "苍云统帅", "pz-lead": "破阵营统领", "pz-real": "破阵营营中实掌", "pz-vice": "破阵营营副",
  "t1-lead": "一团长官", "t1-vice": "一团副官", "t1-lv": "一团旅帅", "t2-lead": "二团长官", "t2-vice": "二团副官",
  "t3-lead": "三团长官", "t3-vice": "三团副官", "yz-jiao": "教官", "yz-chi": "斥候首", "yz-ji": "军纪官", "dui": "队正",
  "xy-lead": "出征主将", "xy-vice": "出征副将", "wk": "武库", "nw": "女卫营", "yt": "雁塔",
  /* 天策 */
  "tc-jl": "天策府教练使",
  "tc-bm": "天策府兵马使",
  "tc-bc": "兵曹参军事",
  "tc-cj": "参军事",
  "tg-xw": "天弓营校尉",
  "tg-fw": "天弓营副尉",
  "tg-lv": "天弓营旅帅",
  "ch-xw": "斥候营校尉",
  "ch-shou": "府中斥候首",
  "ch-lv": "旅帅（辖斥候）",
  "ch-bing": "天杀营斥候",
  "ly-lh": "天策府留后",
  "ly-zw": "以阵亡论（名籍已除）",
  "tc-tg": "潼关残军",
  "tc-cy": "离府，在苍云",
  "tc-lz": "借往灵州治军",
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
  { post: "t3-lead", who: "jinchenbai", y0: 755, m0: 12, y1: 756, m1: 2, kind: "代领", rank: "暂领三团", how: "吕定仪临终授意暂领调度；闵方城「你去」，捧印", end: "扶榇返雁门发丧；景惠时为他缝制新旗幡", src: ["755.12", "756.1", "756.2"], note: "秘不发丧期间将旗名号未改，仍是吕定仪的旗；756.1 诱敌时扮作吕定仪身势" },
  { post: "t3-lead", who: "jinchenbai", y0: 756, m0: 2, y1: null, m1: null, kind: "正授", how: "「此后升任团长官」（〈靳+两楼〉未写年月）；作者定以 756.2 扶榇返关发丧、新旗幡为起点", src: ["756.2", "〈靳+两楼〉"] },
  { post: "t3-vice", who: "louqiao", y0: 757, m0: 10, y1: null, m1: null, kind: "正授", how: "晋", src: ["757.10G"], approx: ["y0"] },
  { post: "yz-jiao", who: "lanchuanyun", y0: 757, m0: 10, y1: 762, m1: 11, kind: "正授", how: "闵方城进言，统帅允，未经二、三团考校", end: "返天策府", src: ["757.10D", "762.11"], note: "兼统辖全营抽出的五十名斥候" },
  { post: "yz-jiao", who: "qiuhong", y0: 760, m0: 11, y1: 761, m1: 1, kind: "暂任", how: "请辞后暂留为教官", end: "演阵后复二团副将", src: ["760.11B", "761.1A"] },
  { post: "yz-chi", who: "biansaiyuan", y0: 757, m0: 12, y1: null, m1: null, kind: "正授", how: "岚川云提拔", src: ["卡", "〈登楼 C20〉"], note: "起点为757冬全营抽人训斥候之时（作者定 757.12）" },
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
  /* ---------- 天策（依 docs/tiance-posts-draft.md，2026-11-20 作者定） ---------- */
  { post: "tg-lv", who: "chengkai", y0: 741, m0: 10, y1: 746, m1: null, kind: "正授", how: "随杨宁援边，率百骑解围", src: ["741.10", "〈程家系列〉"], approx: ["y0", "y1"], note: "743 已是「堂堂军府一旅帅」（〈程家系列〉）" },
  { post: "tg-fw", who: "chengkai", y0: 746, m0: null, y1: 756, m1: 2, kind: "正授", rank: "天弓营副尉（子阳将军）", how: "石堡城压阵断后成名后擢", end: "伤兵营中被一刀穿胸，以阵亡论", src: ["745.9", "747.10B"], approx: ["y0"], note: "营中俗称副将" },
  { post: "ly-zw", who: "chengkai", y0: 756, m0: 2, y1: 757, m1: 6, kind: "无名目", rank: "以阵亡论", how: "传言战死，实被医者救回；756.10 起带训残营士兵", end: "复职", src: ["756.2A", "〈程家系列〉"], note: "名籍已除，不能复官带兵" },
  { post: "tg-xw", who: "chengkai", y0: 757, m0: 6, y1: 770, m1: 12, kind: "正授", how: "复职，得三百人营；攻拔半山狼牙营垒建功", end: "病故", src: ["757.6C", "〈757-4 如镝〉", "〈殿〉", "770.12"], note: "766 年仍带天弓营演练" },
  { post: "tc-jl", who: "chengkai", y0: 757, m0: 10, y1: 770, m1: 12, kind: "正授", how: "回府，驻知节殿；接杨宁之缺", end: "病故", src: ["757.10F", "〈殿〉", "〈第三章〉", "770.12"], note: "兼领天弓营；府中称「知节殿将军」" },
  { post: "ch-bing", who: "lanchuanyun", y0: 739, m0: 10, y1: 747, m1: null, kind: "无名目", rank: "天杀营斥候（冷天锋帐下）", how: "大光明寺杀获论功后，归入天杀营受训为斥候", end: "擢斥候首", src: ["739.10", "〈黍梁·青苔〉"], note: "兵，无职；其间 741、745 两去西域" },
  { post: "ch-shou", who: "lanchuanyun", y0: 747, m0: null, y1: 756, m1: 2, kind: "充任", rank: "斥候首（无品级）", how: "擢任斥候首，训练新入府的斥候兵员", end: "府城破", src: ["卡", "〈于林之下〉"], note: "752 起本职旅帅，仍充斥候首" },
  { post: "ch-lv", who: "lanchuanyun", y0: 752, m0: 9, y1: 756, m1: 2, kind: "正授", rank: "旅帅（辖斥候）", how: "南诏回，曹雪阳论功（〈752 婚〉）", end: "府城破", src: ["752.9", "卡", "〈752 婚〉"], approx: ["y0"] },
  { post: "tc-tg", who: "lanchuanyun", y0: 756, m0: 2, y1: 756, m1: 6, kind: "差遣", rank: "潼关残军（与齐晟）", how: "随曹雪阳西撤入潼关；五月起与齐晟率残军对峙", end: "重伤", src: ["756.2C", "756.6B"], note: "齐晟为主" },
  { post: "tc-cy", who: "lanchuanyun", y0: 757, m0: 9, y1: 762, m1: 11, kind: "无名目", rank: "离府，在苍云", how: "自我流放北上苍云", end: "回府", src: ["757.9A", "757.10D", "762.11"], note: "苍云：破阵营教官，后兼巡官" },
  { post: "ch-xw", who: "lanchuanyun", y0: 762, m0: 11, y1: null, m1: null, kind: "正授", rank: "斥候营校尉", how: "回府，仍掌斥候遴训与情报", src: ["762.11", "卡"], note: "散官归德郎将（从五品下）高于校尉，唐制职名前冠「行」" },
  { post: "tc-cj", who: "litingshen", y0: null, m0: null, y1: 750, m1: null, kind: "正授", rank: "参军事（军师帐下）", how: "少年入府，军师帐下习演兵法阵列", src: ["卡"], approx: ["y1"], note: "入府年待核", draft: true },
  { post: "tc-bc", who: "litingshen", y0: 750, m0: null, y1: 756, m1: 2, kind: "正授", rank: "兵曹参军事（李参军）", how: "在朱剑秋身边，协掌军中文翰", end: "府城破，军师临行授意统军", src: ["卡", "756.2D"], approx: ["y0"], note: "同期兼入京上番、近前戍卫" },
  { post: "ly-lh", who: "litingshen", y0: 756, m0: 2, y1: 757, m1: 10, kind: "代领", rank: "天策府留后", how: "军师临行一句，从兵曹参军事提拔，收拢伤兵残队", end: "回府", src: ["756.2D", "756.12", "757.4", "〈于林之下〉"], note: "757.4 起受李光弼南面偏师节制" },
  { post: "tc-bm", who: "litingshen", y0: 757, m0: 10, y1: 762, m1: 11, kind: "署理", rank: "兵马使（权）", how: "回府，接徐长海之缺；经营府中粮草马匹军械", end: "正授", src: ["757.10F", "759.9", "〈殿〉"] },
  { post: "tc-bm", who: "litingshen", y0: 762, m0: 11, y1: 774, m1: null, kind: "正授", how: "府城再度收复", end: "乞骸骨，致仕", src: ["762.11", "〈758（秋）江蓠走〉", "770.12"], approx: ["y1"], note: "致仕在程凯去后几年" },
  { post: "tc-lz", who: "litingshen", y0: 765, m0: null, y1: 770, m1: null, kind: "差遣", how: "屡被借往灵州治军", end: "归府", src: ["卡", "〈770 年末见李庭深〉"], approx: ["y0", "y1"], note: "年份待核", draft: true },
];

/* 门派：年轴范围与参照线（编制图按门派切换） */
export const FACTIONS = [
  { id: "苍云", range: [737, 766], marks: [
    { y: 745, m: 9, label: "雁门关之役" }, { y: 755, m: 11, label: "安史乱起" }, { y: 765, m: 1, label: "闵方城卒", left: true },
  ] },
  { id: "天策", range: [737, 776], marks: [
    { y: 756, m: 2, label: "府城破", left: true }, { y: 757, m: 10, label: "回府" }, { y: 762, m: 11, label: "再回府" }, { y: 770, m: 12, label: "程凯卒" },
  ] },
];

export const GRANTS = [
  { who: "lanchuanyun", y: 739, m: 10, xun: "武骑尉", src: ["739.10"], draft: true, note: "年表只记论功嘉奖；是否授勋，作者未单独裁定" },
  { who: "lanchuanyun", y: 756, m: 10, xun: "飞骑尉", san: "振威校尉", pin: "从六品上", src: ["756.10", "〈762年10月 昭觉寺〉"] },
  { who: "lanchuanyun", y: 762, m: 11, xun: "骑都尉", san: "归德郎将", pin: "从五品下", src: ["762.11", "卡"] },
  { who: "chengkai", y: 762, m: 11, xun: "上轻车都尉", san: "壮武将军", pin: "正四品下", src: ["卡", "764"], approx: true },
  { who: "litingshen", y: 762, m: 11, xun: "上轻车都尉", san: "忠武将军", pin: "正四品上", src: ["卡"], approx: true },
];

/* ---------- 供档案卡与编制图共用 ---------- */
const ym = (y, m) => (y == null ? "？" : m != null ? `${y}.${m}` : `${y}`);
const at = (y, m) => y + (m != null ? (m - 1) / 12 : 0);
export function tenureSpan(t) {
  return `${ym(t.y0, t.m0)}${t.approx?.includes("y0") ? "（约）" : ""}—${t.y1 == null ? "" : ym(t.y1, t.m1)}${t.approx?.includes("y1") ? "（约）" : ""}`;
}
export function tenureTitle(t) {
  return t.rank || POST_FULL[t.post];
}
export function tenuresOf(id) {
  const k = (t) => (t.y0 == null ? -1 : at(t.y0, t.m0));
  return TENURES.filter((t) => t.who === id).sort((a, b) => k(a) - k(b));
}
const facOfPost = Object.fromEntries(POSTS.map((p) => [p.id, p.fac]));
export function tenureFac(t) {
  return facOfPost[t.post];
}
export function grantsOf(id) {
  return GRANTS.filter((g) => g.who === id).sort((a, b) => at(a.y, a.m) - at(b.y, b.m));
}
export function grantLabel(g) {
  return [g.xun, g.san && `${g.san}（${g.pin}）`].filter(Boolean).join("；");
}
