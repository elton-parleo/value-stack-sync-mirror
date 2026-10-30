import { Btn } from "@/components/primitives";
import { Head, Logo, Meter, Prov, Rise } from "@/ds";
import "./shared.css";

const STEPS = [
  { k: "Day 0 to 7", t: "Baseline", d: "Your team confirms 20 SKUs and the surfaces. The audit questions re-run on them, so the before is a measured count." },
  { k: "Day 7 to 20", t: "Publish", d: "Records go live at Parleo's endpoint and over MCP. Your markup and feeds follow on your engineers' schedule." },
  { k: "Day 20 to 45", t: "Read back weekly", d: "Same questions, same five agents, every week. Drift flagged, fixes queued, each answer beside the live page." },
  { k: "Day 45", t: "Decide", d: "Before and after against targets agreed at kickoff, on a date set at the start.", end: true },
];
const READOUT = [
  { m: "Checkout price right", c: "Agents quote the price a shopper pays", got: 0, of: 28 },
  { m: "Member value cited", c: "Encore in worth-full-price answers", got: 18, of: 77 },
  { m: "Story carried", c: "The collaboration named in jeans answers", got: 0, of: 66 },
];

/** The 45-day pilot: a timeline and the readout it ends in. */
export default function Pilot() {
  return (
    <section className="sx pilot" id="pilot">
      <div className="wrap">
        <Head lead="A 45-day pilot on 20 SKUs." accent="Before and after, side by side." sub="Nothing from your engineers in week one. Targets are agreed before kickoff, so the decision on day 45 is a count, not a story." />
        <div className="split split--57 split--stretch">
          <Rise className="card pilot__tl">
            {STEPS.map((s, i) => (
              <div key={s.k} className={`pilot__step ${s.end ? "is-end" : ""}`}>
                <span className="pilot__dot">{i + 1}</span>
                <div>
                  <span className="ml">{s.k}</span>
                  <b>{s.t}</b>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </Rise>
          <Rise className="card card--elev pilot__ro" delay={0.08}>
            <div className="pilot__ro-top">
              <Logo name="Gap" size={18} />
              <b>Pilot readout</b>
              <span className="st st--ink">Template</span>
            </div>
            <p className="pilot__ro-sub">Baselines from the Gap Inc. audit, Oct 21. The after column fills on day 45, never before.</p>
            {READOUT.map((r) => (
              <div key={r.m} className="pilot__row">
                <div className="pilot__row-k">
                  <b>{r.m}</b>
                  <span>{r.c}</span>
                </div>
                <div className="pilot__vals">
                  <div className="is-before">
                    <span>Before</span>
                    <b className="tnum">
                      {r.got} of {r.of}
                    </b>
                  </div>
                  <div className="is-after">
                    <span>Day 45</span>
                    <b>to measure</b>
                  </div>
                </div>
                <div className="pilot__meter">
                  <Meter value={(r.got / r.of) * 100} color="#EF4343" height={5} />
                </div>
              </div>
            ))}
            <div className="pilot__ctas">
              <Btn to="/agentic-value-audit#request" variant="blue" arrow>
                Scope a pilot
              </Btn>
              <span>Scope and price come from a 30-minute call.</span>
            </div>
          </Rise>
        </div>
        <Prov>Pilot readout template. Baselines: Gap Inc. Agentic Value Audit, Oct 21, 2026, 876 answers, five agents.</Prov>
      </div>
    </section>
  );
}
