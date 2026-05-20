import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const stats = [
  {
    value: "1.28M",
    description: "Preference signals collected across agent queries. Revealed tradeoffs, not surveys.",
  },
  {
    value: "94%",
    description: "Rank-change accuracy. Deal-adjusted score matching actual agent acceptance.",
  },
  {
    value: "$54",
    description: "True-cost savings surfaced for agents this session. Money left on the table without Parleo.",
  },
];

const DemoStats = () => (
  <AnimatedSection className="py-8 md:py-12">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-3 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <span className="block font-heading text-[36px] leading-none tracking-tight text-primary md:text-[44px]">
              {s.value}
            </span>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/70">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default DemoStats;