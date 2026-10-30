import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Head, Src, Stat, quadMatrix, useOnce } from "../kit";
import { App, Mark } from "../v4kit";

/* 02 · There is no page two. The old path is struck out on the counter, and the one answer that
   replaces it appears on the shopper's own phone, in perspective, under her thumbs. */
const THEN = ["Search", "Ten tabs", "Reviews", "Your page"];
const NOW = ["One question", "One answer", "One store"];

/* the phone's screen in the still, as fractions (TL, TR, BR, BL), and the two crops */
/* the overlay is drawn a touch larger than the glass, then clipped by a mask cut from the still itself,
   so its edges always land exactly on the phone's own screen edge and the real notch stays on top */
const OS = [0.004, 0.006];
const QUAD: [number, number][] = [
  [0.313 - OS[0], 0.1884 - OS[1]],
  [0.4512 + OS[0], 0.1884 - OS[1]],
  [0.4517 + OS[0], 0.7222 + OS[1]],
  [0.3149 - OS[0], 0.7222 + OS[1]],
];
const UW = 300;
const UH = 652;
type Crop = [number, number, number, number];
const CROP_D: Crop = [0.02, 0.06, 0.98, 0.94];
const CROP_M: Crop = [0.16, 0.12, 0.62, 0.84];
const vars = (c: Crop, k: string) => {
  const w = c[2] - c[0];
  const h = c[3] - c[1];
  return { [`--ar${k}`]: (16 / 9) * (w / h), [`--iw${k}`]: `${100 / w}%`, [`--il${k}`]: `${(-c[0] / w) * 100}%`, [`--it${k}`]: `${(-c[1] / h) * 100}%`, [`--ih${k}`]: `${100 / h}%` };
};

export default function Shift() {
  const [ref, on] = useOnce<HTMLDivElement>(0.15);
  const layer = useRef<HTMLDivElement>(null);
  const ui = useRef<HTMLDivElement>(null);
  const [member, setMember] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const l = layer.current;
    const u = ui.current;
    if (!l || !u) return;
    const fit = () => {
      const w = l.clientWidth;
      const h = l.clientHeight;
      u.style.transform = quadMatrix(UW, UH, QUAD.map(([x, y]) => [x * w, y * h]) as [number, number][]);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(l);
    return () => ro.disconnect();
  }, []);

  /* the answer flips on its own once: same TV, same price, then the shopper says she's a member */
  useEffect(() => {
    if (!on || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setMember(true), 4200);
    return () => window.clearTimeout(t);
  }, [on, touched]);
  const pick = (m: boolean) => {
    setTouched(true);
    setMember(m);
  };

  const answer = (
    <div className="ph7" key={member ? "m" : "a"}>
      <div className="ph7__app">
        <i className="ph7__menu" />
        <b>
          ChatGPT <span>5</span>
        </b>
        <i className="ph7__new" />
      </div>
      <p className="ph7__q sx__q">
        {member && <b>I have My Best Buy Plus. </b>}
        Best Buy or Costco for the LG 65&Prime; C6 OLED? It&rsquo;s $1,399.99 at both.
      </p>
      <div className="ph7__a">
        <span className="ph7__who">
          <App a="ChatGPT" size={14} />
          <em>Thought for 6s</em>
        </span>
        <p className="ph7__line">
          <b>{member ? "Buy it at Best Buy." : "Buy it at Costco."}</b> {member ? "My Best Buy Plus gives you 60 days to return it, instead of the usual 15." : "Same price, and Costco\u2019s returns and warranty make it the safer buy."}
        </p>
        <div className="ph7__card">
          <div className="ph7__img">
            <img src="/img/v4/cut/lgc6.webp" alt="" />
          </div>
          <div className="ph7__meta">
            <b>LG 65&Prime; Class C6 OLED evo 4K</b>
            <span className="ph7__price">$1,399.99</span>
          </div>
          <div className="ph7__sellers">
            <span className={member ? "is-pick" : ""}>
              <Mark k="bestbuy" h={11} title="Best Buy" />
              <em>Best Buy</em>
              {member && <u>Recommended</u>}
            </span>
            <span className={member ? "" : "is-pick"}>
              <i className="ph7__costco">COSTCO</i>
              <em>Costco</em>
              {!member && <u>Recommended</u>}
            </span>
          </div>
        </div>
        <div className="ph7__src">
          <span>bestbuy.com</span>
          <span>costco.com</span>
        </div>
      </div>
      <div className="ph7__ask">
        <i>+</i>
        <span>Ask anything</span>
        <i className="ph7__mic" />
      </div>
    </div>
  );

  return (
    <section className="sec sx sx--shift" id="shift">
      <div className="wrap sx__top in6 sx8__top">
        <div className="sx8__lead">
          <Head lead="There is no" more="page two." sq />
          <div className="sx8__stats">
            <Stat n="+393%" k="AI-driven traffic to US retail sites in a year" tone="ink" size="s" />
            <Stat n="42%" k="better conversion than other traffic" tone="ink" size="s" />
          </div>
        </div>
        <div className="in6__body">
          <p className="sx8__state">The funnel is collapsing into a single chat.</p>
          <p className="body">
            Shoppers used to search, open ten tabs and compare. Now they ask an assistant and get <b>one answer, usually with one store in it.</b> If that store isn&rsquo;t you, there&rsquo;s no second page to win the sale back on.
          </p>
          <Src>Adobe</Src>
        </div>
      </div>

      <div className={`sx__stage ${on ? "is-on" : ""}`} ref={ref} style={{ ...vars(CROP_D, ""), ...vars(CROP_M, "m") } as CSSProperties}>
        <div className="sx__pic">
          <div className="sx__full" ref={layer}>
            <picture>
              <source type="image/webp" srcSet="/img/v8/phone-900.webp 900w, /img/v8/phone-1400.webp 1400w, /img/v8/phone-2000.webp 2000w" sizes="(max-width: 900px) 300vw, 110vw" />
              <img src="/img/v8/phone.jpg" alt="Seen from above, a shopper's hands holding a phone over a stone kitchen counter at breakfast" loading="lazy" decoding="async" />
            </picture>
            <div className="sx__screen" aria-hidden="true">
              <div className="sx__ui" ref={ui}>
                <div className="sx__bar ph7__bar">
                  <b>9:41</b>
                  <span>
                    <i className="ph7__sig" />
                    <i className="ph7__bat" />
                  </span>
                </div>
                {answer}
              </div>
            </div>
          </div>
        </div>

        <div className="sx6__panel">
          <div className="sx6__path" aria-label="How a shopper used to buy, and how she buys now">
            <div className="sx6__row is-then">
              <span>Then</span>
              <ol>
                {THEN.map((p, i) => (
                  <li key={p} style={{ ["--d" as string]: `${0.2 + i * 0.18}s` }}>
                    <s>{p}</s>
                  </li>
                ))}
              </ol>
            </div>
            <div className="sx6__row is-now">
              <span>Now</span>
              <ol>
                {NOW.map((p, i) => (
                  <li key={p} style={{ ["--d" as string]: `${1 + i * 0.18}s` }}>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="sx6__case sx8 c8-dark">
            <span className="k8">Same TV, same price, two shoppers</span>
            <div className="sx6__seg sx8__seg" role="tablist" aria-label="Who is asking">
              <i className={member ? "is-r" : ""} aria-hidden="true" />
              <button type="button" role="tab" aria-selected={!member} className={!member ? "is-on" : ""} onClick={() => pick(false)}>
                Any shopper
              </button>
              <button type="button" role="tab" aria-selected={member} className={member ? "is-on" : ""} onClick={() => pick(true)}>
                A Plus member
              </button>
            </div>
            <div className="sx8__res" key={member ? "m" : "a"}>
              <span className="sx8__to">
                {member ? <Mark k="bestbuy" h={13} title="Best Buy" /> : <i className="ph7__costco">COSTCO</i>}
                <em>gets the sale</em>
              </span>
              <Stat n={member ? 11 : 17} of={member ? 11 : 18} k={member ? "answers sent her to Best Buy once the assistant knew she was a member" : "answers sent her to Costco, though Best Buy had it at the same price"} dark size="l" />
            </div>
            <p className="sx8__so">
              <b>{member ? "Member value wins the answer." : "Best Buy never came up."}</b> {member ? "Plus members get 60 days to return it, instead of the usual 15. The assistant only used it when told." : "Parleo puts the member value Best Buy already offers in front of every assistant, for every shopper."}
            </p>
          </div>
        </div>

        <div className="sx6__flat" aria-hidden="true">
          {answer}
        </div>
      </div>
      <div className="wrap sx__foot">
        <Src>Parleo research, Best Buy.</Src>
      </div>
    </section>
  );
}
