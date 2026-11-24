# 余波英译 A 批（在场姿态 50 种、姿态说明 109 条）疑点清单

文件：`src/i18n/echoes.en.js`（`stancesEn`、`stanceNotesEn`）；代码：`src/echoes.jsx`、`scripts/check-data.js`。T2 工作译本：**你只看这份清单**。余波姿态 0 → 50/50，姿态说明 0 → 109/109。回响节点 630 条放 B、C 批。

## 本批做了什么

- **接线**：余波页的在场姿态、姿态说明、回响节点三种字段原先在英文界面一律显示中文（代码注释写着「姿态原文为中文，英文版也保留」，那是还没有译文时的权宜）。今在 `echoes.en.js` 新设三张以中文原文为键的表，查无则回落中文（照例标 `lang="zh"`）；图上节点的行内短题与悬停浮签也改用英文，英文短题取第一小句，浮签按词折行。`check-data` 覆盖率一行新增「余波姿态 · 姿态说明 · 回响节点」三项，并报孤儿。
- **体例**：照你 11-09 定的余波口吻（名词短语先行、重效果不重字面）。姿态和说明是一行小字，放在分带名之后，所以都写得短：姿态像标签（Lived through it、At the bedside、The victor），说明像旁注，小写起头、分号相隔（eleven; Xue Zhi’s only son）。
- **与分带同名的姿态照分带的英文**：逝者 The dead、当事人 The one involved、留在敌后 Left behind enemy lines 等二十几种，与 `bandsEn` 一字不差。这些姿态和所在分带同名时页面不重复显示，只在两者不同时才并列出来（如 Those who lived it · Lived through it）。
- **人名、官名照站上已用**：执衣 attendant（边赛远档案已用）、军纪官 Provost（职名表）、主官 commander、副官 deputy、一团 the First Regiment、破阵营 the Rank-Breaker Corps、东陉 the Eastern Pass、药宗 the Beitian School of Medicine。

## 作者已定（11-24）

1. **「受功的人」**：受了闵方城的功夫，照译 the one he passed his skill to。
2. **「事前不知（作者定：……）」**：括注挪走。中文姿态改作「事前不知」，括注的内容并入姿态说明，作「只是放学有所成的邱鸿上去试身手；事后不问」（英文 only let Qiu Hong, his training come to something, go up and try his hand; asked nothing afterwards）；「作者定」留作数据旁的代码注释。说明从此与分带「事后不问」不同，页面上会并列显示。
3. **「留守旧部」**：照译 Of the old garrison, left on guard。
4. **震源标题统一用名词短语**（作者提出）：十个里只有两个不是。
   - 闵方城杀奚众：Min Fangcheng Kills the Xi Herders → **Min Fangcheng’s Killing of the Xi Herders**。保留他的名字，因为这一震源的重心就是他下的令。
   - 那就是一生：That Was a Life → **A Whole Life**。你提的 As his whole life 我没照用：英文里 as 后面得接东西（as … what?），单独做标题读起来像半句话。A Whole Life 是名词短语，保住了「一生」，也留着「那就是」那种不加评说的口气。想点明是闵方城的话，可以作 His Whole Life，你挑一个。
   - 顺带：余波英文里原有 12 处直撇号（Lifei's、war's 等）统一成弯撇号，和全站一致。

## 处理说明（不用回，有异议再说）

- 说明里的出处括注照留，用页面上已有的小标词：（关系）作 (relations)，（卡）作 (profile)。
- 「逝者（前情）」（连朔，闵方城杀奚众）作 Already dead (what came before)：他九月已死，比震源早。
- 「遗孤」（吕希纯）作 The orphan he left；「从未见过死者」（狄元恪）作 Never met the dead man。
- 「十二岁；雁塔风筝上」作 twelve; up on a kite at Yanta Tower；「同年在雁塔理殉塔文书」作 that year, sorting the papers of the tower’s dead at Yanta Tower。
- 「赵廷之外孙女」只作 Zhao Tingzhi’s granddaughter，英文不分内外孙。
- 那就是一生一震源里的说明带年月（745.9 等），照年表编号写法留着。
