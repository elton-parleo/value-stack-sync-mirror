import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide01 from "@/assets/customerdeck/original-slides/01.png.asset.json";
import slide02 from "@/assets/customerdeck/original-slides/02.png.asset.json";
import slide03 from "@/assets/customerdeck/original-slides/03.png.asset.json";
import slide04 from "@/assets/customerdeck/original-slides/04.png.asset.json";
import slide05 from "@/assets/customerdeck/original-slides/05.png.asset.json";
import slide06 from "@/assets/customerdeck/original-slides/06.png.asset.json";
import slide07 from "@/assets/customerdeck/original-slides/07.png.asset.json";
import slide08 from "@/assets/customerdeck/original-slides/08.png.asset.json";
import slide09 from "@/assets/customerdeck/original-slides/09.png.asset.json";
import slide10 from "@/assets/customerdeck/original-slides/10.png.asset.json";
import slide11 from "@/assets/customerdeck/original-slides/11.png.asset.json";
import slide12 from "@/assets/customerdeck/original-slides/12.png.asset.json";
import slideA1 from "@/assets/customerdeck/original-slides/A1.png.asset.json";

type SlideNumber = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "A1";

type Crop = { x: number; y: number; width: number; height: number; label: string };

const sources: Record<SlideNumber, string> = {
  "01": slide01.url, "02": slide02.url, "03": slide03.url, "04": slide04.url,
  "05": slide05.url, "06": slide06.url, "07": slide07.url, "08": slide08.url,
  "09": slide09.url, "10": slide10.url, "11": slide11.url, "12": slide12.url,
  A1: slideA1.url,
};

const crops: Record<SlideNumber, Crop[]> = {
  "01": [{ x: 39, y: 19, width: 58, height: 66, label: "Product truth published to every agent" }],
  "02": [
    { x: 5, y: 21, width: 29, height: 59, label: "The funnel collapses into one chat window" },
    { x: 35, y: 21, width: 60, height: 18, label: "The shopper's question" },
    { x: 39, y: 36, width: 56, height: 43, label: "The agent's product recommendation" },
  ],
  "03": [
    { x: 5, y: 32, width: 64, height: 49, label: "Commerce scoreboards by era" },
    { x: 70, y: 32, width: 25, height: 49, label: "The new algorithmic scoreboard" },
  ],
  "04": [
    { x: 5, y: 24, width: 26, height: 63, label: "Category exposure and modeled revenue" },
    { x: 32, y: 24, width: 63, height: 63, label: "Agentic exposure by category" },
  ],
  "05": [
    { x: 5, y: 29, width: 21, height: 43, label: "Connected product truth" },
    { x: 26, y: 20, width: 45, height: 57, label: "Parleo's verify and publish workflow" },
    { x: 72, y: 25, width: 23, height: 48, label: "Every agent surface" },
  ],
  "06": [
    { x: 5, y: 26, width: 28, height: 61, label: "The product and current offer" },
    { x: 34, y: 26, width: 61, height: 61, label: "Sticker price compared with true value" },
  ],
  "07": [
    { x: 5, y: 27, width: 63, height: 48, label: "Brand investment reaching the agent" },
    { x: 68, y: 27, width: 27, height: 48, label: "The decision layer" },
  ],
  "08": [
    { x: 5, y: 25, width: 34, height: 60, label: "The product comparison" },
    { x: 39, y: 25, width: 36, height: 60, label: "Member value calculation" },
    { x: 76, y: 25, width: 19, height: 60, label: "Retailer advantage" },
  ],
  "09": [
    { x: 18, y: 26, width: 77, height: 26, label: "Agent channel performance" },
    { x: 18, y: 50, width: 77, height: 42, label: "Recommendation queue and recoverable revenue" },
  ],
  "10": [
    { x: 5, y: 25, width: 45, height: 47, label: "Publish once" },
    { x: 51, y: 25, width: 44, height: 47, label: "Read back what agents say" },
    { x: 28, y: 72, width: 67, height: 17, label: "Automatic drift detection" },
  ],
  "11": [
    { x: 5, y: 33, width: 44, height: 54, label: "Diagnostic and visibility" },
    { x: 50, y: 33, width: 45, height: 54, label: "Syndication and agentic pricing" },
  ],
  "12": [{ x: 63, y: 25, width: 32, height: 48, label: "A sample audit result" }],
  A1: [
    { x: 5, y: 27, width: 44, height: 62, label: "Samar Birwadker" },
    { x: 51, y: 27, width: 44, height: 62, label: "Elton Cheung" },
  ],
};

export const OriginalSlideVisual = ({ number, dark = false }: { number: SlideNumber; dark?: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [expanded]);

  return (
    <>
      <figure className={`relative mt-8 border-y py-3 ${dark ? "border-background/20 bg-code-bg" : "border-foreground/15 bg-secondary"}`}>
        <div className="space-y-3">
          {crops[number].map((crop, index) => (
            <div
              key={crop.label}
              className="relative overflow-hidden border border-current/10 bg-background"
              style={{ aspectRatio: `${crop.width * 16} / ${crop.height * 9}` }}
            >
              <img
                src={sources[number]}
                alt={crop.label}
                className="absolute max-w-none"
                style={{
                  width: `${10000 / crop.width}%`,
                  height: `${10000 / crop.height}%`,
                  left: `${-100 * crop.x / crop.width}%`,
                  top: `${-100 * crop.y / crop.height}%`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-current/10" />
              {index === focalPoints[number].length - 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-3 right-3 h-9 w-9 rounded-full"
                  aria-label={`Open full slide ${number}`}
                  onClick={() => setExpanded(true)}
                >
                  <Expand className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-current/50">
          <span>Original slide {number}</span><span>Tap to expand</span>
        </figcaption>
      </figure>

      {expanded && (
        <div className="fixed inset-0 z-[100] bg-code-bg text-background" role="dialog" aria-modal="true" aria-label={`Full slide ${number}`}>
          <div className="flex h-12 items-center justify-between border-b border-background/15 px-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]">Parleo · {number}</span>
            <Button type="button" size="icon" variant="ghost" className="h-9 w-9 rounded-full text-background" onClick={() => setExpanded(false)} aria-label="Close full slide">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="h-[calc(100dvh-3rem)] overflow-auto overscroll-contain bg-code-bg p-3">
            <img src={sources[number]} alt={`Full original Parleo customer presentation slide ${number}`} className="mx-auto min-w-[900px] max-w-none" />
          </div>
        </div>
      )}
    </>
  );
};