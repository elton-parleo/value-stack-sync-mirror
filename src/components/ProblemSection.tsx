import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ── Typing dots ── */
const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-foreground/30"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ── Chat window chrome ── */
const ChatWindow = ({ children }: { children: React.ReactNode }) => (
  <div
    className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[20px] border border-border bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Title bar */}
    <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-4 py-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(0_70%_65%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(45_85%_60%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(140_50%_55%)]" />
      </div>
      <div className="flex items-center gap-2 text-[11px] font-medium text-foreground/45">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Shopping assistant
      </div>
      <div className="w-12" />
    </div>

    {/* Conversation */}
    <div className="px-4 py-5 md:px-6 md:py-6">{children}</div>

    {/* Composer (static) */}
    <div className="border-t border-border/60 bg-secondary/30 px-4 py-3">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2.5">
        <span className="flex-1 text-[12px] text-foreground/35">Ask anything about a product…</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/90">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

/* ── User message bubble ── */
const UserMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end"
  >
    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Where should I buy the Rare Beauty Soft Pinch Blush?
    </div>
  </motion.div>
);

/* ── Assistant avatar ── */
const AssistantAvatar = () => (
  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(213_99%_65%)]">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
  </div>
);

/* ── Without state ── */
const WithoutAnswer = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="space-y-3"
  >
    <p className="text-[14px] leading-relaxed text-foreground/75">
      Based on the listed price, here's what I can see:
    </p>

    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-foreground/30">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/25" />
        Standard agent
      </div>

      <div className="mt-5 text-center">
        <p className="text-[12px] text-foreground/45">Rare Beauty Soft Pinch Blush</p>
        <p className="mt-2 text-[44px] font-bold tracking-tight text-foreground/80" style={{ lineHeight: 1 }}>
          $23
        </p>
        <p className="mt-1 text-[11px] text-foreground/30">list price</p>
      </div>

      <div className="mt-6 space-y-2 border-t border-border/50 pt-4">
        {[
          ["Loyalty tier", "unknown"],
          ["Card offers", "unknown"],
          ["Points value", "unknown"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-[12px] text-foreground/35">
            <span>{k}</span>
            <span className="italic">{v}</span>
          </div>
        ))}
      </div>
    </div>

    <p className="text-[13px] italic text-foreground/45">
      Price is all I have to work with.
    </p>
  </motion.div>
);

/* ── With state ── */
const WithAnswer = () => {
  const rows = [
    { label: "List price", value: "$23.00", accent: false },
    { label: "Rouge tier (−10%)", value: "−$2.30", accent: true },
    { label: "Amex card offer", value: "−$5.00", accent: true },
    { label: "Beauty Insider 4x", value: "$4.60 value", accent: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-3"
    >
      <p className="text-[14px] leading-relaxed text-foreground/75">
        Sephora is your best option. After your Rouge tier, an active Amex offer, and 4x Beauty Insider points, your true cost drops to <span className="font-semibold text-primary">$11.10</span>.
      </p>

      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border-2 border-primary/20 bg-card p-5"
        style={{ boxShadow: "0 0 0 1px hsl(213 99% 50% / 0.06), var(--shadow-md)" }}
      >
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-primary/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Parleo-enhanced
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
            <BrandLogo name="Sephora" size={22} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground">Rare Beauty Soft Pinch Blush</p>
            <p className="text-[11px] text-foreground/45">Best deal via Sephora</p>
          </div>
        </div>

        <div className="mt-4 space-y-0">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.3 }}
              className="flex items-center justify-between border-b border-border/40 py-2 text-[12.5px]"
            >
              <span className="text-foreground/60">{row.label}</span>
              <span className={row.accent ? "font-semibold text-[hsl(var(--success))]" : "font-medium text-foreground"}>
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-3 flex items-baseline justify-between"
        >
          <span className="text-[13px] font-semibold text-foreground">True cost</span>
          <span className="text-[30px] font-bold tracking-tight text-primary" style={{ lineHeight: 1 }}>
            $11.10
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {["Rouge since 2019", "12 purchases/yr", "$847 annual value", "Amex Platinum"].map((tag) => (
            <span key={tag} className="rounded-full border border-primary/15 bg-primary/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-primary/70">
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { name: "Ulta", price: "$23.00", note: "no offers" },
            { name: "Target", price: "$23.00", note: "no offers" },
          ].map((r) => (
            <div key={r.name} className="rounded-lg bg-secondary/60 px-3 py-2 text-[11px]">
              <span className="inline-flex items-center gap-1 font-medium text-foreground/60">
                <BrandLogo name={r.name} size={12} />
                {r.name}
              </span>
              <p className="mt-0.5 text-foreground/40">{r.price} · {r.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary/50">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          48ms · Zero PII · 3 merchants compared
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Assistant turn (typing → answer) ── */
const AssistantTurn = ({ showParleo }: { showParleo: boolean }) => {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 700);
    return () => clearTimeout(t);
  }, [showParleo]);

  return (
    <div className="flex items-start gap-3">
      <AssistantAvatar />
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          {typing ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-block rounded-2xl rounded-tl-md bg-secondary/60 px-3 py-2"
            >
              <TypingDots />
            </motion.div>
          ) : (
            <motion.div key={showParleo ? "with" : "without"}>
              {showParleo ? <WithAnswer /> : <WithoutAnswer />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

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

        {/* Unified chat window with toggle */}
        <div className="mt-8">
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <button
                onClick={() => setShowParleo(false)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  !showParleo ? "bg-secondary text-foreground shadow-sm" : "text-foreground/45 hover:text-foreground/70"
                }`}
              >
                Without Parleo
              </button>
              <button
                onClick={() => setShowParleo(true)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  showParleo ? "bg-primary/10 text-primary shadow-sm" : "text-foreground/45 hover:text-foreground/70"
                }`}
              >
                With Parleo
              </button>
            </div>
          </div>

          <ChatWindow>
            <div className="space-y-5">
              <UserMessage />
              <AssistantTurn showParleo={showParleo} />
            </div>
          </ChatWindow>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
