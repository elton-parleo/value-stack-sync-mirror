import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import Cite from "@/components/guide/Cite";
import { SOURCES } from "@/components/guide/sources";
import {
  AdoptionGrid,
  BenchmarkChart,
  ConversionFlipChart,
  Figure,
  ForecastRangeChart,
  ProtocolTimeline,
  ReadabilityChart,
  TrafficGrowthChart,
} from "@/components/guide/Charts";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";
import lifestyleBeauty from "@/assets/lifestyle-beauty-flatlay.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";
import lifestyleHands from "@/assets/lifestyle-hands-product.jpg";

const SITE = "https://parleo.io";
const URL = `${SITE}/what-is-agentic-commerce`;
const AUDIT_URL = "https://parleo.io/audit/";
const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE = "What Is Agentic Commerce? Data, Protocols and Forecasts | Parleo";
const DESCRIPTION =
  "A research-backed guide to agentic commerce: AI traffic to US retail up 393% YoY, agent visits converting 42% better, 2030 forecasts from Bain, Morgan Stanley and McKinsey, the ACP, AP2, UCP and MCP protocol stack, and the pricing data agents still cannot read.";

const faq = [
  {
    q: "What is agentic commerce?",
    a: "Agentic commerce is commerce where an AI agent does the shopping: it interprets intent, retrieves candidate products, compares them across merchants, and increasingly completes the purchase on the buyer's behalf. Bain defines it as purchases initiated, influenced or completed by third-party or retailer-hosted agents, excluding journeys that only use AI-assisted search. The shopper reads one answer instead of opening ten tabs, so the agent becomes the point of decision, not the storefront.",
  },
  {
    q: "How big is agentic commerce right now?",
    a: "Traffic from AI sources to US retail sites grew 393% year over year in Q1 2026, following a 693% year-over-year holiday peak in November and December 2025, according to Adobe Analytics data covering more than a trillion retail visits. In March 2026 those AI-referred visits converted 42% better than non-AI traffic, reversing a 38% deficit twelve months earlier. Around 39% of US consumers say they have used AI for online shopping.",
  },
  {
    q: "How large will agentic commerce be by 2030?",
    a: "Estimates vary by scope. Morgan Stanley projects $190B to $385B of US ecommerce spending, or 10% to 20% of online retail. Bain projects a $300B to $500B US market, roughly 15% to 25% of ecommerce. BCG models about $1.3T of impacted spending with close to $400B mostly autonomous. McKinsey estimates agents could mediate $3T to $5T of global consumer commerce. Gartner frames it as roughly 20% of transactions.",
  },
  {
    q: "How is agentic commerce different from ecommerce?",
    a: "Traditional ecommerce optimizes a human's path through a storefront: imagery, layout, reviews, checkout flow. Agentic commerce optimizes machine-readable structure: whether an agent can retrieve your catalog, parse your real price and cite your offer inside one answer. Adobe's visibility benchmark makes the gap concrete, with US retail product pages scoring 66 out of 100 on machine readability while returns policy pages score 82.",
  },
  {
    q: "How does an agentic commerce transaction work?",
    a: "Four steps: intent capture, where the shopper states a constraint set rather than a keyword; retrieval, where the agent pulls candidates from feeds, structured pages and connected APIs; resolution, where the agent ranks on the attributes it can actually parse, usually list price and availability; and execution, where it checks out over a protocol such as ACP or hands a deep link back. Most brand value is won or lost in retrieval and resolution, before a cart even exists.",
  },
  {
    q: "What protocols power agentic commerce?",
    a: "Four layers matter. MCP from Anthropic exposes tools and data to agents. ACP, open-sourced by OpenAI and Stripe in September 2025, standardizes agent checkout and powers Instant Checkout in ChatGPT. UCP from Google, launched January 2026, standardizes how merchants publish catalog and offer data. AP2 from Google, backed by more than 60 organizations, carries verifiable payment mandates, alongside network programs such as Visa Intelligent Commerce and Mastercard Agent Pay. Supporting one doesn't rule out the others.",
  },
  {
    q: "Are AI shopping agents actually accurate?",
    a: "Not reliably, not yet. On ShoppingComp, a benchmark of 120 expert-curated tasks and 1,026 real-product scenarios, GPT-5 scored 11.22% and Gemini 2.5 Flash 3.92%. Documented failure modes include missing stated constraints and being misled by promotional claims. On the older WebShop benchmark the best trained agent reached 29% task success against 59% for human experts. Agents compensate by trusting clean, structured data, which is why publishing it matters.",
  },
  {
    q: "Why do AI agents quote the wrong price?",
    a: "Because the only price agents can read is the list price. Member pricing, funded promotions, points multipliers and card-linked offers usually resolve at checkout or later, and agents overwhelmingly operate in the retrieval and comparison phase. Adobe scores loyalty and membership pages at 78 out of 100 for machine readability, and the eligibility logic behind them is rarely exposed at all. So a brand that funded a better price loses to a competitor whose list price just happens to be lower.",
  },
  {
    q: "How much value sits in incentives agents cannot see?",
    a: "Enough to change rankings. Points are booked as deferred revenue, and the six largest US airline programs alone carry roughly $30B of liability, with industry breakage typically running 10% to 20% of points issued. Retail equivalents such as member tiers, funded promotions and issuer offers routinely move the real price by double digits. None of that reaches an agent unless it is published as structured, resolvable data.",
  },
  {
    q: "How do brands prepare for agentic commerce?",
    a: "Make three things machine-readable, in this order. Visibility: a crawlable, structured catalog an agent can retrieve. Accessibility: an access surface an agent can call, whether MCP tools, an OpenAPI spec or a supported checkout protocol. True value: member price, funded promotion, points and card-linked value resolved before the answer is written. Start by auditing what agents say about you today, then close the gaps costing you the most revenue.",
  },
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
  {
    n: "01",
    label: "Intent",
    title: "The shopper states a goal",
    body: "Not a keyword. A constraint set: budget, category, timeline, brand tolerance. Benchmarks show a lot of that intent stays hidden until the agent thinks to ask.",
    stat: "662 tasks in EComAgentBench scatter intent across query, profile and clarification",
    cite: ["ecomagent"],
  },
  {
    n: "02",
    label: "Retrieval",
    title: "The agent pulls candidates",
    body: "Merchant feeds, structured pages and connected APIs. Anything unreadable never enters the set, and roughly a third of an average retail product page is unreadable.",
    stat: "66 / 100 average machine readability on US retail product pages",
    cite: ["adobe"],
  },
  {
    n: "03",
    label: "Resolution",
    title: "The agent ranks on what it parsed",
    body: "Price, availability, shipping, returns. Almost always headline price, because that's the one field reliably exposed across every merchant in the set.",
    stat: "Funded price resolves after this step, so it never counts",
    cite: [],
  },
  {
    n: "04",
    label: "Execution",
    title: "The agent buys or hands off",
    body: "Agent checkout over ACP, a tokenized network credential, or a deep link back to the storefront. Instant Checkout shipped this step in September 2025.",
    stat: "Over 1M Shopify merchants staged for in-chat checkout",
    cite: ["openai", "stripe"],
  },
];

const layers = [
  {
    name: "Visibility",
    q: "Can an agent find you at all?",
    body: "Crawlable catalog, structured product data, presence in the feeds agents pull from. Fail here and nobody asks the other two questions.",
  },
  {
    name: "Accessibility",
    q: "Can an agent query you directly?",
    body: "An access surface an agent can call: MCP tools, an OpenAPI spec, a checkout protocol it recognizes. Shopify made this default in June 2026.",
  },
  {
    name: "True value",
    q: "Can an agent quote your real price?",
    body: "Member price, funded promotion, points and card-linked value, resolved into one number before the answer is written. Standardized nowhere.",
    highlight: true,
  },
];

const protocols = [
  {
    name: "MCP",
    owner: "Anthropic",
    role: "Tool and data access",
    detail: "How an agent calls your systems. Shopify exposed a public MCP endpoint in June 2026.",
    carries: false,
  },
  {
    name: "ACP",
    owner: "Stripe",
    role: "Agent checkout",
    detail: "Open-sourced with OpenAI, September 2025. Powers Instant Checkout in ChatGPT.",
    carries: false,
  },
  {
    name: "UCP",
    owner: "Google",
    role: "Catalog and offers",
    detail: "Launched January 2026 to standardize how merchants publish product and availability data.",
    carries: false,
  },
  {
    name: "AP2",
    owner: "Google",
    role: "Payment mandates",
    detail: "Backed by 60+ organizations. Carries verifiable proof of what the shopper authorized.",
    carries: false,
  },
];

const ladder = [
  { label: "List price", value: "$74.00", note: "What the agent quotes", muted: false },
  { label: "Member price", value: "$62.90", note: "Tier logic, resolved at login", muted: true },
  { label: "Points applied", value: "-$8.40", note: "Deferred revenue, invisible", muted: true },
  { label: "Card-linked offer", value: "-$3.06", note: "Issuer funded, invisible", muted: true },
];

const playbook = [
  {
    n: "01",
    t: "Measure what agents can read, not what you published",
    b: "Run your product templates through a machine-readability check before you touch a word of copy. A third of the average retail product page is invisible to an LLM, and it's rarely the part you'd guess.",
  },
  {
    n: "02",
    t: "Treat the product page as an API with a design on top",
    b: "Complete structured product markup, resolvable variants, explicit availability and shipping fields. Anything that only renders in client-side script or inside an image isn't in the candidate set.",
  },
  {
    n: "03",
    t: "Publish an access surface, not just a website",
    b: "An MCP endpoint or an OpenAPI spec turns retrieval from scraping into querying. Merchants on platforms that ship it by default already inherit the advantage.",
  },
  {
    n: "04",
    t: "Resolve incentives into a number before the answer is written",
    b: "Member price, funded promotion, points value and card-linked offer, collapsed into one quotable figure at retrieval time. No protocol standardizes this layer, and it's the one that changes rankings.",
  },
  {
    n: "05",
    t: "Instrument agent traffic as its own channel",
    b: "AI-referred visits engage 12% more, stay 48% longer and convert 42% better. Leave that buried in a direct or referral bucket and you're optimizing a channel you can't see.",
  },
  {
    n: "06",
    t: "Re-check quarterly, because the stack moves quarterly",
    b: "Between April 2025 and June 2026 the ecosystem shipped agent payments, open checkout, a catalog standard and merchant readiness scoring. Annual planning cycles don't survive that cadence.",
  },
];

const WhatIsAgenticCommerce = () => {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "What is agentic commerce? A data-backed field guide",
        description: DESCRIPTION,
        author: { "@type": "Organization", name: "Parleo", url: SITE },
        publisher: {
          "@type": "Organization",
          name: "Parleo",
          url: SITE,
        },
        mainEntityOfPage: URL,
        datePublished: "2026-08-19",
        dateModified: "2026-08-19",
        about: [
          { "@type": "Thing", name: "Agentic commerce" },
          { "@type": "Thing", name: "AI shopping agents" },
          { "@type": "Thing", name: "Agentic Commerce Protocol" },
        ],
        citation: SOURCES.map((s) => ({
          "@type": "CreativeWork",
          name: s.title,
          publisher: { "@type": "Organization", name: s.publisher },
          url: s.url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Parleo", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "What is agentic commerce?", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta
          name="keywords"
          content="what is agentic commerce, agentic commerce, AI shopping agents, agentic commerce statistics, agent checkout, MCP commerce, ACP protocol, AP2, UCP, agent-ready ecommerce"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="What is agentic commerce? A data-backed field guide" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content="What is agentic commerce? A data-backed field guide" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      {/* Ambient editorial texture */}
      <div className="pointer-events-none absolute right-0 top-[6%] h-[420px] w-[240px] overflow-hidden opacity-[0.045] blur-[5px] md:h-[640px] md:w-[380px]">
        <img
          src={lifestyleRetail}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(70%)", mixBlendMode: "multiply" }}
        />
      </div>

      <main className="relative">
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <section className="mx-auto max-w-content px-6 pb-12 pt-28 md:px-20 md:pb-16 md:pt-36">
          <nav aria-label="Breadcrumb" className="mb-8 text-[12px] text-foreground/45">
            <Link to="/" className="transition-colors hover:text-foreground">
              Parleo
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground/70">What is agentic commerce?</span>
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-primary">
              FIELD GUIDE
            </span>
            <span className="h-px w-10 bg-foreground/20" />
            <span className="font-mono text-[10.5px] tracking-[0.12em] text-foreground/40">
              17 SOURCES · 6 FIGURES · UPDATED AUG 2026
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="section-heading mt-5 text-foreground"
          >
            What is agentic commerce?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start"
          >
            <div>
              <div className="border-l-2 border-primary pl-5">
                <p className="text-[17px] font-medium leading-[1.5] tracking-[-0.012em] text-foreground md:text-[21px]">
                  Agentic commerce is commerce where an AI agent does the shopping: it reads intent,
                  retrieves candidates, compares them, and increasingly completes the purchase on the
                  buyer's behalf.
                </p>
              </div>
              <p className="section-copy mt-6 max-w-[64ch]">
                It stopped being a thesis in 2025. AI-referred traffic to US retail sites grew 393%
                year over year in the first quarter of 2026, and those visits now convert 42% better
                than any other channel.
                <Cite id={["adobe", "dc360"]} /> This is the guide we wanted when we started
                Parleo: the measured numbers, the protocol stack as it actually shipped, the
                benchmark evidence on how good agents really are, and the one layer nobody has
                standardized yet.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a href={AUDIT_URL}>
                    Free Agentic Audit
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Link
                  to="/insights/share-of-algorithm"
                  className="text-[13.5px] text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Read the Share of Algorithm framework
                </Link>
              </div>
            </div>

            {/* Contents */}
            <nav
              aria-label="Contents"
              className="rounded-2xl border border-border border-t-2 border-t-primary bg-[#EAE8E5] p-7 md:p-8"
            >
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-foreground/40">
                CONTENTS
              </span>
              <ol className="mt-5 flex flex-col">
                {contents.map((c, i) => (
                  <li key={c.id} className="border-b border-foreground/10 last:border-0">
                    <a
                      href={`#${c.id}`}
                      className="group flex items-baseline gap-3 py-2.5 transition-colors"
                    >
                      <span className="font-mono text-[10.5px] text-foreground/35 group-hover:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] text-foreground/65 transition-colors group-hover:text-foreground">
                        {c.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </motion.div>
        </section>

        {/* Headline stat strip */}
        <section className="mx-auto max-w-content px-6 md:px-20">
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-4">
            {[
              { k: "+393%", v: "AI traffic to US retail, Q1 2026 YoY", c: "adobe" },
              { k: "+42%", v: "Conversion lift of AI-referred visits", c: "dc360" },
              { k: "20%", v: "Of transactions agentic by 2030", c: "gartner" },
              { k: "66/100", v: "Machine readability of retail product pages", c: "adobe" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="bg-[#0E0E14] px-6 py-7 md:px-7 md:py-8"
              >
                <div className="font-mono text-[27px] font-medium tracking-[-0.03em] text-white md:text-[32px]">
                  {s.k}
                </div>
                <p className="mt-2 max-w-[24ch] text-[12.5px] leading-[1.45] text-white/50">
                  {s.v}
                  <Cite id={s.c} dark />
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 1. Demand                                                   */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection id="demand" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading
            accent="is already measurable"
            body="Adobe Analytics covers more than a trillion visits to US retail sites, which makes it the closest thing this industry has to a census. Two things happened at once. Volume compounded, and quality inverted."
            accentTone="muted"
            bodyMaxWidth="62ch"
          >
            The shift
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
            <TrafficGrowthChart />
            <ConversionFlipChart />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1.05fr_1fr] md:items-stretch">
            <div className="rounded-2xl border border-border bg-[#EAE8E5] p-7 md:p-9">
              <h3 className="card-heading">Why the reversal matters more than the growth</h3>
              <p className="section-copy mt-3 max-w-[58ch]">
                In March 2025 an AI-referred visit was worth about half a normal one. Twelve months later
                it's the best-performing source a retailer has. That's not a traffic story, it's a
                qualification story: the agent already filtered for fit, price and availability
                before the shopper ever landed.
                <Cite id={["adobe", "dc360"]} />
              </p>
              <p className="section-copy mt-4 max-w-[58ch]">
                Which is exactly why the filtering criteria matter. If an agent qualifies on the price it
                can read, every merchant whose real price lives behind a login gets filtered out of
                a set they would have won.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={lifestyleTech}
                alt="Editorial product still life representing categories where agent-referred demand is growing fastest"
                className="h-full min-h-[240px] w-full object-cover"
                loading="lazy"
                style={{ filter: "grayscale(25%) contrast(1.04)" }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E14]/80 to-transparent p-6">
                <p className="text-[13px] leading-[1.5] text-white/85">
                  Spec-driven categories flip first: batteries, refills, consumables, electronics
                  accessories. Considered purchases follow.
                  <Cite id="bain" dark />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="card-heading mb-5">Consumer adoption, by the survey record</h3>
            <AdoptionGrid />
          </div>
        </AnimatedSection>

        <div className="mx-auto max-w-content px-6 md:px-20">
          <div className="h-px w-full bg-border" />
        </div>

        {/* ---------------------------------------------------------- */}
        {/* 2. Market size                                              */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection id="market" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading
            accent="are worth reading as a range"
            body="Forecasts for a market this young are scenario work, not measurement. The useful part is the convergence: every major house models agentic commerce reaching a double-digit share of ecommerce inside this planning horizon."
            accentTone="muted"
            bodyMaxWidth="62ch"
          >
            2030 estimates
          </SectionHeading>

          <div className="mt-10">
            <ForecastRangeChart />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                k: "$3B",
                v: "of US Black Friday sales already influenced by AI and agents, per Salesforce data cited by Bain.",
                c: "bain",
              },
              {
                k: "$41B",
                v: "estimated global agent-mediated GMV in 2026, a base year small enough to still be shaped.",
                c: "mckinsey",
              },
              {
                k: "2028",
                v: "the year most models inflect, once agent-payable checkout becomes table stakes at large retailers.",
                c: "mckinsey",
              },
            ].map((s) => (
              <div key={s.k} className="border-t border-foreground/15 pt-5">
                <div className="font-mono text-[26px] tracking-[-0.03em] text-foreground md:text-[30px]">
                  {s.k}
                </div>
                <p className="mt-2 text-[13px] leading-[1.5] text-foreground/58 md:text-[13.5px]">
                  {s.v}
                  <Cite id={s.c} />
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 3. Mechanics                                                */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="mechanics"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="in four steps"
            body="Most brands invest in the last step. Agents decide in the middle two, before a cart exists and before a single pixel of your storefront renders."
            bodyMaxWidth="58ch"
          >
            How an agentic purchase happens
          </SectionHeading>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="relative flex flex-col border-t border-foreground/15 pt-5"
              >
                {i > 0 && i < 4 && (
                  <span className="absolute -top-px left-0 h-px w-1/3 bg-primary" aria-hidden />
                )}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-primary">{s.n}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-foreground/40">
                    {s.label.toUpperCase()}
                  </span>
                </div>
                <h3 className="card-heading mt-3">{s.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-[1.55] text-foreground/58 md:text-[14.5px]">
                  {s.body}
                </p>
                <p className="mt-4 border-l-2 border-primary/40 pl-3 text-[12px] leading-[1.45] text-foreground/70">
                  {s.stat}
                  {s.cite.length > 0 && <Cite id={s.cite} />}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Human vs agent table */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-2 border-b border-border bg-[#EAE8E5]">
              <div className="px-5 py-4 md:px-8">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-foreground/45">
                  HUMAN STOREFRONT
                </span>
              </div>
              <div className="border-l border-border px-5 py-4 md:px-8">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-primary">
                  AGENT SURFACE
                </span>
              </div>
            </div>
            {compare.map((row, i) => (
              <div
                key={row.human}
                className={`grid grid-cols-2 ${i < compare.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-start gap-3 px-5 py-5 md:px-8">
                  <X className="mt-[3px] h-3.5 w-3.5 shrink-0 text-foreground/30" />
                  <span className="text-[13.5px] leading-[1.5] text-foreground/55 md:text-[15px]">
                    {row.human}
                  </span>
                </div>
                <div className="flex items-start gap-3 border-l border-border px-5 py-5 md:px-8">
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-[13.5px] leading-[1.5] text-foreground md:text-[15px]">
                    {row.agent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 4. Readability                                              */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="readability"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="is a data problem"
            body="The most cited finding in Adobe's 2026 retail work isn't the traffic number. It's that big stretches of retail sites aren't machine-readable at all, and the deficit sits exactly where commerce happens."
            accentTone="muted"
            bodyMaxWidth="62ch"
          >
            Visibility
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <ReadabilityChart />

            <div className="flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={lifestyleHands}
                  alt="Close-cropped editorial photograph of a product held in hand, the detail an agent never sees"
                  className="h-[220px] w-full object-cover md:h-[260px]"
                  loading="lazy"
                  style={{ filter: "grayscale(30%) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-[#0E0E14]/20" />
              </div>
              <div className="rounded-2xl border border-border bg-[#EAE8E5] p-7 md:p-8">
                <h3 className="card-heading">Read the ranking, not the average</h3>
                <p className="section-copy mt-3">
                  Your returns policy is more legible to an agent than your product page. Your help center
                  outranks your catalog. Retailers polished the pages a human reads once and left
                  alone the pages a machine reads a thousand times.
                </p>
                <p className="section-copy mt-4">
                  Loyalty and membership pages score 78, which flatters the reality. What's readable there
                  is the marketing description of the program, not the eligibility logic or the
                  price a member would actually pay.
                  <Cite id="adobe" />
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 5. Accuracy                                                 */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="accuracy"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="are still narrow"
            body="Worth being precise about capability. Academic benchmarks published through 2026 show shopping agents are nowhere near solved, which changes what a merchant should optimize for."
            accentTone="muted"
            bodyMaxWidth="60ch"
          >
            Agent capabilities
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <BenchmarkChart />

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-[#EAE8E5] p-7 md:p-8">
                <h3 className="card-heading">What the failure modes have in common</h3>
                <ul className="mt-4 flex flex-col gap-3.5">
                  {[
                    "Requirements arrive scattered across query, profile and clarification, and agents drop the ones nobody restated.",
                    "Multi-item baskets break on compatibility, delivery fees and coupon validity, none of it exposed as a structured field.",
                    "Promotional language gets taken at face value, so unverifiable claims outrank verifiable ones.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary" />
                      <span className="text-[13.5px] leading-[1.55] text-foreground/65">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] leading-[1.55] text-foreground/50">
                  Every one of those is a missing structured field, not a missing model capability.
                  <Cite id={["shoppingcomp", "ecomagent"]} />
                </p>
              </div>

              <div className="rounded-2xl border-t-2 border-primary bg-[#0E0E14] p-7 md:p-8">
                <p className="text-[15px] font-medium leading-[1.5] text-white md:text-[17px]">
                  A weak reader rewards a strong publisher.
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-white/55 md:text-[14.5px]">
                  When an agent can't reliably verify a claim from a rendered page, it defers to the
                  cleanest machine-readable source in the set. That's a temporary, compounding
                  advantage for whoever publishes first.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 6. Protocols                                                */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="protocols"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="shipped fast"
            body="Between April 2025 and June 2026 the plumbing went from proposal to production. The order it shipped in tells you what the industry considered urgent, and what it left out."
            accentTone="muted"
            bodyMaxWidth="60ch"
          >
            The protocol stack
          </SectionHeading>

          <div className="mt-10">
            <ProtocolTimeline />
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-[1fr_1fr] gap-px bg-border md:grid-cols-4">
              {protocols.map((p) => (
                <div key={p.name} className="bg-background p-6 md:p-7">
                  <div className="flex items-center gap-2">
                    <BrandLogo name={p.owner} size={16} grayscale />
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.1em] text-foreground/40">
                    {p.owner.toUpperCase()}
                  </p>
                  <p className="mt-3 text-[13.5px] font-medium text-foreground/85">{p.role}</p>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-foreground/55">{p.detail}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-foreground/10 pt-3">
                    <X className="h-3 w-3 shrink-0 text-foreground/30" />
                    <span className="text-[11.5px] text-foreground/45">
                      Carries no funded price
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="section-copy mt-5 max-w-[70ch]">
            Read that last row across all four. Access, checkout, catalog and payment authorization
            are standardized. What a specific shopper actually pays, once membership, funded
            promotions, points and issuer offers resolve, is standardized nowhere.
          </p>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 7. True value                                               */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection id="truevalue" className="bg-[#0E0E14] py-14 md:py-20">
          <div className="mx-auto max-w-content px-6 md:px-20">
            <SectionHeading
              dark
              accent="agents quote the top of it"
              body="A member pays one price. The agent publishes another. Every line below the first is funded value that never reaches the answer, and your balance sheet carries it either way."
              bodyMaxWidth="62ch"
            >
              Your price is a ladder.
            </SectionHeading>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
              <div className="rounded-2xl border-t-2 border-primary bg-white/[0.04] p-6 md:p-8">
                <div className="flex items-center gap-2.5">
                  <BrandLogo name="Sephora" size={18} />
                  <span className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">
                    ONE PRODUCT, FOUR PRICES
                  </span>
                </div>
                <div className="mt-6 flex flex-col">
                  {ladder.map((l, i) => (
                    <motion.div
                      key={l.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                      className={`flex items-baseline justify-between py-3.5 ${
                        i < ladder.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <div>
                        <div
                          className={`text-[14px] font-medium ${l.muted ? "text-white/45" : "text-white"}`}
                        >
                          {l.label}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white/35">{l.note}</div>
                      </div>
                      <span
                        className={`font-mono text-[16px] ${l.muted ? "text-white/40" : "text-primary"}`}
                      >
                        {l.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex items-baseline justify-between rounded-xl bg-primary/10 px-4 py-3.5">
                  <span className="text-[13px] font-medium text-white">True value paid</span>
                  <span className="font-mono text-[20px] text-primary">$51.44</span>
                </div>
                <p className="mt-4 text-[12px] leading-[1.5] text-white/40">
                  A 30% gap between quoted and paid is unremarkable in beauty. The agent ranks the first
                  line and never sees the last.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-white/[0.04] p-6 md:p-8">
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-white md:text-[19px]">
                    Funded value is not soft marketing spend
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-white/70 md:text-[14.5px]">
                    Points are deferred revenue. The six largest US airline programs alone carry roughly
                    $30B of loyalty liability, with breakage typically running 10% to 20% of points
                    issued.<Cite id="loyalty" dark /> Retail runs the same mechanics at smaller
                    unit size and higher frequency. Every unquoted incentive is money already
                    committed, then wasted at the one moment it could have won the comparison.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-5 border-t border-white/10 pt-5">
                    {[
                      { k: "~$30B", v: "US airline loyalty liability, 2024 filings" },
                      { k: "10-20%", v: "Typical points breakage rate" },
                    ].map((s) => (
                      <div key={s.v}>
                        <div className="font-mono text-[22px] tracking-[-0.02em] text-primary md:text-[26px]">
                          {s.k}
                        </div>
                        <p className="mt-1 text-[11.5px] leading-[1.45] text-white/45">{s.v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-2xl">
                  <img
                    src={lifestyleBeauty}
                    alt="Editorial beauty flat lay representing the category where agent-quoted prices diverge most from what members actually pay"
                    className="h-full min-h-[180px] w-full object-cover"
                    loading="lazy"
                    style={{ filter: "grayscale(20%) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0 bg-[#0E0E14]/30" />
                </div>
              </div>
            </div>

            {/* Three layers */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {layers.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                  className={`rounded-2xl p-7 md:p-8 ${
                    l.highlight
                      ? "border-t-2 border-primary bg-primary/[0.08]"
                      : "border border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`font-mono text-[10.5px] tracking-[0.1em] ${
                      l.highlight ? "text-primary" : "text-white/35"
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-white md:text-[19px]">
                    {l.name}
                  </h3>
                  <p
                    className={`mt-2 text-[13.5px] font-medium ${
                      l.highlight ? "text-primary" : "text-white/60"
                    }`}
                  >
                    {l.q}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-[1.55] text-white/55 md:text-[14.5px]">
                    {l.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 8. Playbook                                                 */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="playbook"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="in six moves"
            body="None of this needs a replatform. It needs someone to own the machine-readable version of your commerce data and treat it as a real asset."
            bodyMaxWidth="58ch"
          >
            What to do about it
          </SectionHeading>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
            {playbook.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: EASE }}
                className="bg-[#EAE8E5] px-7 py-8 md:px-9 md:py-9"
              >
                <span className="font-mono text-[11px] text-primary">{p.n}</span>
                <h3 className="card-heading mt-3">{p.t}</h3>
                <p className="mt-2.5 max-w-[46ch] text-[13.5px] leading-[1.6] text-foreground/58 md:text-[14.5px]">
                  {p.b}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 9. FAQ                                                      */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection id="faq" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading accent="answered">Agentic commerce,</SectionHeading>

          <div className="mt-10 border-t border-border">
            {faq.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
                >
                  <h3 className="text-[15px] font-semibold tracking-[-0.012em] text-foreground md:text-[17px]">
                    {f.q}
                  </h3>
                  <span
                    className={`mt-1 shrink-0 font-mono text-[15px] transition-transform duration-300 ${
                      open === i ? "rotate-45 text-primary" : "text-foreground/35"
                    }`}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="section-copy max-w-[72ch] pb-6 pr-10">{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* 10. Sources                                                 */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection
          id="sources"
          className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20"
        >
          <SectionHeading
            accent="in full"
            body="Every figure on this page resolves to one of these. Where a range is quoted, it's the range the source published, not an average we invented."
            accentTone="muted"
            bodyMaxWidth="58ch"
          >
            Sources
          </SectionHeading>

          <ol className="mt-10 border-t border-border">
            {SOURCES.map((s) => (
              <li
                key={s.id}
                id={`source-${s.id}`}
                className="scroll-mt-28 border-b border-border py-4"
              >
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group grid grid-cols-[28px_1fr] items-start gap-3 md:grid-cols-[36px_170px_1fr_120px] md:items-baseline md:gap-5"
                >
                  <span className="font-mono text-[11px] text-primary">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-medium text-foreground md:text-[13.5px]">
                    {s.publisher}
                  </span>
                  <span className="col-span-2 text-[13px] leading-[1.5] text-foreground/60 transition-colors group-hover:text-foreground md:col-span-1 md:text-[13.5px]">
                    {s.title}
                    <ArrowUpRight className="ml-1 inline h-3 w-3 text-foreground/30 transition-colors group-hover:text-primary" />
                  </span>
                  <span className="col-span-2 font-mono text-[10.5px] tracking-[0.06em] text-foreground/40 md:col-span-1 md:text-right">
                    {s.date.toUpperCase()}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-[72ch] text-[12.5px] leading-[1.6] text-foreground/45">
            Figures are reproduced as published by each source. Adobe traffic and conversion data
            reflect US retail unless stated. Forecast ranges are scenario estimates and differ in
            scope: US transacted value, US autonomous value and global agent-mediated value aren't
            directly comparable. The price ladder is an illustrative reconstruction using typical
            beauty-category incentive depth, not any specific merchant's data.
          </p>
        </AnimatedSection>

        {/* ---------------------------------------------------------- */}
        {/* Keep reading + CTA                                          */}
        {/* ---------------------------------------------------------- */}
        <AnimatedSection className="mx-auto max-w-content px-6 pb-20 md:px-20 md:pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                to: "/insights/share-of-algorithm",
                k: "Framework",
                t: "Share of Algorithm: the score for the agentic era",
              },
              {
                to: "/insights/agentic-payments",
                k: "Point of view",
                t: "Agentic payments: what changes when the buyer is software",
              },
              {
                to: "/insights/inside-the-agentic-value-audit",
                k: "Method",
                t: "Inside the agentic value audit",
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group rounded-2xl border border-border bg-[#EAE8E5] p-6 transition-colors hover:border-primary/40 md:p-7"
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-foreground/40">
                  {c.k.toUpperCase()}
                </span>
                <p className="card-heading mt-3">{c.t}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-primary">
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border-t-2 border-primary bg-[#0E0E14] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-[20px] font-bold tracking-[-0.02em] text-white md:text-[26px]">
                See what agents say about your brand today.
              </p>
              <p className="mt-2 text-[13.5px] text-white/55 md:text-[15px]">
                One URL. Live agent queries plus a full crawl, scored out of 100.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <a href={AUDIT_URL}>
                Free Agentic Audit
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default WhatIsAgenticCommerce;
