import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, ScenarioKey } from "@/data/demoData";
import DemoHero from "@/components/demo/DemoHero";
import DemoQuery from "@/components/demo/DemoQuery";
import AgentReasoning from "@/components/demo/AgentReasoning";
import DemoResults from "@/components/demo/DemoResults";
import ApiResponse from "@/components/demo/ApiResponse";
import InteractiveSandbox from "@/components/demo/InteractiveSandbox";
import DeveloperSection from "@/components/demo/DeveloperSection";
import DemoCTA from "@/components/demo/DemoCTA";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Demo = () => {
  const [selected, setSelected] = useState<ScenarioKey>("beauty");
  const [agentHasRun, setAgentHasRun] = useState(false);
  const [reasoningComplete, setReasoningComplete] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);

  const scenario = scenarios[selected];

  useEffect(() => {
    document.title = "Parleo — Honey for Agents Demo";
  }, []);

  const handleScenarioChange = (key: ScenarioKey) => {
    if (key === selected) return;
    setShowShimmer(true);
    setAgentHasRun(false);
    setReasoningComplete(false);
    setTimeout(() => {
      setSelected(key);
      setShowShimmer(false);
    }, 500);
  };

  const handleRunAgent = () => {
    setAgentHasRun(true);
  };

  const handleReasoningComplete = useCallback(() => {
    setReasoningComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background grain-overlay overflow-x-hidden">
      <DemoHero selected={selected} onSelect={handleScenarioChange} />

      {/* Guided Demo Container */}
      <section className="py-12 md:py-20" style={{ background: "hsl(30 8% 92%)" }}>
        <div className="mx-auto max-w-content px-6 md:px-20">
          <AnimatePresence mode="wait">
            {showShimmer ? (
              <motion.div
                key="shimmer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl bg-foreground/5 animate-shimmer" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6 md:p-10 space-y-12"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                {/* Step 1: Query */}
                <DemoQuery scenario={scenario} onRunAgent={handleRunAgent} hasRun={agentHasRun} />

                {/* Step 2: Reasoning */}
                {agentHasRun && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <AgentReasoning scenario={scenario} onComplete={handleReasoningComplete} />
                  </motion.div>
                )}

                {/* Step 3: Results */}
                {reasoningComplete && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <DemoResults scenario={scenario} />
                  </motion.div>
                )}

                {/* Step 4: API Response */}
                {reasoningComplete && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                    <ApiResponse scenario={scenario} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Sandbox */}
      <InteractiveSandbox scenario={scenario} />

      {/* Developer */}
      <DeveloperSection scenario={scenario} />

      {/* CTA */}
      <DemoCTA />

      {/* Footer */}
      <Footer />

      {/* Progress indicator */}
      <ProgressDots agentRun={agentHasRun} reasoningDone={reasoningComplete} />
    </div>
  );
};

const ProgressDots = ({ agentRun, reasoningDone }: { agentRun: boolean; reasoningDone: boolean }) => {
  const steps = [
    { label: "Query", active: true },
    { label: "Reasoning", active: agentRun },
    { label: "Results", active: reasoningDone },
    { label: "API", active: reasoningDone },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all ${
            s.active ? "bg-primary scale-125" : "bg-border"
          }`}
          title={s.label}
        />
      ))}
    </div>
  );
};

export default Demo;
