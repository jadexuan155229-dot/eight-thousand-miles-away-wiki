// English overlay for the posts chart (posts-data.js): post labels, full titles, groups,
// hints, the free-text ranks on individual tenures, timeline marks, and honours (勋、散、品).
// Policy (人山人海英译术语表):
//   P13  profile / tenure form "Commander of the X" for named units, "X Commander in …" for
//        unnamed ones; chart form is the short "Regimental Commander", "Battalion Commander".
//   P6   营 > 团 > 旅 > 队 = Corps > Regiment > Battalion > Company, for the Cangyun Army only;
//        营 is "Corps" as a name everywhere (Women's Guard Corps, Heavenly Bow Corps).
//   P2   Hucker for real Tang offices; invented posts avoid words Hucker has taken.
//   P3   ranks in Hucker notation in card fields: 从五品下 → rank 5b2.
// Checked against Hucker by the author (2026-11-22): 兵马使 Commander and 都知兵马使 Supreme Commander
// (4684), 行军司马 Adjutant (1790, s.v. chün ssu-ma), 都虞候 Inspector-in-chief, 节度副使 Military Vice
// Commissioner and 都督 Area Commander (777), 护军 Military Protector (2775, sense 4: the merit title). Not in Hucker, so
// our own renderings on his pattern (自拟): 押衙 (7873 has only the Song sense, Lackey), 子将, and the
// individual merit and prestige titles below. Hucker entry numbers are noted where they apply.
// 2026-11-22 T0 working draft (docs/t0-review.md).

/* 職位：label＝編制圖上的短名（對 POSTS[].label），full＝任期、檔案所用全稱（對 POST_FULL），
   hint＝懸停說明（對 POSTS[].hint） */
export const postsEn = {
  // 苍云
  'cy-lead': { label: 'Army Commander', full: 'Commander of the Cangyun Army' },
  'pz-lead': { label: 'Corps Commander', full: 'Commander of the Rank-Breaker Corps' },
  'pz-real': {
    label: 'In effective charge', full: 'In effective charge of the Rank-Breaker Corps',
    hint: 'The working half of the Corps under its Commander, Wang Bukong: first in Min Fangcheng’s hands without a title, held by others in his absence; in 763 Guan Yue became Deputy, and the role had a name for the first time',
  },
  'pz-vice': { label: 'Deputy Corps Commander', full: 'Deputy Commander of the Rank-Breaker Corps' },
  't1-lead': { label: 'Regimental Commander', full: 'Commander of the First Regiment' },
  't1-vice': { label: 'Deputy', full: 'Deputy Commander of the First Regiment' },
  't1-lv': { label: 'Battalion Commander', full: 'Battalion Commander in the First Regiment' },
  't2-lead': { label: 'Regimental Commander', full: 'Commander of the Second Regiment' },
  't2-vice': { label: 'Deputy', full: 'Deputy Commander of the Second Regiment' },
  't3-lead': { label: 'Regimental Commander', full: 'Commander of the Third Regiment' },
  't3-vice': { label: 'Deputy', full: 'Deputy Commander of the Third Regiment' },
  'yz-jiao': { label: 'Instructor', full: 'Instructor' },
  'yz-chi': { label: 'Chief of Scouts', full: 'Chief of Scouts' },
  'yz-ji': { label: 'Provost', full: 'Provost' },
  dui: { label: 'Company Commander', full: 'Company Commander' },
  'xy-lead': { label: 'Commander', full: 'Commander of an expedition' },
  'xy-vice': { label: 'Deputy', full: 'Deputy commander of an expedition' },
  wk: { label: 'Armoury', full: 'The Armoury' },
  nw: { label: 'Women’s Guard Corps', full: 'The Women’s Guard Corps' },
  yt: { label: 'Yanta Tower', full: 'Yanta Tower' },

  // 天策（天策编制另议：营作 Corps 名而不套苍云层级；校尉、副尉依折冲府）
  'tc-jl': { label: 'Drill Commissioner', full: 'Drill Commissioner of the Tiance Command', hint: 'One of the Command’s senior officers, in charge of training. Formerly Yang Ning’s post' },
  'tc-bm': { label: 'Commander', full: 'Commander in the Tiance Command', hint: 'One of the Command’s senior officers, in charge of the troops. Formerly Xu Changhai’s post' },
  'tc-bc': { label: 'Military Service Section', full: 'Administrator of the Military Service Section', hint: 'One of the six sections of the old Tiance Command, keeping the muster rolls and assigning duty' },
  'tc-cj': { label: 'Administrator', full: 'Administrator', hint: 'An office of the old Tiance Command, for missions and miscellaneous inspection' },
  'tg-xw': { label: 'Commandant', full: 'Commandant of the Heavenly Bow Corps', hint: 'Units follow the garrison-militia pattern: a Commandant leads three hundred' },
  'tg-fw': { label: 'Vice Commandant', full: 'Vice Commandant of the Heavenly Bow Corps', hint: 'Called “deputy general” in the camp' },
  'tg-lv': { label: 'Battalion Commander', full: 'Battalion Commander in the Heavenly Bow Corps', hint: 'Leads a hundred' },
  'tg-dz': { label: 'Company Commander', full: 'Company Commander in the Heavenly Bow Corps', hint: 'Leads fifty' },
  'tq-lv': { label: 'Battalion Commander', full: 'Battalion Commander in the Heavenly Spear Corps', hint: 'The Command has no separate women’s corps; women serve in every corps' },
  'ch-xw': { label: 'Commandant', full: 'Commandant of the Scout Corps', hint: 'After the return to the Command, in charge of selecting and training scouts and of intelligence; the title is the author’s draft' },
  'ch-shou': { label: 'Chief of Scouts', full: 'Chief of Scouts of the Command', hint: 'A commission within the Command, without rank' },
  'ch-lv': { label: 'Battalion Commander', full: 'Battalion Commander (scouts)' },
  'ch-bing': { label: 'Heavenly Slayer Corps', full: 'Scout, Heavenly Slayer Corps', hint: 'Under Leng Tianfeng; trained at the Shubao Pavilion' },
  'ch-sh': { label: 'Scout', full: 'Scout' },
  'sw-xw': { label: 'Hall guards', full: 'Commandant of the Hall Guards' },
  'wz-tg': { label: 'Tong Pass garrison', full: 'Tong Pass Camp · Tong Pass garrison militia', hint: 'One of the outlying camps along the line between the two capitals' },
  'wz-xs': { label: 'Mount Xiao works', full: 'Mount Xiao fortifications' },
  'ly-lh': { label: 'Rear Commander', full: 'Rear Commander of the Tiance Command', hint: 'Who led the camp left behind after the Command fell in the 2nd month of 756 and its commanders withdrew west' },
  'ly-fj': { label: 'Deputy', full: 'Deputy of the camp left behind' },
  'ly-zw': { label: 'Counted as killed', full: 'Counted as killed in action (struck from the rolls)', hint: 'Dead on the rolls: cannot be restored to office or lead troops' },
  'tc-tg': { label: 'Tong Pass remnants', full: 'Remnants of the Tong Pass army' },
  'tc-ty': { label: 'Taiyuan light horse', full: 'Taiyuan light horse' },
  'tc-tw': { label: 'Breakout', full: 'Breakout from the Command' },
  'tc-cy': { label: 'With the Cangyun Army', full: 'Away from the Command, with the Cangyun Army', hint: 'Posts held there are on the Cangyun chart' },
  'tc-lf': { label: 'Away from the Command', full: 'Away from the Command' },
  'tc-lz': { label: 'Lent to Lingzhou', full: 'Lent to Lingzhou to train troops' },
  'sx-sx': { label: 'Trial training', full: 'Trial training at the Command' },
  'yg-sy': { label: 'Attending Physician', full: 'Attending Physician of the Tiance Command', hint: 'Serving at the Command from another sect: Wanhua Valley' },
  'yg-jy': { label: 'Army physician', full: 'Army physician', hint: 'Serving at the Command from another sect: Wanhua Valley' },
  'yg-bs': { label: 'Erudite of Medicine', full: 'Erudite of Medicine of the Tiance Command', hint: 'Serving at the Command from another sect: Wanhua Valley' },
  'wq-jx': { label: 'Visiting instructor', full: 'Visiting instructor, Heavenly Slayer Corps', hint: 'Serving at the Command from another sect: the Lingxue Pavilion' },

  // 唐军
  'bt-fs': { label: 'Military Vice Commissioner', full: 'Military Vice Commissioner of Yixi and Beiting', hint: 'In 741 Beiting and the Four Garrisons of Anxi were separated again' },
  'bt-dz': { label: 'Supreme Commander', full: 'Supreme Commander, Beiting', hint: 'The general commanding all the circuit’s armies under the Military Commissioner' }, // Hucker 4684
  'bt-bm': { label: 'Commander', full: 'Commander, Beiting' }, // Hucker 4684
  'bt-zj': { label: 'Sub-commander', full: 'Sub-commander, Beiting' },
  'bt-jz': { label: 'Military Service Section', full: 'Administrator of the Military Service Section, Beiting Protectorate', hint: 'The Protectorate followed prefectural practice; this section kept arms and armour' },
  'bt-sz': { label: 'Juliu Garrison Post', full: 'Juliu Garrison Post, Beiting', hint: 'A garrison post on the Suyab road, west of Tingzhou and east of Luntai county; it appears in Kaiyuan-era Beiting documents' },
  'bt-cz': { label: 'On campaign', full: 'On campaign with the commander', hint: 'The histories name only the commander' },
  'bt-hs': { label: 'Envoy’s escort', full: 'Escorting the imperial envoy to Beiting' },
  'bt-xz': { label: 'Xizhou', full: 'Falling back to hold Xizhou', hint: 'After Beiting fell in 790' },
  'ax-xb': { label: 'Little Balur campaign', full: 'Little Balur field army (under Gao Xianzhi)', hint: 'Gao Xianzhi’s campaign against Little Balur in 747' },
  'jn-sb': { label: 'In the ranks', full: 'In the Jiannan army' },
  'jn-pr': { label: 'Pingrong', full: 'Sub-commander at Pingrong', hint: 'Anrong, retaken in 740, was renamed Pingrong' },
  'jn-yy': { label: 'Headquarters Guard', full: 'Headquarters Guard Commander, Jiannan', hint: 'An officer commanding troops at the Military Commissioner’s headquarters' }, // 自拟：Hucker 7873 只收宋代义（Lackey，杂役），与唐使府押衙不合
  'jn-dj': { label: 'Mustering troops', full: 'Left to hold Chengdu, mustering troops' },
  'jn-yh': { label: 'Inspector-in-chief', full: 'Inspector-in-chief, Jiannan', hint: 'In charge of military discipline and law' }, // Hucker
  'jn-pl': { label: 'Suppressing a revolt', full: 'With the army suppressing a revolt' },
  'jn-tg': { label: 'Against Cui Gan', full: 'The campaign against Cui Gan' },
  'jn-xz': { label: 'Unassigned', full: 'Unassigned' },
  'jn-sc': { label: 'Holding Chengdu', full: 'Holding Chengdu' },
  'hd-qw': { label: 'To the emperor’s aid', full: 'East to the emperor’s aid' },
  'hd-xs': { label: 'Adjutant', full: 'Adjutant', hint: 'A senior staff post in a commissioner’s headquarters, in charge of military affairs' }, // Hucker 1790 (hsing-chün ssu-ma)
  'hd-sd': { label: 'Shangdang', full: 'Garrison commander at Shangdang' },
  'hd-lb': { label: 'Drilling troops', full: 'Drilling troops at headquarters' },
  'hd-qf': { label: 'Vanguard', full: 'Vanguard' },
  'hd-xy': { label: 'Eastern Capital field army', full: 'Eastern Capital field army' },
  'sf-jz': { label: 'Shuofang Army', full: 'Shuofang Army', hint: 'Under Guo Ziyi; after Guo’s dismissal, for a time under Pugu Huai’en' },
  'sf-yc': { label: 'Attack on Yuci', full: 'Attack on Yuci (Pugu Yang’s troops)', hint: 'Pugu Huai’en’s revolt of 764' },
  'jx-fq': { label: 'Autumn defence', full: 'Autumn defence west of the capital' },
  'jx-fs': { label: 'Envoy', full: 'Envoy to the west' },
  'sn-bm': { label: 'Liangzhou', full: 'Commander, Shannan West Circuit', hint: 'Liangzhou was the seat of Shannan West Circuit; the Military Commissioner was someone else' },
};

/* 編制圖分組（POSTS[].group） */
export const groupsEn = {
  统帅: 'Army Commander', 破阵营: 'Rank-Breaker Corps', 一团: 'First Regiment', 二团: 'Second Regiment', 三团: 'Third Regiment',
  营直: 'Corps headquarters', 出征差遣: 'Expeditions', 堡内与关外: 'The Keep and beyond the pass',
  府中诸将: 'Senior officers', 府僚: 'Staff', 天弓营: 'Heavenly Bow Corps', 天枪营: 'Heavenly Spear Corps', 斥候: 'Scouts',
  宿卫: 'Guards', 外驻: 'Outposts', 留营: 'The camp left behind', 行营与外借: 'In the field and on loan', 试训: 'Trial training',
  府中医官与外请: 'Physicians and visiting instructors',
  北庭: 'Beiting', 安西行营: 'Anxi field army', 剑南: 'Jiannan', 河东与东都: 'Hedong and the Eastern Capital',
  朔方军: 'Shuofang Army', 京西与北道: 'West of the capital, the north road', 山南西道: 'Shannan West Circuit',
};

/* 任期上自寫的職名（TENURES[].rank），以中文原文為鍵；中文一改即回落中文 */
export const ranksEn = {
  掌破阵营事: 'In charge of the Rank-Breaker Corps',
  代领破阵营: 'Deputizing in command of the Rank-Breaker Corps',
  暂领三团: 'Interim command of the Third Regiment',
  '队正（灵武留驻）': 'Company Commander (left at Lingwu)',
  '主将（凤州，戴罪）': 'Commander (Fengzhou, under censure)',
  '副将（凤州）': 'Deputy commander (Fengzhou)',
  '主将（洛阳行营）': 'Commander (Luoyang field army)',
  '统管行营（洛阳）': 'In overall charge of the field army (Luoyang)',
  '主将（援甘州）': 'Commander (relief of Ganzhou)',
  '副将（援甘州）': 'Deputy commander (relief of Ganzhou)',
  锻刀: 'Bladesmith',
  皮甲工匠: 'Leather armourer',
  '军医，协理女卫营': 'Army physician, assisting with the Women’s Guard Corps',
  医女: 'Physician’s apprentice',
  雁塔守备长官: 'Warden of Yanta Tower',
  '天弓营副尉（子阳将军）': 'Vice Commandant of the Heavenly Bow Corps (“General Ziyang”)',
  以阵亡论: 'Counted as killed in action',
  '天杀营斥候（冷天锋帐下）': 'Scout, Heavenly Slayer Corps (under Leng Tianfeng)',
  '斥候首（无品级）': 'Chief of Scouts (without rank)',
  '旅帅（辖斥候）': 'Battalion Commander (scouts)',
  '潼关残军（与齐晟）': 'Remnants of the Tong Pass army (with Qi Sheng)',
  '离府，在苍云': 'Away from the Command, with the Cangyun Army',
  斥候营校尉: 'Commandant of the Scout Corps',
  '参军事（军师帐下）': 'Administrator (on the strategist’s staff)',
  '兵曹参军事（李参军）': 'Administrator of the Military Service Section (“Administrator Li”)',
  天策府留后: 'Rear Commander of the Tiance Command',
  '兵马使（权）': 'Commander (acting)',
  崤山工事: 'Mount Xiao fortifications',
  '暂领潼关府兵（曹雪阳遥领）': 'Interim command of the Tong Pass garrison militia (Cao Xueyang commanding from afar)',
  '太原轻骑（与齐晟）': 'Taiyuan light horse (with Qi Sheng)',
  兼领潼关事: 'Concurrently in charge at Tong Pass',
  '潼关大营旅帅（掌守备训练）': 'Battalion Commander, Tong Pass Camp (defence and training)',
  '崤山工事（接程凯）': 'Mount Xiao fortifications (taking over from Cheng Kai)',
  潼关残军主将: 'Commander of the Tong Pass remnants',
  '太原轻骑（自组）': 'Taiyuan light horse (raised himself)',
  '斥候（隶岚川云）': 'Scout (under Arashikawa Kumo)',
  '斥候首（留营）': 'Chief of Scouts (the camp left behind)',
  '斥候首（停职扣押）': 'Chief of Scouts (suspended and detained)',
  斥候首: 'Chief of Scouts',
  '参军（传令、录事簿记，在李庭深左右）': 'Administrator (orders, records and accounts, at Li Tingshen’s side)',
  各殿卫戍校尉: 'Commandant of the Hall Guards',
  留营副将: 'Deputy of the camp left behind',
  天枪营旅帅: 'Battalion Commander in the Heavenly Spear Corps',
  '府城突围（随秦颐岩）': 'Breakout from the Command (with Qin Yiyan)',
  天弓营队正: 'Company Commander in the Heavenly Bow Corps',
  '离府，随父镇梁州': 'Away from the Command, with his father at Liangzhou',
  试训: 'Trial training',
  '天杀营客座教习（凌雪阁）': 'Visiting instructor, Heavenly Slayer Corps (Lingxue Pavilion)',
  '天策府侍医（万花）': 'Attending Physician of the Tiance Command (Wanhua Valley)',
  '留营军医（万花）': 'Army physician, the camp left behind (Wanhua Valley)',
  '军医（万花）': 'Army physician (Wanhua Valley)',
  '天策府医博士（万花）': 'Erudite of Medicine of the Tiance Command (Wanhua Valley)',
  随盖嘉运击突骑施: 'With Gai Jiayun against the Türgesh',
  随盖嘉运破碎叶: 'With Gai Jiayun at the taking of Suyab',
  '摄北庭都护府兵曹参军（经管庭州甲仗）': 'Acting Administrator of the Military Service Section, Beiting Protectorate (keeping the arms of Tingzhou)',
  俱六守捉副使: 'Deputy Commissioner of the Juliu Garrison Post',
  入剑南军中: 'Joined the Jiannan army',
  平戎城子将: 'Sub-commander at Pingrong',
  剑南节度押衙: 'Headquarters Guard Commander, Jiannan Military Commission',
  '留守成都，点兵': 'Left to hold Chengdu, mustering troops',
  剑南都虞候: 'Inspector-in-chief, Jiannan',
  随军平郭千仞: 'With the army against Guo Qianren',
  '讨崔旰（随柏茂琳诸将）': 'Against Cui Gan (with Bai Maolin and the other generals)',
  '闲置（带左武卫将军员外置衔）': 'Unassigned (supernumerary General of the Left Militant Guard, in title)',
  '替崔宁守成都（随崔宽）': 'Holding Chengdu for Cui Ning (with Cui Kuan)',
  随北庭边兵东归勤王: 'East with the Beiting frontier troops to the emperor’s aid',
  '行军司马（李光弼幕下）': 'Adjutant (on Li Guangbi’s staff)',
  '派驻上党，为守将': 'Posted to Shangdang as garrison commander',
  '自贬，在李光弼帐前练兵': 'Self-demoted, drilling troops at Li Guangbi’s headquarters',
  随仆固怀恩出前锋: 'In the vanguard under Pugu Huai’en',
  '东都行营（职名不定）': 'Eastern Capital field army (title unsettled)',
  '行军司马（王缙幕下）': 'Adjutant (on Wang Jin’s staff)',
  京西防秋: 'Autumn defence west of the capital',
  '奉使西行，经灵州、天德军，取道回鹘': 'Envoy to the west, by Lingzhou and the Tiande Army, through Uighur lands',
  '山南西道兵马使（镇梁州）': 'Commander, Shannan West Circuit (stationed at Liangzhou)',
  '率小队护送诏使赴北庭（带果毅都尉衔）': 'Leading a detachment escorting the imperial envoy to Beiting (with the title of Vice Commandant)',
  北庭瀚海军子将: 'Sub-commander, Hanhai Army, Beiting',
  随杨袭古退守西州: 'Falling back with Yang Xigu to hold Xizhou',
  朔方军子将: 'Sub-commander, Shuofang Army',
  被编入仆固玚攻榆次之兵: 'Drafted into Pugu Yang’s attack on Yuci',
  '朔方军（郭子仪麾下）': 'Shuofang Army (under Guo Ziyi)',
  '征行人（替父应征）': 'Conscript (serving in his father’s place)',
  '长任健儿（弩手）': 'Professional soldier (crossbowman)',
  '火长（平戎城，程铎麾下）': 'Squad Leader (Pingrong, under Cheng Duo)',
  副队头: 'Deputy Company Leader',
  '队头（弩队）': 'Company Leader (crossbow company)',
  押官: 'Detachment Officer',
};

/* 編制圖時間軸上的標記（FACTIONS[].marks[].label） */
export const marksEn = {
  // 圖頂一行，與中文四字等寬為度：字長者會與鄰標相撞（安史乱起與乱平相距七年）
  雁门关之役: 'Battle of Yanmen Pass', 安史乱起: 'Rebellion', 闵方城卒: 'Min Fangcheng dies',
  府城破: 'Command falls', 回府: 'Return', 再回府: 'Return again', 程凯卒: 'Cheng Kai dies',
  北庭分镇: 'Beiting separated', 乱平: 'Rebellion ends', 北庭陷: 'Beiting falls',
};

/* 勳、散、品、官（GRANTS）。勳官、武散官之具體名號 Hucker 未逐個立條（作者查），自拟，依其體例直译：
   勳官作 … Commandant／Military Protector（护军照 Hucker 2775 义四），武散官作 General of …／Commandant of …；
   骑都尉、归德郎将、忠武将军照 Notion 术语主表 */
export const honoursEn = {
  // 勳官 merit titles
  上护军: 'Senior Military Protector', // 待查 Hucker shang hu-chün 条（2775 有互见）
  护军: 'Military Protector', // Hucker 2775 义四：唐至明之勳官，視三品下（3b）
  上轻车都尉: 'Senior Light Chariot Commandant', 骑都尉: 'Cavalry Commandant', 骁骑尉: 'Valiant Cavalry Commandant',
  飞骑尉: 'Flying Cavalry Commandant', 云骑尉: 'Cloud Cavalry Commandant', 武骑尉: 'Martial Cavalry Commandant',
  // 武散官 prestige titles
  云麾将军: 'General of the Cloud Banner', 忠武将军: 'General of Loyal Valour', 壮武将军: 'General of Robust Valour',
  游击将军: 'General of Roving Attack', 归德郎将: 'Gentleman-General Who Has Turned to Virtue',
  振威校尉: 'Commandant of Stirring Might', 致果副尉: 'Vice Commandant of Resolute Daring', 翊麾校尉: 'Commandant Assisting the Standard',
  // 品 (P3)
  正四品上: 'rank 4a1', 正四品下: 'rank 4a2', 从三品: 'rank 3b', 从五品下: 'rank 5b2', 从六品上: 'rank 6b1',
  正七品下: 'rank 7a2', 从七品上: 'rank 7b1',
  // 官
  凉州都督: 'Area Commander of Liangzhou', // Hucker 777：都督 Area Commander
};
