// Demo scenario data for the Honey for Agents demo page

export type Scenario = "beauty" | "outdoor" | "electronics";

export interface ProductResult {
  rank: number;
  rankWithout: number;
  name: string;
  specs: string;
  listPrice: number;
  truePrice: number;
  savings: number;
  savingsPercent: number;
  tags: string[];
  isBestDeal: boolean;
  rankChange?: string; // e.g. "↑ was #3"
  merchant: string;
}

export interface ScenarioData {
  label: string;
  product: string;
  gradient: string;
  query: string;
  merchants: { name: string; domain: string }[];
  userContext: {
    name: string;
    memberships: { logo: string; name: string; detail: string }[];
  };
  reasoningPhases: {
    discovery: string[];
    intelligence: string[];
    intercept: string[];
  };
  resultsWith: ProductResult[];
  resultsWithout: ProductResult[];
  apiResponse: object;
  sandboxProduct: string;
  sandboxListPrice: number;
  // Sandbox pricing matrix: [tier][card] => { loyaltyDisc, cardDisc, pointsValue, netPrice }
  sandboxPricing: Record<string, Record<string, { loyaltyDisc: number; cardDisc: number; pointsValue: number; netPrice: number; loyaltyLabel: string; cardLabel: string; pointsLabel: string }>>;
  merchantCompare: { name: string; domain: string; headlinePrice: number; truePrice: number }[];
  codeSnippetJS: string;
  codeSnippetPY: string;
  agentPrompt: string;
}

const beautyData: ScenarioData = {
  label: "Beauty",
  product: "Rare Beauty Soft Pinch Blush",
  gradient: "from-rose-500/20 to-pink-600/20",
  query: "What's the best rated blush right now? I want the best deal.",
  merchants: [
    { name: "Sephora", domain: "sephora.com" },
    { name: "Ulta", domain: "ulta.com" },
    { name: "Target", domain: "target.com" },
  ],
  userContext: {
    name: "Sarah Chen",
    memberships: [
      { logo: "sephora.com", name: "Sephora Rouge", detail: "Active" },
      { logo: "americanexpress.com", name: "Amex Gold", detail: "Card-linked offer" },
      { logo: "target.com", name: "Target Circle", detail: "Member" },
    ],
  },
  reasoningPhases: {
    discovery: [
      "→ Query enrichment: \"blush\" → category:face_color, sub:blush, intent:purchase",
      "→ Product match: 47 SKUs across 6 retailers, filtering to top 12 by review score",
      "→ Score weighting: review_avg(0.4) + review_count(0.3) + restock_signal(0.3)",
      "→ Top 4 shortlist generated: Rare Beauty, NARS, Clinique, Tower 28",
    ],
    intelligence: [
      "◈ Category briefing loaded: Liquid blushes dominating cream/powder in 2024-25",
      "◈ Key decision factors: pigmentation, blendability, lasting power, shade range",
      "◈ Review digest: Rare Beauty \"buildable, natural flush\" · NARS \"iconic shimmer\"",
      "◈ Intent-to-spec: user wants \"best deal\" → weighting price/value signals higher",
    ],
    intercept: [
      "◈ Loading loyalty profiles for Sarah Chen...",
      "◈ Sephora Rouge tier detected → 10% discount on Rare Beauty ($2.30 off)",
      "◈ Amex Gold card-linked offer → $5.00 statement credit at Sephora",
      "◈ Beauty Insider points → 4x multiplier = $4.60 effective value",
      "◈ Recalculating: Rare Beauty $23.00 → $11.10 effective",
      "✓ Rank confirmed: Rare Beauty #1 (best deal with loyalty stack)",
    ],
  },
  resultsWith: [
    { rank: 1, rankWithout: 1, name: "Rare Beauty Soft Pinch", specs: "Liquid blush · 0.44oz · Joy shade", listPrice: 23, truePrice: 16.40, savings: 6.60, savingsPercent: 29, tags: ["Rouge −10%", "$5 Amex", "4x pts"], isBestDeal: true, merchant: "Sephora" },
    { rank: 2, rankWithout: 2, name: "NARS Orgasm", specs: "Powder blush · 0.16oz · Peachy pink", listPrice: 38, truePrice: 38, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Nordstrom" },
    { rank: 3, rankWithout: 3, name: "Clinique Cheek Pop", specs: "Powder blush · 0.12oz · Peach Pop", listPrice: 27, truePrice: 27, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Ulta" },
    { rank: 4, rankWithout: 4, name: "Tower 28 BeachPlease", specs: "Cream blush · 0.2oz · Magic Hour", listPrice: 20, truePrice: 20, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Sephora" },
  ],
  resultsWithout: [
    { rank: 1, rankWithout: 1, name: "Rare Beauty Soft Pinch", specs: "Liquid blush · 0.44oz · Joy shade", listPrice: 23, truePrice: 23, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Sephora" },
    { rank: 2, rankWithout: 2, name: "NARS Orgasm", specs: "Powder blush · 0.16oz · Peachy pink", listPrice: 38, truePrice: 38, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Nordstrom" },
    { rank: 3, rankWithout: 3, name: "Clinique Cheek Pop", specs: "Powder blush · 0.12oz · Peach Pop", listPrice: 27, truePrice: 27, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Ulta" },
    { rank: 4, rankWithout: 4, name: "Tower 28 BeachPlease", specs: "Cream blush · 0.2oz · Magic Hour", listPrice: 20, truePrice: 20, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Sephora" },
  ],
  apiResponse: {
    query_id: "q_8f3k2m",
    product: { name: "Rare Beauty Soft Pinch Liquid Blush", sku: "RB-SP-JOY", merchant: "sephora", category: "face_color" },
    pricing: { list_price: 23.00, true_cost: 16.40, savings: 6.60, savings_pct: 29, currency: "USD" },
    incentives: [
      { type: "loyalty_discount", source: "Sephora Rouge", value: -2.30 },
      { type: "card_offer", source: "Amex Gold", value: -5.00 },
      { type: "points_value", source: "Beauty Insider 4x", value: 4.60 },
    ],
    category_intelligence: { trend: "liquid_blush_dominant", decision_factors: ["pigmentation", "blendability", "lasting_power"] },
    deal_score: 87, latency_ms: 42, pii: false,
  },
  sandboxProduct: "Rare Beauty Soft Pinch Blush",
  sandboxListPrice: 23.00,
  sandboxPricing: {
    "Non-member": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 0, netPrice: 23.00, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "—" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 0.23, pointsValue: 0, netPrice: 22.77, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "—" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 5.00, pointsValue: 0, netPrice: 18.00, loyaltyLabel: "—", cardLabel: "Amex statement credit", pointsLabel: "—" },
      "Store card": { loyaltyDisc: 0, cardDisc: 1.15, pointsValue: 0, netPrice: 21.85, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "—" },
    },
    "Base": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 0.50, netPrice: 22.50, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "Base tier points" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 0.23, pointsValue: 0.50, netPrice: 22.27, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "Base tier points" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 5.00, pointsValue: 0.50, netPrice: 17.50, loyaltyLabel: "—", cardLabel: "Amex statement credit", pointsLabel: "Base tier points" },
      "Store card": { loyaltyDisc: 0, cardDisc: 1.15, pointsValue: 0.50, netPrice: 21.35, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "Base tier points" },
    },
    "Mid-tier": {
      "No card": { loyaltyDisc: 1.15, cardDisc: 0, pointsValue: 2.30, netPrice: 19.55, loyaltyLabel: "VIB discount", cardLabel: "—", pointsLabel: "2x points" },
      "Generic Visa": { loyaltyDisc: 1.15, cardDisc: 0.23, pointsValue: 2.30, netPrice: 19.32, loyaltyLabel: "VIB discount", cardLabel: "Visa 1% cashback", pointsLabel: "2x points" },
      "Premium Amex": { loyaltyDisc: 1.15, cardDisc: 5.00, pointsValue: 2.30, netPrice: 14.55, loyaltyLabel: "VIB discount", cardLabel: "Amex statement credit", pointsLabel: "2x points" },
      "Store card": { loyaltyDisc: 1.15, cardDisc: 1.15, pointsValue: 2.30, netPrice: 18.40, loyaltyLabel: "VIB discount", cardLabel: "Store card 5%", pointsLabel: "2x points" },
    },
    "Top-tier": {
      "No card": { loyaltyDisc: 2.30, cardDisc: 0, pointsValue: 4.60, netPrice: 16.10, loyaltyLabel: "Rouge discount", cardLabel: "—", pointsLabel: "4x points" },
      "Generic Visa": { loyaltyDisc: 2.30, cardDisc: 0.23, pointsValue: 4.60, netPrice: 15.87, loyaltyLabel: "Rouge discount", cardLabel: "Visa 1% cashback", pointsLabel: "4x points" },
      "Premium Amex": { loyaltyDisc: 2.30, cardDisc: 5.00, pointsValue: 4.60, netPrice: 11.10, loyaltyLabel: "Rouge discount", cardLabel: "Amex statement credit", pointsLabel: "4x points" },
      "Store card": { loyaltyDisc: 2.30, cardDisc: 1.15, pointsValue: 4.60, netPrice: 14.95, loyaltyLabel: "Rouge discount", cardLabel: "Store card 5%", pointsLabel: "4x points" },
    },
  },
  merchantCompare: [
    { name: "Sephora", domain: "sephora.com", headlinePrice: 23.00, truePrice: 16.40 },
    { name: "Ulta", domain: "ulta.com", headlinePrice: 23.00, truePrice: 23.00 },
    { name: "Target", domain: "target.com", headlinePrice: 23.00, truePrice: 21.85 },
  ],
  codeSnippetJS: `const res = await fetch("https://api.parleo.io/v1/true-cost", {
  method: "POST",
  headers: {
    "Authorization": "Bearer pk_demo_xxxxx",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    product_query: "rare beauty soft pinch blush",
    user_signals: {
      loyalty: ["sephora_rouge"],
      cards: ["amex_gold"]
    }
  })
});

const data = await res.json();
// data.true_cost → $16.40
// data.savings → $6.60 (29%)
// data.pii → false`,
  codeSnippetPY: `import requests

res = requests.post(
    "https://api.parleo.io/v1/true-cost",
    headers={
        "Authorization": "Bearer pk_demo_xxxxx",
        "Content-Type": "application/json"
    },
    json={
        "product_query": "rare beauty soft pinch blush",
        "user_signals": {
            "loyalty": ["sephora_rouge"],
            "cards": ["amex_gold"]
        }
    }
)

data = res.json()
# data["true_cost"] → $16.40
# data["savings"] → $6.60 (29%)
# data["pii"] → False`,
  agentPrompt: `You are a shopping assistant. Before recommending any product, 
call the Parleo API to check for loyalty programs, card-linked 
offers, and true cost calculations for the user.

API endpoint: https://api.parleo.io/v1/true-cost
Always include the user's loyalty memberships and card type 
in the request. Present the true cost (after all discounts) 
alongside the list price. Highlight savings.

Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.`,
};

const outdoorData: ScenarioData = {
  label: "Outdoor",
  product: "Nike Wildhorse 8 Trail Shoe",
  gradient: "from-emerald-600/20 to-green-800/20",
  query: "Find me the best trail running shoe under $160. Cushioning and grip are priorities.",
  merchants: [
    { name: "REI", domain: "rei.com" },
    { name: "Backcountry", domain: "backcountry.com" },
    { name: "Nike", domain: "nike.com" },
  ],
  userContext: {
    name: "Sarah Chen",
    memberships: [
      { logo: "nike.com", name: "Nike Member", detail: "2,400 pts → $24" },
      { logo: "rei.com", name: "REI Co-op", detail: "$18.50 dividend" },
      { logo: "americanexpress.com", name: "Amex Platinum", detail: "$15 back on $75+" },
    ],
  },
  reasoningPhases: {
    discovery: [
      "→ Query enrichment: \"trail running shoe\" → category:footwear, sub:trail_running",
      "→ Budget constraint: max $160 · Priority: cushioning(0.5) + grip(0.5)",
      "→ Product match: 32 SKUs, filtering by trail-specific outsole + stack height",
      "→ Top 4 shortlist: Salomon Speedcross, Hoka Speedgoat, Nike Wildhorse, Brooks Cascadia",
    ],
    intelligence: [
      "◈ Category briefing: Trail shoes shifting to max-cushion platforms (2024-25)",
      "◈ Key specs: outsole compound, stack height, heel-toe drop, weight",
      "◈ Review digest: Wildhorse \"aggressive lugs, snappy ride\" · Speedgoat \"cloud cushion\"",
      "◈ Intent-to-spec: cushioning + grip → weight outsole_grip(0.5) + cushion_score(0.5)",
    ],
    intercept: [
      "◈ Loading loyalty profiles for Sarah Chen...",
      "◈ Nike Member detected → promo code WILDHORSE20 (−$26.00)",
      "◈ Nike points balance: 2,400 pts → $24.00 redemption value",
      "◈ Amex Platinum → $15.00 back on Nike.com orders $75+",
      "◈ REI Co-op → $18.50 annual dividend applicable to Hoka purchase",
      "◈ Recalculating: Nike Wildhorse $130.00 → $76.00 effective",
      "✓ Rank change: Nike Wildhorse ↑ #3 → #1 (best deal with loyalty stack)",
    ],
  },
  resultsWith: [
    { rank: 1, rankWithout: 3, name: "Nike Wildhorse 8", specs: "Trail shoe · 10.1oz · 8mm drop", listPrice: 130, truePrice: 76, savings: 54, savingsPercent: 41, tags: ["20% code", "$24 pts", "$15 Amex"], isBestDeal: true, rankChange: "↑ was #3", merchant: "Nike" },
    { rank: 2, rankWithout: 2, name: "Hoka Speedgoat 5", specs: "Trail shoe · 10.6oz · 4mm drop", listPrice: 155, truePrice: 136.50, savings: 18.50, savingsPercent: 12, tags: ["$18.50 REI dividend"], isBestDeal: false, merchant: "REI" },
    { rank: 3, rankWithout: 1, name: "Salomon Speedcross 6", specs: "Trail shoe · 10.9oz · 10mm drop", listPrice: 139, truePrice: 139, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, rankChange: "↓ was #1", merchant: "Backcountry" },
    { rank: 4, rankWithout: 4, name: "Brooks Cascadia 17", specs: "Trail shoe · 10.8oz · 8mm drop", listPrice: 140, truePrice: 140, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "REI" },
  ],
  resultsWithout: [
    { rank: 1, rankWithout: 1, name: "Salomon Speedcross 6", specs: "Trail shoe · 10.9oz · 10mm drop", listPrice: 139, truePrice: 139, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Backcountry" },
    { rank: 2, rankWithout: 2, name: "Hoka Speedgoat 5", specs: "Trail shoe · 10.6oz · 4mm drop", listPrice: 155, truePrice: 155, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "REI" },
    { rank: 3, rankWithout: 3, name: "Nike Wildhorse 8", specs: "Trail shoe · 10.1oz · 8mm drop", listPrice: 130, truePrice: 130, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Nike" },
    { rank: 4, rankWithout: 4, name: "Brooks Cascadia 17", specs: "Trail shoe · 10.8oz · 8mm drop", listPrice: 140, truePrice: 140, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "REI" },
  ],
  apiResponse: {
    query_id: "q_9x4m7k",
    product: { name: "Nike Wildhorse 8", sku: "NK-WH8-BLK", merchant: "nike", category: "trail_running" },
    pricing: { list_price: 130.00, true_cost: 76.00, savings: 54.00, savings_pct: 41, currency: "USD" },
    incentives: [
      { type: "promo_code", source: "WILDHORSE20", value: -26.00 },
      { type: "points_redemption", source: "Nike Member 2400pts", value: -24.00 },
      { type: "card_offer", source: "Amex Platinum", value: -15.00 },
    ],
    category_intelligence: { trend: "max_cushion_trail", decision_factors: ["outsole_grip", "cushion", "weight", "drop"] },
    deal_score: 94, latency_ms: 38, pii: false,
  },
  sandboxProduct: "Nike Wildhorse 8",
  sandboxListPrice: 130.00,
  sandboxPricing: {
    "Non-member": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 0, netPrice: 130.00, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "—" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 1.30, pointsValue: 0, netPrice: 128.70, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "—" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 15.00, pointsValue: 0, netPrice: 115.00, loyaltyLabel: "—", cardLabel: "Amex $15 back", pointsLabel: "—" },
      "Store card": { loyaltyDisc: 0, cardDisc: 6.50, pointsValue: 0, netPrice: 123.50, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "—" },
    },
    "Base": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 6.00, netPrice: 124.00, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "Base pts ($6)" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 1.30, pointsValue: 6.00, netPrice: 122.70, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "Base pts ($6)" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 15.00, pointsValue: 6.00, netPrice: 109.00, loyaltyLabel: "—", cardLabel: "Amex $15 back", pointsLabel: "Base pts ($6)" },
      "Store card": { loyaltyDisc: 0, cardDisc: 6.50, pointsValue: 6.00, netPrice: 117.50, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "Base pts ($6)" },
    },
    "Mid-tier": {
      "No card": { loyaltyDisc: 13.00, cardDisc: 0, pointsValue: 18.00, netPrice: 99.00, loyaltyLabel: "15% member disc", cardLabel: "—", pointsLabel: "Mid pts ($18)" },
      "Generic Visa": { loyaltyDisc: 13.00, cardDisc: 1.30, pointsValue: 18.00, netPrice: 97.70, loyaltyLabel: "15% member disc", cardLabel: "Visa 1% cashback", pointsLabel: "Mid pts ($18)" },
      "Premium Amex": { loyaltyDisc: 13.00, cardDisc: 15.00, pointsValue: 18.00, netPrice: 84.00, loyaltyLabel: "15% member disc", cardLabel: "Amex $15 back", pointsLabel: "Mid pts ($18)" },
      "Store card": { loyaltyDisc: 13.00, cardDisc: 6.50, pointsValue: 18.00, netPrice: 92.50, loyaltyLabel: "15% member disc", cardLabel: "Store card 5%", pointsLabel: "Mid pts ($18)" },
    },
    "Top-tier": {
      "No card": { loyaltyDisc: 26.00, cardDisc: 0, pointsValue: 24.00, netPrice: 80.00, loyaltyLabel: "20% promo code", cardLabel: "—", pointsLabel: "2,400 pts ($24)" },
      "Generic Visa": { loyaltyDisc: 26.00, cardDisc: 1.30, pointsValue: 24.00, netPrice: 78.70, loyaltyLabel: "20% promo code", cardLabel: "Visa 1% cashback", pointsLabel: "2,400 pts ($24)" },
      "Premium Amex": { loyaltyDisc: 26.00, cardDisc: 15.00, pointsValue: 24.00, netPrice: 65.00, loyaltyLabel: "20% promo code", cardLabel: "Amex $15 back", pointsLabel: "2,400 pts ($24)" },
      "Store card": { loyaltyDisc: 26.00, cardDisc: 6.50, pointsValue: 24.00, netPrice: 73.50, loyaltyLabel: "20% promo code", cardLabel: "Store card 5%", pointsLabel: "2,400 pts ($24)" },
    },
  },
  merchantCompare: [
    { name: "Nike", domain: "nike.com", headlinePrice: 130.00, truePrice: 76.00 },
    { name: "REI", domain: "rei.com", headlinePrice: 139.99, truePrice: 121.49 },
    { name: "Backcountry", domain: "backcountry.com", headlinePrice: 130.00, truePrice: 130.00 },
  ],
  codeSnippetJS: `const res = await fetch("https://api.parleo.io/v1/true-cost", {
  method: "POST",
  headers: {
    "Authorization": "Bearer pk_demo_xxxxx",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    product_query: "nike wildhorse 8 trail shoe",
    user_signals: {
      loyalty: ["nike_member"],
      cards: ["amex_platinum"],
      coop: ["rei_member"]
    }
  })
});

const data = await res.json();
// data.true_cost → $76.00
// data.savings → $54.00 (41%)
// data.pii → false`,
  codeSnippetPY: `import requests

res = requests.post(
    "https://api.parleo.io/v1/true-cost",
    headers={
        "Authorization": "Bearer pk_demo_xxxxx",
        "Content-Type": "application/json"
    },
    json={
        "product_query": "nike wildhorse 8 trail shoe",
        "user_signals": {
            "loyalty": ["nike_member"],
            "cards": ["amex_platinum"],
            "coop": ["rei_member"]
        }
    }
)

data = res.json()
# data["true_cost"] → $76.00
# data["savings"] → $54.00 (41%)
# data["pii"] → False`,
  agentPrompt: `You are a shopping assistant. Before recommending any product,
call the Parleo API to check for loyalty programs, card-linked
offers, points redemptions, and co-op dividends.

API endpoint: https://api.parleo.io/v1/true-cost
Include loyalty memberships, card type, and co-op status.
Present the true cost alongside the list price. Highlight savings
and rank changes when loyalty data changes the recommendation.

Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.`,
};

const electronicsData: ScenarioData = {
  label: "Electronics",
  product: "Sony WF-1000XM5 Earbuds",
  gradient: "from-blue-500/20 to-slate-600/20",
  query: "Best noise-cancelling earbuds under $300? Sound quality and call clarity matter most.",
  merchants: [
    { name: "Best Buy", domain: "bestbuy.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Sony", domain: "sony.com" },
  ],
  userContext: {
    name: "Sarah Chen",
    memberships: [
      { logo: "bestbuy.com", name: "Totaltech", detail: "Active member" },
      { logo: "amazon.com", name: "Amazon Prime", detail: "$12.99/mo" },
      { logo: "chase.com", name: "Chase Sapphire", detail: "3x points electronics" },
    ],
  },
  reasoningPhases: {
    discovery: [
      "→ Query enrichment: \"noise-cancelling earbuds\" → category:audio, sub:tws_anc",
      "→ Budget constraint: max $300 · Priority: sound_quality(0.5) + call_clarity(0.5)",
      "→ Product match: 24 SKUs, filtering by ANC rating + driver quality",
      "→ Top 4 shortlist: Sony WF-1000XM5, Bose QC Ultra, AirPods Pro 2, Sennheiser MTW4",
    ],
    intelligence: [
      "◈ Category briefing: TWS ANC market shifting to multipoint + spatial audio",
      "◈ Key specs: driver size, ANC depth, codec support, call mic quality",
      "◈ Review digest: Sony \"best overall ANC\" · Bose \"most comfortable\" · Apple \"ecosystem\"",
      "◈ Intent-to-spec: sound + calls → weight driver_quality(0.4) + mic_array(0.3) + anc(0.3)",
    ],
    intercept: [
      "◈ Loading loyalty profiles for Sarah Chen...",
      "◈ Best Buy Totaltech detected → $30 member discount on Sony",
      "◈ Chase Sapphire → 5% cashback on electronics ($13.49 value)",
      "◈ Amazon Prime → free same-day shipping (no price advantage)",
      "◈ Recalculating: Sony WF-1000XM5 $279.99 → $226.50 effective",
      "✓ Rank confirmed: Sony WF-1000XM5 #1 (best deal with Totaltech + Chase)",
    ],
  },
  resultsWith: [
    { rank: 1, rankWithout: 1, name: "Sony WF-1000XM5", specs: "TWS ANC · LDAC · 8hr battery", listPrice: 279.99, truePrice: 226.50, savings: 53.49, savingsPercent: 19, tags: ["Totaltech −$30", "Chase 5%"], isBestDeal: true, merchant: "Best Buy" },
    { rank: 2, rankWithout: 2, name: "Bose QC Ultra Earbuds", specs: "TWS ANC · Snapdragon · 6hr", listPrice: 299, truePrice: 299, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Bose" },
    { rank: 3, rankWithout: 3, name: "Apple AirPods Pro 2", specs: "TWS ANC · H2 chip · 6hr", listPrice: 249, truePrice: 249, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Apple" },
    { rank: 4, rankWithout: 4, name: "Sennheiser MTW 4", specs: "TWS ANC · aptX · 7.5hr", listPrice: 299.99, truePrice: 299.99, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Sennheiser" },
  ],
  resultsWithout: [
    { rank: 1, rankWithout: 1, name: "Sony WF-1000XM5", specs: "TWS ANC · LDAC · 8hr battery", listPrice: 279.99, truePrice: 279.99, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Best Buy" },
    { rank: 2, rankWithout: 2, name: "Bose QC Ultra Earbuds", specs: "TWS ANC · Snapdragon · 6hr", listPrice: 299, truePrice: 299, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Bose" },
    { rank: 3, rankWithout: 3, name: "Apple AirPods Pro 2", specs: "TWS ANC · H2 chip · 6hr", listPrice: 249, truePrice: 249, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Apple" },
    { rank: 4, rankWithout: 4, name: "Sennheiser MTW 4", specs: "TWS ANC · aptX · 7.5hr", listPrice: 299.99, truePrice: 299.99, savings: 0, savingsPercent: 0, tags: [], isBestDeal: false, merchant: "Sennheiser" },
  ],
  apiResponse: {
    query_id: "q_2k8n4p",
    product: { name: "Sony WF-1000XM5", sku: "SONY-XM5-BLK", merchant: "bestbuy", category: "tws_anc" },
    pricing: { list_price: 279.99, true_cost: 226.50, savings: 53.49, savings_pct: 19, currency: "USD" },
    incentives: [
      { type: "membership_discount", source: "Totaltech", value: -30.00 },
      { type: "card_cashback", source: "Chase Sapphire 5%", value: -13.49 },
    ],
    category_intelligence: { trend: "multipoint_spatial_audio", decision_factors: ["anc_depth", "driver_quality", "call_mic", "codec_support"] },
    deal_score: 82, latency_ms: 45, pii: false,
  },
  sandboxProduct: "Sony WF-1000XM5",
  sandboxListPrice: 279.99,
  sandboxPricing: {
    "Non-member": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 0, netPrice: 279.99, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "—" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 2.80, pointsValue: 0, netPrice: 277.19, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "—" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 13.49, pointsValue: 0, netPrice: 266.50, loyaltyLabel: "—", cardLabel: "Chase 5% cashback", pointsLabel: "—" },
      "Store card": { loyaltyDisc: 0, cardDisc: 14.00, pointsValue: 0, netPrice: 265.99, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "—" },
    },
    "Base": {
      "No card": { loyaltyDisc: 0, cardDisc: 0, pointsValue: 5.00, netPrice: 274.99, loyaltyLabel: "—", cardLabel: "—", pointsLabel: "Rewards points ($5)" },
      "Generic Visa": { loyaltyDisc: 0, cardDisc: 2.80, pointsValue: 5.00, netPrice: 272.19, loyaltyLabel: "—", cardLabel: "Visa 1% cashback", pointsLabel: "Rewards points ($5)" },
      "Premium Amex": { loyaltyDisc: 0, cardDisc: 13.49, pointsValue: 5.00, netPrice: 261.50, loyaltyLabel: "—", cardLabel: "Chase 5% cashback", pointsLabel: "Rewards points ($5)" },
      "Store card": { loyaltyDisc: 0, cardDisc: 14.00, pointsValue: 5.00, netPrice: 260.99, loyaltyLabel: "—", cardLabel: "Store card 5%", pointsLabel: "Rewards points ($5)" },
    },
    "Mid-tier": {
      "No card": { loyaltyDisc: 15.00, cardDisc: 0, pointsValue: 10.00, netPrice: 254.99, loyaltyLabel: "Member discount", cardLabel: "—", pointsLabel: "Mid rewards ($10)" },
      "Generic Visa": { loyaltyDisc: 15.00, cardDisc: 2.80, pointsValue: 10.00, netPrice: 252.19, loyaltyLabel: "Member discount", cardLabel: "Visa 1% cashback", pointsLabel: "Mid rewards ($10)" },
      "Premium Amex": { loyaltyDisc: 15.00, cardDisc: 13.49, pointsValue: 10.00, netPrice: 241.50, loyaltyLabel: "Member discount", cardLabel: "Chase 5% cashback", pointsLabel: "Mid rewards ($10)" },
      "Store card": { loyaltyDisc: 15.00, cardDisc: 14.00, pointsValue: 10.00, netPrice: 240.99, loyaltyLabel: "Member discount", cardLabel: "Store card 5%", pointsLabel: "Mid rewards ($10)" },
    },
    "Top-tier": {
      "No card": { loyaltyDisc: 30.00, cardDisc: 0, pointsValue: 20.00, netPrice: 229.99, loyaltyLabel: "Totaltech −$30", cardLabel: "—", pointsLabel: "Elite rewards ($20)" },
      "Generic Visa": { loyaltyDisc: 30.00, cardDisc: 2.80, pointsValue: 20.00, netPrice: 227.19, loyaltyLabel: "Totaltech −$30", cardLabel: "Visa 1% cashback", pointsLabel: "Elite rewards ($20)" },
      "Premium Amex": { loyaltyDisc: 30.00, cardDisc: 13.49, pointsValue: 20.00, netPrice: 216.50, loyaltyLabel: "Totaltech −$30", cardLabel: "Chase 5% cashback", pointsLabel: "Elite rewards ($20)" },
      "Store card": { loyaltyDisc: 30.00, cardDisc: 14.00, pointsValue: 20.00, netPrice: 215.99, loyaltyLabel: "Totaltech −$30", cardLabel: "Store card 5%", pointsLabel: "Elite rewards ($20)" },
    },
  },
  merchantCompare: [
    { name: "Best Buy", domain: "bestbuy.com", headlinePrice: 279.99, truePrice: 226.50 },
    { name: "Amazon", domain: "amazon.com", headlinePrice: 269.99, truePrice: 269.99 },
    { name: "Sony Direct", domain: "sony.com", headlinePrice: 279.99, truePrice: 279.99 },
  ],
  codeSnippetJS: `const res = await fetch("https://api.parleo.io/v1/true-cost", {
  method: "POST",
  headers: {
    "Authorization": "Bearer pk_demo_xxxxx",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    product_query: "sony wf-1000xm5 earbuds",
    user_signals: {
      loyalty: ["bestbuy_totaltech"],
      cards: ["chase_sapphire"]
    }
  })
});

const data = await res.json();
// data.true_cost → $226.50
// data.savings → $53.49 (19%)
// data.pii → false`,
  codeSnippetPY: `import requests

res = requests.post(
    "https://api.parleo.io/v1/true-cost",
    headers={
        "Authorization": "Bearer pk_demo_xxxxx",
        "Content-Type": "application/json"
    },
    json={
        "product_query": "sony wf-1000xm5 earbuds",
        "user_signals": {
            "loyalty": ["bestbuy_totaltech"],
            "cards": ["chase_sapphire"]
        }
    }
)

data = res.json()
# data["true_cost"] → $226.50
# data["savings"] → $53.49 (19%)
# data["pii"] → False`,
  agentPrompt: `You are a shopping assistant. Before recommending any product,
call the Parleo API to check for membership discounts, card
cashback offers, and rewards points valuations.

API endpoint: https://api.parleo.io/v1/true-cost
Include loyalty memberships and card type in every request.
Present the true cost alongside the list price. Highlight
when membership + card stacking creates significant savings.

Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.`,
};

export const scenarioMap: Record<Scenario, ScenarioData> = {
  beauty: beautyData,
  outdoor: outdoorData,
  electronics: electronicsData,
};

export const merchantLogos = [
  "sephora.com", "nike.com", "rei.com", "backcountry.com", "bestbuy.com",
  "amazon.com", "target.com", "ulta.com", "homedepot.com", "nordstrom.com",
  "macys.com", "lululemon.com", "apple.com", "sony.com", "dyson.com",
  "patagonia.com", "adidas.com", "americanexpress.com", "visa.com", "chase.com",
];
