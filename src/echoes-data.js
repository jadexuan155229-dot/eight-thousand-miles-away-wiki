/* ============================================================
   余波层数据 (echoes-data.js) —— 作者按，与事实层（wiki-data.js）分声
   来源：Notion「人山人海 · 震源」「人山人海 · 回响」两库；Notion 先改，此处随之。
   震源 SHOCKS：几场笼罩多人的事件；axis 为该震源自拟的纵轴刻度，bands 依刻度分带。
   回响 ECHOES：一人对一震源一条——
     stance/stanceNote  在场姿态（stance 取本震源 bands 之带，逝者例外：贴震源行）
     mode               记忆方式（核心声部）；英文见 i18n/echoes.en.js，键为 mode 原文
     arc                此事在其后岁月重新浮出的节点：y 年、m 月、q 年表序号（如 B1），
                        note 说明；card 表示出自人物卡轶事而非年表条目。y 为 null＝无定年
   校验见 scripts/check-data.js（who∈CHARACTERS；shock.ev 与有月份之节点对照 EVENTS）。
   ============================================================ */

export const SHOCKS = [
  { id: "yanmen745", year: 745, month: 9, ev: { year: 745, month: 9, has: "雁门关之役" }, title: "雁门关之役", gist: "战争创伤的代际传递", axis: "与战事的距离",
    bands: [["dead", "逝者"], ["live", "亲历者"], ["young", "在场年幼者"], ["after", "事后来者"], ["far", "对面"]] },
  { id: "lvdingyi755", year: 755, month: 12, ev: { year: 755, month: 12, has: "吕定仪身故" }, title: "吕定仪之死（秘不发丧）", gist: "缺席者的位置如何被填", axis: "与死者的距离",
    bands: [["dead", "逝者"], ["near", "同营旧部"], ["unmet", "未曾相见者"], ["out", "对手与外人"]] },
  { id: "leitai757", year: 757, month: 10, ev: { year: 757, month: 10, has: "考课结果【擂台一】" }, title: "荔非败于邱鸿", gist: "一个秘密的多种守法", axis: "何时知道那道伤",
    bands: [["self", "当事人"], ["before", "事前知"], ["during", "事中得知"], ["after", "事后不问"], ["result", "只知结果"], ["never", "终生不知"], ["none", "不知亦无需知"]] },
];

export const ECHOES = [
  /* ---- 雁门关之役 ---- */
  { shock: "yanmen745", who: "xuezhi", band: "dead", order: 1, stance: "逝者", mode: "声名悬而未决",
    arc: [
      { y: 745, m: 12, q: "", note: "薛褚归绛州，族宅廊下「名声之论」；圣人降罪、丧仪不提、族中不请褒辞（卡）" },
      { y: 746, m: 3, q: "", note: "大丧迟于战亡数月，遗骨自冰室请出" },
      { y: 757, m: 7, q: "", note: "老兽医醉中将狄元恪误认作故统帅" },
      { y: 762, m: 9, q: "", note: "昔年坐骑摔伤致死，闵方城跪守三五日" },
      { y: 763, m: 10, q: "", note: "荔非污名传来，薛褚想起「名声之论」，撂下兵器出武库" },
    ] },
  { shock: "yanmen745", who: "guanshan", band: "dead", order: 2, stance: "逝者", mode: "从名字到碑文",
    arc: [
      { y: 745, m: 11, q: "", note: "景惠时新寡" },
      { y: 757, m: 12, q: "C", note: "旌表「节义」，景、关两家蠲免" },
      { y: 761, m: 2, q: "", note: "景惠时以节妇之身归葬关山之侧" },
      { y: 764, m: 11, q: "", note: "关榆长大不识碑上之名，关氏子女无一人再沾军伍" },
    ] },
  { shock: "yanmen745", who: "minfangcheng", band: "live", order: 3, stance: "亲历", stanceNote: "出关寻回统帅遗体", mode: "替亡者守着",
    arc: [
      { y: 745, m: 11, q: "", note: "成名之战「临阵受辱而色不变」（卡）；只许景惠时医，不许她说话" },
      { y: null, m: null, q: "", note: "守着薛直的战马十几年", card: true },
      { y: 747, m: 9, q: "", note: "首次恢复考课，「原来这就是先统帅看中过的人」自此每年一回" },
      { y: 753, m: 11, q: "", note: "便装巡广武城，「他知道原先薛直也这样」" },
      { y: 757, m: 12, q: "A", note: "墨昆当众以早年为护关山受辱事羞辱之，闵方城放走他" },
      { y: 762, m: 9, q: "", note: "老马死，呕血昏厥" },
      { y: 762, m: 12, q: "C", note: "伤后独自步行上李牧祠见薛直" },
      { y: 763, m: 12, q: "B", note: "抄《出师表》「盖追先帝之殊遇」" },
      { y: 765, m: 1, q: "B", note: "留话一匹与统帅当年一模一样的青黑马——「这是存在」" },
    ] },
  { shock: "yanmen745", who: "lifei", band: "live", order: 4, stance: "亲历", stanceNote: "于薛直身侧倒下，被当作已死", mode: "以无功自铭",
    arc: [
      { y: 745, m: null, q: "", note: "后始有「无功」之字（卡·名义）", card: true },
      { y: 746, m: 7, q: "", note: "残营乏治文事者，他把靳沉白带回来" },
      { y: 756, m: 11, q: "C", note: "榆林河后点验俘虏，一言不发，「不提738年，薛直不出名」" },
      { y: 757, m: 10, q: "", note: "乱后首开考课，旧柱不能告免，带伤上台" },
      { y: 763, m: 9, q: "", note: "邠州以身入局——「原该殉死却又得活」在十八年后补上" },
    ] },
  { shock: "yanmen745", who: "lvdingyi", band: "live", order: 5, stance: "亲历", stanceNote: "谏闭关候援，不用", mode: "预见而不被听",
    arc: [
      { y: 745, m: null, q: "", note: "「可是圣人想听的？」" },
      { y: 745, m: 11, q: "", note: "擢三团，跨苍云两个阶段" },
      { y: 746, m: 3, q: "B", note: "霸刀以名换粮，「这事在你身上，不在我」" },
      { y: 755, m: 3, q: "C", note: "密报经吕諲递哥舒翰，书遂无下文——第二次预见无人听" },
      { y: 755, m: 12, q: "", note: "遗命秘不发丧：连自己的死讯也延迟" },
    ] },
  { shock: "yanmen745", who: "jinghuishi", band: "live", order: 6, stance: "亲历", stanceNote: "新寡；同年曾以医官入奚营", mode: "忠诚成为负担",
    arc: [
      { y: 745, m: 11, q: "", note: "静坐陪伴之法近闵方城，只得处置其身" },
      { y: 756, m: 7, q: "", note: "又一次" },
      { y: 757, m: 12, q: "C", note: "门庭旌表「节义」" },
      { y: 758, m: 3, q: "", note: "另设静息帐，名目只用医书本有之说" },
      { y: 758, m: 6, q: "", note: "因745年入奚营略通奚俗，由此与屈突真往来" },
      { y: 760, m: 8, q: "", note: "「有了一回」（正文不写）" },
      { y: 761, m: 2, q: "", note: "以节妇之身归葬关山之侧，有孕唯岚川云知" },
    ] },
  { shock: "yanmen745", who: "xuechu", band: "live", order: 7, stance: "亲历", stanceNote: "薛直同族后辈", mode: "为尊者讳",
    arc: [
      { y: 745, m: 12, q: "", note: "廊下听「名声之论」，翌月即返" },
      { y: null, m: null, q: "", note: "隐去薛姓，营中称季韬将军", card: true },
      { y: 756, m: 2, q: "", note: "薛坚留朔方军，只能远远关注" },
      { y: 763, m: 10, q: "", note: "污名传来，出武库求见，被关岳拦下" },
      { y: 764, m: 2, q: "", note: "薛坚生死凭一纸名册得知，「在武库照旧修甲」" },
    ] },
  { shock: "yanmen745", who: "guanyue", band: "young", order: 8, stance: "在场", stanceNote: "十六岁；关山堂弟", mode: "接下兄长的位置",
    arc: [
      { y: 745, m: null, q: "", note: "745–765 与闵方城「主副·恩义」（关系）", card: true },
      { y: 757, m: 7, q: "", note: "引狄元恪入营" },
      { y: 763, m: 10, q: "", note: "拦下薛褚" },
      { y: 764, m: 11, q: "", note: "把女儿放在闵方城寝帐；后关氏子女无一人再沾军伍" },
    ] },
  { shock: "yanmen745", who: "xuejian", band: "young", order: 9, stance: "在场", stanceNote: "十一岁；薛直独子", mode: "以打代哭",
    arc: [
      { y: 745, m: null, q: "", note: "闵方城不穿孝，牵来驯好的马，扛手靶任他打到跪地", card: true },
      { y: null, m: null, q: "", note: "「我所能倚凭唯我自身，唯我手中盾刀」", card: true },
      { y: 756, m: 2, q: "", note: "不随苍云归，自此入朔方军" },
      { y: 762, m: 11, q: "D", note: "朔方军纵掠，他拦未拦，正文不说破" },
      { y: 763, m: 12, q: "B", note: "归省祭父，探闵方城——「郎君」" },
      { y: 765, m: 1, q: "B", note: "关岳牵出青黑马" },
    ] },
  { shock: "yanmen745", who: "louqiao", band: "young", order: 10, stance: "在场", stanceNote: "十二岁；雁塔风筝上", mode: "自风筝上目睹",
    arc: [
      { y: null, m: null, q: "", note: "俯瞰目睹惨状，即有从军入阵之心", card: true },
      { y: null, m: null, q: "", note: "关岳带训" },
      { y: 757, m: 10, q: "G", note: "晋三团副官" },
    ] },
  { shock: "yanmen745", who: "rujin", band: "young", order: 11, stance: "在场", stanceNote: "十一岁；匠户之女", mode: "从死者身上脱甲",
    arc: [
      { y: null, m: null, q: "", note: "神色自若；苍云无力再雇匠役，茹家不愿舍业", card: true },
      { y: null, m: null, q: "", note: "长孙忘情丧礼期间见其缝补，驻足良久，自此不再提让匠户自去（长孙卡）", card: true },
    ] },
  { shock: "yanmen745", who: "jinchenbai", band: "after", order: 12, stance: "事后来者", stanceNote: "同年在雁塔理殉塔文书", mode: "从文书里认识这场仗",
    arc: [
      { y: 745, m: null, q: "", note: "夏合写殉塔报文、器械申领，文书落到吕定仪手中" },
      { y: 746, m: 7, q: "", note: "关外地形与敌袭路线复盘图，被荔非带回关城" },
      { y: 757, m: 7, q: "", note: "那幅图久用，挂在帐后" },
    ] },
  { shock: "yanmen745", who: "biansaiyuan", band: "young", order: 13, stance: "在场", stanceNote: "八岁；737年生于雁门", mode: "八岁，不记得",
    arc: [
      { y: 756, m: 6, q: "", note: "拜入苍云——理由是李庭泽，不是745（《忠诚与遗忘》）" },
      { y: 757, m: 12, q: "A", note: "擒墨昆" },
    ] },
  { shock: "yanmen745", who: "diyuanke", band: "after", order: 14, stance: "不在场", stanceNote: "同年在太原城门救下樊璋", mode: "穿上他人的记忆",
    arc: [
      { y: 745, m: null, q: "", note: "太原城门（同年、另一座城）" },
      { y: 757, m: 7, q: "", note: "人马俱甲执长槊入关，老兽医误认为故统帅" },
      { y: 761, m: 1, q: "A", note: "演阵之日「正是从前被老兽医一眼当作故统帅的披挂」，士兵震肃" },
    ] },
  { shock: "yanmen745", who: "fanzhang", band: "after", order: 15, stance: "不在场", stanceNote: "七岁；745年即云州流民", mode: "同一场战事的另一端",
    arc: [
      { y: null, m: null, q: "", note: "云州归化奚众冲突为其家破之始（作者定：即两蕃南下同一波）", card: true },
      { y: 758, m: 1, q: "", note: "犬牙吊坠引人猜其祖源" },
      { y: 762, m: 10, q: "G", note: "留守雁门者恰是两个云州人" },
    ] },
  { shock: "yanmen745", who: "lianshuo", band: "far", order: 16, stance: "不曾在场", stanceNote: "十二岁；750年才到关外狼牙营垒", mode: "不曾在场",
    arc: [
      { y: 753, m: 11, q: "", note: "「牧马儿？我也是牧马儿。」" },
      { y: 754, m: 9, q: "", note: "擂台撞吕定仪右膝旧患" },
      { y: 757, m: 12, q: "A", note: "墨昆揭闵方城早年受辱事——连朔听到的是别人的745" },
      { y: 759, m: 10, q: "A", note: "「为什么一定要钉在这里」" },
    ] },
  { shock: "yanmen745", who: "zswq", band: "live", order: 17, stance: "继任统帅", mode: "承接一个残营",
    arc: [
      { y: 746, m: 3, q: "", note: "携闵方城、吕定仪、薛褚往霸刀以名换粮" },
      { y: null, m: null, q: "", note: "丧礼期间见茹锦缝补" },
      { y: 761, m: 1, q: "", note: "演阵后自语「总算值得」" },
    ] },
  /* ---- 吕定仪之死（秘不发丧） ---- */
  { shock: "lvdingyi755", who: "lvdingyi", band: "dead", order: 1, stance: "逝者", mode: "连死讯也延迟",
    arc: [
      { y: 755, m: 12, q: "", note: "夜归卧帐，数日后逝；遗言「战未已，切莫发丧」" },
      { y: 756, m: 2, q: "", note: "灵柩方返雁门" },
      { y: 756, m: 3, q: "", note: "下葬" },
    ] },
  { shock: "lvdingyi755", who: "jinchenbai", band: "near", order: 2, stance: "榻前侍奉", stanceNote: "受命暂领", mode: "成为他的影子",
    arc: [
      { y: 755, m: 12, q: "", note: "三日亲巡行营各帐「行走如常」" },
      { y: 756, m: 1, q: "", note: "残旗、草人、风口筚篥，「如同吕定仪仍率部行军」；执盾侧倾、膝盖压下、右腿微晃，全然吕定仪身法" },
      { y: null, m: null, q: "", note: "几乎严格复刻其公文风格与指挥节奏", card: true },
      { y: 757, m: 7, q: "", note: "帐后久用的吕定仪旧图" },
      { y: 763, m: 10, q: "A", note: "与狄元恪起草为荔非正名" },
      { y: 764, m: 3, q: "", note: "「簿记须真」" },
    ] },
  { shock: "lvdingyi755", who: "minfangcheng", band: "near", order: 3, stance: "同营", stanceNote: "「未说开」752–755（关系）", mode: "未说开的话留在原处",
    arc: [
      { y: 755, m: 12, q: "", note: "「你去。」「我不……」" },
      { y: 756, m: 7, q: "", note: "自常山返，初至墓前" },
      { y: 758, m: 1, q: "B", note: "请杜徵复原《九原调》并记谱" },
      { y: 757, m: 12, q: "", note: "荔非祭拜时他在侧" },
    ] },
  { shock: "lvdingyi755", who: "lifei", band: "near", order: 4, stance: "袍泽", stanceNote: "738年吕定仪救其右膝", mode: "以旧物送别",
    arc: [
      { y: 756, m: 2, q: "", note: "与靳沉白扶榇" },
      { y: 756, m: 3, q: "", note: "身覆荔非当年所赠整张虎皮毯" },
      { y: 757, m: 12, q: "", note: "年底祭拜，留营交接至除夕" },
      { y: 758, m: 1, q: "A", note: "除夕一过即离开" },
    ] },
  { shock: "lvdingyi755", who: "xuechu", band: "near", order: 5, stance: "留守旧部", mode: "在门口接",
    arc: [
      { y: 756, m: 2, q: "", note: "于关城门口接灵柩" },
      { y: 755, m: 12, q: "D", note: "同月将地下病亡二人报作阵亡——另一桩不说破的死" },
    ] },
  { shock: "lvdingyi755", who: "jinghuishi", band: "near", order: 6, stance: "军医", mode: "为新主缝旗",
    arc: [
      { y: 756, m: 2, q: "", note: "才为靳沉白缝制新旗幡" },
    ] },
  { shock: "lvdingyi755", who: "diyuanke", band: "unmet", order: 7, stance: "从未见过死者", stanceNote: "因空位被召", mode: "填一个从未见过的空位",
    arc: [
      { y: 757, m: 6, q: "", note: "「吕定仪身亡后军政谋略一线缺人」" },
      { y: 757, m: 7, q: "", note: "拜靳沉白，见吕定仪旧图" },
      { y: 763, m: 10, q: "A", note: "主导起草（吕定仪的位置上做吕定仪会做的事）" },
    ] },
  { shock: "lvdingyi755", who: "lianshuo", band: "out", order: 8, stance: "对手", stanceNote: "「偷得一点吕定仪的功夫」（卡）", mode: "从死者处偷来的招",
    arc: [
      { y: 754, m: 9, q: "", note: "乱前最后一次考课，撞其右膝旧患，吕定仪不语皱眉" },
      { y: 755, m: 12, q: "B/C", note: "同月马邑先登、救贺兰——他的功名之始与吕定仪之死同月" },
    ] },
  { shock: "lvdingyi755", who: "duzheng", band: "out", order: 9, stance: "外人", stanceNote: "长歌", mode: "为陌生人复原曲调",
    arc: [
      { y: 758, m: 1, q: "B", note: "为闵方城复原吕定仪《九原调》并记谱" },
    ] },
  { shock: "lvdingyi755", who: "lvxichun", band: "unmet", order: 10, stance: "遗孤", stanceNote: "755春生于蒲州", mode: "从未相见",
    arc: [
      { y: 755, m: null, q: "", note: "吕定仪率军游击雁北，概未得知" },
    ] },
  /* ---- 荔非败于邱鸿 ---- */
  { shock: "leitai757", who: "lifei", band: "self", order: 1, stance: "当事人", stanceNote: "带河曲旧伤上台，不予人知", mode: "把败绩带出关外",
    arc: [
      { y: 757, m: 10, q: "B", note: "饮酒一壶应战，气海震散" },
      { y: 757, m: 11, q: "", note: "「成全你的贤名」——话重而非裂痕" },
      { y: 758, m: 1, q: "A", note: "除夕一过离开，归宁州，得一子托族兄" },
      { y: 760, m: 6, q: "A", note: "入凤翔节度幕" },
      { y: 761, m: 1, q: "B", note: "暗中促成求援，不具名" },
      { y: 761, m: 2, q: "", note: "凤州与闵方城相见" },
      { y: 763, m: 9, q: "", note: "邠州以身入局" },
    ] },
  { shock: "leitai757", who: "qiuhong", band: "never", order: 2, stance: "胜者", stanceNote: "终生不知", mode: "终生不知",
    arc: [
      { y: 757, m: 10, q: "B", note: "「我赢的不该是这一场」" },
      { y: 757, m: 11, q: "", note: "羊肉不敢亲送，「我不是为了越过荔非将军的」" },
      { y: 760, m: 10, q: "", note: "断臂" },
      { y: 760, m: 12, q: "B", note: "薛褚照料，「照料中有不言之偿」" },
      { y: 761, m: 1, q: "A", note: "冰室问薛褚「还是只想做无名匠人么」" },
      { y: 763, m: 10, q: "C", note: "请命随行凤翔" },
      { y: 765, m: null, q: "", note: "「无盾」铁骨衣" },
    ] },
  { shock: "leitai757", who: "xuechu", band: "before", order: 3, stance: "事前知", stanceNote: "裹过那道伤，替他系甲", mode: "以照料作偿",
    arc: [
      { y: 756, m: 11, q: "B", note: "裹肋，应其所请瞒下" },
      { y: 757, m: 10, q: "B1", note: "「他的铁骨，返劲了」；勒紧左肋甲带正压旧伤" },
      { y: 757, m: 10, q: "H", note: "请辞副官，「以不知情之说顺下知情之实」" },
      { y: 757, m: 11, q: "", note: "转回武库，「静水深潭，诸事不问」" },
      { y: 760, m: 10, q: "D", note: "为昏迷的邱鸿梳头剃须" },
      { y: 760, m: 12, q: "B/C", note: "发现樊璋根骨、为邱鸿制肩盾" },
      { y: 761, m: 1, q: "A", note: "冰室传内力" },
      { y: 763, m: 11, q: "", note: "验骨：识得自己当年以铜丝兜住的臼齿，而眼前遗骨臼齿齐整——沉默点头" },
      { y: 764, m: 3, q: "", note: "归葬毕回武库，「偶尔捻起一根铜丝出神」" },
    ] },
  { shock: "leitai757", who: "jinghuishi", band: "during", order: 4, stance: "事中得知", stanceNote: "当值军医，解甲见旧布", mode: "医者的封口",
    arc: [
      { y: 757, m: 10, q: "B3", note: "不言，「石室中那声叹息由此多一层」" },
      { y: 758, m: 3, q: "", note: "静息帐" },
      { y: 760, m: 10, q: "D", note: "痛揭所用皆医者所知，「破了医帐的封口」——三年后她自己破了这条戒" },
    ] },
  { shock: "leitai757", who: "diyuanke", band: "result", order: 5, stance: "只知结果", stanceNote: "新任军纪官，入营第一件公事", mode: "从簿上一个字开始",
    arc: [
      { y: 757, m: 10, q: "B3", note: "记「荔非承烈，败」" },
      { y: 757, m: 10, q: "B", note: "由此空降二团长官" },
      { y: 757, m: 11, q: "", note: "荔非「我不见那小子」" },
      { y: 761, m: 9, q: "", note: "主持擂台四，「台上已无旧柱」" },
      { y: 763, m: 10, q: "A", note: "为荔非正名，主导起草" },
    ] },
  { shock: "leitai757", who: "minfangcheng", band: "after", order: 6, stance: "事前不知（作者定：只是放学有所成的邱鸿上去试身手）", stanceNote: "事后不问", mode: "不问，也不说破",
    arc: [
      { y: 750, m: 9, q: "", note: "考课邱鸿记败而实为天赋，闵方城要为弟子——与757年成镜像（荔非卡）", card: true },
      { y: 757, m: 11, q: "", note: "邱鸿夜饮，「闵方城看一眼墙上挂的」" },
      { y: 757, m: 12, q: "", note: "荔非祭吕定仪时他在侧" },
      { y: 761, m: 2, q: "", note: "凤州见荔非方知其未归田" },
      { y: 764, m: 4, q: "", note: "传功樊璋" },
    ] },
  { shock: "leitai757", who: "fanzhang", band: "none", order: 7, stance: "不知亦无需知", stanceNote: "远端承接者", mode: "承接一条不知来处的线",
    arc: [
      { y: 760, m: 12, q: "B", note: "因薛褚照料邱鸿而被发现铁骨衣根骨" },
      { y: 761, m: 3, q: "", note: "邱鸿提出令其修铁骨衣" },
      { y: 764, m: 4, q: "", note: "闵方城传功" },
      { y: 765, m: null, q: "", note: "「重盾」铁骨衣，与邱鸿互补" },
    ] },
  { shock: "leitai757", who: "lanchuanyun", band: "none", order: 8, stance: "外人", stanceNote: "此刻到达", mode: "恰在交替处到来",
    arc: [
      { y: 757, m: 9, q: "A", note: "自我流放北上，「处在人事调动、代际交换期间」" },
      { y: null, m: null, q: "", note: "军中打擂台从来不去，嫌吵", card: true },
      { y: 757, m: 10, q: "D", note: "由闵方城越过程序纳为教官，狄元恪去问而无果" },
    ] },
];
