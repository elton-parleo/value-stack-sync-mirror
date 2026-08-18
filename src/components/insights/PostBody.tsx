import { Fragment, type ReactNode } from "react";
import type { Block, Pillar } from "@/content/insights";

/** Renders inline markdown links: [label](https://url) */
const RichText = ({ text }: { text: string }) => {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={m.index}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline decoration-primary/40 decoration-1 underline-offset-[3px] transition-colors hover:decoration-primary"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
};

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
          default: {
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
        }
      })}
    </div>
  );
};

export default PostBody;
