import image from "@/assets/insights/rendered/no-denominator.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "how-big-is-agentic-commerce",
  title: "How big is agentic commerce actually going to be?",
  dek: "McKinsey says ~$1T by 2030 and Bain says 15-25% of US e-commerce. Nobody has published what it is today. Every number in this category is a growth rate without a denominator.",
  date: "2026-09-10",
  dateLabel: "September 10, 2026",
  category: "Research",
  readTime: "7 min read",
  image,
  imageAlt:
    "Four measurement eras of retail, Shelf, Voice, Search and Algorithm, with spend anchors and the Algorithm era sized but undated.",
  author: "Samar Birwadker",
  seoTitle: "How Big Is Agentic Commerce Going to Be? What the Data Actually Says | Parleo",
  seoDescription:
    "McKinsey says ~$1T by 2030 and Bain says 15-25% of US e-commerce. Nobody has published what it is today. Every number in this category is a growth rate without a denominator.",
  keywords: [
    "agentic commerce market size",
    "how big is agentic commerce",
    "agentic commerce forecast 2030",
    "AI shopping statistics 2026",
    "agentic commerce growth",
    "AI referral attribution",
    "McKinsey agentic commerce",
  ],
  takeaways: [
    "McKinsey/ICSC forecast roughly $1 trillion of US agentic retail by 2030. Bain has 15 to 25% of US e-commerce running through agents the same year. Neither firm sells a product in the category.",
    "Everything actually measured is a rate of change: Salesforce +200%, Shopify +197% sessions and 3x orders, Amazon Alexa for Shopping actives roughly doubled, Walmart Sparky units 4x. Nobody has published a level.",
    "Attribution leaks. In Scrunch's opt-in panel only 1.1% of news visits following an AI conversation carried an AI referrer, so your dashboard can't tell you either way.",
    "Every measurement era started here. Share of Shelf built an $8B industry, Share of Voice $12B, Share of Search sits under $200B+ of spend. The counting for Share of Algorithm hasn't started.",
  ],
  faq: [
    {
      q: "How big is agentic commerce today?",
      a: "Nobody has published a measured level. McKinsey/ICSC forecast about $1 trillion of US agentic retail by 2030 and Bain forecasts 15-25% of US e-commerce, but what's reported today is growth rates: Salesforce has agentic search up 200% year over year, Shopify has AI-referred sessions up 197%, Walmart has Sparky units up 4x. None of those disclose a base.",
    },
    {
      q: "Why hasn't anyone published the size of agentic commerce?",
      a: "Two reasons. A level invites next-quarter comparison that a growth rate avoids, and there's no agreed unit, so no one has defined a weekly or monthly active agent. Separately, attribution leaks: much AI-influenced traffic arrives without an AI referrer, so the analytics plumbing can't count it reliably.",
    },
    {
      q: "What does 'a growth rate without a denominator' mean?",
      a: "Every published agentic commerce figure is a ratio, up 200%, 4x, doubled, with no disclosed base. You can say with confidence the channel is accelerating and you can't say from published data how large it currently is.",
    },
    {
      q: "What should a brand do about the agentic commerce forecasts?",
      a: "Measure your own: separate AI-sourced sessions from organic now, accept it's an undercount, and build twelve months of history. Ask any vendor for the base behind a growth rate. And watch the transaction gap, the 19% of AI users who have actually ordered through AI, rather than the traffic.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Everyone has a forecast for agentic commerce. Almost nobody will tell you how large it is today.",
    },
    {
      type: "p",
      text: "[McKinsey and ICSC](https://www.icsc.com/news-and-views/icsc-exchange/icsc-mckinsey-company-release-shopping-in-the-age-of-ai-redefining-stores-for-a-new-era-report) put US agentic retail at roughly $1 trillion by 2030. [Bain](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/) has 15 to 25% of US e-commerce running through agents by the same year. Different units, same direction, both from firms with no product to sell in the category.",
    },
    {
      type: "p",
      text: "Try to put a current number beside those forecasts and the trail goes cold. You'll find growth rates, but no level.",
    },
    {
      type: "grid",
      items: [
        { value: "~$1T", label: "US agentic retail by 2030", source: "McKinsey / ICSC, Apr 2026" },
        { value: "15–25%", label: "of US e-commerce via agents by 2030", source: "Bain, Dec 2025" },
        { value: "?", label: "Measured size today", source: "Not published, anywhere" },
      ],
      caption: "Two forecasts, one blank",
    },
    { type: "h", text: "What has actually been measured" },
    { type: "p", text: "The behavioral data is real. It also tells a different story from the market forecasts." },
    {
      type: "p",
      text: "[Salesforce](https://www.salesforce.com/news/stories/agentic-search-growth/), working from 1.5 billion shoppers rather than a survey, has agentic search as a first purchase-path step up 200% year over year, with brand-owned discovery down 7% and traditional search down 15% over the same period. [Shopify's Q2 data](https://www.shopify.com/enterprise/blog/ai-search-category-behavior) has AI-referred sessions up 197% year over year with orders up 3x, against organic sessions up 12%.",
    },
    {
      type: "p",
      text: "The first-party agents are bigger than most people realize. [Amazon said on its Q2 call](https://www.aboutamazon.com/news/company-news/amazon-ceo-andy-jassy-stores-growth-ai-shopping-q2-2026-earnings) that Alexa for Shopping has 350 million-plus users, with actives roughly doubling in the quarter, interactions up 5x year over year, and those users spending 40%+ more per order. [Walmart reported](https://www.digitalcommerce360.com/2026/05/22/walmart-sparky-agent-ai-sales-supply-chain/) Sparky weekly actives up 100% year over year, units through the agent up 4x, and roughly 35% higher average order value.",
    },
    {
      type: "record",
      title: "Every published figure, with the field that's missing",
      legend: ["Disclosed", "Not disclosed"],
      rows: [
        { key: "salesforce.agentic_search_yoy", value: "+200%" },
        { key: "salesforce.base", value: "—", unread: true },
        { key: "shopify.ai_sessions_yoy", value: "+197%, orders 3x" },
        { key: "shopify.base", value: "—", unread: true },
        { key: "amazon.alexa_shopping_actives", value: "~2x in quarter, 350M+ users" },
        { key: "amazon.orders_via_agent", value: "—", unread: true },
        { key: "walmart.sparky_units", value: "4x, WAU +100%" },
        { key: "walmart.base", value: "—", unread: true },
      ],
      caption: "Salesforce Jul 2026, Shopify Aug 2026, Amazon Q2 2026 call, Walmart Q1 FY27 call",
    },
    {
      type: "p",
      text: "Every one of those is a ratio: up 200%, up 197%, up 4x, doubled. The channel is clearly accelerating. Published data still can't tell us how large it is.",
    },
    { type: "h", text: "Nobody has published a denominator" },
    {
      type: "p",
      text: "Read the numbers again. Up 200% from what base? Four times how many units? Doubled from what?",
    },
    {
      type: "p",
      text: "This isn't an accident of reporting. A number that goes into a press release is a number you get asked about next quarter, and a level invites a comparison that a growth rate avoids. Retailers have been careful, and the sell side hasn't yet built a framework to press for it.",
    },
    {
      type: "p",
      text: "There's also no agreed unit. Nobody has defined a weekly or monthly active agent, so even the companies that wanted to publish a level would be publishing something incomparable to the company next door.",
    },
    {
      type: "p",
      text: "When a category can't state its own size, growth rates fill the vacuum. They're easy to report honestly and hard to use for a decision.",
    },
    { type: "h", text: "The measurement itself is leaking" },
    {
      type: "p",
      text: "The missing denominator isn't only a reporting choice. The measurement itself leaks.",
    },
    {
      type: "p",
      text: "A meaningful share of AI-influenced traffic doesn't identify itself as AI-influenced. [Scrunch](https://scrunch.com/blog/surviving-the-clickpocalypse-ai-eating-the-news), working from an opt-in panel that linked real AI conversations to anonymized browsing, found only 1.1% of news visits following an AI conversation arrived carrying an AI referrer, with roughly three quarters of the rest showing up as direct. That's publisher data rather than commerce, so treat it as a transfer rather than a finding, and Scrunch's own methodology is explicit that it shouldn't be inverted into a share of visits caused by AI.",
    },
    {
      type: "bars",
      title: "How news visits that followed an AI conversation showed up in analytics",
      max: 100,
      items: [
        { label: "Arrived as direct traffic", value: 74, display: "~3 in 4" },
        { label: "Arrived carrying an AI referrer", value: 1.1, display: "1.1%", highlight: true },
      ],
      caption: "Scrunch AI, opt-in panel, Feb–Jun 2026. Publisher data. Not to be inverted into a share of visits caused by AI",
    },
    {
      type: "p",
      text: "The defensible reading is narrow and still damaging: your referral dashboard can't tell you either way. Microsoft shipped an [AI scrape-to-referral card](https://clarity.microsoft.com/blog/scrape-to-referral-insights/) in Clarity's bot analytics this year, which tells you the industry is building the instrument now, in 2026, years after the traffic started.",
    },
    {
      type: "p",
      text: "Part of the base is missing because the plumbing was built for clicks and referrers, and agents produce neither reliably.",
    },
    { type: "h", text: "A growth rate without a denominator" },
    {
      type: "p",
      text: "That's the phrase worth carrying into your next planning meeting. Not \"agentic commerce is overhyped,\" and not \"it's a trillion dollars.\" A growth rate without a denominator.",
    },
    {
      type: "p",
      text: "It's worth knowing the pattern is normal. Every measurement era started exactly here: Share of Shelf grew an $8B measurement industry around counting facings, Share of Voice earned $12B, and Share of Search now sits underneath $200B+ a year of spend.",
    },
    {
      type: "eras",
      items: [
        { era: "Share of Shelf", unit: "Facings counted in store", spend: "$8B", period: "1950s–1990s" },
        { era: "Share of Voice", unit: "Impressions and GRPs", spend: "$12B", period: "1960s–2000s" },
        { era: "Share of Search", unit: "Queries, clicks, rank", spend: "$200B+", period: "2000s–today" },
        { era: "Share of Algorithm", unit: "Not yet defined", spend: "~$1T forecast", period: "Undated", current: true },
      ],
      caption: "Each number existed only after somebody defined the unit and started counting",
    },
    {
      type: "p",
      text: "Each of those numbers existed only after somebody defined the unit and started counting. The forecast for this era is the $1T figure above, and the counting hasn't started. That's the gap [Share of Algorithm](/insights/share-of-algorithm) is meant to fill.",
    },
    { type: "h", text: "The transaction gap" },
    {
      type: "p",
      text: "The strongest case against the forecasts is the transaction gap, and it's substantial.",
    },
    {
      type: "p",
      text: "[PYMNTS found only 19% of AI users had ordered anything through AI](https://www.pymnts.com/news/retail/2026/ai-finds-the-deal-shoppers-still-make-the-call/), and [Gartner has 11% of US consumers](https://www.gartner.com/en/newsroom/press-releases/2026-05-27-gartner-survey-finds-consumers-want-ai-shopping-help-but-not-ai-purchase-decisions) willing to let AI make the purchase decision, with 54% double-checking what it tells them. Influence is running far ahead of transaction, and every $1T forecast assumes that gap closes.",
    },
    {
      type: "bars",
      title: "Influence versus transaction",
      max: 100,
      items: [
        { label: "Consumers who double-check what GenAI tells them", value: 54, display: "54%" },
        { label: "AI users who have ordered anything through AI", value: 19, display: "19%", highlight: true },
        { label: "Would let AI make the purchase decision", value: 11, display: "11%" },
      ],
      caption: "PYMNTS, Aug 2026. Gartner, May 2026",
    },
    {
      type: "p",
      text: "It might not close on schedule. Trust is the binding constraint, and trust in this channel is being spent every time an agent quotes a price that turns out to be wrong. Why that happens so often is the subject of [how AI shopping agents decide what to recommend](/insights/how-ai-shopping-agents-decide).",
    },
    { type: "h", text: "How I'd plan around an unknown" },
    {
      type: "list",
      items: [
        "Measure your own. You can't get the category number, but you can get yours. Separate AI-sourced sessions from organic in your analytics, accept that it's an undercount, and start the series now so you have twelve months of history when the question gets asked seriously.",
        "Ask for the base. When a vendor or a deck hands you a growth rate, ask what it grew from. If the answer isn't available, treat the figure as directional and size your plan on something else.",
        "Watch the transaction gap, not the traffic. The 19% is the number that decides whether the forecasts land. It's the one I'd put on the wall.",
      ],
    },
    {
      type: "p",
      text: "Everyone in commerce is being asked to plan against a number nobody has published. The direction is clear and the growth is fast. The current level is still genuinely unknown. I'd rather say that plainly than pick a forecast and pretend it's a measurement.",
    },
    {
      type: "sources",
      items: [
        {
          claim: "~$1T US agentic retail by 2030",
          source: "McKinsey / ICSC, Shopping in the Age of AI",
          date: "Apr 2026",
          url: "https://www.icsc.com/news-and-views/icsc-exchange/icsc-mckinsey-company-release-shopping-in-the-age-of-ai-redefining-stores-for-a-new-era-report",
        },
        {
          claim: "15-25% of US e-commerce agentic by 2030",
          source: "Bain, 2030 forecast snap chart",
          date: "Dec 2025",
          url: "https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/",
        },
        {
          claim: "Agentic search as first purchase-path step +200% YoY; brand-owned discovery -7%; traditional search -15%; 1.5B+ shoppers",
          source: "Salesforce State of Commerce, 4th ed.",
          date: "Jul 28, 2026",
          url: "https://www.salesforce.com/news/stories/agentic-search-growth/",
        },
        {
          claim: "AI-referred sessions +197% YoY, orders 3x, vs organic sessions +12%",
          source: "Shopify Enterprise, Q2 2026 commerce data",
          date: "Aug 11, 2026",
          url: "https://www.shopify.com/enterprise/blog/ai-search-category-behavior",
        },
        {
          claim: "Alexa for Shopping 350M+ users, actives ~doubled in Q2, interactions +5x YoY, 40%+ more per order",
          source: "Amazon Q2 2026 earnings call, Andy Jassy",
          date: "Jul 30, 2026",
          url: "https://www.aboutamazon.com/news/company-news/amazon-ceo-andy-jassy-stores-growth-ai-shopping-q2-2026-earnings",
        },
        {
          claim: "Walmart Sparky weekly actives +100% YoY, units 4x, ~35% higher AOV",
          source: "Walmart Q1 FY2027 call, via Digital Commerce 360",
          date: "May 2026",
          url: "https://www.digitalcommerce360.com/2026/05/22/walmart-sparky-agent-ai-sales-supply-chain/",
        },
        {
          claim: "1.1% of news visits following an AI conversation carry an AI referrer; ~three quarters of the rest show as direct. Not to be inverted",
          source: "Scrunch AI, opt-in panel, Feb–Jun 2026",
          date: "Aug 13, 2026",
          url: "https://scrunch.com/blog/surviving-the-clickpocalypse-ai-eating-the-news",
        },
        {
          claim: "Microsoft Clarity ships an AI Scrape-to-Referral Ratio card",
          source: "Microsoft Clarity blog",
          date: "Aug 13, 2026",
          url: "https://clarity.microsoft.com/blog/scrape-to-referral-insights/",
        },
        {
          claim: "Era anchors: $8B Shelf, $12B Voice, $200B+ Search, ~$1T expected Algorithm",
          source: "Parleo, Share of Algorithm framework",
          date: "2026",
          url: "/insights/share-of-algorithm",
        },
        {
          claim: "Only 19% of AI users ordered via AI",
          source: "PYMNTS, The Overlap Effect, n=2,160",
          date: "Aug 5, 2026",
          url: "https://www.pymnts.com/news/retail/2026/ai-finds-the-deal-shoppers-still-make-the-call/",
        },
        {
          claim: "11% would let AI make the purchase decision; 54% double-check GenAI",
          source: "Gartner newsroom",
          date: "May 27, 2026",
          url: "https://www.gartner.com/en/newsroom/press-releases/2026-05-27-gartner-survey-finds-consumers-want-ai-shopping-help-but-not-ai-purchase-decisions",
        },
      ],
    },
  ],
};

export default post;
