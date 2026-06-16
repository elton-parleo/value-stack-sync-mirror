import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    step: "01",
    label: "Connect your offers",
    desc: "Loyalty, card-linked, and incentive data, in one structured feed.",
  },
  {
    step: "02",
    label: "Agents see your real value",
    desc: "Queries start resolving your true price, not list price.",
  },
  {
    step: "03",
    label: "Customers convert",
    desc: "Better deals, ranked higher, more recommendations won.",
  },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-14">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.05 }}
        >
          From invisible to ranked, in three steps.
        </h2>
        <p className="text-[16px] leading-[1.65] text-foreground/65 md:text-[18px]">
          For brand and loyalty teams. The developer side lives further down the page.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((t, i) => (
          <motion.div
            key={t.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              {t.step}
            </span>
            <h3 className="mt-4 text-[18px] font-semibold text-foreground">{t.label}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-foreground/65">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Light flow line */}
      <div className="mt-10 flex flex-col items-stretch gap-3 rounded-xl border border-border/60 bg-card/60 p-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/55">
          Agent
        </span>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-foreground/15 via-primary/30 to-foreground/15 md:block" />
        <span className="rounded-full border border-primary/30 bg-primary/[0.05] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
          Parleo
        </span>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-foreground/15 via-primary/30 to-foreground/15 md:block" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/55">
          Your store
        </span>
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
