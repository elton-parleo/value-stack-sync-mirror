import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Logo as ProofLogo } from "@/components/primitives";

/* ---------- Section heading: lead claim, optional muted continuation ----------
   The blue square is the full stop, so it replaces the period, never follows it.
   It goes on three headings a page at most (sq). The last word and the square never break apart.
   The muted continuation is kept for headlines that turn on their second half; ink sets it whole. */
function tail(t: ReactNode, sq: boolean) {
  if (!sq) return t;
  const mark = <i className="sq" aria-hidden="true" />;
  if (typeof t !== "string") return <>{t}{mark}</>;
  /* a question or an exclamation keeps its own mark: the square never doubles the punctuation */
  if (/[?!]\s*$/.test(t)) return t;
  const txt = t.replace(/[.]\s*$/, "");
  const i = txt.lastIndexOf(" ");
  return (
    <>
      {i > 0 ? txt.slice(0, i + 1) : ""}
      <span className="sh__nw">
        {txt.slice(i + 1)}
        {mark}
      </span>
    </>
  );
}

export function Head({ lead, more, sq = false, ink = false, dark = false, as: Tag = "h2", className = "", size = "l" }: { lead: ReactNode; more?: ReactNode; sq?: boolean; ink?: boolean; dark?: boolean; as?: "h1" | "h2" | "h3"; className?: string; size?: "l" | "m" }) {
  return (
    <Tag className={`sh sh--${size} ${dark ? "sh--dark" : ""} ${ink ? "sh--ink" : ""} ${className}`}>
      {more ? (
        <>
          <span className="sh__lead">{lead}</span>
          <span className="sh__more"> {tail(more, sq)}</span>
        </>
      ) : (
        <span className="sh__lead">{tail(lead, sq)}</span>
      )}
    </Tag>
  );
}

/* ---------- Responsive picture from /img/<name>-<w>.webp ---------- */
export function Img({ name, widths, sizes, alt = "", className = "", style, eager = false }: { name: string; widths: number[]; sizes: string; alt?: string; className?: string; style?: CSSProperties; eager?: boolean }) {
  const srcSet = widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <picture className="pic">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img src={`/img/${name}.jpg`} alt={alt} className={className} style={style} loading={eager ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

/* ---------- In view, once ---------- */
export function useOnce<T extends Element>(amount = 0.3) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);
  return [ref, on] as const;
}

/* ---------- Status chip: the only place status colour lives ---------- */
export type Tone = "red" | "amber" | "green" | "blue" | "grey";
export function Chip({ tone, children, dark = false }: { tone: Tone; children: ReactNode; dark?: boolean }) {
  return <em className={`chip2 chip2--${tone} ${dark ? "chip2--dark" : ""}`}>{children}</em>;
}

/* ---------- Pins on a photograph ----------
   The picture box keeps the crop's own aspect ratio, so pin coordinates are plain fractions of the
   source photo. crop / cropM are [x0, y0, x1, y1] windows into the photo for desktop and phones.
   Desktop: a ring on the object, a hairline, a white chip. Narrow screens: numbered rings on the photo
   and the chips as a list underneath, so nothing covers the picture or gets cut off.
   Children render inside the frame (absolute on desktop, in flow on phones), never inside the picture box. */
export type PinT = { x: number; y: number; k: string; v?: ReactNode; st?: string; tone?: Tone; blue?: boolean; dx?: number; dy?: number; side?: "l" | "r" };
export type Crop = [number, number, number, number];

function win(c: Crop | undefined, ratio: number) {
  const [x0, y0, x1, y1] = c ?? [0, 0, 1, 1];
  const w = x1 - x0;
  const h = y1 - y0;
  return {
    ar: (ratio * w) / h,
    img: { w: 100 / w, h: 100 / h, l: (-x0 / w) * 100, t: (-y0 / h) * 100 },
    at: (x: number, y: number) => ({ x: ((x - x0) / w) * 100, y: ((y - y0) / h) * 100 }),
  };
}

export function Pinned({ name, widths, ratio, pins, alt, className = "", sizes = "100vw", children, on = true, dark = false, crop, cropM }: { name: string; widths: number[]; ratio: number; pins: PinT[]; alt: string; className?: string; sizes?: string; children?: ReactNode; on?: boolean; dark?: boolean; crop?: Crop; cropM?: Crop }) {
  const d = win(crop, ratio);
  const m = win(cropM ?? crop, ratio);
  const vars = {
    "--ar": d.ar,
    "--arm": m.ar,
    "--iw": `${d.img.w}%`,
    "--ih": `${d.img.h}%`,
    "--il": `${d.img.l}%`,
    "--it": `${d.img.t}%`,
    "--iwm": `${m.img.w}%`,
    "--ihm": `${m.img.h}%`,
    "--ilm": `${m.img.l}%`,
    "--itm": `${m.img.t}%`,
  } as CSSProperties;
  const inside = (q: { x: number; y: number }) => q.x >= 2 && q.x <= 98 && q.y >= 2 && q.y <= 98;
  return (
    <figure className={`pinned ${on ? "is-on" : ""} ${dark ? "pinned--dark" : ""} ${className}`}>
      <div className="pinned__frame">
        <div className="pinned__pic" style={vars}>
          <Img name={name} widths={widths} sizes={sizes} alt={alt} className="pinned__img" />
          <div className="pinned__layer" aria-hidden="true">
            {pins.map((p, i) => {
              const side = p.side ?? "r";
              const dx = p.dx ?? (side === "r" ? 34 : -34);
              const dy = p.dy ?? -26;
              const pd = d.at(p.x, p.y);
              const pm = m.at(p.x, p.y);
              const cls = `pin ${p.blue ? "pin--blue" : ""} pin--${side} ${inside(pd) ? "" : "pin--outd"} ${inside(pm) ? "" : "pin--outm"}`;
              return (
                <span key={i} className={cls} style={{ ["--px" as string]: `${pd.x}%`, ["--py" as string]: `${pd.y}%`, ["--pxm" as string]: `${pm.x}%`, ["--pym" as string]: `${pm.y}%`, ["--d" as string]: `${0.12 + i * 0.14}s` }}>
                  <i className="pin__ring">
                    <b>{i + 1}</b>
                  </i>
                  <svg className="pin__lead" width="1" height="1">
                    <line x1="0" y1="0" x2={dx} y2={dy} />
                  </svg>
                  <span className="pin__chip" style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px` }}>
                    <b>{p.k}</b>
                    {p.v && <span>{p.v}</span>}
                    {p.st && <Chip tone={p.tone ?? "grey"}>{p.st}</Chip>}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        {children}
      </div>
      <ol className="pinned__list">
        {pins.map((p, i) => (
          <li key={i} className={p.blue ? "is-blue" : ""}>
            <i>{i + 1}</i>
            <b>{p.k}</b>
            {p.v && <span>{p.v}</span>}
            {p.st && <Chip tone={p.tone ?? "grey"}>{p.st}</Chip>}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ---------- Provenance line ---------- */
export function Src({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`src ${dark ? "src--dark" : ""}`}>{children}</p>;
}

/* ---------- Perspective: map a flat w x h box onto four points (TL, TR, BR, BL) ----------
   Returns a CSS matrix3d for transform-origin 0 0. Used to put UI onto photographed screens and paper. */
type M3 = number[];
const adj = (m: M3): M3 => [m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4], m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5], m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]];
const mm = (a: M3, b: M3): M3 => {
  const c: M3 = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) c[3 * i + j] = a[3 * i] * b[j] + a[3 * i + 1] * b[3 + j] + a[3 * i + 2] * b[6 + j];
  return c;
};
const mv = (m: M3, v: number[]) => [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
const basis = (p: number[]) => {
  const m = [p[0], p[2], p[4], p[1], p[3], p[5], 1, 1, 1];
  const v = mv(adj(m), [p[6], p[7], 1]);
  return mm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
};
export function quadMatrix(w: number, h: number, q: [number, number][]) {
  const [tl, tr, br, bl] = q;
  const s = basis([0, 0, w, 0, 0, h, w, h]);
  const d = basis([tl[0], tl[1], tr[0], tr[1], bl[0], bl[1], br[0], br[1]]);
  const t = mm(d, adj(s)).map((x, _i, a) => x / a[8]);
  return `matrix3d(${t[0]},${t[3]},0,${t[6]},${t[1]},${t[4]},0,${t[7]},0,0,1,0,${t[2]},${t[5]},0,${t[8]})`;
}

/* ---------- A public case Parleo found, and the way into the audit ---------- */
export function toAudit(mode?: "brand" | "retailer") {
  const el = document.getElementById("audit");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
  if (mode) {
    const r = el.querySelector(`input[name="mode"][value="${mode}"]`) as HTMLInputElement | null;
    if (r) r.checked = true;
  }
}
export function Proof({ logo, co, children, cta, mode }: { logo: string; co: string; children: ReactNode; cta: string; mode?: "brand" | "retailer" }) {
  return (
    <div className="proof proof6">
      <span className="proof__co">
        <span className="proof6__tile">
          <ProofLogo name={logo} size={26} />
        </span>
        <em>{co}</em>
      </span>
      <p>{children}</p>
      <a
        className="proof__cta"
        href="#audit"
        onClick={(e) => {
          e.preventDefault();
          toAudit(mode);
        }}
      >
        {cta} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

/* ---------- v8: a designed number. The figure, its base, and a segmented meter that fills on sight,
   the way the console draws counts. Caps at 20 cells so big bases still read as a proportion. ---------- */
export function Stat({ n, of, k, tone = "blue", dark = false, size = "m", className = "" }: { n: number | string; of?: number; k?: ReactNode; tone?: "blue" | "ink" | "red"; dark?: boolean; size?: "s" | "m" | "l"; className?: string }) {
  const [ref, on] = useOnce<HTMLDivElement>(0.4);
  const num = typeof n === "number" ? n : parseFloat(String(n));
  const cells = of ? Math.min(of, 20) : 0;
  const filled = of && !Number.isNaN(num) ? Math.round((num / of) * cells) : 0;
  return (
    <div ref={ref} className={`st8 st8--${tone} st8--${size} ${dark ? "st8--dark" : ""} ${on ? "is-on" : ""} ${className}`}>
      <div className="st8__fig">
        <b>{n}</b>
        {of !== undefined && <span className="st8__of">of {of}</span>}
      </div>
      {cells > 0 && (
        <i className="st8__meter" aria-hidden="true" style={{ ["--c" as string]: cells } as CSSProperties}>
          {Array.from({ length: cells }, (_, j) => (
            <u key={j} className={j < filled ? "is-f" : ""} style={{ ["--j" as string]: j } as CSSProperties} />
          ))}
        </i>
      )}
      {k && <span className="st8__k">{k}</span>}
    </div>
  );
}

/* ---------- v8: quiet motion. Section heads and marked blocks rise in once as they arrive. ---------- */
export function useReveal(sel = ".in6 > .sh, .in6__body, [data-rv]") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter((el) => !el.closest("[data-hero]") && el.getBoundingClientRect().top > window.innerHeight * 0.9);
      els.forEach((el) => {
        el.classList.add("rv8");
        if (el.classList.contains("in6__body")) el.style.setProperty("--rv", "0.12s");
      });
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => io.observe(el));
    }, 60);
    return () => window.clearTimeout(t);
  }, [sel]);
}

/* ---------- v8: the Parleo read on a photo. Blue registration brackets lock onto one product, a label
   names it and a scan line passes once, so the brand's blue reads on every still. Box is in fractions
   of the source image; the overlay follows object-fit: cover at any container size. ---------- */
export function Scan({ box, label, ar = 16 / 9, pos = [0.5, 0.5], on = true, below = false }: { box: [number, number, number, number]; label?: ReactNode; ar?: number; pos?: [number, number]; on?: boolean; below?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [r, setR] = useState<CSSProperties>({});
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const fit = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s = Math.max(W / ar, H) ;
      const iw = Math.max(W, H * ar);
      const ih = iw / ar;
      void s;
      const ox = (W - iw) * pos[0];
      const oy = (H - ih) * pos[1];
      setR({ left: ox + box[0] * iw, top: oy + box[1] * ih, width: (box[2] - box[0]) * iw, height: (box[3] - box[1]) * ih });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ar, pos, box]);
  return (
    <div ref={ref} className={`scan8 ${on ? "is-on" : ""} ${below ? "is-below" : ""}`} style={r} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <span className="scan8__line" />
      {label && <b className="scan8__label">{label}</b>}
    </div>
  );
}
