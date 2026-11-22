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

## 第二轮已定（2026-11-22）

- **门派标签**（两张 Notion 表都未收者）：唐军 Tang army · 红衣教 Hongyi Order · 靺鞨 Mohe · 苗疆 **Miao borderlands**（地域标签，不受门派拼音方针所限）· 波斯 Persia · 平民 Commoners · 史实 Historical record。
- **地名**：地名表未收者一律拼音（范阳 Fanyang、邺城 Yecheng、睢阳 Suiyang、灵武 Lingwu）。
- **卷首副题**：单数，*The Soldier, the Assassin and the Physician*。
- **关系色谱类名**：傳承 Teaching · 遺承 Legacy · 情愛 Love · 恩義 **Grace & duty** · 誼 Friendship · 親緣 Kinship · 嫌隙 Rift · 殺伐 **Bloodshed**；僅同事 Shared events only；未見／未說開 Never met / left unsaid。
- **任期类别**：署理 acting · 代领 deputizing · 兼领 concurrent · 停职 suspended · 暂任 interim · 差遣 commission · 无名目 no formal title · 充任 serving as。
- **年月体例**：月份作序数（10th month）；年号作 Tianbao 14；年中改元注 Zhide from the 7th month。
- **图幅说明文字**、**About 页**：照现稿。作品缘起于剑三苍云雪中关城、薛直为剑三原有人物两处，作者另行确认。

## 第三轮已定（2026-11-22）：名号

- 明教波斯人、苗人的原名不再写在「字」里，中文卡标 **本名**；程骞、程宇两样都有，保留「字」另标 **波斯语名**；唐煦、唐熙同。日本人物标 **日文读法**；春山遥入蓬莱后之汉名方遥标 **汉名**，字作「眠树」。数据结构与各人细目见 [names-draft.md](names-draft.md)「第三轮已定」。
- 英文名：汉名本是音译者用本名（Rādīn），苗人用 RPA，日本人物用日语读法（Arashikawa Kumo，岚川云另列 Chinese reading: Lanchuan Yun），墨昆 Mokun，阿会朗 Ahui Lang，贺兰 He Lan，弘隽 Hongjuan。

## T0（2026-11-22）：工作稿已全部上线，待审

称号 13、别号 10、关系类型 75、地名 40、编制职名（81 职位、87 条自写职名、勋散）、文库题名，皆出工作稿上线，逐条见 [t0-review.md](t0-review.md)。英文覆盖：人名、地名、门派、关系类型、任期职名俱满。

- 编制英译另立 `src/i18n/posts.en.js`（职位短名与全称、分组、悬停说明、自写职名、图顶标记、勋散），查表见 `src/i18n/posts-content.js`；中文键一改即回落中文，check-data 报缺译与孤儿。
- 英文编制图左栏放宽（168 → 222），容得下 Military Vice Commissioner。
- 文库英文目录不用【】。

## T1（2026-11-22）：主角六人档案，工作译文待逐字审

闵方城、程凯、岚川云、陆晚月、陆羽鸣五人档案八目、训诂、轶事、高光出工作译文（吕定仪档案前已有），T1 六人档案俱全。每人一份译注与待审清单：[闵方城](minfangcheng-translation-review.md)、[程凯](chengkai-translation-review.md)、[岚川云](lanchuanyun-translation-review.md)、[陆羽鸣、陆晚月](luyuming-translation-review.md)。

体例（闵方城一人先定调）：作者口吻保留，不抹平为百科腔；原文含蓄处译文同样含蓄，两可处不择一；不补写事实；典故自译（P8）；专名照 Notion 术语表。不译者：选角注、文物出处、现代注解、作者按（整条者写 `false`）、待定之按与数据按语。

## 下一步（T2）

- 作者逐字审 T1 五人。
- 年表 615 条：先译事名（`events.en.js`），正文另议。
- 其余人物档案与轶事：工作译本，作者只审疑点清单。
