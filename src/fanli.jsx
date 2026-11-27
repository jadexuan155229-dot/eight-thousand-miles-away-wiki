import { T } from "./theme";
import { EVENTS } from "./wiki-data";

/* ============================================================
   凡例（fanli.jsx）——中文版之 #/about：說明站上的體例，供中文讀者翻檢。
   英文版同一路由是 About（about.jsx），向英文讀者交代唐代背景與剑三來源；兩頁各為其讀者而寫，不互譯。
   用字：凡例說明怎麼讀這個站，屬界面，用繁體（作者 2026-11-27 定：界面一律繁體、數據保持簡體）；
   引數據原文處（括注、編號、年號寫法、人名）照原樣用簡體，置於引號內——同群像說明引作者文稿篇名之例。
   年表條數由數據實算，增刪事件不必回改此頁。
   初稿 2026-11-28，逐條待作者審定（見 docs/fanli-review.md）。
   ============================================================ */

const NUM = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const cn = (n) => (n <= 10 ? NUM[n - 1] : n < 20 ? `十${NUM[n - 11] ?? ""}` : `${NUM[Math.floor(n / 10) - 1]}十${n % 10 ? NUM[n % 10 - 1] : ""}`);

const H = ({ children }) => (
  <h2 style={{ fontFamily: "HuiwenMingChao", fontSize: 20, fontWeight: 400, color: T.ink, margin: "34px 0 12px", paddingBottom: 6, borderBottom: `1px solid ${T.line}`, letterSpacing: "0.08em" }}>{children}</h2>
);
/* 條目：條號懸於左（留三字寬、不折行，「二十七」亦一行），正文齊頭；條號連貫全篇，同古書凡例 */
const Item = ({ n, children }) => (
  <p style={{ display: "flex", gap: 12, margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.8, color: T.ink }}>
    <span aria-hidden="true" style={{ flex: "0 0 3.2em", whiteSpace: "nowrap", textAlign: "right", color: T.muted, fontFamily: "HuiwenMingChao" }}>{cn(n)}</span>
    <span style={{ flex: 1 }}>{children}</span>
  </p>
);
/* 引數據原文：照原樣（簡體），淡一階以別於說明文字 */
const Q = ({ children }) => <span style={{ color: T.muted }}>{children}</span>;

const Lk = ({ to, onNav, children }) => (
  <button type="button" onClick={() => onNav(to)}
    style={{ font: "inherit", color: T.accent, background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textDecorationColor: `${T.accent}66`, textUnderlineOffset: 3 }}>
    {children}
  </button>
);
const Lead = ({ children }) => <p style={{ margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.8, color: T.ink }}>{children}</p>;

/* 各節：[節名, 節首說明（可無）, 諸條]；條號連貫全篇，於渲染時依序給出 */
function sections(L, total, hist) {
  return [
    ["史實與虛構", null, [
      <>年表共 {total} 條，其中 {hist} 條標作「史實」，是史書所載之事；其餘出自小說。史實條目多據《資治通鑑》，括注卷次，如<Q>「（《通鉴》卷220）」</Q>。</>,
      <>小說與史實相牴觸處，依史改正，並於括注說明，如<Q>「据史与文档改」</Q>。</>,
      <>輿圖依唐代政區，分道、州、郡。人物出身、事發之地，皆取當時地名。</>,
      <>門派取自遊戲《剑网三》；人物多為作者所造，少數取自遊戲本事。</>,
    ]],
    ["紀年", null, [
      <>年份先列公元，年號附後，如<Q>「720（开元八年）」</Q>。</>,
      <>天寶三載至至德二載，史書紀年作「載」；本站從原稿，一律作「年」。</>,
      <>月為農曆月。不記月者，列於當年諸事之首；按月分組時，歸「月份未標」。</>,
      <>同月數事，以字母分先後：<Q>756.1A、756.1B</Q>……括注即以此互指，如<Q>「见755.12A1」</Q>。</>,
    ]],
    ["括注", "年表與檔案裡的括注，多是作者整理時的按語，不屬故事本身。", [
      <><Q>「（按：……）」</Q>說明取捨：原稿幾處說法不一，從哪一處、為何，如<Q>「（按：文档一处作754入冬，然同段又言……兹从关系库私情边753之起点）」</Q>。</>,
      <><Q>「作者定」</Q>：原稿未寫明，作者另行裁定。</>,
      <><Q>「推定」「系年约」「月份推定」</Q>：據上下文推得，原稿與史料皆無明文。</>,
      <><Q>「待核」「月份待核」「俟核」</Q>：尚待核實。</>,
      <><Q>「约」</Q>：年份或歲數為約數。</>,
      <><Q>「文档」</Q>指作者的工作文稿，<Q>「Notion」</Q>指作者的設定庫，<Q>「关系库」</Q>指人物關係庫。</>,
    ]],
    ["人物檔案", null, [
      <>每人一卡：姓名、表字或別號、稱號、品評印（一字）、生卒、出身、門派。點開即檔案：名字訓詁，及官職身份、體貌特徵、性格、偶像、武學、隨身物件、喜好、專擅八目，原稿未寫者不列；另有高光、軼事、任職履歷、關係、同事人物、所繫之事、見於文庫諸欄，有則出。</>,
      <>檔案與年表細節不一處，以年表為準。</>,
      <>關係出自人物關係庫，注起訖之年；「歿後」指關係在一方死後仍在延續。年份後注「（約）」者為約數。</>,
      <>「同事人物」計兩人共見於年表之事；「見於文庫」以本名在正文中計數，表字、別號不計。</>,
    ]],
    ["諸圖", null, [
      <><L to="timeline">事件年表</L>按年號分段，可依門派、人物、族屬／地屬篩選。</>,
      <><L to="map">山河輿圖</L>以環標事發之地；選人可看其行跡先後，至多三人。</>,
      <><L to="network">行星關係圖</L>以<Q>闵方城</Q>、<Q>程凯</Q>為雙星，餘人依與二人共見之事遠近環繞。<L to="community">群像網絡</L>列全部關係，依門派聚類，拖動滑桿可觀關係之始終。</>,
      <>門派色：色即門派，諸圖通用；年表「門派色例」可查。</>,
      <><L to="posts">編制</L>：實帶＝正授、署理、暫任；虛線＝代領、兼領、充任、停職、無名目；細線＝出征差遣，不佔編制；印紅小點＝待核。</>,
    ]],
    ["餘波", null, [
      <><L to="echoes">餘波</L>是作者按，與年表的事實層分開：擇數件籠罩多人的事為震源，每行一人，寫他與此事的位置（在場姿態），與事後如何帶著它過下去（記憶方式）。</>,
      <>圖上節點：實心＝年表條目，空心＝年表以外（人物卡、關係、文稿）。標「待核」者為起草待核，作者尚未逐行核定。</>,
    ]],
    ["文庫", null, [
      <><L to="novel">文庫</L>收原稿正文。正文中的人名可點，頁邊即出其檔案批註。</>,
    ]],
    ["文字", null, [
      <>界面用繁體；人名、地名、年號、年表、檔案、正文，照原稿用簡體。</>,
    ]],
  ];
}

export default function Fanli({ onNav }) {
  const total = EVENTS.length;
  const hist = EVENTS.filter((e) => e.fac?.includes("史实")).length;
  const L = (p) => <Lk {...p} onNav={onNav} />;
  let n = 0;
  const numbered = sections(L, total, hist).map(([title, lead, items]) => [title, lead, items.map((it) => [++n, it])]);
  return (
    <article lang="zh" style={{ maxWidth: 720, margin: "0 auto", fontFamily: "HuiwenZhengKai", color: T.ink }}>
      <h1 style={{ fontFamily: "HuiwenMingChao", fontSize: 30, fontWeight: 400, margin: "4px 0 18px", letterSpacing: "0.2em" }}>凡例</h1>
      <Lead>《八千里路》是一部長篇小說。本站是它的工作檔案：寫作所據的人物、繫年、地理與關係，連同原稿正文，盡列於此，供人翻檢。以下說明站上的體例。</Lead>
      {numbered.map(([title, lead, items]) => (
        <section key={title}>
          <H>{title}</H>
          {lead && <Lead>{lead}</Lead>}
          {items.map(([k, it]) => <Item key={k} n={k}>{it}</Item>)}
        </section>
      ))}
    </article>
  );
}
