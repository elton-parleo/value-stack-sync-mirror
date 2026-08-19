import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";
import lifestyleBeauty from "@/assets/lifestyle-beauty-flatlay.jpg";

const SITE = "https://parleo.io";
const URL = `${SITE}/what-is-agentic-commerce`;
const AUDIT_URL = "https://audit.parleo.io/";

const TITLE = "What Is Agentic Commerce? A Definition and Field Guide | Parleo";
const DESCRIPTION =
  "Agentic commerce is shopping done by AI agents on a buyer's behalf: they search, compare, and increasingly transact. Here's how it works, the protocols behind it, and why agents quote list price instead of your real price.";

const faq = [
  {
    q: "What is agentic commerce?",
    a: "Agentic commerce is commerce where an AI agent does the shopping: it interprets intent, searches the catalog, compares options across merchants, and increasingly completes the purchase on the buyer's behalf. The shopper reads one answer instead of ten tabs, so the agent, not the storefront, becomes the point of decision.",
  },
  {
    q: "How is agentic commerce different from ecommerce?",
    a: "Traditional ecommerce optimizes a human's path through a storefront: imagery, layout, reviews, and checkout flow. Agentic commerce optimizes machine-readable structure: whether an agent can retrieve your catalog, parse your real price, and cite your offer inside a single answer. Design persuades people. Structure persuades agents.",
  },
  {
    q: "How does an agentic commerce transaction work?",
    a: "Four steps: intent capture (the shopper states a goal), retrieval (the agent pulls candidate products from feeds, pages, or APIs), resolution (the agent ranks by price and constraints), and execution (the agent checks out or hands a link back). Most brand value is won or lost in the retrieval and resolution steps, before checkout exists.",
  },
  {
    q: "What protocols power agentic commerce?",
    a: "Four matter today: MCP from Anthropic for tool and data access, ACP from Stripe and OpenAI for agent checkout, UCP and AP2 from Google for catalog and payment intent, and Visa TAP for agent-authorized card transactions. Each answers a different question, so support is additive rather than a single winner.",
  },
  {
    q: "Why do AI agents quote the wrong price?",
    a: "Because the price agents can read is the list price. Member pricing, funded promotions, points multipliers, and card-linked offers usually resolve at checkout or later, and agents overwhelmingly operate in the product and comparison phase. The result is a brand that funded a better price losing to a competitor whose list price is simply lower.",
  },
  {
    q: "How do brands prepare for agentic commerce?",
    a: "Make three things machine-readable: your catalog (so agents can retrieve it), your access surface (so agents can query it), and your true value (so agents can quote what a shopper actually pays). Start with an audit of what agents say about you today, then close the gaps that cost the most revenue.",
  },
];

const compare = [
  { human: "A shopper scans a grid of products", agent: "An agent retrieves a structured candidate set" },
  { human: "Imagery and reviews build confidence", agent: "Schema, feeds, and APIs build eligibility" },
  { human: "Promo codes surface at checkout", agent: "Anything after retrieval is invisible" },
  { human: "Winning means ranking on a page", agent: "Winning means being cited in one answer" },
  { human: "Traffic is the unit of success", agent: "Citation is the unit of success" },
];

const steps = [
  {
    n: "01",
    label: "Intent",
    title: "The shopper states a goal",
    body: "Not a keyword. A constraint set: budget, category, timeline, brand tolerance.",
  },
  {
    n: "02",
    label: "Retrieval",
    title: "The agent pulls candidates",
    body: "Merchant feeds, structured pages, and connected APIs. Anything unreadable is never considered.",
  },
  {
    n: "03",
    label: "Resolution",
    title: "The agent ranks by value",
    body: "Price, availability, shipping, returns. Almost always headline price, because that's what's exposed.",
  },
  {
    n: "04",
    label: "Execution",
    title: "The agent buys or hands off",
    body: "Agent checkout over ACP or TAP, or a deep link back to the storefront.",
  },
];

const layers = [
  {
    name: "Visibility",
    q: "Can an agent find you at all?",
    body: "Crawlable catalog, structured product data, and presence in the feeds agents retrieve from.",
  },
  {
    name: "Accessibility",
    q: "Can an agent query you directly?",
    body: "An access surface an agent can call: MCP tools, an OpenAPI spec, a checkout protocol it recognizes.",
  },
  {
    name: "True Value",
    q: "Can an agent quote your real price?",
    body: "Member price, funded promotion, points, and card-linked value, resolved before the answer is written.",
    highlight: true,
  },
];

const protocols = [
  { name: "MCP", owner: "Anthropic", role: "Tool and data access" },
  { name: "ACP", owner: "Stripe", role: "Agent checkout" },
  { name: "UCP", owner: "Google", role: "Catalog and intent" },
  { name: "Visa TAP", owner: "Visa", role: "Agent-authorized payments" },
];

const ladder = [
  { label: "List price", value: "$74.00", note: "What the agent quotes", muted: false },
  { label: "Member price", value: "$62.90", note: "Loyalty tier, invisible", muted: true },
  { label: "Points value", value: "-$8.40", note: "Funded, invisible", muted: true },
  { label: "Card-linked", value: "-$3.06", note: "Issuer offer, invisible", muted: true },
];

const WhatIsAgenticCommerce = () => {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "What is agentic commerce?",
        description: DESCRIPTION,
        author: { "@type": "Organization", name: "Parleo" },
        publisher: { "@type": "Organization", name: "Parleo" },
        mainEntityOfPage: URL,
        datePublished: "2026-08-19",
        dateModified: "2026-08-19",
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
          content="what is agentic commerce, agentic commerce, AI shopping agents, agent checkout, MCP commerce, agentic commerce protocols, agent-ready ecommerce"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="What is agentic commerce?" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content="What is agentic commerce?" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      {/* Ambient editorial texture */}
      <div className="pointer-events-none absolute right-0 top-[8%] h-[420px] w-[240px] overflow-hidden opacity-[0.04] blur-[6px] md:h-[620px] md:w-[360px]">
        <img
          src={lifestyleRetail}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(70%)", mixBlendMode: "multiply" }}
        />
      </div>

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-content px-6 pb-14 pt-28 md:px-20 md:pb-20 md:pt-36">
          <nav aria-label="Breadcrumb" className="mb-8 text-[12px] text-foreground/45">
            <Link to="/" className="transition-colors hover:text-foreground">
              Parleo
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground/70">What is agentic commerce?</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-heading text-foreground"
          >
            What is agentic commerce?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-start"
          >
            <div>
              <div className="border-l-2 border-primary pl-5">
                <p className="text-[17px] font-medium leading-[1.5] tracking-[-0.012em] text-foreground md:text-[20px]">
                  Agentic commerce is commerce where an AI agent does the shopping: it reads intent,
                  retrieves candidates, compares them, and increasingly completes the purchase on the
                  buyer's behalf.
                </p>
              </div>
              <p className="section-copy mt-6 max-w-[62ch]">
                The storefront stops being the place a decision happens. One answer replaces ten tabs,
                and the agent writes that answer from whatever it could read about you. That's the whole
                shift: merchandising becomes a data problem, and the brands that publish structure win
                the citation.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a href={AUDIT_URL}>
                    Run your free audit
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

            {/* Fast-facts card */}
            <div
              className="rounded-2xl border-t-2 border-primary bg-[#EAE8E5] p-7 md:p-9"
              style={{ boxShadow: "0 1px 0 hsl(var(--foreground) / 0.06)" }}
            >
              <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/40">
                THE SHORT ANSWER
              </span>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  "An agent, not a shopper, does the searching and comparing.",
                  "It ranks on data it can read, which is almost always list price.",
                  "Protocols like MCP, ACP, UCP and TAP are how agents reach merchants.",
                  "Loyalty, promos and card offers stay invisible until checkout, so they don't count.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-primary" />
                    <span className="text-[14px] leading-[1.55] text-foreground/72">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto max-w-content px-6 md:px-20">
          <div className="h-px w-full bg-border" />
        </div>

        {/* Ecommerce vs agentic commerce */}
        <AnimatedSection id="difference" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading
            accent="agentic commerce"
            body="Same catalog, different reader. Everything that persuades a human is invisible to a machine, and everything a machine needs is usually buried."
            accentTone="muted"

            bodyMaxWidth="60ch"
          >
            Ecommerce vs
          </SectionHeading>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-2 border-b border-border bg-[#EAE8E5]">
              <div className="px-5 py-4 md:px-8">
                <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/45">
                  HUMAN STOREFRONT
                </span>
              </div>
              <div className="border-l border-border px-5 py-4 md:px-8">
                <span className="text-[11px] font-medium tracking-[0.14em] text-primary">
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

        {/* How a transaction works */}
        <AnimatedSection id="how" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading
            accent="in four steps"
            body="Most brands optimize the last step. Agents decide in the middle two, before a cart exists."

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
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative border-t border-foreground/15 pt-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-primary">{s.n}</span>
                  <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/40">
                    {s.label.toUpperCase()}
                  </span>
                </div>
                <h3 className="card-heading mt-3">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-foreground/58 md:text-[14.5px]">
                  {s.body}
                </p>
                {i > 0 && i < 3 && (
                  <span className="absolute -top-px left-0 h-px w-1/3 bg-primary" aria-hidden />
                )}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Price ladder: what agents see */}
        <AnimatedSection className="bg-[#0E0E14] py-14 md:py-20">
          <div className="mx-auto max-w-content px-6 md:px-20">
            <SectionHeading
              dark
              accent="agents quote the top of it"
              body="A shopper who is already a member pays one price. The agent publishes another. Every line below the first one is funded value that never reaches the answer."

              bodyMaxWidth="60ch"
            >
              Your price is a ladder.
            </SectionHeading>

            <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div className="rounded-2xl border-t-2 border-primary bg-white/[0.04] p-6 md:p-8">
                <div className="flex items-center gap-2.5">
                  <BrandLogo name="Sephora" size={18} />
                  <span className="font-mono text-[11px] tracking-[0.1em] text-white/45">
                    ONE PRODUCT, FOUR PRICES
                  </span>
                </div>
                <div className="mt-6 flex flex-col">
                  {ladder.map((l, i) => (
                    <div
                      key={l.label}
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
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-baseline justify-between rounded-xl bg-primary/10 px-4 py-3.5">
                  <span className="text-[13px] font-medium text-white">True value paid</span>
                  <span className="font-mono text-[20px] text-primary">$51.44</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={lifestyleBeauty}
                  alt="Editorial flat lay of beauty products, the category where agent-quoted prices diverge most from what members actually pay"
                  className="h-[260px] w-full object-cover md:h-[340px]"
                  loading="lazy"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-[#0E0E14]/25" />
                <p className="absolute bottom-5 left-5 right-5 text-[13px] leading-[1.5] text-white/80">
                  A 30% gap between quoted and real price is normal in beauty. Agents never see the
                  difference, so shoppers never hear it.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Three layers */}
        <AnimatedSection id="layers" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading
            accent="three questions"
            body="Agent-readiness reduces to three sequential tests. Fail the first and the other two never get asked."

            bodyMaxWidth="56ch"
          >
            Agent readiness is
          </SectionHeading>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {layers.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-7 md:p-8 ${
                  l.highlight
                    ? "border-t-2 border-primary bg-[#0E0E14]"
                    : "border border-border bg-[#EAE8E5]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] tracking-[0.1em] ${
                    l.highlight ? "text-primary" : "text-foreground/40"
                  }`}
                >
                  {`0${i + 1}`}
                </span>
                <h3
                  className={`card-heading mt-3 ${l.highlight ? "text-white" : ""}`}
                  style={l.highlight ? { color: "#fff" } : undefined}
                >
                  {l.name}
                </h3>
                <p
                  className={`mt-2 text-[13.5px] font-medium ${
                    l.highlight ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {l.q}
                </p>
                <p
                  className={`mt-3 text-[13.5px] leading-[1.55] md:text-[14.5px] ${
                    l.highlight ? "text-white/60" : "text-foreground/58"
                  }`}
                >
                  {l.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Protocols */}
          <div className="mt-12 rounded-2xl border border-border p-7 md:p-9">
            <h3 className="card-heading">The protocols agents speak</h3>
            <p className="section-copy mt-2 max-w-[58ch]">
              Each answers a different question, so support is additive. None of them carry member
              pricing or funded incentives on their own.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {protocols.map((p) => (
                <div key={p.name} className="border-t border-foreground/15 pt-4">
                  <div className="flex items-center gap-2">
                    <BrandLogo name={p.owner} size={16} grayscale />
                    <span className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-foreground/50">{p.owner}</p>
                  <p className="mt-1 text-[13px] leading-[1.45] text-foreground/65">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection id="faq" className="mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
          <SectionHeading accent="answered">
            Agentic commerce,
          </SectionHeading>

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
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="section-copy max-w-[70ch] pb-6 pr-10">{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Keep reading + CTA */}
        <AnimatedSection className="mx-auto max-w-content px-6 pb-20 md:px-20 md:pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                to: "/insights/share-of-algorithm",
                k: "Framework",
                t: "Share of Algorithm: the score for the agentic era",
              },
              {
                to: "/insights/how-agents-pick-the-best-price",
                k: "Benchmark",
                t: "How agents actually pick the best price",
              },
              {
                to: "/insights/new-shelf-is-not-human",
                k: "Point of view",
                t: "The new shelf is built for a customer that isn't human",
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group rounded-2xl border border-border bg-[#EAE8E5] p-6 transition-colors hover:border-primary/40 md:p-7"
              >
                <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/40">
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
                Run your free audit
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
