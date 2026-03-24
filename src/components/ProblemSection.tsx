import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

const brands = [
  {
    key: "sephora",
    label: "Sephora",
    product: "Rare Beauty Soft Pinch Blush",
    listPrice: "$23",
    lines: [
      { label: "Rouge tier", value: "−10%" },
      { label: "Amex card offer", value: "−$5" },
      { label: "Beauty Insider", value: "2x points ($3 value)" },
      { label: "Net effective", value: "$16.40" },
    ],
  },
  {
    key: "homedepot",
    label: "Home Depot",
    product: "DeWalt 20V Max Drill Kit",
    listPrice: "$179",
    lines: [
      { label: "Pro Xtra tier 2", value: "−5%" },
      { label: "Volume qualifier", value: "−$8" },
      { label: "Commercial credit", value: "−$12.80 rebate" },
      { label: "Net effective", value: "$148.20" },
    ],
  },
  {
    key: "nike",
    label: "Nike",
    product: "Air Max 90",
    listPrice: "$140",
    lines: [
      { label: "Member unlock", value: "active" },
      { label: "Amex Platinum", value: "−$20" },
      { label: "Loyalty", value: "2x points ($8 value)" },
      { label: "Net effective", value: "$107" },
    ],
  },
];

/* ── Chat bubble components ── */
const UserBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start gap-3"
  >
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-foreground/60">
      U
    </div>
    <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3" style={{ boxShadow: "var(--shadow-sm)" }}>
      <p className="text-[13px] leading-[1.6] text-foreground">
        Find me the best deal on a moisturizer for dry skin under $30
      </p>
    </div>
  </motion.div>
);

const ParleoNode = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.25 }}
    className="flex flex-col items-center gap-3"
  >
    {/* Connection line top */}
    <div className="h-6 w-px bg-border md:hidden" />
    <div className="hidden h-px w-8 bg-border md:block" />

    <div className="relative flex flex-col items-center">
      <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.06] px-3 py-2" style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.08)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>
        <span className="text-[12px] font-bold text-foreground">PARLEO</span>
      </div>

      {/* Mini data card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mt-2 rounded-lg border border-border bg-code-bg px-3 py-2.5"
        style={{ boxShadow: "var(--shadow-md)", minWidth: 180 }}
      >
        <pre className="font-mono text-[10px] leading-[1.7]" style={{ color: "hsl(var(--muted-foreground))" }}>
          <span className="text-foreground/70">Sephora</span> — Rouge tier: <span style={{ color: "#6ec87a" }}>−10%</span>{"\n"}
          {"          "}Amex offer: <span style={{ color: "#6ec87a" }}>−$5</span>{"\n"}
          {"          "}Net: <span style={{ color: "#6bb3ff" }}>$16.40</span>
        </pre>
      </motion.div>
    </div>

    {/* Connection line bottom */}
    <div className="h-6 w-px bg-border md:hidden" />
    <div className="hidden h-px w-8 bg-border md:block" />
  </motion.div>
);

const AgentBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.55 }}
    className="flex items-start gap-3"
  >
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
        <circle cx="9" cy="16" r="1" fill="hsl(var(--primary))" />
        <circle cx="15" cy="16" r="1" fill="hsl(var(--primary))" />
      </svg>
    </div>
    <div className="rounded-2xl rounded-tl-md border border-primary/15 bg-primary/[0.03] px-4 py-3" style={{ boxShadow: "var(--shadow-sm)" }}>
      <p className="text-[13px] leading-[1.6] text-foreground">
        The best option is the <span className="font-semibold">Rare Beauty Soft Pinch Blush</span> at Sephora. With your Rouge membership and Amex card, your effective price is <span className="font-semibold text-primary">$16.40</span> — that's 29% below list. It also earns 2x Beauty Insider points.
      </p>
    </div>
  </motion.div>
);

const ProblemSection = () => {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-16 md:py-24" ref={ref}>
      <div className="diffusion-glow pointer-events-none absolute right-0 top-[30%]" />

      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="font-label text-parleo-muted">THE NEW CHANNEL</span>
        </div>

        <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
          Agents are already shopping<br className="hidden md:block" />
          for your customers.
        </h2>

        <p className="mt-4 max-w-[580px] text-[17px] leading-[1.7] text-foreground/50">
          Every major LLM runs shopping queries. The merchants in Parleo's directory are the ones agents recommend. The rest compete on price alone.
        </p>

        {/* ── Visual narrative flow ── */}
        <div className="mt-8 flex flex-col items-stretch gap-0 md:mt-12 md:flex-row md:items-center md:gap-0">
          {/* Stage 1: User query */}
          <div className="flex-1">
            <p className="mb-2 font-label text-parleo-muted">1 · THE QUERY</p>
            <UserBubble />
          </div>

          {/* Stage 2: Parleo enriches */}
          <div className="flex items-center justify-center py-4 md:px-4 md:py-0">
            <ParleoNode />
          </div>

          {/* Stage 3: Agent answer */}
          <div className="flex-1">
            <p className="mb-2 font-label text-parleo-muted">3 · THE ANSWER</p>
            <AgentBubble />
          </div>
        </div>

        {/* Brand logos strip */}
        <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-10 md:gap-4">
          <span className="text-[11px] text-parleo-muted">Merchants on Parleo</span>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["Sephora", "Home Depot", "Nike"].map((name) => (
              <span key={name} className="rounded border border-border bg-secondary/50 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-parleo-muted/60 md:px-2.5 md:py-1 md:text-[10px]">
                {name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* ── Lighter tabbed brand cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6 md:mt-10"
        >
          <p className="text-[13px] font-medium text-foreground/70">What agents see for merchants on Parleo.</p>

          {/* Tabs */}
          <div className="mt-4 flex gap-1">
            {brands.map((b, i) => (
              <button
                key={b.key}
                onClick={() => setActiveTab(i)}
                className={`rounded-t-lg px-4 py-2 text-[13px] font-medium transition-all ${
                  activeTab === i
                    ? "border border-b-0 border-border bg-card text-foreground"
                    : "bg-secondary text-parleo-muted hover:text-foreground"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Card + JSON side by side */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
            {/* Summary card — light receipt style */}
            <motion.div
              key={brands[activeTab].key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-b-xl rounded-tr-xl border border-border bg-card p-5 sm:p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-bold text-foreground">{brands[activeTab].product}</h4>
                <span className="text-[13px] text-parleo-muted">List: {brands[activeTab].listPrice}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {brands[activeTab].lines.map((l) => (
                  <div key={l.label} className="flex items-center justify-between border-b border-border/40 py-1.5">
                    <span className="text-[13px] text-foreground/60">{l.label}</span>
                    <span className={`text-[13px] font-medium ${l.label === "Net effective" ? "text-primary" : "text-foreground"}`}>
                      {l.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 text-[10px] text-parleo-muted">
                <span>48ms</span>
                <span>· Zero PII</span>
                <span>· Logic only</span>
              </div>
            </motion.div>

            {/* JSON proof — secondary, compact */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="min-w-0 overflow-hidden rounded-xl bg-code-bg p-5 transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
                    <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-label text-parleo-muted">API RESPONSE · 48ms</span>
              </div>

              <pre
                className="mt-4 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-[1.7] sm:text-[11px] sm:leading-[1.8]"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
{`{
  `}<span style={{ color: "#7a7890" }}>"merchant"</span>: <span style={{ color: "#6bb3ff" }}>"sephora_us"</span>{`,
  `}<span style={{ color: "#7a7890" }}>"net_price"</span>: <span style={{ color: "#6bb3ff" }}>16.40</span>{`,
  `}<span style={{ color: "#7a7890" }}>"incentives"</span>{`: [
    { `}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"-10%"</span>{`, `}<span style={{ color: "#7a7890" }}>"source"</span>: <span style={{ color: "#6bb3ff" }}>"rouge_tier"</span>{` },
    { `}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"-$5"</span>{`, `}<span style={{ color: "#7a7890" }}>"source"</span>: <span style={{ color: "#6bb3ff" }}>"amex_offer"</span>{` }
  ],
  `}<span style={{ color: "#7a7890" }}>"pii"</span>: <span style={{ color: "#6ec87a" }}>false</span>{`
}`}
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
