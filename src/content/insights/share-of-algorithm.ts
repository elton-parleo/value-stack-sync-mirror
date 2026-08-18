import imageAsset from "@/assets/insights/share-of-algorithm.png.asset.json";
import type { Post } from "./types";

const post: Post = {
  slug: "share-of-algorithm",
  title: "Share of Algorithm: the score for the era agents decide",
  dek: "Three pillars, nine dimensions, 100 points. Half the score sits on True Value, because that's the part connected to money.",
  date: "2026-08-18",
  dateLabel: "August 18, 2026",
  category: "Framework",
  readTime: "6 min read",
  image: imageAsset.url,
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
      a: "Agents live in the comparison phase, where only list price exists. HUMAN Security found 79% of agent activity sits in product and search routes versus 2.34% at checkout, and the incentive layer resolves at checkout or later.",
    },
    {
      q: "How do I get my own Share of Algorithm score?",
      a: "Run the free audit at audit.parleo.io. It takes one URL and returns your score across all three pillars, with every point inspectable.",
    },
  ],
  body: [
    {
      type: "p",
      text: "A few months ago I asked ChatGPT to find the best deal on a bag of Greenies, the 12-count dental treats every dog owner knows. It answered fast and confidently: $19.99. Which is true, that's the list price on [Chewy](https://www.chewy.com/greenies-bursting-blueberry-regular/dp/113459). It's also the worst of four published prices sitting on that same product page: $17.98 if you buy once, $17.08 on autoship, $11.69 on your first autoship order. Nothing hidden, nothing hacky, just Chewy running deliberate pricing design, trading margin for a subscriber because the lifetime value pays for it. The agent saw the top of the ladder and stopped.",
    },
    {
      type: "p",
      text: "I've been in and around commerce for twenty years, and I've stopped being surprised by finding these gaps. What got under my skin is that nobody can tell you how wide they run. Not per brand, not per category, not for the channel as a whole.",
    },
    { type: "h", text: "Every big channel shift mints a new score" },
    {
      type: "p",
      text: "When the fight was for physical shelf space, Share of Shelf became the metric and an $8B+ measurement industry grew around counting facings, the slots your product physically occupies on a shelf. When broadcast made reach the scarce resource, Share of Voice earned its own $12B+ industry. When discovery moved into the search box, Share of Search became the number underneath $200B+ a year of spend. The sequence is almost boring in its consistency: channel shifts, old metric stops explaining outcomes, somebody names the new one, budgets reorganize around it.",
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
      text: "The channel is shifting again, faster and with more money behind it than the last three times. [McKinsey sizes US agentic retail around $1T by 2030](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants), and [Bain puts 15 to 25% of US e-commerce](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/) through agents by the same date.",
    },
    {
      type: "stat",
      value: "+200%",
      label:
        "Year over year growth in shoppers starting purchases with agentic search, while brand-owned discovery fell 7% and traditional search fell 15% (Salesforce, July 2026)",
    },
    {
      type: "p",
      text: "And the early returns already sort by context depth: Walmart's agent runs with full sight of identity, promotions, loyalty and fulfillment and posts 35% bigger baskets and 4x unit growth, while OpenAI's Instant Checkout ran on list price alone and was shut down in March.",
    },
    { type: "h", text: "The new shelf has a ranking rule" },
    {
      type: "p",
      text: "[Profound's June research across about a million ChatGPT shopping offers](https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive) found that products arriving through structured merchant feeds get ChatGPT's Best Price tag 100% of the time versus 21% for scraped pages, with feed-sourced offers taking the top slot in the answer 99.9% of the time. [Shopify's Q2 2026 commerce data](https://shopify.com/enterprise/blog/ai-search-category-behavior) confirmed the pattern from the platform side: AI-referred shoppers convert 2x better when the agent draws on structured catalog data versus scraped feeds.",
    },
    { type: "quote", text: "Rank is mostly a function of what you handed the machine." },
    {
      type: "p",
      text: "And the thing almost nobody is handing it is the actual price, the number your best customers pay after the member tier, the card-linked offer, the autoship discount, the promo you funded. That machinery is where retail's margin protection lives, and it is structurally invisible to the systems now making the recommendation.",
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
      text: "So we built the fourth one. After Share of Shelf, Share of Voice, and Share of Search, the score for this era is Share of Algorithm: 100 points where every point traces back to something an agent could or could not read about your store. Two pillars are table stakes. The third decides whether your value reaches the answer.",
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
      text: "Notice the phrasing on those True Value dimensions: can agents state it, and do they. Each one is scored through two lenses, what your pages encode and what agents actually said across live shopper queries. Those two disagree constantly, and the disagreement is the diagnosis. A machine-readable price that never gets quoted is a ranking problem. A price that isn't readable at all is an encoding problem. Different fix, different team, different timeline.",
    },
    { type: "h", text: "What the benchmark keeps finding" },
    {
      type: "p",
      text: "We've started running the benchmark category by category, and the early cuts say the gap is wider than anyone's priced in. In our grooming run, 1 in 31 mentions of the category's top performer cited any incentive at all. The deals are funded, live on the retailer sites, and structurally absent from the channel where the most price-motivated shoppers now start.",
    },
    {
      type: "stat",
      value: "79% / 2.34%",
      label:
        "Share of agent activity in product and search routes versus checkout (HUMAN Security, June 2026). Agents live in the comparison phase, and the comparison phase is where only list price exists.",
    },
    {
      type: "p",
      text: "And the people who most need the real price are the most steered by whatever the agent surfaces: [PYMNTS found](https://pymnts.com) that paycheck-to-paycheck AI users bought AI-recommended products at twice the rate of everyone else.",
    },
    {
      type: "p",
      text: "Commerce has never let a gap this size go unmeasured for long. I'm as guilty as anyone of talking my book here, but the pattern is three for three and that's a pretty hard thing to ignore. One question worth taking back to your own P&L: when an AI agent recommends in your category, does it know what your best customers actually pay? For almost everyone the honest answer is no. That gap is why Share of Algorithm exists.",
    },
    {
      type: "sources",
      items: [
        {
          claim: "Greenies four published prices",
          source: "Chewy PDP, verified",
          date: "Aug 2026",
          url: "https://www.chewy.com/greenies-bursting-blueberry-regular/dp/113459",
        },
        {
          claim: "Pillar and dimension structure, weights",
          source: "Parleo live framework",
          date: "Aug 2026",
          url: "https://audit.parleo.io",
        },
        {
          claim: "~$1T US agentic retail by 2030",
          source: "McKinsey / ICSC",
          date: "Apr 2026",
          url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants",
        },
        {
          claim: "15 to 25% of US e-commerce agentic by 2030",
          source: "Bain",
          date: "Dec 2025",
          url: "https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/",
        },
        {
          claim: "Agentic search +200% YoY, brand-owned -7%, traditional search -15%",
          source: "Salesforce State of Commerce, 4th ed.",
          date: "Jul 28, 2026",
          url: "https://www.salesforce.com/news/stories/agentic-search-growth/",
        },
        {
          claim: "Walmart 35% bigger baskets, 4x unit growth",
          source: "Walmart Q1 FY2027 call",
          date: "May 2026",
        },
        {
          claim: "Best Price tag 100% feed vs 21% scraped, 99.9% top slot",
          source: "Profound, ~1M offers",
          date: "Jun 24, 2026",
          url: "https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive",
        },
        {
          claim: "AI-referred shoppers convert 2x on structured catalog data",
          source: "Shopify Enterprise, Q2 2026",
          date: "Aug 11, 2026",
          url: "https://shopify.com/enterprise/blog/ai-search-category-behavior",
        },
        {
          claim: "41% name inconsistent pricing their #1 omnichannel failure",
          source: "Salesforce State of Commerce, 4th ed.",
          date: "Jul 28, 2026",
          url: "https://www.salesforce.com/news/stories/agentic-search-growth/",
        },
        {
          claim: "1 in 31 grooming mentions cited any incentive",
          source: "Parleo Benchmark",
          date: "2026",
        },
        {
          claim: "79% agent activity in product and search vs 2.34% checkout",
          source: "HUMAN Security",
          date: "Jun 2026",
          url: "https://humansecurity.com/learn/blog/state-of-agentic-traffic-june-2026-browser-agent-tooling-for-developers-is-catching-on-fast",
        },
        {
          claim: "Paycheck-to-paycheck AI users buy AI-recommended at 2x rate",
          source: "PYMNTS, The Overlap Effect, n=2,160",
          date: "Aug 5, 2026",
          url: "https://pymnts.com",
        },
      ],
    },
  ],
};

export default post;
