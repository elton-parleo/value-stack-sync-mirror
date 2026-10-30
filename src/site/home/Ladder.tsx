import { useEffect, useState, type CSSProperties } from "react";
import { Head, Proof, useOnce } from "../kit";
import { Icon, type IconName } from "../v4kit";

/* 04 · Mentioned is the surface, chosen is three layers down. One shelf of eight sneakers, the way an
   answer narrows them: named, priced right, offer included, chosen. Visibility tools count the first
   layer. Parleo works all four. Proof: Nordstrom, Oct 2026. */
const SHOES: [number, number][] = [
  [0.029, 0.136],
  [0.143, 0.255],
  [0.261, 0.373],
  [0.38, 0.496],
  [0.504, 0.619],
  [0.627, 0.736],
  [0.743, 0.854],
  [0.861, 0.977],
];
const NAMES = ["Nike Air Force 1 ’07", "New Balance 990v6", "On Cloudmonster", "HOKA Speedgoat 6", "ASICS Gel-Kayano 31", "adidas Samba OG", "Brooks Ghost 16", "Nike Pegasus 41"];
const Y0 = 0.44;
const Y1 = 0.625;
const LAYERS = [
  { k: "Mentioned", n: 8, unit: "named in the answer", line: "Every brand on the shelf shows up somewhere. This is where visibility tools stop counting.", keep: [0, 1, 2, 3, 4, 5, 6, 7] },
  { k: "Priced right", n: 4, unit: "quoted at the real price", line: "Half lose here: a stale sale, the wrong size or a price that ended last week.", keep: [1, 3, 5, 6] },
  { k: "Offer included", n: 2, unit: "with the offer carried", line: "Only two get their member price or promotion into the answer.", keep: [3, 5] },
  { k: "Chosen", n: 1, unit: "picked", line: "The one the assistant tells the shopper to buy. The right price and the best offer got it there.", keep: [3] },
];
const PICK = 3;

export default function Ladder() {
  const [ref, on] = useOnce<HTMLDivElement>(0.4);
  const [layer, setLayer] = useState(0);
  const [touched, setTouched] = useState(false);

  /* the reveal: once in view, the shelf narrows layer by layer, then stops. Nothing loops. */
  useEffect(() => {
    if (!on || touched) return;
    if (layer >= LAYERS.length - 1) return;
    const t = window.setTimeout(() => setLayer((l) => l + 1), layer === 0 ? 1500 : 1300);
    return () => window.clearTimeout(t);
  }, [on, touched, layer]);

  const go = (i: number) => {
    setTouched(true);
    setLayer(i);
  };
  const L = LAYERS[layer];

  return (
    <section className="sec ld" id="versus">
      <div className="wrap ld__top in6">
        <Head lead="Visibility gets you into the answer." more="Value gets you picked." sq />
        <div className="in6__body">
          <p className="body">
            Most brands show up somewhere in AI answers. Far fewer get recommended, and fewer still at the right price. <b>Visibility tools stop at the mention.</b> Parleo makes sure the answer carries your real price and your best offer, because that&rsquo;s what wins the sale.
          </p>
        </div>
      </div>

      <div className={`wrap wrap--wide ld__stage ${on ? "is-on" : ""}`} ref={ref} data-layer={layer}>
        <div className="ld__pic">
          <picture>
            <source type="image/webp" srcSet="/img/v8/shoewall-1200.webp 1200w, /img/v8/shoewall-2048.webp 2048w" sizes="(max-width: 760px) 280vw, (max-width: 1400px) 100vw, 1368px" />
            <img src="/img/v8/shoewall.jpg" alt="Eight sneakers in a row on a travertine shelf: Nike Air Force 1, New Balance 990v6, On Cloudmonster, HOKA Speedgoat 6, ASICS Gel-Kayano 31, adidas Samba OG, Brooks Ghost 16 and Nike Pegasus 41" loading="lazy" decoding="async" />
          </picture>
          <div className="ld__marks" aria-hidden="true">
            {SHOES.map(([a, b], i) => {
              /* the shoes that drop out go soft, a copy of the same still, blurred and masked to the shoe */
              const x0 = a - 0.018;
              const x1 = b + 0.018;
              const y0 = Y0 - 0.07;
              const y1 = Y1 + 0.03;
              const w = x1 - x0;
              const h = y1 - y0;
              return (
                <div
                  key={`b${i}`}
                  className={`ld__soft ${L.keep.includes(i) ? "" : "is-out"}`}
                  style={{ left: `${x0 * 100}%`, top: `${y0 * 100}%`, width: `${w * 100}%`, height: `${h * 100}%`, backgroundSize: `${100 / w}% ${100 / h}%`, backgroundPosition: `${(x0 / (1 - w)) * 100}% ${(y0 / (1 - h)) * 100}%`, ["--d" as string]: `${i * 0.05}s` } as CSSProperties}
                />
              );
            })}
            {SHOES.map(([x0, x1], i) => {
              const kept = L.keep.includes(i);
              const pick = layer === 3 && i === PICK;
              return (
                <div
                  key={i}
                  className={`ld__shoe ${kept ? "is-kept" : "is-out"} ${pick ? "is-pick" : ""}`}
                  style={{ left: `${x0 * 100}%`, width: `${(x1 - x0) * 100}%`, top: `${Y0 * 100}%`, height: `${(Y1 - Y0) * 100}%`, ["--d" as string]: `${i * 0.05}s` } as CSSProperties}
                >
                  <i />
                  <i />
                  <i />
                  <i />
                  <b>{pick ? `Picked: ${NAMES[i]}` : ""}</b>
                </div>
              );
            })}
          </div>
          <div className="ld__read ld6__read ld8" aria-live="polite">
            <div className="ld8__head">
              <span className="ic8">
                <Icon n={["eye", "tag", "dollar", "check"][layer] as IconName} size={15} />
              </span>
              <span className="ld8__k">{L.k}</span>
              <span className="ld8__step">
                {layer + 1}/4
              </span>
            </div>
            <b className="ld__n" key={layer}>
              {L.n}
              <small> of 8</small>
            </b>
            <span className="ld6__unit">{L.unit}</span>
            <span className="ld6__dots" aria-hidden="true">
              {SHOES.map((_, i) => (
                <i key={i} className={`${L.keep.includes(i) ? "is-on" : ""} ${layer === 3 && i === PICK ? "is-pick" : ""}`} />
              ))}
            </span>
            <p key={`p${layer}`}>{L.line}</p>
          </div>
        </div>

        <div className="ld6__rail">
          <div className="ld6__steps" role="tablist" aria-label="Layers of an AI answer">
            {LAYERS.map((l, i) => (
              <button key={l.k} role="tab" aria-selected={layer === i} className={`${layer === i ? "is-on" : ""} ${i < layer ? "is-past" : ""} ${i === 3 ? "is-last" : ""}`} onClick={() => go(i)}>
                <b>{l.n}</b>
                <span>{l.k}</span>
                {i < 3 && <i className="ld6__arrow" aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className="ld6__who" aria-hidden="true">
            <div className="ld6__vis">
              <span>Visibility tools measure this</span>
            </div>
            <div className="ld6__parleo">
              <span>Parleo works all four</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <Proof logo="Nordstrom" co="Nordstrom" cta="See where AI sends your shoppers" mode="retailer">
          Same item, same price. Told that, agents pick Nordstrom in <b className="is-blue">47 of 73</b> answers. Left to work it out, <b>1 of 17</b>.
        </Proof>
      </div>
    </section>
  );
}
