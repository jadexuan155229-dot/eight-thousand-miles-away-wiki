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
//   alt                                    [[label, value]] shown in English only (none at present)
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
      'His temper is not good, but he is clear-headed and keeps one thing apart from another. Long settled in one place, he can be stubborn and wary of outsiders, and at first he was very much on his guard against Lanchuan. But when he saw how outstanding her close-quarters grappling was, a skill the army had few of, he took it upon himself to report it to the Commander and have her brought into the camp as an instructor.',
      'He feels toward Xue Zhi the gratitude of a man who was recognized. Perhaps he does not so much revere the man himself as miss that whole time. But two things hold: Xue Zhi was the one who recognized him, the patron of his life; and looking at Xue Zhi, his heart would stir in kinship, though if you had shown him the words for that, he would not have understood them. After Xue Zhi fell in battle he kept Xue Zhi’s warhorse for more than ten years; later, after blow upon blow, the last straw was the death of that horse. And so he came to think of leaving the world.',
      'He loved Guan Shan, loved him deeply, and had fantasies of a particular kind about him; it was with Guan Shan that he first knew what he was drawn to. A boy’s first stirring that lasted the rest of his life. When he was young and bullied for being silent and slow, it was Guan Shan who got him out of it. Later, to save Guan Shan, he once suffered a terrible humiliation, and let no one know. Afterwards, honouring Guan Shan’s last wishes, he looked after his widow Jing Huishi and his younger cousin Guan Yue, ready to give his life to protect them, unchanging for more than ten years. Yet when Guan Yue in turn showed concern for him, he would always push it away, saying he was not worth it.',
      'For many years, in truth, he never properly accepted the deaths of Xue Zhi and Guan Shan.',
      'He does not know how to put feelings into words, and shuts himself away. When grief came, all he could do was go and kneel before the stele at the Shrine of Li Mu; the only one who ever spoke his long-held feelings aloud for him was Lanchuan, the “outsider”. He often felt that for himself nothing more could be done, but he wanted others to be well: as when he kept telling Lanchuan, out of nowhere, you’ll go back, you must go back, and was still saying it when his wounds had brought him near to death.',
      'At the Battle of Luoyang he sought only death, yet he was sheltered by Cheng Kai’s eldest brother and brought back alive. Waking, his mind in turmoil and not knowing what to do with himself, he hurried back from Luoyang to Yanmen. After that, against all expectation, came two years of tenderness. In 765 he invited Lanchuan and Cheng Kai to drink the New Year wine; after the Lantern Festival, on the sixteenth day of the first month, he died in his sleep.',
    ],
    highlight: [
      'After the Battle of Yanmen Pass, insulted in front of the battle line, he did not change countenance: he went into the enemy ranks, cut down their general and took the standard, his modao driving through to the bone, then cut off the head and hurled it into their ranks. The savagery of it broke men’s nerve, and it made his name.',
    ],
  },
  diyuanke: {
    name: 'Di Yuanke',
    zi: 'Zhiwei',
    epithet: 'Washed in Snow, Holding the Scales',
    hao: 'the Gentleman from Taiyuan',
    birthplace: 'Bingzhou (Taiyuan Prefecture, the Northern Capital), Hedong Circuit',
    gloss: 'Ke 恪 is “reverence” (Book of Songs, “Hymns of Shang · Na”, with the Mao commentary; Erya, “Explaining Words”), and wei 威 answers it from the Analects (“Yao yue”), where the gentleman with robe and cap set straight is looked on with awe, commanding but not fierce: together, a grave, upright, proud bearing.',
    profile: {
      '官职身份': 'Current commander of the Second Regiment. Of a great Taiyuan family, of the generation of Di Renjie’s great-grandsons, sinicised Qiang by descent. His eldest brother Yuanshen is an official; he himself entered the army through the yin protection privilege, came up through the Taiyuan garrison, and arrived already seasoned, with merit to his name. In the defence of Taiyuan he was one of the Commanders of the city’s defence, in charge of a stretch of the walls, and also of mobile relief and convoy escort; for his merit in the defence in 757 he was summoned to the Cangyun Army as an officer in waiting, and in the tenth month of that year was parachuted in as commander of the Second Regiment.',
      '体貌特征': 'Trained in mounted fighting, he has grown ever taller and more strongly built.',
      '性格': 'Grave, upright, proud. His family’s way does not prize empty talk; he is versed in all six arts, learned enough for the examinations and skilled at examination prose, yet likes martial arts rather better. Strict in rule and order, unafraid in danger and turmoil. When the fighting was fiercest he went days without coming down from the walls, his men caked in dust and blood and utterly spent, and still his bearing was orderly and composed.',
      '武学': 'He fights with the cavalry lance, and on foot with a ring-pommel blade. The lance is an art of the old aristocratic houses: heavy cavalry with the lance must master the horse’s momentum, the length of the charge, the balance of the shaft and the weight of the thrust, so that on horseback back, hips, arms and weapon almost form one line. Only after joining the Cangyun Army did he begin shield-and-blade, reading through all the manuals and working through them like set exercises, until in martial terms he became the Cangyun Army’s textbook case.',
      '随身物件': 'On his desk, a small thing from the sea: a little coral paperweight or a conch shell, which after his marriage in 760 came into his baggage by way of Fan Zhang; he recognised where it came from and did not throw it away, but set it on the desk, among all the heavy, orderly things of an army tent.',
      '喜好': 'Stubbornly growing herbaceous peonies in the harsh climate north of Dai: the peony was the favourite flower of the women soldiers of the old Tiance Command.',
      '专擅': 'Military and administrative paperwork, and the rules and discipline of city defence. Gate control, post relays, the transport of army supplies: he will look into all of it himself and put it in writing, and though his unit is small, its defence, relief and transport work runs in good order.',
    },
  }, // 狄元恪
  luowenbi: { name: 'Luo Wenbi', zi: 'Jingshan' }, // 骆文璧
  lifei: {
    name: 'Lifei Chenglie',
    zi: 'Wugong',
    epithet: 'The White-Browed Tiger Holds the Pass',
    birthplace: 'Ding’an county, Ningzhou, Guannei Circuit',
    gloss: 'Wugong 无功, “without merit”, answers chenglie 承烈, “carrying on the achievement” (lie as “achievement”, Erya), after the Laozi’s “the work done, he does not dwell in it”: a name he gave himself after 745, ashamed to have lived when he had failed to protect the Commander at Yanmen Pass. The “white-browed” of his epithet comes from Wang Wei’s “Song of the Old General”.',
    profile: {
      '官职身份': 'Former commander of the Second Regiment. A Qiang, clan elder brother of the Tang general Lifei Yuanli. At twelve or thirteen he went with post-station convoys as guide and guard; at fifteen or sixteen he was picked as a professional soldier to patrol the county; in 734 he went north with a recruitment levy into the Xuanjia Army at Yanmen. In the tenth month of 757 he lost a challenge bout to Qiu Hong, was badly hurt and retired. The Binzhou affair of 763 gives his nominal year of death: the bones identified at Fengxiang and buried at the Li Mu shrine were in truth another man’s; he himself was saved, withdrew from the world, and became a wandering swordsman of the western frontier again.',
      '体貌特征': 'Strikingly tall and handsome, deep-browed and high-eyed, his skin a little coppery, with something of both Han and Hu in his face. Big-boned and powerful, with superb strength of frame. The tallest of all the soldiers in the story.',
      '性格': 'Impatient of rules and administrative procedure, careless, forever miscounting grain and weapons; yet in the battle line he stills his breath and gathers himself like a hunting tiger or leopard. As a child he saw only chaos: kin and neighbours lined up before officials and hauled off without distinction; the battlefield seemed simple to him by comparison: the enemy in front, the blade in his hand, every advance and retreat with its reason.',
      '武学': 'Quick at the killing arts of shield-and-blade, all great sweeping strokes; none of the soldiers of his intake could stand against him. His fighting is like splitting a mountain with a blade: split it and there is a road; the old hands said he held a blade as if it were an axe.',
      '专擅': 'Finding the way and reading banners, cutting across mountains by short ways, long forced marches under load without tiring; he knows the rules of the passes and the banners and passwords of all the armies.',
    },
  }, // 荔非承烈
  jinchenbai: {
    name: 'Jin Chenbai',
    zi: 'Lingyun',
    epithet: 'The Hermit of the Barren Mountain',
    birthplace: 'Xihe county, Fenzhou, Hedong Circuit',
    gloss: 'From Li Qi’s poem on hearing Dong Da play the Hu reed pipe, where the great waste lies deep under white snow (chenbai, “sunk in white”), and Tao Hongjing’s verse answering what the mountains hold: on the ridges, many white clouds (lingyun, “ridge cloud”).',
    profile: {
      '官职身份': 'Current commander of the Third Regiment. Descended from Jin Qiang, Marquis of Fenyang under the Western Han, of a scholar-gentry family fallen on hard times. In 742 he went north with his father to escape the fighting and entered Yanta Tower, registered as a copyist to draw rations, and so came to know the Lou family; he later joined the Cangyun Army as a clerk under Lü Dingyi. When Lü Dingyi died of wounds and illness in 755, he left only him to act in his place and to attend him at his bedside; afterwards he rose to regimental commander.',
      '性格': 'Gentle and cool, almost without self. He runs his troops on a plain, practical pragmatism close to Zen. No mere clerk with his head down over his writing: he is in fact a good communicator, quick to grasp and read what each person wants. After his predecessor Lü Dingyi was gone, he reproduced almost exactly Lü’s style of documents and his rhythm of march and command.',
      '武学': 'Something of a family tradition. His fighting is fine-grained and thought through; as a martial artist he is a great theorist. His movements are easy and graceful and look slower than other men’s, yet a quick attack cannot break them: it is all turned aside. Sparring at blade and shield with Lü Dingyi, he lost none of the edge of a battlefield weapon, yet had at the same time a quiet, plain, even beautiful quality, every move in measure and in time.',
      '随身物件': 'Always to hand: a military report and a sample administrative document, and an old seal box (once written with and used by Lü Dingyi), even though what it holds is his own army seal.',
      '喜好': 'Continuing the shield-and-blade manuals, sketching little figures to show the direction of each movement; in his tent he hangs, just as it was, the old felt map of Yanmen from Lü Dingyi’s tent in the late Commander’s day, and when rivers or hills change he draws a small map himself, mounts and oils it, and pins it to the edge of the wooden frame at the right place.',
      '专擅': 'Copying and checking documents (in five separate registers: casualties, weapons, provisions, watches and messages); he learned medicine from his father and can set bones.',
    },
  }, // 靳沉白
  xuechu: {
    name: 'Xue Chu',
    zi: 'Jitao',
    epithet: 'Sheathed in the Armoury',
    birthplace: 'Longmen county, Jiangzhou, Hedong Circuit',
    gloss: 'Chu 褚 is “to store away” (Zuozhuan, Duke Xiang, year 30), and tao 韬 a sword’s sheath (Shuowen, with Duan Yucai’s note: by extension anything that wraps and hides): the two answer each other, and suit his post in the armoury.',
    profile: {
      '官职身份': 'Deputy to Lifei Chenglie during his service; after Lifei retired in 757 he asked to go back to the armoury of the Cangyun stronghold, and from then on was a still, deep pool, asking about nothing. A younger kinsman of Xue Zhi, but of a far humbler branch; orphaned early, he entered the Cangyun armoury as a boy to keep and care for the weapons. Out of reverence for the dead, the camp calls him only by his courtesy name and leaves out the Xue: General Jitao.',
      '体貌特征': 'Strongly built and powerful.',
      '性格': 'Steady and silent, careful of speech. Content at the margins, in a supporting place, willing to stay hidden all his life.',
      '武学': 'He trained in Iron-Bone, and counts as Min Fangcheng’s senior. His Iron-Bone is a plain, hard shield with no thorns on the body; he is excellent at leading troops and holding a formation, but his own martial attainment falls short of Min Fangcheng’s, and sparring with him he loses more than he wins.',
      '专擅': 'Keeping, maintaining and repairing weapons; supervising the forge (after 758 Lu Bingyu forged blades under him to atone).',
    },
  }, // 薛褚
  qiuhong: {
    name: 'Qiu Hong',
    zi: 'Xianlu',
    epithet: 'Enshrining Bones, Lighting Lamps',
    hao: 'the Fair One of the North · Jade Blade-and-Shield',
    birthplace: 'Yunzhong county, Yunzhou, Hedong Circuit',
    gloss: 'Xianlu 衔芦, “a reed in the beak”, is the wild goose of the Huainanzi (“Xiuwu xun”, with Gao You’s note) and the Gujin zhu, which flies with a reed in its beak so that the archer’s cord cannot catch its wings. His family is sinicised Xianbei, descended from the early Tang general Qiu Yingqi.',
    profile: {
      '官职身份': 'After the changes of post at the end of 757, deputy to Di Yuanke (deputy of the Second Regiment); Min Fangcheng’s disciple. He lost an arm in Mokun’s raid on the pass in the tenth month of 760 and for a time asked to resign; at the formation exercise of the first month of 761 he at last stood on his own again; in the tenth month of 763 he was readied as commander of the First Regiment (succeeding Min Fangcheng).',
      '体貌特征': 'Clean, handsome brows and eyes, a straight nose, pale lips, a jaw like a cut line. The inner corners of his eyes are a little sharp, the eyes long and narrow, his gaze often like still water sealed under ice, yet with a touch of warm sunlight. His skin is a light ochre tending to a cool white. Tall and straight, shoulder blades flat and tight, waist drawn in. Most Cangyun officers are massive; he alone is finely boned, with a close-knit, exacting air. For his looks and bearing he is called “Jade Blade-and-Shield”.',
      '性格': 'Sensitive, quick of understanding, tenacious, given to reflection, good at rising with the moment. At bottom steady and sincere; he keeps the old Cangyun ways and has made them his own. In his fighting he was born with a kind of “knowing when to stop”: when he could plainly turn the bout, he only pushes the man out, and does not add that last blow.',
      '武学': 'A born Iron-Bone. His inner strength gathers beneath the bone, so that even out of armour he seems armoured; with shield and blade he treads the snow like a wild goose, alert against traps, holding himself steady against the wind. Standing still he is like a sword in its case: upright, unangered, the edge just showing.',
    },
  }, // 邱鸿
  fanzhang: {
    name: 'Fan Zhang',
    zi: 'Dingshi',
    birthplace: 'Yunzhou, Hedong Circuit; later Taiyuan',
    gloss: 'Zhang 璋 is a jade ritual tablet (“half a gui”, Shuowen; the yazhang 牙璋 of Yang Jiong’s “Joining the Army” is the toothed jade tally that sends an army out); in the Zuozhuan Du Yu glosses the “great vessels” of the altars of state as gui and zhang tablets, and elsewhere as bells and ding cauldrons, so ding 鼎 answers zhang.',
    profile: {
      '官职身份': 'Di Yuanke’s retainer: as a boy (in 745, aged seven) he was saved by him at a gate of Taiyuan and taken into his household, and has served at his side ever since; in the army he is his personal guard. In the tenth month of 763 he left Di Yuanke and was readied for transfer as Qiu Hong’s deputy (deputy of the First Regiment).',
      '性格': 'Drifting from place to place as a small child, he did not cry or cower: silent and enduring. When someone tried to take his food he only held it tighter and twisted his whole body away.',
      '武学': 'He began shield-and-blade with Di Yuanke in 757; at the end of 760 Xue Chu and Qiu Hong found that he showed the aptitude for Iron-Bone; at the challenge bouts of the ninth month of 762 he had indeed come into his own; in the fourth month of 764 Min Fangcheng passed his art on to him.',
      '随身物件': 'A dog-tooth pendant left by his mother (in fact the broken buckle of the cord at her waist), of unknown origin, until after he joined the Cangyun Army someone used it to guess at his ancestry: the clash with naturalised Xi in a burned village of Yunzhou was where his family was destroyed.',
    },
  }, // 樊璋
  guanyue: {
    name: 'Guan Yue',
    zi: 'Ziling',
    epithet: 'Gathering the Voices of Ten Thousand Mountains',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'Yue 岳, “high peak”, from the Book of Songs (“Song Gao”: lofty is the peak), and ling 陵, also meaning high and great (Book of the Later Han, “Treatise on the Five Phases”).',
    profile: {
      '官职身份': 'Min Fangcheng’s deputy at headquarters, for many years at his side helping run the army’s affairs. He once went to Taiyuan to take temporary charge of the Cangyun field headquarters there and to look Di Yuanke over. In the tenth month of 763, on Min Fangcheng’s recommendation, he became Deputy Corps Commander of the Rank-Breaker Corps.',
      '体貌特征': 'A northern Han, with a patch of burn scars from the right side of his forehead to the tail of his eyebrow.',
      '性格': 'At bottom kind and easygoing, warm, upright, clear about right and wrong. He makes himself at home with anyone, is quick to react, good at reading faces, adroit. In camp he will also scold the soldiers severely; he is almost Min Fangcheng’s mouth. Now and then he plays with words. He naturally sees through things, especially between people. Grateful for Min Fangcheng’s years of protection and advancement, he will always weigh Min Fangcheng before himself, utterly loyal, ready to sacrifice himself for him. Min Fangcheng never told him what was in his heart, and all his life he never truly understood the man whose steps he followed. He knew it all, and knew there was nothing to be done. Each in this world goes his own way. He may be called the most well-adjusted (and most boring) character among the Cangyun.',
      '武学': 'Mountain-Splitting. Solid, steady groundwork.',
      '喜好': 'Studying smithing and forging: Lu Bingyu taught him to forge blades and to repair arms and armour (a friendship that began with a little private motive of Liu Rong’s, who wanted to find out about Min Fangcheng).',
    },
  }, // 关岳
  jinghuishi: {
    name: 'Jing Huishi',
    zi: 'Chunyi',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'Hui 惠 from the Book of Songs (“Yan Yan”: gentle and kind, good and careful of herself), and chunyi 春沂, “spring by the Yi”, from the Analects (“Xian jin”): bathing in the Yi in late spring, the scene the Master sighed that he would join.',
    profile: {
      '官职身份': 'Army physician. Long at Cangyun, she also helps the head of the Women’s Guard Corps run its affairs and manages the army’s supplies and medicines. At the end of 757 the court honoured her household with the inscription “Integrity and Righteousness”.',
      '体貌特征': 'A northern Han woman, tall and slender, of a well-proportioned, soft grace.',
      '性格': 'Gentle and cultivated, quietly kind and constant, self-giving, meticulous in her work. But there is also in her a real inability to bear loneliness, and a soft-heartedness that loses its head when she cares. Her sense of self is rather small; in feeling she always holds back and keeps things in, and so leaves people the loveliest impression. She also likes a little gossip.',
      '武学': 'While Guan Shan lived she knew she had someone to lean on and did not take martial arts much to heart; after he was gone she thought she must be able to protect herself and to give first aid at the battle line, and Min Fangcheng, when he knew, said nothing, and simply taught her together with Guan Yue.',
      '随身物件': 'The Nineteen Old Poems that Guan Shan copied out for her; she kept those scrolls always.',
      '喜好': 'Reading poetry, above all the Nineteen Old Poems; in idle hours, beadwork and knotting cords; at the Dragon Boat Festival her coloured threads are the finest braided of all.',
      '专擅': 'Treating wounds and training army physicians; the first army physician to pay attention to the signs of soldiers’ psychological wounds: the origin of the idea of healing behind the Quiet Breath medical tent.',
    },
    anecdotes: [
      'Her family practised medicine, and villagers seeking a physician would usually come to her house. It was also for this skill that she followed Guan Shan to Yanmen.',
      'In her early years, her first pregnancy often made her unwell. But one day, with her parents away, a neighbour came begging for help in an emergency, and though she was over eight months along she went with him all the same. The cart jolted, and on the way back she felt something wrong; the birth came early and hard, and the child was stillborn, suffocated. She never bore a child again.',
      'In the old days she and Guan Shan would look after and feed stray little animals they picked up. Guan Shan volunteered to milk the ewe, but he was clumsy at it, and a little afraid besides; and what he feared came to pass: he was kicked head over heels, while she stood by, aching for him and laughing.',
      'She had first meant to settle in Guangwu and make her home a clinic. But Guan Shan passed the Cangyun Army’s selection, and she followed him to the camp, saw the many wounded, learned how short they were of physicians and medicine, and, thinking that Guan Shan might one day be like them, could not rest easy; so she stayed in the Women’s Guard Corps as an army physician.',
      'An honour is an honour; no one knew how lonely and forlorn she was herself. And the young Xi herder (Qutu Zhen) and the few children with him, in a quite natural and simple way, made the withered plum flower, until at last they “had a time together”, and then it ended in tragedy.',
    ],
  }, // 景惠时
  guanshan: {
    name: 'Guan Shan',
    zi: 'Renshi',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'From the Analects (“Yong ye”: the humane delight in mountains) and the Book of Songs (“Jie Nan Shan”: the rocks of the southern hill, towering): ren 仁, humane, and shi 石, stone.',
    profile: {
      '官职身份': 'At his death in the fourth year of Tianbao (745) he was a Company Commander in the camp.',
      '性格': 'Gentle and kindly, not without sharpness, good at sensing others. His concern for people made no distinctions; he had compassion, and dealt fittingly with those above and below. But for the same reason he was easily swayed and could not make up his mind.',
      '喜好': 'Fenyang wine.',
    },
  }, // 关山
  lianshuo: {
    name: 'Lian Shuo',
    zi: 'Zhihui',
    epithet: 'One Feather, a Hook in the Heart',
    birthplace: 'The Xi lands, between the Raole Area Command and Yingzhou',
    gloss: 'Shuo 朔 is the north, and the first day of the month, or dawn; hui 晦 the last day, or night (Shuowen; the Zhuangzi’s morning mushroom that knows nothing of hui and shuo): opposites made to answer, with zhi 知, “knowing”, to speak of his fate. The name Lian Shuo was given by a Langya general and his Han strategist: “Better take the character shuo; it’s like this wind.”',
    profile: {
      '官职身份': 'At his first appearance, a Battalion Commander of the Rank-Breaker Corps (his merit for being first up the wall at Mayi was recorded in 756, and he was promoted in the autumn of 757 while stationed in Hexi). Formerly the adopted son of one of An Lushan’s generals, a surrendered Langya officer; after joining the Cangyun Army he was used and taught by Min Fangcheng.',
      '体貌特征': 'A rather long, thin face, fair skin, thin lips, a high straight nose with a slight hook. Slight of build, at a great disadvantage in close physical contests.',
      '性格': 'Rebellious and suspicious, original in thought, sharp of tongue, not much given to hiding his edge. Very hardworking, competitive and quick, able to bear heavy responsibility, often finding life in danger. But narrow of heart, arrogant and vain, a little highly strung, and so in the end bound to go to extremes. He is also fiercely protective of the weak, and at such times very loyal and generous; perhaps out of something he lived through himself.',
      '武学': 'Mountain-Splitting. Beyond the basic style he stole a little of Lü Dingyi’s art; extremely hardworking, training nearly as hard as Guan Yue once did, and making up for his slight build with technique.',
      '随身物件': 'In one earlobe, an amber and gold earring, long and linked, with gold chain, metal plaques and gems (the artefact: gold earrings excavated from the Northern Wei tombs in the southern suburbs of Datong, Shanxi).',
      '喜好': 'Fine clothes, gold and jade ornaments.',
      '专擅': 'Training birds of prey; handling horses and finding the way, pursuit and raiding on the grasslands.',
    },
  }, // 连朔
  biansaiyuan: {
    name: 'Bian Saiyuan',
    zi: 'Sheheng',
    birthplace: 'Wutai county, Daizhou, Hedong Circuit',
    gloss: 'From Zhang Xie’s “Miscellaneous Poems”, no. 7 (Western Jin), where the poet puts off his rough-gate clothes for a soldier’s tasselled cap: hengmen yi 衡门衣 is commoner’s dress, and sheheng 舍衡, “leaving the rough gate”, tells his story.',
    profile: {
      '官职身份': 'Chief of Scouts, promoted by Lanchuan Yun during her time with the Cangyun Army; in a sense her disciple. His father was a Cangyun soldier; he served two years as attendant to Li Tingze of the Changge School, and after the siege of Changshan was lifted in 756 knelt before the horses to join the Cangyun Army.',
      '体貌特征': 'A northern Han.',
      '性格': 'Obedient, careful, honest, thoughtful. Still young, he sometimes flusters easily and needs encouragement. But in truth his will is firm, and when he really commits himself to a task he usually does it very well. He can be compared with Wei Qian, but he has seen less of the world than Wei Qian, so though he too is clever, his mind is more literal, less nimble.',
      '武学': 'Mountain-Splitting.',
      '喜好': 'Training in qinggong. In a school whose methods are heavy, he is known for being light and quick on his feet, with powerful legs. He looks very quiet, but in fact moves like a hare gone mad: in today’s terms, a parkour and trail runner.',
      '专擅': 'Carrying messages; speed of foot. In the siege of Changshan in 756 he ran a long stretch on his own two legs before he found a horse, and rode to the Eastern Pass to bring word to the Cangyun Army.',
    },
  }, // 边赛远
  rujin: {
    name: 'Ru Jin',
    zi: 'Qixiang',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'The Ru 茹 clan came from the Rouran; the Tang had a Ru Yizhong, of a Yanmen family, Assault-Resisting Commandant of the Jinmen garrison in Guozhou with the rank of General of Loyal Valour, and Ru Jin is of his line.',
    profile: {
      '官职身份': 'The Cangyun Army’s specialist maker of leather armour; taken into the Cangyun Army at sixteen, where she trained in martial arts. Daughter of a hereditary leatherworkers’ household; her parents had become leatherworkers in the rear of the Cangyun camp early on.',
      '性格': 'After the Battle of Yanmen Pass she and her family stripped the clothes and armour from fallen soldiers and remade them for use, without turning a hair; the Cangyun Army could no longer afford to hire craftsmen, and the Ru family would not abandon its trade in a time of danger.',
      '专擅': 'Remaking armour, making good use of leftover material, so that it fits the bodies of women soldiers, even better than before.',
    },
  }, // 茹锦
  louyi: {
    name: 'Lou Yi',
    zi: 'Zhengu',
    hao: 'Lord of the Tower · the Tower Officer',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'From Zhang Heng’s “Rhapsody on the Eastern Capital” (Eastern Han), on holding to right, looking to one’s lord and keeping a constant integrity: yi 谊 and zhengu 贞顾.',
    profile: {
      '官职身份': 'Commander of the defence of Yanta Tower. The Lou family have kept the tower for generations; in the summer of 745 her father Lou Zhun fell from the tower and died in a Langya surprise attack, and at fifteen she took charge in the crisis: lighting the lamps, sending word, mustering the men and setting the watches as usual, and the tower did not fall into disorder. She married an official of the Cui family of Shuozhou.',
      '性格': 'A military-bureaucratic figure. A strong sense of responsibility and of family mission, highly effective. The Lou family, keepers of the tower for generations, are proud and stubborn, and do not ask for help.',
      '专擅': 'Teaching the arts of signalling (lamp signals, flags, the hours for flying kites); helping the camp with surveying and mapping.',
    },
  }, // 楼谊
  louqiao: {
    name: 'Lou Qiao',
    zi: 'Jianwang',
    birthplace: 'Yanmen county, Daizhou, Hedong Circuit',
    gloss: 'Qiao 谯 (also written 樵) is a high tower for watching the enemy (Book of Han, Biography of Zhao Chongguo, with Yan Shigu’s note), so wang 望, “to watch”, answers it, with jian 肩, “shoulder”, for the watch he shouldered at Yanta Tower.',
    profile: {
      '官职身份': 'Promoted deputy to Jin Chenbai of the Third Regiment in 757. Lou Yi’s younger brother, raised in Yanta Tower; at twelve, at the time of the Battle of Yanmen Pass, he flew a kite and looked down on the horror of that battle, and from then on meant truly to join the army and go into battle; later Guan Yue trained him for a while, and he was taken into the Rank-Breaker Corps.',
      '专擅': 'Flying and maintaining kites; riding the kites or working the great crossbows on the tower, he would send up his own side’s signal lanterns or shoot down the enemy’s, winning merit while still very young.',
    },
  }, // 楼谯
  liaoqun: {
    name: 'Liao Qun',
    zi: 'Yingzhong',
    birthplace: 'Tianbao county, Liangzhou (Wuwei Commandery), Longyou Circuit',
    gloss: 'Qun 群 is from qunyu 群玉, the Mountain of Massed Jade of the Mu Tianzi zhuan, and ying 莹 the lustre of jade (Shuowen, with Duan Yucai’s note); the Classic of Mountains and Seas makes Jade Mountain the home of the Queen Mother of the West.',
    profile: {
      '官职身份': 'A Cangyun recruit (joined the camp in 758–759 and trained in Di Yuanke’s Second Regiment). His father, a clerk of the granary office at the Jiaocheng garrison, was killed in Gai Tinglun’s mutiny in the first month of 757; fleeing east with his mother, he was checked and let through by Lian Shuo’s troops stationed at Liangzhou, and with his father’s bronze seal and a fragment of the household register was enrolled as a son of an army household.',
      '体貌特征': 'Lean.',
      '性格': 'One who learns slowly but surely: the peculiar toughness of Hexi people, drilling each movement into his muscles until it becomes second nature.',
      '武学': 'He started from a low base; Di Yuanke’s textbook-correct blade work was in fact the best starting point for him, since he had no habits of his own that needed breaking.',
      '随身物件': 'The bronze seal of the Jiaocheng garrison his father left, and a torn scroll of the family genealogy.',
    },
  }, // 廖群
  lvxichun: {
    name: 'Lü Xichun',
    zi: 'Yuanying',
    birthplace: 'Puzhou (Hezhong Prefecture), Hedong Circuit',
    profile: {
      '官职身份': 'Lü Dingyi’s daughter, born in the spring of 755 and brought up under the protection of the Lü family of Puzhou. Lü Dingyi, leading the army in guerrilla fighting north of Yanmen, never knew of her.',
    },
  }, // 吕希纯
  louhao: { name: 'Lou Hao', zi: 'Subi' }, // 楼皓
  guanhuai: {
    name: 'Guan Huai',
    profile: {
      '官职身份': 'Guan Yue’s son, born in the third month of 765.',
    },
  }, // 关槐
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
      官职身份: 'Before the war, deputy general of the Heavenly Bow Corps of the Tiance Command, known as “General Ziyang”; married Lanchuan Yun in the autumn of 752. After the war he returned to the Command at rank 4a2, Senior Commandant of Light Chariots and General of Robust Valour, serving as its Drill Commissioner and stationed in the Zhijie Hall, which is why everyone in the Command also calls him “Zhijie Hall”.',
      体貌特征: 'When he first entered the Command he was thin, yet could draw a strong bow, and looked dangerous. Later he set out to build up his strength and muscle, running a long way up the mountain every day to chop a great deal of firewood and carry it back, and gradually filled out.',
      性格: 'On the whole, the bright, optimistic sort. Brave, but afraid of heights; fierce, and quick to cry. Stubborn, with a fierce will to win and a strong need to possess and control; in matters of the heart he frets over gain and loss. He is afraid of being alone: one moment a lone wolf, the next a puppy wagging its tail. For all that he wants to win, his pride does not show much; if anything he can be a little eager to please.',
      偶像: 'Ma Yuan (“A man should die in the wilds of the frontier and come home wrapped in a horse’s hide” / “the years press upon me”) and Huang Zhong.',
      武学: 'Bow and spear. An archer such as the world seldom sees, yet he trained in Ironclad Discipline, which guards the body better than Proud-Blood Battle Spirit. It was Yang Ning who made him see this, and it later saved his life.',
      随身物件: 'A bow named Cangqi, “keeping the implement”: the Book of Changes says, “The duke shoots a hawk on top of a high wall; he takes it; nothing is unfavourable,” and the Master comments, “The gentleman keeps his implement about him and waits for the moment to act; how could anything be unfavourable?” A bracelet of his mother’s, inlaid with turquoise, which he later gave to Lanchuan. A cloth Lanchuan gave him, brought from Japan and painted with a pattern of blue sea waves, and a seashell, an ornament she had carried across the sea. Through the years of war, these were what he held on to.',
      喜好: 'Cakes and sweets, milk; lifting weights?',
      专擅: 'Archery. The finest bow in the Command.',
    },
    anecdotes: [
      'From a family of veteran generals, descended from Cheng Zhijie, Duke of Lu. But he was not of the main line, nor even a concubine’s son: he was born of a singing girl from the entertainment quarters, whom Cheng Guang raped. Left to drift, he was picked up and brought back, but the household could never truly accept him. Some years later he was falsely accused of theft at home and had nowhere left to stay; knowing his gift for riding and archery, he went to the Tiance Command. At the entrance trial he did not give his full name, and said it only once he had passed: to have got in on the strength of a famous martial house would have galled him. Yet he could never cast off his own name either, and so he was always pulled two ways.',
      'He contends for everything, and is stubborn. Being the descendant of a great house, he feels, has nothing to do with him; only what he wins is his own. Put more harshly, he craves great deeds and glory. He likes to test himself against others in every way, and when he was young he did it all the time: after a win he would be overjoyed and want to show it off, and then find that Lanchuan Yun had not been watching. (Perhaps this is where he differs from Lian Shuo: at its core, Lian Shuo’s will to win is not for others to see, while a good part of his is, the urge to prove something.)',
      'He has a strong need for control, but not over other people; he does not treat everyone as a rival or an imagined enemy. What matters to him is being able to master what he believes he ought to master, and if he is kept from stepping in at such moments he grows very irritable. He has a good sense of the larger picture: when someone else is stronger than he is at a given moment and could make the whole thing go better, he is glad to give all his strength in support.',
      'He is the kind who charges upward. As a small child he was once dangled out of a window by one arm, and his mother was abused; he could never let go of the sight and sound of it, so that afterwards, on any height, he grew dizzy and weak at the knees. Yet when it came to practising qinggong, the art of lightness, or climbing the pole to seize the flag in camp, he never once held back. Twice he fell badly, until the general above him heard of it and ordered him not to force himself any more.',
      'He is careless of small things, but understanding comes to him in odd places: he wants to know, for instance, what the horse he has ridden for years is thinking.',
      'He does not fear death, but he hopes to live long, and very much wants his soldier’s life to last. Among his comrades and friends he is one of the few who talk about, and sketch out, what they will be like when they are old. Army life holds much pain, pain of a particular sharpness, but he believes it is the only place where he can make his own worth real; without it he would truly have nothing, and so when he woke from grave wounds he fought as if for his life to drag himself back. He had once worshipped certain old generals, and longed to stand white-haired and long-bearded in armour before the lines; but from the fall of the Command onward he carried wounds and illness that never healed, and only at forty-seven, gravely ill, did he, or rather was he forced to, slowly make peace with himself: with his name, his family, his fate.',
      'He does not get on with his family, yet in temperament he is in fact most like his birth father. Later, in the Command, the hall he kept was the Zhijie Hall, and he did everything he could for the younger generation of the family.',
      'In the winter of 755 the An Lushan Rebellion broke out. The Tiance Command held out under siege until the early spring of the following year, and Cheng Kai fell in battle. The remnants of the Command had to withdraw, and Lanchuan Yun withdrew with them; heartbroken, she made her way at length to the Cangyun Army and resolved never to return. She did not know that the physicians had later brought Cheng Kai back, sparing nothing; gravely wounded as he was, he lived, and went back to the battlefield. The two did not meet again until 762, when the Eastern Capital was retaken and Lanchuan Yun returned to Luoyang.',
      'An author’s metaphor. Wanling Manor has a strengthening skill called “Golden Crow Falling” (jinwu wenzhui 金乌闻坠). The golden crow is the three-legged bird that lives in the sun and stands for the sun itself, and it was the golden crows that the archer Yi shot down from the sky. Cheng Kai’s courtesy name, Ziyang, holds yang 阳, the sun, and his nature burns as hot. It is as if in some earlier life he had been one of those crows brought down by Yi’s arrows: and so he bears a name of the sun, and spends his whole life entangled with the bow.',
      'In 752, before their wedding, he and Lanchuan Yun strolled through the Southern Market of Luoyang. With three throws of her darts she won a dove cart, and he carried it off like a treasure, crouching beside a tea stall to play with it by himself, showing the children who gathered round how to open and close its wings and roll the glass marbles, and calling them into the shade of a tree so they would not stand in the sun. The children called him uncle. He looked up at Lanchuan: “Chuan’er, they called me uncle!” Three years of war followed, and the Command was all but emptied. When he woke and still could not rise, he asked Wei Qian to pick a moment to go to the old barracks and look for the little cart for him. It was the only private errand, with nothing to do with the war, that he ever sent Wei Qian on, and Li Tingshen could not help scolding him a little for it. Wei Qian actually found it, grey with dust, and carried it back wrapped in a cloth, cupped in his hands as though it were alive. Cheng Kai, lying on his couch, turned his head and only gazed at it, lost in thought.',
    ],
    highlight: [
      'Early on, he took first place in the Command’s exercises (see the episode with Lanchuan at Tong Pass).',
      'The first time he felt himself to be a “soldier” was when his column was ambushed on the march in the northwest and the man beside him fell with an arrow in him. Thinking back later, he realized his first reaction had not been to see to his fallen comrade but to nock an arrow at once and shoot the enemy dead, and only then to look.',
      'In the fighting in the northwest, when the Tang army was for a time put to flight, he held the rear and shot back the pursuers for four hours without pause, until his fingertips split and blood ran down to his elbows. That was when he first made a name.',
      'During the war: when the Command was in peril, wounded himself, he held the hospital camp by sheer force and was run through the chest with a blade, which left him with a weakness of the lungs.',
      'During the war: riding out alone to challenge a Langya officer, he won back Shen Hanying’s jade pendant.',
      'During the war: on the northern plain, two arrows drove back the wolf riders. One split the great banner; the other killed their commander’s war-wolf.',
      'During the war, under Li Guangbi: to win back his post and the men’s confidence, with no support and without using the Command’s troops, he stormed and took a Langya camp halfway up a mountain, held by twice his own numbers.',
    ],
  },
  qisheng: {
    name: 'Qi Sheng',
    zi: 'Guangming',
    birthplace: 'Tongguan, Huazhou, Guannei Circuit',
    gloss: 'Sheng 晟 is “bright” (Shuowen, among the characters later appended under the sun radical), so guangming 广明, “broad brightness”, answers it.',
    profile: {
      '官职身份': 'Joined the Tiance Command in 749; won merit on the Nanzhao campaigns of 750–752, and before the war was stationed at the Tongguan headquarters in charge of its defence and training. He fell defending Taiyuan in 757, and was posthumously granted the secondary fifth rank, lower grade, as Commandant of Cavalry and Mobile Corps Commander.',
      '体貌特征': 'The tallest and strongest of the Tiance group, yet with a frame out of the ordinary: his strength never cost him his suppleness, and he does the splits and handstands as if he weighed nothing.',
      '性格': 'Warm-hearted, frank and open-handed, hating wrong like an enemy, with a strong sense of honour. Rash and straight, single-minded. In temperament rather like Cheng Kai, the kind who will step in when he sees an injustice on the road, and who likes sparring too; he and Cheng Kai and the others were always happily needling and testing each other. But he is more relaxed, not so set on winning every point, without Cheng Kai’s fierce streak that will spend itself regardless: blunt, but strong.',
      '偶像': 'Not so much an idol as a pang: for those of his own age who gave their lives on the frontier.',
      '武学': 'Proud-Blood Battle Spirit. His spear work is overbearing and hard-driving.',
      '喜好': 'The mutton soup with crumbled flatbread made at home; he can put away a great many bowls.',
      '专擅': 'Prodigious strength, with a signature jarring stroke of the spear that shakes the weapon out of the other man’s grip; raised in a family of acrobats and fire performers, he is master of wrestling, tightrope walking, pole balancing and all the rest.',
    },
    anecdotes: [
      'Long ago his grandfather’s generation came by chance upon some pictures and scores for variety shows, and his father’s generation took it up: a few families of the village ran a troupe of variety, music and dance together, masters of acrobatics and fire shows, even of some small fame, sometimes summoned to perform at the houses of princes and the rich in the capital.',
      'He joined the army out of wounded pride. One Lantern Festival they were performing in the wards and markets of Chang’an, crowds packed below, fiery trees and silver flowers, cheer upon cheer. He had just slid down from the soft pole when he saw an old man standing nearby, his hair and beard white and wild, who came up to him on his stick and said: my son gave his life on the frontier, and he was your age, young sir; was it so that you lot could do tricks? And all at once it went right through him. He had seen how lavish the princes’ houses were, and knew that what he did was in the end an ornament of good times, a plaything: without the good times, if the skin is gone, where will the hair cling? So when he saw the frontier in danger and the Tiance Command’s recruiting notice, he had to go. His family scolded him: generation after generation we have done this, and you alone are too proud to go on, and must go off where men stake their lives? He said that was because they had not seen the old man’s eyes. He could not wait upon his parents at their side; now, going away to win rank and fortune, he would not count as unfilial.',
      'The generals of the Command, seeing his outstanding physique, thought rather highly of him. He for his part cherished being a Tiance man, and, not wanting to be told he had only showy skills, trained hard at force and strength to shake off that flashy softness, and it paid off.',
      'Afraid of snakes, insects, rats and ants. A man that big, and a cricket can drive him with one sudden frog-leap onto a rock, where he crouches not daring to move.',
      'He once fell in love with a Hu girl. Living in a prince’s house in the capital, he saw a woman of the Western Regions, slender and lovely, in soft, flowing clothes, her head and face often wrapped in a silk scarf so that only a pair of very black, very deep eyes showed. Like him she was one of the performers kept by the royal house, there to train the rare beasts sent in tribute from the Western Regions: lions and tigers were like cats in her hands, and at festivals she performed in the palace. They had no language in common, but there was give and take between them, and for a time they performed together, climbing, throwing and catching on the ropes and poles, amid silver flowers and fiery trees, a dazzle of splendour. Close to her he found whip marks on her body, and did not know why. When he joined the army they parted; later came the war, and the retreat to hold Tongguan. The woman came of the Hongyi Order, and in the war worked for the Langya Army, driving wolves against the patrols and slipping into the city to poison it, until Lanchuan Yun caught her; much happened in between, but in the end he could not save her.',
      'In the defence of Tongguan, when labourers were levied to build the works, his father was struck by a falling rock, carried home, and after lying a few days died of his injuries.',
      'After Tongguan fell they fell back to hold Fenghua Valley; when Fenghua Valley fell he was badly wounded, and made his way by stages to Taiyuan, where he gathered comrades into a troop of light horse; Lanchuan Yun came later. They made a surprise attack and killed a Langya general, but having shown their faces they were hunted, and the Cangyun Army sheltered them. The Cangyun Army urged them to change into the black Xuanjia armour for the time being, to lie low; he changed, but unwillingly, and privately let out what was in his heart: in the troupe he himself had sometimes felt that a strapping man seven feet tall, asked what he did, answering “variety shows”, would hardly do. In the end it was the Tiance Command that had given him this dignity, so that people treated him with a measure of respect when he came before them. Now, in danger, was he to throw off this armour?',
    ],
    highlight: [
      'Holding Taiyuan. The assault was fierce, and siege engines that no blade or spear could pierce made straight for the gate. He and Lanchuan Yun cut across and broke the rebel formation, then he wheeled back, dismounted, and putting all his inner strength into it drove his spear through the heavy armour, and the engines collapsed in pieces. He himself went down with an arrow, and was struck by the hammer of a Langya strongman as they surrounded him; his body could not be known by its face, and the only thing left to know him by was the red robe and silver armour.',
    ],
  }, // 齐晟
  chengfeng: {
    name: 'Cheng Feng',
    zi: 'Lüduan',
    birthplace: 'Luoyang, Duji Circuit',
    gloss: 'Feng 锋 is the point of a weapon (Shuowen; Shiming), and also the van of an army (Book of Han, Biography of Qing Bu), so duan 端, “point”, answers it, with lü 履, “to tread”: one who goes before his men, always treading at the front of the army.',
    profile: {
      '官职身份': 'Cheng Guang’s eldest son by his principal wife, Cheng Kai’s eldest brother. He entered the Tiance Command through the yin protection privilege, left after three years for the frontier to serve under his father, and became a veteran general of the north-west. Invested with the secondary third rank, as General of the Cloud-like Flags and Military Protector. He came back when war broke out in the central plains; after the battle of Luoyang in 762 he sent Chen Ruihe to save Min Fangcheng. After Cheng Kai’s death, in 771, he was ordered to Shannan West Circuit to hold Liangzhou and guard the approaches to the capital.',
      '性格': 'Broad-minded, humane and just, thorough and observant, at ease with his station and the order of things, and now and then fond of teasing. Even as a boy he was sensible and kind.',
      '偶像': 'His father.',
      '武学': 'Proud-Blood Battle Spirit. In martial arts and army affairs alike, never found wanting.',
      '喜好': 'Like Cheng Kai, fond of sweet things. His wife is good at cakes, pastries and junkets; you could also say he was lured away by a girl of the Western Regions with a basket of sweets.',
    },
    anecdotes: [
      'When Cheng Kai was little he asked him what he wanted to do for a living, and he said a carpenter. (See Liu Zongyuan’s “Biography of a Carpenter”: he said that the master carpenter carries whole landscapes in his head, knows his materials and directs the workmen, which he understood was really the same as commanding troops; but watching the craftsmen saw and hew and plane, those skills seemed rather more fun. More interesting still, when Cheng Qian later came to the Tiance Command and met young Kyōya, he would watch Kyōya carving wood, lost in it, and in this he took after his father as a boy, though Cheng Feng never knew: he may even have forgotten that as a child he wanted to be a carpenter.)',
      'Many sons of military houses do not want to serve in the same army as their fathers, feeling that the men below will treat them as young masters, and that any merit they win will be put down to their being “a general’s son”, with no one seeing their own ability. He is not so tangled up about it, and often says none of that matters: however far I run, can I deny that I am my father’s son?',
      'When Cheng Kai was first brought home as a small child he was always making trouble; once, in the middle of the night, he was burning with fever and made no sound, and it was Cheng Feng who found him, or his life would have been in danger. When Cheng Kai and their father were at odds, so that old and young were both red in the face, it was mostly he who made the peace; and afterwards he looked after this youngest brother well whenever they met. Later, when Cheng Kai was gravely ill, he offered to take him home to rest and recover, but Cheng Kai would not listen.',
      'Of a line of frontier generals, back in the central plains in the war, he privately did not want his son to suffer the hardships of the frontier again. Cheng Kai knew his mind, and when Cheng Yu came of age gave him the courtesy name Zhenluo, “guarding Luoyang”, wishing that he might always guard Luoyang and no more; but in the end it could not change his fate: in 772 Cheng Yu set out for Beiting, and never came back.',
    ],
  }, // 程锋
  weiqian: {
    name: 'Wei Qian',
    zi: 'Siyi',
    birthplace: 'Youzhou (Fanyang Commandery), Hebei Circuit',
    gloss: 'From the Book of Changes, the hexagram Qian (Modesty): the way of heaven diminishes the full and increases the modest, so siyi 思益, “thinking of increase”, answers qian 谦, “modest”.',
    profile: {
      '官职身份': 'At the time of the secondary seventh rank, upper grade, Commandant Assisting the Standard, leading the scouts in the army under Lanchuan Yun. He fell in the battle of Ye in the third month of 759.',
      '性格': 'Boyish in spirit, lively, ingenious, quick. Of a merchant family, worldly-wise beyond his years.',
      '偶像': 'Nothing to speak of, but he admires Lanchuan Yun deeply, with a vague, half-understood longing too; when Lanchuan Yun was badly wounded at Tongguan he for a time bore a grudge against Cheng Kai.',
      '武学': 'Proud-Blood Battle Spirit. Good with the bow, and with corded weapons such as the rope dart, the meteor hammer and lead-weighted darts.',
      '随身物件': 'The curved blade his close Xi friend gave him.',
      '喜好': 'Game: from hunting to dressing to roasting, he does it all himself.',
      '专擅': 'Riding bareback and judging horses, and the languages of the mixed Hu peoples north of Yan.',
    },
    anecdotes: [
      'His name means “modest”, but proud of his quickness and ability, he has hardly ever been modest.',
      'A scout under Lanchuan Yun. He entered the Command young, and was forever having his head patted by the senior brothers, Cheng Kai first among them; feeling they treated him as a child, he cared a great deal about whether he had grown taller and stronger.',
      'He finds the daily round of the camp a bit dull, and makes a long face at any mention of sentry duty. He likes patrols outside better, above all riding on the northern plain of Mount Beimang; he is especially good at light-cavalry raiding, and keen on going off foraging on his own.',
      'Loyal and true to his friends. Even when the other man is already what his own side defines as a “Hu”, he will do all he can, regardless of being misunderstood and suspected.',
      'A little vain and brash: at first he came to the Tiance Command for its dignity and fame. He used to think that men in the army were all high-hearted and full of ambition, but that not all of them were truly ready to spend themselves for their country; there was no one in the world without self-interest. Later, after years of campaigning, with all he had seen and heard, his heart was steeped in it, and little by little he came to understand.',
    ],
    highlight: [
      '(Third month of 759) The seesaw battle at Ye, fought in blood. Rebel relief came from the north, and the Tang army was attacked front and rear. Out with light horse scouting the enemy, he was cut off and surrounded; knowing he would not live, he got Xiang Jing out to carry the news and fought to the death with his men, holding a rebel column so that it could not advance. Later Cheng Kai, defying orders, took Xiang Jing back to look for him as the army retreated; he was dug out from among the trampled bodies, dead of his wounds and exhaustion.',
    ],
  }, // 魏谦
  xiangjing: {
    name: 'Xiang Jing',
    zi: 'Yangjie',
    birthplace: 'Heyang, Huaizhou, Hebei Circuit',
    gloss: 'Jing 旌 is a banner, or an envoy’s banner of authority; a banner commands the host and must be raised high to be seen, so yang 扬, “to raise”, answers it. In mourning for his father at Heyang at the end of 756, he was capped during mourning, and Li Tingshen chose the courtesy name by letter.',
    profile: {
      '官职身份': 'During the war an Administrator at Li Tingshen’s side, serving as messenger and as clerk and bookkeeper; back at the Command, a Commandant Assisting the Standard of the secondary seventh rank, upper grade, in charge of the guards of all the halls.',
      '性格': 'Careful and mature beyond his years, loyal and plain. Very cautious and proper, obedient and effective. He seems to have no great ambition, no fixed idea that he must win merit in any particular way.',
      '偶像': 'He respects all the generals of the Command.',
      '武学': 'Ironclad Discipline. He only began a year before the war, and his inner method has not yet taken shape; it leans to Ironclad Discipline because he learned that this method better protects his comrades: to do his best in support is good enough for him.',
      '喜好': 'Weaving little animals out of grass: it was how he used to coax his younger brothers and sisters at home.',
      '专擅': 'Driving chariots and handling horses, with an excellent sense of balance; he loves sweeping and tidying and keeps everything in good order: whichever tent he lives in is the best kept in the camp, and asked why, he can’t say.',
    },
    anecdotes: [
      'Of an ordinary family that farmed and studied; he had two years at the village school and can read and write, in a neat hand. The eldest son, rather protective, fond of his younger brothers and sisters. He joined the army because the family was poor; otherwise, he feared, his sister would be sold. He came in plain hemp and coarse cloth, thinking he would never pass the selection, but he drove chariots well, knew how to handle horses and had an excellent sense of balance, and the Command, pressed by its war preparations besides, took him in.',
      'As a recruit on patrol, in idle moments he would pick a few flowers and grasses and weave them into little things, and when the patrol fell in he could not bear to throw them away, so he hung them on his leather belt. Back in camp his Company Commander saw them and scolded him: we are preparing for war with all our hearts, an army of tigers and wolves; where is there time for this sort of thing? I see you don’t know what urgency is. So he was sent to haul stone as punishment. Li Tingshen, then an Administrator, passed by and said: I remember you; your writing is good; how is it you’re hauling stone? He took out the little grass bird. Li Tingshen laughed: never mind, come with me; there are some things to be copied, and no one to do them.',
      'Before the war he was in the strategist’s entourage, and Li Tingshen knew a little of him, so later, in the crisis, he picked him to be at his side. At first, with the camp full of wounded and nothing in any order, whenever Li Tingshen went round the camp he would find some coarse paper, sharpen a stick of charcoal and follow him, recording everything down to the smallest detail, with a look of great devotion.',
      'He only came of age at the end of 756. Wei Qian said that since General Li was his commanding officer, why not ask him to choose a courtesy name, and so Li Tingshen, with due modesty, played the elder for once and chose the two characters Yangjie. (He was then in mourning for his father at Heyang, capped during mourning, and the name was settled by letter.)',
      'Ordinary and never pushing himself forward: that perhaps was also what kept him alive, letting him follow Cheng Kai and Li Tingshen at last back to Luoyang and back to the Command. When he left he was a recruit of not even a year, who did not yet know what the school meant, and after six or seven years his standing was of course another matter. Standing there, his feelings were all mixed: he was a Tiance man, yet he had grown up almost entirely outside the Command, and it was enough to make one sigh.',
      'Later, as a Commandant, he would still stand guard outside Cheng Kai’s bedroom, uneasy to see him so ill.',
    ],
    highlight: [
      'When they fell back to hold one corner of the Command’s city, army supplies were stretched thin. Once officials came with grain, and the escorting officer, seeing him check sack after sack so carefully, called him a busybody; but he firmly stopped the man and held him there, without saying why, until Li Tingshen came back. Only then did he slit open the lower sacks, and what poured out was sand and earth. Caught on the spot, it was all the easier to question and report, and the shortfall was soon made good.',
      'The first time he went into battle, Li Tingshen sent him to bring back the great banner. He was afraid, and made no secret of it, saying to Li Tingshen: Please give the order, General. I am afraid, but if it’s an order, I’ll dare.',
    ],
  }, // 项旌
  mayi: {
    name: 'Ma Yi',
    zi: 'Tunan',
    gloss: 'Yi 翊 is “flying” (Shuowen, feather radical), close in sense to soaring and roaming, so the courtesy name comes from the Zhuangzi’s “Free and Easy Wandering”: only then will it plan for the south, tunan 图南.',
    profile: {
      '官职身份': 'An officer of the Tiance Command. Descended from Ma Yuan, General Who Calms the Waves, who died of illness in the army while campaigning against the peoples of the five streams of Wuling, and from whose mouth comes the phrase “wrapped in a horse’s hide”. In 751–752 he went into Shu with the Tiance Command against Nanzhao, and came to know and love the Wudu woman Ncaik Ya; he fell in battle in 757.',
    },
    anecdotes: [
      'A descendant of Ma Yuan, General Who Calms the Waves, the famous general of the Eastern Han. Senior brother to Cheng Kai and Li Tingshen. (Note: the very man Cheng Kai looks up to is Ma Yuan: “A man should die in the wilds of the frontier and come home wrapped in a horse’s hide”, “the years press upon me”; see the Influences row of his profile.)',
      '“When was I ever afraid he’d get past me? I’m afraid he’ll get past me and not be able to bear it!”',
      '“Go! And tell A-Kai later not to forget it was with me that he trained his Ironclad Discipline!”',
    ],
    highlight: [
      'In the autumn of 757, as the two capitals were being recovered and on the eve of the armies’ muster, Li Tingshen’s camp was surrounded at the foot of the hill by the Langya and could not get out; he went to break the encirclement and was killed (undecided).',
    ],
  }, // 马翊
  chengyu: {
    name: 'Cheng Yu',
    zi: 'Zhenluo',
    birthplace: 'Beiting Grand Protectorate, Tingzhou, Longyou Circuit',
    gloss: 'The courtesy name Zhenluo 镇洛, “guarding Luoyang”, was chosen by Cheng Kai: Cheng Feng, of a line of frontier generals, privately did not want his son to suffer the frontier again, and Cheng Kai, knowing his mind, wished only that he might always guard Luoyang; but it could not change his fate. His Persian name is آسمون (Asemoon), “sky”.',
    profile: {
      '官职身份': 'Cheng Feng’s eldest son, born in an army camp, long with the Tang army learning beside his father. He entered the Tiance Command in 763; in 772, after asking again and again, he was at last allowed to lead a small troop escorting an imperial envoy to Beiting, as Vice Commandant (a post, not an honorary rank). For the next twenty years he never came home: when Beiting fell in 790 he fell back with Yang Xigu to hold Xizhou, and in 792 he fell at Xizhou.',
      '体貌特征': 'Of mixed blood, with deep-set eyes and brows: his mother is of the Mingjiao. Lean but strong, full of energy, very like Cheng Kai when he first entered the Command.',
      '性格': 'Bold and quick to act. Inevitably hasty, yet simple and pure of heart. Very active, but not unable to sit still: sometimes he is lost listening to someone tell stories or watching someone write.',
      '偶像': 'His father and his uncle.',
      '武学': 'Proud-Blood Battle Spirit. Very sharp, steeped in it from childhood.',
      '喜好': 'Polo: he played from childhood with the frontier herders, mostly big strong men, and was toughened by it; he often misses the roast and grilled meats, the butter and Hu flatbread of Beiting, feeling that the central plains’ versions don’t taste right; he can play the pipa: curious about everything, as a child he pestered his mother to teach him, and he is actually not bad.',
      '专擅': 'No one of the younger generation in the Command can match his riding; and when he wins he is puzzled: why didn’t any of you come in and fight for it?',
    },
    anecdotes: [
      'At first, at twelve or thirteen, he ran about in the armour his father wore as a boy, the plume on his helmet nearly sweeping the ground, and sometimes Cheng Kai would catch hold of the plume to tease him.',
      'He came back with his father when war broke out in the central plains; without much on his mind, he has no real homesickness, but often misses the food of Beiting.',
      'When Lanchuan Yun was teaching Kyōya Chinese, or Li Tingshen was writing, he would sit by without a sound (this too Cheng Feng never knew), and he also went to watch Kyōya carve wood, and took on all the heavy work of moving the timber. He and Kyōya were much of an age, one restless and the other very quiet, yet little by little they became friends.',
      'He said he wasn’t homesick, but when he learned that the Tibetans had taken Hexi and Longyou and held all the north-west, he was anxious, and asked again and again to go back to Beiting. At last in 772 he went, and for the next twenty years never came home. When Beiting fell in 790 he fell back with Yang Xigu to hold Xizhou, and in 792 he fell at Xizhou.',
    ],
  }, // 程宇
  chengzhao: { name: 'Cheng Zhao', zi: 'Gulian' }, // 程钊
  chengduo: { name: 'Cheng Duo', zi: 'Mingzhi' }, // 程铎
  chengjun: { name: 'Cheng Jun', zi: 'Weizhen' }, // 程钧
  chengguang: { name: 'Cheng Guang', zi: 'Qianli' }, // 程广
  chenruihe: { name: 'Chen Ruihe', zi: 'Xinchu' }, // 陈瑞和
  xiamingcang: { name: 'Xia Mingcang' }, // 夏明沧
  xuezhi: {
    name: 'Xue Zhi',
    birthplace: 'Jiangzhou (the Xue clan’s home), Hedong Circuit',
    profile: {
      '官职身份': 'The late Commander of the Cangyun Army (the Xuanjia Army). He founded the Xuanjia Army by imperial order; some say that in the beginning he “led the Xue family army into Yanmen Pass”. He fell in the Battle of Yanmen Pass in 745; the emperor laid the blame on him for poor command and docked the Cangyun Army half a year’s pay and provisions, the funeral named no honours at all, and his clan never sent up a memorial asking for them: leaving a name in suspense, and ten years of struggle for the Cangyun Army.',
      '武学': '“Silver spear, fiery horse”: when Di Yuanke rode into the pass in 757, man and horse in armour, with a long lance, the old horse doctor in a daze thought he was seeing Commander Xue of old.',
      '专擅': 'Judging men: he took in Min Fangcheng as a groom, Xue Chu as a weak orphan, kept the Ru family as craftsmen: the Xuanjia Army did not ask where you came from.',
    },
  }, // 薛直
  xuejian: {
    name: 'Xue Jian',
    profile: {
      '官职身份': 'Xue Zhi’s only son (an NPC in the original JX3; born 734, as in the game). Eleven when his father died in the Battle of Yanmen Pass in 745, he insisted on staying with the army, and grew into a somewhat cold, hard, blunt temper. In 755 he went west with the Cangyun Army into Shuofang under Guo Ziyi; when the Cangyun Army went back to Yanmen in the second month of 756 he did not go with it but stayed on Guo Ziyi’s staff, and so entered the Shuofang Army: “out in the army to be tested, winning merit again and again”. After Guo Ziyi was dismissed he passed with the Shuofang Army to Pugu Huai’en; in Huai’en’s rising early in 764, his name on the Shuofang rolls, he was put into the force attacking Yuci, and after Pugu Yang’s death went over with the rest to Guo Ziyi.',
      '武学': 'Shield-and-blade: “All I have to rely on is myself, only the shield and blade in my hands.”',
      '专擅': 'As a child Xue Chu sparred with him to give him his grounding, and Min Fangcheng was ordered to choose and train a horse for him; the two of them were a “quiet alliance” keeping a distant eye on the late Commander’s son.',
    },
    anecdotes: [
      'His first impression of Min Fangcheng was of the soldier who led his father’s horse: the horse well cared for, the man almost wordless, only nodding when they met and saying “Langjun”, the nasal sound of that jun such as only Min Fangcheng made.',
      'When his father fell and the whole army was in mourning white, Min Fangcheng wore no mourning, but brought over the horse he had been ordered to break in beforehand; and then held up a hand target and let him strike it, until he was on his knees, hot sweat mixed with tears and snot: “Better?” “I don’t know.” “Not knowing… won’t matter either.”',
      'Every New Year he went home to make offerings to his father. In the first month of 765, on his way home, he heard that Min Fangcheng had died, and reached Cangyun the next day; Guan Yue led out of the stable a black-green horse, the very image of the one the Commander had once ridden: “Brother Min left word. He said: this is being.”',
    ],
  }, // 薛坚
  qinhui: {
    name: 'Qin Hui',
    profile: {
      '官职身份': 'A woman soldier of the Tiance Command, niece of Qin Yiyan. She came to know Di Yuanke at the joint military exercises of 752; they loved each other, apart, with letters passing between the Northern Capital and the Eastern Capital. In the bloody fighting for the Tiance Command’s city in 756 she broke out with her uncle and died of her wounds (in the second or third month of 756).',
      '武学': 'Mounted archery and cavalry fighting.',
    },
  }, // 秦徽
  zswq: {
    name: 'Zhangsun Wangqing',
    profile: {
      '官职身份': 'Successor to Xue Zhi as Commander of the Cangyun Army. In the third month of 746 she took Min Fangcheng with her to Badao Manor to see the elders of the Zhangsun clan, and obtained grain and funds in aid; during the funeral after the Battle of Yanmen Pass, seeing Ru Jin helping to prepare materials and mend, she stood there a long time, and never again spoke of letting the craftsmen’s households go. After the formation exercise of 761 she said to herself, “Worth it at last.”',
    },
  }, // 长孙忘情
  wbk: {
    name: 'Wang Bukong',
    hao: 'the buddha',
    profile: {
      '官职身份': 'Corps Commander of the Rank-Breaker Corps. At every New Year, when the generals go up to the Li Mu shrine with offerings of wine and dried meat, he often takes the Iron-Bone men separately to burn incense and speaks his own incense vow; soldiers who feel moved change into ordinary clothes and give out gruel to the poor households in the town, which they call “the rain-and-snow ration”.',
      '武学': 'Iron-Bone. Min Fangcheng “also had guidance from Wang Bukong, and so came into his own”: the one who chooses and passes on, in the silent sitting of the ice cellar.',
    },
  }, // 王不空
  litingshen: {
    name: 'Li Tingshen',
    zi: 'Hongjuan',
    birthplace: 'Chang’an, Jingji Circuit',
    gloss: 'Shen 深 is depth and subtlety (Book of Changes, “Xici”: only the deep can understand the will of all under heaven); jun 隽 is rich meat (Shuowen), and by extension talk “rich and long-lasting” (Book of Han, Biography of Kuai Tong) and the finest of the wise (Renwu zhi, on Zhang Liang): so jun answers shen, with hong 弘, “broad”, to widen its depth.',
    profile: {
      '官职身份': 'Before the war an Administrator of the Military Service Section at the side of the strategist Zhu Jianqiu, called “Administrator Li”; after the war, back at the Command, of the principal fourth rank, upper grade, Senior Commandant of Light Chariots and General of Loyal Valour, serving as a Commander in the Tiance Command. After 765 he was often lent to Lingzhou to manage its army; a few years after Cheng Kai was gone he begged leave to retire and went home to care for his old father’s last years. Never once in his life did he follow his own wishes, and yet, of all his comrades in arms, he alone reached high office and was both loyal and filial, and lived long, and died well.',
      '性格': 'Gentle, self-possessed, dignified and grave. Widely learned, prudent and resourceful, “his heart true and deep”. Deeply responsible, with an ambition to help the world at large, caring towards others: the kind of scholar who believes in orthodox Confucianism. But because he weighs too many things he can seem weak and hesitant, lacking in confidence.',
      '偶像': 'Sima Qian (“The brave need not die for honour; the coward who admires righteousness, where would he not strive?”).',
      '武学': 'Proud-Blood Battle Spirit. Of his generation he alone mastered the turning-horse spear thrust.',
      '随身物件': 'An uncarved jade tablet, one of a pair with Li Tingze’s; and a sweat-shirt Jiang Li once mended for him, which he treasured for many years after, studying the stitches. Zhu Lu once happened to see it too; he did not know what to say, and Zhu Lu turned over the embroidery frame in her hands and said: what does it matter? A heart is a thousand threads; who looks only at the back of a piece of embroidery?',
      '喜好': 'Being quietly on his own, reading and writing, thinking his own thoughts or watching others; for some reason he loves plum blossom. He is in fact fond of wine, even a little addicted, and will drink too much, but is ashamed to admit it: especially in the war, under heavy pressure, he wanted moments of release. “Abroad, to serve the high ministers; at home, to serve father and elder brothers; in mourning not to dare be remiss; not to be overcome by wine”: only that last he falls short of.',
      '专擅': 'Superb calligraphy, above all clerical script, full, easy, broad and generous, the kind of good that people of Wanhua Valley all praise (Xu Qiusheng says it is better when he is a little tipsy, but he has never tried it himself and thinks it unreliable); military strategy and formations, and army correspondence.',
    },
    anecdotes: [
      'Descended from the Li of Longxi, a family that had produced generals and chancellors; his father too was a senior civil official in the capital. The eldest son, educated in both letters and arms. Elder brother to Li Tingze, the two of them as close and courteous as twins; he went to school with Lu Bingyu. As a youth he meant to follow in his father’s footsteps, but he and Li Tingze both worshipped Ban Chao, so he was not without a longing for the battlefield; only he lacked martial talent, at least compared with Li Tingze when they drilled at home: perhaps the results were not so different, but he found the training agony, while Li Tingze was at ease. Later Li Tingze pulled him along to try for the Tiance Command, and it was he who got in and Li Tingze who did not. So he often felt that he, the lesser man, had taken what his brother’s heart was set on. Once in the Command his training was always harder, ground at over and over; the results were never poor, but because the process was so hard, or so knotted, he never had any confidence in himself.',
      'Why the Tiance Command chose him and not Li Tingze: when the two brothers tried for it, there were no other children in the family, so the Command had to choose one of the two. When Li Tingshen shot, one arrow inexplicably missed the target, putting him last. Coming down from the range, he made a point of telling the examiner to check the candidates’ arrows more carefully, in case overused arrows with hidden damage were still in the quivers: no knowing when someone might nock one and have it snap in his hand at the first shot, and that would hurt someone. Afterwards, when they went back and checked, the arrow that had missed was the very one with a crack in the shaft, which would go out of control under the strain. He had already packed and was about to leave when someone came from the great hall with word from the generals, and he was kept on.',
      'Though he entered the Command young, before the An Lushan Rebellion he had little front-line experience. Because he was lettered and steady, the strategist often kept him at his side, as a pupil learning strategy and formations; later, as an Administrator, he helped run the army’s correspondence, or served as a guard close to the Commander-in-Chief or the strategist, went to the capital on rotation, guarded the imperial city: in short, he seldom went to war. The Command had a number of men like this, of high birth, whose helmets never touched mud, whose duties were all very respectable, and who were often seen by the great; some of their fellows sneered at them as young-master soldiers, which made it all the harder for him to be at ease with himself.',
      'Under all these influences his opinion of himself is very low. In the war he met Jiang Li, and knowing his own heart, treated her as well as he could in the camp, yet dared not promise anything, and even persuaded her to leave the front: a regret for the rest of his life.',
      'A great drinker. He did not know it himself at first, but drinking with Cheng Kai he would often get Cheng Kai drunk, himself looking all innocence. Only when one birthday everyone egged each other on to ply him with wine did he find out how much he could hold. If you really do hold out until he’s drunk, you’ll find that when he laughs he looks like a Samoyed.',
      'An old friend in the Changge School once invited him to live there in retirement, a place of refinement, playing the qin and discussing poetry, cleansing the heart, and it was what he had longed for as a youth; but he did not go, and went home to care for his old father’s last years.',
      'At Luoyang in the eleventh month of 762, with Lanchuan Yun and Cheng Kai, he tried to keep Di Yuanke to supper.',
      'In a corner of his bedroom is a Buddhist shrine with the Diamond Sutra Daoyong gave him. In the war he once asked Daoyong whether there truly was a Buddha-law that blesses all things; they were sitting in Xu Qiusheng’s medicine shed then, and Daoyong said nothing, only looked out and said: “It’s raining.” As the words left his mouth, rain came pattering down outside the shed. In the war Jiang Li once had him burn calming incense; she had brought it right to him, and he would not have it: partly he dislikes smells clinging to him, but more importantly, as a general not yet with full authority, he dared not burn incense in the army tent and lie at ease; later, visiting the Changge School, Du Zheng and Cen Han also gave him some, and he brought it back and never lit it either.',
      'The war left him with restless nights, palpitations and headaches, and Xu Qiusheng’s needles worked sometimes and sometimes not. After his marriage, sitting alone deep in the night, Zhu Lu combed his hair with white sandalwood pomade and massaged it, and the headache actually eased a little; the last time he had slept so improperly with his hair loose was perhaps as a small child. He said thank you, and Zhu Lu turned and smiled: “Between us… don’t say such things.”',
    ],
    highlight: [
      'When the war came and the city fell, Commander-in-Chief Li Cheng’en and the strategist led the Command’s fighting strength west (later going with the emperor into Shu). Wounded and unable to follow, he took command in the crisis, gathered the wounded and the broken remnants, and played cat and mouse with the enemy. Meanwhile he learned that Li Tingze had been beheaded by the rebels at Luoyang and that their mother, on hearing it, had died of heart failure; for a time he was torn apart, yet held on and did not fall. Cheng Kai, and three hundred soldiers, the embers of the Tiance Command, lived under his protection.',
      'Where the two armies faced each other, enemy scouts often harried them, slipping in disguised as comrades to shake the army with rumours, and slandering him besides. He did not move, but gave them rope in order to catch them, caught and beheaded them, and from then on all within and without were awed into order.',
    ],
  }, // 李庭深
  luweilou: { name: 'Lu Weilou' }, // 陆危楼
  // 陆羽鸣：T1 工作译文（2026-11-22），译注与待审见 docs/luyuming-translation-review.md。
  // 不译：训诂末句「739年大光明寺事变中『身死』实为失踪，故卒年不著，从 Notion 库。」（数据按语）。
  luyuming: {
    name: 'Lu Yuming',
    birthplace: 'The Western Regions (of the exiled Sasanian royal house of Persia)',
    gloss: 'رخ (Rukh): Persian for “face, countenance”, used in poetry for a beautiful face. It is also the white-feathered roc of myth, said to be enormous, white-plumed, feeding on elephants and of matchless strength, perhaps going back to the divine bird of ancient Persia, the Simurgh; the chess word “rook” comes from it too.',
    profile: {
      官职身份: 'One of the senior brothers in charge under the “Shadow Moon” banner, master of the arts of assassination; Lu Wanyue’s master. He came to grief in the Great Bright Temple Incident of 739. Both Lu Wanyue and Lanchuan Yun believed Gao Qian had killed him on the spot; in fact he survived, and remained in the Central Plains for sixteen years, until in 756 he and Lu Wanyue met again at the house outside Chang’an.',
      体貌特征: 'After the fight on the rooftop in 739: a blade wound running from the side of his neck to his jaw, and a wound to the throat that took his voice; old wounds in his lower back, his flank and his back as well.',
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
      'The order thought his generation still too young and had not sent them to Chang’an, but he asked to go. Before the Great Bright Temple Incident, the planning and troop movements of the Tiance Command, Shaolin and the Lingxue Pavilion were kept deeply secret, yet he still found signs of them around a post-station inn, and even worked his way to the place where the Tiance generals were meeting. But by then it was too late. Lanchuan’s hearing was extremely sharp; knowing she was no match for him, she kept up the chase regardless, and with the Lingxue Pavilion as a second safeguard, he came to grief.',
      'He had a kind of insight and experience beyond the ordinary. In his last glance, for no reason he knew, he saw something of Lu Wanyue in Lanchuan’s face: for a moment he thought of what his little pupil would be like when she grew up, perhaps with just that look, sharp and refusing to give in. He read both Lanchuan’s hatred and her hesitation, and with that distant likeness, for a moment the thought came to him of saving her.',
      'On the roof ridge in the autumn of 739, believing himself about to die, he looked up at Lanchuan Yun and spoke a line of Avestan scripture: the first half of Hadōxt Nask 2.10, cišca carāitiš ahi. In the Zoroastrian scripture, as the third night after a righteous man’s death draws to its end, his soul crosses the bridge of judgement, the Chinvat Bridge, and meets his own daēnā: the good thoughts, good words and good deeds of his life, come to meet him in the form of a girl of fifteen. The soul asks her: “What maiden are you? Of all the maidens I have ever seen, yours is the fairest form.” She answers: “I am your own self: your good thoughts, good words, good deeds, good faith.” For the righteous the bridge is broad; for the wicked it is as narrow as a blade’s edge. Lanchuan Yun was fifteen that year; the place of their last stand was a roof ridge, much like the bridge; and in his last glance he saw a shadow of Lu Wanyue in her face. The best thing he ever did was perhaps to raise that child, and so the good deeds that came to meet him wore Lu Wanyue’s face. His wound let him say only the first half, eight syllables; the second half, and the maiden’s answer, exist only in the scripture.',
      'Gao Qian’s stroke was real. The edge came from behind to his throat; he suddenly looked up at Lanchuan Yun, turning towards her, and his neck left the line of the blade. Instead of cutting across his windpipe, the edge drew along the side of his neck and his jaw; blood gushed and spattered Lanchuan’s face, and he passed out where he stood. With a chain blade lodged in his lower back, a spear wound in his flank and a gash across his back, anyone there would have taken him for dead. That gesture of compassion, of answering a call, turned the blade aside.',
      'With the point of his blade Gao Qian flicked the Sasanian agate seal from his belt (the personal token Sasanians wore at the belt, carved with their name in Middle Persian) and tossed it to Lanchuan Yun to claim the kill, then carried him off. A little way on he felt that the man was still breathing, and so he set him down at the door of the old Persian family he had been lodging with in the west of the city, knocked, and went over the wall. Those households descended from the Persians who had stayed in Chang’an with Peroz; they were registered subjects of the Tang, and some held office. The family that had taken him in that spring hid him again in the autumn, just after the court had wiped out a Hu religion on their doorstep. (The Chang’an Gazetteer records a Persian Hu temple in the Liquan Ward, founded at Peroz’s request in the second year of Yifeng; the Great Bright Temple stood in the Yining Ward, on the very site of the Persian temple founded in the Zhenguan era and later renamed the Da Qin Temple. Both lay in the west of the city, not far apart.)',
      'For sixteen years after that he stayed in Chang’an, unable to go back. On paper he was dead: with no household registration he could get no travel pass, and on the road through Hexi every garrison post and fort checked passes and signed travellers through. Crossing a pass without one meant a year of penal servitude, and slipping round it one degree more; and if he were ever questioned, the first to be hunted down would be the family who had taken him in. He thought about all of it. Leaving would mean staking the lives of those households, and of Gao Qian, so staying was a debt repaid; what held him was not the court but the bonds of grace and duty between people. Going back to the order was hard too. He was one of the few who had survived that night; he had found the Tiance meeting beforehand and failed to stop what followed; he had been “killed” by the Lingxue Pavilion and was still alive. In a sect of assassins, coming back like that, he would surely be asked whether he had been let go, and his pupil Lu Wanyue would be drawn into the talk. Within the order only Lu Weilou knew: what the order needed was a Shadow Moon master martyred at the Great Bright Temple, not a survivor under suspicion; and the letter he sent Lu Yuming said it was for his protection.',
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
      'In 741 she first met Lanchuan Yun in a lone fortress town in the Western Regions. In 742 they met again at Longmen, where she saw her master’s Sasanian agate seal on Lanchuan; the two fought fiercely, and afterwards, talking, learned some clues about the night her master died. In 745 they met again while investigating the Hongyi Order’s Devil’s City at Longmen. In 756, when Tong Pass fell, she rescued Lanchuan Yun from Tong Pass and took her to the outskirts of Chang’an, where she had set up a house, and there she found her master again, who had remained in the Central Plains for sixteen years.',
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
  lihanping: {
    name: 'Li Hanping',
    zi: 'Yanzhou',
    profile: {
      '官职身份': 'Son of Li Tingshen and Zhu Lu; Li Hanxin’s elder brother.',
    },
  }, // 李翰屏
  lihanxin: {
    name: 'Li Hanxin',
    zi: 'Yanxuan',
    profile: {
      '官职身份': 'Daughter of Li Tingshen and Zhu Lu; Li Hanping’s younger sister.',
    },
  }, // 李翰昕
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
  // 作者审后（2026-11-22）：「千鹤」改为号（非字），训诂中文重写（先天策府赐号之义，后日本女名、与云相应），英文照之。
  // 作者审后（2026-11-22）：删轶事「晕血」一条（中英俱删）；高光第一条作者按改为英文说明其人物定位。
  lanchuanyun: {
    name: 'Lanchuan Yun',
    hao: 'Qianhe (Chizuru, ‘a thousand cranes’)',
    birthplace: 'Nara, Japan; grew up in Chang’an',
    gloss: 'Qianhe was a name bestowed on her by the Tiance Command, taken from the phrase “a thousand rivers, swift on the wing; a crane’s eye over the nine wilds”: a figure for her lightness and agility, and for a scout’s eye that sees a thousand li. By coincidence, Qianhe also reads like a Japanese woman’s name, Chizuru, “a thousand cranes”, and the crane answers the cloud (yun 云) of her given name.',
    profile: {
      官职身份: 'In the Tiance Command she held the title of Battalion Commander, in charge of the scouts (made Chief of Scouts in 747, training the scouts newly admitted to the Command), responsible for selecting and training men and for part of the intelligence work; married Cheng Kai in 752. In the ninth month of 757 she went into self-imposed exile in the north with the Cangyun Army, where, on Min Fangcheng’s report to the Commander, she served as an instructor in the Rank-Breaker Corps. In 762 she returned to the Command at rank 5b2, Commandant of Cavalry and Gentleman-General Who Has Turned to Virtue.',
      体貌特征: 'Her features could be called delicate, but her voice is low and flat, even a little artless, and the contrast when she opens her mouth is striking.',
      性格: 'Quiet and reserved, resilient and decisive. She has her share of the will to excel, but never contends too hard with others; she has her own logic for how things are done. Her face is often too serious and stiff, rather cold, hard to approach; in fact she is reasonable and understanding, and not rigid in the least. As a soldier she naturally keeps the rules, but she is neutral good, with something of a liberal streak, wishing that everyone could have what they set out to pursue; when she wants to help someone, morality and discipline hardly constrain her thinking at all. A lone wolf, much absorbed in her own world; she thinks herself cold-hearted, but her feelings run deep, and she holds on hard to the past. She says little, is careful, listens well, and does not judge. Blow after blow (her mother’s death, her adoptive brother’s suicide, her father’s death from illness, the bloody fighting for the Command) has turned her ever more inward; she is easily embarrassed, and does not want anyone to see her at a loss.',
      偶像: 'None. If pressed, she often thinks of her adoptive elder brother Ahui: a childhood hero worship, of a kind.',
      武学: 'Proud-Blood Battle Spirit. Her family had a spear manual, the Seven Probes, Coiled Snake method, and she fights with the spear; she also excels at qinggong and close-quarters grappling, and her short-blade and dagger work is rare in the Cangyun Army. Left-handed.',
      随身物件: 'A Japanese short blade with a ray-skin (samegawa) hilt that belonged to her adoptive brother Ahui, who died young; Cheng Kai’s archer’s thumb ring, and the leather hand guards he gave her at the hunt in her first year at the Command.',
      喜好: 'Fish, prawns and crabs: grumbling about the bother all the while, she quietly picks the meat out with a crab leg, using the shell as a bowl, and will not start until she has picked one crab clean and saved up a full bowl. Reading the Book of Songs, which her parents often recited when they first taught her Chinese. Watching the maple leaves on the hill behind.',
      专擅: 'Gathering intelligence, interrogation, teaching close-quarters grappling. A gift for languages: Japanese is her mother tongue, Chinese her first foreign language and Persian her second, and she once went with an embassy to the Western Regions as a special agent in foreign affairs; on the campaign against Nanzhao at Heilong she quickly picked up a little Miao, and after a spell at Yanmen Pass she could follow most of what the Xi people said.',
    },
    anecdotes: [
      'Disaster struck her family, and she lost her parents young. In Chang’an she had seen the women soldiers of the Tiance Command and looked up to them; and she thought that had she been strong enough, like them, she could have protected her parents and brother, and they would not have been abused by those Mingjiao fanatics. So she joined the army, in anger and grievance.',
      'Her father, Lanchuan Jingyan, was a Japanese student sent to the Tang, a fellow student of Chao Heng (Abe no Nakamaro), and the family were friends with Chao Heng; he died of illness in Chang’an in 747. Her mother, Zhao Yingzhen, whose family lived in Changshan Commandery and descended from the Han Marquis of Shunping, died in the ninth month of 736 when Mingjiao followers stirred up trouble in the streets of Chang’an. Her maternal grandfather, Zhao Tingzhi, had also come from the Tiance Command; early in 756, when Changshan fell in the war, the old man dug out his old armour, put it on to protect the townspeople, and died in the fighting. The armour was later recovered by Cen Han, Du Zheng and others of the Changge School (of Li Tingze’s circle) and left in the keeping of the Cangyun Army; in the winter of 757 Lanchuan Yun received it at Cangyun from Min Fangcheng. Lanchuan is of mixed blood, neither wholly Japanese nor wholly Han, and her sense of who she is has always been somewhat confused; only then did she come to know herself as the descendant of loyal men who stood by the state in its peril, and to know all the more that the Tiance Command was where she belonged, that her first choice had not been wrong.',
      'She is a skilled fighter and very sure of her abilities, at her best in violent clashes, yet she never clashes with anyone. Outside training she does not compete with others at all. She never goes to the army’s ring bouts: too noisy.',
      'She is easily embarrassed, and afraid of losing face or showing that she does not know. When she was young, at a hunt in the hills, Cheng Kai rode up to point out that her upper body leaned too far when she shot from the saddle, and she was embarrassed about it for a long time. On the drill ground she often watched Cheng Kai’s trick archery of every kind, silently and on the sly, but would never practise in front of him herself.',
      'A lone wolf, or selfish, if you like: she thinks of herself first. At the Command she was trained from the start as a scout or assassin, and the training was brutal. Once she had come into her own she was often sent out to spy or to work undercover, and won merit many times, but seldom at the front, so the army never heard her name. As a girl she saw her family and her brother leave her one after another, and so grew into someone who keeps to herself, all the more as time went on; it is easy to feel that whatever one gives her meets no answer. Things were often rough going between her and Cheng Kai, and in truth she herself was the biggest stumbling block.',
      'She takes things too far, and does not spare herself either. After the Tiance Command fell and Cheng Kai “died”, she would rather go north of Yanmen alone than ever again turn towards Luoyang, and so lost five or six years for nothing.',
      'She says little but listens and understands well; she keeps her distance and sees things clearly, but takes no interest in other people’s business, does not listen to gossip, and passes no judgments. That is why she and Min Fangcheng could become friends.',
      'She does not seek to have heirs, but the pain of losing a child at that time did, in the end, become a regret. It was with this in mind, too, that she later took in Kyōya at the Command.',
      'On the roof ridge of the Great Bright Temple in 739, the dying Mingjiao man suddenly looked up at her and said something in a foreign tongue she could not understand: eight syllables, which she remembered for many years. They were the words a soul in the scripture asks the girl who comes to meet it: “What maiden are you?” And the question of who she was followed her all her life: an enemy she had only just met, on the point of death, had asked her a question she could never answer. Gao Qian flicked the man’s Sasanian agate seal to her to claim the kill: the first kill of her whole soldier’s life.',
    ],
    highlight: [
      'In the story she is an observer and a witness: her character comes through in conversation and in her dealings with others, so in principle she is given no highlights of her own.',
      'Her view of the feud between the Tiance Command and the Mingjiao.',
      'Investigating the theft of army horses, pregnant and heedless of herself, she got clear when set upon by many and even took one of them alive for questioning; from this the Langya intelligence network at Tong Pass was traced.',
      'Fighting with the Cangyun Army in the Battle of Luoyang, seeing a comrade gravely wounded, she threw aside the Cangyun shield-and-blade, took a long spear from an enemy’s hands, and went into the ranks as though there were no one there.',
    ],
  },
  jingyan: { name: 'Lanchuan Jingyan' }, // 岚川靖彦（日文读法 Arashikawa Yasuhiko 只在名號一行出）
  linyeshi: { name: 'Hayashi Kyōya' }, // 林叶矢
  haruyama: { name: 'Haruyama Haruka', zi: 'Mianshu (Nemugi)', names: { 汉名: 'Fang Yao' } }, // 春山遥
  ahui: { name: 'Ahui' }, // 阿辉
  mokun: { name: 'Mokun' }, // 墨昆
  ahuilang: { name: 'Ahui Lang' }, // 阿会朗
  helan: {
    name: 'He Lan',
    zi: 'Guxin',
    birthplace: 'Mayi county, Shuozhou, Hedong Circuit',
    profile: {
      '官职身份': 'Jing Huishi’s pupil, helping in the medical tent; she later carried on Jing Huishi’s Quiet Breath medical tent (its idea of psychological healing). In the An Lushan Rebellion Mayi fell to the rebels and she was carried off as a servant woman; in the first month of 756 Min Fangcheng retook Mayi, Lian Shuo was first up the wall and saved He Lan from the Langya men, and she later joined the Cangyun Army.',
    },
  }, // 贺兰
  qutuzhen: { name: 'Qutu Zhen' }, // 屈突真
  tongsu: { name: 'Tongsu' }, // 彤素
  lizhu: { name: 'Lizhu' }, // 离朱
};
export const characterTranslation = (locale, id) => locale === 'en' ? charactersEn[id] ?? null : null;
