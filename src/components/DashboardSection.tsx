import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ───────────────────────────────────────────────
   Section D · Command Center
   Polished product UI with annotation callouts
   ─────────────────────────────────────────────── */

const NAV = [
  { glyph: "▢", label: "Overview" },
  { glyph: "◫", label: "Constraints", active: true },
  { glyph: "◉", label: "Incentives" },
  { glyph: "↗", label: "Analytics" },
  { glyph: "⌥", label: "Integrations" },
  { glyph: "⚙", label: "Settings" },
];

const CONSTRAINTS = [
  { name: "Margin Floor", desc: "Minimum 25% margin per query", active: true },
  { name: "Q1 Liability Target", desc: "$40M burn · $1.2M redeemed MTD", active: true },
  { name: "Winter Inventory Priority", desc: "Stock >90 days elevated", active: true },
  { name: "Amex Platinum Offer", desc: "+$20 off verified cardholders", active: false },
];

const INCENTIVES = [
  { label: "Loyalty Points", brand: "Sephora", live: true },
  { label: "Amex Offers", brand: "Amex", live: true },
  { label: "VIP Tiers", brand: "Visa", live: true },
  { label: "Card-linked", brand: "Chase", live: false },
];

/* ── Subtle area chart ── */
const AreaChart = () => (
  <svg viewBox="0 0 280 80" className="h-16 w-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(213,99%,50%)" stopOpacity="0.22" />
        <stop offset="100%" stopColor="hsl(213,99%,50%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,62 L24,58 L48,52 L72,55 L96,46 L120,48 L144,38 L168,42 L192,30 L216,24 L240,18 L264,12 L280,8 L280,80 L0,80 Z"
      fill="url(#dashArea)"
    />
    <path
      d="M0,62 L24,58 L48,52 L72,55 L96,46 L120,48 L144,38 L168,42 L192,30 L216,24 L240,18 L264,12 L280,8"
      fill="none"
      stroke="hsl(213,99%,50%)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="280" cy="8" r="3" fill="hsl(213,99%,50%)" />
    <circle cx="280" cy="8" r="6" fill="hsl(213,99%,50%)" fillOpacity="0.18" />
  </svg>
);

const Toggle = ({ on }: { on: boolean }) => (
  <div className={`relative h-[18px] w-8 rounded-full transition-colors ${on ? "bg-primary" : "bg-foreground/15"}`}>
    <div className={`absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all ${on ? "right-0.5" : "left-0.5"}`} />
  </div>
);

/* ── Annotation callout used to point at dashboard features ── */
const Callout = ({
  side,
  title,
  body,
  className = "",
}: {
  side: "left" | "right";
  title: string;
  body: string;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={`pointer-events-none absolute z-10 hidden w-[200px] lg:block ${className}`}
  >
    <div className="rounded-lg border border-primary/25 bg-background/95 px-3 py-2.5 shadow-[0_8px_28px_-12px_hsl(213_99%_50%/0.35)] backdrop-blur">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">{title}</span>
      </div>
      <p className="mt-1 text-[12px] leading-snug text-foreground/75">{body}</p>
    </div>
  </motion.div>
);

const DashboardSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection id="dashboard" className="relative overflow-hidden bg-background py-24 md:py-32" ref={ref}>
      {/* hairline light-burn behind the artifact */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 60%, hsl(213 99% 50% / 0.05) 0%, transparent 70%)",
        }}
      />
      {/* tiny floating geometric mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[14%] hidden h-2 w-2 rounded-full border border-foreground/15 animate-float md:block"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-20">
        {/* Headline */}
        <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <h2 className="section-heading text-foreground">
            Your agent channel,{" "}
            <span className="text-foreground/40">in one console.</span>
          </h2>
          <p className="section-copy max-w-[460px] self-end">
            Score how agents rank you, see the margin they cannot, and set the
            rules your offers play by.
          </p>
        </div>


        {/* Dashboard mockup with annotation callouts */}
        <div className="relative mt-16 md:mt-20">
          {/* Callouts */}
          <Callout
            side="left"
            title="Score"
            body="Live measure of how agents rank you against the category."
            className="left-[-40px] top-[140px] xl:left-[-180px]"
          />
          <Callout
            side="left"
            title="Recoverable value"
            body="Quarterly margin agents leave on the table without true-cost signals."
            className="left-[-40px] top-[290px] xl:left-[-180px]"
          />
          <Callout
            side="right"
            title="Programmable rules"
            body="Floor margins, cap liability, prioritise inventory — agents respect them in real time."
            className="right-[-40px] top-[260px] xl:right-[-180px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto overflow-hidden rounded-2xl border border-border/70 bg-card"
            style={{
              maxWidth: 1080,
              boxShadow:
                "0 30px 80px -30px hsl(243 30% 15% / 0.18), 0 8px 24px -12px hsl(243 30% 15% / 0.08)",
            }}
          >
            {/* Window chrome */}
            <div className="flex h-11 items-center justify-between gap-3 border-b border-border/70 px-4" style={{ background: "#FAFAF9" }}>
              <div className="flex shrink-0 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
              </div>
              <div className="flex h-6 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-3 text-[11px] text-foreground/55 sm:min-w-[240px] sm:flex-initial" style={{ background: "#F0EFED" }}>
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span className="truncate">app.parleo.io / sephora / constraints</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/55">
                  Sample · Sephora
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row md:min-h-[520px]">
              {/* Sidebar */}
              <aside className="hidden w-[200px] flex-col border-r border-border/70 md:flex" style={{ background: "#FBFAF9" }}>
                <div className="flex items-center gap-2 px-5 pb-3 pt-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/[0.04]">
                    <BrandLogo name="Sephora" size={16} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[12.5px] font-semibold text-foreground">Sephora</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45">Enterprise</div>
                  </div>
                </div>
                <div className="mt-2 border-t border-border/70" />
                <nav className="flex-1 py-2">
                  {NAV.map((n) => (
                    <button
                      key={n.label}
                      className={`flex w-full items-center gap-2.5 px-5 py-2 text-left text-[12.5px] font-medium transition-colors ${
                        n.active
                          ? "border-l-2 border-primary bg-primary/[0.04] text-foreground"
                          : "border-l-2 border-transparent text-foreground/55 hover:text-foreground"
                      }`}
                    >
                      <span className={`text-[11px] ${n.active ? "text-primary" : "text-foreground/40"}`}>
                        {n.glyph}
                      </span>
                      {n.label}
                    </button>
                  ))}
                </nav>
                <div className="border-t border-border/70 px-5 py-3">
                  <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
                    <span>Status</span>
                    <span className="text-primary">● Synced</span>
                  </div>
                </div>
              </aside>

              {/* Main */}
              <div className="flex-1 p-6 md:p-7">
                {/* In-dashboard header strip with hero metrics */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="relative overflow-hidden rounded-xl border border-border/70 p-4" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%)" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/50">
                        Agent Commerce Score
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold tabular-nums"
                        style={{ background: "hsl(152 60% 40% / 0.12)", color: "hsl(152 60% 28%)" }}
                      >
                        +6 wk
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-heading text-[44px] font-semibold leading-none tabular-nums text-foreground" style={{ letterSpacing: "-0.02em" }}>
                        54
                      </span>
                      <span className="text-[12px] tabular-nums text-foreground/45">/ 100</span>
                    </div>
                    {/* Track */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "54%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/40">
                      <span>Category avg · 38</span>
                      <span>Leader · 71</span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-border/70 p-4" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%)" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/50">
                        Deal Leakage
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9.5px] font-semibold text-primary">
                        Recoverable
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-heading text-[44px] font-semibold leading-none tabular-nums text-foreground" style={{ letterSpacing: "-0.02em" }}>
                        $4.8M
                      </span>
                      <span className="text-[12px] tabular-nums text-foreground/45">/ qtr</span>
                    </div>
                    <div className="mt-2">
                      <AreaChart />
                    </div>
                  </div>
                </div>

                {/* Constraints panel */}
                <div className="mt-6 rounded-xl border border-border/70" style={{ background: "#FFFFFF" }}>
                  <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-semibold text-foreground">Active constraints</h3>
                      <span className="rounded-full bg-foreground/[0.05] px-1.5 py-0.5 font-mono text-[9px] tabular-nums text-foreground/55">
                        04
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
                      Last sync · 2m
                    </span>
                  </div>
                  <ul className="divide-y divide-border/60">
                    {CONSTRAINTS.map((c, i) => (
                      <motion.li
                        key={c.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${c.active ? "bg-primary" : "bg-foreground/20"}`} />
                          <div>
                            <p className="text-[13px] font-medium text-foreground">{c.name}</p>
                            <p className="mt-0.5 text-[11.5px] text-foreground/55">{c.desc}</p>
                          </div>
                        </div>
                        <Toggle on={c.active} />
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right rail */}
              <aside className="hidden w-[240px] border-l border-border/70 p-5 lg:block" style={{ background: "#FBFAF9" }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/50">
                    Incentives
                  </span>
                  <span className="font-mono text-[9.5px] tabular-nums text-foreground/40">Live · 03</span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {INCENTIVES.map((inc) => (
                    <li key={inc.label} className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-2.5 py-2">
                      <div className="flex items-center gap-2">
                        <BrandLogo name={inc.brand} size={14} />
                        <span className="text-[12px] text-foreground">{inc.label}</span>
                      </div>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider ${
                          inc.live ? "bg-primary/[0.08] text-primary" : "bg-foreground/[0.05] text-foreground/45"
                        }`}
                      >
                        {inc.live ? "Live" : "Draft"}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg border border-border/60 bg-card p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/50">
                      Queries · 7d
                    </span>
                    <span className="font-mono text-[10px] tabular-nums text-foreground">147,892</span>
                  </div>
                  <div className="mt-2">
                    <AreaChart />
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45">
                    <span>Mon</span>
                    <span className="text-primary">+4.2%</span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/[0.04] p-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                    Margin protected
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-heading text-[22px] font-semibold tabular-nums text-foreground">
                      $847K
                    </span>
                    <span className="text-[10px] text-foreground/55">this qtr</span>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DashboardSection;
