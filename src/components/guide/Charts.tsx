import { useState } from "react";
import { motion } from "framer-motion";
import Cite from "./Cite";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

type FrameProps = {
  label: string;
  title: string;
  note?: React.ReactNode;
  source: React.ReactNode;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
};

/** Editorial figure frame: label, title, plot area, source footnote. */
export const Figure = ({
  label,
  title,
  note,
  source,
  dark = false,
  children,
  className = "",
}: FrameProps) => (
  <figure
    className={`overflow-hidden rounded-2xl border-t-2 border-primary ${
      dark ? "bg-[#0E0E14]" : "border border-t-2 border-border bg-[#EAE8E5]"
    } ${className}`}
    style={dark ? undefined : { borderTopColor: "hsl(var(--primary))" }}
  >
    <div className="px-6 pt-6 md:px-9 md:pt-8">
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={`font-mono text-[10.5px] tracking-[0.16em] ${
            dark ? "text-primary" : "text-primary"
          }`}
        >
          {label.toUpperCase()}
        </span>
      </div>
      <h3
        className={`mt-2.5 max-w-[46ch] text-[19px] font-semibold leading-[1.25] tracking-[-0.018em] md:text-[23px] ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h3>
      {note && (
        <p
          className={`mt-2.5 max-w-[62ch] text-[13.5px] leading-[1.55] md:text-[14.5px] ${
            dark ? "text-white/55" : "text-foreground/60"
          }`}
        >
          {note}
        </p>
      )}
    </div>

    <div className="px-6 py-7 md:px-9 md:py-9">{children}</div>

    <figcaption
      className={`border-t px-6 py-3.5 font-mono text-[10.5px] tracking-[0.06em] md:px-9 ${
        dark ? "border-white/10 text-white/40" : "border-border text-foreground/45"
      }`}
    >
      {source}
    </figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* 1. AI traffic growth + conversion flip                              */
/* ------------------------------------------------------------------ */

const growth = [
  { period: "Nov-Dec 2025", sub: "Holiday", value: 693 },
  { period: "Q1 2026", sub: "Jan to Mar", value: 393 },
  { period: "Mar 2026", sub: "Latest month", value: 269 },
];

export const TrafficGrowthChart = () => {
  const max = 760;
  return (
    <Figure
      label="Figure 01"
      title="AI-referred traffic to US retail is compounding, not spiking"
      note={
        <>
          Adobe Analytics tracks more than a trillion visits to US retail sites. Growth decelerated
          from holiday peak but remains a multiple of last year, which is what a channel shift looks
          like rather than a news cycle.
        </>
      }
      source={
        <>
          Source: Adobe Digital Insights, April 2026 <Cite id={["adobe", "techcrunch"]} />
        </>
      }
    >
      <div className="flex items-end gap-4 md:gap-8" style={{ height: 232 }}>
        {growth.map((g, i) => (
          <div key={g.period} className="flex h-full flex-1 flex-col justify-end">
            <div className="mb-2.5 flex items-baseline gap-1">
              <span className="font-mono text-[20px] font-medium tracking-[-0.02em] text-foreground md:text-[27px]">
                +{g.value}
              </span>
              <span className="font-mono text-[12px] text-foreground/45">%</span>
            </div>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(g.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.08 * i, ease: EASE }}
              className="w-full rounded-t-[3px]"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.55) 100%)"
                    : "linear-gradient(180deg, hsl(var(--foreground) / 0.28) 0%, hsl(var(--foreground) / 0.12) 100%)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-0 flex gap-4 border-t border-foreground/15 pt-3 md:gap-8">
        {growth.map((g) => (
          <div key={g.period} className="flex-1">
            <div className="text-[12.5px] font-medium text-foreground/80">{g.period}</div>
            <div className="mt-0.5 text-[11.5px] text-foreground/45">{g.sub} · YoY</div>
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
  const scale = 46;

  return (
    <Figure
      label="Figure 02"
      title="Agent-referred visits went from worst to best converting"
      note="Conversion of AI-sourced visits versus every other channel, including paid search and email. The sign flipped inside twelve months."
      source={
        <>
          Source: Adobe Analytics via Digital Commerce 360, April 2026 <Cite id={["dc360", "adobe"]} />
        </>
      }
    >
      <div className="relative" style={{ height: 210 }}>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground/20" />
        <span className="absolute left-0 top-1/2 -translate-y-[calc(100%+6px)] font-mono text-[10px] tracking-[0.1em] text-foreground/40">
          PARITY
        </span>
        <div className="flex h-full items-center gap-10 md:gap-20">
          {points.map((p, i) => {
            const pct = (Math.abs(p.value) / scale) * 50;
            const up = p.value > 0;
            return (
              <div key={p.label} className="relative flex h-full flex-1 items-center justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${pct}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, delay: 0.1 * i, ease: EASE }}
                  className="absolute w-full max-w-[190px] rounded-[3px]"
                  style={{
                    [up ? "bottom" : "top"]: "50%",
                    background: up
                      ? "linear-gradient(0deg, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary)) 100%)"
                      : "linear-gradient(180deg, hsl(var(--foreground) / 0.26) 0%, hsl(var(--foreground) / 0.1) 100%)",
                  }}
                />
                <div
                  className="absolute left-0 right-0 flex flex-col items-center"
                  style={up ? { bottom: `calc(50% + ${pct}% + 10px)` } : { top: `calc(50% + ${pct}% + 10px)` }}
                >
                  <span
                    className={`font-mono text-[22px] font-medium tracking-[-0.02em] md:text-[30px] ${
                      up ? "text-primary" : "text-foreground/55"
                    }`}
                  >
                    {up ? "+" : "−"}
                    {Math.abs(p.value)}%
                  </span>
                  <span className="mt-1 text-[12px] text-foreground/50">{p.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-4">
        {[
          { k: "+12%", v: "Engagement rate" },
          { k: "+48%", v: "Time on site" },
          { k: "+13%", v: "Pages per visit" },
        ].map((s) => (
          <div key={s.v}>
            <div className="font-mono text-[16px] text-foreground md:text-[18px]">{s.k}</div>
            <div className="mt-0.5 text-[11.5px] leading-[1.4] text-foreground/50">{s.v}</div>
          </div>
        ))}
      </div>
    </Figure>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Forecast ranges (log scale)                                      */
/* ------------------------------------------------------------------ */

type Range = {
  house: string;
  scope: string;
  low: number;
  high: number;
  note: string;
  highlight?: boolean;
};

const ranges: Range[] = [
  {
    house: "Morgan Stanley",
    scope: "US ecommerce",
    low: 190,
    high: 385,
    note: "10% to 20% of online retail",
  },
  {
    house: "Bain & Company",
    scope: "US agentic market",
    low: 300,
    high: 500,
    note: "15% to 25% of ecommerce",
  },
  {
    house: "BCG",
    scope: "Mostly autonomous",
    low: 400,
    high: 400,
    note: "Of $1.3T total impacted",
  },
  {
    house: "McKinsey",
    scope: "Global mediated",
    low: 3000,
    high: 5000,
    note: "Agent-mediated consumer commerce",
    highlight: true,
  },
];

const LOG_MIN = Math.log(150);
const LOG_MAX = Math.log(6000);
const pos = (v: number) => ((Math.log(v) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
const fmt = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}T` : `$${v}B`);

export const ForecastRangeChart = () => (
  <Figure
    label="Figure 03"
    title="Nobody agrees on the number. Everybody agrees on the order of magnitude"
    note="Four independent 2030 estimates, plotted on a log scale because they measure different things: US transacted value, US autonomous value, and global agent-mediated value. The spread is the honest answer."
    source={
      <>
        Sources: Morgan Stanley, Bain, BCG, McKinsey, 2025 to 2026{" "}
        <Cite id={["morganstanley", "bain", "bcg", "mckinsey"]} />
      </>
    }
    dark
  >
    <div className="flex flex-col gap-7">
      {ranges.map((r, i) => (
        <div key={r.house}>
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-white md:text-[15px]">
                {r.house}
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-white/35">
                {r.scope.toUpperCase()}
              </span>
            </div>
            <span
              className={`font-mono text-[14px] md:text-[16px] ${
                r.highlight ? "text-primary" : "text-white/75"
              }`}
            >
              {r.low === r.high ? fmt(r.low) : `${fmt(r.low)} to ${fmt(r.high)}`}
            </span>
          </div>
          <div className="relative mt-3 h-[10px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: `${Math.max(pos(r.high) - pos(r.low), 1.5)}%`, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.07 * i, ease: EASE }}
              className="absolute top-0 h-full rounded-full"
              style={{
                left: `${pos(r.low)}%`,
                background: r.highlight
                  ? "linear-gradient(90deg, hsl(var(--primary) / 0.55), hsl(var(--primary)))"
                  : "linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.55))",
              }}
            />
          </div>
          <p className="mt-2 text-[12px] text-white/40">{r.note}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 flex justify-between border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.1em] text-white/30">
      {[150, 500, 1000, 3000, 6000].map((t) => (
        <span key={t}>{fmt(t)}</span>
      ))}
    </div>

    <div className="mt-7 rounded-xl border-l-2 border-primary bg-white/[0.04] px-5 py-4">
      <p className="text-[13.5px] leading-[1.55] text-white/70 md:text-[14.5px]">
        Gartner puts it in share terms instead of dollars: roughly{" "}
        <span className="font-medium text-white">20% of transactions flowing through agentic
        commerce by 2030</span>. Planning against a fifth of your demand arriving through a reader
        that only sees list price is the actual exercise.
        <Cite id="gartner" dark />
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
    label="Figure 04"
    title="The pages that sell are the least readable pages you own"
    note="Adobe's AI Content Visibility Checker scores what share of a page an LLM can actually read. Legal and support pages score highest. Product pages, where price and eligibility live, score worst."
    source={
      <>
        Source: Adobe AI Content Visibility Checker, US retail benchmark, April 2026{" "}
        <Cite id="adobe" />
      </>
    }
  >
    <div className="flex flex-col gap-3.5">
      {pages.map((p, i) => (
        <div key={p.name} className="flex items-center gap-4">
          <span
            className={`w-[92px] shrink-0 text-[12.5px] md:w-[124px] md:text-[13.5px] ${
              p.flag ? "font-medium text-foreground" : "text-foreground/55"
            }`}
          >
            {p.name}
          </span>
          <div className="relative h-[22px] flex-1 overflow-hidden rounded-[3px] bg-foreground/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${p.score}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.05 * i, ease: EASE }}
              className="h-full rounded-[3px]"
              style={{
                background: p.flag
                  ? "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)))"
                  : "hsl(var(--foreground) / 0.2)",
              }}
            />
          </div>
          <span
            className={`w-[42px] shrink-0 text-right font-mono text-[13px] ${
              p.flag ? "text-primary" : "text-foreground/50"
            }`}
          >
            {p.score}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-7 grid gap-4 border-t border-foreground/15 pt-5 sm:grid-cols-3">
      {[
        { k: "82.5", v: "Best-performing US retail homepages" },
        { k: "54.2", v: "Lowest-performing US retail homepages" },
        { k: "34%", v: "Of an average product page an LLM cannot read" },
      ].map((s) => (
        <div key={s.v}>
          <div className="font-mono text-[22px] tracking-[-0.02em] text-foreground md:text-[26px]">
            {s.k}
          </div>
          <div className="mt-1 text-[12px] leading-[1.45] text-foreground/50">{s.v}</div>
        </div>
      ))}
    </div>
  </Figure>
);

/* ------------------------------------------------------------------ */
/* 5. Benchmarks: how good are shopping agents, really                 */
/* ------------------------------------------------------------------ */

const bench = [
  { name: "Human expert", detail: "WebShop task success", value: 59, tone: "neutral" as const },
  { name: "Best trained agent", detail: "WebShop, 2022 baseline", value: 29, tone: "neutral" as const },
  { name: "GPT-5", detail: "ShoppingComp, 120 expert tasks", value: 11.2, tone: "primary" as const },
  { name: "Gemini 2.5 Flash", detail: "ShoppingComp, 120 expert tasks", value: 3.9, tone: "primary" as const },
];

export const BenchmarkChart = () => (
  <Figure
    label="Figure 05"
    title="Agents are confident, cited, and frequently wrong"
    note="On ShoppingComp, a 1,026-scenario benchmark of real products curated by 35 experts, frontier models complete a small fraction of tasks correctly. Documented failure modes include falling for promotional misinformation and missing stated constraints."
    source={
      <>
        Sources: ShoppingComp (arXiv:2511.22978), WebShop (arXiv:2207.01206), EComAgentBench
        (arXiv:2606.17698) <Cite id={["shoppingcomp", "webshop", "ecomagent"]} />
      </>
    }
    dark
  >
    <div className="flex flex-col gap-5">
      {bench.map((b, i) => (
        <div key={b.name}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[13.5px] font-medium text-white md:text-[14.5px]">{b.name}</span>
            <span
              className={`font-mono text-[15px] ${
                b.tone === "primary" ? "text-primary" : "text-white/60"
              }`}
            >
              {b.value}%
            </span>
          </div>
          <div className="relative mt-2.5 h-[8px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(b.value / 60) * 100}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.06 * i, ease: EASE }}
              className="h-full rounded-full"
              style={{
                background:
                  b.tone === "primary"
                    ? "linear-gradient(90deg, hsl(var(--primary) / 0.5), hsl(var(--primary)))"
                    : "rgba(255,255,255,0.32)",
              }}
            />
          </div>
          <p className="mt-1.5 text-[11.5px] text-white/35">{b.detail}</p>
        </div>
      ))}
    </div>
    <p className="mt-7 border-t border-white/10 pt-5 text-[13.5px] leading-[1.6] text-white/60 md:text-[14.5px]">
      This is the practical argument for structure over persuasion. An agent that struggles to
      verify attributes from a rendered page will take a clean, signed feed at face value. Whoever
      publishes the cleanest data gets believed.
    </p>
  </Figure>
);

/* ------------------------------------------------------------------ */
/* 6. Protocol timeline (interactive)                                  */
/* ------------------------------------------------------------------ */

type Milestone = {
  date: string;
  short: string;
  actor: string;
  title: string;
  body: string;
  cite: string[];
};

const milestones: Milestone[] = [
  {
    date: "29 Apr 2025",
    short: "Apr '25",
    actor: "Mastercard",
    title: "Agent Pay opens card rails to software buyers",
    body: "Mastercard introduces agentic tokens so an agent can be permissioned to transact, with Microsoft and IBM as launch partners. The first signal that networks, not storefronts, would define agent identity.",
    cite: ["atlas"],
  },
  {
    date: "30 Apr 2025",
    short: "Apr '25",
    actor: "Visa",
    title: "Intelligent Commerce and AI-ready cards",
    body: "Visa opens its network to agents through tokenized credentials, working with Anthropic, OpenAI and Stripe. Spend controls and merchant-category limits move into the credential itself.",
    cite: ["atlas"],
  },
  {
    date: "16 Sep 2025",
    short: "Sep '25",
    actor: "Google",
    title: "AP2 gives agent payments a mandate model",
    body: "The Agent Payments Protocol launches with more than 60 backing organizations, extending A2A and MCP with verifiable intent and cart mandates so a merchant can prove what the shopper actually authorized.",
    cite: ["ap2", "atlas"],
  },
  {
    date: "29 Sep 2025",
    short: "Sep '25",
    actor: "OpenAI + Stripe",
    title: "Instant Checkout and the open ACP spec",
    body: "ChatGPT gains in-chat purchase with Etsy live first and over a million Shopify merchants staged next. The Agentic Commerce Protocol is open-sourced the same day, turning agent checkout into a public standard.",
    cite: ["openai", "stripe"],
  },
  {
    date: "Oct 2025",
    short: "Oct '25",
    actor: "Walmart, PayPal",
    title: "Catalog scale arrives",
    body: "Walmart opens its catalog to ChatGPT shoppers, and PayPal adopts ACP weeks later, bringing its merchant network and wallet into Instant Checkout. Agent surfaces stop being a pilot.",
    cite: ["atlas"],
  },
  {
    date: "11 Jan 2026",
    short: "Jan '26",
    actor: "Google",
    title: "UCP standardizes the catalog side",
    body: "The Universal Commerce Protocol addresses the half ACP left open: how a merchant publishes structured product, availability and offer data for an agent to retrieve before any checkout exists.",
    cite: ["atlas", "acpchangelog"],
  },
  {
    date: "Jun 2026",
    short: "Jun '26",
    actor: "Shopify, Adyen, Visa",
    title: "Readiness becomes a scored asset",
    body: "Shopify drops approval gates and ships a public MCP endpoint plus a UCP skill. Adyen launches a modular agentic API suite. Visa announces Agent Score, an agentic-readiness score for merchant sites, alongside an agent trust directory.",
    cite: ["acpchangelog"],
  },
];

export const ProtocolTimeline = () => {
  const [active, setActive] = useState(3);
  const m = milestones[active];

  return (
    <Figure
      label="Figure 06"
      title="Fifteen months from proposal to infrastructure"
      note="Payments networks moved first, checkout second, catalog third, and scoring fourth. Read the sequence and the gap is obvious: every layer standardized except the one carrying what a shopper actually pays."
      source={
        <>
          Sources: primary announcements, compiled <Cite id={["atlas", "acpchangelog", "openai", "ap2"]} />
        </>
      }
    >
      {/* Rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-[7px] h-px bg-foreground/15" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute left-0 top-[7px] h-px origin-left bg-primary/50"
          style={{ width: `${((active + 0.5) / milestones.length) * 100}%` }}
        />
        <div className="relative flex">
          {milestones.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.date + s.actor}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${s.date}: ${s.title}`}
                className="group flex flex-1 flex-col items-start pt-0 text-left"
              >
                <span
                  className={`mb-3 block rounded-full transition-all duration-300 ${
                    on
                      ? "h-[15px] w-[15px] bg-primary ring-4 ring-primary/15"
                      : "h-[9px] w-[9px] bg-foreground/25 group-hover:bg-foreground/50"
                  }`}
                  style={on ? { marginTop: -3 } : { marginTop: 3 }}
                />
                <span
                  className={`font-mono text-[9.5px] tracking-[0.08em] transition-colors md:text-[10.5px] ${
                    on ? "text-primary" : "text-foreground/40 group-hover:text-foreground/65"
                  }`}
                >
                  {s.short.toUpperCase()}
                </span>
                <span
                  className={`mt-1 hidden text-[11.5px] leading-[1.3] transition-colors md:block ${
                    on ? "font-medium text-foreground" : "text-foreground/45 group-hover:text-foreground/70"
                  }`}
                >
                  {s.actor}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Readout */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mt-8 rounded-xl border-l-2 border-primary bg-background px-5 py-5 md:px-7 md:py-6"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] tracking-[0.1em] text-primary">
            {m.date.toUpperCase()}
          </span>
          <span className="text-[11.5px] text-foreground/45">{m.actor}</span>
        </div>
        <p className="mt-2.5 text-[16px] font-semibold leading-[1.3] tracking-[-0.015em] text-foreground md:text-[19px]">
          {m.title}
        </p>
        <p className="mt-2.5 max-w-[74ch] text-[13.5px] leading-[1.6] text-foreground/62 md:text-[14.5px]">
          {m.body}
          <Cite id={m.cite} />
        </p>
      </motion.div>
      <p className="mt-3 font-mono text-[10.5px] tracking-[0.08em] text-foreground/35">
        SELECT A MILESTONE TO READ IT
      </p>
    </Figure>
  );
};

/* ------------------------------------------------------------------ */
/* 7. Adoption / trust survey grid                                     */
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
  <div className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
    {adoption.map((a, i) => (
      <motion.div
        key={a.v}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
        className="bg-[#EAE8E5] px-6 py-7 md:px-8 md:py-9"
      >
        <div className="font-mono text-[30px] font-medium tracking-[-0.03em] text-foreground md:text-[38px]">
          {a.k}
        </div>
        <p className="mt-2.5 max-w-[26ch] text-[13px] leading-[1.5] text-foreground/58 md:text-[14px]">
          {a.v}
          <Cite id={a.c} />
        </p>
      </motion.div>
    ))}
  </div>
);
