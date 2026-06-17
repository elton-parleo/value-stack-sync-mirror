
## Goal

Collapse the two stacked sub-panels inside `src/components/ShareOfAlgorithmSection.tsx` (Era strip + Three Pillars / Eight Dimensions) into a single, compact, design-forward, interactive panel. The combined panel must:

- Tell the philosophy in one breath: distribution has gone through 4 eras, and the era we're in (Share of Algorithm) is decided by 3 pillars, with True Value being the missing one Parleo owns.
- Take roughly half the vertical space the two current panels do.
- Feel like a high-craft interactive artifact, not a dashboard.

## Concept: "The Distribution Timeline → True Value Lens"

A single dark editorial canvas (`#0E0E14`) with two coordinated halves that share state:

```text
┌─ Share of Algorithm ────────────────────────────────────────────┐
│                                                                 │
│  1960s ───── 1980s ───── 2010s ───── 2025 ●                     │
│  Shelf       Voice       Search      Algorithm                  │
│  ───────────────────────────────────── animated progress ───────│
│                                                                 │
│  ┌─────────────── ACTIVE ERA DETAIL (right side morphs) ──────┐ │
│  │  Distribution: Agent decisions                             │ │
│  │  Spend: ~$1T  ·  Measured by: Parleo                       │ │
│  │                                                            │ │
│  │  Decided by 3 pillars ─────────────────────────────────    │ │
│  │  ◐ Visibility    ◐ Accessibility    ● True Value           │ │
│  │     (measured)      (partial)         (Parleo · unmeasured)│ │
│  │                                                            │ │
│  │  [True Value selected by default — expands inline]         │ │
│  │   06 Incentive Citation Rate                               │ │
│  │   07 Incentive Accuracy                                    │ │
│  │   08 True Value Delta                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  True Value is the only pillar without tooling. That is the    │
│  opening Parleo owns.                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Interaction model

- **Horizontal timeline** of 4 eras as nodes on a single hairline rail. On scroll into view, a blue progress line draws from 1960s → 2025, settling on the active node (`Share of Algorithm`) with a pulsing dot.
- Hovering or clicking a node morphs the right-side detail panel (cross-fade + small y-shift) to show that era's distribution / spend / measured-by. Default and resting state is **2025 · Share of Algorithm**.
- When 2025 is active, three pillar chips appear under the era detail. Hover/click a pillar to expand its dimensions (the framework's "Eight dimensions" live here as expandable rows, not as three separate cards). **True Value is selected by default** and visually dominant (filled blue chip, expanded list, primary text); Visibility and Accessibility are dimmed status-chips that expand on hover.
- Subtle motion: progress rail draws on enter, status dots have a soft `animate-ping`, pillar expand uses framer-motion `AnimatePresence` with height auto.

### Why this works

- One headline replaces two ("**A new metric decides who agents recommend.** Three pillars decide the score. One is still unmeasured.").
- The eras become context, not equal real estate. They live as a slim navigable rail.
- The framework becomes the payoff of the era — not a second section. True Value is the visual climax (filled, expanded, primary-colored).
- Everything fits in a single panel ~the height of one of today's sub-panels.

## Files to change

- `src/components/ShareOfAlgorithmSection.tsx` — full rewrite of the body. Keep the same export, same `id="share-of-algorithm"`, same `AnimatedSection` wrapper. Replace the two-panel layout with a single `<div>` editorial card containing:
  1. Eyebrow + condensed headline + one-line dek.
  2. Horizontal era rail (4 nodes, animated progress line, active state).
  3. Morphing era-detail block (cross-fades on era change).
  4. Pillar chip row + expandable dimensions list (True Value default-open).
  5. Closing one-liner ("True Value does not. That is the opening.").
- No other files touched. `Index.tsx` already imports `ShareOfAlgorithmSection`; nothing else changes.

## Technical notes

- React state: `activeEra` (default `2025`), `activePillar` (default `True Value`).
- Animations: `framer-motion` (already in project), `AnimatePresence` for the morphing detail and expanding pillar rows. Progress rail uses a `motion.div` width tween triggered by `useInView`.
- Tokens: reuse existing semantic tokens (`bg-card`, `border-border`, `text-foreground`, `text-primary`). The interactive canvas uses the existing dark surface pattern `#1E1E2E` already used by `EraCard` and `PillarCard` so it stays on-system. No new colors.
- No new dependencies.
- Accessibility: era rail nodes and pillar chips are real `<button>`s with `aria-pressed`. Keyboard focusable. Reduced-motion respected via `useReducedMotion`.

## Out of scope

- No copy rewrite beyond the merge (keep the existing pillar/dimension names, era data, and "The opening" closing line).
- No changes to `FeedSection`, `PlatformContextSection`, or anything downstream.
- Not adding charts, particles, or 3D. Motion stays Stripe-subtle per project memory.

## Verification

After the rewrite, visually verify the new section at 1440×900 and 390×844 via `browser--view_preview` + `browser--screenshot`:
- Era rail renders horizontally on desktop, stacks cleanly on mobile.
- True Value chip is the default-active, visually dominant element.
- Section occupies roughly half the previous combined height.
- No overflow, no console errors.
