import { useState, type CSSProperties } from "react";
import { useOnce } from "../kit";
import { Icon, Mark } from "../v4kit";
import { Chapter, Tick } from "./ui";
import { Card, Opener, Points, Still } from "./six";

/* 04 · Fix. Lowe's, from Parleo's Lowe's research: next-day delivery and installation came up in none
   of 99 appliance answers. The three fixes come from that report's findings. Revenue at stake is the
   report's modeled range. */
type Fx = { k: string; team: string; st: "ok" | "wait" | "rev"; s: string };
const FIXES: Fx[] = [
  { k: "Carry next-day delivery and installation on every appliance record", team: "Ecommerce", st: "ok", s: "Approved" },
  { k: "Put an end date on every sale price agents can quote", team: "Pricing", st: "rev", s: "In review" },
  { k: "Show what the Lowe’s card adds to an appliance answer", team: "Credit", st: "wait", s: "Needs sign-off" },
];

/* The Petco workspace fix queue, restored from v4: open a fix, see who has to say yes, sign it. */
type Col = "decide" | "flight" | "queued" | "shipped";
type Fix = { id: string; k: string; d: string; v: number; own: string; col: Col; chain: string[]; signed: number; cond?: string };
const START: Fix[] = [
  { id: "03", k: "Open a verified-agent path at the edge", d: "Cloudflare and DataDome refuse every plain agent request. Signed agents should get the catalog.", v: 6.2, own: "Security", col: "decide", chain: ["Security", "Legal"], signed: 0 },
  { id: "02", k: "Fix “repeat delivery” copy on WholeHearted pages", d: "Petco pages still say “Save 35% w/ repeat delivery.” Replace with Autoship on 12 pages.", v: 1.1, own: "Content", col: "decide", chain: ["Content"], signed: 0 },
  { id: "01", k: "Publish phase 1 Autoship prices on 14 SKUs", d: "Pro Plan, Purina ONE, Tidy Cats, Hill's and Merrick ladders, plus standard first-order prices. Rx excluded.", v: 4.8, own: "Pricing", col: "flight", chain: ["Pricing", "Loyalty"], signed: 2, cond: "Ship the 10/31 end date with every Pro Plan offer." },
  { id: "04", k: "Publish the Petco Perks rename everywhere agents read", d: "One program name across every surface.", v: 1.6, own: "Loyalty", col: "flight", chain: ["Loyalty"], signed: 1 },
  { id: "05", k: "Attach the Rx first-order terms to NexGard PLUS", d: "Rx terms confirmed before they publish.", v: 0.9, own: "Legal", col: "queued", chain: ["Legal"], signed: 0 },
  { id: "06", k: "Align the Fancy Feast category promise with the product page", d: "The category page and the product page say different things.", v: 0.7, own: "Merchandising", col: "queued", chain: ["Merchandising"], signed: 0 },
  { id: "08", k: "Connect order data for Impact", d: "Measured dollars replace modeled ones.", v: 0, own: "Data", col: "queued", chain: ["Data"], signed: 0 },
  { id: "07", k: "Share the ladder evidence with Purina", d: "Sent from the partner seat.", v: 2.3, own: "Partnerships", col: "shipped", chain: ["Partnerships"], signed: 1 },
];
const SIGNED: Record<string, string> = { Pricing: "Tue 10:12", Loyalty: "Tue 11:40", Partnerships: "Mon 16:05" };
const COLS: [Col, string][] = [
  ["decide", "Needs a decision"],
  ["flight", "Approved, in flight"],
  ["queued", "Queued"],
  ["shipped", "Shipped"],
];

function FixQueue() {
  const [ref, on] = useOnce<HTMLDivElement>(0.2);
  const [fixes, setFixes] = useState(START);
  const [open, setOpen] = useState("03");
  const f = fixes.find((x) => x.id === open)!;

  const sign = () =>
    setFixes((fs) =>
      fs.map((x) => {
        if (x.id !== open) return x;
        const signed = x.signed + 1;
        return { ...x, signed, col: signed >= x.chain.length && x.col === "decide" ? "flight" : x.col };
      }),
    );

  const waiting = fixes.filter((x) => x.col === "decide").length;
  return (
    <div className={`wrap wrap--wide fx8 ${on ? "is-on" : ""}`} ref={ref}>
      <div className="fx8__body c8-dark">
        <aside className="fx8__stm" key={open} aria-live="polite">
          <span className="k8">Fix queue, ranked by dollars</span>
          <div className="cn8__n">
            <b>{waiting}</b>
            <span>of {fixes.length} fixes wait on a decision</span>
          </div>
          <div className="fx8__sel">
            <span className="fx8__id">
              Fix {f.id} <i /> {f.own}
            </span>
            <b className="fx8__title">{f.k}</b>
            <span className="fx8__v">{f.v ? <>${f.v}M a year, modeled</> : "Turns modeled into measured"}</span>
          </div>
          <span className="k8">Who has to say yes</span>
          <ol className="fx8__chain">
            {f.chain.map((o, j) => {
              const done = j < f.signed;
              const next = j === f.signed;
              return (
                <li key={o} className={done ? "is-ok" : next ? "is-next" : ""}>
                  <i>{done ? <Tick /> : j + 1}</i>
                  <span>{o}</span>
                  {next && f.col !== "shipped" && (
                    <button type="button" className="fx8__sign" onClick={sign}>
                      Approve
                    </button>
                  )}
                  {done && <em>Signed {SIGNED[o] ?? "just now"}</em>}
                </li>
              );
            })}
            <li className={f.signed >= f.chain.length ? "is-next" : ""}>
              <i>{f.chain.length + 1}</i>
              <span>{f.col === "shipped" ? "Shipped" : "Publishes to every surface"}</span>
            </li>
          </ol>
        </aside>
        <div className="fx8__board">
          {COLS.map(([c, label]) => {
            const items = fixes.filter((x) => x.col === c).sort((a, b) => b.v - a.v);
            return (
              <div key={c} className={`fx8__col is-${c}`}>
                <span className="fx8__colh">
                  <i />
                  {label}
                  <b>{items.length}</b>
                </span>
                {items.map((x, k) => (
                  <button key={x.id} type="button" className={`fx8__card ${open === x.id ? "is-open" : ""}`} onClick={() => setOpen(x.id)} style={{ ["--d" as string]: `${k * 0.06}s` } as CSSProperties}>
                    <b>{x.k}</b>
                    <span className="fx8__meta">
                      <strong>{x.v ? `$${x.v}M` : "Measured"}</strong>
                      <em>{x.own}</em>
                    </span>
                    <i className="fx8__val" style={{ ["--w" as string]: Math.max(x.v / 6.2, 0.04) } as CSSProperties} />
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <p className="ch__note">The Petco workspace fix queue. Per-fix values are modeled and sum within the $20M gainable.</p>
    </div>
  );
}

export default function PFix() {
  return (
    <Chapter id="fix" tone="warm" className="ch6">
      <Opener lead="Every fix ranked" more="by what it earns.">
        Every wrong or missing answer becomes a fix with an owner and a dollar value, ranked by what it wins back. <b>Pricing, loyalty and legal each approve their part before anything goes live.</b>
      </Opener>
      <Still img="v6/fix" alt="A white Samsung laundry machine in a sunlit travertine laundry room, a paper tag on blue thread" pos="50% 60%" ratio={2.3}>
        <Card x={3.5} y={10} w={420} className="fx6__q">
          <header className="c6__h">
            <Mark k="lowes" h={14} title="Lowe's" />
            <span>Fixes for appliances</span>
            <em className="fx6__stake">
              $14m to $55m a year at stake <small>Modeled</small>
            </em>
          </header>
          <ol>
            {FIXES.map((f, i) => (
              <li key={f.k} className={`is-${f.st}`} style={{ ["--d" as string]: `${0.5 + i * 0.15}s` }}>
                <span className="fx6__no">{i + 1}</span>
                <span className="fx6__k">
                  <b>{f.k}</b>
                  <em>
                    <i className="fx6__team">{f.team.slice(0, 2).toUpperCase()}</i>
                    {f.team}
                  </em>
                </span>
                <span className="fx6__s">
                  {f.st === "ok" ? <Icon n="check" size={13} /> : <i className="fx6__dot" />}
                  {f.s}
                </span>
              </li>
            ))}
          </ol>
        </Card>
        <Card x={33} y={58} w={250} d={0.3} className="fx6__why">
          <p className="fx6__claim">
            Lowe&rsquo;s can deliver and install major appliances <b>next day</b> in virtually every U.S. ZIP code.
          </p>
          <footer className="c6__n">
            <b>
              0<small> of 99</small>
            </b>
            <span>appliance answers mentioned it</span>
          </footer>
        </Card>
      </Still>
      <Points
        items={[
          { i: "dollar", k: "Ranked by dollars", d: "Each fix carries the revenue it wins back, so the biggest one is always on top." },
          { i: "people", k: "Owned by a team", d: "Pricing, loyalty, content or legal, each fix lands with the people who can say yes." },
          { i: "shield", k: "Approved before it ships", d: "Nothing reaches an agent until every owner signs, and any change can be rolled back." },
        ]}
        note="Lowe's, from Parleo research. Delivery claim from Lowe's Q2 earnings call."
      />
      <FixQueue />
    </Chapter>
  );
}
