#!/usr/bin/env python3
"""按字符表重裁汇文明朝、汇文正楷、京华老宋，并按字频切片 (scripts/subset-fonts.py)

平常用 npm run fonts：先补字符表（font-chars.js），再跑本档。
单跑：python3 scripts/subset-fonts.py [--source 目录] [--reslice]

依赖：pip install fonttools brotli
完整字体：明朝、正楷于 2026-08-08 子集化（548e2c4）时、老宋于 11-05 子集化时
自库中删除，本档一律自 3ea7e16（08-08 子集化前一版，三枚完整版俱在，老宋与
删除前逐字节相同）的 git 历史取出，不另存档；浅克隆缺此版时自动 git fetch 取回。
亦可 --source 指一个放有 HuiwenMingChao.woff2、HuiwenZhengKai.woff2、
JingHuaLaoSong.woff2 完整版的目录，不读 git。
裁法即 pyftsubset 默认参数加 woff2，与 548e2c4 所出子集同配置
（GSUB 留 frac/vert/vrt2，name 留 0–6）。

切片（2026-11-26 起）：三枚原各是一个整文件（明朝 3.7 MB），页上只要用到一个字，
浏览器就整个下完，中文版首访要下 6.7 MB 字体。今把字符表切成若干片，
每片一个 woff2，各写一条 @font-face（同字族名、各带 unicode-range），
浏览器只下页上用到的那几片。三枚字体各切各的（明朝在页上只用四百来字，正楷用三千多字）：
  - 排字先后：先是该字体在页上用到的字，按「出现在几个页面上」由多到少
    （取自 scripts/font-usage.json，由 node scripts/font-usage.js 逐页实测）；
    再是字符表里其余的字，按源码字频（剔除代码注释）；最后是只见于代码注释的字（页上不显示，永不下载）。
  - 第 0 片：ASCII 加排在最前的 CORE 个字；其后每片 STEP 个字。
切法存于 scripts/font-slices.json。字符表补了新字，只追加到各字体的末片（满 STEP 另开新片），
已有各片不动、文件逐字节不变，免得每补一字整套字体重新入库。
要整套重切：先 node scripts/font-usage.js 重测用字，再加 --reslice。
产出：src/assets/fonts/cjk/<字体>-<片号>.woff2，与 src/assets/fonts/cjk-faces.css
（index.css 开头 @import）。
"""
import argparse
import collections
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
CHAR_LIST = ROOT / "scripts" / "font-subset-chars.txt"
SLICES = ROOT / "scripts" / "font-slices.json"
USAGE = ROOT / "scripts" / "font-usage.json"
FONT_DIR = ROOT / "src" / "assets" / "fonts"
OUT_DIR = FONT_DIR / "cjk"
CSS_OUT = FONT_DIR / "cjk-faces.css"
FONTS = ["HuiwenMingChao", "HuiwenZhengKai", "JingHuaLaoSong"]
FULL_REV = "3ea7e1664c8a81975ed6e89bbfea0fb7f98baa40"
CORE, STEP = 300, 150
SCAN_EXTS = {".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".txt", ".md", ".json"}


def git_show(path):
    return subprocess.run(["git", "show", f"{FULL_REV}:{path}"], cwd=ROOT, capture_output=True)


def full_font(name, tmp, source):
    if source:
        p = Path(source) / f"{name}.woff2"
        if not p.exists():
            sys.exit(f"--source 目录里没有 {p.name}")
        return p
    path = f"src/assets/fonts/{name}.woff2"
    r = git_show(path)
    if r.returncode != 0:
        print(f"本地 git 历史里没有 {FULL_REV[:7]}，取回该版……")
        subprocess.run(["git", "fetch", "--depth=1", "origin", FULL_REV], cwd=ROOT, check=True)
        r = git_show(path)
        if r.returncode != 0:
            sys.exit(f"取不到完整字体 {path}：{r.stderr.decode().strip()}")
    p = Path(tmp) / f"{name}.woff2"
    p.write_bytes(r.stdout)
    return p


def site_frequency(want):
    """站内文字之字频（剔除代码注释；生成的 cjk-faces.css 不计）"""
    cnt = collections.Counter()
    files = [p for p in (ROOT / "src").rglob("*") if p.is_file() and p.suffix in SCAN_EXTS and p != CSS_OUT]
    files.append(ROOT / "index.html")
    for p in files:
        s = p.read_text(encoding="utf-8")
        if p.suffix in {".js", ".jsx", ".ts", ".tsx", ".css"}:
            s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
            s = re.sub(r"(?<![:\"'])//[^\n]*", "", s)
        cnt.update(ord(ch) for ch in s if ord(ch) in want)
    return cnt


def plan_slices(want, reslice):
    """返回 {字体: [切片字串, ...]}。有存档且不 --reslice：已有各片不动，新字追加到各字体末片"""
    if SLICES.exists() and not reslice:
        plan = json.loads(SLICES.read_text(encoding="utf-8"))["fonts"]
        cnt = None
        for name in FONTS:
            slices = plan[name]
            have = {ord(c) for s in slices for c in s}
            new = sorted(want - have)
            if not new:
                continue
            cnt = cnt or site_frequency(want)
            new.sort(key=lambda c: -cnt[c])
            for c in new:
                if len(slices[-1]) >= STEP:
                    slices.append("")
                slices[-1] += chr(c)
            print(f"{name}：字符表新字 {len(new)} 个，追加到末片：{''.join(map(chr, new))}")
        return plan
    if not USAGE.exists():
        sys.exit("整套重切须先有 scripts/font-usage.json：跑 node scripts/font-usage.js")
    usage = json.loads(USAGE.read_text(encoding="utf-8"))["fonts"]
    cnt = site_frequency(want)
    ascii_ = sorted(c for c in want if c < 0x80)
    plan = {}
    for name in FONTS:
        pages = {ord(ch): n for ch, n in usage.get(name, {}).items()}
        rest = sorted((c for c in want if c >= 0x80), key=lambda c: (-pages.get(c, 0), -cnt[c], c))
        seen = [c for c in rest if pages.get(c)]
        other = [c for c in rest if not pages.get(c) and cnt[c]]
        unused = sorted(c for c in rest if not pages.get(c) and not cnt[c])  # 只在注释里出现者
        order = seen + other + unused
        slices = ["".join(map(chr, ascii_ + order[:CORE]))]
        for i in range(CORE, len(order), STEP):
            slices.append("".join(map(chr, order[i:i + STEP])))
        plan[name] = slices
        print(f"{name}：整套重切 {len(slices)} 片（页上实用 {len(seen)} 字，源码另见 {len(other)} 字，只见于注释 {len(unused)} 字）")
    return plan


def ranges(cps):
    """码位集合 → unicode-range 字串（连号合并）"""
    out, cps = [], sorted(cps)
    i = 0
    while i < len(cps):
        j = i
        while j + 1 < len(cps) and cps[j + 1] == cps[j] + 1:
            j += 1
        out.append(f"U+{cps[i]:X}" if i == j else f"U+{cps[i]:X}-{cps[j]:X}")
        i = j + 1
    return ", ".join(out)


def subset_to(src, unicodes, out_path, flavor):
    opts = subset.Options()
    opts.flavor = flavor
    font = TTFont(src, recalcTimestamp=False)  # 不改 head 之修改时间：同样的字裁出同样的文件，重跑不生差异
    sub = subset.Subsetter(options=opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor = flavor
    font.save(out_path)
    font.close()


def main():
    ap = argparse.ArgumentParser(description="按字符表重裁汇文明朝、汇文正楷、京华老宋，并按字频切片")
    ap.add_argument("--source", help="完整字体所在目录（不读 git 历史）")
    ap.add_argument("--reslice", action="store_true", help="按最新字频整套重切（否则已有各片不动）")
    args = ap.parse_args()

    want = {ord(c) for c in CHAR_LIST.read_text(encoding="utf-8") if c != "\n"}
    plan = plan_slices(want, args.reslice)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    keep, css = set(), []
    with tempfile.TemporaryDirectory() as tmp:
        for name in FONTS:
            src = full_font(name, tmp, args.source)
            full_cmap = set(TTFont(src).getBestCmap())
            # 先裁到整张字符表（未压缩），各片再从此裁出：省去每片重读整枚完整字体
            base = Path(tmp) / f"{name}.base.ttf"
            subset_to(src, sorted(want & full_cmap), base, None)
            got, total, n = set(), 0, 0
            for i, chars in enumerate(plan[name]):
                cps = {ord(c) for c in chars} & full_cmap
                if not cps:
                    continue  # 此片之字本字体一个也没有
                out = OUT_DIR / f"{name}-{i:02d}.woff2"
                subset_to(base, sorted(cps), out, "woff2")
                have = set(TTFont(out).getBestCmap())
                got |= have
                keep.add(out.name)
                total += out.stat().st_size
                n += 1
                css.append(f'@font-face {{\n  font-family: "{name}";\n  src: url("./cjk/{out.name}") format("woff2");\n'
                           f"  font-display: swap;\n  unicode-range: {ranges(have & cps)};\n}}")
            lost = want & full_cmap - got
            if lost:
                sys.exit(f"{name}：字体里有却没裁进切片的字 {''.join(map(chr, sorted(lost)))}")
            absent = "".join(chr(c) for c in sorted(want - full_cmap) if c > 0x7F)
            print(f"{name}：{n} 片，共 {total / 1e6:.2f} MB，收字 {len(got)}")
            if absent:
                print(f"  字体本身没有、无从裁入的 {len(absent)} 个：{absent}")
    for p in OUT_DIR.glob("*.woff2"):
        if p.name not in keep:
            p.unlink()
    head = ("/* 由 scripts/subset-fonts.py 生成，勿手改。汇文明朝、汇文正楷、京华老宋按站内字频切片，\n"
            "   每片一条 @font-face（同字族名、各带 unicode-range），浏览器只下页上用到的那几片。 */\n")
    CSS_OUT.write_text(head + "\n".join(css) + "\n", encoding="utf-8")
    SLICES.write_text(json.dumps({"core": CORE, "step": STEP, "fonts": plan}, ensure_ascii=False, indent=1) + "\n",
                      encoding="utf-8")
    print(f"写出 {CSS_OUT.relative_to(ROOT)}（{len(css)} 条）与 {SLICES.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
