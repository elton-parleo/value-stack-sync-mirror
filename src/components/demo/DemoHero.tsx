import { motion } from "framer-motion";
import editorialHands from "@/assets/editorial-hands.jpg";

interface Props {
  onRequestAccess: () => void;
}

const DemoHero = ({ onRequestAccess }: Props) => {
  return (
    <section className="relative overflow-hidden bg-background pb-2 pt-6 md:pt-10">
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2" />

      <div className="mx-auto max-w-content px-5 md:px-20 md:flex md:items-center md:justify-between md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[640px]"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
            <span className="text-[11px] font-medium text-foreground/60">Honey for Agents · Private Beta</span>
          </div>

          <h1 className="font-display text-[36px] text-foreground md:text-[56px]" style={{ lineHeight: 1.08, letterSpacing: '-0.04em' }}>
            Agents that shop with your advantages.
          </h1>
          <p className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-foreground/60 md:text-[16px]">
            See how agents use Parleo to compute true cost across merchants in one step. Without Parleo, agents rank by headline price — missing loyalty, promos, and card-linked value.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="#live-demo"
              className="inline-flex h-10 items-center gap-2 rounded-[4px] bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
              style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
            >
              Try the Demo ↓
            </a>
            <button
              onClick={onRequestAccess}
              className="inline-flex h-10 items-center rounded-[4px] border border-border bg-card px-5 text-[14px] font-medium text-foreground transition-all hover:bg-secondary active:scale-[0.97]"
            >
              Request Access
            </button>
          </div>
        </motion.div>

        {/* Hero lifestyle image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 hidden overflow-hidden rounded-2xl md:mt-0 md:block md:w-[360px] md:shrink-0"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <img src={editorialHands} alt="Abstract geometric forms" className="h-[320px] w-full object-cover" />
        </motion.div>
      </div>

      <div className="decorative-line mt-4" />
    </section>
  );
};

export default DemoHero;