// English overlay for the chronology (EVENTS[].title). Events carry no id, so the key is
// the exact Chinese title: edit the Chinese and the English falls back to Chinese at once,
// and check-data reports the orphaned English with the nearest current title to re-key it.
//
// T2 working translation (docs/english-edition.md). Batch 1, 2026-11-23: every entry before 750.
// Terms follow the Notion 术语主表 and the T0 tables (places, posts, factions, names).
// Bracketed notes: the author's working marks (作者定, 待核, 月份待核, 系年暂定, source notes) are
// left out; story points still open (……待定, 未定) are kept as “undecided”; facts inside a note
// are translated. Doubts for the author: docs/timeline-t2-batch1-review.md.
export const eventsEn = {
  // 651
  "大食（阿拉伯）入攻，萨珊波斯四百年至此名存实亡——昔复兴波斯、建萨珊王朝（波斯第二帝国）之阿尔达希尔一世，出琐罗亚斯德教祭司世家：其祖萨珊为阿那希特神庙祭司（王朝得名于此），父帕帕克为伊斯塔赫尔城主；举兵之前尝为安息（帕提亚）末王阿尔达班五世之法尔斯总督（约208年起）":
    "The Arabs invaded, and four hundred years of Sasanian Persia survived from then on in name only. Ardashir I, who had revived Persia and founded the Sasanian dynasty (the second Persian empire), came of a family of Zoroastrian priests: his grandfather Sasan was a priest of the temple of Anahita (the dynasty took its name from him), and his father Papak was lord of Istakhr; before he rose in arms he had served the last Parthian (Arsacid) king, Artabanus V, as governor of Fars (from about 208).",
  // 654
  "波斯王卑路斯两度遣使入唐告难求援；时唐未平西突厥，不应":
    "The Persian king Peroz twice sent envoys to the Tang to report his plight and ask for help; the Tang, which had not yet subdued the Western Türks, did not answer.",
  // 661
  "卑路斯又求援；时葱岭东西原属突厥诸小国宗主权转归于唐，唐始行羁縻，置羁縻都督府州，并于卑路斯所在之疾陵城立波斯都督府":
    "Peroz asked for help again. By now suzerainty over the small states east and west of the Pamirs, once held by the Türks, had passed to the Tang, which began its loose-rein (jimi) administration, setting up loose-rein area commands and prefectures, and established a Persian Area Command at Zaranj, where Peroz was.",
  // 663
  "唐任卑路斯为波斯都督，流亡政府始成":
    "The Tang named Peroz Area Commander of Persia, and the government in exile took shape.",
  // 674
  "大食侵逼，卑路斯逃入长安；萨珊王室成员、贵族教士或同往，或流落居于西域——随王奔走、往来长安西域的王室族裔中，有陆羽鸣祖辈父辈，早与陆危楼有交，无论在琐教中还是行商":
    "Pressed by the Arabs, Peroz fled to Chang’an; members of the Sasanian royal house, nobles and priests went with him or were left scattered in the Western Regions. Among the royal kin who followed the king and travelled between Chang’an and the Western Regions were Lu Yuming’s forebears, long on good terms with Lu Weilou, both within the Zoroastrian faith and in trade.",
  // 678
  "唐册卑路斯长子泥涅师师为波斯王":
    "The Tang invested Peroz’s eldest son Narsieh as king of Persia.",
  // 679
  "唐命裴行俭为「安抚大食使」，发波斯道行军，册送泥涅师师归吐火罗——唐认卑路斯—泥涅师师一脉为萨珊波斯正统代表":
    "The Tang made Pei Xingjian Commissioner for Pacifying the Arabs, sent out a Persia Route field army and escorted Narsieh back to Tokharistan as king: the Tang recognised the line of Peroz and Narsieh as the rightful representatives of Sasanian Persia.",
  // 707
  "景龙元年，琐教「影月」长老陆危楼立明教，为教主——萨珊既亡（651），火祆教托庇于唐而东传；教势顶峰约在开元二十三年（735）前后":
    "In the first year of Jinglong, Lu Weilou, an elder of the “Shadow Moon” in the Zoroastrian faith, founded the Mingjiao and became its leader. With the fall of the Sasanians (651), Zoroastrianism had come east under the Tang’s protection; the order was at its height around the twenty-third year of Kaiyuan (735).",
  // 708
  "泥涅师师在吐火罗地区与大食抗战二十余年后返唐，病死长安，唐以为「其国遂灭」；然于卑路斯及同亡波斯人礼遇有加，长安有波斯人社区":
    "After more than twenty years of resisting the Arabs in Tokharistan, Narsieh came back to the Tang and died of illness in Chang’an, and the Tang held that “his kingdom thus came to an end”. Yet Peroz and the Persians who fell with him were treated with great courtesy, and Chang’an had a Persian community.",
  // 715
  "陆羽鸣出生——萨珊流亡王室族裔，入教即逢盛时（教势顶峰约在开元二十三年735前后），少小听长辈讲长安事":
    "Lu Yuming was born, of the exiled Sasanian royal kin. He entered the faith at its height (the order peaked around the twenty-third year of Kaiyuan, 735), and as a child heard his elders talk of Chang’an.",
  "程广成婚；新婚夜夫人焚稿（夫人696年生，时年二十）":
    "Cheng Guang married; on the wedding night his wife burned her writings (she was born in 696, and was twenty).",
  // 716
  "程锋出生（嫡长子）":
    "Cheng Feng was born (the eldest son of the principal wife).",
  // 717
  "开元五年，岚川靖彦（716年为元正天皇选为遣唐留学生）随左大臣多治比县守使团自难波港出发，四船并联、一行五百五十七人西渡东海，扬州登陆赴长安苦读——同行有阿倍仲麻吕（晁衡）、学问僧玄昉、吉备真备；后授秘书监校书郎，累迁中书省主书":
    "In the fifth year of Kaiyuan, Lanchuan Jingyan (chosen by Empress Genshō in 716 as a student with the Japanese embassy to the Tang) set out from Naniwa with the embassy of the Minister of the Left, Tajihi no Agatamori: four ships sailing together, five hundred and fifty-seven people crossing the Eastern Sea, landing at Yangzhou and going on to Chang’an to study hard. With him went Abe no Nakamaro (Chao Heng), the scholar-monk Genbō and Kibi no Makibi. He was later made Collator in the Palace Library, and rose to be a Clerk of the Secretariat.",
  "程钊出生——庶出，生母为夫人陪嫁婢，生子后放良为妾":
    "Cheng Zhao was born, a secondary son: his mother was a maid who had come with the wife at her marriage, freed after the birth and made a concubine.",
  // 721
  "开元九年，六胡州不堪税负、徭役而叛乱，败后残部流散南北诸州；剿逆期间消息迟滞、任命重复，陇右、朔方节度争功，一方招降胡众、一方反纵兵击之，归降胡人嫉恨，相率复叛":
    "In the ninth year of Kaiyuan the Six Hu Prefectures, crushed by taxes and labour service, rose in revolt; after their defeat the remnants scattered to prefectures north and south. During the suppression news travelled late and appointments overlapped, and the Longyou and Shuofang commissioners vied for credit, one taking the Hu into surrender while the other loosed troops on them; the surrendered Hu, embittered, rose again together.",
  "六胡州乱中，荔非父辈屡被点名带路搜山寻叛胡、协助清点户籍、收缴兵器；一族叔因押送归降胡众不利被枭首（时荔非四五岁，被母亲按在怀里，抬头看见父亲双眼通红）；此后一二年族中惶惶终日，父辈因教少年存活于边镇之道——少习汉话、略通书字，熟识地名、驿路、边军旗号":
    "In the Six Hu Prefectures revolt the Lifei elders were named again and again to guide searches of the hills for rebel Hu, to help count households and to collect weapons; a clan uncle was beheaded for failing to bring a column of surrendered Hu through (Lifei was four or five; pressed into his mother’s arms, he looked up and saw his father’s eyes red). For a year or two the clan lived in dread, and so the elders taught the boys how to survive in the frontier garrisons: learn Chinese young, know a few written characters, know the place names, the post roads and the banners of the frontier armies.",
  // 722
  "程广回东都面圣受赏（是年玄宗驻跸东都），入歌楼遇阿玉":
    "Cheng Guang came back to the Eastern Capital for an audience with the emperor and a reward (that year Xuanzong was staying at the Eastern Capital), went into a house of song and met A-Yu.",
  "程凯出生于洛阳歌楼——开元十年腊月，早产八个多月":
    "Cheng Kai was born in a house of song in Luoyang, in the twelfth month of the tenth year of Kaiyuan, premature at a little over eight months.",
  // 723
  "冬，高垣高堑兄弟为叔父家所弃，雪夜负幼弟跋涉，黎明遭狼群围咬；黍梁（宣康）链刃退狼救下二人，安置远门沟——「路呢，有。不过要卖命的。」「但凡可以谋生，不怕。都好过冻毙风雪。」":
    "Winter. Abandoned by their uncle’s family, the brothers Gao Yuan and Gao Qian struggled through the snow at night, the elder carrying the younger on his back, and at dawn were set upon by a pack of wolves; Shuliang (Xuan Kang) drove the wolves off with his chain blade, saved them and settled them in Yuanmen Gully: “A road? There is one. But you have to sell your life for it.” “So long as it’s a living, we’re not afraid. Anything is better than freezing to death in the snow.”",
  // 724
  "高垣受训参试，三回方入凌雪阁（绊在机关与鸟不归的杂念上）；入门后力道刚劲而身法总不及，侦讯之敏见长，归入机枢府，从识字学起——训练、外勤，懂规矩，耐严刑":
    "Gao Yuan trained and sat the trials, and got into the Lingxue Pavilion only at the third attempt (tripped up by the mechanisms, and by stray thoughts in the Birds-Never-Return, the Pavilion’s steep trial forest). Once in, his strength was hard and forceful but his footwork never quite enough; his gift was for interrogation, and he was assigned to the Jishu Bureau, where he began by learning to read: training, field work, knowing the rules, enduring harsh interrogation.",
  // 725
  "程广回东都，随驾东封泰山（史：十一月封禅），公务缠身，未往歌楼；夫人于此时有孕（程钧）":
    "Cheng Guang came back to the Eastern Capital and went east with the emperor for the feng sacrifice at Mount Tai (historically, the sacrifice was in the eleventh month); busy with official duties, he did not go to the house of song. His wife became pregnant at this time (with Cheng Jun).",
  // 726
  "程钧出生（夫人所出），比程凯小三四岁":
    "Cheng Jun was born (to the principal wife), three or four years younger than Cheng Kai.",
  // 727
  "陆晚月出生":
    "Lu Wanyue was born.",
  "阿玉亡故":
    "A-Yu died.",
  // 728
  "阿辉被岚川夫妇收留（按：原编年此条与「在奈良出生」并系一年，而岚川云生年经作者更正为724，收留之年仍从原文728，作者已确认无误）":
    "Ahui was taken in by the Lanchuan couple.",
  "开元十六年，宣康（黍梁）于巢县成婚，翌年得一子；有他在，妻子温饱、不忧税赋——籍贯人口悉上报留档，此即后来高垣按档寻访之据":
    "In the sixteenth year of Kaiyuan Xuan Kang (Shuliang) married in Chao County, and had a son the next year; with him there, his wife was fed and clothed and never worried about taxes. The household’s registration and members were all reported and kept on file, and this was what Gao Yuan later went by when he traced them through the records.",
  "靖彦于奈良西郊宅后河边救起重伤漂流的少年斥候，夫妇照料收留；赵盈贞以早夭幼弟之名为其命名「辉」——「这就是了，人间哪…没有无端相逢」。阿辉自此为岚川家帮工护院，待之如家人无二；两年间带幼年岚川云跑遍林野，以九宫桩石授其轻功底子":
    "On the riverbank behind his house in the western outskirts of Nara, Jingyan pulled out a badly wounded young scout who had drifted downstream, and he and his wife nursed him and took him in; Zhao Yingzhen named him Hui, after a little brother of hers who had died young: “There it is. In this world… no meeting comes without a reason.” From then on Ahui worked for the Lanchuan household and guarded it, and was treated no differently from family; for two years he took the young Lanchuan Yun all over the woods and fields, and on nine-palace stepping posts taught her the foundations of qinggong.",
  "端午，洛阳南市，程凯救下被掳的幼年沈含英（右腕被刺伤留疤）；程广见其颈间玉坠，带程凯入程府":
    "The Duanwu festival, at Luoyang’s Southern Market: Cheng Kai rescued the young Shen Hanying from kidnappers (a stab wound to his right wrist left a scar); Cheng Guang saw the jade pendant at his neck and took Cheng Kai into the Cheng household.",
  "程家有意对外称程凯为姬妾所出，记在程钊生母名下；她不肯出面——这是她头一回开口":
    "The Cheng family meant to give out that Cheng Kai was a concubine’s son and to enter him under the name of Cheng Zhao’s mother; she would not lend herself to it: the first time she ever spoke up.",
  // 729
  "荔非承烈十二三岁，始随驿队行走，北抵灵、夏边口，送军书、押粮车、牵马骡；驿卒教认路，父亲教认旗——朔方、陇右、河东来兵、受降城兵马，旗号口令盘查各异；一次清查被士兵按头在地，额头磕破，父亲呈谱牒催他复述驿路关口方得脱":
    "At twelve or thirteen Lifei Chenglie began to travel with the post caravans, north as far as the frontier passes of Lingzhou and Xiazhou, carrying army dispatches, escorting grain carts, leading horses and mules. The post riders taught him the roads; his father taught him the banners: the troops of Shuofang, Longyou and Hedong and the men of the Shouxiang Fortresses each had their own banners, passwords and checks. Once, at an inspection, soldiers pinned his head to the ground and split his forehead; only when his father produced the family register and made him recite the post roads and passes was he let go.",
  // 730
  "吕定仪十五岁母丧，随父戍边，在中受降城学习政务、军籍编录、粮草分配；因字迹峭丽、心性严整，被提拔为笔吏":
    "At fifteen Lü Dingyi lost his mother and followed his father to the frontier, learning administration, the compiling of army rolls and the allocation of grain and fodder at the Middle Shouxiang Fortress; his sharp, elegant hand and strict, orderly nature got him promoted to clerk.",
  // 731
  "春，岚川一家自奈良返唐（靖彦723年前后因家事携赵盈贞返乡，居平城京西郊数年，岚川云与阿辉皆在彼间入家）——海上遇风浪偏离航线，漂至江南，登岸遇海寇，阿辉袖间雪光杀退众寇护主；一行北上长安，复居义宁坊。一家与晁衡（阿倍仲麻吕）有交情——晁衡与靖彦同窗":
    "Spring: the Lanchuan family came back to the Tang from Nara (around 723 Jingyan had taken Zhao Yingzhen home on family business and lived for some years in the western outskirts of Heijō-kyō, where Lanchuan Yun and Ahui both came into the family). At sea a storm drove them off course to Jiangnan; when they landed they met pirates, and a flash of snow-light from Ahui’s sleeve drove the pirates off and saved his masters. The family went north to Chang’an and lived again in the Yining Ward. They were friends of Chao Heng (Abe no Nakamaro), who had studied with Jingyan.",
  // 732
  "高堑入门，明山馆受训，武学要旨灵透颖悟，兄长指点之下愈成同辈佼佼，后入吴钩台——「哥，你平日是一句话不露啊，敢情早就是要员。我也不能差了。」「我的路，未见得就是你的路。」":
    "Gao Qian entered the Pavilion and trained at the Mingshan Hall; quick and perceptive in the essentials of the martial arts, under his elder brother’s guidance he became the best of his generation, and later joined the Wugou Terrace: “Brother, you never let slip a word, and all along you were someone important. I can’t fall behind.” “My road isn’t necessarily your road.”",
  "程锋受荫入天策府":
    "Cheng Feng entered the Tiance Command on his father’s privilege.",
  // 733
  "荔非十五六岁骨骼渐成，选为健儿巡守县境；驿道遇袭，胡人霸路劫粮，他推翻粮车作障、抄上侧坡夺刀相搏退敌，粮米终究无损；守关军官收为随从、授以功夫——「自此而始，刀在你手中」，荐往雁门":
    "At fifteen or sixteen, his frame filling out, Lifei was picked as a professional soldier (jian’er) to patrol the county. When Hu raiders held the post road and fell on a grain convoy, he overturned the carts as a barricade, ran up the side slope, wrested a blade from an enemy and fought them off; not a grain was lost. The officer holding the pass took him on as an orderly and taught him to fight (“From now on, the blade is in your hands”), and recommended him to Yanmen.",
  "程钊随生母赴北庭，比程锋早三年到边地（程锋736年至北庭）":
    "Cheng Zhao went with his mother to Beiting, reaching the frontier three years before Cheng Feng (who came to Beiting in 736).",
  // 734
  "荔非承烈入苍云":
    "Lifei Chenglie joined the Cangyun Army.",
  "黍梁离家临时调往京城，再未返乡；秋，幼女宣杨生于巢县——女儿出生之事他或许至死未知，档案不载":
    "Shuliang left home on a temporary posting to the capital and never came back. In autumn his younger daughter Xuan Yang was born in Chao County; he may never have known of her birth before he died, and the files do not record it.",
  // 735
  "薛褚父母早亡，薛直自觉有照拂后辈孤弱之责，约在此年将其与两三同辈兄弟一并带入苍云，少年在武库管理保养军械；数年后独以踏实沉默、体格气力留为兵员，同来者皆遣回":
    "Xue Chu lost his parents young. Xue Zhi, who felt bound to look after the orphaned and weak of the younger generation, brought him into the Cangyun Army around this year with two or three boys of his generation, and they kept the weapons in the armoury. Some years later he alone was kept on as a soldier, for his steadiness, his silence and his strength; the others who came with him were all sent home.",
  "陆晚月随父行商遭遇马贼袭击，借住人家舍命相救":
    "Travelling with her merchant father, Lu Wanyue was attacked by horse thieves; the family they were lodging with saved them at the risk of their own lives.",
  "明教大光明寺兴建于长安西市义宁坊":
    "The Mingjiao’s Great Bright Temple was built in the Yining Ward by Chang’an’s Western Market.",
  "程钧随三兄程铎习程家家传枪（槊）法（735—740）":
    "Cheng Jun learned the Cheng family’s spear (shuo lance) technique from his third brother Cheng Duo (735–740).",
  "突骑施寇北庭及安西拨换城（史）；程钊初上阵，随父守庭州——围城入冬，城头兵器遇寒脆折，他自请经管甲仗修补，此后一直留在甲仗上":
    "The Türgesh raided Beiting and Bohuan in Anxi (historical). Cheng Zhao saw battle for the first time, holding Tingzhou with his father; as the siege went into winter the weapons on the walls grew brittle in the cold and snapped, and he asked to take charge of repairing the arms and armour, and stayed with the arms and armour from then on.",
  // 736
  "景惠时遭遇死产 身体受损 几乎不能再生育":
    "Jing Huishi suffered a stillbirth that damaged her body; she could hardly bear another child.",
  "陆晚月入明教，拜「影月」掌事陆羽鸣为师；陆晓随鸿胪寺任职的父亲前往安西、居龟兹，始与明教接触，圣山下讲坛成为他的波斯语角（Notion 编年一处作「736陆晓入教」，人设文档以741年为正式入教，兹以736记初接触并注明）":
    "Lu Wanyue entered the Mingjiao and became the pupil of Lu Yuming, a master in charge under the “Shadow Moon” banner. Lu Xiao went to Anxi with his father, who served in the Court of State Ceremonial, lived at Kucha and first came into contact with the Mingjiao; the preaching platform at the foot of the Holy Mountain became the place where he practised his Persian.",
  "宣康任务中身亡（张九龄一事）——李林甫掌中书令、任凌雪阁外阁主，吴钩台长久在其辖下；黍梁因京城一案私向张九龄府中传信，为队友告发。其后不久，抚恤不到，妻与幼子不堪课税、死于酷吏兵痞；幼女为邻人背出得免，此后流浪，随巢县破庙老僧":
    "Xuan Kang died on a mission (the Zhang Jiuling affair). Li Linfu, as President of the Secretariat, was Master of the Lingxue Pavilion’s Outer Pavilion, and the Wugou Terrace had long been under his control; over a case in the capital Shuliang had privately sent word to Zhang Jiuling’s household, and a teammate informed on him. Soon after, with no death benefit paid, his wife and young son, unable to bear the taxes, died at the hands of harsh officials and thuggish soldiers; his little daughter was carried out by a neighbour and escaped, and from then on drifted, living with an old monk in a ruined temple in Chao County.",
  "曼冉出逃，途中加入五毒；来到这座西南山区村寨落脚，露出本事（据共创文本一：采蛛丝至溪山渡，遇村寨易主与毒蛛之祸，助卓沃平祸）":
    "Mait Rangs fled, joining the Wudu Order on the way; she came to settle in this hill village in the south-west and showed what she could do (gathering spider silk at Xishan Ford, she met a village that had changed hands and a plague of venomous spiders, and helped Zhod Vos put it down).",
  "程凯带程钧溜出府看夜市，教他躲避父兄责罚（约735—737）":
    "Cheng Kai took Cheng Jun sneaking out of the house to see the night market, and taught him how to dodge punishment from their father and brothers (around 735–737).",
  "北庭都护盖嘉运率兵击突骑施，破之（史）；程广、程钊从征——史书只记主帅之名，是程钊头一回有功不得封赏":
    "Gai Jiayun, Protector-General of Beiting, led troops against the Türgesh and routed them (historical); Cheng Guang and Cheng Zhao went with him. The histories record only the commander’s name: the first time Cheng Zhao earned merit and was given no reward.",
  "程锋天策三年期满，至北庭，时突骑施新破——小一岁的庶弟已是见过血的人；识陆灵":
    "Cheng Feng’s three years at the Tiance Command were up and he came to Beiting just after the Türgesh had been routed: his half-brother, a year younger, was already a man who had seen blood. He came to know Lu Ling.",
  "上秋，义宁坊茶铺争执延及岚川家铁器商铺，明教陆隐等数人闯铺夺器殴斗——赵盈贞时有孕七月，跌扑受惊不能安产，失血发痫，与子俱亡；官府依唐律斗讼条，元谋者陆隐减斗杀一等，科流三千里":
    "Early autumn: a quarrel at a teahouse in the Yining Ward spilled into the Lanchuan family’s ironware shop, and Lu Yin and several other Mingjiao men broke in, seized its wares and brawled. Zhao Yingzhen, seven months pregnant, fell and was badly frightened; the birth went wrong, she haemorrhaged and convulsed, and she and the child both died. Under the Tang Code’s articles on affrays the authorities sentenced Lu Yin, as the instigator, at one degree below homicide in an affray: exile to three thousand li.",
  // 737
  "玄甲军征召北地青壮，吕定仪身板见拒，以誊录军籍之便自写名于册；旋奉派五原，遭突厥围困，请郡守开府库，留什一存贮，按籍设配额、五日一校，四五十日城内大抵免于饥馑；事后玄甲军下帖，召至雁门为军师幕下参佐":
    "When the Xuanjia Army called up the young men of the north, Lü Dingyi was turned away for his slight build, and used his work copying the army rolls to write his own name in. Sent soon after to Wuyuan, he was besieged there by the Türks; he asked the governor to open the treasury and granaries, kept a tenth in reserve, set rations by the household register and checked them every five days, and for forty or fifty days the town was largely spared famine. Afterwards the Xuanjia Army sent him a summons to Yanmen as a staff assistant to the strategist.",
  "吕定仪入苍云／荔非武功渐成／闵方城在甘州放牧":
    "Lü Dingyi joined the Cangyun Army / Lifei’s martial skill came into its own / Min Fangcheng herded livestock at Ganzhou.",
  "景惠时与关山到雁门关安顿，邻女生子（即边赛远），景惠时协助，关山投军":
    "Jing Huishi and Guan Shan settled at Yanmen Pass; when the woman next door gave birth (the child was Bian Saiyuan), Jing Huishi helped; Guan Shan enlisted.",
  "王维在凉州河西节度使崔希逸幕下任节度判官，作《老将行》——「射杀中山白额虎，肯数邺下黄须儿」「卫青不败，李广无功」：荔非承烈「白额当关」之号与「无功」之字所本":
    "Wang Wei, on the staff of Cui Xiyi, Military Commissioner of Hexi at Liangzhou, as administrative assistant, wrote “Song of the Old General”: “He shot dead the white-browed tiger of Zhongshan; would he reckon with the yellow-bearded son of Ye?” and “Wei Qing never lost … Li Guang won no merit.” These lines are the source of Lifei Chenglie’s epithet, The White-Browed Tiger Holds the Pass, and of his courtesy name Wugong, “no merit”.",
  "冬，风雪夜巡线追奚骑，沟谷中伏，前队旗手中箭、旗杆斜折、队阵惊散；荔非不待军令提刀上前，一击劈中欲夺旗之敌骑马颈，掣旗振开、杆杵雪中，队伍在他身后收拢复为严整盾阵；事后以离阵擅动不遵军令受军棍，「背上如火烧，眼里却亮」，此后渐有声名传于营内":
    "Winter. Patrolling the line on a night of wind and snow in pursuit of Xi horsemen, the column was ambushed in a gully; the standard-bearer at the front was hit by an arrow, the staff snapped askew and the ranks broke in alarm. Without waiting for orders Lifei went forward with his blade, cut through the neck of the horse of an enemy rider reaching for the standard, snatched up the flag, shook it out and drove the staff into the snow, and behind him the column closed up again into a tight shield wall. Afterwards he was beaten with the army staff for leaving the ranks and acting without orders, “his back as if on fire, but his eyes bright”, and from then on his name began to be talked about in the camp.",
  "曼冉被沃家家长芒沃（女执政官）收为义女——名分而已：曼冉保留本姓 Rangs，不入沃家，不进继承顺位":
    "Mait Rangs was taken as adopted daughter by Mangx Vos, head of the Vos household (the woman who governed): a title only. Mait Rangs kept her own clan name, Rangs, did not enter the Vos household and had no place in its succession.",
  "夏末押粮入关，驿站闻某沟口常有流骑劫掠车队；荔非佯作绕道，诱敌入窄沟，据粮车为障、抄上侧坡故技重施，敌骑几乎尽折，粮米无损；军纪官欲治其擅自改道之罪，吕定仪清点对账时不高不低插一句「数目无损」，军师验其所缴胡骑腰牌（似河北制式），沉吟「罢了」——不治罪，亦不记功":
    "Late summer, escorting grain into the pass. At a post station he heard that mounted raiders often robbed convoys at the mouth of a certain gully. Lifei feigned a detour, lured them into a narrow defile and played his old trick again, the carts as a barricade and a run up the side slope; nearly all the raiders fell, and the grain was untouched. The provost wanted to punish him for changing the route on his own authority; as Lü Dingyi checked the tallies he put in, neither loudly nor softly, “The count is complete.” The strategist examined the waist tokens taken from the Hu riders (apparently of Hebei make), considered, and said, “Let it go”: no punishment, and no merit recorded.",
  "赵盈贞丧满一年祭日，义兄阿辉以屡未能护主为耻，自尽而亡——生平第一次开口说话，乡音唤「小姐…保重」；靖彦抱之允诺「我带你回去，一定带你回去」，葬于长安西郊，唯留其鱼皮柄东瀛短刀":
    "On the first anniversary of Zhao Yingzhen’s death, Ahui, Lanchuan Yun’s adoptive elder brother, ashamed that he had failed time and again to protect the family he served, took his own life; he spoke for the first time in his life, calling in his own tongue, “Miss… take care.” Jingyan held him and promised, “I’ll take you back. I will take you back.” He was buried in the western outskirts of Chang’an; all that was left was his Japanese short blade with its ray-skin (samegawa) hilt.",
  // 738
  "苍云（玄甲军）随王忠嗣出关征奚大胜、吕定仪救荔非右膝骨裂、吕定仪妻移居广武城":
    "The Cangyun Army (the Xuanjia Army) marched out of the pass under Wang Zhongsi against the Xi and won a great victory; Lü Dingyi saved Lifei, whose right knee was cracked; Lü Dingyi’s wife moved to Guangwu Fortress.",
  "圣人命置延恩、怀德、归仁等县，始放回六胡州流散胡户；县治倚河谷夯土为垣，四面设卡、验牒按伍分编，男丁入屯队，昼出垦作、日落归棚更点，离队、越界、聚众皆不容（开元二十六年置宥州及诸县事）":
    "The emperor ordered the counties of Yan’en, Huaide, Guiren and others established, and the scattered Hu households of the Six Prefectures were at last allowed back. The county seats had rammed-earth walls set against the river valleys and checkpoints on all four sides; papers were inspected and people sorted into units of five; the men were put into farming teams, out to till by day and back in their sheds by sunset for the watch count. Leaving the team, crossing the boundary and gathering in groups were all forbidden. (The founding of Youzhou and its counties in the twenty-sixth year of Kaiyuan.)",
  "春夏间，六胡州流散杂胡持旧牒假称奉招抚，劫掠村镇、劫马邑馆驿；玄甲军封锁关卡独留老驿道诱其入网，荔非巡守道口擒之押回；囚前杀心暗起，薛直诫之——「杀得尽吗？……今日你做主动刀，有一次，便有两次、三次、百次。你成了什么人？」翌日荔非亲押杂胡赴三县安置，二十余日往返，城外宿一夜而去；是年秋，晋破阵营第二团旅帅":
    "In spring and summer, scattered Hu from the Six Prefectures, carrying old papers and falsely claiming to have submitted, plundered villages and robbed the post station at Mayi. The Xuanjia Army closed the checkpoints, leaving only the old post road open to draw them into the net, and Lifei, guarding the road mouth, captured them and brought them back. Before the prisoners the urge to kill rose in him; Xue Zhi warned him: “Can you kill them all? … If today you are the one who strikes, once becomes twice, three times, a hundred times. What will you have become?” The next day Lifei himself escorted the Hu to be resettled in the three counties, more than twenty days there and back, and spent one night outside the walls before he left. That autumn he was promoted to Battalion Commander in the Second Regiment of the Rank-Breaker Corps.",
  "曼冉成为祭司":
    "Mait Rangs became a priestess.",
  "手钏被诬：程凯身上一件女人首饰（阿娘遗物）被人发现，程铎首告，诬他偷了夫人之物；程钧知情未言。程凯打出程府，投天策；洛阳来信报到北庭，程钊在父亲身边说「他爱做什么就做什么吧」":
    "The bracelet: a woman’s ornament (his mother’s keepsake) was found on Cheng Kai, and Cheng Duo informed on him, falsely accusing him of stealing it from the principal wife; Cheng Jun knew the truth and said nothing. Cheng Kai fought his way out of the Cheng house and went to the Tiance Command. When the letter from Luoyang reached Beiting, Cheng Zhao, at his father’s side, said, “Let him do whatever he likes.”",
  "叶曙兮随家人西来寻镔铁；北庭兵器遇寒脆折，她与经管甲仗的程钊相识":
    "Ye Shuxi came west with her family in search of fine steel (bintie); the weapons at Beiting were snapping in the cold, and she came to know Cheng Zhao, who had charge of the arms and armour.",
  "闵方城流浪长安西市":
    "Min Fangcheng drifted about Chang’an’s Western Market.",
  "王昱任剑南节度使，奉命「分道经略吐蕃」，毁赤岭碑":
    "Wang Yu became Military Commissioner of Jiannan, ordered to “campaign against Tibet along separate routes”, and destroyed the boundary stele at Chiling.",
  "闵方城至雁门广武城":
    "Min Fangcheng reached Guangwu Fortress at Yanmen.",
  "岚川云丧服满后投天策府——临行靖彦将阿辉随身短刀放在她手中：「让他跟着你，他会愿意」（是年中有几个月闵方城正流浪长安西市及附近诸坊，两人可能碰见过，岚川云给过吃的——参本年三月条）":
    "Her mourning over, Lanchuan Yun went to join the Tiance Command; as she left, Jingyan put Ahui’s short blade in her hand: “Let him go with you. He would want to.” (For several months that year Min Fangcheng was drifting about the Western Market and the wards nearby; the two may have crossed paths, and Lanchuan Yun may have given him something to eat: see the entry for the third month.)",
  "王昱于吐蕃所据安戎城旁筑两城断其粮道，吐蕃大举来救，唐军大败、死者数千，王昱贬死岭南。底色：程铎不在此役——是年他尚在洛阳首告程凯":
    "Wang Yu built two forts beside Tibetan-held Anrong to cut its supply road; the Tibetans came in force to relieve it, the Tang army was badly beaten with thousands dead, and Wang Yu was demoted to Lingnan, where he died. Background: Cheng Duo was not in this battle; that year he was still in Luoyang, informing on Cheng Kai.",
  "册南诏蒙归义（皮逻阁）为云南王；皮逻阁厚赂王昱，求合六诏为一，朝廷从之":
    "Meng Guiyi (Piluoge) of Nanzhao was invested as Prince of Yunnan; Piluoge had richly bribed Wang Yu, seeking to unite the six zhao into one, and the court agreed.",
  "叶曙兮改制的兵器熬过北庭寒冬；她以铸剑人的眼光读出程钊之字「故廉」的本义——刃口磨平，有功不得封赏；程钊生母给她送去冬衣，是程家最先接纳她的人":
    "The weapons Ye Shuxi reworked lasted through the Beiting winter. With a swordsmith’s eye she read Cheng Zhao’s courtesy name, Gulian, in its root sense: a blade’s edge ground flat, merit earned and never rewarded. Cheng Zhao’s mother sent her winter clothes: the first in the Cheng family to accept her.",
  // 739
  "岚川云受训斥候（739–741），其间认识高垣（凌雪阁中人）":
    "Lanchuan Yun trained as a scout (739–741), and in that time came to know Gao Yuan (of the Lingxue Pavilion).",
  "高垣受托至天杀营（739–741间往来）授近身擒搏、侦讯与反讯问之技，以「青山之后」虚刑试炼弟子耐痛；试岚川云——「你有恨。」「原以为一场杀戮，便能荡平，原来没有。」「你年轻，又是有硬芯的人。自己能弄明白这些事，早晚能。」":
    "At the Tiance Command’s request Gao Yuan came to the Heavenly Slayer Corps (back and forth between 739 and 741) to teach close-quarters grappling, interrogation and resistance to interrogation, testing the pupils’ endurance of pain with a mock torture called “Beyond the Blue Hills”. Testing Lanchuan Yun: “You have hatred.” “I thought one round of killing would level it. It didn’t.” “You’re young, and there’s something hard at your core. You’ll work these things out for yourself. Sooner or later, you will.”",
  "皮逻阁迁都太和城，洱海谷地成为南诏心脏":
    "Piluoge moved his capital to Taihe, and the Erhai valley became the heart of Nanzhao.",
  "唐青阳改充长任健儿。开元二十五年诏「于诸色征行人内及客户中招募，取丁壮情愿充健儿长任边军者，每岁加于常例，给田地屋宅」——健儿只从征行人与客户中招，他先当过一回征行人：738年王昱安戎大败后剑南补兵，青神点到他家，他替父亲去了，名册上写的是父亲的名字。739年改充健儿，名册上才第一次是自己的名字；钱粮寄回青神，替家里补庸调的绢":
    "Tang Qingyang re-enlisted as a long-service professional soldier. An edict of the twenty-fifth year of Kaiyuan ordered recruits “from among the campaigners of every kind and the migrant households, taking able-bodied men willing to serve as long-service professional soldiers in the frontier armies, adding to the usual allowance each year and granting fields and houses”. Professional soldiers were drawn only from campaigners and migrant households, and he had already served once as a campaigner: after Wang Yu’s great defeat at Anrong in 738 Jiannan raised replacements, his family in Qingshen was called up, and he went in his father’s place, under his father’s name on the roll. In 739, re-enlisting as a professional soldier, his own name went on the roll for the first time; he sent his pay home to Qingshen to make up the family’s silk for the labour and cloth taxes.",
  "有寨民求医，曼冉以天一教秘法救治男童（天一教正太），男童痊愈后回到父母身边":
    "A villager came for healing, and Mait Rangs treated a boy with the secret arts of the Tianyi Order (the Tianyi Order boy); the boy recovered and went back to his parents.",
  "陆羽鸣赴长安，落脚城西卑路斯旧部后人家":
    "Lu Yuming went to Chang’an and lodged in the west of the city with a household descended from Peroz’s old retainers.",
  "闵方城与苍云军始有来往、结识关山":
    "Min Fangcheng began to have dealings with the Cangyun Army and came to know Guan Shan.",
  "盖嘉运破碎叶，擒突骑施可汗吐火仙（史）；程广、程钊从征":
    "Gai Jiayun took Suyab and captured Tuhuoxian, qaghan of the Türgesh (historical); Cheng Guang and Cheng Zhao went with him.",
  "大光明寺之役，高垣高堑同队（队号「知君青骨」）早往长安布局、为天策府传递机要；高堑有斩敌之功，并于房顶为岚川云解围":
    "In the Great Bright Temple affair Gao Yuan and Gao Qian were in the same squad (the Zhijun Qinggu squad), sent early to Chang’an to lay the ground and to pass secret intelligence to the Tiance Command; Gao Qian had kills to his credit, and on the rooftop he came to Lanchuan Yun’s aid.",
  "秋，大光明寺事件：天策受命，与少林及凌雪阁围剿明教于长安西市义宁坊大光明寺。事前谋划调兵极其隐秘，主动请命赴长安的陆羽鸣仍于一间馆驿周围发现端倪、摸至天策众将集会处，而为时已迟——岚川云穷追，又有凌雪一重保障，使其折戟；陆晚月与岚川云视角皆以为其被高堑当场杀死，实则失踪，此后滞留中原十六年。陆南信因事不在城内，赶回城下时被戒严当夜部署城楼的少年程凯射穿右肘，伤未妥治，筋骨挛缩，无以用双刀":
    "Autumn: the Great Bright Temple Incident. On orders, the Tiance Command, with Shaolin and the Lingxue Pavilion, surrounded and destroyed the Mingjiao at the Great Bright Temple in the Yining Ward by Chang’an’s Western Market. The planning and the movement of troops were kept utterly secret, yet Lu Yuming, who had asked to be sent to Chang’an, still caught the signs around a post house and felt his way to where the Tiance generals were meeting; but by then it was too late. Lanchuan Yun hunted him down, with the Lingxue Pavilion as a second safeguard, and he fell. Both Lu Wanyue and Lanchuan Yun believed Gao Qian had killed him on the spot; in fact he vanished, and stayed in the Central Plains for sixteen years. Lu Nanxin, away from the city at the time, came hurrying back to the walls and was shot through the right elbow by the young Cheng Kai, posted on the gate tower the night the curfew was imposed; the wound was never properly treated, the sinews and bone contracted, and he could no longer use twin blades.",
  "暗线：屋顶一战，陆羽鸣抬头看岚川云，刀线偏开，颈侧下颌重伤失声、昏死，在场者皆以为已死；临昏前念《哈多赫特·纳斯克》2.10 前半句 cišca carāitiš ahi（亡魂过桥之问）":
    "The hidden thread: the fight on the rooftop. Lu Yuming looked up at Lanchuan Yun, the blade’s line veered off, and he was badly wounded at the side of the neck and the jaw, lost his voice and fell senseless; everyone there believed him dead. Before he passed out he spoke the first half of Hadōxt Nask 2.10, cišca carāitiš ahi (the question put to the soul at the bridge).",
  "高堑以刀尖挑下陆羽鸣的萨珊玛瑙印石，交岚川云论功——「剩下的事就是我的了」，拖人离去；岚川云回守军师":
    "With the point of his blade Gao Qian flicked off Lu Yuming’s Sasanian agate seal and gave it to Lanchuan Yun to claim the kill: “The rest is my business.” He dragged the man away; Lanchuan Yun went back to guard the strategist.",
  "暗线：高堑拖人途中发觉陆羽鸣尚有气，不补刀，亦不送机枢府，送回其城西落脚的波斯旧族人家；此后不提（一改口即须剥去岚川云的杀获、交代自己当场让功）。745年高堑死，此事随之入墓林":
    "The hidden thread: dragging him away, Gao Qian found Lu Yuming still breathing. He did not finish him, nor take him to the Jishu Bureau, but carried him back to the old Persian family in the west of the city where he had been lodging, and never spoke of it after (to change his story he would have had to strip Lanchuan Yun of her kill and admit to giving up the credit on the spot). Gao Qian died in 745, and the secret went into the grave with him.",
  "暗线：陆羽鸣困居长安——无籍无过所，恐累收留之家，回教即受疑；教中知情者仅陆危楼（作者定）":
    "The hidden thread: Lu Yuming trapped in Chang’an. He had no household registration and no travel pass, feared bringing trouble on the family that sheltered him, and would fall under suspicion the moment he went back to the order; in the order, only Lu Weilou knew.",
  "岚川云以陆羽鸣的萨珊玛瑙印石论功，得出阵即有「杀获」的嘉奖（时剿杀明教徒甚众，未逐一查验）；印石此后留在她手上":
    "Lanchuan Yun claimed the kill with Lu Yuming’s Sasanian agate seal, and was commended for a kill on her very first sortie (so many Mingjiao followers had been killed that no one checked them one by one); the seal stayed in her hands from then on.",
  "闵方城撞见薛直 修马蹄":
    "Min Fangcheng came upon Xue Zhi trimming a horse’s hooves.",
  "稻谷入仓祭，曼冉带男童主祭，受寨民尊崇，称男童为「圣童」":
    "At the festival for bringing the rice into the granary, Mait Rangs led the rite with the boy, and was revered by the villagers, who called the boy “the Holy Child”.",
  "程钊与藏剑叶曙兮定婚，亲迎须俟长兄先娶；程锋劝他先娶，程钊推辞":
    "Cheng Zhao was betrothed to Ye Shuxi of Cangjian Manor, but the wedding had to wait until his eldest brother married first; Cheng Feng urged him to marry first, and Cheng Zhao declined.",
  "章仇兼琼入奏「安戎城可取」，玄宗大悦，以之为剑南节度使":
    "Zhangchou Jianqiong reported to the throne that “Anrong can be taken”; Xuanzong was delighted and made him Military Commissioner of Jiannan.",
  // 740
  "陆晚月成为「影月」旗下小杀手":
    "Lu Wanyue became a junior assassin under the “Shadow Moon” banner.",
  "冬，高垣代同侪交接情报，误路夜宿巢县破庙，遇幼年宣杨（时庙中老僧新逝）——小孩烤着捡来的饼怡然自得，夜里燎了他的围巾；携归远门沟收养，上报得允，得闲徐徐教些功夫。不知其为恩人黍梁之女":
    "Winter. Handing over intelligence for a colleague, Gao Yuan lost his way and spent the night in a ruined temple in Chao County, where he met the young Xuan Yang (the old monk of the temple had just died): the child was contentedly toasting a cake she had picked up, and in the night she singed his scarf. He took her back to Yuanmen Gully to raise, reported it and was given leave, and taught her some kung fu at his leisure, little by little. He did not know she was the daughter of Shuliang, who had saved him.",
  "叶曙兮撮合程锋与陆灵（739冬—740）：一半出于喜欢陆灵，一半因为那桩婚事成了，自己的才能成":
    "Ye Shuxi brought Cheng Feng and Lu Ling together (winter 739–740): half because she liked Lu Ling, half because once that marriage was made, hers could be.",
  "闵方城入苍云":
    "Min Fangcheng joined the Cangyun Army.",
  "剑南节度使章仇兼琼策反吐蕃安戎城守将翟都局、维州别驾董承晏，开城尽杀吐蕃将卒，以监察御史许远守城；程铎时年二十，随军入城，此为其入剑南后第一份军功（按：738年程铎尚在洛阳首告程凯，故其入剑南系于739年前后，不取738年九月王昱安戎城之败）。唐青阳时年十八，是同在入城队伍里的新健儿：安戎在岷江上游，离祖母讲的蚕丛祖地不远，他第一次看见祖先的山，穿的是官军的衣服":
    "Zhangchou Jianqiong, Military Commissioner of Jiannan, turned Zhai Duju, the Tibetan commander of Anrong Fortress, and Dong Chengyan, Vice Prefect of Weizhou; they opened the gates and killed every Tibetan officer and soldier, and the Investigating Censor Xu Yuan was put in to hold the fortress. Cheng Duo, then twenty, entered it with the army: his first military merit after coming to Jiannan. Tang Qingyang, then eighteen, was a new professional soldier in the same column: Anrong lay on the upper Min River, not far from the land of Cancong his grandmother told of, and he saw his ancestors’ mountains for the first time wearing the uniform of the government army.",
  "长安献俘，立阿史那昕为十姓可汗（史）；程广随盖嘉运入朝受赏，北庭无人主婚":
    "Captives were presented in Chang’an, and Ashina Xin was set up as Qaghan of the Ten Tribes (historical); Cheng Guang went to court with Gai Jiayun to be rewarded, and there was no one at Beiting to preside over a wedding.",
  "莫贺达干怒阿史那昕之立，帅诸部叛（史）；程钊赴俱六守捉，临行叶曙兮越线（由她主动），有了孩子；此后程钊生母常与叶曙兮在城头同望西路":
    "Baga Tarkhan, angered at Ashina Xin’s elevation, led the tribes in revolt (historical); Cheng Zhao was sent to the Juliu Garrison Post. Before he left, Ye Shuxi crossed the line (at her own initiative), and there was a child. From then on Cheng Zhao’s mother often stood with Ye Shuxi on the walls, both watching the western road.",
  "曼冉于蝴蝶泉边收留娜留、佩留并教导；姐妹父母是染织匠人，因「染料中有虫」被逐，迁居山中坠山而亡；姐妹把家传染法带进寨——寨中独有之布由此而来":
    "By Butterfly Spring Mait Rangs took in Nax Liuf and Pet Liuf and taught them. The sisters’ parents were dyers, driven out because “there were insects in the dye”; they moved into the mountains and died in a fall. The sisters brought the family’s dyeing methods into the village, and from them came the cloth found only in this village.",
  "六月至十月，吐蕃两次围攻安戎、维州，关中援兵至而退；安戎城改名平戎城。底色：守城的监察御史许远，757 年与张巡同守睢阳":
    "From the sixth month to the tenth, the Tibetans twice besieged Anrong and Weizhou, and withdrew when relief came from Guanzhong; Anrong was renamed Pingrong. Background: Xu Yuan, the Investigating Censor who held it, would hold Suiyang with Zhang Xun in 757.",
  "吐蕃两次围安戎、维州，唐青阳与程铎同守城头，守城的是监察御史许远。程铎是洛阳来的，不认得这里的山，也听不懂兵说的话；唐青阳替他认路，替他跟兵说话。两人的分工从这里定下：程铎定规矩，唐青阳把规矩讲给兵听":
    "The Tibetans twice besieged Anrong and Weizhou, and Tang Qingyang and Cheng Duo held the walls together under the Investigating Censor Xu Yuan. Cheng Duo came from Luoyang; he did not know these mountains and could not understand what the soldiers said, so Tang Qingyang found the way for him and spoke to the soldiers for him. Their division of labour was settled here: Cheng Duo made the rules, and Tang Qingyang explained the rules to the soldiers.",
  "曼冉主祭，圣童第二年在旁，当场异状，天一教人暗中施术使其恢复，众人未觉；卓沃察觉，暗中收集曼冉勾连天一教、滥用禁术的证据，欲拉她下马":
    "Mait Rangs led the rite, the Holy Child at her side for the second year; something went wrong in front of everyone, and a Tianyi man secretly worked a spell to restore him without anyone noticing. Zhod Vos noticed, and began quietly gathering evidence that Mait Rangs was in league with the Tianyi Order and abusing forbidden arts, meaning to bring her down.",
  "程钊致书程锋交代后事；不愿受抚的部落袭击俱六守捉，程钊战亡——史书只留「叛」与「降」，功劳记在主帅名下；叶曙兮不肯将他的枪头回炉开刃":
    "Cheng Zhao wrote to Cheng Feng setting out his last wishes; tribes unwilling to submit attacked the Juliu Garrison Post, and Cheng Zhao fell in battle. The histories keep only “revolt” and “surrender”, and the merit went to the commander’s name. Ye Shuxi would not let his spearhead be reforged and given an edge.",
  // 741
  "陆晓成为明教正式教众":
    "Lu Xiao became a full member of the Mingjiao.",
  "程广欲接回叶忱，程钊生母劝其放手（她第二次开口），叶曙兮携女回藏剑；同年程广允准程锋与陆灵的婚事（「也罢……总占个心甘情愿」）":
    "Cheng Guang wanted to take Ye Chen in; Cheng Zhao’s mother urged him to let go (the second time she spoke up), and Ye Shuxi took her daughter back to Cangjian Manor. The same year Cheng Guang consented to Cheng Feng’s marriage to Lu Ling (“Very well… at least it’s willing on both sides”).",
  "高堑外任成都（约 741–742）：安戎城刚靠内应拿下，吐蕃反复反扑。章仇兼琼的打法本就是情报战——策反守将、收买别驾——凌雪阁小队的标的，即这条线上的内应或反间；745 年玄鹤别院的「吐蕃翻译」，可以是他在成都结下的人":
    "Gao Qian posted to Chengdu (about 741–742): Anrong had only just been taken with help from inside, and the Tibetans kept counter-attacking. Zhangchou Jianqiong’s way of fighting was a war of intelligence from the start, turning the garrison commander and buying the vice prefect, and the Lingxue squad’s targets were the agents and double agents along this line; the “Tibetan interpreter” at the Xuanhe Lodge in 745 could be someone he got to know in Chengdu.",
  "许秋生之父染疫身亡，沈含英随师走方救其母子，引许秋生入谷——「怕么？」「自己双亲，怕什么。可你有法子么？」":
    "Xu Qiusheng’s father died in an epidemic; Shen Hanying, travelling with his master to treat the sick, saved the mother and son and brought Xu Qiusheng into the Valley: “Are you afraid?” “They’re my own parents. What is there to be afraid of? But do you have a way?”",
  "沈含英、许秋生、江蓠同场入门三选一：沈含英选刀（医者之勇），许秋生选木锨（医者之勤），江蓠选桃（医者之智）":
    "Shen Hanying, Xu Qiusheng and Jiang Li entered the Valley together and each chose one of three: Shen Hanying chose the knife (a physician’s courage), Xu Qiusheng the wooden shovel (a physician’s diligence), Jiang Li the peach (a physician’s wisdom).",
  "男童病情反复，父母求医，曼冉借口将男童留下；天一教人趁虚而入，提供药方或术法（具体待定）":
    "The boy relapsed and his parents sought help; Mait Rangs found an excuse to keep him with her. The Tianyi Order seized its chance, offering prescriptions or spells (details undecided).",
  "叶忱生于北庭，从母姓；名取程钊遗书中的一个「忱」字——信末寻常一语，并非为她而起":
    "Ye Chen was born at Beiting and took her mother’s surname; her name came from the word chen, “sincere”, in Cheng Zhao’s last letter: an ordinary phrase at the end of the letter, not chosen for her.",
  "岚川云一去西域援边（741–742），随杨宁往救一孤城，初会陆晚月（城内有陆晚月亲眷，岚川云不知）；程凯同行，经庭州（北庭一别），碎叶道遇伏":
    "Lanchuan Yun’s first tour to reinforce the Western Regions frontier (741–742): with Yang Ning she went to relieve an isolated town and first met Lu Wanyue (Lu Wanyue had kin inside the town, which Lanchuan Yun did not know). Cheng Kai went too; they passed through Tingzhou (the parting at Beiting) and were ambushed on the Suyab road.",
  "曼冉第三年主祭":
    "Mait Rangs led the rite for the third year.",
  "程广以伊西北庭节度副使出北庭西路，讨不肯受抚的突骑施余部，在程钊殁身的那条路上被围；程凯随杨宁援边，率百骑解围，父子阵前相见——程凯问阿玉葬在哪里，程广答不上来":
    "Cheng Guang, as Vice Military Commissioner of Yixi and Beiting, took the western road out of Beiting against the Türgesh remnants who would not submit, and was surrounded on the very road where Cheng Zhao had died; Cheng Kai, reinforcing the frontier with Yang Ning, broke the encirclement at the head of a hundred horsemen, and father and son met before the lines. Cheng Kai asked where A-Yu was buried; Cheng Guang could not answer.",
  // 742
  "靳沉白（约十五岁）随父北上，避敌袭临时入雁塔，助治伤患、书记誊录，因与楼氏结识楼谊、楼谯姐弟；楼准始有以婿之心，欲留塔纳编，靳沉白辞归乡尽孝进学，此后偶通书信":
    "Jin Chenbai (about fifteen) went north with his father; sheltering from an enemy raid in Yanta Tower, he helped tend the wounded and kept the records, and so came to know the Lou family and the sister and brother Lou Yi and Lou Qiao. Lou Zhun began to think of him as a son-in-law and wanted to keep him on the tower’s rolls; Jin Chenbai declined, going home to serve his parents and pursue his studies, and afterwards they exchanged the occasional letter.",
  "龙门再遇：陆晚月见师父的萨珊玛瑙印石在岚川云身上，二人大打出手；交谈中岚川云复述陆羽鸣临终音节（印石是否交还待定），陆晚月携音节回西域，陆南信认出为亡魂过桥之问；同年，陆隐遇天宝改元大赦获释，回归杀手小队":
    "Meeting again at Longmen: Lu Wanyue saw her master’s Sasanian agate seal on Lanchuan Yun, and the two fought fiercely. As they talked, Lanchuan Yun repeated the syllables Lu Yuming had spoken as he died (whether the seal was given back: undecided); Lu Wanyue carried the syllables back to the Western Regions, and Lu Nanxin recognised them as the question put to the soul at the bridge. The same year Lu Yin was released in the amnesty for the new Tianbao era and went back to the assassin squad.",
  "夫人到北庭；程锋娶陆灵（在程钊期丧满后）":
    "The principal wife came to Beiting; Cheng Feng married Lu Ling (after the year of mourning for Cheng Zhao was over).",
  "吕定仪女生病，妻子抱去营中诊治；苍云上一代人物一同宴饮场景；开春女儿病势复发，夭折，吕定仪妻返乡":
    "Lü Dingyi’s daughter fell ill and his wife carried her to the camp to be treated; a scene of the older generation of the Cangyun Army feasting together. In early spring the girl’s illness returned and she died; Lü Dingyi’s wife went back to her home.",
  "天宝改元大赦，陆隐获释，回影月旗":
    "In the amnesty for the new Tianbao era Lu Yin was released and went back to the Shadow Moon banner.",
  "正式设剑南节度使，治益州，兵三万九百人，职在「西抗吐蕃，南抚蛮獠」":
    "The Military Commission of Jiannan was formally established, seated at Yizhou, with 30,900 troops, charged “to resist Tibet in the west and pacify the Man and Lao in the south”.",
  "芦笙节，卓沃发难，揭露曼冉滥用禁术，治男童之事公开，村民各执一词；诺朗当众讲述母亲以禁术救命之事，大祭司由此得到支持":
    "At the Lusheng festival Zhod Vos made her move, exposing Mait Rangs’s abuse of forbidden arts; the boy’s treatment became public and the villagers were divided. Nof Langb told everyone how Nof Langb’s mother had once saved a life with forbidden arts, and the high priestess won support.",
  "曼冉与卓沃冲突，借力尼亚得胜，将卓沃控制起来，政教又合一":
    "Mait Rangs clashed with Zhod Vos and, with Nyax Vos’s help, won, putting Zhod Vos under control; rule and rite were one again.",
  "男童死亡、化为毒尸，适逢父母探望，曼冉灭口":
    "The boy died and became a poison corpse just as his parents came to visit; Mait Rangs silenced them.",
  "天一教掌握曼冉灭口一事，要挟她相助，始渗透村寨；曼冉意图摆脱压制，转而改造、控制男童以自强":
    "The Tianyi Order, knowing about the silencing, blackmailed Mait Rangs into helping it and began to infiltrate the village; Mait Rangs, wanting to throw off its grip, turned to remaking and controlling the boy to strengthen herself.",
  // 743
  "太原冬日，闵方城路遇犯错被打、跌坐道边不能动的少年伶工杜徵，拉他起来——二人初见":
    "Winter in Taiyuan: Min Fangcheng came upon Du Zheng, a boy musician who had been beaten for a mistake and sat collapsed by the road, unable to move, and pulled him up: their first meeting.",
  "龙飞大营换防，程凯以攒了数年的饷钱欲赎姗娘（昔年爱护过他的歌伎），岚川云代他进歌楼寻人，未果——「好心是他的事，走与不走，走得走不得，却是我的事」；程凯又自往城郊寻阿玉的坟，未得":
    "When the Longfei Camp changed garrison, Cheng Kai wanted to use the pay he had saved for years to buy out Shanniang (a singing girl who had been kind to him long ago); Lanchuan Yun went into the house of song to see her on his behalf, but it came to nothing; Shanniang said, “Being kind is his affair. Whether I leave, and whether I can leave, is mine.” Cheng Kai then went alone to look for A-Yu’s grave outside the city, and did not find it.",
  "秋，天杀营斥候数人奉冷天锋之意访凌雪阁，互通软甲丸药诸物；岚川云与高堑切磋，败于青苔湿石之滑——「有人看石头，有人看青苔吧」；湖畔高垣论青苔与硬芯：「一年到头啊，从不见消萎，比人心人命都坚久。」后岚川云见其腰牌篆字：怀青":
    "Autumn. Several scouts of the Heavenly Slayer Corps visited the Lingxue Pavilion at Leng Tianfeng’s wish, to exchange soft armour, pills and the like; Lanchuan Yun sparred with Gao Qian and lost, slipping on a wet, mossy stone: “Some people look at the stone; some look at the moss.” By the lake Gao Yuan talked of moss and a hard core: “All year round it never withers. It outlasts people’s hearts and people’s lives.” Afterwards Lanchuan Yun saw the seal characters on his waist token: Huaiqing.",
  "天一教叛乱，控制村寨":
    "The Tianyi Order rose and took control of the village.",
  // 744
  "曼冉试图完全控制男童；娜留或已唤醒男童意识（待定）":
    "Mait Rangs tried to take complete control of the boy; Nax Liuf may already have woken his consciousness (undecided).",
  // 745
  "春，两公主和亲奚、契丹，自雁门出关，吕定仪协理各项文书；同年秋两蕃各杀公主举兵南下，吕定仪谏军师闭锁关城、候平卢节度先动以免正面接敌——“可是圣人想听的？”不用，遂有雁门关之役之痛":
    "Spring: two princesses went out through Yanmen in marriage alliances with the Xi and the Khitan, and Lü Dingyi helped with all the paperwork. That autumn both peoples killed their princesses and marched south. Lü Dingyi urged the strategist to seal the pass and wait for the Pinglu Military Commission to move first rather than meet the enemy head-on (the strategist: “But is that what the emperor wants to hear?”). He was not heeded, and so came the grief of the Battle of Yanmen Pass.",
  "夏，楼准因狼牙偷袭坠塔身亡，楼谊十五岁临危受命，升灯、报讯、点兵、值守如常，塔没有乱；靳氏父子念旧缘北上赴塔协助，靳沉白析文书为死伤、器械、粮秣、值守、传讯五类复核册，事后留塔为书手；与楼谊合写殉塔报文并器械损耗申领，文书落到关内吕定仪手中，拨料不曾拖沓":
    "Summer: Lou Zhun fell from the tower to his death in a Langya surprise attack, and Lou Yi, fifteen, took up the charge in the crisis; the lamps were raised, the signals sent, the men mustered and the watches kept as usual, and the tower did not fall into disorder. Remembering the old connection, Jin Chenbai and his father came north to help at the tower; Jin Chenbai sorted the documents into five verification ledgers (dead and wounded, equipment, grain and fodder, watches, signals), and stayed on afterwards as the tower’s scribe. With Lou Yi he wrote the report on those who died at the tower and the requisition for lost equipment; the papers reached Lü Dingyi inside the pass, and the materials were issued without delay.",
  "狄元恪（十五岁）与同窗自城外别院谈书论道归，太原城门见守卒欺侮一半大流民孩童；同窗劝「何必费口舌」「你是要考进士的，不是当武夫」，他说「哀民多艰，也在于看没看见。谁让他现在我眼前呢」，翻身下马喝止，以「怠惰公务」折服守卒；孩童抱着两个硬馒头不哭不瑟缩，他以糕点相易不成——「你的东西我不抢」——带回府中。父兄不喜，谓结交野童污了门风，他说「逐出这孩子便是逐我」，终得收留。孩童樊璋，云州流民：村寨为边骑冲突所焚，阿爷死于乱兵，阿娘病死岚州道旁葬于浅丘，随逃民车队入太原，籍券俱佚；一直留着阿娘的犬牙吊坠——「娘说是玉做的，看着却像石头」「玉就是石头，切磋琢磨，人才知道好」":
    "Di Yuanke (fifteen) was riding back with his classmates from a retreat outside the city, where they had been discussing books and the Way, when at the gate of Taiyuan he saw the guards bullying a half-grown vagrant child. His classmates urged him to let it be (“Why waste your breath?” “You’re meant to sit the jinshi examinations, not be a soldier”); he said, “Grieving at the hardships of the people also depends on whether you see them. And he happens to be right in front of my eyes,” swung down from his horse, shouted the guards off and cowed them with a charge of neglecting their duty. The child, clutching two hard buns, neither cried nor cowered; Di offered cakes in exchange and was refused (“I won’t take what’s yours”), and took the child home. His father and brothers disapproved, saying that befriending a stray disgraced the family; he said, “Throw this child out and you throw me out,” and in the end the child was taken in. The child was Fan Zhang, a refugee from Yunzhou: his village burned in a frontier skirmish, his father killed by marauding soldiers, his mother dead of illness by the road in Lanzhou and buried in a shallow mound, he had come into Taiyuan with a train of refugee carts, all papers lost, and still kept his mother’s dog-tooth pendant: “Mother said it was jade, but it looks like stone.” “Jade is stone. It takes cutting and polishing before people see it is good.”",
  "岚川云再至西域，处置红衣教之乱；陆晚月探查龙门红衣教魔鬼城，两人再遇；岚川云以弓弦扼杀陆隐":
    "Lanchuan Yun went to the Western Regions again to deal with the Hongyi Order’s uprising; Lu Wanyue, investigating the Hongyi Order’s Devil’s City at Longmen, met her again; Lanchuan Yun strangled Lu Yin with a bowstring.",
  "凌雪阁内乱 高堑身亡 高垣冤狱 宣杨入门":
    "Strife within the Lingxue Pavilion; Gao Qian died; Gao Yuan was wrongly imprisoned; Xuan Yang entered the Pavilion.",
  "天宝四载，李俶任外阁主，李林甫卸任、退控凌雪楼，朝堂宰相与太子之争在阁中一样上演；高堑受凌雪楼策动窃机枢府密卷，兄弟山坡缠斗，高垣重伤夺卷；外阁清剿宰相势力、收厌兵院，高堑转战玄鹤别院被捕，臼齿藏毒自尽，死前诬告兄长；高垣冤狱严刑，唯答「没有，不是我」——后宰相隐匿之弟子自首、证据确凿，冤白获释":
    "In the fourth year of Tianbao Li Chu became Master of the Outer Pavilion, and Li Linfu stepped down and withdrew to control the Lingxue Tower; the court’s struggle between the chancellor and the crown prince played out inside the Pavilion as well. Incited by the Lingxue Tower, Gao Qian stole secret scrolls from the Jishu Bureau; the brothers fought it out on a hillside, and Gao Yuan, badly hurt, took the scrolls back. As the Outer Pavilion purged the chancellor’s faction and took over the Yanbing Court, Gao Qian fought his way to the Xuanhe Lodge and was caught; he killed himself with poison hidden in a molar, and before he died falsely accused his brother. Gao Yuan was wrongly imprisoned and harshly tortured, and answered only, “No. It wasn’t me.” Later a hidden disciple of the chancellor’s gave himself up, the evidence was conclusive, and Gao Yuan was cleared and released.",
  "章仇兼琼开步头路（云南通交州），筑安宁城；东爨诸部起兵杀筑城者，朝廷令蒙归义（皮逻阁）弹压，南诏借爨氏内斗吞并其地。底色：蒙萍换蛊即为此局；安宁盐路由此断绝，卓沃的盐成了筹码":
    "Zhangchou Jianqiong opened the Butou road (linking Yunnan with Jiaozhou) and built Anning; the Eastern Cuan tribes rose and killed the builders, the court ordered Meng Guiyi (Piluoge) to put them down, and Nanzhao used the Cuan’s internal strife to swallow their lands. Background: Meng Ping’s exchange of gu belongs to this situation; the Anning salt road was cut from this point, and Zhod Vos’s salt became a bargaining chip.",
  "成都一夜：佩留交割特殊药材后灭口南诏商人蒙萍；央馨为截换天一教药材冒充商人入仓库，死于唐哲小组伏击，尸身随仓库焚毁，唐哲私藏其驱蚊小球；杨钊扣下布料与药材，照单全收。监视唐哲者为谁，暂未定":
    "A night in Chengdu: after handing over special medicinal herbs, Pet Liuf silenced the Nanzhao merchant Meng Ping; Vangb Xenb, posing as a merchant to get into the warehouse and switch the Tianyi Order’s herbs, died in an ambush by Tang Zhe’s team, and her body burned with the warehouse; Tang Zhe secretly kept her little mosquito-repelling ball. Yang Zhao impounded the cloth and the herbs and took the lot. Who was watching Tang Zhe is not yet settled.",
  "成都一夜：副队头唐青阳带一火人从平戎城到成都领军器，那一夜宿在城里。仓库起火，他赶到时火场干净得不像火场；他在城里报了所见，最后鲜于仲通结了案，写的是失火。回平戎城后跟程铎说起，程铎说：上面说是失火，就是失火。他记住了那种干净，九年后在唐哲队里又见了一次，才知道是谁收拾的":
    "The night in Chengdu: Tang Qingyang, a deputy squad leader, brought a squad from Pingrong to Chengdu to draw weapons, and that night they stayed in the city. The warehouse caught fire; by the time he got there the scene was too clean to be the scene of a fire. He reported what he had seen in the city, and in the end Xianyu Zhongtong closed the case, writing it down as an accidental fire. Back at Pingrong he told Cheng Duo about it, and Cheng Duo said: if those above say it was a fire, it was a fire. He remembered that cleanness, saw it once more nine years later in Tang Zhe’s team, and only then knew who had cleaned up.",
  "大决战：成都一夜后天一教缺药、毒尸狂暴；曼冉放出卓沃共抗天一教，圣童出手终结毒尸；大祭司一方损失惨重，娜留或死于此役；卓沃趁虚而入":
    "The decisive battle: after the night in Chengdu the Tianyi Order ran short of medicine and its poison corpses ran wild; Mait Rangs let Zhod Vos out to fight the Cult together, and the Holy Child struck the blow that ended the poison corpses. The high priestess’s side suffered heavy losses, and Nax Liuf may have died in the fighting; Zhod Vos took her chance.",
  "秋，杨钊携春彩入京，另携郫地蜀货「可直万缗」，分赠诸姊并称「此章仇公所赠也」；得出入禁中，改金吾兵曹参军。杨钊时为章仇兼琼推官，由采访支使鲜于仲通引荐。底色：春彩即成都一夜被扣之布（入京月份不详，系于仲秋）":
    "Autumn: Yang Zhao came to the capital with spring silks, and with goods of Shu from Pi “worth ten thousand strings of cash”, which he gave out among the Yang sisters, his cousins, saying “these are gifts from Lord Zhangchou”; he gained entry to the palace and was made Administrator of the Military Service Section of the Imperial Insignia Guard. Yang Zhao was then a judge under Zhangchou Jianqiong, recommended by Xianyu Zhongtong, assistant to the surveillance commissioner. Background: the spring silks were the cloth impounded on the night in Chengdu.",
  "雁门关之役":
    "The Battle of Yanmen Pass.",
  "雁门关之役中，荔非承烈于薛直身侧力战不敌，重伤倒地眼看统帅战亡，敌以为其已死未挨补刀；后闵方城出关寻回统帅遗体，将他一同拉回，捡得一命。745年后荔非始有「无功」之字，自谓不能护卫统帅、原该殉死却又得活，无功愧悔":
    "In the Battle of Yanmen Pass Lifei Chenglie fought hard at Xue Zhi’s side and was overwhelmed; badly wounded and down, he watched the Commander fall. The enemy took him for dead and did not finish him off. When Min Fangcheng went out beyond the pass to bring back the Commander’s body, he dragged Lifei back too, and his life was saved. It was after 745 that Lifei took the courtesy name Wugong, “no merit”: having failed to protect the Commander, he said, he ought to have died with him and yet had lived; no merit, only shame.",
  "皇甫惟明攻石堡城，败（史）；程凯压阵断后，押尾射杀蕃兵，指尖崩裂，由此成名":
    "Huangfu Weiming attacked Shibao Fortress and was defeated (historical); Cheng Kai held the line and covered the retreat, shooting down Tibetan soldiers from the rear until his fingertips split, and made his name by it.",
  "闵方城成名之战（薛直大丧见次年暮春）":
    "Min Fangcheng’s battle of renown (for Xue Zhi’s great funeral, see late spring of the following year).",
  "雁门关之役后军队重组间，吕定仪擢为团级长官之一（破阵营三团）——薛直时代始有所成就，而后来为中流砥柱，跨越苍云军两个阶段":
    "In the reorganisation after the Battle of Yanmen Pass, Lü Dingyi was raised to be one of the regimental commanders (Third Regiment, Rank-Breaker Corps). He had first made his mark in Xue Zhi’s day and later became a pillar of the army, spanning both of the Cangyun Army’s eras.",
  "军队重组间，荔非承烈与吕定仪、闵方城同列擢为破阵营团级长官（二团），后有「旧三柱」之说；薛褚擢为二团副官——为尊者讳，营中单以字行，隐去薛姓，称季韬将军":
    "In the reorganisation Lifei Chenglie was raised to regimental commander in the Rank-Breaker Corps (Second Regiment) alongside Lü Dingyi and Min Fangcheng; later people spoke of them as “the Old Three Pillars”. Xue Chu was raised to deputy of the Second Regiment; out of reverence for the dead, the camp called him only by his courtesy name and left out the Xue: General Jitao.",
  "关山阵亡后，闵方城关外一战成名，悍勇近乎不要命；景惠时新寡，初次试以静坐陪伴之法近他，他只许她处置伤口（只许她医，不许她说话）":
    "After Guan Shan fell in battle, Min Fangcheng made his name in a fight beyond the pass, fearless almost to the point of wanting to die; Jing Huishi, newly widowed, first tried to come near him by simply sitting with him in silence, and he would let her do nothing but tend his wounds (she might treat him, but not talk).",
  "薛褚南下绛州（薛氏族地），携信与遗物回族、交割薛直身后事，并在族宅正堂廊下听见「名声之论」；遂未久留，翌年1月即回雁门":
    "Xue Chu went south to Jiangzhou, the Xue clan’s seat, carrying letters and relics back to the clan and settling Xue Zhi’s affairs, and under the eaves of the main hall of the clan house he overheard “the talk about reputation”. He did not stay long, and was back at Yanmen in the first month of the next year.",
  // 746
  "岚川云回长安顺路见了高垣一面，而后返洛；程凯与岚川云遍寻城郊坟岗，仍认不出阿玉葬处，遂以西北军功所得赏赐为她立衣冠冢，二人同访，互相讲述旧事（741年程凯曾问程广，程广亦不知）":
    "On her way back to Chang’an Lanchuan Yun saw Gao Yuan once, then returned to Luoyang. Cheng Kai and Lanchuan Yun searched every grave mound outside the city and still could not tell where A-Yu was buried, so with the rewards from his merit in the north-west he raised a cenotaph for her; they visited it together and told each other about the past (in 741 Cheng Kai had asked Cheng Guang, and Cheng Guang did not know either).",
  "天宝五载，道永入少林为沙弥——年少家中变故，雨夜独自摸爬拜山门，到了却不敲门，只站着，一夜风雨；掌事师兄出来问「小小年纪，一个人上来的？」答「不是，同我一道还有风雨，和竹声」。几年劳作后，经首座请度牒为僧":
    "In the fifth year of Tianbao Daoyong entered Shaolin as a novice. After a misfortune in his family as a boy he had crawled and climbed alone up to the monastery gate on a rainy night, and when he got there did not knock but only stood, all night in the wind and rain. The senior brother in charge came out and asked, “So young, and you came up alone?” He answered, “No. The wind and the rain came with me, and the sound of the bamboo.” After some years of labour the head monk obtained an ordination certificate for him and he became a monk.",
  "高垣冤白后年余，身体心力渐复，遣守千秋楼、处理迎来送往；此后回机枢府主理文书、讲授后辈——腿伤永在，而人永远立得笔直":
    "In the year or so after he was cleared, Gao Yuan slowly recovered in body and spirit and was sent to keep the Qianqiu Tower, receiving and seeing off visitors; afterwards he went back to the Jishu Bureau to run its records and teach the younger ones. His leg injury never left him, but he always stood perfectly straight.",
  "五毒线收尾：佩留任大祭司并统领村寨，政教又合一；曼冉与尼亚远走；诺朗带佩留回蝴蝶泉；卓沃再次远走，带商队另开盐路（盐路已断、男子只能代掌，佩留握圣童与染法）":
    "The Wudu thread closes: Pet Liuf became high priestess and ruled the village, rule and rite one again; Mait Rangs and Nyax Vos went far away; Nof Langb took Pet Liuf back to Butterfly Spring; Zhod Vos left again, taking a caravan to open a new salt road (the salt road was cut and a man could only rule in her stead, while Pet Liuf held the Holy Child and the dyeing methods).",
  "陆晚月在成都遇见唐哲":
    "Lu Wanyue met Tang Zhe in Chengdu.",
  "程钧弱冠，离家出游":
    "Cheng Jun came of age and left home to travel.",
  "暮春，残军回城、整理一切；薛直大丧，较战亡迟了几个月：三军衣缟，从冰室请出匆匆掩藏的遗骨装裹停放；送殡路上跑上来一只白狮子——丧毕，统帅方携闵方城、吕定仪、薛褚等往霸刀山庄":
    "Late spring: the battered army came back to the fortress and set everything in order. Xue Zhi’s great funeral came some months after his death in battle: all three armies wore mourning white, and his remains, hastily hidden in the ice cellar, were brought out, dressed and laid out; on the road of the funeral procession a white lion came running up (two little girls from a players’ troupe dressed as a white lion). When the funeral was over the Commander took Min Fangcheng, Lü Dingyi, Xue Chu and others to Badao Manor.",
  "程宇生于庭州":
    "Cheng Yu was born at Tingzhou.",
  "苍云访霸刀，宴席狼牙刺客使毒针，吕定仪替闵方城挡下，残毒损伤心脉；后闵方城与统帅先返雁门固防，吕定仪、薛褚留霸刀":
    "The Cangyun Army visited Badao Manor; at the banquet a Langya assassin used a poisoned needle, and Lü Dingyi took it in Min Fangcheng’s place; the residual poison damaged his heart. Min Fangcheng and the Commander went back first to strengthen Yanmen’s defences; Lü Dingyi and Xue Chu stayed at Badao Manor.",
  "霸刀山庄切磋：苍云选残军强将展示武功阵法，闵方城露功夫，薛褚亦出手而风头为其所盖；擂台向外，以名换粮（吕定仪：统帅带你来，为让人瞧着苍云不是没了人，这事在你身上，不在我）":
    "Sparring at Badao Manor: the Cangyun Army chose strong officers from its battered ranks to show its martial arts and formations; Min Fangcheng showed his skill, and Xue Chu fought too but was outshone. The challenge bouts were for outside eyes, reputation traded for grain (Lü Dingyi: the Commander brought you to show people the Cangyun Army isn’t out of men; this rests on you, not on me).",
  "陆晚月去西南":
    "Lu Wanyue went to the south-west.",
  "吕定仪、薛褚等从霸刀押车（霸刀援助苍云粮资）回雁门，于灵丘岔道口击败劫车胡人":
    "Lü Dingyi, Xue Chu and others escorted the carts from Badao Manor (Badao’s aid to the Cangyun Army in grain and supplies) back to Yanmen, defeating Hu raiders who tried to seize them at the Lingqiu fork.",
  "章仇兼琼入朝为户部尚书，「诸杨引之也」":
    "Zhangchou Jianqiong went to court as Minister of Revenue: “it was the Yangs who brought him in”.",
  "夏末，雁门关之役后残营乏治文事者，吕定仪毒伤劳顿常常躺倒；荔非承烈换防前营亲巡雁塔，见靳沉白所理关外地形与敌袭路线复盘，带回其名——“看着倒像又一个状元”；靳沉白传入关城，入吕定仪帐下为借调书手。“文书过手，便有过手之责。”":
    "Late summer. After the Battle of Yanmen Pass the battered garrison was short of anyone to handle its paperwork, and Lü Dingyi, worn down by his poison wound, was often laid up. Lifei Chenglie, rotating to the forward camp, inspected Yanta Tower in person, saw Jin Chenbai’s reconstruction of the terrain beyond the pass and the routes of the enemy raids, and brought back his name: “He looks like another zhuangyuan to me.” Jin Chenbai was summoned into the pass fortress and joined Lü Dingyi’s staff as a seconded scribe. “A document that passes through your hands is your responsibility.”",
  // 747
  "夏，靳沉白随军中人事整编，同伤退兵士、裁撤杂役、补入新卒一一谈话、核发赏赐银饷，无声无息，没有一处闹到帐前；补入名册，正式纳入破阵营。楼谊雁塔箱笼相送——“到底塔上已经不缺写字的人。缺的那些，也不是你留下便能补得了的。”":
    "Summer. In a reorganisation of the army’s personnel, Jin Chenbai talked one by one with soldiers retiring wounded, with dismissed odd-job men and with new recruits, and checked and paid out their rewards and pay, without a sound: not one case was carried to headquarters. Entered on the rolls, he formally joined the Rank-Breaker Corps. Lou Yi sent his trunks over from Yanta Tower: “The tower is not short of people who can write any more. And what it is short of isn’t something you could make up by staying.”",
  "深秋，苍云北上出援，行军至云中永宁寺遇敌袭；寺内民丁召集授甲，荔非承烈亲取敌酋。邱鸿（时年十五六，寺中俗家弟子）先不受刀、只以盾缘引卸来势护住大殿，后为护后院药棚于西廊出刀杀敌——生平第一刀；薛褚率士接防西门——「我早知多留一把刀有用」。战后老僧授沉香珠串：「非常之世，有非常之法。持戒并非不杀，是从此而止。」自出刀杀贼后，邱鸿再未抬头看佛面":
    "Late autumn. Marching north to bring relief, the Cangyun Army was attacked at Yongning Monastery in Yunzhong. The monastery’s lay men were mustered and issued armour, and Lifei Chenglie took the enemy chief himself. Qiu Hong (fifteen or sixteen, a lay disciple of the monastery) at first would not take a blade and only turned the enemy’s blows aside with the rim of a shield to protect the main hall; later, to protect the medicine shed in the rear court, he drew a blade in the west cloister and killed: the first of his life. Xue Chu led men to take over the west gate: “I always knew a spare blade would come in handy.” After the fighting an old monk gave him a string of agarwood beads: “Extraordinary times have their extraordinary ways. Keeping the precepts is not never killing; it is stopping, from here on.” After he drew his blade on the bandits, Qiu Hong never again raised his eyes to the Buddha’s face.",
  "敌袭数日后，荔非欲带邱鸿入军，与薛褚帐中之争——「燕帅是叫你我物色，没叫咱们拉壮丁」「就是说我拉壮丁我也干……那是个铁骨衣的苗子，带回去，你收他当弟子」；邱鸿布衣至帐前请从，「面目莹净，像玉柱覆粗麻」，随军入苍云，拜薛褚门下修铁骨衣":
    "Some days after the attack Lifei wanted to take Qiu Hong into the army, and argued it out with Xue Chu in the tent: “The Commander told you and me to look out for likely men, not to press-gang them.” “Call it press-ganging if you like, I’ll still do it … the boy is made for the Iron-Bone Mantle. Bring him back and take him as your disciple.” Qiu Hong came to the tent in plain cloth to ask to follow, “his face clean and clear, like a jade pillar wrapped in coarse hemp”, went with the army into the Cangyun Army, and became Xue Chu’s disciple in the Iron-Bone Mantle.",
  "岚川靖彦多年忧思苦劳，病重；程凯同岚川云回长安探望——靖彦见那青年将军，心中了然，眼带欣慰，临终问女儿「当年你说逝者不安，如今可以想想，他们安了没有，你又安了没有」，又言「东归渡海之事，要在于你了」；身故后程凯协助处置丧仪，陪伴宽解（同年，程凯生父程广殁于小勃律之役——安西与长安，同一年）":
    "Years of worry and toil left Lanchuan Jingyan gravely ill; Cheng Kai went back to Chang’an with Lanchuan Yun to see him. Seeing the young general, Jingyan understood, and there was gladness in his eyes; dying, he asked his daughter, “You said back then that the dead were not at peace. Now you can think about it: are they at peace? And are you?” and said, “Crossing the sea back east is up to you now.” After his death Cheng Kai helped with the funeral and stayed by her to comfort her. (That same year Cheng Kai’s own father Cheng Guang died in the Little Balur campaign: Anxi and Chang’an, the same year.)",
  "程广殁于小勃律之役（随高仙芝；史：是年高仙芝讨小勃律）":
    "Cheng Guang died in the Little Balur campaign (under Gao Xianzhi; historically, Gao Xianzhi campaigned against Little Balur that year).",
  "伽罕巴尔节，玛奈丽随村人往圣山途中被吐蕃游骑掳走":
    "At the Gahambar festival, on the way to the Holy Mountain with the villagers, Māneli was carried off by Tibetan raiders.",
  "雁门关之役后首次恢复考课：闵方城于擂台坐实团主官之位（是年正授团主官，称将军；745.11 重组时已署理一团）；营中无人能敌，擂台实为确认之仪式，苍云着意以之为榜样；「原来这就是先统帅看中过的人」之闲话自此每年一回（与757年恢复考课成对：一立柱，一倒柱；薛褚或为其对手之一，输作寻常比试，赛后无人提起）（月份推定）":
    "The first merit review since the Battle of Yanmen Pass: in challenge bouts Min Fangcheng made his place as regimental commander certain (that year he was formally appointed regimental commander and called General; since the reorganisation of 745.11 he had been acting head of the First Regiment). No one in the camp could match him, so the bouts were really a ceremony of confirmation, and the Cangyun Army deliberately held him up as an example; from then on, every year, there was talk of “so this is the man the late Commander had his eye on”. (It pairs with the restored review of 757: one raises a pillar, the other brings one down. Xue Chu may have been one of his opponents, losing as in an ordinary bout; no one mentioned it afterwards.)",
  "天宝六载十月，玄宗幸骊山温泉宫，改名华清宫；宫在会昌县——天宝二年析新丰、万年置，七载省新丰入之、更名昭应。许秋生乡里新丰即此县（王维《少年行》首句「新丰美酒斗十千」）（注：是月沈含英随师赴天策府，皇帝正在许秋生家乡）":
    "In the tenth month of the sixth year of Tianbao, Xuanzong went to the hot-spring palace on Mount Li and renamed it the Huaqing Palace. The palace lay in Huichang County, formed in the second year of Tianbao from parts of Xinfeng and Wannian; in the seventh year Xinfeng was merged into it and the county renamed Zhaoying. Xu Qiusheng’s home of Xinfeng was this county (the first line of Wang Wei’s “Song of Youth”: “The fine wine of Xinfeng, ten thousand cash a measure”). (In this month Shen Hanying went with his master to the Tiance Command, while the emperor was in Xu Qiusheng’s home county.)",
  "沈含英随师至天策府为侍医（竞猎前夕；注：是月玄宗幸华清宫，校猎观军容之使当自骊山东来）；初到即遇天弓营吐泻、被疑下药，程凯挡箭护之，岚川云暗访搜证为其洗冤":
    "Shen Hanying went with his master to the Tiance Command as attending physician (on the eve of the hunt; note: that month Xuanzong was at the Huaqing Palace, so the envoy sent to watch the hunt and review the troops would have come east from Mount Li). On arrival he ran straight into an outbreak of vomiting and diarrhoea in the Heavenly Bow Corps and was suspected of poisoning; Cheng Kai took an arrow to shield him, and Lanchuan Yun quietly gathered evidence and cleared his name.",
  // 748
  "冬夜，吕定仪膝痛难忍，靳沉白以家传药油为其按治——“将军授业，我理当趋奉。”“我授不了你的业。”“将军不逐我，我见一分，便是一分。”":
    "A winter night. Lü Dingyi’s knee pain was past bearing, and Jin Chenbai treated it with his family’s medicinal oil: “The General is teaching me; it is only right that I wait on him.” “I can’t teach you what you need.” “So long as the General doesn’t send me away, whatever I see is that much gained.”",
  "薛褚带邱鸿在帐下一二年，武功已成而永宁寺中所见天赋不复现——武学天生带一层「知止」，越发将自己锁住；对练分明可以翻势，只把人推出去不补那一下，老兵骂「这么打，上阵害死自己」；薛褚问「怎不出刀」，答「他退了，我想便已够了，再下去怕是重手」，薛褚无法逼迫":
    "Xue Chu kept Qiu Hong on his staff for a year or two; his skill was formed, but the gift seen at Yongning Monastery did not appear again. His fighting had an inborn sense of “knowing when to stop” that locked him in more and more: in sparring, when he plainly could turn the bout, he only pushed his man away and never struck the follow-up, and the veterans cursed: “Fight like that in battle and you’ll get yourself killed.” Xue Chu asked, “Why didn’t you strike?” He answered, “He fell back. I thought that was enough. Any more and it would have been too heavy a hand.” Xue Chu could not force him.",
  "约此年，灵隐寺一度被神策围、天竺僧袭扰，叶添灯送信函纸有毒，中毒昏厥，藏剑山庄遣弟子相助，僧护他至山庄解毒疗伤；避居期间见弟子练剑，看得路都走不动，僧携之投帖诉其向往之心——藏剑先纳他入庄内书院，做洒扫整理，庄内寺院两头跑；僧为其改名「叶添灯」，取字「照」":
    "Around this year Lingyin Monastery was for a time surrounded by the Shence Army and harried by monks from India; Ye Tiandeng, carrying a letter on poisoned paper, was poisoned and fainted. Cangjian Manor sent disciples to help, and a monk took him to the manor to have the poison drawn and his injuries treated. While sheltering there he watched the disciples at sword practice so raptly he could hardly walk on, and the monk took him to present a letter setting out his longing; Cangjian first took him into the manor’s academy to sweep and keep things in order, running back and forth between manor and monastery. The monk renamed him Ye Tiandeng, “adding a lamp”, with the courtesy name Zhao, “to shine”.",
  "高垣受命整理名籍抚恤，档案中惊见恩人黍梁即宣康——宣杨生父；再赴江南至巢县芜皋村，知其妻儿早死于课税酷吏；淮扬据点查旧抚恤，任上之人早作宰相钉子被拔、记档无存；临河酒肆有人掷来沾污的老妪木簪相胁——「该知道的人，我自会让她知道。那时你若乱动，也别怪我」":
    "Ordered to put the rolls and death benefits in order, Gao Yuan found to his shock in the files that his rescuer Shuliang was Xuan Kang, Xuan Yang’s father. He went south again to Wugao Village in Chao County and learned that the wife and son had long since died under the taxes and the harsh officials. At the Huaiyang station he looked into the old death benefits: the man who had held the post had long ago been pulled out as the chancellor’s plant, and no record was left. In a riverside tavern someone tossed him an old woman’s soiled wooden hairpin as a threat: “The one who ought to know, I’ll see that she knows. If you make a wrong move before then, don’t blame me.”",
  "冷天锋致信荐医，沈含英赴凌雪阁为高垣诊治髋伤腿疾——燃香推拿，累年瘀结逼出无源之泪，「水流冲过积石，石上又生苔藓。藓老且厚，流水不过，春草不生」；宣杨窗纸戳洞窥见。后沈含英返府断言：负伤致残兼神思郁结，纵然用药只恐难久，「兴许…就这几年了」":
    "On a letter of recommendation from Leng Tianfeng, Shen Hanying went to the Lingxue Pavilion to treat Gao Yuan’s hip injury and leg ailment. With burning incense and massage he forced out years of knotted stasis and with it tears that came from nowhere: “Water runs over piled stones, and moss grows on the stones. When the moss is old and thick, the water cannot pass, and no spring grass grows.” Xuan Yang poked a hole in the window paper and watched. Back at the Command Shen Hanying gave his verdict: injuries that had left him crippled, with a mind weighed down and knotted; even with medicine he was unlikely to last long: “Maybe… only these few years.”",
  "夫人病亡于北庭（程钊生母侍疾），归葬洛阳":
    "The principal wife died of illness at Beiting (Cheng Zhao’s mother nursed her), and was taken back to Luoyang for burial.",
  "皮逻阁卒，子阁罗凤嗣，以其子凤伽异为阳瓜州刺史":
    "Piluoge died and his son Geluofeng succeeded him, making his own son Fengjiayi Prefect of Yangguazhou.",
  "首个天长节（是年千秋节改名，八月初五），齐晟与玛奈丽同台献演":
    "The first Tianchang Festival (the Qianqiu Festival was renamed that year; the fifth day of the eighth month): Qi Sheng and Māneli performed on the same stage.",
  // 749
  "草场少年木苏（mosur，族语约「威风」之意）随游奕队伍追逃骑，控马认路快过老兵，被带回帐前；报名而族音含混，左右暗笑「倒像将军那条猎犬的名儿」；狼牙将领捏其下巴细看，如相一匹新得的马——「你该有汉姓」，随行青毡汉人（军师）接口取「朔」字——「便像……像这风」。有了大名连朔，收为义子（「假子」，与所谓八千曳落河差不多一回事）；将领言并安置其父母亲眷，起初确也迁居，然奚众惯于游牧，徒有居所无以生活，仍时时出入边境":
    "A boy of the grasslands, Musu (mosur, roughly “imposing” in his people’s tongue), rode with a patrol in pursuit of fleeing horsemen, handling his horse and finding the way faster than the veterans, and was brought back before the tent. When he gave his name the sounds of his tongue came out blurred, and those around snickered that it sounded “like the name of the general’s hound”. The Langya general took him by the chin and looked him over, as if appraising a newly acquired horse: “You should have a Han surname.” A Han man in a green felt cloak at his side (the strategist) took up the word and chose the character shuo, the north wind: “Like… like this wind.” Given the formal name Lian Shuo, he was taken in as an adopted son (a “false son”, much the same thing as the so-called eight thousand yeluohe, the “stalwarts”, surrendered Tongluo, Xi and Khitan warriors whom An Lushan kept as adopted sons). The general said he would settle the boy’s parents and kin too; at first they did move, but the Xi were used to herding on the move and a dwelling alone gave them no living, so they still crossed back and forth over the border.",
  "沈含英侍医期满，离天策府返谷；程凯套车送行——「这东西两京之隔能有多远，往后要见，不难」":
    "Shen Hanying’s term as attending physician ended, and he left the Tiance Command for the Valley; Cheng Kai harnessed a cart to see him off: “How far apart can the two capitals be? If we want to meet again, it won’t be hard.”",
  "程钧带酒赴天策探程凯，劝他不要过于执着家族认同":
    "Cheng Jun brought wine to the Tiance Command to visit Cheng Kai, and urged him not to hold on so hard to the family’s acknowledgement.",
  "上元夜，老人一席话，齐晟不复去寻玛奈丽，随戏班回乡":
    "On the night of the Lantern Festival, after a few words from an old man, Qi Sheng stopped looking for Māneli and went home with the troupe.",
  "天策府公开招兵，纳人不拘出身，齐晟入府（是年五月停折冲府鱼书，六月哥舒翰拔石堡城，史）":
    "The Tiance Command recruited openly, taking men whatever their background, and Qi Sheng joined (historically, that year the fish tallies of the garrison militia were suspended in the fifth month, and Geshu Han took Shibao Fortress in the sixth).",
  "许秋生之母重症风寒，未能撑过这一冬（沈含英自天策府侍医期满返谷后那一冬）；新年夜沈含英留下相陪——「我们说的一心赴救，其实…常常并不落在那个『救』字上」":
    "Xu Qiusheng’s mother, gravely ill with a chill, did not live through the winter (the winter after Shen Hanying’s term as physician at the Tiance Command ended and he went back to the Valley); on New Year’s Eve Shen Hanying stayed to keep him company: “What we call giving ourselves wholly to saving others… often doesn’t land on the word ‘saving’ at all.”",
};
