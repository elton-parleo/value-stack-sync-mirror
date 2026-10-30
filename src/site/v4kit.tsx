import type { CSSProperties, ReactNode } from "react";

/* ================= v4 detail kit =================
   The small, owned pieces that make the site read as made, not assembled:
   one 20px icon set at a 1.5px stroke, real wordmarks used as data, the agents' own app icons,
   specimen tiles for real product cutouts, a status dot with a word, and the console's grid. */

/* ---------- Icons: one family, 20px box, 1.5px stroke, round joins ---------- */
export type IconName = "eye" | "trend" | "lock" | "clock" | "warn" | "fork" | "record" | "check" | "cross" | "bang" | "arrow" | "spark" | "layers" | "readback" | "dollar" | "people" | "tag" | "shield";
const PATHS: Record<IconName, ReactNode> = {
  eye: (
    <>
      <path d="M2.5 10s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5-7.5-5-7.5-5Z" />
      <circle cx="10" cy="10" r="2.3" />
    </>
  ),
  trend: <path d="M3 14.5 7.5 10l3 3L17 6.5M12.5 6.5H17V11" />,
  lock: (
    <>
      <rect x="4.5" y="9" width="11" height="8" rx="1.6" />
      <path d="M7 9V6.8a3 3 0 0 1 6 0V9" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4.2l2.6 1.6" />
    </>
  ),
  warn: (
    <>
      <path d="M10 3.2 17.4 16H2.6L10 3.2Z" />
      <path d="M10 8.2v3.6M10 13.9v.1" />
    </>
  ),
  /* TrueSync's mark: one record, fanned out to every surface */
  fork: (
    <>
      <circle cx="4.6" cy="10" r="2.1" />
      <path d="M6.7 10h3.1M9.8 10l5.2-4.6M9.8 10H15.6M9.8 10l5.2 4.6" />
      <circle cx="16.2" cy="5.2" r="0.9" fill="currentColor" />
      <circle cx="16.8" cy="10" r="0.9" fill="currentColor" />
      <circle cx="16.2" cy="14.8" r="0.9" fill="currentColor" />
    </>
  ),
  record: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="1.8" />
      <path d="M7 7h6M7 10h6M7 13h3.5" />
    </>
  ),
  check: <path d="M4.5 10.4 8.2 14l7.3-8" />,
  cross: <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />,
  bang: (
    <>
      <path d="M10 4.5v7" />
      <path d="M10 15v.1" />
    </>
  ),
  arrow: <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" />,
  spark: <path d="M10 2.8v4M10 13.2v4M2.8 10h4M13.2 10h4M5 5l2.6 2.6M12.4 12.4 15 15M15 5l-2.6 2.6M7.6 12.4 5 15" />,
  layers: (
    <>
      <path d="M10 3 17 6.8 10 10.6 3 6.8 10 3Z" />
      <path d="M3 10.2l7 3.8 7-3.8M3 13.6l7 3.8 7-3.8" />
    </>
  ),
  readback: (
    <>
      <path d="M16 10a6 6 0 1 1-1.8-4.3" />
      <path d="M16.4 3.6v3.2h-3.2" />
      <path d="M7.6 10.2 9.4 12l3.2-3.6" />
    </>
  ),
  dollar: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M12.3 7.6c-.4-.8-1.3-1.2-2.3-1.2-1.3 0-2.3.7-2.3 1.7 0 2.4 4.8 1.2 4.8 3.7 0 1-1 1.8-2.5 1.8-1.1 0-2.1-.5-2.5-1.3M10 5v1.4M10 13.6V15" />
    </>
  ),
  people: (
    <>
      <circle cx="7.4" cy="7.4" r="2.5" />
      <path d="M2.8 15.6c.6-2.4 2.4-3.8 4.6-3.8s4 1.4 4.6 3.8" />
      <path d="M12.6 5.2a2.4 2.4 0 1 1 0 4.6M14.2 12c1.4.4 2.4 1.6 2.9 3.6" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 10.3V4.2c0-.4.3-.7.7-.7h6.1l6.2 6.2c.3.3.3.7 0 1l-5.1 5.1c-.3.3-.7.3-1 0l-6.9-5.5Z" />
      <circle cx="7" cy="7" r="1.1" />
    </>
  ),
  shield: (
    <>
      <path d="M10 2.8 16 5v4.6c0 3.6-2.6 6.4-6 7.6-3.4-1.2-6-4-6-7.6V5l6-2.2Z" />
      <path d="M7.4 10 9.2 11.8l3.4-3.8" />
    </>
  ),
};
export function Icon({ n, size = 20, className = "", style }: { n: IconName; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`ic ${className}`} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
      {PATHS[n]}
    </svg>
  );
}

/* ---------- Agents: their own app icons ---------- */
const APPS: Record<string, string> = { ChatGPT: "chatgpt", Gemini: "gemini", "AI Mode": "google", "Google AI Mode": "google", Perplexity: "perplexity", Copilot: "copilot", Claude: "claude" };
export const AGENTS5 = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"];
export const AGENTS6 = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot", "Claude"];
export function App({ a, size = 18, className = "" }: { a: string; size?: number; className?: string }) {
  const f = APPS[a];
  if (!f) return null;
  return <img className={`app ${className}`} src={`/img/v4/app/${f}.png`} alt="" width={size} height={size} style={{ width: size, height: size }} loading="lazy" />;
}

/* ---------- Wordmarks, used as data: one optical size, set by cap height ----------
   k: file in /img/v4/logo, s: optical scale so marks of different shapes read the same size */
const MARKS: Record<string, { f: string; s: number }> = {
  nike: { f: "nike", s: 1.05 },
  adidas: { f: "adidas", s: 1.9 },
  target: { f: "target", s: 1.55 },
  nordstrom: { f: "nordstrom", s: 0.62 },
  gap: { f: "gap", s: 1.7 },
  hm: { f: "hm", s: 1.55 },
  petco: { f: "petco_notagline", s: 1.05 },
  chewy: { f: "chewy", s: 1.05 },
  amazon: { f: "amazon", s: 1.15 },
  walmart: { f: "walmart", s: 0.98 },
  purina: { f: "purina", s: 0.78 },
  rei: { f: "rei", s: 1.75 },
  patagonia: { f: "patagonia", s: 0.9 },
  dicks: { f: "dicks", s: 1.3 },
  samsclub: { f: "samsclub", s: 0.82 },
  petsmart: { f: "petsmart", s: 0.92 },
  uniqlo: { f: "uniqlo", s: 1.5 },
  zara: { f: "zara", s: 1.1 },
  jd: { f: "jdsports", s: 1.5 },
  footlocker: { f: "footlocker", s: 0.62 },
  macys: { f: "macys", s: 0.95 },
  hoka: { f: "hoka", s: 0.9 },
  oldnavy: { f: "oldnavy", s: 0.72 },
  google: { f: "google", s: 1.05 },
  gmc: { f: "google_shopping", s: 1.5 },
  openai: { f: "openai_mark", s: 1.5 },
  parleo: { f: "parleo_dark", s: 0.95 },
  bestbuy: { f: "bestbuy_sq", s: 1.55 },
  lowes: { f: "lowes_sq", s: 1.55 },
  sephora: { f: "sephora_sq", s: 1.4 },
  asos: { f: "asos_sq", s: 1.4 },
  ulta: { f: "ulta_sq", s: 1.4 },
};
export function Mark({ k, h = 14, dark = false, className = "", title }: { k: string; h?: number; dark?: boolean; className?: string; title?: string }) {
  const m = MARKS[k];
  if (!m) return <span className={`mark mark--txt ${className}`}>{title ?? k}</span>;
  const lw = dark && ["adidas", "chewy", "dicks", "gap", "hm", "nordstrom", "oldnavy", "petco", "rei", "samsclub", "walmart"].includes(k);
  return <img className={`mark ${dark ? "mark--dark" : ""} ${className}`} src={`/img/v4/${lw ? "logow" : "logo"}/${m.f}.png`} alt={title ?? ""} style={{ height: Math.round(h * m.s) }} decoding="async" />;
}

/* ---------- Specimen tile: a real product cutout on warm stone with a contact shadow ---------- */
export function Spec({ src, alt = "", className = "", fit = "contain", photo = false, style }: { src: string; alt?: string; className?: string; fit?: "contain" | "cover"; photo?: boolean; style?: CSSProperties }) {
  return (
    <span className={`spec ${photo ? "spec--photo" : ""} ${className}`} style={style}>
      <img src={`/img/v4/cut/${src}.webp`} alt={alt} loading="lazy" decoding="async" style={{ objectFit: fit }} />
    </span>
  );
}

/* ---------- Status: a square dot and a word ---------- */
export type StTone = "ok" | "bad" | "warn" | "held" | "off" | "blue";
export function St({ t, children, className = "" }: { t: StTone; children: ReactNode; className?: string }) {
  return (
    <span className={`st8 st8--${t} ${className}`}>
      <i />
      {children}
    </span>
  );
}

/* ---------- A big tabular figure with its unit set small and grey ---------- */
export function Fig({ n, of, className = "" }: { n: ReactNode; of?: ReactNode; className?: string }) {
  return (
    <b className={`fig ${className}`}>
      {n}
      {of && <small>{of}</small>}
    </b>
  );
}
