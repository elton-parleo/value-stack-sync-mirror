import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Scenario } from "@/data/demoData";

interface AgentReasoningProps {
  scenario: Scenario;
  onComplete: () => void;
}

const TypewriterLine = ({ text, delay, isParleo }: { text: string; delay: number; isParleo?: boolean }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`py-1.5 px-3 text-[13px] font-mono leading-[1.6] ${
        isParleo
          ? "text-primary border-l-2 border-primary/40 bg-primary/[0.03] ml-0 rounded-r-md"
          : "text-foreground/60"
      }`}
    >
      {text}
    </motion.div>
  );
};

const AgentReasoning = ({ scenario, onComplete }: AgentReasoningProps) => {
  const [phase, setPhase] = useState<"processing" | "complete">("processing");

  const allLines = [
    ...scenario.reasoning.phase1.map((t) => ({ text: t, isParleo: false })),
    ...scenario.reasoning.phase2.map((t) => ({ text: t, isParleo: false })),
    ...scenario.reasoning.phase3.map((t) => ({ text: t, isParleo: true })),
  ];

  const totalDuration = allLines.length * 350 + 500;

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, totalDuration);
    return () => clearTimeout(t);
  }, [totalDuration, onComplete]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-label text-parleo-muted">STEP 2</span>
        <span className="text-[13px] text-foreground/40">— Agent Reasoning</span>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className={`inline-block h-2 w-2 rounded-full ${phase === "processing" ? "bg-green-500 animate-pulse-dot" : "bg-green-500"}`} />
          <span className="text-[12px] font-medium text-foreground/50">
            {phase === "processing" ? "Processing..." : "✓ Complete"}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        {/* Phase 1 */}
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground) / 0.4)" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[11px] font-medium uppercase tracking-wider text-parleo-muted">Product Discovery</span>
          </div>
          {scenario.reasoning.phase1.map((line, i) => (
            <TypewriterLine key={`p1-${i}`} text={line} delay={i * 350} />
          ))}
        </div>

        {/* Phase 2 */}
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground) / 0.4)" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            <span className="text-[11px] font-medium uppercase tracking-wider text-parleo-muted">Shopping Intelligence</span>
          </div>
          {scenario.reasoning.phase2.map((line, i) => (
            <TypewriterLine key={`p2-${i}`} text={line} delay={(scenario.reasoning.phase1.length + i) * 350} />
          ))}
        </div>

        {/* Phase 3 - Parleo Intercept */}
        <div className="px-4 py-3 bg-primary/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
              <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
            </svg>
            <span className="text-[11px] font-medium uppercase tracking-wider text-primary">Parleo Loyalty Intercept</span>
          </div>
          {scenario.reasoning.phase3.map((line, i) => (
            <TypewriterLine
              key={`p3-${i}`}
              text={line}
              delay={(scenario.reasoning.phase1.length + scenario.reasoning.phase2.length + i) * 350}
              isParleo
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentReasoning;
