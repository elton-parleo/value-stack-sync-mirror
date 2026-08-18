import { ArrowUpRight, X } from "lucide-react";
import { motion } from "framer-motion";

const AUDIT_URL = "https://audit.parleo.io/";

type Props = { onDismiss: () => void };

const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="relative overflow-hidden bg-code-bg">
    {/* score meter that fills once, reading as a live audit signal */}
    <motion.div
      aria-hidden
      className="absolute bottom-0 left-0 h-[2px] bg-primary"
      initial={{ width: "0%" }}
      animate={{ width: "59%" }}
      transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-background/10" />

    <a
      href={AUDIT_URL}
      className="group mx-auto flex h-9 max-w-content items-center gap-2.5 px-5 sm:justify-center md:px-20"
    >
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2 py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-primary">
        <motion.span
          className="h-1 w-1 rounded-full bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Live
      </span>

      <span className="truncate text-[12.5px] font-medium text-background/85">
        Agentic Value Audit
      </span>

      <span aria-hidden className="hidden h-3 w-px shrink-0 bg-background/20 sm:block" />

      {/* the proof: a real sample score, not a slogan */}
      <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
        <span className="font-mono text-[11px] tabular-nums text-background/45">
          Avg brand score
        </span>
        <span className="font-mono text-[11.5px] font-semibold tabular-nums text-background">
          59<span className="text-background/40">/100</span>
        </span>
      </span>

      <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-[3px] text-[11.5px] font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:ml-3">
        Run free
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>

    <button
      type="button"
      onClick={onDismiss}
      className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-background/35 transition-colors hover:bg-background/10 hover:text-background md:right-3"
      aria-label="Dismiss announcement"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2} />
    </button>
  </div>
);

export default AnnouncementBanner;
