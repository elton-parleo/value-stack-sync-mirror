import { motion } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
}

const BrandPill = ({ name }: { name: string }) => (
  <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-foreground/70">
    {name}
  </span>
);

const DemoHero = ({ scenario }: Props) => {
  const data = scenarios[scenario];

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
              AI agents see listed prices. They can't see your loyalty programs, card-linked offers, or member pricing. Parleo intercepts and injects true cost before rankings form.
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
              {data.memberships.map((m) => (
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
          className="mt-8 grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 md:max-w-[640px]"
        >
          {/* Without Parleo */}
          <div className="rounded-lg border border-border bg-card p-4 opacity-60">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-parleo-muted">Without Parleo</div>
            <div className="text-[14px] font-semibold text-foreground">{data.product}</div>
            <div className="mt-2 text-[22px] font-bold text-foreground">${data.resultsWithout[0].listPrice.toFixed(2)}</div>
            <div className="mt-1 text-[12px] text-parleo-muted">List price only</div>
          </div>
          {/* With Parleo */}
          <div className="rounded-lg border border-primary/30 bg-card p-4" style={{ boxShadow: "var(--shadow-card-hover)" }}>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-primary">With Parleo</div>
            <div className="text-[14px] font-semibold text-foreground">{data.product}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-[hsl(var(--success))]">
                ${data.resultsWithParleo[0].truePrice?.toFixed(2) ?? data.resultsWithParleo[0].listPrice.toFixed(2)}
              </span>
              <span className="text-[14px] text-parleo-muted line-through">${data.resultsWithParleo[0].listPrice.toFixed(2)}</span>
              {data.resultsWithParleo[0].savings && (
                <span className="text-[12px] font-semibold text-[hsl(var(--success))]">−{data.resultsWithParleo[0].savings}%</span>
              )}
            </div>
            {data.resultsWithParleo[0].deals && (
              <div className="mt-2 flex flex-wrap gap-1">
                {data.resultsWithParleo[0].deals.map((d) => (
                  <span key={d} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">{d}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="decorative-line" />
    </section>
  );
};

export default DemoHero;
