import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ── Parleo data shown inside real AI platform mockups ── */

const PlatformMockup = ({
  platform,
  query,
  response,
  productCards,
  delay = 0,
}: {
  platform: { name: string; icon: React.ReactNode; bg: string; headerBg: string };
  query: string;
  response: string;
  productCards: { name: string; brand: string; price: string; truePrice: string; deals: string[] }[];
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {/* Platform header */}
    <div
      className="flex items-center gap-2.5 border-b border-border px-4 py-3"
      style={{ background: platform.headerBg }}
    >
      {platform.icon}
      <span className="text-[13px] font-semibold text-foreground">{platform.name}</span>
      <span className="ml-auto text-[10px] text-foreground/30">powered by Parleo</span>
    </div>

    {/* Chat content */}
    <div className="p-4 space-y-3" style={{ background: platform.bg }}>
      {/* User query */}
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2 text-[12px] text-foreground/80">
          {query}
        </div>
      </div>

      {/* AI response text */}
      <div className="text-[12px] leading-[1.7] text-foreground/65">
        {response}
      </div>

      {/* Product cards with Parleo data */}
      <div className="space-y-2">
        {productCards.map((card) => (
          <div
            key={card.name}
            className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary">
              <BrandLogo name={card.brand} size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-foreground">{card.name}</span>
                <div className="text-right">
                  <span className="text-[11px] text-foreground/40 line-through">{card.price}</span>
                  <span className="ml-1.5 text-[13px] font-bold text-primary">{card.truePrice}</span>
                </div>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {card.deals.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-primary/15 bg-primary/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-primary"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parleo attribution line */}
      <div className="flex items-center gap-1.5 pt-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
        </svg>
        <span className="text-[9px] font-medium text-primary/60">True cost computed by Parleo · 47ms · Zero PII</span>
      </div>
    </div>
  </motion.div>
);

const PlatformContextSection = () => (
  <AnimatedSection className="section-grid relative bg-background py-10 md:py-14">
    <div className="decorative-line" />
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
        Your value, visible in every<br className="hidden md:block" /> AI conversation.
      </h2>
      <p className="mt-3 max-w-[560px] text-[17px] leading-[1.7] text-foreground/55">
        When a customer asks ChatGPT, Perplexity, or Claude where to buy, Parleo ensures your loyalty programs, card offers, and true cost are part of the answer.
      </p>

      {/* Platform mockups grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <PlatformMockup
          platform={{
            name: "ChatGPT",
            icon: <BrandLogo name="ChatGPT" size={18} />,
            bg: "hsl(0 0% 99%)",
            headerBg: "hsl(0 0% 97%)",
          }}
          query="Where should I buy Rare Beauty blush to get the best deal?"
          response="Based on your Sephora Rouge membership and Amex card, here's the true cost comparison:"
          productCards={[
            { name: "Sephora", brand: "Sephora", price: "$23.00", truePrice: "$11.10", deals: ["Rouge −10%", "Amex −$5", "4x pts"] },
            { name: "Ulta", brand: "Ulta", price: "$23.00", truePrice: "$18.12", deals: ["Diamond −$2", "5% back"] },
          ]}
          delay={0}
        />

        <PlatformMockup
          platform={{
            name: "Perplexity",
            icon: <BrandLogo name="Perplexity" size={18} />,
            bg: "hsl(0 0% 99%)",
            headerBg: "hsl(0 0% 97%)",
          }}
          query="Best trail running shoe under $160 with my Nike membership?"
          response="Your Nike Member status and Amex Platinum significantly change the value ranking:"
          productCards={[
            { name: "Nike Wildhorse 8", brand: "Nike", price: "$130", truePrice: "$76.00", deals: ["Member −20%", "Pts −$24", "Amex −$15"] },
            { name: "Hoka Speedgoat 5", brand: "REI", price: "$155", truePrice: "$136.50", deals: ["REI dividend $18.50"] },
          ]}
          delay={0.15}
        />
      </div>

      {/* Bottom insight */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.02] p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[14px] font-medium text-foreground">Without Parleo, agents rank by headline price.</p>
          <p className="mt-0.5 text-[13px] text-foreground/55">
            With Parleo, Sephora moves from #2 to #1 because the agent sees Rouge tier, Amex offer, and Beauty Insider multipliers. That's $11.90 in value your customer almost missed.
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default PlatformContextSection;
