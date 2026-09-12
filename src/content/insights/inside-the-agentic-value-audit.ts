import image from "@/assets/insights/rendered/audit-scorecard.webp";
import socialImageAsset from "@/assets/social/inside-the-agentic-value-audit.jpg.asset.json";
import type { Post } from "./types";

const post: Post = {
  slug: "inside-the-agentic-value-audit",
  title: "How agent-ready is your store?",
  dek: "24 live ChatGPT queries and a full crawl, scored out of 100. What the Agentic Value Audit measures, where the points leak, and what to fix first.",
  date: "2026-08-19",
  dateLabel: "August 19, 2026",
  category: "Point of view",
  readTime: "6 min read",
  image,
  socialImage: socialImageAsset.url,
  imageAlt:
    "Sample Agentic Value Audit scorecard for an enterprise beauty brand.",
  author: "Samar Birwadker",
  seoTitle: "How Agent-Ready Is Your Store? Inside the Agentic Value Audit | Parleo",
  seoDescription:
    "24 live ChatGPT queries and a full site crawl reveal how AI agents see your store. Your score on the Share of Algorithm framework, where the points leak, and what to fix first.",
  keywords: [
    "Agentic Value Audit",
    "agent-ready",
    "AI agent audit",
    "Share of Algorithm",
    "AI shopping visibility",
    "agentic commerce audit",
  ],
  takeaways: [
    "The audit runs two instruments in one pass: 24 live ChatGPT shopper queries in your category, and a full crawl reading only what an agent can read.",
    "It returns a score out of 100 on the Share of Algorithm framework, with the readiness bar at 60. Crossing it takes real points on True Value.",
    "Every True Value dimension is scored twice, what your pages encode and what agents actually said. The gap between the two is the diagnosis.",
    "Our sample run: an enterprise beauty brand came back 40 out of 100 with about $18.4M a year in modeled exposure. That result is the pattern, not the outlier.",
  ],
  faq: [
    {
      q: "What is the Agentic Value Audit?",
      a: "A free report that measures how AI shopping agents see your store. It runs 24 live ChatGPT shopper queries in your category and a full crawl of your site, then scores you out of 100 on the Share of Algorithm framework: Visibility 32, Accessibility 18, True Value 50.",
    },
    {
      q: "What counts as agent-ready?",
      a: "The readiness bar sits at 60 out of 100, and crossing it takes real points on True Value. A store that's famous but value-invisible isn't agent-ready, it's agent-exposed.",
    },
    {
      q: "How long does the audit take?",
      a: "Less than a coffee. You give one URL at parleo.io/audit and see your number before we ever see your name.",
    },
    {
      q: "What should I fix first?",
      a: "If agents still reach your products by scraping, ship the structured feed. It's the cheapest rank improvement available: feed-sourced offers win ChatGPT's Best Price tag 100% of the time versus 21% scraped. Then encode what you already fund, member pricing and live promotions, which no feed does for you.",
    },
  ],
  body: [
    {
      type: "p",
      text: "All week I've been writing about the same gap from different angles. Four public prices collapse into one AI answer. Loyalty value disappears behind identity. The replies kept coming back to a much more practical question: how do I see this for my own store?",
    },
    {
      type: "p",
      text: "So we built the Agentic Value Audit. It's live now. This is what it measures, what keeps showing up in the results, and how to read your own report.",
    },
    { type: "h", text: "What the audit actually does" },
    {
      type: "p",
      text: "The audit puts two views side by side. One is 24 live ChatGPT shopper queries in your category, with every brand mention, recommendation, price claim and deal citation coded. The other is a full crawl that reads only what an agent can read: product markup, price and offer data, loyalty pages, robots rules, and whatever you've declared into the checkout standards agents transact on.",
    },
    {
      type: "p",
      text: "Out comes your score out of 100 on the [Share of Algorithm framework](/insights/share-of-algorithm): Visibility 32, Accessibility 18, True Value 50. Three pillars, nine dimensions, one straight sum. Every True Value dimension gets scored through two lenses, what your pages encode and what agents actually said, and those two disagree constantly. The gap between them is the diagnosis. A readable price that never gets quoted is a ranking problem. A price that isn't readable at all is an encoding problem. Different fix for each.",
    },
    {
      type: "stat",
      value: "60 / 100",
      label:
        "Where the readiness bar sits, and crossing it takes real points on True Value. A store that's famous but value-invisible isn't agent-ready, it's agent-exposed.",
    },
    { type: "h", text: "Where the points leak" },
    {
      type: "p",
      text: "Half the score lives in the four True Value dimensions, and that's where the audit keeps finding the damage.",
    },
    {
      type: "leaks",
      total: 50,
      items: [
        {
          name: "Price Truth",
          points: 16,
          test: "Can agents state your real price, and do they",
          detail:
            "The most common miss is structural: the price in your markup disagrees with the page, or exists on some products and not others, so agents quote stale or partial numbers. Usually the quickest fix and the most embarrassing finding, because your own structured data is working against you.",
          highlight: true,
        },
        {
          name: "Value Protocols",
          points: 14,
          test: "Can your value execute inside agent checkout",
          detail:
            "Almost no store has declared anything here yet, which makes it the most forward-looking dimension on the board. Declare first and the advantage compounds as the standards mature.",
        },
        {
          name: "Deal Citability",
          points: 12,
          test: "Do live promotions survive into answers",
          detail:
            "Promotions running as images and email codes leave no structured trace, so funded deals never surface. The money behind this is real, $200B+ a year of US trade promotion plus ~$69B of retail media, and almost none of it reaches the agent channel.",
        },
        {
          name: "Member Value",
          points: 8,
          test: "Can agents see what members get, and do they say it",
          detail:
            "Tiers, member pricing, points math, all of it typically living in PDFs, banners and logged-in pages an agent can't parse. The most painful gap for brands that invested heavily in loyalty, because the investment itself is what's invisible.",
        },
      ],
    },
    {
      type: "p",
      text: "Our sample run makes it concrete. An enterprise beauty brand, the kind most operators would call sharp, came back 40 out of 100: solid mentions, a readable price on one product page of four, no member value visible anywhere, no deal encoded for an agent to find, nothing declared at checkout. About $18.4M a year in modeled exposure.",
    },
    {
      type: "quote",
      text: "The better your incentive machinery, the more of your value is invisible by default.",
    },
    { type: "h", text: "How to read your score" },
    {
      type: "p",
      text: "Three things matter more than the headline number.",
    },
    {
      type: "list",
      items: [
        "Which pillar is bleeding. A Visibility problem and a True Value problem have different owners and different fixes, and most teams are staffed for the first while the second sits in nobody's inbox. The CMO owns mention rate, the ecommerce team owns the feed, and your loyalty program's AI visibility has no owner at all.",
        "Which lens is failing. Readable but never quoted means the ranking model is the bottleneck, and the structured feed is your fix. Not readable at all means the machine couldn't find it, so encoding is the fix.",
        "What doesn't apply. Where a dimension genuinely isn't relevant to your model, the report says so and renormalizes rather than quietly docking you. A score you can't trust point by point is a sales pitch, not a measurement.",
      ],
    },
    { type: "h", text: "What to fix first" },
    {
      type: "p",
      text: "The fixes rank themselves. If your products still reach agents by scraping, ship the structured feed. It's the cheapest rank improvement you'll ever buy: [Profound's data](https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive) has feed-sourced offers winning ChatGPT's Best Price tag 100% of the time versus 21% scraped, and [Shopify's Q2 numbers](https://shopify.com/enterprise/blog/ai-search-category-behavior) show AI-referred shoppers converting 2x better on structured catalog data.",
    },
    {
      type: "p",
      text: "Then encode what you already fund: member pricing and live promotions in machine-readable form, the half no feed does for you. The audit hands you the ranked list either way, and for the dimensions that need encoding we built TrueSync, the fix layer that declares your member value and live deals into the standards agents transact on and keeps them current. The rest closes with the team you already have, mostly by reformatting data you already produce.",
    },
    {
      type: "p",
      text: "The audit turns an abstract channel problem into a list someone can own. Run it free at [parleo.io/audit](https://parleo.io/audit). You see your number before we ever see your name. If the report gets something wrong about your store, tell me. That's the feedback that makes the measurement better.",
    },
  ],
};

export default post;
