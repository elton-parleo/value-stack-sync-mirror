type Props = {
  label?: string;
};

/**
 * Page-level breath divider: full-width hairline with a centered mono mark.
 * Sits between major sections to set rhythm.
 */
const SectionDivider = ({ label }: Props) => (
  <div className="mx-auto w-full max-w-content px-6 md:px-20">
    <div className="relative flex items-center justify-center py-6 md:py-10">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{ background: "hsl(var(--border) / 0.7)" }}
      />
      {label && (
        <span className="relative bg-background px-3 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35">
          {label}
        </span>
      )}
    </div>
  </div>
);

export default SectionDivider;
