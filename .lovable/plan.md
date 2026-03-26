

# Demo Page Improvement Plan

## Current State vs Spec — Gap Analysis

After comparing the 844-line specification document against the current implementation, here are the issues and improvements organized by priority.

---

## Phase 1: Structural & Functional Fixes

### 1. Restore sticky scenario picker bar (move picker OUT of LiveDemo)
The spec calls for a **slim sticky bar below the navbar** with just "Beauty | Outdoor | Electronics" text tabs. Currently the scenario picker is large icon cards inside LiveDemo. This should be:
- A sticky `top-12` bar (48px height) with 3 text tabs and blue underline on active
- Scenario switching resets demo state (already works)
- The LiveDemo section drops its built-in scenario picker cards entirely

### 2. Hero section — add "Try the Demo" + "Request Access" CTAs
The spec requires two CTA buttons below the hero text:
- Primary blue: "Try the Demo ↓" (smooth scroll to demo section)
- Secondary outlined: "Request Access" (opens ContactFormDialog)
Currently missing from `DemoHero.tsx`.

### 3. Hero — improve Before/After cards
The current before/after cards are too simple. The spec wants:
- "What agents see today" card (muted/faded) with product name, price, merchant, and the line "No loyalty data. No card offers. Price only."
- "What Parleo surfaces" card (blue accent) with a full price waterfall breakdown showing each deal line item and the final savings

### 4. Hero — full Agent Context card
The spec wants Sarah Chen's **complete** profile (all 6 memberships: Sephora Rouge, Nike Member, REI Co-op, Amex Platinum, Best Buy Totaltech, Chase Sapphire) shown in the hero — not just the scenario-specific subset. The Live Demo step 1 then shows the relevant subset.

### 5. Sandbox math — verify against truth tables
The spec provides exact truth tables. Current implementation looks correct in formula but needs verification:
- Electronics: `pointsFull` is 0 (Totaltech is flat discount, not points) — already correct in data
- Electronics card: Chase/Amex = $13.49, Store = $14.00 (5% of $279.99) — need to verify Store card value is $14.00 not $13.99

### 6. API Response JSON — update to match spec exactly
The spec provides richer JSON with fields like `total_savings`, `savings_pct`, `rank_without_deals`, `rank_with_deals`, `category_intelligence.decisive_specs`, `review_signal`, `confidence`, `response_ms`. Current `apiJson` in scenarioData uses simpler structure. Update all 3 scenarios.

---

## Phase 2: Visual Polish

### 7. Demo container visual distinction
Currently uses `background: hsl(30 8% 91%)` and blue top border — good. Verify the border-radius is 16px and that it feels like "you're inside the product." Add subtle inner shadow if needed.

### 8. Phase 3 reasoning trace styling
Spec says: "blue-tinted background, **4px** blue left border" (currently 3px). The final ✓ line should have green checkmark text specifically. Ensure phase 3 lines have a visible blue shimmer effect on appear.

### 9. Result cards — deal tag pill styling
Spec is specific: light blue bg `#EFF6FF`, blue text `#0166FF`, blue border. Current uses `bg-primary/10 border-primary/20` which is close but should match exactly. Rank change indicator should be amber, not blue.

### 10. Spacing tightening
Spec calls for 80-120px vertical padding between major sections. Current has `py-8 md:py-12` on LiveDemo (too tight) and `py-16 md:py-24` on ForDevelopers (fine). Standardize to `py-12 md:py-20` across sections. Reduce gap between hero and demo.

### 11. ForDevelopers — add "Copy Prompt" button and compatibility line
Missing: a "Copy Prompt" button below the agent prompt template, and the line "Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent."

---

## Phase 3: Interaction Enhancements

### 12. Sandbox — savings percentage and dollar amount
The price waterfall card should show a "You save $X.XX (XX%)" line below the net effective price. Currently only shows "True Cost" number.

### 13. Merchant compare — BEST VALUE badge
When sorted by True Cost, the lowest card should get a blue border + "BEST VALUE" badge (not just green "BEST" text). Currently uses green pill.

### 14. Number counting animation in sandbox
The `AnimatedNumber` component currently just fades opacity. Add actual number counting (interpolate from old to new value over 300ms) for a more polished feel.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/Demo.tsx` | Re-add sticky scenario picker bar, pass scenario to hero with full context |
| `src/components/demo/DemoHero.tsx` | Full agent context (all 6 memberships), richer before/after cards, CTA buttons |
| `src/components/demo/LiveDemo.tsx` | Remove scenario picker cards, fix phase 3 border to 4px, amber rank change, exact pill colors |
| `src/components/demo/DemoSandbox.tsx` | Add savings line, improve AnimatedNumber with counting, BEST VALUE badge styling |
| `src/components/demo/ForDevelopers.tsx` | Add Copy Prompt button, compatibility line |
| `src/components/demo/scenarioData.ts` | Update `apiJson` for all 3 scenarios to match spec JSON exactly |

---

## What NOT to change
- Section order is already correct (Hero → Live Demo → Sandbox → How It Works → Network → Developers → CTA)
- ShoppingIntelligence content and cards are fine
- MerchantNetwork is fine
- DemoFooterCTA is fine
- Overall design system usage is correct

