## Operating principles (apply to every section)

1. **Re-ground in the design system** before each section: Inter Tight, canvas `#F2F0EF`, ink `#1E1E2E`, accent `#0166FF` used only as a precision signal, soft container `#EAE8E5` for "you're inside the product" frames, white/near-white for product surfaces. No serif inside product UI. No glow, glassmorphism, soft decorative shadow, stock iconography, or AI-illustration cliches.
2. **Evolve, do not replace.** Where the brief says "keep", keep the artifact and its detail. Edits change only headline, subhead, and the specific surfaces the brief calls out.
3. **Verbatim copy only.** Every headline, subhead, and named CTA uses the exact strings from the brief. No invented editorial lines. No eyebrows above headlines.
4. **Real, researched data.** Every product, retailer, tier, card, and price is a real program I can defend on a quick web check. The current Section A invented numbers; that does not happen again.
5. **Voice:** scannable, numbers-first, contractions, no em-dashes, no en-dashes, no "elevate / unlock / empower / leverage".
6. **Logos for every named brand.** Use the existing `BrandLogo` (Google Favicon) for retailers and protocol partners, the existing grayscale company logos for the Team section.

## Pre-build research, scoped per section

Before writing each section I run targeted web searches (Firecrawl-style) and confirm these on real sources, no fabricated numbers:

- **Section A (8-retailer ranking):** real product, current sticker price across 8 real retailers that carry it, real loyalty tier names and benefit math (Sephora Rouge, Nordstrom Nordy Club Icon, Saks SaksFirst, Bloomingdale's Loyallist, Neiman Marcus InCircle, Macy's Star Rewards, Bergdorf Goodman Insider, brand-direct rewards), and one real co-brand card per retailer where the cashback rate is public.
- **Section B (Share of Algorithm):** the four-era stat block uses the onboarding doc's framing (Shelf 60 yrs / Voice 20 yrs / Search 10 yrs / Algorithm 2026+), and the per-era industry sizes I cite are sourced (Nielsen + IRI ~$8B+, broadcast measurement ~$12B+, SEO/SEM ~$200B, agentic commerce $1T projected per the brief). I confirm each before publishing.
- **Section C (Command Center):** Agent Commerce Score 54/100 and Deal Leakage $4.8M as the brief's example readout. The existing constraints, metrics, and Active Incentives panel stay intact.
- **Section D (Honey for Agents):** existing 01/02/03 cards stay. CTAs land at `/demo` and `/developers`. I confirm `/developers` route exists; if not, I leave the link as-is (it already exists in the hero) and flag it.
- **Section E (Early-mover):** existing three-step diagram, four benefit cards, and lifestyle/product photography all stay. Subhead and step labels update.
- **Section F (Protocol-native):** keep the protocol grid (MCP, OpenAPI, ACP, AP2, UCP, Visa TAP) and the dark JSON panel. Add Shopify, Stripe, Oracle to the grid as the brief lists. Add the "Six protocols. Zero cross-protocol incentive resolution. Parleo is the layer that resolves it." supporting line.
- **Section G (Team):** existing bio cards and logos stay. Bios rewritten to the brief's verbatim copy and trimmed to the named logos (WPP + Nike for Samar, Rakuten + Groupon for Elton).
- **Section H (Close):** existing editorial image and dual CTA stay. Confirm headline, subhead, and CTA labels match the brief.

## Section-by-section build

### A. The shift — rebuild on top of the existing rich artifact

- Headline: "AI agents are already shopping for your customers."
- Subhead: "This is the fastest-growing way people shop, and it is already changing who gets the sale."
- Remove the eyebrow "THE NEW CHANNEL".
- Keep the three stat cards (58% Stripe, 4,700% Adobe, $5T McKinsey) and their source attributions.
- **Evolve the existing comparison.** Keep the ChatGPT-style ChatWindow shell (chrome, user bubble, assistant avatar, typing dots, composer), keep the With/Without toggle, keep the product imagery treatment, keep the 48ms / Zero PII footer, keep the incentive-stack math row pattern.
- **New product, real data, 8 real retailers.** Candidate: La Mer Crème de la Mer 30ml (luxury skincare across department stores plus brand-direct plus Amazon). Final product chosen after research-pass confirms 8 retailers all carry it and all loyalty programs are public. The artifact shows the full retailer ranking inside the assistant response, not a 4-row teaser; the winning retailer is marked, sticker-price winner is shown crossed out, the user's incentive stack is itemized on the winning row.
- One product image (well-art-directed, editorial), one ChatGPT chat surface, eight ranked retailer rows, one math stack on the winner. That is the single artifact, not a list of cards.

### B. Share of Algorithm — new section, slotted between A and C

- Headline: "A new metric decides who agents recommend."
- Subhead: "After share of shelf, share of voice, and share of search comes Share of Algorithm."
- Four-era horizontal sequence. First three eras neutral (warm ink on canvas), fourth highlighted in `#0166FF`. Each card carries: era label, year tag, distribution line, "Measured by" line, "Annual spend" line, and one minimal geometric glyph per the brief (shelf grid, waveform, descending search bars, agent node graph). Glyphs are SVG, orthographic, no stock icons.
- Closing line beneath the row: "Your competitors are already being measured on this. They just do not have the scorecard yet."
- Motion: scroll-in fade and a single subtle staggered reveal across the four cards. No bouncing, no parallax.

### C. Command Center — keep the dashboard, add the headline metrics

- Headline: "Your agent channel, in one console."
- Subhead: "Score how agents rank you, see the margin they cannot, and set the rules your offers play by."
- Remove eyebrow "COMMAND CENTER".
- Add a headline-metric strip at the top of the dashboard with two new tiles: **Agent Commerce Score 54/100** (with the ARS / ADPI split underneath as a thin diagnostic line) and **Deal Leakage $4.8M** (with "this quarter, agent channels" as the supporting line). These sit above the existing Active Constraints / Metrics / Active Incentives surfaces, which stay intact and densely populated as built.
- Add a small "Sample readout · Sephora" label in the dashboard chrome so it is clearly an example, per the brief.

### D. Honey for Agents — keep the cards and JSON, add two CTAs

- Headline: "The directory agents check first."
- Subhead: "One API call returns normalized products, true-cost deal signals, and semantic context, so your agent skips the 8 to 12 tool calls."
- Remove eyebrow "HONEY FOR AGENTS".
- Keep the 01 / 02 / 03 cards exactly. Keep the 60% fewer tokens / hourly refresh / sub-50ms response stat row. Keep the JSON / code artifact.
- Add a CTA pair at the bottom of the section: primary text link **"See how it works →"** routed to `/demo`, secondary text link **"Read the docs →"** routed to `/developers`. Style as quiet editorial links inside a thin top divider, not as a competing button block (the hero already owns the primary buttons).

### E. Early-mover window — keep the diagram and cards, edit the copy

- Headline: "The early-mover advantage is closing fast."
- Subhead: "Agents anchor on the merchants they surface first, and those defaults are being set now."
- Remove eyebrow.
- Keep the horizontal three-step diagram (Agent sends → Parleo computes → Customer sees), the lifestyle and product photography (jewelry, card-payment), and the four benefit cards intact.
- Sharpen the three step labels to the brief's exact lines (Connect your offers / Agents discover you / Customers convert) and their one-line descriptions.

### F. Protocol-native — keep the grid and panel, extend and reframe

- Headline: "Ships on every protocol that matters."
- Subhead: "Live on OpenAI, Perplexity, Claude, and custom systems across ACP, MCP, AP2, UCP, and TAP."
- Remove eyebrow.
- Keep the dark JSON panel and the existing photography.
- Add three tiles to the protocol grid: Shopify, Stripe, Oracle, to match the brief's list. Confirm each logo renders cleanly through `BrandLogo`.
- Add a single supporting line next to the grid: "Six protocols. Zero cross-protocol incentive resolution. Parleo is the layer that resolves it."

### G. Team — keep layout, restate bios

- Headline: "Operators who've shipped this before."
- Remove eyebrow "THE TEAM".
- Samar bio (verbatim from brief). Logos shown narrowed to WPP and Nike.
- Elton bio (verbatim from brief). Logos shown narrowed to Rakuten and Groupon.
- Existing LinkedIn affordance and grayscale-logo treatment stay.

### H. Close — confirm copy and CTAs

- Headline: "Be visible to every agent."
- Subhead: "Work with the merchants getting ahead of the agentic shift."
- Primary CTA: "Request a demo" (opens existing ContactFormDialog).
- Secondary CTA: "For developers →" (routes to `/developers`).
- Editorial gallery image stays. Layout pattern stays.

## Build order

1. Section A research pass + rebuild.
2. Pause for your review.
3. Sections B → C → D → E → F → G → H, one at a time, stop for review after each.

## Out of scope

- Hero, logo strip, Navbar, /demo, /developers. Untouched.
- Memory changes. Will only touch memory if a long-lived rule changes from this work; not anticipated.

## Technical notes

- Files I expect to edit: `src/components/ProblemSection.tsx` (A), new `src/components/ShareOfAlgorithmSection.tsx` (B), `src/components/DashboardSection.tsx` (C), `src/components/FeedSection.tsx` (D), `src/components/HowItWorks.tsx` (E), `src/components/IntegrationSection.tsx` (F), `src/components/TeamSection.tsx` (G), `src/components/CTASection.tsx` (H), and `src/pages/Index.tsx` to slot B between A and C.
- Real product imagery for Section A will be added via the lovable-assets pointer flow off a publicly hostable product photo, not an AI-generated render, to avoid the default AI-image look the design system bans.
- Verification after each section: `browser--view_preview` + screenshot at the section, plus a re-read of the brief's "Keep / Change / Copy" lines for that section before I call it done.

If this plan reads right, approve it and I will start with Section A's research pass + rebuild and stop for your review.
