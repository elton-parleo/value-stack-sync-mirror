import type { CSSProperties } from "react";
import { postNumber, type Post } from "@/content/insights";

interface Focal {
  /** Focal point as 0-1 fractions of the source image. */
  x: number;
  y: number;
  /** Macro zoom applied around the focal point. */
  zoom: number;
}

/**
 * Each insight artwork is a dense 1600px infographic. Shrunk whole into a
 * card it reads as noise, so thumbnails render a macro crop around the
 * image's key detail instead. Tuned per article.
 */
const FOCAL: Record<string, Focal> = {
  "how-big-is-agentic-commerce": { x: 0.7, y: 0.45, zoom: 2.0 },
  "loyalty-when-the-customer-is-an-agent": { x: 0.3, y: 0.56, zoom: 2.0 },
  "trade-spend-when-agents-shop": { x: 0.16, y: 0.55, zoom: 1.7 },
  "how-ai-shopping-agents-decide": { x: 0.35, y: 0.45, zoom: 2.0 },
  "inside-the-agentic-value-audit": { x: 0.22, y: 0.42, zoom: 2.0 },
  "share-of-algorithm": { x: 0.76, y: 0.58, zoom: 2.2 },
  "how-agents-pick-the-best-price": { x: 0.78, y: 0.12, zoom: 2.1 },
  "incentives-are-becoming-pricing-rails": { x: 0.76, y: 0.6, zoom: 1.8 },
  "new-shelf-is-not-human": { x: 0.72, y: 0.72, zoom: 2.1 },
};

const DEFAULT_FOCAL: Focal = { x: 0.5, y: 0.45, zoom: 1.9 };

interface InsightThumbProps {
  post: Post;
  /** Tailwind aspect class for the frame. */
  aspect?: string;
  sizes?: string;
  /** Show the blue "Detail. NN" specimen tag. */
  detail?: boolean;
  className?: string;
}

const InsightThumb = ({
  post,
  aspect = "aspect-[4/3]",
  sizes,
  detail = true,
  className = "",
}: InsightThumbProps) => {
  const f = FOCAL[post.slug] ?? DEFAULT_FOCAL;
  const num = String(postNumber(post.slug)).padStart(2, "0");

  return (
    <div
      className={`relative overflow-hidden border border-border bg-card ${aspect} ${className}`}
    >
      <img
        src={post.image}
        alt={post.imageAlt}
        loading="lazy"
        sizes={sizes}
        style={
          {
            transformOrigin: `${f.x * 100}% ${f.y * 100}%`,
            "--zoom": String(f.zoom),
          } as CSSProperties
        }
        className="h-full w-full scale-[var(--zoom)] object-cover transition-transform duration-700 ease-out group-hover:scale-[calc(var(--zoom)*1.06)]"
      />
      {/* Hairline specimen grid */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "25% 33.3334%",
        }}
      />
      {detail && (
        <span className="absolute bottom-0 left-0 bg-primary px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-primary-foreground">
          Detail. {num}
        </span>
      )}
    </div>
  );
};

export default InsightThumb;
