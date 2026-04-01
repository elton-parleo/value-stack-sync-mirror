

# Plan: Diversified Imagery + Warmer Background Tone

## Problem
Current images are too focused on beauty/skincare/fragrance, feel generic, some are repeated across sections, and the warm-toned photos clash with the cold technical background (`40 12% 97%`). Missing: people/lifestyle shots, fashion-forward imagery, and subtle background image treatments.

## Part 1: Warm the Background Tone

Shift the site's base color slightly warmer so lifestyle imagery blends naturally with the UI.

**File: `src/index.css`**
- `--background`: `40 12% 97%` → `36 14% 96%` (warmer, slightly more saturated)
- `--secondary` / `--muted`: shift from `30 5%` → `34 8%` range
- `--border`: `30 6% 83%` → `34 8% 85%` (warmer border)
- `--parleo-bg`: match new background
- Shadow tokens: keep as-is (neutral enough)

This creates a warmer canvas that bridges the electric blue UI and warm photography.

## Part 2: New Image Set (10 images, diverse categories)

Replace and expand the current 8 lifestyle images with 10 new ones. Each prompt emphasizes: editorial, cinematic contrast, shallow depth of field, ambient/unstaged, warm muted palette, no stock clichés.

| # | File | Subject | Used In |
|---|------|---------|---------|
| 1 | `lifestyle-skincare.jpg` | Close-up luxury skincare textures, creamy product on marble, warm side-light | Hero strip |
| 2 | `lifestyle-beauty-flatlay.jpg` | Minimal beauty tools on warm linen, off-axis crop, negative space | Hero strip |
| 3 | `lifestyle-fashion.jpg` | Person in understated luxury outfit, cropped torso/hands, natural light, editorial | Hero strip |
| 4 | `lifestyle-fragrance.jpg` | Architectural perfume bottle, warm light on stone surface, shallow DOF | Hero strip |
| 5 | `lifestyle-tech.jpg` | Hands holding premium device, warm ambient, blurred background, cinematic | Hero strip |
| 6 | `lifestyle-vanity.jpg` | Luxury retail interior, soft warm light, architectural lines, no people | HowItWorks image pair |
| 7 | `lifestyle-unboxing.jpg` | Hands opening luxury packaging, shallow DOF, warm tones, editorial crop | HowItWorks image pair |
| 8 | `lifestyle-hands-product.jpg` | Person browsing on phone in upscale setting, candid, fashion-forward styling | DemoHero |
| 9 | `lifestyle-editorial-portrait.jpg` *(new)* | Subtle portrait, person looking away, luxury fashion styling, muted warm tones, cinematic grain | New: background accent for FeedSection or DashboardSection |
| 10 | `lifestyle-retail-moment.jpg` *(new)* | Elevated retail/shopping moment, blurred store environment, warm golden light, person in frame | New: CTASection or DemoFooterCTA |

Key differences from current set:
- Images 3, 8, 9, 10 include **people** (faces/hands/lifestyle) for that understated luxury fashion ethos
- Much more diverse: fashion, tech, retail environments, not just beauty close-ups
- No repeats across sections
- Cinematic/editorial treatment, not generic stock

## Part 3: Integration Strategy

### Visible editorial images (keep current pattern, improve assignment)
- **Hero strip** (5 images): skincare, beauty-flatlay, fashion, fragrance, tech (all different, no repeats)
- **HowItWorks** (2 staggered images): vanity + unboxing
- **DemoHero** (1 large): hands-product / person browsing
- **CTASection** (1 side accent): retail-moment
- **DemoFooterCTA** (1 side accent): editorial-portrait

### Background accents (bring back, done right)
- **FeedSection**: `lifestyle-editorial-portrait.jpg` as a subtle right-side background accent, `opacity-[0.06]`, blurred, positioned behind the card grid. Not full-bleed, cropped to a vertical strip.
- **DashboardSection**: `lifestyle-retail-moment.jpg` as a very subtle background glow behind the dashboard mockup, `opacity-[0.04]`, adds warmth without competing.

These background treatments use extremely low opacity + blur so they add ambient warmth rather than competing with content.

## Technical Details

### Files modified
- `src/index.css` — warmer background/border/secondary tokens
- `src/components/HeroSection.tsx` — ensure no image repeats in strip
- `src/components/HowItWorks.tsx` — swap to new vanity/unboxing images
- `src/components/CTASection.tsx` — swap fragrance → retail-moment
- `src/components/FeedSection.tsx` — add subtle background accent
- `src/components/DashboardSection.tsx` — add subtle background accent
- `src/components/demo/DemoHero.tsx` — swap to new hands-product
- `src/components/demo/DemoFooterCTA.tsx` — swap beauty-flatlay → editorial-portrait
- `src/components/demo/ShoppingIntelligence.tsx` — swap skincare → fashion

### Files created
- `src/assets/lifestyle-editorial-portrait.jpg` (new)
- `src/assets/lifestyle-retail-moment.jpg` (new)

### Files regenerated (same filenames, better images)
- All 8 existing `lifestyle-*.jpg` files regenerated with improved prompts

### Image generation
- Use `google/gemini-3-pro-image-preview` for higher quality
- Prompts emphasize: editorial, cinematic, shallow DOF, warm muted tones, ambient/unstaged, no text, no stock clichés
- Portrait/people shots: cropped/partial, understated luxury styling, never posed or corporate

