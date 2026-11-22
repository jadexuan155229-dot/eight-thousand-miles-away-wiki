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

## 等作者拍板

1. **英文读者是谁、来历怎么交代**：二十四个门派都来自剑三，中文读者心照不宣，英文读者完全没有这层语境。写成 "original fiction set in the world of JX3"，还是淡化游戏来源、只讲唐代？这决定 About 页与门派说明怎么写。`en/index.html` 的描述暂作中性的 "an author's archive for a work of fiction set in Tang China, 715–800"。
2. **题名**：「人山人海 · 档案」暂留中文原题；卷首「八千里路」、印文「入卷」、副题「士兵、杀手和大夫」亦暂留中文，只把读屏标签与操作提示改作英文。英文题头上行暂作 "Eight Thousand Miles Away · 715–800 · Kaiyuan 3 to Zhenyuan 16"。
3. **作者按的语域**：人物卡里有写给自己的话，在中文同人资料站里自然，直译成英文会变味。最尖锐的是闵方城卡「（东亚人种吐蕃类型）」，英译在英语学界读者眼里会像十九世纪的人种分类学；类似的还有「以现在的话来说是抑郁」「文物：宁夏固原……」。建议 T1/T2 把「档案正文」与「作者按」分开处理：改写、做成脚注（文物出处做脚注反是加分），或不译。
4. **名字训诂**：91 人有训诂。建议 T1 照吕定仪的标准逐条做工作译文；T2 只给一句英文（名字含义 + 出处篇名），引文留中文。
5. **T1 名单**：暂定六人（见 `tiers.js`），可增删。

## 本轮工作稿（待审）

下列英文都按已定体例（拼音、Hucker 官名、县作 county）起草，作者审定前视作工作稿。

**门派**（`factions.en.js`）：苍云 Cangyun · 天策 Tiance · 唐军 Tang army · 霸刀 Badao · 长歌 Changge · 万花 Wanhua · 药宗 Yaozong · 明教 Mingjiao · 红衣教 Hongyijiao · 唐门 Tangmen · 五毒 Wudu · 七秀 Qixiu · 丐帮 Gaibang · 少林 Shaolin · 藏剑 Cangjian · 凌雪阁 Lingxuege · 衍天宗 Yantianzong · 纯阳 Chunyang · 万灵 Wanling · 蓬莱 Penglai · 段氏 Duan · 南诏 Nanzhao · 奚人/狼牙 Xi / Langya · 羌 Qiang · 鲜卑 Xianbei · 柔然 Rouran · 靺鞨 Mohe · 苗疆 Miaojiang · 波斯 Persia · 西域 Western Regions · 平民 Commoners · 史实 Historical record

- 凌雪阁：此处按「拼音到底」作 Lingxuege；编制页天策说明里原有的英文作 "Lingxue"，二者须统一。
- 西域、平民、史实、波斯：非门派专名，用通行英文。苗疆若嫌 Miaojiang 太生，可作 "the Miao borderlands"。

**底图标签**（`places.en.js`）：唐十道作拼音（Longyou、Guannei、Hedong、Hebei、Henan、Shannan、Jiannan、Huainan、Jiangnan、Lingnan、Anxi、Beiting）；吐蕃暂作 Tibet，大漠暂作 The Gobi——此二者是否也走拼音（Tubo、Damo）待定。

**关系色谱类名**（行星、群像图例）：傳承 Teaching · 遺承 Legacy · 情愛 Love · 恩義 Obligation · 誼 Friendship · 親緣 Kinship · 嫌隙 Rift · 殺伐 Violence；僅同事 Shared events only；未見／未說開 Never met / left unsaid。这几个词承载作者的情感词汇，尤须过目。

**任期类别**：署理 acting · 代领 deputizing · 兼领 concurrent · 停职 suspended · 暂任 interim · 差遣 commission · 无名目 no formal title · 充任 serving as。

**年月体例**：唐历为阴历，月份从汉学通例作序数（"10th month"），不换作公历月名；年号作 "Tianbao 14"；年中改元注 "Zhide from the 7th month"。

**图幅说明文字**（`ui.js` 末节）：行星关系图、群像网络、山河舆图三段说明的英文工作稿，人名暂用中文原名之拼音。

**其余界面字串**：`ui.js` 全表，约两百条，皆为功能性文字。

## 下一步（T0）

- 124 个人名与字：以 pypinyin 出拼音初稿，作者只核多音字与羌、胡姓氏（荔非等）。
- 14 个称号、10 个别号：作者口吻，逐个定。
- 69 个地名：县作 county，道作 Circuit，郡作 Commandery（同吕定仪档案「Fengzhou (Jiuyuan Commandery), Guannei Circuit」之例）。
- 75 种关系类型：作者逐个定。
- 编制职名（`posts-data.js` 之 `POST_FULL`、各任期 `en` 栏）：Hucker。
- 故事线名、卷名、「定场」「序」：作者定。
