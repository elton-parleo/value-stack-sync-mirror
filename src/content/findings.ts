/**
 * Findings from Parleo's Agentic Value Audits, Sep 28 to Oct 21, 2026.
 * Every figure here is lifted from the shipped report named in `source`.
 * Nothing is rounded or modeled unless the label says so.
 */
export type Finding = {
  id: string;
  company: string;
  logo: string;
  door: "brand" | "retailer";
  date: string;
  headline: string;
  body: string;
  /** The agent's own words or the exact comparison, for the card artifact. */
  artifact:
    | { kind: "prices"; label: string; rows: { who: string; logo?: string; price: string; note?: string; tone?: "win" | "miss" | "plain" }[] }
    | { kind: "count"; big: string; of: string; label: string; sub?: string }
    | { kind: "quote"; agent: string; q: string; a: string; mark?: string; truth: string };
  source: string;
  /** The ledger row: the one number, what it counts, the agent's words, the page's value. */
  ledger: { big: string; of: string; agent?: string; said: string; page: string; status: "Wrong" | "Invisible" | "Partial" };
};

export const findings: Finding[] = [
  {
    id: "petco-price",
    company: "Petco",
    logo: "Petco",
    door: "retailer",
    date: "Sep 28, 2026",
    headline: "ChatGPT told a shopper Chewy was cheaper. Petco was $9.49 cheaper.",
    body: "Purina Pro Plan Adult 7+, 34 lb, first Autoship order. The Purina-funded offer sits on Petco's page. ChatGPT never saw it, applied Petco's standard 35% and picked Chewy, three times over two days.",
    artifact: {
      kind: "prices",
      label: "First Autoship, as the retailer pages say",
      rows: [
        { who: "Petco", logo: "Petco", price: "$47.99", note: "cheapest of the three", tone: "win" },
        { who: "Chewy", logo: "Chewy", price: "$57.48", tone: "plain" },
        { who: "ChatGPT quoted Petco at", price: "$57.99", note: "and called Chewy $0.51 cheaper", tone: "miss" },
      ],
    },
    ledger: { big: "$9.49", of: "cheaper at Petco than Chewy, on the page", agent: "ChatGPT", said: "Chewy is $0.51 cheaper, so I'd order there.", page: "petco.com, first Autoship order: $47.99. Chewy: $57.48.", status: "Invisible" },
    source: "Petco Agentic Value Audit, 24 queries, 43 Autoship variants read",
  },
  {
    id: "adidas-member",
    company: "adidas",
    logo: "adidas",
    door: "retailer",
    date: "Sep 29, 2026",
    headline: "Agents price a Samba at $104.99. A new adiClub member pays $85.",
    body: "Every adidas product page shows adiClub's free shipping, points and 15% welcome offer. The structured data agents read leaves all of it out, so they add $4.99 shipping and skip the discount.",
    artifact: {
      kind: "prices",
      label: "Samba OG, one product page",
      rows: [
        { who: "What agents read", price: "$104.99", note: "list plus shipping", tone: "miss" },
        { who: "adiClub member", price: "$100.00", tone: "plain" },
        { who: "New member, first order", price: "$85.00", note: "the price that wins", tone: "win" },
      ],
    },
    ledger: { big: "$85", of: "a new member's price, against $104.99 quoted", said: "Agents price the Samba at $104.99, list plus $4.99 shipping, no adiClub offer.", page: "adidas.com: 15% welcome offer and free shipping on every product page. $85.00.", status: "Invisible" },
    source: "adidas Agentic Value Audit, 5 purchase answers, 28 access checks",
  },
  {
    id: "pampers-pure",
    company: "Pampers",
    logo: "Pampers",
    door: "brand",
    date: "Sep 29, 2026",
    headline: "The safest-diaper question went to a line P&G retired. The one built to answer it came up once in 30.",
    body: "ChatGPT's first card was Pampers Pure at $29.97, a diaper pampers.com no longer lists. Its page now points to AMORE, the first new Pampers diaper since 2018. Agents read the catalog from a dozen retailer copies and never the record.",
    artifact: {
      kind: "quote",
      agent: "ChatGPT",
      q: "What's the safest diaper for a newborn?",
      a: "For a newborn, I'd start with Pampers Pure Protection, $29.97 at Walmart, hypoallergenic and free of fragrance.",
      mark: "Pampers Pure Protection",
      truth: "pampers.com: Pure retired, page redirects to AMORE. AMORE named in 1 of 30 answers.",
    },
    ledger: { big: "1 of 30", of: "answers named the diaper built for the question", agent: "ChatGPT", said: "For a newborn, I'd start with Pampers Pure Protection, $29.97 at Walmart, hypoallergenic and free of fragrance.", page: "pampers.com: Pure retired, the page redirects to AMORE.", status: "Wrong" },
    source: "Pampers Agentic Value Audit, 30 answers across ChatGPT, Gemini and AI Mode, 202 offers checked",
  },
  {
    id: "ulta-points",
    company: "Ulta Beauty",
    logo: "Ulta",
    door: "retailer",
    date: "Oct 21, 2026",
    headline: "Ulta or the brand? Agents cited the brand's offer with a number in 15 of 22 answers. They priced Ulta's points in none.",
    body: "The brand's offer arrives as a number and Ulta's as an adjective. A Platinum member's 46 points are worth about $2.88 and ulta.com's $35.15 is Replenish & Save. The agent saw neither, and Ulta says 95% of its sales come from members.",
    artifact: { kind: "count", big: "0", of: "of 22", label: "answers that priced Ulta's points against the brand's own offer", sub: "857 answers checked against ulta.com the same day" },
    ledger: { big: "0 of 22", of: "answers priced Ulta's points against the brand's offer", said: "Agents cited the brand's own offer with a number in 15 of 22 answers. Ulta's points arrived as an adjective.", page: "ulta.com: a Platinum member's 46 points are worth about $2.88, and $35.15 is Replenish & Save.", status: "Invisible" },
    source: "Ulta Beauty Agentic Value Audit, 78 questions, five agents",
  },
  {
    id: "nordstrom-tie",
    company: "Nordstrom",
    logo: "Nordstrom",
    door: "retailer",
    date: "Oct 21, 2026",
    headline: "Told an item costs the same everywhere, agents pick Nordstrom in 47 of 73 answers. Left to work it out, 1 of 17.",
    body: "Nordstrom sells national brands at the brand's price, so the store decides the sale. Returns, points, pickup and alterations reach the answer only when the shopper brings them up. The 10x points week reached 5 of 73 tie answers.",
    artifact: { kind: "count", big: "1", of: "of 17", label: "parity answers that picked Nordstrom unprompted", sub: "47 of 73 once the shopper said the price was the same" },
    ledger: { big: "1 of 17", of: "same-price answers picked Nordstrom unprompted", said: "Told the item costs the same everywhere, agents picked Nordstrom in 47 of 73 answers. Left to work it out, 1 of 17.", page: "nordstrom.com: returns, points, pickup, alterations, and a 10x points week that reached 5 of 73 answers.", status: "Partial" },
    source: "Nordstrom Agentic Value Audit, 79 questions, five agents",
  },
  {
    id: "gap-sale",
    company: "Gap Inc.",
    logo: "Gap",
    door: "retailer",
    date: "Oct 21, 2026",
    headline: "Agents name Gap in 172 of 180 shopping answers. Asked if Gap's brands are worth it, 26 of 32 say buy on sale.",
    body: "Gap's plan is higher AURs through lower discounting and storytelling. Agents know Gap and don't know why to buy it today, so they point to the next sale. Tell the agent you're an Encore member and Gap wins 55 of 55 head-to-heads. Unprompted, Encore surfaces in 3 of 538.",
    artifact: {
      kind: "quote",
      agent: "Copilot",
      q: "Are Gap '90s Loose Jeans worth it?",
      a: "Frequent large discounts may reflect the true intended price point, so wait for a sale.",
      mark: "wait for a sale",
      truth: "Gap Q2 call: the plan is higher AURs, better sell-through, lower discounting.",
    },
    ledger: { big: "26 of 32", of: "worth-it answers said buy on sale", agent: "Copilot", said: "Frequent large discounts may reflect the true intended price point, so wait for a sale.", page: "Gap's Q2 call: higher average unit retail, lower discounting. Encore surfaced unprompted in 3 of 538 answers.", status: "Partial" },
    source: "Gap Inc. Agentic Value Audit, 80 questions, 876 answers, five agents",
  },
  {
    id: "kc-coupon",
    company: "Kimberly-Clark",
    logo: "Kimberly-Clark",
    door: "brand",
    date: "Sep 29, 2026",
    headline: "ChatGPT said no Cottonelle coupon applied. Cottonelle.com has one that does.",
    body: "Cottonelle vs Charmin, 24 Mega Rolls. ChatGPT got the Walmart price right at $19.98, listed three Charmin coupons, and said Cottonelle's needed a 36-roll pack. Its coupon sources were grocery chain pages, never the brand's own.",
    artifact: {
      kind: "prices",
      label: "Cottonelle 24 Mega Rolls at Walmart",
      rows: [
        { who: "Walmart shelf", logo: "Walmart", price: "$19.98", tone: "plain" },
        { who: "Charmin coupons ChatGPT listed", price: "3", tone: "miss" },
        { who: "After the Cottonelle coupon it missed", price: "$18.98", note: "$1 off any 12-roll pack or more", tone: "win" },
      ],
    },
    ledger: { big: "$1 off", of: "the Cottonelle coupon ChatGPT said didn't apply", agent: "ChatGPT", said: "ChatGPT listed three Charmin coupons and said Cottonelle's needed a 36-roll pack.", page: "cottonelle.com: $1 off any 12-roll pack or more. $19.98 at Walmart becomes $18.98.", status: "Wrong" },
    source: "Kimberly-Clark Agentic Value Audit, 6 shopper questions, 3 brand sites",
  },
];

export const byId = (id: string) => findings.find((f) => f.id === id)!;
