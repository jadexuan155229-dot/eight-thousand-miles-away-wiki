# 任期说明 T2（苍云、天策两张编制图）疑点清单

文件：`src/i18n/tenures.en.js`（新）。档案页「任职履历」和编制图浮签里，每段任期的「上」（how）、「下」（end）、备注（note），原先英文界面全是中文。本批补齐苍云、天策两张编制图上的全部任期，连同程锋、程宇、薛坚在唐军图上的几段：共 219 句（同句只算一次），任期说明 234/287（check-data 末行新增这一项）。T2 工作译本：**你只看这份清单**。

## 本批体例

- **以中文原文为键**，同年表：中文一改，那一句英文自动回落中文，check-data 报孤儿。同一句话出现在几段任期里（「回府」「府城破」「病故」）只译一次。
- 体例是图注：短句，不加句号；起讫之间用 →，与中文同（吕定仪原型用分号，改了）。
- 职名、品阶照职名表：兵马使 Commander、参军 Administrator、留后 Rear Commander、行军司马 Adjutant、果毅都尉 Vice Commandant、医博士 Medical Erudite；品阶照 Hucker 记法作 rank 5b2（与勋散一栏同）。统帅作 the Commander（T003），统领作 Corps Commander，苍云的行营作 the field army。
- 你的工作文档名不出（〈程家系列〉【7】、〈靳+两楼〉、〈752 婚〉、〈殿〉、〈狄、邱、樊〉），需要时概称 the manuscripts。「作者定」不出。
- 「推定」「待核」**照留**（inferred、unconfirmed）：和年表正文不同，编制图本来就是摆证据的，浮签里还有「依据」一行，这里的推定是在告诉读者这一段靠什么画出来，删了反而失真。
- 吕定仪那段原先写在 `posts-data.js` 里的英文（`en` 栏）挪进了新表，数据层恢复一字不动。

## 要你定的

1. **浮签「依据」一行**：英文界面下照样列出〈殿〉〈第三章〉这类中文文档名（如程凯教练使一段：Sources: 757.10F; 〈殿〉; 〈第三章〉; 770.12）。年表定过「工作文档名英文不出」。我倾向英文界面把〈…〉一律显示为 manuscript（几条并作一条），年表编号照出；也可以维持现状，当作原始出处留着。这一处这次没动，等你定。
2. **两个 Hucker 词请顺手翻一下**：
   - 王缙「兼东都留守」我作 Regent of the Eastern Capital，印象里 Hucker 的 liu-shou 作 Regent，但没查到条目号；
   - 岚川云在苍云「后兼巡官」作小写的 inspector，Hucker 的 hsün-kuan 应该是 Inspector 一类。若条目另有译法，我照改。

## 处理说明（不用回，有异议再说）

- 程凯「崤山工事」备注只留前半（Start inferred: he was at Mount Xiao by the spring of 755, but when he went is not known）；后半讲的是年轴左缘怎么画，是写给自己的，不出。
- 程骞「受挫，嚼食毒草」照你审 766 条时的意思译：Failed the trial and tried to take his own life with a poisonous herb。
- 王不空备注「文稿称『佛爷』」作 the manuscripts call him “Foye”, the Buddha。
- 闵方城「几乎如统领」作 “all but its Commander”；薛褚「营中单以字行」作 known by his courtesy name alone: General Jitao。
- 岚川云散官一条：Gentleman-General Who Has Turned to Virtue (rank 5b2) … the post carried the prefix xing 行（「行」字照留）。
- 魏谦「752 南诏查实通敌案」照年表 752.2 作 uncovered a treason case。
- 程锋「以生执贼庭固求自贬」作 Having been taken alive by the rebels, insisted on being demoted，与职名表 Self-demoted 呼应。
- 卢秉毓、程骞、高垣与万花三位医者档案还没译，但他们的任期在苍云、天策两张图上，一并译了，两张图浮签已无中文。
- **还剩**：唐军那张图上程广、程钊、程铎、唐青阳四人的 53 句仍是中文，等这几人的档案批次一起做。
