import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, H, Logo, Prov, Rise, Tick } from "@/ds";

type Door = "brand" | "retailer";

/* ---------- Brands: the human shelf versus the answer ---------- */
const SPEND = [
  { k: "Trade promotion", s: "Strategy& / PwC", v: "$200B+" },
  { k: "Retail media", s: "eMarketer", v: "~$69B" },
  { k: "Shelf, search bids, co-op", s: "endcaps, JBP, sampling, brand work", v: "" },
];

function BrandFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="card flow">
      <div className="flow__cols">
        <div className="flow__left">
          <span className="ml">What you fund to win the human shelf</span>
          {SPEND.map((s) => (
            <div key={s.k} className="flow__spend">
              <div>
                <b>{s.k}</b>
                <span>{s.s}</span>
              </div>
              {s.v && <strong className="tnum">{s.v}</strong>}
            </div>
          ))}
          <div className="flow__data">
            <div>
              <b>Your product data</b>
              <span>catalog, price, offers, inventory</span>
            </div>
            <span className="st st--blue">Readable</span>
          </div>
        </div>
        <svg className="flow__svg" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">
          {[40, 108, 176].map((y, i) => (
            <motion.path
              key={y}
              d={`M0 ${y} C 60 ${y}, 60 70, 120 70`}
              className="flow__grey"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
            />
          ))}
          <motion.path
            d="M0 258 C 60 258, 60 236, 120 236"
            className="flow__blue"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          />
        </svg>
        <div className="flow__right">
          <div className="flow__human">
            <span className="ml">The human shopper</span>
            <b>Sees the promo. Feels the story.</b>
            <span>Placement, media and brand work all land where a person is looking.</span>
          </div>
          <span className="flow__never">never reaches the answer</span>
          <div className="dcard flow__agent">
            <div className="flow__agent-top">
              <span className="ml ml--dark">The AI agent</span>
              <span className="flow__agents">
                {["ChatGPT", "Gemini", "Perplexity"].map((a) => (
                  <Logo key={a} name={a} size={14} />
                ))}
              </span>
            </div>
            <b>Decides on product truth alone.</b>
            <div className="flow__zero">
              <span className="big tnum">$0</span>
              <span>of your shelf investment visible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandEvidence() {
  return (
    <div className="split split--75 split--stretch door__ev">
      <div className="aw">
        <div className="aw__top">
          <Logo name="ChatGPT" size={14} />
          <span>ChatGPT, Pampers audit, Sep 29</span>
        </div>
        <p className="aw__q">What's the safest diaper for a newborn?</p>
        <p className="aw__a">
          For a newborn, I'd start with <mark>Pampers Pure Protection</mark>, $29.97 at Walmart, hypoallergenic and free of fragrance.
        </p>
        <div className="aw__miss">
          <span className="ml">On pampers.com</span>
          Pure is retired and the page redirects to AMORE, the first new Pampers diaper since 2018. <b>AMORE came up in 1 of 30 answers.</b>
        </div>
      </div>
      <div className="card card--pad door__kc">
        <div className="door__kc-top">
          <Logo name="Kimberly-Clark" size={18} />
          <b>Cottonelle vs Charmin</b>
          <span className="st st--wrong">Wrong</span>
        </div>
        <p>ChatGPT listed three Charmin coupons and said Cottonelle's needed a 36-roll pack.</p>
        <div className="door__kc-rows">
          <div>
            <span>Walmart shelf, 24 Mega Rolls</span>
            <b className="tnum">$19.98</b>
          </div>
          <div className="is-win">
            <span>With the cottonelle.com coupon it missed</span>
            <b className="tnum">$18.98</b>
          </div>
        </div>
        <span className="ml">Kimberly-Clark audit, Sep 29</span>
      </div>
    </div>
  );
}

/* ---------- Retailers: member value the agent never sees ---------- */
function RetailFlip() {
  return (
    <div className="split split--75 split--stretch flip">
      <div className="card flip__seen">
        <span className="ml">What the agent sees</span>
        <div className="flip__prod">
          <img src="/img/sneaker.webp" alt="White leather sneaker" loading="lazy" />
          <div>
            <div className="flip__brand">
              <Logo name="adidas" size={18} />
              <b>Samba OG</b>
            </div>
            <span>one product page on adidas.com</span>
          </div>
        </div>
        <div className="flip__rows">
          <div className="flip__row is-agent">
            <span>Agent's quote, list plus shipping</span>
            <span className="st st--seen">Seen</span>
            <b className="tnum">$104.99</b>
          </div>
          <div className="flip__row">
            <span>adiClub member price</span>
            <span className="st st--invisible">Invisible</span>
            <b className="tnum">$100.00</b>
          </div>
          <div className="flip__row">
            <span>New member, first order</span>
            <span className="st st--invisible">Invisible</span>
            <b className="tnum flip__win">$85.00</b>
          </div>
        </div>
        <p className="flip__note">
          Free shipping, points and a 15% welcome offer sit on every product page. <b>The structured data agents read leaves all of it out.</b>
        </p>
      </div>
      <div className="dcard flip__true">
        <span className="ml ml--dark">True price, new adiClub member</span>
        <div className="flip__ledger">
          <div>
            <span>List price</span>
            <b className="tnum">$100.00</b>
          </div>
          <div>
            <span>15% welcome offer</span>
            <b className="tnum flip__minus">−$15.00</b>
          </div>
          <div>
            <span>Shipping, members</span>
            <b className="tnum flip__minus">$0.00</b>
          </div>
        </div>
        <span className="ml ml--dark">True cost to this member</span>
        <span className="big big--xl big--blue tnum flip__big">$85.00</span>
        <div className="flip__punch">
          adidas is <b>$19.99 better</b> than the agent's quote, and the answer never shows it.
        </div>
      </div>
    </div>
  );
}

const RETAIL_POINTS = [
  { k: "Win at full price.", d: "Member value does the work a markdown used to do." },
  { k: "Stop the wait-for-a-sale answer.", d: "26 of 32 Gap \"is it worth it\" answers told shoppers to buy on sale." },
  { k: "Give nothing away.", d: "Member prices resolve inside the answer with zero PII exported." },
];

function RetailEvidence() {
  return (
    <div className="split split--57 split--stretch door__ev">
      <div className="card card--pad door__pts">
        {RETAIL_POINTS.map((p) => (
          <div key={p.k}>
            <Tick />
            <p>
              <b>{p.k}</b> {p.d}
            </p>
          </div>
        ))}
      </div>
      <div className="door__counts">
        <div className="card card--pad">
          <div className="door__count-top">
            <Logo name="Ulta" size={18} />
            <b>Ulta Beauty</b>
            <span className="st st--invisible">Invisible</span>
          </div>
          <span className="big tnum">
            0 <small>of 22</small>
          </span>
          <p>answers priced Ulta's points against the brand's own offer. The brand's offer arrived as a number, Ulta's as an adjective.</p>
        </div>
        <div className="card card--pad">
          <div className="door__count-top">
            <Logo name="Nordstrom" size={18} />
            <b>Nordstrom</b>
            <span className="st st--partial">Partial</span>
          </div>
          <span className="big tnum">
            1 <small>of 17</small>
          </span>
          <p>same-price answers picked Nordstrom unprompted. Told the price was the same everywhere, 47 of 73.</p>
        </div>
      </div>
    </div>
  );
}

export default function Doors() {
  const [door, setDoor] = useState<Door>("brand");
  useEffect(() => {
    const read = () => {
      if (window.location.hash.includes("retailers")) setDoor("retailer");
      if (window.location.hash.includes("brands")) setDoor("brand");
    };
    read();
    const pick = (e: Event) => setDoor((e as CustomEvent<Door>).detail);
    window.addEventListener("hashchange", read);
    window.addEventListener("parleo:door", pick);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("parleo:door", pick);
    };
  }, []);
  return (
    <section className="sx doors" id="doors">
      <span id="brands" className="anchor" />
      <span id="retailers" className="anchor" />
      <div className="wrap">
        <div className="doors__head">
          <Rise>
            <H lead="Brands and retailers lose the answer" accent="in different places." />
          </Rise>
          <Rise delay={0.08}>
            <div className="seg" role="tablist" aria-label="Choose your side of the shelf">
              {(
                [
                  ["brand", "I sell through retailers"],
                  ["retailer", "I run the store"],
                ] as [Door, string][]
              ).map(([k, label]) => (
                <button key={k} role="tab" aria-selected={door === k} className={door === k ? "is-on" : ""} onClick={() => setDoor(k)}>
                  {door === k && <motion.i layoutId="seg-pill" className="seg__pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </Rise>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={door} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
            {door === "brand" ? (
              <>
                <div className="door__h">
                  <H lead="The first brand to feed the agent" accent="owns the recommendation." size="sm" as="h3" />
                  <p className="sub">The $200B+ that wins the human shelf never reaches the answer. Your product data is the only part an agent can read, and most of your category hasn't connected it yet.</p>
                </div>
                <BrandFlow />
                <BrandEvidence />
                <Prov>Strategy& / PwC, eMarketer. Agent answers from Parleo's Pampers and Kimberly-Clark audits, Sep 29, 2026.</Prov>
              </>
            ) : (
              <>
                <div className="door__h">
                  <H lead="Your loyalty program is the advantage" accent="agents can't copy." size="sm" as="h3" />
                  <p className="sub">Agents compare list prices, so they tell your shoppers to wait for a sale. Put member price, points, free shipping and Autoship savings in the answer and you win at full price.</p>
                </div>
                <RetailFlip />
                <RetailEvidence />
                <Prov>adidas.com public prices and published adiClub terms, audit Sep 29, 2026. Ulta Beauty and Nordstrom audits, Oct 21, 2026, five agents.</Prov>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
