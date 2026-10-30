import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import { openStart } from "@/components/start";
import Footer from "@/components/Footer";
import { Btn, EASE, Glyph2, Logo, Reveal, SectionHeading } from "@/components/primitives";
import Cite from "@/components/guide/Cite";
import { SOURCES } from "@/components/guide/sources";
import { AdoptionGrid, BenchmarkChart, ConversionFlipChart, ForecastRangeChart, ProtocolTimeline, ReadabilityChart, TrafficGrowthChart } from "@/components/guide/Charts";
import "./guide.css";

const SITE = "https://parleo.io";
const URL = `${SITE}/what-is-agentic-commerce`;
const TITLE = "What Is Agentic Commerce? Data, Protocols and Forecasts | Parleo";
const DESCRIPTION =
  "A research-backed guide to agentic commerce: AI traffic to US retail up 393% YoY, agent visits converting 42% better, 2030 forecasts from Bain, Morgan Stanley and McKinsey, the ACP, AP2, UCP and MCP protocol stack, and the pricing data agents still cannot read.";

const faq = [
  { q: "What is agentic commerce?", a: "Agentic commerce is commerce where an AI agent does the shopping: it interprets intent, retrieves candidate products, compares them across merchants, and increasingly completes the purchase on the buyer's behalf. Bain defines it as purchases initiated, influenced or completed by third-party or retailer-hosted agents, excluding journeys that only use AI-assisted search. The shopper reads one answer instead of opening ten tabs, so the agent becomes the point of decision, not the storefront." },
  { q: "How big is agentic commerce right now?", a: "Traffic from AI sources to US retail sites grew 393% year over year in Q1 2026, following a 693% year-over-year holiday peak in November and December 2025, according to Adobe Analytics data covering more than a trillion retail visits. In March 2026 those AI-referred visits converted 42% better than non-AI traffic, reversing a 38% deficit twelve months earlier. Around 39% of US consumers say they have used AI for online shopping." },
  { q: "How large will agentic commerce be by 2030?", a: "Estimates vary by scope. Morgan Stanley projects $190B to $385B of US ecommerce spending, or 10% to 20% of online retail. Bain projects a $300B to $500B US market, roughly 15% to 25% of ecommerce. BCG models about $1.3T of impacted spending with close to $400B mostly autonomous. McKinsey estimates agents could mediate $3T to $5T of global consumer commerce. Gartner frames it as roughly 20% of transactions." },
  { q: "How is agentic commerce different from ecommerce?", a: "Traditional ecommerce optimizes a human's path through a storefront: imagery, layout, reviews, checkout flow. Agentic commerce optimizes machine-readable structure: whether an agent can retrieve your catalog, parse your real price and cite your offer inside one answer. Adobe's visibility benchmark makes the gap concrete, with US retail product pages scoring 66 out of 100 on machine readability while returns policy pages score 82." },
  { q: "How does an agentic commerce transaction work?", a: "Four steps: intent capture, where the shopper states a constraint set rather than a keyword; retrieval, where the agent pulls candidates from feeds, structured pages and connected APIs; resolution, where the agent ranks on the attributes it can actually parse, usually list price and availability; and execution, where it checks out over a protocol such as ACP or hands a deep link back. Most brand value is won or lost in retrieval and resolution, before a cart even exists." },
  { q: "What protocols power agentic commerce?", a: "Four layers matter. MCP from Anthropic exposes tools and data to agents. ACP, open-sourced by OpenAI and Stripe in September 2025, standardizes agent checkout and powers Instant Checkout in ChatGPT. UCP from Google, launched January 2026, standardizes how merchants publish catalog and offer data. AP2 from Google, backed by more than 60 organizations, carries verifiable payment mandates, alongside network programs such as Visa Intelligent Commerce and Mastercard Agent Pay. Supporting one doesn't rule out the others." },
  { q: "Are AI shopping agents actually accurate?", a: "Not reliably, not yet. On ShoppingComp, a benchmark of 120 expert-curated tasks and 1,026 real-product scenarios, GPT-5 scored 11.22% and Gemini 2.5 Flash 3.92%. Documented failure modes include missing stated constraints and being misled by promotional claims. On the older WebShop benchmark the best trained agent reached 29% task success against 59% for human experts. Agents compensate by trusting clean, structured data, which is why publishing it matters." },
  { q: "Why do AI agents quote the wrong price?", a: "Because the only price agents can read is the list price. Member pricing, funded promotions, points multipliers and card-linked offers usually resolve at checkout or later, and agents overwhelmingly operate in the retrieval and comparison phase. Adobe scores loyalty and membership pages at 78 out of 100 for machine readability, and the eligibility logic behind them is rarely exposed at all. So a brand that funded a better price loses to a competitor whose list price just happens to be lower." },
  { q: "How much value sits in incentives agents cannot see?", a: "Enough to change rankings. Points are booked as deferred revenue, and the six largest US airline programs alone carry roughly $30B of liability, with industry breakage typically running 10% to 20% of points issued. Retail equivalents such as member tiers, funded promotions and issuer offers routinely move the real price by double digits. None of that reaches an agent unless it is published as structured, resolvable data." },
  { q: "How do brands prepare for agentic commerce?", a: "Make three things machine-readable, in this order. Visibility: a crawlable, structured catalog an agent can retrieve. Accessibility: an access surface an agent can call, whether MCP tools, an OpenAPI spec or a supported checkout protocol. True value: member price, funded promotion, points and card-linked value resolved before the answer is written. Start by auditing what agents say about you today, then close the gaps costing you the most revenue." },
];

const contents = [
  { id: "demand", label: "Where demand is moving" },
  { id: "market", label: "How big it gets" },
  { id: "mechanics", label: "How a purchase happens" },
  { id: "readability", label: "The readability gap" },
  { id: "accuracy", label: "How accurate agents are" },
  { id: "protocols", label: "The protocol stack" },
  { id: "truevalue", label: "The true value problem" },
  { id: "playbook", label: "What to do about it" },
  { id: "faq", label: "Questions" },
  { id: "sources", label: "Sources" },
];

const compare = [
  { human: "A shopper scans a grid of products", agent: "An agent retrieves a structured candidate set" },
  { human: "Imagery and reviews build confidence", agent: "Schema, feeds and APIs build eligibility" },
  { human: "Promo codes surface at checkout", agent: "Anything after retrieval is invisible" },
  { human: "Winning means ranking on a page", agent: "Winning means being cited in one answer" },
  { human: "Traffic is the unit of success", agent: "Citation is the unit of success" },
];

const steps = [
  { n: "01", label: "Intent", title: "The shopper states a goal", body: "Not a keyword. A constraint set: budget, category, timeline, brand tolerance. Benchmarks show a lot of that intent stays hidden until the agent thinks to ask.", stat: "662 tasks in EComAgentBench scatter intent across query, profile and clarification", cite: ["ecomagent"] },
  { n: "02", label: "Retrieval", title: "The agent pulls candidates", body: "Merchant feeds, structured pages and connected APIs. Anything unreadable never enters the set, and roughly a third of an average retail product page is unreadable.", stat: "66 / 100 average machine readability on US retail product pages", cite: ["adobe"] },
  { n: "03", label: "Resolution", title: "The agent ranks on what it parsed", body: "Price, availability, shipping, returns. Almost always headline price, because that's the one field reliably exposed across every merchant in the set.", stat: "Funded price resolves after this step, so it never counts", cite: [] as string[] },
  { n: "04", label: "Execution", title: "The agent buys or hands off", body: "Agent checkout over ACP, a tokenized network credential, or a deep link back to the storefront. Instant Checkout shipped this step in September 2025.", stat: "Over 1M Shopify merchants staged for in-chat checkout", cite: ["openai", "stripe"] },
];

const layers = [
  { name: "Visibility", q: "Can an agent find you at all?", body: "Crawlable catalog, structured product data, presence in the feeds agents pull from. Fail here and nobody asks the other two questions." },
  { name: "Accessibility", q: "Can an agent query you directly?", body: "An access surface an agent can call: MCP tools, an OpenAPI spec, a checkout protocol it recognizes. Shopify made this default in June 2026." },
  { name: "True value", q: "Can an agent quote your real price?", body: "Member price, funded promotion, points and card-linked value, resolved into one number before the answer is written. Standardized nowhere.", highlight: true },
];

const protocols = [
  { name: "MCP", owner: "Anthropic", role: "Tool and data access", detail: "How an agent calls your systems. Shopify exposed a public MCP endpoint in June 2026." },
  { name: "ACP", owner: "Stripe", role: "Agent checkout", detail: "Open-sourced with OpenAI, September 2025. Powers Instant Checkout in ChatGPT." },
  { name: "UCP", owner: "Google", role: "Catalog and offers", detail: "Launched January 2026 to standardize how merchants publish product and availability data." },
  { name: "AP2", owner: "Google", role: "Payment mandates", detail: "Backed by 60+ organizations. Carries verifiable proof of what the shopper authorized." },
];

const ladder = [
  { label: "What agents read", value: "$104.99", note: "List price plus the $4.99 shipping agents add", quoted: true },
  { label: "adiClub member", value: "$100.00", note: "Free shipping, in the page copy, not in the markup" },
  { label: "New member, first order", value: "$85.00", note: "15% welcome offer, shown on every product page" },
];

const playbook = [
  { n: "01", t: "Measure what agents can read, not what you published", b: "Run your product templates through a machine-readability check before you touch a word of copy. A third of the average retail product page is invisible to an LLM, and it's rarely the part you'd guess." },
  { n: "02", t: "Treat the product page as an API with a design on top", b: "Complete structured product markup, resolvable variants, explicit availability and shipping fields. Anything that only renders in client-side script or inside an image isn't in the candidate set." },
  { n: "03", t: "Publish an access surface, not just a website", b: "An MCP endpoint or an OpenAPI spec turns retrieval from scraping into querying. Merchants on platforms that ship it by default already inherit the advantage." },
  { n: "04", t: "Resolve incentives into a number before the answer is written", b: "Member price, funded promotion, points value and card-linked offer, collapsed into one quotable figure at retrieval time. No protocol standardizes this layer, and it's the one that changes rankings." },
  { n: "05", t: "Instrument agent traffic as its own channel", b: "AI-referred visits engage 12% more, stay 48% longer and convert 42% better. Leave that buried in a direct or referral bucket and you're optimizing a channel you can't see." },
  { n: "06", t: "Re-check quarterly, because the stack moves quarterly", b: "Between April 2025 and June 2026 the ecosystem shipped agent payments, open checkout, a catalog standard and merchant readiness scoring. Annual planning cycles don't survive that cadence." },
];

export default function WhatIsAgenticCommerce() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "What is agentic commerce? A data-backed field guide",
        description: DESCRIPTION,
        author: { "@type": "Organization", name: "Parleo", url: SITE },
        publisher: { "@type": "Organization", name: "Parleo", url: SITE },
        mainEntityOfPage: URL,
        datePublished: "2026-08-19",
        dateModified: "2026-10-22",
        about: [
          { "@type": "Thing", name: "Agentic commerce" },
          { "@type": "Thing", name: "AI shopping agents" },
          { "@type": "Thing", name: "Agentic Commerce Protocol" },
        ],
        citation: SOURCES.map((s) => ({ "@type": "CreativeWork", name: s.title, publisher: { "@type": "Organization", name: s.publisher }, url: s.url })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Parleo", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "What is agentic commerce?", item: URL },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="keywords" content="what is agentic commerce, agentic commerce, AI shopping agents, agentic commerce statistics, agent checkout, MCP commerce, ACP protocol, AP2, UCP, agent-ready ecommerce" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="What is agentic commerce? A data-backed field guide" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content="What is agentic commerce? A data-backed field guide" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Nav />
      <main className="gd">
        {/* ---------- hero ---------- */}
        <section className="gd__hero grid-tex">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="gd__crumb">
              <Link to="/">Parleo</Link>
              <span>/</span>
              <Link to="/insights">Insights</Link>
              <span>/</span>
              <span>What is agentic commerce?</span>
            </nav>
            <Reveal>
              <SectionHeading as="h1" className="gd__h1">
                What is agentic commerce?
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="gd__meta">A field guide. 18 sources, six charts. First published August 2026, updated October 22, 2026.</p>
            </Reveal>
            <div className="gd__hero-grid">
              <Reveal delay={0.1}>
                <div className="gd__def">
                  <p>Agentic commerce is commerce where an AI agent does the shopping: it reads intent, retrieves candidates, compares them, and increasingly completes the purchase on the buyer's behalf.</p>
                </div>
                <p className="gd__intro">
                  It stopped being a thesis in 2025. AI-referred traffic to US retail sites grew 393% year over year in the first quarter of 2026, and those visits now convert 42% better than any other channel.
                  <Cite id={["adobe", "dc360"]} /> This is the guide we wanted when we started Parleo: the measured numbers, the protocol stack as it actually shipped, the benchmark evidence on how good agents really are, and the one layer nobody has standardized yet.
                </p>
                <div className="gd__hero-ctas">
                  <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
                    Get your Agentic Value Report
                  </Btn>
                  <Link to="/insights/share-of-algorithm" className="link-more">
                    Read the Share of Algorithm framework
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.16} as="div" className="gd__toc card">
                <span className="gd__toc-k">Contents</span>
                <ol>
                  {contents.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <div className="gd__strip">
              {[
                { k: "+393%", v: "AI traffic to US retail, Q1 2026, year over year", c: "adobe" },
                { k: "+42%", v: "Conversion lift of AI-referred visits", c: "dc360" },
                { k: "20%", v: "Of transactions agentic by 2030", c: "gartner" },
                { k: "66/100", v: "Machine readability of retail product pages", c: "adobe" },
              ].map((s, i) => (
                <motion.div key={s.v} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }} className="gd__strip-cell">
                  <b>{s.k}</b>
                  <p>
                    {s.v}
                    <Cite id={s.c} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 1. Demand ---------- */}
        <section id="demand" className="section gd__sec">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>The shift is already measurable.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Adobe Analytics covers more than a trillion visits to US retail sites, which makes it the closest thing this industry has to a census. Two things happened at once. Volume compounded, and quality inverted.</p>
              </Reveal>
            </div>
            <div className="gd__two">
              <TrafficGrowthChart />
              <ConversionFlipChart />
            </div>
            <div className="gd__two gd__two--text">
              <Reveal className="gd__card card">
                <h3 className="h-card">Why the reversal matters more than the growth</h3>
                <p className="copy">
                  In March 2025 an AI-referred visit was worth about half a normal one. Twelve months later it's the best-performing source a retailer has. That's not a traffic story, it's a qualification story: the agent already filtered for fit, price and availability before the shopper ever arrived.
                  <Cite id={["adobe", "dc360"]} />
                </p>
                <p className="copy">Which is exactly why the filtering criteria matter. If an agent qualifies on the price it can read, every merchant whose real price lives behind a login gets filtered out of a set they would have won.</p>
              </Reveal>
              <Reveal className="gd__photo" delay={0.08}>
                <picture>
                  <source type="image/webp" srcSet="/img/retail-rail-800.webp 800w, /img/retail-rail-1200.webp 1200w" sizes="(max-width: 900px) 100vw, 600px" />
                  <img src="/img/retail-rail.jpg" alt="A boutique price rail with one member tag in blue, the kind of value agents never read" loading="lazy" />
                </picture>
                <p>
                  Spec-driven categories flip first: batteries, refills, consumables, electronics accessories. Considered purchases follow.
                  <Cite id="bain" />
                </p>
              </Reveal>
            </div>
            <Reveal className="gd__sub">
              <h3 className="h-card">Consumer adoption, by the survey record</h3>
            </Reveal>
            <AdoptionGrid />
          </div>
        </section>

        {/* ---------- 2. Market ---------- */}
        <section id="market" className="section gd__sec gd__sec--alt">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>The 2030 estimates are worth reading as a range.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Forecasts for a market this young are scenario work, not measurement. The useful part is the convergence: every major house models agentic commerce reaching a double-digit share of ecommerce inside this planning horizon.</p>
              </Reveal>
            </div>
            <ForecastRangeChart />
            <div className="gd__three">
              {[
                { k: "$3B", v: "of US Black Friday sales already influenced by AI and agents, per Salesforce data cited by Bain.", c: "bain" },
                { k: "$41B", v: "estimated global agent-mediated GMV in 2026, a base year small enough to still be shaped.", c: "mckinsey" },
                { k: "2028", v: "the year most models inflect, once agent-payable checkout becomes table stakes at large retailers.", c: "mckinsey" },
              ].map((s) => (
                <Reveal key={s.k} className="gd__fact">
                  <b>{s.k}</b>
                  <p>
                    {s.v}
                    <Cite id={s.c} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 3. Mechanics ---------- */}
        <section id="mechanics" className="section gd__sec">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>How an agentic purchase happens, in four steps.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Most brands invest in the last step. Agents decide in the middle two, before a cart exists and before a single pixel of your storefront renders.</p>
              </Reveal>
            </div>
            <div className="gd__steps">
              {steps.map((s, i) => (
                <Reveal key={s.n} className="gd__step card" delay={i * 0.06}>
                  <div className="gd__step-top">
                    <span>{s.n}</span>
                    <b>{s.label}</b>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="gd__step-stat">
                    {s.stat}
                    {s.cite.length > 0 && <Cite id={s.cite} />}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="gd__compare card">
              <div className="gd__compare-row gd__compare-row--h">
                <span>Human storefront</span>
                <span>Agent surface</span>
              </div>
              {compare.map((row) => (
                <div key={row.human} className="gd__compare-row">
                  <span>
                    <Glyph2 name="x" size={13} color="var(--faint)" notch={false} />
                    {row.human}
                  </span>
                  <span>
                    <Glyph2 name="check" size={13} color="var(--blue)" notch={false} />
                    {row.agent}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------- 4. Readability ---------- */}
        <section id="readability" className="section gd__sec gd__sec--alt">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>Visibility is a data problem.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">The most cited finding in Adobe's 2026 retail work isn't the traffic number. It's that big stretches of retail sites aren't machine-readable at all, and the deficit sits exactly where commerce happens.</p>
              </Reveal>
            </div>
            <div className="gd__two gd__two--wide">
              <ReadabilityChart />
              <div className="gd__stack">
                <Reveal className="gd__photo gd__photo--short">
                  <picture>
                    <source type="image/webp" srcSet="/img/audit-hands-900.webp 900w, /img/audit-hands-1400.webp 1400w" sizes="(max-width: 900px) 100vw, 500px" />
                    <img src="/img/audit-hands.jpg" alt="Hands holding a phone over a counter of products, the moment an agent answers" loading="lazy" />
                  </picture>
                </Reveal>
                <Reveal className="gd__card card" delay={0.06}>
                  <h3 className="h-card">Read the ranking, not the average</h3>
                  <p className="copy">Your returns policy is more legible to an agent than your product page. Your help center outranks your catalog. Retailers polished the pages a human reads once and left alone the pages a machine reads a thousand times.</p>
                  <p className="copy">
                    Loyalty and membership pages score 78, which flatters the reality. What's readable there is the marketing description of the program, not the eligibility logic or the price a member would actually pay.
                    <Cite id="adobe" />
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 5. Accuracy ---------- */}
        <section id="accuracy" className="section gd__sec">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>Agent capabilities are still narrow.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Worth being precise about capability. Academic benchmarks published through 2026 show shopping agents are nowhere near solved, which changes what a merchant should optimize for.</p>
              </Reveal>
            </div>
            <div className="gd__two gd__two--wide">
              <BenchmarkChart />
              <div className="gd__stack">
                <Reveal className="gd__card card">
                  <h3 className="h-card">What the failure modes have in common</h3>
                  <ul className="gd__bullets">
                    {["Requirements arrive scattered across query, profile and clarification, and agents drop the ones nobody restated.", "Multi-item baskets break on compatibility, delivery fees and coupon validity, none of it exposed as a structured field.", "Promotional language gets taken at face value, so unverifiable claims outrank verifiable ones."].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className="copy" style={{ marginTop: 14 }}>
                    Every one of those is a missing structured field, not a missing model capability.
                    <Cite id={["shoppingcomp", "ecomagent"]} />
                  </p>
                </Reveal>
                <Reveal className="gd__dark" delay={0.06}>
                  <b>A weak reader rewards a strong publisher.</b>
                  <p>When an agent can't reliably verify a claim from a rendered page, it defers to the cleanest machine-readable source in the set. That's a temporary, compounding advantage for whoever publishes first.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 6. Protocols ---------- */}
        <section id="protocols" className="section gd__sec gd__sec--alt">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>The protocol stack shipped fast.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Between April 2025 and June 2026 the plumbing went from proposal to production. The order it shipped in tells you what the industry considered urgent, and what it left out.</p>
              </Reveal>
            </div>
            <ProtocolTimeline />
            <div className="gd__protocols">
              {protocols.map((p) => (
                <Reveal key={p.name} className="gd__protocol card">
                  <div className="gd__protocol-top">
                    <Logo name={p.owner} size={16} />
                    <b>{p.name}</b>
                    <span>{p.owner}</span>
                  </div>
                  <div className="gd__protocol-role">{p.role}</div>
                  <p>{p.detail}</p>
                  <div className="gd__protocol-foot">
                    <Glyph2 name="x" size={12} color="var(--red)" notch={false} />
                    Carries no funded price
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="gd__note">Read that last row across all four. Access, checkout, catalog and payment authorization are standardized. What a specific shopper actually pays, once membership, funded promotions, points and issuer offers resolve, is standardized nowhere.</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- 7. True value ---------- */}
        <section id="truevalue" className="section gd__sec section--dark gd__tv">
          <picture>
            <source type="image/webp" srcSet="/img/brand-shelf-800.webp 800w, /img/brand-shelf-1200.webp 1200w, /img/brand-shelf-1800.webp 1800w" sizes="100vw" />
            <img src="/img/brand-shelf.jpg" alt="" className="gd__tv-img" loading="lazy" />
          </picture>
          <div className="gd__tv-wash" />
          <div className="ink-panel__grain" />
          <div className="wrap gd__tv-in">
            <div className="gd__head">
              <Reveal>
                <SectionHeading dark>Your price is a ladder. Agents quote the top of it.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede lede--dark">A member pays one price. The agent publishes another. Every line below the first is funded value that never reaches the answer, and your balance sheet carries it either way.</p>
              </Reveal>
            </div>
            <div className="gd__two gd__two--tv">
              <Reveal className="gd__ladder">
                <div className="gd__ladder-top">
                  <Logo name="adidas" size={18} />
                  <span>One product page, three prices. Samba OG, adidas audit, Sep 29, 2026.</span>
                </div>
                <div className="gd__ladder-rows">
                  {ladder.map((l, i) => (
                    <motion.div key={l.label} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }} className={`gd__ladder-row ${l.quoted ? "is-quoted" : ""}`}>
                      <div>
                        <b>{l.label}</b>
                        <span>{l.note}</span>
                      </div>
                      <em>{l.value}</em>
                    </motion.div>
                  ))}
                </div>
                <div className="gd__ladder-total">
                  <span>The price that wins</span>
                  <b>$85.00</b>
                </div>
                <p>
                  A 19% gap between quoted and paid, from a page that shows all three. The agent ranks the first line and never reads the last.
                  <Cite id="parleo-adidas" />
                </p>
              </Reveal>
              <div className="gd__stack">
                <Reveal className="gd__tv-card">
                  <h3>Funded value is not soft marketing spend</h3>
                  <p>
                    Points are deferred revenue. The six largest US airline programs alone carry roughly $30B of loyalty liability, with breakage typically running 10% to 20% of points issued.
                    <Cite id="loyalty" /> Retail runs the same mechanics at smaller unit size and higher frequency. Every unquoted incentive is money already committed, then wasted at the one moment it could have won the comparison.
                  </p>
                  <div className="gd__tv-stats">
                    <div>
                      <b>~$30B</b>
                      <span>US airline loyalty liability, 2024 filings</span>
                    </div>
                    <div>
                      <b>10 to 20%</b>
                      <span>Typical points breakage rate</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="gd__layers">
              {layers.map((l, i) => (
                <Reveal key={l.name} className={`gd__layer ${l.highlight ? "is-key" : ""}`} delay={i * 0.07}>
                  <span>{`0${i + 1}`}</span>
                  <h3>{l.name}</h3>
                  <b>{l.q}</b>
                  <p>{l.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 8. Playbook ---------- */}
        <section id="playbook" className="section gd__sec">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>What to do about it, in six moves.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">None of this needs a replatform. It needs someone to own the machine-readable version of your commerce data and treat it as a real asset.</p>
              </Reveal>
            </div>
            <div className="gd__play">
              {playbook.map((p, i) => (
                <Reveal key={p.n} className="gd__play-cell card" delay={(i % 2) * 0.06}>
                  <span>{p.n}</span>
                  <h3 className="h-card">{p.t}</h3>
                  <p className="copy">{p.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 9. FAQ ---------- */}
        <section id="faq" className="section gd__sec gd__sec--alt">
          <div className="wrap gd__faq-grid">
            <Reveal>
              <SectionHeading>Agentic commerce, answered.</SectionHeading>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="gd__faq">
                {faq.map((f, i) => {
                  const on = open === i;
                  return (
                    <div key={f.q} className="gd__faq-item">
                      <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on}>
                        <span>{f.q}</span>
                        <i className={on ? "is-open" : ""} />
                      </button>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} style={{ overflow: "hidden" }}>
                            <p>{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 10. Sources ---------- */}
        <section id="sources" className="section gd__sec">
          <div className="wrap">
            <div className="gd__head">
              <Reveal>
                <SectionHeading>Sources, in full.</SectionHeading>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="lede">Every figure on this page resolves to one of these. Where a range is quoted, it's the range the source published, not an average we invented.</p>
              </Reveal>
            </div>
            <ol className="gd__sources">
              {SOURCES.map((s) => (
                <li key={s.id} id={`source-${s.id}`}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                    <span className="gd__src-n">{String(s.n).padStart(2, "0")}</span>
                    <span className="gd__src-pub">{s.publisher}</span>
                    <span className="gd__src-title">{s.title}</span>
                    <span className="gd__src-date">{s.date}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="gd__fine">Figures are reproduced as published by each source. Adobe traffic and conversion data reflect US retail unless stated. Forecast ranges are scenario estimates and differ in scope: US transacted value, US autonomous value and global agent-mediated value aren't directly comparable. The price ladder is from Parleo's adidas Agentic Value Audit of September 29, 2026, read from adidas.com the same day.</p>
          </div>
        </section>

        {/* ---------- keep reading + CTA ---------- */}
        <section className="section--tight gd__more">
          <div className="wrap">
            <div className="gd__more-grid">
              {[
                { to: "/insights/share-of-algorithm", k: "Framework", t: "Share of Algorithm: the score for the agentic era" },
                { to: "/insights/agentic-payments", k: "Point of view", t: "Agentic payments: what changes when the buyer is software" },
                { to: "/insights/inside-the-agentic-value-audit", k: "Method", t: "Inside the Agentic Value Audit" },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="gd__more-card card card--hover">
                  <span>{c.k}</span>
                  <b>{c.t}</b>
                  <span className="link-more">Read</span>
                </Link>
              ))}
            </div>
            <div className="gd__cta ink-panel">
              <div className="ink-panel__grain" />
              <div className="ink-panel__content gd__cta-in">
                <div>
                  <b>See what agents say about your products today.</b>
                  <p>Five agents, your category, every answer checked against your pages the same day. Free, read-out in days.</p>
                </div>
                <div className="gd__cta-btns">
                  <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
                    Get your report
                  </Btn>
                  <Btn onClick={() => openStart()} variant="outline-dark" size="lg">
                    Start with your top SKUs
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
