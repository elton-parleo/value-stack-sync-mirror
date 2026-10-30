import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Head, Img, Src, toAudit, useOnce } from "../kit";
import { App, Icon, Mark } from "../v4kit";

/* 05 + 06 · Two doors, one section. Brands that sell through retailers, and retailers.
   Each door: the locked copy, the mechanism drawn into a still, and one public case underneath. */
type Mode = "brands" | "retailers";

/* Purina's Pro Plan ladder at Petco: what five assistants said the first Autoship order costs. */
const LADDER: { a: string; said: string; v: "ok" | "no" | "out" }[] = [
  { a: "ChatGPT", said: "$47.48", v: "ok" },
  { a: "Gemini", said: "$57.48", v: "no" },
  { a: "Copilot", said: "35% off, no cap", v: "no" },
  { a: "AI Mode", said: "About $46.79", v: "no" },
  { a: "Perplexity", said: "Buy at Chewy", v: "out" },
];
function Mk({ t }: { t: "ok" | "no" | "out" }) {
  return (
    <i role="img" className={`dr6__mk is-${t}`} aria-label={t === "ok" ? "Right" : t === "no" ? "Wrong" : "Left out"}>
      <svg viewBox="0 0 12 12" aria-hidden="true">{t === "ok" ? <path d="M2.6 6.3 5 8.6l4.4-5" /> : t === "no" ? <path d="M3.4 3.4l5.2 5.2M8.6 3.4 3.4 8.6" /> : <path d="M3 6h6" />}</svg>
    </i>
  );
}
function BrandPanel({ on }: { on: boolean }) {
  return (
    <div className={`dr6__card ${on ? "is-on" : ""}`}>
      <header>
        <Mark k="purina" h={11} title="Purina" />
        <span>at</span>
        <Mark k="petco" h={12} title="Petco" />
      </header>
      <p className="dr6__claim">
        Purina pays for <b>40% off</b> the first Autoship order of Pro Plan.
      </p>
      <div className="dr7flow" aria-label="Who funds the offer, who sells it, and who quotes it">
        <span>
          <Mark k="purina" h={9} title="Purina" />
          <em>Funds it</em>
        </span>
        <i />
        <span>
          <Mark k="petco" h={10} title="Petco" />
          <em>Sells it</em>
        </span>
        <i />
        <span className="is-ags">
          <b>
            {["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"].map((a) => (
              <App key={a} a={a} size={12} />
            ))}
          </b>
          <em>Quote it</em>
        </span>
      </div>
      <span className="dr6__k">What each assistant quoted</span>
      <ul className="dr6__rows">
        {LADDER.map((r, i) => (
          <li key={r.a} style={{ ["--d" as string]: `${0.5 + i * 0.16}s` }}>
            <App a={r.a} size={16} />
            <span>{r.a === "AI Mode" ? "Google AI Mode" : r.a}</span>
            <em className={r.v === "ok" ? "" : "is-off"}>{r.said}</em>
            <Mk t={r.v} />
          </li>
        ))}
      </ul>
      <footer>
        <span>
          The real first order
          <em>1 of 5 assistants got it right</em>
        </span>
        <b>$47.48</b>
      </footer>
    </div>
  );
}

/* REI and the Patagonia Down Sweater Hoody: the assistant's pick elsewhere, and what a member really pays at REI. */
function RetailPanel({ on }: { on: boolean }) {
  return (
    <div className={`dr6__card dr7rei ${on ? "is-on" : ""}`}>
      <header>
        <span className="dr7rei__p">
          <img src="/img/v4/cut/patagonia_down_sweater_hoody.webp" alt="" />
          <span>
            <b>Patagonia Down Sweater Hoody</b>
            <em>Same jacket, three prices</em>
          </span>
        </span>
        <Mark k="rei" h={13} dark title="REI" />
      </header>
      <div className="dr7rei__pick">
        <span>
          <App a="ChatGPT" size={14} /> The assistant&rsquo;s pick
        </span>
        <b>$319.00 elsewhere</b>
      </div>
      <dl className="dr7rei__ledger">
        <div>
          <dt>REI, listed</dt>
          <dd>$345.00</dd>
        </div>
        <div className="is-blue" style={{ ["--d" as string]: "0.8s" }}>
          <dt>
            <i>Member</i> Member Reward, 10% back
          </dt>
          <dd>&minus; $34.50</dd>
        </div>
        <div className="is-blue" style={{ ["--d" as string]: "1.1s" }}>
          <dt>
            <i>Card</i> Co-op Mastercard, 5% back
          </dt>
          <dd>&minus; $17.25</dd>
        </div>
        <div className="dr7rei__total" style={{ ["--d" as string]: "1.5s" }}>
          <dt>What a member pays</dt>
          <dd>$293.25</dd>
        </div>
      </dl>
      <div className="dr7rei__bar" aria-hidden="true">
        <i style={{ ["--w" as string]: 293.25 / 345 }} />
        <u style={{ ["--x" as string]: 319 / 345 }} />
      </div>
      <footer>
        <b>$25.75 less</b> than the assistant&rsquo;s pick, and REI still loses the recommendation.
      </footer>
    </div>
  );
}

const DOORS: Record<Mode, { tab: string; icon: "tag" | "people"; lead: string; more: string; body: React.ReactNode; stat: { n: string; k: string; src: string }; cta: string; alt: string }> = {
  brands: {
    tab: "Brands",
    icon: "tag",
    lead: "Make the money you already spend",
    more: "show up in the answer.",
    body: (
      <>
        Brands spend more than $200 billion a year on trade promotion to win the shelf, and <b>almost none of it reaches an AI answer.</b> Parleo gets your coupons, rebates and rewards into the answer at every retailer that sells you.
      </>
    ),
    stat: { n: "$200B+", k: "a year on trade promotion, built for the shelf", src: "Strategy& / PwC" },
    cta: "Get the report for your brand",
    alt: "A bag of Purina Pro Plan on a travertine plinth in late sun, a paper tag on blue thread",
  },
  retailers: {
    tab: "Retailers",
    icon: "people",
    lead: "Your loyalty program is the advantage",
    more: "AI can\u2019t see.",
    body: (
      <>
        Assistants compare list prices, so they send your members wherever looks cheapest. <b>Member prices, points and perks never make it into the answer.</b> Parleo puts that value in front of the assistant, so you win at full price.
      </>
    ),
    stat: { n: "$51.75", k: "of member value on one jacket, and no assistant counted it", src: "Parleo research, REI" },
    cta: "Get the report for your store",
    alt: "A Patagonia down jacket hung on a weathered post above a mountain valley at first light",
  },
};

export default function Doors() {
  const { hash } = useLocation();
  const [mode, setMode] = useState<Mode>("brands");
  const [ref, on] = useOnce<HTMLDivElement>(0.3);
  useEffect(() => {
    if (hash === "#retailers") setMode("retailers");
    if (hash === "#brands") setMode("brands");
  }, [hash]);
  const d = DOORS[mode];

  return (
    <section className="sec dr" id="doors">
      <span id="brands" className="anchor" />
      <span id="retailers" className="anchor" />
      <div className="wrap dr6__top">
        <div className="dr6__seg" role="tablist" aria-label="Brands or retailers">
          <i className={`dr6__thumb ${mode === "retailers" ? "is-r" : ""}`} aria-hidden="true" />
          {(Object.keys(DOORS) as Mode[]).map((k) => (
            <button key={k} role="tab" aria-selected={mode === k} className={mode === k ? "is-on" : ""} onClick={() => setMode(k)}>
              <Icon n={DOORS[k].icon} size={16} />
              {DOORS[k].tab}
            </button>
          ))}
        </div>
      </div>
      <div className={`wrap dr__grid dr6__grid is-${mode}`} ref={ref} key={mode}>
        <div className="dr__copy">
          <Head lead={d.lead} more={d.more} sq />
          <p className="body dr6__body">{d.body}</p>
          <div className="dr__stat dr6__stat">
            <b>{d.stat.n}</b>
            <span>{d.stat.k}</span>
            <Src>{d.stat.src}</Src>
          </div>
          <a
            className="dr6__go"
            href="#audit"
            onClick={(e) => {
              e.preventDefault();
              toAudit(mode === "brands" ? "brand" : "retailer");
            }}
          >
            {d.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="dr__media dr6__media">
          <div className="dr6__pic">
            {mode === "brands" ? (
              <Img name="v5/proplan" widths={[900, 1440, 2048]} sizes="(max-width: 900px) 100vw, 60vw" alt={d.alt} className="dr__img" />
            ) : (
              <img className="dr__img" src="/img/v4/photo/rei_trail.webp" alt={d.alt} loading="lazy" decoding="async" />
            )}
          </div>
          {mode === "brands" ? <BrandPanel on={on} /> : <RetailPanel on={on} />}
        </div>
      </div>
    </section>
  );
}
