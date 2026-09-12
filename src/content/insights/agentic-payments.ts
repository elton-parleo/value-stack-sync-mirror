import image from "@/assets/insights/rendered/agentic-payments.webp";
import type { Post } from "./types";

const post: Post = {
  slug: "agentic-payments",
  title: "Agentic payments: what actually changes when the buyer is software",
  dek: "AP2 signs mandates. ACP delegates a scoped token. Visa and Mastercard provision agent-specific credentials. All four solve authorization. None of them carry the reason a price was that price.",
  date: "2026-09-12",
  dateLabel: "September 12, 2026",
  category: "Point of view",
  readTime: "8 min read",
  image,
  imageAlt:
    "Orthographic diagram of a signed payment authorization passing from a shopper to an agent, a card network and a merchant, with the incentive field missing.",
  author: "Samar Birwadker",
  seoTitle: "Agentic Payments Explained: AP2, ACP, and the Missing Incentive Layer | Parleo",
  seoDescription:
    "How agentic payments work: AP2 mandates, ACP delegated tokens, and agent-specific network credentials. What each protocol authorizes, and the one field none of them carry.",
  keywords: [
    "agentic payments",
    "agentic payments protocol",
    "AP2 protocol",
    "agentic commerce protocol",
    "delegated payment token",
    "agent payment authorization",
    "Visa Intelligent Commerce",
    "Mastercard Agent Pay",
  ],
  takeaways: [
    "Agentic payments are payments authorized by a human but executed by software. The hard problem isn't moving money, it's proving the agent was allowed to spend it, on that item, at that price.",
    "AP2 answers it with signed mandates: a Checkout Mandate for what's being bought and a linked Payment Mandate for the payment, verifiable by the credential provider, the network and the processor.",
    "ACP answers it differently. The merchant's payment provider issues a scoped, single-use delegated token, so the agent never handles raw card details.",
    "Visa and Mastercard answer it at the credential layer, provisioning agent-specific tokens tied to an authenticated agent and a permission set.",
    "All four authorize. None carry why the price was the price. Eligibility, member pricing, funded promotions and true cost still sit outside the payment message, which is where the margin leaks.",
  ],
  faq: [
    {
      q: "What are agentic payments?",
      a: "Agentic payments are transactions where a human authorizes a purchase but software executes it: an AI agent selects the item, submits the order and completes payment on the buyer's behalf. The distinguishing problem is authorization, proving the agent had permission to spend a specific amount on a specific item, rather than moving the funds.",
    },
    {
      q: "What is the difference between AP2 and ACP?",
      a: "AP2 is an authorization model built on signed mandates: a Checkout Mandate covering what's being purchased and a linked Payment Mandate covering the payment, each verifiable by the credential provider, network and merchant processor. ACP takes a delegation approach: the merchant's payment service provider issues a scoped, single-use token so the agent can pay without touching card data. They're complementary rather than competing, one specifies proof of intent, the other specifies a payment credential.",
    },
    {
      q: "How do Visa and Mastercard handle agentic payments?",
      a: "Both operate at the credential layer. Visa Intelligent Commerce provisions and manages agent-specific payment tokens usable across the existing acceptance network. Mastercard Agent Pay builds around tokenized credentials tied to an authenticated agent and a permission set. Neither replaces the protocols above them; they make the credential itself agent-aware.",
    },
    {
      q: "What do agentic payment protocols not solve?",
      a: "Price justification. The mandates and tokens establish that an agent may spend up to an amount on a defined cart. They don't carry why the amount is what it is: loyalty tier, member price, funded promotion, stacking rules, shipping and return cost. That context has to be readable before checkout, and today it usually isn't machine-readable at all.",
    },
    {
      q: "What should a merchant do about agentic payments now?",
      a: "Two separate workstreams. Support a delegated credential path with your payment provider so agent orders can complete. And make your incentive and eligibility data readable before the payment step, so the price the agent quotes is the price you'd actually honor. The second is where most brands are currently exposed.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Most of the agentic commerce conversation is about discovery: which agent surfaces your product, what it says about you. Payments got treated as plumbing. It isn't. The payment step is where the whole thing either becomes real or stays a demo.",
    },
    {
      type: "p",
      text: "And the hard part isn't moving money. Card networks have been good at that for decades. The hard part is proving that a piece of software was allowed to spend someone else's money, on that item, at that amount, and that the human meant it.",
    },
    { type: "h", text: "Four answers to one question" },
    {
      type: "p",
      text: "Four serious attempts are live, and they're solving the same authorization problem at different layers of the stack.",
    },
    {
      type: "p",
      text: "[AP2](https://ap2-protocol.org/) does it with mandates. Its v0.2 [specification](https://ap2-protocol.org/ap2/specification/) defines a Checkout Mandate for what's being purchased and a linked [Payment Mandate](https://ap2-protocol.org/ap2/payment_mandate/) for the payment itself, created by the shopping agent, shown to the user on a trusted surface, and verified downstream by the credential provider, the network and the merchant's processor. The mandate travels with the transaction as evidence. It's an extension to A2A and the Universal Commerce Protocol rather than a payment rail of its own.",
    },
    {
      type: "p",
      text: "[ACP](https://agentic-commerce-protocol.com/docs/commerce/specs/payment), maintained by OpenAI and Stripe, delegates instead. The merchant's payment service provider mints a scoped, single-use [delegated payment token](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/spec/2026-01-30/openapi/openapi.delegate_payment.yaml) bound to a payment method and an allowance, so the agent completes checkout without ever holding raw card details. [Stripe's implementation](https://docs.stripe.com/agentic-commerce/acp) splits it cleanly into agentic checkout and delegated payment, and the whole thing traces back to the Instant Checkout launch in [ChatGPT](https://openai.com/index/buy-it-in-chatgpt/).",
    },
    {
      type: "p",
      text: "The networks work a layer lower. [Visa Intelligent Commerce](https://developer.visa.com/capabilities/visa-intelligent-commerce) provisions and manages agent-specific payment tokens that run over existing acceptance, and [Mastercard Agent Pay](https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html) builds around tokenized credentials tied to an authenticated agent and a permission set. [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/visa-and-mastercard-put-tokens-in-charge-of-ai-commerce/) read both moves as the same bet: put the token in charge, and make the agent prove who it is before it spends.",
    },
    {
      type: "flow",
      steps: [
        {
          label: "01",
          title: "Intent",
          text: "The shopper states a budget and a constraint. A trusted surface renders it and captures the authorization.",
          drop: "Why this shopper qualifies for a different price",
        },
        {
          label: "02",
          title: "Mandate or token",
          text: "AP2 signs a Checkout Mandate and a linked Payment Mandate. ACP has the PSP mint a scoped single-use token.",
          drop: "Promotion funding and stacking rules",
        },
        {
          label: "03",
          title: "Credential",
          text: "An agent-specific network token carries an authenticated agent identity and a permission set.",
          drop: "Loyalty tier and member eligibility",
        },
        {
          label: "04",
          title: "Authorization",
          text: "The processor verifies the evidence and the amount clears over existing rails.",
          drop: "True cost after shipping and returns",
        },
      ],
      caption:
        "Each step tightens the proof that the agent may spend. None of them carries the reason the amount is the amount.",
    },
    { type: "h", text: "They all authorize. None of them justify" },
    {
      type: "p",
      text: "Read the four specs side by side and the shared boundary is obvious. Every one of them answers the question \"may this agent spend this amount?\" with real rigor. Not one of them answers \"why is it this amount?\"",
    },
    {
      type: "p",
      text: "That second question is the entire commercial layer. Whether the shopper is a member. Whether a promotion applies and who funded it. Whether two offers stack. What shipping and returns do to the number. The mandate faithfully records $89.00 and says nothing about the fact that your loyalty member should have paid $71.20.",
    },
    {
      type: "record",
      title: "What reaches the payment message",
      legend: ["In the authorization", "Outside it"],
      rows: [
        { key: "mandate.cart_total", value: "$89.00" },
        { key: "mandate.allowance", value: "scoped, single use" },
        { key: "agent.identity", value: "authenticated, permissioned" },
        { key: "buyer.loyalty_tier", value: "—", unread: true },
        { key: "offer.member_price", value: "—", unread: true },
        { key: "offer.funded_by", value: "—", unread: true },
        { key: "offer.stackable", value: "—", unread: true },
        { key: "cost.true_after_returns", value: "—", unread: true },
      ],
      caption:
        "Composite of the AP2 mandate fields and the ACP delegated payment token. The greyed rows exist in merchant systems and don't travel with the payment.",
    },
    {
      type: "p",
      text: "This isn't a criticism of the protocols. Payment specs are supposed to be narrow, and the ones above are well-scoped, which is exactly why they'll get adopted. It's a statement about where the gap sits: one layer up, before the token is ever minted.",
    },
    { type: "h", text: "Why the gap costs money" },
    {
      type: "p",
      text: "By the time a mandate is signed, the price argument is over. The agent already picked a merchant, already quoted a number, already told the shopper this was the best available option. Payment authorization is the receipt for a decision made several steps earlier.",
    },
    {
      type: "p",
      text: "So if your member price, your funded promotion or your bundle wasn't readable at the ranking step, the mandate cleanly authorizes the wrong price. Nothing failed. The transaction succeeds, the shopper is charged, and the margin you'd already committed to spending simply doesn't appear anywhere in the flow. That's the same failure I traced through the promotion side in [trade spend when agents shop](/insights/trade-spend-when-agents-shop), and through the loyalty side in [loyalty when the customer is an agent](/insights/loyalty-when-the-customer-is-an-agent).",
    },
    {
      type: "quote",
      text: "A signed mandate proves the agent was allowed to pay $89. It doesn't prove $89 was the right number.",
    },
    { type: "h", text: "Trust is still the binding constraint" },
    {
      type: "p",
      text: "The authorization work matters because trust is what's actually gating this channel. In PYMNTS' reporting on the Visa and Mastercard frameworks, 95% of consumers expressed at least one concern about AI-driven purchasing. That's not a protocol problem you can fix with better cryptography alone.",
    },
    {
      type: "p",
      text: "Some of that concern is about control, and mandates and scoped tokens address it well. Some of it is about being quoted a price that turns out to be wrong, which is a data problem sitting above the payment layer. Every time an agent recommends a worse deal than the shopper could have gotten directly, the channel spends a little of the trust it needs.",
    },
    { type: "h", text: "What I'd do about it as a merchant" },
    {
      type: "list",
      items: [
        "Treat the credential path as table stakes. Ask your payment provider what their delegated payment or agent token support looks like, and get an agent order completing end to end in a sandbox. This is a solved problem with a vendor answer.",
        "Move eligibility earlier. Whatever determines a member's price needs to resolve before the agent quotes, not at the payment step. If eligibility only exists behind a login, agents will price you as a stranger.",
        "Make funding visible in your own data. If a promotion is funded, tag it that way where an agent can read it. An untagged funded offer is money you spent and can't attribute.",
        "Publish true cost, not just list price. Shipping thresholds and return terms change which merchant an agent picks, and they're frequently the cheapest thing to fix.",
      ],
    },
    {
      type: "p",
      text: "The payments layer is getting solved in public, fast, by people who are good at it. That's the good news, and it means the constraint moves. Once any agent can pay any merchant safely, the thing that decides where the order lands is whether your price and your incentives were legible before the mandate was ever signed. That's the layer we work on. If you want to know where yours stands, the [free agentic value audit](https://parleo.io/audit) scores it, or start with [what agentic commerce actually is](/what-is-agentic-commerce).",
    },
  ],
};

export default post;
