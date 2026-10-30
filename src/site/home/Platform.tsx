import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Head, Img, useOnce } from "../kit";
import { App, Icon, Mark, Spec } from "../v4kit";

/* 07 · The platform, shown as the console's first screen for one brand: the lead signal on a still,
   and TrueSync building one record per product beside it. The adidas workspace is built from public
   data (ChatGPT shopping cards, adidas.com and retailer pages). Nothing publishes until adidas signs off. */
type Surface = { k: string; ic: { app?: string; icon?: "tag" | "layers" | "readback"; code?: boolean }; v: string; wait?: boolean };
const SURFACES: Surface[] = [
  { k: "Site markup", ic: { code: true }, v: "Compiled" },
  { k: "Manufacturer Center", ic: { app: "AI Mode" }, v: "Compiled" },
  { k: "OpenAI product feed", ic: { app: "ChatGPT" }, v: "Needs sign-off", wait: true },
  { k: "UCP", ic: { app: "Gemini" }, v: "Compiled" },
  { k: "Deals API", ic: { icon: "tag" }, v: "Compiled" },
  { k: "MCP server", ic: { icon: "layers" }, v: "Compiled" },
  { k: "WebMCP", ic: { icon: "readback" }, v: "Compiled" },
];
const CHAPTERS: [string, string, "eye" | "fork" | "tag" | "check" | "dollar", string][] = [
  ["Measure", "/product#measure", "eye", "What every agent says, scored"],
  ["TrueSync", "/product#truesync", "fork", "One record, every surface"],
  ["Value", "/product#value", "tag", "Member value in the answer"],
  ["Fix", "/product#fix", "check", "Ranked, owned, approved"],
  ["Prove", "/product#prove", "dollar", "Dollars, every week"],
];

function SurfIcon({ s }: { s: Surface }) {
  if (s.ic.app) return <App a={s.ic.app} size={16} />;
  if (s.ic.icon) return <Icon n={s.ic.icon} size={15} />;
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5" />
    </svg>
  );
}

export default function Platform() {
  const [ref, on] = useOnce<HTMLDivElement>(0.25);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(SURFACES.length);
      return;
    }
    const t: number[] = [];
    SURFACES.forEach((_, i) => t.push(window.setTimeout(() => setN(i + 1), 1100 + i * 260)));
    return () => t.forEach(clearTimeout);
  }, [on]);
  const done = SURFACES.slice(0, n).filter((s) => !s.wait).length;

  return (
    <section className="sec pl pl6" id="platform">
      <div className="wrap in6">
        <Head lead="Parleo scores, tracks and optimizes" more="how AI agents recommend you." sq />
        <div className="in6__body">
          <p className="body">
            See how every major AI assistant describes, ranks and prices you, and <b>fix what it gets wrong before a shopper sees it.</b> Put your best offers into the answer, then watch what it&rsquo;s worth, week by week.
          </p>
        </div>
      </div>

      <div className={`wrap wrap--wide pl6__stage ${on ? "is-on" : ""}`} ref={ref}>
        <article className="pl6__lead pl7" aria-label="What Parleo found for adidas">
          <div className="pl7__legs" aria-hidden="true">
            <img src="/img/v4/photo/ad_samba_red_portrait.webp" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="pl6__body">
            <span className="pl6__src">
              <App a="ChatGPT" size={16} />
              12 ChatGPT shopping cards for adidas
            </span>
            <h3>Agents recommend adidas, then send the sale somewhere else.</h3>
            <div className="pl6__split">
              <div className="pl6__n is-blue">
                <span className="pl6__who">
                  <Mark k="adidas" h={12} dark title="adidas" /> adidas.com
                </span>
                <b>
                  0<small>of 12</small>
                </b>
                <span className="pl6__k">cards link to adidas</span>
              </div>
              <div className="pl6__n">
                <span className="pl6__who">
                  <Mark k="dicks" h={10} dark title="DICK'S" />
                  <Mark k="nordstrom" h={10} dark title="Nordstrom" />
                  <Mark k="samsclub" h={10} dark title="Sam's Club" />
                </span>
                <b>
                  11<small>of 12</small>
                </b>
                <span className="pl6__k">go to retailers, and one to nike.com</span>
              </div>
            </div>
            <div className="pl6__fix">
              <span className="pl6__fixi" aria-hidden="true">
                <Icon n="record" size={18} />
              </span>
              <div>
                <span className="pl6__fixk">The fix</span>
                <p>Send the OpenAI product feed for Samba, Gazelle, Adizero and Ultraboost, with adiClub attached.</p>
              </div>
            </div>
            <div className="pl6__own">
              <span className="pl6__team">EC</span>
              <span>Ecommerce</span>
              <em>Needs sign-off</em>
              <span className="pl6__btns" aria-hidden="true">
                <span className="pl6__btn pl6__btn--w">Approve the fix</span>
                <span className="pl6__btn">See the 12 cards</span>
              </span>
            </div>
          </div>
        </article>

        <aside className="pl6__sync" aria-label="TrueSync for adidas">
          <header>
            <span className="pl6__ts">
              <Icon n="fork" size={17} /> TrueSync
            </span>
            <span className="pl6__mode">Built from public data</span>
          </header>
          <div className="pl6__rec">
            <span className="pl6__thumbs" aria-hidden="true">
              <Spec src="samba_b75806" alt="" />
              <Spec src="evosl" alt="" />
              <Spec src="ultraboost5x" alt="" />
              <i>+1</i>
            </span>
            <span>
              <b>4 products</b>
              <em>One checked record each</em>
            </span>
          </div>
          <ul className="pl6__tree">
            {SURFACES.map((s, i) => (
              <li key={s.k} className={`${i < n ? "is-on" : ""} ${s.wait ? "is-wait" : ""}`} style={{ ["--i" as string]: i }}>
                <span className="pl6__si">
                  <SurfIcon s={s} />
                </span>
                <b>{s.k}</b>
                <span className="pl6__sv">
                  {i < n ? (
                    <>
                      {s.wait ? <i className="pl6__dot" /> : <Icon n="check" size={13} />}
                      {s.wait ? (
                        <>
                          <span className="pl6__long">Ready, needs sign-off</span>
                          <span className="pl6__short">{s.v}</span>
                        </>
                      ) : (
                        s.v
                      )}
                    </>
                  ) : (
                    "Compiling"
                  )}
                </span>
              </li>
            ))}
          </ul>
          <footer>
            <span>
              <b>{done}</b> of 7 surfaces ready
            </span>
            <span>Nothing publishes until adidas signs off.</span>
          </footer>
        </aside>
      </div>

      <div className="wrap">
        <p className="src pl6__note">The adidas workspace, built from public data. Yours runs on your own catalog and the competitors you choose.</p>
        <nav className="pl6__ch" aria-label="The product">
          {CHAPTERS.map(([k, to, ic, d]) => (
            <Link key={k} to={to}>
              <span className="pl6__chi">
                <Icon n={ic} size={17} />
              </span>
              <b>{k}</b>
              <em>{d}</em>
            </Link>
          ))}
          <Link to="/product" className="pl6__all">
            See the product <Icon n="arrow" size={16} />
          </Link>
        </nav>
      </div>
    </section>
  );
}
