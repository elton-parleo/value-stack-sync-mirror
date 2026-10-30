import { useEffect, useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Close from "@/site/home/Close";
import { openStart } from "@/components/start";
import { Head, Stat, useOnce, useReveal } from "@/site/kit";
import { AGENTS5, App, Icon, Mark } from "@/site/v4kit";
import { Ring } from "@/site/product/six";
import "@/site/site.css";
import "@/site/v3.css";
import "@/site/v4.css";
import "@/site/v6.css";
import "@/site/v7.css";
import "@/site/v8.css";

/* The Agentic Value Report. Sells the report by showing real ones: three sample reports from Parleo
   research, the inside of the Nike report section by section, how it is built, the score, and the ask.
   Every figure is from the named report; dollar figures are the reports' modeled ranges. */

const go = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ---------- hero: three sample reports in a stack, the front one turns every few seconds ---------- */
const COVERS = [
  { co: "lowes", name: "Lowe's", img: "/img/v6/rp/lowes.webp", title: "AI assistants send Lowe’s appliance shoppers to Costco and Best Buy.", score: 47, n: "33 of 44", k: "appliance answers put Costco or Best Buy first", stake: "$14m to $55m" },
  { co: "ulta", name: "Ulta Beauty", img: "/img/v7/rp/ulta.webp", title: "Assistants leave out that only Ulta carries its exclusives, and send shoppers to the brand.", score: 66, n: "24 of 44", k: "where-to-buy answers put the brand’s site first", stake: "$14m to $55m" },
  { co: "nordstrom", name: "Nordstrom", img: "/img/v7/rp/nordstrom.webp", title: "AI recommends Nordstrom for its returns, and sends shoppers who want rewards elsewhere.", score: 70, n: "20 of 48", k: "Gemini best-seller answers promised a price match", stake: "$20m to $79m" },
];

function Hero() {
  const [ref, on] = useOnce<HTMLDivElement>(0.1);
  const [front, setFront] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (!on || hold) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setFront((f) => (f + 1) % COVERS.length), 4800);
    return () => window.clearInterval(t);
  }, [on, hold]);
  const c = COVERS[front];
  return (
    <section className="rp6h rp7h" data-hero>
      <div className="rp7h__bg" aria-hidden="true">
        <i className="rp7h__glow" />
        <i className="rp7h__lines" />
      </div>
      <div className="wrap rp6h__grid">
        <div className="rp6h__copy">
          <Head as="h1" lead="What AI tells your shoppers," more="checked against the truth." sq />
          <p className="body rp6h__lede">
            Five AI assistants answer the questions your shoppers ask about your top SKUs. Parleo checks every answer against your own pages and your competitors, and scores it out of 100. <b>Then it puts a dollar figure on the gap and ranks what to fix first.</b>
          </p>
          <ul className="rp6h__facts">
            <li>
              <Icon n="clock" size={15} /> Back in hours
            </li>
            <li>
              <Icon n="lock" size={15} /> Public data only
            </li>
            <li>
              <Icon n="check" size={15} /> Free
            </li>
          </ul>
          <div className="rp6h__ctas">
            <a className="btn btn--blue btn--lg" href="#audit" onClick={go("audit")}>
              Get your report <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--outline btn--lg" href="#samples" onClick={go("samples")}>
              See sample reports
            </a>
          </div>
          <div className="rp7h__asked">
            <span>Asked of</span>
            {AGENTS5.map((a) => (
              <i key={a} title={a}>
                <App a={a} size={15} />
              </i>
            ))}
          </div>
        </div>

        <div className={`rp7h__art ${on ? "is-on" : ""}`} ref={ref} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} aria-label="Three sample Agentic Value Reports, from Parleo research">
          <div className="rp7h__stack">
            {COVERS.map((cv, i) => {
              const pos = (i - front + COVERS.length) % COVERS.length;
              return (
                <button type="button" key={cv.co} className={`rp7h__cover is-p${pos}`} onClick={() => setFront(i)} aria-label={`${cv.name} report`} tabIndex={pos === 0 ? -1 : 0}>
                  <div className="rp6__bar">
                    <i />
                    <i />
                    <i />
                    <span>Agentic Value Report, {cv.name}</span>
                  </div>
                  <div className="rp7h__cvbody">
                    <span className="rp7h__brand">
                      <Mark k={cv.co} h={13} title={cv.name} />
                      <em>From Parleo research</em>
                    </span>
                    <h3>{cv.title}</h3>
                    <div className="rp7h__photo">
                      <img src={cv.img} alt="" />
                    </div>
                    <div className="rp7h__stats">
                      <b>{cv.n}</b>
                      <span>{cv.k}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="rp7h__score" key={`s${front}`}>
            <Ring n={c.score} size={64} />
            <span>
              <b>Share of Algorithm</b>
              <em>{c.name}, out of 100</em>
            </span>
          </div>
          <div className="rp7h__stake" key={`k${front}`}>
            <span>Revenue at stake</span>
            <b>{c.stake}</b>
            <em>a year, modeled</em>
          </div>
          <div className="rp7h__dots" role="tablist" aria-label="Sample reports">
            {COVERS.map((cv, i) => (
              <button key={cv.co} type="button" role="tab" aria-selected={i === front} className={i === front ? "is-on" : ""} onClick={() => setFront(i)}>
                <Mark k={cv.co} h={9} title={cv.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- three real reports ---------- */
const SAMPLES = [
  {
    co: "nike",
    name: "Nike",
    img: "/img/v6/rp/pegasus.webp",
    fit: "contain",
    title: "AI assistants are teaching Nike’s shoppers to wait for a sale",
    n: "77 of 88",
    k: "best-seller answers said wait for a sale",
    score: 54,
    stake: "$19m to $75m",
    href: "https://parleo-reports.vercel.app/reports/nike-3de6/",
  },
  {
    co: "lowes",
    name: "Lowe's",
    img: "/img/v6/rp/lowes.webp",
    fit: "cover",
    title: "AI assistants send Lowe’s appliance shoppers to Costco and Best Buy",
    n: "33 of 44",
    k: "appliance answers put Costco or Best Buy first",
    score: 47,
    stake: "$14m to $55m",
    href: "https://parleo-reports.vercel.app/reports/lowes-48hd/",
  },
  {
    co: "ulta",
    name: "Ulta Beauty",
    img: "/img/v7/rp/ulta.webp",
    fit: "cover",
    title: "AI assistants leave out that only Ulta carries its exclusives, and send shoppers to the brand",
    n: "24 of 44",
    k: "where-to-buy answers put the brand’s site first",
    score: 66,
    stake: "$14m to $55m",
    href: "https://parleo-reports.vercel.app/reports/ulta-njc8/",
  },
];

function Samples() {
  const [ref, on] = useOnce<HTMLDivElement>(0.15);
  return (
    <section className="sec rp6s" id="samples">
      <div className="wrap in6">
        <Head lead="Open a sample report," more="and judge the work yourself." sq />
        <div className="in6__body">
          <p className="body">
            Every report is built the same way: real answers from five assistants, <b>each one next to the page it should have matched,</b> then scored and priced.
          </p>
        </div>
      </div>
      <div className={`wrap wrap--wide rp6s__grid ${on ? "is-on" : ""}`} ref={ref}>
        {SAMPLES.map((s, i) => (
          <a key={s.co} className="rp6s__card rs8" href={s.href} target="_blank" rel="noreferrer" aria-label={`Open the ${s.name} report in a new tab`} style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}>
            <div className={`rp6s__img is-${s.fit}`}>
              <img src={s.img} alt="" loading="lazy" />
              <span className="rs8__cover">
                <Mark k={s.co} h={12} title={s.name} />
                <em>Agentic Value Report</em>
              </span>
              <span className="rs8__ring">
                <Ring n={s.score} size={58} />
              </span>
            </div>
            <div className="rp6s__body rs8__body">
              <span className="rs8__live">
                <i /> Live report, sample
              </span>
              <h3>{s.title}</h3>
              <div className="rs8__n">
                <b>{s.n}</b>
                <span>{s.k}</span>
              </div>
              <span className="rs8__stake">
                <b>{s.stake}</b> a year at stake, modeled
              </span>
              <span className="rs8__cta">
                Open the {s.name} report
                <Icon n="arrow" size={15} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- inside the Nike report ---------- */
const RL0 = Math.log10(0.01);
const RL1 = Math.log10(8.6);
const rl = (v: number) => ((Math.log10(v) - RL0) / (RL1 - RL0)) * 100;
const rb = (v: number) => (v >= 1 ? `$${v.toFixed(v >= 10 ? 1 : 2)}bn` : `$${Math.round(v * 1000)}m`);
const TABS = ["Key findings", "Share of Algorithm", "The evidence", "Revenue at stake", "Who fixes what"];

function Inside() {
  const [t, setT] = useState(0);
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  return (
    <section className="sec rp6i" id="inside">
      <div className="wrap in6">
        <Head lead="Inside a report:" more="the finding, the proof, the price, the fix." sq />
        <div className="in6__body">
          <p className="body">
            Each report opens with what we found and closes with who can fix it. In between, <b>every number sits next to its source</b>, so your team can check it line by line. This is the Nike report.
          </p>
        </div>
      </div>
      <div className={`wrap wrap--wide ${on ? "is-on" : ""}`} ref={ref}>
        <div className="rp6i__frame">
          <div className="rp6__bar">
            <i />
            <i />
            <i />
            <span>parleo.io, Agentic Value Report, Nike</span>
          </div>
          <div className="rp6i__tabs" role="tablist">
            {TABS.map((k, i) => (
              <button key={k} role="tab" aria-selected={t === i} className={t === i ? "is-on" : ""} onClick={() => setT(i)}>
                <span>{i + 1}</span>
                {k}
              </button>
            ))}
          </div>
          <div className="rp6i__pane" key={t}>
            {t === 0 && (
              <>
              <div className="rp6i__fh">
                <Mark k="nike" h={14} title="Nike" />
                <h4>AI assistants are teaching Nike&rsquo;s shoppers to wait for a sale, which cuts against Nike&rsquo;s push to sell more at full price.</h4>
              </div>
              <div className="kf8">
                <div className="kf8__lead c8-dark">
                  <span className="k8">The headline finding</span>
                  <Stat n={77} of={88} dark size="l" k="best-seller answers told a full-price shopper to wait for a sale" />
                  <p>
                    <App a="ChatGPT" size={14} /> ChatGPT said it in all 24 of its answers.
                  </p>
                </div>
                <ul className="kf8__rest">
                  {(
                    [
                      ["fork", "22 of 33", "head-to-heads on the Pegasus 42 and P-6000 picked adidas or New Balance. Nike won 2.", "bad"],
                      ["eye", "0 of 88", "answers mentioned the 60-day Wear Test, Nike’s best reason to pay full price.", "warn"],
                      ["tag", "0 of 8", "member price answers on Gemini and AI Mode gave the price Nike was charging.", "bad"],
                    ] as [Parameters<typeof Icon>[0]["n"], string, string, string][]
                  ).map(([ic, n, k, tone], i) => (
                    <li key={n} className={`is-${tone}`} style={{ ["--d" as string]: `${0.15 + i * 0.1}s` } as CSSProperties}>
                      <span className="kf8__ic">
                        <Icon n={ic} size={15} />
                      </span>
                      <b>{n}</b>
                      <p>{k}</p>
                    </li>
                  ))}
                </ul>
              </div>
              </>
            )}
            {t === 1 && (
              <div className="rp6i__score rp7soa">
                <div className="rp7soa__card">
                  <div className="rp7soa__prod">
                    <img src="/img/v6/rp/pegasus.webp" alt="" />
                  </div>
                  <div className="rp7soa__ring">
                    <Ring n={54} size={118} />
                    <span>
                      <b>Share of Algorithm, Nike</b>
                      <em>Out of 100, across 718 answers from five assistants</em>
                    </span>
                  </div>
                  <p>
                    Assistants name Nike almost every time. <b>Most of the points lost are in True Value</b>, the price quoted and the terms that go with it.
                  </p>
                </div>
                <ul className="rp7soa__pl">
                  {[
                    ["eye", "Visibility", 19, 32, "Do assistants recommend Nike?", "Named in 172 of 180 answers, ranked first in 38", ""],
                    ["lock", "Accessibility", 9, 18, "Can they read nike.com?", "robots.txt lets in all 7 assistant crawlers. 9 points not verified", "Not scored as zero"],
                    ["tag", "True Value", 26, 50, "Do they get the real offer right?", "35 of 89 prices matched nike.com exactly that day", "Most points lost"],
                  ].map(([ic, k, n, of, q, d, chip], i) => (
                    <li key={k as string} className={chip === "Most points lost" ? "is-low" : ""} style={{ ["--p" as string]: (n as number) / (of as number), ["--d" as string]: `${0.15 + i * 0.12}s` } as CSSProperties}>
                      <span className="rp7soa__ic">
                        <Icon n={ic as Parameters<typeof Icon>[0]["n"]} size={16} />
                      </span>
                      <span className="rp7soa__k">
                        <b>{k}</b>
                        <em>{q}</em>
                      </span>
                      <span className="rp7soa__n">
                        {n}
                        <small>/{of}</small>
                      </span>
                      <i className="rp7soa__bar">
                        <u />
                      </i>
                      <p>{d}</p>
                      {chip && <span className="rp7soa__chip">{chip}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {t === 2 && (
              <div className="rp6i__ev">
                <figure>
                  <img src="/img/v6/rp/gpt_pegasus.webp" alt="ChatGPT's answer on the Nike Pegasus 42: buy it on sale, not at full price, with a target price of $85 to $105" />
                  <figcaption>
                    <App a="ChatGPT" size={14} /> ChatGPT, signed in, the real answer
                  </figcaption>
                </figure>
                <div className="rp6i__evside">
                  <div className="c6__truth">
                    <span>
                      <Icon n="check" size={13} /> nike.com, the same day
                    </span>
                    <p>Pegasus 42 at $145, full price. 7 of 15 men&rsquo;s colorways on sale.</p>
                  </div>
                  <div className="rp6i__evn">
                    <b>
                      11<small> of 11</small>
                    </b>
                    <span>answers on the Pegasus 42 said wait</span>
                  </div>
                  <p className="rp6i__evnote">Every answer in the report is quoted word for word, with the assistant, the try and the page it was checked against.</p>
                </div>
              </div>
            )}
            {t === 3 && (
              <div className="rp6i__rev">
                <ol>
                  {(
                    [
                      ["", "$8.6bn", "Nike’s digital sales, fiscal 2026", 8.6, 8.6],
                      ["×", "10% to 20%", "the share AI assistants influence", 0.86, 1.72],
                      ["×", "77 of 88", "best-seller answers that said wait", 0.75, 1.5],
                      ["×", "10% to 20%", "shoppers who act on it", 0.075, 0.3],
                      ["×", "about 25%", "the typical markdown on those best sellers", 0.019, 0.075],
                    ] as [string, string, string, number, number][]
                  ).map(([op, n, k, lo, hi], i) => (
                    <li key={k} className="rp7rev" style={{ ["--d" as string]: `${i * 0.08}s` } as CSSProperties}>
                      <i>{op}</i>
                      <b>{n}</b>
                      <span>{k}</span>
                      <div className="pv7__bar rp7rev__bar" aria-hidden="true">
                        <u style={{ width: `${rl(hi)}%` }} />
                        <s style={{ width: `${rl(lo)}%` }} />
                        <em>{lo === hi ? rb(hi) : `${rb(lo)} to ${rb(hi)}`}</em>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="rp6i__tot">
                  <span>Margin at stake when shoppers wait for a sale</span>
                  <b>$19m to $75m</b>
                  <em>a year, mid point about $37m. Modeled from the study, not a forecast.</em>
                </div>
              </div>
            )}
            {t === 4 && (
              <ul className="rp6i__who">
                {[
                  ["Answers that say wait for a sale", "Nobody yet", "off"],
                  ["Head-to-heads lost to adidas and New Balance", "Nike’s product story", "own"],
                  ["The Wear Test and the 14-day price adjustment, missing", "Parleo, today", "p"],
                  ["Member prices quoted wrong on Google’s assistants", "Parleo, today", "p"],
                  ["Membership told as terms, never as a dollar value", "The direction, one channel open", "own"],
                ].map(([k, w, c]) => (
                  <li key={k} className={`is-${c}`}>
                    <span>{k}</span>
                    <b>
                      {c === "p" ? <Icon n="check" size={13} /> : <i />}
                      {w}
                    </b>
                  </li>
                ))}
                <li className="rp6i__whonote">An honest read on what Parleo can fix and what it can&rsquo;t, finding by finding.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- how it's built ---------- */
const STEPS: { i: Parameters<typeof Icon>[0]["n"]; k: string; d: string }[] = [
  { i: "record", k: "Your top SKUs", d: "You name the products and the competitors you want to be measured against." },
  { i: "spark", k: "The questions shoppers ask", d: "Where to buy, is it worth it, which is better, what a member pays, most of them asked more than once." },
  { i: "eye", k: "Five assistants", d: "ChatGPT, Gemini, Perplexity, Google AI Mode and Copilot, logged out, the way a shopper sees them." },
  { i: "readback", k: "Checked against the truth", d: "Every answer set beside your pages and your competitors’ the same day." },
  { i: "dollar", k: "Scored and priced", d: "Share of Algorithm out of 100, revenue at stake, and the fixes in order of money." },
];

function How() {
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  return (
    <section className="sec rp6w" id="how">
      <div className="wrap in6">
        <Head lead="Built in hours," more="from public data." dark sq />
        <div className="in6__body">
          <p className="body body--dark">
            No access to your systems, no integration, no shopper data. <b>Just the answers your shoppers already get</b>, and the pages those answers should have matched.
          </p>
        </div>
      </div>
      <div className={`wrap wrap--wide rp6w__steps ${on ? "is-on" : ""}`} ref={ref}>
        {STEPS.map((s, i) => (
          <div key={s.k} className="rp6w__step" style={{ ["--d" as string]: `${i * 0.12}s` } as CSSProperties}>
            <span className="rp6w__no">{i + 1}</span>
            <span className="rp6w__i">
              <Icon n={s.i} size={19} />
            </span>
            <b>{s.k}</b>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      <div className="wrap rp6w__ags">
        <span>Asked of</span>
        {["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"].map((a) => (
          <App key={a} a={a} size={22} />
        ))}
      </div>
    </section>
  );
}

/* ---------- the score ---------- */
const PILLARS: { k: string; pts: number; q: string; checks: string[]; mine?: boolean }[] = [
  { k: "Visibility", pts: 32, q: "Do assistants recommend you, and how high?", checks: ["Named in the answer", "Recommended first", "Where to buy, with no store named", "Head to head against your competitors"] },
  { k: "Accessibility", pts: 18, q: "Can assistants read your site?", checks: ["robots.txt lets assistant crawlers in", "Product pages load for each assistant", "Price and stock in the page code", "Product markup agents can parse"] },
  { k: "True Value", pts: 50, q: "Do they get your real offer right?", checks: ["The price quoted, against your page that day", "Sales, coupons and when they end", "Member prices, points and perks", "Shipping, returns and services"], mine: true },
];

function Score() {
  return (
    <section className="sec rp6p" id="score">
      <div className="wrap in6">
        <Head lead="Share of Algorithm:" more="100 points, three pillars." sq />
        <div className="in6__body">
          <p className="body">
            Visibility tools stop at the first pillar. <b>True Value is the one that decides the sale</b>: whether your real price, your member value and your terms reach the shopper. A check we can&rsquo;t verify is left out, never scored as zero.
          </p>
        </div>
      </div>
      <div className="wrap wrap--wide sa8">
        <div className="sa8__body c8-dark">
          <aside className="sa8__stm">
            <span className="k8">Share of Algorithm</span>
            <div className="sa8__n">
              <b>100</b>
              <span>points, three pillars</span>
            </div>
            <div className="sa8__split" aria-hidden="true">
              {PILLARS.map((p) => (
                <i key={p.k} className={p.mine ? "is-mine" : ""} style={{ flex: p.pts }}>
                  <em>{p.pts}</em>
                </i>
              ))}
            </div>
            <div className="sa8__lg">
              {PILLARS.map((p) => (
                <span key={p.k} className={p.mine ? "is-mine" : ""}>
                  <i /> {p.k}
                </span>
              ))}
            </div>
            <p className="cn8__why">Half the score is True Value, the pillar visibility tools don&rsquo;t measure.</p>
          </aside>
          <div className="sa8__panel">
            {PILLARS.map((p, i) => (
              <article key={p.k} className={p.mine ? "is-mine" : ""} style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}>
                <header>
                  <span className="sa8__ic">
                    <Icon n={i === 0 ? "eye" : i === 1 ? "lock" : "tag"} size={15} />
                  </span>
                  <span className="sa8__k">
                    <b>{p.k}</b>
                    <em>{p.q}</em>
                  </span>
                  <span className="sa8__pts">
                    {p.pts}
                    <small> pts</small>
                  </span>
                </header>
                <ul>
                  {p.checks.map((c) => (
                    <li key={c}>
                      <Icon n="check" size={12} />
                      {c}
                    </li>
                  ))}
                </ul>
                {p.mine && <span className="chip8 chip8--blue sa8__chip"><i /> Decides the sale</span>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- what you get, then what happens after ---------- */
const GET: { i: Parameters<typeof Icon>[0]["n"]; k: string; d: string }[] = [
  { i: "eye", k: "Your score out of 100", d: "Three pillars, every point listed in the method." },
  { i: "readback", k: "Every answer, next to your page", d: "Quoted word for word, with the assistant and the date." },
  { i: "fork", k: "Where assistants send your shoppers", d: "Against the competitors you choose, product by product." },
  { i: "dollar", k: "Revenue at stake", d: "Built from your public sales, every input shown, labeled modeled." },
  { i: "check", k: "Who fixes what", d: "Each finding with its owner, and an honest line on what Parleo can fix." },
  { i: "record", k: "A plan for your top SKUs", d: "The records Parleo would publish, and how the answers get re-checked weekly." },
];

function Get() {
  return (
    <section className="sec rp6g">
      <div className="wrap rp6g__grid">
        <div>
          <Head lead="What you get" sq size="m" />
          <p className="body rp6g__lede">
            One report, written for the people who own the fix, <b>ready to forward as it is.</b>
          </p>
        </div>
        <ul>
          {GET.map((g) => (
            <li key={g.k}>
              <span className="pt6__i">
                <Icon n={g.i} size={18} />
              </span>
              <b>{g.k}</b>
              <p>{g.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQ: [string, string][] = [
  ["Do you need access to our systems?", "No. The report is built from public data only: the answers AI assistants give your shoppers, and your public pages. No integration, no login, no shopper data."],
  ["Which assistants do you check?", "ChatGPT, Gemini, Perplexity, Google AI Mode and Copilot, logged out, the way a first-time shopper sees them. Most questions are asked more than once."],
  ["How long does it take?", "Hours. Send your top SKUs and the competitors you care about, and the report comes back the same day."],
  ["What does it cost?", "Nothing. The report is free."],
  ["How is the dollar figure built?", "From your public online sales, the share of shopping AI assistants influence, the answers that went against you and the shoppers who act on them. Every input is listed in the method, and the figure is labeled modeled."],
  ["Who sees it?", "Each report is an unlisted link made for your team. It isn’t indexed by search engines."],
  ["What happens after the report?", "If you want the answers fixed, Parleo starts with your top SKUs: one checked record each, published where assistants read, and re-asked every week."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec rp6f" id="faq">
      <div className="wrap rp6f__grid">
        <div>
          <Head lead="FAQ" size="m" />
          <p className="body">
            Something else? <button type="button" className="rp6f__ask" onClick={() => openStart()}>Ask us directly</button>
          </p>
        </div>
        <ul>
          {FAQ.map(([q, a], i) => (
            <li key={q} className={open === i ? "is-open" : ""}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {q}
                <span aria-hidden="true">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p>{a}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Audit() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>The Agentic Value Report | Parleo</title>
        <meta name="description" content="What AI tells your shoppers, checked against your own pages: five assistants, every answer checked against your own pages, a Share of Algorithm score, revenue at stake and the fixes in order of money. Free, from public data, back in hours." />
        <link rel="canonical" href="https://parleo.io/agentic-value-report" />
      </Helmet>
      <Nav />
      <main className="rp6">
        <Hero />
        <Samples />
        <Inside />
        <How />
        <Score />
        <Get />
        <Faq />
        <Close source="report-close" />
      </main>
      <Footer />
    </>
  );
}
