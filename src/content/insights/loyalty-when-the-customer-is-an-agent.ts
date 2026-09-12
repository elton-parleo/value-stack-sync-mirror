import image from "@/assets/insights/rendered/loyalty-stranger.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "loyalty-when-the-customer-is-an-agent",
  title: "What happens to loyalty programs when the customer is an agent",
  dek: "Your loyalty program still works. The agent just can't see it at the moment it ranks you. Why identity resolves at checkout, what Google's own docs call the alternative, and what it costs.",
  date: "2026-09-03",
  dateLabel: "September 3, 2026",
  category: "Point of view",
  readTime: "6 min read",
  image,
  imageAlt:
    "An AI agent answer window quoting a list price, with the member price sitting greyed out beside it.",
  author: "Samar Birwadker",
  seoTitle: "What Happens to Loyalty Programs When the Customer Is an AI Agent | Parleo",
  seoDescription:
    "Your loyalty program still works. The agent just can't see it at the moment it ranks you. Why identity resolves at checkout, what Google's own docs call the alternative, and what it costs.",
  keywords: [
    "loyalty programs AI agents",
    "member pricing AI shopping",
    "agentic commerce loyalty",
    "UCP identity linking",
    "priced like a stranger",
    "loyalty program visibility",
    "AI agent checkout identity",
  ],
  takeaways: [
    "Loyalty is a promise about who you are. Tiers, member pricing, points and card-linked offers resolve once the shopper is identified, and at the ranking step the agent hasn't identified anyone.",
    "Google's UCP Identity Linking is OAuth 2.0, marked optional, and scoped to order reads and checkout management. No catalog scope, no search scope. Merchants who skip it get \"guest experiences.\"",
    "Best Buy, CVS and Ulta each run a second price book behind identity. At the ranking step an agent sees list price for all three.",
    "Shoppers aren't asking for the cheapest thing: 80% want a quality deal against 58% who want the lowest price. The fix is encoding work with a long lead time.",
  ],
  faq: [
    {
      q: "Do AI shopping agents see loyalty member pricing?",
      a: "Not at the ranking step. Eligibility and policy enforcement happen at checkout using binding transaction data, and identity linking in Google's UCP implementation is optional with scopes limited to order reads and checkout management. The agent ranks on the price that's true for a stranger.",
    },
    {
      q: "What does 'priced like a stranger' mean?",
      a: "Your best customer gets quoted the same list price as someone who has never bought from you, because at the moment of comparison the agent has no way to know who they are. The loyalty program still works at checkout. It's invisible where the shortlist gets built.",
    },
    {
      q: "Are loyalty programs dead in agentic commerce?",
      a: "No. Shopper data cuts the other way: 80% want a quality deal versus 58% who want merely the lowest price, and 60% would abandon a retailer over inconsistent pricing. Loyalty is built to answer that request. The problem is legibility, not relevance.",
    },
    {
      q: "How should a retailer make loyalty visible to AI agents?",
      a: "Test what a guest sees by running your top twenty products through four assistants and comparing the quoted price to what a member at your most common tier pays. Publish eligibility rules in machine-readable form so they travel with the product. And assign one owner to the question.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Your loyalty program isn't broken. It's invisible at the one step that decides whether you get recommended.",
    },
    {
      type: "p",
      text: "The reason is sensible. Loyalty is a promise about who you are, so tiers, member pricing, points, card-linked offers and subscription discounts resolve only after the shopper is identified.",
    },
    {
      type: "p",
      text: "An AI agent doing a comparison hasn't identified anybody yet. It's three products into a shortlist, working from a catalog, and the shopper is still anonymous.",
    },
    {
      type: "p",
      text: "So the agent ranks you on the price that's true for a stranger, and your best customer gets quoted the same number as someone who has never bought from you.",
    },
    {
      type: "flow",
      caption: "Where identity enters the transaction, and where the shortlist was already built",
      steps: [
        {
          label: "Search",
          title: "Shopper is anonymous",
          text: "Agent queries catalogs. No identity scope exists here in Google's UCP implementation.",
          drop: "Member tier",
        },
        {
          label: "Rank",
          title: "Shortlist gets built",
          text: "Three products compared on category and the price true for a stranger.",
          drop: "Member price, points value",
        },
        {
          label: "Checkout",
          title: "Identity linking, optional",
          text: "OAuth scopes: order reads and checkout management. Merchants without it serve \"guest experiences.\"",
        },
        {
          label: "Receipt",
          title: "Loyalty finally applies",
          text: "The benefit is real. It arrived after the decision it was meant to influence.",
        },
      ],
    },
    { type: "h", text: "Identity arrives after the decision is made" },
    { type: "p", text: "The sequencing is explicit in the standards, not implied." },
    {
      type: "p",
      text: "Eligibility and policy enforcement happen at checkout, using binding transaction data. That's correct engineering. You shouldn't bind a discount to a claim nobody verified. But it puts identity downstream of ranking, and ranking is where the shortlist gets built.",
    },
    {
      type: "p",
      text: "Google's implementation shows the shape of it. Its UCP Identity Linking is OAuth 2.0, it's marked optional, and its two scopes are order reads and checkout management, with [no catalog scope and no search scope](https://developers.google.com/merchant/ucp/guides/identity-linking).",
    },
    {
      type: "p",
      text: "Identity can open the checkout door and can't reach the aisle. For merchants who never implement linking at all, Google's own documentation describes what agents get as \"guest experiences.\"",
    },
    {
      type: "record",
      title: "Google UCP Identity Linking, as documented",
      legend: ["Defined in the spec", "Not defined"],
      rows: [
        { key: "protocol", value: "OAuth 2.0" },
        { key: "status", value: "Optional" },
        { key: "scope", value: "order:read" },
        { key: "scope", value: "checkout:manage" },
        { key: "scope", value: "catalog:read", unread: true },
        { key: "scope", value: "search:personalize", unread: true },
        { key: "without_linking", value: "\"Guest experiences\"" },
      ],
      caption: "Two scopes, both after the shortlist. Google Merchant UCP docs, May 28, 2026",
    },
    {
      type: "p",
      text: "In the largest implementation of the standard, your member is a guest until after the products have been chosen.",
    },
    { type: "h", text: "The gap this opens is bigger than most teams think" },
    {
      type: "p",
      text: "Loyalty economics aren't a rounding error on the price. They're often most of the difference between you and the competitor beside you.",
    },
    {
      type: "p",
      text: "Look at what a program actually moves. Best Buy runs a second price book behind a login: [My Best Buy Plus](https://www.bestbuy.com/site/best-buy-membership/my-best-buy-plus/pcmcat1679666014312.c) costs $29.99 a year and carries member pricing across hundreds of SKUs, 441 on its deals page when we checked. CVS sells [ExtraCare Plus](https://www.cvs.com/extracare/plus) at $48 a year, returning $120 in ExtraBucks plus 20% off its own private label, which changes the shelf price of a whole product line for anyone who subscribed. [Ulta's points](https://www.ulta.com/rewards/faq) are worth about 3.0 cents redeemed at 100 and about 6.25 cents redeemed at 2,000, so the same transaction carries a different net price depending on how a shopper redeems later.",
    },
    {
      type: "ladder",
      title: "Three second price books an agent can't open",
      items: [
        { label: "My Best Buy Plus", note: "$29.99/yr, member pricing on 441 SKUs on the deals page", price: "List", quoted: true },
        { label: "CVS ExtraCare Plus", note: "$48/yr, $120 in ExtraBucks plus 20% off CVS Health brand", price: "List", quoted: true },
        { label: "Ultamate Rewards", note: "Points worth ~3.0¢ at 100, ~6.25¢ at 2,000 redeemed", price: "List", quoted: true },
      ],
      caption: "Right column: what the agent quotes at the ranking step for all three. Verified Aug 2026",
    },
    {
      type: "p",
      text: "None of that is exotic. It's ordinary retail, built over decades, and it's the machinery that protects margin while still winning the sale.",
    },
    { type: "p", text: "At the ranking step, an agent sees the list price for all three of those retailers." },
    {
      type: "p",
      text: "The more sophisticated your loyalty program, the more of your actual value can disappear by default.",
    },
    { type: "h", text: "Priced like a stranger" },
    {
      type: "p",
      text: "Loyalty isn't dead. That argument turns up every few years and still hasn't come true. The immediate problem is simpler: at the moment of comparison, the machine has no way to know that your best customer is your best customer. So it prices them like a stranger.",
    },
    {
      type: "quote",
      text: "Nobody owns whether the loyalty benefit reaches the agent, because until about two years ago there was no agent to reach.",
    },
    {
      type: "p",
      text: "It also explains why this sits in nobody's inbox. Marketing owns mention rate, e-commerce owns the feed, and loyalty owns redemption and retention.",
    },
    { type: "h", text: "Why this isn't a loyalty obituary" },
    {
      type: "p",
      text: "You could argue that an agent will optimize for the lowest number anyway, making loyalty irrelevant. Shoppers say otherwise.",
    },
    {
      type: "p",
      text: "In the [NRF-linked shopper study](https://www.businesswire.com/news/home/20260218739034/en/Shopper-Study-More-Than-70-of-Shoppers-Turn-to-AI-to-Find-Deals), 80% said they want a quality deal against 58% who want merely the lowest price, and 60% said they'd abandon a retailer over inconsistent pricing. People aren't asking for the cheapest thing. They're asking for the best deal, which is a different request and one loyalty is built to answer.",
    },
    {
      type: "bars",
      title: "What shoppers told the NRF-linked study",
      max: 100,
      items: [
        { label: "Want a quality deal", value: 80, display: "80%", highlight: true },
        { label: "Would abandon a retailer over inconsistent pricing", value: 60, display: "60%" },
        { label: "Want merely the lowest price", value: 58, display: "58%" },
      ],
      caption: "XCCommerce / SmartBrief / NRF Shopper Study, Feb 2026",
    },
    {
      type: "p",
      text: "This is still early. Only [19% of AI users have ordered anything through AI](https://www.pymnts.com/news/retail/2026/ai-finds-the-deal-shoppers-still-make-the-call/). Gartner puts the share willing to hand over the purchase decision at 11%. Nobody's loyalty P&L is being visibly damaged this quarter.",
    },
    {
      type: "p",
      text: "The reason to start now is lead time. This is encoding work, and the channel keeps compounding while it sits undone.",
    },
    { type: "h", text: "Make loyalty legible before checkout" },
    {
      type: "list",
      items: [
        "Test what a guest sees. Run your top twenty products through four assistants and write down the price each returns, then compare it against what a member at your most common tier would actually pay. That delta is the size of the problem.",
        "Publish the eligibility rules, not just the outcomes. A member price that exists only behind a login is a price no agent can quote. The conditions have to travel with the product in machine-readable form.",
        "Assign it to a person. Whoever owns loyalty should own the question of whether loyalty is legible to agents, because right now the answer lives between three teams and gets checked by none of them.",
      ],
    },
    {
      type: "p",
      text: "Retailers spent thirty years teaching customers that identifying yourself gets you a better price. The new shopper doesn't identify itself until the very end, and by then the choice has been made. The mechanics of that ranking step are in [how AI shopping agents decide what to recommend](/insights/how-ai-shopping-agents-decide).",
    },
  ],
};

export default post;
