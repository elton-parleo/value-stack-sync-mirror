import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/primitives";
import Cite from "./Cite";

/* ------------------------------------------------------------------ */
/* Shared frame                                                        */
/* ------------------------------------------------------------------ */

type FrameProps = {
  n: string;
  title: string;
  note?: ReactNode;
  source: ReactNode;
  dark?: boolean;
  children: ReactNode;
  className?: string;
};

/** Editorial figure frame: number, title, plot area, source footnote. */
export const Figure = ({ n, title, note, source, dark = false, children, className = "" }: FrameProps) => (
  <figure className={`gfig ${dark ? "gfig--dark" : ""} ${className}`}>
    <div className="gfig__head">
      <span className="gfig__n">Fig. {n}</span>
      <h3>{title}</h3>
      {note && <p>{note}</p>}
    </div>
    <div className="gfig__plot">{children}</div>
    <figcaption className="gfig__src">{source}</figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* 1. AI traffic growth                                                */
/* ------------------------------------------------------------------ */

const growth = [
  { period: "Nov to Dec 2025", sub: "Holiday", value: 693 },
  { period: "Q1 2026", sub: "Jan to Mar", value: 393 },
  { period: "Mar 2026", sub: "Latest month", value: 269 },
];

export const TrafficGrowthChart = () => {
  const max = 760;
  return (
    <Figure
      n="01"
      title="AI-referred traffic to US retail is compounding, not spiking"
      note="Adobe Analytics tracks more than a trillion visits to US retail sites. Growth decelerated from the holiday peak but remains a multiple of last year, which is what a channel shift looks like rather than a news cycle."
      source={
        <>
          Source: Adobe Digital Insights, April 2026 <Cite id={["adobe", "techcrunch"]} />
        </>
      }
    >
      <div className="gbars">
        {growth.map((g, i) => (
          <div key={g.period} className="gbars__col">
            <div className="gbars__val">
              +{g.value}
              <small>%</small>
            </div>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(g.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.08 * i, ease: EASE }}
              className={`gbars__bar ${i === 0 ? "is-blue" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="gbars__axis">
        {growth.map((g) => (
          <div key={g.period}>
            <b>{g.period}</b>
            <span>{g.sub}, year over year</span>
          </div>
        ))}
      </div>
    </Figure>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Conversion flip                                                  */
/* ------------------------------------------------------------------ */

export const ConversionFlipChart = () => {
  const points = [
    { label: "Mar 2025", value: -38 },
    { label: "Mar 2026", value: 42 },
  ];
  const scale = 58;
  return (
    <Figure
      n="02"
      title="Agent-referred visits went from worst to best converting"
      note="Conversion of AI-sourced visits versus every other channel, including paid search and email. The sign flipped inside twelve months."
      source={
        <>
          Source: Adobe Analytics via Digital Commerce 360, April 2026 <Cite id={["dc360", "adobe"]} />
        </>
      }
    >
      <div className="gflip">
        <div className="gflip__zero">
          <span>parity</span>
        </div>
        {points.map((p, i) => {
          const pct = (Math.abs(p.value) / scale) * 50;
          const up = p.value > 0;
          return (
            <div key={p.label} className="gflip__col">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, delay: 0.1 * i, ease: EASE }}
                className={`gflip__bar ${up ? "is-up" : "is-down"}`}
              />
              <div className="gflip__label" style={up ? { bottom: `calc(50% + ${pct}% + 10px)` } : { top: `calc(50% + ${pct}% + 10px)` }}>
                <b className={up ? "is-blue" : ""}>
                  {up ? "+" : "−"}
                  {Math.abs(p.value)}%
                </b>
                <span>{p.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="gstats">
        {[
          { k: "+12%", v: "Engagement rate" },
          { k: "+48%", v: "Time on site" },
          { k: "+13%", v: "Pages per visit" },
        ].map((s) => (
          <div key={s.v}>
            <b>{s.k}</b>
            <span>{s.v}</span>
          </div>
        ))}
      </div>
    </Figure>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Forecast ranges (log scale)                                      */
/* ------------------------------------------------------------------ */

type Range = { house: string; scope: string; low: number; high: number; note: string; highlight?: boolean };

const ranges: Range[] = [
  { house: "Morgan Stanley", scope: "US ecommerce", low: 190, high: 385, note: "10% to 20% of online retail" },
  { house: "Bain & Company", scope: "US agentic market", low: 300, high: 500, note: "15% to 25% of ecommerce" },
  { house: "BCG", scope: "Mostly autonomous", low: 400, high: 400, note: "Of $1.3T total impacted" },
  { house: "McKinsey", scope: "Global mediated", low: 3000, high: 5000, note: "Agent-mediated consumer commerce", highlight: true },
];

const LOG_MIN = Math.log(150);
const LOG_MAX = Math.log(6000);
const pos = (v: number) => ((Math.log(v) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
const fmt = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}T` : `$${v}B`);

export const ForecastRangeChart = () => (
  <Figure
    n="03"
    title="Nobody agrees on the number. Everybody agrees on the order of magnitude"
    note="Four independent 2030 estimates, plotted on a log scale because they measure different things: US transacted value, US autonomous value, and global agent-mediated value. The spread is the honest answer."
    source={
      <>
        Sources: Morgan Stanley, Bain, BCG, McKinsey, 2025 to 2026 <Cite id={["morganstanley", "bain", "bcg", "mckinsey"]} />
      </>
    }
    dark
  >
    <div className="grange">
      {ranges.map((r, i) => (
        <div key={r.house} className="grange__row">
          <div className="grange__top">
            <span>
              <b>{r.house}</b>
              <em>{r.scope}</em>
            </span>
            <span className={`grange__val ${r.highlight ? "is-blue" : ""}`}>{r.low === r.high ? fmt(r.low) : `${fmt(r.low)} to ${fmt(r.high)}`}</span>
          </div>
          <div className="grange__track">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: `${Math.max(pos(r.high) - pos(r.low), 1.5)}%`, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.07 * i, ease: EASE }}
              className={`grange__fill ${r.highlight ? "is-blue" : ""}`}
              style={{ left: `${pos(r.low)}%` }}
            />
          </div>
          <p>{r.note}</p>
        </div>
      ))}
    </div>
    <div className="grange__axis">
      {[150, 500, 1000, 3000, 6000].map((t) => (
        <span key={t}>{fmt(t)}</span>
      ))}
    </div>
    <div className="gaside">
      <p>
        Gartner puts it in share terms instead of dollars: roughly <b>20% of transactions flowing through agentic commerce by 2030</b>. Planning against a fifth of your demand arriving through a reader that only sees list price is the actual exercise.
        <Cite id="gartner" />
      </p>
    </div>
  </Figure>
);

/* ------------------------------------------------------------------ */
/* 4. Machine readability by page type                                 */
/* ------------------------------------------------------------------ */

const pages = [
  { name: "Returns", score: 82 },
  { name: "Contact", score: 81 },
  { name: "FAQ", score: 80 },
  { name: "Help center", score: 79 },
  { name: "Loyalty", score: 78, flag: true },
  { name: "Homepage", score: 75 },
  { name: "Category", score: 74 },
  { name: "Store locator", score: 73 },
  { name: "Product page", score: 66, flag: true },
];

export const ReadabilityChart = () => (
  <Figure
    n="04"
    title="The pages that sell are the least readable pages you own"
    note="Adobe's AI Content Visibility Checker scores what share of a page an LLM can actually read. Legal and support pages score highest. Product pages, where price and eligibility live, score worst."
    source={
      <>
        Source: Adobe AI Content Visibility Checker, US retail benchmark, April 2026 <Cite id="adobe" />
      </>
    }
  >
    <div className="ghbars">
      {pages.map((p, i) => (
        <div key={p.name} className={`ghbars__row ${p.flag ? "is-flag" : ""}`}>
          <span className="ghbars__name">{p.name}</span>
          <div className="ghbars__track">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.score}%` }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75, delay: 0.05 * i, ease: EASE }} className="ghbars__fill" />
          </div>
          <span className="ghbars__val">{p.score}</span>
        </div>
      ))}
    </div>
    <div className="gstats gstats--3">
      {[
        { k: "82.5", v: "Best-performing US retail homepages" },
        { k: "54.2", v: "Lowest-performing US retail homepages" },
        { k: "34%", v: "Of an average product page an LLM cannot read" },
      ].map((s) => (
        <div key={s.v}>
          <b>{s.k}</b>
          <span>{s.v}</span>
        </div>
      ))}
    </div>
  </Figure>
);

/* ------------------------------------------------------------------ */
/* 5. Benchmarks                                                        */
/* ------------------------------------------------------------------ */

const bench = [
  { name: "Human expert", detail: "WebShop task success", value: 59, primary: false },
  { name: "Best trained agent", detail: "WebShop, 2022 baseline", value: 29, primary: false },
  { name: "GPT-5", detail: "ShoppingComp, 120 expert tasks", value: 11.2, primary: true },
  { name: "Gemini 2.5 Flash", detail: "ShoppingComp, 120 expert tasks", value: 3.9, primary: true },
];

export const BenchmarkChart = () => (
  <Figure
    n="05"
    title="Agents are confident, cited, and frequently wrong"
    note="On ShoppingComp, a 1,026-scenario benchmark of real products curated by 35 experts, frontier models complete a small fraction of tasks correctly. Documented failure modes include falling for promotional misinformation and missing stated constraints."
    source={
      <>
        Sources: ShoppingComp (arXiv:2511.22978), WebShop (arXiv:2207.01206), EComAgentBench (arXiv:2606.17698) <Cite id={["shoppingcomp", "webshop", "ecomagent"]} />
      </>
    }
    dark
  >
    <div className="grange">
      {bench.map((b, i) => (
        <div key={b.name} className="grange__row">
          <div className="grange__top">
            <span>
              <b>{b.name}</b>
            </span>
            <span className={`grange__val ${b.primary ? "is-blue" : ""}`}>{b.value}%</span>
          </div>
          <div className="grange__track grange__track--thin">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${(b.value / 60) * 100}%` }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.06 * i, ease: EASE }} className={`grange__fill ${b.primary ? "is-blue" : ""}`} style={{ left: 0 }} />
          </div>
          <p>{b.detail}</p>
        </div>
      ))}
    </div>
    <p className="gfig__after">This is the practical argument for structure over persuasion. An agent that struggles to verify attributes from a rendered page will take a clean, signed feed at face value. Whoever publishes the cleanest data gets believed.</p>
  </Figure>
);

/* ------------------------------------------------------------------ */
/* 6. Protocol timeline (interactive)                                  */
/* ------------------------------------------------------------------ */

type Milestone = { date: string; short: string; actor: string; title: string; body: string; cite: string[] };

const milestones: Milestone[] = [
  { date: "29 Apr 2025", short: "Apr '25", actor: "Mastercard", title: "Agent Pay opens card rails to software buyers", body: "Mastercard introduces agentic tokens so an agent can be permissioned to transact, with Microsoft and IBM as launch partners. The first signal that networks, not storefronts, would define agent identity.", cite: ["atlas"] },
  { date: "30 Apr 2025", short: "Apr '25", actor: "Visa", title: "Intelligent Commerce and AI-ready cards", body: "Visa opens its network to agents through tokenized credentials, working with Anthropic, OpenAI and Stripe. Spend controls and merchant-category limits move into the credential itself.", cite: ["atlas"] },
  { date: "16 Sep 2025", short: "Sep '25", actor: "Google", title: "AP2 gives agent payments a mandate model", body: "The Agent Payments Protocol launches with more than 60 backing organizations, extending A2A and MCP with verifiable intent and cart mandates so a merchant can prove what the shopper actually authorized.", cite: ["ap2", "atlas"] },
  { date: "29 Sep 2025", short: "Sep '25", actor: "OpenAI + Stripe", title: "Instant Checkout and the open ACP spec", body: "ChatGPT gains in-chat purchase with Etsy live first and over a million Shopify merchants staged next. The Agentic Commerce Protocol is open-sourced the same day, turning agent checkout into a public standard.", cite: ["openai", "stripe"] },
  { date: "Oct 2025", short: "Oct '25", actor: "Walmart, PayPal", title: "Catalog scale arrives", body: "Walmart opens its catalog to ChatGPT shoppers, and PayPal adopts ACP weeks later, bringing its merchant network and wallet into Instant Checkout. Agent surfaces stop being a pilot.", cite: ["atlas"] },
  { date: "11 Jan 2026", short: "Jan '26", actor: "Google", title: "UCP standardizes the catalog side", body: "The Universal Commerce Protocol addresses the half ACP left open: how a merchant publishes structured product, availability and offer data for an agent to retrieve before any checkout exists.", cite: ["atlas", "acpchangelog"] },
  { date: "Jun 2026", short: "Jun '26", actor: "Shopify, Adyen, Visa", title: "Readiness becomes a scored asset", body: "Shopify drops approval gates and ships a public MCP endpoint plus a UCP skill. Adyen launches a modular agentic API suite. Visa announces Agent Score, an agentic-readiness score for merchant sites, alongside an agent trust directory.", cite: ["acpchangelog"] },
];

export const ProtocolTimeline = () => {
  const [active, setActive] = useState(3);
  const m = milestones[active];
  return (
    <Figure
      n="06"
      title="Fifteen months from proposal to infrastructure"
      note="Payments networks moved first, checkout second, catalog third, and scoring fourth. Read the sequence and the gap is obvious: every layer standardized except the one carrying what a shopper actually pays."
      source={
        <>
          Sources: primary announcements, compiled <Cite id={["atlas", "acpchangelog", "openai", "ap2"]} />
        </>
      }
    >
      <div className="gtl">
        <div className="gtl__rail">
          <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }} style={{ width: `${((active + 0.5) / milestones.length) * 100}%` }} />
        </div>
        <div className="gtl__dots">
          {milestones.map((s, i) => {
            const on = i === active;
            return (
              <button key={s.date + s.actor} type="button" onClick={() => setActive(i)} aria-pressed={on} aria-label={`${s.date}: ${s.title}`} className={`gtl__dot ${on ? "is-on" : ""}`}>
                <i />
                <span>{s.short}</span>
                <em>{s.actor}</em>
              </button>
            );
          })}
        </div>
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="gtl__read">
          <div className="gtl__read-top">
            <span>{m.date}</span>
            <em>{m.actor}</em>
          </div>
          <b>{m.title}</b>
          <p>
            {m.body}
            <Cite id={m.cite} />
          </p>
        </motion.div>
        <p className="gtl__hint">Select a milestone to read it.</p>
      </div>
    </Figure>
  );
};

/* ------------------------------------------------------------------ */
/* 7. Adoption grid                                                    */
/* ------------------------------------------------------------------ */

const adoption = [
  { k: "39%", v: "of US consumers have used AI for online shopping", c: "adobe" },
  { k: "85%", v: "of those say it improved the experience", c: "adobe" },
  { k: "66%", v: "believe AI tools return accurate results", c: "adobe" },
  { k: "23%", v: "made a purchase using AI in the past month", c: "morganstanley" },
  { k: "30 to 45%", v: "use generative AI for product research and comparison", c: "bain" },
  { k: "81%", v: "expect to use agentic tools to shop", c: "bcg" },
];

export const AdoptionGrid = () => (
  <div className="gadopt">
    {adoption.map((a, i) => (
      <motion.div key={a.v} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }} className="gadopt__cell">
        <b>{a.k}</b>
        <p>
          {a.v}
          <Cite id={a.c} />
        </p>
      </motion.div>
    ))}
  </div>
);
