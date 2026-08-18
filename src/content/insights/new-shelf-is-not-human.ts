import image from "@/assets/insights/rendered/new-shelf.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "new-shelf-is-not-human",
  title: "The new shelf is being built for a customer that isn't human",
  dek: "Every price in an agent's comparison table is a list price. No member price, no card-linked offer, no loyalty math.",
  date: "2026-08-11",
  dateLabel: "August 11, 2026",
  category: "Point of view",
  readTime: "4 min read",
  image,
  imageAlt:
    "ChatGPT comparing a Patagonia Down Sweater at Amazon and REI, with a panel showing the REI true price is $228.65 after member benefits.",
  linkedInUrl: "https://www.linkedin.com/in/samarbirwadker/recent-activity/all/",
  author: "Samar Birwadker",
  keywords: [
    "agentic commerce",
    "AI shopping",
    "list price",
    "loyalty",
    "true cost",
    "agentic search",
  ],
  takeaways: [
    "46% of AI shoppers use agents to compare prices and find deals, and the table they see is almost entirely list prices.",
    "Walmart pulled 200,000 products out of third-party agent checkout, rebuilt inside its own walls, and now posts 35% bigger baskets.",
    "Shoppers starting purchases with agentic search grew 200% year over year.",
    "Trade spend funds the offers and retail media buys the placement. Agents bypass both.",
  ],
  faq: [
    {
      q: "Why do AI agents compare list prices instead of real prices?",
      a: "Agents read whatever price is structurally available, which is usually the list or sale price on the page or in the feed. Member pricing, card-linked offers and loyalty math live in systems the agent can't query, so they never reach the comparison table.",
    },
    {
      q: "How big is agentic retail going to get?",
      a: "McKinsey puts US agentic retail at roughly $1T by 2030, and Salesforce measured 200% year over year growth in shoppers starting purchases with agentic search.",
    },
    {
      q: "What should brands do about the gap?",
      a: "Make funded value machine-readable so the agent can compute true cost, not just list price. That's the layer Parleo builds.",
    },
  ],
  body: [
    { type: "p", text: "The internet and e-commerce are being rebuilt for a customer that isn't human." },
    { type: "p", text: "And people are already using AI that way. 46% of AI shoppers use it to compare prices and find deals." },
    { type: "p", text: "The problem is that every price in a ChatGPT comparison table is usually a list price. No member price, no card-linked offer, no loyalty math, just the number sitting at the top of the page." },
    { type: "quote", text: "The models are interchangeable. The context is the variable." },
    { type: "h", text: "The internet retail runs on was built for eyeballs" },
    { type: "p", text: "Twenty years of storytelling, PDPs, banners, badges and urgency copy, all designed to influence what a person sees and buys. Now it's being rebuilt for agents that read feeds and APIs and skip almost all of it." },
    { type: "p", text: "The proof is in how big tech and the frontier models are behaving. OpenAI launched Instant Checkout last fall and killed it by March. Walmart put 200,000 products in, watched conversion run about three times worse than its own site, pulled them, then rebuilt inside its own walls, where its agent can see your membership, promotions and fulfillment, and is now posting 35% bigger baskets." },
    { type: "h", text: "The shift has stopped being theoretical" },
    { type: "stat", value: "+200%", label: "Year over year growth in shoppers starting purchases with agentic search (Salesforce)" },
    { type: "p", text: "Adobe tracked AI-referred shoppers converting 23% worse last Prime Day and 50% better this one. McKinsey puts US agentic retail at about $1T by 2030." },
    { type: "h", text: "Agents bypass both sides of the coin" },
    { type: "p", text: "Trade spend funds the offers, rewards and discounts brands run at retail. Retail media buys the banners and sponsored listings layered on top. Agents bypass both. They don't see the banner, and they can't read the deal you funded." },
    { type: "p", text: "That gap, what actually survives the trip from your pricing stack into the agent's answer, is where we've been building for the past 6 months." },
    { type: "h", text: "A simple test" },
    { type: "p", text: "We asked ChatGPT to find the best price for a Patagonia Down Sweater Hoody. It picked the cheaper list price. But once you factor in the member benefits and funded offers the agent couldn't see, the more expensive retailer was actually the better deal." },
    { type: "p", text: "That's a pretty meaningful problem if your best customers are the ones getting those offers in the first place." },
  ],
};

export default post;
