# Fix-pass: layout, nav, team, spacing, and a real Share of Algorithm redesign

A focused cleanup pass across the homepage. Each change ends with a visual check at desktop (1440) and mobile (390).

## 1. Remove eyebrows everywhere

Per memory rule, eyebrows are out. Strip the tiny uppercase "kicker" labels (the blue bar + `font-mono uppercase tracking` text) from every section, including:

- `ShareOfAlgorithmSection` ("Share of Algorithm", "Distribution metrics", "Recommendation stack")
- `FeedSection` ("The architecture", "01 · Sources" column headers)
- `ProblemSection` ("THE RESULT", "THE CONSOLE", and any other kickers)
- `DashboardSection`, `HowItWorks`, `IntegrationSection`, `TeamSection`, `CTASection`

Replace with a clean single-column headline stack: H2 + sub. Section identity comes from the H2, not a label above it.

## 2. Navbar — labels match actual sections

Current links use invented names ("The Channel", "The Window", "Command Center") that don't match section content. Rewrite `navLinks` in `src/components/Navbar.tsx` to mirror the page in order:

```
The problem        → #problem
Share of Algorithm → #share-of-algorithm
The API            → #architecture
Live dashboard     → #dashboard
Protocols          → #integration
Team               → #team
```

Drop "How it Works" pill from the navbar (it currently routes to `/demo` and conflicts with the on-page `#how-it-works` section). Keep "Request Demo" as the sole CTA.

## 3. Hero "For developers" button → architecture section

In `HeroSection.tsx`, change the secondary CTA from `<Link to="/developers">` to `<a href="#architecture">`. Same styling. Label stays "For developers".

## 4. Reorder sections

In `src/pages/Index.tsx`, move `FeedSection` (the "One call. Every signal an agent needs." API panel) to sit immediately above `IntegrationSection` ("Ships on every protocol that matters."). New order:

```
Hero → SocialProof → Problem → ShareOfAlgorithm → Dashboard → HowItWorks → Feed → Integration → Team → CTA
```

## 5. Share of Algorithm — real redesign (not text + chips)

The current panel is a text-and-pill data dump. Rebuild it as a single design-forward interactive canvas with three visual moves that do the explaining:

**Layout**

```text
┌─────────────────────────────────────────────────────────────┐
│  H2: The new shelf is decided by agents.                    │
│  Sub: Visibility gets you considered. True Value gets you   │
│       ranked.                                               │
│                                                             │
│  ┌──────── Era rail (horizontal, animated) ──────────────┐  │
│  │  Shelf —— Voice —— Search ——●—— Algorithm            │  │
│  │  1960s   1980s    2010s         2025  (Parleo)        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Pillars (3 stacked tiles, click-to-focus) ──────────┐ │
│  │  01 Visibility   ░░░░░░░░░ measured                    │ │
│  │  02 Accessibility ░░░░░░░  partial                     │ │
│  │  03 True Value   ███████   PARLEO LAYER  ◀ active      │ │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌── Live resolution canvas (changes with active pillar) ─┐ │
│  │  Sticker rank #3   →   True-value rank #1              │ │
│  │  $30.00  −$7.60 incentives  =  $22.40 effective        │ │
│  │  [stacked horizontal bars: list → member → loyalty →   │ │
│  │   card → effective, animating into place]              │ │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Specifics**
- One container, light cream surface (`bg-card`), generous interior padding.
- Era rail: SVG glyphs per era, animated progress fill (framer-motion), caption updates below.
- Pillar tiles: real visual "coverage" bars (full / partial / Parleo-fills-the-gap) instead of status pill chips. True Value tile is the visual hero — primary-blue accent stripe, subtle inner glow-free elevation.
- Resolution canvas: a single animated bar-chart breakdown ($30 → $22.40) plus the rank swap card. No "Active lens" chips, no 8-dimension footer strip, no "ScorePlate" sidebar — all removed.
- Numbers in `tabular-nums`. No eyebrow. No 8-chip dimension strip. No floating score plate.

## 6. Tighten wasted vertical space

The screenshot shows ~400px of empty cream between the Result panel and The Console band in `ProblemSection`. Audit `ProblemSection.tsx` and reduce: collapse oversized `py-*`, `mt-*`, and any empty spacer divs between those two blocks down to ~64-80px. Apply the same audit to gaps between `ShareOfAlgorithm → Dashboard` and `Dashboard → HowItWorks` if similarly bloated.

## 7. Team section — fix to match site

Memory rule: grayscale company logos at `h-14`, no avatars or initials.

In `TeamSection.tsx`:
- Remove the `SB` / `EC` initials avatar circles entirely.
- Logos: bump from `h-8 md:h-9` to `h-14`, keep grayscale, increase gap so they breathe.
- Card padding and divider rhythm stay, but the headline area becomes name + role on its own (no avatar puck).
- Both founder cards use the same light card treatment (drop the one-card-dark variant) so the section reads as a consistent pair rather than mismatched halves.

## 8. Visual verification (mandatory before finishing)

Use `browser--view_preview` then `browser--screenshot` (full_page) at 1440 wide and 390 wide. Check explicitly:
- Nav anchors scroll to the right sections.
- No eyebrow labels remain anywhere on the homepage.
- Hero "For developers" jumps to `#architecture`.
- Section order matches the spec.
- No empty bands >120px between sections.
- Team logos are clearly legible; no initials circles.
- Share of Algorithm reads as a designed interactive panel, not a text wall.

If any check fails, fix and re-screenshot before declaring done.

## Files touched

- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/pages/Index.tsx`
- `src/components/ShareOfAlgorithmSection.tsx` (rebuild)
- `src/components/ProblemSection.tsx` (eyebrows + spacing)
- `src/components/FeedSection.tsx` (eyebrow + column kickers)
- `src/components/DashboardSection.tsx`, `HowItWorks.tsx`, `IntegrationSection.tsx`, `CTASection.tsx` (eyebrow sweep)
- `src/components/TeamSection.tsx` (avatars out, logos up)
