import type { ReactNode } from "react";
import { AGENTS5, App } from "../v4kit";

/* Console pieces for the product page: the window, ticks and small status marks.
   Cool canvas (rail, sheet, white cards, wells), blue is the record, grey is what agents say. */
export function Win({ title, sub, tabs, tab, onTab, children, foot, className = "", icon }: { title: ReactNode; sub?: ReactNode; tabs?: string[]; tab?: number; onTab?: (i: number) => void; children: ReactNode; foot?: ReactNode; className?: string; sync?: string; icon?: ReactNode }) {
  return (
    <div className={`cw ${className}`}>
      <div className="cw__chrome">
        <span className="cw__title">
          {icon}
          <b>{title}</b>
          {sub && <span>{sub}</span>}
        </span>
        <span className="cw__meta cw__agents" aria-hidden="true">
          {AGENTS5.map((a) => (
            <App key={a} a={a} size={16} />
          ))}
        </span>
      </div>
      {tabs && (
        <div className="cw__tabs" role="tablist">
          {tabs.map((t, i) => (
            <button key={t} role="tab" type="button" aria-selected={tab === i} className={tab === i ? "is-on" : ""} onClick={() => onTab?.(i)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="cw__body">{children}</div>
      {foot && <div className="cw__foot">{foot}</div>}
    </div>
  );
}

export function Tick({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.8 5.2 L4.1 7.4 L8.4 2.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* a chapter: copy on one side, the working piece on the other or underneath */
export function Chapter({ id, children, tone = "warm", className = "" }: { id: string; children: ReactNode; tone?: "warm" | "cool"; className?: string }) {
  return (
    <section className={`sec ch ch--${tone} ${className}`} id={id} data-chapter={id}>
      {children}
    </section>
  );
}
