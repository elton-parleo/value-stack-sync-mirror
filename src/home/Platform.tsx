import { LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Annot, Dial, EASE, Glow, Head, Logo, Meter, Prov, Rise, Shell, img } from "@/ds";

/* ===================== 05 One platform puts your product truth inside the answer ===================== */
const INPUTS = [
  { k: "Master data and catalog", g: "M3 4h10v8H3z M3 7h10" },
  { k: "Product content", g: "M4 3h8v10H4z M6 6h4 M6 9h4" },
  { k: "Pricing logic", g: "M8 2v12 M11 5H6.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3H5" },
  { k: "Incentives and loyalty", g: "M8 13s-5-3-5-6.5A2.5 2.5 0 0 1 8 5a2.5 2.5 0 0 1 5 1.5C13 10 8 13 8 13z" },
];
const STEPS = [
  { k: "Unify", d: "one canonical record for every SKU, offer and rule" },
  { k: "Resolve", d: "rules engine, 7 incentive classes, entitled prices computed" },
  { k: "Publish", d: "compiled per surface, pushed to every protocol" },
  { k: "Verify, weekly", d: "every surface read back and the agents asked what they see. Wrong info, stale prices and missing products flagged when they drift" },
  { k: "Measure", d: "rank and revenue, attributed into your analytics" },
];
const SURFACES = [
  { k: "Site schema", l: "schema.org" },
  { k: "Google Merchant Center", l: "Google" },
  { k: "OpenAI ACP", l: "OpenAI" },
  { k: "Google UCP", l: "Google" },
  { k: "MCP and API", l: "Claude" },
];

function Rank() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.8 });
  const [won, setWon] = useState(false);
  useEffect(() => {
    if (!on) return;
    const t = window.setTimeout(() => setWon(true), 900);
    return () => window.clearTimeout(t);
  }, [on]);
  const rows = won ? ["you", "a", "b"] : ["a", "b", "you"];
  return (
    <div className="rank card" ref={ref}>
      <LayoutGroup>
        {rows.map((r, i) => (
          <motion.div key={r} layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`rank__row ${r === "you" ? "is-you" : ""}`}>
            <span className="rank__n tnum">{i + 1}</span>
            <span>{r === "you" ? "Your product" : r === "a" ? "Competitor A" : "Competitor B"}</span>
            {r === "you" && won && <span className="st st--blue">Best value</span>}
          </motion.div>
        ))}
      </LayoutGroup>
      <span className="rank__move tnum">#3 → #1</span>
    </div>
  );
}

export function Platform() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setInterval(() => setActive((v) => (v + 1) % STEPS.length), 2600);
    return () => window.clearInterval(t);
  }, [reduce, inView]);
  return (
    <section className="sx plat" id="platform">
      <Glow img={img("overhead-grid-2", 900)} pos="tr" />
      <div className="wrap">
        <Head lead="One platform puts your whole product truth" accent="inside the answer." sub="Winning here takes more than mentions. Your value has to be visible, portable and transactable. Parleo makes it all three." />
        <Rise className="plat__diagram" amount={0.2}>
          <div className="plat__grid" ref={ref}>
            <div className="plat__col plat__in">
              <span className="ml">Your product truth</span>
              {INPUTS.map((x) => (
                <div key={x.k} className="plat__input">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d={x.g} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {x.k}
                </div>
              ))}
              <span className="ml ml--blue">Connected once</span>
            </div>
            <svg className="plat__wire" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
              {[95, 165, 235, 305].map((y) => (
                <path key={y} d={`M0 ${y} C 50 ${y}, 50 200, 100 200`} vectorEffect="non-scaling-stroke" />
              ))}
              <circle cx="100" cy="200" r="3" />
            </svg>
            <div className="card card--elev plat__core">
              <div className="plat__core-top">
                <span className="plat__mark">
                  <svg width="14" height="12" viewBox="0 0 46 40" aria-hidden="true">
                    <rect width="19" height="40" rx="6" fill="#0166FF" />
                    <rect x="27" y="9" width="15" height="22" rx="5" fill="#262836" />
                  </svg>
                  PARLEO
                </span>
                <span className="ml ml--blue dot-live">Live on 7 surfaces</span>
              </div>
              <p className="plat__core-sub">One connection. Every surface. Proof included.</p>
              <ol className="plat__steps">
                {STEPS.map((s, i) => (
                  <li key={s.k} className={i === active ? "is-on" : ""} onMouseEnter={() => setActive(i)}>
                    {i === active && <motion.i layoutId="step-hi" className="plat__hi" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                    <b>{s.k}</b>
                    <span>{s.d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <svg className="plat__wire plat__wire--out" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
              {[80, 140, 200, 260, 320].map((y) => (
                <path key={y} d={`M0 200 C 50 200, 50 ${y}, 100 ${y}`} vectorEffect="non-scaling-stroke" />
              ))}
              {!reduce &&
                [80, 200, 320].map((y, i) => (
                  <circle key={y} r="2.6" className="plat__pulse">
                    <animateMotion dur="2.2s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={`M0 200 C 50 200, 50 ${y}, 100 ${y}`} />
                  </circle>
                ))}
            </svg>
            <div className="plat__col plat__out">
              <span className="ml">Every surface agents read</span>
              {SURFACES.map((s) => (
                <div key={s.k} className="plat__surface">
                  {s.l === "schema.org" ? <span className="plat__schema">{"{ }"}</span> : <Logo name={s.l} size={16} />}
                  {s.k}
                </div>
              ))}
              <Rank />
            </div>
          </div>
        </Rise>
        <Rise className="card outs" delay={0.08}>
          <div>
            <span className="n">01</span>
            <p>
              <b>Your catalog, right everywhere.</b> The correct product, variant and price on every AI surface.
            </p>
          </div>
          <div>
            <span className="n">02</span>
            <p>
              <b>Published and tracked per protocol.</b> Per-SKU control and verification across every channel.
            </p>
          </div>
          <div>
            <span className="n">03</span>
            <p>
              <b>Incentives only we resolve.</b> Loyalty, rewards and pricing, customized inside the answer.
            </p>
          </div>
        </Rise>
        <Prov>TrueSync engine and merchant console, live on 7 surfaces today.</Prov>
      </div>
    </section>
  );
}

/* ===================== 06 Run your agent channel from one console ===================== */
const KPIS = [
  { k: "Named in shopping answers", v: "172", of: "/180", p: 96 },
  { k: "Worth-it answers that say buy on sale", v: "26", of: "/32", p: 81, bad: true },
  { k: "Encore cited unprompted", v: "3", of: "/538", p: 1, bad: true },
  { k: "Prices that matched the shelf", v: "15", of: "/83", p: 18, bad: true },
];
const QUEUE = [
  { k: "Publish the checkout price and exclusions per style", d: "Offer markup, Merchant Center, ACP feed", own: "E-commerce, pricing", tag: "True Value" },
  { k: "Put Encore member value in the record", d: "points, free shipping, tier benefits, per SKU", own: "Loyalty", tag: "True Value" },
  { k: "Publish story fields on collaboration styles", d: "the Hailey, 1996 details, fit notes", own: "Brand marketing", tag: "Visibility" },
];
const NAV = ["Overview", "Answers", "True Value", "Record", "Publishing", "Fix queue", "Funded offers", "Share of Algorithm"];

export function Console() {
  return (
    <section className="sx cons" id="console">
      <Glow img={img("overhead-2", 900)} pos="tl" />
      <div className="wrap">
        <Head lead="Run your agent channel" accent="from one console." sub="The audit measures the gap. TrueSync closes it. The console proves it, week after week." />
        <Rise className="cons__stage" amount={0.15}>
          <Shell url="console.parleo.io / gap-inc / overview" live="Live, 5 agents">
            <div className="cx">
              <aside className="cx__nav">
                <div className="cx__ws">
                  <Logo name="Gap" size={22} />
                  <div>
                    <b>Gap Inc.</b>
                    <span>Retail mode</span>
                  </div>
                </div>
                {NAV.map((n, i) => (
                  <span key={n} className={`cx__link ${i === 0 ? "is-on" : ""}`}>
                    {n}
                  </span>
                ))}
              </aside>
              <div className="cx__main">
                <div className="cx__title">
                  <b>Agent commerce performance</b>
                  <span className="cx__seg">
                    <i className="is-on">Observed</i>
                    <i>Modeled</i>
                  </span>
                  <span className="cx__btn">Fix top gap →</span>
                </div>
                <div className="cx__kpis">
                  {KPIS.map((k, i) => (
                    <div key={k.k} className="cx__kpi">
                      <span className="ml">{k.k}</span>
                      <div className="cx__kpi-n">
                        <b className="tnum">{k.v}</b>
                        <span className="tnum">{k.of}</span>
                      </div>
                      <Meter value={k.p} color={k.bad ? "#EF4343" : undefined} delay={0.2 + i * 0.08} height={5} />
                    </div>
                  ))}
                </div>
                <div className="cx__row">
                  <div className="cx__score">
                    <span className="ml">Share of Algorithm</span>
                    <div className="cx__score-in">
                      <Dial value={54} size={124} />
                      <div className="cx__pillars">
                        {[
                          ["Visibility", 21, 32],
                          ["Accessibility", 18, 18],
                          ["True Value", 15, 50],
                        ].map(([k, g, o]) => (
                          <div key={k as string}>
                            <div>
                              <span>{k}</span>
                              <b className="tnum">
                                {g}/{o}
                              </b>
                            </div>
                            <Meter value={((g as number) / (o as number)) * 100} height={4} color={k === "True Value" ? undefined : "#262836"} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="ml">876 answers, 5 agents</span>
                  </div>
                  <div className="cx__queue">
                    <span className="ml">Fix queue, ranked by points recovered</span>
                    {QUEUE.map((q, i) => (
                      <div key={q.k} className={`cx__q ${i === 0 ? "is-top" : ""}`}>
                        <span className="cx__qn tnum">{i + 1}</span>
                        <div>
                          <b>{q.k}</b>
                          <span>{q.d}. Owner: {q.own}</span>
                        </div>
                        <span className={`st ${q.tag === "True Value" ? "st--blue" : "st--ink"}`}>{q.tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dcard cx__open">
                    <span className="ml ml--dark">Open in True Value</span>
                    <span className="big big--blue tnum">35 pts</span>
                    <p>The biggest gap in the score. Agents know Gap and don't know why to buy it today.</p>
                    <div className="cx__open-rows">
                      <div>
                        <span>Encore wins head-to-heads, when named</span>
                        <b className="tnum">55/55</b>
                      </div>
                      <div>
                        <span>Encore named, unprompted</span>
                        <b className="tnum">3/538</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cx__sync">
                  <span className="ml">TrueSync</span>
                  {["Site schema", "GMC", "ACP", "UCP", "MCP", "API"].map((s) => (
                    <span key={s} className="cx__chip">
                      <i />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Shell>
          <Annot label="Score" className="cons__a1">
            Share of Algorithm out of 100, across visibility, accessibility and true value.
          </Annot>
          <Annot label="Queue" className="cons__a2">
            Fixes ranked by the points they recover, with an owner on each.
          </Annot>
        </Rise>
        <Prov>Gap Inc. workspace built from the Oct 21, 2026 audit: 80 questions, 876 answers, five agents. Your data replaces this in the diagnostic.</Prov>
      </div>
    </section>
  );
}
