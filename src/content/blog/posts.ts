import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";
import lifestyleBeauty from "@/assets/lifestyle-beauty-flatlay.jpg";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "stat"; items: { value: string; label: string }[] }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Author = {
  name: string;
  role: string;
  linkedin?: string;
};

export type Category =
  | "Agentic commerce"
  | "True cost"
  | "Engineering"
  | "Loyalty"
  | "Company";

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  tags: string[];
  date: string;
  author: Author;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  body: Block[];
};

const samar: Author = {
  name: "Samar Birwadker",
  role: "Co-founder and CEO",
  linkedin: "https://www.linkedin.com/in/samarbirwadker/",
};

const elton: Author = {
  name: "Elton Cheung",
  role: "Co-founder and CTO",
  linkedin: "https://www.linkedin.com/in/eltoncheung/",
};

export const posts: Post[] = [
  {
    slug: "share-of-algorithm",
    title: "Share of Algorithm: the metric that replaces share of shelf",
    dek: "Retail distribution used to be physical, then it was search. Now it is a ranking decision made by a model. Here is the framework we use to explain what brands actually compete on.",
    category: "Agentic commerce",
    tags: ["framework", "positioning", "ranking"],
    date: "2026-07-28",
    author: samar,
    cover: lifestyleRetail,
    coverAlt: "Editorial retail interior with muted tones and asymmetric framing",
    featured: true,
    body: [
      {
        type: "p",
        text: "Every era of commerce has had one scarce resource. In the grocery era it was shelf space. In the search era it was the first page. In the agentic era it is the model's shortlist: the three to five products an assistant surfaces when a shopper asks what to buy.",
      },
      {
        type: "p",
        text: "We call the thing brands compete for Share of Algorithm. It is the percentage of agent-mediated purchase decisions in your category where your product makes the shortlist and wins the recommendation.",
      },
      { type: "h2", text: "Three layers decide the shortlist" },
      {
        type: "p",
        text: "When you decompose how an agent picks, you get three distinct layers. Two of them already have mature tooling. One does not.",
      },
      {
        type: "list",
        items: [
          "Visibility: can the agent find your product at all? Feeds, structured data, and product catalogs solve most of this.",
          "Accessibility: can the agent transact? Checkout APIs, protocol support, and inventory truth solve most of this.",
          "True Value: does the agent know what the product actually costs the shopper, after loyalty, card offers, bundles, and membership pricing? Nothing solves this today.",
        ],
      },
      {
        type: "callout",
        title: "The gap in one sentence",
        text: "Agents rank on list price because list price is the only price they can read.",
      },
      { type: "h2", text: "Why the True Value layer decides winners" },
      {
        type: "p",
        text: "A shopper with a loyalty account, a stored card offer, and a members-only tier is not shopping at list price. They are shopping at an effective price that can be 20 to 30 percent lower. That effective price is where the purchase decision actually happens.",
      },
      {
        type: "p",
        text: "An agent that cannot compute effective price does the only thing it can: it sorts on the number in the page. Brands with strong loyalty economics lose to brands with thin margins and aggressive list pricing. The incentive you spent years building becomes invisible at exactly the moment it should be decisive.",
      },
      {
        type: "table",
        head: ["Layer", "Owned by", "Maturity"],
        rows: [
          ["Visibility", "Feeds, catalogs, structured data", "Mature"],
          ["Accessibility", "Checkout and protocol APIs", "Emerging"],
          ["True Value", "Nobody", "Open"],
        ],
      },
      { type: "h2", text: "How to measure your own Share of Algorithm" },
      {
        type: "p",
        text: "You do not need a platform to start. Pick your ten highest-intent category prompts, run them across the assistants your customers actually use, and record three things for each: whether you appear, what rank you hold, and what price the agent quotes.",
      },
      {
        type: "list",
        items: [
          "Appearance rate: percentage of prompts where your product is named.",
          "Median rank: where you land inside the shortlist.",
          "Price accuracy: gap between the quoted price and the real effective price for a loyalty member.",
        ],
      },
      {
        type: "p",
        text: "In our own benchmarking, the third number is the one that shocks brand teams. The quoted price is almost never the price their best customers pay.",
      },
      {
        type: "quote",
        text: "Being visible is not the same as being chosen.",
      },
      {
        type: "p",
        text: "That is the whole thesis. Visibility work is table stakes now. The next decade of category leadership goes to the brands whose real value is legible to the systems doing the choosing.",
      },
    ],
  },
  {
    slug: "true-cost-api-design",
    title: "Designing a true-cost API for agents that cannot wait",
    dek: "An agent will not make five calls and reconcile promotions for you. It needs one response, pre-resolved, under 50ms. Here is how we structured it.",
    category: "Engineering",
    tags: ["api", "latency", "architecture"],
    date: "2026-07-21",
    author: elton,
    cover: lifestyleTech,
    coverAlt: "Consumer electronics arranged with architectural precision on a neutral surface",
    body: [
      {
        type: "p",
        text: "The naive version of true cost is a lookup: fetch the product, fetch the offers, apply the rules, return a number. The problem is that agents operate inside a token and latency budget that punishes every extra hop.",
      },
      {
        type: "stat",
        items: [
          { value: "<50ms", label: "p95 response time" },
          { value: "~2K", label: "tokens per enriched product" },
          { value: "~60%", label: "token reduction vs crawling" },
        ],
      },
      { type: "h2", text: "Constraint one: one call, no orchestration" },
      {
        type: "p",
        text: "If resolving true cost requires the agent to orchestrate, it will not happen. Every branch you push into the model is a branch that gets skipped, hallucinated, or truncated. So the contract is a single enrich call that returns the resolved value stack alongside the product.",
      },
      {
        type: "code",
        language: "json",
        code: `{
  "product_id": "tatcha-water-cream-50ml",
  "list_price": 30.00,
  "true_cost": 22.40,
  "resolution": [
    { "type": "loyalty_tier", "label": "Beauty Insider", "delta": -3.00 },
    { "type": "card_offer",   "label": "Card statement credit", "delta": -2.60 },
    { "type": "bundle",       "label": "Set pricing", "delta": -2.00 }
  ],
  "confidence": 0.94,
  "resolved_at": "2026-07-21T09:12:04Z"
}`,
      },
      {
        type: "p",
        text: "Two design choices matter here. The resolution array is itemized so the agent can explain itself to the shopper, and confidence is explicit so a ranking function can discount uncertain stacks instead of trusting them blindly.",
      },
      { type: "h2", text: "Constraint two: pre-compute, do not reason at runtime" },
      {
        type: "p",
        text: "Promotion logic is combinatorial and stateful. Resolving it inside the request path is how you end up with 400ms tail latency. We resolve offline against merchant program rules and serve a materialized value stack, with invalidation driven by program changes rather than a fixed TTL.",
      },
      {
        type: "list",
        items: [
          "Program rules are versioned, so a stack can always be replayed and audited.",
          "Stacking eligibility is evaluated once per program version, not once per request.",
          "Zero PII crosses the boundary. Context is passed as eligibility signals, never as identity.",
        ],
      },
      {
        type: "callout",
        title: "Why no PII",
        text: "An agent does not need to know who the shopper is to price for them. It needs to know which programs apply. Those are different data models, and only one of them is a liability.",
      },
      { type: "h2", text: "Constraint three: speak the protocols agents already speak" },
      {
        type: "p",
        text: "The same resolved object is exposed through MCP for tool-calling assistants, through ACP for agent-to-agent commerce flows, and through a plain OpenAPI surface for teams wiring it into existing ranking services. One representation, three transports.",
      },
      {
        type: "code",
        language: "typescript",
        code: `const { true_cost, resolution } = await parleo.enrich({
  product_id: "tatcha-water-cream-50ml",
  context: { loyalty: ["beauty_insider"], card: ["amex_offers"] },
});

// re-rank on effective price, not list price
results.sort((a, b) => a.true_cost - b.true_cost);`,
      },
      {
        type: "p",
        text: "The test we hold ourselves to: an engineer should be able to re-rank a result set on true cost in under ten lines, without reading a promotions spec.",
      },
    ],
  },
  {
    slug: "loyalty-programs-for-ai-agents",
    title: "Your loyalty program is invisible to AI agents",
    dek: "Points, tiers, and member pricing were built for a human reading a page. Agents do not read pages. What happens to loyalty economics when the shopper is a model.",
    category: "Loyalty",
    tags: ["loyalty", "merchants", "strategy"],
    date: "2026-07-10",
    author: samar,
    cover: lifestyleBeauty,
    coverAlt: "Beauty products in a flatlay with deliberate negative space and muted grading",
    body: [
      {
        type: "p",
        text: "Loyalty programs are among the most valuable assets a consumer brand owns. They are also, right now, among the least machine-readable.",
      },
      {
        type: "p",
        text: "Tier benefits live in marketing copy. Member pricing appears after authentication. Points value is implied rather than stated. Every one of those choices was correct for a human shopper on your site, and every one of them makes your program invisible to an agent comparing options on the shopper's behalf.",
      },
      { type: "h2", text: "Three failure modes we see repeatedly" },
      {
        type: "list",
        items: [
          "Gated pricing: the real member price sits behind login, so the agent reads and quotes the public price.",
          "Unquantified benefits: 'exclusive access' and 'members save more' carry no number an agent can compute with.",
          "Unstacked value: card offers, bundles, and tier discounts are true simultaneously but published separately.",
        ],
      },
      {
        type: "quote",
        text: "If your best price is not expressible as a number an agent can read, you are competing on your worst price.",
      },
      { type: "h2", text: "What machine-readable loyalty looks like" },
      {
        type: "p",
        text: "The shift is from describing a program to publishing it. A program becomes a set of typed, evaluable rules: who is eligible, what the delta is, what it stacks with, and when it expires.",
      },
      {
        type: "table",
        head: ["Today", "Machine-readable"],
        rows: [
          ["\"Members save more\"", "tier_discount: -10% on eligible SKUs"],
          ["Points balance in account", "point_value: 0.012 USD per point"],
          ["Offer visible after login", "eligibility signal, resolved pre-auth"],
          ["Stacking decided at checkout", "stack_rules declared upfront"],
        ],
      },
      { type: "h2", text: "The strategic read for brand and loyalty leaders" },
      {
        type: "p",
        text: "There is a version of the next five years where agent intermediation flattens brands into a price grid. Loyalty is the strongest available defense against that, but only if it is legible at the moment of ranking rather than at the moment of checkout.",
      },
      {
        type: "callout",
        title: "One question to take into your next planning cycle",
        text: "If an agent had to justify choosing your product over a cheaper competitor, what number would it cite?",
      },
    ],
  },
  {
    slug: "list-price-is-a-bad-ranking-signal",
    title: "List price is a bad ranking signal",
    dek: "One product, five retailers, five different effective prices. We ran the comparison an agent cannot run, and the ordering changes almost every time.",
    category: "True cost",
    tags: ["pricing", "benchmark", "ranking"],
    date: "2026-06-30",
    author: elton,
    cover: lifestyleSkincare,
    coverAlt: "Skincare bottle photographed with architectural precision and hard shadow",
    body: [
      {
        type: "p",
        text: "Take a single well-distributed skincare SKU and look at it the way an agent does: list price, in stock, ship time. Sorted that way, the cheapest retailer wins. Now add the value stack a real shopper carries, and the ordering falls apart.",
      },
      {
        type: "stat",
        items: [
          { value: "$30.00", label: "typical list price" },
          { value: "$22.40", label: "resolved effective price" },
          { value: "03 → 01", label: "rank change after resolution" },
        ],
      },
      { type: "h2", text: "Why the ordering flips" },
      {
        type: "p",
        text: "Effective price is a function of three things an agent has no access to: the shopper's program memberships, the retailer's current stacking rules, and the cash value of any points earned on the transaction. Each one moves the number by single-digit dollars. Together they routinely move it by 20 to 30 percent.",
      },
      {
        type: "list",
        items: [
          "Tier discounts change the base, not the promotion.",
          "Card offers apply post-tax and are frequently uncapped at these order values.",
          "Earned points are deferred value, and shoppers behave as if they are immediate.",
        ],
      },
      { type: "h2", text: "What this means for ranking functions" },
      {
        type: "p",
        text: "If you build agent ranking, list price is a proxy you should be actively distrusting. It is stable, easy to fetch, and wrong in a direction that systematically penalizes the merchants with the strongest customer relationships.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// before: ranks on the number in the page
candidates.sort((a, b) => a.list_price - b.list_price);

// after: ranks on what the shopper actually pays
candidates.sort((a, b) => a.true_cost - b.true_cost);`,
      },
      {
        type: "p",
        text: "The change is two characters of code and a completely different result set. That is the argument for a resolution layer.",
      },
    ],
  },
  {
    slug: "why-we-are-building-parleo",
    title: "Why we are building Parleo",
    dek: "We spent our careers on brand value and infrastructure. Agentic commerce is quietly deleting the connection between the two.",
    category: "Company",
    tags: ["company", "thesis"],
    date: "2026-06-18",
    author: samar,
    cover: lifestyleFashion,
    coverAlt: "Fashion editorial with unexpected crop and cool muted grading",
    body: [
      {
        type: "p",
        text: "Two things became obvious to us at the same time. Shoppers were starting real purchase journeys inside assistants. And the brands we knew best, the ones with genuine pricing and loyalty advantages, had no way to express those advantages to a machine.",
      },
      {
        type: "p",
        text: "The gap is not awareness. Every brand team we talk to knows agent traffic is coming. The gap is representation. There is no standard object that says what a product actually costs a specific shopper, and no infrastructure that resolves one fast enough to sit inside an agent's request path.",
      },
      { type: "h2", text: "What we are building" },
      {
        type: "list",
        items: [
          "A unified product taxonomy so agents can compare like with like across retailers.",
          "Deal signals and true cost so ranking happens on effective price.",
          "Semantic intelligence so intent maps to products without a crawl.",
        ],
      },
      {
        type: "p",
        text: "All of it behind one call, under 50ms, with no PII crossing the boundary, exposed through the protocols agents already speak.",
      },
      {
        type: "callout",
        title: "Where we are",
        text: "Working with beauty, skincare, fashion, and consumer electronics brands on agent-facing value resolution. If that is your category, we would like to compare notes.",
      },
    ],
  },
];

export const categories: Category[] = [
  "Agentic commerce",
  "True cost",
  "Loyalty",
  "Engineering",
  "Company",
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const blockText = (b: Block): string => {
  switch (b.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
      return b.text;
    case "list":
      return b.items.join(" ");
    case "callout":
      return `${b.title} ${b.text}`;
    case "code":
      return b.code;
    case "stat":
      return b.items.map((i) => `${i.value} ${i.label}`).join(" ");
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
  }
};

export const readingTime = (post: Post) => {
  const words = (post.dek + " " + post.body.map(blockText).join(" ")).split(/\s+/)
    .length;
  return Math.max(2, Math.round(words / 200));
};

export const searchIndex = (post: Post) =>
  [post.title, post.dek, post.category, ...post.tags, post.author.name, ...post.body.map(blockText)]
    .join(" ")
    .toLowerCase();

export const relatedPosts = (post: Post, limit = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
