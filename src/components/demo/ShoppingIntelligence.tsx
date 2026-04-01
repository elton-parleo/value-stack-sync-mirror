import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import generativeTopology from "@/assets/generative-topology.jpg";

const cards = [
  {
    num: "01",
    title: "Unified Product Taxonomy",
    body: "Our taxonomy normalizes SKUs across merchants into canonical objects your agent can reuse across query patterns.",
    visual: "Amazon → Target → Mfr → Parleo",
  },
  {
    num: "02",
    title: "Deal Signals + True Cost",
    body: "Promo codes, loyalty multipliers, card cashback, price history — collapsed into a deal score and true out-of-pocket cost per merchant.",
    visual: "$279 → $218",
  },
  {
    num: "03",
    title: "Semantic Intelligence",
    body: "Cached briefs, review digests, ranked shortlists. Agents spend tokens on decisions, not research.",
    visual: "★ 4.7 · 2.4k reviews",
  },
];

const ShoppingIntelligence = () => (
  <AnimatedSection className="py-8 md:py-12 relative overflow-hidden">
    {/* Subtle editorial background strip */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
      <img src={shoppingEditorial} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
    <div className="relative mx-auto max-w-content px-5 md:px-20">
      <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
        Three layers of intelligence. One API call.
      </h2>
      <p className="mt-2 mb-6 text-[15px] text-foreground/60">
        Everything an agent needs pre-computed: product identity, true-cost deal signals, and semantic content.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.08]">
              <span className="text-[12px] font-bold text-primary">{c.num}</span>
            </div>
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">{c.title}</h3>
            <p className="text-[13px] leading-relaxed text-foreground/55">{c.body}</p>
            <div className="mt-2.5 rounded-md bg-secondary px-3 py-1.5 text-[12px] font-mono font-semibold text-primary">{c.visual}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default ShoppingIntelligence;