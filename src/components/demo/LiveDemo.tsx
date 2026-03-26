import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
  onScenarioChange: (s: Scenario) => void;
}

const LiveDemo = ({ scenario, onScenarioChange }: Props) => {
  const data = scenarios[scenario];
  const [running, setRunning] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [traceComplete, setTraceComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [withParleo, setWithParleo] = useState(true);
  const [copied, setCopied] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const reset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setRunning(false);
    setVisibleLines(0);
    setTraceComplete(false);
    setShowResults(false);
    setShowJson(false);
    setWithParleo(true);
    setCopied(false);
  }, []);

  useEffect(() => { reset(); }, [scenario, reset]);

  const runDemo = () => {
    if (running) return;
    setRunning(true);

    const totalLines = data.reasoning.length;
    const t1 = window.setTimeout(() => {
      for (let i = 0; i < totalLines; i++) {
        const t = window.setTimeout(() => {
          setVisibleLines(i + 1);
          if (i === totalLines - 1) {
            setTraceComplete(true);
            const t3 = window.setTimeout(() => setShowResults(true), 600);
            const t4 = window.setTimeout(() => setShowJson(true), 1200);
            timeoutsRef.current.push(t3, t4);
          }
        }, i * 400);
        timeoutsRef.current.push(t);
      }
    }, 800);
    timeoutsRef.current.push(t1);
  };

  const results = withParleo ? data.resultsWithParleo : data.resultsWithout;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="font-label mb-3 text-primary">Live Demo</div>
        <h2 className="font-heading mb-4 text-[28px] text-foreground md:text-[40px]">
          Watch Parleo intercept an agent's research.
        </h2>
        <p className="mb-8 max-w-[520px] text-[15px] text-foreground/50">
          Pick a category above, then hit Run Agent to see how Parleo enriches the agent's reasoning with loyalty, card, and points data in real time.
        </p>

        {/* Demo container */}
        <div
          className="overflow-hidden rounded-2xl border border-border"
          style={{
            background: "hsl(30 8% 91%)",
            borderTop: "2px solid hsl(213 99% 50%)",
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          {/* Step 1: Query + Context */}
          <div className="border-b border-border/60 p-5 md:p-7">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="flex-1">
                <div className="font-label mb-2 text-parleo-muted">User Message</div>
                <div className="inline-block rounded-2xl rounded-bl-sm bg-primary px-5 py-3 text-[15px] text-primary-foreground">
                  {data.query}
                </div>
              </div>
              <div className="w-full md:w-[280px]">
                <div className="font-label mb-2 text-parleo-muted">Agent Context</div>
                <div className="flex flex-col gap-2">
                  {data.memberships.map((m) => (
                    <div key={m.name} className="flex items-center gap-2 text-[13px]">
                      <span className="inline-flex items-center rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-foreground/60">
                        {m.name.split(" ")[0]}
                      </span>
                      <span className="font-medium text-foreground">{m.name}</span>
                      <span className="ml-auto text-parleo-muted">{m.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={runDemo}
                disabled={running}
                className="group inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97] disabled:opacity-60"
                style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
              >
                {running && !traceComplete ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" /></svg>
                    Running…
                  </>
                ) : traceComplete ? "✓ Complete" : (
                  <>
                    Run Agent
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 2: Reasoning Trace */}
          <AnimatePresence>
            {running && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-b border-border/60"
              >
                <div className="bg-code-bg p-5 md:p-7">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="font-label text-white/60">Agent Reasoning</div>
                    {!traceComplete ? (
                      <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
                        Processing…
                      </span>
                    ) : (
                      <span className="text-[12px] text-[hsl(var(--success))]">✓ Complete</span>
                    )}
                  </div>
                  <div className="font-mono text-[13px] leading-relaxed">
                    {data.reasoning.slice(0, visibleLines).map((line, i) => {
                      const isCheckmark = line.text.startsWith("✓");
                      return (
                        <motion.div
                          key={`${scenario}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`py-0.5 ${
                            line.phase === 1
                              ? "text-white/40"
                              : line.phase === 2
                              ? "text-white/70"
                              : isCheckmark
                              ? "rounded-sm border-l-[4px] border-[hsl(var(--success))] bg-[hsl(var(--success))]/10 pl-3 font-semibold text-[hsl(var(--success))]"
                              : "rounded-sm border-l-[4px] border-primary bg-primary/10 pl-3 text-primary-foreground"
                          }`}
                        >
                          {line.text}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-b border-border/60"
              >
                <div className="p-5 md:p-7" style={{ background: "hsl(30 8% 93%)" }}>
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-label text-parleo-muted">Shortlist</div>
                      <span className="text-[13px] text-foreground/40">
                        4 products · {data.resultsWithParleo.filter(r => r.deals?.length).reduce((a, r) => a + (r.deals?.length || 0), 0)} deal stacks · computed just now
                      </span>
                    </div>
                    <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
                      {["Without Parleo", "With Parleo"].map((label) => {
                        const active = label === "With Parleo" ? withParleo : !withParleo;
                        return (
                          <button
                            key={label}
                            onClick={() => setWithParleo(label === "With Parleo")}
                            className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-all ${
                              active ? "bg-card text-foreground shadow-sm" : "text-parleo-muted"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {results.map((r) => (
                      <motion.div
                        key={r.name}
                        layout
                        transition={{ duration: 0.4 }}
                        className={`flex flex-col gap-2 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:gap-4 ${
                          r.bestDeal ? "border-l-4 border-l-primary border-t-border border-r-border border-b-border" : "border-border"
                        }`}
                        style={{ boxShadow: "var(--shadow-sm)" }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-[16px] font-bold text-foreground">
                          {r.rank}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] font-semibold text-foreground">{r.name}</span>
                            {r.bestDeal && <span className="rounded-full border border-primary/20 bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-semibold text-primary">BEST DEAL</span>}
                            {r.rankChange && <span className="rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700">{r.rankChange}</span>}
                          </div>
                          <div className="text-[12px] text-parleo-muted">{r.specs}</div>
                          {r.deals && (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {r.deals.map((d) => (
                                <span key={d} className="rounded-full border border-[hsl(213,99%,50%,0.2)] bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-medium text-[#0166FF]">{d}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          {r.truePrice ? (
                            <>
                              <div className="text-[13px] text-parleo-muted line-through">${r.listPrice.toFixed(2)}</div>
                              <div className="text-[18px] font-bold text-[hsl(var(--success))]">${r.truePrice.toFixed(2)}</div>
                              {r.savings && <div className="text-[12px] font-medium text-[hsl(var(--success))]">−{r.savings}%</div>}
                            </>
                          ) : (
                            <div className="text-[18px] font-bold text-foreground">${r.listPrice.toFixed(2)}</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: API JSON */}
          <AnimatePresence>
            {showJson && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative bg-code-bg p-5 md:p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-label text-white/60">API Response</div>
                    <button
                      onClick={() => { navigator.clipboard.writeText(data.apiJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className="rounded-md border border-white/10 px-3 py-1 text-[12px] text-white/50 transition-colors hover:bg-white/5"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-white/70">
                    {data.apiJson}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
