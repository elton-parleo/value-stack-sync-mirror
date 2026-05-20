import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ── Platform mockup showing Parleo enrichment inside real AI interfaces ── */

const PlatformMockup = ({
  platform,
  query,
  context,
  productCards,
  delay = 0,
}: {
  platform: { name: string; icon: React.ReactNode };
  query: string;
  context: string;
  productCards: {
    name: string;
    brand: string;
    originalPrice: string;
    truePrice: string;
    savings: string;
    deals: string[];
    isBest?: boolean;
  }[];
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/15 hover:shadow-card-hover"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {/* Platform header */}
    <div className="flex items-center gap-2.5 border-b border-border px-5 py-3">
      {platform.icon}
      <span className="text-[14px] font-semibold text-foreground">{platform.name}</span>
      <span className="ml-auto text-[10px] font-medium text-foreground/30">powered by Parleo</span>
    </div>

    {/* Chat content */}
    <div className="p-5 space-y-4">
      {/* User query bubble */}
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[13px] leading-[1.6] text-foreground/80">
          {query}
        </div>
      </div>

      {/* Context line */}
      <p className="text-[13px] leading-[1.7] text-foreground/60">{context}</p>

      {/* Product comparison cards */}
      <div className="space-y-2.5">
        {productCards.map((card) => (
          <div
            key={card.name}
            className={`rounded-lg border p-3.5 ${
              card.isBest
                ? "border-primary/25 bg-primary/[0.02]"
                : "border-border/60 bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <BrandLogo name={card.brand} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[14px] font-semibold text-foreground">{card.name}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[12px] text-foreground/35 line-through">{card.originalPrice}</span>
                <span className="ml-2 text-[16px] font-bold text-foreground">{card.truePrice}</span>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {card.deals.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-primary/15 bg-primary/[0.04] px-2 py-0.5 text-[11px] font-medium text-primary"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Parleo attribution */}
      <div className="flex items-center gap-1.5 pt-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
        </svg>
        <span className="text-[10px] font-medium text-primary/50">True cost computed by Parleo · 47ms · Zero PII</span>
      </div>
    </div>
  </motion.div>
);

const PlatformContextSection = () => (
  <AnimatedSection className="section-grid relative bg-background py-10 md:py-14">
    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">INSIDE EVERY AGENT</span>
      </div>

      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        Same product. Different price.<br className="hidden md:block" />
        Only one agent knows.
      </h2>
      <p className="mt-3 max-w-[600px] text-[15px] leading-[1.7] text-foreground/70 md:text-[17px]">
        A customer asks two AI assistants the same question. The one connected to Parleo sees loyalty tiers, card offers, and point multipliers. The other sees sticker price and guesses.
      </p>

      {/* Platform mockups */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <PlatformMockup
          platform={{
            name: "ChatGPT",
            icon: <BrandLogo name="ChatGPT" size={20} />,
          }}
          query="Where should I buy Rare Beauty blush to get the best deal?"
          context="Based on your Sephora Rouge membership and Amex card, here's the true cost comparison:"
          productCards={[
            {
              name: "Sephora",
              brand: "Sephora",
              originalPrice: "$23.00",
              truePrice: "$11.10",
              savings: "$11.90",
              deals: ["Rouge −10%", "Amex −$5", "4x pts"],
              isBest: true,
            },
            {
              name: "Ulta",
              brand: "Ulta",
              originalPrice: "$23.00",
              truePrice: "$18.12",
              savings: "$4.88",
              deals: ["Diamond −$2", "5% back"],
            },
          ]}
          delay={0}
        />

        <PlatformMockup
          platform={{
            name: "Perplexity",
            icon: <BrandLogo name="Perplexity" size={20} />,
          }}
          query="Best trail running shoe under $160 with my Nike membership?"
          context="Your Nike Member status and Amex Platinum significantly change the value ranking:"
          productCards={[
            {
              name: "Nike Wildhorse 8",
              brand: "Nike",
              originalPrice: "$130",
              truePrice: "$76.00",
              savings: "$54",
              deals: ["Member −20%", "Pts −$24", "Amex −$15"],
              isBest: true,
            },
            {
              name: "Hoka Speedgoat 5",
              brand: "REI",
              originalPrice: "$155",
              truePrice: "$136.50",
              savings: "$18.50",
              deals: ["REI dividend $18.50"],
            },
          ]}
          delay={0.15}
        />
      </div>

      {/* Bottom insight callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.02] p-4 md:p-5"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-foreground">Without Parleo, agents rank by headline price.</p>
          <p className="mt-1 text-[13px] leading-[1.6] text-foreground/70">
            With Parleo, Sephora moves from #2 to #1 because the agent sees Rouge tier, Amex offer, and Beauty Insider multipliers. That's $11.90 in value your customer almost missed.
          </p>
        </div>
      </motion.div>
    </div>
  </AnimatedSection>
);

export default PlatformContextSection;
