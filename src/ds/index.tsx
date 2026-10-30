import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { CountUp, EASE, Logo } from "@/components/primitives";

export { CountUp, EASE, Logo };

/** Section heading: the claim, then the accent phrase at 42%, then the blue end-mark. */
export function H({
  lead,
  accent,
  as: Tag = "h2",
  dark = false,
  serif = false,
  size,
  className = "",
  mark = true,
}: {
  lead: ReactNode;
  accent?: ReactNode;
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  serif?: boolean;
  size?: "sm";
  className?: string;
  mark?: boolean;
}) {
  /* the blue square is the full stop: never doubled with a period, never after ? or ! */
  const last = accent ?? lead;
  const ends = typeof last === "string" ? last.trim().slice(-1) : "";
  const strip = (n: ReactNode) => (mark && typeof n === "string" && n.trim().endsWith(".") ? n.trim().slice(0, -1) : n);
  const showMark = mark && ends !== "?" && ends !== "!";
  return (
    <Tag className={`hd ${dark ? "hd--dark" : ""} ${serif ? "hd--serif" : ""} ${size ? `hd--${size}` : ""} ${className}`}>
      {accent ? lead : strip(lead)}
      {accent && (
        <>
          {" "}
          <em>{strip(accent)}</em>
        </>
      )}
      {showMark && <span className="sq" aria-hidden="true" />}
    </Tag>
  );
}

/** Heading block with sub and optional right-side slot. Reveals on scroll. */
export function Head({
  lead,
  accent,
  sub,
  dark,
  center,
  right,
  as,
}: {
  lead: ReactNode;
  accent?: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
  right?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`sx__head ${center ? "sx__head--center" : ""} ${right ? "sx__head--row" : ""}`}>
      <div style={right ? { maxWidth: 860 } : undefined}>
        <Rise>
          <H lead={lead} accent={accent} dark={dark} as={as} />
        </Rise>
        {sub && (
          <Rise delay={0.06}>
            <p className={`sub ${dark ? "sub--dark" : ""}`}>{sub}</p>
          </Rise>
        )}
      </div>
      {right && <Rise delay={0.1}>{right}</Rise>}
    </div>
  );
}

export function Prov({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <p className={`prov ${dark ? "prov--dark" : ""}`}>{children}</p>;
}

/** Fade and lift once in view. */
export function Rise({
  children,
  delay = 0,
  y = 18,
  className,
  style,
  amount = 0.25,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Blurred lifestyle photograph faded into a corner of the section. */
export function Glow({ img, pos = "tr", style }: { img: string; pos?: "tr" | "tl" | "br" | "bl"; style?: CSSProperties }) {
  return (
    <div className={`glow glow--${pos}`} style={style} aria-hidden="true">
      <img src={img} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

export function LogoPill({ name, dark, label }: { name: string; dark?: boolean; label?: string }) {
  return (
    <span className={`lgpill ${dark ? "lgpill--dark" : ""}`}>
      <Logo name={name} size={20} />
      {label ?? name}
    </span>
  );
}

export function Lg({ name, size = 16, label }: { name: string; size?: number; label?: string }) {
  return (
    <span className="lg">
      <Logo name={name} size={size} />
      {label ?? name}
    </span>
  );
}

/** Score dial that fills when it scrolls into view. */
export function Dial({ value, of = 100, size = 168, stroke = 12, dark, label = "out of 100", fontSize }: { value: number; of?: number; size?: number; stroke?: number; dark?: boolean; label?: string; fontSize?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const r = 50 - stroke / 2;
  const c = 2 * Math.PI * r;
  const p = value / of;
  return (
    <div ref={ref} className={`dial ${dark ? "dial--dark" : ""}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={stroke * 0.62} className="dial__track" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={stroke * 0.62}
          className="dial__val"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={inView || reduce ? { strokeDashoffset: c * (1 - p) } : {}}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </svg>
      <div className="dial__c">
        <span className="dial__n" style={{ fontSize: fontSize ?? size * 0.3 }}>
          <CountUp to={value} />
        </span>
        <span className="dial__of">{label}</span>
      </div>
    </div>
  );
}

/** Horizontal meter that grows when in view. */
export function Meter({ value, dark, color, delay = 0, height }: { value: number; dark?: boolean; color?: string; delay?: number; height?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={`meter ${dark ? "meter--dark" : ""}`} style={height ? { height } : undefined}>
      <motion.i
        style={{ width: `${Math.max(1.5, value)}%`, background: color }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  );
}

/** Browser chrome around a product surface. */
export function Shell({ url, live, children, className = "", style }: { url: string; live?: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`bshell ${className}`} style={style}>
      <div className="bshell__bar">
        <span className="bshell__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="bshell__url">{url}</span>
        {live && <span className="bshell__live">{live}</span>}
      </div>
      {children}
    </div>
  );
}

export function Tick({ tone }: { tone?: "green" | "ghost" }) {
  return (
    <span className={`tick ${tone ? `tick--${tone}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Annot({ label, children, style, className = "" }: { label: string; children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <motion.div
      className={`annot ${className}`}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
    >
      <span className="ml">{label}</span>
      {children}
    </motion.div>
  );
}

export const img = (name: string, w = 1600) => `/img/${name}-${w}.webp`;
