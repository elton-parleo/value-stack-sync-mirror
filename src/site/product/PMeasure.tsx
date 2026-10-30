import { useState, type CSSProperties } from "react";
import { useOnce } from "../kit";
import { App, Icon, Mark } from "../v4kit";
import { Lead, Revenue, Who } from "./Console";
import { Chapter } from "./ui";
import { Card, Opener, Points, Ring, Still } from "./six";

/* 01 · Measure. Nordstrom, from Parleo's Nordstrom research: Share of Algorithm 70 of 100, and the one
   assistant that recommends Nordstrom on a price match its pricing policy rules out. */
const PILLARS: [string, number, number][] = [
  ["Visibility", 15, 32],
  ["Accessibility", 18, 18],
  ["True Value", 37, 50],
];

/* The Petco workspace, restored from v4: revenue at stake, the lead signal, and the console itself.
   Built from public answers in the week of Sep 30, 2026, modeled where marked. */
const MK: Record<string, string> = { Chewy: "chewy", Petco: "petco", PetSmart: "petsmart", Walmart: "walmart", Amazon: "amazon" };

const TABS = ["Score", "Answers", "Access"];

/* ---------- Score ---------- */
const PICKS: { q: string; kind: string; p: string[] }[] = [
  { q: "best dry dog food for a sensitive stomach", kind: "Category", p: ["Chewy", "Chewy", "Amazon", "Chewy", "PetSmart"] },
  { q: "cheapest place to buy Purina Pro Plan 30 lb", kind: "Value", p: ["Chewy", "Chewy", "Chewy", "Walmart", "Chewy"] },
  { q: "where to buy NexGard PLUS near me", kind: "Where to buy", p: ["Chewy", "Petco", "Bandana Rx", "Chewy", "Petco"] },
  { q: "where can I buy JustFoodForDogs", kind: "Where to buy", p: ["Pet Food Express", "Petco", "Pet Food Express", "JustFoodForDogs.com", "Petco"] },
  { q: "best cat litter for odor control", kind: "Category", p: ["Chewy", "Walmart", "Target", "Chewy", "Walmart"] },
];
const AG = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"];

/* ---------- Answers: quoted against live, with the receipt ---------- */
type Cell = { q: string; live?: string; st: "Wrong" | "Exact" | "Not quoted" };
const STORES = ["Petco", "Chewy", "PetSmart", "Walmart", "Amazon"];
const ROWS: { nm: string; sku: string; prog: string; cells: Cell[]; receipt: { said: string; page: string } }[] = [
  {
    nm: "Purina Pro Plan Sensitive Skin & Stomach, 30 lb",
    sku: "2579466",
    prog: "First Autoship $47.99 on the Purina ladder. Quoted by 0 of 5 agents.",
    cells: [
      { q: "$77.48", live: "$77.99", st: "Wrong" },
      { q: "$77.48", live: "$77.48", st: "Exact" },
      { q: "$79.99", live: "$79.99", st: "Exact" },
      { q: "$77.48", live: "$77.48", st: "Exact" },
      { q: "$79.98", live: "$79.98", st: "Exact" },
    ],
    receipt: { said: "Quotes Chewy's $77.48 as Petco's price.", page: "petco.com: $77.99, and the first Autoship order is $47.99." },
  },
  {
    nm: "Tidy Cats LightWeight 24/7 Performance, 17 lb",
    sku: "3089211",
    prog: "First Autoship $17.39 on the Purina ladder. Agents applied the generic 35%: $18.84.",
    cells: [
      { q: "$28.98", live: "$28.98", st: "Exact" },
      { q: "$28.98", live: "$28.98", st: "Exact" },
      { q: "Not quoted", live: "$29.99", st: "Not quoted" },
      { q: "$27.97", live: "$27.97", st: "Exact" },
      { q: "Not quoted", st: "Not quoted" },
    ],
    receipt: { said: "Applies Petco's generic 35% where Purina's 40% ladder makes the first order $17.39.", page: "petco.com: first Autoship $17.39 under the Purina ladder." },
  },
];
const FLAGS = [
  { q: "cheapest place to buy Purina Pro Plan 30 lb", a: "Returns no Petco price at all and applies the generic 35% rule to Chewy.", s: "High" },
  { q: "how much are Greenies dental treats on Autoship", a: "Gives Chewy's first-order price as the monthly price.", s: "Medium" },
];

/* ---------- Access ---------- */
const IDS: [string, string][] = [
  ["GPTBot", "ChatGPT"],
  ["OAI-SearchBot", "ChatGPT"],
  ["ChatGPT-User", "ChatGPT"],
  ["Google-Extended", "Gemini"],
  ["Googlebot", "AI Mode"],
  ["PerplexityBot", "Perplexity"],
  ["Perplexity-User", "Perplexity"],
  ["Bingbot", "Copilot"],
  ["ClaudeBot", "Claude"],
];
const FIND: [string, number][] = [
  ["robots.txt names agents", 0],
  ["Edge lets signed agents in", 0],
  ["Product markup on product pages", 3],
  ["Program price in markup", 0],
  ["GTIN in markup", 2],
  ["Protocol profile (UCP, MCP, llms.txt)", 0],
];


/* ---------- v8: the console's own layout. A navy statement on the left, the evidence on a white panel ---------- */
const STM = [
  { k: "Share of Algorithm, this week", n: "47", of: "of 100", find: "Agents name Petco in 76 answers and pick it first in 18. Chewy gets 56.", why: <><b>$40M a year to competitors, modeled.</b> Most first picks go to Chewy, even where Petco is cheaper.</>, cta: "See every answer" },
  { k: "Quoted against live", n: "0", of: "of 5 agents", find: "Agents quote Petco’s list price and leave out the Autoship price that wins the comparison.", why: <><b>$10M a year missed on price and offer, modeled.</b> No agent quoted a program price on the tracked products.</>, cta: "See every cell" },
  { k: "Plain agent requests", n: "0", of: "of 18 let in", find: "Cloudflare and DataDome answer every plain agent request with a 403.", why: <><b>Agents can’t recommend what they can’t read.</b> Signed agents should get the catalog.</>, cta: "See the request log" },
];

function ScorePanel() {
  return (
    <div className="cp8">
      <div className="cp8__h">
        <b>Who each agent picks first</b>
        <span className="cp8__lg">
          <i className="is-you" /> Petco
        </span>
      </div>
      <div className="cp8__grid" role="table">
        <div className="cp8__row cp8__row--h" role="row">
          <span role="columnheader" />
          {AG.map((a) => (
            <span key={a} role="columnheader" title={a}>
              <App a={a} size={14} />
            </span>
          ))}
        </div>
        {PICKS.map((r) => (
          <div key={r.q} className="cp8__row" role="row">
            <span role="cell" className="cp8__q">
              {r.q}
            </span>
            {r.p.map((p, i) => (
              <span key={i} role="cell" className={`cp8__c ${p === "Petco" ? "is-you" : ""}`}>
                {MK[p] ? <Mark k={MK[p]} h={9} title={p} /> : <em>{p === "JustFoodForDogs.com" ? "JFFD" : p}</em>}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="cp8__vs">
        {[
          { k: "Chewy", n: 89, f: 56 },
          { k: "Petco", n: 76, f: 18, you: true },
        ].map((r) => (
          <div key={r.k} className={`cp8__bar ${r.you ? "is-you" : ""}`}>
            <Mark k={MK[r.k]} h={11} title={r.k} />
            <i style={{ ["--n" as string]: r.n / 89, ["--f" as string]: r.f / 89 } as CSSProperties}>
              <s />
              <u />
            </i>
            <b>
              {r.f}
              <small> first of {r.n} named</small>
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnswersPanel() {
  const rows: [string, number, number][] = [
    ["ChatGPT", 31, 33],
    ["Gemini", 14, 23],
    ["AI Mode", 17, 19],
    ["Perplexity", 6, 8],
    ["Copilot", 4, 5],
  ];
  return (
    <div className="cp8">
      <div className="cp8__h">
        <b>List price quoted exactly, per agent</b>
        <span className="cp8__lg">
          <i className="is-ok" /> Exact <i className="is-bad" /> Wrong or left out
        </span>
      </div>
      <ul className="cp8__agents">
        {rows.map(([a, x, n], i) => (
          <li key={a} style={{ ["--p" as string]: x / n, ["--d" as string]: `${i * 0.08}s` } as CSSProperties}>
            <span>
              <App a={a} size={15} /> {a === "AI Mode" ? "AI Mode" : a}
            </span>
            <i>
              <u />
            </i>
            <b>
              {x}
              <small> of {n}</small>
            </b>
          </li>
        ))}
      </ul>
      <div className="cp8__rc">
        <span className="cp8__thumb">
          <img src="/img/v4/cut/proplan30.webp" alt="" />
        </span>
        <div>
          <span className="cp8__rk">Pro Plan Sensitive Skin &amp; Stomach, 30 lb</span>
          <p>
            <s>$77.48 quoted</s> <b>$77.99 live</b> <em className="chip8 chip8--blue">First Autoship $47.99</em>
          </p>
        </div>
      </div>
    </div>
  );
}

function AccessPanel() {
  return (
    <div className="cp8">
      <div className="cp8__h">
        <b>Each agent identity</b>
        <span className="cp8__lg">
          <i className="is-bad" /> Refused at the edge
        </span>
      </div>
      <ul className="cp8__ids">
        {IDS.map(([id, ag], i) => (
          <li key={id} style={{ ["--d" as string]: `${i * 0.05}s` } as CSSProperties}>
            <App a={ag} size={14} />
            <code>{id}</code>
            <em>403</em>
          </li>
        ))}
      </ul>
      <div className="cp8__finds">
        {FIND.slice(0, 4).map(([k, n]) => (
          <div key={k}>
            <span>{k}</span>
            <b>{n} of 3</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PMeasure() {
  const [tab, setTab] = useState(0);
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  return (
    <Chapter id="measure" tone="cool" className="ch6">
      <span id="answers" className="anchor" />
      <span id="access" className="anchor" />
      <Opener lead="One number for how AI" more="treats your brand.">
        Share of Algorithm scores whether assistants recommend you, whether they can read your site, and whether they get your real offer right, out of 100, every week. <b>Then every answer sits next to your own page, so you see exactly what went wrong.</b>
      </Opener>
      <Still img="v6/measure" alt="A bottle of Baccarat Rouge 540 on a travertine shelf in late sun, a paper tag on blue thread" pos="50% 50%" ratio={2.3} scan={{ box: [0.61, 0.185, 0.835, 0.835], label: "Baccarat Rouge 540 · Nordstrom" }}>
        <Card x={3.5} y={9} w={300} className="ms6__score">
          <header className="c6__h">
            <Mark k="nordstrom" h={9} title="Nordstrom" />
            <span>Share of Algorithm</span>
          </header>
          <div className="ms6__ring">
            <Ring n={70} />
            <span>
              <b>Found and priced well.</b> Recommended first in 3 of 55 everyday answers.
            </span>
          </div>
          <ul className="ms6__pl">
            {PILLARS.map(([k, n, of]) => (
              <li key={k} style={{ ["--p" as string]: n / of }}>
                <span>{k}</span>
                <i />
                <b>
                  {n}
                  <small>/{of}</small>
                </b>
              </li>
            ))}
          </ul>
        </Card>
        <Card x={29} y={26} w={380} d={0.25} className="ms6__ans">
          <header className="c6__h">
            <App a="Gemini" size={16} />
            <span>Gemini, on where to buy a TravisMathew quarter-zip</span>
          </header>
          <p className="c6__said">&ldquo;Nordstrom price-matches any authorized competitor carrying the exact same color and size.&rdquo;</p>
          <div className="c6__truth">
            <span>
              <Icon n="check" size={13} /> nordstrom.com, pricing policy
            </span>
            <p>&ldquo;We don&rsquo;t price match other retailers.&rdquo;</p>
          </div>
          <footer className="c6__n">
            <b>
              20<small> of 48</small>
            </b>
            <span>Gemini best-seller answers promised a price match</span>
          </footer>
        </Card>
      </Still>
      <Points
        items={[
          { i: "eye", k: "The score", d: "Visibility, access and true value in one number, tracked weekly against your competitors." },
          { i: "readback", k: "Every answer, next to the truth", d: "What each assistant said, word for word, beside what your own page said that day." },
          { i: "lock", k: "Access", d: "Which agents can read your site, and whether your prices and offers are where they look." },
        ]}
        note="Nordstrom, from Parleo research. Answers from five AI assistants, checked against nordstrom.com."
      />
      <div className="wrap wrap--wide m4 m7">
        <Revenue
          total="$50M"
          line="Agents send most pet parents somewhere other than Petco, even where Petco is $10 cheaper."
          by2030={
            <>
              By 2030: up to <b>$87M</b> if agents reach 20% of shopping.
            </>
          }
          today={
            <>
              Today <b>$356M</b> of Petco&rsquo;s sales run through answers that go against it.
            </>
          }
          parts={[
            { k: "Lost to competitors", v: "$40M", d: "Agents put another store first", tone: "lost", w: 40 },
            { k: "Missed on price and offer", v: "$10M", d: "Petco’s best price is missing or wrong", tone: "missed", w: 10 },
            { k: "Gainable with TrueSync", v: "$20M", d: "What fixing the record wins back", tone: "gain", w: 20 },
          ]}
        />
        <Lead
          brand="petco"
          photo="/img/v4/photo/pet_portrait.webp"
          pos="50% 40%"
          chip="From 330 unprompted answers"
          head="Agents name Petco, then recommend Chewy first."
          a={{ who: <Who marks={["petco"]} />, n: "18", of: "of 330", k: "first recommendations", blue: true }}
          b={{ who: <Who marks={["chewy"]} />, n: "56", of: "of 330", k: "first recommendations" }}
          todo="Publish phase 1 Autoship prices on the 14 tracked SKUs, Purina’s ladder included."
          team="Pricing"
          ok="Approved"
        />
      </div>
      <div className={`wrap wrap--wide cn8 ${on ? "is-on" : ""}`} ref={ref}>
        <div className="cn8__bar">
          <span className="cn8__ws">
            <Mark k="petco" h={11} title="Petco" />
            <em>Workspace</em>
          </span>
          <div className="cn8__tabs" role="tablist" aria-label="Measure views">
            {TABS.map((t, i) => (
              <button key={t} type="button" role="tab" aria-selected={tab === i} className={tab === i ? "is-on" : ""} onClick={() => setTab(i)}>
                {t}
              </button>
            ))}
          </div>
          <span className="cn8__ags" aria-hidden="true">
            {AG.map((a) => (
              <App key={a} a={a} size={15} />
            ))}
          </span>
        </div>
        <div className="cn8__body c8-dark" key={tab}>
          <div className="cn8__stm">
            <span className="k8">{STM[tab].k}</span>
            <div className="cn8__n">
              <b>{STM[tab].n}</b>
              <span>{STM[tab].of}</span>
            </div>
            <p className="cn8__find">{STM[tab].find}</p>
            <span className="k8">Why it matters</span>
            <p className="cn8__why">{STM[tab].why}</p>
            <div className="cn8__cta">
              <span className="cn8__b1">
                {STM[tab].cta} <Icon n="arrow" size={13} />
              </span>
              <span className="cn8__b2">
                <Icon n="fork" size={13} /> Fix it in TrueSync
              </span>
            </div>
          </div>
          <div className="cn8__panel">
            {tab === 0 && <ScorePanel />}
            {tab === 1 && <AnswersPanel />}
            {tab === 2 && <AccessPanel />}
          </div>
        </div>
        <p className="ch__note">The Petco workspace, built from public answers and modeled where marked. Yours runs on your own catalog and competitors.</p>
      </div>
    </Chapter>
  );
}
