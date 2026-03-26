import { motion } from "framer-motion";
import { Scenario } from "@/data/demoData";

interface DemoQueryProps {
  scenario: Scenario;
  onRunAgent: () => void;
  hasRun: boolean;
}

const DemoQuery = ({ scenario, onRunAgent, hasRun }: DemoQueryProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2">
      <span className="font-label text-parleo-muted">STEP 1</span>
      <span className="text-[13px] text-foreground/40">— The Query</span>
    </div>

    <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
      {/* Chat bubble */}
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="text-[11px] font-medium uppercase tracking-wider text-parleo-muted mb-3">User Message</div>
        <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-[14px] leading-[1.6] text-primary-foreground">
          {scenario.query}
        </div>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="text-[11px] font-medium uppercase tracking-wider text-parleo-muted mb-3">Loaded Agent Context</div>
        <div className="text-[14px] font-semibold text-foreground mb-2">{scenario.profileName}</div>
        <div className="h-px bg-border mb-3" />
        <div className="space-y-2">
          {scenario.profile.map((p, i) => (
            <div key={i} className="flex items-center justify-between text-[13px]">
              <span className="text-foreground/70">{p.label}</span>
              <span className="text-foreground/50">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {!hasRun && (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onRunAgent}
        className="group inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
        style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
      >
        Run Agent
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    )}
  </div>
);

export default DemoQuery;
