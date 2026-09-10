import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type {
  BarItem,
  Block,
  EraItem,
  FlowStep,
  GridItem,
  LadderItem,
  Leak,
  Pillar,
  RecordRow,
  Source,
} from "@/content/insights";

const LINK_CLS =
  "text-foreground underline decoration-primary/40 decoration-1 underline-offset-[3px] transition-colors hover:decoration-primary";

/** Renders inline markdown links: [label](https://url). Internal links stay in-app. */
const RichText = ({ text }: { text: string }) => {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2];
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} to={href} className={LINK_CLS}>
          {m[1]}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noreferrer" className={LINK_CLS}>
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
};

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const Caption = ({ children }: { children: ReactNode }) => (
  <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-foreground/40">
    {children}
  </figcaption>
);

const Frame = ({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border ${
      dark ? "border-transparent bg-[#0E0E14]" : "border-border bg-[#EAE8E5]"
    } ${className}`}
  >
    <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full bg-primary" />
    {children}
  </div>
);

/** Pipeline: the four steps a product takes to reach an answer, with what drops out. */
const FlowBlock = ({ steps, caption }: { steps: FlowStep[]; caption?: string }) => (
  <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
    <Frame>
      <ol className="relative grid md:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.label}
            className={`relative flex flex-col px-5 pb-6 pt-6 md:px-5 ${
              i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 font-mono text-[10.5px] tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">
                {s.label}
              </span>
            </div>
            <h3
              className="mt-4 font-heading text-[17px] leading-[1.15] text-foreground"
              style={{ letterSpacing: "-0.015em" }}
            >
              {s.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.5] text-foreground/60">{s.text}</p>
            {s.drop && (
              <div className="mt-5 flex items-start gap-2 border-t border-dashed border-foreground/20 pt-3">
                <span
                  aria-hidden
                  className="mt-[3px] block h-[10px] w-[10px] shrink-0 rounded-full border-2 border-warning bg-warning/15"
                />
                <span className="text-[12px] leading-[1.45] text-foreground/60">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-warning">
                    Drops out{" "}
                  </span>
                  <br />
                  <span className="line-through decoration-foreground/40">{s.drop}</span>
                </span>
              </div>
            )}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-[9px] top-[27px] hidden h-[18px] w-[18px] rotate-45 border-r border-t border-border bg-[#EAE8E5] md:block"
              />
            )}
          </li>
        ))}
      </ol>
    </Frame>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

/** Horizontal comparison bars. */
const BarsBlock = ({
  title,
  items,
  max,
  caption,
}: {
  title?: string;
  items: BarItem[];
  max?: number;
  caption?: string;
}) => {
  const top = max ?? Math.max(...items.map((i) => i.value));
  return (
    <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
      <Frame>
        <div className="px-6 py-6 md:px-8">
          {title && (
            <div className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">
              {title}
            </div>
          )}
          <div className="flex flex-col gap-5">
            {items.map((it) => (
              <div key={it.label} className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end md:gap-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13.5px] text-foreground/70">{it.label}</span>
                    <span
                      className={`font-display text-[26px] leading-none md:text-[32px] ${
                        it.highlight ? "text-primary" : "text-foreground"
                      }`}
                      style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
                    >
                      {it.display}
                    </span>
                  </div>
                  <div className="mt-2 h-[8px] w-full overflow-hidden rounded-full bg-foreground/[0.08]">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max((it.value / top) * 100, 0.6)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      className={`block h-full rounded-full ${
                        it.highlight ? "bg-primary" : "bg-foreground/35"
                      }`}
                    />
                  </div>
                  {it.note && (
                    <p className="mt-1.5 text-[12px] leading-[1.45] text-foreground/50">{it.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
      {caption && <Caption>{caption}</Caption>}
    </motion.figure>
  );
};

/** Price ladder: every published rung, and the one the agent read. */
const LadderBlock = ({
  title,
  items,
  caption,
}: {
  title: string;
  items: LadderItem[];
  caption?: string;
}) => (
  <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
    <Frame>
      <div className="flex items-center justify-between border-b border-border px-6 py-3.5 md:px-8">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">
          {title}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
          <span className="h-[6px] w-[6px] rounded-full bg-primary" /> quoted by the agent
        </span>
      </div>
      <ol className="divide-y divide-border">
        {items.map((it, i) => (
          <li
            key={it.label}
            className={`grid grid-cols-[28px_1fr_auto] items-center gap-4 px-6 py-4 md:px-8 ${
              it.quoted ? "bg-primary/[0.06]" : ""
            }`}
          >
            <span className="font-mono text-[10.5px] tabular-nums text-foreground/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div
                className={`text-[14.5px] ${it.quoted ? "text-foreground" : "text-foreground/65"}`}
              >
                {it.label}
              </div>
              {it.note && <div className="mt-0.5 text-[12px] text-foreground/45">{it.note}</div>}
            </div>
            <span
              className={`font-display text-[22px] leading-none md:text-[26px] ${
                it.quoted ? "text-primary" : "text-foreground/55"
              }`}
              style={{ letterSpacing: "-0.035em", fontVariantNumeric: "tabular-nums" }}
            >
              {it.price}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

/** A merchant record or answer window with the lines the agent never reads greyed out. */
const RecordBlock = ({
  title,
  rows,
  caption,
  legend = ["Read by the agent", "In the data, never read"],
}: {
  title: string;
  rows: RecordRow[];
  caption?: string;
  legend?: [string, string];
}) => (
  <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
    <Frame dark>
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-7">
        <div className="flex items-center gap-2">
          <span className="h-[8px] w-[8px] rounded-full bg-white/15" />
          <span className="h-[8px] w-[8px] rounded-full bg-white/15" />
          <span className="h-[8px] w-[8px] rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
            {title}
          </span>
        </div>
        <div className="hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.1em] sm:flex">
          <span className="flex items-center gap-1.5 text-white/60">
            <span className="h-[6px] w-[6px] rounded-full bg-primary" /> {legend[0]}
          </span>
          <span className="flex items-center gap-1.5 text-white/30">
            <span className="h-[6px] w-[6px] rounded-full border border-white/30" /> {legend[1]}
          </span>
        </div>
      </div>
      <dl className="px-5 py-4 font-mono text-[12.5px] leading-[1.7] md:px-7 md:text-[13px]">
        {rows.map((r) => (
          <div
            key={r.key}
            className={`grid grid-cols-[minmax(120px,38%)_1fr] gap-4 border-b border-white/[0.05] py-1.5 last:border-0 ${
              r.unread ? "text-white/25" : "text-white/85"
            }`}
          >
            <dt className={r.unread ? "line-through decoration-white/20" : "text-primary/90"}>
              {r.key}
            </dt>
            <dd className={r.unread ? "line-through decoration-white/20" : ""}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </Frame>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

/** Four measurement eras with their spend anchors. */
const ErasBlock = ({ items, caption }: { items: EraItem[]; caption?: string }) => (
  <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {items.map((e, i) => (
        <div
          key={e.era}
          className={`relative overflow-hidden rounded-2xl border px-5 py-5 ${
            e.current ? "border-transparent bg-[#0E0E14]" : "border-border bg-card"
          }`}
        >
          <span
            aria-hidden
            className={`absolute left-0 top-0 h-[2px] w-full ${e.current ? "bg-primary" : "bg-border"}`}
          />
          <div className="flex items-center justify-between">
            <span
              className={`font-mono text-[10.5px] tabular-nums ${
                e.current ? "text-primary" : "text-foreground/35"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                e.current ? "text-white/40" : "text-foreground/40"
              }`}
            >
              {e.period}
            </span>
          </div>
          <h3
            className={`mt-4 font-heading text-[16px] leading-[1.15] ${
              e.current ? "text-white" : "text-foreground"
            }`}
            style={{ letterSpacing: "-0.015em" }}
          >
            {e.era}
          </h3>
          <p className={`mt-1.5 text-[12.5px] leading-[1.45] ${e.current ? "text-white/50" : "text-foreground/55"}`}>
            {e.unit}
          </p>
          <div
            className={`mt-6 font-display leading-none ${
              e.current ? "text-primary" : "text-foreground"
            } ${e.spend.length > 5 ? "text-[26px]" : "text-[32px]"}`}
            style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
          >
            {e.spend}
          </div>
          <div
            className={`mt-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
              e.current ? "text-white/40" : "text-foreground/40"
            }`}
          >
            {e.current ? "forecast, uncounted" : "measured"}
          </div>
        </div>
      ))}
    </div>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

/** Grid of big numbers. */
const GridBlock = ({ items, caption }: { items: GridItem[]; caption?: string }) => (
  <motion.figure {...reveal} className="my-4 flex flex-col gap-3">
    <Frame>
      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 md:grid-cols-3">
        {items.map((g, i) => (
          <div
            key={g.label}
            className={`flex flex-col px-6 py-5 ${
              i % 3 !== 0 ? "md:border-l md:border-border" : ""
            } ${i % 2 !== 0 ? "sm:border-l sm:border-border md:border-l-0" : ""} ${
              i >= 3 ? "md:border-t md:border-border" : ""
            } ${i >= 2 ? "sm:border-t sm:border-border" : ""}`}
          >
            <span
              className="font-display text-[30px] leading-none text-foreground md:text-[34px]"
              style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
            >
              {g.value}
            </span>
            <span className="mt-2 text-[13px] leading-[1.45] text-foreground/65">{g.label}</span>
            {g.source && (
              <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/40">
                {g.source}
              </span>
            )}
          </div>
        ))}
      </div>
    </Frame>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

/** Sources ledger with outbound links. */
const SourcesBlock = ({ items }: { items: Source[] }) => (
  <section aria-labelledby="sources" className="mt-6 border-t border-border pt-7">
    <h2 id="sources" className="font-heading text-[16px] text-foreground">
      Sources
    </h2>
    <ol className="mt-4 flex flex-col divide-y divide-border/70">
      {items.map((s, i) => (
        <li key={i} className="grid grid-cols-[28px_1fr] gap-3 py-3">
          <span className="font-mono text-[10.5px] tabular-nums text-foreground/30">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="text-[13px] leading-[1.5]">
            <span className="text-foreground/70">{s.claim}</span>
            <div className="mt-0.5 text-[12.5px] text-foreground/45">
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer" className={LINK_CLS}>
                  {s.source}
                </a>
              ) : (
                <span>{s.source}</span>
              )}
              <span className="px-1.5 text-foreground/25">·</span>
              <span>{s.date}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const PillarsBlock = ({ total, items }: { total: number; items: Pillar[] }) => (
  <figure className="my-4 flex flex-col gap-3">
    {/* Weight bar */}
    <div className="flex h-11 w-full overflow-hidden rounded-lg border border-border">
      {items.map((p) => (
        <div
          key={p.name}
          style={{ flexGrow: p.points }}
          className={`flex items-center gap-2 px-3 ${
            p.highlight
              ? "bg-primary text-primary-foreground"
              : "bg-[#1A1A22] text-white/70"
          }`}
        >
          <span
            className="font-display text-[17px] leading-none"
            style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}
          >
            {p.points}
          </span>
          <span className="truncate text-[12px]">{p.name}</span>
        </div>
      ))}
    </div>

    <div className="grid gap-3 md:grid-cols-2">
      {items.map((p) => (
        <div
          key={p.name}
          className={`relative overflow-hidden rounded-2xl border px-5 py-5 ${
            p.highlight
              ? "border-transparent bg-[#0E0E14] md:col-span-2"
              : "border-border bg-card"
          }`}
        >
          {p.highlight && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-20 h-[260px] w-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, hsl(var(--primary) / 0.3), transparent 70%)",
              }}
            />
          )}
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <h3
                className={`font-heading text-[19px] leading-none ${
                  p.highlight ? "text-white" : "text-foreground"
                }`}
                style={{ letterSpacing: "-0.02em" }}
              >
                {p.name}
              </h3>
              <p
                className={`mt-2 max-w-[340px] text-[13.5px] leading-[1.5] ${
                  p.highlight ? "text-white/55" : "text-foreground/55"
                }`}
              >
                {p.question}
              </p>
            </div>
            <span
              className={`font-display text-[34px] leading-none ${
                p.highlight ? "text-primary" : "text-foreground/85"
              }`}
              style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}
            >
              {p.points}
            </span>
          </div>

          <div
            className={`relative mt-4 grid gap-2 ${p.highlight ? "md:grid-cols-2" : ""}`}
          >
            {p.dimensions.map((d) => (
              <div
                key={d.label}
                className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[13.5px] ${
                  p.highlight
                    ? "bg-white/[0.05] text-white/80"
                    : "bg-background text-foreground/75"
                }`}
              >
                <span>{d.label}</span>
                <span
                  className={p.highlight ? "text-primary" : "text-foreground/40"}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {d.points}
                </span>
              </div>
            ))}
          </div>

          {p.note && (
            <p
              className={`relative mt-3.5 text-[12.5px] leading-[1.5] ${
                p.highlight ? "text-white/45" : "text-foreground/45"
              }`}
            >
              {p.note}
            </p>
          )}
        </div>
      ))}
    </div>

    <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-foreground/40">
      {total} points, one straight sum
    </figcaption>
  </figure>
);

/** True Value dimension breakdown: weight rail + labelled cards. */
const LeaksBlock = ({ total, items }: { total: number; items: Leak[] }) => (
  <figure className="my-4 overflow-hidden rounded-2xl border border-border bg-card">
    <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4 md:px-7">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">
        True Value dimensions
      </span>
      <span
        className="font-display text-[20px] leading-none text-foreground"
        style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}
      >
        {total}
        <span className="text-foreground/35"> pts</span>
      </span>
    </div>

    <div className="divide-y divide-border">
      {items.map((it, idx) => (
        <div key={it.name} className="grid gap-3 px-5 py-5 md:grid-cols-[168px_1fr] md:gap-7 md:px-7">
          <div className="flex items-start gap-3">
            <span className="mt-[5px] font-mono text-[10.5px] tabular-nums text-foreground/30">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="font-heading text-[16px] leading-tight text-foreground"
                style={{ letterSpacing: "-0.01em" }}
              >
                {it.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="font-display text-[15px] leading-none text-foreground/80"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {it.points}
                </span>
                <span className="h-[3px] w-[72px] overflow-hidden rounded-full bg-border">
                  <span
                    className={`block h-full rounded-full ${it.highlight ? "bg-primary" : "bg-foreground/45"}`}
                    style={{ width: `${(it.points / 16) * 100}%` }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[13.5px] leading-[1.5] text-foreground/50">{it.test}</p>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-foreground/75 md:text-[15.5px]">
              {it.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  </figure>
);

const PostBody = ({ blocks }: { blocks: Block[] }) => {

  let headingIndex = 0;
  let firstParagraph = true;

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h": {
            headingIndex += 1;
            const n = String(headingIndex).padStart(2, "0");
            return (
              <div key={i} className="mt-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-primary">
                    {n}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h2
                  className="max-w-[560px] font-heading text-[22px] leading-[1.14] text-foreground md:text-[27px]"
                  style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
                >
                  {b.text}
                </h2>
              </div>
            );
          }
          case "list":
            return (
              <ul
                key={i}
                className="flex flex-col divide-y divide-border/70 rounded-xl border border-border bg-card/60"
              >
                {b.items.map((it, idx) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-4 px-5 py-3.5 text-[15px] leading-[1.5] text-foreground/75 md:text-[16px]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <span className="font-mono text-[10.5px] tabular-nums text-foreground/30">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "stat":
            return (
              <figure
                key={i}
                className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-6 md:px-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: "34px 100%",
                    maskImage: "linear-gradient(to right, black, transparent 70%)",
                    WebkitMaskImage: "linear-gradient(to right, black, transparent 70%)",
                  }}
                />
                <span aria-hidden className="absolute left-0 top-0 h-full w-[2px] bg-primary" />
                <div className="relative flex flex-col gap-2 md:flex-row md:items-baseline md:gap-7">
                  <span
                    className="shrink-0 font-display text-[38px] leading-none text-foreground md:text-[48px]"
                    style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
                  >
                    {b.value}
                  </span>
                  <figcaption className="max-w-[380px] text-[13px] leading-[1.5] text-foreground/55 md:text-[14px]">
                    {b.label}
                  </figcaption>
                </div>
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="relative my-2 pl-6 md:pl-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-[calc(100%-8px)] w-[2px] bg-primary"
                />
                <p
                  className="font-display text-[20px] leading-[1.24] text-foreground md:text-[26px]"
                  style={{ letterSpacing: "-0.025em", textWrap: "balance" }}
                >
                  {b.text}
                </p>
              </blockquote>
            );
          case "pillars":
            return <PillarsBlock key={i} total={b.total} items={b.items} />;
          case "leaks":
            return <LeaksBlock key={i} total={b.total} items={b.items} />;
          case "flow":
            return <FlowBlock key={i} steps={b.steps} caption={b.caption} />;
          case "bars":
            return <BarsBlock key={i} title={b.title} items={b.items} max={b.max} caption={b.caption} />;
          case "ladder":
            return <LadderBlock key={i} title={b.title} items={b.items} caption={b.caption} />;
          case "record":
            return (
              <RecordBlock key={i} title={b.title} rows={b.rows} caption={b.caption} legend={b.legend} />
            );
          case "eras":
            return <ErasBlock key={i} items={b.items} caption={b.caption} />;
          case "grid":
            return <GridBlock key={i} items={b.items} caption={b.caption} />;
          case "sources":
            return <SourcesBlock key={i} items={b.items} />;

          case "p": {
            const isLead = firstParagraph;
            firstParagraph = false;
            return (
              <p
                key={i}
                className={
                  isLead
                    ? "text-[17px] leading-[1.55] text-foreground/85 md:text-[19px]"
                    : "text-[15.5px] leading-[1.68] text-foreground/70 md:text-[17px]"
                }
              >
                <RichText text={b.text} />
              </p>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PostBody;
