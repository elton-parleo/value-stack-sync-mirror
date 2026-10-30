import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { findings } from "@/content/findings";
import type { Post } from "@/content/insights/types";
import { Btn } from "@/components/primitives";
import { Dial, EASE, H, Head, Logo, LogoPill, Meter, Prov, Rise, Tick, img } from "@/ds";

/* ===================== 07 The audits: what agents said, what the page said ===================== */
const STATUS: Record<string, string> = { Wrong: "st--wrong", Invisible: "st--invisible", Partial: "st--partial" };

export function Evidence() {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  const go = (d: number) => rail.current?.scrollBy({ left: d * 400, behavior: "smooth" });
  return (
    <section className="sx ev" id="audits">
      <div className="wrap">
        <Head
          lead="Seven audits since Sep 28."
          accent="The same gap in every one."
          sub="Public data, five agents, every answer checked against the company's own page the same day. The agent's words on top, the page underneath."
          right={
            <div className="ev__ctl">
              <button className="arrowbtn" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="arrowbtn" onClick={() => go(1)} disabled={edge.end} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          }
        />
      </div>
      <div className="wrap ev__wrap">
        <div className="rail" ref={rail} onScroll={onScroll}>
          {findings.map((f, i) => (
            <Rise key={f.id} className="card ev__card" delay={Math.min(i, 3) * 0.06} amount={0.2}>
              <div className="ev__top">
                <Logo name={f.logo} size={22} />
                <div>
                  <b>{f.company}</b>
                  <span className="ml">{f.date}</span>
                </div>
                <span className={`st ${STATUS[f.ledger.status]}`}>{f.ledger.status}</span>
              </div>
              <div className="ev__big">
                <span className="big tnum">{f.ledger.big}</span>
                <span>{f.ledger.of}</span>
              </div>
              <div className="aw ev__aw">
                <div className="aw__top">
                  {f.ledger.agent ? <Logo name={f.ledger.agent} size={13} /> : null}
                  <span>{f.ledger.agent ? `${f.ledger.agent} said` : "Across five agents"}</span>
                </div>
                <p className="aw__a">{f.ledger.said}</p>
              </div>
              <div className="ev__page">
                <span className="ml ml--blue">The page says</span>
                <p>{f.ledger.page}</p>
              </div>
              <span className="ml ev__src">{f.source}</span>
            </Rise>
          ))}
          <div className="ev__end card">
            <H lead="Your category is next." size="sm" as="h3" />
            <p>Five agents, your top products, three competitors, the same day's prices.</p>
            <Btn to="/agentic-value-audit" variant="blue" arrow>
              Request your audit
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== 08 Start with the diagnostic ===================== */
const STAGES = [
  { n: "01", node: "Measure", tag: "Start here, free audit", tagCls: "st--seen", k: "Diagnostic", d: "Know what the agent channel does to your revenue. Your top SKUs mapped into the decision document.", pts: ["Rank across five agents against competitors", "Infrastructure gaps, each with the citation", "Recoverable revenue, labeled modeled", "A sequenced roadmap"], un: "Who starts here: everyone. Days, not weeks." },
  { n: "02", node: "Show up", tag: "AEO and GEO", tagCls: "st--ink", k: "Visibility", d: "Show up correctly and favorably. The content and authority signals agents read, tuned to your categories.", pts: ["Answer-ready product content", "Citations that carry your claims", "Mention lift, measured monthly"], un: "What it adds: being in the room. Necessary, not sufficient." },
  { n: "03", node: "Render right", tag: "TrueSync", tagCls: "st--blue", k: "Syndication", d: "Publish once, correct everywhere, verified back. Where most customers deploy first.", pts: ["Site schema, GMC, ACP, UCP, MCP and API", "Per-SKU, per-surface control", "Drift alerts and read-back proof", "Attribution wired into analytics"], un: "What it adds: the shelf rendered right. Self-serve for DTC, piloted for enterprise.", key: true },
  { n: "04", node: "Win the price", tag: "The differentiator", tagCls: "st--onblue", k: "Agentic pricing", d: "Price and reward every shopper inside the answer, with dynamic incentives at the moment of recommendation.", pts: ["Identity-matched entitled pricing", "Incentive optimization engine", "Deep LLM integration, zero PII", "Run from the console"], un: "What it adds: margin, conversion and loyalty working inside the channel.", dark: true },
];

export function Path() {
  const reduce = useReducedMotion();
  return (
    <section className="sx path" id="start">
      <div className="wrap">
        <Head lead="Start with the diagnostic." accent="Build to full pricing power." sub="Four products, one progression. Enter where you are, expand when the numbers prove it." />
        <div className="path__line" aria-hidden="true">
          <motion.i initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.4, ease: EASE }} />
        </div>
        <div className="path__grid">
          {STAGES.map((s, i) => (
            <Rise key={s.k} delay={0.1 + i * 0.1} className="path__stage">
              <div className="path__node">
                <span className={`path__dot ${s.dark ? "is-dark" : ""} ${i === 0 ? "is-first" : ""}`}>{s.n}</span>
                <b>{s.node}</b>
              </div>
              <div className={`${s.dark ? "dcard" : "card"} path__card ${s.key ? "is-key" : ""}`}>
                {s.dark && (
                  <>
                    <img className="dcard__img" src={img("inkfield-2", 900)} alt="" loading="lazy" />
                    <div className="dcard__wash" />
                  </>
                )}
                <span className={`st ${s.tagCls}`}>{s.tag}</span>
                <h3>{s.k}</h3>
                <p>{s.d}</p>
                <ul>
                  {s.pts.map((p) => (
                    <li key={p}>
                      <Tick tone={s.dark ? undefined : "ghost"} />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="path__un">{s.un}</span>
              </div>
            </Rise>
          ))}
        </div>
        <Rise className="path__foot" delay={0.1}>
          <p>
            Most customers start with the diagnostic and deploy TrueSync first. <b>The incentive layer is where the margin lives.</b>
          </p>
          <p className="path__keep">
            Keep
            <LogoPill name="Salsify" />
            or
            <LogoPill name="Syndigo" />
            for retailer content and
            <LogoPill name="Profound" />
            or
            <LogoPill name="Bluefish" />
            for mention tracking. Parleo reads the record you already maintain and runs the layer beneath.
          </p>
        </Rise>
        <Prov>Free Agentic Value Audit. Public data, nothing to install, read-out in days.</Prov>
      </div>
    </section>
  );
}

/* ===================== 09 Research ===================== */
export function Research() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    let live = true;
    import("@/content/insights").then((m) => {
      if (!live) return;
      const lead = m.posts.find((p) => p.slug === "how-big-is-agentic-commerce") ?? m.posts[0];
      setPosts([lead, ...m.posts.filter((p) => p !== lead).slice(0, 3)]);
    });
    return () => {
      live = false;
    };
  }, []);
  const [lead, ...rest] = posts;
  return (
    <section className="sx res" id="research">
      <div className="wrap">
        <Head
          lead="Research from the agentic"
          accent="commerce shelf."
          right={
            <Link to="/insights" className="link-more">
              All insights
            </Link>
          }
        />
        {lead && (
          <div className="split split--75 split--stretch">
            <Rise>
              <Link to={`/insights/${lead.slug}`} className="card res__lead card--hover">
                <div className="res__img">
                  <img src={lead.image} alt={lead.imageAlt} loading="lazy" />
                </div>
                <div className="res__body">
                  <span className="ml ml--blue">
                    {lead.category}, {lead.readTime}
                  </span>
                  <h3>{lead.title}</h3>
                  <p>{lead.dek}</p>
                  <span className="link-more">Read</span>
                </div>
              </Link>
            </Rise>
            <div className="res__list">
              {rest.map((p, i) => (
                <Rise key={p.slug} delay={0.06 + i * 0.06}>
                  <Link to={`/insights/${p.slug}`} className="card res__item card--hover">
                    <div className="res__thumb">
                      <img src={p.image} alt="" loading="lazy" />
                    </div>
                    <div>
                      <span className="ml ml--blue">{p.category}</span>
                      <h4>{p.title}</h4>
                    </div>
                  </Link>
                </Rise>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== 10 Team ===================== */
export function Team() {
  return (
    <section className="sx team" id="team">
      <div className="wrap">
        <Rise className="sx__head">
          <h2 className="hd">
            Built by operators who have shipped both <span className="team__serif">brand</span> and <span className="team__serif">infrastructure</span>.<span className="sq" aria-hidden="true" />
          </h2>
        </Rise>
        <div className="team__grid">
          <Rise className="card team__card" amount={0.05}>
            <span className="ml ml--blue dot-live">Co-founder and CEO</span>
            <div className="team__who">
              <span className="team__av">SB</span>
              <h3>Samar Birwadker</h3>
            </div>
            <p>Brand strategist turned founder. Builds at the seam of brand, growth and infrastructure.</p>
            <ul>
              <li>Three-time founder, two exits, SaaS and fintech</li>
              <li>VP Growth and advisor to 10+ commerce startups</li>
              <li>Brand strategy at WPP and AKQA for Nike, Xbox and CPG</li>
            </ul>
            <div className="team__prior">
              <span className="ml">Prior work</span>
              <div>
                <img src="/logos/landor.png" alt="Landor" />
                <img src="/logos/wpp-tight.png" alt="WPP" />
                <img src="/logos/axel-springer-tight.png" alt="Axel Springer" />
                <img src="/logos/nike-tight.png" alt="Nike" />
              </div>
            </div>
            <a href="https://www.linkedin.com/in/samarbirwadker/" target="_blank" rel="noreferrer" className="link-more">
              LinkedIn
            </a>
          </Rise>
          <Rise className="dcard team__card team__card--dark" delay={0.08} amount={0.05}>
            <img className="dcard__img" src={img("u-arch", 900)} alt="" loading="lazy" />
            <div className="dcard__wash" />
            <span className="ml ml--dark dot-live">Co-founder and CTO</span>
            <div className="team__who">
              <span className="team__av team__av--dark">EC</span>
              <h3>Elton Cheung</h3>
            </div>
            <p>Two decades shipping marketplace and loyalty infrastructure at scale.</p>
            <ul>
              <li>20 years building commerce infrastructure</li>
              <li>Head of Product and Engineering at Rakuten Marketing</li>
              <li>Five years at Groupon on marketplace and loyalty infrastructure</li>
            </ul>
            <div className="team__prior">
              <span className="ml ml--dark">Prior work</span>
              <div className="team__logos--dark">
                <img src="/logos/rakuten-tight.png" alt="Rakuten" />
                <img src="/logos/groupon-tight.png" alt="Groupon" />
                <img src="/logos/alphaflow-tight.png" alt="AlphaFlow" />
              </div>
            </div>
            <a href="https://www.linkedin.com/in/eltoncheung/" target="_blank" rel="noreferrer" className="link-more link-more--dark">
              LinkedIn
            </a>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ===================== 11 Close ===================== */
export function Close({ source = "home-close" }: { source?: string }) {
  return (
    <section className="sx cta" id="request" data-source={source}>
      <div className="wrap">
        <Rise className="dcard cta__card" amount={0.2}>
          <img className="dcard__img cta__img" src={img("u-arch", 1600)} alt="" loading="lazy" />
          <div className="dcard__wash cta__wash" />
          <div className="cta__grid">
            <div>
              <h2 className="hd hd--dark hd--serif cta__h">
                Own your <em>Share of Algorithm.</em>
              </h2>
              <p className="sub sub--dark">Start with the free Agentic Value Audit: how agents describe, rank and price your top products against competitors, where your catalog has drifted, and the fastest fixes. No systems access. Read-out in days.</p>
              <div className="cta__ctas">
                <Btn to="/agentic-value-audit" variant="blue" size="lg" arrow>
                  Get your free Agentic Value Audit
                </Btn>
                <a className="cta__mail" href="/agentic-value-report">
                  Or email your top SKUs and three competitors
                </a>
              </div>
            </div>
            <div className="cta__report">
              <div className="cta__report-top">
                <Logo name="Gap" size={16} />
                <span className="ml">Gap Inc. read-out, Oct 21</span>
              </div>
              <p className="cta__quote">"Gap, benchmarked: 80 real shopper questions, five agents, 876 answers checked against the page."</p>
              <div className="cta__score">
                <Dial value={54} size={96} />
                <div>
                  <b>Share of Algorithm</b>
                  <span>the baseline, day one</span>
                </div>
              </div>
              {[
                ["Named in shopping answers", "172 of 180"],
                ["Prices that matched the shelf", "15 of 83"],
                ["Fixes, ranked with an owner", "3"],
              ].map(([k, v]) => (
                <div key={k} className="cta__row">
                  <span>{k}</span>
                  <b className="tnum">{v}</b>
                </div>
              ))}
              <Meter value={54} height={4} />
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
