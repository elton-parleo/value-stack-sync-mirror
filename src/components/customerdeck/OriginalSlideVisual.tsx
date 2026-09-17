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

const sources: Record<SlideNumber, string> = {
  "01": slide01.url, "02": slide02.url, "03": slide03.url, "04": slide04.url,
  "05": slide05.url, "06": slide06.url, "07": slide07.url, "08": slide08.url,
  "09": slide09.url, "10": slide10.url, "11": slide11.url, "12": slide12.url,
  A1: slideA1.url,
};

const focalPoints: Record<SlideNumber, string[]> = {
  "01": ["78% 52%"],
  "02": ["22% 65%", "72% 64%"],
  "03": ["38% 65%", "82% 63%"],
  "04": ["20% 64%", "69% 63%"],
  "05": ["35% 64%", "78% 63%"],
  "06": ["23% 63%", "73% 62%"],
  "07": ["38% 64%", "82% 63%"],
  "08": ["36% 64%", "81% 63%"],
  "09": ["39% 64%", "84% 63%"],
  "10": ["35% 61%", "74% 70%"],
  "11": ["26% 64%", "76% 64%"],
  "12": ["76% 54%"],
  A1: ["29% 64%", "76% 64%"],
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
      <div className={`relative mt-8 border-y py-3 ${dark ? "border-background/20 bg-code-bg" : "border-foreground/15 bg-secondary"}`}>
        <div className="space-y-3">
          {focalPoints[number].map((point, index) => (
            <div key={point} className="relative aspect-[4/3] overflow-hidden border border-current/10 bg-background">
              <img
                src={sources[number]}
                alt={`Detail ${index + 1} from Parleo customer presentation slide ${number}`}
                className="h-full w-full scale-[1.82] object-cover"
                style={{ transformOrigin: point }}
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
        <div className="flex items-center justify-between px-1 pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-current/50">
          <span>Slide {number}</span><span>{focalPoints[number].length} details</span>
        </div>
      </div>

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