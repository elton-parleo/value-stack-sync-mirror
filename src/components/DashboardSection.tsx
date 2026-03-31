import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import PulsingDot from "./PulsingDot";
import BrandLogo from "./BrandLogo";

const navItems = [
  { icon: "☰", label: "Overview", active: false },
  { icon: "⊞", label: "Constraints", active: true },
  { icon: "◎", label: "Incentives", active: false },
  { icon: "↗", label: "Analytics", active: false },
  { icon: "⚙", label: "Settings", active: false },
];

const constraints = [
  { name: "Margin Floor", desc: "Minimum 25% margin per query", active: true },
  { name: "Q1 Liability Target", desc: "$40M burn · $1.2M redeemed MTD", active: true },
  { name: "Winter Inventory Priority", desc: "Stock >90 days elevated", active: true },
  { name: "Amex Platinum Offer", desc: "+$20 off verified cardholders", active: false },
];

const metricTiles = [
  { value: "147,892", label: "Agent Queries", delta: "+4.2%" },
  { value: "2,847", label: "Conversions", delta: "+12.4%" },
  { value: "$1.2M", label: "Liability Burned", delta: "On track" },
  { value: "$847K", label: "Margin Protected", delta: "↑ 18%" },
];

const Sparkline = () => (
  <svg viewBox="0 0 200 48" className="h-12 w-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="dashSparkGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(213,99%,50%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(213,99%,50%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,40 L28,32 L57,36 L85,22 L114,26 L142,14 L171,8 L200,4 L200,48 L0,48 Z" fill="url(#dashSparkGrad)" />
    <path d="M0,40 L28,32 L57,36 L85,22 L114,26 L142,14 L171,8 L200,4" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" />
    <circle cx="200" cy="4" r="2.5" fill="hsl(213,99%,50%)" />
  </svg>
);

const ToggleSwitch = ({ active = true }: { active?: boolean }) => (
  <div className={`relative h-5 w-9 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-secondary'}`}>
    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground shadow-sm transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
  </div>
);

const DashboardSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection id="dashboard" className="section-grid relative bg-background py-10 md:py-14" ref={ref}>
      <div className="diffusion-glow pointer-events-none absolute right-[5%] top-[20%]" />
      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <span className="font-label text-parleo-muted">COMMAND CENTER</span>
        </div>
        <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
          One console for your<br />agentic channel.
        </h2>
        <p className="mt-3 max-w-[520px] text-[17px] text-foreground/55" style={{ lineHeight: 1.7 }}>
          Margin floors. Liability targets. Inventory rules. Card offers. Loyalty incentives. All programmable per agent query. Live in two weeks.
        </p>

        {/* Dashboard mockup */}
        <div className="mt-8">
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="mx-auto overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-500 hover:shadow-elevated" style={{ maxWidth: 960, boxShadow: 'var(--shadow-elevated)' }}>
            {/* Chrome bar */}
            <div className="flex h-10 items-center justify-between border-b border-border px-4" style={{ background: "#FAFAF9" }}>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E8E6E3' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E8E6E3' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E8E6E3' }} />
              </div>
              <div className="flex h-5 w-[200px] items-center justify-center rounded text-[10px] text-parleo-muted" style={{ background: "#F0EFED" }}>
                app.parleo.io/dashboard
              </div>
              <div className="flex items-center gap-1.5">
                <PulsingDot />
                <span className="text-[10px] font-medium text-foreground">Sephora · Live</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="flex flex-col md:flex-row" style={{ minHeight: 400 }}>
              {/* Sidebar */}
              <div className="hidden w-[180px] flex-col border-r border-border md:flex" style={{ background: "#FAFAF9" }}>
                <div className="px-4 pb-3 pt-4 text-[12px] font-semibold text-foreground">Sephora</div>
                <div className="border-t border-border" />
                <div className="flex-1 py-1.5">
                  {navItems.map((n) => (
                    <div
                      key={n.label}
                      className={`flex items-center gap-2 px-4 py-2 text-[12px] font-medium ${
                        n.active ? "border-l-2 border-primary bg-secondary/60 text-foreground" : "text-parleo-muted"
                      }`}
                    >
                      <span className="text-[10px] text-parleo-muted">{n.icon}</span>
                      {n.label}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-3 text-[10px] text-parleo-muted">
                  38 merchants
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground">Active Constraints</h3>
                  <span className="text-[10px] text-parleo-muted">Last synced: 2m ago</span>
                </div>
                <div className="mt-3 space-y-0">
                  {constraints.map((c) => (
                    <div key={c.name} className="flex items-center justify-between border-b border-border/60 py-2.5">
                      <div>
                        <p className="text-[13px] font-medium text-foreground">{c.name}</p>
                        <p className="text-[11px] text-parleo-muted">{c.desc}</p>
                      </div>
                      <ToggleSwitch active={c.active} />
                    </div>
                  ))}
                </div>
                <h4 className="mt-4 text-[13px] font-semibold text-foreground">Metrics</h4>
                <div className="mt-2 grid grid-cols-2 gap-2 pb-3">
                  {metricTiles.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border p-3 transition-all duration-200 hover:border-primary/20 hover:shadow-sm" style={{ background: "#FAFAF9" }}>
                      <p className="text-xl font-bold text-foreground">{m.value}</p>
                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-parleo-muted">{m.label}</p>
                      <p className="mt-1 text-[10px] font-medium text-primary">{m.delta}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="hidden w-[200px] border-l border-border p-4 md:block" style={{ background: "#FAFAF9" }}>
                <h4 className="text-[12px] font-semibold text-foreground">Active Incentives</h4>
                <div className="mt-3 space-y-2.5">
                  {["Loyalty Points", "Amex Offers", "VIP Tiers"].map((inc) => (
                    <div key={inc} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-[12px] text-foreground">{inc}</span>
                      </div>
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase text-primary" style={{ background: "hsl(213 99% 50% / 0.06)" }}>
                        Live
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <Sparkline />
                  <p className="mt-1 text-[10px] text-parleo-muted">Queries · 7 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DashboardSection;
