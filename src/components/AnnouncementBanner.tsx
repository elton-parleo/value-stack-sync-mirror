import { ArrowUpRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AUDIT_URL = "https://audit.parleo.io/";

type Props = { onDismiss: () => void };

const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="relative overflow-hidden border-b border-background/10 bg-code-bg">
    <motion.div
      aria-hidden
      className="absolute bottom-0 left-0 h-px bg-primary"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    />
    <div className="mx-auto flex h-10 max-w-content items-center justify-center px-11 md:px-20">
      <a
        href={AUDIT_URL}
        className="group flex min-w-0 items-center gap-3"
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/50">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.65, 1], opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="truncate text-[12px] font-medium text-background/80 transition-colors group-hover:text-background sm:text-[13px]">
          Agentic Value Audit is live
        </span>
        <span className="hidden h-3 w-px bg-background/20 sm:block" />
        <span className="hidden text-[12px] text-background/45 md:block">
          See the price agents can actually quote
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-primary sm:text-[13px]">
          Run free <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={onDismiss}
      className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-background/45 hover:bg-background/10 hover:text-background md:right-4"
      aria-label="Dismiss announcement"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2} />
    </Button>
  </div>
);

export default AnnouncementBanner;
