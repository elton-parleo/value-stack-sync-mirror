import { useEffect, useRef, useState } from "react";
import { Btn } from "@/components/primitives";
import { openStart } from "@/components/start";
import { AGENTS5, App, Mark } from "./v4kit";
import "./hero.css";

/*
  Hero v3: the data layer over the products.
  The photo is the shelf as a shopper sees it. Parleo is drawn on top the way an agent reads it:
  registration ticks find each product, the Runner is selected, and one hairline joins it to its
  record. Only one field corrects, grey (what AI says today) to blue (the record Parleo publishes).
  Hover any product for its record. Phones and tablets get the same records as tabs. Plays once.

  Geometry is fractions of the 2880 x 1620 still, so it holds at any size.
*/

type Rec = {
  nm: string;
  tab: string;
  at: { mark?: string; name: string };
  box: [number, number, number, number];
  tag: [number, number, number, number];
  pin: [number, number];
  agent?: string;
  ask?: string;
  ctx?: string;
  said: string;
  quote?: boolean;
  flag: string;
  page: { k: string; v: string };
  stat: { n: number; of: number; t: string };
  cut: string;
  below?: boolean;
};
/* Real answers from Parleo's research, checked against the brand's or retailer's page the same day. */
const RECS: Rec[] = [
  {
    nm: "Nike Vomero 18",
    tag: [0.716, 0.05, 0.777, 0.233],
    flag: "Told her to wait",
    tab: "Vomero 18",
    at: { mark: "nike", name: "Nike" },
    cut: "/img/v4/cut/vomero18.webp",
    box: [0.495, 0.04, 0.775, 0.35],
    pin: [0.51, 0.25],
    agent: "ChatGPT",
    ask: "Is the Nike Vomero 18 worth $155, or should I wait for a sale?",
    said: "Wait for a sale unless you need them immediately…",
    quote: true,
    page: { k: "nike.com", v: "$155, every size in stock, a 60-day wear test included" },
    stat: { n: 9, of: 11, t: "answers told a full-price shopper to wait" },
  },
  {
    nm: "Sony WH-1000XM6",
    tag: [0.918, 0.35, 0.979, 0.509],
    flag: "Wrong price",
    tab: "Sony XM6",
    at: { mark: "bestbuy", name: "Best Buy" },
    cut: "/img/v7/cut/sony_xm6.webp",
    box: [0.775, 0.13, 0.97, 0.5],
    pin: [0.78, 0.3],
    agent: "Copilot",
    ask: "How much is the Sony WH-1000XM6 at Best Buy right now, and is there a deal on it?",
    said: "$399.99 at Best Buy.",
    page: { k: "bestbuy.com", v: "$458.00, two free gifts, pickup within the hour" },
    stat: { n: 4, of: 9, t: "answers, minutes apart, gave a different Best Buy price" },
  },
  {
    nm: "Dyson Airwrap i.d.",
    tag: [0.791, 0.485, 0.85, 0.631],
    flag: "No sale running",
    tab: "Airwrap",
    at: { mark: "ulta", name: "Ulta Beauty" },
    cut: "/img/v4/cut/airwrap.webp",
    box: [0.525, 0.365, 0.86, 0.59],
    pin: [0.535, 0.4],
    agent: "ChatGPT",
    ask: "Where should I buy the Dyson Airwrap i.d. today, and what will it actually cost me?",
    said: "$519.99 at Ulta Beauty, $130 off.",
    page: { k: "ulta.com", v: "$649.99, in stock, no sale running" },
    stat: { n: 9, of: 31, t: "priced answers quoted a sale that wasn't on" },
  },
  {
    nm: "Baccarat Rouge 540",
    tag: [0.562, 0.566, 0.627, 0.758],
    flag: "Sent her to Saks",
    tab: "Baccarat",
    at: { mark: "nordstrom", name: "Nordstrom" },
    cut: "/img/v7/cut/baccarat.webp",
    box: [0.485, 0.495, 0.625, 0.8],
    pin: [0.49, 0.66],
    agent: "Gemini",
    ask: "Nordstrom or Saks Fifth Avenue for Baccarat Rouge 540: which is the better buy?",
    said: "Saks is almost always the winner for pure value, thanks to promotions and credit card perks.",
    quote: true,
    page: { k: "nordstrom.com", v: "$715 for 6.8 oz, a gift with purchase and free returns" },
    stat: { n: 6, of: 11, t: "answers sent her to Saks first" },
    below: true,
  },
  {
    nm: "Kate Spade tote",
    tag: [0.906, 0.65, 0.962, 0.832],
    flag: "Promised a match",
    tab: "Kate Spade",
    at: { mark: "nordstrom", name: "Nordstrom" },
    cut: "",
    box: [0.79, 0.53, 0.98, 0.92],
    pin: [0.795, 0.72],
    agent: "Gemini",
    ask: "Nordstrom or Macy's for a Kate Spade tote?",
    said: "Nordstrom will match the Macy's price.",
    page: { k: "nordstrom.com", v: "\u201cWe don\u2019t price match other retailers.\u201d" },
    stat: { n: 5, of: 9, t: "answers promised a price match" },
    below: true,
  },
];
const SCAN = [0, 1, 2, 3, 4]; /* the order the ticks find the goods */

const IW = 2048;
const IH = 1152;
const CLUSTER: [number, number] = [0.47, 0.99];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState(0);
  const [phase, setPhase] = useState(0); /* 0 dark, 1 lit, 2 ticks, 3 selected, 4 card, 5 fixed, 6 ready */
  const [fixed, setFixed] = useState(false);
  const selRef = useRef(0);
  const readyRef = useRef(false);
  const layoutRef = useRef<() => void>(() => {});

  /* layout: place the still, the ticks, the copy, the card and the hairline */
  useEffect(() => {
    const el0 = root.current;
    if (!el0) return;
    const hero: HTMLElement = el0;
    const q = <T extends Element>(s: string) => hero.querySelector(s) as T;
    const qa = <T extends Element>(s: string) => Array.from(hero.querySelectorAll(s)) as T[];
    const frame = q<HTMLDivElement>(".hx__frame");
    const imgs = qa<HTMLImageElement>(".hx__img, .hx__tag");
    const wash = q<HTMLDivElement>(".hx__wash");
    const copy = q<HTMLDivElement>(".hx__copy");
    const card = q<HTMLDivElement>(".hx__rec");
    const line = q<SVGPathElement>(".hx__line path");
    const dot = q<SVGCircleElement>(".hx__line circle");
    const marks = qa<HTMLDivElement>(".hm");
    const hits = qa<HTMLButtonElement>(".hx__hit");
    const stacked = () => window.matchMedia("(max-width: 1199px)").matches;

    function layout() {
      const st = stacked();
      hero.toggleAttribute("data-stacked", st);
      const VW = window.innerWidth;
      const NAV = 84 + (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--barh")) || 0);
      let s: number, ox: number, oy: number, W: number, H: number;
      if (st) {
        hero.style.height = "";
        copy.style.cssText = "";
        card.style.cssText = "";
        W = frame.clientWidth;
        const span = CLUSTER[1] - CLUSTER[0];
        s = Math.min((W - 24) / (span * IW), (W < 700 ? 560 : Math.min(640, W * 0.62)) / IH);
        H = Math.round(IH * s);
        frame.style.height = H + "px";
        const cen = W / 2 - ((CLUSTER[0] + CLUSTER[1]) / 2) * IW * s;
        ox = Math.max(cen, W - IW * s);
        oy = 0;
        wash.style.background = "linear-gradient(180deg, rgba(6,9,17,.85) 0, rgba(6,9,17,0) 18%), linear-gradient(0deg, rgba(6,9,17,.9) 0, rgba(6,9,17,0) 14%)";
      } else {
        hero.style.height = "";
        frame.style.height = "";
        W = frame.clientWidth;
        H = frame.clientHeight;
        const tp = Math.round(Math.min(44, H * 0.045));
        const g0 = Math.max(48, (VW - 1280) / 2);
        const sFit = (H - tp) / IH;
        const sMax = (W - g0 - 600) / (IW * (1 - CLUSTER[0]));
        s = Math.min(sFit, sMax);
        ox = W - IW * s;
        oy = tp + Math.round((H - tp - IH * s) * 0.55);
      }
      imgs.forEach((img) => {
        img.style.width = IW + "px";
        img.style.height = IH + "px";
        img.style.transform = `translate(${ox}px, ${oy}px) scale(${s})`;
      });
      const img = imgs[0];
      const masks: string[] = [];
      if (ox > 1) masks.push("linear-gradient(90deg, transparent 0, #000 16%)");
      if (oy > 1) masks.push("linear-gradient(180deg, transparent 0, #000 9%)");
      img.style.setProperty("-webkit-mask-image", masks.length ? masks.join(", ") : "none");
      img.style.setProperty("mask-image", masks.length ? masks.join(", ") : "none");
      img.style.setProperty("-webkit-mask-composite", masks.length > 1 ? "source-in" : "");
      img.style.setProperty("mask-composite", masks.length > 1 ? "intersect" : "");
      const P = (fx: number, fy: number): [number, number] => [ox + fx * IW * s, oy + fy * IH * s];

      RECS.forEach((r, i) => {
        const [x0, y0] = P(r.box[0], r.box[1]);
        const [x1, y1] = P(r.box[2], r.box[3]);
        const box = { left: x0 + "px", top: y0 + "px", width: x1 - x0 + "px", height: y1 - y0 + "px" };
        Object.assign(marks[i].style, box);
        marks[i].toggleAttribute("data-below", y0 < 120 || !!r.below); /* keep the label out of the nav band */
        Object.assign(hits[i].style, box);
      });

      /* where the record sits: beside the goods on wide screens and tablets, under them on phones */
      const gL = st ? Math.max(24, parseFloat(getComputedStyle(copy).paddingLeft) || 24) : Math.max(48, (VW - 1280) / 2);
      const clusterL = P(CLUSTER[0], 0)[0];
      const roomL = clusterL - gL - 44;
      const beside = !st || roomL >= 330;
      hero.toggleAttribute("data-beside", st && beside);
      let cardX = 0;
      let cardY = 0;
      let cw = 0;
      let copyR = 0;
      if (!st) {
        const g = gL;
        const toeX = P(0.48, 0)[0];
        copy.style.left = card.style.left = g + "px";
        copy.style.maxWidth = Math.round(Math.min(700, toeX - g - 40)) + "px";
        cw = Math.round(Math.min(392, clusterL - g - 56));
        card.style.width = cw + "px";
        hero.removeAttribute("data-tight");
        let ch = copy.offsetHeight;
        let rh = card.offsetHeight;
        if (H - NAV - ch - rh - 40 < 48) {
          hero.setAttribute("data-tight", "");
          ch = copy.offsetHeight;
          rh = card.offsetHeight;
        }
        const gap = Math.min(64, Math.max(30, (H - NAV - ch - rh) * 0.26));
        const top = Math.max(NAV + 16, NAV + (H - NAV - ch - gap - rh) / 2);
        copy.style.top = top + "px";
        card.style.top = top + ch + gap + "px";
        /* a short screen grows the hero rather than clipping the record */
        const need = Math.round(top + ch + gap + rh + 28);
        if (need > H) hero.style.height = need + "px";
        cardX = g;
        cardY = top + ch + gap;
        /* the right edge of the words themselves, so the hairline's gutter never brushes the headline */
        const rg = document.createRange();
        rg.selectNodeContents(copy);
        const hr = hero.getBoundingClientRect();
        copyR = Math.max(...Array.from(rg.getClientRects()).map((r) => r.right - hr.left));
        const cr = g + Math.min(copy.offsetWidth, 600);
        wash.style.background = `linear-gradient(90deg, rgba(6,8,15,.82) 0, rgba(6,8,15,.6) ${Math.round(cr * 0.62)}px, rgba(6,8,15,0) ${Math.round(Math.max(cr + 20, clusterL - 10))}px)`;
      } else if (beside) {
        cw = Math.round(Math.min(392, roomL));
        Object.assign(card.style, { position: "absolute", left: "0px", width: cw + gL + "px", paddingRight: "0px" });
        const rh = card.offsetHeight;
        cardX = gL;
        cardY = Math.max(16, (H - rh) / 2);
        card.style.top = frame.offsetTop + cardY + "px";
        copyR = cardX + cw;
      }
      if (beside) {
        /* the hairline: out of the card's title row, along a clear gutter, then level into the product */
        const pin = RECS[selRef.current].pin;
        const [tx, ty] = P(pin[0], pin[1]);
        const cardEl = card.querySelector(".hx__card") as HTMLElement;
        const sx = cardX + cw;
        const sy = cardY + cardEl.offsetTop + 34;
        const kx = Math.min(Math.max(sx + 22, copyR + 32), tx - 30);
        line.setAttribute("d", `M${sx.toFixed(1)} ${sy.toFixed(1)} H${kx.toFixed(1)} V${ty.toFixed(1)} H${(tx - 10).toFixed(1)}`);
        dot.setAttribute("cx", (tx - 10).toFixed(1));
        dot.setAttribute("cy", ty.toFixed(1));
        const L = line.getTotalLength();
        line.style.strokeDasharray = `${L} ${L}`;
        line.style.setProperty("--len", String(L));
        if (drawNext.current && line.animate) {
          drawNext.current = false;
          line.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)" });
          dot.animate([{ opacity: 0, transform: "scale(.2)" }, { opacity: 1, transform: "scale(1)" }], { duration: 300, delay: 560, fill: "backwards", easing: "ease-out" });
        }
      }
    }
    layoutRef.current = layout;

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    };
    window.addEventListener("resize", onResize);

    /* the sequence, once */
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => {
      layout();
      if (reduce) {
        setPhase(6);
        setFixed(true);
        readyRef.current = true;
        return;
      }
      at(40, () => setPhase(1));
      at(420, () => setPhase(2));
      at(900, () => setPhase(3));
      at(1180, () => setPhase(4));
      at(1600, () => {
        setPhase(5);
        setFixed(true);
      });
      at(2000, () => {
        setPhase(6);
        readyRef.current = true;
      });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    else start();
    return () => {
      window.removeEventListener("resize", onResize);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* choosing a product: re-route the hairline, replay the one correction */
  const fixT = useRef(0);
  const drawNext = useRef(false);
  function choose(i: number, force = false) {
    if (!force && !readyRef.current) return;
    if (i === selRef.current) return;
    selRef.current = i;
    setSel(i);
    setFixed(false);
    window.clearTimeout(fixT.current);
    fixT.current = window.setTimeout(() => setFixed(true), 520);
    drawNext.current = true;
    requestAnimationFrame(() => layoutRef.current());
  }

  /* the records play on their own, one after another; a click hands control to the visitor for a while */
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (phase < 6) return;
    const t = window.setTimeout(() => {
      if (manual) setManual(false);
      else choose((selRef.current + 1) % RECS.length, true);
    }, manual ? 12000 : 3600);
    return () => window.clearTimeout(t);
  }, [phase, sel, manual]);

  const r = RECS[sel];
  const cls = ["hx", phase >= 1 && "is-lit", phase >= 2 && "is-ticks", phase >= 3 && "is-sel", phase >= 4 && "is-card", phase >= 5 && "is-fixed", phase >= 6 && "is-ready"].filter(Boolean).join(" ");

  return (
    <section className={cls} data-hero ref={root} aria-label="Introduction">
      <div className="hx__frame">
        <div className="hx__stage">
          <img
            className="hx__img"
            src="/img/v8/hero-n-2048.webp"
            srcSet="/img/v8/hero-n-1024.webp 1024w, /img/v8/hero-n-1440.webp 1440w, /img/v8/hero-n-2048.webp 2048w"
            sizes="(max-width: 1199px) 190vw, 100vw"
            width={IW}
            height={IH}
            alt="On dark stone: a Nike Vomero 18 dissolving into a wireframe, Sony WH-1000XM6 headphones in silver, a Dyson Airwrap i.d., a bottle of Baccarat Rouge 540 and a Kate Spade tote, each with a paper price tag"
            fetchPriority="high"
          />
          {RECS.map((p, i) => (
            <img
              key={p.nm}
              className={`hx__tag ${i === sel && phase >= 3 ? "is-on" : ""}`}
              src="/img/v8/hero-2048.webp"
              srcSet="/img/v8/hero-1024.webp 1024w, /img/v8/hero-1440.webp 1440w, /img/v8/hero-2048.webp 2048w"
              sizes="(max-width: 1199px) 190vw, 100vw"
              width={IW}
              height={IH}
              alt=""
              aria-hidden="true"
              style={{ clipPath: `inset(${p.tag[1] * 100}% ${(1 - p.tag[2]) * 100}% ${(1 - p.tag[3]) * 100}% ${p.tag[0] * 100}% round 6px)` }}
            />
          ))}
          <div className="hx__wash" />
          <div className="hx__marks" aria-hidden="true">
            {RECS.map((p, i) => (
              <div key={p.nm} className={`hm ${i === sel ? "is-on" : ""}`} style={{ ["--d" as string]: `${SCAN.indexOf(i) * 0.09}s` }}>
                <i />
                <i />
                <i />
                <i />
                <b>{p.nm}</b>
              </div>
            ))}
          </div>
          <svg className="hx__line" aria-hidden="true">
            <path />
            <circle r="2.6" />
          </svg>
          <div className="hx__hits" aria-hidden="true">
            {RECS.map((p, i) => (
              <button key={p.nm} type="button" tabIndex={-1} className="hx__hit" onClick={() => { setManual(true); choose(i, true); }} />
            ))}
          </div>
        </div>
      </div>

      <div className="hx__copy">
        <h1 className="hx__h">
          <span>Your next customer</span> <span>just asked an AI</span>{" "}
          <span>
            what to buy<i className="sq" aria-hidden="true" />
          </span>
        </h1>
        <p className="hx__sub">Parleo is the agentic commerce platform: your catalog, content, pricing and incentives, published to every AI surface, verified back, and proven in revenue.</p>
        <div className="hx__ctas">
          <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
            Get your Agentic Value Report
          </Btn>
          <Btn onClick={() => openStart()} variant="outline-dark" size="lg">
            Start with your top SKUs
          </Btn>
        </div>
      </div>

      <div className="hx__rec">
        <div className="hx__pick" role="tablist" aria-label="Products">
          {RECS.map((p, i) => (
            <button key={p.nm} type="button" role="tab" aria-selected={i === sel} className={i === sel ? "is-on" : ""} onClick={() => {
                setManual(true);
                choose(i, true);
              }}>
              {p.tab}
            </button>
          ))}
        </div>

        <div className={`hx__card hx8 ${fixed ? "is-fixed" : ""}`} key={sel} aria-live="polite">
          <div className="hx8__top">
            <span className="hx8__at">{r.at.mark ? <Mark k={r.at.mark} h={10} title={r.at.name} /> : r.at.name}</span>
            <span className="hx8__rec">
              <i aria-hidden="true" />
              Parleo record
            </span>
            <span className="hx8__apps" title="Live in five assistants">
              {AGENTS5.map((a, k) => (
                <i key={a} style={{ ["--k" as string]: k }}>
                  <App a={a} size={12} />
                </i>
              ))}
            </span>
          </div>
          <p className="hx8__q">
            <App a={r.agent || "ChatGPT"} size={15} />
            <span>{r.ask}</span>
          </p>
          <div className="hx8__row is-said">
            <span className="hx8__k">
              {r.agent || "ChatGPT"} said <u>{r.flag}</u>
            </span>
            <p>{r.quote ? <>&ldquo;{r.said}&rdquo;</> : r.said}</p>
          </div>
          <div className="hx8__row is-page">
            <span className="hx8__k">
              {r.page.k}
              <u>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.6 6.3 5 8.6l4.4-5" />
                </svg>
                Verified
              </u>
            </span>
            <p>{r.page.v}</p>
          </div>
          {!manual && phase >= 6 && <i className="hx8__prog" aria-hidden="true" key={`p${sel}`} />}
        </div>
      </div>

    </section>
  );
}
