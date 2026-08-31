import image from "@/assets/insights/rendered/best-price.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "how-agents-pick-the-best-price",
  title: "How agents actually pick the best price",
  dek: "Feed-sourced offers take the top slot 99.9% of the time. Rank is mostly a function of what you handed the machine.",
  date: "2026-08-12",
  dateLabel: "August 12, 2026",
  category: "Research",
  readTime: "5 min read",
  image,
  imageAlt:
    "ChatGPT quoting $565 for Augustinus Bader face cream across retailers, next to a panel showing the $423.75 Anniversary Sale price gated by card status.",
  linkedInUrl: "https://www.linkedin.com/in/samarbirwadker/recent-activity/all/",
  author: "Samar Birwadker",
  keywords: [
    "agentic commerce",
    "AI shopping agents",
    "best price",
    "merchant feeds",
    "loyalty pricing",
    "ChatGPT shopping",
  ],
  takeaways: [
    "Products delivered through a structured merchant feed earn ChatGPT's Best Price tag 100% of the time, versus 21% when the agent has to scrape the page.",
    "Feed-sourced offers take the top answer slot 99.9% of the time, so rank is largely a function of what you handed the machine.",
    "Feeds still don't carry member prices: only 1 in 31 mentions of the top grooming brand cited any incentive.",
    "A single jar of face cream carried five prices in 27 days at one retailer, all decided by card status the agent can't read.",
  ],
  faq: [
    {
      q: "How do AI shopping agents decide which price is the best price?",
      a: "They rank on the offer data they can read. Structured merchant feeds win the Best Price tag 100% of the time in Profound's sample of roughly a million shopping offers, and take the top answer slot 99.9% of the time. Scraped pages win it 21% of the time.",
    },
    {
      q: "Do agents see member prices and card-linked offers?",
      a: "Almost never. Feeds carry list price and sale price, not loyalty tiers or card status. In our grooming benchmark only 1 in 31 mentions of the category leader cited any incentive at all.",
    },
    {
      q: "What is the fastest way to improve agent price rank?",
      a: "Ship a structured product feed first, then expose funded value (member price, card offers, subscription pricing) in a machine-readable layer so the agent can quote the price a shopper would actually pay.",
    },
  ],
  body: [
    { type: "p", text: "ChatGPT doesn't just quote prices anymore. It hands out its own Best Price tag." },
    { type: "p", text: "Profound's June pass through about a million shopping offers found the rule behind it: products arriving through a structured merchant feed get that tag 100% of the time, versus 21% when the machine has to scrape the page. Feed-sourced offers take the top slot in the answer 99.9% of the time." },
    { type: "stat", value: "99.9%", label: "Share of top answer slots taken by feed-sourced offers" },
    { type: "p", text: "So rank is mostly a function of what you handed the machine. If your products still reach agents by scraping, the structured feed is the cheapest rank you'll ever buy. It still won't carry your member prices, which is the harder half." },
    { type: "h", text: "Our own benchmark, grooming category" },
    { type: "p", text: "The miss sits at the very top of the market. 1 in 31 mentions of the category's best performer cited any incentive at all, and every brand below it did worse. The deals are funded, they're live on the sites, and they're structurally absent from the channel where the most price-motivated shoppers now start." },
    { type: "h", text: "Five prices in 27 days" },
    { type: "p", text: "A jar of Augustinus Bader face cream at Nordstrom cost five different amounts over 27 days, and which one you paid came down to which card is in your wallet." },
    { type: "p", text: "Anniversary Sale pricing had it at $423.75. Sunday the sale ended and it went back to $565, a $141 swing. But the sale price wasn't one price either. Cardholders at Icon status could buy July 14, Ambassadors the 15th, Influencers the 16th, everyone else waited until the 18th. Free loyalty members earned points and got no early access at all." },
    { type: "p", text: "Nordstrom even prints the after-sale price next to the sale price. A machine can read both numbers and still can't tell you which one applies to you, because the answer lives in your card status, not in the markup." },
    { type: "h", text: "Retailers can feel the collision coming" },
    { type: "stat", value: "41%", label: "Multichannel organizations naming inconsistent pricing and promotions their #1 omnichannel failure point (Salesforce)" },
    { type: "p", text: "Only 2% reported no failure point at all. The agent didn't create that inconsistency. It reads it out loud to every shopper who asks." },
    { type: "quote", text: "Being visible in the answer and being chosen by it are two different problems, and almost every tool on the market measures the first one." },
  ],
};

export default post;
