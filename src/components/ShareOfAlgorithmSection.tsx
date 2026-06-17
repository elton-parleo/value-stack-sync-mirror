import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import skiiProduct from "@/assets/sk-ii-facial-treatment-essence.png.asset.json";

const layers = [
  { name: "Discovery", value: "Seen", strength: "92%", width: "92%" },
  { name: "Catalog", value: "Readable", strength: "64%", width: "64%" },
  { name: "True Value", value: "Resolved", strength: "12%", width: "12%", parleo: true },
];

const merchants = [
  { name: "Amazon", price: "$245", rank: "01", muted: true },
  { name: "Sephora", price: "$245", rank: "02", muted: true },
  { name: "Saks", price: "$245", rank: "03", muted: true },
  { name: "Nordstrom", price: "$245", rank: "04", muted: true },
];

const resolved = [
  { name: "Nordstrom", price: "$222.95", rank: "01", win: true },
  { name: "Bloomingdale's", price: "$225.40", rank: "02" },
  { name: "Saks", price: "$230.30", rank: "03" },
];

const ShareOfAlgorithmSection = () => {
  return (
    <AnimatedSection id="share-of-algorithm" className="relative bg-background py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <h2 className="font-display text-[44px] text-foreground md:text-[72px]" style={{ lineHeight: 0.98 }}>
            The new shelf is decided by <span className="text-primary">agents.</span>
          </h2>
          <p className="max-w-[460px] text-[18px] leading-[1.55] text-foreground/65 md:text-[20px]">
            Search made visibility measurable. APIs made catalogs readable. Parleo makes the real offer visible before an agent ranks the shelf.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-card md:mt-16"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <div className="grid md:grid-cols-[0.95fr_1.15fr]">
            <div className="relative min-h-[560px] border-b border-border bg-secondary/35 p-6 md:border-b-0 md:border-r md:p-8">
              <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-border md:left-8" />
              <div className="relative space-y-5">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`relative ml-6 rounded-2xl border p-5 ${
                      layer.parleo
                        ? "border-primary/35 bg-code-bg text-background"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    <span className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 ${layer.parleo ? "border-primary bg-primary" : "border-card bg-foreground/30"}`} />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`text-[15px] font-semibold ${layer.parleo ? "text-background" : "text-foreground"}`}>{layer.name}</div>
                        <div className={`mt-1 text-[13px] ${layer.parleo ? "text-background/55" : "text-foreground/50"}`}>{layer.value}</div>
                      </div>
                      <div className={`font-display text-[30px] leading-none tabular-nums ${layer.parleo ? "text-primary" : "text-foreground/35"}`}>
                        {layer.strength}
                      </div>
                    </div>
                    <div className={`mt-5 h-2 overflow-hidden rounded-full ${layer.parleo ? "bg-background/10" : "bg-foreground/[0.08]"}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: layer.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${layer.parleo ? "bg-primary" : "bg-foreground/45"}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-8 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary/60">
                    <img src={skiiProduct.url} alt="SK-II Facial Treatment Essence product" className="h-20 w-auto object-contain mix-blend-multiply" loading="lazy" />
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold leading-tight text-foreground">SK-II Facial Treatment Essence</div>
                    <p className="mt-2 text-[13px] leading-snug text-foreground/55">One product can look identical to a crawler and completely different to a qualified customer.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-5 lg:grid-cols-2">
                <ShelfPanel title="What agents rank today" items={merchants} />
                <ShelfPanel title="What Parleo resolves" items={resolved} dark />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-2xl border border-border bg-secondary/35 p-5">
                  <div className="text-[42px] font-bold leading-none tracking-tight text-foreground/35 tabular-nums">$245</div>
                  <div className="mt-2 text-[14px] leading-snug text-foreground/55">Sticker price flattens the shelf.</div>
                </div>
                <div className="hidden h-px w-12 bg-primary md:block" />
                <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-5">
                  <div className="text-[42px] font-bold leading-none tracking-tight text-primary tabular-nums">$222.95</div>
                  <div className="mt-2 text-[14px] leading-snug text-foreground/70">True cost changes the winner.</div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="grid grid-cols-[0.9fr_1.1fr] border-b border-border">
                  <div className="p-5">
                    <div className="text-[13px] text-foreground/50">Before</div>
                    <div className="mt-1 text-[24px] font-semibold leading-tight text-foreground">Agents see a tie.</div>
                  </div>
                  <div className="border-l border-border bg-code-bg p-5">
                    <div className="text-[13px] text-background/50">After</div>
                    <div className="mt-1 text-[24px] font-semibold leading-tight text-background">Parleo exposes the advantage.</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-border">
                  {[
                    ["Loyalty", "tier"],
                    ["Card", "offer"],
                    ["Margin", "rule"],
                  ].map(([a, b]) => (
                    <div key={a} className="p-4 text-center">
                      <div className="text-[15px] font-semibold text-foreground">{a}</div>
                      <div className="text-[12px] text-foreground/45">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

const ShelfPanel = ({
  title,
  items,
  dark = false,
}: {
  title: string;
  items: { name: string; price: string; rank: string; win?: boolean; muted?: boolean }[];
  dark?: boolean;
}) => (
  <div className={`rounded-2xl border p-4 ${dark ? "border-primary/30 bg-code-bg" : "border-border bg-secondary/35"}`}>
    <div className={`mb-4 text-[15px] font-semibold ${dark ? "text-background" : "text-foreground"}`}>{title}</div>
    <div className="space-y-2.5">
      {items.map((item) => (
        <div
          key={item.name}
          className={`grid grid-cols-[28px_34px_auto] items-center gap-3 rounded-xl border px-3 py-3 ${
            dark
              ? item.win
                ? "border-primary/45 bg-primary/[0.10]"
                : "border-background/10 bg-background/[0.035]"
              : "border-border bg-card"
          }`}
        >
          <div className={`font-mono text-[11px] tabular-nums ${dark ? "text-background/45" : "text-foreground/45"}`}>{item.rank}</div>
          <span className={`flex h-8 w-8 items-center justify-center rounded-md ${dark ? "bg-background/10" : "bg-secondary/70"}`}>
            <BrandLogo name={item.name} size={17} grayscale={!item.win} />
          </span>
          <div className={`font-mono text-[12px] font-semibold tabular-nums ${item.win ? "text-primary" : dark ? "text-background/65" : "text-foreground/50"}`}>{item.price}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ShareOfAlgorithmSection;