export type ScenarioKey = "beauty" | "outdoor" | "electronics";

export interface DealStackItem {
  type: string;
  program: string;
  value: number;
  expires_days?: number;
  rate?: string;
}

export interface Product {
  name: string;
  specs: string;
  listPrice: number;
  trueCost: number;
  rankWithout: number;
  rankWith: number;
  merchant: string;
  dealTags: string[];
  dealStack: DealStackItem[];
  isBestDeal: boolean;
}

export interface MerchantCompare {
  name: string;
  headlinePrice: number;
  trueCost: number;
  isBestValue: boolean;
}

export interface SandboxVariation {
  membershipTier: string;
  cardType: string;
  channel: string;
  loyaltyDiscount: number;
  loyaltyLabel: string;
  cardDiscount: number;
  cardLabel: string;
  pointsValue: number;
  pointsLabel: string;
  netPrice: number;
}

export interface Scenario {
  key: ScenarioKey;
  label: string;
  subLabel: string;
  merchants: string;
  icon: string; // SVG path
  query: string;
  profile: { label: string; status: string }[];
  profileName: string;
  reasoning: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
  };
  products: Product[];
  merchantCompare: MerchantCompare[];
  apiResponse: object;
  codeSnippet: { sku: string; merchant: string; tier: string; card: string };
  sandboxProduct: string;
  sandboxListPrice: number;
  sandboxVariations: SandboxVariation[];
}

const beautyVariations: SandboxVariation[] = [
  { membershipTier: "Top-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 2.30, loyaltyLabel: "Rouge −10%", cardDiscount: 5.00, cardLabel: "Amex Gold −$5", pointsValue: 4.60, pointsLabel: "4x pts ($4.60)", netPrice: 16.40 },
  { membershipTier: "Top-tier", cardType: "Generic Visa", channel: "Web", loyaltyDiscount: 2.30, loyaltyLabel: "Rouge −10%", cardDiscount: 0, cardLabel: "—", pointsValue: 4.60, pointsLabel: "4x pts ($4.60)", netPrice: 16.10 },
  { membershipTier: "Mid-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 1.15, loyaltyLabel: "VIB −5%", cardDiscount: 5.00, cardLabel: "Amex Gold −$5", pointsValue: 2.30, pointsLabel: "2x pts ($2.30)", netPrice: 14.55 },
  { membershipTier: "Mid-tier", cardType: "No card", channel: "Web", loyaltyDiscount: 1.15, loyaltyLabel: "VIB −5%", cardDiscount: 0, cardLabel: "—", pointsValue: 2.30, pointsLabel: "2x pts ($2.30)", netPrice: 19.55 },
  { membershipTier: "Base", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "Insider (no discount)", cardDiscount: 5.00, cardLabel: "Amex Gold −$5", pointsValue: 1.15, pointsLabel: "1x pts ($1.15)", netPrice: 16.85 },
  { membershipTier: "Base", cardType: "Store card", channel: "In-app", loyaltyDiscount: 0, loyaltyLabel: "Insider (no discount)", cardDiscount: 1.50, cardLabel: "Store card −$1.50", pointsValue: 1.15, pointsLabel: "1x pts ($1.15)", netPrice: 20.35 },
  { membershipTier: "Non-member", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 5.00, cardLabel: "Amex Gold −$5", pointsValue: 0, pointsLabel: "—", netPrice: 18.00 },
  { membershipTier: "Non-member", cardType: "No card", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 23.00 },
];

const outdoorVariations: SandboxVariation[] = [
  { membershipTier: "Top-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 26.00, loyaltyLabel: "WILDHORSE20 −$26", cardDiscount: 15.00, cardLabel: "Amex Plat −$15", pointsValue: 24.00, pointsLabel: "2,400 pts ($24)", netPrice: 65.00 },
  { membershipTier: "Top-tier", cardType: "Generic Visa", channel: "Web", loyaltyDiscount: 26.00, loyaltyLabel: "WILDHORSE20 −$26", cardDiscount: 0, cardLabel: "—", pointsValue: 24.00, pointsLabel: "2,400 pts ($24)", netPrice: 80.00 },
  { membershipTier: "Mid-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 13.00, loyaltyLabel: "Member −10%", cardDiscount: 15.00, cardLabel: "Amex Plat −$15", pointsValue: 12.00, pointsLabel: "1,200 pts ($12)", netPrice: 90.00 },
  { membershipTier: "Mid-tier", cardType: "No card", channel: "Web", loyaltyDiscount: 13.00, loyaltyLabel: "Member −10%", cardDiscount: 0, cardLabel: "—", pointsValue: 12.00, pointsLabel: "1,200 pts ($12)", netPrice: 105.00 },
  { membershipTier: "Base", cardType: "Premium Amex", channel: "In-app", loyaltyDiscount: 0, loyaltyLabel: "Basic (no discount)", cardDiscount: 15.00, cardLabel: "Amex Plat −$15", pointsValue: 0, pointsLabel: "—", netPrice: 115.00 },
  { membershipTier: "Base", cardType: "No card", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "Basic (no discount)", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 130.00 },
  { membershipTier: "Non-member", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 15.00, cardLabel: "Amex Plat −$15", pointsValue: 0, pointsLabel: "—", netPrice: 115.00 },
  { membershipTier: "Non-member", cardType: "No card", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 130.00 },
];

const electronicsVariations: SandboxVariation[] = [
  { membershipTier: "Top-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 30.00, loyaltyLabel: "Totaltech −$30", cardDiscount: 13.49, cardLabel: "Chase 5% −$13.49", pointsValue: 0, pointsLabel: "—", netPrice: 236.50 },
  { membershipTier: "Top-tier", cardType: "Generic Visa", channel: "Web", loyaltyDiscount: 30.00, loyaltyLabel: "Totaltech −$30", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 249.99 },
  { membershipTier: "Mid-tier", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 15.00, loyaltyLabel: "Plus member −$15", cardDiscount: 13.49, cardLabel: "Chase 5% −$13.49", pointsValue: 0, pointsLabel: "—", netPrice: 251.50 },
  { membershipTier: "Mid-tier", cardType: "No card", channel: "Web", loyaltyDiscount: 15.00, loyaltyLabel: "Plus member −$15", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 264.99 },
  { membershipTier: "Base", cardType: "Premium Amex", channel: "In-app", loyaltyDiscount: 0, loyaltyLabel: "Basic (no discount)", cardDiscount: 13.49, cardLabel: "Chase 5% −$13.49", pointsValue: 0, pointsLabel: "—", netPrice: 266.50 },
  { membershipTier: "Base", cardType: "Store card", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "Basic (no discount)", cardDiscount: 8.00, cardLabel: "Store card −$8", pointsValue: 0, pointsLabel: "—", netPrice: 271.99 },
  { membershipTier: "Non-member", cardType: "Premium Amex", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 13.49, cardLabel: "Chase 5% −$13.49", pointsValue: 0, pointsLabel: "—", netPrice: 266.50 },
  { membershipTier: "Non-member", cardType: "No card", channel: "Web", loyaltyDiscount: 0, loyaltyLabel: "—", cardDiscount: 0, cardLabel: "—", pointsValue: 0, pointsLabel: "—", netPrice: 279.99 },
];

export const scenarios: Record<ScenarioKey, Scenario> = {
  beauty: {
    key: "beauty",
    label: "Beauty",
    subLabel: "Rare Beauty Soft Pinch Blush",
    merchants: "Sephora · Ulta · Target",
    icon: "lipstick",
    query: "What's the best rated blush right now? I want the best deal.",
    profileName: "Sarah Chen",
    profile: [
      { label: "Sephora Rouge", status: "Active" },
      { label: "Amex Gold", status: "Card-linked offer" },
      { label: "Target Circle", status: "Member" },
    ],
    reasoning: {
      phase1: [
        "→ Enriching query: best rated blush, best deal",
        "→ Fetching product specs from 12 merchant feeds — normalizing across 24 attributes",
        "→ Scoring shortlist: Rare Beauty Soft Pinch #1 (0.91) · NARS Orgasm #2 (0.86) · Clinique Cheek Pop #3 (0.82) · Tower 28 BeachPlease #4 (0.78)",
      ],
      phase2: [
        "◈ Loading category intelligence: Blush (cream/liquid vs powder)",
        "◈ Key specs: finish type, longevity (hrs), shade range, skin-type compatibility",
        "◈ Review digest: Rare Beauty strong on blendability + longevity, mixed on shade matching for deep tones",
        "◈ Intent-to-spec: \"best deal\" + \"best rated\" → optimize for value-adjusted quality score",
      ],
      phase3: [
        "◈ Parleo intercepting — loading loyalty balances for Sarah Chen",
        "◈ Sephora Rouge: active tier → −10% on all makeup",
        "◈ Amex Gold card offer: −$5 on Sephora $20+ · expires 4 days",
        "◈ Beauty Insider: 4x points this week on blush ($4.60 value)",
        "◈ Target Circle: 5% RedCard discount (if available at Target)",
        "◈ Recalculating true costs: Rare Beauty $23 → $16.40 at Sephora · $23 at Ulta · $23 at Target",
        "✓ Rank confirmed: Rare Beauty remains #1. Sephora is best-value destination (29% below list).",
      ],
    },
    products: [
      { name: "Rare Beauty Soft Pinch", specs: "Liquid / Blendable / 0.44oz", listPrice: 23.00, trueCost: 16.40, rankWithout: 1, rankWith: 1, merchant: "Sephora", dealTags: ["Rouge −10%", "$5 Amex offer", "4x points"], dealStack: [{ type: "loyalty_tier", program: "Rouge", value: 2.30 }, { type: "card_offer", program: "Amex Gold", value: 5.00, expires_days: 4 }, { type: "points_earning", program: "Beauty Insider", rate: "4x", value: 4.60 }], isBestDeal: true },
      { name: "NARS Orgasm", specs: "Powder / Shimmer / 0.28oz", listPrice: 38.00, trueCost: 38.00, rankWithout: 2, rankWith: 2, merchant: "Nordstrom", dealTags: [], dealStack: [], isBestDeal: false },
      { name: "Clinique Cheek Pop", specs: "Powder / Matte / 0.12oz", listPrice: 27.00, trueCost: 27.00, rankWithout: 3, rankWith: 3, merchant: "Ulta", dealTags: [], dealStack: [], isBestDeal: false },
      { name: "Tower 28 BeachPlease", specs: "Cream / Natural / 0.20oz", listPrice: 20.00, trueCost: 20.00, rankWithout: 4, rankWith: 4, merchant: "Sephora", dealTags: [], dealStack: [], isBestDeal: false },
    ],
    merchantCompare: [
      { name: "Sephora", headlinePrice: 23.00, trueCost: 16.40, isBestValue: true },
      { name: "Ulta", headlinePrice: 23.00, trueCost: 23.00, isBestValue: false },
      { name: "Target", headlinePrice: 23.00, trueCost: 23.00, isBestValue: false },
    ],
    apiResponse: {
      product: "Rare Beauty Soft Pinch Liquid Blush",
      list_price: 23.00,
      true_cost: 16.40,
      best_merchant: "sephora_us",
      deal_stack: [
        { type: "loyalty_tier", program: "Rouge", value: 2.30 },
        { type: "card_offer", provider: "Amex Gold", value: 5.00, expires_days: 4 },
        { type: "points_earning", program: "Beauty Insider", rate: "4x", value: 4.60 },
      ],
      total_savings: 6.60,
      savings_pct: 28.7,
      rank_without_deals: 1,
      rank_with_deals: 1,
      category_intelligence: { decisive_specs: ["finish_type", "longevity_hrs", "shade_range"], review_signal: "strong_positive", confidence: 0.91 },
      pii: false,
      response_ms: 47,
    },
    codeSnippet: { sku: "RARE-BEAUTY-SPB", merchant: "sephora_us", tier: "rouge", card: "amex_gold" },
    sandboxProduct: "Rare Beauty Soft Pinch Liquid Blush",
    sandboxListPrice: 23.00,
    sandboxVariations: beautyVariations,
  },
  outdoor: {
    key: "outdoor",
    label: "Outdoor",
    subLabel: "Nike Wildhorse 8 Trail Shoe",
    merchants: "REI · Backcountry · Nike.com",
    icon: "boot",
    query: "Find me the best trail running shoe under $160. Prioritize cushioning and grip.",
    profileName: "Sarah Chen",
    profile: [
      { label: "Nike Member", status: "2,400 pts → $24" },
      { label: "REI Co-op", status: "$18.50 dividend" },
      { label: "Amex Platinum", status: "$15 back on $75+" },
    ],
    reasoning: {
      phase1: [
        "→ Enriching query: trail running shoe under $160, cushioning + grip",
        "→ Inferring constraints from profile: road-to-trail transition, heel striker, half-marathon training",
        "→ Fetching product specs from 14 merchant feeds — normalizing across 38 attributes",
        "→ Scoring shortlist: Salomon Speedcross 6 #1 (0.87) · Hoka Speedgoat 5 #2 (0.84) · Nike Wildhorse 8 #3 (0.79) · Brooks Cascadia 17 #4 (0.76)",
      ],
      phase2: [
        "◈ Loading category intelligence: Trail Running Shoes",
        "◈ Key specs: outsole lug depth, stack height, heel drop, weight, rock plate",
        "◈ Review digest: Salomon strong on grip, narrow fit flagged. Nike strong on versatility, cushioning adequate",
        "◈ Intent-to-spec: \"cushioning + grip\" + \"$160 budget\" → lug depth ≥4mm, stack ≥28mm, price ≤$160",
      ],
      phase3: [
        "◈ Parleo intercepting — loading loyalty balances for Sarah Chen",
        "◈ Nike Member: WILDHORSE20 active → −$26.00 · 2,400 pts redeemable → −$24.00",
        "◈ Amex Platinum: $15 back on Nike $75+ · expires 6 days · triggers on this order",
        "◈ REI Co-op dividend: $18.50 applicable to Hoka Speedgoat 5",
        "◈ Recalculating true costs: Nike $130 → $65.00 effective · Hoka $155 → $136.50",
        "✓ Rank change detected: Nike Wildhorse 8 moves #3 → #1 on true cost (50% below list)",
      ],
    },
    products: [
      { name: "Nike Wildhorse 8", specs: "Trail / Balanced / 272g", listPrice: 130.00, trueCost: 65.00, rankWithout: 3, rankWith: 1, merchant: "Nike.com", dealTags: ["20% member code", "$24 points", "$15 Amex offer"], dealStack: [{ type: "promo_code", program: "WILDHORSE20", value: 26.00 }, { type: "points_redemption", program: "Nike Member", value: 24.00 }, { type: "card_offer", program: "Amex Platinum", value: 15.00, expires_days: 6 }], isBestDeal: true },
      { name: "Salomon Speedcross 6", specs: "Trail / Aggressive / 310g", listPrice: 140.00, trueCost: 140.00, rankWithout: 1, rankWith: 2, merchant: "REI", dealTags: [], dealStack: [], isBestDeal: false },
      { name: "Hoka Speedgoat 5", specs: "Trail / Cushioned / 291g", listPrice: 155.00, trueCost: 136.50, rankWithout: 2, rankWith: 3, merchant: "REI", dealTags: ["$18.50 dividend"], dealStack: [{ type: "dividend", program: "REI Co-op", value: 18.50 }], isBestDeal: false },
      { name: "Brooks Cascadia 17", specs: "Trail / Stable / 298g", listPrice: 140.00, trueCost: 140.00, rankWithout: 4, rankWith: 4, merchant: "Backcountry", dealTags: [], dealStack: [], isBestDeal: false },
    ],
    merchantCompare: [
      { name: "Nike.com", headlinePrice: 130.00, trueCost: 65.00, isBestValue: true },
      { name: "REI", headlinePrice: 130.00, trueCost: 130.00, isBestValue: false },
      { name: "Backcountry", headlinePrice: 130.00, trueCost: 130.00, isBestValue: false },
    ],
    apiResponse: {
      product: "Nike Wildhorse 8 Trail Shoe",
      list_price: 130.00,
      true_cost: 65.00,
      best_merchant: "nike_us",
      deal_stack: [
        { type: "promo_code", program: "WILDHORSE20", value: 26.00 },
        { type: "points_redemption", program: "Nike Member", value: 24.00 },
        { type: "card_offer", provider: "Amex Platinum", value: 15.00, expires_days: 6 },
      ],
      total_savings: 65.00,
      savings_pct: 50.0,
      rank_without_deals: 3,
      rank_with_deals: 1,
      category_intelligence: { decisive_specs: ["lug_depth", "stack_height", "heel_drop"], review_signal: "positive", confidence: 0.79 },
      pii: false,
      response_ms: 52,
    },
    codeSnippet: { sku: "NIKE-WH8-BLK", merchant: "nike_us", tier: "member", card: "amex_plat" },
    sandboxProduct: "Nike Wildhorse 8 Trail Shoe",
    sandboxListPrice: 130.00,
    sandboxVariations: outdoorVariations,
  },
  electronics: {
    key: "electronics",
    label: "Electronics",
    subLabel: "Sony WF-1000XM5 Earbuds",
    merchants: "Best Buy · Amazon · Sony Direct",
    icon: "headphones",
    query: "Best noise-cancelling earbuds under $300? I care about sound quality and call clarity.",
    profileName: "Sarah Chen",
    profile: [
      { label: "Best Buy Totaltech", status: "Active member" },
      { label: "Amazon Prime", status: "$12.99/mo" },
      { label: "Chase Sapphire", status: "3x points on travel" },
    ],
    reasoning: {
      phase1: [
        "→ Enriching query: noise-cancelling earbuds under $300, sound quality + call clarity",
        "→ Fetching product specs from 11 merchant feeds — normalizing across 42 attributes",
        "→ Scoring shortlist: Sony WF-1000XM5 #1 (0.92) · Bose QC Ultra #2 (0.88) · Apple AirPods Pro 2 #3 (0.85) · Sennheiser MTW4 #4 (0.81)",
      ],
      phase2: [
        "◈ Loading category intelligence: True Wireless Earbuds (ANC)",
        "◈ Key specs: driver size, ANC depth (dB), codec support, call mic quality rating, battery life",
        "◈ Review digest: Sony dominant on sound quality, battery life praised. Bose stronger on ANC comfort. Apple best ecosystem integration",
        "◈ Intent-to-spec: \"sound quality + call clarity\" → driver ≥8.4mm, call mic ≥4/5, ANC ≥35dB reduction",
      ],
      phase3: [
        "◈ Parleo intercepting — loading loyalty balances for Sarah Chen",
        "◈ Best Buy Totaltech: active member → −$30 exclusive member price on Sony",
        "◈ Chase Sapphire: 5% back on electronics category this quarter → −$13.49",
        "◈ Amazon Prime: free same-day delivery (no price discount on this SKU)",
        "◈ Sony Direct: student discount available → −15% ($269.99 → $229.49) but no card stacking",
        "◈ Recalculating true costs: Sony $279.99 → $236.50 at Best Buy · $269.99 at Amazon · $229.49 at Sony Direct",
        "✓ Best Buy wins on net effective cost. Sony Direct competitive but no card-linked stacking.",
      ],
    },
    products: [
      { name: "Sony WF-1000XM5", specs: "ANC / LDAC / 8.4mm", listPrice: 279.99, trueCost: 236.50, rankWithout: 1, rankWith: 1, merchant: "Best Buy", dealTags: ["Totaltech −$30", "Chase 5% back"], dealStack: [{ type: "membership", program: "Totaltech", value: 30.00 }, { type: "card_offer", program: "Chase Sapphire", value: 13.49 }], isBestDeal: true },
      { name: "Bose QC Ultra Earbuds", specs: "ANC / aptX / 9.3mm", listPrice: 299.00, trueCost: 299.00, rankWithout: 2, rankWith: 2, merchant: "Amazon", dealTags: [], dealStack: [], isBestDeal: false },
      { name: "Apple AirPods Pro 2", specs: "ANC / AAC / H2 chip", listPrice: 249.00, trueCost: 249.00, rankWithout: 3, rankWith: 3, merchant: "Amazon", dealTags: [], dealStack: [], isBestDeal: false },
      { name: "Sennheiser MTW4", specs: "ANC / aptX / 7mm", listPrice: 299.95, trueCost: 299.95, rankWithout: 4, rankWith: 4, merchant: "Amazon", dealTags: [], dealStack: [], isBestDeal: false },
    ],
    merchantCompare: [
      { name: "Best Buy", headlinePrice: 279.99, trueCost: 236.50, isBestValue: true },
      { name: "Amazon", headlinePrice: 269.99, trueCost: 269.99, isBestValue: false },
      { name: "Sony Direct", headlinePrice: 279.99, trueCost: 229.49, isBestValue: false },
    ],
    apiResponse: {
      product: "Sony WF-1000XM5",
      list_price: 279.99,
      true_cost: 236.50,
      best_merchant: "bestbuy_us",
      deal_stack: [
        { type: "membership", program: "Totaltech", value: 30.00 },
        { type: "card_offer", provider: "Chase Sapphire", value: 13.49 },
      ],
      total_savings: 43.49,
      savings_pct: 15.5,
      rank_without_deals: 1,
      rank_with_deals: 1,
      category_intelligence: { decisive_specs: ["driver_size", "anc_depth_db", "codec_support"], review_signal: "dominant_positive", confidence: 0.92 },
      pii: false,
      response_ms: 41,
    },
    codeSnippet: { sku: "SONY-XM5-BLK", merchant: "bestbuy_us", tier: "totaltech", card: "chase_sapphire" },
    sandboxProduct: "Sony WF-1000XM5",
    sandboxListPrice: 279.99,
    sandboxVariations: electronicsVariations,
  },
};

export function findSandboxVariation(
  variations: SandboxVariation[],
  membership: string,
  card: string,
  channel: string
): SandboxVariation {
  // Find exact match or closest
  const exact = variations.find(
    (v) => v.membershipTier === membership && v.cardType === card && v.channel === channel
  );
  if (exact) return exact;
  // fallback: match membership + card
  const partial = variations.find(
    (v) => v.membershipTier === membership && v.cardType === card
  );
  if (partial) return partial;
  // fallback: match membership
  const byMembership = variations.find((v) => v.membershipTier === membership);
  if (byMembership) return byMembership;
  return variations[0];
}
