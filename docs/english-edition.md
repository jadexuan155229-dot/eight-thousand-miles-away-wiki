# 英文版：分级、机制与待审清单

英文版是叠在中文站上的一层覆盖：数据层（`wiki-data.js`、`posts-data.js`、`echoes-data.js`、文库正文）一字不动，英文另存于 `src/i18n/*.en.js`，逐字段回落中文。本文件记分级方案、技术机制、日常工作流，以及**等作者拍板的事项**。

## 分级

体量约十六万汉字（人物 4.5 万、年表 4.6 万、余波 1.3 万、编制 0.6 万、文库正文 3.2 万），全数精译是以月计的工程。瓶颈是作者的审稿注意力，故按重要性分四级，审稿量跟「拿不准的地方」走，不跟字数走。

| 级 | 范围 | 做法 |
|---|---|---|
| **T0 骨架** | 全部界面字串、124 个人名与字、69 个地名、32 个门派、75 种关系类型（原子类型，复合者如「倾慕·恩义」拆开译）、官职、故事线标题 | 全量；机械为主，作者审专名清单 |
| **T1 精修** | 卷首、主角梯队（`src/i18n/tiers.js`：闵方城、程凯、岚川云、陆晚月、陆羽鸣、吕定仪）的完整档案、轶事、训诂；余波说明 | 作者逐字审，体例同 `docs/lvdingyi-translation-review.md` |
| **T2 工作译本** | 其余人物档案与轶事、全部年表条目 | 术语锁定、抽检；前台标 working translation；作者只审疑点清单 |
| **T3 暂不译** | 文库正文 | 三篇定场（各五百至一千字）可作文学样章，另议 |

T0 做完，所有图表页（舆图、行星、群像、编制、余波）在英文下即完整可读——这个站对英文读者的价值主要在结构，骨架全译比长文半译更能展示。T1 做完即可软发布。

## 机制

- **语言由网址定**：中文在站根，英文在 `en/`（`en/index.html`，Vite 多页入口）。`…/en/#/chars/minfangcheng` 发给谁、在哪刷新都是英文；社交平台预览不跑脚本，英文 meta、`lang`、预览图（`public/og-en.png`，`npm run og` 重截）写死在 `en/index.html`。站内切换语言不重载页面，只换路径、保留哈希。旧版存在 localStorage 的语言设置不再读取。
- **语言上下文**：`App` 持语言状态，经 `LocaleContext`（`src/i18n/locale.js`）下发；组件以 `useLocale()`、`useT()` 取用。年表、舆图、行星、群像诸图原先未接语言，今全数接上。
- **界面字串**：`src/i18n/ui.js`，键即中文原文。中文界面显示键本身，英文界面查表，查无则回落中文。变量以 `{名}` 占位；单复数以函数值处理。
- **内容查表**：`src/i18n/content.js`。人物按 id + 字段（`characters.en.js`，每个字段可单独有无）；年表、地名、关系类型、门派、文库结构以中文原文为键（`events.en.js` 等）。
- **逐字段回落**：英文界面下，标目、生卒（由年号表推出，人人都有）、门派一律英文；未译字段原样显示中文，以 `<Zh>`（`src/i18n/zh.jsx`）包起，标 `lang="zh"` 与 `zh-src`。`zh-src` 不受英文字族覆写，仍用汇文正楷／明朝与中文行高。一节之内全为中文者，节题旁注「Chinese original」。旧时以「此人有无译文」整卡切换，未译之人连标目也是中文，今已拆开。
- **拉丁字**：站内文字大多内联写死三枚中文字体，英文落在其中用的是中文字体自带的拉丁字。英文界面下，`src/i18n/latin-faces.js` 为这三个字族名各补一面只含拉丁字的 `@font-face`（`unicode-range`），拉丁字改走 Iowan／Palatino（与英文档案卡同栈），本机无此诸体者落到自托管的 Literata（OFL，约 50KB，`src/assets/fonts/`）。中文界面撤去此表，中文页上的数字与拉丁字一如其旧。英文档案卡原有的字族栈（Iowan、Baskerville 等）不动，只在 Georgia／Times 之前插入 Literata 作保底。
- **防过期**：人物英译每个字段盖一枚中文原文的短哈希（`src/i18n/stamps.json`）。中文改了，`check-data` 报「中文已改，英文待核」。以中文为键者（年表等）中文一改即自动回落中文，`check-data` 报孤儿英文并给出最近似的现题，便于改键。
- **覆盖率**：`check-data` 末尾一行，按界面、人名、档案（另计 T1）、轶事、年表、地名、门派、关系类型、任期统计。页头英文版说明的数字也由覆盖层实算，译一人即自动更新。

## 工作流

1. 改译文：人物在 `characters.en.js` 按字段写；年表在 `events.en.js` 以中文题目为键；地名、关系类型、门派、文库结构各在其档。
2. 人物新译后跑 `npm run i18n:stamp`，给新字段盖戳。
3. 中文改过、`check-data` 报「英文待核」时：照新中文改英文（或确认不必改），再 `npm run i18n:stamp -- --restamp <字段>`（可写前缀，如 `lvdingyi` 或 `lvdingyi.profile`）。**不要一改中文就重盖全部**——那等于说英文都核过了。
4. 删了译文后 `npm run i18n:stamp -- --prune` 清掉无主的戳。
5. 界面新增中文字串时，以 `t("中文")` 包起，并在 `ui.js` 补英文；`check-data` 会报站内在用而表中无的键。

## 作者已定（2026-11-22）

1. **来历两面都讲**：唐代背景与剑三来源都交代，可以充分、略长。已写成英文版独有的 About 页（`src/about.jsx`，`#/about`，只在英文导航里列出；页头英文版说明末尾另有入口）。`en/index.html` 的描述同步提到 JX Online 3。
2. **题名**：「人山人海 · 档案」英文作 **Characters: Archive**（冒号同中文之点着朱；页面标题、预览元数据同步）。卷首亦译：「八千里路」作 **Eight Thousand Miles Away**（四词分四行，应中文四字一列），印文「入卷」作 **Enter**，副题「士兵、杀手和大夫」作 **The Soldier, the Assassin and the Physician**（仍竖排，拉丁字侧转）；卷首地图上的道名、城名改英文。
3. **作者按不译**：写给自己的话、选角式备注（如「东亚人种吐蕃类型」）、「以现在的话来说」之类的现代注解、文物出处，英文一律不译。档案行内的，译时略去该句；整条轶事、高光属此类者，`characters.en.js` 该条写 `false`，英文界面即略去不显（不回落中文）。`false` 照样盖戳：中文改了，仍会提醒重看。
4. **训诂**：T1 照吕定仪的标准逐条做工作译文；T2 只给一句英文（名字含义 + 出处篇名），引文留中文。
5. **T1 名单**：六人如 `tiers.js`。

**门派**：依 Notion「人山人海英译术语表 / 剑三门派总表」。专名拼音（凌雪阁的拼音作 Lingxuege），机构词意译；标签去掉冠词（行文中团体名加 the：the Tiance Command）。底图吐蕃作 Tibet，大漠作 The Gobi。

## 本轮工作稿（待审）

**门派**（`factions.en.js`）——来自 Notion 者不列；门派总表与术语主表都未收的，暂拟如下：

- 唐军 Tang army · 红衣教 Hongyi Order（按「教 → Order」，同 the Wudu Order）· 靺鞨 Mohe · 苗疆 Miaojiang（若嫌生，可作 the Miao borderlands）· 波斯 Persia · 平民 Commoners · 史实 Historical record

**地名**（`places.en.js`）：Notion 地名表已定者照录（取图上短名：Yunzhou 而非 Yunzhou (Yunzhong Commandery)），共 25 个；卷首地图另需、地名表未收者暂拟：河北-范阳 Fanyang（地名表作 Youzhou (Fanyang Commandery)，图上取郡名，同中文标签）、邺城 Yecheng、睢阳 Suiyang、灵武 Lingwu。

**卷首副题**：「士兵、杀手和大夫」取单数加定冠词（The Soldier, the Assassin and the Physician），读作三种人；若原意是一群人，可作 Soldiers, Assassins and Physicians。

**About 页**（`src/about.jsx`）：全文为工作稿。两处请特别过目——
- 「The work began from that image: the Cangyun fortress at the pass, under snow.」作品缘起于剑三苍云雪中关城这一画面，是否愿意公开写出；
- 「A few figures also come from the game’s own lore, among them Xue Zhi」：以薛直为剑三原有人物（依 Notion 编制总表「设定集称雁门守军统帅」），其余皆作者原创——此说法是否准确。

**关系色谱类名**（行星、群像图例）：傳承 Teaching · 遺承 Legacy · 情愛 Love · 恩義 Obligation · 誼 Friendship · 親緣 Kinship · 嫌隙 Rift · 殺伐 Violence；僅同事 Shared events only；未見／未說開 Never met / left unsaid。

**任期类别**：署理 acting · 代领 deputizing · 兼领 concurrent · 停职 suspended · 暂任 interim · 差遣 commission · 无名目 no formal title · 充任 serving as。

**年月体例**：唐历为阴历，月份从汉学通例作序数（"10th month"），不换作公历月名；年号作 "Tianbao 14"；年中改元注 "Zhide from the 7th month"。

**图幅说明文字**（`ui.js` 末节）：行星关系图、群像网络、山河舆图三段说明的英文工作稿，人名暂用中文原名之拼音。

**其余界面字串**：`ui.js` 全表，约两百条，皆为功能性文字。

## 下一步（T0）

- 124 个人名与字：以 pypinyin 出拼音初稿，作者只核多音字与羌、胡姓氏（荔非等）。
- 14 个称号、10 个别号：作者口吻，逐个定。
- 其余 40 个地名：县作 county，道作 Circuit，郡作 Commandery（同吕定仪档案「Fengzhou (Jiuyuan Commandery), Guannei Circuit」之例）；Notion 地名表已有者先照录。
- 75 种关系类型：作者逐个定。
- 编制职名（`posts-data.js` 之 `POST_FULL`、各任期 `en` 栏）：Hucker。
- 故事线名、卷名、「定场」「序」：作者定。
