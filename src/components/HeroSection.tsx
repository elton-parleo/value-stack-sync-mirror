import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactFormDialog from "./ContactFormDialog";
import HeroChatArtifact from "./hero/HeroChatArtifact";
import AgentLogosRow from "./hero/AgentLogosRow";

const FloatingIcon = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute hidden md:flex items-center justify-center rounded-xl border border-border bg-card ${className}`}
    style={{ boxShadow: "var(--shadow-md)" }}
    whileHover={{ scale: 1.1 }}
  >
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="hero" className="section-grid relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -right-[300px] -top-[100px] h-[700px] w-[700px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, hsl(213 99% 50%) 0%, transparent 70%)" }}
      />
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2" />

      <FloatingIcon className="left-[6%] top-[18%] h-10 w-10" delay={0.4}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="left-[10%] bottom-[18%] h-8 w-8" delay={0.8}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" opacity="0.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </FloatingIcon>

      <div className="mx-auto flex w-full max-w-content flex-col gap-12 px-5 pb-16 pt-10 md:grid md:grid-cols-12 md:items-center md:gap-10 md:px-20 md:pb-24 md:pt-16">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <h1
            className="font-display text-[44px] text-foreground md:text-[64px]"
            style={{ lineHeight: 1.05 }}
          >
            The incentive layer for AI commerce.
          </h1>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-foreground/70">
            AI agents are the new comparison shopper. They see your list price, not your real one.
            Parleo makes loyalty, card-linked offers + true value machine-readable across every agent surface.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 active:scale-[0.98]"
            >
              Request a demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link
              to="/developers"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.04] px-5 text-[14px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.07] active:scale-[0.98]"
            >
              For developers
              <span className="text-primary transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AgentLogosRow />
            <span className="text-[13px] text-foreground/55">
              Works across ChatGPT, Gemini, Perplexity & Copilot
            </span>
          </div>
        </motion.div>

        {/* Right: artifact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7"
        >
          <div className="mx-auto w-full max-w-[560px]">
            <HeroChatArtifact />
          </div>
        </motion.div>
      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default HeroSection;
