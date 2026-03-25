import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

/* ── Chat-style UI ── */

const chatMessages = [
  {
    role: "user" as const,
    text: "Find me the best deal on Air Max 90s",
  },
  {
    role: "agent" as const,
    text: "Checking prices across retailers...",
    isThinking: true,
  },
  {
    role: "agent" as const,
    text: "",
    isParleoCall: true,
  },
  {
    role: "agent" as const,
    text: (
      <>
        Found it! <span className="font-semibold">Nike Air Max 90</span> — list price $140.
        <br />
        <br />
        With your Nike membership and Amex Platinum card, Parleo found:
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between rounded-md bg-primary/[0.05] px-3 py-1.5">
            <span className="text-foreground/60">Member unlock</span>
            <span className="font-medium text-primary">Active</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-primary/[0.05] px-3 py-1.5">
            <span className="text-foreground/60">Amex Platinum</span>
            <span className="font-medium text-primary">−$20</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-primary/[0.05] px-3 py-1.5">
            <span className="text-foreground/60">Loyalty points</span>
            <span className="font-medium text-primary">2x ($8 value)</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
            <span className="font-semibold text-foreground">Your price</span>
            <span className="text-lg font-bold text-primary">$107</span>
          </div>
        </div>
      </>
    ),
  },
];

const UserMessage = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex justify-end"
  >
    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[14px] leading-[1.6] text-primary-foreground">
      {text}
    </div>
  </motion.div>
);

const AgentMessage = ({
  children,
  delay,
  isThinking,
  isParleoCall,
}: {
  children?: React.ReactNode;
  delay: number;
  isThinking?: boolean;
  isParleoCall?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex items-start gap-2.5"
  >
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5">
        <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
      </svg>
    </div>
    <div className="max-w-[85%]">
      {isParleoCall ? (
        <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          <span className="text-[12px] font-medium text-foreground/60">
            Querying Parleo…
          </span>
          <span className="text-[11px] text-primary">48ms</span>
        </div>
      ) : isThinking ? (
        <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-2.5 text-[14px] leading-[1.6] text-foreground/50 italic">
          {children}
        </div>
      ) : (
        <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 text-[14px] leading-[1.6] text-foreground">
          {children}
        </div>
      )}
    </div>
  </motion.div>
);

const WithoutParleoChat = () => (
  <div className="space-y-3">
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-[14px] leading-[1.6] text-foreground/70">
        Find me the best deal on Air Max 90s
      </div>
    </div>
    <div className="flex items-start gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5">
          <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
        </svg>
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 text-[14px] leading-[1.6] text-foreground">
        The Nike Air Max 90 is <span className="font-semibold">$140</span> at Nike.com.
        <div className="mt-2 text-foreground/50 italic">
          No loyalty, card offer, or incentive data available.
        </div>
      </div>
    </div>
  </div>
);

const ProblemSection = () => {
  const ref = useRef(null);
  const [showParleo, setShowParleo] = useState(true);

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

        <p className="mt-4 max-w-[580px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
          When a customer asks an AI agent for a recommendation, the agent only sees list prices — unless you're on Parleo.
        </p>

        {/* Toggle */}
        <div className="mt-8 flex items-center gap-3 md:mt-10">
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

        {/* Chat UI */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 mx-auto max-w-[600px] overflow-hidden rounded-2xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3" style={{ background: "#FAFAF9" }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[13px] font-medium text-foreground">AI Shopping Assistant</span>
            </div>
            <span className="text-[11px] text-parleo-muted">
              {showParleo ? "Parleo-enhanced" : "Standard"}
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4 p-5">
            {showParleo ? (
              <>
                {chatMessages.map((msg, i) => {
                  const delay = i * 0.15;
                  if (msg.role === "user") {
                    return <UserMessage key={i} text={msg.text as string} delay={delay} />;
                  }
                  return (
                    <AgentMessage
                      key={i}
                      delay={delay}
                      isThinking={msg.isThinking}
                      isParleoCall={msg.isParleoCall}
                    >
                      {msg.text}
                    </AgentMessage>
                  );
                })}
              </>
            ) : (
              <WithoutParleoChat />
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-5 py-3 text-[11px] text-parleo-muted" style={{ background: "#FAFAF9" }}>
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
