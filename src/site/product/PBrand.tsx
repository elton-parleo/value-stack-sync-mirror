import type { CSSProperties } from "react";
import { useOnce } from "../kit";
import { App, Icon, Mark } from "../v4kit";
import { Card, Opener, Points, Still } from "./six";

/* Brand and content. H&M sells two Oversized Twill Trench Coats under one name, and 7 of 24 price
   answers treated the $69.99 coat as a markdown of the $99 one. Materials and article numbers from
   hm.com, from Parleo's H&M research. */
type Coat = { art: string; col: string; price: string; shell: string; rec: string; cut: string; note: string };
const COATS: Coat[] = [
  { art: "1355447002", col: "Dark taupe", price: "$69.99", shell: "65% polyester, 35% cotton", rec: "At least 54% recycled polyester", cut: "a", note: "Its own product, not a markdown of 1360428001" },
  { art: "1360428001", col: "Beige", price: "$99.00", shell: "67% polyester, 26% rayon, 7% wool", rec: "At least 11% recycled polyester", cut: "b", note: "Its own product, rated 3.0 from 2 reviews" },
];
const MIX: [string, number, string][] = [
  ["Perplexity", 6, "6"],
  ["Gemini", 1, "1"],
  ["ChatGPT", 0, "0 of its 6"],
];
const ISS = [
  { k: "Live offer left out", d: "7 of 43 knitwear price answers named the Knitwear Deal that was running." },
  { k: "Price said to be missing", d: "8 of 8 Copilot price answers said hm.com showed no price, then estimated one." },
];

function Records() {
  const [ref, on] = useOnce<HTMLDivElement>(0.15);
  return (
    <div className={`wrap wrap--wide br8 ${on ? "is-on" : ""}`} ref={ref}>
      <div className="br8__body c8-dark">
        <aside className="br8__stm">
          <span className="k8">Products kept apart</span>
          <div className="cn8__n">
            <b>7</b>
            <span>of 24 price answers mixed up two coats</span>
          </div>
          <p className="cn8__find">One name, two coats. Assistants read the $69.99 coat as a markdown of the $99 one.</p>
          <span className="k8">Who mixed them up</span>
          <div className="br8__mix">
            {MIX.map(([a, n, lab]) => (
              <div key={a} className="br8__bar">
                <span>
                  <App a={a} size={15} /> {a}
                </span>
                <i>
                  <u style={{ width: `${(n / 6) * 100}%` }} />
                </i>
                <b>{lab}</b>
              </div>
            ))}
          </div>
          <p className="cn8__why">ChatGPT, citing each coat&rsquo;s own page, never mixed them up.</p>
        </aside>
        <div className="br8__panel">
          <header className="br8__h">
            <Mark k="hm" h={13} title="H&M" />
            <b>Oversized Twill Trench Coat</b>
            <span className="chip8 chip8--bad">
              <i /> Same name
            </span>
          </header>
          <div className="br8__pair">
            {COATS.map((c, i) => (
              <div key={c.art} className={`br8__rec ${i === 1 ? "is-b" : ""}`} style={{ ["--d" as string]: `${0.15 + i * 0.15}s` } as CSSProperties}>
                <span className="br8__art">Art. {c.art}</span>
                <b className="br8__price">{c.price}</b>
                <span className="br8__col">
                  <i style={{ background: i === 0 ? "#6b5a48" : "#cdb79a" }} /> {c.col}
                </span>
                <dl>
                  <div>
                    <dt>Shell</dt>
                    <dd>{c.shell}</dd>
                  </div>
                  <div>
                    <dt>Recycled</dt>
                    <dd>{c.rec}</dd>
                  </div>
                </dl>
                <span className="br8__kept">
                  <Icon n="check" size={12} /> {c.note}
                </span>
              </div>
            ))}
            <span className="br8__ne" aria-hidden="true">
              &ne;
            </span>
          </div>
          <ul className="br8__iss">
            {ISS.map((x) => (
              <li key={x.k}>
                <Icon n="warn" size={13} />
                <b>{x.k}.</b> {x.d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PBrand() {
  return (
    <section className="sec pdc ch6" id="brand">
      <Opener lead="One version of your brand," more="the way agents read it.">
        Your names, sizes, materials and claims, settled in one place and approved by your teams, <b>so agents stop mixing up products that share a name.</b>
      </Opener>
      <Still img="v5/trench" alt="Two H&M Oversized Twill Trench Coats on a wooden rack against a sunlit plaster wall, each with a paper tag" pos="50% 45%" ratio={2.1}>
        <Card x={3.5} y={12} w={330} className="br6__ans">
          <header className="c6__h br8a__h">
            <App a="Perplexity" size={16} />
            <span>
              <b>Perplexity</b> on the trench price
            </span>
            <span className="chip8 chip8--bad">
              <i /> Wrong coat
            </span>
          </header>
          <div className="br8a__read">
            <span className="br8a__was">$99.00</span>
            <span className="br8a__now">$69.99</span>
            <em>read as a sale</em>
          </div>
          <p className="br8a__said">Treated the $69.99 coat as a markdown of the $99 one. They are two different products.</p>
        </Card>
        <Card x={36.5} y={47} w={214} d={0.25} className="br6__tag">
          <span className="br6__art">Art. 1355447002</span>
          <b>$69.99</b>
          <span>65% polyester, 35% cotton</span>
        </Card>
        <Card x={77} y={64} w={214} d={0.4} className="br6__tag">
          <span className="br6__art">Art. 1360428001</span>
          <b>$99.00</b>
          <span>67% polyester, 26% rayon, 7% wool</span>
        </Card>
        <span className="br6__name" aria-hidden="true">
          <Mark k="hm" h={13} title="H&M" /> Two coats, one name: Oversized Twill Trench Coat
        </span>
      </Still>
      <Points
        items={[
          { i: "record", k: "One name per product", d: "Article numbers, colours and materials kept apart, so two products never blur into one." },
          { i: "check", k: "Claims your teams approve", d: "Sustainability, sizing and care claims stated once, the way legal signed them off." },
          { i: "eye", k: "Pages agents can index", d: "Every product page checked for what blocks an agent from reading it." },
        ]}
        note="H&M, from Parleo research. Materials and prices from hm.com."
      />
      <Records />
    </section>
  );
}
