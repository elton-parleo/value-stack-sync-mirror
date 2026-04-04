

# Plan: Avant-Garde Image System Redesign

## Problem

The current 10 lifestyle images feel like generic stock photography: standard cinematic warm tones, predictable compositions, and no ownable aesthetic. They also feel architecturally dropped in rather than integrated as design elements. The user's creative direction document calls for experimental, forward-looking imagery with unexpected crops, graphic treatments, orthographic perspectives, and textures (grain, halftone) that break default AI smoothness.

## Part 1: Define the Unified Visual Language

All 10 images will share one cohesive aesthetic system inspired by the user's design manifesto:

- **Perspective**: Flat, orthographic, graphic. No cinematic depth-of-field hero shots.
- **Composition**: Asymmetric, unexpected crops, deliberate occlusion, negative space as subject. Partial framing, off-center subjects, tight architectural crops.
- **Color**: Reject warm/teal cinematic defaults. Use mineral tones, muted earth + stone palettes with occasional acidic accent (a flash of electric blue or chartreuse). Colors pulled from architecture and textiles, not film color science.
- **Texture**: Visible grain, slight halftone or risograph-like ink behavior, photographic artifacts. Break AI smoothness.
- **Subject treatment**: Abstract-leaning. Products and environments seen graphically, not aspirationally. When people appear, they're cropped to hands/gestures/silhouettes, never posed portraits.
- **Consistent thread**: Every image should feel like it came from the same editorial shoot or zine. Think Apartamento magazine meets a Pentagram annual report, not Shutterstock meets Unsplash.

## Part 2: Image Regeneration (10 images, unified aesthetic)

All images regenerated with the new visual language. Prompts will enforce: flat/orthographic, asymmetric crop, mineral/stone palette, visible grain, no cinematic lighting, no stock feel.

| # | File | Subject | Prompt Direction |
|---|------|---------|-----------------|
| 1 | `lifestyle-skincare.jpg` | Skincare textures as graphic abstraction | Extreme close-up of cream textures on raw stone, orthographic flat, mineral palette, halftone grain, asymmetric crop with 40% negative space |
| 2 | `lifestyle-beauty-flatlay.jpg` | Beauty tools as geometric still life | Overhead flat-lay of brushes/compacts on concrete, strict grid arrangement, muted earth tones, risograph texture, off-axis crop cutting objects at edge |
| 3 | `lifestyle-fashion.jpg` | Fashion as architectural fragment | Cropped torso/hands in textured knit, flat lighting, stone/clay palette with one acidic blue thread detail, heavy grain, subject pushed to frame edge |
| 4 | `lifestyle-fragrance.jpg` | Perfume bottle as sculptural form | Single bottle on raw plaster surface, hard shadow as compositional element, monochromatic warm gray, orthographic angle, deliberate occlusion by frame edge |
| 5 | `lifestyle-tech.jpg` | Device as design object | Premium device on terrazzo surface, flat overhead, geometric shadow play, mineral tones, tight asymmetric crop, subtle halftone texture |
| 6 | `lifestyle-vanity.jpg` | Retail interior as abstract geometry | Architectural lines of luxury store, emptied of product, flat perspective, muted palette, heavy negative space, graphic quality like an architectural photograph |
| 7 | `lifestyle-unboxing.jpg` | Packaging as graphic composition | Hands pulling tissue from box, cropped tight to just hands and paper edge, flat warm gray palette, visible grain, paper texture visible |
| 8 | `lifestyle-hands-product.jpg` | Browsing as gesture study | Hands on phone screen, extreme crop showing only fingers and glass edge, blurred content, stone/concrete setting, flat light, grain |
| 9 | `lifestyle-editorial-portrait.jpg` | Person as silhouette/form | Figure from behind, cropped at shoulders, textured fabric visible, pushed to bottom-right of frame, 60% negative space above, mineral palette, grain |
| 10 | `lifestyle-retail-moment.jpg` | Shopping as spatial composition | Blurred store interior shot as color field, person as silhouette walking through warm golden geometry, flat perspective, heavy grain, almost abstract |

## Part 3: Architectural Integration Improvements

The current placement pattern feels disjointed. Improvements to how images participate in the layout:

### Hero strip (5 images)
- Keep the horizontal strip but make widths more deliberately varied with sharper contrast (one very wide, two narrow, two medium). Add a subtle shared `mix-blend-multiply` and consistent `grayscale(20%)` filter so they feel like a curated contact sheet rather than a product carousel.

### HowItWorks (2 images)
- Instead of two separate rounded rectangles, clip both images into one continuous composition using a `clip-path` or masking approach: one image visible through a tall narrow slit, the other through a wider shorter slit, creating a graphic diptych.

### DemoHero (1 image)
- Keep as large editorial image but add a consistent grain overlay via CSS `::after` pseudo-element and reduce border-radius to `rounded-lg` for a more editorial, less app-like feel.

### CTASection + DemoFooterCTA (accent images)
- Apply consistent `grayscale` + `mix-blend-multiply` treatment so accent images integrate with the warm background rather than sitting on top of it.

### Background accents (FeedSection, DashboardSection)
- Keep the ultra-low-opacity background treatments but increase blur slightly and apply `grayscale` so they read as tonal warmth rather than identifiable photographs.

## Technical Details

### Files regenerated (same paths, new aesthetic)
All 10 `src/assets/lifestyle-*.jpg` files regenerated with unified prompts via `google/gemini-3-pro-image-preview`.

### Files modified
- `src/components/HeroSection.tsx` — add `grayscale(20%) contrast(1.05)` filter and `mix-blend-multiply` to strip images; adjust widths for more editorial rhythm
- `src/components/HowItWorks.tsx` — restyle image pair as graphic diptych composition
- `src/components/demo/DemoHero.tsx` — add grain overlay, tighten border-radius
- `src/components/CTASection.tsx` — add `grayscale mix-blend-multiply` to accent image
- `src/components/demo/DemoFooterCTA.tsx` — same treatment
- `src/components/FeedSection.tsx` — increase blur, add grayscale to background accent
- `src/components/DashboardSection.tsx` — same treatment
- `src/components/demo/ShoppingIntelligence.tsx` — add consistent filter treatment

### No new files created
Same 10 image paths, regenerated in place.

### Image generation approach
- Model: `google/gemini-3-pro-image-preview` for highest quality
- Every prompt will include: "orthographic flat perspective, asymmetric composition, mineral/stone color palette, visible film grain, no cinematic lighting, no stock photography aesthetic, no symmetrical framing, editorial art direction, risograph-like texture"
- Post-generation: verify each image for AI smoothness tells and re-prompt if needed

