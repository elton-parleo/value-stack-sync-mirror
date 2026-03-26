import { motion } from "framer-motion";
import { scenarios, ScenarioKey } from "@/data/demoData";
import { getScenarioIcon } from "./ScenarioIcons";

interface DemoHeroProps {
  selected: ScenarioKey;
  onSelect: (key: ScenarioKey) => void;
}

const DemoHero = ({ selected, onSelect }: DemoHeroProps) => (
  <section className="relative bg-[hsl(30_8%_92%)] py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2" />
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Wordmark */}
      <a href="/" className="mb-10 inline-flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
        </svg>
        PARLEO
      </a>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="font-label text-primary">HONEY FOR AGENTS · LIVE DEMO</span>
        <h1 className="mt-3 font-display text-[36px] text-foreground md:text-[56px]" style={{ lineHeight: 1.05 }}>
          See what agents miss
          <br />and what Parleo finds.
        </h1>
        <p className="mt-4 max-w-[600px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
          AI agents compare prices. They can't see loyalty programs, card offers, or member pricing. Pick a scenario below and watch Parleo recalculate true cost in real time.
        </p>
      </motion.div>

      {/* Scenario cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(scenarios) as ScenarioKey[]).map((key, i) => {
          const s = scenarios[key];
          const isSelected = selected === key;
          return (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              onClick={() => onSelect(key)}
              className={`group rounded-xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-primary/40 bg-primary/[0.04] shadow-card-hover"
                  : "border-border bg-card hover:border-primary/20 hover:shadow-card-hover"
              }`}
            >
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-lg ${isSelected ? "bg-primary/10" : "bg-secondary"}`}>
                {getScenarioIcon(s.icon)}
              </div>
              <div className="text-[15px] font-semibold text-foreground">{s.label}</div>
              <div className="mt-0.5 text-[13px] text-foreground/50">{s.subLabel}</div>
              <div className="mt-2 text-[11px] text-parleo-muted">{s.merchants}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  </section>
);

export default DemoHero;
