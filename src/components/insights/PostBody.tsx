import type { Block } from "@/content/insights";

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
              <ul key={i} className="flex flex-col divide-y divide-border/70 rounded-xl border border-border bg-card/60">
                {b.items.map((it, idx) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-4 px-5 py-3.5 text-[15px] leading-[1.5] text-foreground/75 md:text-[16px]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <span className="font-mono text-[10.5px] tabular-nums text-foreground/30">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {it}
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
                    className="font-display text-[38px] leading-none text-foreground md:text-[48px]"
                    style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
                  >
                    {b.value}
                  </span>
                  <figcaption className="max-w-[320px] text-[13px] leading-[1.5] text-foreground/55 md:text-[14px]">
                    {b.label}
                  </figcaption>
                </div>
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="relative my-2 pl-6 md:pl-8">
                <span aria-hidden className="absolute left-0 top-1 h-[calc(100%-8px)] w-[2px] bg-primary" />
                <p
                  className="font-display text-[20px] leading-[1.24] text-foreground md:text-[26px]"
                  style={{ letterSpacing: "-0.025em", textWrap: "balance" }}
                >
                  {b.text}
                </p>
              </blockquote>
            );
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
                {b.text}
              </p>
            );
          }
        }
      })}
    </div>
  );
};

export default PostBody;
