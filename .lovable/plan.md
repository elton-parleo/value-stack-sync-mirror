

# Pentagram-Inspired Editorial Image Strip

## What Changes

### 1. Remove category labels
Strip out the text tags ("Skincare", "Beauty", etc.) and the gradient overlay — these make it look like a category nav. The images should feel like an editorial mood strip, not clickable tiles.

### 2. Varied, rhythmic sizing
Instead of mostly-uniform sizes, give each image a distinct width and height to create visual tension — like a magazine editorial layout. Mix portrait, landscape, and square crops. Stagger heights so they don't align on a single baseline.

Key sizing pattern (5 images):
- **Skincare**: narrow + tall (portrait)
- **Beauty**: wide + short (landscape)  
- **Fashion**: medium + tall (tallest, hero of the strip)
- **Fragrance**: small square
- **Tech**: wide + medium height

Use `align-items: end` on the flex container so images anchor to the bottom, creating an organic ragged top edge.

### 3. Regenerate Skincare & Beauty images
Current skincare/beauty images feel generic. Regenerate with more editorial, Pentagram-style prompts:
- **Skincare**: Abstract close-up of cream texture on stone, dramatic lighting, almost sculptural
- **Beauty**: Deconstructed beauty tools on raw linen, asymmetric composition, negative space, overhead angle

### 4. Design details (Pentagram ethos)
- Reduce border-radius from `rounded-xl` to `rounded-sm` (2px) — sharper, more editorial
- Remove hover scale effect — not interactive, purely visual
- Reduce gap between images slightly
- Add a subtle stagger animation where each image enters at a slightly different Y offset

### Files Modified
- `src/components/HeroSection.tsx` — remove labels, remove gradient overlays, new sizing logic, sharper corners, bottom-aligned flex
- `src/assets/lifestyle-skincare.jpg` — regenerated (more abstract/editorial)
- `src/assets/lifestyle-beauty-flatlay.jpg` — regenerated (more deconstructed/editorial)

