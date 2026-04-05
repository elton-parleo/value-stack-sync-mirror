

# Plan: Complete Image System Regeneration

## Problem
The current lifestyle images feel generic and AI-generated despite multiple iterations. They lack the authored, editorial quality described in your design preferences: compositions feel algorithmic rather than directed, color palettes default to warm cinematic tones, and subjects are treated literally rather than graphically. The images don't contribute to the site's aura or feel like they came from the same intentional editorial system.

## Approach

Regenerate all 10 images using prompts that lean hard into your preferences document, specifically: **graphic integration** (photos as design elements, not illustrations), **composed editorial** framing, **abstraction over literalism**, and **visible process** (grain, texture, materiality). Every image will be prompted to feel like a crop from a Pentagram annual report or Apartamento magazine spread, not a product shot.

## Image Regeneration Plan

The key shift: treat each image as an **abstract color field or textural composition** that evokes its category through materiality and form, not through literal product depiction. No bottles, no brushes, no phones as hero subjects.

| # | File | Current Problem | New Direction |
|---|------|----------------|---------------|
| 1 | `lifestyle-skincare.jpg` | Looks like a perfume ad, not skincare | **Abstract texture study**: extreme macro of cream being dragged across raw travertine stone. Just texture, edge, negative space. Muted ivory and warm clay tones. Tight crop where the cream edge bisects the frame asymmetrically. |
| 2 | `lifestyle-beauty-flatlay.jpg` | Repetitive grid pattern, artificial | **Deconstructed still life**: single compact mirror and a powder brush on poured concrete, shot from above at a slight angle. Deliberate shadow as compositional element. Objects pushed to lower-right corner, 60% negative space. Desaturated warm tones. |
| 3 | `lifestyle-fashion.jpg` | Orange sweater feels stock-y | **Architectural fabric**: extreme close-up of woven textile fibers, almost abstract. The weave pattern becomes geometric. Monochrome warm gray with one thread of electric blue visible. Flat, orthographic, no depth of field. |
| 4 | `lifestyle-tech.jpg` | Phone on terrazzo, generic | **Device as geometry**: overhead shot of a dark device edge cutting diagonally across a light concrete surface. Only a sliver of the device visible. Hard shadow creates a second geometric line. Mineral gray palette. |
| 5 | `lifestyle-vanity.jpg` | Too much blank white space | **Retail as negative space**: minimalist shelf with a single object, shot through a doorframe or architectural opening that masks 40% of the image. Warm stone tones, flat perspective, the architecture dominates over the product. |
| 6 | `lifestyle-unboxing.jpg` | Packaging looks generic | **Paper as material**: tight crop of tissue paper edge being folded, showing paper grain and fiber. Hands cropped to just fingertips at frame edge. Warm off-white palette, the paper texture IS the subject. |
| 7 | `lifestyle-hands-product.jpg` | Browsing gesture not compelling | **Gesture as abstraction**: hands holding a card or thin object, cropped so tight only two fingers and the object edge are visible. Shot against a raw plaster wall. Flat light, visible grain, almost monochrome. |
| 8 | `lifestyle-editorial-portrait.jpg` | Person/silhouette not working | **Figure as form**: back of a head/shoulders, heavily cropped, pushed to bottom-right corner. Textured fabric (linen or raw cotton) visible. 65% of frame is warm empty wall. Grain overlay. No face visible at all. |
| 9 | `lifestyle-retail-moment.jpg` | Blurry store interior, unclear | **Color field**: an out-of-focus interior shot where architecture becomes pure warm color blocks. A vertical line (doorframe or column) divides the composition. Almost abstract expressionist. Warm amber and stone tones. |
| 10 | `lifestyle-fragrance.jpg` | Not currently in hero strip but used elsewhere | **Shadow study**: a single glass object casting a long diagonal shadow on a flat matte surface. The shadow is the subject, not the object. High contrast, mineral palette, orthographic overhead angle. |

## Prompt Engineering Strategy

Every prompt will include this base directive to enforce consistency:
- "Editorial photography, not product photography. Shot by a design-focused photographer for an architecture or design magazine. Orthographic or flat perspective. Asymmetric composition with deliberate negative space. Muted mineral and stone color palette with warm off-white tones. Visible film grain and paper-like texture. No cinematic lighting, no depth of field blur, no centered subjects, no symmetrical framing. The image should feel like a considered crop from a larger composition. Must not look AI-generated."

Model: `google/gemini-3-pro-image-preview` for maximum quality.

## Component Updates

No structural changes to components. The existing CSS treatments (`grayscale(15%) contrast(1.05)`, `mix-blend-multiply`) will unify the new images with the warm `#F2F0EF` background even better since the new images are already in a mineral/stone palette rather than fighting against it with saturated colors.

## Files Changed
- 10 image files regenerated in `src/assets/`
- No component code changes needed

