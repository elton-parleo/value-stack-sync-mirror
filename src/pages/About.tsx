import { useState, type CSSProperties, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Close from "@/site/home/Close";
import { Head, useOnce, useReveal } from "@/site/kit";
import { App, Icon, Mark, Spec } from "@/site/v4kit";
import { appendUtms, captureEvent } from "@/lib/analytics";
import "@/site/site.css";
import "@/site/v3.css";
import "@/site/v4.css";
import "@/site/v6.css";
import "@/site/v7.css";
import "@/site/v8.css";
import "@/site/about.css";

/* About: the vision first (commerce rebuilt for agents, the fourth measurement era, what we believe),
   then the founding team in their own words from the previous site, the investors, and careers. */

const ERAS = [
  { k: "Share of Shelf", unit: "Facings counted in store", when: "1950s to 1990s", spend: "$8B", g: "shelf" },
  { k: "Share of Voice", unit: "Impressions and GRPs", when: "1960s to 2000s", spend: "$12B", g: "voice" },
  { k: "Share of Search", unit: "Queries, clicks, rank", when: "2000s to today", spend: "$200B+", g: "search" },
  { k: "Share of Algorithm", unit: "What agents read, believe and recommend", when: "Now", spend: "Unclaimed", g: "algo" },
] as const;

function Glyph({ g }: { g: (typeof ERAS)[number]["g"] }) {
  if (g === "shelf")
    return (
      <svg viewBox="0 0 120 64" aria-hidden="true">
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <line x1="6" x2="114" y1={20 + r * 20} y2={20 + r * 20} />
            {[0, 1, 2, 3, 4, 5, 6].map((c) => (
              <rect key={c} x={10 + c * 15} y={8 + r * 20} width="11" height="12" rx="1.5" className={r === 1 && c > 1 && c < 4 ? "is-on" : ""} />
            ))}
          </g>
        ))}
      </svg>
    );
  if (g === "voice")
    return (
      <svg viewBox="0 0 120 64" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 0.9)) * 40;
          return <rect key={i} x={6 + i * 6.2} y={32 - h / 2} width="3.4" height={h} rx="1.7" className={i > 6 && i < 11 ? "is-on" : ""} />;
        })}
      </svg>
    );
  if (g === "search")
    return (
      <svg viewBox="0 0 120 64" aria-hidden="true">
        <rect x="6" y="4" width="108" height="14" rx="7" />
        <circle cx="15" cy="11" r="3" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="6" y={26 + i * 13} width={i === 0 ? 70 : 90 - i * 18} height="4" rx="2" className={i === 0 ? "is-on" : ""} />
            <rect x="6" y={32 + i * 13} width={60 - i * 10} height="2.4" rx="1.2" />
          </g>
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 120 64" aria-hidden="true" className="ab-era__algo">
      {[10, 22, 34, 46, 58].map((y, i) => (
        <g key={y}>
          <path d={`M10 ${y} C 50 ${y}, 70 32, 104 32`} />
          <circle cx="10" cy={y} r="3.2" />
          <circle className="ab-era__pulse" r="1.8" style={{ ["--i" as string]: i } as CSSProperties}>
            <animateMotion dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={`M10 ${y} C 50 ${y}, 70 32, 104 32`} />
          </circle>
        </g>
      ))}
      <rect x="100" y="25" width="16" height="14" rx="3" className="is-on" />
    </svg>
  );
}

const PROTOCOLS = ["ACP", "UCP", "AP2", "MCP", "Visa TAP", "Agent Pay", "Merchant feeds", "Site markup"];

type Founder = { n: string; role: string; bio: string; li?: string; logos: { src: string; alt: string; h: number }[] };
/* Samar and Elton keep the bios from the previous parleo.io, word for word. */
const TEAM: Founder[] = [
  {
    n: "Samar Birwadker",
    role: "Co-Founder · Commercial Strategy",
    bio: "Brand strategist turned founder. Builds at the seam of brand, growth, and infrastructure. 3x founder, 2x exits (SaaS, Fintech). VP Growth + advisor & investor in 10+ startups. Brand strategy at WPP / AKQA for Nike, Xbox, CPG.",
    li: "https://www.linkedin.com/in/samarbirwadker/",
    logos: [
      { src: "/img/about/goodco.png", alt: "Good&Co", h: 30 },
      { src: "/logos/axel-springer-tight.png", alt: "Axel Springer", h: 14 },
      { src: "/logos/wpp-tight.png", alt: "WPP", h: 17 },
      { src: "/logos/nike-tight.png", alt: "Nike", h: 15 },
      { src: "/img/about/landor.png", alt: "Landor", h: 15 },
    ],
  },
  {
    n: "Elton Cheung",
    role: "Co-Founder · Protocol Architecture",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    li: "https://www.linkedin.com/in/eltoncheung/",
    logos: [
      { src: "/logos/rakuten-tight.png", alt: "Rakuten", h: 17 },
      { src: "/logos/groupon-tight.png", alt: "Groupon", h: 16 },
      { src: "/logos/alphaflow-tight.png", alt: "AlphaFlow", h: 17 },
    ],
  },
  {
    n: "Josh Krammes",
    role: "Go-to-Market",
    bio: "Enterprise go-to-market across cloud, data center and edge infrastructure at IBM, Equinix, StackPath and SoftLayer. Runs Parleo's outbound, pipeline and enterprise accounts.",
    li: "https://www.linkedin.com/in/joshuakrammes/",
    logos: [
      { src: "/img/about/ibm.png", alt: "IBM", h: 18 },
      { src: "/img/about/equinix.png", alt: "Equinix", h: 28 },
      { src: "/img/about/stackpath.png", alt: "StackPath", h: 16 },
      { src: "/img/about/softlayer.png", alt: "SoftLayer", h: 11 },
    ],
  },
];

const BACKERS = [
  { k: "Antler", src: "/img/about/antler.svg", h: 26, where: "San Francisco" },
  { k: "Wedbush Ventures", src: "/img/about/wedbush.png", h: 26, where: "Los Angeles" },
  { k: "Corazon Capital", src: "/img/about/corazon.png", h: 34, word: "Corazon Capital", where: "Chicago" },
  { k: "Long Way Ventures", src: "/img/about/longway.png", h: 56, where: "Bend, Oregon" },
];

const FORMSPREE_URL = "https://formspree.io/f/xyklyajq";

function Careers() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    fd.append("_subject", "Careers at Parleo");
    fd.append("source", "about-careers");
    appendUtms(fd);
    try {
      const res = await fetch(FORMSPREE_URL, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      setState("done");
      captureEvent("careers_submitted", { source: "about" });
    } catch {
      setState("error");
    }
  }
  return (
    <section className="sec ab-car" id="careers">
      <div className="wrap wrap--wide">
        <div className="ab-car__card c8-dark" data-rv>
          <div className="ab-car__copy">
            <span className="k8">Careers</span>
            <h2 className="ab-car__h">Build the layer agents shop through.</h2>
            <p>
              We&rsquo;re putting together the founding engineering team in the Bay Area, hybrid. If you&rsquo;ve shipped data systems, crawlers or commerce infrastructure and want a real stake in what comes next, tell us about yourself.
            </p>
            <ul>
              <li>
                <Icon n="check" size={13} /> Founding team equity
              </li>
              <li>
                <Icon n="check" size={13} /> Bay Area, hybrid
              </li>
              <li>
                <Icon n="check" size={13} /> Working directly with the founders and early customers
              </li>
            </ul>
          </div>
          <div className="ab-car__form">
            {state === "done" ? (
              <div className="ab-car__done" aria-live="polite">
                <Icon n="check" size={20} />
                <b>Thanks, we have it.</b>
                <span>We read every note and reply within a week.</span>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="ab-car__row">
                  <label>
                    <span>Name</span>
                    <input name="name" required autoComplete="name" placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
                  </label>
                </div>
                <label>
                  <span>LinkedIn or portfolio</span>
                  <input name="link" type="url" placeholder="https://" />
                </label>
                <label>
                  <span>What would you want to build here?</span>
                  <textarea name="message" rows={3} placeholder="A few lines is plenty" />
                </label>
                {state === "error" && <p className="ab-car__err">Something went wrong. Please try again.</p>}
                <button type="submit" className="ab-car__go" disabled={state === "sending"}>
                  {state === "sending" ? "Sending" : "Send"} <Icon n="arrow" size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useReveal();
  const [eraRef, eraOn] = useOnce<HTMLDivElement>(0.2);
  const [blRef, blOn] = useOnce<HTMLDivElement>(0.15);
  const [tmRef, tmOn] = useOnce<HTMLDivElement>(0.15);
  return (
    <>
      <Helmet>
        <title>About Parleo | The team behind the agentic commerce platform</title>
        <meta name="description" content="Commerce was built for the human eye and is being rebuilt for AI agents. Parleo puts a brand's and a retailer's real value into every AI answer. Meet the founding team and the investors behind it." />
        <link rel="canonical" href="https://parleo.io/about" />
      </Helmet>
      <Nav heroDark />
      <main className="ab">
        {/* 01 · the vision, over the deck cover still: every product, threaded to one answer */}
        <section className="ab-hero" data-hero>
          <picture className="ab-hero__pic">
            <source type="image/webp" srcSet="/img/about/vision-900.webp 900w, /img/about/vision-1440.webp 1440w, /img/about/vision-1920.webp 1920w" sizes="100vw" />
            <img src="/customerdeck-title-desktop.jpg" alt="Real goods on dark stone, a sneaker half turned to wireframe, each tagged and threaded with blue string to a single point" fetchPriority="high" />
          </picture>
          <div className="ab-hero__wash" aria-hidden="true" />
          <div className="wrap ab-hero__in">
            <span className="ab-hero__eye">
              <i /> About Parleo
            </span>
            <h1 className="ab-hero__h">
              Commerce was built for the human eye. <span>It&rsquo;s being rebuilt for agents.</span>
            </h1>
            <p className="ab-hero__p">
              When an AI agent decides what to buy, it reads the list price and little else. The member price, the coupon a brand paid for, the free returns, the reason your product is worth choosing: none of it reaches the moment of decision. <b>Parleo exists to put a company&rsquo;s real value into every answer, verified, and measured in dollars.</b>
            </p>
            <div className="ab-hero__facts">
              <span>
                <b>2025</b> Founded at Antler, San Francisco
              </span>
              <span>
                <b>5</b> AI assistants measured every week
              </span>
              <span>
                <b>2</b> sides of the shelf served: brands and retailers
              </span>
            </div>
          </div>
        </section>

        {/* 02 · the fourth measurement era */}
        <section className="sec ab-era" id="vision">
          <div className="wrap in6">
            <Head lead="Every channel shift mints a new measure." more="This is the fourth." sq />
            <div className="in6__body">
              <p className="body">
                Shelf, voice and search each built an industry around one number that told a brand whether it was winning. Agentic commerce has no such number yet. <b>Share of Algorithm is ours:</b> whether agents can read you, whether they recommend you, and whether they get your real price and offer right.
              </p>
            </div>
          </div>
          <div className={`wrap wrap--wide ab-era__band ${eraOn ? "is-on" : ""}`} ref={eraRef}>
            {ERAS.map((e, i) => (
              <article key={e.k} className={`ab-era__c ${e.g === "algo" ? "is-now c8-dark" : ""}`} style={{ ["--d" as string]: `${i * 0.12}s` } as CSSProperties}>
                <span className="ab-era__n">0{i + 1}</span>
                <div className="ab-era__g">
                  <Glyph g={e.g} />
                </div>
                <b className="ab-era__k">{e.k}</b>
                <span className="ab-era__u">{e.unit}</span>
                <footer>
                  <span>{e.when}</span>
                  <em>{e.spend}</em>
                </footer>
              </article>
            ))}
            <p className="ab-era__src">Measurement industry size per era, from Parleo research.</p>
          </div>
        </section>

        {/* 03 · what we believe */}
        <section className="sec ab-bel" id="beliefs">
          <div className="wrap in6">
            <Head lead="What we believe." more="Four ideas the product is built on." sq />
            <div className="in6__body">
              <p className="body">The models are interchangeable. What changes the answer is how much of a merchant&rsquo;s real economics the agent can see, and whether anyone checks.</p>
            </div>
          </div>
          <div className={`wrap wrap--wide ab-bel__grid ${blOn ? "is-on" : ""}`} ref={blRef}>
            <article className="ab-bel__c" style={{ ["--d" as string]: "0s" } as CSSProperties}>
              <span className="k8 k8--ink">01</span>
              <h3>The best offer should win the answer.</h3>
              <p>Today the store that looks cheapest on list price wins, even when another store&rsquo;s member price or service makes it the better buy. The agent should see the whole offer.</p>
              <div className="ab-bel__vis ab-px">
                <div className="ab-px__h">
                  <Spec src="samba_b75806" alt="" className="ab-px__thumb" />
                  <span>
                    <b>Samba OG</b>
                    <em>
                      <Mark k="adidas" h={9} title="adidas" /> adidas.com
                    </em>
                  </span>
                </div>
                <div className="ab-px__row is-ai">
                  <span>What AI quotes</span>
                  <i>
                    <u style={{ width: "100%" }} />
                  </i>
                  <b>$104.99</b>
                </div>
                <div className="ab-px__row is-real">
                  <span>What a new member pays</span>
                  <i>
                    <u style={{ width: "81%" }} />
                  </i>
                  <b>$85.00</b>
                </div>
              </div>
            </article>
            <article className="ab-bel__c" style={{ ["--d" as string]: "0.1s" } as CSSProperties}>
              <span className="k8 k8--ink">02</span>
              <h3>Neutral by design.</h3>
              <p>Every protocol standardizes discovery, identity, payment or trust. None standardizes what a price means to a specific shopper. Parleo works with every rail and competes with none.</p>
              <div className="ab-bel__vis ab-hub">
                <svg viewBox="0 0 320 150" aria-hidden="true" className="ab-hub__lines">
                  {PROTOCOLS.map((_, i) => {
                    const x = 20 + (i % 4) * 93;
                    const y = i < 4 ? 18 : 132;
                    return <path key={i} d={`M160 75 C 160 ${y < 75 ? 45 : 105}, ${x} ${y < 75 ? 45 : 105}, ${x} ${y}`} />;
                  })}
                </svg>
                <div className="ab-hub__chips is-top">
                  {PROTOCOLS.slice(0, 4).map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <div className="ab-hub__core">
                  <i />
                  One record
                </div>
                <div className="ab-hub__chips is-bot">
                  {PROTOCOLS.slice(4).map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </article>
            <article className="ab-bel__c" style={{ ["--d" as string]: "0.2s" } as CSSProperties}>
              <span className="k8 k8--ink">03</span>
              <h3>Mentioned is not chosen.</h3>
              <p>Being named in an answer is where most measurement stops. We follow the answer all the way to the pick, and put a dollar figure on every step where the sale slips away.</p>
              <div className="ab-bel__vis ab-fn">
                {[
                  ["Mentioned", 8],
                  ["Priced right", 4],
                  ["Offer included", 2],
                  ["Chosen", 1],
                ].map(([k, n], i) => (
                  <div key={k as string} className={`ab-fn__r ${i === 3 ? "is-pick" : ""}`} style={{ ["--w" as string]: (n as number) / 8, ["--d" as string]: `${0.2 + i * 0.12}s` } as CSSProperties}>
                    <span>{k}</span>
                    <i>
                      <u />
                    </i>
                    <b>{n}</b>
                  </div>
                ))}
                <span className="ab-fn__k">How one answer narrows, illustrated</span>
              </div>
            </article>
            <article className="ab-bel__c" style={{ ["--d" as string]: "0.3s" } as CSSProperties}>
              <span className="k8 k8--ink">04</span>
              <h3>Private by default.</h3>
              <p>Member prices and offers are published as rules the agent resolves against what the shopper already chose to share. No personal data leaves the assistant to make the price right.</p>
              <div className="ab-bel__vis ab-pv">
                <div className="ab-pv__card">
                  <span className="ab-pv__lab">Published by the merchant</span>
                  <code>
                    <em>if</em> member <em>then</em> price − 15%
                  </code>
                  <code>
                    <em>if</em> first order <em>then</em> free shipping
                  </code>
                </div>
                <span className="ab-pv__arrow" aria-hidden="true">
                  <Icon n="arrow" size={14} />
                </span>
                <div className="ab-pv__card is-agent">
                  <span className="ab-pv__lab">
                    <App a="ChatGPT" size={12} /> Resolved inside the assistant
                  </span>
                  <b>Your price: $85.00</b>
                  <span className="ab-pv__lock">
                    <Icon n="lock" size={11} /> No personal data shared
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 04 · founding team */}
        <section className="sec ab-team" id="team">
          <div className="wrap in6">
            <Head lead="Built by brand and" more="infrastructure experts." sq />
            <div className="in6__body">
              <p className="body">A founder who built brands for Nike and Xbox, an engineer who built offer rails at Groupon and Rakuten, and the operator who takes it to market.</p>
            </div>
          </div>
          <div className={`wrap wrap--wide ab-team__grid ${tmOn ? "is-on" : ""}`} ref={tmRef}>
            {TEAM.map((t, i) => (
              <article key={t.n} className="ab-tm" style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}>
                <div className="ab-tm__top">
                  <span className="ab-tm__idx">0{i + 1}</span>
                  <span className="ab-tm__role">{t.role}</span>
                </div>
                <header>
                  <h3>{t.n}</h3>
                  {t.li && (
                    <a className="ab-tm__li" href={t.li} target="_blank" rel="noreferrer" aria-label={`${t.n} on LinkedIn`}>
                      in
                    </a>
                  )}
                </header>
                <p>{t.bio}</p>
                <footer>
                  <span className="ab-tm__prev">Previously</span>
                  <div className="ab-tm__logos">
                    {t.logos.map((l) => (
                      <img key={l.alt} src={l.src} alt={l.alt} style={{ height: l.h }} loading="lazy" />
                    ))}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* 05 · backed by */}
        <section className="sec ab-back" id="investors">
          <div className="wrap wrap--wide">
            <div className="ab-back__band c8-dark" data-rv>
              <div className="ab-back__copy">
                <span className="k8">Backed by</span>
                <h2>Investors who bet early on agentic commerce.</h2>
              </div>
              <div className="ab-back__grid">
                {BACKERS.map((b) => (
                  <div key={b.k} className="ab-back__c">
                    <div className="ab-back__logo">
                      <img src={b.src} alt={b.k} style={{ height: b.h }} loading="lazy" />
                      {b.word && <span>{b.word}</span>}
                    </div>
                    <em>{b.where}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Careers />
        <Close source="about-close" />
      </main>
      <Footer />
    </>
  );
}
