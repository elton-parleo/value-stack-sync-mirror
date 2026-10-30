import { Btn } from "@/components/primitives";
import { openStart } from "@/components/start";
import { Head, Img, Scan, Stat, useOnce } from "../kit";
import { AGENTS6, App, Icon, Mark } from "../v4kit";
import Loop from "./Loop";

/* Hero. The v3 still (a hand reaching for one product on travertine), now a real product, and
   TrueSync's loop drawn on that product's record beneath it. CÉCRED Restoring Hair & Edge Drops at
   Ulta Beauty, from Parleo's Ulta research: an Ulta exclusive that assistants sent to the brand's
   own site first in 10 of 11 where-to-buy answers. */
export default function PHero() {
  const [ref, on] = useOnce<HTMLDivElement>(0.15);
  return (
    <section className="pdh4 pdh6" data-hero>
      <div className="wrap pdh4__top">
        <div>
          <Head as="h1" lead="The platform for winning" more="AI recommendations." sq />
        </div>
        <div className="pdh4__side">
          <p className="body pdh6__lede">
            See how AI agents describe you, fix what they get wrong, and <b>put your best offers in every answer.</b> Built for brands and retailers, with the revenue impact tracked every week.
          </p>
          <div className="pdh4__ctas">
            <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
              Get your Agentic Value Report
            </Btn>
            <Btn onClick={() => openStart()} variant="outline" size="lg">
              Start with your top SKUs
            </Btn>
          </div>
          <div className="pdh4__reads">
            <span>Reads and writes for</span>
            {AGENTS6.map((a) => (
              <App key={a} a={a} size={18} />
            ))}
          </div>
        </div>
      </div>

      <div className="wrap wrap--wide">
        <div className={`pdh6__frame ${on ? "is-on" : ""}`} ref={ref}>
          <div className="pdh6__photo">
            <Img name="v6/phero" widths={[900, 1600, 2048]} sizes="(max-width: 1400px) 100vw, 1368px" alt="A hand reaching for a chrome bottle of CÉCRED Restoring Hair & Edge Drops on a travertine counter in late sun, a paper tag on blue thread" eager />
            <Scan box={[0.572, 0.245, 0.715, 0.705]} label="CÉCRED Edge Drops · Ulta exclusive" on={on} />
            <div className="pdh6__chip">
              <span className="pdh6__chiph">
                <Mark k="ulta" h={13} title="Ulta Beauty" />
                <span>Only at Ulta Beauty</span>
              </span>
              <Stat n={10} of={11} k={<>where-to-buy answers sent her to the brand&rsquo;s site first</>} tone="red" />
            </div>
          </div>
          <div className="pdh4__stage pdh6__stage">
            <header className="pdh4__bar">
              <span className="pdh4__t">
                <Icon n="fork" size={17} /> How TrueSync works
              </span>
              <span className="pdh4__d">One record in, every surface agents read out, the answers read back every week</span>
            </header>
            <Loop play={on} />
            <footer className="pdh6__foot">CÉCRED Restoring Hair &amp; Edge Drops at Ulta Beauty, from Parleo research. Answers from five AI assistants, checked against ulta.com.</footer>
          </div>
        </div>
      </div>
    </section>
  );
}
