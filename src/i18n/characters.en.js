// Translation overlay only: never merge into or mutate wiki-data.js.
// Unresolved readings and editorial decisions: docs/lvdingyi-translation-review.md.
// Review notes are deliberately not imported into the public profile.
//
// Every field is optional and falls back to the Chinese on its own, so a character can be
// translated in stages (name first, then profile rows, then anecdotes):
//   name, zi, hao, epithet, birthplace     strings
//   gloss                                  { passages: [{ work, section, quote }], explanation } or a string
//   names                                  { 汉名: '…' } — English for a Chinese-script entry of c.names
//                                          (Latin-script entries such as 本名 Rukh are used as they are)
//   alt                                    [[label, value]] shown in English only (岚川云: 中文读法 Lanchuan Yun)
//   profile                                { 官职身份: '…', … } keyed by the Chinese row label
//   anecdotes, highlight                   arrays aligned with the Chinese by index; null = not yet,
//                                          false = deliberately left untranslated and hidden in English
//
// Author's notes (asides written for herself, casting notes, "in today's terms" glosses,
// artefact references) are not translated (author, 2026-11-22). Inside a profile row, leave
// the note out of the English; a whole anecdote that is such a note gets false.
// Each translated field is stamped with a hash of its Chinese source (src/i18n/stamps.json,
// npm run i18n:stamp). When the Chinese changes, check-data reports the English as stale.
export const charactersEn = {
  lvdingyi: {
    name: 'Lü Dingyi',
    zi: 'Yaoxian (爻先)',
    // An interpretive subtitle, not a translation of a verified classical quotation.
    epithet: "The Weight of a Clerk's Pen",
    birthplace: 'Fengzhou (Jiuyuan Commandery), Guannei Circuit',
    gloss: {
      passages: [
        { work: 'Book of Documents', section: '“Yi and Ji”', quote: '“The phoenixes came in stately bearing (yi 儀).”' },
        { work: 'Book of Changes', section: '“Jian”', quote: '“Top nine: the wild goose gradually advances to the land; its feathers may be used for ceremonial adornment (yi 儀).”' },
        { work: 'Original Meaning', section: 'Zhu Xi', quote: '“The top nine is at the highest point, beyond the positions of humankind.”' },
      ],
      explanation: '“Top nine” is the name of the uppermost line (yao 爻) in the outer trigram. The courtesy name joins yao 爻 with xian 先, echoing yi 儀 in his given name.',
    },
    profile: {
      官职身份: 'Former commander of the Third Regiment. Descended from the Lü clan of Jiuyuan, he shares a lineage with Lü Bu, Marquis of Wen. As a young man he worked as a clerk at Middle Shouxiang City, gaining some recognition for his handling of grain distribution at Wuyuan. In 737 he joined the Xuanjia Army as an aide to the military strategist, helping to prepare official papers, registers and reports, draft correspondence, and coordinate the accounts. He later took charge of military administration and strategy on the front line.',
      体貌特征: 'Tall and wiry, spare and resolute, with an austere, sharply defined frame. He has been prone to illness since childhood. A knee injury left him with recurring rheumatic aches and bone pain. In 746 he took a poisoned needle meant for Min Fangcheng; the lingering poison damaged his heart, leaving him subject to palpitations and tightness in the chest when tired or angered.',
      性格: 'Reserved and distant, he does not make friends easily. His calligraphy has a spare, striking elegance; his temperament is rigorous and orderly. Exacting with himself and others, he comes close to perfection in all he does. He prefers to keep his family out of public view.',
      偶像: '', // Source is blank; do not invent an influence.
      武学: 'In his early years, blocking force head-on and striking hard often cost him dearly. After his knee injury in 738, he began turning his focus inward. His technique came to favor coiling force and close, short hooks: lean but powerful, like a withered vine with a shadow hanging from it, like dead wood holding spring within. Just as his strength seems spent, a turn of the hand brings another killing stroke; the coiling pressure never lets go. His slight build and sharply unconventional technique give him a style all his own among Cangyun’s heavy, forceful shield-and-blade arts.',
      随身物件: 'A longevity-thread charm for a child.',
      喜好: 'After battle, when the troops have returned to camp, he finds an open space neither too near nor too far away and plays a reed pipe (bili). The sound is desolate and lingering, as though offering comfort, or asking after someone.',
      专擅: 'Keeping military registers, allocating provisions, and organizing grain distribution in frontier towns. He reads maps and understands battle formations, judging when to advance and when to withdraw in sand-table exercises.',
    },
  },
  // ---- 人名、表字：拼音初稿（2026-11-22，pypinyin 出稿，读音按作者所取 id 核过；待定者见 docs/names-draft.md） ----
  minfangcheng: { name: 'Min Fangcheng', zi: 'Heng' }, // 闵方城
  diyuanke: { name: 'Di Yuanke', zi: 'Zhiwei' }, // 狄元恪
  luowenbi: { name: 'Luo Wenbi', zi: 'Jingshan' }, // 骆文璧
  lifei: { name: 'Lifei Chenglie', zi: 'Wugong' }, // 荔非承烈
  jinchenbai: { name: 'Jin Chenbai', zi: 'Lingyun' }, // 靳沉白
  xuechu: { name: 'Xue Chu', zi: 'Jitao' }, // 薛褚
  qiuhong: { name: 'Qiu Hong', zi: 'Xianlu' }, // 邱鸿
  fanzhang: { name: 'Fan Zhang', zi: 'Dingshi' }, // 樊璋
  guanyue: { name: 'Guan Yue', zi: 'Ziling' }, // 关岳
  jinghuishi: { name: 'Jing Huishi', zi: 'Chunyi' }, // 景惠时
  guanshan: { name: 'Guan Shan', zi: 'Renshi' }, // 关山
  lianshuo: { name: 'Lian Shuo', zi: 'Zhihui' }, // 连朔
  biansaiyuan: { name: 'Bian Saiyuan', zi: 'Sheheng' }, // 边赛远
  rujin: { name: 'Ru Jin', zi: 'Qixiang' }, // 茹锦
  louyi: { name: 'Lou Yi', zi: 'Zhengu' }, // 楼谊
  louqiao: { name: 'Lou Qiao', zi: 'Jianwang' }, // 楼谯
  liaoqun: { name: 'Liao Qun', zi: 'Yingzhong' }, // 廖群
  lvxichun: { name: 'Lü Xichun', zi: 'Yuanying' }, // 吕希纯
  louhao: { name: 'Lou Hao', zi: 'Subi' }, // 楼皓
  guanhuai: { name: 'Guan Huai' }, // 关槐
  lubingyu: { name: 'Lu Bingyu', zi: 'Zhisong' }, // 卢秉毓
  liurong: { name: 'Liu Rong', zi: 'Rong' }, // 柳戎
  liuguan: { name: 'Liu Guan', zi: 'Yuanyi' }, // 柳贯
  rendijian: { name: 'Ren Dijian' }, // 任迪简
  guanyu: { name: 'Guan Yu' }, // 关榆
  cenhan: { name: 'Cen Han', zi: 'Fangyin' }, // 岑菡
  duzheng: { name: 'Du Zheng', zi: 'Wenqing' }, // 杜徵
  litingze: { name: 'Li Tingze', zi: 'Runfu' }, // 李庭泽
  yujia: { name: 'Yu Jia', zi: 'Lubin' }, // 虞嘉
  bailin: { name: 'Bai Lin', zi: 'Qishang' }, // 白霖
  chengqian: { name: 'Cheng Qian', zi: 'Sizheng' }, // 程骞
  chengkai: { name: 'Cheng Kai', zi: 'Ziyang' }, // 程凯
  qisheng: { name: 'Qi Sheng', zi: 'Guangming' }, // 齐晟
  chengfeng: { name: 'Cheng Feng', zi: 'Lüduan' }, // 程锋
  weiqian: { name: 'Wei Qian', zi: 'Siyi' }, // 魏谦
  xiangjing: { name: 'Xiang Jing', zi: 'Yangjie' }, // 项旌
  mayi: { name: 'Ma Yi', zi: 'Tunan' }, // 马翊
  chengyu: { name: 'Cheng Yu', zi: 'Zhenluo' }, // 程宇
  chengzhao: { name: 'Cheng Zhao', zi: 'Gulian' }, // 程钊
  chengduo: { name: 'Cheng Duo', zi: 'Mingzhi' }, // 程铎
  chengjun: { name: 'Cheng Jun', zi: 'Weizhen' }, // 程钧
  chengguang: { name: 'Cheng Guang', zi: 'Qianli' }, // 程广
  chenruihe: { name: 'Chen Ruihe', zi: 'Xinchu' }, // 陈瑞和
  xiamingcang: { name: 'Xia Mingcang' }, // 夏明沧
  xuezhi: { name: 'Xue Zhi' }, // 薛直
  xuejian: { name: 'Xue Jian' }, // 薛坚
  qinhui: { name: 'Qin Hui' }, // 秦徽
  zswq: { name: 'Zhangsun Wangqing' }, // 长孙忘情
  wbk: { name: 'Wang Bukong' }, // 王不空
  litingshen: { name: 'Li Tingshen', zi: 'Hongjuan' }, // 李庭深
  luweilou: { name: 'Lu Weilou' }, // 陆危楼
  luyuming: { name: 'Lu Yuming' }, // 陆羽鸣
  lunanxin: { name: 'Lu Nanxin' }, // 陆南信
  luwanyue: { name: 'Lu Wanyue' }, // 陆晚月
  luling: { name: 'Lu Ling' }, // 陆灵
  luyin: { name: 'Lu Yin' }, // 陆隐
  luxiao: { name: 'Lu Xiao' }, // 陆晓
  tangxu: { name: 'Tang Xu' }, // 唐煦
  tangzhe: { name: 'Tang Zhe', zi: 'Zhuwei' }, // 唐哲
  tangxuan: { name: 'Tang Xuan', zi: 'Jizhi' }, // 唐玄
  tangqi: { name: 'Tang Qi', zi: 'Sujun' }, // 唐绮
  tangchi: { name: 'Tang Chi', zi: 'Yousheng' }, // 唐篪
  tangxia: { name: 'Tang Xia', zi: 'Baihe' }, // 唐遐
  tangqingyang: { name: 'Tang Qingyang' }, // 唐青阳
  tangxi: { name: 'Tang Xi' }, // 唐熙
  mengping: { name: 'Meng Ping' }, // 蒙萍
  duanshao: { name: 'Duan Shao', zi: 'Kuishi' }, // 段韶
  zhuhongqu: { name: 'Zhu Hongqu', zi: 'Fuxiang' }, // 祝红蕖
  zhulu: { name: 'Zhu Lu', zi: 'Wanting' }, // 朱鹭
  cenquan: { name: 'Cen Quan', zi: 'Jingyuan' }, // 岑荃
  pengyansi: { name: 'Peng Yansi' }, // 彭延思
  chutang: { name: 'Chu Tang', zi: 'Nianyuan' }, // 楚棠
  wangji: { name: 'Wang Ji', zi: 'Zhenyu' }, // 汪楫
  pengshilu: { name: 'Peng Huan', zi: 'Chengmu' }, // 彭涣
  leiyin: { name: 'Lei Yin', zi: 'Junxiang' }, // 雷殷
  shenhanying: { name: 'Shen Hanying', zi: 'Canrong' }, // 沈含英
  xuqiusheng: { name: 'Xu Qiusheng', zi: 'Wenzhan' }, // 许秋生
  jiangli: { name: 'Jiang Li', zi: 'Zhihua' }, // 江蓠
  daoyong: { name: 'Daoyong' }, // 道永
  huimu: { name: 'Huimu' }, // 慧木
  yetiandeng: { name: 'Ye Tiandeng', zi: 'Zhao' }, // 叶添灯
  yeboqiu: { name: 'Ye Boqiu' }, // 叶泊秋
  peiyuan: { name: 'Pei Yuan' }, // 裴元
  gaoyuan: { name: 'Gao Yuan', zi: 'Huaiqing' }, // 高垣
  gaoqian: { name: 'Gao Qian', zi: 'Digu' }, // 高堑
  xuanyang: { name: 'Xuan Yang', zi: 'Youyin' }, // 宣杨
  xuankang: { name: 'Xuan Kang', zi: 'Shuliang' }, // 宣康
  mujin: { name: 'Mu Jin', zi: 'Xingbei' }, // 穆津
  yeshuxi: { name: 'Ye Shuxi', zi: 'Qingran' }, // 叶曙兮
  yechen: { name: 'Ye Chen' }, // 叶忱
  ranqiongru: { name: 'Ran Qiongru', zi: 'Shuxia' }, // 冉琼如
  yanmi: { name: 'Yan Mi', zi: 'Zhimiao' }, // 颜弥
  litingyun: { name: 'Li Tingyun', zi: 'Sixun' }, // 李庭沄
  mengxueying: { name: 'Meng Xueying' }, // 孟雪萦
  lihanping: { name: 'Li Hanping', zi: 'Yanzhou' }, // 李翰屏
  lihanxin: { name: 'Li Hanxin', zi: 'Yanxuan' }, // 李翰昕
  zhaoyingzhen: { name: 'Zhao Yingzhen' }, // 赵盈贞
  zhaotingzhi: { name: 'Zhao Tingzhi' }, // 赵廷之
  // ---- 2026-11-22 第二轮：作者定（波斯音译名、苗人用本名；日本人物用日语读法；单名、他族名） ----
  langdien: { name: 'Rādīn' }, // 朗迪恩
  luya: { name: 'Royā' }, // 鲁雅
  maneili: { name: 'Māneli' }, // 玛奈丽
  geli: { name: 'Golī' }, // 歌莉
  nuolangqi: { name: 'Nof Langb Chib' }, // 诺朗齐
  naliu: { name: 'Nax Liuf' }, // 娜留
  peiliu: { name: 'Pet Liuf' }, // 佩留
  yangxin: { name: 'Vangb Xenb' }, // 央馨
  manran: { name: 'Mait Rangs' }, // 曼冉
  niya: { name: 'Nyax Vos' }, // 尼亚
  zhuowo: { name: 'Zhod Vos' }, // 卓沃
  mangwo: { name: 'Mangx Vos' }, // 芒沃
  niuwo: { name: 'Hniub Vos' }, // 纽沃
  caiyao: { name: 'Ncaik Ya' }, // 彩瑶
  lanchuanyun: { name: 'Arashikawa Kumo', zi: 'Qianhe', alt: [['中文读法', 'Lanchuan Yun']] }, // 岚川云
  jingyan: { name: 'Arashikawa Yasuhiko' }, // 岚川靖彦
  linyeshi: { name: 'Hayashi Kyōya' }, // 林叶矢
  haruyama: { name: 'Haruyama Haruka', zi: 'Mianshu (Nemugi)', names: { 汉名: 'Fang Yao' } }, // 春山遥
  ahui: { name: 'Ahui' }, // 阿辉
  mokun: { name: 'Mokun' }, // 墨昆
  ahuilang: { name: 'Ahui Lang' }, // 阿会朗
  helan: { name: 'He Lan', zi: 'Guxin' }, // 贺兰
  qutuzhen: { name: 'Qutu Zhen' }, // 屈突真
  tongsu: { name: 'Tongsu' }, // 彤素
  lizhu: { name: 'Lizhu' }, // 离朱
};
export const characterTranslation = (locale, id) => locale === 'en' ? charactersEn[id] ?? null : null;
