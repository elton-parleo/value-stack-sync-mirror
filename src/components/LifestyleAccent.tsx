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
  tr: { top: "0%", right: "0%" },
  tl: { top: "0%", left: "0%" },
  br: { bottom: "0%", right: "0%" },
  bl: { bottom: "0%", left: "0%" },
};

const cornerMask: Record<Corner, string> = {
  tr: "radial-gradient(65% 65% at 78% 22%, #000 30%, transparent 85%)",
  tl: "radial-gradient(65% 65% at 22% 22%, #000 30%, transparent 85%)",
  br: "radial-gradient(65% 65% at 78% 78%, #000 30%, transparent 85%)",
  bl: "radial-gradient(65% 65% at 22% 78%, #000 30%, transparent 85%)",
};

const LifestyleAccent = ({
  variant,
  corner = "tr",
  size = 52,
  opacity = 0.42,
  blur = 6,
  className = "",
}: Props) => {
  const mask = cornerMask[corner];
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        position: "absolute",
        zIndex: 0,
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
          filter: `blur(${blur}px) saturate(0.95) contrast(1)`,
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default LifestyleAccent;
