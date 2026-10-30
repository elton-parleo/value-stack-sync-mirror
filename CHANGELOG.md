# parleo.io changelog

Newest first. Each entry is one git commit you can revert to.

## v8.3 · Oct 30, 2026 · PR #1 on unlikelylemon/value-stack-sync

- About rebuilt around the vision: a dark hero over the deck cover still ("Commerce was built for the human eye. It's being rebuilt for agents."), the four measurement eras with Share of Algorithm as the fourth, four beliefs drawn as product moments (the best offer should win, neutral by design, mentioned is not chosen, private by default).
- Founder bios restored word for word from the previous site. Good&Co and Landor added to Samar. Josh added with IBM, Equinix, StackPath and SoftLayer. Cascade Seed Fund shown as Long Way Ventures. Backers on a dark band with their cities.
- `/reports/*` on parleo.io now serves the audit reports from parleo-reports.vercel.app, noindex.
- Lovable workspace instructions replaced with the v2 text in `docs/lovable/workspace-instructions.md`.
- Shipped as PR #1. The previous site is tagged `archive/site-v1-20261030`.

## v8.2 · Oct 30, 2026 · branch v8 · launch prep

- No page two: the screen overlay is drawn slightly larger than the glass and clipped by a mask cut from the still itself, so it sits flush on every edge. The real notch shows through.
- Nav: the translucent blue glass from the live parleo.io nav, at rest and on scroll.
- New About page: why Parleo exists, founding team (Samar, Elton, Josh), backed by (Antler, Wedbush Ventures, Corazon Capital, Cascade Seed Fund), careers form on Formspree. Linked from Resources and the footer. In the sitemap.
- QA: 19 routes at 1440 and 390, no console errors, no broken images, no horizontal overflow. Logo marks no longer collapse on phones. Dashes removed from two insights. One canonical per page.
- Speed: fonts subset to WOFF2 (Inter Tight 582KB to 62KB), stale hero preload removed.
- Launch parity with the current Lovable build: Parleo MCP server and Supabase function, lovable-tagger, dev server on 8080, prerendered title, description, canonical and OG tags for every route, PostHog key under Lovable's variable name, UTMs captured and sent with every form.
- AGENTS.md for Lovable and Claude, and a proposed rewrite of the Lovable workspace instructions (not applied).

## v8.1 · Oct 30, 2026 · branch v8

From Samar's three comments on v8. Same artifact, version 2.
- Announcement bar retired (one flag in Nav brings it back).
- Hero: tags sit as paper in the still and turn blue only for the product in focus. Only the picked product keeps its brackets and name. The card leads with the verified page line, the question and the wrong answer step back, "Parleo research" caption removed. Autoplay cycles every 3.6s and no longer stalls on hover or a reduced-motion setting; a click pauses it for 12s.
- No page two: the still sits inside the page with rounded corners instead of running edge to edge.

## v8 · Oct 30, 2026 · branch v8

Iterated on v7 (commit 3708b41), not rebuilt. Every change maps to one of Samar's 30 comments on the v7 artifact, plus his note on too many adidas shoes. No red-team round. Revert any piece by its commit on branch v8.

**Site-wide**
- Console-grade product UI: navy statement module (blue top rule, one focal number, why it matters) beside a white data panel with tinted verdict rows and left accent bars. Applied to Measure, TrueSync, Value, Fix, Brand, Prove and the report page.
- One designed number treatment (Stat): figure, "of N", a segmented meter that fills on view.
- Tighter section rhythm (80px, 64 and 52 at breakpoints) and a quiet rise-in on section heads and marked blocks.
- Electric blue on the stills: scan brackets with a label on the product hero and Measure, blue tags in the home hero, blue edges on the trench tags.

**Home**
- Hero: Kate Spade tote in place of AirPods, beige headphones back, blue tags. Record card restyled for the dark panel, no duplicate product name, LLM icons kept, "6 of 11" stat removed, faster sequence with a progress bar and the hairline redraw.
- No page two: top-down phone still with a straight-on screen, corners measured from the pixels so the overlay sits flush. Header tightened, "The funnel is collapsing into a single chat." added, report-style highlight. Case card makes one point with a stat.
- Finds cards use the Stat treatment. Samba card gets a status chip, save pill and row icons.
- Ladder: one product type, sneakers, eight brands (Nike, New Balance, On, HOKA, ASICS, adidas, Brooks). One adidas on the shelf, HOKA is the pick.
- Close: back to the v4 still.

**Product**
- Hero: scan overlay on the CÉCRED bottle, glass Ulta card with a stat.
- Measure, TrueSync, Value, Fix, Brand and Prove rebuilt in the console layout. TrueSync brings back the v5 flat lay with pulsing pins. Value gets the GAP mark on the lead card. Prove goes from three blocks to one module: the Best Buy model on the left, calculator and Monday readout as tabs on the right.
- Brand: Perplexity card reads as one focal number (the $99 struck, $69.99 read as a sale).

**Report page**
- Sample cards read as links: report cover chip, score ring, live label, a full-width "Open the Nike report" button, hover lift and blue edge.
- Nike "Key findings" tab: headline finding in the navy module, the other three as verdict rows. Share of Algorithm: one module with the 32/18/50 split and the pillars as rows, True Value highlighted.

**Start panel**
- Free first: pick SKUs, we run the study, you get the report. Then "if you like what you see, we talk about working together". Then, if he goes ahead: records, syndication, weekly runs. Button reads "Start my free study".

## v7 · Oct 29, 2026 · branch v7

Iterated on v6 (commit 1803304), not rebuilt. Every change maps to Samar's v7 notes. No red-team round. Revert any piece by its commit on branch v7.

**Site-wide**
- Headlines back to the v3 treatment: ink lead, grey continuation, blue square as the full stop. The square never doubles a period and never follows a ? or ! (site kit and the older `ds` heading both).
- Report-style lavender highlight on bold phrases, everywhere body copy bolds.
- Navigation rebuilt on the live parleo.io pattern: dismissible announcement bar, Product / Solutions / Resources mega menus with feature cards (console tile, research logos, latest insight), "Agentic Value Report · Free", two CTAs, a full mobile sheet. Hover then click no longer closes a menu.
- "Start with your top SKUs" opens a real panel everywhere (five steps and a short form). Footer gains both CTAs and a Solutions column.
- samar@parleo.io removed from the site, the form copy, llms.txt and both customer deck bundles (now point to the report page).
- Faint column lines and slow glows behind the light sections, hover lift on cards.

**Home**
- Hero still regenerated in the v3 world with real products: Nike Vomero 18 (the one sneaker), Sony WH-1000XM6, Dyson Airwrap, Baccarat Rouge 540, AirPods Pro 3. Record card rebuilt at console fidelity: question, what the assistant said with its flag, the page line verified, five assistants ticking live, the count drawn as dots.
- No page two: realistic ChatGPT screen on the phone, fixed on mobile as a framed device. Case card shows the TV, both prices and every answer as a dot. Unsourced phone details removed (stars, ships free, a third source).
- Samba card gains the report's three-price ladder and is fixed on phones.
- Ladder: the eight-sneaker wall replaced by a mixed shelf (Le Labo, Ray-Ban, UGG, Longchamp, Kiehl's, Dyson, New Balance, Stanley); compact readout on phones.
- Retailers door: the v4 dark REI ledger card is back. Brands door: Purina, Petco and the assistants drawn as a flow.
- Platform: the v4 adidas lead signal with the red Samba legs is back, with v6's sign-off state and TrueSync tree.
- Close: new still without shoes (Patagonia, Purina Pro Plan, Gap jeans, a tee).

**Product**
- Measure: v6 still kept, plus the v4 Petco revenue card ($50M), the dog lead-signal card and the Score / Answers / Access console with retailer marks and verdict chips.
- TrueSync: the unbranded flat lay is gone. A Best Buy record for the Sony XM6 (fields, sources, flagged membership fees) beside a read-back chart of nine answers minutes apart, four prices.
- Value: Gap Encore as a green lead signal on the denim photo, beside the Encore tiers.
- Fix: the v4 interactive fix queue restored under the Lowe's still.
- Brand content: two H&M records side by side, who mixed them up, two more issues.
- Prove: Best Buy's model drawn as it narrows, the readout's recipients and Forward, the v4 impact calculator.

**Agentic Value Report page**
- Hero: three sample reports in a stack (Lowe's, Ulta, Nordstrom) that turn on their own, with score and stake tiles. New lede, no "read by hand" anywhere.
- "Open a sample report, and judge the work yourself." Ulta replaces adidas.
- Inside the Nike report: Share of Algorithm drawn like the report (product, ring, three pillars with icons and chips), revenue drawn as it narrows.

**Insights**
- From the live page: category counts, "N pieces in this view", a pull-quote on the lead story, numbered cards, column lines and glow. v6 layout and animations kept.

**Assets**
- `public/img/v7/` (hero, close, shelf, report covers, cutouts). Generated on the Mac into `03_outputs/website/assets/site_v7/`.

## v6 · Oct 29, 2026 · branch v6

Built on v4 (commit 4008128), not on v5. v5 stays on its own branch. Every change maps to a pick-board note on v4. No red-team round, per Samar. Hero headline kept as v4's. Electric blue kept as the signal colour throughout. No eyebrows, no dates in copy, sources cut to a few words.

**Home**
- Hero: v4 still and geometry. Lede is Samar's line ("Parleo is the agentic commerce platform..."). Records cycle on their own until touched. New white record card: product, retailer mark, the question, the struck answer, the blue page line, one number with a dot or bar. Target, Nike, ASOS (Samba OG), Ulta. Tabs and labels in sentence case.
- No page two: Best Buy LG C6 at the same $1,399.99 as Costco, with an Any shopper / A Plus member flip (17 of 18 to Costco, 11 of 11 to Best Buy for members). Flat answer card on phones, no overlaid chat.
- Finds: v4 five cards kept, headline "AI is already selling your products, and getting them wrong." Best Buy card swapped for Lowe's (card discount the terms exclude). Ask card sells the report and links a real one.
- AI prices your best customers like strangers: v4 still and meaning, smaller price card, no "Found by" line.
- Ladder: same visual, readout with a dot bar, step rail, "Visibility tools measure this / Parleo works all four".
- Brands / Retailers: sliding toggle with icons. Purina at Petco and REI cards redesigned on the photos. Pro Plan plinth still from v3. No proof strip.
- Platform: new Adizero Evo SL still in the dark lead card, numbers on one rule, the fix in a card, sign-off state. TrueSync drawn as a tree, OpenAI feed waiting on sign-off, chapter tiles with icons.
- Close: "See what AI tells your shoppers, and what it's costing you." Report card with the Share of Algorithm ring, five assistants, "Back in hours". No "audit", no "days".

**Product**
- Hero: the v3 hand-and-bottle still, now a real product (CÉCRED Edge Drops at Ulta), the TrueSync loop simplified to four steps and floated over it. No Purina.
- Every chapter on one kit (`src/site/product/six.tsx`): opener, one still with zoomed product UI drawn on it, three points. Measure (Nordstrom, 70 of 100, Gemini's price match), TrueSync (v3 flat lay with pins on the tags), Value (Gap Encore, 0 of 176), Fix (Lowe's next-day delivery, three ranked fixes), Brand content (H&M's two trench coats), Prove (Best Buy's model and a weekly readout, dark band), Works with.

**Agentic Value Report page (rebuilt)**
- Hero: the Nike report cover in a browser frame, a real answer against nike.com, the score ring and the modeled stake.
- Read a real report: Nike, Lowe's and adidas cards, each linking to the live report.
- Inside a report: the Nike report in five tabs (findings, score, the real ChatGPT answer as evidence, revenue at stake as a chain, who fixes what).
- Built in hours, the score's three pillars, what you get, FAQ, the form.

**Assets**
- New stills in `public/img/v6/` (evosl, phero, measure, fix) and report imagery in `public/img/v6/rp/`. Generated on the Mac into `03_outputs/website/assets/site_v6/`.

## v4 · Oct 26, 2026 · branch v9-from-scratch

Rebuilt after Samar's read of v3: generic products and AI-slop names, product UI that looked nothing like the console, too much lifestyle, "Petco demo" everywhere, the seven-audits ledger, missing icons, logos, textures and diagrams. Red-team room (VP eCommerce, Pentagram-level designer, B2B copy lead, console product designer), re-run on corrected v3 screenshots.

**Home**
- Hero: new still with real products (Nike Vomero 18, adidas Samba OG, AirPods Pro 3, Dyson Airwrap i.d.). Each tab is a real answer: the shopper's question, the agent's words struck in grey, the page that day in blue, one number. Target, Nike, adidas and Ulta Beauty. Hero grows on short screens instead of clipping the record.
- No page two: the phone shows Perplexity sending an Air Force 1 shopper to Nike.com while Nordstrom had it at the same $115.
- New: What Parleo finds. Five real cases with product photos, wordmarks, verbatim quotes and one number each (Best Buy, Sephora, JD Sports, H&M, Gap), tagged Lost the pick or Lost full price, plus an ask card. Replaces the audit ledger.
- The gap: regenerated still with the real Samba OG; tag print re-registered.
- Ladder: real shoe wall (Air Force 1, Samba, Vomero 18, Speedgoat 6, Ultraboost 5X, Adizero Evo SL, Pegasus 42).
- Doors: brands show Purina's Pro Plan ladder at Petco and what five agents said about it; retailers show REI's Patagonia Down Sweater Hoody ledger ($345.00 to $293.25 for a member).
- Platform: the console's first screen instead of the Runner fix loop. adidas lead-signal card beside the TrueSync rail, chapter links with icons.
- Close: real-product still.

**Product**
- Hero: How TrueSync works, drawn from the console on one real record (Pro Plan at Petco): record with source rules, compile, seven surfaces, five agents, read-back verdicts, the loop back. Plays once, stacks on phones.
- Measure opens on the revenue-at-stake card and the Petco lead-signal photo card. Wordmarks, agent app icons and product thumbnails in the tables.
- TrueSync opens on the drift statement (four of five agents misstate the first-Autoship price). Flat lay and JSON cut.
- Value opens on the REI lead-signal card. Prove is the five-card impact cascade driven by the calculator. Linen readout cut.
- Brand content: the adidas Samba OG record with Brand, Retailer and Parleo source rules and the issues on it. Jar cut.
- Console chrome shows the agents, not "Petco · demo" and sync stamps.

**Sitewide**
- Detail kit (`src/site/v4kit.tsx`): one 1.5px icon family with the TrueSync fork mark, real wordmarks and agent app icons from the console library, specimen tiles for product cutouts, square-dot status, the console's 24px grid as texture.
- Audit page: the seven-audits ledger replaced by What Parleo finds. Pampers and Kimberly-Clark removed from the page.
- New assets in `03_outputs/website/assets/site_v4/` (generated stills with real products as references, report product images) and `public/img/v4/` (console cutouts, logos, app icons, photos).

## v3 · Oct 26, 2026 · branch v9-from-scratch

Rebuilt after Samar's read of v10: wrong Home/Product split, too few product interactions, faceless goods, the period before the square, over-qualified sources. Red-teamed twice (GTM, design, product seats). Commits 7808780 (build) and ea8cf5f (round 2 fixes).

**Home, seven sections, each brand once**
- Hero: the data layer over the products. Registration ticks find each good, the Runner locks on in blue, one hairline to one record card. One field corrects, grey (what AI says) to blue (the Parleo record). Hover a product or pick its tab for its record. Plays once.
- There is no page two: the answer types itself onto the shopper's phone screen in perspective, behind her thumbs. The old path is struck out on the counter.
- The gap (adidas): new terrace sneaker still. Toggle what AI quotes and what a member pays; the price prints onto the paper tag in perspective.
- Mentioned and Versus merged: one shelf of eight sneakers narrows layer by layer, dropped shoes go out of focus. Visibility tools stop at layer one, Parleo runs all four. Nordstrom proof.
- Brands and retailers: the mechanism drawn into each still (a funded offer reaching each retailer, a member's answer today vs with the record). Purina at Petco and Gap Encore proofs.
- Platform: a working fix loop on the Runner. Caught, proposed, approved (you click), published to seven surfaces, checked a week later with one agent reopened. Links into the product chapters.
- Close: the audit card fills with your brand as you type.
- Every public case is credited "Found by Parleo" with a way into the audit. Cut: evidence rail, Kimberly-Clark (consumable), duplicate brand stories.

**Product, five chapters on the Petco demo workspace**
- Sticky chapter nav. Measure (Score, Answers with receipts, Access as real tabs), TrueSync (catalog flat lay that compiles, offer record and compile matrix in one table, a release you switch on and roll back), Value (exposure rules with a live backtest, funded offers brand and retailer views), Fix (board with modeled value and owner per fix, sign-off you can approve), Prove (impact calculator, weekly readout printed on paper). Brand content, works with, close.

**Sitewide**
- The blue square is the full stop and never follows a period. Three per page at most.
- Two-tone headlines only where the line turns. Flat buttons. Segmented audit form. One section rhythm and one warm ground.
- New stills in `03_outputs/website/assets/site_v3/`: terrace, shoe wall, endcap, flat lay, close.

## v10 · Oct 26, 2026 · branch v9-from-scratch

**Home** (commit 69be739, fixes on top)
- Hero round 4: graded basket-of-goods still, one blue tag, printed tags, blue threads that run behind the goods into a six-row record table. Mixed record: catalog fields (battery life, stock, size) and incentive fields (member price, rewards, promotion). Hover links a row, its product and its thread. Plays once.
- Hero layout: stacks below 1200px (copy, picture, record list). The picture scales down in tall, narrow windows so the record table never truncates.
- Sections rebuilt to the pick-board grammar: There is no page two, the adidas price gap, mentioned vs recommended (ledge of boxes, cropped tight), brands and retailers toggle, the Gap console with Score and Queue notes underneath, evidence rail, a coverage table instead of the vertical bars, the close.
- "Accessibility" renamed "Access" everywhere, to match the locked Measure copy.

**Product** (commit 10a3ed5, fixes on top)
- Eleven sections from the locked copy deck: hero, Measure, Answers, Access, TrueSync, Value layer, Funded offers, Fix and approve, Prove, Brand and content, Works with, then the audit close.
- New generated still for the hero (hand, frosted serum bottle, blue cap, travertine). Six assistant tags read it and turn blue once, hover highlights one.
- Measure: waffle score and competitor ladder over the dark aisle. Sample account, labeled.
- Answers: ledger of three public audits (Petco, adidas, Gap), quotes verbatim only.
- TrueSync: record flat lay, record.json, five channels marked published then verified.
- Prove: the weekly readout printed onto the paper in the photo with one affine transform in container units.
- Every modeled or sample number is labeled on the page.

**Sitewide**
- "Talk about a pilot" now opens an email to samar@parleo.io (the pilot section was cut).
- Footer product links point at the new product sections.
- Section headings never orphan the blue square.
- Audit form mode pills center their text.

Not yet touched: Audit and Insights pages (not storyboarded, still on the older styles).
