import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { scenarioMap, merchantLogos, type Scenario, type ScenarioData, type ProductResult } from "@/data/demoData";

/* ─── Utility Components ─── */

const BrandLogo = ({ domain, size = 20, className = "" }: { domain: string; size?: number; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    const name = domain.replace(".com", "").replace(/\./g, " ");
    return <span className={`inline-flex items-center justify-center rounded bg-[#3A3A44] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#9A9A9E] ${className}`}>{name}</span>;
  }
  return <img src={`https://logo.clearbit.com/${domain}`} alt={domain} width={size} height={size} className={`rounded ${className}`} style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }} onError={() => setError(true)} />;
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-[12px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">{children}</span>
);

const FadeInSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} id={id} className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}>
      {children}
    </div>
  );
};

const CountUpNumber = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(decimals > 0 ? (eased * value).toFixed(decimals) : Math.round(eased * value).toString());
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimals]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

/* ─── Navbar ─── */

const DemoNavbar = () => (
  <nav className="sticky top-0 z-50 border-b border-[#2A2A34] bg-[#1C1C22]/80 backdrop-blur-xl">
    <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-[#F0EDE8]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="#0166FF" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="#0166FF" opacity="0.4" />
          </svg>
          PARLEO
        </Link>
        <Link to="/" className="text-[13px] text-[#9A9A9E] transition-colors hover:text-[#F0EDE8]">← Back to Home</Link>
      </div>
      <a href="mailto:samar@parleo.io" className="rounded-md bg-[#0166FF] px-5 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
        Request Demo
      </a>
    </div>
  </nav>
);

/* ─── Section 1: Hero ─── */

const HeroSection = () => (
  <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-40">
    {/* Grid texture */}
    <div className="pointer-events-none absolute inset-0" style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, #2A2A32 1px, transparent 0)",
      backgroundSize: "32px 32px",
    }} />
    <div className="relative mx-auto max-w-[1200px] text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#0166FF]/30 bg-[#0166FF]/[0.06] px-4 py-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#F0EDE8]/80">Honey for Agents · Private Beta</span>
      </div>
      <h1 className="mx-auto max-w-[800px] font-display text-[40px] leading-[1.05] text-[#F0EDE8] md:text-[60px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
        The shopping intelligence layer<br />agents check first.
      </h1>
      <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.7] text-[#9A9A9E] md:text-[20px]">
        Parleo pre-computes loyalty programs, card-linked offers, deal signals, and true cost calculations into a single API that any AI agent can query. One call replaces 8-12 tool calls. 60% fewer tokens. Sub-50ms.
      </p>
      {/* Metric pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          { bold: "38+", label: "merchants" },
          { bold: "<50ms", label: "response" },
          { bold: "60%", label: "token reduction" },
          { bold: "Zero", label: "PII" },
        ].map(m => (
          <div key={m.label} className="rounded-lg border border-[#3A3A44] bg-[#26262E] px-4 py-2 text-[13px]">
            <span className="font-bold text-[#F0EDE8]">{m.bold}</span>{" "}
            <span className="text-[#9A9A9E]">{m.label}</span>
          </div>
        ))}
      </div>
      {/* CTAs */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href="#live-demo" className="rounded-md bg-[#0166FF] px-7 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
          Try the Demo ↓
        </a>
        <a href="mailto:samar@parleo.io" className="rounded-md border border-[#3A3A44] bg-transparent px-7 py-3 text-[15px] font-semibold text-[#F0EDE8] transition-colors hover:border-[#9A9A9E]">
          Request Access
        </a>
      </div>
    </div>
  </section>
);

/* ─── Section 2: The Problem ─── */

const ProblemSection = () => (
  <FadeInSection id="problem" className="px-6 py-20 md:py-28">
    <div className="mx-auto max-w-[1200px]">
      <SectionLabel>THE GAP</SectionLabel>
      <h2 className="mt-3 text-[32px] font-semibold leading-tight text-[#F0EDE8] md:text-[40px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Agents see prices. They can't see value.
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-[55%_45%]">
        <div>
          <p className="text-[16px] leading-[1.7] text-[#9A9A9E]">
            When a customer asks an AI agent for a product recommendation, the agent crawls merchant sites, compares listed prices, and ranks options. What it can't see: loyalty program discounts, card-linked cashback, member pricing, points multipliers, and promotional stacking.
          </p>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#9A9A9E]">
            That means a $130 shoe that costs $76 after loyalty + card offers still shows up as $130. The merchant with the best real value loses to whoever has the lowest sticker price.
          </p>
          {/* Before/After card */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#3A3A44] bg-[#26262E] p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">What agents see today</span>
              <div className="mt-4">
                <p className="text-[16px] font-semibold text-[#F0EDE8]/60">Nike Wildhorse 8</p>
                <p className="mt-1 text-[28px] font-bold text-[#F0EDE8]/40">$130.00</p>
                <p className="mt-1 text-[13px] text-[#9A9A9E]/50">Merchant: Nike.com</p>
                <p className="mt-4 text-[12px] italic text-[#9A9A9E]/40">No loyalty data. No card offers. Price only.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#0166FF]/20 bg-[#0166FF]/[0.04] p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#0166FF]">What Parleo surfaces</span>
              <div className="mt-4">
                <p className="text-[16px] font-semibold text-[#F0EDE8]">Nike Wildhorse 8</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[16px] text-[#9A9A9E] line-through">$130.00</span>
                  <span className="text-[28px] font-bold text-[#22C55E]">$76.00</span>
                </div>
                <div className="mt-3 space-y-1 border-t border-[#3A3A44] pt-3 text-[13px]">
                  <div className="flex justify-between"><span className="text-[#9A9A9E]">Member code (WILDHORSE20)</span><span className="text-[#F0EDE8]">−$26.00</span></div>
                  <div className="flex justify-between"><span className="text-[#9A9A9E]">Points redemption (2,400 pts)</span><span className="text-[#F0EDE8]">−$24.00</span></div>
                  <div className="flex justify-between"><span className="text-[#9A9A9E]">Amex Platinum card offer</span><span className="text-[#F0EDE8]">−$15.00</span></div>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-[#3A3A44] pt-3">
                  <span className="rounded bg-[#22C55E]/10 px-2 py-0.5 text-[11px] font-bold text-[#22C55E]">BEST DEAL</span>
                  <span className="text-[13px] font-semibold text-[#22C55E]">You save $54.00 (41%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="space-y-6">
          {[
            { value: "$300B+", desc: "Loyalty program value invisible to agents annually" },
            { value: "8-12", desc: "Tool calls per shopping query without Parleo" },
            { value: "41%", desc: "Average true-cost savings surfaced by Parleo in demo scenarios" },
          ].map(s => (
            <div key={s.value} className="rounded-2xl border border-[#3A3A44] bg-[#26262E] p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}>
              <p className="text-[40px] font-bold text-[#F0EDE8]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
              <p className="mt-2 text-[15px] text-[#9A9A9E]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </FadeInSection>
);

/* ─── Section 3: Shopping Intelligence ─── */

const IntelligenceSection = () => (
  <FadeInSection id="intelligence" className="px-6 py-20 md:py-28">
    <div className="mx-auto max-w-[1200px]">
      <SectionLabel>WHAT WE BUILD</SectionLabel>
      <h2 className="mt-3 max-w-[700px] text-[32px] font-semibold leading-tight text-[#F0EDE8] md:text-[40px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        A pre-computed intelligence layer.<br />Not another search wrapper.
      </h2>
      <p className="mt-4 max-w-[700px] text-[17px] leading-[1.7] text-[#9A9A9E]">
        Shopping research is brutally compute-intensive for agents. Parleo does the work offline and serves structured, agent-ready intelligence at query time.
      </p>

      {/* Three layers */}
      <div className="mt-12 space-y-6">
        {[
          {
            icon: "⊞", title: "Unified Product Taxonomy",
            desc: "The same product across 5 retailers has 5 different titles, schemas, and images. We resolve all of that into one canonical record with normalized specs and cross-retailer seller mapping.",
            visual: (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#1C1C22] p-3 text-[12px] font-mono text-[#9A9A9E]">
                <span className="text-[#9A9A9E]/50">Amazon → Target → Mfr →</span>
                <span className="rounded border border-[#0166FF]/20 bg-[#0166FF]/[0.06] px-2 py-0.5 text-[#0166FF]">Parleo canonical</span>
              </div>
            ),
          },
          {
            icon: "◎", title: "Deal Signals & True Cost",
            desc: "Active promo codes, loyalty multipliers, card-linked cashback, and price history. Combined into a single deal score (0-100) and a true out-of-pocket cost. Updated hourly.",
            visual: (
              <div className="mt-4 space-y-1 rounded-lg bg-[#1C1C22] p-3 font-mono text-[12px]">
                <div className="flex justify-between"><span className="text-[#9A9A9E]">List</span><span className="text-[#F0EDE8]">$279</span></div>
                <div className="flex justify-between"><span className="text-[#9A9A9E]">Promo −15%</span><span className="text-[#F0EDE8]">−$42</span></div>
                <div className="flex justify-between"><span className="text-[#9A9A9E]">Loyalty</span><span className="text-[#F0EDE8]">−$10</span></div>
                <div className="flex justify-between"><span className="text-[#9A9A9E]">Card 5%</span><span className="text-[#F0EDE8]">−$9</span></div>
                <div className="flex justify-between border-t border-[#3A3A44] pt-1"><span className="font-semibold text-[#0166FF]">True cost</span><span className="font-bold text-[#22C55E]">$218</span></div>
              </div>
            ),
          },
          {
            icon: "◈", title: "Semantic Intelligence",
            desc: "Category briefings, review sentiment digests, intent-to-spec maps, pre-ranked shortlists, and clarifying question hints. Agents spend inference on personalization, not research.",
            visual: (
              <div className="mt-4 rounded-lg bg-[#1C1C22] p-3 text-[13px] italic text-[#9A9A9E]">
                "Strong on suction (hardwood), short battery (carpet mode). Best for: pet owners, single-floor homes."
              </div>
            ),
          },
        ].map(layer => (
          <div key={layer.title} className="rounded-2xl border border-[#3A3A44] bg-[#26262E] p-8 md:flex md:gap-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0166FF]/10 text-[18px] text-[#0166FF]">{layer.icon}</span>
                <h3 className="text-[18px] font-semibold text-[#F0EDE8]">{layer.title}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#9A9A9E]">{layer.desc}</p>
            </div>
            <div className="mt-4 min-w-[280px] md:mt-0">{layer.visual}</div>
          </div>
        ))}
      </div>

      {/* Summary banner */}
      <div className="mt-8 rounded-xl border border-[#0166FF]/20 bg-[#0166FF]/[0.04] p-6 text-center">
        <p className="text-[17px] font-medium text-[#F0EDE8]">
          Result: An agent calling Parleo uses ~<span className="text-[#0166FF]">2,000 tokens</span> per query instead of ~40,000. <span className="text-[#0166FF]">20x reduction</span>. The agent just reasons and decides.
        </p>
      </div>

      {/* Merchant grid */}
      <div className="mt-16 text-center">
        <SectionLabel>INDEXING 38+ MERCHANTS · REFRESHED HOURLY</SectionLabel>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {merchantLogos.map(d => (
            <BrandLogo key={d} domain={d} size={28} className="transition-opacity hover:opacity-100" />
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[#9A9A9E]">+ expanding to 100+ merchants across beauty, outdoor, electronics, home, and fashion</p>
      </div>
    </div>
  </FadeInSection>
);

/* ─── Section 4: Live Demo ─── */

const TypewriterLine = ({ text, delay, prefix, prefixColor = "#9A9A9E", textColor = "#9A9A9E" }: { text: string; delay: number; prefix: string; prefixColor?: string; textColor?: string }) => {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          setVisible(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTyped(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
          }, 12);
        }, delay);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, delay]);

  return (
    <div ref={ref} className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
      <span style={{ color: prefixColor }} className="mr-2 font-mono text-[13px]">{prefix}</span>
      <span style={{ color: textColor }} className="font-mono text-[13px]">{typed}</span>
    </div>
  );
};

const ReasoningTrace = ({ data, isRunning }: { data: ScenarioData; isRunning: boolean }) => {
  if (!isRunning) return null;
  const baseDelay = 400;
  let lineCount = 0;

  return (
    <div className="mt-6 rounded-2xl border border-[#3A3A44] bg-[#1A1A22] p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
        <span className="text-[13px] font-medium text-[#F0EDE8]">AGENT REASONING</span>
        <span className="text-[12px] text-[#9A9A9E]">Processing...</span>
      </div>

      {/* Phase 1 */}
      <div className="mb-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]/60">Product Discovery</p>
        {data.reasoningPhases.discovery.map((line, i) => {
          lineCount++;
          return <TypewriterLine key={`d-${i}`} text={line.replace(/^→\s*/, "")} delay={lineCount * baseDelay} prefix="→" />;
        })}
      </div>

      {/* Phase 2 */}
      <div className="mb-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]/60">Shopping Intelligence</p>
        {data.reasoningPhases.intelligence.map((line, i) => {
          lineCount++;
          return <TypewriterLine key={`i-${i}`} text={line.replace(/^◈\s*/, "")} delay={lineCount * baseDelay} prefix="◈" prefixColor="#0166FF" textColor="#b0b0b8" />;
        })}
      </div>

      {/* Phase 3 - Intercept */}
      <div className="rounded-xl border-l-4 border-[#0166FF] bg-[#0166FF]/[0.06] p-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0166FF]">Parleo Loyalty Intercept</p>
        {data.reasoningPhases.intercept.map((line, i) => {
          lineCount++;
          const isCheck = line.startsWith("✓");
          return (
            <TypewriterLine
              key={`p-${i}`}
              text={line.replace(/^[◈✓]\s*/, "")}
              delay={lineCount * baseDelay}
              prefix={isCheck ? "✓" : "◈"}
              prefixColor={isCheck ? "#22C55E" : "#0166FF"}
              textColor={isCheck ? "#22C55E" : "#F0EDE8"}
            />
          );
        })}
      </div>
    </div>
  );
};

const ResultCard = ({ product, showDeals, index }: { product: ProductResult; showDeals: boolean; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.08 }}
    className="flex items-center justify-between rounded-xl border border-[#3A3A44] bg-[#26262E] p-5"
    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
  >
    <div className="flex items-center gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-bold ${product.isBestDeal && showDeals ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#3A3A44] text-[#9A9A9E]"}`}>
        {product.rank}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-[#F0EDE8]">{product.name}</span>
          {showDeals && product.isBestDeal && (
            <span className="rounded bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-bold text-[#22C55E]">BEST DEAL</span>
          )}
          {showDeals && product.rankChange && (
            <span className="text-[12px] font-medium text-[#F59E0B]">{product.rankChange}</span>
          )}
        </div>
        <p className="text-[13px] text-[#9A9A9E]">{product.specs}</p>
        {showDeals && product.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {product.tags.map(t => (
              <span key={t} className="rounded bg-[#0166FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#0166FF]">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="text-right">
      {showDeals && product.savings > 0 ? (
        <>
          <p className="text-[14px] text-[#9A9A9E] line-through">${product.listPrice.toFixed(2)}</p>
          <p className="text-[24px] font-bold text-[#22C55E]">${product.truePrice.toFixed(2)}</p>
          <p className="text-[12px] font-medium text-[#22C55E]">Save {product.savingsPercent}%</p>
        </>
      ) : (
        <p className="text-[24px] font-bold text-[#F0EDE8]">${product.listPrice.toFixed(2)}</p>
      )}
    </div>
  </motion.div>
);

const LiveDemoSection = ({ scenario, data }: { scenario: Scenario; data: ScenarioData }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showParleo, setShowParleo] = useState(true);

  // Reset when scenario changes
  useEffect(() => {
    setIsRunning(false);
    setShowResults(false);
    setShowParleo(true);
  }, [scenario]);

  const handleRun = () => {
    setIsRunning(true);
    const totalLines = data.reasoningPhases.discovery.length + data.reasoningPhases.intelligence.length + data.reasoningPhases.intercept.length;
    setTimeout(() => setShowResults(true), (totalLines + 2) * 400);
  };

  const results = showParleo ? data.resultsWith : data.resultsWithout;

  return (
    <FadeInSection id="live-demo" className="border-t border-[#2A2A34] px-6 py-20 md:py-28" >
      <div className="mx-auto max-w-[1200px]" style={{ background: "transparent" }}>
        <SectionLabel>LIVE DEMO</SectionLabel>
        <h2 className="mt-3 text-[32px] font-semibold leading-tight text-[#F0EDE8] md:text-[40px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Watch Parleo intercept an agent's research.
        </h2>
        <p className="mt-3 max-w-[600px] text-[17px] text-[#9A9A9E]">
          Pick a scenario. See how shopping intelligence and loyalty data change the agent's recommendation in real time.
        </p>

        {/* Demo flow */}
        <div className="mt-10 rounded-2xl border border-[#3A3A44] bg-[#22222A] p-6 md:p-10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}>
          {/* Step 1: Query + Context */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">User Message</span>
              <div className="mt-3 flex justify-end">
                <div className="max-w-[90%] rounded-2xl rounded-br-md bg-[#0166FF] px-5 py-3 text-[15px] text-white">
                  {data.query}
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">Loaded Context</span>
              <div className="mt-3 rounded-xl border border-[#3A3A44] bg-[#26262E] p-5">
                <p className="text-[16px] font-semibold text-[#F0EDE8]">{data.userContext.name}</p>
                <div className="my-3 h-px bg-[#3A3A44]" />
                {data.userContext.memberships.map(m => (
                  <div key={m.name} className="flex items-center justify-between py-1.5 text-[13px]">
                    <div className="flex items-center gap-2">
                      <BrandLogo domain={m.logo} size={16} />
                      <span className="text-[#F0EDE8]">{m.name}</span>
                    </div>
                    <span className="text-[#9A9A9E]">{m.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Run button */}
          {!isRunning && (
            <div className="mt-6 text-center">
              <button onClick={handleRun} className="rounded-lg bg-[#0166FF] px-8 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
                Run Agent →
              </button>
            </div>
          )}

          {/* Step 2: Reasoning */}
          <ReasoningTrace data={data} isRunning={isRunning} />

          {/* Step 3: Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[15px] font-semibold text-[#F0EDE8]">SHORTLIST</span>
                    <span className="ml-3 text-[13px] text-[#9A9A9E]">4 products · 3 deal stacks · computed just now</span>
                  </div>
                  <div className="flex rounded-lg border border-[#3A3A44] bg-[#1C1C22]">
                    <button onClick={() => setShowParleo(false)} className={`px-4 py-2 text-[13px] font-medium transition-colors ${!showParleo ? "bg-[#3A3A44] text-[#F0EDE8]" : "text-[#9A9A9E]"}`}>
                      Without Parleo
                    </button>
                    <button onClick={() => setShowParleo(true)} className={`px-4 py-2 text-[13px] font-medium transition-colors ${showParleo ? "bg-[#0166FF] text-white" : "text-[#9A9A9E]"}`}>
                      With Parleo
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {results.map((p, i) => (
                    <ResultCard key={p.name} product={p} showDeals={showParleo} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: API Response */}
          {showResults && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">API Response · Winner Object</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(JSON.stringify(data.apiResponse, null, 2)); toast.success("Copied to clipboard"); }}
                  className="rounded border border-[#3A3A44] px-3 py-1 text-[12px] text-[#9A9A9E] transition-colors hover:border-[#9A9A9E] hover:text-[#F0EDE8]"
                >
                  Copy
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-[#12121A] p-5 text-[13px] leading-[1.8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <code className="text-[#9A9A9E]">{JSON.stringify(data.apiResponse, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
};

/* ─── Section 5: Sandbox ─── */

const tiers = ["Non-member", "Base", "Mid-tier", "Top-tier"] as const;
const cards = ["No card", "Generic Visa", "Premium Amex", "Store card"] as const;

const SandboxSection = ({ data }: { data: ScenarioData }) => {
  const [tier, setTier] = useState<string>("Top-tier");
  const [card, setCard] = useState<string>("Premium Amex");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"headline" | "true">("true");

  const pricing = data.sandboxPricing[tier]?.[card] ?? { loyaltyDisc: 0, cardDisc: 0, pointsValue: 0, netPrice: data.sandboxListPrice, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "—" };

  const handleChange = useCallback((setter: (v: string) => void, val: string) => {
    setLoading(true);
    setter(val);
    setTimeout(() => setLoading(false), 300);
  }, []);

  const savings = data.sandboxListPrice - pricing.netPrice;
  const savingsPct = savings > 0 ? Math.round((savings / data.sandboxListPrice) * 100) : 0;

  const merchants = [...data.merchantCompare].sort((a, b) => sortBy === "headline" ? a.headlinePrice - b.headlinePrice : a.truePrice - b.truePrice);
  const lowestTrue = Math.min(...merchants.map(m => m.truePrice));

  return (
    <FadeInSection id="sandbox" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>TRY IT YOURSELF</SectionLabel>
        <h2 className="mt-3 text-[32px] font-semibold leading-tight text-[#F0EDE8] md:text-[40px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Change the inputs.<br />Watch the price change.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-[40%_60%]">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">Membership Tier</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {tiers.map(t => (
                  <button key={t} onClick={() => handleChange(setTier, t)} className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${tier === t ? "bg-[#0166FF] text-white" : "border border-[#3A3A44] bg-[#26262E] text-[#9A9A9E] hover:border-[#9A9A9E]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">Card Type</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {cards.map(c => (
                  <button key={c} onClick={() => handleChange(setCard, c)} className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${card === c ? "bg-[#0166FF] text-white" : "border border-[#3A3A44] bg-[#26262E] text-[#9A9A9E] hover:border-[#9A9A9E]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className={`rounded-2xl border border-[#3A3A44] bg-[#26262E] p-8 transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}>
            <p className="text-[18px] font-semibold text-[#F0EDE8]">{data.sandboxProduct}</p>
            <div className="my-4 h-px bg-[#3A3A44]" />
            <div className="space-y-2 text-[15px]">
              <div className="flex justify-between"><span className="text-[#9A9A9E]">List price</span><span className="text-[#F0EDE8]">${data.sandboxListPrice.toFixed(2)}</span></div>
              {pricing.loyaltyDisc > 0 && <div className="flex justify-between"><span className="text-[#9A9A9E]">{pricing.loyaltyLabel}</span><span className="text-[#F0EDE8]">−${pricing.loyaltyDisc.toFixed(2)}</span></div>}
              {pricing.cardDisc > 0 && <div className="flex justify-between"><span className="text-[#9A9A9E]">{pricing.cardLabel}</span><span className="text-[#F0EDE8]">−${pricing.cardDisc.toFixed(2)}</span></div>}
              {pricing.pointsValue > 0 && <div className="flex justify-between"><span className="text-[#9A9A9E]">{pricing.pointsLabel}</span><span className="text-[#F0EDE8]">−${pricing.pointsValue.toFixed(2)}</span></div>}
            </div>
            <div className="my-4 h-px bg-[#3A3A44]" />
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-semibold text-[#F0EDE8]">Net effective price</span>
              <span className="text-[28px] font-bold text-[#22C55E]">${pricing.netPrice.toFixed(2)}</span>
            </div>
            {savings > 0 && (
              <p className="mt-2 text-right text-[14px] font-medium text-[#22C55E]">You save ${savings.toFixed(2)} ({savingsPct}%)</p>
            )}
          </div>
        </div>

        {/* Multi-merchant compare */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#F0EDE8]">Multi-Merchant Compare</h3>
            <div className="flex rounded-lg border border-[#3A3A44] bg-[#1C1C22]">
              <button onClick={() => setSortBy("headline")} className={`px-4 py-2 text-[12px] font-medium ${sortBy === "headline" ? "bg-[#3A3A44] text-[#F0EDE8]" : "text-[#9A9A9E]"}`}>
                Headline Price
              </button>
              <button onClick={() => setSortBy("true")} className={`px-4 py-2 text-[12px] font-medium ${sortBy === "true" ? "bg-[#0166FF] text-white" : "text-[#9A9A9E]"}`}>
                True Cost
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {merchants.map(m => (
              <motion.div layout key={m.name} className={`rounded-xl border p-5 ${m.truePrice === lowestTrue ? "border-[#0166FF]/40 bg-[#0166FF]/[0.04]" : "border-[#3A3A44] bg-[#26262E]"}`}>
                <div className="flex items-center gap-2">
                  <BrandLogo domain={m.domain} size={20} />
                  <span className="text-[15px] font-semibold text-[#F0EDE8]">{m.name}</span>
                  {m.truePrice === lowestTrue && <span className="rounded bg-[#0166FF]/10 px-2 py-0.5 text-[10px] font-bold text-[#0166FF]">BEST VALUE</span>}
                </div>
                <div className="mt-3 space-y-1 text-[14px]">
                  <div className="flex justify-between"><span className="text-[#9A9A9E]">Headline</span><span className="text-[#F0EDE8]">${m.headlinePrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-[#9A9A9E]">True Cost</span><span className={m.truePrice === lowestTrue ? "font-bold text-[#22C55E]" : "text-[#F0EDE8]"}>${m.truePrice.toFixed(2)}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

/* ─── Section 6: For Developers ─── */

const DevSection = ({ data }: { data: ScenarioData }) => {
  const [tab, setTab] = useState<"js" | "py">("js");

  return (
    <FadeInSection id="developers" className="px-6 py-20 md:py-28" >
      <div className="mx-auto max-w-[1200px]" style={{ background: "transparent" }}>
        <SectionLabel>FOR AGENTS & DEVS</SectionLabel>
        <h2 className="mt-3 text-[32px] font-semibold leading-tight text-[#F0EDE8] md:text-[40px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          One call. Full value stack.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Code block */}
          <div>
            <div className="flex rounded-t-xl border border-b-0 border-[#3A3A44] bg-[#1A1A22]">
              <button onClick={() => setTab("js")} className={`px-5 py-3 text-[13px] font-medium ${tab === "js" ? "bg-[#0E0E14] text-[#F0EDE8]" : "text-[#9A9A9E]"}`}>JavaScript</button>
              <button onClick={() => setTab("py")} className={`px-5 py-3 text-[13px] font-medium ${tab === "py" ? "bg-[#0E0E14] text-[#F0EDE8]" : "text-[#9A9A9E]"}`}>Python</button>
            </div>
            <div className="rounded-b-xl border border-[#3A3A44] bg-[#0E0E14] p-5">
              <pre className="overflow-x-auto text-[13px] leading-[1.8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <code className="text-[#9A9A9E]">{tab === "js" ? data.codeSnippetJS : data.codeSnippetPY}</code>
              </pre>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => { navigator.clipboard.writeText("pk_demo_xxxxx"); toast.success("API key copied"); }} className="rounded border border-[#3A3A44] px-4 py-2 text-[13px] text-[#9A9A9E] transition-colors hover:border-[#9A9A9E] hover:text-[#F0EDE8]">
                Copy API Key
              </button>
              <a href="#" className="rounded border border-[#3A3A44] px-4 py-2 text-[13px] text-[#9A9A9E] transition-colors hover:border-[#9A9A9E] hover:text-[#F0EDE8]">View OpenAPI Spec →</a>
              <a href="#" className="rounded border border-[#3A3A44] px-4 py-2 text-[13px] text-[#9A9A9E] transition-colors hover:border-[#9A9A9E] hover:text-[#F0EDE8]">GitHub: Starter SDK →</a>
            </div>
          </div>

          {/* Agent prompt */}
          <div>
            <div className="rounded-2xl border border-[#3A3A44] bg-[#26262E] p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}>
              <h3 className="text-[16px] font-semibold text-[#F0EDE8]">Agent Prompt — Copy & Try</h3>
              <pre className="mt-4 whitespace-pre-wrap text-[14px] leading-[1.7] text-[#9A9A9E]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {data.agentPrompt}
              </pre>
              <button
                onClick={() => { navigator.clipboard.writeText(data.agentPrompt); toast.success("Prompt copied"); }}
                className="mt-4 rounded-lg bg-[#0166FF] px-6 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Copy Prompt
              </button>
            </div>
            <p className="mt-4 text-[13px] text-[#9A9A9E]">Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.</p>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

/* ─── Section 7: Footer CTA ─── */

const FooterCTA = () => (
  <FadeInSection className="px-6 py-20 md:py-28">
    <div className="mx-auto max-w-[1200px] text-center">
      <h2 className="text-[36px] font-bold text-[#F0EDE8] md:text-[48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
        38 merchants. 3 protocols. One call.
      </h2>
      <p className="mx-auto mt-4 max-w-[600px] text-[17px] leading-[1.7] text-[#9A9A9E] md:text-[20px]">
        Parleo is live and indexing loyalty programs, card offers, and incentive logic across beauty, outdoor, electronics, and more. Refreshed hourly.
      </p>
      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { value: "38+", label: "MERCHANTS" },
          { value: "<50ms", label: "RESPONSE TIME" },
          { value: "60%", label: "TOKEN SAVINGS" },
          { value: "Zero", label: "PII TRANSMITTED" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-[#3A3A44] bg-[#26262E] p-6">
            <p className="text-[28px] font-bold text-[#F0EDE8]">{s.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">{s.label}</p>
          </div>
        ))}
      </div>
      <a href="mailto:samar@parleo.io" className="mt-8 inline-block rounded-md bg-[#0166FF] px-10 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90">
        Request Demo
      </a>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["MCP", "ACP", "OpenAPI"].map(p => (
          <span key={p} className="rounded border border-[#3A3A44] bg-[#26262E] px-3 py-1 text-[12px] font-medium text-[#9A9A9E]">{p}</span>
        ))}
      </div>
      <div className="mt-10 border-t border-[#3A3A44] pt-6">
        <p className="text-[13px] text-[#9A9A9E]">© 2026 Parleo, Inc.</p>
      </div>
    </div>
  </FadeInSection>
);

/* ─── Main Demo Page ─── */

const Demo = () => {
  const [scenario, setScenario] = useState<Scenario>("beauty");
  const data = scenarioMap[scenario];

  useEffect(() => {
    document.title = "Parleo — Honey for Agents Demo";
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C22]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <DemoNavbar />
      <HeroSection />

      {/* Scenario picker - global */}
      <div className="sticky top-14 z-40 border-b border-[#2A2A34] bg-[#1C1C22]/90 px-6 py-4 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 overflow-x-auto">
          <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.08em] text-[#9A9A9E]">Scenario</span>
          {(["beauty", "outdoor", "electronics"] as Scenario[]).map(s => {
            const d = scenarioMap[s];
            return (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`shrink-0 rounded-xl border px-5 py-3 text-left transition-all ${scenario === s ? "border-[#0166FF]/40 bg-[#0166FF]/[0.06]" : "border-[#3A3A44] bg-[#26262E] hover:border-[#9A9A9E]"}`}
                style={{ minWidth: 200 }}
              >
                <p className={`text-[14px] font-semibold ${scenario === s ? "text-[#0166FF]" : "text-[#F0EDE8]"}`}>{d.label}</p>
                <p className="text-[12px] text-[#9A9A9E]">{d.product}</p>
              </button>
            );
          })}
        </div>
      </div>

      <ProblemSection />
      <IntelligenceSection />
      <LiveDemoSection scenario={scenario} data={data} />
      <SandboxSection data={data} />
      <DevSection data={data} />
      <FooterCTA />
    </div>
  );
};

export default Demo;
