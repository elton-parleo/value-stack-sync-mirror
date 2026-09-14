import { ArrowUpRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AUDIT_URL = "https://parleo.io/audit/";

type Props = { onDismiss: () => void };

const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="relative h-14 overflow-hidden border-b border-primary/35 bg-code-bg text-background">
    <div className="absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden />

    <a
      href={AUDIT_URL}
      className="group mx-auto flex h-full max-w-content items-center gap-3 px-5 pr-14 md:gap-5 md:px-8 md:pr-16 lg:px-20"
      aria-label="Agentic Value Audit is live. Run your free audit"
    >
      <span className="relative flex h-8 w-8 shrink-0 items-end justify-center gap-[3px] border border-background/20 p-2" aria-hidden>
        {[8, 14, 20, 25].map((height, index) => (
          <motion.span
            key={height}
            className="w-[2px] bg-primary"
            style={{ height: `${height}%` }}
            animate={{ height: [`${height}%`, `${Math.min(height + 45, 92)}%`, `${height}%`] }}
            transition={{ duration: 1.8, delay: index * 0.13, repeat: Infinity, repeatDelay: 1.2 }}
          />
        ))}
      </span>

      <span className="min-w-0 flex-1 md:flex md:items-center md:gap-4">
        <span className="flex items-center gap-2 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground md:shrink-0">
          <span className="relative flex h-2 w-2">
            <motion.span
              className="absolute inset-0 rounded-full bg-primary-foreground"
              animate={{ scale: [1, 3.2], opacity: [0.55, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="relative h-2 w-2 rounded-full bg-primary-foreground"
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <motion.span
            animate={{ opacity: [1, 0.78, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Now live
          </motion.span>
        </span>
        <span className="block truncate text-[14px] font-semibold leading-tight text-background md:text-[15px]">
          The Agentic Value Audit
          <span className="hidden font-normal text-background/55 sm:inline">: See what agents quote for your brand</span>
        </span>
      </span>

      <span className="hidden h-7 w-px bg-background/15 md:block" aria-hidden />
      <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-background transition-colors group-hover:text-primary">
        <span className="hidden sm:inline">Run free</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>

    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onDismiss}
      className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 text-background/45 hover:bg-background/10 hover:text-background md:right-4"
      aria-label="Dismiss announcement"
    >
      <X className="h-4 w-4" strokeWidth={1.75} />
    </Button>
  </div>
);

export default AnnouncementBanner;