import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, FileCode2, Sparkles, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import LifestyleAccent from "./LifestyleAccent";

const eras = [
  {
    key: "shelf",
    year: "1960s",
    title: "Shelf",
    caption: "Share of Shelf",
    readout: "Endcap placement and aisle dominance decided what entered the basket.",
    signal: "Retail footprint",
    rank: "Physical availability",
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
    readout: "Media weight and brand memory shaped the set a shopper could recall.",
    signal: "Paid attention",
    rank: "Awareness",
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
    readout: "Crawlers rewarded the pages with the right keywords, links, and schema.",
    signal: "Indexed content",
    rank: "Relevance",
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
    readout: "Agents rank the product they can resolve into the strongest customer outcome.",
    signal: "Resolved true value",
    rank: "Recommendation",
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
    status: "Tooling exists",
    coverage: "32 pts",
    width: "64%",
  },
  {
    n: "02",
    icon: FileCode2,
    name: "Accessibility",
    sub: "Can an agent parse your catalog?",
    status: "Tooling exists",
    coverage: "18 pts",
    width: "36%",
  },
];

const dimensions = [
  { n: "01", title: "Incentive citation", body: "Loyalty, card, and bundled offers an agent can quote at runtime." },
  { n: "02", title: "Resolution accuracy", body: "True effective price across tiers, members, and stacked rules." },
  { n: "03", title: "True-value delta", body: "The dollars between list price and what the customer pays." },
];

const ShareOfAlgorithmSection = () => {
  const [activeEra, setActiveEra] = useState(3);
  const era = eras[activeEra];

  return (
    <AnimatedSection id="share-of-algorithm" className="relative overflow-hidden bg-background py-14 md:py-20">
      <LifestyleAccent variant="fragrance" corner="bl" size={52} opacity={0.42} blur={6} />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-20">
        <SectionHeading
          eyebrowNumber="02"
          eyebrow="Framework"
          body="The tools you already run measure whether agents can read you. None of them measure whether agents pick you."
          maxWidth="820px"
          bodyMaxWidth="600px"
        >
          Being visible is not the same as being chosen
        </SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-3xl border border-border bg-card md:mt-16"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Era Timeline */}
          <div className="relative border-b border-border bg-secondary/30 px-6 py-7 md:px-10 md:py-9">
            <div className="mb-6 flex items-baseline justify-between">
              <div className="text-[13px] font-medium text-foreground/55">Distribution era</div>
              <div className="font-mono text-[11px] tabular-nums text-foreground/40">1960 to 2025</div>
            </div>
            {/* Stepper rail — sits above the cards, connects the era dots cleanly */}
            <div className="relative mb-5 px-[6%] md:px-[10%]">
              <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-border md:left-[10%] md:right-[10%]" />
              <motion.div
                animate={{ width: `calc(${(activeEra / (eras.length - 1)) * 100}% * ${1 - 0.12} )` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[6%] top-1/2 h-px -translate-y-1/2 bg-primary md:left-[10%]"
              />
              <div className="relative flex items-center justify-between">
                {eras.map((era, i) => {
                  const isActive = activeEra === i;
                  const isPast = i < activeEra;
                  return (
                    <div key={era.key} className="flex flex-col items-center">
                      <motion.span
                        animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        className={`h-2.5 w-2.5 rounded-full ring-4 ring-secondary/30 transition-colors ${
                          isActive
                            ? "bg-primary"
                            : isPast
                              ? "bg-primary/50"
                              : "bg-border"
                        }`}
                      />
                      <span className="mt-2 hidden font-mono text-[10px] tabular-nums text-foreground/40 sm:block">
                        {era.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {eras.map((era, i) => (
                <motion.button
                  key={era.key}
                  type="button"
                  onClick={() => setActiveEra(i)}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  aria-pressed={activeEra === i}
                  aria-label={`Show ${era.caption}`}
                  className={`group flex cursor-pointer flex-col items-start rounded-2xl border p-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:p-4 ${
                    activeEra === i
                      ? "border-primary bg-card shadow-[0_14px_32px_-24px_hsl(var(--primary))]"
                      : "border-border bg-card/60 hover:border-primary/45 hover:bg-card"
                  }`}
                >
                  <motion.div
                    animate={activeEra === i ? { scale: 1.06 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-colors ${
                      activeEra === i
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_hsl(213_99%_50%/0.35)]"
                        : "border-border bg-card text-foreground/45 group-hover:border-foreground/40 group-hover:text-foreground/80"
                    }`}
                  >
                    {era.glyph}
                  </motion.div>
                  <div className="mt-4 font-mono text-[11px] tabular-nums text-foreground/45 sm:hidden">{era.year}</div>
                  <div
                    className={`mt-1 text-[15px] font-semibold transition-colors sm:mt-4 ${activeEra === i ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}
                  >
                    {era.caption}
                  </div>
                </motion.button>
              ))}
            </div>
            <motion.div
              key={era.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`mt-8 grid gap-3 rounded-2xl border p-5 transition-colors md:grid-cols-[1fr_180px_180px] md:items-center ${
                era.key === "algorithm" ? "border-primary/35 bg-code-bg" : "border-border bg-card"
              }`}
            >
              <div>
                <div className={`text-[18px] font-semibold leading-tight ${era.key === "algorithm" ? "text-background" : "text-foreground"}`}>{era.title}</div>
                <p className={`mt-1 text-[14px] leading-[1.45] ${era.key === "algorithm" ? "text-background/60" : "text-foreground/60"}`}>{era.readout}</p>
              </div>
              <div className={`border-t pt-3 md:border-l md:border-t-0 md:pl-5 md:pt-0 ${era.key === "algorithm" ? "border-background/15" : "border-border"}`}>
                <div className={`font-mono text-[10px] ${era.key === "algorithm" ? "text-background/40" : "text-foreground/40"}`}>Signal</div>
                <div className={`mt-1 text-[13px] font-medium ${era.key === "algorithm" ? "text-background/80" : "text-foreground/80"}`}>{era.signal}</div>
              </div>
              <div className={`border-t pt-3 md:border-l md:border-t-0 md:pl-5 md:pt-0 ${era.key === "algorithm" ? "border-background/15" : "border-border"}`}>
                <div className={`font-mono text-[10px] ${era.key === "algorithm" ? "text-background/40" : "text-foreground/40"}`}>Ranking basis</div>
                <div className={`mt-1 text-[13px] font-medium ${era.key === "algorithm" ? "text-background/80" : "text-foreground/80"}`}>{era.rank}</div>
              </div>
            </motion.div>
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
                className="group grid cursor-default grid-cols-1 items-center gap-6 px-6 py-7 transition-colors hover:bg-secondary/40 md:grid-cols-[80px_1fr_280px_140px] md:px-10 md:py-8"
              >
                <div className="flex items-center gap-4 md:block">
                  <div className="font-mono text-[12px] tabular-nums text-foreground/40">{p.n}</div>
                  <div className="mt-0 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60 text-foreground/55 transition-all group-hover:bg-foreground/10 group-hover:text-foreground md:mt-3">
                    <p.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <div className="text-[22px] font-semibold leading-tight text-foreground">{p.name}</div>
                  <div className="mt-1 text-[14px] text-foreground/55">{p.sub}</div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/45">
                    <span>Weight in the score</span>
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
                    <h3 className="mt-2 max-w-[440px] text-[14px] leading-[1.55] text-background/60">
                      Half of your score, and the half no other tool reads. TrueSync encodes it back into the answer.
                    </h3>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-background/55">
                      <span>Weight in the score</span>
                      <span className="tabular-nums text-background/85">50 pts</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-background/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-background/45">Half the Agentic Value Score. Unmeasured by every other tool.</div>
                  </div>
                  <div className="flex md:justify-end">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground">
                      Parleo
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
                      whileHover={{ y: -3, borderColor: "hsl(213 99% 50% / 0.4)" }}
                      className="cursor-default rounded-2xl border border-background/10 bg-background/[0.035] p-5 transition-colors hover:bg-background/[0.06]"
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

                {/* deeper links out of the framework */}
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-background/10 pt-6">
                  <a
                    href="https://audit.parleo.io/"
                    className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-background/80 transition-colors hover:text-background"
                  >
                    <span className="inline-block h-px w-3.5 bg-primary transition-all duration-300 group-hover:w-6" />
                    Score your brand on all three pillars, free
                  </a>
                  <a
                    href="https://audit.parleo.io/r/b41eb69930a14d97b2a7e7a306a17440"
                    className="group inline-flex items-center gap-2 text-[13.5px] text-background/55 transition-colors hover:text-background"
                  >
                    <span className="inline-block h-px w-3.5 bg-primary transition-all duration-300 group-hover:w-6" />
                    See a sample scorecard
                  </a>
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
