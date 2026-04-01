import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import lightRefraction from "@/assets/light-refraction.jpg";

/* ── Chat bubble components ── */

const UserBubble = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end"
  >
    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13px] leading-[1.6] text-primary-foreground">
      {text}
    </div>
  </motion.div>
);

const AgentBubble = ({ children, delay, isThinking, isParleoCall }: {
  children?: React.ReactNode; delay: number; isThinking?: boolean; isParleoCall?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-start gap-2"
  >
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5">
        <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
      </svg>
    </div>
    <div className="max-w-[85%]">
      {isParleoCall ? (
        <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          <span className="text-[11px] font-medium text-foreground/60">Querying Parleo...</span>
          <span className="text-[10px] text-primary">48ms</span>
        </div>
      ) : isThinking ? (
        <div className="rounded-2xl rounded-tl-md border border-border bg-card px-3 py-2 text-[13px] leading-[1.6] text-foreground/50 italic">
          {children}
        </div>
      ) : (
        <div className="rounded-2xl rounded-tl-md border border-border bg-card px-3 py-2.5 text-[13px] leading-[1.6] text-foreground">
          {children}
        </div>
      )}
    </div>
  </motion.div>
);

/* ── Without Parleo Chat ── */

const WithoutParleoChat = () => (
  <div className="space-y-2.5">
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0, ease: [0.22, 1, 0.36, 1] }} className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-muted px-4 py-2 text-[13px] leading-[1.6] text-foreground/70">
        What's the best rated blush right now?
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="flex items-start gap-2">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5">
          <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
        </svg>
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-border bg-card px-3 py-2.5 text-[13px] leading-[1.6] text-foreground">
        Here are some popular blushes:
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2.5 py-1.5 text-[12px]">
            <div className="flex items-center gap-1"><span className="font-medium">Rare Beauty Soft Pinch</span><span className="ml-1.5 inline-flex items-center gap-1 text-foreground/50"><BrandLogo name="Sephora" size={12} />Sephora</span></div>
            <span className="font-semibold">$23</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2.5 py-1.5 text-[12px]">
            <div className="flex items-center gap-1"><span className="font-medium">NARS Orgasm</span><span className="ml-1.5 inline-flex items-center gap-1 text-foreground/50"><BrandLogo name="Nordstrom" size={12} />Nordstrom</span></div>
            <span className="font-semibold">$38</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2.5 py-1.5 text-[12px]">
            <div className="flex items-center gap-1"><span className="font-medium">e.l.f. Putty Blush</span><span className="ml-1.5 inline-flex items-center gap-1 text-foreground/50"><BrandLogo name="Target" size={12} />Target</span></div>
            <span className="text-foreground/40 italic text-[11px]">Price unavailable</span>
          </div>
        </div>
        <div className="mt-2 text-foreground/40 italic text-[11px]">
          No loyalty data, card offers, or personalized pricing available.
        </div>
      </div>
    </motion.div>
  </div>
);

/* ── With Parleo Chat ── */

const WithParleoChat = () => (
  <div className="space-y-2.5">
    <UserBubble text="What's the best rated blush right now?" delay={0} />
    <AgentBubble delay={0.15} isThinking>Searching beauty retailers...</AgentBubble>
    <AgentBubble delay={0.3} isParleoCall />
    <AgentBubble delay={0.45}>
      <>
        The top-rated blush is <span className="font-semibold">Rare Beauty Soft Pinch Liquid Blush</span>. Here's the best deal:

        <div className="mt-2 space-y-1.5">
          {/* Winner card */}
          <div className="rounded-lg border-2 border-primary/30 bg-primary/[0.03] p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">Best Deal</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[13px]"><BrandLogo name="Sephora" size={14} />Sephora</span>
              </div>
            </div>
            <div className="mt-2 space-y-0.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground/60">List price</span>
                <span className="font-medium">$23.00</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground/60">Rouge tier</span>
                <span className="font-medium text-primary">-10%</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground/60">Amex card offer</span>
                <span className="font-medium text-primary">-$5.00</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground/60">Beauty Insider</span>
                <span className="font-medium text-primary">2x pts ($3 value)</span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-border pt-1">
                <span className="font-semibold text-[13px] text-foreground">Net effective</span>
                <span className="text-[15px] font-bold text-primary">$16.40</span>
              </div>
            </div>
          </div>

          {/* Other retailers */}
          <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2.5 py-1.5 text-[12px]">
            <span className="inline-flex items-center gap-1 font-medium"><BrandLogo name="Ulta" size={12} />Ulta</span>
            <span className="text-foreground/60">$23.00 (no offers found)</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2.5 py-1.5 text-[12px]">
            <span className="inline-flex items-center gap-1 font-medium"><BrandLogo name="Target" size={12} />Target</span>
            <span className="text-foreground/60">$23.00 (no offers found)</span>
          </div>
        </div>
      </>
    </AgentBubble>
  </div>
);

const ProblemSection = () => {
  const ref = useRef(null);
  const [showParleo, setShowParleo] = useState(true);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-10 md:py-14" ref={ref}>
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

        <p className="mt-3 max-w-[580px] text-[15px] leading-[1.7] text-foreground/55 md:text-[17px]">
          Without Parleo, agents rank products by headline price and sparse specs, missing loyalty, promos, and card-linked value that actually determines the best deal.
        </p>

        {/* Toggle */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => setShowParleo(false)}
            className={`rounded-lg px-4 py-2 text-[14px] font-medium transition-all ${
              !showParleo
                ? "border border-border bg-card text-foreground shadow-sm"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Without Parleo
          </button>
          <button
            onClick={() => setShowParleo(true)}
            className={`rounded-lg px-4 py-2 text-[14px] font-medium transition-all ${
              showParleo
                ? "border border-primary/30 bg-primary/[0.06] text-primary shadow-sm"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            With Parleo
          </button>
        </div>

        {/* Chat UI — compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5" style={{ background: "#FAFAF9" }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[12px] font-medium text-foreground">AI Shopping Assistant</span>
            </div>
            <span className="text-[10px] text-parleo-muted">
              {showParleo ? "Parleo-enhanced" : "Standard"}
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-3 p-4">
            {showParleo ? <WithParleoChat /> : <WithoutParleoChat />}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5 text-[10px] text-parleo-muted" style={{ background: "#FAFAF9" }}>
            {showParleo
              ? "✓ Zero PII · ✓ <50ms · ✓ Loyalty + card offers included"
              : "✗ No loyalty data · ✗ No card offers · ✗ Price only"}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
