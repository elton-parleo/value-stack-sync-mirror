import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_APPLE = [0.32, 0.72, 0, 1] as const;

/* ---------- Wordmark: two-bar glyph + PARLEO, never the text alone ---------- */
export function Glyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size * 1.15} height={size} viewBox="0 0 46 40" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="0" y="0" width="19" height="40" rx="6" fill="#0166FF" />
      <rect x="27" y="9" width="15" height="22" rx="5" fill="#7FB0FF" />
    </svg>
  );
}

export function Wordmark({ size = 15, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span className="wordmark" style={{ display: "inline-flex", alignItems: "center", gap: size * 0.6 }}>
      <Glyph size={size * 1.05} />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          fontSize: size,
          letterSpacing: "0.015em",
          color: dark ? "var(--dark-text)" : "var(--ink)",
          lineHeight: 1,
        }}
      >
        PARLEO
      </span>
    </span>
  );
}

/* ---------- Logo chip: real favicons, never a typed brand name ---------- */
const DOMAINS: Record<string, string> = {
  ChatGPT: "chatgpt.com",
  Gemini: "gemini.google.com",
  Perplexity: "perplexity.ai",
  Copilot: "copilot.microsoft.com",
  "AI Mode": "google.com",
  Google: "google.com",
  Claude: "claude.ai",
  Anthropic: "claude.ai",
  OpenAI: "openai.com",
  Amazon: "amazon.com",
  Walmart: "walmart.com",
  Target: "target.com",
  Chewy: "chewy.com",
  Petco: "petco.com",
  REI: "rei.com",
  adidas: "adidas.com",
  Gap: "gap.com",
  "Gap Inc.": "gap.com",
  Ulta: "ulta.com",
  "Ulta Beauty": "ulta.com",
  Nordstrom: "nordstrom.com",
  Pampers: "pampers.com",
  Sephora: "sephora.com",
  Shopify: "shopify.com",
  Stripe: "stripe.com",
  Profound: "tryprofound.com",
  Bluefish: "bluefishai.com",
  Brandlight: "brandlight.ai",
  Salsify: "salsify.com",
  Syndigo: "syndigo.com",
  "Kimberly-Clark": "kimberly-clark.com",
};

export function Logo({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const d = DOMAINS[name];
  if (!d) return null;
  return (
    <img
      src={`/logos/${d}.png`}
      alt=""
      width={size}
      height={size}
      className={className}
      loading="lazy"
      style={{ width: size, height: size, borderRadius: Math.max(3, size * 0.22), flexShrink: 0 }}
    />
  );
}

export function LogoChip({ name, dark = false, size = 16 }: { name: string; dark?: boolean; size?: number }) {
  return (
    <span className={`chip ${dark ? "chip--dark" : ""}`}>
      <Logo name={name} size={size} />
      {name}
    </span>
  );
}

/* ---------- Reveal: fade-up on enter, once ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  style,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li" | "figure";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.62, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/* ---------- Count-up number ---------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.3,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={`num ${className}`}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Section heading: lead claim, blue square end-mark ---------- */
export function SectionHeading({
  children,
  dark = false,
  as: Tag = "h2",
  className = "",
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag className={`h-section ${dark ? "h-section--dark" : ""} ${className}`} style={style}>
      {children}
      <span className="sq" aria-hidden="true" />
    </Tag>
  );
}

/* ---------- Buttons ---------- */
type BtnProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "blue" | "ink" | "outline" | "outline-dark" | "ghost" | "ghost-dark";
  size?: "lg" | "md" | "sm";
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};
export function Btn({ to, href, onClick, variant = "blue", size = "md", arrow, children, className = "", type = "button", disabled }: BtnProps) {
  const cls = `btn btn--${variant} ${size === "lg" ? "btn--lg" : size === "sm" ? "btn--sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="arrow" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

/* ---------- Glyphs: restrained line icons with the visibility notch ---------- */
const PATHS: Record<string, ReactNode> = {
  eye: (
    <>
      <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z" />
      <circle cx="8" cy="8" r="2.1" />
    </>
  ),
  check: <path d="M2.8 8.6l3.4 3.4 7-7.6" />,
  x: <path d="M4 4l8 8M12 4l-8 8" />,
  arrowRight: <path d="M2.5 8h11M9.5 4l4 4-4 4" />,
  refresh: <path d="M13.5 6.5a5.7 5.7 0 0 0-10.4-1.2M2.5 2.7v3.1h3.1M2.5 9.5a5.7 5.7 0 0 0 10.4 1.2M13.5 13.3v-3.1h-3.1" />,
  layers: <path d="M8 2l6.5 3.2L8 8.4 1.5 5.2 8 2ZM2.6 8.4L8 11l5.4-2.6M2.6 11.4L8 14l5.4-2.6" />,
  doc: <path d="M4 1.5h5.5L13 5v9.5H4V1.5ZM9.5 1.5V5H13M6 8h4M6 10.7h4" />,
  tag: (
    <>
      <path d="M1.8 8.2V2h6.3l6 6-6.2 6.2-6-6Z" />
      <circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  chart: <path d="M2.5 13.5V10M6.2 13.5V6.5M9.8 13.5V8.5M13.5 13.5V3.5" />,
  agent: (
    <>
      <rect x="2" y="2.5" width="5" height="11" rx="1.8" />
      <rect x="9.5" y="5" width="4.5" height="6" rx="1.6" />
    </>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5l3.5 3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.6V8l2.4 1.6" />
    </>
  ),
  shield: <path d="M8 1.8l5.5 2v4.2c0 3.4-2.3 5.6-5.5 6.8-3.2-1.2-5.5-3.4-5.5-6.8V3.8l5.5-2Z" />,
  grid: <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />,
  globe: (
    <>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4M8 1.8c1.9 1.7 2.8 3.9 2.8 6.2S9.9 12.5 8 14.2C6.1 12.5 5.2 10.3 5.2 8S6.1 3.5 8 1.8Z" />
    </>
  ),
};
export function Glyph2({ name, size = 16, color = "currentColor", notch = true }: { name: keyof typeof PATHS; size?: number; color?: string; notch?: boolean }) {
  const id = `n${name}${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block" }} aria-hidden="true">
      {notch && (
        <mask id={id}>
          <rect width="16" height="16" fill="#fff" />
          <circle cx="13.1" cy="2.9" r="3.5" fill="#000" />
        </mask>
      )}
      <g mask={notch ? `url(#${id})` : undefined}>{PATHS[name]}</g>
      {notch && <rect x="11.95" y="0.85" width="2.3" height="4.1" rx="1.15" fill="var(--blue)" stroke="none" />}
    </svg>
  );
}

/* ---------- Picture: responsive generated image ---------- */
export function Pic({
  name,
  sizes,
  alt = "",
  className = "",
  style,
  widths,
  eager = false,
}: {
  name: string;
  sizes: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  widths: number[];
  eager?: boolean;
}) {
  const srcSet = widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img src={`/img/${name}.jpg`} alt={alt} className={className} style={style} loading={eager ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}
