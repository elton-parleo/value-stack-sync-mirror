import { useOnce } from "../kit";
import { App, Icon, Mark } from "../v4kit";
import { Chapter } from "./ui";
import { Opener, Pin, Points, Still } from "./six";

/* 02 · TrueSync. Best Buy, from Parleo's Best Buy research: the checked record for one pair of headphones,
   and the read-back, nine answers minutes apart that gave four different Best Buy prices. */
const REC: { k: string; v: string; note?: string; src: string; flag?: boolean }[] = [
  { k: "Price", v: "$458.00", note: "Amazon $458, Sony $459.99", src: "bestbuy.com" },
  { k: "Offer", v: "2 free gifts with purchase", src: "bestbuy.com" },
  { k: "Pickup", v: "Within the hour", note: "Emeryville store", src: "Store inventory" },
  { k: "My Best Buy Plus", v: "$29.99 a year", note: "Some answers still say $49.99", src: "Memberships page", flag: true },
  { k: "My Best Buy Total", v: "$199.99 a year", note: "Some answers still say $179.99", src: "Memberships page", flag: true },
];
const SURF = ["Site markup", "Merchant Center", "OpenAI feed", "UCP", "Deals API", "MCP server", "WebMCP"];
const PTS: { a: string; t: number; time: string; v: number; up?: boolean }[] = [
  { a: "Perplexity", t: 0, time: "7:56 PM", v: 458 },
  { a: "Perplexity", t: 0.55, time: "7:56 PM", v: 458 },
  { a: "AI Mode", t: 1, time: "7:57 PM", v: 458 },
  { a: "AI Mode", t: 3, time: "7:59 PM", v: 398 },
  { a: "Gemini", t: 4, time: "8:00 PM", v: 459.99 },
  { a: "ChatGPT", t: 5, time: "8:01 PM", v: 398 },
  { a: "Copilot", t: 5.6, time: "8:01 PM", v: 399.99, up: true },
  { a: "ChatGPT", t: 8, time: "8:04 PM", v: 458 },
  { a: "Gemini", t: 9, time: "8:05 PM", v: 458 },
];
const Y0 = 388;
const Y1 = 470;

export default function PTrueSync() {
  const [ref, on] = useOnce<HTMLDivElement>(0.05);
  return (
    <Chapter id="truesync" tone="warm" className="ch6">
      <Opener lead="One accurate version of every product," more="everywhere agents look.">
        TrueSync keeps one checked record of every product, its price, its offers and its terms, and publishes it everywhere AI agents read, from Google and ChatGPT to your own site. <b>A week later it asks the same questions again to confirm the answers changed.</b>
      </Opener>
      <Still img="v5/flatlay" widths={[900, 1600, 2048]} alt="A catalog laid out on travertine, each product with a tag on blue thread" ratio={2.2} pos="50% 46%" className="ts8__band">
        <Pin x={35.5} y={17.7}>Price</Pin>
        <Pin x={30.5} y={49.8} d={0.12}>Offer ends</Pin>
        <Pin x={58} y={49.8} d={0.24}>Member price</Pin>
        <Pin x={93} y={14} d={0.36} flip>Pickup</Pin>
        <Pin x={58} y={85.6} d={0.48}>Returns</Pin>
        <Pin x={91} y={91.7} d={0.6} flip>Shipping</Pin>
      </Still>
      <div className="wrap wrap--wide ts7 ts8" ref={ref}>
        <div className={`ts7__grid ${on ? "is-on" : ""}`}>
          <div className="ts7__rec">
            <header className="ts7__h">
              <span className="ts7__thumb">
                <img src="/img/v7/cut/sony_xm6.webp" alt="" />
              </span>
              <span className="ts7__id">
                <b>Sony WH-1000XM6, Black</b>
                <em>
                  <Mark k="bestbuy" h={11} title="Best Buy" /> Sold by Best Buy
                </em>
              </span>
              <span className="ts7__st">
                <i /> Checked
              </span>
            </header>
            <div className="ts7__fh" aria-hidden="true">
              <span>Field</span>
              <span>Record</span>
              <span>Source</span>
            </div>
            <ul className="ts7__fields">
              {REC.map((r, i) => (
                <li key={r.k} style={{ ["--d" as string]: `${0.15 + i * 0.09}s` }} className={r.flag ? "is-flag" : ""}>
                  <span className="ts7__k">
                    <i className="ts8__ic">
                      <Icon n={r.k === "Price" ? "dollar" : r.k === "Offer" ? "tag" : r.k === "Pickup" ? "clock" : "people"} size={13} />
                    </i>
                    {r.k}
                  </span>
                  <span className="ts7__v">
                    <b>{r.v}</b>
                    {r.note && <em>{r.note}</em>}
                  </span>
                  <span className="ts7__src">{r.src}</span>
                </li>
              ))}
            </ul>
            <div className="ts7__out">
              <span className="ts7__ok">Compiled to</span>
              <div className="ts7__chips">
                {SURF.map((x, i) => (
                  <span key={x} style={{ ["--d" as string]: `${0.8 + i * 0.07}s` }}>
                    <Icon n="check" size={11} />
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="ts7__chart">
            <header className="ts7__ch">
              <span>
                <Icon n="readback" size={15} />
                <b>Read back</b>
              </span>
              <em>Best Buy&rsquo;s price in nine answers, minutes apart</em>
            </header>
            <div className="ts7__plot" role="img" aria-label="Nine answers between 7:56 and 8:05 PM gave four different Best Buy prices: $458.00 five times, $398.00 twice, $399.99 once and $459.99 once. The record says $458.00.">
              <div className="ts7__y" aria-hidden="true">
                {[460, 440, 420, 400].map((v) => (
                  <span key={v} style={{ bottom: `${((v - Y0) / (Y1 - Y0)) * 100}%` }}>${v}</span>
                ))}
              </div>
              <div className="ts7__area">
                {[460, 440, 420, 400].map((v) => (
                  <i key={v} className="ts7__gl" style={{ bottom: `${((v - Y0) / (Y1 - Y0)) * 100}%` }} />
                ))}
                <div className="ts7__line" style={{ bottom: `${((458 - Y0) / (Y1 - Y0)) * 100}%` }}>
                  <span>Record $458.00</span>
                </div>
                {PTS.map((pt, i) => {
                  const ok = Math.abs(pt.v - 458) < 0.5;
                  return (
                    <span
                      key={i}
                      className={`ts7__pt ${ok ? "is-ok" : "is-bad"} ${pt.up ? "is-up" : ""}`}
                      style={{ left: `${(pt.t / 9) * 100}%`, bottom: `${((pt.v - Y0) / (Y1 - Y0)) * 100}%`, ["--d" as string]: `${0.4 + i * 0.12}s` }}
                      title={`${pt.a}, ${pt.time}: $${pt.v.toFixed(2)}`}
                    >
                      <App a={pt.a} size={14} />
                      {!ok && <u>${pt.v.toFixed(2)}</u>}
                    </span>
                  );
                })}
              </div>
              <div className="ts7__x" aria-hidden="true">
                <span>7:56 PM</span>
                <span>8:00</span>
                <span>8:05 PM</span>
              </div>
            </div>
            <div className="ts7__sum">
              <div>
                <b>4</b>
                <span>different Best Buy prices in nine minutes</span>
              </div>
              <div>
                <b>
                  4<small> of 9</small>
                </b>
                <span>answers off the record, queued for the next release</span>
              </div>
            </div>
          </div>
        </div>
        <p className="ch__note">Best Buy, from Parleo research. Prices checked against bestbuy.com.</p>
      </div>
      <Points
        items={[
          { i: "record", k: "One checked record", d: "Every field carries its source and an end date, so an expired sale never reaches an answer." },
          { i: "fork", k: "Every surface agents read", d: "Feeds, markup and protocols compiled from the same record, in the format each one expects." },
          { i: "readback", k: "Read back weekly", d: "The same questions asked again, and any answer that drifts from the record queued for the next release." },
        ]}
      />
    </Chapter>
  );
}
