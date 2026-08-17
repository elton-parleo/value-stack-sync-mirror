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
  body: [
    { type: "p", text: "In the eyeball era, incentives were a marketing line. Points, member pricing, card-linked offers, subscription discounts. Brands funded them to nudge behavior and mostly treated them as a cost of doing business." },
    { type: "p", text: "In the agentic era incentives become pricing infrastructure, probably the last lever that protects margin without torching MAP or racing everyone to the bottom on list price." },
    { type: "h", text: "One bag of Greenies, four published prices, same page" },
    { type: "list", items: ["$19.99 list", "$17.98 if you buy once", "$17.08 on autoship", "$11.69 on your first autoship order"] },
    { type: "p", text: "That spread is deliberate pricing design. The low price buys a subscriber and the lifetime value pays for it, margin traded for loyalty on purpose. It's beautiful work." },
    { type: "p", text: "So we asked ChatGPT what the bag costs, and it answered fast and confidently: $19.99. True, and also the worst of the four published prices on that page. The agent saw the top of the ladder and stopped, and the machinery Chewy built to turn margin into LTV never made it into the answer." },
    { type: "quote", text: "Every tier, every member price, every card offer you fund: how much of it can an agent actually see?" },
    { type: "h", text: "The money behind that answer is not small" },
    { type: "stat", value: "$200B+", label: "US trade promotion per year funding the deals" },
    { type: "stat", value: "~$69B", label: "Retail media buying the banners layered on top" },
    { type: "p", text: "Agents bypass both sides of that coin. The brands that win agent channels will be the ones whose member prices and deals the agent can actually read, because that's what protects the margin and rewards the customer you already invested in." },
  ],
};

export default post;
