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
  // 闵方城：T1 工作译文（2026-11-22），译注与待审见 docs/minfangcheng-translation-review.md。
  // 不译者（作者第一轮所定）：体貌之选角注「东亚人种吐蕃类型」、随身物件之文物出处、轶事中「以现在的话来说是抑郁」。
  minfangcheng: {
    name: 'Min Fangcheng',
    zi: 'Heng',
    epithet: 'The Golden Body of the Snow Ridge',
    birthplace: 'Ganzhou (Zhangye Commandery), Longyou Circuit',
    profile: {
      官职身份: 'He rose from keeping the army’s horse herds. Commander of the First Regiment of the Rank-Breaker Corps, and the core of the Corps’ fighting strength.',
      体貌特征: 'A square face with clean, strongly modelled features; thin lips and high cheekbones. His skin is somewhat dark. Tall, and of a fairly sturdy build.',
      性格: 'Stern and cold, loyal, trustworthy and sparing of words, with sharp instincts. He has long since taken order into himself, and holds himself down without knowing it. His manner is a little wooden and far away; he is deaf to flirtation and goes his own way. He does things solidly, with no tricks, and rarely feels his way into others. He seems to contend for nothing, is respected, and appears not to care how others see him; in truth he cares most of all, and has the most to contend for, the most to hold on to. Underneath lies a plain, unworked innocence, like the world when chaos first parted. As the Analects has it: “Firm, resolute, plain and slow of speech: such a man is close to humaneness.”',
      偶像: 'Xue Zhi.',
      武学: 'The Iron-Bone Mantle: overbearing, steadfast and weighty. He also had guidance from Wang Bukong, and so came into his own.',
      随身物件: 'A ring-pommel modao (long blade); a black jade plaque, a birthday gift from Guan Shan one year; a pair of earrings he has worn since childhood.',
      喜好: 'The stewed mutton in town; herding horses alone, or crouching by the lake to watch the fish; watching Guan Yue at the forge.',
      专擅: 'Training, keeping and doctoring horses.',
    },
    anecdotes: [
      'The tallest of the soldiers in the stories. Solidly built, but not especially burly. In battle he fights with tremendous ferocity; back in camp he goes quietly to help Jing Huishi of the Women’s Guard Corps with her work, and does whatever she says.',
      'Orphaned young, he drifted into the lands within the passes. He was born on the frontier where Tang and Tibetan peoples lived side by side, and has fine, open features. He always wears a copper ornament in one earlobe. Perhaps it was a custom of the frontier peoples, but he remembers none of that.',
      'In Guangwu he was taken in by a lone old man, and later saw him decently to his grave.',
      'He is dull on one very practical point: the shock and trembling so many of his comrades feel on first killing an enemy are, in him, very faint.',
      'He never had a real education and has little grasp of how people work; his head holds few ready-made ideas, and held fewer still when he was young. Too lazy for the ways of the world, he often seems prickly and aloof, and no one dares come near him. But he cares for his men. Once, when armies joined to relieve the frontier and the time came after victory to settle rewards, each officer set out his merits before the commanding general. Facing the Army Monitor, he said: isn’t it all there to see, what more do I need to say? Just get my men their winter clothing and medicine; the wounded can’t hold out. Then he walked off.',
      'His particular tastes and inclinations also set him apart. Others in the camp see nothing special in him, but he himself finds it hard to be at ease. He avoids physical contact as far as he can; even letting the army physician near him is a strain.',
      'He goes his own way, a child of nature. But a general is a general, and he is somewhat aware of how he appears: his unsmiling manner is seven parts real, three parts put on. Left undisturbed, he could stay by Snow-Mirror Lake indefinitely, crouching on the shore to watch the fish all day, or lying in the grass.',
      'A man who carries a great blade, whose letters are a shambles, yet who can feel music and philosophy. The sort who secretly writes down frontier tunes he has heard and liked: tunes heard in the army, say, when the troops were feasted. And Yanmen, a pass the northern peoples come and go through, always has songs passing along it. He can barely write, but he can notate a tune, its pitches and its long and short notes. Among the military reports and papers on his desk you might turn up a score; now and then he even hums a few bars. When Du Zheng came to the Cangyun Army and happened to see one, he played from it, heard where the note lengths or the rhythm had been written down wrong, told him so, and taught him how to notate them.',
      'He values horses more than himself. When a foal or a lamb is born he is overjoyed; it is when his face is at its most open. Soon after he joined the army, timber was being hauled in from beyond the pass when a sled jammed and overturned on a downhill slope, about to crash into the horse train ahead, with consequences no one could bear to think of. He threw himself on it and held it with his bare hands, was dragged a long way, and at one point was knocked senseless against a tree.',
      'His temper is not good, but he is clear-headed and keeps one thing apart from another. Long settled in one place, he can be stubborn and wary of outsiders, and at first he was very much on his guard against Arashikawa. But when he saw how outstanding her close-quarters grappling was, a skill the army had few of, he took it upon himself to report it to the Commander and have her brought into the camp as an instructor.',
      'He feels toward Xue Zhi the gratitude of a man who was recognized. Perhaps he does not so much revere the man himself as miss that whole time. But two things hold: Xue Zhi was the one who recognized him, the patron of his life; and looking at Xue Zhi, his heart would stir in kinship, though if you had shown him the words for that, he would not have understood them. After Xue Zhi fell in battle he kept Xue Zhi’s warhorse for more than ten years; later, after blow upon blow, the last straw was the death of that horse. And so he came to think of leaving the world.',
      'He loved Guan Shan, loved him deeply, and had fantasies of a particular kind about him; it was with Guan Shan that he first knew what he was drawn to. A boy’s first stirring that lasted the rest of his life. When he was young and bullied for being silent and slow, it was Guan Shan who got him out of it. Later, to save Guan Shan, he once suffered a terrible humiliation, and let no one know. Afterwards, honouring Guan Shan’s last wishes, he looked after his widow Jing Huishi and his younger cousin Guan Yue, ready to give his life to protect them, unchanging for more than ten years. Yet when Guan Yue in turn showed concern for him, he would always push it away, saying he was not worth it.',
      'For many years, in truth, he never properly accepted the deaths of Xue Zhi and Guan Shan.',
      'He does not know how to put feelings into words, and shuts himself away. When grief came, all he could do was go and kneel before the stele at the Shrine of Li Mu; the only one who ever spoke his long-held feelings aloud for him was Arashikawa, the “outsider”. He often felt that for himself nothing more could be done, but he wanted others to be well: as when he kept telling Arashikawa, out of nowhere, you’ll go back, you must go back, and was still saying it when his wounds had brought him near to death.',
      'At the Battle of Luoyang he sought only death, yet he was sheltered by Cheng Kai’s eldest brother and brought back alive. Waking, his mind in turmoil and not knowing what to do with himself, he hurried back from Luoyang to Yanmen. After that, against all expectation, came two years of tenderness. In 765 he invited Arashikawa and Cheng Kai to drink the New Year wine; after the Lantern Festival, on the sixteenth day of the first month, he died in his sleep.',
    ],
    highlight: [
      'After the Battle of Yanmen Pass, insulted in front of the battle line, he did not change countenance: he went into the enemy ranks, cut down their general and took the standard, his modao driving through to the bone, then cut off the head and hurled it into their ranks. The savagery of it broke men’s nerve, and it made his name.',
    ],
  },
  diyuanke: { name: 'Di Yuanke', zi: 'Zhiwei', epithet: 'Washed in Snow, Holding the Scales', hao: 'the Gentleman from Taiyuan' }, // 狄元恪
  luowenbi: { name: 'Luo Wenbi', zi: 'Jingshan' }, // 骆文璧
  lifei: { name: 'Lifei Chenglie', zi: 'Wugong', epithet: 'The White-Browed Tiger Holds the Pass' }, // 荔非承烈
  jinchenbai: { name: 'Jin Chenbai', zi: 'Lingyun', epithet: 'The Hermit of the Barren Mountain' }, // 靳沉白
  xuechu: { name: 'Xue Chu', zi: 'Jitao', epithet: 'Sheathed in the Armoury' }, // 薛褚
  qiuhong: { name: 'Qiu Hong', zi: 'Xianlu', epithet: 'Enshrining Bones, Lighting Lamps', hao: 'the Fair One of the North · Jade Blade-and-Shield' }, // 邱鸿
  fanzhang: { name: 'Fan Zhang', zi: 'Dingshi' }, // 樊璋
  guanyue: { name: 'Guan Yue', zi: 'Ziling', epithet: 'Gathering the Voices of Ten Thousand Mountains' }, // 关岳
  jinghuishi: { name: 'Jing Huishi', zi: 'Chunyi' }, // 景惠时
  guanshan: { name: 'Guan Shan', zi: 'Renshi' }, // 关山
  lianshuo: { name: 'Lian Shuo', zi: 'Zhihui', epithet: 'One Feather, a Hook in the Heart' }, // 连朔
  biansaiyuan: { name: 'Bian Saiyuan', zi: 'Sheheng' }, // 边赛远
  rujin: { name: 'Ru Jin', zi: 'Qixiang' }, // 茹锦
  louyi: { name: 'Lou Yi', zi: 'Zhengu', hao: 'Lord of the Tower · the Tower Officer' }, // 楼谊
  louqiao: { name: 'Lou Qiao', zi: 'Jianwang' }, // 楼谯
  liaoqun: { name: 'Liao Qun', zi: 'Yingzhong' }, // 廖群
  lvxichun: { name: 'Lü Xichun', zi: 'Yuanying' }, // 吕希纯
  louhao: { name: 'Lou Hao', zi: 'Subi' }, // 楼皓
  guanhuai: { name: 'Guan Huai' }, // 关槐
  lubingyu: { name: 'Lu Bingyu', zi: 'Zhisong', hao: 'Forge Mountain' }, // 卢秉毓
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
  chengkai: { name: 'Cheng Kai', zi: 'Ziyang', hao: 'Zhijie Hall' }, // 程凯
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
  wbk: { name: 'Wang Bukong', hao: 'the buddha' }, // 王不空
  litingshen: { name: 'Li Tingshen', zi: 'Hongjuan' }, // 李庭深
  luweilou: { name: 'Lu Weilou' }, // 陆危楼
  luyuming: { name: 'Lu Yuming' }, // 陆羽鸣
  lunanxin: { name: 'Lu Nanxin' }, // 陆南信
  luwanyue: { name: 'Lu Wanyue', hao: 'Little Moon' }, // 陆晚月
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
  wangji: { name: 'Wang Ji', zi: 'Zhenyu', hao: 'Master Mudboat' }, // 汪楫
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
  gaoyuan: { name: 'Gao Yuan', zi: 'Huaiqing', epithet: 'Split the Stone: Green Within', hao: 'the Inquisitor' }, // 高垣
  gaoqian: { name: 'Gao Qian', zi: 'Digu', epithet: 'Moss on the Bones of the Earth' }, // 高堑
  xuanyang: { name: 'Xuan Yang', zi: 'Youyin', epithet: 'The Hawk Comes Down from the Mountain', hao: 'Huaiqing (her master’s name)' }, // 宣杨
  xuankang: { name: 'Xuan Kang', zi: 'Shuliang', epithet: 'Grain to Eat, a Bridge to Cross' }, // 宣康
  mujin: { name: 'Mu Jin', zi: 'Xingbei', epithet: 'The Ford Across the River of Heaven' }, // 穆津
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
  // 称号 epithet、别号 hao：2026-11-22 T0 工作稿，待作者审（docs/t0-review.md）
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
  lanchuanyun: { name: 'Arashikawa Kumo', zi: 'Qianhe (Chizuru, ‘a thousand cranes’)', alt: [['中文读法', 'Lanchuan Yun']] }, // 岚川云
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
