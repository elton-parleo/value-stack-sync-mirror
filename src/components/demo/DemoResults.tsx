import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scenario } from "@/data/demoData";

interface DemoResultsProps {
  scenario: Scenario;
}

const DemoResults = ({ scenario }: DemoResultsProps) => {
  const [withParleo, setWithParleo] = useState(true);

  const products = [...scenario.products].sort((a, b) => {
    if (withParleo) return a.rankWith - b.rankWith;
    return a.rankWithout - b.rankWithout;
  });

  const dealCount = scenario.products.reduce((sum, p) => sum + p.dealStack.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-label text-parleo-muted">STEP 3</span>
        <span className="text-[13px] text-foreground/40">— The Results</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[13px] text-foreground/50">
          {scenario.products.length} products · {dealCount} deal stacks · computed just now
        </span>
        <div className="flex items-center rounded-lg border border-border bg-card overflow-hidden">
          <button
            onClick={() => setWithParleo(false)}
            className={`px-4 py-2 text-[13px] font-medium transition-all ${
              !withParleo ? "bg-secondary text-foreground" : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Without Parleo
          </button>
          <button
            onClick={() => setWithParleo(true)}
            className={`px-4 py-2 text-[13px] font-medium transition-all ${
              withParleo ? "bg-primary/[0.08] text-primary" : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            With Parleo
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {products.map((product) => {
            const rank = withParleo ? product.rankWith : product.rankWithout;
            const showDeal = withParleo && product.isBestDeal;
            const showRankChange = withParleo && product.rankWith !== product.rankWithout;
            const price = withParleo ? product.trueCost : product.listPrice;
            const savings = product.listPrice - product.trueCost;
            const savingsPct = ((savings / product.listPrice) * 100).toFixed(0);

            return (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-xl border p-5 transition-all ${
                  showDeal
                    ? "border-primary/30 bg-primary/[0.02]"
                    : "border-border bg-card"
                }`}
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-[18px] font-bold text-foreground/40">
                    {rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px] font-semibold text-foreground">{product.name}</span>
                      {showDeal && (
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          Best Deal
                        </span>
                      )}
                      {showRankChange && (
                        <span className="text-[11px] text-primary font-medium">
                          ↑ was #{product.rankWithout}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[13px] text-foreground/40">{product.specs} · {product.merchant}</div>

                    {/* Deal tags */}
                    {withParleo && product.dealTags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.dealTags.map((tag) => (
                          <span key={tag} className="rounded-md border border-primary/15 bg-primary/[0.04] px-2 py-0.5 text-[11px] font-medium text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    {withParleo && savings > 0 && (
                      <div className="text-[13px] text-foreground/40 line-through">${product.listPrice.toFixed(2)}</div>
                    )}
                    <div className={`text-[20px] font-bold ${showDeal ? "text-primary" : "text-foreground"}`}>
                      ${price.toFixed(2)}
                    </div>
                    {withParleo && savings > 0 && (
                      <div className="text-[12px] font-medium text-primary">
                        Save ${savings.toFixed(2)} ({savingsPct}%)
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DemoResults;
