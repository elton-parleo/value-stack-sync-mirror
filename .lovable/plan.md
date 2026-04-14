

# Move Stats to "The New Channel" + Boost CTA Button Visibility

## What this changes

**1. Move sourced stats into ProblemSection ("The New Channel")**
The stats strip (58% Stripe, 4,700% Adobe, $5T McKinsey) currently sits in its own `SocialProofSection` between the hero and ProblemSection. It will be relocated into the ProblemSection, placed between the section heading ("Agents are already shopping for your customers") and the body text. The standalone `SocialProofSection` will be simplified to keep only the scrolling logo marquee.

**2. Make "How it Works" and "Run Agent" buttons dramatically more clickable**
Current issues: the "How it Works" button blends with background, the pulsing dot is too subtle, and "Run Agent" looks like a secondary element. The fix applies a high-contrast visual treatment that stays within the design system.

---

## Implementation Details

### A. Stats relocation (3 files)

**`ProblemSection.tsx`** — Insert a 3-column stats grid between the `<h2>` and the `<p>` body text:
- Same data: 58% / Stripe, 4,700% / Adobe, $5T / McKinsey
- Slightly smaller type than standalone (28px mobile / 36px desktop) to fit as supporting evidence rather than standalone section
- Maintains the source attribution below each stat

**`SocialProofSection.tsx`** — Remove the stats grid, keep only the "Connects with" label and the scrolling marquee rows. This keeps the logo credibility strip without the redundant stats.

**`Index.tsx`** — Keep SocialProofSection in the page (for the marquee), no reordering needed.

### B. Button visibility overhaul (4 files)

**"How it Works" button in `HeroSection.tsx`:**
- Switch from faint warm-border outline to solid `accent-warm` fill with white text
- Add a persistent animated shimmer sweep across the button surface (a diagonal light band that moves left-to-right every 3s)
- Add a right-pointing arrow icon that animates on hover
- Increase size slightly (h-12, px-7)
- Remove the tiny pulsing dot (too subtle, adds clutter)

**"How it Works" in `Navbar.tsx`:**
- Switch from ghost outline to a solid accent-warm/90 background with white text
- Keep compact size but add the shimmer animation
- Remove the pulsing dot

**"Run Agent" button in `LiveDemo.tsx`:**
- Switch from faint gradient outline to solid accent-warm fill with white text
- Increase to h-12 with larger padding
- Add the shimmer sweep animation
- Add a bouncing arrow-down or play icon
- Add helper text below: "Takes 8 seconds" to set expectations

**`index.css`** — Add a new `@keyframes btn-shimmer` animation:
```css
@keyframes btn-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-btn-shimmer {
  background-image: linear-gradient(
    110deg,
    transparent 25%,
    hsla(0, 0%, 100%, 0.15) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: btn-shimmer 3s ease-in-out infinite;
}
```

### Visual before/after

```text
BEFORE:                              AFTER:
┌──────────────────┐                ┌────────────────────────┐
│ ○ How it Works   │  (faint)       │ ▶ How it Works  →      │  (solid warm fill,
│ warm outline     │                │ shimmer sweep          │   white text, shimmer)
└──────────────────┘                └────────────────────────┘

┌─────────────────────┐             ┌────────────────────────┐
│  ▷ Run Agent        │  (faint)    │  ▶ Run Agent  ↓        │  (solid warm fill,
│  warm gradient bdr  │             │  shimmer · "8 seconds" │   white text, helper)
└─────────────────────┘             └────────────────────────┘
```

The key principle: these are the highest-value interactive elements on the site. They should be the most visually prominent elements after the primary "Request Demo" CTA. Solid fills with shimmer animation create urgency and unmistakable clickability without breaking the design system.

