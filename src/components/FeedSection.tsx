import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ── Tiny illustrative visuals for each state ── */

const FeedVisual = () => (
  <div className="mt-4 space-y-1.5">
    {["sephora_loyalty_tiers", "amex_plat_benefits", "target_circle_offers"].map((id, i) => (
      <motion.div
        key={id}
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + i * 0.08 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 rounded-md bg-secondary/60 px-3 py-2"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
          <rect x="1" y="1" width="8" height="8" rx="2" stroke="hsl(var(--parleo-muted))" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
        <span className="font-mono text-[10px] text-parleo-muted">{id}</span>
        <span className="ml-auto rounded bg-secondary px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-parleo-muted/60">
          {["offers", "cards", "loyalty"][i]}
        </span>
      </motion.div>
    ))}
  </div>
);

const HabitVisual = () => (
  <div className="mt-4 rounded-lg border border-primary/10 bg-primary/[0.02] p-3">
    <div className="flex items-end gap-[3px]">
      {[18, 24, 20, 32, 28, 38, 42, 36, 44, 48, 40, 52].map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex-1 origin-bottom rounded-sm bg-primary"
          style={{ height: h * 0.6, opacity: 0.12 + (i / 12) * 0.25 }}
        />
      ))}
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[9px] font-medium text-parleo-muted/60">4 weeks ago</span>
      <div className="flex items-center gap-1">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[9px] font-semibold text-primary">+240% queries</span>
      </div>
    </div>
  </div>
);

const DirectVisual = () => (
  <div className="mt-4 space-y-2">
    {[
      { rule: "Margin floor", value: "25%", status: "enforced" },
      { rule: "VIP unlock", value: "Active", status: "live" },
      { rule: "Attribution", value: "On", status: "tracking" },
    ].map((r, i) => (
      <motion.div
        key={r.rule}
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + i * 0.08 }}
        viewport={{ once: true }}
        className="flex items-center justify-between rounded-md border border-primary/10 bg-primary/[0.02] px-3 py-2"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
            <svg width="8" height="8" viewBox="0 0 10 10">
              <path d="M2 5l2.5 2.5L8 3" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[12px] font-medium text-foreground">{r.rule}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-primary">{r.value}</span>
          <span className="rounded bg-primary/[0.08] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-primary/70">
            {r.status}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
);

const stages = [
  {
    label: "STRUCTURED FEED",
    color: "text-parleo-muted",
    borderColor: "border-border",
    headline: "Your value, structured.",
    description: "Public offers, loyalty tiers, and card benefit directories. Taxonomized and optimized for agent consumption.",
    visual: <FeedVisual />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--parleo-muted))" strokeWidth="1.5">
        <path d="M4 11a9 9 0 019-9M4 4a16 16 0 0116 16M6 21a1 1 0 100-2 1 1 0 000 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "AGENT ADOPTION",
    color: "text-foreground",
    borderColor: "border-primary/20",
    headline: "One place to check.",
    description: "Agents form query habits. A single Parleo call returns comparative value across merchants. Repeat queries compound daily.",
    visual: <HabitVisual />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "DIRECT CONNECTION",
    color: "text-primary",
    borderColor: "border-primary/30",
    headline: "Full control when you're ready.",
    description: "Connect your own loyalty logic, set margin rules, get attribution. Agents already know the address.",
    visual: <DirectVisual />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const FeedSection = () => (
  <AnimatedSection id="feed" className="section-grid relative bg-background py-10 md:py-14">
    <div className="diffusion-glow pointer-events-none absolute left-[15%] top-[40%]" />
    <div className="decorative-line" />

    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
            <path d="M4 11a9 9 0 019-9M4 4a16 16 0 0116 16M6 21a1 1 0 100-2 1 1 0 000 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">HONEY FOR AGENTS</span>
      </div>

      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        The directory agents check first.
      </h2>

      <p className="mt-3 max-w-[580px] text-[17px] leading-[1.7] text-foreground/55">
        Loyalty programs, card offers, and incentive logic from 38+ merchants. Structured into a single agent-optimized feed. Refreshed hourly.
      </p>

      {/* Pipeline */}
      <div className="relative mt-8">
        <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px md:block" style={{
          background: "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.12) 20%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.12) 80%, transparent 95%)"
        }} />

        <div className="grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`group relative rounded-xl border ${s.borderColor} bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover`}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="pointer-events-none absolute -top-[5px] left-1/2 hidden h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-card md:block" style={{
                background: i === 2 ? "hsl(var(--primary))" : i === 1 ? "hsl(var(--primary) / 0.4)" : "hsl(var(--parleo-muted) / 0.3)",
              }} />

              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.06] transition-colors duration-300 group-hover:bg-primary/[0.1]">
                  {s.icon}
                </div>
                <span className="text-[32px] font-extrabold text-primary/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <span className={`mt-3 block font-label ${s.color}`}>{s.label}</span>
              <h3 className="mt-1.5 text-[16px] font-semibold text-foreground">{s.headline}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-foreground/55">{s.description}</p>

              {s.visual}

              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics strip */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-parleo-muted">
        <span>60% fewer tokens than direct crawling</span>
        <span className="hidden sm:inline">·</span>
        <span>Hourly refresh</span>
        <span className="hidden sm:inline">·</span>
        <span>Sub-50ms response</span>
      </div>
    </div>
  </AnimatedSection>
);

export default FeedSection;
