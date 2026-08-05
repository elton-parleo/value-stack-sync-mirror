import { Block } from "@/content/blog/posts";

const ArticleBody = ({ blocks }: { blocks: Block[] }) => (
  <div className="flex flex-col gap-6">
    {blocks.map((block, i) => {
      switch (block.type) {
        case "h2":
          return (
            <h2
              key={i}
              id={`s-${i}`}
              className="card-heading mt-6 scroll-mt-28 text-[22px] md:text-[26px]"
            >
              {block.text}
            </h2>
          );
        case "h3":
          return (
            <h3 key={i} className="card-subheading mt-2 text-[16px] font-semibold">
              {block.text}
            </h3>
          );
        case "p":
          return (
            <p key={i} className="text-[16px] leading-[1.75] text-foreground/72 md:text-[17px]">
              {block.text}
            </p>
          );
        case "list":
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] leading-[1.65] text-foreground/70">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-sm bg-primary/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        case "quote":
          return (
            <blockquote
              key={i}
              className="border-l-2 border-primary/50 pl-5 text-[19px] font-medium leading-[1.4] tracking-[-0.02em] text-foreground md:text-[22px]"
            >
              {block.text}
              {block.attribution && (
                <span className="mt-2 block text-[12px] font-normal uppercase tracking-[0.12em] text-foreground/45">
                  {block.attribution}
                </span>
              )}
            </blockquote>
          );
        case "stat":
          return (
            <div
              key={i}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border-t-2 border-primary bg-border sm:grid-cols-3"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {block.items.map((s) => (
                <div key={s.label} className="bg-secondary/60 px-5 py-6">
                  <div className="text-[26px] font-bold tracking-[-0.03em] text-foreground tabular-nums md:text-[30px]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-foreground/55">{s.label}</div>
                </div>
              ))}
            </div>
          );
        case "callout":
          return (
            <div
              key={i}
              className="rounded-xl border border-primary/20 bg-primary/[0.04] px-6 py-5"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                {block.title}
              </div>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-foreground/80">{block.text}</p>
            </div>
          );
        case "code":
          return (
            <div
              key={i}
              className="overflow-hidden rounded-xl bg-code-bg"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/35">
                  {block.language}
                </span>
                <span className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-white/75">
                {block.code}
              </pre>
            </div>
          );
        case "table":
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    {block.head.map((h) => (
                      <th
                        key={h}
                        className="border-b border-border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/45"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} className="transition-colors hover:bg-secondary/50">
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`border-b border-border/60 px-4 py-3 text-[14px] ${
                            c === 0 ? "font-medium text-foreground" : "text-foreground/65"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return null;
      }
    })}
  </div>
);

export default ArticleBody;
