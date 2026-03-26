import { motion } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
  onRequestAccess: () => void;
}

const allMemberships = [
  { name: "Sephora Rouge", detail: "Active" },
  { name: "Nike Member", detail: "2,400 pts → $24" },
  { name: "REI Co-op", detail: "$18.50 dividend" },
  { name: "Amex Platinum", detail: "$15 back on $75+" },
  { name: "Best Buy Totaltech", detail: "Active member" },
  { name: "Chase Sapphire", detail: "3x on electronics" },
];

const BrandPill = ({ name }: { name: string }) => (
  <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-foreground/70">
    {name}
  </span>
);

// Static before/after data using Outdoor scenario (most dramatic rank change)
const beforeAfter = {
  product: "Nike Wildhorse 8",
  merchant: "Nike.com",
  listPrice: 130,
  truePrice: 76,
  savings: 54,
  savingsPct: 41,
  deals: [
    { label: "Member code (WILDHORSE20)", value: 26 },
    { label: "Points (2,400 pts)", value: 24 },
    { label: "Amex Platinum card offer", value: 15 },
  ],
};

const DemoHero = ({ scenario, onRequestAccess }: Props) => {
  return (
    <section className="relative overflow-hidden bg-background pb-0 pt-6 md:pt-10">
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2" />

      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[560px]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5" style={{ boxShadow: "var(--shadow-sm)" }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
              <span className="text-[11px] font-medium text-parleo-muted">Honey for Agents · Private Beta</span>
            </div>

            <h1 className="font-display text-[48px] text-foreground md:text-[72px]" style={{ lineHeight: 1.02 }}>
              Agents that shop<br />with your advantages.
            </h1>
            <p className="mt-4 max-w-[480px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
              AI agents research products across dozens of merchant sites. They see listed prices. They can't see loyalty programs, card-linked offers, or member pricing. Parleo intercepts and injects true cost before rankings form.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#live-demo"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
                style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
              >
                Try the Demo ↓
              </a>
              <button
                onClick={onRequestAccess}
                className="inline-flex h-11 items-center rounded-[4px] border border-border bg-card px-6 text-[15px] font-medium text-foreground transition-all hover:bg-secondary active:scale-[0.97]"
              >
                Request Access
              </button>
            </div>
          </motion.div>

          {/* Right: Agent Context card — full profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-[380px] rounded-lg border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="font-label mb-4 text-parleo-muted">Loaded Agent Context</div>
            <div className="mb-3 text-[15px] font-semibold text-foreground">Sarah Chen</div>
            <div className="h-px bg-border" />
            <div className="mt-3 flex flex-col gap-2.5">
              {allMemberships.map((m) => (
                <div key={m.name} className="flex items-center gap-2.5 text-[13px]">
                  <BrandPill name={m.name.split(" ")[0]} />
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="ml-auto text-parleo-muted">{m.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Before / After comparison cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 md:max-w-[680px]"
        >
          {/* Without Parleo */}
          <div className="rounded-lg border border-border bg-card p-5 opacity-60">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-parleo-muted">What agents see today</div>
            <div className="text-[14px] font-semibold text-foreground">{beforeAfter.product}</div>
            <div className="mt-1 text-[12px] text-parleo-muted">Merchant: {beforeAfter.merchant}</div>
            <div className="mt-3 text-[26px] font-bold text-foreground">${beforeAfter.listPrice.toFixed(2)}</div>
            <div className="mt-2 text-[12px] text-parleo-muted leading-relaxed">
              No loyalty data. No card offers.<br />Price only.
            </div>
          </div>

          {/* With Parleo */}
          <div className="rounded-lg border border-primary/30 bg-card p-5" style={{ boxShadow: "var(--shadow-card-hover)" }}>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-primary">What Parleo surfaces</div>
            <div className="text-[14px] font-semibold text-foreground">{beforeAfter.product}</div>
            <div className="mt-1 text-[12px] text-parleo-muted">Merchant: {beforeAfter.merchant}</div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[26px] font-bold text-[hsl(var(--success))]">${beforeAfter.truePrice.toFixed(2)}</span>
              <span className="text-[14px] text-parleo-muted line-through">${beforeAfter.listPrice.toFixed(2)}</span>
            </div>

            <div className="mt-3 h-px bg-border" />
            <div className="mt-3 flex flex-col gap-1.5">
              {beforeAfter.deals.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-[12px]">
                  <span className="text-foreground/70">{d.label}</span>
                  <span className="font-medium text-[hsl(var(--success))]">−${d.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-px bg-border" />

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-[hsl(var(--success))]/10 px-2.5 py-0.5 text-[11px] font-bold text-[hsl(var(--success))]">BEST DEAL</span>
              <span className="text-[13px] font-semibold text-[hsl(var(--success))]">
                You save ${beforeAfter.savings.toFixed(2)} ({beforeAfter.savingsPct}%)
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="decorative-line" />
    </section>
  );
};

export default DemoHero;
