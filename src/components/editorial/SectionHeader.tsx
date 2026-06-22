import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  index: string;
  kicker: string;
  title: ReactNode;
  standfirst?: ReactNode;
  align?: "left" | "wide";
  titleClassName?: string;
};

/**
 * Editorial section header: monospaced index + kicker on a hairline rule,
 * with the section H2 and optional standfirst below.
 * The single repeated frame used across every landing section.
 */
const SectionHeader = ({
  index,
  kicker,
  title,
  standfirst,
  align = "left",
  titleClassName = "",
}: Props) => (
  <motion.header
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="w-full"
  >
    <div className="flex items-center justify-between gap-4 pb-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45 tabular-nums">
        {index} <span className="text-foreground/25">/</span>{" "}
        <span className="text-foreground/55">{kicker}</span>
      </span>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/35 sm:inline">
        Parleo · Field guide
      </span>
    </div>
    <div
      aria-hidden
      className="h-px w-full"
      style={{ background: "hsl(var(--border) / 0.85)" }}
    />
    <h2
      className={`section-heading mt-7 text-foreground md:mt-9 ${
        align === "wide" ? "max-w-[24ch]" : "max-w-[20ch]"
      } ${titleClassName}`}
      style={{ fontFeatureSettings: '"ss01", "cv11"' }}
    >
      {title}
    </h2>
    {standfirst && (
      <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.6] text-foreground/65 md:mt-5 md:text-[17px]">
        {standfirst}
      </p>
    )}
  </motion.header>
);

export default SectionHeader;
