import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import lifestyleVanity from "@/assets/lifestyle-vanity.jpg";
import lifestyleUnboxing from "@/assets/lifestyle-unboxing.jpg";


const timeline = [
  { step: "1", label: "Connect your offers", desc: "Upload loyalty, card-linked, and incentive data." },
  { step: "2", label: "Agents discover you", desc: "Queries start including your real value, not just list price." },
  { step: "3", label: "Customers convert", desc: "Better deals, ranked higher, more recommendations." },
];

/* ── C9: Visual agent → Parleo → merchant flow ── */
const FlowNode = ({
  label,
  caption,
  logos,
  highlight,
  icon,
}: {
  label: string;
  caption?: string;
  logos?: string[];
  highlight?: boolean;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${
        highlight
          ? "border-primary/40 bg-primary/[0.06]"
          : "border-border bg-secondary"
      }`}
    >
      {icon}
    </div>
    <div className="flex flex-col items-center gap-1">
      <span
        className={`text-[15px] font-semibold ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {label}
      </span>
      {caption && (
        <span className="text-[12px] text-foreground/50">{caption}</span>
      )}
      {logos && (
        <div className="mt-1 flex gap-1.5">
          {logos.map((p) => (
            <BrandLogo key={p} name={p} size={18} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const FlowArrow = ({ label }: { label: string }) => (
  <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-1 md:px-4">
    <div className="hidden h-px w-full bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 md:block" />
    <div className="h-8 w-px bg-primary/25 md:hidden" />
    <span className="rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[12px] font-medium text-primary">
      {label}
    </span>
    <div className="hidden h-px w-full bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 md:block" />
    <div className="h-8 w-px bg-primary/25 md:hidden" />
  </div>
);

const AgentFlowDiagram = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-0 md:justify-between">
      <FlowNode
        label="AI Agent"
        logos={["ChatGPT", "Claude", "Perplexity"]}
        icon={
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.4" opacity="0.75">
            <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4zM5 10h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinecap="round" />
          </svg>
        }
      />
      <FlowArrow label="/true-cost query" />
      <FlowNode
        label="Parleo"
        caption="47ms · Zero PII"
        highlight
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
          </svg>
        }
      />
      <FlowArrow label="structured response" />
      <FlowNode
        label="Your Store"
        logos={["Sephora", "Nike", "Best Buy"]}
        icon={
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.4" opacity="0.75">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />
    </div>

    {/* What flows through */}
    <div className="mt-8 grid gap-0 border-t border-border/60 md:grid-cols-3 md:divide-x md:divide-border/60">
      {[
        { label: "Agent sends", items: ["Product query", "Card signals", "Segment hints"] },
        { label: "Parleo computes", items: ["True cost", "Deal stacking", "Semantic context"] },
        { label: "Customer sees", items: ["Best deal ranked", "Savings breakdown", "Buy rationale"] },
      ].map((col) => (
        <div key={col.label} className="px-1 pt-5 md:px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">{col.label}</span>
          <div className="mt-3 space-y-1.5">
            {col.items.map((item) => (
              <div key={item} className="text-[14px] tabular-nums text-foreground/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-8 md:grid-cols-[1.15fr_auto] md:items-end">
        <div>
          <h2 className="section-heading text-foreground">
            The early-mover advantage is closing fast.
          </h2>
          <p className="mt-5 max-w-[620px] text-[18px] leading-[1.55] text-foreground/65 md:text-[20px]">
            Agent defaults harden around the merchants they can already understand. The window to become readable is now.
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

      <div className="relative mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 md:grid-cols-3" style={{ boxShadow: "var(--shadow-card)" }}>
        {timeline.map((t, i) => (
          <motion.div
            key={t.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col bg-card p-7 transition-colors duration-300 hover:bg-primary/[0.02]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tabular-nums text-foreground/40">0{t.step}</span>
              <span className="font-display text-[44px] font-light leading-none text-primary/15 tabular-nums transition-colors group-hover:text-primary/40">
                0{t.step}
              </span>
            </div>
            <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-foreground">{t.label}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-foreground/65">{t.desc}</p>
            <div className="mt-5 h-px w-8 bg-primary/40 transition-all duration-300 group-hover:w-16" />
          </motion.div>
        ))}
      </div>

      {/* Agent flow diagram — C9 */}
      <AgentFlowDiagram />

    </div>
  </AnimatedSection>
);

export default HowItWorks;
