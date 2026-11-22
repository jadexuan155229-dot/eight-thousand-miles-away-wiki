# T0 待审清单（2026-11-22）

T0 一轮：称号、别号、关系类型、地名、编制职名、勋散、文库题名，**都已上线为工作稿**（PR 合并前随时可改）。改法：直接改 `src/i18n/` 下对应文件里的英文，或告诉我改哪条。

凡 Notion「人山人海英译术语表」已定者照录；下面只列本轮新拟、需要过目的。

## 一、称号（13）与别号（10）

文件：`src/i18n/characters.en.js`（`epithet`、`hao`）。体例照吕定仪 *The Weight of a Clerk's Pen*：写一个有意味的英文副标题，不逐字直译。

| 人物 | 称号 | 英译 | 说明 |
|---|---|---|---|
| 闵方城 | 雪岭金身 | The Golden Body of the Snow Ridge | 取 Notion「作者命名」旧稿：金身含金刚不坏之意 |
| 狄元恪 | 澡雪持衡 | Washed in Snow, Holding the Scales | 澡雪出《庄子·知北游》 |
| 荔非承烈 | 白额当关 | The White-Browed Tiger Holds the Pass | 取 Notion 旧稿：当关作动词 |
| 靳沉白 | 枯山隐士 | The Hermit of the Barren Mountain | Notion 旧稿作 Dry Mountain（呼应枯山水）；取 Barren |
| 薛褚 | 铸室藏身 | Sheathed in the Armoury | 「韬」为剑衣；Notion 旧稿 Hidden in the Forge |
| 邱鸿 | 纳骨燃灯 | Enshrining Bones, Lighting Lamps | 已定意：佛教义。原拟「奉骨燃灯」，嫌动词方向太显而改「纳」；enshrine 取纳骨入龛之义，不指向谁 |
| 关岳 | 万山声揽 | Gathering the Voices of Ten Thousand Mountains | 已定意：揽众声。取 Notion 旧稿 |
| 连朔 | 片羽钩心 | One Feather, a Hook in the Heart | 作者：照现稿 |
| 高垣 | 剖石怀青 | Split the Stone: Green Within | |
| 高堑 | 苍苔地骨 | Moss on the Bones of the Earth | |
| 宣杨 | 鹰鸟出山 | The Hawk Comes Down from the Mountain | |
| 宣康 | 黍饱梁通 | Grain to Eat, a Bridge to Cross | 梁作桥，照训诂 |
| 穆津 | 析木之津 | The Ford Across the River of Heaven | 星次名「析木」不译 |

| 人物 | 别号 | 英译 |
|---|---|---|
| 狄元恪 | 太原郎君 | the Gentleman from Taiyuan |
| 邱鸿 | 北地清俊 · 玉刀牌 | the Fair One of the North · Jade Blade-and-Shield |
| 楼谊 | 塔侯 · 楼官 | Lord of the Tower · the Tower Officer |
| 卢秉毓 | 冶山 | Forge Mountain |
| 程凯 | 知节殿 | Zhijie Hall |
| 王不空 | 佛爷 | the buddha（照作者在 Notion「苍云编制总表」所定，小写） |
| 陆晚月 | 月儿 | Little Moon |
| 汪楫 | 泥舟先生 | Master Mudboat |
| 高垣 | 刑官 | the Inquisitor（退一步可作 the Magistrate of Punishments） |
| 宣杨 | 怀青（承师号） | Huaiqing (her master's name) |

另：岚川云的字照 Notion 方针 P12 补日语读法与字义：**Qianhe (Chizuru, 'a thousand cranes')**。P12 原定正文用拼音 Lanchuan，第三轮已改为英文名 Arashikawa Kumo，以第三轮为准。

## 二、关系类型（75）

文件：`src/i18n/relations.en.js`。是关系签上的短名，两头都能读（签上只显对方姓名和类型）。按意思分组，最需要你看的几个：

- 未遂 Unfulfilled · 未说开 Left unsaid · 未见 Never met
- 知遇 Recognition · 知契 Understanding · 同契 Kindred bond · 知音 True listener · 同道 Like-minded
- 遗承 Legacy · 衣钵 Mantle · 代护 Guardian in trust · 度化 Deliverance · 先斥后察 Scorn, then scrutiny
- 恩义 Grace & duty（与色谱类名同）· 杀伐 Bloodshed · 嫌隙 Rift
- 有情 Affection · 私情 Secret love · 倾慕 Adoration · 伴侣 Partners · 夫妻 Married

其余照文件。

## 三、地名（40）

文件：`src/i18n/places.en.js`。Notion 地名表已无未用之条，本轮全照其体例：州县拼音（Jiangzhou、Chao County），关 Pass、城 Fortress、寺 Monastery、山 Mount，门派驻地用门派英文名（Cangjian Manor、Changge School）。图上是短名。

- **唐境以外用通行英文名**：龟兹 Kucha、吐火罗 Tokharistan、小勃律 Little Balur、疾陵城 Zaranj、波斯 Persia——同吐蕃 Tibet 之例。若要一律拼音（Qiuci、Tuhuoluo……），说一声即改。
- 梁州作 **Liangzhou (Hanzhong)**：与凉州同音，加注汉中以别。
- 西域-龙门作 Longmen Desert（剑三龙门荒漠）；药宗故地作 Beitian School (old seat)；西南山区村落作 Southwestern hill villages。

## 四、编制职名（81 职位、87 条自写职名）、勋散

文件：`src/i18n/posts.en.js`。

- **苍云**全照 Notion 方针 P13、P6 与「苍云编制总表」：Commander of the Cangyun Army、Commander of the Rank-Breaker Corps、Commander of the First Regiment、Battalion Commander in the First Regiment、Company Commander、Chief of Scouts、Provost、Warden of Yanta Tower……编制图上用短名（Regimental Commander）。吕定仪任期原作 "Commander, Third Regiment"，已改为 P13 之 "Commander of the Third Regiment"。
- **天策**（Notion 记「天策编制另议」，本轮拟）：营作 Corps 名（Heavenly Bow Corps、Heavenly Spear Corps、Scout Corps、Heavenly Slayer Corps），不套苍云层级；校尉 Commandant、副尉 Vice Commandant（依折冲府）；教练使 Drill Commissioner、兵马使 Commander of Troops、兵曹参军事 Administrator of the Military Service Section、医博士 Erudite of Medicine、留后 Rear Commander。
- **唐军**：节度副使 Deputy Military Commissioner（P2：节度使 Military Commissioner）、子将 Sub-commander、行军司马 Field Adjutant、押衙 Headquarters Guard Commander、都虞候 Chief Inspector、都知兵马使 Chief Commander of Troops。后四个标了 🔍，待查 Hucker 正文。
- **勋散**：品照 P3 作 rank 5b2；骑都尉 Cavalry Commandant、归德郎将 Gentleman-General Who Has Turned to Virtue、忠武将军 General of Loyal Valour 照 Notion；其余勋官十二转、武散官按同一体例直译（Light Chariot Commandant、General of the Cloud Banner……），🔍 待查 Hucker。
- 编制图顶的事件标记缩到与中文四字等宽（安史乱起 Rebellion、回府 Return），否则相邻两标相撞。

## 五、文库题名

文件：`src/i18n/novel.en.js`。全是作者口吻，我只出直译倾向的稿：

| 标签 | 英译 | 题名 | 英译 |
|---|---|---|---|
| 生逢 | Born to It | 大寺烈焰冲天 | The Great Temple Burns to the Sky |
| 青岭 | Green Ridge | 她的遗迹 | What She Left Behind |
| 登楼 | Climbing the Tower | 未到关前 | Before the Pass |
| 种桃 | Planting Peaches | 负我蛾眉 | Failing My Lady（蛾眉指女子，略如李庭泽对岑菡说的话；「负我蛾眉」即负了我的蛾眉，主语不出，英文亦不出） |
| 郎心 | His Heart | 他年对坐炉边 | Someday, Facing Each Other by the Fire |
| 思停 | A Halting Thought（逆用《一代宗师》「宁在一思进，莫在一思停」，取所戒之半；halting 兼停步与迟疑，留住那层张力） | 那里没有麋鹿 | There Are No Deer There |

卷：门墙 Within the Walls · 于林之下 Beneath the Trees（《邶风·击鼓》）。定场 Opening · 序 Prologue。英文目录不用【】，作「Born to It · The Great Temple Burns to the Sky」。
