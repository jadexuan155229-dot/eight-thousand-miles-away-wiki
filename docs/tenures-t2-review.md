# 任期说明 T2（三张编制图）疑点清单

文件：`src/i18n/tenures.en.js`（新）。档案页「任职履历」和编制图浮签里，每段任期的「上」（how）、「下」（end）、备注（note），原先英文界面全是中文。本批先补苍云、天策两张图，连同程锋、程宇、薛坚在唐军图上的几段（219 句），作者审后（11-24）又补唐军图其余四人（程广、程钊、程铎、唐青阳，53 句）：共 272 句（同句只算一次），**任期说明 287/287，三张图全满**（check-data 末行新增这一项）。T2 工作译本：**你只看这份清单**。

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
- 唐军图其余四人见文末「补译」一节。

## 作者审定（2026-11-23）

- **依据一行**：照建议，英文界面下〈…〉文档名一律显示为 manuscript，同一段任期有几条的只出一次（作 manuscripts），年表编号照出。顺带把「卡」（人物卡）显示为 profile，原先英文界面直接出一个「卡」字。逻辑在 `src/i18n/posts-content.js` 的 `tenureSrcTx`。
- **东都留守**：作者核 Hucker，留守作 Regent、东都作 Eastern Capital，二者合称未单列，照组合作 Regent of the Eastern Capital，与年表狄元恪「北都留守」作 Regent of the Northern Capital 一致。收 Notion 术语主表 T120。
- **巡官**：Hucker 2746 hsün-kuan，Inspector（T'ang–Sung，a lowly official），改大写 Inspector。收 T121。
- **闵方城「几乎如统领」**：all but its Commander 作者看不懂，英文读者也可能误读成「除了统领什么都是」，改作 “acting almost as its Commander”。

## 补译：唐军图其余四人（2026-11-24）

程广、程钊、程铎、唐青阳 53 句，体例同上。三张图共 132 段浮签逐段聚焦看过，上、下、备注、依据均无中文。

### 要你定的

1. **副队头**：唐青阳那段备注说副队头「领十人」，与火长同数，可职名表作 Deputy Company Leader（队头 Company Leader）。年表 745.6「成都一夜」原作 a deputy squad leader，我照职名表取齐，改作 a Deputy Company Leader。你若觉得该按人数，改作 Deputy Squad Leader 一路，告诉我，职名表和年表一起改。
2. **告身**：程钊「告身不是他的」暂作 the patent of appointment。Hucker 若有 kao-shen 条目，顺手看一眼译法。

### 处理说明（不用回）

- 程钊兵曹那条长备注照译（「事是他做的，告身不是他的；叶曙兮读出的『故廉』就是这一条」），字作 Gulian，与年表叶曙兮条一致。
- 程广「〈程家系列〉【4】：边府幕前一等一的名将」去掉文档名，作 One of the very finest generals of the frontier command。
- 程铎「首告程凯」照年表作 informing on Cheng Kai；牙前 headquarters guard、都虞候 Inspector-in-chief 照职名表。
- 程铎三段待核任期的备注「年表此条待定」作 The timeline entry is undecided：这是在说明这几段为什么标待核，读者看得见，照留。
- 唐青阳两条出处：《通典》卷一四八引李靖兵法，作 Li Jing’s military methods as quoted in the Tongdian (Comprehensive Institutions), juan 148，第二次出现简作 Li Jing, quoted in the Tongdian。

### 作者审定（2026-11-24）

- **告身**：Hucker 3146 kao-shen，Appointment Certificate（吏部、兵部发给新任官的凭证）。程钊一条改作 the work was his, the Appointment Certificate was not。收 Notion 术语主表 T122。
- **副队头**：上面第 1 条我问错了。重看数据，「领十人」是 741–745 那段**火长**的备注，不是副队头的；副队头是一队（五十人，见押官条）的副手，排在火长之上。唐青阳的升迁次序是 长任健儿 → 火长 Squad Leader → 副队头 → 队头 Company Leader → 押官。若副队头作 Deputy Squad Leader，英文读者看到「Squad Leader → Promoted Deputy Squad Leader」会以为是降了。作者原答「可以作 Deputy Squad Leader」是按我那句错的前提给的，作者看过次序后定：**不改**，副队头仍作 Deputy Company Leader，年表 745.6 照职名表取齐的改法保留。

