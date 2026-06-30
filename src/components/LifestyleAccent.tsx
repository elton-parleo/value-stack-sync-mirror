import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

/**
 * Subtle editorial image accent. Bleeds from a corner, blurred and tinted into
 * the warm neutral background. Designed to feel like a print-edition vignette,
 * not a decorative photo. Always wrap parent in `relative overflow-hidden`.
 */

const SOURCES = {
  skincare: lifestyleSkincare,
  fragrance: lifestyleFragrance,
  fashion: lifestyleFashion,
  tech: lifestyleTech,
} as const;

type Corner = "tr" | "tl" | "br" | "bl";

type Props = {
  variant: keyof typeof SOURCES;
  corner?: Corner;
  /** width of image in vw — defaults to 46 */
  size?: number;
  /** image opacity 0–1 — defaults to 0.18 */
  opacity?: number;
  /** blur in px — defaults to 14 */
  blur?: number;
  className?: string;
};

const cornerStyle: Record<Corner, React.CSSProperties> = {
  tr: { top: "-6%", right: "-8%" },
  tl: { top: "-6%", left: "-8%" },
  br: { bottom: "-8%", right: "-8%" },
  bl: { bottom: "-8%", left: "-8%" },
};

const cornerMask: Record<Corner, string> = {
  tr: "radial-gradient(70% 70% at 85% 15%, #000 0%, transparent 75%)",
  tl: "radial-gradient(70% 70% at 15% 15%, #000 0%, transparent 75%)",
  br: "radial-gradient(70% 70% at 85% 85%, #000 0%, transparent 75%)",
  bl: "radial-gradient(70% 70% at 15% 85%, #000 0%, transparent 75%)",
};

const LifestyleAccent = ({
  variant,
  corner = "tr",
  size = 46,
  opacity = 0.18,
  blur = 14,
  className = "",
}: Props) => {
  const mask = cornerMask[corner];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{
        ...cornerStyle[corner],
        width: `${size}vw`,
        maxWidth: 720,
        aspectRatio: "1 / 1",
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <img
        src={SOURCES[variant]}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{
          opacity,
          filter: `blur(${blur}px) saturate(0.78) contrast(0.96)`,
          mixBlendMode: "multiply",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default LifestyleAccent;
