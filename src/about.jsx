import { T } from "./theme";

/* ============================================================
   About（about.jsx）——英文版獨有的一頁：向英文讀者交代作品的唐代背景與剑网三來源。
   中文讀者自帶此語境，中文界面不列此頁；直達 #/about 者亦見英文（本頁為英文讀者而寫）。
   作者 2026-11-22 定：唐代背景與剑三來源都要讲，可以充分、略長。
   文中門派名依 i18n/factions.en.js（Notion 剑三门派总表），地名依 i18n/places.en.js。
   ============================================================ */

const P = ({ children }) => (
  <p style={{ margin: "0 0 14px", fontSize: 15.5, lineHeight: 1.75, color: T.ink }}>{children}</p>
);
const H = ({ children }) => (
  <h2 style={{ fontFamily: "HuiwenMingChao", fontSize: 20, fontWeight: 400, color: T.ink, margin: "34px 0 12px", paddingBottom: 6, borderBottom: `1px solid ${T.line}` }}>{children}</h2>
);
const Zh = ({ children }) => <span lang="zh">{children}</span>;
const I = ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>;

/* 各頁簡介：可點，直接跳去 */
const SECTIONS = [
  ["chars", "Characters", "a profile for each person: name and courtesy name (the zi, the name used among equals), an epithet, a one-character appraisal stamped as a seal, a note on the name and its classical allusions, and eight standing headings from position and appearance to the things they carry. Under Posts, each army’s appointments are charted year by year."],
  ["timeline", "Timeline", "the chronology, in sections by reign era, filtered by faction or by person."],
  ["map", "Map", "a hand-drawn sketch map of the Tang empire. Rings mark where events take place; routes trace where up to three people were, and in what order."],
  ["network", "Orbital Relations", "Min Fangcheng and Cheng Kai as a binary star, with everyone else in orbit at a distance set by the events they share with each."],
  ["community", "Character Network", "every recorded relationship, clustered by faction, with a slider to watch them begin and end over the years."],
  ["echoes", "Aftershocks", "the author’s gloss: a handful of events that hang over many lives, and how each person carries them afterwards. It is kept apart from the factual record."],
  ["novel", "Library", "the manuscript itself, in Chinese."],
];

export default function About({ onNav }) {
  return (
    <article lang="en" style={{ maxWidth: 720, margin: "0 auto", fontFamily: "HuiwenZhengKai", color: T.ink }}>
      <h1 style={{ fontFamily: "HuiwenMingChao", fontSize: 30, fontWeight: 400, margin: "4px 0 18px" }}>About this archive</h1>

      <P>
        <I>Eight Thousand Miles Away</I> (<Zh>八千里路</Zh>) is a long work of fiction written in Chinese. This site is its working archive: the people, dated events, places and relationships the stories are built on, set out so that they can be explored rather than read in order. The archive’s own name is <I>Characters: Archive</I> (<Zh>人山人海 · 档案</Zh>); the manuscript at its centre is <I>The Soldier, the Assassin and the Physician</I> (<Zh>士兵、杀手和大夫</Zh>).
      </P>

      <H>A Tang setting</H>
      <P>
        The stories run from 715 to 800: from the third year of Kaiyuan, early in the reign of Emperor Xuanzong, to the sixteenth year of Zhenyuan. At their centre is the An Lushan Rebellion. In the winter of 755 An Lushan, who commanded the armies of the north-eastern frontier, turned them against the dynasty; within months both capitals had fallen and the emperor had fled, and the war took until 763 to end. The Tang survived, but the empire that came out of the war was poorer, more divided, and governed in large part by the frontier generals who had fought it.
      </P>
      <P>
        Much of the work is set on the northern frontier. Yanmen Pass (<Zh>雁门关</Zh>), in the mountains of what is now northern Shanxi, was one of the gates between the Chinese heartland and the steppe, and it is where the Cangyun Army keeps its garrison. Other storylines move between Chang’an and Luoyang, through Taiyuan and the cities of Hebei that the rebellion overran, out to the Western Regions, and as far as Nara.
      </P>
      <P>
        History runs through the archive alongside invention. The chronology marks recorded events as <I>Historical record</I>; the map follows Tang administrative geography; dates are given both as years AD and in Tang reign eras, and months follow the lunar calendar (the 10th month, not October).
      </P>

      <H>The world of JX Online 3</H>
      <P>
        The other foundation is a game. <I>JX Online 3</I> (<Zh>剑侠情缘网络版叁</Zh>, usually <I>JX3</I> or <Zh>剑网三</Zh>) is a Chinese martial-arts MMORPG made by Kingsoft’s Seasun studio and running since 2009. It sets the world of wuxia, the martial-arts fiction of the <I>jianghu</I> with its fighting schools, wandering swordsmen, loyalties and feuds, inside a carefully reconstructed Tang dynasty of the Kaiyuan and Tianbao years, and takes its players into the An Lushan Rebellion, where An Lushan’s forces appear as the Langya Army (<Zh>狼牙军</Zh>).
      </P>
      <P>
        Every player in JX3 belongs to one of its sects (<I>menpai</I>, <Zh>门派</Zh>). The English word is a loose fit: some sects are martial schools, some are religious orders or great families, and some are armies. The Tiance Command keeps its headquarters on Mount Beimang outside Luoyang; the Cangyun Army, which joined the game in 2014, holds Yanmen Pass in the snow. The work began from that image: the Cangyun fortress at the pass, under snow.
      </P>
      <P>
        The archive takes its sects from the game. They give each person a home, a fighting art and a colour, and those colours run through every chart on this site. A few figures also come from the game’s own lore, among them Xue Zhi, commander of the garrison at Yanmen. Nearly everyone else is the author’s own, including the two people at the centre of the work, Min Fangcheng of the Cangyun Army and Cheng Kai of the Tiance Command; so are their lives and their relationships, and so are most of the events that are not historical record. No knowledge of the game is needed to read the archive.
      </P>

      <H>How to read the archive</H>
      <div style={{ margin: "0 0 14px" }}>
        {SECTIONS.map(([tab, name, text]) => (
          <p key={tab} style={{ margin: "0 0 10px", fontSize: 15.5, lineHeight: 1.7, color: T.ink }}>
            <button type="button" onClick={() => onNav(tab)}
              style={{ fontFamily: "HuiwenMingChao", fontSize: 15.5, color: T.accent, background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textDecorationColor: `${T.accent}66`, textUnderlineOffset: 3 }}>
              {name}
            </button>
            {" "}— {text}
          </p>
        ))}
      </div>

      <H>About the English edition</H>
      <P>
        The English edition is being built in stages. The interface is in English throughout; profiles and the chronology are being translated a character at a time, beginning with the people at the centre of the work, and anything not yet translated appears in the original Chinese. The novel itself is not being translated for now.
      </P>
      <P>
        Names are given in pinyin, family name first. Not everyone in the archive is Han Chinese, though. Where the Chinese characters only write down a name from another language, the person appears under that name: the Persian Rādīn, the Miao Nyax Vos, the Japanese Hayashi Kyōya. Where someone holds a Chinese name as well as another, the profile gives the second alongside it, as an original Persian name or a Japanese reading. The sects are named on one consistent scheme (Wanhua Valley, the Tiance Command, the Beggars’ Guild and so on). Official titles follow Charles O. Hucker, <I>A Dictionary of Official Titles in Imperial China</I> (1985).
      </P>
    </article>
  );
}
