import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { App, Icon, Mark } from "../v4kit";

/* How TrueSync works, the console's own diagram, staged for the site.
   One offer record in (CÉCRED Edge Drops at Ulta Beauty), published to every surface agents read,
   read back every week with the same questions. Where agents disagree with the record feeds the next
   release. Record from ulta.com, answers from Parleo's Ulta research. */

const FIELDS: { k: string; v: string; src: "Retailer" | "Brand" }[] = [
  { k: "Price", v: "$56.00", src: "Retailer" },
  { k: "Where to buy", v: "Only at Ulta Beauty", src: "Retailer" },
  { k: "Gift", v: "Lotion free with $45 of CÉCRED", src: "Brand" },
  { k: "Rewards", v: "Ulta Beauty Rewards points", src: "Retailer" },
];
const SURFACES: { k: string; g: "code" | "gmc" | "openai" | "google" | "api" | "mcp" | "web" }[] = [
  { k: "Site markup", g: "code" },
  { k: "Merchant Center", g: "gmc" },
  { k: "OpenAI feed", g: "openai" },
  { k: "UCP", g: "google" },
  { k: "Deals API", g: "api" },
  { k: "MCP server", g: "mcp" },
  { k: "WebMCP", g: "web" },
];
const AGENTS = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"];
const READ: { a: string; v: string; t: "ok" | "bad"; w: string }[] = [
  { a: "ChatGPT", v: "\u201cTry C\u00e9cred.com first\u201d", t: "bad", w: "Sent to the brand" },
  { a: "AI Mode", v: "\u201cDirectly from the brand\u2019s official site\u201d", t: "bad", w: "Ulta left out" },
  { a: "Copilot", v: "\u201cUlta Beauty\u201d", t: "ok", w: "Matches the record" },
];

function Glyph({ g }: { g: (typeof SURFACES)[number]["g"] }) {
  if (g === "gmc") return <Mark k="gmc" h={9} />;
  if (g === "openai") return <Mark k="openai" h={9} />;
  if (g === "google") return <App a="AI Mode" size={14} />;
  const d: Record<string, string> = {
    code: "M6.5 6 3 10l3.5 4M13.5 6 17 10l-3.5 4",
    api: "M7 4.5c-1.6 0-2 .8-2 2v1.6c0 1-.6 1.6-1.6 1.9 1 .3 1.6.9 1.6 1.9v1.6c0 1.2.4 2 2 2M13 4.5c1.6 0 2 .8 2 2v1.6c0 1 .6 1.6 1.6 1.9-1 .3-1.6.9-1.6 1.9v1.6c0 1.2-.4 2-2 2",
    mcp: "M4 11.5 10.5 5a2.1 2.1 0 0 1 3 3L8 13.5M8.5 15.5l5.5-5.5a2.1 2.1 0 0 1 3 3l-4.6 4.6",
    web: "M3.5 6.5h13v8a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-8ZM3.5 6.5V5A1.5 1.5 0 0 1 5 3.5h10A1.5 1.5 0 0 1 16.5 5v1.5",
  };
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d[g]} />
    </svg>
  );
}

type P = { x: number; y: number };
export default function Loop({ play = true }: { play?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{ fan: string[]; out: string[]; rec: string; read: string; back: string; w: number; h: number } | null>(null);
  const [step, setStep] = useState(0);

  /* draw the connectors from the boxes themselves, so they hold at any width */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
      const r0 = el.getBoundingClientRect();
      const box = (s: string) => {
        const e = el.querySelector(s) as HTMLElement | null;
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { l: r.left - r0.left, t: r.top - r0.top, r: r.right - r0.left, b: r.bottom - r0.top, cy: r.top - r0.top + r.height / 2, cx: r.left - r0.left + r.width / 2 };
      };
      const rec = box(".lp__rec");
      const read = box(".lp__read");
      const pills = Array.from(el.querySelectorAll(".lp__pill")).map((e) => {
        const r = (e as HTMLElement).getBoundingClientRect();
        return { l: r.left - r0.left, r: r.right - r0.left, cy: r.top - r0.top + r.height / 2 };
      });
      const ags = Array.from(el.querySelectorAll(".lp__ag")).map((e) => {
        const r = (e as HTMLElement).getBoundingClientRect();
        return { l: r.left - r0.left, r: r.right - r0.left, cy: r.top - r0.top + r.height / 2 };
      });
      if (!rec || !read || !pills.length || !ags.length) return;
      const stacked = window.matchMedia("(max-width: 900px)").matches;
      if (stacked) {
        setPaths(null);
        return;
      }
      const o: P = { x: rec.r + 4, y: rec.cy };
      const fan = pills.map((p) => {
        const mx = o.x + (p.l - o.x) * 0.55;
        return `M${o.x} ${o.y} C${mx} ${o.y} ${mx} ${p.cy} ${p.l} ${p.cy}`;
      });
      /* surfaces to agents: each surface runs to a shared bus, the bus feeds every agent */
      const busX = (pills[0].r + ags[0].l) / 2;
      const out = [
        ...pills.map((p) => `M${p.r} ${p.cy} H${busX}`),
        `M${busX} ${Math.min(pills[0].cy, ags[0].cy)} V${Math.max(pills[pills.length - 1].cy, ags[ags.length - 1].cy)}`,
        ...ags.map((a) => `M${busX} ${a.cy} H${a.l}`),
      ];
      const agR = Math.max(...ags.map((a) => a.r));
      const busY = ags[Math.floor(ags.length / 2)].cy;
      const readP = `M${agR + 6} ${busY} H${read.l - 4}`;
      const recP = `M${rec.r} ${rec.cy} H${rec.r + 4}`;
      const low = Math.max(rec.b, read.b, pills[pills.length - 1].cy) + 34;
      const back = `M${read.cx} ${read.b + 2} V${low} H${rec.cx} V${rec.b + 6}`;
      setPaths({ fan, out, rec: recP, read: readP, back, w: r0.width, h: r0.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* plays once: record, compile, publish, agents read, read back, loop */
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(6);
      return;
    }
    const t = [300, 600, 1000, 2100, 2900, 3900].map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, [play]);

  return (
    <div className={`lp lp6 is-s${step}`} ref={root}>
      {paths && (
        <svg className="lp__svg" width={paths.w} height={paths.h} viewBox={`0 0 ${paths.w} ${paths.h}`} aria-hidden="true">
          <path className="lp__ln lp__ln--rec" d={paths.rec} pathLength={1} />
          {paths.fan.map((d, i) => (
            <path key={i} className="lp__ln lp__ln--fan" d={d} pathLength={1} style={{ ["--d" as string]: `${i * 0.06}s` }} />
          ))}
          {paths.out.map((d, i) => (
            <path key={`o${i}`} className="lp__ln lp__ln--out" d={d} pathLength={1} />
          ))}
          <path className="lp__ln lp__ln--read" d={paths.read} pathLength={1} />
          <path className="lp__ln lp__ln--back" d={paths.back} pathLength={1} />
        </svg>
      )}

      <div className="lp__col lp__col--rec">
        <span className="lp__k">
          <b>1</b> One record
        </span>
        <div className="lp__rec">
          <div className="lp__prod">
            <span className="lp__thumb">
              <img src="/img/v6/cecred.webp" alt="" />
            </span>
            <span>
              <Mark k="ulta" h={13} title="Ulta Beauty" />
              <b>CÉCRED Restoring Hair &amp; Edge Drops</b>
              <em>1.7 fl oz, an Ulta exclusive</em>
            </span>
          </div>
          <ul>
            {FIELDS.map((f) => (
              <li key={f.k} className={`is-${f.src.toLowerCase()}`}>
                <span>{f.k}</span>
                <b>{f.v}</b>
                <em>{f.src}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lp__col lp__col--srf">
        <span className="lp__k">
          <b>2</b> Every surface agents read
        </span>
        <ul className="lp__pills">
          {SURFACES.map((s, i) => (
            <li key={s.k} className="lp__pill" style={{ ["--d" as string]: `${i * 0.06}s` }}>
              <i>
                <Glyph g={s.g} />
              </i>
              {s.k}
            </li>
          ))}
        </ul>
      </div>

      <div className="lp__col lp__col--ag">
        <span className="lp__k">
          <b>3</b> Agents
        </span>
        <ul className="lp__ags">
          {AGENTS.map((a, i) => (
            <li key={a} className="lp__ag" title={a} style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <App a={a} size={26} />
            </li>
          ))}
        </ul>
      </div>

      <div className="lp__col lp__col--read">
        <span className="lp__k">
          <b>4</b> Read back, every week
        </span>
        <div className="lp__read">
          <span className="lp__readh">&ldquo;Where can I buy the CÉCRED Edge Drops?&rdquo;</span>
          <ul>
            {READ.map((r, i) => (
              <li key={r.a} style={{ ["--d" as string]: `${i * 0.14}s` }}>
                <App a={r.a} size={16} />
                <span>
                  {r.v}
                  <em className={`lp6__v is-${r.t}`}>
                    <Icon n={r.t === "ok" ? "check" : "cross"} size={12} />
                    {r.w}
                  </em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="lp__backk">
        <Icon n="readback" size={15} /> Where an answer disagrees with the record, the next release fixes it
      </p>
    </div>
  );
}
