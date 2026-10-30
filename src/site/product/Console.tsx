import type { ReactNode } from "react";
import { Icon, Mark } from "../v4kit";

/* The console's signature modules, staged for the site: the revenue card, the lead-signal card with
   its photograph, and the split statement module (navy finding on the left, the data on the right). */

export function Revenue({ total, line, by2030, today, parts }: { total: string; line: ReactNode; by2030: ReactNode; today?: ReactNode; parts: { k: string; v: string; d: string; tone: "lost" | "missed" | "gain"; w: number }[] }) {
  const lost = parts.find((p) => p.tone === "lost")?.w ?? 0;
  const missed = parts.find((p) => p.tone === "missed")?.w ?? 0;
  const gain = parts.find((p) => p.tone === "gain")?.w ?? 0;
  const sum = lost + missed;
  return (
    <article className="rv">
      <header className="rv__h">
        <span className="rv8__t">
          <i className="ic8 ic8--dark">
            <Icon n="dollar" size={15} />
          </i>
          Revenue at stake in AI answers, today
        </span>
        <em>Modeled</em>
      </header>
      <div className="rv__top">
        <b className="rv__n">
          {total}
          <small>a year</small>
        </b>
        <p className="rv__line">{line}</p>
      </div>
      <p className="rv__by">
        {by2030} {today}
      </p>
      <div className="rv__bar" aria-hidden="true">
        <i className="is-lost" style={{ width: `${(lost / sum) * 100}%` }} />
        <i className="is-missed" style={{ width: `${(missed / sum) * 100}%` }} />
        <u style={{ width: `${(gain / sum) * 100}%` }} />
      </div>
      <div className="rv__parts">
        {parts.map((p) => (
          <div key={p.k} className={`is-${p.tone}`}>
            <span>
              <i className="rv8__ic">
                <Icon n={p.tone === "lost" ? "people" : p.tone === "missed" ? "tag" : "fork"} size={13} />
              </i>
              {p.k}
            </span>
            <b>{p.v}</b>
            <em>{p.d}</em>
          </div>
        ))}
      </div>
    </article>
  );
}

export function Lead({ tone = "navy", photo, pos = "50% 50%", chip, head, a, b, todo, team, ok, className = "", brand }: { brand?: string; tone?: "navy" | "green" | "ink"; photo: string; pos?: string; chip: string; head: string; a: { who: ReactNode; n: string; of: string; k: string; blue?: boolean }; b: { who: ReactNode; n: string; of?: string; k: string }; todo: string; team: string; ok: string; className?: string }) {
  return (
    <article className={`lc lc--${tone} ${className}`}>
      <div className="lc__photo" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} />
      </div>
      <div className="lc__body">
        {brand && (
          <span className="lc8__brand">
            <Mark k={brand} h={15} title={brand} />
          </span>
        )}
        <span className="lc__chip">
          <i /> Lead signal <em>{chip}</em>
        </span>
        <h3 className="lc__h">{head}</h3>
        <div className="lc__nums">
          <div>
            <span className="lc__who">{a.who}</span>
            <b className={`lc__n ${a.blue ? "is-blue" : ""}`}>
              {a.n}
              <small>{a.of}</small>
            </b>
            <span className="lc__k">{a.k}</span>
          </div>
          <div>
            <span className="lc__who">{b.who}</span>
            <b className="lc__n">
              {b.n}
              {b.of && <small>{b.of}</small>}
            </b>
            <span className="lc__k">{b.k}</span>
          </div>
        </div>
        <div className="lc__do">
          <span>Do</span>
          <p>{todo}</p>
        </div>
        <div className="lc__own">
          <span className="lc__team">{team.slice(0, 2).toUpperCase()}</span>
          <span>{team}</span>
          <em className={ok.startsWith("Awaiting") ? "is-wait" : ""}>
            <Icon n={ok.startsWith("Awaiting") ? "clock" : "check"} size={13} /> {ok}
          </em>
        </div>
      </div>
    </article>
  );
}

/* split statement: navy finding left, white data panel right, like the console's chapter heads */
export function Statement({ eyebrow, n, of, line, why, children, className = "" }: { eyebrow: string; n: string; of: string; line: ReactNode; why: ReactNode; children: ReactNode; className?: string }) {
  return (
    <article className={`stm ${className}`}>
      <div className="stm__l">
        <span className="stm__eb">{eyebrow}</span>
        <b className="stm__n">
          {n}
          <small>{of}</small>
        </b>
        <p className="stm__line">{line}</p>
        <span className="stm__wk">Why it matters</span>
        <p className="stm__why">{why}</p>
      </div>
      <div className="stm__r">{children}</div>
    </article>
  );
}

export function Who({ marks, label, dark = true }: { marks: string[]; label?: string; dark?: boolean }) {
  return (
    <>
      {marks.map((m) => (
        <Mark key={m} k={m} h={11} dark={dark} />
      ))}
      {label && <span>{label}</span>}
    </>
  );
}
