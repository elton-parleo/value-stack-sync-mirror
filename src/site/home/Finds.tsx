import { Link } from "react-router-dom";
import { Head, toAudit, useOnce, Stat } from "../kit";
import { App, Icon, Mark, Spec } from "../v4kit";

/* 03 · What Parleo finds. Real answers about real products, each checked against the company's own
   page the same day. Public examples from Parleo's research in October 2026, not clients. */
type Find = {
  co: { mark?: string; name: string };
  tag: "pick" | "price" | "offer";
  img: string;
  photo?: boolean;
  product: string;
  head: string;
  agent?: string;
  quote?: string;
  n: string;
  of: string;
  k: string;
  page: string;
};
const FINDS: Find[] = [
  {
    co: { mark: "lowes", name: "Lowe's" },
    tag: "offer",
    img: "weber",
    product: "Weber Spirit E-310",
    head: "AI promises Lowe’s cardholders 5% off a grill the card excludes.",
    agent: "Copilot",
    quote: "Because you already have the Lowe’s credit card, you typically receive 5% off…",
    n: "12",
    of: "of 19",
    k: "answers that raised the card applied a discount the terms rule out.",
    page: "lowes.com, card terms",
  },
  {
    co: { name: "SEPHORA" },
    tag: "pick",
    img: "protini",
    product: "Drunk Elephant Protini",
    head: "A live 15% deal at Sephora. ChatGPT sent her to the brand.",
    agent: "ChatGPT",
    quote: "I’d buy directly from Drunk Elephant…",
    n: "0",
    of: "of 25",
    k: "answers mentioned Sephora’s live deal on Protini or the K18 mask.",
    page: "sephora.com, $61.20 with Auto-Replenish",
  },
  {
    co: { mark: "jd", name: "JD Sports" },
    tag: "pick",
    img: "af1_nord",
    product: "Nike Air Force 1 ’07",
    head: "$115 at JD and at Nike. The answer said buy it from Nike.",
    agent: "ChatGPT",
    quote: "Buy it from Nike.com",
    n: "1",
    of: "of 33",
    k: "where-to-buy answers put JD first. Nike.com or adidas.com got 24.",
    page: "jdsports.com, $115",
  },
  {
    co: { mark: "hm", name: "H&M" },
    tag: "pick",
    img: "hm_pima_tee",
    photo: true,
    product: "Regular-Fit Pima Cotton T-Shirt",
    head: "H&M sells a $19.99 Pima tee. AI picks Uniqlo for quality.",
    agent: "ChatGPT",
    quote: "If it’s your “one good white T-shirt,” get Uniqlo.",
    n: "0",
    of: "of 29",
    k: "basics answers set against Uniqlo chose H&M.",
    page: "hm.com, $19.99, 100% cotton",
  },
  {
    co: { mark: "gap", name: "Gap" },
    tag: "price",
    img: "gap_lowrise90s",
    photo: true,
    product: "Low Rise ’90s Loose Jeans",
    head: "Gap wants more full-price sales. AI tells its shoppers to wait.",
    agent: "Gemini",
    quote: "Never pay full price ($80 to $90).",
    n: "25",
    of: "of 32",
    k: "answers to “is it worth it” said wait for a sale. The shopper never asked about one.",
    page: "gap.com, list price",
  },
];
const TAG = { pick: { k: "Lost the pick", i: "arrow" as const }, price: { k: "Lost full price", i: "tag" as const }, offer: { k: "Wrong offer", i: "tag" as const } };

export default function Finds({ to = "audit" }: { to?: string }) {
  const [ref, on] = useOnce<HTMLDivElement>(0.12);
  return (
    <section className="sec fd" id="finds">
      <div className="wrap fd__top in6">
        <Head lead="AI is already selling your products," more="and getting them wrong." sq />
        <div className="in6__body">
          <p className="body">
            A deal the assistant never saw. A store it skipped at the same price. A sale it told the shopper to wait for. <b>Details like these decide whether AI recommends you, and whether the shopper buys.</b> Here is what Parleo found at companies you know.
          </p>
        </div>
      </div>
      <div className={`wrap fd__grid ${on ? "is-on" : ""}`} ref={ref}>
        {FINDS.map((f, i) => (
          <article key={f.co.name} className="fd__card" style={{ ["--d" as string]: `${i * 0.07}s` }}>
            <div className="fd__media">
              <Spec src={f.img} alt={f.product} photo={f.photo} fit={f.photo ? "cover" : "contain"} />
              <span className="fd__co">{f.co.mark ? <Mark k={f.co.mark} h={13} title={f.co.name} /> : f.co.name}</span>
              <span className={`fd__tag fd__tag--${f.tag}`}>
                <Icon n={TAG[f.tag].i} size={13} />
                {TAG[f.tag].k}
              </span>
              <span className="fd__prod">{f.product}</span>
            </div>
            <div className="fd__body">
              <h3>{f.head}</h3>
              {f.quote ? (
                <p className="fd__q">
                  <App a={f.agent!} size={16} />
                  <span>&ldquo;{f.quote}&rdquo;</span>
                </p>
              ) : (
                <p className="fd__q fd__q--many">
                  {["ChatGPT", "Gemini", "Perplexity", "AI Mode", "Copilot"].map((a) => (
                    <App key={a} a={a} size={16} />
                  ))}
                  <span>Five assistants</span>
                </p>
              )}
              <Stat className="fd8__n" n={Number(f.n)} of={Number(f.of.replace(/\D/g, ""))} k={f.k} />
            </div>
            <footer className="fd__page">{f.page}</footer>
          </article>
        ))}
        <article className="fd__card fd__card--ask" style={{ ["--d" as string]: `${FINDS.length * 0.07}s` }}>
          <span className="fd6__mark" aria-hidden="true">
            <Icon n="record" size={20} />
          </span>
          <h3>What is AI telling your shoppers?</h3>
          <p>Your Agentic Value Report asks five assistants the questions your shoppers ask about your top SKUs, checks every answer against your own pages and the competitors you pick, then scores it and puts a dollar figure on the gap.</p>
          <ul>
            <li>
              <Icon n="check" size={15} /> Your Share of Algorithm score, out of 100
            </li>
            <li>
              <Icon n="check" size={15} /> Every answer beside your own page
            </li>
            <li>
              <Icon n="check" size={15} /> Revenue at stake, and what to fix first
            </li>
            <li>
              <Icon n="check" size={15} /> Back in hours, from public data
            </li>
          </ul>
          <div className="fd6__ctas">
            <a
              className="btn btn--blue fd__cta"
              href={`#${to}`}
              onClick={(e) => {
                e.preventDefault();
                if (to === "audit") toAudit();
                else document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get your report <span aria-hidden="true">→</span>
            </a>
            <Link className="fd6__sample" to="/agentic-value-report#samples">
              See a real report
            </Link>
          </div>
        </article>
      </div>
      <div className="wrap">
        <p className="src fd__src">Parleo research. Public answers from five AI assistants, each checked against the company&rsquo;s own page.</p>
      </div>
    </section>
  );
}
