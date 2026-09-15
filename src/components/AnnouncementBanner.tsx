import { ArrowUpRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AUDIT_URL = "https://parleo.io/audit/";

type Props = { onDismiss: () => void };

const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="relative h-11 overflow-hidden border-b border-primary/45 bg-code-bg text-background">
    <motion.div
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
      aria-hidden
      animate={{ scaleX: [0.15, 1, 0.15], opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
    />

    <a
      href={AUDIT_URL}
      className="group mx-auto flex h-full max-w-content items-center gap-2.5 px-4 pr-12 md:gap-4 md:px-8 md:pr-14 lg:px-20"
      aria-label="Agentic Value Audit is live. Run your free audit"
    >
      <span className="relative flex h-6 w-8 shrink-0 items-center justify-center gap-[2px] border-x border-background/20" aria-hidden>
        {[5, 9, 13, 8].map((height, index) => (
          <motion.span
            key={height}
            className="w-[2px] bg-primary"
            animate={{ height: [height, Math.min(height + 6, 17), height] }}
            transition={{ duration: 1.2, delay: index * 0.1, repeat: Infinity, repeatDelay: 0.4 }}
          />
        ))}
      </span>

      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-none text-background md:text-[14px]">
        The Agentic Value Audit
        <span className="hidden font-normal text-background/55 md:inline">: See what agents quote for your brand</span>
      </span>

      <span className="flex shrink-0 items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-background/75 sm:text-[10px]">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="relative h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        <span className="hidden min-[360px]:inline">Now live</span>
      </span>

      <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-background/70 transition-colors group-hover:text-primary">
        <span className="hidden lg:inline">Run free</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>

    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onDismiss}
      className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-background/40 hover:bg-background/10 hover:text-background md:right-3"
      aria-label="Dismiss announcement"
    >
      <X className="h-4 w-4" strokeWidth={1.75} />
    </Button>
  </div>
);

export default AnnouncementBanner;