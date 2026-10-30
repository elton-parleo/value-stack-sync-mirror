import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CountUp, EASE, Glow, Head, Logo, Meter, Prov, Rise, img } from "@/ds";

/* ===================== 02 The funnel collapses into one chat window ===================== */
const LAYERS = ["Search results", "Retail media", "Review sites", "Trade spend", "Comparison pages", "Product pages"];

function Typed({ text, start, speed = 26 }: { text: string; start: boolean; speed?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (!start || reduce) return;
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [start, reduce, text, speed]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="caret" aria-hidden="true" />}
    </>
  );
}

function Collapse() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  return (
    <div className="dcard collapse" ref={ref}>
      <span className="ml ml--dark">Where the shopper used to go</span>
      <div className="collapse__stack">
        {LAYERS.map((l, i) => (
          <motion.div
            key={l}
            className="collapse__layer"
            style={{ width: `${100 - i * 8}%` }}
            initial={false}
            animate={on && !reduce ? { y: (LAYERS.length - 1 - i) * 6, opacity: 0.32, scaleX: 0.96 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: EASE }}
          >
            {l}
          </motion.div>
        ))}
        <motion.div
          className="collapse__one"
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 8 }}
          animate={on ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7l-3 2.5v-2.5H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          One chat window
        </motion.div>
      </div>
      <dl className="collapse__stats">
        <div>
          <dt>
            <CountUp to={393} prefix="+" suffix="%" />
          </dt>
          <dd>AI-referred retail traffic, year over year</dd>
        </div>
        <div>
          <dt>
            <CountUp to={11} suffix="×" />
          </dt>
          <dd>AI-attributed orders, Shopify</dd>
        </div>
        <div>
          <dt>
            <CountUp to={25} prefix="−" suffix="%" />
          </dt>
          <dd>organic traffic absorbed</dd>
        </div>
      </dl>
    </div>
  );
}

function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const answer = "Chewy is $0.51 cheaper, so I'd order there.";
  const after = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: on ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay: d, ease: EASE },
  });
  return (
    <div className="chat card card--elev" ref={ref}>
      <div className="chat__bar">
        <Logo name="ChatGPT" size={16} />
        <span className="ml">chatgpt.com</span>
        <span className="ml chat__src">Petco audit, Sep 28</span>
      </div>
      <div className="chat__body">
        <motion.div className="chat__q" {...after(0.1)}>
          Cheapest place to buy Purina Pro Plan Adult 7+, 34 lb, on Autoship?
        </motion.div>
        <div className="chat__a">
          <Logo name="ChatGPT" size={22} />
          <p>
            <Typed text={answer} start={on} />
          </p>
        </div>
        <div className="chat__rows">
          <motion.div className="chat__row is-pick" {...after(1.7)}>
            <Logo name="Chewy" size={22} />
            <div>
              <b>Chewy, Autoship</b>
              <span>the agent's pick</span>
            </div>
            <strong className="tnum">$57.48</strong>
          </motion.div>
          <motion.div className="chat__row" {...after(1.85)}>
            <Logo name="Petco" size={22} />
            <div>
              <b>Petco, as the agent quoted it</b>
              <span className="st st--wrong">Wrong price</span>
            </div>
            <strong className="tnum chat__wrong">$57.99</strong>
          </motion.div>
          <motion.div className="chat__truth" {...after(2.2)}>
            <div className="chat__truth-top">
              <span className="ml">On petco.com, the same day</span>
              <span className="st st--invisible">Invisible to the agent</span>
            </div>
            <div className="chat__truth-row">
              <span>First Autoship order, Purina-funded offer</span>
              <strong className="tnum">$47.99</strong>
            </div>
            <p>
              Petco was <b>$9.49 cheaper</b>. The offer sat on Petco's page and never reached the data the agent read, three answers over two days.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Funnel() {
  return (
    <section className="sx funnel" id="shift">
      <Glow img={img("overhead-grid-2", 900)} pos="tr" />
      <div className="wrap">
        <Head
          lead="The e-commerce funnel is collapsing"
          accent="into a single chat window."
          sub={
            <>
              15% of shoppers now go to an AI first, and more than half use one somewhere along the way. <b>The answer arrives before your funnel starts.</b>
            </>
          }
        />
        <div className="split split--57 split--stretch funnel__grid">
          <Rise>
            <Collapse />
          </Rise>
          <Rise delay={0.08}>
            <Chat />
          </Rise>
        </div>
        <Rise className="funnel__callout" delay={0.1}>
          <div className="callout">
            <p>
              Differentiation just became a data problem. <b>The brand whose full catalog, live price and real offer reach every surface an agent reads is the brand that gets recommended.</b>
            </p>
          </div>
        </Rise>
        <Prov>Salesforce, State of Agentic Commerce 2026. Adobe, Q1 2026. Shopify, 2026. Bain, 2025. Answer and prices from Parleo's Petco audit, ChatGPT, Sep 28 to 29, 2026.</Prov>
      </div>
    </section>
  );
}

/* ===================== 03 Every era had a scoreboard ===================== */
const ERAS = [
  { k: "$8B+", era: "Share of Shelf", d: "physical retail, Nielsen owned it for 60 years", h: 22 },
  { k: "$12B+", era: "Share of Voice", d: "broadcast, GRPs decided the budget", h: 30 },
  { k: "$200B+", era: "Share of Search", d: "digital, rank made and broke brands", h: 52 },
  { k: "~$1T", era: "Share of Algorithm", d: "how often the agent recommends you. US agentic retail by 2030", h: 100, now: true },
];
const PILLARS = [
  { k: "Visibility", q: "Are you in the room?", pts: 32 },
  { k: "Accessibility", q: "Can agents read your data?", pts: 18 },
  { k: "True Value", q: "Is your real offer in the answer?", pts: 50, ours: true },
];

export function Scoreboard() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  return (
    <section className="sx score" id="share-of-algorithm">
      <Glow img={img("audit-hands-2", 900)} pos="bl" />
      <div className="wrap">
        <Head
          lead="Every era of commerce had a scoreboard."
          accent="This one is Share of Algorithm."
          sub="The last three decided where your budget went. This one decides whether you get recommended at all."
        />
        <div className="split split--84 split--stretch">
          <Rise className="card score__card">
            <div className="eras" ref={ref}>
              {ERAS.map((e, i) => (
                <div key={e.era} className={`eras__col ${e.now ? "is-now" : ""}`}>
                  <span className="eras__k tnum">{e.k}</span>
                  <div className="eras__track">
                    <motion.i
                      style={{ height: `${e.h}%` }}
                      initial={reduce ? false : { scaleY: 0 }}
                      animate={on ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.16, ease: EASE }}
                    />
                  </div>
                  <b>{e.era}</b>
                  <span>{e.d}</span>
                </div>
              ))}
            </div>
            <div className="pillars">
              {PILLARS.map((p) => (
                <div key={p.k} className={p.ours ? "is-ours" : ""}>
                  <div className="pillars__top">
                    <b>{p.k}</b>
                    {p.ours && <span className="st st--blue">Parleo only</span>}
                    <span className="pillars__pts tnum">{p.pts} pts</span>
                  </div>
                  <span>{p.q}</span>
                  <Meter value={p.pts * 2} color={p.ours ? undefined : "#8a8896"} delay={0.3} height={5} />
                </div>
              ))}
            </div>
            <p className="score__foot">
              Three pillars, eight dimensions, one score out of 100, measured by the <a href="/agentic-value-audit">Parleo audit</a>.
            </p>
          </Rise>
          <Rise className="dcard score__dark" delay={0.1}>
            <p className="score__dark-h">
              You can't buy this scoreboard. <span>Agents recommend what they see.</span>
            </p>
            <div className="score__bars">
              <div>
                <div className="score__bar-top">
                  <span>Structured feeds</span>
                  <b className="tnum">100%</b>
                </div>
                <Meter value={100} dark delay={0.2} />
              </div>
              <div>
                <div className="score__bar-top">
                  <span>Scraped off pages</span>
                  <b className="tnum">21%</b>
                </div>
                <Meter value={21} dark color="#8a8896" delay={0.35} />
              </div>
            </div>
            <p className="score__dark-c">
              of offers earn ChatGPT's <span className="score__tag">Best Price</span> tag. 99.9% of feed offers take the top slot.
            </p>
            <div className="score__dark-src">
              <Logo name="Profound" size={16} />
              <span>The visibility industry's own research. Structured truth wins the answer.</span>
            </div>
            <Prov dark>Profound research, ~1M offers, 2026</Prov>
          </Rise>
        </div>
        <Prov>Era anchors per measurement-industry spend. ~$1T: McKinsey and ICSC, US agentic retail forecast by 2030.</Prov>
      </div>
    </section>
  );
}

/* ===================== 04 Waiting has a price in every category ===================== */
type Row = { k: string; lo: number; hi: number; ai: string; est?: boolean; hatch?: boolean };
const GROUPS: { g: string; tone: "blue" | "ink" | "hatch"; rows: Row[] }[] = [
  { g: "Already paying", tone: "blue", rows: [{ k: "Electronics", lo: 7, hi: 11, ai: "68%" }, { k: "Fashion and apparel", lo: 6, hi: 10, ai: "44%" }, { k: "Beauty", lo: 5, hi: 9, ai: "47%" }] },
  { g: "The next 24 months", tone: "ink", rows: [{ k: "Pet", lo: 6, hi: 10, ai: "~40%", est: true }, { k: "Sporting goods", lo: 4, hi: 8, ai: "~40%", est: true }, { k: "Home and furniture", lo: 4, hi: 8, ai: "~30%", est: true }, { k: "Health and wellness", lo: 3, hi: 6, ai: "~35%", est: true }] },
  { g: "Where trade spend lives", tone: "hatch", rows: [{ k: "CPG and grocery", lo: 2, hi: 3, ai: "58%", hatch: true }] },
];
const SCALE = 12;

export function Waiting() {
  const reduce = useReducedMotion();
  return (
    <section className="sx wait" id="categories">
      <div className="wrap">
        <Head lead="Waiting has a price" accent="in every category." sub="The share of revenue agents will decide by 2030, category by category. The adoption column isn't a forecast. It's already measured." />
        <div className="split split--48 split--stretch">
          <div className="wait__left">
            <Rise className="card card--pad wait__stat">
              <span className="big big--xl tnum">
                <CountUp to={20} suffix="%" />
              </span>
              <p>
                of all US retail sales were AI-influenced last holiday. <b className="blue">$262B.</b>
              </p>
              <span className="ml">Salesforce, holiday 2025 actuals</span>
            </Rise>
            <Rise className="card card--pad wait__stat" delay={0.08}>
              <span className="ml">For a $2B brand at a 35% online mix</span>
              <span className="big big--blue tnum wait__range">$105M to $175M</span>
              <p>decided by agents by 2030</p>
              <span className="st st--blue">Modeled</span>
              <span className="wait__fine">Category online share × Bain's 15 to 25% agentic band</span>
            </Rise>
          </div>
          <Rise className="card wait__table" delay={0.12}>
            <div className="wait__th">
              <span>Category</span>
              <span>
                Revenue decided by agents, 2030 <span className="st st--blue">Modeled</span>
              </span>
              <span>Shop with AI</span>
            </div>
            {GROUPS.map((g) => (
              <div key={g.g} className="wait__group">
                <span className="ml ml--blue wait__g">{g.g}</span>
                {g.rows.map((r, i) => (
                  <div key={r.k} className="wait__row">
                    <b>{r.k}</b>
                    <div className="wait__scale">
                      <motion.i
                        className={`wait__bar wait__bar--${g.tone}`}
                        style={{ left: `${(r.lo / SCALE) * 100}%`, width: `${((r.hi - r.lo) / SCALE) * 100}%` }}
                        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }}
                      />
                      <span className="wait__val tnum" style={{ left: `calc(${(r.hi / SCALE) * 100}% + 8px)` }}>
                        {r.lo}-{r.hi}%
                      </span>
                    </div>
                    <span className={`wait__ai ${r.est ? "is-est" : ""}`}>{r.ai}</span>
                  </div>
                ))}
              </div>
            ))}
            <p className="wait__note">$200B+ of US trade promotion concentrates in CPG and grocery. Small percentages are enormous dollars.</p>
          </Rise>
        </div>
        <Rise delay={0.1}>
          <p className="wait__punch">Every quarter of waiting compounds. Each sale an agent gives away trains the algorithm against you.</p>
        </Rise>
        <Prov>Adoption: Ryder 2026. Exposure: category online share × Bain 2030 band. Salesforce holiday 2025. Solid chips surveyed, outlined estimated.</Prov>
      </div>
    </section>
  );
}
