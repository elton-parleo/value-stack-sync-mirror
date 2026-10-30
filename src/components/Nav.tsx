import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Btn, EASE, Wordmark } from "./primitives";
import StartPanel from "./StartPanel";
import { openStart } from "./start";
import { App, Icon, Mark, type IconName } from "@/site/v4kit";
import "./nav.css";
import "./nav7.css";

/* Primary navigation: an announcement bar, three menus with a featured panel each, the report as a
   direct link, and the two calls to action. Phones get the same structure as an accordion sheet. */
type Item = { to: string; k: string; d: string; i: IconName };
type Menu = { id: string; label: string; items: Item[]; feature: "product" | "solutions" | "resources" };
const MENUS: Menu[] = [
  {
    id: "product",
    label: "Product",
    feature: "product",
    items: [
      { to: "/product#measure", k: "Measure", d: "Share of Algorithm, and every answer next to your page", i: "eye" },
      { to: "/product#truesync", k: "TrueSync", d: "One checked record, published everywhere agents read", i: "fork" },
      { to: "/product#value", k: "Value", d: "Member prices, points and funded offers in the answer", i: "tag" },
      { to: "/product#fix", k: "Fix", d: "Every fix ranked by dollars, owned and approved", i: "check" },
      { to: "/product#brand", k: "Brand content", d: "Names, claims and materials agents read the same way", i: "record" },
      { to: "/product#prove", k: "Prove", d: "A weekly readout of what changed, in dollars", i: "dollar" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    feature: "solutions",
    items: [
      { to: "/#brands", k: "For brands", d: "Make the trade spend you already fund show up in the answer", i: "tag" },
      { to: "/#retailers", k: "For retailers", d: "Put member value in front of the assistant, and win at full price", i: "people" },
      { to: "/product#works-with", k: "Works with", d: "Every major assistant, feed and commerce protocol", i: "layers" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    feature: "resources",
    items: [
      { to: "/insights", k: "Insights", d: "Research and points of view on the agentic commerce shelf", i: "spark" },
      { to: "/what-is-agentic-commerce", k: "What is agentic commerce?", d: "The field guide: numbers, protocols and benchmarks", i: "layers" },
      { to: "/insights/share-of-algorithm", k: "Share of Algorithm", d: "The 100-point score behind every report", i: "eye" },
      { to: "/agentic-value-report#samples", k: "Sample reports", d: "Real reports from Parleo research", i: "readback" },
      { to: "/about", k: "About Parleo", d: "Why we exist, the founding team and our investors", i: "people" },
    ],
  },
];
const AGENTS = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot", "Claude"];

function Feature({ f, close }: { f: Menu["feature"]; close: () => void }) {
  if (f === "product")
    return (
      <Link to="/product" className="nv7__feat nv7__feat--dark" onClick={close}>
        <span className="nv7__fk">The Parleo console</span>
        <div className="nv7__score">
          <span className="nv7__ring" style={{ ["--p" as string]: 0.47 }}>
            <b>47</b>
          </span>
          <span>
            <b>Share of Algorithm</b>
            <em>Visibility, access and true value, scored weekly against your competitors</em>
          </span>
        </div>
        <div className="nv7__bars" aria-hidden="true">
          {[0.62, 0.24, 0.48, 0.16, 0.36].map((w, i) => (
            <i key={i} style={{ ["--w" as string]: w }} />
          ))}
        </div>
        <span className="nv7__go">
          See the product <Icon n="arrow" size={14} />
        </span>
      </Link>
    );
  if (f === "solutions")
    return (
      <Link to="/agentic-value-report#samples" className="nv7__feat" onClick={close}>
        <span className="nv7__fk">From Parleo research</span>
        <div className="nv7__logos">
          {["target", "nike", "ulta", "lowes", "nordstrom", "bestbuy", "sephora", "gap", "hm"].map((m) => (
            <span key={m}>
              <Mark k={m} h={13} title={m} />
            </span>
          ))}
        </div>
        <p>Studies of what five assistants tell shoppers about the best sellers at brands and retailers you know.</p>
        <span className="nv7__go">
          Read a sample report <Icon n="arrow" size={14} />
        </span>
      </Link>
    );
  return (
    <Link to="/insights/how-ai-shopping-agents-decide" className="nv7__feat nv7__feat--img" onClick={close}>
      <img src="/insights/how-agents-decide.webp" alt="" loading="lazy" />
      <span className="nv7__fk">Latest research</span>
      <b>How AI shopping agents decide what to recommend</b>
      <span className="nv7__go">
        Read it <Icon n="arrow" size={14} />
      </span>
    </Link>
  );
}

export default function Nav({ heroDark = false }: { heroDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(!heroDark);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>("product");
  /* v8: announcement bar retired on Samar's call. Flip to true to bring it back. */
  const [bar, setBar] = useState(false);
  const closeT = useRef(0);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (heroDark) {
        const hero = document.querySelector<HTMLElement>("[data-hero]");
        const h = hero ? hero.offsetHeight - 72 : 600;
        setPastHero(window.scrollY > h);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroDark]);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [loc.pathname, loc.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    document.documentElement.style.setProperty("--barh", bar && !scrolled ? "38px" : "0px");
  }, [bar, scrolled]);

  const dark = heroDark && !pastHero && !open && !menu;
  const hoverAt = useRef(0);
  const enter = (id: string) => {
    if (menu !== id) hoverAt.current = Date.now();
    window.clearTimeout(closeT.current);
    setMenu(id);
  };
  const leave = () => {
    closeT.current = window.setTimeout(() => setMenu(null), 160);
  };
  const close = () => setMenu(null);
  const dismiss = () => {
    setBar(false);
    try {
      localStorage.setItem("pl-bar-v7", "x");
    } catch {
      /* per-viewer convenience only */
    }
  };
  const active = MENUS.find((m) => m.id === menu);

  return (
    <>
      {bar && (
      <div className={`nv7bar ${bar && !scrolled ? "is-on" : ""}`}>
        <div className="wrap nv7bar__in">
          <span className="nv7bar__wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <Link to="/agentic-value-report" className="nv7bar__t">
            <b>The Agentic Value Report.</b> <span className="nv7bar__rest">What five AI assistants tell your shoppers, scored and priced.</span>
          </Link>
          <Link to="/agentic-value-report" className="nv7bar__go">
            Get yours <Icon n="arrow" size={13} />
          </Link>
          <button className="nv7bar__x" aria-label="Dismiss" onClick={dismiss}>
            <Icon n="cross" size={13} />
          </button>
        </div>
      </div>
      )}
      <header className={`nav nv7 ${dark ? "nav--dark" : ""} ${scrolled ? "nav--scrolled" : ""} ${menu ? "is-menu" : ""}`} onMouseLeave={leave}>
        <div className="wrap nav__in">
          <Link to="/" className="nav__brand" aria-label="Parleo home">
            <Wordmark size={15} dark={dark} />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {MENUS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`nav__link nv7__trig ${menu === m.id ? "is-open" : ""} ${(m.id === "product" && loc.pathname === "/product") || (m.id === "resources" && loc.pathname.startsWith("/insights")) ? "is-active" : ""}`}
                aria-expanded={menu === m.id}
                onMouseEnter={() => enter(m.id)}
                onClick={() => setMenu(menu === m.id && Date.now() - hoverAt.current > 500 ? null : m.id)}
              >
                {m.label}
                <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden="true">
                  <path d="M2 3.8 5 6.6l3-2.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <NavLink to="/agentic-value-report" className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`} onMouseEnter={leave}>
              Agentic Value Report <em className="nv7__free">Free</em>
            </NavLink>
          </nav>
          <div className="nav__cta">
            <Btn onClick={() => openStart()} variant={dark ? "ghost-dark" : "ghost"} size="sm" className="hide-mobile">
              Start with your top SKUs
            </Btn>
            <Btn to="/agentic-value-report" variant="blue" size="sm" className="hide-mobile">
              Get your report
            </Btn>
            <button className="nav__burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span />
              <span />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              className="nv7__mega"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={() => enter(active.id)}
            >
              <div className="wrap nv7__grid">
                <ul className={`nv7__items ${active.items.length > 4 ? "is-two" : ""}`}>
                  {active.items.map((it) => (
                    <li key={it.k}>
                      <Link to={it.to} onClick={close}>
                        <span className="nv7__i">
                          <Icon n={it.i} size={17} />
                        </span>
                        <span>
                          <b>{it.k}</b>
                          <em>{it.d}</em>
                        </span>
                      </Link>
                    </li>
                  ))}
                  {active.id === "solutions" && (
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          close();
                          openStart();
                        }}
                      >
                        <span className="nv7__i is-blue">
                          <Icon n="trend" size={17} />
                        </span>
                        <span>
                          <b>Start with your top SKUs</b>
                          <em>Twenty products, five assistants, a weekly readout</em>
                        </span>
                      </button>
                    </li>
                  )}
                </ul>
                <Feature f={active.feature} close={close} />
              </div>
              <div className="wrap nv7__foot">
                <span>Reads and writes for</span>
                {AGENTS.map((a) => (
                  <App key={a} a={a} size={16} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet nv7sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.nav className="sheet__in" initial={{ y: 16 }} animate={{ y: 0 }} exit={{ y: 8 }} transition={{ duration: 0.4, ease: EASE }} aria-label="Mobile">
              {MENUS.map((m) => (
                <div key={m.id} className={`nv7sheet__g ${acc === m.id ? "is-open" : ""}`}>
                  <button type="button" className="nv7sheet__h" aria-expanded={acc === m.id} onClick={() => setAcc(acc === m.id ? null : m.id)}>
                    {m.label}
                    <svg viewBox="0 0 10 10" width="12" height="12" aria-hidden="true">
                      <path d="M2 3.8 5 6.6l3-2.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {acc === m.id && (
                    <ul>
                      {m.items.map((it) => (
                        <li key={it.k}>
                          <Link to={it.to}>
                            <span className="nv7__i">
                              <Icon n={it.i} size={15} />
                            </span>
                            <span>
                              <b>{it.k}</b>
                              <em>{it.d}</em>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Link to="/agentic-value-report" className="nv7sheet__h nv7sheet__solo">
                Agentic Value Report <em className="nv7__free">Free</em>
              </Link>
              <div className="sheet__ctas">
                <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
                  Get your Agentic Value Report
                </Btn>
                <Btn
                  onClick={() => {
                    setOpen(false);
                    openStart();
                  }}
                  variant="outline"
                  size="lg"
                >
                  Start with your top SKUs
                </Btn>
              </div>
              <div className="sheet__foot">
                <a href="https://www.linkedin.com/company/parleo-sf/">LinkedIn</a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      <StartPanel />
    </>
  );
}
