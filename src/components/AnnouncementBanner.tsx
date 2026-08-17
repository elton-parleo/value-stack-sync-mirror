import { X } from "lucide-react";

const AUDIT_URL = "https://audit.parleo.io/";

type Props = { onDismiss: () => void };

/**
 * Launch bar for the free Agentic Value Audit.
 * Dark ink strip with a blue signal chip: reads as a product announcement,
 * not a marketing ribbon. Full-bleed, hairline-separated from the nav.
 */
const AnnouncementBanner = ({ onDismiss }: Props) => (
  <div className="relative isolate overflow-hidden bg-code-bg">
    {/* blue burn from the right, matched to the site light-burn language */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(45% 120% at 88% 50%, hsl(213 99% 50% / 0.30) 0%, transparent 70%)",
      }}
    />
    <div className="mx-auto flex h-9 max-w-content items-center justify-center gap-3 px-10 md:px-20">
      <a
        href={AUDIT_URL}
        className="group inline-flex min-w-0 items-center gap-2.5 md:gap-3"
      >
        <span className="hidden items-center gap-1.5 rounded-full bg-primary px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-primary-foreground sm:inline-flex">
          <span className="inline-block h-1 w-1 rounded-full bg-primary-foreground animate-pulse-dot" />
          New
        </span>
        <span className="truncate text-[12.5px] text-background/75 transition-colors group-hover:text-background md:text-[13px]">
          The free Agentic Value Audit is live.{" "}
          <span className="hidden text-background/45 sm:inline">
            Score how much of your funded value agents can actually quote.
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12.5px] font-medium text-primary">
          Run it free
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
    <button
      onClick={onDismiss}
      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-background/40 transition-colors hover:bg-background/10 hover:text-background md:right-6"
      aria-label="Dismiss announcement"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2} />
    </button>
  </div>
);

export default AnnouncementBanner;
