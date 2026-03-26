import { motion } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
  onScenarioChange: (s: Scenario) => void;
}

const BrandLogo = ({ domain, size = 20 }: { domain: string; size?: number }) => (
  <span className="inline-flex items-center">
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={domain}
      style={{ height: size, width: "auto" }}
      className="rounded-sm"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
        const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
        if (next) next.style.display = "inline";
      }}
    />
    <span className="hidden text-[11px] font-medium text-muted-foreground">{domain.split(".")[0]}</span>
  </span>
);

const scenarioKeys: Scenario[] = ["beauty", "outdoor", "electronics"];

const DemoHero = ({ scenario, onScenarioChange }: Props) => {
  const data = scenarios[scenario];

  const allMemberships = [
    { domain: "sephora.com", name: "Sephora Rouge", detail: "Active" },
    { domain: "nike.com", name: "Nike Member", detail: "2,400 pts → $24" },
    { domain: "rei.com", name: "REI Co-op", detail: "$18.50 dividend" },
    { domain: "americanexpress.com", name: "Amex Platinum", detail: "$15 back on $75+" },
    { domain: "bestbuy.com", name: "Best Buy Totaltech", detail: "Active member" },
    { domain: "chase.com", name: "Chase Sapphire", detail: "3x on electronics" },
  ];

  return (
    <section className="relative overflow-hidden bg-background pb-0 pt-8 md:pt-14">
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2" />

      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[520px]"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5" style={{ boxShadow: "var(--shadow-sm)" }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
              <span className="text-[11px] font-medium text-parleo-muted">Honey for Agents · Private Beta</span>
            </div>

            <h1 className="font-display text-[40px] text-foreground md:text-[64px]" style={{ lineHeight: 1.05 }}>
              Agents that shop<br />with your advantages.
            </h1>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
              AI agents research products across dozens of merchant sites. They see listed prices. They can't see loyalty programs, card-linked offers, or member pricing. Parleo intercepts the agent's research and injects true cost before rankings are formed.
            </p>
          </motion.div>

          {/* Right: Agent context card */}
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
                <div key={m.domain} className="flex items-center gap-2.5 text-[13px]">
                  <BrandLogo domain={m.domain} size={18} />
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="ml-auto text-parleo-muted">{m.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scenario picker */}
        <div className="mt-10 grid grid-cols-1 gap-4 pb-8 sm:grid-cols-3">
          {scenarioKeys.map((key) => {
            const s = scenarios[key];
            const active = key === scenario;
            return (
              <button
                key={key}
                onClick={() => onScenarioChange(key)}
                className={`group rounded-lg border bg-card p-4 text-left transition-all ${
                  active
                    ? "border-primary/40 shadow-card-hover"
                    : "border-border shadow-card hover:border-primary/20 hover:shadow-card-hover"
                }`}
              >
                <div className="mb-1 h-[3px] w-8 rounded-full" style={{ background: s.color }} />
                <div className="text-[14px] font-semibold text-foreground">{s.label}</div>
                <div className="text-[12px] text-parleo-muted">{s.product}</div>
                <div className="mt-2 flex gap-2">
                  {s.merchantDomains.map((d) => (
                    <img
                      key={d}
                      src={`https://logo.clearbit.com/${d}`}
                      alt={d}
                      className="h-4 opacity-50 grayscale"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="decorative-line" />
    </section>
  );
};

export default DemoHero;
