import image from "@/assets/insights/rendered/how-agents-decide.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "how-ai-shopping-agents-decide",
  title: "How AI shopping agents decide what to recommend",
  dek: "An agent doesn't recommend the cheapest product. It recommends the cheapest product it can read. Retrieval, ranking and price resolution, step by step.",
  date: "2026-08-22",
  dateLabel: "August 22, 2026",
  category: "Research",
  readTime: "7 min read",
  image,
  imageAlt:
    "Four-step diagram of how an AI shopping agent goes from retrieval to answer, with the member price dropping out at the ranking step.",
  author: "Samar Birwadker",
  seoTitle: "How AI Shopping Agents Decide What to Recommend | Parleo",
  seoDescription:
    "AI agents don't pick the cheapest product. They pick the cheapest product they can read. How retrieval, ranking and price resolution actually work, and why your best price almost never makes it into the answer.",
  keywords: [
    "how AI shopping agents work",
    "AI product recommendations",
    "agentic commerce ranking",
    "ChatGPT shopping",
    "merchant feed",
    "UCP catalog search",
    "list price vs member price",
  ],
  takeaways: [
    "Recommendation happens in four steps: retrieval, ranking, price attachment and answer construction. A weakness early in the chain carries through to the final shortlist.",
    "UCP catalog search defines two standard filters, category and price. Whatever you've built that isn't one of those isn't in the ranking.",
    "Eligibility resolves at checkout, so the price available at ranking time is list. Chewy publishes four prices for one bag of Greenies and the agent quotes the highest.",
    "79% of agent activity happens on product and search routes, 2.34% at checkout. The shortlist gets built where the data is worst.",
  ],
  faq: [
    {
      q: "How does an AI shopping agent choose which products to recommend?",
      a: "In four steps. It retrieves candidates by crawling pages or ingesting a structured merchant feed, ranks them on the dimensions it can compare, attaches the price available at that moment and returns a shortlist. Each step narrows what can appear in the answer.",
    },
    {
      q: "Why do AI agents quote list price instead of member or sale price?",
      a: "Because eligibility resolves at checkout. Member pricing, loyalty tiers and funded promotions depend on who is buying, and at the comparison step the agent hasn't identified anyone. Google's UCP identity linking is optional and only covers order reads and checkout, with no catalog or search scope.",
    },
    {
      q: "Do AI agents just pick the cheapest product?",
      a: "No. They can optimize for quality, fit and other preferences, but only when those signals are available and comparable. Price often wins because it is unusually structured, not because it is the shopper's only priority.",
    },
    {
      q: "What's the fastest way to improve how agents rank my products?",
      a: "Ship a structured product feed if agents still reach you by crawl. Then encode the value you already fund, member pricing and live promotions, in machine-readable form. Finally, read back what four assistants say about twenty of your products against what a real customer would pay.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Ask an AI assistant for the best option in your category and most of the outcome was decided before it wrote a word.",
    },
    {
      type: "p",
      text: "An AI shopping agent doesn't recommend the cheapest product. It recommends the cheapest product it can read. Those are different things, and the gap between them is where most brands are quietly losing.",
    },
    {
      type: "p",
      text: "I've spent this year measuring that gap across categories. What follows is the mechanism, step by step, because almost nobody outside the platforms has written it down plainly and every brand team I meet is guessing at it.",
    },
    {
      type: "flow",
      caption: "The path from your catalog to the answer, and where your real price falls out",
      steps: [
        {
          label: "Retrieval",
          title: "Your product reaches the agent",
          text: "By crawl (pull) or by structured merchant feed (push). Feed-sourced offers take the top slot 99.9% of the time.",
        },
        {
          label: "Ranking",
          title: "Candidates get compared",
          text: "UCP catalog search ships two standard filters: category and price. Anything else isn't comparable across merchants.",
          drop: "Member tier, points, card-linked offers",
        },
        {
          label: "Price",
          title: "A number gets attached",
          text: "Eligibility resolves at checkout, so the agent uses the one price true for a stranger: list.",
          drop: "Sale price, autoship, first-order pricing",
        },
        {
          label: "Answer",
          title: "Three products, prices attached",
          text: "79% of agent activity happens here and in search. 2.34% ever reaches the cart where a price gets verified.",
        },
      ],
    },
    { type: "h", text: "Step one: your product reaches the agent one of two ways" },
    { type: "p", text: "An agent gets product data by pull or by push." },
    {
      type: "p",
      text: "Pull means crawling your product page like a search engine would, parsing whatever markup it finds and inferring the rest. Push means a structured merchant feed, the same machine-readable format you already send to Google Shopping, delivered straight to the platform.",
    },
    { type: "p", text: "Both work. They don't work equally." },
    {
      type: "p",
      text: "[Profound analyzed about a million ChatGPT shopping offers](https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive) in June and found that products arriving through a structured feed carry ChatGPT's \"Best Price\" tag 100% of the time, against 21% for page-crawled products. Feed-sourced offers took the number one slot in 99.9% of cases.",
    },
    {
      type: "bars",
      title: "Share of offers carrying ChatGPT's Best Price tag, by how the product arrived",
      max: 100,
      items: [
        { label: "Structured merchant feed", value: 100, display: "100%", highlight: true },
        { label: "Crawled product page", value: 21, display: "21%" },
      ],
      caption: "Profound, ~1M ChatGPT shopping offers, June 2026",
    },
    {
      type: "p",
      text: "[Shopify's Q2 commerce data](https://www.shopify.com/enterprise/blog/ai-search-category-behavior) says the same thing from the platform side rather than the vendor side: AI-referred shoppers convert about twice as well when the agent is working from structured catalog data instead of scraped pages. Worth knowing that Shopify sells the catalog product this data recommends, so read it alongside Profound rather than on its own.",
    },
    {
      type: "p",
      text: "The first surprise is how much of the recommendation comes down to a plumbing decision most brands made years ago for a different channel.",
    },
    { type: "h", text: "Step two: ranking runs on what the machine can compare" },
    {
      type: "p",
      text: "Once the agent has candidates, it ranks them. And it can only rank on dimensions it actually has.",
    },
    {
      type: "p",
      text: "This is where the commerce protocols stop being theoretical. [UCP](https://ucp.dev/specification/catalog/search/), the standard most of this is converging on, defines exactly two standard filters for catalog search: category and price. Merchants can add custom filters, and many will, but a custom filter one merchant invents isn't comparable against the four other merchants in the same answer.",
    },
    {
      type: "p",
      text: "In practice, the comparison comes down to category and price. Not value. Not what a member pays. Price.",
    },
    {
      type: "p",
      text: "Anything you've built that isn't a category or a number is missing from the ranking.",
    },
    { type: "h", text: "Step three: the price it uses is your list price" },
    {
      type: "p",
      text: "This is the part that surprises people, and it isn't a bug anyone has to own up to.",
    },
    {
      type: "p",
      text: "Eligibility resolves late by design. Your member price, loyalty tier, card-linked offer and funded promotion all depend on who's asking. At the comparison step, the agent doesn't yet know who's asking. The protocols are explicit that eligibility and policy enforcement happen at checkout using binding transaction data, which is correct engineering: you shouldn't bind a discount to an unverified claim.",
    },
    {
      type: "p",
      text: "Google's implementation makes the consequence visible. Identity arrives at checkout, not while the shortlist is being built. The full scope gap is covered in [what happens to loyalty when the customer is an agent](/insights/loyalty-when-the-customer-is-an-agent).",
    },
    {
      type: "p",
      text: "Identity walks in through the checkout door, long after the agent picked the three products it's going to show you. Merchants who never implement linking get what Google calls \"guest experiences.\"",
    },
    {
      type: "p",
      text: "The Chewy example is the cleanest version I've found. Ask an agent for the best price on a 12-count bag of Greenies and you get $19.99, which is true, and is also the worst of [four prices published on the same page](https://www.chewy.com/greenies-bursting-blueberry-regular/dp/113459): $17.98 to buy once, $17.08 on autoship, and $11.69 on a first autoship order.",
    },
    {
      type: "ladder",
      title: "Greenies, 12 count, one Chewy product page",
      items: [
        { label: "List price", note: "The number the agent read, then stopped", price: "$19.99", quoted: true },
        { label: "Buy once", note: "Standard one-time purchase", price: "$17.98" },
        { label: "Autoship", note: "Recurring order", price: "$17.08" },
        { label: "First autoship order", note: "Margin traded for a subscriber, on purpose", price: "$11.69" },
      ],
      caption: "41.5% spread, all public, none hidden. Verified Aug 6, 2026",
    },
    {
      type: "p",
      text: "That's a 41.5% spread, all of it public and none of it hidden, and Chewy is trading margin for a subscriber on purpose because the lifetime value pays for it.",
    },
    { type: "p", text: "The agent read the top of the ladder and stopped." },
    {
      type: "p",
      text: "The number attached to the recommendation is the one that's true for nobody in particular.",
    },
    { type: "h", text: "Step four: almost all of this happens where the data is worst" },
    { type: "p", text: "Agents don't spend their time where you'd think." },
    {
      type: "p",
      text: "[HUMAN Security's traffic data](https://www.humansecurity.com/learn/blog/state-of-agentic-traffic-june-2026-browser-agent-tooling-for-developers-is-catching-on-fast) puts 79% of agent activity in product and search routes against 2.34% at checkout. Roughly four in five agent visits happen during comparison. One in forty reaches the step where a price gets verified against a live cart.",
    },
    {
      type: "bars",
      title: "Where agent traffic actually lands",
      max: 100,
      items: [
        {
          label: "Product and search routes (comparison)",
          value: 79,
          display: "79%",
          note: "Feeds, crawls, third-party data of mixed vintage",
          highlight: true,
        },
        {
          label: "Checkout (price verified against a live cart)",
          value: 2.34,
          display: "2.34%",
          note: "The only step with accurate pricing",
        },
      ],
      caption: "HUMAN Security, State of Agentic Traffic, June 2026",
    },
    {
      type: "p",
      text: "The shortlist is decided on feeds, crawls and third-party data of wildly different vintages. The accurate price arrives in the phase agents barely visit.",
    },
    {
      type: "p",
      text: "Any correction arrives after the decision was made, if it arrives at all.",
    },
    { type: "h", text: "Put together: the cheapest legible price wins" },
    {
      type: "p",
      text: "Four steps, one outcome. Retrieval favors whoever pushed a feed, ranking runs on category and price, the price available at ranking time is list, and the compare step is where nearly all the traffic sits.",
    },
    {
      type: "quote",
      text: "The winner isn't the best offer. It's the best offer the machine could read.",
    },
    {
      type: "p",
      text: "That's the whole thing, and it's why two brands with identical economics can get completely different outcomes in an AI answer. It's also why we score this as a category rather than argue it: [Share of Algorithm](/insights/share-of-algorithm) measures whether you're in the answer, whether an agent can parse you, and whether the value behind your price survives into what the shopper actually reads.",
    },
    { type: "h", text: "The ranking is only as rich as its inputs" },
    {
      type: "p",
      text: "The obvious conclusion is that agents will race everything to the bottom. That confuses the behavior of the ranking system with the preference of the shopper.",
    },
    {
      type: "p",
      text: "A shopper can care about quality, fit, delivery, loyalty status and total cost. If those signals arrive as prose, images or rules behind a login while list price arrives as a clean field, the ranking will look more price-sensitive than the shopper really is. [The loyalty article](/insights/loyalty-when-the-customer-is-an-agent) covers the customer side of that gap.",
    },
    {
      type: "p",
      text: "The machine doesn't necessarily care only about price. Right now, price is often all it can see. That's a different problem, and a solvable one.",
    },
    { type: "h", text: "Where to start" },
    {
      type: "list",
      items: [
        "Ship the structured feed if your products still reach agents by crawl. On the evidence above it's the cheapest ranking improvement available, and most brands already produce the file for another channel.",
        "Encode what you already fund. Member pricing and live promotions in machine-readable form is the half no feed does for you, and it's where the margin you're protecting actually lives.",
        "Read back what the agents say. Take twenty products, four assistants, and write down the price each one returns against what a real customer would pay today. That gap is your number, and almost nobody has it.",
      ],
    },
    {
      type: "p",
      text: "A recommendation can look considered even when its inputs were thin. The work now is making sure the agent has enough context to deserve the confidence of its answer.",
    },
    {
      type: "sources",
      items: [
        {
          claim: "Best Price tag 100% feed vs 21% crawled; 99.9% of feed offers rank first; ~1M offers",
          source: "Profound, ChatGPT shopping deep dive",
          date: "Jun 24, 2026",
          url: "https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive",
        },
        {
          claim: "AI-referred shoppers convert ~2x better on structured catalog data",
          source: "Shopify Enterprise, Q2 2026 commerce data",
          date: "Aug 11, 2026",
          url: "https://www.shopify.com/enterprise/blog/ai-search-category-behavior",
        },
        {
          claim: "UCP Catalog Search defines two standard filters, category and price",
          source: "UCP specification, search filters",
          date: "Verified Aug 14, 2026",
          url: "https://ucp.dev/specification/catalog/search/",
        },
        {
          claim: "UCP Identity Linking is OAuth, optional, scopes are order reads and checkout management; \"guest experiences\"",
          source: "Google Merchant UCP documentation",
          date: "May 28, 2026",
          url: "https://developers.google.com/merchant/ucp/guides/identity-linking",
        },
        {
          claim: "Greenies 12 ct, four published prices: $19.99 / $17.98 / $17.08 / $11.69",
          source: "Chewy product page",
          date: "Verified Aug 6, 2026",
          url: "https://www.chewy.com/greenies-bursting-blueberry-regular/dp/113459",
        },
        {
          claim: "79% of agent activity on product and search routes vs 2.34% at checkout",
          source: "HUMAN Security, State of Agentic Traffic",
          date: "Jun 2026",
          url: "https://www.humansecurity.com/learn/blog/state-of-agentic-traffic-june-2026-browser-agent-tooling-for-developers-is-catching-on-fast",
        },
        {
          claim: "80% want a quality deal vs 58% merely the lowest price",
          source: "XCCommerce / SmartBrief / NRF Shopper Study",
          date: "Feb 18, 2026",
          url: "https://www.businesswire.com/news/home/20260218739034/en/Shopper-Study-More-Than-70-of-Shoppers-Turn-to-AI-to-Find-Deals",
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
