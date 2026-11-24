# 余波英译 A 批（在场姿态 50 种、姿态说明 109 条）疑点清单

文件：`src/i18n/echoes.en.js`（`stancesEn`、`stanceNotesEn`）；代码：`src/echoes.jsx`、`scripts/check-data.js`。T2 工作译本：**你只看这份清单**。余波姿态 0 → 50/50，姿态说明 0 → 109/109。回响节点 630 条放 B、C 批。

## 本批做了什么

- **接线**：余波页的在场姿态、姿态说明、回响节点三种字段原先在英文界面一律显示中文（代码注释写着「姿态原文为中文，英文版也保留」，那是还没有译文时的权宜）。今在 `echoes.en.js` 新设三张以中文原文为键的表，查无则回落中文（照例标 `lang="zh"`）；图上节点的行内短题与悬停浮签也改用英文，英文短题取第一小句，浮签按词折行。`check-data` 覆盖率一行新增「余波姿态 · 姿态说明 · 回响节点」三项，并报孤儿。
- **体例**：照你 11-09 定的余波口吻（名词短语先行、重效果不重字面）。姿态和说明是一行小字，放在分带名之后，所以都写得短：姿态像标签（Lived through it、At the bedside、The victor），说明像旁注，小写起头、分号相隔（eleven; Xue Zhi’s only son）。
- **与分带同名的姿态照分带的英文**：逝者 The dead、当事人 The one involved、留在敌后 Left behind enemy lines 等二十几种，与 `bandsEn` 一字不差。这些姿态和所在分带同名时页面不重复显示，只在两者不同时才并列出来（如 Those who lived it · Lived through it）。
- **人名、官名照站上已用**：执衣 attendant（边赛远档案已用）、军纪官 Provost（职名表）、主官 commander、副官 deputy、一团 the First Regiment、破阵营 the Rank-Breaker Corps、东陉 the Eastern Pass、药宗 the Beitian School of Medicine。

## 要你定的

1. **「受功的人」**（樊璋，闵方城之死）：我读成「受了他的功夫」，作 the one he passed his skill to，和他那句记忆方式 the bell he left ringing in the body 对得上。如果「功」是功劳（他替闵方城领了功），告诉我，改作 the one who took the credit 一类。
2. **「事前不知（作者定：只是放学有所成的邱鸿上去试身手）」**（闵方城，荔非败于邱鸿）：括注是你定案的记录，英文只出 Did not know beforehand。这条姿态和分带「事后不问」不同，所以页面上会并列出来；中文界面现在也连括注一起显示，你要不要把中文的括注挪进别处（比如这条回响的节点里）？
3. **「留守旧部」**（薛褚，吕定仪之死）：作 Of the old garrison, left on guard。他当时守着苍云堡、在门口接灵，这样译可以吗？

## 处理说明（不用回，有异议再说）

- 说明里的出处括注照留，用页面上已有的小标词：（关系）作 (relations)，（卡）作 (profile)。
- 「逝者（前情）」（连朔，闵方城杀奚众）作 Already dead (what came before)：他九月已死，比震源早。
- 「遗孤」（吕希纯）作 The orphan he left；「从未见过死者」（狄元恪）作 Never met the dead man。
- 「十二岁；雁塔风筝上」作 twelve; up on a kite at Yanta Tower；「同年在雁塔理殉塔文书」作 that year, sorting the papers of the tower’s dead at Yanta Tower。
- 「赵廷之外孙女」只作 Zhao Tingzhi’s granddaughter，英文不分内外孙。
- 那就是一生一震源里的说明带年月（745.9 等），照年表编号写法留着。
