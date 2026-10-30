import { useState } from "react";
import { Head, useOnce } from "../kit";
import { Icon, Mark } from "../v4kit";
import { Chapter } from "./ui";

/* 05 · Prove. How Parleo puts a dollar figure on the answers, shown on Best Buy's own model from
   Parleo's Best Buy research, then the weekly readout that tracks it. Baselines are the report's;
   later weeks are measured, so they are drawn empty. */
/* each step: the figure, what it is, and the range left after it (low, high, in $bn) */
const MODEL: { op: string; n: string; k: string; lo: number; hi: number }[] = [
  { op: "", n: "$13.2bn", k: "Best Buy’s US online sales, last fiscal year", lo: 13.2, hi: 13.2 },
  { op: "×", n: "10% to 20%", k: "influenced by AI assistants", lo: 1.32, hi: 2.64 },
  { op: "×", n: "92 of 132", k: "best-seller answers that put another store first", lo: 0.92, hi: 1.84 },
  { op: "×", n: "10% to 20%", k: "of those shoppers who act on the pick", lo: 0.092, hi: 0.368 },
];
const LG0 = Math.log10(0.05);
const LG1 = Math.log10(13.2);
const lw = (v: number) => ((Math.log10(v) - LG0) / (LG1 - LG0)) * 100;
const bn = (v: number) => (v >= 1 ? `$${v.toFixed(v >= 10 ? 1 : 2)}bn` : `$${Math.round(v * 1000)}m`);
const STEPS = [
  { k: "Runs through an AI answer", r: 564 / 4950, note: "11.4% of shopping today" },
  { k: "In answers that go against you", r: 356 / 564, note: "another store first, or your price wrong" },
  { k: "At stake", r: 50 / 356, note: "lost picks plus missed price and offer" },
  { k: "Gainable with TrueSync", r: 20 / 50, note: "what fixing the record wins back" },
];
const PRESETS = [500e6, 1e9, 5e9, 20e9];
const LOG0 = Math.log10(100e6);
const LOG1 = Math.log10(50e9);

function money(v: number) {
  if (v >= 1e9) return `$${Number((v / 1e9).toFixed(v >= 10e9 ? 0 : 2))}B`;
  if (v >= 1e6) return `$${Number((v / 1e6).toFixed(v >= 10e6 ? 0 : 1))}M`;
  return `$${Math.round(v / 1e3)}K`;
}
function chain(sales: number, share: number) {
  const out: number[] = [];
  let v = sales * share;
  out.push(v);
  for (let i = 1; i < STEPS.length; i++) {
    v = v * STEPS[i].r;
    out.push(v);
  }
  return out;
}


const READ: [string, string][] = [
  ["Answers that put Best Buy first", "40 of 132"],
  ["Answers with a wrong or outdated Best Buy term", "13 of 165"],
];

export default function PProve() {
  const [ref, on] = useOnce<HTMLDivElement>(0.25);
  const [sales, setSales] = useState(4.95e9);
  const [y30, setY30] = useState(false);
  const [tab, setTab] = useState<"calc" | "read">("calc");
  const vals = chain(sales, y30 ? 0.2 : STEPS[0].r);
  const pos = ((Math.log10(sales) - LOG0) / (LOG1 - LOG0)) * 1000;

  return (
    <Chapter id="prove" tone="cool" className="ch6 pv6">
      <div className="wrap in6">
        <Head lead="Dollars," more="not dashboards." dark sq />
        <div className="in6__body">
          <p className="body body--dark">
            See what wrong answers cost you, what fixing them wins back, and what has changed since you started. <b>Your team gets one readout a week, in dollars, ready to forward.</b>
          </p>
        </div>
      </div>
      <div className={`wrap wrap--wide pv8 ${on ? "is-on" : ""}`} ref={ref}>
        <div className="pv8__body c8-dark">
          <aside className="pv8__stm">
            <span className="k8">
              <Mark k="bestbuy" h={13} title="Best Buy" /> Revenue at stake in AI answers
            </span>
            <div className="pv8__total">
              <b>$92m to $370m</b>
              <span>a year, mid point about $180m</span>
              <em className="chip8 chip8--dark">
                <i /> Modeled
              </em>
            </div>
            <ol className="pv8__model">
              {MODEL.map((m, i) => (
                <li key={m.k} style={{ ["--d" as string]: `${0.2 + i * 0.16}s` }}>
                  <i>{m.op || "\u00a0"}</i>
                  <div>
                    <b>{m.n}</b>
                    <span>{m.k}</span>
                  </div>
                  <span className="pv8__bar" aria-hidden="true">
                    <u style={{ width: `${lw(m.hi)}%` }} />
                    <s style={{ width: `${lw(m.lo)}%` }} />
                  </span>
                  <em>{m.lo === m.hi ? bn(m.hi) : `${bn(m.lo)} to ${bn(m.hi)}`}</em>
                </li>
              ))}
            </ol>
          </aside>
          <div className="pv8__panel">
            <div className="pv8__tabs" role="tablist" aria-label="Prove views">
              {(["calc", "read"] as const).map((t) => (
                <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? "is-on" : ""} onClick={() => setTab(t)}>
                  <Icon n={t === "calc" ? "dollar" : "trend"} size={14} />
                  {t === "calc" ? "Run your numbers" : "Monday readout"}
                </button>
              ))}
            </div>
            {tab === "calc" ? (
              <div className="pv8__calc">
                <div className="pv8__in">
                  <label htmlFor="pv-sales">Your product sales, a year, all channels</label>
                  <b>{money(sales)}</b>
                  <input id="pv-sales" type="range" min={0} max={1000} value={pos} onChange={(e) => setSales(Math.pow(10, LOG0 + (+e.target.value / 1000) * (LOG1 - LOG0)))} aria-valuetext={money(sales)} />
                  <div className="pv8__opts">
                    {PRESETS.map((p) => (
                      <button key={p} type="button" className={Math.abs(p - sales) / p < 0.004 ? "is-on" : ""} onClick={() => setSales(p)}>
                        {money(p)}
                      </button>
                    ))}
                    <span className="pv8__when">
                      <button type="button" className={!y30 ? "is-on" : ""} onClick={() => setY30(false)}>
                        Today
                      </button>
                      <button type="button" className={y30 ? "is-on" : ""} onClick={() => setY30(true)}>
                        By 2030
                      </button>
                    </span>
                  </div>
                </div>
                <ol className="pv8__steps">
                  {STEPS.map((st, i) => (
                    <li key={st.k} className={i === 3 ? "is-gain" : i === 2 ? "is-stake" : ""}>
                      <span>
                        {st.k}
                        <small>{i === 0 ? (y30 ? "20% of shopping by 2030" : st.note) : `${Math.round(st.r * 100)}% of the step before`}</small>
                      </span>
                      <i>
                        <u style={{ width: `${Math.max((vals[i] / vals[0]) * 100, 3)}%` }} />
                      </i>
                      <b>{money(vals[i])}</b>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="pv8__read">
                {READ.map(([k, v]) => (
                  <div key={k} className="pv8__row">
                    <span>{k}</span>
                    <div className="pv8__weeks" aria-hidden="true">
                      <i className="is-base" />
                      {[1, 2, 3, 4, 5, 6].map((w) => (
                        <i key={w} />
                      ))}
                    </div>
                    <b>
                      {v}
                      <small>baseline</small>
                    </b>
                  </div>
                ))}
                <div className="pv8__wk">
                  <span>Week 0</span>
                  <span>Week 6</span>
                </div>
                <p className="pv8__won">
                  <b>Revenue won back.</b> Modeled from the answers until your order data connects, then measured.
                </p>
                <div className="pv8__to">
                  <span>Goes to</span>
                  {["Ecommerce", "Pricing", "Loyalty"].map((t) => (
                    <em key={t}>
                      <i>{t.slice(0, 2).toUpperCase()}</i>
                      {t}
                    </em>
                  ))}
                  <b>
                    <Icon n="arrow" size={13} /> Forward
                  </b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="wrap">
        <p className="src pv6__src">Best Buy, from Parleo research. Modeled from the study, not a forecast. Calculator ratios from the Petco workspace.</p>
      </div>
    </Chapter>
  );
}
