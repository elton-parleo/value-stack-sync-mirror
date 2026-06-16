
# Homepage Rebuild Plan

A restructure of the existing homepage, not a fresh start. Reuses the Hero chat artifact, True-Cost Ladder, Command Center dashboard, Era cards, Founders, Flow diagram, and JSON code panel. Rebuilds order, copy, audience separation, and the missing IP framework.

## 1. Section order (replaces current Index.tsx flow)

```text
Navbar
1.  HeroSection              (keep, fix copy)
2.  StakesSection            (new — replaces SocialProofSection marquee + ProblemSection stats)
3.  ValueRevealSection       (keep — true-cost ladder, central)
4.  SpineSection             (new — dark editorial moment)
5.  ShareOfAlgorithmSection  (rebuild — keep era cards, ADD 3-pillar framework)
6.  DashboardSection         (keep, tighten copy)
7.  HowItWorksBrands         (rebuild from HowItWorks — 3 brand steps, light flow line)
--- developer track break ---
8.  DevTrackHeader           (new)
9.  DeveloperApiSection      (new — directory + code panel + perf line)
10. ProtocolsSection         (rebuild from IntegrationSection — relocated, expanded protocol list)
--- end dev track ---
11. WhyNowSection            (new — restore editorial photography)
12. TeamSection              (keep)
13. CTASection               (rebuild — spine-aligned final CTA + closing image)
Footer
```

Removed from homepage: `FeedSection`, current `SocialProofSection` brand marquee, current `ProblemSection` with inflated stats.

## 2. Navbar changes
Replace labels with: How it works · Share of Algorithm · Command Center · For developers · Team. CTA: Request a demo. "For developers" scrolls to `#developers` anchor on the dev-track header.

## 3. Section-by-section copy + structure

### Hero (edit src/components/HeroSection.tsx)
- H1: "The incentive layer for **agentic commerce**." with serif italic on "agentic commerce" (use existing Instrument Serif / Cormorant pattern from TeamSection).
- Subhead: "Parleo makes your loyalty programs, card-linked offers, and true product value readable and transactable across every agent surface."
- Secondary CTA "For developers" → `#developers` anchor instead of `/developers` route.
- WORKS WITH row: protocols only — MCP · ACP · AP2 · UCP · TAP · OpenAI. Drop mixed brand logos.

### Stakes (new src/components/StakesSection.tsx)
- H2: "AI agents are already shopping for your customers."
- Sub: "This is the fastest-growing way people shop, and it's already deciding who gets the sale."
- Three stats, each marked `VERIFY` in a JSDoc comment for the team to confirm before publish. Conservative shape:
  1. ~39% of U.S. consumers have used AI for shopping (Adobe 2025) — VERIFY
  2. AI-driven retail traffic up ~1,200% YoY (Adobe holiday 2024→2025) — VERIFY
  3. ~$1.7T agentic commerce by 2030 (analyst projection) — VERIFY
- No 4,700%. No 2024-only sources cited as current.

### ValueRevealSection (keep as-is, no changes)

### Spine (new src/components/SpineSection.tsx)
- Full-bleed dark `#1E1E2E` surface.
- Editorial headline: "Other tools measure whether agents see you. Parleo measures whether they see your **real value**." (serif italic on "real value")
- Sub: "As agents move from recommending to buying, the deciding signal stops being the mention. It becomes the resolved price, after every incentive. That's the layer nobody else computes."

### Share of Algorithm (rebuild src/components/ShareOfAlgorithmSection.tsx)
- Keep existing era cards, condense slightly (smaller glyphs, tighter padding).
- ADD a new sub-block below: three-pillar framework as a 3-column grid (stacks on mobile).
  - Pillar 1 — Visibility. "Are you in the room?" Metrics: Mention Rate, Share of Voice, Recommendation Strength. Footer label: "Measured by others (Profound, Bluefish, AEO tools)." Visual: muted, low-contrast card, foreground/45.
  - Pillar 2 — Accessibility. "Can agents read your commerce data?" Metrics: Structured Data Completeness, Platform Distribution. Footer: "Partly measured." Same de-emphasized treatment.
  - Pillar 3 — True Value. "Are agents seeing your real offer?" Metrics numbered 06 Incentive Citation Rate · 07 Incentive Accuracy · 08 True Value Delta. Footer: "Measured by Parleo." Visual: lit dark card `bg-[#1E1E2E]` with accent `#0166FF` borders/numbers, elevated.
- Closing line: "Visibility is covered. True Value is the layer where your margin pools, and nobody else measures it. That's us."

### Dashboard (keep, edit copy)
- H2: "Your agent channel, in one console."
- Sub: "Score how agents rank you, see the margin they can't, and set the rules your offers play by."
- Audit existing labels in DashboardSection.tsx for slide-headline cadence, rewrite to web copy.

### HowItWorks (rebuild src/components/HowItWorks.tsx as brand-only)
- H2: "From invisible to ranked, in three steps."
- Three steps: Connect your offers · Agents see your real value · Customers convert.
- Keep light flow line Agent → Parleo → Your Store. Remove JSON/protocol detail (moves to dev track).

### Dev-track header (new src/components/dev/DevTrackHeader.tsx, anchor `#developers`)
- Visible audience break: thin top hairline, eyebrow "FOR DEVELOPERS" in mono.
- H2: "The layer your agent calls."
- Sub: "One endpoint returns normalized products, true-cost deal signals, and semantic context, so agents skip the 8 to 12 tool calls a cold crawl needs."
- Different background tone (slight darker neutral) to signal track switch.

### Developer API (new src/components/dev/DeveloperApiSection.tsx)
- Three-up directory blurbs: "Your value, structured" · "One place to check" · "Shopping-specific semantics".
- Relocated `parleo-query.json` code panel (lift markup from current IntegrationSection).
- Perf line: "60% fewer tokens than direct crawling · hourly refresh · sub-50ms response · Zero PII leaves your environment."
- CTAs: Read the docs · See how it works.

### Protocols (rebuild from IntegrationSection.tsx, kept in dev track)
- H2: "Ships on every protocol that matters."
- Sub: "Live on OpenAI, Perplexity, Claude, and custom systems across ACP, MCP, AP2, UCP, and TAP. Zero cross-protocol incentive resolution exists today. Parleo is the layer that resolves it."
- Protocol grid: MCP, OpenAPI, ACP, AP2, UCP, Visa TAP, Shopify, Stripe, Oracle.

### Why now (new src/components/WhyNowSection.tsx)
- H2: "The early-mover advantage is closing fast."
- Sub: "Agents anchor on the merchants they surface first, and those defaults are being set now."
- Restore editorial photography (generate one wide editorial retail/lifestyle image via imagegen, art-directed per workspace knowledge).

### Team (keep current TeamSection)

### Final CTA (edit src/components/CTASection.tsx)
- H2: "Be the brand agents can actually price."
- Sub: "Work with the merchants getting ahead of the agentic shift."
- CTAs: Request a demo · For developers (#developers).
- Add a closing editorial image (generated).

## 4. Copy enforcement pass
Global grep + edit pass across all touched files:
- Remove em-dashes (—) and en-dashes (–). Already a memory rule; re-verify.
- Replace any "AI commerce" with "agentic commerce".
- Fix "card-offers offers" → "card-linked offers" (hero subhead).
- Remove banned words: leverage, unlock, elevate, robust, comprehensive, transformative, game-changer, delve, pioneer, journey, realm, landscape, empower.
- No semicolons in prose. No "Not X, but Y". No gerund glue.
- Contractions throughout.

## 5. Visual + motion rules
- Animated: HeroChatArtifact (existing), ValueRevealSection ladder (existing), ShareOfAlgorithm on-scroll reveal (subtle, existing AnimatedSection wrapper).
- Everything else: static, editorial.
- Dark surface `#1E1E2E` only on Spine + True Value pillar + section breaks.
- Serif italic accent (Instrument Serif / Cormorant) inside H1, Spine headline, and Share of Algorithm H2. Sans is Inter Tight.
- No glow, glassmorphism, mesh gradients, 3D, stock icons, decorative noise. (Already memory.)

## 6. Assets to generate (imagegen, art-directed)
- 1 wide editorial retail/lifestyle image for WhyNowSection (asymmetric crop, muted grading, no stock look).
- 1 closing image for final CTA (product or retail context, editorial).
- Brand canvas `#F2F0EF`, accent `#0166FF`. Save as `.jpg`, externalize via lovable-assets after generation.

## 7. Files

Edit:
- src/pages/Index.tsx (section order)
- src/components/Navbar.tsx (links, anchors)
- src/components/HeroSection.tsx (H1 italic, CTA anchor, works-with row)
- src/components/ShareOfAlgorithmSection.tsx (add 3-pillar framework + closing line)
- src/components/DashboardSection.tsx (copy)
- src/components/HowItWorks.tsx (brand-only 3 steps)
- src/components/IntegrationSection.tsx → repurpose as ProtocolsSection inside dev track
- src/components/CTASection.tsx (copy + image)

Create:
- src/components/StakesSection.tsx
- src/components/SpineSection.tsx
- src/components/WhyNowSection.tsx
- src/components/dev/DevTrackHeader.tsx
- src/components/dev/DeveloperApiSection.tsx

Remove from homepage import (files retained, just unmounted):
- src/components/SocialProofSection.tsx
- src/components/ProblemSection.tsx
- src/components/FeedSection.tsx

## 8. QA checklist before claiming done
- "Real value" vs "see you" contrast appears in Hero, Spine, Share of Algorithm, Final CTA.
- True Value pillar is the only lit element in Share of Algorithm; pillars 1+2 visibly recede.
- Brand sections (1–7, 11–13) contain no developer content. Dev track (8–10) is visually bounded; nav anchor scrolls there.
- Only Hero artifact + True-Cost Ladder + Share of Algorithm reveal animate.
- Zero em-dashes. Zero "AI commerce". Zero "card-offers offers". Zero overclaim logos. Zero 4,700%. Zero banned words.
- Real photography present in Hero supporting area / WhyNow / Final CTA.
- Mobile: H1 ≤ 44px, sections stack, three-pillar grid stacks vertically.
- Build passes. Preview verified at desktop + mobile viewports via browser--view_preview.
