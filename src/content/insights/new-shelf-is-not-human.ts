import image from "@/assets/insights/rendered/new-shelf.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "new-shelf-is-not-human",
  title: "The new shelf is being built for a customer that isn't human",
  dek: "Retail built the product page for eyes. The next shelf is assembled by software that reads feeds, policies and APIs instead.",
  date: "2026-08-10",
  dateLabel: "August 10, 2026",
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
    "The product detail page is no longer the only surface that decides discovery. Agents can assemble a shelf before a shopper visits a retailer.",
    "Walmart pulled 200,000 products out of third-party agent checkout, rebuilt inside its own walls, and now posts 35% bigger baskets.",
    "Shoppers starting purchases with agentic search grew 200% year over year.",
    "The new merchandising unit is the bundle of product facts, policies, availability and value an agent can retrieve and trust.",
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
    { type: "p", text: "For most of e-commerce history, the shelf was a page. A person landed on it, scanned the options and responded to the way a retailer arranged them." },
    { type: "p", text: "An agent can build that shelf somewhere else. It pulls candidates from several merchants, decides which attributes matter and presents a shortlist before the shopper reaches any product page." },
    { type: "p", text: "That changes the unit of merchandising. The page still matters, but so do the product facts, policies, availability and value that can survive outside it." },
    { type: "quote", text: "The models are interchangeable. The context is the variable." },
    { type: "h", text: "The internet retail runs on was built for eyeballs" },
    { type: "p", text: "Twenty years of product pages, banners, badges and urgency copy were tuned to move a person. Agents read feeds and APIs, then skip much of the choreography." },
    { type: "p", text: "The clearest signal is how the large platforms are behaving. OpenAI launched Instant Checkout last fall and killed it by March. Walmart put 200,000 products in, saw conversion run about three times worse than its own site, then pulled them and rebuilt inside its own walls. There, its agent can see membership, promotions and fulfillment. It's now posting 35% bigger baskets." },
    { type: "h", text: "The numbers are already moving" },
    { type: "stat", value: "+200%", label: "Year over year growth in shoppers starting purchases with agentic search (Salesforce)" },
    { type: "p", text: "Adobe tracked AI-referred shoppers converting 23% worse last Prime Day and 50% better this one. McKinsey puts US agentic retail at about $1T by 2030." },
    { type: "h", text: "Walmart's move is the useful tell" },
    { type: "p", text: "Walmart's response wasn't to make a prettier page inside someone else's checkout. It brought the experience back into an environment where its agent could use membership, promotion and fulfillment context together." },
    { type: "p", text: "That doesn't mean every retailer needs a closed agent. It does mean the winning surface will be the one with the richest trustworthy context, not automatically the one with the most polished product page." },
    { type: "h", text: "Merchandising now has two audiences" },
    { type: "p", text: "People still need photography, language and reassurance. Machines need clean identity, comparable attributes, current availability and explicit conditions. Treating one as a substitute for the other is the mistake." },
    { type: "p", text: "The practical question for a retailer is no longer just how a product looks on its own shelf. It's what remains true and persuasive after an agent lifts that product out of the page and places it beside three alternatives." },
  ],
};

export default post;
