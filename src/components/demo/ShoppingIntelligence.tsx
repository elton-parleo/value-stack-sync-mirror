import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { merchantLogoDomains, cardPartnerDomains } from "./scenarioData";

const cards = [
  {
    title: "Unified Product Taxonomy",
    body: "One canonical record per product. Normalized specs across every retailer that carries it.",
    visual: "Amazon → Target → Mfr → Parleo",
  },
  {
    title: "Deal Signals + True Cost",
    body: "Promo codes, loyalty multipliers, card cashback, price history. Collapsed into a deal score and true out-of-pocket cost.",
    visual: "$279 → $218",
  },
  {
    title: "Semantic Intelligence",
    body: "Category briefings, review digests, intent-to-spec maps. Agents spend tokens on decisions, not research.",
    visual: "★ 4.7 · 2.4k reviews",
  },
];

const ShoppingIntelligence = () => (
  <AnimatedSection className="py-16 md:py-24">
    <div className="mx-auto max-w-content px-5 md:px-20">
      <div className="font-label mb-3 text-primary">What We Build</div>
      <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
        Pre-computed shopping intelligence. One API call.
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.08]">
              <span className="text-[13px] font-bold text-primary">0{i + 1}</span>
            </div>
            <h3 className="mb-2 text-[16px] font-semibold text-foreground">{c.title}</h3>
            <p className="text-[14px] leading-relaxed text-foreground/50">{c.body}</p>
            <div className="mt-4 rounded-md bg-secondary px-3 py-2 text-[12px] font-mono text-parleo-muted">{c.visual}</div>
          </motion.div>
        ))}
      </div>

      {/* Token stat */}
      <div className="mt-10 rounded-lg border border-primary/10 bg-primary/[0.03] px-6 py-4 text-center">
        <span className="text-[15px] font-medium text-foreground">~2,000 tokens per query</span>
        <span className="text-foreground/40"> vs ~40,000 without Parleo. </span>
        <span className="font-semibold text-primary">20x reduction.</span>
      </div>

      {/* Merchant logos */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {merchantLogoDomains.map((d) => (
            <img
              key={d}
              src={`https://logo.clearbit.com/${d}`}
              alt={d.split(".")[0]}
              className="h-6 opacity-50 grayscale transition-opacity hover:opacity-80"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-[11px] font-medium uppercase tracking-widest text-parleo-muted">Card Partners</span>
          <div className="flex gap-4">
            {cardPartnerDomains.map((c) => (
              <img
                key={c.domain}
                src={`https://logo.clearbit.com/${c.domain}`}
                alt={c.name}
                className="h-5 opacity-50 grayscale"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] text-parleo-muted">
          38+ merchants indexed · Refreshed hourly · Expanding to 100+
        </p>
      </div>
    </div>
  </AnimatedSection>
);

export default ShoppingIntelligence;
