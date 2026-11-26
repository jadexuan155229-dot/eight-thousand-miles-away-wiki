# 八千里路 · Eight Thousand Miles Away

“人山人海 · 档案”：覆盖整个作品世界的人物档案、事件年表、山河舆图、关系网络和文库的综合资料站。项目从“苍云线”起步，现统一使用全作品品牌；作品内的阵营与故事线名称保持原样。

- 技术名称：`eight-thousand-miles-away-wiki`
- 目标仓库：<https://github.com/jadexuan155229-dot/eight-thousand-miles-away-wiki>
- 目标站点：<https://jadexuan155229-dot.github.io/eight-thousand-miles-away-wiki/>
- 全站界面：`src/wiki.jsx`；全站数据：`src/wiki-data.js`。

目标地址在 GitHub 仓库改名并发布本次修改后生效，迁移步骤见 [项目重命名说明](docs/project-renaming.md)。

## 检查与构建

```bash
npm ci
npm run check-data
npm run lint
npm run build
```

每个 PR、每次推到 main，GitHub Actions 都会自动跑一遍（`.github/workflows/checks.yml`）：资料（`check-data`）、代码（oxlint，警告以 12 条为基线，多出即不过）、字体子集（`node scripts/font-chars.js --check`，有字符表外之字即不过）、构建、前进后退（`check:history`）。任一项不过，PR 页底部显示红叉，点进去看是哪一项；各项互不连坐，一次看全。它与部署各跑各的，不挡部署。

警告真减少了，可把 `checks.yml` 里的 `--max-warnings 12` 一并调低。

## 字体子集

汇文明朝、汇文正楷、京华老宋三枚字体都只带站内用到的字（`scripts/font-subset-chars.txt`），表外之字会回落系统字体。写进新字（新录文库正文、新增人物事件）后若 `check-data` 报「字體子集」警告，跑一次：

```bash
pip install fonttools brotli   # 首次
npm run fonts
```

它先把站内用字补进字符表，再从 git 历史取出完整字体、重裁三枚子集，然后提交字符表和 `src/assets/fonts/` 下变动的文件即可（约五分钟）。

三枚字体按字频切成若干片（`src/assets/fonts/cjk/`，每枚 28 片上下），每片一条带 `unicode-range` 的 `@font-face`（`src/assets/fonts/cjk-faces.css`，脚本生成，勿手改），浏览器只下页上用到的那几片：中文版首访由 6.7 MB 字体降到 1 MB 上下。切法存于 `scripts/font-slices.json`；平常补字只追加到各字体的末片，已有各片不变。站上用字大变（比如新录大量文库正文）之后，可按实测用字整套重切：

```bash
node scripts/font-usage.js                   # 逐页打开站点，记三枚字体各在几页上用到哪些字（需本机 Chrome，约七分钟）
python3 scripts/subset-fonts.py --reslice    # 据此整套重切
```

## 英文版

英文在 <https://jadexuan155229-dot.github.io/eight-thousand-miles-away-wiki/en/>，语言由网址定。英文是叠在中文之上的覆盖层（`src/i18n/`），数据层一字不动，未译之处回落中文。覆盖层里的五张大表（档案、年表、余波、编制、任期，共八百余 KB）另成一块，只在英文界面才下载（`src/i18n/en-bulk.js`），中文读者不必下载。分级、机制、待审清单见 [英文版说明](docs/english-edition.md)。

```bash
npm run i18n:stamp                         # 人物新译后盖戳（中文原文短哈希）
npm run i18n:stamp -- --restamp lvdingyi   # 中文改过、英文核过之后重盖
npm run og                                 # 重截英文预览图 public/og-en.png
```

`npm run check-data` 末尾一行是英译覆盖率；中文改了而英文未核，会报「英文待核」。

## 门派色卡

玄墨、素纸各出一张门派色卡（PNG），存作配色参照：

```bash
npm run swatches                 # 输出到 swatches/（已入 .gitignore）
npm run swatches -- --out 某目录  # 另指输出目录
```

脚本会临时起一个开发服务器，用本机的 Chrome 打开站点，直接调用站内的 `theme.js`、`wiki-data.js` 取色，每格用小卡的绫边样式原样渲染，所以色卡与站上所见一致。页眉记日期与版本号（`src/` 有未提交改动时注明）。每格给出「色」（色条、框线、图表用色）与「字」（门派签字色），素纸版另注玄墨原色及是否手定。找不到 Chrome 时，以 `CHROME_PATH` 指向浏览器：

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run swatches
```

## 链接体例（哈希路由）

页签、打开的人物档案、文库章节都写入网址，可直接分享、刷新不丢、浏览器前进后退可用：

- `#/chars` `#/timeline` `#/map` `#/network` `#/community` `#/echoes` `#/novel` —— 七个页签
- `#/echoes/yanmen745/lifei` —— 余波：震源 / 人物（第三段可省）
- `#/chars/minfangcheng`、`#/timeline/lvdingyi` —— 第二段为打开的人物档案（文库页签除外）
- `#/novel/shengfeng/menqiang/m1` —— 文库章节：线 / 章（有卷则 线 / 卷 / 子章）
- `#/novel` 不带章节时自动回到上次阅读位置（章节及滚动处；分享出去的章节链接则总是从页首开始）

## 自动打开开发服务

使用 VS Code 打开这个项目文件夹时，项目会自动运行开发服务器，终端里会显示可点击的网页链接：

- `Local` 是本机访问地址。
- `Network` 是同一局域网内其他设备可用的地址。

首次打开项目时，如果 VS Code 询问是否允许自动任务，请选择“允许并运行”。

也可以随时手动启动：

```bash
npm run dev
```

停止服务时，在运行服务的终端中按 `Ctrl+C`。
