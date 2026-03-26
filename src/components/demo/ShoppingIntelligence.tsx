import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const cards = [
  {
    num: "01",
    title: "Unified Product Taxonomy",
    body: "One canonical record per product. Normalized specs across every retailer that carries it.",
    visual: "Amazon → Target → Mfr → Parleo",
  },
  {
    num: "02",
    title: "Deal Signals + True Cost",
    body: "Promo codes, loyalty multipliers, card cashback, price history. Collapsed into a deal score and true out-of-pocket cost.",
    visual: "$279 → $218",
  },
  {
    num: "03",
    title: "Semantic Intelligence",
    body: "Category briefings, review digests, intent-to-spec maps. Agents spend tokens on decisions, not research.",
    visual: "★ 4.7 · 2.4k reviews",
  },
];

const ShoppingIntelligence = () => (
  <AnimatedSection className="py-12 md:py-16">
    <div className="mx-auto max-w-content px-5 md:px-20">
      <div className="font-label mb-3 text-primary">How It Works</div>
      <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
        Three layers of intelligence. One API call.
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08]">
              <span className="text-[13px] font-bold text-primary">{c.num}</span>
            </div>
            <h3 className="mb-1.5 text-[16px] font-semibold text-foreground">{c.title}</h3>
            <p className="text-[13px] leading-relaxed text-foreground/50">{c.body}</p>
            <div className="mt-3 rounded-md bg-secondary px-3 py-2 text-[13px] font-mono font-semibold text-primary">{c.visual}</div>
          </motion.div>
        ))}
      </div>

      {/* Token stat */}
      <div className="mt-8 rounded-lg border border-primary/10 bg-primary/[0.03] px-5 py-3 text-center">
        <span className="text-[15px] font-medium text-foreground">~2,000 tokens per query</span>
        <span className="text-foreground/40"> vs ~40,000 without Parleo. </span>
        <span className="font-semibold text-primary">20x reduction.</span>
      </div>
    </div>
  </AnimatedSection>
);

export default ShoppingIntelligence;
