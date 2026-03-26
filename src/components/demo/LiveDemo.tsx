import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
  onScenarioChange: (s: Scenario) => void;
}

const scenarioMeta: { key: Scenario; label: string; icon: React.ReactNode }[] = [
  {
    key: "beauty",
    label: "Beauty",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "outdoor",
    label: "Outdoor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    key: "electronics",
    label: "Electronics",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" />
      </svg>
    ),
  },
];

const BrandLogo = ({ domain, size = 16 }: { domain: string; size?: number }) => (
  <img
    src={`https://logo.clearbit.com/${domain}`}
    alt=""
    width={size}
    height={size}
    className="rounded-sm"
    loading="lazy"
    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
  />
);

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
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (running) chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleLines, showResults, showJson, running]);

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
    <section className="pt-8 md:pt-12">
      <div>
        <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
          Watch Parleo intercept an agent's research.
        </h2>
        <p className="mt-2 text-[15px] text-foreground/60 md:text-[16px]">
          <span className="font-medium text-foreground">~2,000 tokens per query</span>
          {" "}vs ~40,000 without Parleo.{" "}
          <span className="font-semibold text-primary">20× reduction.</span>
        </p>

        {/* ── Horizontal Category Toggles with entrance animation ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 mb-4 flex gap-2"
        >
          {scenarioMeta.map((s, i) => {
            const active = s.key === scenario;
            return (
              <motion.button
                key={s.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => onScenarioChange(s.key)}
                className={`relative flex items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
                  active
                    ? "border-accent-warm/50 bg-accent-warm/[0.08] text-foreground shadow-sm"
                    : "border-border bg-card text-foreground/60 hover:border-accent-warm/30 hover:text-foreground"
                }`}
              >
                <span className={active ? "text-accent-warm" : "text-foreground/40"}>{s.icon}</span>
                {s.label}
                {active && (
                  <motion.div
                    layoutId="cat-underline"
                    className="absolute -bottom-px left-2 right-2 h-[2px] rounded-full bg-accent-warm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Chat Window Container ── */}
        <div
          className="overflow-hidden rounded-2xl border border-border/80 bg-card"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Title bar — macOS style */}
          <div className="flex items-center gap-3 border-b border-border/60 px-5 py-3" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%), hsl(0 0% 96%))" }}>
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[hsl(0,70%,65%)]" />
              <span className="h-3 w-3 rounded-full bg-[hsl(40,80%,60%)]" />
              <span className="h-3 w-3 rounded-full bg-[hsl(130,50%,55%)]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-md bg-background/80 px-3 py-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--parleo-muted))" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                <span className="text-[11px] text-parleo-muted">parleo.ai/agent</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
              <span className="text-[11px] font-medium text-foreground/60">Connected</span>
            </div>
          </div>

          {/* Chat body */}
          <div className="bg-background/50 p-4 md:p-6" style={{ minHeight: 220 }}>
            {/* User message bubble */}
            <div className="mb-3 flex justify-end">
              <div className="max-w-[480px] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13px] leading-relaxed text-primary-foreground shadow-sm">
                {data.query}
              </div>
            </div>

            {/* Agent context pills */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">Context:</span>
              {data.memberships.map((m) => (
                <span key={m.name} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] text-foreground/70">
                  <BrandLogo domain={m.domain} size={12} />
                  {m.name}
                  <span className="text-foreground/35">· {m.detail}</span>
                </span>
              ))}
            </div>

            {/* Run button */}
            {!running && (
              <div className="flex justify-center py-4">
                <motion.button
                  onClick={runDemo}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex h-11 items-center gap-2.5 rounded-xl border-2 border-accent-warm/40 bg-gradient-to-r from-accent-warm/[0.08] to-accent-warm/[0.03] px-7 text-[14px] font-semibold text-foreground transition-all hover:border-accent-warm/60 hover:from-accent-warm/[0.12] hover:to-accent-warm/[0.06]"
                  style={{ boxShadow: "0 2px 16px -4px hsl(var(--accent-warm) / 0.2)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--accent-warm))" className="transition-transform group-hover:scale-110"><polygon points="6,3 20,12 6,21" /></svg>
                  Run Agent
                </motion.button>
              </div>
            )}

            {/* Agent response area */}
            <AnimatePresence>
              {running && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-2.5"
                >
                  {/* Agent avatar */}
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                      <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Response content */}
                  <div className="min-w-0 flex-1">
                    {/* Reasoning trace */}
                    <div className="rounded-xl bg-card border border-border/60 p-3.5" style={{ boxShadow: "var(--shadow-sm)" }}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/40">Reasoning</span>
                        {!traceComplete ? (
                          <span className="flex items-center gap-1.5 text-[10px] text-foreground/30">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
                            Thinking...
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-[hsl(var(--success))]">✓ Done</span>
                        )}
                      </div>

                      <div className="font-mono text-[11px] leading-[1.7]">
                        {data.reasoning.slice(0, visibleLines).map((line, i) => {
                          const isCheckmark = line.text.startsWith("✓");
                          return (
                            <motion.div
                              key={`${scenario}-${i}`}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25 }}
                              className={`py-0.5 ${
                                line.phase === 1
                                  ? "text-foreground/35"
                                  : line.phase === 2
                                  ? "text-foreground/55"
                                  : isCheckmark
                                  ? "mt-0.5 rounded-md border-l-[3px] border-[hsl(var(--success))] bg-[hsl(var(--success))]/8 pl-2.5 font-semibold text-[hsl(var(--success))]"
                                  : "rounded-md border-l-[3px] border-primary bg-primary/[0.06] pl-2.5 text-primary"
                              }`}
                            >
                              {line.text}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Results card */}
                    <AnimatePresence>
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-2.5 rounded-xl bg-card border border-border/60 p-3.5"
                          style={{ boxShadow: "var(--shadow-sm)" }}
                        >
                          <div className="mb-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/40">Shortlist</span>
                              <span className="text-[10px] text-foreground/30">
                                {results.length} products · {data.resultsWithParleo.filter(r => r.deals?.length).reduce((a, r) => a + (r.deals?.length || 0), 0)} deal stacks
                              </span>
                            </div>
                            <div className="inline-flex rounded-lg border border-accent-warm/30 bg-secondary/50 p-0.5">
                              {["Without Parleo", "With Parleo"].map((label) => {
                                const active = label === "With Parleo" ? withParleo : !withParleo;
                                return (
                                  <button
                                    key={label}
                                    onClick={() => setWithParleo(label === "With Parleo")}
                                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                                      active ? "bg-accent-warm text-white shadow-sm" : "text-foreground/50 hover:text-foreground"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            {results.map((r) => (
                              <motion.div
                                key={`${r.name}-${withParleo}`}
                                layout
                                transition={{ duration: 0.3 }}
                                className={`flex flex-col gap-1.5 rounded-lg border p-2.5 sm:flex-row sm:items-center sm:gap-3 ${
                                  r.bestDeal
                                    ? "border-primary/40 bg-primary/[0.03]"
                                    : "border-border bg-card"
                                }`}
                              >
                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[13px] font-bold ${
                                  r.bestDeal ? "bg-primary/10 text-primary" : "bg-secondary text-foreground/60"
                                }`}>
                                  {r.rank}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[13px] font-semibold text-foreground">{r.name}</span>
                                    {r.bestDeal && (
                                      <span className="rounded-full border border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 px-1.5 py-0.5 text-[9px] font-bold text-[hsl(var(--success))]">
                                        BEST DEAL
                                      </span>
                                    )}
                                    {r.rankChange && (
                                      <span className="rounded-full bg-accent-warm/10 border border-accent-warm/20 px-1.5 py-0.5 text-[9px] font-medium text-accent-warm">
                                        {r.rankChange}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-foreground/45">{r.specs}</div>
                                  {r.deals && (
                                    <div className="mt-0.5 flex flex-wrap gap-1">
                                      {r.deals.map((d) => (
                                        <span key={d} className="rounded-full border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 text-[9px] font-medium text-primary">
                                          {d}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  {r.truePrice ? (
                                    <>
                                      <div className="text-[11px] text-foreground/40 line-through">${r.listPrice.toFixed(2)}</div>
                                      <div className="text-[15px] font-bold text-[hsl(var(--success))]">${r.truePrice.toFixed(2)}</div>
                                      {r.savings && <div className="text-[10px] font-medium text-[hsl(var(--success))]">save {r.savings}%</div>}
                                    </>
                                  ) : (
                                    <div className="text-[15px] font-bold text-foreground">${r.listPrice.toFixed(2)}</div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* API JSON collapsible */}
                    <AnimatePresence>
                      {showJson && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-2.5 overflow-hidden rounded-xl border border-border/40 bg-code-bg"
                        >
                          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                            <span className="text-[10px] font-medium text-white/40">API Response</span>
                            <button
                              onClick={() => { navigator.clipboard.writeText(data.apiJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                              className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/40 transition-colors hover:bg-white/5"
                            >
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed text-white/60">
                            {data.apiJson}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={chatEndRef} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;