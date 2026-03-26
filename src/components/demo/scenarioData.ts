export type Scenario = "beauty" | "outdoor" | "electronics";

export interface MembershipLine {
  domain: string;
  name: string;
  detail: string;
}

export interface ReasoningLine {
  phase: 1 | 2 | 3;
  text: string;
}

export interface ProductResult {
  rank: number;
  name: string;
  specs: string;
  listPrice: number;
  truePrice?: number;
  savings?: number;
  deals?: string[];
  bestDeal?: boolean;
  rankChange?: string;
}

export type CardType = 'no-card' | 'visa' | 'amex' | 'store';

export interface SandboxMerchant {
  name: string;
  listPrice: number;
  topLoyalty: number;
  loyaltyLabel: string;
  cardDiscounts: Record<CardType, number>;
  cardLabels: Record<Exclude<CardType, 'no-card'>, string>;
}

export interface SandboxBase {
  listPrice: number;
  loyaltyFull: number;
  loyaltyLabel: string;
  cardFull: number;
  cardLabel: string;
  pointsFull: number;
  pointsLabel: string;
}

export interface MerchantCompare {
  name: string;
  domain: string;
  headlinePrice: number;
  trueCost: number;
  note?: string;
}

export interface ScenarioData {
  label: string;
  product: string;
  color: string;
  merchantDomains: string[];
  query: string;
  memberships: MembershipLine[];
  reasoning: ReasoningLine[];
  resultsWithParleo: ProductResult[];
  resultsWithout: ProductResult[];
  sandbox: SandboxBase;
  sandboxMerchants: SandboxMerchant[];
  merchants: MerchantCompare[];
  apiJson: string;
}

export const scenarios: Record<Scenario, ScenarioData> = {
  beauty: {
    label: "Beauty",
    product: "Rare Beauty Soft Pinch Blush",
    color: "hsl(350, 80%, 60%)",
    merchantDomains: ["sephora.com", "ulta.com", "target.com"],
    query: "What's the best rated blush right now? I want the best deal.",
    memberships: [
      { domain: "sephora.com", name: "Sephora Rouge", detail: "Active" },
      { domain: "americanexpress.com", name: "Amex Gold", detail: "$5 on $20+" },
    ],
    reasoning: [
      { phase: 1, text: "→ Enriching query: best rated blush, best deal" },
      { phase: 1, text: "→ Fetching product specs from 12 merchant feeds — normalizing across 24 attributes" },
      { phase: 1, text: "→ Scoring shortlist: Rare Beauty Soft Pinch #1 (0.91) · NARS Orgasm #2 (0.86) · Clinique Cheek Pop #3 (0.82) · Tower 28 BeachPlease #4 (0.78)" },
      { phase: 2, text: "◈ Category intelligence: Blush (cream/liquid vs powder)" },
      { phase: 2, text: "◈ Key specs: finish type, longevity (hrs), shade range, skin-type compatibility" },
      { phase: 2, text: "◈ Review digest: Rare Beauty strong on blendability + longevity, mixed on shade matching for deep tones" },
      { phase: 2, text: '◈ Intent-to-spec: "best deal" + "best rated" → optimize for value-adjusted quality score' },
      { phase: 3, text: "◈ Parleo intercepting — loading loyalty balances for Sarah Chen" },
      { phase: 3, text: "◈ Sephora Rouge: active tier → −10% on all makeup" },
      { phase: 3, text: "◈ Amex Gold card offer: −$5 on Sephora $20+ · expires 4 days" },
      { phase: 3, text: "◈ Beauty Insider: 4x points this week on blush ($4.60 value)" },
      { phase: 3, text: "◈ Recalculating: Rare Beauty $23 → $16.40 at Sephora · $23 at Ulta · $23 at Target" },
      { phase: 3, text: "✓ Rank confirmed: Rare Beauty #1. Sephora is best-value destination (29% below list)." },
    ],
    resultsWithParleo: [
      { rank: 1, name: "Rare Beauty Soft Pinch", specs: "Cream blush · 12 shades · 8hr wear", listPrice: 23, truePrice: 16.40, savings: 29, deals: ["Rouge −10%", "$5 Amex", "4x pts"], bestDeal: true },
      { rank: 2, name: "NARS Orgasm", specs: "Powder blush · Shimmer finish", listPrice: 38 },
      { rank: 3, name: "Clinique Cheek Pop", specs: "Powder blush · Buildable", listPrice: 27 },
      { rank: 4, name: "Tower 28 BeachPlease", specs: "Cream blush · Clean beauty", listPrice: 20 },
    ],
    resultsWithout: [
      { rank: 1, name: "Rare Beauty Soft Pinch", specs: "Cream blush · 12 shades · 8hr wear", listPrice: 23 },
      { rank: 2, name: "NARS Orgasm", specs: "Powder blush · Shimmer finish", listPrice: 38 },
      { rank: 3, name: "Clinique Cheek Pop", specs: "Powder blush · Buildable", listPrice: 27 },
      { rank: 4, name: "Tower 28 BeachPlease", specs: "Cream blush · Clean beauty", listPrice: 20 },
    ],
    sandbox: { listPrice: 23, loyaltyFull: 2.30, loyaltyLabel: "Rouge −10%", cardFull: 5.00, cardLabel: "Amex offer", pointsFull: 4.60, pointsLabel: "4x Beauty Insider" },
    sandboxMerchants: [
      { name: "Sephora", listPrice: 23.00, topLoyalty: 6.90, loyaltyLabel: "Rouge 10% + 4x Beauty Insider", cardDiscounts: { 'no-card': 0, visa: 0.23, amex: 5.00, store: 1.15 }, cardLabels: { visa: '1% Visa cashback', amex: 'Amex Sephora offer −$5', store: 'Sephora Visa 5%' } },
      { name: "Ulta", listPrice: 23.00, topLoyalty: 3.45, loyaltyLabel: "Diamond 5% + Ultamate points", cardDiscounts: { 'no-card': 0, visa: 0.23, amex: 0, store: 4.60 }, cardLabels: { visa: '1% Visa cashback', amex: 'No Amex offer', store: 'Ulta Mastercard 20%' } },
      { name: "Target", listPrice: 22.00, topLoyalty: 1.10, loyaltyLabel: "Circle 5%", cardDiscounts: { 'no-card': 0, visa: 0.22, amex: 2.00, store: 3.30 }, cardLabels: { visa: '1% Visa cashback', amex: 'General Amex offer −$2', store: 'RedCard 15%' } },
    ],
    merchants: [
      { name: "Sephora", domain: "sephora.com", headlinePrice: 23, trueCost: 16.40, note: "Best with Rouge + Amex" },
      { name: "Ulta", domain: "ulta.com", headlinePrice: 23, trueCost: 23 },
      { name: "Target", domain: "target.com", headlinePrice: 22, trueCost: 22 },
    ],
    apiJson: `{
  "product": "Rare Beauty Soft Pinch Liquid Blush",
  "best_merchant": "Sephora",
  "list_price": 23.00,
  "true_cost": 16.40,
  "total_savings": 6.60,
  "savings_pct": 28.7,
  "rank_without_deals": 1,
  "rank_with_deals": 1,
  "deal_stack": [
    { "type": "loyalty", "label": "Rouge −10%", "value": -2.30, "expires_days": null },
    { "type": "card", "label": "Amex Gold $5 off", "value": -5.00, "expires_days": 4 },
    { "type": "points", "label": "4x Beauty Insider", "value": -4.60, "expires_days": null }
  ],
  "category_intelligence": {
    "type": "cream_blush",
    "decisive_specs": ["finish_type", "longevity_hrs", "shade_range"],
    "review_signal": "strong_positive",
    "confidence": 0.91
  },
  "pii": false,
  "response_ms": 47,
  "tokens_used": 1847
}`,
  },
  outdoor: {
    label: "Outdoor",
    product: "Nike Wildhorse 8",
    color: "hsl(152, 69%, 40%)",
    merchantDomains: ["nike.com", "rei.com", "backcountry.com"],
    query: "Find me the best trail running shoe under $160. Cushioning and grip are priorities.",
    memberships: [
      { domain: "nike.com", name: "Nike Member", detail: "2,400 pts → $24" },
      { domain: "rei.com", name: "REI Co-op", detail: "$18.50 dividend" },
      { domain: "americanexpress.com", name: "Amex Platinum", detail: "$15 back on $75+" },
    ],
    reasoning: [
      { phase: 1, text: "→ Enriching query: trail running shoe under $160, cushioning + grip" },
      { phase: 1, text: "→ Inferring constraints: road-to-trail transition, heel striker, half-marathon training" },
      { phase: 1, text: "→ Fetching product specs from 14 merchant feeds — normalizing across 38 attributes" },
      { phase: 1, text: "→ Scoring shortlist: Salomon Speedcross 6 #1 (0.87) · Hoka Speedgoat 5 #2 (0.84) · Nike Wildhorse 8 #3 (0.79) · Brooks Cascadia 17 #4 (0.76)" },
      { phase: 2, text: "◈ Category intelligence: Trail Running Shoes" },
      { phase: 2, text: "◈ Key specs: outsole lug depth, stack height, heel drop, weight, rock plate" },
      { phase: 2, text: "◈ Review digest: Salomon strong on grip, narrow fit flagged. Nike strong on versatility" },
      { phase: 2, text: "◈ Intent-to-spec: cushioning + grip + $160 budget → lug ≥4mm, stack ≥28mm" },
      { phase: 3, text: "◈ Parleo intercepting — loading loyalty balances for Sarah Chen" },
      { phase: 3, text: "◈ Nike Member: WILDHORSE20 active → −$26.00 · 2,400 pts redeemable → −$24.00" },
      { phase: 3, text: "◈ Amex Platinum: $15 back on Nike $75+ · expires 6 days" },
      { phase: 3, text: "◈ REI Co-op dividend: $18.50 applicable to Hoka Speedgoat 5" },
      { phase: 3, text: "◈ Recalculating: Nike $130 → $76.00 effective · Hoka $155 → $136.50" },
      { phase: 3, text: "✓ Rank change: Nike Wildhorse 8 moves #3 → #1 on true cost (41% below list)" },
    ],
    resultsWithParleo: [
      { rank: 1, name: "Nike Wildhorse 8", specs: "Trail · 4mm lug · 30mm stack · 8mm drop", listPrice: 130, truePrice: 76, savings: 41, deals: ["20% code", "$24 pts", "$15 Amex"], bestDeal: true, rankChange: "↑was #3" },
      { rank: 2, name: "Hoka Speedgoat 5", specs: "Trail · Vibram outsole · 33mm stack", listPrice: 155, truePrice: 136.50, deals: ["$18.50 REI dividend"] },
      { rank: 3, name: "Salomon Speedcross 6", specs: "Trail · Contagrip · 6mm lug", listPrice: 139, rankChange: "↓was #1" },
      { rank: 4, name: "Brooks Cascadia 17", specs: "Trail · BioMoGo DNA · 8mm drop", listPrice: 140 },
    ],
    resultsWithout: [
      { rank: 1, name: "Salomon Speedcross 6", specs: "Trail · Contagrip · 6mm lug", listPrice: 139 },
      { rank: 2, name: "Hoka Speedgoat 5", specs: "Trail · Vibram outsole · 33mm stack", listPrice: 155 },
      { rank: 3, name: "Nike Wildhorse 8", specs: "Trail · 4mm lug · 30mm stack · 8mm drop", listPrice: 130 },
      { rank: 4, name: "Brooks Cascadia 17", specs: "Trail · BioMoGo DNA · 8mm drop", listPrice: 140 },
    ],
    sandbox: { listPrice: 130, loyaltyFull: 26, loyaltyLabel: "WILDHORSE20 −20%", cardFull: 15, cardLabel: "Amex Platinum $15", pointsFull: 24, pointsLabel: "Nike pts → $24" },
    sandboxMerchants: [
      { name: "Nike", listPrice: 130.00, topLoyalty: 30.00, loyaltyLabel: "Member code $20 + 2,400 pts $10", cardDiscounts: { 'no-card': 0, visa: 1.30, amex: 15.00, store: 3.90 }, cardLabels: { visa: '1% Visa cashback', amex: 'Amex Nike offer −$15', store: 'Nike card 3%' } },
      { name: "REI", listPrice: 134.00, topLoyalty: 12.00, loyaltyLabel: "Co-op member $8 + dividend $4", cardDiscounts: { 'no-card': 0, visa: 1.34, amex: 5.00, store: 26.80 }, cardLabels: { visa: '1% Visa cashback', amex: 'Amex REI offer −$5', store: 'REI Mastercard 20%' } },
      { name: "Backcountry", listPrice: 119.00, topLoyalty: 6.00, loyaltyLabel: "Loyalty credit $6", cardDiscounts: { 'no-card': 0, visa: 1.19, amex: 0, store: 5.95 }, cardLabels: { visa: '1% Visa cashback', amex: 'No Amex offer', store: 'BC card 5%' } },
    ],
    merchants: [
      { name: "Nike", domain: "nike.com", headlinePrice: 130, trueCost: 76, note: "Best with Member + Amex" },
      { name: "REI", domain: "rei.com", headlinePrice: 134, trueCost: 134 },
      { name: "Backcountry", domain: "backcountry.com", headlinePrice: 119, trueCost: 119 },
    ],
    apiJson: `{
  "product": "Nike Wildhorse 8",
  "best_merchant": "Nike.com",
  "list_price": 130.00,
  "true_cost": 76.00,
  "total_savings": 54.00,
  "savings_pct": 41.5,
  "rank_without_deals": 3,
  "rank_with_deals": 1,
  "deal_stack": [
    { "type": "promo", "label": "WILDHORSE20", "value": -26.00, "expires_days": null },
    { "type": "points", "label": "Nike Member pts", "value": -24.00, "expires_days": null },
    { "type": "card", "label": "Amex Platinum $15", "value": -15.00, "expires_days": 6 }
  ],
  "category_intelligence": {
    "type": "trail_running",
    "decisive_specs": ["lug_depth_mm", "stack_height_mm", "weight_g"],
    "review_signal": "positive",
    "confidence": 0.79
  },
  "pii": false,
  "response_ms": 42,
  "tokens_used": 2103
}`,
  },
  electronics: {
    label: "Electronics",
    product: "Sony WF-1000XM5",
    color: "hsl(215, 20%, 50%)",
    merchantDomains: ["bestbuy.com", "amazon.com", "sony.com"],
    query: "Best noise-cancelling earbuds under $300? Sound quality and call clarity matter most.",
    memberships: [
      { domain: "bestbuy.com", name: "Best Buy Totaltech", detail: "Active member" },
      { domain: "chase.com", name: "Chase Sapphire", detail: "3x on electronics" },
    ],
    reasoning: [
      { phase: 1, text: "→ Enriching query: noise-cancelling earbuds under $300, sound quality + call clarity" },
      { phase: 1, text: "→ Fetching product specs from 11 merchant feeds — normalizing across 42 attributes" },
      { phase: 1, text: "→ Scoring shortlist: Sony WF-1000XM5 #1 (0.92) · Bose QC Ultra #2 (0.88) · AirPods Pro 2 #3 (0.85) · Sennheiser MTW4 #4 (0.81)" },
      { phase: 2, text: "◈ Category intelligence: True Wireless Earbuds (ANC)" },
      { phase: 2, text: "◈ Key specs: driver size, ANC depth, codec support, call mic rating, battery life" },
      { phase: 2, text: "◈ Review digest: Sony dominant on sound quality + battery. Bose stronger on ANC comfort" },
      { phase: 2, text: "◈ Intent-to-spec: sound + call clarity → driver ≥8.4mm, call mic ≥4/5, ANC ≥35dB" },
      { phase: 3, text: "◈ Parleo intercepting — loading loyalty balances for Sarah Chen" },
      { phase: 3, text: "◈ Best Buy Totaltech: −$30 exclusive member price on Sony" },
      { phase: 3, text: "◈ Chase Sapphire: 5% back on electronics → −$13.49" },
      { phase: 3, text: "◈ Amazon Prime: free same-day (no price discount on this SKU)" },
      { phase: 3, text: "◈ Recalculating: Sony $279.99 → $226.50 at Best Buy · $269.99 at Amazon" },
      { phase: 3, text: "✓ Best Buy wins on net effective cost (19% below list)" },
    ],
    resultsWithParleo: [
      { rank: 1, name: "Sony WF-1000XM5", specs: "ANC · 8.4mm driver · LDAC · 24hr battery", listPrice: 279.99, truePrice: 226.50, savings: 19, deals: ["Totaltech −$30", "Chase 5%"], bestDeal: true },
      { rank: 2, name: "Bose QC Ultra Earbuds", specs: "ANC · Immersive Audio · 6hr battery", listPrice: 299 },
      { rank: 3, name: "Apple AirPods Pro 2", specs: "ANC · H2 chip · Spatial Audio", listPrice: 249 },
      { rank: 4, name: "Sennheiser Momentum TW4", specs: "ANC · 7mm driver · aptX Adaptive", listPrice: 299.99 },
    ],
    resultsWithout: [
      { rank: 1, name: "Sony WF-1000XM5", specs: "ANC · 8.4mm driver · LDAC · 24hr battery", listPrice: 279.99 },
      { rank: 2, name: "Bose QC Ultra Earbuds", specs: "ANC · Immersive Audio · 6hr battery", listPrice: 299 },
      { rank: 3, name: "Apple AirPods Pro 2", specs: "ANC · H2 chip · Spatial Audio", listPrice: 249 },
      { rank: 4, name: "Sennheiser Momentum TW4", specs: "ANC · 7mm driver · aptX Adaptive", listPrice: 299.99 },
    ],
    sandbox: { listPrice: 279.99, loyaltyFull: 30, loyaltyLabel: "Totaltech −$30", cardFull: 13.49, cardLabel: "Chase 5%", pointsFull: 0, pointsLabel: "No points" },
    sandboxMerchants: [
      { name: "Best Buy", listPrice: 279.99, topLoyalty: 30.00, loyaltyLabel: "Totaltech member price −$30", cardDiscounts: { 'no-card': 0, visa: 2.80, amex: 14.00, store: 14.00 }, cardLabels: { visa: '1% Visa cashback', amex: 'Chase/Amex 5%', store: 'BB card 5%' } },
      { name: "Amazon", listPrice: 269.99, topLoyalty: 0, loyaltyLabel: "Prime (shipping only)", cardDiscounts: { 'no-card': 0, visa: 2.70, amex: 8.10, store: 13.50 }, cardLabels: { visa: '1% Visa cashback', amex: '3% cashback', store: 'Amazon card 5%' } },
      { name: "Sony Direct", listPrice: 279.99, topLoyalty: 20.00, loyaltyLabel: "Sony member discount −$20", cardDiscounts: { 'no-card': 0, visa: 2.80, amex: 5.00, store: 28.00 }, cardLabels: { visa: '1% Visa cashback', amex: 'General Amex offer −$5', store: 'Sony card 10%' } },
    ],
    merchants: [
      { name: "Best Buy", domain: "bestbuy.com", headlinePrice: 279.99, trueCost: 226.50, note: "Best with Totaltech + Chase" },
      { name: "Amazon", domain: "amazon.com", headlinePrice: 269.99, trueCost: 269.99 },
      { name: "Sony Direct", domain: "sony.com", headlinePrice: 279.99, trueCost: 279.99 },
    ],
    apiJson: `{
  "product": "Sony WF-1000XM5",
  "best_merchant": "Best Buy",
  "list_price": 279.99,
  "true_cost": 226.50,
  "total_savings": 53.49,
  "savings_pct": 19.1,
  "rank_without_deals": 1,
  "rank_with_deals": 1,
  "deal_stack": [
    { "type": "loyalty", "label": "Totaltech −$30", "value": -30.00, "expires_days": null },
    { "type": "card", "label": "Chase Sapphire 5%", "value": -13.49, "expires_days": null }
  ],
  "category_intelligence": {
    "type": "true_wireless_anc",
    "decisive_specs": ["driver_size_mm", "anc_depth_db", "call_mic_rating"],
    "review_signal": "strong_positive",
    "confidence": 0.92
  },
  "pii": false,
  "response_ms": 38,
  "tokens_used": 1952
}`,
  },
};

export const merchantLogoDomains = [
  "sephora.com", "nike.com", "rei.com", "backcountry.com", "bestbuy.com",
  "amazon.com", "target.com", "ulta.com", "nordstrom.com", "macys.com",
  "lululemon.com", "apple.com", "sony.com", "dyson.com", "patagonia.com",
  "adidas.com", "homedepot.com",
];

export const cardPartnerDomains = [
  { domain: "americanexpress.com", name: "Amex" },
  { domain: "visa.com", name: "Visa" },
  { domain: "chase.com", name: "Chase" },
];

export const codeSnippets = {
  js: `import Parleo from '@parleo/sdk';

const parleo = new Parleo({ apiKey: process.env.PARLEO_KEY });

const result = await parleo.enrich({
  query: "best noise-cancelling earbuds under $300",
  user_context: {
    loyalty: ["bestbuy_totaltech", "amazon_prime"],
    cards: ["chase_sapphire"]
  }
});

console.log(result.best_deal);
// → { product: "Sony WF-1000XM5", true_cost: 226.50 }`,
  python: `from parleo import Parleo

client = Parleo(api_key=os.environ["PARLEO_KEY"])

result = client.enrich(
    query="best noise-cancelling earbuds under $300",
    user_context={
        "loyalty": ["bestbuy_totaltech", "amazon_prime"],
        "cards": ["chase_sapphire"]
    }
)

print(result.best_deal)
# → { "product": "Sony WF-1000XM5", "true_cost": 226.50 }`,
};
