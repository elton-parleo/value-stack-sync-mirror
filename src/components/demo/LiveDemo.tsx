import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
  onScenarioChange: (s: Scenario) => void;
}

/* ── Scenario picker metadata ── */
const scenarioMeta: { key: Scenario; label: string; icon: React.ReactNode }[] = [
  {
    key: "beauty",
    label: "Beauty",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "outdoor",
    label: "Outdoor",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    key: "electronics",
    label: "Electronics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" />
      </svg>
    ),
  },
];

/* ── Brand logo helper (Clearbit) ── */
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
    <section className="pt-10 md:pt-16">
      <div>
        <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
          Watch Parleo intercept an agent's research.
        </h2>
        <p className="mt-2 text-[16px] text-foreground/65 md:text-[17px]">
          <span className="font-medium text-foreground">~2,000 tokens per query</span>
          {" "}vs ~40,000 without Parleo.{" "}
          <span className="font-semibold text-primary">20× reduction.</span>
        </p>

        {/* ── Horizontal Category Toggles ── */}
        <div className="mt-6 mb-6 flex gap-2">
          {scenarioMeta.map((s) => {
            const active = s.key === scenario;
            return (
              <button
                key={s.key}
                onClick={() => onScenarioChange(s.key)}
                className={`relative flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[14px] font-medium transition-all ${
                  active
                    ? "border-primary bg-primary/[0.06] text-primary shadow-sm"
                    : "border-border bg-card text-foreground/60 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <span className={active ? "text-primary" : "text-foreground/40"}>{s.icon}</span>
                {s.label}
                {active && (
                  <motion.div
                    layoutId="cat-underline"
                    className="absolute -bottom-px left-2 right-2 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Chat Window Container ── */}
        <div
          className="overflow-hidden rounded-2xl border border-border/80"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-card px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[hsl(0,70%,65%)]" />
              <span className="h-3 w-3 rounded-full bg-[hsl(40,80%,60%)]" />
              <span className="h-3 w-3 rounded-full bg-[hsl(130,50%,55%)]" />
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
              </svg>
              <span className="text-[13px] font-semibold text-foreground">Parleo Agent</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
            </div>
            <span className="ml-auto text-[11px] text-parleo-muted">parleo.ai/agent</span>
          </div>

          {/* Chat body */}
          <div className="bg-[hsl(30_8%_95%)] p-5 md:p-7" style={{ minHeight: 260 }}>
            {/* User message bubble */}
            <div className="mb-4 flex justify-end">
              <div className="max-w-[480px] rounded-2xl rounded-br-md bg-primary/90 px-5 py-3 text-[14px] leading-relaxed text-primary-foreground">
                {data.query}
              </div>
            </div>

            {/* Agent context pills */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/40">Context loaded:</span>
              {data.memberships.map((m) => (
                <span key={m.name} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-foreground/70">
                  <BrandLogo domain={m.domain} size={14} />
                  {m.name}
                  <span className="text-foreground/40">· {m.detail}</span>
                </span>
              ))}
            </div>

            {/* Run button */}
            {!running && (
              <div className="flex justify-center py-6">
                <button
                  onClick={runDemo}
                  className="group inline-flex h-12 items-center gap-3 rounded-xl bg-foreground px-8 text-[15px] font-semibold text-background transition-all hover:bg-foreground/90 active:scale-[0.97]"
                  style={{ boxShadow: "0 4px 20px -4px hsl(var(--foreground) / 0.3)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 20,12 6,21" /></svg>
                  Run Agent
                </button>
              </div>
            )}

            {/* Agent response area */}
            <AnimatePresence>
              {running && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-3"
                >
                  {/* Agent avatar */}
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                      <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Response content */}
                  <div className="min-w-0 flex-1">
                    {/* Reasoning trace */}
                    <div className="rounded-xl bg-card border border-border/60 p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40">Reasoning</span>
                        {!traceComplete ? (
                          <span className="flex items-center gap-1.5 text-[11px] text-foreground/30">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
                            Thinking...
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-[hsl(var(--success))]">✓ Done</span>
                        )}
                      </div>

                      <div className="font-mono text-[12px] leading-[1.8]">
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
                                  ? "mt-1 rounded-md border-l-[4px] border-[hsl(var(--success))] bg-[hsl(var(--success))]/8 pl-3 font-semibold text-[hsl(var(--success))]"
                                  : "rounded-md border-l-[4px] border-primary bg-primary/[0.06] pl-3 text-primary"
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
                          className="mt-3 rounded-xl bg-card border border-border/60 p-4"
                          style={{ boxShadow: "var(--shadow-sm)" }}
                        >
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40">Shortlist</span>
                              <span className="text-[11px] text-foreground/30">
                                {results.length} products · {data.resultsWithParleo.filter(r => r.deals?.length).reduce((a, r) => a + (r.deals?.length || 0), 0)} deal stacks
                              </span>
                            </div>
                            <div className="inline-flex rounded-lg border border-border bg-secondary/50 p-0.5">
                              {["Without Parleo", "With Parleo"].map((label) => {
                                const active = label === "With Parleo" ? withParleo : !withParleo;
                                return (
                                  <button
                                    key={label}
                                    onClick={() => setWithParleo(label === "With Parleo")}
                                    className={`rounded-md px-3 py-1 text-[12px] font-medium transition-all ${
                                      active ? "bg-card text-foreground shadow-sm" : "text-parleo-muted"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            {results.map((r) => (
                              <motion.div
                                key={`${r.name}-${withParleo}`}
                                layout
                                transition={{ duration: 0.3 }}
                                className={`flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:gap-3 ${
                                  r.bestDeal
                                    ? "border-primary/40 bg-primary/[0.03]"
                                    : "border-border bg-card"
                                }`}
                              >
                                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[14px] font-bold ${
                                  r.bestDeal ? "bg-primary/10 text-primary" : "bg-secondary text-foreground/60"
                                }`}>
                                  {r.rank}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[14px] font-semibold text-foreground">{r.name}</span>
                                    {r.bestDeal && (
                                      <span className="rounded-full border border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 px-2 py-0.5 text-[10px] font-bold text-[hsl(var(--success))]">
                                        BEST DEAL
                                      </span>
                                    )}
                                    {r.rankChange && (
                                      <span className="rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                        {r.rankChange}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-foreground/45">{r.specs}</div>
                                  {r.deals && (
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {r.deals.map((d) => (
                                        <span key={d} className="rounded-full border border-[#0166FF]/20 bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-medium text-[#0166FF]">
                                          {d}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  {r.truePrice ? (
                                    <>
                                      <div className="text-[12px] text-foreground/40 line-through">${r.listPrice.toFixed(2)}</div>
                                      <div className="text-[17px] font-bold text-[hsl(var(--success))]">${r.truePrice.toFixed(2)}</div>
                                      {r.savings && <div className="text-[11px] font-medium text-[hsl(var(--success))]">save {r.savings}%</div>}
                                    </>
                                  ) : (
                                    <div className="text-[17px] font-bold text-foreground">${r.listPrice.toFixed(2)}</div>
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
                          className="mt-3 overflow-hidden rounded-xl border border-border/40 bg-code-bg"
                        >
                          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                            <span className="text-[11px] font-medium text-white/40">API Response</span>
                            <button
                              onClick={() => { navigator.clipboard.writeText(data.apiJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                              className="rounded-md border border-white/10 px-2.5 py-0.5 text-[11px] text-white/40 transition-colors hover:bg-white/5"
                            >
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-white/60">
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
