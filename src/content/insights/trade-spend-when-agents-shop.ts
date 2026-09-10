import image from "@/assets/insights/rendered/trade-spend.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "trade-spend-when-agents-shop",
  title: "What happens to trade spend when agents do the shopping",
  dek: "Over $200B of trade promotion and roughly $69B of retail media are aimed at a shopper who has stopped browsing. We measured how often a funded incentive survives into an AI answer. It was 1.8%.",
  date: "2026-08-27",
  dateLabel: "August 27, 2026",
  category: "Benchmark",
  readTime: "6 min read",
  image,
  imageAlt:
    "A merchant offer record as an AI agent reads it, with the funded promotion and sponsored placement greyed out.",
  author: "Samar Birwadker",
  seoTitle: "What Happens to Trade Spend and Retail Media When Agents Shop | Parleo",
  seoDescription:
    "Over $200B of trade promotion and roughly $69B of retail media are aimed at a shopper who has stopped browsing. We measured how often a funded incentive survives into an AI answer. It was 1.8%.",
  keywords: [
    "trade promotion AI agents",
    "retail media agentic commerce",
    "trade spend",
    "funded but invisible",
    "AI shopping incentives",
    "promotion visibility AI",
    "CPG agentic commerce",
  ],
  takeaways: [
    "Retail media buys placement. An agent pulling a feed or a page renders no viewport, no scroll and no impression, so the sponsored position isn't part of the object the model receives.",
    "Trade promotion funds a conditional discount that resolves at checkout. Ranking happens before checkout on list price, so the funded discount sits where the ranking step can't reach.",
    "In a grooming sweep of agent answers, 1.8% of brand mentions cited any incentive at all. The best brand in the category managed 3.2%, about one mention in thirty-one.",
    "Trade and retail media dashboards measure redemption, lift and impressions on the retailer's property. None has a field for whether the offer survived into an agent's answer.",
  ],
  faq: [
    {
      q: "Does retail media work when an AI agent is doing the shopping?",
      a: "Not in the way it was priced. Retail media is sold as placement to a human looking at a screen. An agent requesting structured data or a product page renders no viewport, no scroll and no impression, so the sponsored position simply isn't in the data the model receives.",
    },
    {
      q: "Why don't funded promotions show up in AI shopping answers?",
      a: "A funded promotion is conditional on retailer, basket, timing and sometimes shopper, and those conditions resolve at checkout against binding transaction data. Agents rank earlier than that, on category and list price. In our grooming sweep only 1.8% of brand mentions cited any incentive.",
    },
    {
      q: "What does 'funded but invisible' mean?",
      a: "The dollars are committed, the offer is live on the retailer site, the shopper would qualify, and none of it reaches the surface where the agent makes its recommendation. The spend isn't being outcompeted in the agent channel. It isn't being counted.",
    },
    {
      q: "What should a brand do about trade spend and AI agents?",
      a: "Count what survives by running your top twenty funded promotions through four assistants. Encode the offers you already fund in machine-readable form so the conditions travel with the product. And separate agent-sourced traffic from organic in your reporting so the channel stops being averaged away.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Two of the largest line items in consumer goods are aimed at a shopper who is no longer doing the looking.",
    },
    {
      type: "p",
      text: "US trade promotion runs north of $200B a year and US retail media adds roughly $69B on top. Both were designed for a person who arrives at a page, sees a display, reads a coupon, and decides.",
    },
    {
      type: "p",
      text: "An AI agent does none of that. It requests structured data, ranks what it gets, and returns three products with prices attached.",
    },
    {
      type: "p",
      text: "The money doesn't vanish. It stops being visible at the exact moment the decision gets made. I've been measuring how often that happens, and the number is worse than most brand teams guess.",
    },
    {
      type: "grid",
      items: [
        { value: "$200B+", label: "US trade promotion, per year", source: "Strategy&/PwC" },
        { value: "~$69B", label: "US retail media, per year", source: "eMarketer" },
        { value: "1.8%", label: "Agent mentions citing any incentive", source: "Parleo grooming sweep" },
      ],
      caption: "Two budgets built for a browsing human, and how much of them reaches an agent's answer",
    },
    { type: "h", text: "Retail media buys a surface the agent never renders" },
    {
      type: "p",
      text: "Retail media is placement. Sponsored listings, on-site display, the banner at the top of the category page, the carousel beside the product. All of it is inventory sold against a human looking at a screen.",
    },
    {
      type: "p",
      text: "An agent pulling a merchant feed or a product page doesn't render any of it. There's no viewport, no scroll, no impression in the sense the buy was priced on. The sponsored position that would have moved a browsing shopper just isn't part of the object the model receives.",
    },
    {
      type: "p",
      text: "What this means: the more of your category's traffic moves to agents, the more of your retail media budget is buying attention from an audience that isn't there.",
    },
    { type: "h", text: "Trade promotion funds a discount that resolves too late" },
    { type: "p", text: "Trade promotion is different, and the failure is more interesting." },
    {
      type: "p",
      text: "The money is real, the discount is real, and it's usually live on the retailer's site. The problem is when it becomes true. A funded promotion is conditional: it depends on the retailer, the basket, the timing, sometimes the shopper. Conditions resolve at checkout, against binding transaction data.",
    },
    {
      type: "p",
      text: "Ranking happens well before checkout. As I covered in [how agents decide what to recommend](/insights/how-ai-shopping-agents-decide), the standard commerce protocols give [catalog search two standard filters](https://ucp.dev/specification/catalog/search/), category and price, and the price available at that step is list. So the funded discount exists, and it exists in a place the ranking step can't reach.",
    },
    {
      type: "record",
      title: "One offer, as the agent reads it",
      legend: ["Read by the agent", "In the data, not in the read"],
      rows: [
        { key: "product", value: "Gillette Labs razor with exfoliating bar" },
        { key: "retailer", value: "Walmart" },
        { key: "category", value: "Shaving > Razors" },
        { key: "list_price", value: "$29.97" },
        { key: "sponsored_placement", value: "Category page, position 1", unread: true },
        { key: "promotion", value: "Clip coupon, active", unread: true },
        { key: "promo_funding", value: "Manufacturer-funded", unread: true },
        { key: "eligibility", value: "Resolves at checkout", unread: true },
        { key: "effective_price", value: "≈ $24.97 after coupon", unread: true },
      ],
      caption: "Everything below the list price is funded, live and structurally absent from the ranking step",
    },
    {
      type: "p",
      text: "What this means: you can fund a promotion that makes you the best value in the category and still lose the comparison to a competitor with a lower number on the page.",
    },
    { type: "h", text: "We measured how often an incentive survives. It was 1.8%" },
    { type: "p", text: "This is the part I couldn't find published anywhere, so we ran it." },
    {
      type: "p",
      text: "Across a grooming sweep of agent answers, 1.8% of brand mentions cited any incentive at all. Not the right incentive. Any. The best-performing brand in the category managed 3.2%, which is roughly one mention in thirty-one.",
    },
    {
      type: "bars",
      title: "Share of agent brand mentions that cited an incentive, grooming category",
      max: 100,
      items: [
        { label: "Category average", value: 1.8, display: "1.8%", highlight: true },
        { label: "Best-performing brand", value: 3.2, display: "3.2%", note: "About one mention in thirty-one" },
        { label: "Brands with live funded promotions during the sweep", value: 100, display: "All of them" },
      ],
      caption: "Parleo benchmark, 2026. Deals were live on retailer sites while the sweep ran",
    },
    {
      type: "p",
      text: "Every one of those brands funds promotions. The deals were live on retailer sites while we ran the sweep. They were funded, active, and structurally absent from the channel where the most price-motivated shoppers now start.",
    },
    {
      type: "p",
      text: "Put a plain worked example next to it. A Gillette Labs razor sits at $29.97 at Walmart against a Harry's five-blade at $19.97, so on a chat surface Harry's looks a lot cheaper. Go to the retailer site and there's an active coupon on the Gillette that closes most of the gap, leaving a real difference of roughly $5.",
    },
    {
      type: "ladder",
      title: "The razor comparison, as quoted and as paid",
      items: [
        { label: "Gillette Labs, list", note: "What the agent quoted", price: "$29.97", quoted: true },
        { label: "Harry's five-blade, list", note: "What the agent quoted", price: "$19.97", quoted: true },
        { label: "Gillette Labs, after active coupon", note: "What a shopper on the retailer site pays", price: "≈ $24.97" },
      ],
      caption: "A $10 gap on the chat surface. A ~$5 gap at the register. Prices verified Aug 4, 2026",
    },
    {
      type: "p",
      text: "How modest that gap turns out to be is the point. Nobody's claiming the funded offer always wins, only that the agent never got to weigh it.",
    },
    {
      type: "p",
      text: "What this means: trade spend isn't being outcompeted in the agent channel. It isn't being counted.",
    },
    { type: "h", text: "Funded but invisible" },
    {
      type: "p",
      text: "That's the pattern worth carrying out of here. Not \"agents are cheap,\" not \"discounting doesn't work.\" Funded but invisible. The dollars are committed, the offer is live, the shopper would qualify, and none of it reaches the surface where the decision happens.",
    },
    {
      type: "quote",
      text: "A channel can be quietly failing while every dashboard reports normal.",
    },
    {
      type: "p",
      text: "It also explains why this is so hard to see from inside a brand. Trade spend is measured on redemption and lift at the retailer. Retail media is measured on impressions and attributed conversions on the retailer's own property. Neither instrument has a field for whether the offer survived into an agent's answer.",
    },
    { type: "h", text: "The number that cuts against this" },
    {
      type: "p",
      text: "The obvious objection is that this only matters if agents are actually driving purchases, and mostly they aren't yet.",
    },
    {
      type: "p",
      text: "That's fair. [PYMNTS found only 19% of AI users had ordered anything through AI](https://www.pymnts.com/news/retail/2026/ai-finds-the-deal-shoppers-still-make-the-call/), and [Gartner has just 11% of US consumers](https://www.gartner.com/en/newsroom/press-releases/2026-05-27-gartner-survey-finds-consumers-want-ai-shopping-help-but-not-ai-purchase-decisions) willing to let AI make the purchase decision outright. Influence is running well ahead of transaction.",
    },
    {
      type: "p",
      text: "I'd still act now rather than in a year, for one reason. The same research shows the people who lean hardest on AI recommendations are the ones with the least room in their budget: paycheck-to-paycheck AI users bought multiple AI-recommended products at 45% against 21% for everyone else, roughly twice the rate. The shoppers most steered by these answers are the shoppers your promotional dollars were built to reach.",
    },
    {
      type: "bars",
      title: "AI users who bought multiple AI-recommended products",
      max: 100,
      items: [
        { label: "Living paycheck to paycheck", value: 45, display: "45%", highlight: true },
        { label: "Everyone else", value: 21, display: "21%" },
        { label: "All AI users who have ordered anything through AI", value: 19, display: "19%" },
      ],
      caption: "PYMNTS, The Overlap Effect, n=2,160, Aug 2026",
    },
    {
      type: "p",
      text: "And the fix is a data project, not a media buy. It's cheap right now and it gets more expensive as more of the category shows up.",
    },
    { type: "h", text: "Three things worth doing about it" },
    {
      type: "list",
      items: [
        "Count what survives. Take your top twenty funded promotions, run the category queries a real shopper would type across four assistants, and record how many of your live offers appear in any form. Most teams have never done this and it takes an afternoon.",
        "Encode the offers you already fund into machine-readable form, so the conditions travel with the product rather than living in a banner image or an email code.",
        "Separate the reporting. Agent-sourced traffic buried inside organic search means trade and retail media performance in this channel is being averaged into a number that hides it.",
      ],
    },
    {
      type: "p",
      text: "Retail's promotional machinery is one of the most sophisticated pricing systems ever built. It was built to persuade people. The reader changed, and almost none of it has been translated.",
    },
    {
      type: "sources",
      items: [
        {
          claim: "$200B+ US trade promotion",
          source: "Strategy&/PwC, zero-based trade for CPG",
          date: "Industry figure",
          url: "https://www.strategyand.pwc.com/gx/en/insights/2017/zbt-for-cpg-leaders.html",
        },
        {
          claim: "~$69B US retail media",
          source: "eMarketer retail media forecast",
          date: "2026",
        },
        {
          claim: "1.8% of agent mentions in grooming cite any incentive; best performer 3.2%, one in thirty-one",
          source: "Parleo Benchmark, first-party",
          date: "2026",
        },
        {
          claim: "Gillette Labs $29.97 at Walmart vs Harry's $19.97; real gap after incentives ~$5",
          source: "Parleo verified example set",
          date: "Aug 4, 2026",
        },
        {
          claim: "UCP Catalog Search defines two standard filters, category and price",
          source: "UCP specification, search filters",
          date: "Verified Aug 14, 2026",
          url: "https://ucp.dev/specification/catalog/search/",
        },
        {
          claim: "45% vs 21% paycheck-to-paycheck AI users bought multiple AI-recommended products; 19% of AI users ordered via AI",
          source: "PYMNTS, The Overlap Effect, n=2,160",
          date: "Aug 5, 2026",
          url: "https://www.pymnts.com/news/retail/2026/ai-finds-the-deal-shoppers-still-make-the-call/",
        },
        {
          claim: "11% would let AI make the purchase decision",
          source: "Gartner newsroom",
          date: "May 27, 2026",
          url: "https://www.gartner.com/en/newsroom/press-releases/2026-05-27-gartner-survey-finds-consumers-want-ai-shopping-help-but-not-ai-purchase-decisions",
        },
      ],
    },
  ],
};

export default post;
