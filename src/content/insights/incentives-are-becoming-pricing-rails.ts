import image from "@/assets/insights/rendered/pricing-rails.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "incentives-are-becoming-pricing-rails",
  title: "Incentives are becoming pricing rails in agentic commerce",
  dek: "$19.99 or $11.69? Chewy publishes both for the same bag of dog treats, on purpose. The agent quotes the worst one.",
  date: "2026-08-12",
  dateLabel: "August 12, 2026",
  category: "Point of view",
  readTime: "3 min read",
  image,
  imageAlt:
    "ChatGPT quoting $19.99 for Greenies on Chewy, next to a panel showing three lower published prices the agent missed.",
  linkedInUrl: "https://www.linkedin.com/in/samarbirwadker/recent-activity/all/",
  author: "Samar Birwadker",
  keywords: [
    "incentives",
    "pricing infrastructure",
    "trade promotion",
    "retail media",
    "agentic commerce",
    "autoship pricing",
  ],
  takeaways: [
    "Chewy publishes four prices for the same bag of dog treats: $19.99, $17.98, $17.08 and $11.69. ChatGPT quotes $19.99.",
    "Incentives are no longer a marketing line. They're the last lever that protects margin without breaking MAP.",
    "US trade promotion runs $200B+ a year and retail media about $69B. Agents bypass both.",
    "The brands that win agent channels are the ones whose member prices and deals an agent can actually read.",
  ],
  faq: [
    {
      q: "Why does an AI agent quote the highest price on the page?",
      a: "Agents read the top of the pricing ladder: list price. Tiered prices like autoship, first-order discounts and member pricing sit below it in logic the agent has no structured access to, so they never enter the answer.",
    },
    {
      q: "Are incentives now part of pricing infrastructure?",
      a: "Yes. In agentic commerce, funded incentives determine the price an agent quotes, which determines rank and conversion. That makes them pricing rails rather than promotional spend.",
    },
    {
      q: "How much money sits behind incentives that agents can't see?",
      a: "Roughly $200B a year in US trade promotion funds the deals, and about $69B in retail media buys the placement layered on top. Agents bypass both.",
    },
  ],
  body: [
    { type: "p", text: "In the eyeball era, incentives were a marketing line. Points, member pricing, card-linked offers, subscription discounts. Brands funded them to nudge behavior and booked them as a cost of doing business." },
    { type: "p", text: "In the agentic era they become pricing infrastructure. Probably the last lever that protects margin without torching MAP or racing everyone to the bottom on list price." },
    { type: "h", text: "One bag of Greenies, four published prices, same page" },
    { type: "list", items: ["$19.99 list", "$17.98 if you buy once", "$17.08 on autoship", "$11.69 on your first autoship order"] },
    { type: "p", text: "That spread is deliberate pricing design. The low price buys a subscriber and the lifetime value pays for it: margin traded for loyalty on purpose. It's beautiful work." },
    { type: "p", text: "So we asked ChatGPT what the bag costs. Fast, confident answer: $19.99. True, and also the worst of the four prices published on that page. The agent read the top of the ladder and stopped, and all the machinery Chewy built to turn margin into LTV never made it into the answer." },
    { type: "quote", text: "Every tier, every member price, every card offer you fund: how much of it can an agent actually see?" },
    { type: "h", text: "The money behind that answer is not small" },
    { type: "stat", value: "$200B+", label: "US trade promotion per year funding the deals" },
    { type: "stat", value: "~$69B", label: "Retail media buying the banners layered on top" },
    { type: "p", text: "Agents bypass both sides of that coin. The brands that win agent channels will be the ones whose member prices and deals an agent can read, because that's what protects the margin and rewards the customer you already paid to acquire." },
  ],
};

export default post;
