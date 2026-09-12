import image from "@/assets/insights/rendered/pricing-rails.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "incentives-are-becoming-pricing-rails",
  title: "Incentives are becoming pricing rails in agentic commerce",
  dek: "The moment an agent starts comparing offers, a promotion stops being campaign copy and starts behaving like pricing infrastructure.",
  date: "2026-08-12",
  dateLabel: "August 12, 2026",
  category: "Point of view",
  readTime: "3 min read",
  image,
  imageAlt:
    "An AI shopping answer beside the member prices and funded incentives that shape what a customer actually pays.",
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
    "An incentive becomes pricing infrastructure when it changes the computable cost an agent uses to compare offers.",
    "That creates a useful split: merchandising decides the offer, while product data decides whether the offer reaches the machine.",
    "The strategic advantage isn't the deepest discount. It's making conditional value legible without flattening every customer into the same list price.",
    "The brands that win agent channels are the ones whose member prices and deals an agent can actually read.",
  ],
  faq: [
    {
      q: "Why does an AI agent quote the highest price on the page?",
      a: "Agents usually compare the price available in a page or product feed. Tiered prices such as autoship, first-order discounts and member pricing sit in eligibility logic the agent may not receive, so they never enter the answer.",
    },
    {
      q: "Are incentives now part of pricing infrastructure?",
      a: "They become infrastructure when an agent can read the offer, test its eligibility and include its value in a comparison. Until then, they're still marketing spend with no reliable path into the recommendation.",
    },
    {
      q: "Does making incentives machine-readable mean exposing them to everyone?",
      a: "No. The condition can travel with the value. A machine-readable offer can still require membership, a qualifying card, a subscription or a specific basket before it applies.",
    },
  ],
  body: [
    { type: "p", text: "For years, incentives sat comfortably on the marketing line: points, member pricing, card-linked offers, subscription discounts. Brands funded them to change behavior and booked them as a cost of doing business." },
    { type: "p", text: "That distinction starts to break when software makes the comparison. If an offer changes the number an agent ranks, it isn't merely a message around the price. It's part of the pricing system." },
    { type: "h", text: "The condition is part of the price" },
    { type: "p", text: "A subscription discount is a price with a commitment attached. A card offer is a price with a payment condition. A loyalty tier is a price earned through a prior relationship. Retailers already know how to manage these distinctions for people." },
    { type: "p", text: "Agents need the same three pieces in a form they can use: the value, the eligibility rule and the moment it can be verified. Leave out any one and the offer collapses back to list price." },
    { type: "list", items: ["Value: what changes in the customer's economics", "Eligibility: who can claim it and under what condition", "Verification: when the retailer can confirm that condition"] },
    { type: "quote", text: "Every tier, every member price, every card offer you fund: how much of it can an agent actually see?" },
    { type: "h", text: "This is a margin problem, not a discounting argument" },
    { type: "p", text: "The blunt fix would be lowering list price for everyone. That's also the fastest way to give away margin and flatten the customer relationships the incentive was designed to reward." },
    { type: "p", text: "A better rail lets the condition travel with the value. The agent can recognize that one shopper qualifies for a member price and another doesn't, without pretending either number is universally true." },
    { type: "p", text: "The detailed evidence on what gets lost today sits in [what happens to trade spend when agents shop](/insights/trade-spend-when-agents-shop). The strategic point is simpler: once software is the shopper, offer design and data design become the same job." },
  ],
};

export default post;
