import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Head, Proof, quadMatrix, useOnce } from "../kit";
import { Icon, Mark, Spec } from "../v4kit";

/* 03 · The gap. One sneaker, one paper tag, two shoppers. Switch who's asking and the price printed
   on the tag swaps: what AI quotes everyone, and what a new member actually pays.
   adidas Samba OG on adidas.com, Sep 29, 2026: $100 list, $4.99 shipping, a 15% welcome offer and
   free shipping for new adiClub members. */
type Who = "anyone" | "member";
const LEDGER: Record<Who, { tab: string; k: string; total: string; rows: [string, string][] }> = {
  anyone: { tab: "What AI quotes", k: "What AI tells every shopper", total: "$104.99", rows: [["List price", "$100.00"], ["Shipping", "+ $4.99"], ["Member offer", "Not mentioned"]] },
  member: { tab: "What a member pays", k: "What a new adiClub member pays", total: "$85.00", rows: [["List price", "$100.00"], ["Shipping", "Free"], ["Welcome offer", "− $15.00"]] },
};

/* the paper tag in the still: TL, TR, BR, BL */
const TAG: [number, number][] = [
  [0.7451, 0.4651],
  [0.822, 0.4512],
  [0.842, 0.684],
  [0.7654, 0.7037],
];
type Crop = [number, number, number, number];
const CROP_D: Crop = [0, 0, 1, 1];
const CROP_M: Crop = [0.36, 0.22, 0.98, 0.94];
const cv = (c: Crop, k: string) => {
  const w = c[2] - c[0];
  const h = c[3] - c[1];
  return { [`--ar${k}`]: (16 / 9) * (w / h), [`--iw${k}`]: `${100 / w}%`, [`--il${k}`]: `${(-c[0] / w) * 100}%`, [`--it${k}`]: `${(-c[1] / h) * 100}%`, [`--ih${k}`]: `${100 / h}%` };
};

export default function Gap() {
  const [ref, on] = useOnce<HTMLDivElement>(0.35);
  const [who, setWho] = useState<Who>("anyone");
  const [touched, setTouched] = useState(false);
  const full = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);

  /* once in view, the tag swaps to the member price by itself, then it's yours to flip */
  useEffect(() => {
    if (!on || touched) return;
    const t = window.setTimeout(() => setWho("member"), 1700);
    return () => window.clearTimeout(t);
  }, [on, touched]);

  /* print onto the paper tag in perspective */
  useEffect(() => {
    const f = full.current;
    const i = ink.current;
    if (!f || !i) return;
    const fit = () => {
      const w = f.clientWidth;
      const h = f.clientHeight;
      i.style.transform = quadMatrix(100, 175, TAG.map(([x, y]) => [x * w, y * h]) as [number, number][]);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    return () => ro.disconnect();
  }, []);

  const pick = (w: Who) => {
    setTouched(true);
    setWho(w);
  };
  const L = LEDGER[who];

  return (
    <section className="sec gp" id="gap">
      <div className="wrap gp__top in6">
        <Head lead="AI prices your best customers" more="like strangers." sq />
        <div className="in6__body">
          <p className="body">
            Your most loyal customer and a first-time visitor get the same answer from AI: <b>full price, no perks.</b> The member price, the free shipping and the welcome offer you built to win that customer never reach the moment they decide.
          </p>
        </div>
      </div>

      <div className={`wrap wrap--wide gp__stage ${on ? "is-on" : ""} is-${who}`} ref={ref}>
        <div className="gp__frame" style={{ ...cv(CROP_D, ""), ...cv(CROP_M, "m") } as CSSProperties}>
          <div className="gp__pic">
            <div className="gp__full" ref={full}>
              <picture>
                <source type="image/webp" srcSet="/img/v4/terrace-900.webp 900w, /img/v4/terrace-1600.webp 1600w, /img/v4/terrace-2048.webp 2048w" sizes="(max-width: 760px) 160vw, (max-width: 1400px) 100vw, 1368px" />
                <img src="/img/v4/terrace.jpg" alt="An adidas Samba OG on a travertine block in late sun, a paper price tag tied to its laces with blue thread" loading="lazy" decoding="async" />
              </picture>
              <div className="gp__tag" aria-hidden="true">
                <div className="gp__ink" ref={ink}>
                  <span className="gp__ink-k">{who === "member" ? "Member" : "Price"}</span>
                  <span className="gp__ink-was">$104.99</span>
                  <span className="gp__ink-now">$85.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gp__card gp6 gp7 gp8">
            <header className="gp6__head gp8__head">
              <Spec src="samba_b75806" alt="" className="gp6__thumb" />
              <span>
                <b>Samba OG</b>
                <em>
                  <Mark k="adidas" h={10} title="adidas" /> adidas.com
                </em>
              </span>
              <span className={`chip8 ${who === "member" ? "chip8--blue" : "chip8--bad"}`}>
                <i />
                {who === "member" ? "adiClub" : "Full price"}
              </span>
            </header>
            <div className="gp__seg" role="tablist" aria-label="Who is asking">
              {(Object.keys(LEDGER) as Who[]).map((k) => (
                <button key={k} role="tab" aria-selected={who === k} className={who === k ? "is-on" : ""} onClick={() => pick(k)}>
                  {LEDGER[k].tab}
                </button>
              ))}
            </div>
            <div className="gp__price gp8__price" aria-live="polite">
              <b key={who}>{L.total}</b>
              {who === "member" ? <span className="gp__was">$104.99</span> : null}
              {who === "member" && <span className="gp8__save">Saves $19.99</span>}
            </div>
            <span className="gp__k">{L.k}</span>
            <dl className="gp__rows">
              {L.rows.map(([k, v]) => (
                <div key={k} className={v.startsWith("−") || v === "Free" ? "is-blue" : v === "Not mentioned" ? "is-grey" : ""}>
                  <dt>
                    <i className="gp8__ic">
                      <Icon n={k.startsWith("List") ? "tag" : k.startsWith("Ship") ? "record" : "spark"} size={13} />
                    </i>
                    {k}
                  </dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="gp7__ladder" aria-label="Three prices for one Samba OG">
              <span className="gp7__lk">Three prices, one shoe</span>
              {[
                ["What agents read", 104.99, "is-ai"],
                ["adiClub member", 100, ""],
                ["New member, first order", 85, "is-new"],
              ].map(([k, v, c]) => (
                <div key={k as string} className={`gp7__lr ${c}`}>
                  <span>{k}</span>
                  <i>
                    <u style={{ width: `${(((v as number) - 60) / 45) * 100}%` }} />
                  </i>
                  <b>${(v as number).toFixed(2)}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="gp__proof">
        <Proof logo="adidas" co="adidas" cta="See what AI quotes your members">
          <b className="is-blue">$19.99 a pair</b> between what AI quotes for the Samba OG and what a new adiClub member pays.
        </Proof>
      </div>
      </div>
    </section>
  );
}
