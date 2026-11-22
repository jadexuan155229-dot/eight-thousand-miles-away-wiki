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
  // 不译者：体貌之选角注「东亚人种吐蕃类型」、轶事中「以现在的话来说是抑郁」（作者第一轮所定）。
  // 作者审后（2026-11-22）：偶像加注薛直身份；随身物件之文物出处改为加注照译；轶事一中文改；轶事六英文点明。
  minfangcheng: {
    name: 'Min Fangcheng',
    zi: 'Heng',
    epithet: 'The Golden Body of the Snow Ridge',
    birthplace: 'Ganzhou (Zhangye Commandery), Longyou Circuit',
    profile: {
      官职身份: 'He rose from keeping the army’s horse herds. Commander of the First Regiment of the Rank-Breaker Corps, and the core of the Corps’ fighting strength.',
      体貌特征: 'A square face with clean, strongly modelled features; thin lips and high cheekbones. His skin is somewhat dark. Tall, and of a fairly sturdy build.',
      性格: 'Stern and cold, loyal, trustworthy and sparing of words, with sharp instincts. He has long since taken order into himself, and holds himself down without knowing it. His manner is a little wooden and far away; he is deaf to flirtation and goes his own way. He does things solidly, with no tricks, and rarely feels his way into others. He seems to contend for nothing, is respected, and appears not to care how others see him; in truth he cares most of all, and has the most to contend for, the most to hold on to. Underneath lies a plain, unworked innocence, like the world when chaos first parted. As the Analects has it: “Firm, resolute, plain and slow of speech: such a man is close to humaneness.”',
      偶像: 'Xue Zhi, the late former Commander of the Cangyun Army.',
      武学: 'The Iron-Bone Mantle: overbearing, steadfast and weighty. He also had guidance from Wang Bukong, and so came into his own.',
      随身物件: 'A ring-pommel modao (long blade); a black jade plaque, a birthday gift from Guan Shan one year; a pair of earrings he has worn since childhood (the artefact: turquoise-inlaid gold earrings excavated from a Northern Wei tomb at Zhaike, Guyuan, Ningxia).',
      喜好: 'The stewed mutton in town; herding horses alone, or crouching by the lake to watch the fish; watching Guan Yue at the forge.',
      专擅: 'Training, keeping and doctoring horses.',
    },
    anecdotes: [
      'Tall and imposing, solidly built, but not especially burly. In battle he fights with tremendous ferocity; back in camp he goes quietly to help Jing Huishi of the Women’s Guard Corps with her work, and does whatever she says.',
      'Orphaned young, he drifted into the lands within the passes. He was born on the frontier where Tang and Tibetan peoples lived side by side, and has fine, open features. He always wears a copper ornament in one earlobe. Perhaps it was a custom of the frontier peoples, but he remembers none of that.',
      'In Guangwu he was taken in by a lone old man, and later saw him decently to his grave.',
      'He is dull on one very practical point: the shock and trembling so many of his comrades feel on first killing an enemy are, in him, very faint.',
      'He never had a real education and has little grasp of how people work; his head holds few ready-made ideas, and held fewer still when he was young. Too lazy for the ways of the world, he often seems prickly and aloof, and no one dares come near him. But he cares for his men. Once, when armies joined to relieve the frontier and the time came after victory to settle rewards, each officer set out his merits before the commanding general. Facing the Army Monitor, he said: isn’t it all there to see, what more do I need to say? Just get my men their winter clothing and medicine; the wounded can’t hold out. Then he walked off.',
      'He is drawn to men, and these particular tastes and inclinations also set him apart. Others in the camp see nothing special in him, but he himself finds it hard to be at ease. He avoids physical contact as far as he can; even letting the army physician near him is a strain.',
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
  // 程凯：T1 工作译文（2026-11-22），译注与待审见 docs/chengkai-translation-review.md。
  // 轶事第九条（序号 8）「（按：作者隐喻——……金乌……）」：原写 false 不译；作者审后（2026-11-22）改为英文简述其隐喻。
  chengkai: {
    name: 'Cheng Kai',
    zi: 'Ziyang',
    hao: 'Zhijie Hall',
    birthplace: 'Luoyang, Duji Circuit (ancestral home: Dong’e, Jizhou)',
    gloss: '“A-Yang” was the childhood name his birth mother gave him; he kept the yang 阳 for himself.',
    profile: {
      官职身份: 'Before the war, deputy general of the Heavenly Bow Corps of the Tiance Command, known as “General Ziyang”; married Arashikawa Kumo in the autumn of 752. After the war he returned to the Command at rank 4a2, Senior Commandant of Light Chariots and General of Robust Valour, serving as its Drill Commissioner and stationed in the Zhijie Hall, which is why everyone in the Command also calls him “Zhijie Hall”.',
      体貌特征: 'When he first entered the Command he was thin, yet could draw a strong bow, and looked dangerous. Later he set out to build up his strength and muscle, running a long way up the mountain every day to chop a great deal of firewood and carry it back, and gradually filled out.',
      性格: 'On the whole, the bright, optimistic sort. Brave, but afraid of heights; fierce, and quick to cry. Stubborn, with a fierce will to win and a strong need to possess and control; in matters of the heart he frets over gain and loss. He is afraid of being alone: one moment a lone wolf, the next a puppy wagging its tail. For all that he wants to win, his pride does not show much; if anything he can be a little eager to please.',
      偶像: 'Ma Yuan (“A man should die in the wilds of the frontier and come home wrapped in a horse’s hide” / “the years press upon me”) and Huang Zhong.',
      武学: 'Bow and spear. An archer such as the world seldom sees, yet he trained in Ironclad Discipline, which guards the body better than Proud-Blood Battle Spirit. It was Yang Ning who made him see this, and it later saved his life.',
      随身物件: 'A bow named Cangqi, “keeping the implement”: the Book of Changes says, “The duke shoots a hawk on top of a high wall; he takes it; nothing is unfavourable,” and the Master comments, “The gentleman keeps his implement about him and waits for the moment to act; how could anything be unfavourable?” A bracelet of his mother’s, inlaid with turquoise, which he later gave to Arashikawa. A cloth Arashikawa gave him, brought from Japan and painted with a pattern of blue sea waves, and a seashell, an ornament she had carried across the sea. Through the years of war, these were what he held on to.',
      喜好: 'Cakes and sweets, milk; lifting weights?',
      专擅: 'Archery. The finest bow in the Command.',
    },
    anecdotes: [
      'From a family of veteran generals, descended from Cheng Zhijie, Duke of Lu. But he was not of the main line, nor even a concubine’s son: he was born of a singing girl from the entertainment quarters, whom Cheng Guang raped. Left to drift, he was picked up and brought back, but the household could never truly accept him. Some years later he was falsely accused of theft at home and had nowhere left to stay; knowing his gift for riding and archery, he went to the Tiance Command. At the entrance trial he did not give his full name, and said it only once he had passed: to have got in on the strength of a famous martial house would have galled him. Yet he could never cast off his own name either, and so he was always pulled two ways.',
      'He contends for everything, and is stubborn. Being the descendant of a great house, he feels, has nothing to do with him; only what he wins is his own. Put more harshly, he craves great deeds and glory. He likes to test himself against others in every way, and when he was young he did it all the time: after a win he would be overjoyed and want to show it off, and then find that Arashikawa Kumo had not been watching. (Perhaps this is where he differs from Lian Shuo: at its core, Lian Shuo’s will to win is not for others to see, while a good part of his is, the urge to prove something.)',
      'He has a strong need for control, but not over other people; he does not treat everyone as a rival or an imagined enemy. What matters to him is being able to master what he believes he ought to master, and if he is kept from stepping in at such moments he grows very irritable. He has a good sense of the larger picture: when someone else is stronger than he is at a given moment and could make the whole thing go better, he is glad to give all his strength in support.',
      'He is the kind who charges upward. As a small child he was once dangled out of a window by one arm, and his mother was abused; he could never let go of the sight and sound of it, so that afterwards, on any height, he grew dizzy and weak at the knees. Yet when it came to practising qinggong, the art of lightness, or climbing the pole to seize the flag in camp, he never once held back. Twice he fell badly, until the general above him heard of it and ordered him not to force himself any more.',
      'He is careless of small things, but understanding comes to him in odd places: he wants to know, for instance, what the horse he has ridden for years is thinking.',
      'He does not fear death, but he hopes to live long, and very much wants his soldier’s life to last. Among his comrades and friends he is one of the few who talk about, and sketch out, what they will be like when they are old. Army life holds much pain, pain of a particular sharpness, but he believes it is the only place where he can make his own worth real; without it he would truly have nothing, and so when he woke from grave wounds he fought as if for his life to drag himself back. He had once worshipped certain old generals, and longed to stand white-haired and long-bearded in armour before the lines; but from the fall of the Command onward he carried wounds and illness that never healed, and only at forty-seven, gravely ill, did he, or rather was he forced to, slowly make peace with himself: with his name, his family, his fate.',
      'He does not get on with his family, yet in temperament he is in fact most like his birth father. Later, in the Command, the hall he kept was the Zhijie Hall, and he did everything he could for the younger generation of the family.',
      'In the winter of 755 the An Lushan Rebellion broke out. The Tiance Command held out under siege until the early spring of the following year, and Cheng Kai fell in battle. The remnants of the Command had to withdraw, and Arashikawa Kumo withdrew with them; heartbroken, she made her way at length to the Cangyun Army and resolved never to return. She did not know that the physicians had later brought Cheng Kai back, sparing nothing; gravely wounded as he was, he lived, and went back to the battlefield. The two did not meet again until 762, when the Eastern Capital was retaken and Arashikawa Kumo returned to Luoyang.',
      'An author’s metaphor. Wanling Manor has a strengthening skill called “Golden Crow Falling” (jinwu wenzhui 金乌闻坠). The golden crow is the three-legged bird that lives in the sun and stands for the sun itself, and it was the golden crows that the archer Yi shot down from the sky. Cheng Kai’s courtesy name, Ziyang, holds yang 阳, the sun, and his nature burns as hot. It is as if in some earlier life he had been one of those crows brought down by Yi’s arrows: and so he bears a name of the sun, and spends his whole life entangled with the bow.',
      'In 752, before their wedding, he and Arashikawa Kumo strolled through the Southern Market of Luoyang. With three throws of her darts she won a dove cart, and he carried it off like a treasure, crouching beside a tea stall to play with it by himself, showing the children who gathered round how to open and close its wings and roll the glass marbles, and calling them into the shade of a tree so they would not stand in the sun. The children called him uncle. He looked up at Arashikawa: “Chuan’er, they called me uncle!” Three years of war followed, and the Command was all but emptied. When he woke and still could not rise, he asked Wei Qian to pick a moment to go to the old barracks and look for the little cart for him. It was the only private errand, with nothing to do with the war, that he ever sent Wei Qian on, and Li Tingshen could not help scolding him a little for it. Wei Qian actually found it, grey with dust, and carried it back wrapped in a cloth, cupped in his hands as though it were alive. Cheng Kai, lying on his couch, turned his head and only gazed at it, lost in thought.',
    ],
    highlight: [
      'Early on, he took first place in the Command’s exercises (see the episode with Arashikawa at Tong Pass).',
      'The first time he felt himself to be a “soldier” was when his column was ambushed on the march in the northwest and the man beside him fell with an arrow in him. Thinking back later, he realized his first reaction had not been to see to his fallen comrade but to nock an arrow at once and shoot the enemy dead, and only then to look.',
      'In the fighting in the northwest, when the Tang army was for a time put to flight, he held the rear and shot back the pursuers for four hours without pause, until his fingertips split and blood ran down to his elbows. That was when he first made a name.',
      'During the war: when the Command was in peril, wounded himself, he held the hospital camp by sheer force and was run through the chest with a blade, which left him with a weakness of the lungs.',
      'During the war: riding out alone to challenge a Langya officer, he won back Shen Hanying’s jade pendant.',
      'During the war: on the northern plain, two arrows drove back the wolf riders. One split the great banner; the other killed their commander’s war-wolf.',
      'During the war, under Li Guangbi: to win back his post and the men’s confidence, with no support and without using the Command’s troops, he stormed and took a Langya camp halfway up a mountain, held by twice his own numbers.',
    ],
  },
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
  // 陆羽鸣：T1 工作译文（2026-11-22），译注与待审见 docs/luyuming-translation-review.md。
  // 不译：训诂末句「739年大光明寺事变中『身死』实为失踪，故卒年不著，从 Notion 库。」（数据按语）。
  luyuming: {
    name: 'Lu Yuming',
    birthplace: 'The Western Regions (of the exiled Sasanian royal house of Persia)',
    gloss: 'رخ (Rukh): Persian for “face, countenance”, used in poetry for a beautiful face. It is also the white-feathered roc of myth, said to be enormous, white-plumed, feeding on elephants and of matchless strength, perhaps going back to the divine bird of ancient Persia, the Simurgh; the chess word “rook” comes from it too.',
    profile: {
      官职身份: 'One of the senior brothers in charge under the “Shadow Moon” banner, master of the arts of assassination; Lu Wanyue’s master. He came to grief in the Great Bright Temple Incident of 739. Both Lu Wanyue and Arashikawa Kumo believed Gao Qian had killed him on the spot; in fact he survived, and remained in the Central Plains for sixteen years, until in 756 he and Lu Wanyue met again at the house outside Chang’an.',
      体貌特征: '',
      性格: 'Noble and languid, a little careless and a little haughty; he does not like to be bound by form, but on what matters he is especially serious and thoughtful. Young and precocious, with a faith of perfect sincerity, he could debate scripture and doctrine with the elders of the order, yet when it came to putting things into practice he was still rather green. Where the order’s future and the next generation were concerned he had a sense of mission and duty, and at such times he was a hot-blooded young man.',
      偶像: '',
      武学: 'The “Shadow Moon” arts of assassination.',
      随身物件: '',
      喜好: 'Playing hide-and-seek with Lu Wanyue: hiding in the fork of a tree, masking his breath, lying up there at ease with his mind empty, watching the little girl tiptoe round and round below, looking for him.',
      专擅: 'He speaks Chinese very precisely and beautifully: he once caught hold of a merchant from Chang’an and learned from him, until he sounded hardly different from the official speech. The order’s people spoke Chinese rather stiffly, so Lu Wanyue found her master’s way of speaking a little odd, and only understood years later, when she truly came to Chang’an in the Central Plains.',
    },
    anecdotes: [
      'Family origins: descended from the exiled Sasanian royal house of Persia. In the second year of Yonghui (651) the Arabs invaded and the Sasanian state survived in name only. The Persian king Peroz twice sent envoys to the Tang asking for help, in vain (654); in the Longshuo era the Tang set up the Persian Area Command at Zaranj (661) and made Peroz its Area Commander (663); in the first year of Shangyuan (674), hard pressed by the Arabs, Peroz came to Chang’an, and the royal kin, nobles and clergy either went with him or were scattered across the Western Regions. Among the royal kin who followed the king and travelled between Chang’an and the Western Regions were his grandfathers’ and fathers’ generations, who had long been on good terms with Lu Weilou, both within the Zoroastrian faith and in trade. Further back, at the founding of the state: Ardashir I, who revived Persia and founded the Sasanian dynasty (the second Persian empire), came of a hereditary line of Zoroastrian priests. His grandfather Sasan was a priest of the temple of Anahita, and the dynasty took its name from him; his father Pabag was lord of the city of Istakhr; and before he rose in arms he had served Artabanus V, the last Parthian king, as governor of Fars (from about 208).',
      'Told to be Lu Wanyue’s master, he glanced at her lazily and said: this small? But when he actually taught her the martial arts he was exacting, with very high standards, and when his pupil fell short he would grow anxious: never angry, but you could feel the edge of it, his patience slowly draining away. When Lu Nanxin saw this he would tease him: forgotten now who said she was too small? And his way of saying sorry was to go over, crouch down and pat her head. Lu Wanyue always remembers the feel of it.',
      'Hiding in the tree during their games, he would look up to the west, towards where he came from, and his face would turn a little melancholy. Persia had fallen; he had never seen it in its glory, and knew only that his people had met with disaster and taken shelter in the land of the Tang. So he admired the Tang empire itself, its strength and its peace; and his elders often spoke of Chang’an, so he longed for it too.',
      'The order thought his generation still too young and had not sent them to Chang’an, but he asked to go. Before the Great Bright Temple Incident, the planning and troop movements of the Tiance Command, Shaolin and the Lingxue Pavilion were kept deeply secret, yet he still found signs of them around a post-station inn, and even worked his way to the place where the Tiance generals were meeting. But by then it was too late. Arashikawa’s hearing was extremely sharp; knowing she was no match for him, she kept up the chase regardless, and with the Lingxue Pavilion as a second safeguard, he came to grief.',
      'He had a kind of insight and experience beyond the ordinary. In his last glance, for no reason he knew, he saw something of Lu Wanyue in Arashikawa’s face: for a moment he thought of what his little pupil would be like when she grew up, perhaps with just that look, sharp and refusing to give in. He read both Arashikawa’s hatred and her hesitation, and with that distant likeness, for a moment the thought came to him of saving her.',
    ],
  },
  lunanxin: { name: 'Lu Nanxin' }, // 陆南信
  // 陆晚月：T1 工作译文（2026-11-22），译注与待审见 docs/luyuming-translation-review.md（与陆羽鸣同册）。
  luwanyue: {
    name: 'Lu Wanyue',
    hao: 'Little Moon',
    birthplace: 'Kucha Garrison, Anxi Grand Protectorate',
    gloss: 'مهتاب (Mahtāb): “moonlight”, from māh (moon) and tāb (radiance, shining); in Persian literature it often describes clear, soft moonlight.',
    profile: {
      官职身份: 'A follower of the Mingjiao’s “Shadow Moon” branch; she became a young assassin in 740, and from 742 served in the assassins’ squad led by Lu Yin. She came from a family of Hu merchants, private traders working the route between Kucha and the Yumen Pass in pearls and jade, spices, brocades and horses; the daughter of Rādīn and Royā. She later became the partner of Tang Zhe of the Tang Clan, and they had twins, Tang Xi and Tang Xu.',
      体貌特征: '',
      性格: '',
      偶像: '',
      武学: 'Mingjiao martial arts. She joined the order in 736 and was taught by Lu Yuming.',
      随身物件: '',
      喜好: '',
      专擅: '',
    },
    anecdotes: [
      'She always remembers the feel of her master crouching down to pat her head; Lu Nanxin was always feeding her frost sugar. The order’s people spoke Chinese rather stiffly, and so her master’s precise, lovely way of speaking it seemed a little odd to her; only years later, in Chang’an, did she understand.',
      'In 741 she first met Arashikawa Kumo in a lone fortress town in the Western Regions. In 742 they met again at Longmen, where she saw her master’s Sasanian agate seal on Arashikawa; the two fought fiercely, and afterwards, talking, learned some clues about the night her master died. In 745 they met again while investigating the Hongyi Order’s Devil’s City at Longmen. In 756, when Tong Pass fell, she rescued Arashikawa Kumo from Tong Pass and took her to the outskirts of Chang’an, where she had set up a house, and there she found her master again, who had remained in the Central Plains for sixteen years.',
    ],
  },
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
  // 岚川云：T1 工作译文（2026-11-22），译注与待审见 docs/lanchuanyun-translation-review.md。
  // 不译：训诂后半「（另一说……两说并存，俟作者定。）」（待定之按）。
  // 作者审后（2026-11-22）：删轶事「晕血」一条（中英俱删）；高光第一条作者按改为英文说明其人物定位。
  lanchuanyun: {
    name: 'Arashikawa Kumo',
    zi: 'Qianhe (Chizuru, ‘a thousand cranes’)',
    alt: [['中文读法', 'Lanchuan Yun']],
    birthplace: 'Nara, Japan; grew up in Chang’an',
    gloss: 'Her given name means “cloud”, so the crane (he 鹤) answers it; and Chizuru, “a thousand cranes”, is also a Japanese woman’s name, hence the choice.',
    profile: {
      官职身份: 'In the Tiance Command she held the title of Battalion Commander, in charge of the scouts (made Chief of Scouts in 747, training the scouts newly admitted to the Command), responsible for selecting and training men and for part of the intelligence work; married Cheng Kai in 752. In the ninth month of 757 she went into self-imposed exile in the north with the Cangyun Army, where, on Min Fangcheng’s report to the Commander, she served as an instructor in the Rank-Breaker Corps. In 762 she returned to the Command at rank 5b2, Commandant of Cavalry and Gentleman-General Who Has Turned to Virtue.',
      体貌特征: 'Her features could be called delicate, but her voice is low and flat, even a little artless, and the contrast when she opens her mouth is striking.',
      性格: 'Quiet and reserved, resilient and decisive. She has her share of the will to excel, but never contends too hard with others; she has her own logic for how things are done. Her face is often too serious and stiff, rather cold, hard to approach; in fact she is reasonable and understanding, and not rigid in the least. As a soldier she naturally keeps the rules, but she is neutral good, with something of a liberal streak, wishing that everyone could have what they set out to pursue; when she wants to help someone, morality and discipline hardly constrain her thinking at all. A lone wolf, much absorbed in her own world; she thinks herself cold-hearted, but her feelings run deep, and she holds on hard to the past. She says little, is careful, listens well, and does not judge. Blow after blow (her mother’s death, her adoptive brother’s suicide, her father’s death from illness, the bloody fighting for the Command) has turned her ever more inward; she is easily embarrassed, and does not want anyone to see her at a loss.',
      偶像: 'None. If pressed, she often thinks of her adoptive elder brother Ahui: a childhood hero worship, of a kind.',
      武学: 'Proud-Blood Battle Spirit. Her family had a spear manual, the Seven Probes, Coiled Snake method, and she fights with the spear; she also excels at qinggong and close-quarters grappling, and her short-blade and dagger work is rare in the Cangyun Army. Left-handed.',
      随身物件: 'A Japanese short blade with a fish-skin grip that belonged to her adoptive brother Ahui, who died young; Cheng Kai’s archer’s thumb ring, and the leather hand guards he gave her at the hunt in her first year at the Command.',
      喜好: 'Fish, prawns and crabs: grumbling about the bother all the while, she quietly picks the meat out with a crab leg, using the shell as a bowl, and will not start until she has picked one crab clean and saved up a full bowl. Reading the Book of Songs, which her parents often recited when they first taught her Chinese. Watching the maple leaves on the hill behind.',
      专擅: 'Gathering intelligence, interrogation, teaching close-quarters grappling. A gift for languages: Japanese is her mother tongue, Chinese her first foreign language and Persian her second, and she once went with an embassy to the Western Regions as a special agent in foreign affairs; on the campaign against Nanzhao at Heilong she quickly picked up a little Miao, and after a spell at Yanmen Pass she could follow most of what the Xi people said.',
    },
    anecdotes: [
      'Disaster struck her family, and she lost her parents young. In Chang’an she had seen the women soldiers of the Tiance Command and looked up to them; and she thought that had she been strong enough, like them, she could have protected her parents and brother, and they would not have been abused by those Mingjiao fanatics. So she joined the army, in anger and grievance.',
      'Her father, Arashikawa Yasuhiko, was a Japanese student sent to the Tang, a fellow student of Chao Heng (Abe no Nakamaro), and the family were friends with Chao Heng; he died of illness in Chang’an in 747. Her mother, Zhao Yingzhen, whose family lived in Changshan Commandery and descended from the Han Marquis of Shunping, died in the ninth month of 736 when Mingjiao followers stirred up trouble in the streets of Chang’an. Her maternal grandfather, Zhao Tingzhi, had also come from the Tiance Command; early in 756, when Changshan fell in the war, the old man dug out his old armour, put it on to protect the townspeople, and died in the fighting. The armour was later recovered by Cen Han, Du Zheng and others of the Changge School (of Li Tingze’s circle) and left in the keeping of the Cangyun Army; in the winter of 757 Arashikawa Kumo received it at Cangyun from Min Fangcheng. Arashikawa is of mixed blood, neither wholly Japanese nor wholly Han, and her sense of who she is has always been somewhat confused; only then did she come to know herself as the descendant of loyal men who stood by the state in its peril, and to know all the more that the Tiance Command was where she belonged, that her first choice had not been wrong.',
      'She is a skilled fighter and very sure of her abilities, at her best in violent clashes, yet she never clashes with anyone. Outside training she does not compete with others at all. She never goes to the army’s ring bouts: too noisy.',
      'She is easily embarrassed, and afraid of losing face or showing that she does not know. When she was young, at a hunt in the hills, Cheng Kai rode up to point out that her upper body leaned too far when she shot from the saddle, and she was embarrassed about it for a long time. On the drill ground she often watched Cheng Kai’s trick archery of every kind, silently and on the sly, but would never practise in front of him herself.',
      'A lone wolf, or selfish, if you like: she thinks of herself first. At the Command she was trained from the start as a scout or assassin, and the training was brutal. Once she had come into her own she was often sent out to spy or to work undercover, and won merit many times, but seldom at the front, so the army never heard her name. As a girl she saw her family and her brother leave her one after another, and so grew into someone who keeps to herself, all the more as time went on; it is easy to feel that whatever one gives her meets no answer. Things were often rough going between her and Cheng Kai, and in truth she herself was the biggest stumbling block.',
      'She takes things too far, and does not spare herself either. After the Tiance Command fell and Cheng Kai “died”, she would rather go north of Yanmen alone than ever again turn towards Luoyang, and so lost five or six years for nothing.',
      'She says little but listens and understands well; she keeps her distance and sees things clearly, but takes no interest in other people’s business, does not listen to gossip, and passes no judgments. That is why she and Min Fangcheng could become friends.',
      'She does not seek to have heirs, but the pain of losing a child at that time did, in the end, become a regret. It was with this in mind, too, that she later took in Kyōya at the Command.',
    ],
    highlight: [
      'In the story she is an observer and a witness: her character comes through in conversation and in her dealings with others, so in principle she is given no highlights of her own.',
      'Her view of the feud between the Tiance Command and the Mingjiao.',
      'Investigating the theft of army horses, pregnant and heedless of herself, she got clear when set upon by many and even took one of them alive for questioning; from this the Langya intelligence network at Tong Pass was traced.',
      'Fighting with the Cangyun Army in the Battle of Luoyang, seeing a comrade gravely wounded, she threw aside the Cangyun shield-and-blade, took a long spear from an enemy’s hands, and went into the ranks as though there were no one there.',
    ],
  },
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
