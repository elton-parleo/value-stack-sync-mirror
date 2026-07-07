import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  /** Small overline label — nav-linked category, e.g. "Framework". */
  eyebrow?: string;
  /** Optional index label rendered before the eyebrow, e.g. "02". */
  eyebrowNumber?: string;
  /** Lead phrase of the headline (rendered in full foreground weight). */
  children: ReactNode;
  /** Optional secondary phrase rendered in a muted or primary tone. */
  accent?: ReactNode;
  accentTone?: "muted" | "primary";
  /** Optional supporting paragraph rendered directly beneath the headline. */
  body?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  /** Constrain the headline block. Use px or ch. Defaults to no cap. */
  maxWidth?: string;
  bodyMaxWidth?: string;
  className?: string;
};

/**
 * Unified section heading used across every landing section.
 * Handles eyebrow → hairline → accent phrase → optional body copy
 * with consistent motion and rhythm.
 */
const SectionHeading = ({
  eyebrow,
  eyebrowNumber,
  children,
  accent,
  accentTone = "muted",
  body,
  dark = false,
  align = "left",
  maxWidth,
  bodyMaxWidth,
  className,
}: Props) => {
  const accentClass =
    accentTone === "primary"
      ? "text-primary"
      : dark
        ? "text-background/45"
        : "text-foreground/42";

  const bodyClass = dark ? "section-copy section-copy-dark" : "section-copy";

  return (
    <div
      className={cn(align === "center" && "text-center", className)}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mb-5 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            dark ? "text-background/55" : "text-foreground/55",
          )}
        >
          <span
            className={cn(
              "inline-block h-px w-7",
              dark ? "bg-background/25" : "bg-primary/70",
            )}
          />
          {eyebrowNumber && (
            <span className={dark ? "text-background/75" : "text-primary/85"}>
              {eyebrowNumber}
            </span>
          )}
          <span>{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={cn(
          "section-heading",
          dark ? "section-heading-dark" : "text-foreground",
        )}
      >
        {children}
        {accent && (
          <>
            {" "}
            <span className={accentClass}>{accent}</span>
          </>
        )}
      </motion.h2>

      {body && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className={cn(bodyClass, "mt-5")}
          style={bodyMaxWidth ? { maxWidth: bodyMaxWidth } : undefined}
        >
          {body}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
