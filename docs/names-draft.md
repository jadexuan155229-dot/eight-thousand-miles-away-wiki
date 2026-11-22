# 人名拼音：初稿与待定

2026-11-22 出稿。方法：pypinyin 按词取读音，姓在前、名连写（Min Fangcheng）；吕作 Lü；复姓连写（Zhangsun、Lifei、Qutu）；表字连写首字母大写（Heng、Zhiwei）。
读音另与作者所取的人物 id 逐一比对——id 本是作者手打的拼音（qisheng、yeboqiu），与拼音库默认读法不合时从 id：齐晟作 Qi Sheng（不作 Qi Cheng）、叶泊秋作 Ye Boqiu（不作 Ye Poqiu）；薛褚 Xue Chu、杜徵 Du Zheng 亦由 id 印证。

**124 人全部上线**（第三轮定名后）。总表见文末；第三轮所定诸人另列于下。

## 第三轮已定（作者 2026-11-22）

### 名号的数据结构

`wiki-data.js` 的 `zi` 只放汉式表字；其余名号放 `names: [[标签, 值], …]`，标签只许四种（`src/i18n/name-labels.js`，check-data 校验）：

| 标签 | 用于 | 英文标签 |
|---|---|---|
| 本名 | 明教波斯人、苗人的原名（汉名是后取或音译） | Original name |
| 波斯语名 | 以汉名为主、另有波斯语名者 | Persian name |
| 日文读法 | 日本人物之名的日语读法 | Japanese reading |
| 汉名 | 入中土后所取汉名 | Chinese name |

中文卡片上一行作「汉名 方遥 · 字 眠树 · 日文读法 Haruyama Haruka」（汉名在字前）；没有任何名号的仍作「字号待补」。英文卡片上，名号的值已经就是英文名的（苗人本名、日本人物的日文读法、音译者的本名），不再重出。英文覆盖层另可加 `alt`（只在英文出），眼下只有岚川云的 **Chinese reading: Lanchuan Yun**。检索兼查各名号。

### 各人

| 中文 | 英文名 | 名号（中文卡） | 英文卡名号行 |
|---|---|---|---|
| 陆羽鸣 陆南信 陆晚月 陆灵 陆隐 陆晓 | 汉名拼音（Lu Yuming…） | 本名 Rukh / Nasim / Mahtāb / Jānān / Penhān / Farzīn | Original name: … |
| 程骞 | Cheng Qian | 字 斯征 · 波斯语名 Parvāz | Courtesy name: Sizheng · Persian name: Parvāz |
| 程宇 | Cheng Yu | 字 镇洛 · 波斯语名 Āsemūn | Courtesy name: Zhenluo · Persian name: Āsemūn |
| 唐煦 / 唐熙 | Tang Xu / Tang Xi | 波斯语名 Dārā / Tiyām | Persian name: … |
| 朗迪恩 鲁雅 玛奈丽 歌莉 | **本名**：Rādīn、Royā、Māneli、Golī | 本名 … | （本名即英文名，不重出） |
| 苗人 10 人 | **苗文（RPA）**：Nof Langb Chib 等，见文末总表 | 本名 … | （同上） |
| 岚川云（号 千鹤） | **Arashikawa Kumo** | 日文读法 Arashikawa Kumo；号「千鹤」 | Chinese reading: Lanchuan Yun；号 “Qianhe (Chizuru, ‘a thousand cranes’)”（2026-11-22 作者定：千鹤是号不是字） |
| 岚川靖彦 | Arashikawa Yasuhiko（やすひこ） | 日文读法 Arashikawa Yasuhiko | — |
| 林叶矢 | Hayashi Kyōya（きょうや） | 日文读法 Hayashi Kyōya | — |
| 春山遥 | Haruyama Haruka | 汉名 方遥 · 字 眠树 · 日文读法 Haruyama Haruka | Chinese name: Fang Yao · Courtesy name: Mianshu (Nemugi) |
| 阿辉 | Ahui | 日文读法 Hikaru（岚川云之母所取汉名；岚川父女与他说日语时读ひかる） | Japanese reading: Hikaru |
| 墨昆 | Mokun（整体读） | | |
| 阿会朗 | Ahui Lang（阿会为奚族姓氏） | | |
| 贺兰（字 谷馨） | He Lan（分写） | | Courtesy name: Guxin |
| 李庭深（字 弘隽） | Li Tingshen | | Courtesy name: Hongjuan（隽读 juàn） |
| 屈突真 / 彤素 / 离朱 | Qutu Zhen / Tongsu / Lizhu | | |

**日本人物英文名一律用日语读法**（岚川云的汉语读法另作 Chinese reading 列出）；阿辉的汉名本是汉人母亲所取，英文名用拼音 Ahui，日语读法 Hikaru 另列。这一条若想反过来（如阿辉英文名作 Hikaru），改 `characters.en.js` 一行即可。

### 字体

ō（Kyōya）原不在中文字体子集里，已补进字符表并重裁三枚子集（顺手补上久缺的「誰」）。英文界面的拉丁字另加拉丁扩展一面（Literata latin-ext），ā、ō 不再落回中文字体自带的字形。

## 尚未动的

- 14 个称号、10 个别号：作者口吻，逐个定（下一轮）。
- 岚川云在行星关系图英文说明里已改作 Arashikawa Kumo。

## 已上线总表

| 中文 | 英文名 | 表字 |
|---|---|---|
| 闵方城 | Min Fangcheng | Heng |
| 狄元恪 | Di Yuanke | Zhiwei |
| 骆文璧 | Luo Wenbi | Jingshan |
| 吕定仪 | Lü Dingyi | Yaoxian |
| 荔非承烈 | Lifei Chenglie | Wugong |
| 靳沉白 | Jin Chenbai | Lingyun |
| 薛褚 | Xue Chu | Jitao |
| 邱鸿 | Qiu Hong | Xianlu |
| 樊璋 | Fan Zhang | Dingshi |
| 关岳 | Guan Yue | Ziling |
| 景惠时 | Jing Huishi | Chunyi |
| 关山 | Guan Shan | Renshi |
| 连朔 | Lian Shuo | Zhihui |
| 边赛远 | Bian Saiyuan | Sheheng |
| 茹锦 | Ru Jin | Qixiang |
| 楼谊 | Lou Yi | Zhengu |
| 楼谯 | Lou Qiao | Jianwang |
| 廖群 | Liao Qun | Yingzhong |
| 吕希纯 | Lü Xichun | Yuanying |
| 楼皓 | Lou Hao | Subi |
| 关槐 | Guan Huai |  |
| 卢秉毓 | Lu Bingyu | Zhisong |
| 柳戎 | Liu Rong | Rong |
| 柳贯 | Liu Guan | Yuanyi |
| 任迪简 | Ren Dijian |  |
| 关榆 | Guan Yu |  |
| 岑菡 | Cen Han | Fangyin |
| 杜徵 | Du Zheng | Wenqing |
| 李庭泽 | Li Tingze | Runfu |
| 虞嘉 | Yu Jia | Lubin |
| 白霖 | Bai Lin | Qishang |
| 程骞 | Cheng Qian |  |
| 程凯 | Cheng Kai | Ziyang |
| 齐晟 | Qi Sheng | Guangming |
| 程锋 | Cheng Feng | Lüduan |
| 魏谦 | Wei Qian | Siyi |
| 项旌 | Xiang Jing | Yangjie |
| 马翊 | Ma Yi | Tunan |
| 程宇 | Cheng Yu |  |
| 程钊 | Cheng Zhao | Gulian |
| 程铎 | Cheng Duo | Mingzhi |
| 程钧 | Cheng Jun | Weizhen |
| 程广 | Cheng Guang | Qianli |
| 陈瑞和 | Chen Ruihe | Xinchu |
| 夏明沧 | Xia Mingcang |  |
| 薛直 | Xue Zhi |  |
| 薛坚 | Xue Jian |  |
| 秦徽 | Qin Hui |  |
| 长孙忘情 | Zhangsun Wangqing |  |
| 王不空 | Wang Bukong |  |
| 李庭深 | Li Tingshen |  |
| 陆危楼 | Lu Weilou |  |
| 陆羽鸣 | Lu Yuming |  |
| 陆南信 | Lu Nanxin |  |
| 陆晚月 | Lu Wanyue |  |
| 陆灵 | Lu Ling |  |
| 陆隐 | Lu Yin |  |
| 陆晓 | Lu Xiao |  |
| 唐煦 | Tang Xu |  |
| 唐哲 | Tang Zhe | Zhuwei |
| 唐玄 | Tang Xuan | Jizhi |
| 唐绮 | Tang Qi | Sujun |
| 唐篪 | Tang Chi | Yousheng |
| 唐遐 | Tang Xia | Baihe |
| 唐青阳 | Tang Qingyang |  |
| 唐熙 | Tang Xi |  |
| 蒙萍 | Meng Ping |  |
| 段韶 | Duan Shao | Kuishi |
| 祝红蕖 | Zhu Hongqu | Fuxiang |
| 朱鹭 | Zhu Lu | Wanting |
| 岑荃 | Cen Quan | Jingyuan |
| 彭延思 | Peng Yansi |  |
| 楚棠 | Chu Tang | Nianyuan |
| 汪楫 | Wang Ji | Zhenyu |
| 彭涣 | Peng Huan | Chengmu |
| 雷殷 | Lei Yin | Junxiang |
| 沈含英 | Shen Hanying | Canrong |
| 许秋生 | Xu Qiusheng | Wenzhan |
| 江蓠 | Jiang Li | Zhihua |
| 道永 | Daoyong |  |
| 慧木 | Huimu |  |
| 叶添灯 | Ye Tiandeng | Zhao |
| 叶泊秋 | Ye Boqiu |  |
| 裴元 | Pei Yuan |  |
| 高垣 | Gao Yuan | Huaiqing |
| 高堑 | Gao Qian | Digu |
| 宣杨 | Xuan Yang | Youyin |
| 宣康 | Xuan Kang | Shuliang |
| 穆津 | Mu Jin | Xingbei |
| 叶曙兮 | Ye Shuxi | Qingran |
| 叶忱 | Ye Chen |  |
| 冉琼如 | Ran Qiongru | Shuxia |
| 颜弥 | Yan Mi | Zhimiao |
| 李庭沄 | Li Tingyun | Sixun |
| 孟雪萦 | Meng Xueying |  |
| 李翰屏 | Li Hanping | Yanzhou |
| 李翰昕 | Li Hanxin | Yanxuan |
| 赵盈贞 | Zhao Yingzhen |  |
| 赵廷之 | Zhao Tingzhi |  |
