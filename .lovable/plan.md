# Section A–H corrective plan

I re-read the v3 brief against the live page. Most of the gaps are not subjective: copy is paraphrased instead of verbatim, the global "remove eyebrow labels" rule was missed, the brief's bios and CTAs are not on the page, and a Tailwind class for the metric strip is malformed and renders transparent. On top of that, several sections still feel slide-deck rather than site. The plan below fixes all of it, section by section.

## Global (applies to every section below the strip)

1. Remove every small-caps eyebrow chip above section headlines: THE SHIFT, SHARE OF ALGORITHM, COMMAND CENTER, HONEY FOR AGENTS, THE WINDOW, PROTOCOL NATIVE, THE TEAM. Lead each section with its headline.
2. Use brief copy verbatim. No rewording, no contractions added, no extra clauses.
3. Tighten the "deck" feeling: no decorative checkmarks on label cards, no redundant pills/badges, no placeholder wireframe glyphs.

## A — The shift

Keep the 5-retailer artifact (your earlier override of the brief's 8). Real research stays, Nordstrom keeps winning.

Fixes
- Remove the vertical "SK-II · Pitera · Facial Treatment Essence" rail on the product panel — it competes with the query and adds noise.
- Remove the duplicate "Live agent query" bubble and "ChatGPT · shopping" pill from the product panel. The right panel already owns the assistant chrome. The left becomes a clean product hero with brand, name, size, MAP.
- Remove the Q2-2026 footnote paragraph (over-explanation, reads defensive).
- Replace favicon logo tiles (Saks, Sephora especially read as low-fi) with proper wordmark treatment: name set in the brand's typographic register inside the 44px tile when no clean logo is available, so the column reads as a designed system, not a list of icons.
- Tighten row height; promote winner row with a slightly larger product-style treatment (heavier card, primary-tinted edge, larger price), so the winner reads as a hero result, not a list item with a pill.
- Copy stays verbatim from brief (headline + subhead already correct).

## B — Share of Algorithm (full content rewrite)

Current copy is invented. Replace with brief verbatim.

- Headline: A new metric decides who agents recommend.
- Subhead: After share of shelf, share of voice, and share of search comes Share of Algorithm.
- Four era cards (left to right):
  - 1960s — Share of Shelf. Distribution moved through physical retail. Measured by: Nielsen, IRI. Annual spend: $8B+.
  - 1980s — Share of Voice. Distribution moved through broadcast media. Measured by: GRPs, Media Mix. Annual spend: $12B+.
  - 2010s — Share of Search. Distribution moved through query results. Measured by: SEO / SEM rank. Annual spend: $200B+.
  - 2025 — Share of Algorithm. Distribution moves through agent decisions. Measured by: Parleo. Annual spend: $1T expected.
- Closing line: Your competitors are already being measured on this. They just do not have the scorecard yet.

Design
- Keep the 4-card horizontal pattern. First three neutral, fourth in accent.
- Replace the placeholder SVG glyphs with cleaner, less wireframe-y geometric era marks: shelf grid, broadcast waveform, descending search bars, agent node graph — drawn as tight monoline diagrams in the foreground tint, not gray boxes.
- Increase contrast between neutral and accent card: accent card uses subtle primary surface tint, white inner panel for the glyph, primary headline. Neutral cards stay on background with hairline border only (no panel fill), so the accent card reads as the "now" beat rather than four identical tiles.

## C — Command Center

- Headline: Your agent channel, in one console.
- Subhead: Score how agents rank you, see the margin they cannot, and set the rules your offers play by.

Structural fixes
- Move Agent Commerce Score (54/100) and Deal Leakage ($4.8M) INSIDE the dashboard mockup as a header strip above Active Constraints, not as a standalone 3-column band above the dashboard. The brief is explicit: surface them in the dashboard.
- Label the entire dashboard "Sample readout · Sephora" inside the chrome (top-right), not as a third column of an outer strip.
- Drop the outer strip entirely once the in-dashboard header lands.
- Fix the broken Tailwind class `bg-[hsl(var(--success))/0.12]` which currently renders transparent (Tailwind cannot parse `/0.12` inside the arbitrary-value bracket without the `bg-[hsl(...)]/[0.12]` split). Use a proper utility or inline style.

## D — Honey for Agents

- Subhead (verbatim): One API call returns normalized products, true-cost deal signals, and semantic context, so your agent skips the 8 to 12 tool calls.
- Keep the 01/02/03 cards, stats strip, and the two CTAs ("See how it works →" and "Read the docs →") that are already wired.
- Lower visual noise: the three feed/habit/direct mini-visuals inside the cards are fine; keep them.

## E — Early-mover window

- Subhead (verbatim): Agents anchor on the merchants they surface first, and those defaults are being set now.
- Three-step labels rewritten verbatim:
  - 01. Connect your offers — Upload loyalty, card-linked, and incentive data.
  - 02. Agents discover you — Queries start including your real value, not just list price.
  - 03. Customers convert — Better deals, ranked higher, more recommendations.
- Flow diagram: tighten the logo clusters under "AI Agent" and "Your Store" — current scatter of tiny favicons reads cluttered. Use 3 evenly-spaced 18px brand marks with consistent baseline.
- The "Agent sends / Parleo computes / Customer sees" trio currently uses blue checkmarks on every line — this reads as a marketing deck. Replace bullets with thin column dividers and label lines in mono-uppercase micro caps so it reads like a spec, not a feature list.

## F — Protocol-native

- Subhead (verbatim): Live on OpenAI, Perplexity, Claude, and custom systems across ACP, MCP, AP2, UCP, and TAP.
- Keep the supporting line already on the page.
- Keep the dark JSON panel and 9-protocol grid as-is.

## G — Team (substantive content correction)

- Headline (verbatim): Operators who've shipped this before.
- Samar bio (verbatim): Founded Good&Co (acquired by Axel Springer, scaled to $25M ARR). VP Marketing at MetaMap. Brand and growth at WPP / AKQA for Nike, Xbox, Google.
- Samar logos: WPP, Nike only. Remove Axel Springer and MetaMap logos (the brief specifies just two).
- Elton bio (verbatim): Built the first card-linked offer product at Groupon on Visa, Mastercard, and Amex rails. Head of Product and Engineering at Rakuten. 20 years in loyalty and pricing infrastructure.
- Elton logos: Rakuten, Groupon only. Remove AlphaFlow.

## H — Close (missing content)

- Headline kept: Be visible to every agent.
- Subhead corrected to verbatim: Work with the merchants getting ahead of the agentic shift. (Currently reads "Working with merchants…")
- Add the missing secondary CTA: For developers → (links to /developers, sits next to Request a demo). Brief explicitly requires a dual CTA.

## Verification

After edits, scroll the full page at 1440 wide and at mobile width, screenshot each section, and re-check against the brief's Keep / Change / Copy lines before declaring it done. Concretely:
- Confirm every headline and subhead matches the brief character-for-character (excluding allowed punctuation differences from the no-em-dash rule).
- Confirm zero eyebrow labels remain.
- Confirm the success pill in the Command Center metrics renders the green background (not transparent).
- Confirm Section H has both CTAs visible.
- Confirm Section G team cards show exactly the logos listed in the brief.

## Technical notes

Files to edit:
- `src/components/ProblemSection.tsx` (A — strip noise from product panel, tighten rows, drop footnote)
- `src/components/ShareOfAlgorithmSection.tsx` (B — full copy rewrite, redesign accent card)
- `src/components/DashboardSection.tsx` (C — move metrics into dashboard chrome, fix Tailwind class, copy)
- `src/components/FeedSection.tsx` (D — subhead, remove eyebrow)
- `src/components/HowItWorks.tsx` (E — subhead, step copy, flow polish, remove eyebrow)
- `src/components/IntegrationSection.tsx` (F — subhead, remove eyebrow)
- `src/components/TeamSection.tsx` (G — headline, bios, logo lists)
- `src/components/CTASection.tsx` (H — subhead, add secondary CTA)

No new dependencies. No backend. No /demo or hero changes.
