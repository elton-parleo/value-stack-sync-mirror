## Who Parleo is
Parleo is the agentic commerce platform for brands and retailers. Every project in this workspace is for Parleo.

Commerce was built for the human eye and is being rebuilt for AI agents. Shoppers now ask an assistant (ChatGPT, Gemini, Google AI Mode, Perplexity, Copilot) what to buy and get one answer, usually with one store in it. That answer is built from whatever the assistant can read. The member price, the coupon a brand funded, free returns and the reasons a product is worth choosing mostly never reach it, so the store that looks cheapest on list price wins even when another store is the better buy.

Parleo puts a company's real value into every answer, verifies it, and measures it in dollars. It publishes a brand's or retailer's catalog, prices, promotions and member value to every surface agents read, re-asks the same questions every week, and shows what changed in revenue.

Founded late 2025 out of Antler in San Francisco. Pre-seed, backed by Antler, Wedbush Ventures, Corazon Capital and Long Way Ventures. Founding team: Samar Birwadker (co-founder and CEO, commercial strategy), Elton Cheung (co-founder, protocol architecture), Josh Krammes (go-to-market).

## Who we sell to
CMOs, VPs of ecommerce, heads of pricing, loyalty and retail media at consumer brands and retailers: beauty, apparel, footwear, consumer electronics, home, pet, and CPG. Design and write for these executives first and engineers second. They judge a page in seconds, so lead with the point and show real products.

## The product (use these names exactly)
- Measure: Share of Algorithm, a 100-point score of how AI agents treat a brand. Three pillars: Visibility 32 points (do agents recommend you), Accessibility 18 (can they read your site), True Value 50 (do they get your real price and offer right). True Value is the pillar visibility tools don't measure.
- TrueSync: one checked record of every product (price, offers, member value, terms), approved by the customer's team and published everywhere agents read: site markup, merchant feeds, the OpenAI product feed, Google's UCP, MCP and others. Then read back weekly.
- Value: member prices, points and brand-funded offers placed in the answer.
- Fix: every wrong or missing answer becomes a fix with an owner and a dollar value, ranked by what it wins back, approved before anything ships.
- Prove: a weekly readout in dollars.
- Free entry offer: the Agentic Value Report. A study of what five assistants tell shoppers about a company's top products, each answer checked against its own pages, scored and priced. The study and report are free. A paid engagement is discussed only afterwards.
- Share of Algorithm is the fourth measurement era after Share of Shelf, Share of Voice and Share of Search.

## Point of view (use it, don't overstate it)
- The best offer should win the answer.
- Neutral by design: every protocol standardizes discovery, identity, payment or trust. None standardizes what a price means to a specific shopper. Parleo works with every rail and competes with none.
- Mentioned is not chosen. Being named is where most measurement stops. Parleo follows the answer to the pick.
- Private by default: merchant offers are published as rules the agent resolves against what the shopper already shared. No personal data leaves the assistant.

## The parleo.io codebase
The parleo.io project has an AGENTS.md at the repo root. For that project it overrides anything here. Read it before every change. It is built with plain CSS (versioned files src/site/v3.css to v8.css), not Tailwind or shadcn. Do not convert it, do not add a UI kit, do not restyle globally. Keep every integration it lists (OpenAI pixel, lemlist, PostHog, Formspree, the /audit and /reports proxies, the customer deck, the MCP server, the mirror workflow). Make small, targeted edits. Never force-push or rewrite history.

New standalone projects (decks, microsites, tools) may use Lovable's default stack, but must follow the design and copy rules below.

## Design
- Palette: canvas #F2F0EF (warm off-white), white surfaces, ink #15161F, one accent #0166FF. Dark sections in deep navy (#0B0E1A to #11141F) with a thin blue top rule. Status colors (red #F0705F, amber, green) only inside data and chips.
- Type: Inter Tight for everything. JetBrains Mono only for machine text: small uppercase labels, sources, code, record fields. No serif. Strong size jumps between headline, sub-head and body.
- Headline pattern: an ink lead sentence plus a grey continuation, ending in a small blue square instead of a period.
- Product UI is drawn at console grade, never as a wireframe: a navy statement module with one focal number, a short finding and "why it matters", beside a white data panel with tinted verdict rows, left accent bars, real brand logos and AI assistant icons. One focal number per card. Vary text sizes so the eye knows where to land. Numbers get a designed treatment (big figure, "of N", a segmented meter).
- Photography: art-directed stills of real products on warm or dark stone, editorial crops, paper price tags on blue thread, the electric blue picked up in tags, scan brackets or hairlines. Real brands, real products, real logos. Never stock photos, placeholder boxes, stock icons (lightbulbs, rockets, shields, handshakes, magnifying glasses, robots), blob people, 3D renders, mesh gradients or default AI imagery.
- Layout: content floats inside the page with generous margins, never edge to edge. 64 to 80px between sections. Cards 16 to 24px radius with soft layered shadows.
- Motion: quiet and purposeful. Things rise in once as they arrive, meters fill, a line draws. Motion explains a change of state or it doesn't ship. Respect reduced motion for decorative effects.
- Mobile: every screen must look finished at 390px wide. Never hide on mobile an image that desktop shows unless a phone version replaces it.
- A subtle translucent blue-tinted glass nav is fine. Avoid heavy glassmorphism and glows elsewhere.

## Copy
- Plain, specific, confident. Written for a senior commerce executive by someone who has been in the room with these brands. Lead with the point. Short sentences, contractions welcome.
- Never use em dashes or en dashes. No semicolons in prose. Write ranges as "15 to 25%".
- Banned words: unlock, elevate, empower, leverage (as a verb), seamless, game-changer, transformative, revolutionary, synergy, paradigm, holistic, delve, tapestry, testament, beacon, realm, foster, embark, pivotal, journey and landscape (as metaphors), "sticker price" (say list price), vibes.
- No "not X, but Y" templates, no riddle openers, no restating the point at the end.
- Use standard labels: FAQ, Key findings, Pricing, About, Careers. No invented section names.
- Every number traces to a source or is labeled modeled. Never invent a statistic, a quote, a customer, a logo wall or an answer an assistant gave. If a fact isn't in the repo or the brief, ask.
- Never describe Sephora (or any prospect) as a partner or customer. Public examples are "research", never "clients".
- Source lines are a handful of words. No dates that make a page look stale.

## Retired, do not use
"Sub-50ms responses", "~60% token reduction", "One API", "Zero PII" as a headline claim, parleo.io/demo as a live demo, "Be seen by agents", "Everyone syndicates. Nobody reads back.", oat milk or cheap grocery items as examples.

## How to work
- Small, reviewable changes. Never remove something already approved on a page unless asked.
- Don't add features or sections nobody asked for. Ask when a request is ambiguous.
- After a change, check the page at desktop and 390px wide before saying it's done.
