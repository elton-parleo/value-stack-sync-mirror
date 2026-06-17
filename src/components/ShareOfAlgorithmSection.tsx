import { motion } from "framer-motion";
import { Eye, FileCode2, Sparkles, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const eras = [
  {
    key: "shelf",
    year: "1960s",
    title: "Shelf",
    caption: "Share of Shelf",
    glyph: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="28" height="3" />
        <rect x="6" y="20" width="28" height="3" />
        <rect x="6" y="30" width="28" height="3" />
        <rect x="9" y="4" width="4" height="6" />
        <rect x="17" y="4" width="4" height="6" />
        <rect x="25" y="4" width="4" height="6" />
      </svg>
    ),
  },
  {
    key: "voice",
    year: "1980s",
    title: "Voice",
    caption: "Share of Voice",
    glyph: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="3" />
        <path d="M14 14 Q11 20 14 26" />
        <path d="M26 14 Q29 20 26 26" />
        <path d="M9 10 Q4 20 9 30" />
        <path d="M31 10 Q36 20 31 30" />
      </svg>
    ),
  },
  {
    key: "search",
    year: "2010s",
    title: "Search",
    caption: "Share of Search",
    glyph: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="17" cy="17" r="9" />
        <path d="M24 24 L33 33" />
      </svg>
    ),
  },
  {
    key: "algorithm",
    year: "2025",
    title: "Algorithm",
    caption: "Share of Algorithm",
    active: true,
    glyph: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="3" />
        <circle cx="6" cy="10" r="2.2" />
        <circle cx="34" cy="10" r="2.2" />
        <circle cx="6" cy="30" r="2.2" />
        <circle cx="34" cy="30" r="2.2" />
        <path d="M8 11 L18 19" />
        <path d="M32 11 L22 19" />
        <path d="M8 29 L18 21" />
        <path d="M32 29 L22 21" />
      </svg>
    ),
  },
];

const pillars = [
  {
    n: "01",
    icon: Eye,
    name: "Visibility",
    sub: "Can an agent see your product?",
    status: "Measured",
    coverage: "8 / 8",
    width: "100%",
  },
  {
    n: "02",
    icon: FileCode2,
    name: "Accessibility",
    sub: "Can an agent parse your catalog?",
    status: "Partial",
    coverage: "5 / 8",
    width: "62%",
  },
];

const dimensions = [
  { n: "06", title: "Incentive citation", body: "Loyalty, card, and bundled offers an agent can quote at runtime." },
  { n: "07", title: "Resolution accuracy", body: "True effective price across tiers, members, and stacked rules." },
  { n: "08", title: "True-value delta", body: "The dollars between sticker price and what the customer pays." },
];

const ShareOfAlgorithmSection = () => {
  return (
    <AnimatedSection id="share-of-algorithm" className="relative bg-background py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="max-w-[820px]">
          <h2 className="font-display text-[44px] text-foreground md:text-[72px]" style={{ lineHeight: 0.98 }}>
            The new shelf is decided by <span className="text-primary">agents.</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-[18px] leading-[1.55] text-foreground/65 md:text-[20px]">
            Visibility gets you considered. Accessibility gets you parsed. True Value gets you ranked. Parleo owns the layer that nobody else measures.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-3xl border border-border bg-card md:mt-16"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Era Timeline */}
          <div className="relative border-b border-border bg-secondary/30 px-6 py-8 md:px-10 md:py-10">
            <div className="mb-6 flex items-baseline justify-between">
              <div className="text-[13px] font-medium text-foreground/55">The distribution era</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">1960 — 2025</div>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-[26px] h-px bg-border" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-[26px] h-px bg-primary"
              />
              <div className="relative grid grid-cols-4 gap-4">
                {eras.map((era, i) => (
                  <motion.div
                    key={era.key}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
                    className="flex flex-col items-start"
                  >
                    <div
                      className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 ${
                        era.active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground/45"
                      }`}
                    >
                      {era.glyph}
                    </div>
                    <div className="mt-4 font-mono text-[11px] tabular-nums text-foreground/45">{era.year}</div>
                    <div
                      className={`mt-1 text-[15px] font-semibold ${era.active ? "text-foreground" : "text-foreground/70"}`}
                    >
                      {era.caption}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar Stack */}
          <div className="divide-y divide-border">
            {pillars.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="grid grid-cols-1 items-center gap-6 px-6 py-7 md:grid-cols-[80px_1fr_280px_140px] md:px-10 md:py-8"
              >
                <div className="flex items-center gap-4 md:block">
                  <div className="font-mono text-[12px] tabular-nums text-foreground/40">{p.n}</div>
                  <div className="mt-0 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60 text-foreground/55 md:mt-3">
                    <p.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <div className="text-[22px] font-semibold leading-tight text-foreground">{p.name}</div>
                  <div className="mt-1 text-[14px] text-foreground/55">{p.sub}</div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/45">
                    <span>Industry coverage</span>
                    <span className="tabular-nums text-foreground/70">{p.coverage}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: p.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-foreground/40"
                    />
                  </div>
                </div>
                <div className="flex md:justify-end">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground/65">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                    {p.status}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* True Value — dark hero row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative bg-code-bg text-background"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              <div className="px-6 py-10 md:px-10 md:py-12">
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[80px_1fr_280px_140px]">
                  <div className="flex items-center gap-4 md:block">
                    <div className="font-mono text-[12px] tabular-nums text-primary">03</div>
                    <div className="mt-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary md:mt-3">
                      <Sparkles className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Parleo layer</div>
                    <div className="mt-2 text-[26px] font-semibold leading-tight text-background md:text-[30px]">
                      True Value
                    </div>
                    <div className="mt-2 max-w-[440px] text-[14px] leading-[1.55] text-background/60">
                      The real offer after loyalty tier, card rules, member pricing, and stacked incentives resolve.
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-background/55">
                      <span>Industry coverage</span>
                      <span className="tabular-nums text-background/85">0 / 8</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-background/10">
                      <div className="h-full w-0 rounded-full bg-primary" />
                    </div>
                    <div className="mt-2 text-[11px] text-background/45">Unmeasured by every existing tool.</div>
                  </div>
                  <div className="flex md:justify-end">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground">
                      Owned by Parleo
                    </div>
                  </div>
                </div>

                {/* Three numbered dimension sub-cards */}
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {dimensions.map((d, i) => (
                    <motion.div
                      key={d.n}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                      className="rounded-2xl border border-background/10 bg-background/[0.035] p-5"
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="font-mono text-[11px] tabular-nums text-primary">{d.n}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-background/40">
                          Dimension
                        </div>
                      </div>
                      <div className="mt-3 text-[16px] font-semibold text-background">{d.title}</div>
                      <div className="mt-1.5 text-[13px] leading-[1.5] text-background/55">{d.body}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ShareOfAlgorithmSection;
