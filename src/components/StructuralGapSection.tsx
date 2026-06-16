import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section A · The structural gap
   Translates P&G deck slide 18: $500B–$1T trade + $45B retail
   media = $0 visible to the agent making the call.
   ─────────────────────────────────────────────────────────── */

const StatCard = ({
  value,
  label,
  detail,
  delay = 0,
}: {
  value: string;
  label: string;
  detail: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 md:p-8"
  >
    <div className="font-display text-[56px] font-semibold leading-none tracking-tight text-foreground tabular-nums md:text-[80px]">
      {value}
    </div>
    <div className="mt-6 border-t border-border/60 pt-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
        {label}
      </div>
      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-foreground/65">{detail}</p>
    </div>
  </motion.div>
);

const StructuralGapSection = () => (
  <AnimatedSection
    id="structural-gap"
    className="relative bg-background py-16 md:py-24"
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Heading */}
      <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            The structural gap
          </span>
          <h2
            className="mt-4 font-heading text-[32px] text-foreground md:text-[52px]"
            style={{ lineHeight: 1.04 }}
          >
            The two largest conversion investments in commerce are invisible to the system.
          </h2>
        </div>
      </div>

      {/* Grid: two light cards left, one dark card right */}
      <div className="mt-12 grid gap-4 md:grid-cols-[1fr_1fr_1.1fr] md:gap-5">
        <StatCard
          value="$500B–$1T"
          label="Global trade promotion"
          detail="Annual CPG trade spend. Second-largest P&L line after COGS."
          delay={0}
        />
        <StatCard
          value="~$45B"
          label="US retail media"
          detail="US CPG retail media spend. (eMarketer, 2025)"
          delay={0.08}
        />

        {/* Dark punch card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1E1E2E] p-6 text-white md:p-8"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <span className="absolute -top-2.5 left-6 rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            Today
          </span>
          <div className="font-display text-[120px] font-semibold leading-none tracking-tighter text-white tabular-nums md:text-[180px]">
            $0
          </div>
          <div className="mt-6 border-t border-white/15 pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Visible to agents today
            </div>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/70">
              Of either investment, surfaced to the agent making the recommendation.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 flex items-stretch overflow-hidden rounded-xl border border-border/70 bg-card"
      >
        <div className="w-[3px] shrink-0 bg-primary" />
        <div className="flex flex-col gap-1 px-5 py-4 md:flex-row md:items-center md:gap-5 md:py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            The gap
          </span>
          <span className="hidden h-3 w-px bg-border md:inline-block" />
          <p className="text-[13.5px] leading-[1.55] text-foreground/75">
            Trade and retail media drive every category. Neither is legible to the agent making the call.
          </p>
        </div>
      </motion.div>
    </div>
  </AnimatedSection>
);

export default StructuralGapSection;
