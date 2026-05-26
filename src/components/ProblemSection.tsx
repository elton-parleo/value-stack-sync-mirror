import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import tatchaWaterCream from "@/assets/tatcha-water-cream.png";


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

/* ── Chat window chrome (ChatGPT-style) ── */
const ChatWindow = ({ children }: { children: React.ReactNode }) => (
  <div
    className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[18px] border border-border bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Title bar — ChatGPT-like */}
    <div className="flex items-center justify-between border-b border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex items-center gap-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <div className="flex items-center gap-1 text-[12.5px] font-semibold text-foreground/80">
          ChatGPT
          <span className="ml-0.5 font-normal text-foreground/40">5</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
          Share
        </button>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(28_75%_60%)] text-[10px] font-semibold text-white">
          S
        </div>
      </div>
    </div>

    {/* Conversation */}
    <div className="px-3 py-4 md:px-6 md:py-6">{children}</div>

    {/* Composer (static) */}
    <div className="border-t border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-2 md:px-4 md:py-2.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="flex-1 truncate text-[12px] text-foreground/35">Ask anything</span>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground md:h-7 md:w-7">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-foreground/35">
        ChatGPT can make mistakes. Check important info.
      </p>
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
    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Can you find me the best deal on the Tatcha moisturizer?
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

/* ── Retailer row ── */
const RetailerRow = ({
  name,
  price,
  badge,
  highlighted,
}: {
  name: string;
  price: string;
  badge?: string;
  highlighted?: boolean;
}) => (
  <div
    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
      highlighted
        ? "border-foreground/20 bg-foreground/[0.04]"
        : "border-border/60 bg-secondary/30"
    }`}
  >
    <div className="flex items-center gap-2">
      <BrandLogo name={name} size={14} />
      <span className="text-[12.5px] font-medium text-foreground/80">{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[13px] font-semibold ${highlighted ? "text-foreground" : "text-foreground/70"}`}>
        {price}
      </span>
      {badge && (
        <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/70">
          {badge}
        </span>
      )}
    </div>
  </div>
);

/* ── Without state ── */
const WithoutAnswer = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="space-y-3"
  >
    <p className="text-[13.5px] leading-relaxed text-foreground/75 md:text-[14px]">
      Here's the lowest listed price across the four retailers:
    </p>

    <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-foreground/40">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/30" />
        Standard agent · listed prices only
      </div>

      <div className="mt-3 flex items-center gap-3 border-b border-border/50 pb-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/60">
          <img src={tatchaWaterCream} alt="Tatcha The Water Cream" className="h-full w-full object-contain" loading="lazy" />
        </div>
        <div className="min-w-0">
          <p className="text-[10.5px] uppercase tracking-wider text-foreground/45">Tatcha</p>
          <p className="text-[13px] font-semibold text-foreground">The Water Cream</p>
          <p className="text-[11px] text-foreground/45">50ml · moisturizer</p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <RetailerRow name="Amazon" price="$28.00" badge="Recommended" highlighted />
        <RetailerRow name="Sephora" price="$30.00" />
        <RetailerRow name="Ulta" price="$30.00" />
        <RetailerRow name="Nordstrom" price="$30.00" />
      </div>

      <div className="mt-4 rounded-lg bg-secondary/60 px-3 py-2.5 text-[12px] leading-relaxed text-foreground/65">
        <span className="font-semibold text-foreground/80">Agent recommends Amazon.</span> The retailer with the best actual value is invisible.
      </div>
    </div>

    <p className="text-[12.5px] italic text-foreground/45">
      Loyalty, card-linked offers, GWP, and membership benefits don't exist to the agent.
    </p>
  </motion.div>
);

/* ── With state ── */
const WithAnswer = () => {
  const stack = [
    { label: "Listed price · Sephora", value: "$30.00", accent: false },
    { label: "Beauty Insider Rouge · −20%", value: "−$6.00", accent: true },
    { label: "Sephora Visa · 4% back", value: "−$0.96", accent: true },
    { label: "Birthday GWP value", value: "−$8.40", accent: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-3"
    >
      <p className="text-[13.5px] leading-relaxed text-foreground/75 md:text-[14px]">
        Listed prices say Amazon. But you're a Sephora Rouge member with an active card offer and birthday GWP. Your <span className="font-semibold text-primary">true cost at Sephora is $14.64</span>, beating Amazon by $13.36.
      </p>

      <div
        className="rounded-2xl border-2 border-primary/20 bg-card p-4 md:p-5"
        style={{ boxShadow: "0 0 0 1px hsl(213 99% 50% / 0.06), var(--shadow-md)" }}
      >
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-primary/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Parleo-enhanced · Sephora customer
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/60">
            <img src={tatchaWaterCream} alt="Tatcha The Water Cream" className="h-full w-full object-contain" loading="lazy" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <BrandLogo name="Sephora" size={12} />
              <p className="text-[10.5px] uppercase tracking-wider text-foreground/45">Best deal · Sephora</p>
            </div>
            <p className="truncate text-[13px] font-semibold text-foreground">Tatcha The Water Cream</p>
            <p className="text-[11px] text-foreground/45">True cost after your incentive stack</p>
          </div>
        </div>

        <div className="mt-4">
          {stack.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-border/40 py-2 text-[12.5px]"
            >
              <span className="text-foreground/60">{row.label}</span>
              <span className={row.accent ? "font-semibold text-[hsl(var(--success))]" : "font-medium text-foreground"}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-[13px] font-semibold text-foreground">True cost to you</span>
          <span className="text-[28px] font-bold tracking-tight text-primary md:text-[30px]" style={{ lineHeight: 1 }}>
            $14.64
          </span>
        </div>

        <div className="mt-4 rounded-lg bg-primary/[0.06] px-3 py-2.5 text-[11.5px] leading-relaxed text-foreground/70">
          Sephora wins by <span className="font-semibold text-primary">$13.36</span>. Without Parleo, that's revenue the retailer never competed for, because the agent couldn't see it.
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary/50">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          48ms · Zero PII · 4 retailers compared
        </div>
      </div>
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

        <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: "58%", label: "of consumers have used AI to shop", source: "Stripe, 2024" },
            { value: "4,700%", label: "YoY increase in AI-driven retail traffic", source: "Adobe, 2024" },
            { value: "$5T", label: "projected agentic commerce revenue by 2030", source: "McKinsey, 2024" },
          ].map((s) => (
            <div key={s.value} className="py-5 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-bold tracking-tight text-foreground md:text-[40px]" style={{ lineHeight: 1 }}>
                  {s.value}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-foreground/65 md:text-[14px]">
                {s.label}
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-px w-4 bg-foreground/20" />
                <span className="text-[10.5px] font-medium uppercase tracking-wider text-foreground/40">
                  {s.source}
                </span>
              </div>
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
