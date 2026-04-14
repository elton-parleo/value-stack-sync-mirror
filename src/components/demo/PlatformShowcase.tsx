import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import BrandLogo from "../BrandLogo";

/* ── D11: Show Parleo inside real AI platforms on demo page ── */

type Platform = "chatgpt" | "perplexity" | "claude";

const platformData: Record<Platform, {
  name: string;
  brand: string;
  query: string;
  thinking: string;
  response: string;
  products: { name: string; brand: string; list: string; true: string; savings: string; deals: string[]; best?: boolean }[];
}> = {
  chatgpt: {
    name: "ChatGPT",
    brand: "ChatGPT",
    query: "I want the Rare Beauty blush in Joy. Where should I buy it?",
    thinking: "Searching retailers and computing true cost with loyalty + card offers...",
    response: "Based on your loyalty memberships and payment methods, here's where you'll get the best value:",
    products: [
      { name: "Sephora", brand: "Sephora", list: "$23.00", true: "$11.10", savings: "52%", deals: ["Rouge −10%", "Amex Gold −$5", "4x Beauty Insider"], best: true },
      { name: "Ulta", brand: "Ulta", list: "$23.00", true: "$18.12", savings: "21%", deals: ["Diamond −$2", "Mastercard 5%"] },
      { name: "Target", brand: "Target", list: "$22.49", true: "$20.30", savings: "10%", deals: ["Circle 5%", "RedCard 5%"] },
    ],
  },
  perplexity: {
    name: "Perplexity",
    brand: "Perplexity",
    query: "Best noise-cancelling earbuds under $300 with my Best Buy membership?",
    thinking: "Analyzing product specs, reviews, and computing personalized pricing...",
    response: "Your Totaltech membership and Chase card unlock exclusive pricing on the Sony WF-1000XM5:",
    products: [
      { name: "Sony WF-1000XM5 at Best Buy", brand: "Best Buy", list: "$279.99", true: "$226.50", savings: "19%", deals: ["Totaltech −$30", "Chase 5%"], best: true },
      { name: "Sony WF-1000XM5 at Amazon", brand: "Amazon", list: "$269.99", true: "$269.99", savings: "0%", deals: [] },
      { name: "Bose QC Ultra", brand: "Best Buy", list: "$299.00", true: "$269.00", savings: "10%", deals: ["Totaltech −$30"] },
    ],
  },
  claude: {
    name: "Claude",
    brand: "Claude",
    query: "Find me the best trail running shoe deal with my Nike membership and Amex card.",
    thinking: "Cross-referencing product specs with your Nike Member points and Amex offers...",
    response: "Nike Wildhorse 8 jumps from #3 to #1 when your memberships are factored in:",
    products: [
      { name: "Nike Wildhorse 8", brand: "Nike", list: "$130.00", true: "$76.00", savings: "41%", deals: ["Member code −20%", "Pts −$24", "Amex −$15"], best: true },
      { name: "Hoka Speedgoat 5 at REI", brand: "REI", list: "$155.00", true: "$136.50", savings: "12%", deals: ["Co-op dividend $18.50"] },
      { name: "Salomon Speedcross 6", brand: "Nike", list: "$139.00", true: "$139.00", savings: "0%", deals: [] },
    ],
  },
};

const PlatformShowcase = () => {
  const [active, setActive] = useState<Platform>("chatgpt");
  const data = platformData[active];

  return (
    <AnimatedSection className="py-10 md:py-14">
      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-label text-parleo-muted">PARLEO INSIDE</span>
        </div>

        <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[40px]" style={{ lineHeight: 1.1 }}>
          See Parleo data inside real AI platforms.
        </h2>
        <p className="mt-2 max-w-[560px] text-[15px] text-foreground/60">
          When agents query Parleo, your loyalty programs and card offers appear directly in the customer's conversation.
        </p>

        {/* Platform tabs */}
        <div className="mt-6 flex gap-2">
          {(Object.keys(platformData) as Platform[]).map((key) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? "border-primary/30 bg-primary/[0.06] text-foreground shadow-sm"
                    : "border-border bg-card text-foreground/50 hover:border-primary/15 hover:text-foreground"
                }`}
              >
                <BrandLogo name={platformData[key].brand} size={16} />
                {platformData[key].name}
              </button>
            );
          })}
        </div>

        {/* Platform mockup */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-5 overflow-hidden rounded-2xl border border-border bg-card"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-3" style={{ background: "hsl(0 0% 97%)" }}>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8E6E3" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8E6E3" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8E6E3" }} />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-background/80 px-3 py-1">
                <BrandLogo name={data.brand} size={14} />
                <span className="text-[11px] text-parleo-muted">{data.name.toLowerCase()}.com</span>
              </div>
            </div>

            {/* Chat body */}
            <div className="p-5 md:p-6 space-y-4" style={{ minHeight: 320 }}>
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13px] leading-relaxed text-primary-foreground">
                  {data.query}
                </div>
              </div>

              {/* Thinking indicator */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <BrandLogo name={data.brand} size={14} />
                </div>
                <div className="text-[12px] italic text-foreground/40">{data.thinking}</div>
              </div>

              {/* Parleo intercept badge */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                    <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
                  </svg>
                  <span className="text-[11px] font-medium text-foreground/60">Parleo true-cost layer</span>
                  <span className="text-[10px] text-primary">47ms</span>
                </div>
              </div>

              {/* Response */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <BrandLogo name={data.brand} size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-[1.7] text-foreground/70">{data.response}</p>

                  {/* Product cards */}
                  <div className="mt-3 space-y-2">
                    {data.products.map((p) => (
                      <div
                        key={p.name}
                        className={`flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:gap-4 ${
                          p.best
                            ? "border-[hsl(var(--success))]/40 bg-[hsl(var(--success))]/[0.03]"
                            : "border-border bg-card"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <BrandLogo name={p.brand} size={16} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-semibold text-foreground">{p.name}</span>
                              {p.best && (
                                <span className="rounded-full bg-[hsl(var(--success))]/10 px-1.5 py-0.5 text-[9px] font-bold text-[hsl(var(--success))]">
                                  BEST DEAL
                                </span>
                              )}
                            </div>
                            {p.deals.length > 0 && (
                              <div className="mt-0.5 flex flex-wrap gap-1">
                                {p.deals.map((d) => (
                                  <span key={d} className="rounded-full border border-primary/15 bg-primary/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-primary">
                                    {d}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-auto text-right whitespace-nowrap">
                          <span className="text-[11px] text-foreground/40 line-through">{p.list}</span>
                          <span className="ml-1.5 text-[15px] font-bold text-primary">{p.true}</span>
                          {p.savings !== "0%" && (
                            <div className="text-[10px] font-medium text-[hsl(var(--success))]">Save {p.savings}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 border-t border-border px-5 py-2.5 text-[10px] text-parleo-muted" style={{ background: "hsl(0 0% 97%)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
              </svg>
              True cost by Parleo · Zero PII · Sub-50ms
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default PlatformShowcase;
