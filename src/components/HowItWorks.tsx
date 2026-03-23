import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const assertions = [
  {
    title: "A new channel is forming.",
    body: "AI agents handle more shopping queries every month. The merchants represented in agent-native directories shape how this channel works. Early presence compounds.",
  },
  {
    title: "Agents form habits fast.",
    body: "Once an agent finds a reliable, low-cost source for value intelligence, it defaults there. Parleo is designed to become that default.",
  },
  {
    title: "Control follows presence.",
    body: "The merchants already in Parleo's directory can upgrade to a full control panel: set rules, activate incentives, track performance. The B2B product sells itself when the traffic is already flowing.",
  },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="section-grid relative bg-background py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute left-[10%] top-[50%] -translate-y-1/2" />
    <div className="decorative-line" />

    {/* Decorative corner element */}
    <div className="pointer-events-none absolute left-[5%] top-[20%] hidden md:block">
      <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.05]">
        <path d="M0 0h16v2H2v14H0V0z" fill="hsl(213,99%,50%)" />
      </svg>
    </div>
    <div className="pointer-events-none absolute bottom-[15%] right-[5%] hidden md:block">
      <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.05]">
        <path d="M40 40H24v-2h14V24h2v16z" fill="hsl(213,99%,50%)" />
      </svg>
    </div>

    <div className="mx-auto max-w-content px-6 pt-8 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">THE WINDOW</span>
      </div>
      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        The standard is being set<br />right now.
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {assertions.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h3 className="text-[17px] font-bold text-foreground">{a.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-foreground/50">{a.body}</p>

            {/* Subtle bottom accent line on hover */}
            <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
