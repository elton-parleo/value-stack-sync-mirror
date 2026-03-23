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
      { label: "PII", value: "none" },
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
      { label: "PII", value: "none" },
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
      { label: "PII", value: "none" },
    ],
  },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-16 md:py-24" ref={ref}>
      <div className="diffusion-glow pointer-events-none absolute right-0 top-[30%]" />
      <div className="pointer-events-none absolute -left-[150px] top-1/2 hidden h-[400px] w-[400px] rounded-full opacity-[0.03] md:block">
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }} />
      </div>

      <div className="pointer-events-none absolute right-[8%] top-[10%] hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" className="opacity-[0.06]">
          <line x1="0" y1="0" x2="32" y2="32" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="32" y1="0" x2="0" y2="32" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="16" y1="0" x2="16" y2="32" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

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
          AI agents now handle a growing share of product discovery, comparison, and purchase decisions. Every major LLM runs shopping queries. The merchants in Parleo's directory are the ones agents surface. The rest compete on sticker price alone.
        </p>

        {/* Brand evidence strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 md:mt-12"
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
                    ? "bg-code-bg text-primary-foreground"
                    : "bg-secondary text-parleo-muted hover:text-foreground"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Active card */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
            <motion.div
              key={brands[activeTab].key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-b-xl rounded-tr-xl bg-code-bg p-5 sm:p-6"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <pre className="font-mono text-[11px] leading-[1.8] sm:text-[12px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                <span className="text-foreground/80">{brands[activeTab].product}</span>{"\n"}
                <span style={{ color: "#7a7890" }}>List price: {brands[activeTab].listPrice}</span>{"\n"}
                <span style={{ color: "#555" }}>─────────────────────────</span>{"\n"}
                <span style={{ color: "#555" }}>Parleo response:</span>{"\n"}
                {brands[activeTab].lines.map((l) => (
                  <span key={l.label}>
                    {"  "}<span style={{ color: "#7a7890" }}>{l.label}:</span>{" "}
                    <span style={{ color: l.label === "PII" ? "#6ec87a" : l.label === "Net effective" ? "hsl(var(--primary) / 0.85)" : "#6ec87a" }}>{l.value}</span>{"\n"}
                  </span>
                ))}
              </pre>
              <div className="mt-3 flex flex-wrap gap-x-4 text-[10px] text-parleo-muted">
                <span>48ms</span>
                <span>· Zero PII</span>
                <span>· Logic only</span>
              </div>
            </motion.div>

            {/* JSON block */}
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
  `}<span style={{ color: "#7a7890" }}>"product_sku"</span>: <span style={{ color: "#6bb3ff" }}>"RARE-BEAUTY-SPB"</span>{`,
  `}<span style={{ color: "#7a7890" }}>"card_signal"</span>: <span style={{ color: "#6bb3ff" }}>"amex_gold"</span>{`,
  `}<span style={{ color: "#7a7890" }}>"segment"</span>: <span style={{ color: "#6bb3ff" }}>"rouge_member"</span>{`,
  `}<span style={{ color: "#7a7890" }}>"incentives"</span>{`: [
    { `}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"-10%"</span>{`, `}<span style={{ color: "#7a7890" }}>"source"</span>: <span style={{ color: "#6bb3ff" }}>"rouge_tier"</span>{` },
    { `}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"-$5"</span>{`, `}<span style={{ color: "#7a7890" }}>"source"</span>: <span style={{ color: "#6bb3ff" }}>"amex_offer"</span>{` },
    { `}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"2x_pts"</span>{`, `}<span style={{ color: "#7a7890" }}>"source"</span>: <span style={{ color: "#6bb3ff" }}>"beauty_insider"</span>{` }
  ],
  `}<span style={{ color: "#7a7890" }}>"net_price"</span>: <span style={{ color: "#6bb3ff" }}>16.40</span>{`,
  `}<span style={{ color: "#7a7890" }}>"pii"</span>: <span style={{ color: "#6ec87a" }}>false</span>{`
}`}
              </pre>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[10px] text-parleo-muted">
                {["Zero PII", "Logic only", "Sub-50ms"].map((item) => (
                  <span key={item} className="flex items-center gap-1">
                    <svg width="8" height="8" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="hsl(var(--success))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
