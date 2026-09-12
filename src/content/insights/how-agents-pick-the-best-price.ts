import image from "@/assets/insights/rendered/best-price.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "how-agents-pick-the-best-price",
  title: "How agents actually pick the best price",
  dek: "A Best Price badge looks definitive. Underneath it sits a messier question: which price did the agent actually verify?",
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
    "ChatGPT's Best Price badge reflects the offer data it can read, not every price a particular shopper can claim.",
    "Structured feeds make an offer easier to rank, but they still leave out member status, card eligibility and timing.",
    "Feeds still don't carry member prices: only 1 in 31 mentions of the top grooming brand cited any incentive.",
    "A single jar of face cream carried five prices in 27 days at one retailer, all decided by card status the agent can't read.",
  ],
  faq: [
    {
      q: "How do AI shopping agents decide which price is the best price?",
      a: "They compare the offer data available at ranking time. A structured feed makes a price legible, but it doesn't prove that the number is the best price for a particular shopper. Member status, card eligibility and timing can still change the answer.",
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
    { type: "p", text: "Ask ChatGPT for the best price and it may now put a badge on the answer. Best Price. Two words that sound like the comparison is over." },
    { type: "p", text: "But a price badge can only certify the offers that made it into the comparison. It can't see a card tier, a member window or a promotion that resolves after the ranking step. That makes the badge useful, but narrower than it looks." },
    { type: "stat", value: "5", label: "Different prices carried by one jar of face cream at one retailer in 27 days" },
    { type: "p", text: "The interesting question isn't whether an agent can sort numbers. It's whether the right number ever reached the sort." },
    { type: "h", text: "What we found in grooming" },
    { type: "p", text: "The miss sits at the very top of the market. 1 in 31 mentions of the category's best performer cited any incentive at all, and every brand below it did worse. The deals are funded, they're live on the sites, and they're structurally absent from the channel where the most price-motivated shoppers now start." },
    { type: "h", text: "Five prices in 27 days" },
    { type: "p", text: "The cleanest example we found was a jar of Augustinus Bader face cream at Nordstrom. Over 27 days it carried five different prices, and the one you could claim came down to which card was in your wallet." },
    { type: "p", text: "Anniversary Sale pricing had it at $423.75. Sunday the sale ended and it went back to $565, a $141 swing. But the sale price wasn't one price either. Cardholders at Icon status could buy July 14, Ambassadors the 15th, Influencers the 16th, everyone else waited until the 18th. Free loyalty members earned points and got no early access at all." },
    { type: "p", text: "Nordstrom even prints the after-sale price next to the sale price. A machine can read both numbers and still can't tell you which one applies to you, because the answer lives in your card status, not in the markup." },
    { type: "h", text: "Retailers can feel the collision coming" },
    { type: "stat", value: "41%", label: "Multichannel organizations naming inconsistent pricing and promotions their #1 omnichannel failure point (Salesforce)" },
    { type: "p", text: "Only 2% reported no failure point at all. An agent doesn't create that inconsistency. It turns it into an answer, with a badge attached." },
    { type: "quote", text: "Being visible in the answer and being chosen by it are two different problems, and almost every tool on the market measures the first one." },
  ],
};

export default post;
