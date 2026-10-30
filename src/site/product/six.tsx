import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Head, Img, useOnce, Scan } from "../kit";
import { Icon } from "../v4kit";

type IconName = Parameters<typeof Icon>[0]["n"];

/* v6 chapter kit: one opener, one still with the product truth drawn on it, three points underneath.
   Cards sit on the photo on desktop and stack under it on a phone. */
export function Opener({ lead, more, children }: { lead: string; more?: string; children: ReactNode }) {
  return (
    <div className="wrap in6">
      <Head lead={lead} more={more} sq />
      <div className="in6__body">
        <p className="body">{children}</p>
      </div>
    </div>
  );
}

export function Still({ img, widths = [900, 1440, 2048], alt, pos = "50% 50%", ratio = 2.2, children, className = "", src, scan }: { img?: string; widths?: number[]; src?: string; alt: string; pos?: string; ratio?: number; children?: ReactNode; className?: string; scan?: { box: [number, number, number, number]; label: string; below?: boolean; pos?: [number, number] } }) {
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  return (
    <div className={`wrap wrap--wide`}>
      <div className={`st6 ${on ? "is-on" : ""} ${className}`} ref={ref} style={{ ["--ar" as string]: ratio, ["--pos" as string]: pos } as CSSProperties}>
        <div className="st6__pic">
          {img ? <Img name={img} widths={widths} sizes="(max-width: 1400px) 100vw, 1368px" alt={alt} /> : <img src={src} alt={alt} loading="lazy" decoding="async" />}
          {scan && <Scan box={scan.box} label={scan.label} below={scan.below} pos={scan.pos} on={on} />}
        </div>
        <div className="st6__layer">{children}</div>
      </div>
    </div>
  );
}

/* a card placed on the still: x, y as percentages of the frame, w in px */
export function Card({ x, y, w, d = 0, children, className = "", dark = false }: { x: number; y: number; w: number; d?: number; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`st6__card ${dark ? "is-dark" : ""} ${className}`} style={{ ["--x" as string]: `${x}%`, ["--y" as string]: `${y}%`, ["--w" as string]: `${w}px`, ["--d" as string]: `${d}s` } as CSSProperties}>
      {children}
    </div>
  );
}

export function Points({ items, note }: { items: { i: IconName; k: string; d: string }[]; note?: ReactNode }) {
  return (
    <div className="wrap">
      <ul className="pt6">
        {items.map((p) => (
          <li key={p.k}>
            <span className="pt6__i">
              <Icon n={p.i} size={18} />
            </span>
            <b>{p.k}</b>
            <p>{p.d}</p>
          </li>
        ))}
      </ul>
      {note && <p className="src pt6__note">{note}</p>}
    </div>
  );
}

/* a score ring that fills once in view */
export function Ring({ n, of = 100, size = 76 }: { n: number; of?: number; size?: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <span className="rg6" style={{ width: size, height: size, ["--c" as string]: c, ["--off" as string]: c * (1 - n / of) } as CSSProperties}>
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={r} className="rg6__t" />
        <circle cx="36" cy="36" r={r} className="rg6__a" />
      </svg>
      <b>
        {n}
        <small>/{of}</small>
      </b>
    </span>
  );
}

/* photo on one side, the product's cards on the other; pins draw onto the photo */
export function Split({ img, widths = [900, 1440, 2048], alt, pos = "50% 50%", side, pins, flip = false, className = "", ar = 16 / 9 }: { img: string; widths?: number[]; alt: string; pos?: string; side: ReactNode; pins?: ReactNode; flip?: boolean; className?: string; ar?: number }) {
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  const pic = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  /* pins sit in image coordinates: size the layer to the picture's object-fit cover box */
  useEffect(() => {
    const p = pic.current;
    const l = layer.current;
    if (!p || !l) return;
    const [px, py] = pos.split(" ").map((v) => parseFloat(v) / 100);
    const fit = () => {
      const w = p.clientWidth;
      const h = p.clientHeight;
      const iw = Math.max(w, h * ar);
      const ih = iw / ar;
      l.style.width = `${iw}px`;
      l.style.height = `${ih}px`;
      l.style.left = `${(w - iw) * px}px`;
      l.style.top = `${(h - ih) * py}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(p);
    return () => ro.disconnect();
  }, [ar, pos]);
  return (
    <div className="wrap wrap--wide">
      <div className={`sp6 ${flip ? "is-flip" : ""} ${on ? "is-on" : ""} ${className}`} ref={ref} style={{ ["--pos" as string]: pos } as CSSProperties}>
        <div className="sp6__pic" ref={pic}>
          <Img name={img} widths={widths} sizes="(max-width: 900px) 100vw, 60vw" alt={alt} />
          {pins && (
            <div className="sp6__pins" ref={layer}>
              {pins}
            </div>
          )}
        </div>
        <div className="sp6__side">{side}</div>
      </div>
    </div>
  );
}

export function Pin({ x, y, d = 0, children, flip = false }: { x: number; y: number; d?: number; children: ReactNode; flip?: boolean }) {
  return (
    <span className={`pn6 ${flip ? "is-flip" : ""}`} style={{ ["--x" as string]: `${x}%`, ["--y" as string]: `${y}%`, ["--d" as string]: `${d}s` } as CSSProperties}>
      <i />
      <span>{children}</span>
    </span>
  );
}
