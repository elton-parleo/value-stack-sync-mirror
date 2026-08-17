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
  body: [
    { type: "p", text: "ChatGPT doesn't just quote prices anymore, it awards its own Best Price tag." },
    { type: "p", text: "Profound's June pass through about a million shopping offers found the rule: products arriving through a structured merchant feed get that tag 100% of the time, versus 21% when the machine has to scrape the page. Feed-sourced offers take the top slot in the answer 99.9% of the time." },
    { type: "stat", value: "99.9%", label: "Share of top answer slots taken by feed-sourced offers" },
    { type: "p", text: "Rank is mostly a function of what you handed the machine. If your products still reach agents by scraping, shipping the structured feed is the cheapest rank you'll ever buy. It still won't carry your member prices, which is the harder half." },
    { type: "h", text: "Our own benchmark, grooming category" },
    { type: "p", text: "The miss sits at the very top of the market: 1 in 31 mentions of the category's best performer cited any incentive at all, and every brand below it did worse. The deals are funded, live on the sites, and structurally absent from the channel where the most price-motivated shoppers now start." },
    { type: "h", text: "Five prices in 27 days" },
    { type: "p", text: "A jar of Augustinus Bader face cream at Nordstrom cost five different amounts over the last 27 days, and which one you paid came down to which card is in your wallet." },
    { type: "p", text: "Anniversary Sale pricing had it at $423.75. On Sunday the sale ended and it went back to $565, a $141 swing. But the sale price wasn't one price either: cardholders at Icon status could buy on July 14, Ambassadors on the 15th, Influencers on the 16th, everyone else waited until the 18th. Free loyalty members earned points and got no early access at all." },
    { type: "p", text: "Nordstrom even prints the after-sale price next to the sale price, so a machine can read both numbers and still can't tell you which one applies to you, because the answer lives in your card status, not in the markup." },
    { type: "h", text: "Retailers can feel the collision coming" },
    { type: "stat", value: "41%", label: "Multichannel organizations naming inconsistent pricing and promotions their #1 omnichannel failure point (Salesforce)" },
    { type: "p", text: "Only 2% reported no failure point at all. The agent didn't create that inconsistency, it just reads it out loud to every shopper who asks." },
    { type: "quote", text: "Being visible in the answer and being chosen by it are two different problems, and almost every tool on the market measures the first one." },
  ],
};

export default post;
