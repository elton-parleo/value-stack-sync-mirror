import type { Block } from "@/content/insights";

const PostBody = ({ blocks }: { blocks: Block[] }) => (
  <div className="flex flex-col gap-6">
    {blocks.map((b, i) => {
      switch (b.type) {
        case "h":
          return (
            <h2
              key={i}
              className="mt-6 text-[22px] font-heading text-foreground md:text-[26px]"
            >
              {b.text}
            </h2>
          );
        case "list":
          return (
            <ul key={i} className="flex flex-col gap-2.5 border-l border-primary/25 pl-5">
              {b.items.map((it) => (
                <li
                  key={it}
                  className="text-[15px] leading-[1.6] text-foreground/70 md:text-[16.5px]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {it}
                </li>
              ))}
            </ul>
          );
        case "stat":
          return (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-2xl border border-border bg-card px-6 py-5 md:flex-row md:items-baseline md:gap-6"
            >
              <span
                className="text-[30px] font-heading leading-none text-primary md:text-[36px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {b.value}
              </span>
              <span className="text-[13.5px] leading-[1.5] text-foreground/60 md:text-[14.5px]">
                {b.label}
              </span>
            </div>
          );
        case "quote":
          return (
            <blockquote
              key={i}
              className="border-l-2 border-primary pl-5 text-[18px] font-heading leading-[1.35] text-foreground md:text-[21px]"
            >
              {b.text}
            </blockquote>
          );
        default:
          return (
            <p
              key={i}
              className="text-[15.5px] leading-[1.68] text-foreground/72 md:text-[17px]"
            >
              {b.text}
            </p>
          );
      }
    })}
  </div>
);

export default PostBody;
