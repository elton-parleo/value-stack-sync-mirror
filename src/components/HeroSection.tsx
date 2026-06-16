import { useState } from "react";
import { motion } from "framer-motion";
import ContactFormDialog from "./ContactFormDialog";
import HeroChatArtifact from "./hero/HeroChatArtifact";

const PROTOCOLS = ["MCP", "ACP", "AP2", "UCP", "TAP", "OpenAPI"];

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-content flex-col gap-14 px-5 pb-20 pt-12 md:grid md:grid-cols-12 md:items-center md:gap-12 md:px-20 md:pb-28 md:pt-24">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            The incentive layer for agentic commerce
          </span>

          <h1
            className="mt-6 max-w-[680px] text-foreground"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              fontSize: "clamp(40px, 5vw, 68px)",
            }}
          >
            Your loyalty programs, promotions, and card-linked offers are worth billions. Agents can&apos;t see{" "}
            <em
              className="text-primary"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              any of it.
            </em>
          </h1>

          <p className="mt-7 max-w-[500px] text-[18px] leading-[1.55] text-foreground/70">
            Parleo makes your incentive stack readable and transactable across every agent surface. So the brands with the best real value actually win the recommendation.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 active:scale-[0.98]"
            >
              Request a demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#for-developers"
              className="inline-flex h-12 items-center gap-1.5 rounded-full px-5 text-[14px] font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              For developers
              <span aria-hidden className="text-foreground/40">↓</span>
            </a>
          </div>

          {/* Protocol pills */}
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/60 pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
              Works with
            </span>
            {PROTOCOLS.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                {i > 0 && <span className="text-foreground/25">·</span>}
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/70">
                  {p}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: artifact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-5"
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
