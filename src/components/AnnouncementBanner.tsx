import { ArrowUpRight, X, Zap } from "lucide-react";
import { motion } from "framer-motion";

const AUDIT_URL = "https://audit.parleo.io/";

type Props = { onDismiss: () => void };

const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="group relative overflow-hidden border-b border-primary/10 bg-background">
    {/* Top accent line: a live signal that this is an announcement */}
    <div className="absolute inset-x-0 top-0 h-[2px] bg-primary" />

    {/* Soft editorial wash: left-to-right cool gradient */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, hsl(213 99% 50% / 0.08) 0%, hsl(213 99% 50% / 0.03) 45%, transparent 100%)",
      }}
    />

    {/* Subtle architectural grid */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    {/* Animated shimmer sweep */}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-[-20deg]"
      initial={{ x: "-100%" }}
      animate={{ x: ["-100%", "400%"] }}
      transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
    />

    <a
      href={AUDIT_URL}
      className="relative mx-auto flex h-11 max-w-content items-center gap-2.5 px-4 sm:gap-3 sm:justify-center md:px-8 lg:px-20"
    >
      {/* Launch badge */}
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-sm">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.75, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        New
      </span>

      {/* Intro phrase */}
      <span className="hidden shrink-0 text-[12.5px] font-medium text-foreground/45 sm:inline">
        Agentic Value Audit is now live
      </span>

      <span className="hidden h-3 w-px shrink-0 bg-border sm:block" />

      {/* Proof score */}
      <span className="hidden shrink-0 items-center gap-1.5 md:flex">
        <Zap className="h-3 w-3 fill-primary/20 text-primary" strokeWidth={2} />
        <span className="font-mono text-[11px] tabular-nums text-foreground/50">
          Avg brand score
        </span>
        <span className="font-mono text-[12px] font-semibold tabular-nums text-foreground">
          59<span className="text-foreground/40">/100</span>
        </span>
      </span>

      {/* Mobile-only compact descriptor */}
      <span className="truncate text-[12.5px] font-medium text-foreground/70 sm:hidden">
        Agentic Value Audit
      </span>

      {/* CTA */}
      <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11.5px] font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:ml-3 sm:px-3">
        Run free
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>

    <button
      type="button"
      onClick={onDismiss}
      className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-foreground/30 transition-colors hover:bg-foreground/5 hover:text-foreground md:right-4"
      aria-label="Dismiss announcement"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2} />
    </button>
  </div>
);

export default AnnouncementBanner;
