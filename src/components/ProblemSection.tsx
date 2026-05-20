import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ── "Without" state: stark, empty, price-only ── */

const WithoutCard = () => (
  <div className="h-full rounded-2xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-foreground/25">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/20" />
      Standard agent
    </div>

    <div className="mt-10 md:mt-16 text-center">
      <p className="text-[13px] text-foreground/40">Rare Beauty Soft Pinch Blush</p>
      <p className="mt-3 text-[48px] font-bold tracking-tight text-foreground/80 md:text-[56px]" style={{ lineHeight: 1 }}>
        $23
      </p>
      <p className="mt-2 text-[12px] text-foreground/25">list price</p>
    </div>

    <div className="mt-10 md:mt-16 space-y-2">
      <div className="h-[1px] bg-border/50" />
      <div className="flex items-center justify-between text-[12px] text-foreground/25">
        <span>Loyalty tier</span>
        <span className="italic">unknown</span>
      </div>
      <div className="flex items-center justify-between text-[12px] text-foreground/25">
        <span>Card offers</span>
        <span className="italic">unknown</span>
      </div>
      <div className="flex items-center justify-between text-[12px] text-foreground/25">
        <span>Points value</span>
        <span className="italic">unknown</span>
      </div>
    </div>

    <p className="mt-6 text-center text-[11px] text-foreground/20">
      Price is all the agent has to work with.
    </p>
  </div>
);

/* ── "With" state: rich, layered, data-dense ── */

const WithCard = () => (
  <div
    className="h-full rounded-2xl border-2 border-primary/20 bg-card p-6 md:p-8"
    style={{ boxShadow: "0 0 0 1px hsl(213 99% 50% / 0.06), var(--shadow-elevated)" }}
  >
    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-primary/60">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
      Parleo-enhanced agent
    </div>

    {/* Product + best merchant */}
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <BrandLogo name="Sephora" size={22} />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-foreground">Rare Beauty Soft Pinch Blush</p>
          <p className="text-[12px] text-foreground/45">Best deal via Sephora</p>
        </div>
      </div>
    </div>

    {/* Value stack */}
    <div className="mt-5 space-y-0">
      {[
        { label: "List price", value: "$23.00", accent: false },
        { label: "Rouge tier (−10%)", value: "−$2.30", accent: true },
        { label: "Amex card offer", value: "−$5.00", accent: true },
        { label: "Beauty Insider 4x", value: "$4.60 value", accent: true },
      ].map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
          className="flex items-center justify-between border-b border-border/40 py-2.5 text-[13px]"
        >
          <span className="text-foreground/60">{row.label}</span>
          <span className={row.accent ? "font-semibold text-[hsl(var(--success))]" : "font-medium text-foreground"}>
            {row.value}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Net effective */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="mt-4 flex items-baseline justify-between"
    >
      <span className="text-[14px] font-semibold text-foreground">True cost</span>
      <span className="text-[32px] font-bold tracking-tight text-primary" style={{ lineHeight: 1 }}>
        $11.10
      </span>
    </motion.div>

    {/* Context signals */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.9 }}
      className="mt-4 flex flex-wrap gap-1.5"
    >
      {["Rouge since 2019", "12 purchases/yr", "$847 annual value", "Amex Platinum"].map((tag) => (
        <span key={tag} className="rounded-full border border-primary/12 bg-primary/[0.03] px-2.5 py-1 text-[11px] font-medium text-primary/70">
          {tag}
        </span>
      ))}
    </motion.div>

    {/* Comparison row */}
    <div className="mt-5 grid grid-cols-2 gap-2">
      {[
        { name: "Ulta", price: "$23.00", note: "no offers" },
        { name: "Target", price: "$23.00", note: "no offers" },
      ].map((r) => (
        <div key={r.name} className="rounded-lg bg-secondary/50 px-3 py-2 text-[11px]">
          <span className="inline-flex items-center gap-1 font-medium text-foreground/60">
            <BrandLogo name={r.name} size={12} />
            {r.name}
          </span>
          <p className="mt-0.5 text-foreground/35">{r.price} · {r.note}</p>
        </div>
      ))}
    </div>

    <div className="mt-4 flex items-center gap-1.5 text-[10px] text-primary/40">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
        <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>
      48ms · Zero PII · 3 merchants compared
    </div>
  </div>
);

const ProblemSection = () => {
  const ref = useRef(null);
  const [showParleo, setShowParleo] = useState(true);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-12 md:py-20" ref={ref}>
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

        {/* Inline sourced stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 md:gap-8">
          {[
            { value: "58%", label: "of consumers have used AI to shop", source: "Stripe" },
            { value: "4,700%", label: "YoY increase in AI-driven retail traffic", source: "Adobe" },
            { value: "$5T", label: "projected agentic commerce revenue by 2030", source: "McKinsey" },
          ].map((s) => (
            <div key={s.value}>
              <span className="text-[26px] font-bold text-foreground md:text-[36px]" style={{ lineHeight: 1.1 }}>
                {s.value}
              </span>
              <p className="mt-0.5 text-[11px] leading-[1.4] text-foreground/50 md:text-[13px]">
                {s.label}
              </p>
              <span className="mt-0.5 inline-block text-[10px] font-medium text-foreground/30">
                {s.source}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[580px] text-[15px] leading-[1.7] text-foreground/70 md:text-[17px]">
          Without Parleo, agents rank products by headline price and sparse specs, missing loyalty, promos, and card-linked value that actually determines the best deal.
        </p>

        {/* Side-by-side comparison */}
        <div className="mt-8">
          {/* Mobile toggle */}
          <div className="mb-4 flex justify-center md:hidden">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <button
                onClick={() => setShowParleo(false)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  !showParleo ? "bg-secondary text-foreground shadow-sm" : "text-foreground/40"
                }`}
              >
                Without Parleo
              </button>
              <button
                onClick={() => setShowParleo(true)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  showParleo ? "bg-primary/10 text-primary shadow-sm" : "text-foreground/40"
                }`}
              >
                With Parleo
              </button>
            </div>
          </div>

          {/* Desktop: side-by-side */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-5">
            <WithoutCard />
            <WithCard />
          </div>

          {/* Mobile: toggled */}
          <div className="md:hidden">
            {showParleo ? <WithCard /> : <WithoutCard />}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
