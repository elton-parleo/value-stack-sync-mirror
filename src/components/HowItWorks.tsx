import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import lifestyleVanity from "@/assets/lifestyle-vanity.jpg";
import lifestyleUnboxing from "@/assets/lifestyle-unboxing.jpg";

const benefits = [
  {
    title: "Get discovered by AI agents",
    body: "When customers ask AI for recommendations, Parleo ensures your offers are part of the answer.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Showcase your full value",
    body: "Loyalty tiers, card offers, member pricing. Agents surface all of it so customers see why you're the best deal.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Early movers win the default",
    body: "AI agents form habits. Merchants who show up first become the ones agents recommend by default.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Keep full control of your margins",
    body: "See which incentives move the needle: the Command Center shows which programs and offers actually shift agent recommendations and conversions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

const timeline = [
  { step: "1", label: "Connect your offers", desc: "Upload loyalty, card, and incentive data" },
  { step: "2", label: "Agents discover you", desc: "AI queries start including your value" },
  { step: "3", label: "Customers convert", desc: "Better deals, more recommendations, more sales" },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="section-grid relative bg-background py-10 md:py-14">
    <div className="diffusion-glow pointer-events-none absolute left-[10%] top-[50%] -translate-y-1/2" />
    <div className="decorative-line" />

    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      {/* Section header with editorial image pair */}
      <div className="grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
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
            The early-mover advantage<br className="hidden md:block" /> is closing fast.
          </h2>
          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.7] text-foreground/55 md:text-[17px]">
            Make loyalty, promos, and card-linked offers visible to agents, so your best customers don't see you as 'just another price' in Gemini, ChatGPT, or Perplexity.
          </p>
        </div>

        {/* Graphic diptych — two images through slit-like clip paths */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-1 overflow-x-auto pb-2 scrollbar-none md:overflow-visible md:pb-0"
        >
          {/* Tall narrow slit */}
          <div
            className="w-[80px] shrink-0 overflow-hidden md:w-[100px]"
            style={{ clipPath: 'inset(0 0 0 0 round 4px)', height: 'clamp(160px, 20vw, 220px)' }}
          >
            <img
              src={lifestyleVanity}
              alt="Architectural retail interior"
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(25%) contrast(1.05)', mixBlendMode: 'multiply' }}
              loading="lazy"
              width={1024}
              height={800}
            />
          </div>
          {/* Wider shorter slit */}
          <div
            className="w-[140px] shrink-0 overflow-hidden md:w-[160px]"
            style={{ clipPath: 'inset(0 0 0 0 round 4px)', height: 'clamp(120px, 14vw, 160px)', marginTop: 'auto' }}
          >
            <img
              src={lifestyleUnboxing}
              alt="Luxury unboxing"
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(25%) contrast(1.05)', mixBlendMode: 'multiply' }}
              loading="lazy"
              width={800}
              height={1024}
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {timeline.map((t, i) => (
          <motion.div
            key={t.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-sm"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-[15px] font-bold text-primary">
              {t.step}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-foreground">{t.label}</h3>
              <p className="mt-1 text-[14px] text-foreground/55">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.06]">
              {b.icon}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-foreground">{b.title}</h3>
              <p className="mt-1 text-[14px] leading-[1.6] text-foreground/55">{b.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
