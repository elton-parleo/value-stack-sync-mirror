import { App, Icon, Mark } from "../v4kit";
import { Lead, Who } from "./Console";
import { Stat } from "../kit";
import { Chapter } from "./ui";
import { Opener, Points } from "./six";

/* 03 · Value. Gap Inc. and Encore, from Parleo's Gap research: Encore came up in none of 176 answers
   about Gap Inc.'s best sellers, and Gemini named the retired program in 24 of 35 loyalty answers.
   Tiers from gap.com's Encore page. */
export default function PValue() {
  return (
    <Chapter id="value" tone="cool" className="ch6">
      <Opener lead="Win on value" more="instead of discounts.">
        Show AI the full value of buying from you, member prices, points, free shipping and the offers brands fund, <b>so it stops telling shoppers to wait for the next sale.</b> You set what shows to whom, and test it before anything goes live.
      </Opener>
      <div className="wrap wrap--wide vl7">
        <Lead
          tone="green"
          brand="gap"
          className="vl7__lead"
          photo="/img/v5/ev-denim-1024.webp"
          pos="50% 62%"
          chip="From 208 answers about Gap Inc."
          head="Agents tell Gap shoppers to wait for a sale, and never mention Encore."
          a={{ who: <Who marks={["gap"]} label="Encore" />, n: "0", of: "of 176", k: "best-seller answers named Encore" }}
          b={{ who: <Who marks={[]} label="Wait for a sale" />, n: "25", of: "of 32", k: "answers told her to wait" }}
          todo="Publish Encore points and free-shipping thresholds on every best-seller record."
          team="Loyalty"
          ok="Awaiting sign-off"
        />
        <div className="vl7__side vl8">
          <div className="vl8__prog c8">
            <header className="vl8__h">
              <Mark k="gap" h={14} title="Gap" />
              <span>
                <b>Encore</b>
                <em>Gap Inc. loyalty program</em>
              </span>
              <span className="chip8 chip8--blue">
                <i /> ~40M members
              </span>
            </header>
            <div className="vl8__tiers">
              <div>
                <span className="vl8__tier">Core</span>
                <b>
                  5<small>pts per $1</small>
                </b>
                <em>Free basic shipping on $50+</em>
              </div>
              <div className="is-top">
                <span className="vl8__tier">All-Access cardmembers</span>
                <b>
                  25<small>pts per $1</small>
                </b>
                <em>Free standard shipping on $35+</em>
              </div>
            </div>
            <footer className="vl8__f">
              <Icon n="tag" size={14} /> A reason to buy now, at full price
            </footer>
          </div>
          <div className="vl8__ans c8">
            <span className="vl8__ah">
              <App a="Gemini" size={16} /> Gemini, on Gap&rsquo;s loyalty program
              <u className="chip8 chip8--bad">
                <i /> Retired name
              </u>
            </span>
            <Stat n={24} of={35} k="answers used only the pre-Encore program name" tone="red" />
          </div>
        </div>
      </div>
      <Points
        items={[
          { i: "people", k: "Member value in the answer", d: "Member prices, points and perks carried into every assistant, priced in dollars a shopper can compare." },
          { i: "dollar", k: "Offers brands fund", d: "Coupons, rebates and gifts traced from the brand that pays for them to the answer that shows them." },
          { i: "shield", k: "Rules you set", d: "Member-only stays member-only. Test each rule against last week's answers before it goes live." },
        ]}
        note="Gap Inc., from Parleo research. Program terms from gap.com."
      />
    </Chapter>
  );
}
