import { motion } from "framer-motion";
import ContactFormDialog from "@/components/ContactFormDialog";

interface Props {
  onRequestAccess: () => void;
}

const DemoHero = ({ onRequestAccess }: Props) => {
  return (
    <section className="relative overflow-hidden bg-background pb-4 pt-8 md:pt-14">
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2" />

      <div className="mx-auto max-w-content px-5 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[640px]"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
            <span className="text-[11px] font-medium text-parleo-muted">Honey for Agents · Private Beta</span>
          </div>

          <h1 className="font-display text-[44px] text-foreground md:text-[64px]" style={{ lineHeight: 1.05 }}>
            Agents that shop<br />with your advantages.
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
            AI agents research products across dozens of merchant sites. They see listed prices but miss loyalty programs, card-linked offers, and member pricing. Parleo intercepts and injects true cost before rankings form.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#live-demo"
              className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
              style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
            >
              Try the Demo ↓
            </a>
            <button
              onClick={onRequestAccess}
              className="inline-flex h-11 items-center rounded-[4px] border border-border bg-card px-6 text-[15px] font-medium text-foreground transition-all hover:bg-secondary active:scale-[0.97]"
            >
              Request Access
            </button>
          </div>
        </motion.div>
      </div>

      <div className="decorative-line mt-8" />
    </section>
  );
};

export default DemoHero;
