import imageAsset from "@/assets/insights/rendered/share-of-algorithm.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "share-of-algorithm",
  title: "Share of Algorithm: the complete score for winning the agentic era",
  dek: "Three pillars, nine dimensions, 100 points. Half the score sits on True Value, because that's the part connected to money.",
  date: "2026-08-18",
  dateLabel: "August 18, 2026",
  category: "Framework",
  readTime: "6 min read",
  image: imageAsset,
  imageAlt:
    "The Share of Algorithm framework: Visibility 32, Accessibility 18, and a highlighted True Value pillar worth 50 points across Price Truth, Value Protocols, Deal Citability and Member Value.",
  linkedInUrl: "https://www.linkedin.com/in/samarbirwadker/recent-activity/all/",
  author: "Samar Birwadker",
  seoTitle: "Share of Algorithm: How Brands Win the AI Shopping Answer | Parleo",
  seoDescription:
    "AI agents quote list prices and skip the incentives brands fund. Share of Algorithm scores what survives into agent answers across three pillars and nine dimensions, and half the score sits on True Value.",
  keywords: [
    "Share of Algorithm",
    "AI shopping agents",
    "agentic commerce",
    "AI agent recommendations",
    "agent-ready",
    "incentive visibility",
    "True Value",
  ],
  takeaways: [
    "Every channel shift mints a new score: Share of Shelf, Share of Voice, Share of Search. Share of Algorithm is the fourth.",
    "It's 100 points across three pillars and nine dimensions, and every point traces back to something an agent could or could not read about your store.",
    "Visibility is 32 points, Accessibility is 18, and True Value is 50, because True Value is the part connected to money.",
    "Each True Value dimension is scored twice: what your pages encode, and what agents actually said. The disagreement is the diagnosis.",
  ],
  faq: [
    {
      q: "What is Share of Algorithm?",
      a: "Share of Algorithm is a 100-point score for how AI agents see your brand, built across three pillars and nine dimensions: Visibility (32 points), Accessibility (18 points), and True Value (50 points). Every point traces back to something an agent could or could not read about your store.",
    },
    {
      q: "Why does True Value carry half the score?",
      a: "The first two pillars decide whether you show up. True Value decides what the agent tells a shopper your product costs: the member price that protects margin, the funded deal that moves volume, the loyalty economics you spent years building. Nobody else measures any of it.",
    },
    {
      q: "How is Share of Algorithm measured?",
      a: "Each dimension is scored through two lenses: what your pages and feeds encode, and what agents actually said across live shopper queries. A machine-readable price that never gets quoted is a ranking problem. A price that isn't readable at all is an encoding problem.",
    },
    {
      q: "Why do AI agents quote the wrong price?",
      a: "The comparison often happens before identity and eligibility are known, so an agent falls back to the public price it can verify. The mechanism is explained in our guide to [how AI shopping agents decide](/insights/how-ai-shopping-agents-decide).",
    },
    {
      q: "How do I get my own Share of Algorithm score?",
      a: "Run the Free Agentic Audit at parleo.io/audit. It takes one URL and returns your score across all three pillars, with every point inspectable.",
    },
  ],
  body: [
    {
      type: "p",
      text: "A few months ago I asked ChatGPT to find the best deal on a bag of Greenies. It came back fast and confident with the list price, while three better public prices sat on the same Chewy page. The full [four-price example](/insights/how-ai-shopping-agents-decide) is useful on its own. What bothered me was the larger question it exposed: how often does this happen, and how would a brand know?",
    },
    {
      type: "p",
      text: "I've been in and around commerce for twenty years, so gaps like that don't surprise me anymore. What got under my skin is that nobody can tell you how wide they run. Not per brand, not per category, not for the channel as a whole.",
    },
    { type: "h", text: "Every big channel shift mints a new score" },
    {
      type: "p",
      text: "Commerce keeps repeating the same move. A channel changes, the old metric stops explaining outcomes, and budgets reorganize around a new one. Physical retail gave us Share of Shelf. Broadcast gave us Share of Voice. Search gave us Share of Search.",
    },
    {
      type: "list",
      items: [
        "Share of Shelf: physical facings, $8B+ measurement industry",
        "Share of Voice: broadcast reach, $12B+ industry",
        "Share of Search: the search box, $200B+ a year of spend",
        "Share of Algorithm: the agent answer, currently unmeasured",
      ],
    },
    {
      type: "p",
      text: "It's shifting again, faster and with more money behind it than the last three times. [McKinsey sizes US agentic retail around $1T by 2030](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants), and [Bain puts 15 to 25% of US e-commerce](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/) through agents by the same date.",
    },
    {
      type: "stat",
      value: "+200%",
      label:
        "Year over year growth in shoppers starting purchases with agentic search, while brand-owned discovery fell 7% and traditional search fell 15% (Salesforce, July 2026)",
    },
    {
      type: "p",
      text: "The early returns already sort by context depth. Walmart's agent runs with full sight of identity, promotions, loyalty and fulfillment, and posts 35% bigger baskets with 4x unit growth. OpenAI's Instant Checkout ran on list price alone and was shut down in March.",
    },
    { type: "h", text: "The new shelf has a ranking rule" },
    {
      type: "p",
      text: "The ranking evidence is already lopsided. In [Profound's June study](https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive), structured feeds dominated ChatGPT's Best Price placements. [Shopify's Q2 2026 commerce data](https://shopify.com/enterprise/blog/ai-search-category-behavior) points the same way from the platform side, with AI-referred shoppers converting 2x better on structured catalog data. The detailed mechanics sit in [how AI shopping agents decide](/insights/how-ai-shopping-agents-decide).",
    },
    { type: "quote", text: "Rank is mostly a function of what you handed the machine." },
    {
      type: "p",
      text: "And the thing almost nobody is handing it is the actual price. The number your best customers pay after the member tier, the card-linked offer, the autoship discount, the promo you funded. That machinery is where retail's margin protection lives, and it's structurally invisible to the systems now making the recommendation.",
    },
    {
      type: "stat",
      value: "41%",
      label:
        "Multichannel organizations naming inconsistent pricing and promotions their #1 omnichannel failure point (Salesforce). The agent didn't create that inconsistency, it reads it out loud to every shopper who asks.",
    },
    { type: "h", text: "Share of Algorithm: three pillars, nine dimensions, one straight sum" },
    {
      type: "p",
      text: "So we built the fourth one. After Share of Shelf, Share of Voice and Share of Search, the score for this era is Share of Algorithm: 100 points, every one of them traceable to something an agent could or could not read about your store. Two pillars are table stakes. The third decides whether your value reaches the answer.",
    },
    {
      type: "pillars",
      total: 100,
      items: [
        {
          name: "Visibility",
          points: 32,
          question: "Are you in the room when shoppers ask?",
          dimensions: [
            { label: "Share of Mentions", points: 22 },
            { label: "Recommendation Strength", points: 10 },
          ],
          note: "Good tools already exist here. If you run Profound or Bluefish, keep them, they do this well.",
        },
        {
          name: "Accessibility",
          points: 18,
          question: "Can agents get in, and parse what you sell?",
          dimensions: [
            { label: "Agent Access", points: 5 },
            { label: "Catalog & Context", points: 8 },
            { label: "Protocol & Feed", points: 5 },
          ],
          note: "For most brands this pillar is a checklist, and the feed rule says the checklist pays for itself.",
        },
        {
          name: "True Value",
          points: 50,
          question: "Does the value behind your price survive into the answer?",
          dimensions: [
            { label: "Price Truth", points: 16 },
            { label: "Value Protocols", points: 14 },
            { label: "Deal Citability", points: 12 },
            { label: "Member Value", points: 8 },
          ],
          note: "Nobody measures this. Value Protocols is where almost no store has declared anything yet, which is exactly why early movers get a structural head start.",
          highlight: true,
        },
      ],
    },
    {
      type: "p",
      text: "Half the score sits on True Value on purpose. The first two pillars decide whether you show up. The third decides what the agent tells a shopper your product costs, and that's the part connected to money: the member price that protects margin, the funded deal that moves volume, the loyalty economics you spent years building.",
    },
    {
      type: "p",
      text: "Notice the phrasing on those True Value dimensions: can agents state it, and do they. Each one gets scored through both lenses, what your pages encode and what agents actually said across live shopper queries. They disagree constantly, and the disagreement is the diagnosis. A machine-readable price that never gets quoted is a ranking problem. A price that isn't readable at all is an encoding problem. Different fix, different team, different timeline.",
    },
    { type: "h", text: "What the benchmark keeps finding" },
    {
      type: "p",
      text: "We've started running the benchmark category by category, and the early cuts say the gap is wider than anyone's priced in. In our grooming run, 1 in 31 mentions of the category's top performer cited any incentive at all. The deals are funded, they're live on the retailer sites, and they're structurally absent from the channel where the most price-motivated shoppers now start.",
    },
    {
      type: "p",
      text: "The benchmark isn't meant to repeat every channel statistic. It answers a narrower operating question: where does a brand lose points between being available to an agent and having its real value represented in the answer?",
    },
    {
      type: "p",
      text: "Commerce has never left a gap this large unmeasured for long. I'm as guilty as anyone of talking my book, but the pattern is three for three and hard to ignore. Take one question back to your own P&L: when an AI agent recommends in your category, does it know what your best customers actually pay? For almost everyone, the honest answer is no.",
    },
  ],
};

export default post;
