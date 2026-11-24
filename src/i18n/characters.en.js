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
      'He never had a real education and has little grasp of how people work; his head holds few ready-made ideas, and held fewer still when he was young. Too lazy for the ways of the world, he often seems prickly and aloof, and no one dares come near him. But he cares for his men. Once, when armies joined to relieve the frontier and the time came after victory to settle rewards, each officer set out his merits before the commanding general. Facing the Army-supervising Commissioner, he said: isn’t it all there to see, what more do I need to say? Just get my men their winter clothing and medicine; the wounded can’t hold out. Then he walked off.',
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
  luowenbi: {
    name: 'Luo Wenbi',
    zi: 'Jingshan',
    birthplace: 'The Shan Stream at the northern foot of Mount Tiantai, Kuaiji Commandery, Yuezhou, Jiangnan East Circuit',
    gloss: 'Jingshan is the mountain where Bian He of Chu, in the Spring and Autumn period, wept with his uncut jade in his arms. Han Feizi, “Mr He”: “He took his uncut jade in his arms and wept at the foot of the Chu mountain”; Wang Xianshen’s collected commentary says “the Chu mountain” should read “Mount Jing”. So Jingshan answers bi 璧, the jade disc; the children of her generation in the family all take wen 文 and a character with the jade radical in their names. At the heart of the story of Mr He’s jade is “a truth that goes unseen”: inside the uncut stone lies a matchless jade, and all the eye can reach is the rough skin of the stone. She is both the jade waiting to be recognised and the one able to recognise it; only no one comes to ask her to recognise anything. It stands against what Di Yuanke said to Fan Zhang, “a precious sword in its case that has seen the light of day”: the sword in its case he opened; the uncut stone of Mount Jing he did not.',
    profile: {
      '官职身份': 'Di Yuanke’s wife (married in 760; later twins, a son and a daughter). A daughter of the Luo of Kuaiji, and of the Penglai school. The Luo had long lived along the Shan Stream at the northern foot of Mount Tiantai in Yuezhou, close to the monasteries and Taoist abbeys on the mountain, with roots in Taoist learning and generations of dealings with the literary men of Yuezhou; their distinction lay in being qing, pure, not in any rank among the great clans. Her father passed the mingjing examination early in Tianbao, served as a District Defender in eastern Zhejiang and as an Administrator in a prefectural section, and around 751 was transferred to a post in Taiyuan Prefecture.',
      '体貌特征': 'The Penglai way of moving leaves its traces on her everyday bearing: she sits down more lightly than most women of northern gentry families, her centre of gravity lower, like someone used to keeping her balance on a rolling deck.',
      '性格': 'The kind of person who takes the legend of Liu Chen and Ruan Zhao, who went into Mount Tiantai and met immortals, at its word: others hear it, smile and leave it at that; she hears it and thinks: then I’ll go and look. She bears things quietly and does not complain; in the silence between the two of them, each holds a world the other has never been to. She is more at ease with people who are plain and direct.',
      '武学': 'The Penglai umbrella art: turning and drawing arcs, she raises a flowing surface around her body, the force spreading along the ribs of the umbrella into a circle, attack and defence with no before and after, two sides of a single movement; her centre of gravity never settles, as if she put herself on purpose into perpetual imbalance and then borrowed momentum from it. The Cangyun shield says “I will catch it”; the Penglai umbrella says “I am not there.”',
      '随身物件': 'An umbrella; a sea eagle that has followed her from Penglai and works with her in close understanding; a few small things from the sea, one of which (a conch shell or a small coral paperweight) went into Di Yuanke’s luggage through Fan Zhang’s hands in 760 and afterwards sat on his desk at Cangyun.',
      '喜好': 'Early in the morning, when there is no one in the back courtyard, she goes through a round of umbrella practice, and the sea eagle flies down from the tree to circle with her; when she is done she furls the umbrella, changes into everyday clothes and goes to see to the firewood and rice in the kitchen.',
      '专擅': 'The umbrella art, and fighting together with the sea eagle; born among the monasteries and abbeys of Mount Tiantai, she has heard both the Tiantai teaching of calm and insight (zhiguan) and the tales of the immortal islands in the sea.',
    },
    anecdotes: [
      'The sea eagle flew with her from Penglai across the greater part of China to Taiyuan. The basin is ringed by mountains, its climate dry and cold, with no sea wind and no fish; here it is utterly out of place, just like Wenbi herself. It roosts in a tall tree in the Di family’s back courtyard, or flies to the mountains outside the city to hunt, and comes back at dusk; the neighbours all know the Di family has a strange great bird, and the Di household being strict in its ways, no one asks much. It is her closest companion in Taiyuan.',
      'Within the bounds of a Taiyuan back courtyard, the partnership of woman and eagle looks too big: the eagle’s wingspan needs wider space, and the turning umbrella needs a sea wind to work with the air; but she still practises, perhaps so that her body will not forget. Now and then the children see their mother make movements their father never would, light, flowing, as if wind were passing through her sleeves, the great bird circling overhead and casting its shadow; when their mother notices them watching, she stops, smiles and says: Go and read your books.',
      'Fan Zhang was the only one who stood in both Di Yuanke’s “Yanmen world” and his “Taiyuan world”: pay and letters from home went back and forth between the two through him. Later, when he had trained in the Iron-Bone Mantle, he came upon Wenbi using her umbrella in the back courtyard and stood there staring: “Madam, this skill of yours… does it take a beating?” “It doesn’t.” Fan Zhang thought about it and said, very seriously: “That’s handy.”',
      false,
    ],
  }, // 骆文璧
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
  lubingyu: {
    name: 'Lu Bingyu',
    zi: 'Zhisong',
    hao: 'Forge Mountain',
    birthplace: 'Youzhou (Fanyang Commandery), Hebei Circuit',
    gloss: '“Metal nurtured (yu 毓) into a body, fire held (bing 秉) into a form.” His leisure seal, Forge Mountain (Yeshan), he carved himself: “Once into this mountain together, never to come back till we die.”',
    profile: {
      '官职身份': 'A guard of the Badao armoury, living in Bingyan Valley forging blades, or out on garrison duty, knowing nothing of what goes on outside. On ability he could have joined the Saibei Corps, but he was of another surname after all, and never got the chance. In the autumn of 758 he was driven out of his school, and went to the armoury of the Cangyun stronghold to forge blades under Xue Chu in atonement.',
      '体貌特征': 'A northern Han. A son of a great family, his bearing is easy and dignified, but his eyes never meet anyone’s for long; there is something a little irresolute and withdrawn about him.',
      '性格': 'Easygoing and carefree on the outside; within, repressed and compliant, and longing for freedom. He is someone who cannot say no.',
      '武学': 'The sabre. But he likes smithing better, and knows how to recognise ore deposits.',
      '随身物件': 'A leisure seal he carved for himself, Forge Mountain: “Once into this mountain together, never to come back till we die.”',
      '喜好': 'When it comes down to it, he likes stones, “dead things”. He reveres the old and loves antiquity, likes the study of seal carving and studies seal script, which his family thinks a petty art.',
      '专擅': 'Forging blades and repairing arms and armour; recognising ore deposits; carving seals in seal script.',
    },
    anecdotes: [
      'Born in Youzhou, a descendant of the great Lu clan of Fanyang, though of a side branch that stayed out of quarrels; its standing was not low for all that. Ever since Lu Zhi in the Eastern Han, the Lu of Fanyang had held high office generation after generation, handing down Confucian learning, loving study and elegant letters, prolific writers, all of it in literature, history, calligraphy and painting; he alone was no good at it. He did not find study a hardship in itself, and read widely, but he could not pass examinations. His family never let up on him, though, and he never defied them; he sat the examinations doggedly for a good many years, and never once passed.',
      'The Lu were old family friends of the Li, the Cen and other great clans. He once went to school with the Li brothers, training in both letters and arms.',
      'After failing yet again he went back to Youzhou, and in a blacksmith’s shop on the street stood lost in watching an old man forge a blade. It was a damaged old blade. The old man knew he had been standing there a long while, and asked what he saw; he said: a ringing; I hear it weeping. Later the old man gave him the old blades, one long and one short, in their case, and said: this is where you belong. The blades looked very old, their edges even badly chipped, but after he entered the school and began his training they cut no differently from sharp blades, and he always kept them at his side.',
      'From old grievances, Badao and the Lu were sworn enemies, though what really lay behind it not even their generation fully knew. When he first came to join, the school, taking him for a son of the Lu, would not accept him. He said: it was never really about whether you accept me; but someone gave me this blade, and I’m only curious what that means. And so, of all things, he got in. Most likely the old smith had been someone in the school in his day. But he never learned the story behind it, and no one ever told him.',
      'He had hoped that excelling somewhere else would prove something about himself, but even so, when he went home his father still said it was all the trade of brutes, not the proper path. And yet he was unexpectedly filial. When his brothers were away in office and his parents fell ill, he always went home and nursed them devotedly, though he got no thanks for it.',
      'Only in the school did he gradually open up. Sparring, drinking and talking nonsense with Liu Rong and the others were probably his very happiest times. He also came to know the people of the Cangyun Army, and was especially close to Guan Yue: he taught Guan Yue to forge blades and to repair arms and armour.',
      'A man of the cut sleeve: he loves men. At Changshan he met the Changge party, and later he and Du Zheng became partners. Awakened by Du Zheng, he came to know what he truly desired, and for a while could not stop weeping. He said he finally knew why the blade had wept: it was years of being worn down for nothing.',
      'He went with Li Tingze into the enemy camp to rescue Yan Gaoqing, Prefect of Changshan; Li Tingze was exposed and taken, and talked him into leaving, and he could do nothing. Later he heard that Li Tingze had been executed at Luoyang.',
      'In the seventh month of 756 he helped hold Jiumen, and was captured when it fell. The rebels recognised him as a son of the Lu family, drugged him to suppress his meridians and delivered him, bound, to the gate of the family house at Fanyang, to force the Lu family to submit. Not long before he had seen with his own eyes Yan Jiming killed before his father, and now it was his turn. (Note: Yan Gaoqing, Prefect of Changshan, and his cousin Yan Zhenqing, Prefect of Pingyuan, rose against An Lushan at the end of 755, and Gaoqing’s youngest son, Yan Jiming, carried messages between their two cities. When Shi Siming took Changshan in the first month of 756, the rebels held a blade to Jiming’s neck to make his father surrender; Gaoqing refused, and Jiming was killed in front of him. Gaoqing himself was taken to Luoyang and put to death. Now the rebels were trying the same thing on the Lu family at Fanyang, An Lushan’s own seat.) … So he forced open his bonds, snatched a blade, killed several rebels on either side, and was hit by an arrow himself; he was about to turn the blade on himself, but his parents in the end could not bear it, gave the Langya intelligence and iron, and saved his life, and so made him bear the guilt for ever.',
    ],
  }, // 卢秉毓
  liurong: {
    name: 'Liu Rong',
    zi: 'Rong',
    birthplace: 'Youzhou (Fanyang Commandery), Hebei Circuit',
    gloss: 'Liu is her family surname and has nothing to do with her school: a coincidence, or perhaps some distant kinship. But Rong 戎, “arms”, she chose herself after joining the school; her own name was Rong 蓉, as in furong, the lotus.',
    profile: {
      '官职身份': 'Of Badao’s Saibei Corps (Badao Manor lies near Changshan Commandery in Hebei). She often escorts merchants’ goods in and out through the frontier passes, and in wartime goes out with the Military Commissioner’s armies against the enemy. In 756, when Changshan was besieged, she got Bian Saiyuan out of the city and back to Badao to ask for help; working in tacit understanding with Min Fangcheng, she sent a letter ahead promising to raise grain and fodder, and met him halfway.',
      '体貌特征': 'A northern Han woman, tall, strong and handsome, with thick, slightly wavy long hair; she likes vermilion lip rouge.',
      '性格': 'Bold, open and bright, and decisive too, at times a bit reckless. She longs for romance and likes to take charge and look after people, but does not want the ties of marriage.',
      '武学': 'Besides her sabre, her kicks are especially fine, like a snow-laden pine.',
      '喜好': 'Going out hunting with her bow, and collecting sable, fox and other furs to make into clothes. She is very deft with a knife. She loves watching song and dance, and can drum and dance herself, with great vigour.',
    },
    anecdotes: [
      'She cannot bear to hear anything about what girls should or shouldn’t be. Min Fangcheng trod on that mine the first time they met. But then, seeing him tell her to pack snow on the wound to stop the bleeding, and badly hurt as he was, still rise up suddenly and kill, she took a liking to him. Later, when there were missions to and from Yanmen, she often volunteered. Little did she know the man was a handsome block of wood.',
      'Lanchuan Yun saw how things stood while she was at Yanmen. Not yet knowing Min Fangcheng’s past, once the goods had been delivered she egged him on: go and see her off. Liu Rong just laughed, turned her head away and said: Look at that dazed face; as if I need him to see me off.',
      'A domineering beauty. Knowing that Min Fangcheng suffered from his wounds and the cold, she once forced a fox-fur coat on him and would not let him refuse it.',
      'She grinds her sabre bright as snow and uses it as a mirror while she’s at it.',
    ],
  }, // 柳戎
  liuguan: {
    name: 'Liu Guan',
    zi: 'Yuanyi',
    profile: {
      '官职身份': 'Of Badao. In the action to guard the grain at the Lingqiu fork in 746 he dealt with a sham inspector and swung his sabre to hold off the local militia; at Lü Dingyi’s request he took the earthen fort’s documents, seals and deeds back to Badao, to be handed on to the authorities.',
    },
    anecdotes: [
    ],
  }, // 柳贯
  rendijian: {
    name: 'Ren Dijian',
    birthplace: 'Wannian county, Jingzhao Prefecture, Guannei Circuit',
    profile: {
      '官职身份': 'A historical figure. A man of Wannian in Jingzhao, he passed the jinshi, and began as Administrative Assistant to Li Jinglüe, Commissioner of the Tiande Army. At an army banquet the man serving the wine poured him vinegar by mistake, and fearing that the wine steward would be punished, he drank it all and said nothing (the “vinegar-sipping commander”). When Li Jinglüe died in the twentieth year of Zhenyuan, the troops acclaimed him, and he was made Prefect of Fengzhou and Commissioner of the Tiande Army; later he was Military Commissioner of Yiwu; in the Yuanhe years he went home ill, and ended as Adviser to the Heir Apparent, posthumously named Xiang. The histories do not give his dates; the birth year is an estimate. In the Cangyun storyline, in the spring of 764, a boy copyist at the Yanmen grain station, he meets Jin Chenbai.',
    },
  }, // 任迪简
  guanyu: {
    name: 'Guan Yu',
    profile: {
      '官职身份': 'Guan Yue’s daughter, born in the second month of 763.',
    },
    anecdotes: [
    ],
  }, // 关榆
  cenhan: {
    name: 'Cen Han',
    zi: 'Fangyin',
    birthplace: 'Dengzhou (Nanyang Commandery), Shannan East Circuit',
    gloss: 'Book of Songs, “Odes of Chen”: “By the bank of that marsh there are rushes and lotus buds (handan 菡萏).” Erya, “Explaining Plants”: “He 荷 is the lotus; its flower is handan.” Shuowen: “handan.” Xu’s commentary: “Han 菡 is like han 含, to hold within: not yet opened.” So fangyin 芳隐, “fragrance hidden”, answers the closed bud of han.',
    profile: {
      '官职身份': 'At the time, Instructor of Changshan Commandery (Hengzhou). Admitted a student of the Institute for the Advancement of Literature through the yin protection privilege, she later studied at the Changge School’s academy, passed the jinshi, and took up her first post as Proofreader in the Palace Library (in charge of collating texts), rank 9a2; later Instructor of Changshan Commandery, rank 8b2, in charge of education and of the academies in the city: a capital official posted out to search the prefecture for books.',
      '性格': 'Dignified, refined and clear-minded, with a Confucian’s resolve, and more than a touch of pride.',
      '武学': 'Trained in both of Changge’s paths: Xiangzhi, the healing path, and Mowen, the striking path. Her looks are deceptive: her swordplay is superb, and she can fight surprisingly well.',
      '随身物件': '“Longyuan”, an amber paperweight with a grey tassel: the token she exchanged with Li Tingze.',
      '喜好': 'Rice in tea and pickled relishes; making incense, and reading literary criticism.',
      '专擅': 'Collating books, collecting books, detecting forgeries (and forging them herself).',
    },
    anecdotes: [
      'Of the Cen clan of Nanyang, a great family of officials, she is particular about food and clothes, even though what she likes is no costly fare: the tea must be strong and dark, fish and meat grilled till just charred and sprinkled with fine salt, and the rice left to cool a little so that it has some bite.',
      'She likes to cut flowers for vases or set them in water basins as offerings, lotus flowers and seedpods above all. She enjoys making incense but in fact seldom uses it herself, finding it too much like face powder. Only after Li Tingze was gone, her hands stained with enemy blood, often feeling unclean and unable to bring herself to play the qin, did she use more of it.',
      'She has an odd, endearing side. Her grandfather was a book collector, and at the Changge School she often put the books in order in the Wanshu Tower; when she got bored she would make up fake books of her own, grand-sounding things like the Posthumous Drafts of the Masters or the Lacunae of Yu Zishan Supplied, slip them onto the shelves, add them to the catalogue too, and be secretly delighted when someone borrowed one. When Li Tingze came to Changge he found several books he had never heard of, read them and even discussed them with his fellows, thinking the Changge School’s library well deserved its fame; Cen Han, beside him, could not keep a straight face and burst out laughing. Li Tingze was not annoyed at all, but liked her for it, and afterwards the two of them would secretly make up fake books together whenever they had nothing else to do.',
      'Her qin is named “Ciliu”, from the Wenxin diaolong, “Smelting and Cutting”: “Words are like a river’s flow (ciliu); when it brims over, it floods.”',
      'Pure in bone, with the air of a famous scholar. “When the state has lost the Way, to be rich and honoured is a disgrace.” With that resolve she joined Li Guangbi’s staff, set on serving in the front line. In their troubles she and Du Zheng held each other up; when Du Zheng went blind she took him south back to Changge, and afterwards lived in the Wanshu Tower, collating books and teaching pupils.',
    ],
  }, // 岑菡
  duzheng: {
    name: 'Du Zheng',
    zi: 'Wenqing',
    birthplace: 'Jinyang county, Taiyuan Prefecture (the Northern Capital), Bingzhou, Hedong Circuit',
    gloss: 'Shuowen: “One who acts in obscurity and yet becomes known (wen 闻): him one summons (zheng 徵).”',
    profile: {
      '官职身份': 'At the time steward of the academy in Changshan. He never sought the examinations or office, and helped run the academy in the city with no standing but that of a free wanderer of the jianghu.',
      '体貌特征': 'Dazzlingly handsome.',
      '性格': 'Quick-witted, idle and teasing, bright and spirited, proud and obsessive; in ordinary times he can seem a little glib and flippant.',
      '偶像': 'Shi Kuang and Gao Jianli.',
      '武学': 'Trained in both of Changge’s paths: Xiangzhi, the healing path, and Mowen, the striking path.',
      '喜好': 'Raw fish slices, crab-roe congee; experimenting with face make-up.',
      '专擅': 'A born ear and sense of pitch.',
    },
    anecdotes: [
      'Through all the upheavals of his youth he grew into someone who does not throw himself in, who stands by and watches. His sense of morality is not very strong. As things in Hebei grew more pressing, Li Tingze rushed about raising volunteers, and Cen Han used the academy as a base to help store grain and medicine. Only he helped, but without much zeal. He felt that some things, when they come, simply come: they have their own drift, their own waxing and waning of force, and no amount of resistance is any use. But before long Li Tingze was in danger, and when he understood that the danger had come right up beside him, he at last took a stand.',
      'Posing as a disappointed man of letters, he went into the Langya camp to gather intelligence in conversation, to help with the rescue. It failed: Li Tingze died a martyr, and seeing Cen Han heartbroken, his mind gradually grew deeper and darker. In 757, back in Changshan to bring out the academy’s students, he recognised, by the arrowhead Lu Bingyu had brought back, that the Langya officer who came to inspect the academy was the very man who had shot Li Tingze; disguised as a clerk, he received him with the qin, made sure, and struck. He succeeded, but was gravely wounded: he lost both eyes, blinded and disfigured. Later he went back to the school, lived in the Wanyin Pavilion, listening to the strings and teaching the qin.',
      'The true listener (zhiyin) for the scores on Min Fangcheng’s desk: coming to the Cangyun Army, he happened to see them, played from them, sensed where the note lengths or rhythms were written wrong, told him, and taught him how to write them down.',
    ],
  }, // 杜徵
  litingze: {
    name: 'Li Tingze',
    zi: 'Runfu',
    birthplace: 'Chang’an / Taiyuan',
    gloss: 'Book of Rites, “The Meaning of the Interchange of Missions”: “The gentlemen of old compared their virtue to jade: warm, smooth and lustrous (run er ze 润而泽): that is humaneness.” Fu 甫 is a fine name for a man.',
    profile: {
      '官职身份': 'At the time Administrator of the Granary Section of Changshan Commandery, Hengzhou. He took office young, and joined Changge. In the first month of 756 he went into the enemy camp to rescue his superior, Yan Gaoqing, was pointed out by a turncoat battalion commander, hit by an arrow and taken; too badly wounded to move, he was not sent off with Yan Gaoqing’s first batch of prisoners (in the middle of the first month; Yan Gaoqing was killed at Luoyang that same month), but went with the second batch at the end of the first month, reached Luoyang under escort in the third month and was put in prison, and in the fifth month was beheaded outside Luoyang.',
      '性格': 'Clear, easy-going and open, warm and sincere. He had a soldier’s ambition young, an ambition for his country, broadly speaking. Cleverer than his elder brother, quicker at both books and martial arts, yet as close and loving with his brother as twins. Since his brother had joined the army, and he had no wish to take his brother’s purpose from him, he chose another road. He resented it a little when young, but could talk himself out of it.',
      '偶像': 'Ban Chao; he was also often moved by the poems and fu of Yu Xin’s later years.',
      '武学': 'Mowen, Changge’s striking path, and above all the sword.',
      '随身物件': 'A peach-blossom hairpin, its shaft tipped with ink: the love token between him and Cen Han. His remains were found with the head apart from the body, and the body was known only by the peach-blossom hairpin inside his robe.',
      '喜好': 'Yanduxian (bamboo shoots stewed with ham and salt pork, a home dish of Suzhou and Hangzhou). Loves to travel far and wide.',
    },
  }, // 李庭泽
  yujia: { name: 'Yu Jia', zi: 'Lubin' }, // 虞嘉
  bailin: { name: 'Bai Lin', zi: 'Qishang' }, // 白霖
  chengqian: {
    name: 'Cheng Qian',
    zi: 'Sizheng',
    birthplace: 'Beiting Grand Protectorate, Tingzhou, Longyou Circuit; later Luoyang',
    gloss: 'پَرواز (Parvāz): “flight, spreading the wings, rising”: from par (wing) and vāz (opening out), literally “spreading the wings and soaring into the sky”, which matches his Chinese name Qian 骞 (to rise high, to soar); it also pairs with his elder brother’s name Āsemūn (sky): one the sky, one what soars in it, one “looking up” and one “rising”, hinting at how the brothers’ blood and fates complement each other.',
    profile: {
      '官职身份': 'Younger son of Cheng Feng and Lu Ling. He trained for a time at the Tiance Command and failed, and resisted it besides; later, on Li Tingshen’s recommendation, he entered the Changge School.',
      '体貌特征': 'Of mixed parentage, with deep-set eyes and strong brows: his mother was of the Mingjiao.',
    },
  }, // 程骞
  // 程凯：T1 工作译文（2026-11-22），译注与待审见 docs/chengkai-translation-review.md。
  // 轶事第九条（序号 8）「（按：作者隐喻——……金乌……）」：原写 false 不译；作者审后（2026-11-22）改为英文简述其隐喻。
  chengkai: {
    name: 'Cheng Kai',
    zi: 'Ziyang',
    hao: 'the General of Zhijie Hall',
    birthplace: 'Luoyang, Duji Circuit (ancestral home: Dong’e, Jizhou)',
    gloss: '“A-Yang” was the childhood name his birth mother gave him; he kept the yang 阳 for himself.',
    profile: {
      官职身份: 'Before the war, deputy general of the Heavenly Bow Corps of the Tiance Command, known as “General Ziyang”; married Lanchuan Yun in the autumn of 752. After the war he returned to the Command at rank 4a2, Senior Commandant of Light Chariots and General of Robust Valour, serving as its Drill Commissioner and stationed in the Zhijie Hall, which is why everyone in the Command also calls him “the General of Zhijie Hall”.',
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
  chengzhao: {
    name: 'Cheng Zhao',
    zi: 'Gulian',
    birthplace: 'Luoyang, Duji Circuit',
    gloss: 'Shuowen, Knife radical: “Zhao 钊 is to wear down (wan 刓).” Duan Yucai’s note: “Metal has points and edges; handling wears them away.” Records of the Grand Historian, “Biography of the Marquis of Huaiyin”: “The seal was worn smooth in his hand, and he could not bear to give it.” So zhao is metal with its edges worn down. Lian 廉: Yupian, “an edge”; Book of Documents, “Counsels of Gao Yao”: “simple, yet with edges (lian)”; Book of Rites, “The Conduct of the Scholar”: “whetting his edges and corners (lian yu)”.',
    profile: {
      '官职身份': 'Second son of the Cheng family, by a secondary wife (his mother was a maid who came with the principal wife at her marriage, freed after his birth and made a concubine). Raised in Luoyang, he went to Beiting with his mother around 733. He carried on the family tradition, and his merit went unrewarded. In the tenth month of 740, when tribes unwilling to submit attacked the Juliu Garrison Post, he fell in battle, before Cheng Guang.',
      '性格': 'Steady and taciturn, with great patience; more rigorous than Cheng Feng, but also colder. Used to forbearance and stratagem, with a strong sense of responsibility for the family’s affairs.',
      '武学': 'Good at commanding formations, skilled with the spear and in mounted fighting, though among the brothers his fighting did not count for much; in tactics, rather, he was ahead of them.',
      '专擅': 'Commanding formations, and tactics.',
    },
    anecdotes: [
      'With Cheng Kai: he recognised Cheng Kai’s ability but disliked his character, thinking him too impulsive and stubborn, and often looked on him coldly. As a child he paid Cheng Kai no particular attention; later, since Cheng Kai counted for little in the family, he felt some pity for him, but never sought him out. After Cheng Kai fought his way out of the house and joined the Tiance Command on his own, he only said, “Let him do what he likes.”',
      'In the winter of 735, when the Türgesh besieged Beiting, he first went into battle; when the weapons on the walls snapped in the cold, he asked to take charge of repairing the arms and armour, and stayed with the arms and armour from then on: the man Ye Shuxi sought out in 738, when she came west looking for iron, was the one in charge of them. In the first month of the next year he went out with Gai Jiayun and broke the Türgesh, and the histories record only the commander’s name.',
      'In the winter of 739 he was betrothed to Ye Shuxi of Cangjian Manor; since a younger brother should not bring home his bride before the eldest has married, Cheng Feng urged him to marry first, and he declined. In the summer of 740, when Baga Tarkhan revolted, he was sent to the Juliu Garrison Post, and before he left, he and Ye Shuxi had a child; in the tenth month, when tribes unwilling to submit attacked the post, he fell in battle. As he died he wrote to Cheng Feng setting out his last wishes, and the letter said nothing of the child. His posthumous daughter Ye Chen was born at Beiting in the spring of 741 and took her mother’s surname; the family register reads “unmarried; one daughter, who takes her mother’s surname”.',
    ],
  }, // 程钊
  chengduo: {
    name: 'Cheng Duo',
    zi: 'Mingzhi',
    birthplace: 'Luoyang, Duji Circuit',
    gloss: 'Analects, “Bayi”: “The world has long been without the Way; Heaven is going to use the Master as its wooden bell (mu duo 木铎).” Guoyu, “Discourses of Wu”: “Before dawn the king took up the drumstick and himself sounded the bells and drums, the dingning and the chunyu, and shook the bells (zhen duo).” The bell is shaken to sound a warning to the many, whether in commanding an army or in governing the people: the meaning is one. So mingzhi 鸣治, “sounding to govern”, answers duo 铎.',
    profile: {
      '官职身份': 'Third son of the Cheng family, the most soldierly of them all, a general’s son to the core. Stationed in Shu for many years.',
      '性格': 'A soldier of iron and blood: harsh and rigid, holding military discipline and the family’s honour above all.',
      '武学': 'Both the long spear and shield-and-blade; the strongest of the Cheng brothers at close quarters (single combat on horseback), and the one who fights most like Cheng Guang.',
    },
    anecdotes: [
      'He greatly respects Cheng Feng, sees him as the heart of the family, and is willing to serve as his right hand. On the battlefield they work together perfectly, but in the family’s own affairs he leans more to the military, while Cheng Feng is more rounded.',
      'Early on he utterly rejected Cheng Kai, thinking his birth an embarrassment and that he would never amount to much. He was the first in the family to raise the question of Cheng Kai’s standing, opposing his being put on an equal footing with the sons of the principal wife; when they were children he was extremely hard on Cheng Kai, and once even proposed sending him away from the family. Yet later, during the An Lushan Rebellion, he still kept a private eye on how Cheng Kai was faring in the fighting.',
    ],
  }, // 程铎
  chengjun: {
    name: 'Cheng Jun',
    zi: 'Weizhen',
    birthplace: 'Luoyang, Duji Circuit',
    gloss: 'Jun 钧 is the potter’s wheel; taojun 陶钧 is often used for creation, the shaping of nature: Zou Yang, “Letter to the Prince of Liang from Prison”: “So the sage kings governed the age and ruled its ways, shaping them alone upon the potter’s wheel.” Zhen 甄 is making pottery: Book of Han, “Biography of Dong Zhongshu”: “It is like clay on the wheel: it is only for the potter (zhen) to make of it what he will”; by extension, to shape, to bring about; Book of Han, “Biography of Ban Gu”: “shaping Yin and moulding Zhou”. The ancients often spoke of heaven and earth as a furnace and of the potter’s work as creation, so weizhen 唯甄, “only the potter”, answers jun.',
    profile: {
      '官职身份': 'Fourth son of the Cheng family, and the odd one out: unwilling to take up the family calling, he roamed far and wide, making friends among the knights-errant of the jianghu, with little to do with the army or politics. He joined the army briefly, but soon left. In the war he took no part in any great battle, but travelled from place to place, now and then bringing Cheng Kai news; in the end he went into hiding amid the turmoil, and no one knows what became of him.',
      '性格': 'Free and easy, dashing, humorous and casual, fond of poetry and wine, quite out of keeping with the severity of the other Cheng brothers.',
      '武学': 'Born into a military family, he learned the family spear (shuo lance) technique from his third brother Cheng Duo as a boy; after leaving home he leaned more to qinggong and a wandering swordsman’s style, wearing a blade day to day and seldom using the spear.',
      '喜好': 'Poetry and wine.',
    },
    anecdotes: [
      'He is the brother Cheng Kai is closest to in the family. When Cheng Jun was little, Cheng Kai taught him how to dodge punishment from their father and brothers, and took him sneaking off to the Luoyang night market. Unlike his elder brothers he cares least of all about Cheng Kai’s birth, and even jokes, “If you had no name and no surname, you’d be free, at least.”',
      'After Cheng Kai joined the Tiance Command, he once happened by to visit him, bringing wine as a gift, but also urged him not to cling so hard to the family’s acceptance.',
    ],
  }, // 程钧
  chengguang: {
    name: 'Cheng Guang',
    zi: 'Qianli',
    birthplace: 'Luoyang, Duji Circuit',
    gloss: 'Shuowen: “A great building with a hall.” Book of Changes, “Appended Statements”: “In breadth and greatness (guang da 广大) it matches heaven and earth.” So qianli 千里, “a thousand li”, answers guang 广, broad.',
    profile: {
      '官职身份': 'Cheng Kai’s birth father. From 741 Military Vice Commissioner of Yixi and Beiting; died in 747 in the Little Balur campaign (under Gao Xianzhi). His second son, Cheng Zhao, had died before him, in 740, on the western road out of Beiting.',
    },
  }, // 程广
  chenruihe: {
    name: 'Chen Ruihe',
    zi: 'Xinchu',
    birthplace: 'Hefei county, Luzhou, Huainan Circuit',
    gloss: 'Shuowen, Jade radical: rui 瑞 is “jade used as a token of good faith (xin 信)”. So xin answers rui, and chu 初, “the beginning”, adorns it: a heart set on its course from the first, and never wavering.',
    profile: {
      '官职身份': 'Head of the guards at Sanxing Wangyue, the three stone spires at the heart of Wanhua Valley. In the eighth month of 757 he led a squad of Wanhua disciples into Suiyang with Nan Jiyun’s relief force and lived through the city’s last two months; when it fell in the tenth month he was spared as a physician, and later went back to the Valley. When disaster came to Wanhua Valley in 758 he kept a cool head, a pillar of his generation; in the eleventh month of 762, serving with the army under Cheng Feng, he treated the gravely wounded Min Fangcheng. Jiang Li’s husband.',
      '性格': 'Steady and decisive, and endlessly patient. He has something of a “plodding, unremarkable” air about him, and yet is not wholly without ambition: it shows more as a kind of uncomplaining willingness to bear whatever work comes. He has seen many horrors in the army, the last two months at Suiyang worst of all, and so holds soldiers and their commanders in particular respect, and in a certain fear as well: respect for their holding out, and fear of what they will have to fill the breach with when they hold out to the very end. The second half he never speaks of; it lies pressed down beneath that plodding, uncomplaining manner.',
      '武学': 'Trained in both of Wanhua’s paths: Lijing, the healing path, and Huajian, the striking path.',
      '专擅': 'Major surgery, above all bones and wounds. He always looks as if he isn’t sure of himself, and is in fact very capable; half of that unsure look he brought back from Suiyang.',
    },
    anecdotes: [
      'His court Mandarin has a bit of an accent. His voice is light and quick, a mixture of southern and northern speech.',
      'He was once sent up from Luzhou as a provincial candidate and sat the jinshi examination in Chang’an again and again without passing, and for a time was too ashamed to go home. Then, as chance would have it, he met Xu Qiusheng in Chang’an, they talked, and he joined the school.',
      'In the eighth month of 757 he led a squad of Wanhua disciples back into Suiyang with the relief force Nan Jiyun had borrowed from Ningling, losing some of his fellows on the way: of three thousand men, only a thousand got in. Why go to Suiyang? Han Yu said that Zhang Xun and Xu Yuan, “holding one city, defended the whole realm” and “screened the Yangzi and the Huai”: behind the city lay Hefei in Luzhou, and he was holding the gate to his own home. He then lived through the city’s last two months: after the sparrows were netted and the rats dug out, it was people; a doctor whose field was bones and wounds, he set bones in that city for “the ones left uneaten”. When the city fell on the ninth day of the tenth month he was kept on as a physician, lost among the four hundred or so survivors; only when An Qingxu abandoned Luoyang and fled north a week later did he get away, walking seven or eight hundred li, and reaching Luoyang in the eleventh month. (Note: Suiyang is the most literal place where “loyalty” devoured “humaneness”: people at the time blamed Zhang Xun for the cannibalism, and Li Han wrote his biography in his defence. His saving of Min Fangcheng in front of Cheng Feng’s tent in 762, and his kneeling in 763 to set a deaf-mute boy’s broken legs straight, can both be read as things he brought out of Suiyang.)',
      'In the winter of 757 he treated Cheng Feng’s injured back, and the high fever of Cheng Feng’s little son Cheng Qian, and so by chance came to know Cheng Feng; in 762, when Min Fangcheng was gravely wounded in battle and all but beyond saving, it was he, serving with the army under Cheng Feng, who saved him.',
      'When the Tibetans took Chang’an in 763, Kyōya was brought back to the camp for the displaced by Lanchuan Yun with both legs crushed, and it was he who treated him. The boy was deaf and mute, knew no Chinese, and had only just come through the turmoil; at the least pain he would only cry and cry, and still he never grew impatient: kneeling beside the boy, he straightened his legs little by little, splinted them, gave him medicine, and tried one way after another to ask him things and comfort him.',
      'When they married, Jiang Li told him frankly of her past with the Tiance army, which rather made him feel small: had he not joined Wanhua, he thought, he would be nothing but a down-at-heel scholar; how could he compare with a general, and how had he come by such a wife? In Chang’an in 763, hearing that the general who had come from the Tiance Command was an old acquaintance of Jiang Li’s, he deliberately kept out of the way; Jiang Li understood him, and when Cheng Kai asked to meet him she spoke up for him. Later, when the Tiance army had stayed in Chang’an a little over two months and was going home, Jiang Li had medicines to send and wanted to see them off outside the city, and he would not let her: thinking that she was far along and had a bad back, and could not easily get about, it was he who took the things to the Tiance camp, introduced himself, and said for Jiang Li everything she would have said.',
    ],
  }, // 陈瑞和
  xiamingcang: {
    name: 'Xia Mingcang',
    birthplace: 'A Mohe tribe',
    profile: {
      '官职身份': 'A disciple of the Beitian School of Medicine, Mohe by birth, brought up in his tribe as a shaman’s assistant (zhushenren); Meng Xueying’s husband. His family lived by raising sika deer and reindeer; when he was eight or nine his parents fell through the ice while fishing in winter and drowned in the cold, and the tribe’s shaman took him in; at her side he learned song, dance and music, and learned the history and the rites by heart, and he regards her as a grandmother. His tribe lived between the old seat of the Beitian School and Baishuang Valley, and he became a disciple of the school while still a boy; once he had made some progress he came out of the mountains and often practised medicine along the north-eastern frontier, roaming around Yingzhou. In the third month of 763, at Liu Rong’s invitation, he came south from the Beitian School to treat Min Fangcheng, who had for a time lost his sight.',
      '性格': 'He grew up in the mountain forests and is utterly at ease: when a deer lies down he can sprawl across it any which way and sleep with his head on its body. Open and warm-hearted, with a physician’s kindness: “Everyone’s a child. Having a few years on you doesn’t make you anything special.”',
      '专擅': 'Practising medicine and tending the wounded; shaman songs.',
    },
    anecdotes: [
      'Passing through Yingzhou for the first time and seeing the suffering there, he stayed to roam and practise medicine; at the refugee camp outside the city he treated an injured little child, and when it cried on a hot summer night he held it close, showed it the stars and chanted the songs the shaman had once chanted to him. Meng Xueying, watching beside them, was suddenly sad (her mother too was Mohe), and so the two came to know each other.',
      'In the upheaval at Yingzhou in 756, Meng’s father in that dangerous hour entrusted Meng Xueying to him, and he took her north to settle in Baihe Village and brought her into his school to study; in 760 the two made their bows before her father and pledged themselves for life.',
      'In the third month of 763 Liu Rong sent a letter asking him to come to Cangyun to see to Min Fangcheng; Meng Xueying was then less than three months pregnant, and thinking of what had happened two years before, he was so torn that he walked circles in the room with his hands behind his back; Meng Xueying urged him to go. He stayed at Cangyun over a month and left once Min Fangcheng was out of danger. That autumn Meng Xueying gave birth to a boy, named Jiarong, after a magical plant of the Classic of Mountains and Seas, for its meaning: a grass that flourishes, red-flowered, unafraid of thunder.',
    ],
  }, // 夏明沧
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
      '官职身份': 'Corps Commander of the Rank-Breaker Corps. At every New Year, when the generals go up to the Li Mu shrine with offerings of wine and dried meat, he often takes the Iron-Bone men separately to burn incense and speaks his own incense vow; soldiers who feel moved change into ordinary clothes and give out gruel to the poor households in the town, which they call “the Rain-and-Snow Alms”.',
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
  luweilou: {
    name: 'Lu Weilou',
    birthplace: 'Persia (his forebears were Silk Road merchants who had moved west and settled there to escape the turmoil of the Wei and Jin)',
    gloss: false,
    profile: {
      '官职身份': 'An elder of the “Shadow Moon” in the Zoroastrian faith. In the first year of Jinglong (707) he founded the Mingjiao and became its leader; around the twenty-third year of Kaiyuan (735) the order was at its height.',
    },
    anecdotes: [
      'After the fall of the Sasanians (651), Zoroastrianism found shelter under the Tang, survived and spread east. Among the royal kin who followed the Persian king Peroz in his wanderings, going back and forth between Chang’an and the Western Regions, were Lu Yuming’s grandfather’s and father’s generations, who had long known Lu Weilou, both in the faith and in trade.',
    ],
  }, // 陆危楼
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
  lunanxin: {
    name: 'Lu Nanxin',
    birthplace: 'the Western Regions',
    gloss: 'نسیم (Nasim): “breeze, a gentle wind”, in poetry often a sign of tenderness, calm and the breath of spring. He was born in the very year the Mingjiao was founded (the first year of Jinglong, 707), which only made him surer that he and the faith he later held to were bound together by some wonderful, unbreakable tie.',
    profile: {
      '官职身份': 'A master in charge under the “Glazed Gold” banner.',
      '性格': 'A refined and fervent believer who knows the scriptures by heart. Warm-hearted, loyal to his friends and sociable, and at times rash and impatient: the sort who makes a little money, calls all his friends out to a treat, and usually ends up out of pocket. There is a quiet intelligence in him too, though at first it was hidden from view.',
      '武学': 'The method of the Luminous Lord. Gravely wounded at the Great Bright Temple in 739, his right elbow run through and the sinews and bones drawn up so that the arm would not straighten, he could no longer use his twin blades, and so fell back on this.',
      '喜好': 'He likes to drink tea or grape wine from a small pot, and collects cups and bowls, mostly of glass, jade and stone: sometimes he sets a row of them out on the carpet and taps them gently with a little hammer, as if playing music; he loves the sound, and is quite carried away by it.',
      '专擅': 'Meditation and insight, and the keeping of the scriptures: after he came back to the order he often meditated in the hall, and found a great deal of reflection and insight there.',
    },
    anecdotes: [
      'Turmoil came to him young: a frontier mutiny, the dead badly dealt with, and a plague bred from them that struck the whole village; he was one of the few to survive, and after much wandering found his way into the order.',
      'At first he did not see very far and cared more for the martial arts; he went wherever the order sent him, and that is how he came to make the long journey to Chang’an. Ambushed on a mission, gravely wounded and dying of thirst, he was saved by a travelling merchant: Rādīn, Lu Wanyue’s father. He tried to bring Rādīn into the order and failed, but they became friends, and so the seed was sown of Lu Wanyue joining it (he was always feeding her frosted sugar).',
      'The larger thought of treating others as he would himself came to him only gradually: it spread out from Lu Wanyue, until he was protective of and caring towards all the young ones in the order.',
      'In truth he did not want Lu Wanyue to set foot in the central plains. When she said she was going to the south-west he only grudgingly nodded; it was only as the order’s situation changed, as she grew up and came into her skill, and as Rādīn let his daughter go and find her own way, that he gave up being so overprotective. Later, in meditation, he sensed the shadow of war in the north, and on the night Lu Wanyue set out he talked with her, and said one more thing: I’m afraid your friend is going to suffer.',
      'The half-sentence Lu Yuming spoke as he died, “cišca carāitiš ahi”, was recognised by him: in the Hadokht Nask it is what the soul of the righteous man asks when, crossing the Chinvat Bridge, he meets his own Daēnā. The rest of it, “of all the maidens I have ever seen, you are the fairest in form”, and the maiden’s answer, “I am your own self: your good thoughts, good words and good deeds”, are in the book, and only he knew them; it must have been he who translated the line, too. Lu Wanyue had been trained in the assassins’ line and might not know the old scripture well; he, after his wound, had meditated and kept the scriptures, and being the believer he was, knew these texts better than anyone. So he knew that Lu Yuming had believed, at that moment, that he was being welcomed, and perhaps had not gone wholly in hatred: a feeling he had never imagined; and what had stirred that feeling in Lu Yuming was the face of the Tiance soldier, Lanchuan Yun.',
    ],
  }, // 陆南信
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
  luling: {
    name: 'Lu Ling',
    birthplace: 'the Western Regions',
    gloss: 'جانان (Jānān): “beloved, the one dear to one’s heart”, from jān (soul, life, heart); in Hafez and Rumi it often means the beloved. The name is taken in the sense of “life, soul, beauty”.',
    profile: {
      '官职身份': 'Of the Mingjiao; Lu Wanyue’s senior sister in the order, and a guide to her. Wife of Cheng Feng of the Tiance Command, and mother of Cheng Yu and Cheng Qian.',
      '喜好': 'She makes very good sweets and pastries from milk.',
    },
  }, // 陆灵
  luyin: {
    name: 'Lu Yin',
    birthplace: 'the Western Regions',
    gloss: 'پنهان (Penhān): “hidden, secret, unseen”.',
    profile: {
      '官职身份': 'A Mingjiao assassin, the senior brother who led Lu Wanyue’s squad, and Māneli’s elder brother. In the ninth month of 736 he and several others made trouble in the streets of Chang’an, which led indirectly to the death of Zhao Yingzhen, Lanchuan Yun’s mother, and he was sentenced to exile under Tang law; his sentence served, he was released in 742 and went back to his squad of assassins. In 745 Lanchuan Yun, who had come to the Western Regions again to deal with the Hongyi Order’s unrest, strangled him with a bowstring.',
    },
  }, // 陆隐
  luxiao: {
    name: 'Lu Xiao',
    birthplace: 'the Western Regions',
    gloss: 'فرزین (Farzīn): “wise, sagacious, precious”, readable as “the wise one”; also the name of the queen-like piece in the old Persian chess (shatranj), carrying both strength and wisdom. The name is taken in the sense of “knowing, learned, wise”, answering to the Chinese xiao 晓.',
    profile: {
      '官职身份': 'A full member of the Mingjiao (from 741). A man of the central plains whose father served in the Court of State Ceremonial; early on he went with his father to Anxi and lived at Kucha, learning Persian so that one day he could take over his father’s post, and the Mingjiao’s preaching platform at the foot of the Holy Mountain became the place where he practised it (he first came into contact with the order in 736). Lu Nanxin’s pupil and Lu Wanyue’s friend; later Māneli’s partner.',
      '性格': 'The clear-eyed, endearingly foolish college-student type. Cheerful, curious and eager to learn, keen on every new experience; he writes everything down in a diary, good and bad, a volume every few months.',
    },
  }, // 陆晓
  tangxu: {
    name: 'Tang Xu',
    birthplace: 'Yizhou (Chengdu Prefecture), Jiannan Circuit',
    gloss: 'دارا (Dārā): “possessor, the wealthy one, one who holds riches and power”, from Old Persian dāraya- (to hold), of the same root as Darius (Dāryūsh, “he who holds the good”), an honoured name in Persian epic and in the royal lines: “one who has both riches and light”. Xu 煦 matches his twin sister Xi 熙 (Tiyām).',
    profile: {
      '官职身份': 'Son of Lu Wanyue and Tang Zhe, and twin to Tang Xi: the boy of the twins, brought up in the Mingjiao line.',
    },
  }, // 唐煦
  tangzhe: { name: 'Tang Zhe', zi: 'Zhuwei' }, // 唐哲
  tangxuan: { name: 'Tang Xuan', zi: 'Jizhi' }, // 唐玄
  tangqi: { name: 'Tang Qi', zi: 'Sujun' }, // 唐绮
  tangchi: { name: 'Tang Chi', zi: 'Yousheng' }, // 唐篪
  tangxia: { name: 'Tang Xia', zi: 'Baihe' }, // 唐遐
  tangqingyang: { name: 'Tang Qingyang' }, // 唐青阳
  tangxi: { name: 'Tang Xi' }, // 唐熙
  mengping: { name: 'Meng Ping' }, // 蒙萍
  duanshao: {
    name: 'Duan Shao',
    zi: 'Kuishi',
    gloss: 'Shao 韶 is the music of Shun of Yu. Kui 夔 was Shun’s master of music. Shi 石 is the stone chime. Book of Documents, “Canon of Shun”: “The Emperor said: ‘Kui! I charge you with the music…’ Kui said: ‘I strike the stone, I tap the stone, and the hundred beasts lead one another in dance.’”',
    profile: {
      '官职身份': 'Of the Duan of Nanzhao, a younger kinsman of the grand general Duan Jianwei. At the battle of the Xi’er River in 751 he was on the Nanzhao side: the mirror image of Cheng Duo and the Tiance Command on the Tang side. In 766 he was among those present when the Nanzhao Dehua Stele was set up. The Duan of Dali claim descent from Duan Jianwei’s line.',
    },
    anecdotes: [
    ],
  }, // 段韶
  zhuhongqu: {
    name: 'Zhu Hongqu',
    zi: 'Fuxiang',
    birthplace: 'Yangzhou (Guangling Commandery), Huainan Circuit',
    gloss: 'Yang Yuhuan’s poem for Zhang Yunrong’s dance: “Silk sleeves stir the fragrance, the fragrance never ends; the red lotus sways in the autumn mist. A light cloud on the ridge, a sudden stir of wind; tender willows by the pool first brushing the water.” (Yunrong, the Consort’s maid, danced the Rainbow Skirt dance well; the Consort gave her this poem when she went with the emperor to the Embroidered Ridge Palace.) Her name, Hongqu, “red lotus”, and her courtesy name, Fuxiang, “brushing the fragrance”, both come from it.',
    profile: {
      '官职身份': 'A disciple of the Qixiu House.',
    },
    anecdotes: [
    ],
  }, // 祝红蕖
  zhulu: {
    name: 'Zhu Lu',
    zi: 'Wanting',
    birthplace: 'Suzhou, Jiangnan East Circuit',
    gloss: 'Erya, “Explaining Birds”, subcommentary: in the time of King Wei of Chu, crimson egrets (zhulu) came flying in flocks and danced, so there are red ones as well; this is the old drum-and-wind song “Zhu Lu”. The bird is called the white egret, then, and the red ones are simply rare. Book of Jin, “Treatise on Music”: among the short-pipe and cymbal songs of Han there was one called “Zhu Lu”. Book of Songs, “Odes of Chen · Wanqiu”: “Kan goes the drum below Wanqiu; winter or summer, she holds up the egret plumes”, said of shamanesses dancing with egret feathers in their hands; and “Hymns of Zhou · Zhen Lu”: “The egrets in flight, there at the western yong.” The Mao commentary: “The yong is a marsh.” Another reading takes the yong for the biyong, the royal academy ringed by water, where the white egrets came down; hence ting 汀, “the shallows”, to answer lu 鹭, the place where the egret alights.',
    profile: {
      '官职身份': 'A disciple of the Qixiu House. From 763, Li Tingshen’s wife.',
      '性格': 'Quiet and thorough, with a fine eye for what she sees: where nothing is said, she can still see the twists and turns of a person’s heart. Once, seeing Li Tingshen look closely at the stitching on an old undershirt and not know what to say, she turned over the embroidery hoop in her hands: “What does it matter? A person’s heart is a thousand threads. Who looks at embroidery only from the back?”',
      '武学': 'The sword. She uses a sword just as they do, and has never thought the people of Cangjian anything so very special.',
      '随身物件': 'A silver box with a fine bamboo comb and hair oil: jasmine is what she likes for herself, and she keeps sandalwood apart for Li Tingshen; a close-woven gauze lampshade she stretched and wove herself.',
      '喜好': 'Ginkgo: she likes to pick up the fallen leaves and turn them over in her hands. Embroidery.',
    },
    anecdotes: [
      'At fifteen or sixteen (around 750) she came to Cangjian with seniors of the Qixiu House, and a junior sister left her stranded by the lake. Snow was falling in late autumn, and Ye Tiandeng came over to hold an umbrella over her, told her the story of Shenguang standing in the snow, cutting off his arm to seek the Dharma, and the snow turning red for it, and then took her to the refectory at Lingyin Monastery for plain noodles. She said: “Red snow fell from heaven, but Shenguang cutting off his arm to seek the Dharma doesn’t seem to have fallen from heaven… people did it.” The man from Cangjian laughed and said that was true too; but Shenguang’s skull rose in five peaks, an auspicious sign that he was bound to reach enlightenment, so you could see that some things are fated as well.',
      'She asked Ye Tiandeng why he had never followed that monk and left home, and no sooner were the words out than she felt she should not have asked; he laughed: “Leave home? You have to come into something before you can leave it. I never came into any home; how could I leave one?”',
      'In late autumn 758 she came to Cangjian with her fellow disciples to help treat the wounded. Seeing the badly hurt and the maimed, she suddenly remembered the story told by the lake in the snow years before. She was not afraid to look at those wounds: it seemed to her that all these people were bits and pieces of Shenguang.',
      'On the eighth day of the fourth month of 759, the Buddha’s Birthday, she went to Lingyin Monastery to pray for blessing, and saw a monk in a blue-green robe whose brows and eyes were just like Ye Tiandeng’s, only his head was shaved. She called out to him; the monk lowered his eyes, put his palms together in greeting, turned and walked away.',
      'After the wedding, the first time she went up to the bedchamber in the Jingde Tower, she saw a shrine in one corner with sutras laid before it, and asked Li Tingshen: “General… are you drawn to the Buddha’s teaching?” Li Tingshen smiled wryly: after all the killing he had done, wiping men out to the last, he bowed to an image that does not kill; and taking whatever he wanted had got him nothing in the end, and now that he alone was left alive, he did not yet know in which life the cause of it lay. She said: “And so, General, in this life you keep the sutras.” Li Tingshen was taken aback, and for a long while only looked at her.',
      'Since the war Li Tingshen had slept badly. When he slipped out quietly in the middle of the night she would follow without a word, move the oil lamp aside, untie his hair cord, and comb his hair and rub his head with sandalwood oil: “Jasmine is what I like to use. A woman’s things, how could you use those? In the camp people would laugh at you for going soft over a woman. This is sandalwood.” The headache did truly ease a little. She moved a little table over herself and put on a close-woven lampshade of her own making, so that the light was soft and dim. Li Tingshen said thank you, and she turned back with a smile: “Between us… let’s not say such things.”',
    ],
  }, // 朱鹭
  cenquan: {
    name: 'Cen Quan',
    zi: 'Jingyuan',
    gloss: 'Chu ci, “Encountering Sorrow”: “The quan does not see what is in my heart.” Wang Yi’s commentary: “Quan is a fragrant herb.” And: “On the Yuan there is angelica, on the Li there are orchids”: the Xiang, the Yuan and the Li (Feng) rivers all grow fragrant herbs, and so yuan 沅 answers quan 荃.',
    profile: {
      '官职身份': 'Of the Qixiu House. Cen Han’s eldest sister, and a consort in Emperor Xuanzong’s palace.',
    },
    anecdotes: [
    ],
  }, // 岑荃
  pengyansi: {
    name: 'Peng Yansi',
    profile: {
      '官职身份': 'A disciple of the Qixiu House.',
    },
    anecdotes: [
    ],
  }, // 彭延思
  chutang: {
    name: 'Chu Tang',
    zi: 'Nianyuan',
    profile: {
      '官职身份': 'A disciple of the Qixiu House.',
    },
    anecdotes: [
    ],
  }, // 楚棠
  wangji: { name: 'Wang Ji', zi: 'Zhenyu', hao: 'Master Mudboat' }, // 汪楫
  pengshilu: { name: 'Peng Huan', zi: 'Chengmu' }, // 彭涣
  leiyin: { name: 'Lei Yin', zi: 'Junxiang' }, // 雷殷
  shenhanying: {
    name: 'Shen Hanying',
    zi: 'Canrong',
    birthplace: 'Chang’an county, Yongzhou (Jingzhao Prefecture), Jingji Circuit',
    gloss: 'Book of Songs, “Odes of Zheng”, “Lambskin Coat”: “The lambskin coat is glossy, its three trimmings (ying 英) shine (can 粲). That man there is the flower of the realm.” The Mao preface: “‘Lambskin Coat’ criticises the court: it speaks of the gentlemen of old to admonish the court of its day.” So can 粲 is matched with ying 英. The poem praises a gentleman, and reproaches a court that has no loyal ministers.',
    profile: {
      '官职身份': 'Eldest senior brother among this story’s Wanhua characters. In the tenth month of 747 he went with his master to the Tiance Command as Attending Physician, and went back to the school in 749; when war came he brought his juniors to help at the front again.',
      '性格': 'Refined and gracefully handsome, gentle, clear and upright, unhurried in all he does. Rather an idealist: a medicine boy from childhood and steeped in it for years, he set his heart early on diligent study, with the kind of idealism that would light up the whole world by the gleam of a needle’s point, so that no one else need suffer as he had.',
      '武学': 'Lijing, Wanhua’s healing path, with a painted scroll as his weapon.',
      '随身物件': 'A jade pendant, “Green Bamboo and Cicada Dew”.',
      '喜好': 'The poetry of Chen Zi’ang, for its “bones clear and set, vast and soaring up to the River of Heaven”.',
      '专擅': 'Versed in all six arts, outstanding in medicine among his generation, and of fine character too, respectful to those above and kind to those below: all but perfect. He never imagined he would stand out from others, and somehow did.',
    },
    anecdotes: [
      'When he was very small, an epidemic broke out in his village, one deadly to grown men and women; so only he and a few other children were carried out, and came to the Valley.',
      'As a child he once nearly went missing and was about to be carried off, and was saved in a back lane by Cheng Kai, who was stabbed doing it and left with a scar on his right forearm; neither knew the other’s name, and Cheng Kai even took him for a little girl.',
      'Now and then he envied the free-spirited masters and eccentrics of the Valley, though not because he wanted to be like them himself. He studied his arts step by step and treated the sick, and when things were quiet and he thought it over, he would feel a little lost: Jiang Li once asked him a question that went straight to the soul, what he loved and longed for most, and he could not say.',
      'He set great store by bearing. A few days after he came to the Tiance Command, word suddenly came that most of the soldiers in the camp were vomiting and purging without end; he hurried to treat them, and the furious soldiers, taking him for a Shence spy, turned their bows on him. Knowing it was useless to argue, he stood squarely with his hands behind his back to take the arrow, until Cheng Kai threw him down, shielded him and got him away, and he was confined to his quarters. Shut in his room, he still worried over the soldiers’ symptoms, and wrote out prescriptions for Cheng Kai to take to the infirmary, brew, and share out in the camp. Lanchuan Yun, watching from the back, said nothing and went off to find evidence to clear his name; and so he became friends with the Tiance people.',
      'In fact he is very good at roundabout digs. In his first two years at the Tiance Command, Cheng Kai, ordered to help the Wanhua people, was very eager, and would often agree to something before he had heard the half of it and set off at once. So he said: why are you called Ziyang? You ought to be called Zilu: “When Zilu had heard something and had not yet been able to act on it, his only fear was that he would hear something more.” And so Cheng Kai got a nickname: when someone in the infirmary said “Zilu has come to hear the Way again”, everyone knew who was meant.',
      'In his teens, when he truly entered the school as a pupil, a knife, a wooden shovel and a peach were set on the table for them to choose from. He chose the knife, and the trial that followed was to cut off a monkey’s ears; he did it through gritted teeth, and was in a daze for a long while after. Only later did he learn that the knife stood for a physician’s courage. What he had chosen, he never told Jiang Li, Xu Qiusheng or the others.',
      'He once gave Xu Qiusheng a brush rest in the shape of a bamboo joint: “He wanted me always to remember: a gentleman keeps his jie.” Jie 节 is both the joint of a bamboo and integrity.',
      'A hopeless cook. Life is for blowing up kitchens.',
    ],
    highlight: [
      'In the second month of 756, at the front, he alone insisted on examining the bodies once more, and found among them that Cheng Kai might yet be brought back. When Cheng Kai was carried back and his armour taken off, the scar on his right forearm showed, and Shen Hanying knew him for the boy who had once saved his life. Xu Qiusheng urged him not to, and Li Tingshen begged him to: caught between the two, he made up his mind, and spent his inner strength to the last to seal the wounds and clear Cheng Kai’s breath and channels.',
      'In the fifth month of 756, his inner strength still spent, he was surrounded when the Langya Army raided the pasture, and died protecting the wounded.',
      '“When we speak of hastening with all our heart to the rescue, it so often… does not come down to the ‘rescue’ at all. What we do is, mostly, the ‘hastening’. To go, to do all we can, to attend to and ease every kind of pain and sickness: that is where the heart of it lies.”',
    ],
  }, // 沈含英
  xuqiusheng: {
    name: 'Xu Qiusheng',
    zi: 'Wenzhan',
    birthplace: 'Xinfeng county, Yongzhou (Jingzhao Prefecture), Jingji Circuit (merged into Huichang in the seventh year of Tianbao, renamed Zhaoying: the county of the Huaqing Palace)',
    gloss: 'Chuci, “Summons of the Soul”: “Deep, deep (zhan 湛) the river water, and maples above it.” Hong Xingzu’s supplementary commentary: “The maple… after the frost its leaves turn a lovely red, and so the poets often speak of it.” The maple is a scene of autumn, so zhan is matched with qiu 秋, autumn. In the Five Phases autumn belongs to metal, and metal is the sign of arms: it feels like fate, a man bound for places where you fight with your strength, not a scholar of the usual sort.',
    profile: {
      '官职身份': 'When war came he came to help, and served as army physician in Li Tingshen’s camp; in 764 he was made Medical Erudite of the Tiance Command, and spent the rest of his life there. He took Kyōya as his pupil.',
      '体貌特征': 'His face is stern, cool and aloof; measured against the usual picture of the inner-strength schools, he looks rather rugged. He is often too lazy to tie up his hair, and when alone often has the air of one who sleeps among the hills and marshes, easy and detached.',
      '性格': 'Upright and mild, but with a sharp tongue. His expression is distant and cool, yet there is vigour in how he acts. Meticulous in everything he does. Rather a pessimist: he often feels that all he does will leave no trace in the end, and that the world will always simply be as it is. That is not something he could ever say to his senior brother or junior sister; when he happened to mention it to Cheng Kai and Li Tingshen, they understood, and that, oddly, was a comfort.',
      '偶像': 'The free spirit of the Wei and Jin. The poetry of Tao Yuanming.',
      '武学': 'A marvellous two-path man, liable to switch at any moment into a hot-tempered Huajian, Wanhua’s striking path. He seldom strikes, but when he does, it counts.',
      '随身物件': '“Xuanhu”, the healer’s hanging pot: a small bronze piece in the shape of a teapot, small enough to close in the hand, given him by his senior brother when they came out of the Valley to help; and the bamboo-joint brush rest Shen Hanying gave him.',
      '喜好': 'Longing for the Wei and Jin in all the wrong ways: he longs for carefree moments of “the weeds thick, the bean sprouts few”, with no need to dress properly, and really does it, too: on a summer night, leaning on a rock by the pool with his collar open, perfectly content.',
      '专擅': 'Painting. Landscapes and figures alike, though he seldom mentions it himself; later he drew reconnaissance sketches to help the army.',
    },
    anecdotes: [
      'The son of a village martial-arts teacher, he learned some rough external skills, and so moves briskly, is not afraid to act, and speaks bluntly, at times even a little roughly: that was how he poured medicine into Cheng Kai when Cheng Kai fell into a sudden coma. His martial upbringing has its uses, too: testing needles on himself, he can go all out and bear the pain.',
      'His home county of Xinfeng had Huichang carved out of it in the Tianbao years, and Huichang was renamed Zhaoying: the very county of the Huaqing Palace. In the tenth month of 747, when Shen Hanying went with his master to the Tiance Command, Xuanzong was visiting the hot-spring palace and renaming it the Huaqing Palace: the emperor was in his home town.',
      'His father died in an epidemic; Shen Hanying, travelling to treat the sick, saved his life and his mother’s, and brought him into the school: “Are you afraid?” “They’re my own parents. What is there to be afraid of? But do you have a way?” “I will do all I can. Come in with me.” He did not hesitate.',
      'Some of his fellows laughed at his background and said that he was a rough sort, after all. As a boy he minded this terribly, and his early training did not go smoothly: for the first two years he could never pass the school’s examinations at the first try. He fretted, while Shen Hanying, unhurried beside him, kept him at his books. Later, examining patients and using the needle, he was trained in all of it by Shen Hanying, hand over hand.',
      'His mother, gravely ill with a winter chill, did not live through that winter. On New Year’s Eve Shen Hanying stayed with him, sitting on the couch, talking slowly: “Brother, I just never thought that in the end it would be my own family I couldn’t save.” “When we speak of hastening with all our heart to the rescue, it so often… does not come down to the ‘rescue’ at all.” He revered and loved Shen Hanying, and followed him for years after; perhaps some of what he felt went beyond what fellow pupils feel, but he did not want to pick such things apart.',
      'His senior brother, having saved Cheng Kai, could not protect himself and died at last, and for a time he bore Cheng Kai a grudge for it. Later Cheng Kai risked his life to bring back Shen Hanying’s jade pendant, and seeing that he meant it from the heart, he came to respect him. “Qiusheng could die at any time. But as things stand, I have to find a way to live. I can’t let all that my brother cared for fall into the dust for nothing.”',
      'He is from Xinfeng: the first line of Wang Wei’s “Song of Youth” is “The fine wine of Xinfeng, ten thousand cash a measure.” He can hold his drink, and would drink with Li Tingshen till midnight, sometimes talking of poetry and painting too: the plum-blossom-in-the-cold picture that always hangs in Li Tingshen’s room in winter is his work. But of course he can’t outdrink Li Tingshen: one night Li Tingshen, all smiles, drank him into a stupor, and he wandered off on his own to use Shangyang Finger on the bushes beside the camp, befuddled but utterly determined.',
      'Schrödinger’s obsessive: the brushes on the rack on his desk must hang in order of size, but that is only for putting them away; when he actually writes, anything goes, and he can write small characters with a big brush; once he took a battered brush with its hairs all splayed and, as if nothing were amiss, wrote fly’s-head small script with a single tuft. Ask, and he says a good calligrapher doesn’t choose his brush; ask what a brush needs for good calligraphy, and he says it needs hairs.',
      'By nature he likes to keep a low profile, free and without ties, yet everything he does is the result of accepting a tie: Shen Hanying asked him to watch over the two generals, and he did, and in the end spent his life at the Tiance Command; in the Valley he always said he did not want to take pupils, and yet he took Kyōya on. He once bound the herb drawings Kyōya had made into a book and took it to the Valley to show his fellows, and was rather proud of it. (Note: the Newly Revised Materia Medica originally came with twenty-five juan of Illustrations; his volume carried on the tradition of the officially compiled herbal atlas.)',
      'When it came to choosing one of three he took the wooden shovel, which stands for a physician’s diligence. “By my nature I would have taken the knife, for sure. But I thought then: I’m a rough sort anyway, and having come to this fairyland of a place, I ought to be a bit more refined.” He jokes that from the war camps all the way to the Command, what he has laboured with is indeed his strength, and only his strength.',
    ],
  }, // 许秋生
  jiangli: {
    name: 'Jiang Li',
    zi: 'Zhihua',
    birthplace: 'the outskirts of Chang’an (an orphan, rescued and brought back by people of Wanhua Valley)',
    gloss: 'Li 蓠 is a fragrant herb of old. Shuowen: jiangli is the miwu herb. Sima Xiangru, “Fu on the Shanglin Park”: “covered with jiangli”. Lu Ji of the Western Jin, “Imitating ‘Green, Green the Grass by the River’”: “Lush, lush the jiangli grass, shining (yiyao 熠燿) it grows by the river.” Yiyao is brightness, like something fluttering in the wind. Zhi 芷 speaks of its fragrance, and hua 华 answers its light.',
    profile: {
      '官职身份': 'Army physician. Later she settled by the Qingzhou Flower Sea, teaching the foundations to the junior disciples of the Zhengyi rank. Chen Ruihe’s wife.',
      '性格': 'Clear-sighted and quick, bright, innocent and wise, with a stubborn streak and a sharp tongue too. Young, but she sees things clearly; once she decides, she never regrets it, and she adapts very well to any surroundings.',
      '偶像': 'Li Tingshen, you might say. Plenty of her fellows courted her, but she found them, good-natured as they were, too modest and quiet, a little dull; and the wild eccentrics and free spirits she found too strange. Then she met Li Tingshen, a general so very scholarly, with so little presence that she once took him for an official from the capital, and so came to love him.',
      '武学': 'Mainly Lijing, Wanhua’s healing path. But Xu Qiusheng often had her train with him, so her martial arts were not neglected.',
      '随身物件': 'A bracelet from Shen Hanying: offcuts of green jade ground into little bamboo joints, bored through the middle and strung on silk thread. On her desk she always keeps a copy of Chen Cangqi’s Supplement to the Materia Medica (739), which gathers the folk herbs left out of the standard works.',
      '喜好': 'The Chuci; sewing sachets. Growing up in Wanhua Valley she saw many rare flowers and strange plants, yet she cares nothing for costly blooms, and loves to gather little wild flowers and fragrant herbs to make sachets to wear at her waist; she often jokes with “Better to be the orchid broken and the jade shattered than to flourish as mugwort and wormwood”, saying that mugwort and wormwood are just what she likes. (Note: from the Shishuo xinyu, “Speech and Conversation”; in the Li Sao mugwort and wormwood are the weeds of “Why have the fragrant herbs of former days now become mere mugwort and wormwood?”, so her liking for them turns the Li Sao on its head.)',
    },
    anecdotes: [
      'When it came to choosing one of three she was still small, and liking neither of the other two, she chose the peach: a physician’s wisdom.',
      'Back then she insisted on going out of the Valley with her senior brothers to the front at the Eastern Capital, and found the wounded in a far more dreadful state than she had imagined: at first she even felt sick, and would run out of the tent to deal with it on her own and then come back, never letting it hold up the work, and so little by little grew seasoned.',
      'After two or three years with the army, hearing that the Valley was in danger, she went back with her fellows; before she left she got no answer from Li Tingshen, and went away heartbroken. By the time she arrived the trouble in the Valley was over, leaving only devastation (this was the autumn of 758); rocks loosened by the blasts came down again, and she was hurt by a falling stone, the bones of her back put out of place. Chen Ruihe got her out, treated her with care and helped her recover, and over a year or two, warmth grew between them.',
      'Later, in the Valley, she saw Xu Qiusheng bring Kyōya. Kyōya’s handwriting looked familiar to her, and yet it was not Xu Qiusheng’s hand; she asked who had taught him, and Kyōya said: General Li. She was lost for a moment, and picked up the sheet and looked at it for a long time.',
      'In Chang’an in 763 she met Cheng Kai again, by then with child. When the child was older, she went back with Chen Ruihe to live quietly in Luzhou.',
    ],
  }, // 江蓠
  daoyong: {
    name: 'Daoyong',
    birthplace: 'Qihua Village, below Mount Shaoshi',
    profile: {
      '官职身份': 'A warrior monk of the Dao generation of Shaolin’s Bodhidharma Hall. He entered Shaolin as a novice in the fifth year of Tianbao (746), and after some years of labour the head monk obtained an ordination certificate for him and he became a monk.',
      '性格': 'Young and full of his own thoughts; he often lost himself listening to the great bell on the mountaintop.',
      '武学': 'A warrior monk. In a moment of peril, a stroke of the Golden Bell saved Cheng Kai.',
      '专擅': 'Chanting the Golden Light Sutra to deliver the suffering and protect the realm: “Within the golden light one may see me, Shakyamuni.”',
    },
    anecdotes: [
      'The youngest child of his family. His father was rough and hard to reason with, and he leaned on his mother a great deal. As a small boy he went down to the fields with his parents, and all their labour brought them barely enough to eat; he often wondered where all that work went. Then his mother died of illness, and he grieved terribly: he thought how one day he would grow up and become a father himself, and when he died his children would have to suffer like this too, and for a moment everything was empty, and he crawled and climbed up the mountain to the monastery gate. When he got there he did not knock but only stood, all night in the wind and rain. The senior brother in charge came out and asked him: So young, and you came up alone? He said: No. The wind and the rain came with me, and the sound of the bamboo.',
      'In the summer of 755, at Tongguan, he performed the rites of deliverance for the unborn child of Lanchuan Yun and Cheng Kai; in the fifth month of 757 he came upon the remnant camp of the Tiance Command at Mount Mang and saved Cheng Kai, and so stayed in the camp for a time, mostly sitting peacefully on a rope seat under a tree, burning sandalwood and chanting sutras.',
      'He told the people of the Tiance Command: The north gate of Baima Monastery stands at the foot of Mount Mang, a long way from the monastery itself, and so the saying goes that at Baima you gallop a horse to shut the gate; when this humble monk lodged there I often heard the sound of armies shaking the earth in the far mountains, and so I have long held you in respect.',
      'When he left he left a slip of writing: “I keep one mind, and wish the prisons ever empty and the beacons long at rest. Years without a word of shield and spear, the ears full only of strings and flutes; unmoving as Mount Song, may it guard Luoyang ten thousand years.” Li Tingshen treated him with courtesy and listened to his teaching together with Cheng Kai, and after he left placed a scroll of the Diamond Sutra on his desk, hoping his comrades would be sheltered by its strength, firm as metal and stone, before which nothing hard can stand.',
      'He had an old bond with a monk of Lingyin Monastery: it was this monk he had met that rainy night as a boy at the monastery gate, and it was through him that his ordination certificate was obtained. Later the monk travelled south of the Yangzi and took charge of affairs at Lingyin, and Daoyong came to Lingyin several times and came to know Ye Tiandeng; the three of them, never minding seniority, were friends across the years, and would talk deep into the night by lamplight. In the winter of 758, hearing of the monk’s death, he hurried to Lingyin; when Ye Tiandeng cut off his hair before the Buddha he was utterly astonished, and stared a long while before going up to help him tidy his hair, and went in with him to see the abbot.',
      'He saw Cheng Kai again after the war, and Kyōya too: it was some years later that Cheng Kai happened to bring Kyōya on a visit to Shaolin. Kyōya seemed lost in thought over the line on the desk, “The River of Heaven surges; a single reed crosses it”, and he laughed and sighed: Ah, little Patron Ye (the Ye of Kyōya’s Chinese name, Lin Yeshi). I once knew another Patron Ye, but he went a long way round before he found his answer. Not like you: you know it now. At that moment he seemed to see himself before the monastery gate.',
    ],
  }, // 道永
  huimu: {
    name: 'Huimu',
    profile: {
      '官职身份': 'The youngest of Shaolin’s Hui generation. Obsessed with woodwork since boyhood, he is skilled at carving and at making mechanical wooden figures. Hayashi Kyōya met him in Wanhua Valley, picked up a little of his learning and skill, and went back to the Tiance Command to help improve its message kites.',
    },
    anecdotes: [
    ],
  }, // 慧木
  yetiandeng: {
    name: 'Ye Tiandeng',
    zi: 'Zhao',
    birthplace: 'A farming family in a village near Hangzhou, Jiangnan East Circuit',
    gloss: 'Buddhist books take the lamp as a figure for the Dharma: there is the Record of the Transmission of the Lamp. Du Fu: “The lamp is handed on where there is no daylight; the ground is spread with yellow gold.” Zhao 照, says the Zengyun, is “to shine, as a lamp does”. Book of Changes, “Li hexagram”: “The great man, continuing the light, shines on the four quarters.” So zhao answers the lamp’s light, saying that in the end he goes back to the Buddha’s way. At home he had been named Tianding, “add a son”, without much thought; after he entered Cangjian a monk of Lingyin changed his name and gave him a courtesy name: “Tian-deng, add a lamp, add a flame: just those two characters. And the one character Zhao. It’s not that I was born a Ye of Cangjian; my school said I could take the surname, to make things easier when I’m out in the world, so I use it. Really, the thirty-two marks are no marks at all. A name like this, who knows, it may change again one day.”',
    profile: {
      '官职身份': 'A disciple of Cangjian Manor (not born a Ye). In the winter of 758, at Lingyin Monastery, he raised his sword, cut off his hair and became a monk.',
      '性格': 'Obsessed and wholehearted, unable to tell principle from practice; Ye Boqiu said of him: “You’re obsessed, you are. All I ever heard of you was that you were thick-headed and stubborn; turns out you’ve got this kind of drive in you. You might come to something.” He has his father’s affliction: when he is pressed it flares up and he behaves wildly. Hearing the chanting day and night at the monastery, he slowly gained the power to calm his spirit and settle his will, and any book he has read aloud he remembers, and remembers firmly.',
      '武学': 'The sword. He once went to the Sword Lodge to learn forging. After his sudden awakening in the winter of 758 he beat every senior brother and sister he had never been able to beat; everyone called it mastery, which he did not like.',
      '喜好': 'Telling koans and stories of cause and condition. By West Lake he told Zhu Lu the story of Shenguang cutting off his arm and the red snow falling from heaven; in the Southern Market at Luoyang he named Cheng Kai’s bow Cangqi, “keeping the tool hidden”: the gentleman keeps his tool on his person and waits for the moment to act.',
      '专擅': 'Polishing bronze mirrors: he learned it from a master craftsman just after leaving his school, through an old friend: “There’s something in it that’s like polishing a sword.” He brightens the face with mercury, and soaks the mirror a day in green-vitriol water to give it the look of a Qin or Han antique, which can only be done in the plum-rain season of Jiangnan.',
    },
    anecdotes: [
      'He came from a farming family in Jiangnan. His mother died early; his father was a petty thief who stole and drank, his temper never steady, now sunk in gloom, now violent, and when he was beaten outside he came home and took it out on his son. When the boy was four or five, his father, who would not stop stealing, was beaten to death by villagers who had not meant to kill him; the boy went looking at night and found his father’s body lying in the open, and all he could find to cover it was a torn mat. After that he wandered, stealing and getting beaten, and nearly went the same way, until the authorities took him into a foundling home, where he was wild and hard to manage.',
      'A monk came to the foundling home to give alms, and when a stall-keeper caught the boy he got him out of trouble; seeing the mass of scars under his sleeves, he put medicine on them, and later took him back to Lingyin Monastery. The monk saw that he was fed and warm and slowly taught him to read and write and the principles of things; there was only compassion in his eyes, and he never reproached him, except that when the boy scribbled and scrawled he grew especially grave and warned him to respect and cherish paper with writing on it, and gave him a brush dipped in water to draw on the ground with. The boy took the monk to the place where he had found his father’s body; the monk put his palms together and chanted the Yankou, the rite for feeding hungry ghosts, and the boy stood by and watched in silence.',
      'Among his fellow disciples he alone kept to himself; he often could not keep up with the reading, and when he got frantic the affliction flared: he would sweep the books to the floor and knock the teacups over, and when he came back to himself he would clear up in silence and apologise, and he was laughed at a good deal for it. He went back to Lingyin and poured out his troubles to the monk, who said: Fast or slow for a while, none of it matters. Look at the spring: it rises and sinks, and yet it never runs dry; that is the principle of it. Going to the manor to learn the sword was your own choice. Have staying power: that is your lesson.',
      'Eating at the manor was almost the first time in his life he had eaten meat.',
      'Later he went to the Sword Lodge to learn forging. A newly forged sword must be blooded, and snake’s blood is mostly used; Ye Boqiu said: Remember, never kill the innocent at will; in our hands the blade of the asura, in our hearts the path of bodhi. He turned it over a good while and then suddenly brightened: Yes. The blade of the asura, the path of bodhi. It was the first time he had found a point where the two halves of his life joined, and he felt that this was how he ought to exist.',
      'In 752, learning mirror polishing in the Southern Market at Luoyang, he met Cheng Kai and Lanchuan Yun, out shopping before their wedding, and gave them an unsigned mirror with a water-chestnut-flower rim as a wedding gift: “Great riches and great fortune: how could you seek those in words and sounds?” “Polishing a brick won’t make a mirror, and sitting in meditation won’t make a Buddha. No need to cling to forms. The causes and conditions are settled beforehand, not in these empty forms.” He also named the newly bestowed horn bow Cangqi. Seeing Cheng Kai split a melon with the bowstring, he suddenly felt that here at last was someone who truly did not cling to forms.',
      'In the autumn of 758, when the turmoil reached Jiangnan, the monk took a stray arrow for him and died; dying, he said: Ten thousand thoughts return to one, and life goes on without end. War and separation… they are your lessons too. He ran back to the manor and fought all day; many of his fellow disciples were killed or maimed, people scattered on the ground among the broken blades. Looking at that sight, he thought again of the blade of the asura and the path of bodhi, and the man who had said it was no longer in this world: that man’s blood had been offered up to the enemy’s sword. Afterwards, keeping vigil, he slept for months fully clothed with his sword in his arms, afraid it would come again and find him empty-handed.',
      'As winter came on snow fell over West Lake, and he woke one morning to find that the sword beside him didn’t look like a sword, but like the stone it was first forged from. At practice no one could beat him; everyone said that, compared with before, it could of course be called mastery, but he was not glad. Keep the tool on your person and wait for the moment to act: when he was most needed to act, he had no tool on him; after that, having or not having, keeping or not keeping, made no difference. So he stood a long time before the Buddha, watching the candle flames flicker, raised his sword and cut off his queue, and the golden crown, pin and ribbons fell to the floor.',
      '“Before the rain he mends his patchwork robe; under the leaves he shuts the double gate.” On the eighth day of the fourth month of 759, the Buddha’s Birthday, Zhu Lu saw at Lingyin Monastery a monk in a blue-green robe whose brows and eyes were just like Ye Tiandeng’s of old, only his head was shaved; she called out to him, and the monk lowered his eyes, put his palms together in greeting, turned and walked away.',
    ],
  }, // 叶添灯
  yeboqiu: {
    name: 'Ye Boqiu',
    profile: {
      '官职身份': 'An elder of the Sword Lodge at Cangjian Manor, in charge of forging swords. A newly forged sword must be blooded, and snake’s blood is mostly used: “Remember: never kill the innocent at will. In our hands the blade of the asura, in our hearts the path of bodhi.” He died fighting at Cangjian Manor in the autumn of 758, when disaster came to Jiangnan.',
    },
    anecdotes: [
      'Of Ye Tiandeng: “You’re obsessed, you are. All I ever heard of you was that you were thick-headed and stubborn; turns out you’ve got this kind of drive in you. You might come to something.” And: “Since when does this old man need you to tell him whether he’s right?”',
    ],
  }, // 叶泊秋
  peiyuan: {
    name: 'Pei Yuan',
    profile: {
      '官职身份': 'An elder of Wanhua Valley. When new disciples enter the school he sets a knife, a wooden shovel and a peach on the table for them to choose from: the knife stands for a physician’s courage, the shovel for a physician’s diligence, the peach for a physician’s wisdom. Shen Hanying chose the knife (he had to cut off three pairs of monkey ears before it was done), Xu Qiusheng the wooden shovel, Jiang Li the peach.',
    },
  }, // 裴元
  gaoyuan: {
    name: 'Gao Yuan',
    zi: 'Huaiqing',
    epithet: 'Split the Stone: Green Within',
    hao: 'the Inquisitor',
    birthplace: 'a village below Mount Taibai (the Qinling), Guannei Circuit',
    gloss: 'He saw the moss creeping green over the rocks on the mountain and reckoned that inside they were green too, and would stay so: “so I have long held the green within”. Even if you split the stone, it is green at heart, the same inside and out, never changing. The two seal-script characters on his waist token look like a picture, as if he had painted his life onto it; Gao Qian’s verdict: “That’s far too much like a person’s name… too honest a heart, really.”',
    profile: {
      '官职身份': 'A senior member of the Lingxue Pavilion’s Jishu Bureau. Correspondence, intelligence analysis, inquiry and interrogation: he was good at all of it. He helped manage rewards and punishments for the Pavilion’s disciples, and most of the Bureau’s training and interrogation methods were drawn up or improved by him, so that his colleagues called him “the Inquisitor”, and in jest “Minister Gao”. He once ran intelligence and often went into the Main Pavilion, with the ear of the throne itself; after the false charges of 745 he went back to inside work, keeping the Qianqiu Tower and in charge of the rolls, death benefits and records; in 739–741 he was asked to go to the Tiance Command’s Heavenly Slayer Corps to teach interrogation and the endurance of torture.',
      '体貌特征': 'Tall and imposing, broad in the shoulders and back: put him in armour and he could pass for a general. For years he wore a white robe, black trousers and a vermilion sash, all ordinary cotton and hemp; in winter, a white scarf, red at both ends, with a scorch mark along one edge. In 745 a beating injured one side of his waist and hip, and his right leg could never bear his weight again: the leg never healed, and the man always stood straight.',
      '性格': 'Upright, strict and careful; young, but never one for horseplay. There is no chill in his eyes; he simply goes straight to the point, with little idle talk. Strict with others and stricter still with himself, he often put himself in harm’s way on missions to cover others, and his colleagues saw him as a pillar. Thorough to the last degree, and yet “always stopping at that one step”; Gao Qian said he kept to his own ground, and was in truth afraid of making mistakes, afraid of sacrifice.',
      '偶像': 'Shuliang (Xuan Kang): for saving his life in the snowy forest, bringing him into the Pavilion and teaching him; and for those hands, so practised, that threaded a needle for the boy.',
      '武学': 'The Lingxue Pavilion’s chain blade. His strength was hard and forceful but his footwork never quite kept up, and his martial arts never came to great things; yet he understood deeply how to teach. He created “Beyond the Blue Hills”: the blade’s force cuts a chasm in the ground, and the chain blade binds a man as if under the cruellest torture, the agony breaking his will; only when the blade is withdrawn does he find that the chain’s pain was all illusion, and there is not a mark on him. He used it to test disciples’ endurance of pain and to shake the will of those under interrogation.',
      '随身物件': 'A waist token with “Huaiqing” in seal script; a long white scarf with red edges (the scorch mark was made by the child Xuan Yang one night; after his death the village woman passed it on to Xuan Yang); bone-setting remedies collected over the years by the post riders, so many he could play cards with them; bean paste pressed into bricks and drying above the stove; and, at the very back of the kitchen against the wall, a jar of Jiannan shaochun with some still left in it.',
      '喜好': 'A superb cook: stir-fried noodle toppings, tangbing noodles, steamed buns, bean paste (Gao Qian called it “the paste-smith’s devotion”, a pun on “the craftsman’s devotion”). He studies how food is made in every region, and has to get to the bottom of things like the bean bricks of the Yingzhou merchants, or why Shehong shaochun keeps for the better part of a year without spoiling. Mending and sewing: “Clothes have to be mended; they’re not something you can throw away.”',
      '专擅': 'Intelligence analysis; indexing and putting records in order (any collection he can lay hands on gets a clear index, and the shelves look new); inquiry and interrogation; seeing through disguises (he could tell a false general by the lack of calluses on the web of the hand and the knuckles). “I report only to whoever gives me my orders.”',
    },
    anecdotes: [
      'In the winter of 723, abandoned by his uncle’s family, he trudged all night through the snowstorm carrying his little brother on his back; behind a bank of earth he undid their bundle, wrapped the boy in a felt mat and held him tight. At dawn a pack of wolves surrounded them and he fought them off with everything he had, until Shuliang’s chain blade saved them. “What you get by begging… is never really yours in the end.” “So long as there is a way to make a living, I’m not afraid. Anything is better than freezing to death in the snow.”',
      'He passed the entrance trial only at the third attempt, tripped up by the mechanisms and by stray thoughts in the Birds-Never-Return (the Pavilion’s trial forest); in training his footwork never kept up, and the seniors would shout in front of everyone, “Gao Yuan, too slow!” In a selection trial he twisted the spear out of a false general’s hands, touching his palm and fingers at close quarters, then without a word walked straight off to report; so he was assigned to the Jishu Bureau, where he began by learning to read.',
      'Raising his little brother alone: the thin hemp cord he found to tie the child with was never used in the end, and later the little wild cat clawed it to shreds. Once he kicked away a bun some ruffians had tossed them and hurt the boy’s finger by accident; after he had shouted in anger, he reached under the little one in the night and felt the bedding wet and warm. He froze, and after a long while, the tears came.',
      'The day the village woman married, he shut the brushwood gate tight and leaned against it, listening as the pipes and drums and singing faded away, his fingers twisted into a corner of his scarf, with only that much strength left in him. “What matters most is now. Now he is sure he will never freeze to death in the snow.” Years later, sent home by her husband because she had borne no son, she brought old but clean little clothes for Xuan Yang.',
      'When he heard that the village woman had been sent home, and not even allowed to take her daughter, he threw down the scissors in his hand with a clatter. When Xuan Yang learned the truth of her own origins, she suddenly understood that throw.',
      'At the burial grove in 745 Gao Qian accused him of letting a comrade die without helping: “That is the one thing that can’t be forgiven: what you just said.” A person’s fate is to watch door after door close in front of him, without knowing how to open them again. Or they never open again.',
      'The false charges and the torture: most of the Jishu Bureau’s interrogation methods he had helped perfect, and now they were turned on him. However they questioned him, there were only a few words: “No. It wasn’t me.” Of Gao Qian’s grudge and all that lay behind it, he said not a word. The day he left prison he pushed away the hands that tried to help him, gripped the wooden rail and hauled himself up, staggered out, and fell on the steps.',
      'In 748 he went to Chao County and asked the woman in the kitchen, “What are you making?”; when he had heard how the soup was made he left all his rice, flour and silk on the stone table and walked away alone. On the way back, at a riverside tavern, someone threw him an old woman’s wooden hairpin with a brown stain on it: “The one who ought to know, I’ll see that she knows. If you make any move then, don’t blame me.”',
      'In 748 Shen Hanying burned incense and massaged him to treat his injuries; when he pressed on the bruising knotted there for years, tears with no source welled up from the wound, or from his chest, and he covered his eyes tight with one hand and sobbed and sobbed. “Water runs over the piled stones, and moss grows on them again. When the moss is old and thick, the water cannot pass, and no spring grass grows.”',
      'In the winter of 752 his old injuries flared up again and he died coughing blood, with no one beside him; the charcoal in his room had burned out, and it was as cold as an ice cellar. Soldiers call dying of illness a good end. He left a letter for Xuan Yang setting out her origins, and the question “why must people like us go on surviving at all?”',
    ],
    highlight: [
      '“People should be like the hawk. Through a hundred desperate straits and a thousand turns of the mountain road, there is always a way out. You must get out. Once you are out and far away, look back, and the answer will be there.” (from his last letter to Xuan Yang)',
    ],
  }, // 高垣
  gaoqian: {
    name: 'Gao Qian',
    zi: 'Digu',
    epithet: 'Moss on the Bones of the Earth',
    birthplace: 'a village below Mount Taibai (the Qinling), Guannei Circuit',
    gloss: 'From the Bowu zhi (Treatise on Curiosities): “The earth has the famous mountains as its helpers, and stones as its bones.” Moss returning to the bones of the earth: the brothers entered the Pavilion seven or eight years apart, yet each, without the other knowing, took his name from the same moss-grown stones by the lake outside the compound.',
    profile: {
      '官职身份': 'A disciple of the Lingxue Pavilion’s Wugou Terrace, trained at the Mingshan Hall; in the same squad as his elder brother Gao Yuan, the Zhijun Qinggu squad, and credited with kills in the Great Bright Temple affair of 739. Later posted out to the area under Chengdu Prefecture in Jiannan Circuit, he was recalled and punished for a leak that cost his comrades their lives, and confined for three years; incited by the Lingxue Tower (the Yanbing Court), he stole secret scrolls from the Jishu Bureau in 745, was found out, fought his way to the Xuanhe Lodge, was caught, and killed himself.',
      '体貌特征': 'Young and agile, quick in and out with the chain blade; masked, he slicks his forelock back, and his eyes dart about: “I’m just so very ordinary, see.”',
      '性格': 'Clever and frank, like their mother, but with a touch of gloom somewhere hard to name: call him, and he grins, and you can’t see it any more. Careless of small proprieties, headlong and a law unto himself, he got out of danger alone again and again, and things did turn out well in the end. He prided himself on his “home-ground cunning”: not in weapons, not in skill, but in knowing more than anyone.',
      '偶像': 'His elder brother Gao Yuan: “I can’t fall short either; I want to be like you.” Later, bitter and estranged: “And to think I once… wanted to be someone like you.”',
      '武学': 'The chain blade. Outstandingly gifted, quick and perceptive in the essentials at the Mingshan Hall, under his brother’s guidance he became the best of his generation, a better fighter than his brother; posted to Chengdu, within days he had sketched a map of the area for his squad, and before long he had even picked up the dialect.',
      '随身物件': 'A waist token with “Digu” in seal script; two jars of Shehong shaochun sent from Shu by his Tang Clan brothers.',
      '喜好': 'Gathering friends to drink, talk and laugh; skipping stones: the pebble skims away in an arc, leap after leap, the evening light breaking on the water and closing again, and he never tires of it; in plain clothes and a bamboo hat he goes in and out of teahouses and taverns, and knows everything that goes on in every street and lane.',
      '专擅': 'Street intelligence, dialects and maps, close-quarters agility; he knows the lie of the land: “I’m on this square platform every day; I know what’s where better than anyone.”',
    },
    anecdotes: [
      'In the winter of 723, abandoned by their uncle’s family, he was carried out of the snowy forest on his brother’s back, half awake, calling for his brother, calling for his mother. The bed-wetting stayed with him for some years before it got better.',
      'At ten or so, squatting with his backside in the air under the stove to light the fire for his brother: the firewood was damp, and the smoke drove them both out of the kitchen to stare at each other; Gao Yuan added another smudge of soot to his nose, and they both laughed.',
      'In the squad there was a girl he had grown close to back in training; they had feelings for each other, but with lives like drifting weeds, neither said so. She died on a mission, and he hung her waist token on a branch in the burial grove: “Not many people would listen to me. She was one, and you didn’t save her.”',
      'On the roof of the Great Bright Temple in 739, that stroke was meant in earnest; only, Lu Yuming suddenly looked up, and the line of the blade went wide. With the tip of his blade he flicked the Sasanian agate seal from Lu Yuming’s belt and tossed it to Lanchuan Yun to claim the kill: “The rest is mine,” and carried the man off. Some way along, he realised he was still breathing. The Great Bright Temple business was done; the secrets this man knew were worth nothing now, and all that was left was to finish him or dump him somewhere. And he happened to know where to dump him: he dealt in street intelligence, had long kept watch on whose house Lu Yuming stayed at in the city, and knew whose door to knock on. He did not finish him, nor take him to the Jishu Bureau, but left him at the door of that old Persian family, knocked, and went over the wall: the bit of mercy that had always been in him, and also his laziness, his not caring. He never spoke of it afterwards (to change his story he would have had to strip Lanchuan Yun of her kill and own that he had given her the credit on the spot); when he died in 745, it went with him into the burial grove.',
      'The truth of the Chengdu leak: “Don’t take the lane south of the city” was said, quietly, to the wine merchant’s family. “If they ran into it, could they come out alive?” The two jars of Shehong shaochun had come at just the right time, and at that meal neither of the two touched a thing.',
      'In the autumn of 743 he sparred with Lanchuan Yun and won on a wet, mossy stone: “Some people look at the stone; some look at the moss, I suppose.” “Mm, interesting. That’s true.”',
      'In 745 the Lingxue Tower worked on him: “He doesn’t take you seriously; there are those who value you.” Fighting on the hillside, he wounded his brother, and the edge of his blade trembled a little: “Brother, it’s been a while; looks like you’re the one who’s let his practice slip.”',
      'Caught, and knowing he would not live, he killed himself with poison hidden in a molar, insisting to the end that the Xuanhe Lodge affair had come from his brother: denouncing him by dying, brother against brother. To this day there is no resting place for Gao Qian in the burial grove.',
      'At the New Year he made mutton filling and shaped laowan dumplings, and told Xuan Yang not to call him Uncle: “Call me that and I’ll want to lean on a stick and stroke my beard at you every day.” He opened a jar of Jiannan wine and teased little Xuan into sneaking licks from a wooden cup, until Gao Yuan reached over and covered the cup with his hand.',
    ],
    highlight: [
      '“You soldiers all dream of being open and aboveboard. But think about it: how many people can stay aboveboard alongside you? You just trap yourselves.”',
    ],
  }, // 高堑
  xuanyang: {
    name: 'Xuan Yang',
    zi: 'Youyin',
    epithet: 'The Hawk Comes Down from the Mountain',
    hao: 'Huaiqing (her master’s name)',
    birthplace: 'Wugao Village, Chao county, Luzhou, Huainan Circuit',
    gloss: 'Her waist token carries on her master Gao Yuan’s old name, “Huaiqing”, which puzzled Cheng Kai when he saw it: “Chuan’er… told me about this name. But she said it was a man.” Her father Shuliang’s real name was Xuan Kang; “Xuan Yang” shares her father’s surname, and the truth of her origins came out only after her master’s death.',
    profile: {
      '官职身份': 'A disciple of the Lingxue Pavilion and Gao Yuan’s heir. Found and taken in by Gao Yuan at a ruined temple in Chao County in 740, she formally entered the Pavilion after the upheaval of 745, was later put into a squad and posted out to the Duji region around Luoyang. In 757 she investigated in secret for the screening of surrendered officers and men in the two capitals, and planned the rescue at the North Park lodgings in Luoyang; in 759 she went into an army camp to look into the eunuch Army-supervising Commissioner; in 770, when Yu Chao’en was executed, a plot the Pavilion had a large hand in, she went to the Tiance Command herself to tell Cheng Kai.',
      '体貌特征': 'Small, with a pair of round, jet-black eyes; head tilted, a blink: a living little thief grown into a sharp-witted young woman. Later she wore a spray of deep red flowers at her ear.',
      '性格': 'Quick-witted and decisive: “Being able to decide matters most. What’s done is done, what’s heard is heard; let the past go” (from Gao Yuan’s letter). She knows her own mind, and every word she says is like a jade bead, pattering down all over the floor. Stubborn as a mule: “Someone’s already asked me. I didn’t do it.” When she sees other people cry, it just annoys her.',
      '偶像': 'Her master, Gao Yuan. “Mount Taibai could fall down, but my master’s kitchen never would.”',
      '武学': 'Martial arts and the craft of intelligence, taught by Gao Yuan himself; she never forgets what she has seen, and knows how to put it together and use it, going over everything in her mind day after day; she moves through the Birds-Never-Return as if on level ground.',
      '随身物件': 'A waist token with “Huaiqing” in seal script; her master’s white scarf with red edges (the scorch mark is the one she made as a child); Gao Yuan’s last letter.',
      '喜好': 'Candied hawthorns (her reward as a child for helping cover missions); sneaking licks of Jiannan shaochun until there was no stopping her; the bustle of the two capitals, going into town with her fellow disciples on their days off: even her accent turned into the capital’s speech.',
      '专擅': 'Interrogation and memory, reconstruction and reasoning: going over it again and again, she came dimly to realise that the knife of those years might also have been handed over by her own careless listening and talk. Infiltration and disguise, quick improvisation: adding a drug to make a sickness look real, faking an escape without ever leaving the camp.',
    },
    anecdotes: [
      'A ruined temple in the depths of the winter of 740: tousled and filthy, wrapped in an old felt, she patted the dust off a flatbread she had found and held it to the fire to toast, as pleased as if she were in her own home; she took a piece of dried meat first, then quietly looked at him sideways. “You know a good thing when you see it,” said Gao Yuan. In the night she turned over and scorched Gao Yuan’s scarf.',
      'Before she entered the Pavilion, the village woman carefully trimmed her hair, and her big eyes saw the light of day again; she grinned at the woman, and the woman’s eyes went red.',
      'In 745 she watched her master walk into the main hall, his face deathly white; later she went to the prison to meet him, and remembered the reek of blood and iron soaked in over and over, and the uneven rustle of something dragged along the ground. From then on, when she saw others cry, it just annoyed her.',
      'Realising that some of the words that armed the knife in the upheaval of those years might have been hers, she was frightened and full of remorse; her master shook his head and smiled: “Hindsight: put ‘hind’ in front of anything and you can say what you like. That was my sin; none of it has to do with you.”',
      'In the winter of 752 she did not get there in time to see her master one last time; a little mongrel in the yard ran up with a battered iron plate in its mouth, and the village woman brought her the scarf: “Everything else, he took down with him. This has to go to you.” She carried the scarf to the burial grove, where red flowers under the trees covered the snow, and the snow covered the red flowers again.',
      'Once she had his letter she spent years running about, piecing together by every means the truth of her parents’ story; she met some shifty sorts too, and only smiled at what they said: “I’ll go and say it at their graves. How about that? And take you along with me.”',
      'The North Park rescue in 757: first she tied up a guard to get his outfit, put a drug in the food to fake stomach pains, killed the officer on watch and took his token; improvising as she went, she got every prisoner out.',
      'In 759 she hid in Cheng Kai’s tent for two days, and left a note under his pillow to say goodbye: “I will look for the ones you lost. If I can’t find them, then someday I will surely do something for you.” The danger over the Cheng household’s papers in 769 and the execution of the Army-supervising Commissioner in 770 both kept that promise.',
      'Her last meeting with Cheng Kai, in 770: “I know your Command has its Lingyan Pavilion. In our Pavilion it’s trees; for you it’s steles. Only one word apart, and a world of difference.” “Trees… trees, though. They last longer than steles.” At the year’s end she heard that the General of Zhijie Hall had died of illness, and looking it up found that the day of his death was the same as the day her master had died: only eighteen years apart.',
    ],
    highlight: [
      'The argument about the Birds-Never-Return: perhaps it is not that birds that fly into the forest are lost and can never come back, but that they find another way and fly off on their own: the wings are on them, not on us. So not coming back may be a good thing.',
    ],
  }, // 宣杨
  xuankang: {
    name: 'Xuan Kang',
    zi: 'Shuliang',
    epithet: 'Grain to Eat, a Bridge to Cross',
    birthplace: 'Wugao Village, Chao county, Luzhou, Huainan Circuit',
    gloss: 'Millet fills a man’s belly, a bridge lets the road through: what poor families hope for, hence the name. When he was small his mother would hold him by the river (always by the river) and say: “This grain keeps people alive, and the bridge lets people get across. Those are the things that matter most.” When he chose his own code name he picked those two characters: grain, and bridge.',
    profile: {
      '官职身份': 'A senior of the Lingxue Pavilion, stationed in Huainan Circuit and seldom at the Pavilion itself. Orphaned young, he was picked out in a poor county by the Pavilion’s regional recruiters. In the snowy forest in 723 he saved the brothers Gao Yuan and Gao Qian, and brought Gao Yuan into the Pavilion. In 736, over a case in the capital, he privately sent word to Zhang Jiuling’s household, was denounced by a comrade, and died on a mission; Li Linfu was then President of the Secretariat and Master of the Outer Pavilion.',
      '体貌特征': 'A Jiangnan accent, his speech light and quick; a streak of red scarf; his chain blade flicked out and back with a hiss, like a silver snake.',
      '性格': 'Old beyond his years (“People don’t get old at some age or other; they start getting old the moment they’re born”, the old master at the ruined temple told him when he was small, and he laughed and didn’t believe it); he seldom spoke of private things; warm-hearted and brisk, he saved people and took no credit: “A road? There is one. But it’ll cost you your life.”',
      '武学': 'The chain blade: he took shape out of the shadows of the snow, the blade drove into the lead wolf’s neck and flung it off, and the wolves on either side were all wounded and scattered.',
      '随身物件': 'A red scarf; needle and thread (borrowed from the neighbours, and threaded for the boy with practised hands); after his death, only his Guiyuan box went back to the Pavilion.',
      '专擅': 'Running the Huainan region; choosing new recruits: the Lingxue Pavilion looked for orphans in poor counties, “that way their background and they themselves are clean”, and that was how he himself had been chosen.',
    },
    anecdotes: [
      'Saving the Gao brothers from the wolves in the snowy forest in 723: “This is plain as day: they meant to abandon you.” “Didn’t you even think to beg?” The boy answered, “What you get by begging… is never really yours in the end,” and he sighed: “You’re an interesting one.”',
      'The day Gao Yuan passed the entrance trial, he was waiting before the Suming Court at the mouth of the valley, and smiled at him: “You shouldn’t have.” (The stray thoughts in the Birds-Never-Return.)',
      'In 728 (the sixteenth year of Kaiyuan) he married at Chao County, and a son was born the next year; in 734 he left home on a temporary posting to the capital and never went home again, and in the autumn of that year his little daughter Xuan Yang was born. Perhaps he never knew, to the end, that she had been born; it is not in the files.',
      'After his death the Pavilion’s death benefit never reached them: his wife worked and waited in misery, could not bear the taxes, and died with their little son at the hands of a cruel tax official and his rough soldiers; the baby girl was carried off to a market town on a neighbour woman’s back and escaped, and afterwards wandered, staying with an old monk at a ruined temple, until Gao Yuan happened by in 740.',
      'He died in the capital. There is nothing new under the sun. Gao Yuan followed his comrades up the mountain to pour out wine, and looked at the red flowers under the trees covering the snow, and the snow covering the red flowers again.',
    ],
    highlight: [
      'On a night when the snow lay deep enough to bury a man, a chain flicked out and back with a hiss, like a silver snake: Gao Yuan never saw the blade, only, from the corner of his eye, a streak of red scarf.',
    ],
  }, // 宣康
  mujin: {
    name: 'Mu Jin',
    zi: 'Xingbei',
    epithet: 'The Ford Across the River of Heaven',
    birthplace: 'Ganzhou, Longyou Circuit',
    gloss: 'Erya, “Explaining the Heavens”: “Ximu is called the Ford; between Ji and Dou, it is the ford of the Han.” Xing Bing’s subcommentary quotes Sun Yan: “It parts water from wood; between the lodges Ji and Dou lies the ford of the Heavenly Han.” The River of Heaven lies between the stars of Ji and Dou, and a river must be crossed by ford or bridge, so this station is called the Ford of Ximu; the River of Heaven is the Milky Way. His name and his courtesy name both lie among the stars and the Milky Way.',
    profile: {
      '官职身份': 'Of the Yantian School. Later he travelled with Xuan Yang, helping her look into the old case of her father, Xuan Kang, and what had happened in Chao County; much of what comes out later was very likely uncovered with his help.',
      '性格': 'Gentle and perceptive, quick to pick up whatever is said: “The yuan, Ziwei, Taiwei and the rest, mark out regions of the sky and the allotted fields of the constellations.” “I thought a yuan was just a wall.” “That’s right too: a wall in the sky.”',
      '武学': 'The Yantian School’s learning of stars and fate; readings by Zi Wei Dou Shu: “Your master has Wuqu sitting in his Life Palace: a lone star, hard on those close to him. Nothing to be done about it. You too.”',
      '喜好': 'Watching the stars and talking about them: “What are you looking for? Which star? I’ll tell you about it.”',
      '专擅': 'The allotted fields of the sky and the reckoning of fate, measuring the heavens with a ruler; looking into old cases (he asked Xuan Yang whether she had anything of her father’s, and Xuan Yang spread her empty hands).',
    },
    anecdotes: [
      'One day Xuan Yang suddenly remembered to ask him what all the yuan in his school were about; when he had finished explaining the constellations and their fields, Xuan Yang looked up at the sky with great solemnity: “I’m not looking for anything. I just remembered: I’ve got a wall up in the sky too.”',
    ],
  }, // 穆津
  yeshuxi: {
    name: 'Ye Shuxi',
    zi: 'Qingran',
    birthplace: 'Cangjian Manor (born into the school)',
    profile: {
      '官职身份': 'Of a side branch of the Ye family of Cangjian, a family that had long travelled the Western Regions finding fine materials for the school’s swordsmiths. In 738 she came west with her family in search of fine steel (bintie), and at Beiting came to know Cheng Zhao, who had charge of the arms and armour; in the winter of 739 she was betrothed to him, but the bride could not be fetched home until Cheng Feng, the elder, had married, and before that could happen Cheng Zhao died on the western road out of Beiting in 740. The next spring she gave birth to a daughter, Ye Chen, who took her mother’s surname, and took the girl back to Cangjian. She was never entered in the Cheng genealogy.',
    },
    anecdotes: [
      'At Beiting the weapons grew brittle in winter and snapped; the batch she reworked lasted through the winter of 738. With a swordsmith’s eye she read Cheng Zhao’s courtesy name, Gulian, at a glance in its root sense: a blade’s edge ground flat, merit earned and never rewarded.',
      'From the winter of 739 into 740 she brought Cheng Feng and Lu Ling together: half because she liked Lu Ling, half because once that marriage was made, hers could be. Cheng Feng’s marriage was not allowed until 741, and by then that reason no longer existed.',
      'In the summer of 740 Cheng Zhao went to the Juliu Garrison Post; before he left, it was she who took that step first. After he died, she would not let his spearhead go back into the furnace to be given an edge.',
      'The first of the Cheng family to accept her was Cheng Zhao’s mother: in the winter of 738 she sent her winter clothes, and after Cheng Zhao went west to the garrison post the two of them often stood together on the city wall looking down the western road.',
    ],
  }, // 叶曙兮
  yechen: {
    name: 'Ye Chen',
    birthplace: 'Beiting Grand Protectorate, Tingzhou, Longyou Circuit',
    gloss: 'Shuowen: “Chen 忱 is sincerity.” Her name is a word from Cheng Zhao’s last letter: before he died Cheng Zhao wrote to Cheng Feng setting out his last wishes, and the letter said nothing of the child; in an ordinary courtesy at its end there was the word chen, and Ye Shuxi took it.',
    profile: {
      '官职身份': 'Of Cangjian, the daughter of Cheng Zhao and Ye Shuxi. She was born at Beiting in the spring of 741 and took her mother’s surname; Cheng Guang wanted to take her in, but Ye Shuxi would not allow it and took her back to Cangjian. She grew up at Cangjian Manor and trained her skills at the Sword Lodge. In the autumn of 758, when disaster came to Jiangnan, she was seventeen and at the manor as a Cangjian disciple; in late autumn that year, at the manor, she came to know Zhu Lu of the Qixiu House, who had come to help treat the wounded.',
    },
    anecdotes: [
    ],
  }, // 叶忱
  ranqiongru: { name: 'Ran Qiongru', zi: 'Shuxia' }, // 冉琼如
  yanmi: { name: 'Yan Mi', zi: 'Zhimiao' }, // 颜弥
  litingyun: { name: 'Li Tingyun', zi: 'Sixun' }, // 李庭沄
  mengxueying: {
    name: 'Meng Xueying',
    birthplace: 'Yingzhou (Liucheng Commandery), Hebei Circuit',
    profile: {
      '官职身份': 'A disciple of the Beitian School of Medicine (she entered it in the summer of 758, when the school was restored), and Xia Mingcang’s wife. The daughter of an army officer at Yingzhou: her father was deputy to Liu Zhengchen, Patrol Commissioner on the staff of the Military Commissioner of Pinglu, and later an Assistant General under Hou Xiyi; when Yingzhou fell in the winter of 761 he stayed in the city to cover Hou Xiyi’s rear and was killed. Her mother was Mohe, from a loose-rein (jimi) prefecture of tribespeople settled beside the city, and died of illness when Meng Xueying was about ten. The family’s ancestral seat was Xiangyang; only her father’s soldiering had brought them to this far frontier.',
      '体貌特征': 'Slender, with delicate looks, a little cool and aloof, her expression always faint and distant.',
      '性格': 'Cool, quiet and steady, and tough of spirit: when Yingzhou was worn out, she insisted on leaving the school with Xia Mingcang to go home and tend soldiers and people.',
    },
    anecdotes: [
      'Frail from childhood. Her mother sang her Mohe songs from when she was small, and she remembers their images: stars, the moon, forest. Her father, a soldier with clumsy hands, tried hard to work out how to braid her hair properly; if there was cow’s milk in the camp, he would bring a bowl home with him in the evening.',
      'Around the time of the upheaval at Yingzhou in 756, while helping hand out soup and gruel at the refugee camp outside the city, she saw Xia Mingcang holding an injured little child, showing it the stars and chanting a shaman’s song, and was suddenly sad. “Here’s another one who can’t sleep. Come on, sit down.” “You’re treating me like a child too?” “Everyone’s a child. Having a few years on you doesn’t make you anything special.” She pressed her lips together and smiled.',
      'In early 762, on the way south after burying her father’s bones, she ran a high fever with pains in her belly, and was frightened by bandits as well, and in the end the child could not be saved; when she came to she still told Xia Mingcang not to blame Liu Rong. Back at the school she slowly recovered over half a year; in the autumn of 763 she gave birth to a boy, Jiarong, a scare but no harm.',
    ],
  }, // 孟雪萦
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
  zhaoyingzhen: {
    name: 'Zhao Yingzhen',
    birthplace: 'Hengzhou (Changshan Commandery), Hebei Circuit',
    gloss: 'The Zhao surname traces back to the same clan as the Marquis of Shunping of Yongchang Village (Zhao Yun): “At the battle of Dangyang his righteousness pierced metal and stone, his loyalty guarded his lord.”',
    profile: {
      '官职身份': 'Lanchuan Yun’s mother, only daughter of the ironware merchant Zhao Tingzhi, raised in the capital. She trained in martial arts with her father from childhood, light and nimble, with some real skill behind her; the family had handed down a spear manual, the Seven-Probe Coiling-Serpent Spear.',
      '体貌特征': 'Bright and brisk. She liked a side-slit robe better than a skirt, tied her hair in a knot with no pins or ornaments, the loose strands hanging soft about her forehead and ears, a leather belt cinched at the waist and her sleeves rolled up: every job at home that meant climbing up or getting down, she snatched for herself, and the neighbours marvelled: so this woman from the land of Tang really is different.',
      '性格': 'Brisk and forthright, with a knight-errant’s warm heart: when the young toughs of the ward pestered the dyer’s daughter, she “would always shout at them”. She sees people clearly, too: “A boy, why be so delicate about him? He has a lot on his mind; let him be with Yun, and she can cheer him up.”',
      '武学': 'The family spear.',
    },
    anecdotes: [
      'In idle moments she would pick up a wooden staff from the shop and run through a spear form, with Lanchuan Yun beside her watching: plainly a child’s face, and yet when the girl fixed her mind on it, no one could break her concentration.',
      'She named the rescued boy Hui, the name of her little brother who had died young; something in this boy’s looks reminded her of him. Jingyan put his arm lightly round her shoulders: “So that’s it. In this world… no meeting is without a reason.”',
      'In the autumn of 736, when a brawl among Mingjiao followers spread into the family’s ironware shop, she, seven months pregnant, fell and took fright and could not give birth safely; she lost blood, went into convulsions, and died with her child. Leaning against the wall she still said: “Don’t hurry, Yun… go and find a doctor, Mother is just going to…”',
    ],
  }, // 赵盈贞
  zhaotingzhi: {
    name: 'Zhao Tingzhi',
    birthplace: 'Hengzhou (Changshan Commandery), Hebei Circuit',
    gloss: 'Of the line of the Marquis of Shunping of Yongchang Village.',
    profile: {
      '官职身份': 'Lanchuan Yun’s maternal grandfather. In his early years a soldier of the Tiance Command (he joined in Empress Wu’s reign), he was lamed by a stray arrow in one foot and discharged as an invalid, and the medicine and pay he was owed never came. Finding his own way, he learned the trade in an ironsmith’s shop in the capital, later took over an ironware shop in the Yining Ward and ran it for half his life. In old age he went home to Changshan; when Changshan fell at the start of 756, the old man dug out his armour of former days, put it on to protect the townsfolk, and died in the fighting.',
      '体貌特征': 'A hale old man with a limp.',
      '性格': 'Tough and clear-sighted, with a sharp tongue: “The day you take up the spear, you become someone else’s spear. And when something goes wrong, you’re the one they make take the blame.” He doted on his clever only daughter, kept her by him and let her have her way in everything; even her husband she chose for herself: she said she liked him, and he nodded.',
      '武学': 'Spear and staff.',
      '随身物件': 'A wooden chest he kept under his bed and took everywhere: bright silver lamellar armour, a jujube-red surcoat, and a waist token with “Tiance Command” in seal script, on it the character Zhao 赵, cut with particular vigour.',
      '专擅': 'Forging ironware.',
    },
    anecdotes: [
      'Of what befell the garrison soldiers under Empress Wu he kept silent: “Soldiers… so often the people above just turn their hand over: one moment they’re holding up the founders’ heroes, the next they’re crushing you till you can’t breathe.” Illustrious as their forebear was down the ages, in the end they were no great family, and had no one to catch them.',
      'With one step-in thrust Lanchuan Yun knocked the wooden staff from his hand, the tip of her staff coming to rest under his beard, and recited the eulogy from the family shrine: “At the battle of Dangyang his righteousness pierced metal and stone, his loyalty guarded his lord. Were the dead aware, it would make him immortal; the living, in gratitude, would forget themselves…” Before she had finished the last words, the old man threw back his head, waved his hand, and two trails of tears ran down.',
      'After he fell, that old Tiance armour was gathered up by Cen Han, Du Zheng and others of the Changge School and left in the Cangyun Army’s keeping; in the winter of 757 Min Fangcheng put it into Lanchuan Yun’s hands himself, and only then did his granddaughter come to understand that she was descended from a loyal minister who had stood by his lord in peril.',
    ],
  }, // 赵廷之
  // 称号 epithet、别号 hao：2026-11-22 T0 工作稿，待作者审（docs/t0-review.md）
  // ---- 2026-11-22 第二轮：作者定（波斯音译名、苗人用本名；日本人物用日语读法；单名、他族名） ----
  langdien: { name: 'Rādīn' }, // 朗迪恩
  luya: { name: 'Royā' }, // 鲁雅
  maneili: {
    name: 'Māneli',
    birthplace: 'the Western Regions',
    gloss: 'مانلی (Māneli): a modern Persian woman’s name, made widely known by Nima Youshij’s poem “Māneli”, where it stands for a pure, beautiful, free woman; the name is taken in the sense of “stay with me” (برایم بمان).',
    profile: {
      '官职身份': 'Of the Mingjiao; Lu Yin’s younger sister and Golī’s mother. After her brother was killed in 745 she was cast adrift, and in the autumn of 747, at the Gahambar festival, she was carried off by Tibetan raiders; for a time there was something between her and Qi Sheng, but it came to nothing, and in the end she became Lu Xiao’s partner.',
    },
  }, // 玛奈丽
  geli: {
    name: 'Golī',
    birthplace: 'the Hongyi Order’s grounds outside Chang’an',
    gloss: 'گلی (Golī): a pet form of gol (flower), close to “flower-like, rose-coloured”; rang-e gol, “the colour of flowers”, can mean the colour of a flower, or poetically a lovely hue, the breath of spring.',
    profile: {
      '官职身份': 'Māneli’s daughter.',
    },
  }, // 歌莉
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
      武学: 'Proud-Blood Battle Spirit. Her family had a spear manual, the Seven-Probe Coiling-Serpent Spear, and she fights with the spear; she also excels at qinggong and close-quarters grappling, and her short-blade and dagger work is rare in the Cangyun Army. Left-handed.',
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
  jingyan: {
    name: 'Lanchuan Jingyan',
    birthplace: 'Nara, Japan',
    gloss: 'Lanchuan Yun’s father. He died in 747, the same year as Cheng Kai’s birth father Cheng Guang: in Anxi and in Chang’an (Cheng Guang fell in the Little Balur campaign).',
    profile: {
      '官职身份': 'A Japanese student with the embassy to the Tang: chosen in 716 (the second year of Reiki, under Empress Genshō), he crossed west in 717 with Tajihi no Agatamori’s embassy, four ships and five hundred and fifty-seven people, landed at Yangzhou and went on to Chang’an; a close friend and fellow student of Chao Heng (Abe no Nakamaro), he also knew the scholar-monk Genbō and Kibi no Makibi. Made Collator in the Palace Library (rank 9a1), he put texts in order and translated them, and within six years had risen to be a Clerk of the Secretariat (rank 7b1). The books he translated were taken back to his own country and presented to the sovereign, and won great favour, so that he was kept on and could hardly resign, and went on writing through sickness and pain.',
      '性格': 'A gentle, reserved scholar, careful and courteous. He believed in balancing going out into the world with withdrawing from it, and would not meet violence with violence: “If we answer killing with killing, what do we become?” He thought himself a coward, who knew only how to keep out of trouble; and the grief of losing his wife taught him that when pain falls on you, and hurts so much, you will dig to the bottom of it.',
      '喜好': 'Singing and reciting: teaching his daughter to read the Jijiu pian, telling her the stories behind momijigari, the outings to view the autumn leaves; airing books in the sun, and copying them.',
      '专擅': 'At home in both Japanese and Chinese; translating texts.',
    },
    anecdotes: [
      'In Chang’an he met Zhao Yingzhen and they came to know and love each other, one gentle and reserved, the other bright and brisk, and so they were pledged for life; family affairs took him home, and he lived for some years with his wife in the western outskirts of Heijō-kyō; in 731 the whole family came back to the Tang.',
      'In 728, by the river behind his house in Nara, he pulled out a dying young scout and took him in, treating him as one of the family; in 737 the young man died to follow his mistress, and holding him, Jingyan promised: “I’ll take you back. I will take you back.” That promise later passed into his daughter’s hands, and then into Kyōya’s: two generations carried it, and it was never fulfilled.',
      'Teaching the little Lanchuan Yun to speak Chinese: “Speaking the tongues of both lands, isn’t Father clever?” “So that Mother won’t be so lonely, one day we will cross the sea to the west, to the great Tang I’m always telling you about.” And: “Yun… you won’t only be someone who has come here from abroad. You will become one of the people of ‘here’ too.”',
      'After his wife’s death he went out alone to face the Mingjiao followers who came to the door to apologise: “She is gone; no amount of regret will help now. You need not argue right and wrong with me any more. Go and keep your followers in good order, and do no more harm to others.” Lanchuan Yun had never heard her father’s voice like that; she only saw the wind blow right through his thin blue-green robe.',
    ],
  }, // 岚川靖彦（日文读法 Arashikawa Yasuhiko 只在名號一行出）
  linyeshi: {
    name: 'Hayashi Kyōya',
    birthplace: 'Japan',
    gloss: 'Hayashi Kyōya. “余は彼の燈火の海を渡り來て”: I have come across the sea from the far shore of the lamplight. Crossing the sea is the note that runs through the Lanchuan family, and through Kyōya too.',
    profile: {
      '官职身份': 'Of Wanhua Valley, Xu Qiusheng’s pupil; Lanchuan Yun’s adopted son. At first Xu Qiusheng’s medicine boy.',
      '体貌特征': 'Fair-skinned and slight, with long, thick lashes like a fan screen. Frail of build; he grew up in a military command, but was too delicate to be allowed to train in martial arts.',
      '性格': 'Quiet and inwardly gifted, sensitive and fine-grained, kind-hearted and resilient. Shy by nature. Born to feel anxious over other people’s pain and sickness.',
      '武学': 'Left almost deaf by an illness when small, and unable to speak, he was not allowed to train.',
      '随身物件': 'A bronze tea ze, a scoop for measuring tea, with a plum-blossom handle, given him by Xu Qiusheng when he became his pupil (The Classic of Tea, “Four: Utensils”: “The ze is a measure, a standard, a gauge”: a master’s gift to a pupil, for its sense of rule and measure); and the short knife for self-defence that Lanchuan Yun gave him when he came of age in 770.',
      '喜好': 'Woodcarving and the way of tea. Likes stir-fried mushrooms and fresh greens.',
      '专擅': 'Good at painting flowers, birds, grasses and insects, and ever better under Xu Qiusheng’s guidance: when learning to recognise herbs he drew them on paper and labelled them in Chinese, every one detailed and alive.',
    },
    anecdotes: [
      'His father, a maker of Buddhist images, went to the Tang in 752 with Fujiwara no Kiyokawa’s embassy to learn the craft of Buddhist image-making (in the fourth month of that year came the eye-opening of the Great Buddha of Tōdai-ji), and afterwards stayed in the Tang and never came back. In 761 Kō no Gendo came home from the Tang bringing a letter from his father, and that was what set him going; the embassies of 761 and 762 both came to nothing, one for a damaged ship and one for want of wind; with no one left at home and no official ship to wait for, in the spring of 763 he took passage alone on a Silla merchant ship to cross the sea and find his father, and on the way was saved by Haruyama Haruka of Penglai. In Chang’an, through Fujiwara no Kiyokawa, the ambassador of his father’s embassy (then named Heqing and serving as Director of the Palace Library), he found his father. Half a year after he came to the Tang (763), when the Tibetans took Chang’an, a burning roof beam fell and crushed his legs, and his father, shielding him from an enemy blade, was killed. Lanchuan Yun saved him and brought him back to the Tiance Command, asked Xu Qiusheng to treat him, talked with him by brush and paper, taught him Chinese, and later adopted him. Little by little he came to feel he belonged; though he seldom showed it, he depended on her, and when she and Cheng Kai were away a long time he could not help asking when General Yun would be back.',
      'Once healed, he became a pupil of Wanhua; seeing Cheng Kai trapped in his pain and Lanchuan Yun’s worry, and remembering their kindness, he wanted to help. When he saw Cheng Kai pushing himself regardless of his injuries he always wanted to talk him out of it, but he had only signs and the shapes of words on his lips to begin with, and when he could not put it together in time he would get himself flushed red with frustration.',
      'Not yet well versed in pharmacology, he dared to test medicines on himself: before he was even out of the dispensary he was slumped over the table, gasping for breath. Xu Qiusheng managed to bring him round and demanded straight out what he thought he was doing; he signed: if not on myself… then on the patients? Xu Qiusheng had nothing to say.',
      'Cheng Yu, young and careless, would take him riding on the plain in idle hours, and he would come home feverish from the wind. Cheng Kai could not help scolding his nephew a little; Kyōya could not hear him but could read his face, and tugged at Cheng Kai, shaking his head, then turned to comfort Cheng Yu: it’s nothing, I didn’t know it would happen myself.',
      'In Wanhua Valley he met the Shaolin monk Huimu, picked up a little of his woodcraft and mechanisms, and came back to help improve the Command’s message kites. Around 766 he went south of the Yangzi with Li Tingshen and Cheng Qian, and passing Huzhou (Lu Yu had crossed south in 756, built a hut on the Tiao Stream in 760, and lived at Huzhou long after) he met Lu Yu, and saw that wind stove too: on one of its three feet was cast “Cast in the year after the Sage Tang destroyed the Hu”, that is, 764, casting the end of the war into the thing itself. The word chadao, “the way of tea”, first appears in a poem by Jiaoran, the poet-monk of Huzhou; his Buddha-nature and the way of tea came together here.',
      '“The River of Heaven surges; a single reed crosses it”: he had a Buddha-nature young, and at Daoyong’s desk a line of verse woke something in him, and from then on “crossing the sea” stayed always in his heart. Daoyong asked: do you know this character? What do you see? He wrote: when I came, the sea.',
      '“If it can ease her suffering, I will go”: at midsummer of 770 he came of age, and Lanchuan Yun gave him a short knife for self-defence and told him where it had come from. In the twelfth month of that year Cheng Kai died of illness, and he grew ever more burdened. When three years of mourning were over there was no ship to cross on; he waited until the Hōki embassy sailed home in 778, and boarded the first ship with the knife to take its owner home, and so fulfil Lanchuan Yun’s long-held wish. But the ship was damaged, and no sail came home.',
    ],
  }, // 林叶矢
  haruyama: {
    name: 'Haruyama Haruka',
    zi: 'Mianshu (Nemugi)',
    names: {
      '汉名': 'Fang Yao',
    },
    birthplace: 'Japan',
    gloss: 'Haruyama is the family name in Japan, and Haruka the Japanese given name: Haruyama Haruka, that is, Haruyama Nemugi. The family name of the Penglai house is Fang, so the Chinese name is Fang Yao, with the courtesy name Mianshu. Zhuangzi, “Free and Easy Wandering”: “Now you have a great tree and fret that it is of no use. Why not plant it in the village of Nothing-at-All, in the wilds of Broad-and-Boundless, and drift idly, doing nothing, at its side, wander free and easy and lie down asleep beneath it?” Yao, “far and free”, and Mianshu, “asleep under a tree”, both come from it.',
    profile: {
      '官职身份': 'Of the Penglai school, born in Japan. The one who first saved Hayashi Kyōya when he crossed the sea to the Tang.',
    },
    anecdotes: [
    ],
  }, // 春山遥
  ahui: {
    name: 'Ahui',
    birthplace: 'Japan (around Lake Biwa)',
    gloss: 'Hui 辉, “brightness, radiance”: the name Jingyan and his wife gave him after they saved him in 728, taken from the name of Zhao Yingzhen’s little brother who died young. When he first heard what the character meant, he thought of a lacquered cosmetic box, painted in gold and inlaid with mother-of-pearl, that he had once delivered on a mission.',
    profile: {
      '官职身份': 'Lanchuan Yun’s adoptive elder brother. As a child he was taken in by the house of a powerful clan and minister and trained as a scout (a ninja), to rid them of their enemies in the dark; when he was ten or so he failed a mission and was made to drink poison, and his voice was ruined so that he could barely speak; afterwards he chose silence as well. In 728, gravely wounded on a mission and near death, he drifted downstream to the riverbank in Nara’s western outskirts, where Jingyan saved him; from then on he worked for the Lanchuan household and guarded it, and they treated him as one of the family. In 731 he came back to the Tang with the family and lived in Chang’an, often helping Zhao Tingzhi look after the ironware shop.',
      '体貌特征': 'Regular-featured, lean and wiry, fair-skinned, with handsome brows, and his body covered in scars, the flesh knotted and twisted. He wears Tang-style kuzhe made in Chang’an: a short jacket of dark blue-black brocade and cotton with narrow sleeves and roundel patterns, wide hemp-grey trousers bound at the shins with leg wraps, black brocade bracers with rust-red ties; all year round a white ramie scarf hides half his face, and a patterned brocade headband sits low over his brows.',
      '性格': 'Steady and courteous, he knows what matters, and repays kindness in fear and trembling; his boyishness shows only when he takes Lanchuan Yun running in the hills and fields. In someone who has always been silent, silence has its depths: the shallow kind is like wind, the deep kind sinks.',
      '武学': 'Ninjutsu: shuriken, cross spikes, hand claws, the short blade, ghostly footwork; with stepping posts set out in the nine palaces he gave the little Lanchuan Yun the grounding of her qinggong, and few of her generation could match her.',
      '随身物件': 'A Japanese short blade with a ray-skin hilt; the hair ribbon Zhao Yingzhen embroidered with clouds.',
      '喜好': 'Red pickled ginger: here, for once, he is very forward, finishing off the little pink heap for Lanchuan Yun, who won’t eat ginger; when Jingyan asked, “Or do you really like it…?”, the tips of his ears slowly went red.',
      '专擅': 'Unusually keen eyes and ears; he can tell any footfall or birdcall; guarding.',
    },
    anecdotes: [
      'When the ship back to the Tang ran into rough seas in 731, he lashed the mistress and Lanchuan Yun to the foot of the mast with rope: rough, perhaps, but safe. When they landed and met sea raiders, there was a flash of snow-light from his sleeve, and in a moment blood was spilled on the sand; he turned to the family and raised a hand to cover his face, lightly, and Jingyan put his hands over his daughter’s eyes.',
      'On autumn days he would sit on a branch halfway up a tree, hidden by the maple leaves, gazing far off to the north. Jingyan guessed it was Lake Biwa: “Perhaps he grew up over there. That place has seen… a great many things, all quarrels of the imperial house.”',
      'In the autumn of 737, on the anniversary of Zhao Yingzhen’s death, he took his own life. For the first time in his life he spoke, hoarse, in the speech of his home: “My lady… lost her life, was wronged, and I… again and again… could not save her… Miss… take care…” Jingyan held him and promised, “I’ll take you back. I will take you back”, and buried him in the western outskirts of Chang’an.',
      'His short blade Jingyan gave to Lanchuan Yun when she joined the army: “Let him go with you; he would want that.” It stayed with her half her life; in 770 she passed it on to her adopted son Kyōya and told him where it came from, and in 778 Kyōya boarded a ship of the homeward Hōki embassy with the knife, meaning to take its owner home. The ship was damaged, and no sail came home: the promise to “take you back”, carried by two generations, was never fulfilled.',
    ],
  }, // 阿辉
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
