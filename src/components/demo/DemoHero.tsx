import { motion } from "framer-motion";
import lifestyleHandsProduct from "@/assets/lifestyle-hands-product.jpg";

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
            See how agents use Parleo to compute true cost across merchants in one step. Without Parleo, agents rank by headline price, missing loyalty, promos, and card-linked value.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="#live-demo"
              className="animate-border-pulse group inline-flex h-10 items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.04] px-5 text-[14px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.07] active:scale-[0.98]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Try the Demo
            </a>
            <button
              onClick={onRequestAccess}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 active:scale-[0.98]"
            >
              Request Access
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </motion.div>

        {/* Hero lifestyle image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 hidden overflow-hidden rounded-lg md:mt-0 md:block md:w-[360px] md:shrink-0"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <img src={lifestyleHandsProduct} alt="Luxury beauty shopping experience" className="h-[320px] w-full object-cover" style={{ filter: 'grayscale(20%) contrast(1.05)', mixBlendMode: 'multiply' }} width={800} height={1024} />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")', opacity: 0.3 }} />
        </motion.div>
      </div>

      <div className="decorative-line mt-4" />
    </section>
  );
};

export default DemoHero;
