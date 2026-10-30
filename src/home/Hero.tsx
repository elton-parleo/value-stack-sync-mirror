import { motion, useReducedMotion } from "framer-motion";
import { Btn } from "@/components/primitives";
import { EASE, Logo, LogoPill } from "@/ds";
import { jump } from "@/lib/scroll";

const TRUTH = ["Catalog and variants", "Price and availability", "Offers and incentives", "Content and policy"];
const AGENTS = ["ChatGPT", "Gemini", "Perplexity", "Copilot", "AI Mode"];
const AUDITED = ["Petco", "Pampers", "Gap", "Ulta", "Nordstrom", "adidas", "Kimberly-Clark"];

/* Diagram geometry, in a 600 x 460 box. */
const CARD = { x: 0, y: 112, w: 250, h: 236 };
const PILL_X = 410;
const PILL_Y = [52, 141, 230, 319, 408];
const ORIGIN = { x: CARD.x + CARD.w, y: CARD.y + CARD.h / 2 };
const path = (y: number) => `M${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x + 90} ${ORIGIN.y}, ${PILL_X - 90} ${y}, ${PILL_X} ${y}`;
const BACK = `M${PILL_X + 70} ${PILL_Y[4] + 22} C ${PILL_X + 60} 470, ${CARD.w * 0.6} 470, ${CARD.w * 0.55} ${CARD.y + CARD.h + 6}`;

function Fan() {
  const reduce = useReducedMotion();
  return (
    <div className="fan" aria-label="Product truth published once to ChatGPT, Gemini, Perplexity, Copilot and AI Mode, then verified back">
      <svg className="fan__svg" viewBox="0 0 600 470" fill="none" aria-hidden="true">
        {PILL_Y.map((y, i) => (
          <g key={y}>
            <motion.path
              d={path(y + 22)}
              className="fan__line"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.1 + i * 0.09, ease: EASE }}
            />
            {!reduce && (
              <circle r="3.2" className="fan__pulse">
                <animateMotion dur="2.8s" begin={`${2.2 + i * 0.45}s`} repeatCount="indefinite" path={path(y + 22)} />
              </circle>
            )}
          </g>
        ))}
        <motion.path
          d={BACK}
          className="fan__back"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.1, ease: EASE }}
        />
      </svg>

      <motion.div
        className="fan__card"
        style={{ left: `${(CARD.x / 600) * 100}%`, top: `${(CARD.y / 470) * 100}%`, width: `${(CARD.w / 600) * 100}%` }}
        initial={reduce ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      >
        <div className="fan__card-top">
          <svg width="14" height="12" viewBox="0 0 46 40" aria-hidden="true">
            <rect width="19" height="40" rx="6" fill="#0166FF" />
            <rect x="27" y="9" width="15" height="22" rx="5" fill="#7FB0FF" />
          </svg>
          <span className="ml ml--dark">Product truth</span>
        </div>
        <ul>
          {TRUTH.map((t, i) => (
            <motion.li key={t} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.12 }}>
              <motion.span
                className="fan__tick"
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 400, damping: 22 }}
              >
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
              {t}
            </motion.li>
          ))}
        </ul>
        <span className="ml ml--dark fan__once">Published once</span>
      </motion.div>

      {AGENTS.map((a, i) => (
        <motion.div
          key={a}
          className="fan__pill"
          style={{ left: `${(PILL_X / 600) * 100}%`, top: `${(PILL_Y[i] / 470) * 100}%` }}
          initial={reduce ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 1.5 + i * 0.1, ease: EASE }}
        >
          <Logo name={a} size={18} />
          <span>{a}</span>
          <i className="fan__ok" />
        </motion.div>
      ))}

      <motion.span
        className="fan__back-label ml"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.5 }}
      >
        Verified back, every week
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: EASE },
  });
  return (
    <section className="hero" data-hero>
      <picture>
        <source type="image/webp" srcSet="/img/hero-specimen-1024.webp 1024w, /img/hero-specimen-1600.webp 1600w, /img/hero-specimen-2560.webp 2560w" sizes="100vw" />
        <img src="/img/hero-specimen-1600.webp" alt="" className="hero__img" fetchPriority="high" />
      </picture>
      <div className="hero__wash" />
      <div className="hero__grain" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <motion.h1 className="hero__h" {...fade(0.1)}>
            Your next customer just asked an AI <em>what to buy.</em>
          </motion.h1>
          <motion.p className="hero__sub" {...fade(0.22)}>
            Parleo is the agentic commerce platform for brands and retailers. Your catalog, pricing, promotions and loyalty, published to every AI surface, <b>verified back every week</b>, and proven in revenue.
          </motion.p>
          <motion.div className="hero__ctas" {...fade(0.32)}>
            <Btn to="/agentic-value-audit" variant="blue" size="lg" arrow>
              Get your free Agentic Value Audit
            </Btn>
            <Btn to="/product" variant="outline-dark" size="lg">
              See TrueSync
            </Btn>
          </motion.div>
          <motion.div className="hero__doors" {...fade(0.4)}>
            <span className="ml ml--dark">Public data only. Read-out in days.</span>
            <span className="hero__door-links">
              <a href="#brands" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("parleo:door", { detail: "brand" })); jump("doors")(); }}>
                I sell through retailers
              </a>
              <a href="#retailers" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("parleo:door", { detail: "retailer" })); jump("doors")(); }}>
                I run the store
              </a>
            </span>
          </motion.div>
        </div>
        <div className="hero__viz">
          <Fan />
        </div>
      </div>
      <motion.div className="wrap hero__proof" {...fade(0.6)}>
        <span className="ml ml--dark">Audited since September 28</span>
        <div className="hero__logos">
          {AUDITED.map((a) => (
            <a key={a} href="#audits" onClick={jump("audits")} className="hero__logo-link" aria-label={`${a} audit finding`}>
              <LogoPill name={a} dark />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
