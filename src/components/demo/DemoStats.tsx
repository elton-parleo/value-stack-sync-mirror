import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const stats = [
  {
    value: "1.28M",
    description: "Preference signals collected across agent queries — revealed tradeoffs, not surveys",
  },
  {
    value: "94%",
    description: "Rank-change accuracy — deal-adjusted score matching actual agent acceptance",
  },
  {
    value: "$54",
    description: "True-cost savings surfaced for agents this session — money left on the table without Parleo",
  },
];

const DemoStats = () => (
  <AnimatedSection className="py-12 md:py-20">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <span className="block font-serif text-[40px] font-light leading-none tracking-tight text-primary md:text-[48px]">
              {s.value}
            </span>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default DemoStats;
