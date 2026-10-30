import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Btn } from "@/components/primitives";
import { posts, type Category } from "@/content/insights";
import { Glow, H, Rise, img } from "@/ds";
import "@/home/home.css";
import "@/insights/insights.css";

const CATS: Array<Category | "All"> = ["All", "Research", "Benchmark", "Framework", "Point of view"];

export default function Insights() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [lead, ...rest] = posts;
  const list = useMemo(() => (cat === "All" ? rest : posts.filter((p) => p.category === cat)), [cat, rest]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Parleo Insights",
    url: "https://parleo.io/insights",
    hasPart: posts.map((p) => ({ "@type": "Article", headline: p.title, url: `https://parleo.io/insights/${p.slug}`, datePublished: p.date, image: `https://parleo.io${p.image}` })),
  };
  return (
    <>
      <Helmet>
        <title>Insights on agentic commerce | Parleo</title>
        <meta name="description" content="Research, benchmarks and points of view on how AI shopping agents choose, what they get wrong about price and value, and what brands and retailers can do about it." />
        <link rel="canonical" href="https://parleo.io/insights" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Nav />
      <main>
        <section className="sx inx__hero inx7__hero">
          <Glow img={img("overhead-grid-2", 900)} pos="tr" />
          <div className="inx7__bg" aria-hidden="true">
            <i className="inx7__lines" />
            <i className="inx7__glow" />
          </div>
          <div className="wrap">
            <div className="inx__head">
              <Rise>
                <H as="h1" lead="Research from the agentic" accent="commerce shelf." />
              </Rise>
              <Rise delay={0.06}>
                <p className="sub">What AI shopping agents say about real products, measured against the pages those products live on. Every number traces to a source or a sweep we ran ourselves.</p>
              </Rise>
            </div>
            <Rise delay={0.1}>
              <Link to={`/insights/${lead.slug}`} className="card card--hover inx__lead">
                <div className="inx__lead-img">
                  <img src={lead.image} alt={lead.imageAlt} />
                </div>
                <div className="inx__lead-body">
                  <h2>{lead.title}</h2>
                  <span className="ml inx7__meta">
                    <b>Latest</b> {lead.category} <i /> {lead.dateLabel} <i /> {lead.readTime}
                  </span>
                  <p>{lead.dek}</p>
                  {lead.takeaways?.[0] && <blockquote className="inx7__pull">{lead.takeaways[0]}</blockquote>}
                  {lead.figure && (
                    <div className="inx__fig">
                      <span className="big big--blue tnum">{lead.figure.value}</span>
                      <span>{lead.figure.label}</span>
                    </div>
                  )}
                  <span className="link-more">Read</span>
                </div>
              </Link>
            </Rise>
          </div>
        </section>

        <section className="sx sx--top0">
          <div className="wrap">
            <Rise className="dcard inx__guide">
              <img className="dcard__img" src={img("inkfield-2", 1400)} alt="" loading="lazy" />
              <div className="dcard__wash" />
              <div className="inx__guide-in">
                <div>
                  <span className="ml ml--dark">Field guide, 18 sources, six charts</span>
                  <h2 className="hd hd--dark hd--serif inx__guide-h">
                    What is <em>agentic commerce?</em>
                  </h2>
                  <p className="sub sub--dark">The measured numbers, the protocol stack as it shipped, the benchmark evidence on how good agents really are, and the one layer nobody has standardized: what a shopper actually pays.</p>
                </div>
                <Btn to="/what-is-agentic-commerce" variant="blue" size="lg" arrow>
                  Read the guide
                </Btn>
              </div>
            </Rise>
          </div>
        </section>

        <section className="sx sx--top0 inx__all">
          <div className="wrap">
            <div className="inx7__bar">
              <div className="inx__filter" role="tablist" aria-label="Filter by category">
                {CATS.map((c) => (
                  <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "is-on" : ""} onClick={() => setCat(c)}>
                    {cat === c && <motion.i layoutId="inx-pill" className="seg__pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span>{c}</span>
                    <em className="inx7__count">{c === "All" ? rest.length : posts.filter((p) => p.category === c).length}</em>
                  </button>
                ))}
              </div>
              <span className="inx7__n">
                {list.length} {list.length === 1 ? "piece" : "pieces"} in this view
              </span>
            </div>
            <motion.div layout className="inx__grid">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div key={p.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                    <Link to={`/insights/${p.slug}`} className="card card--hover inx__card">
                      <div className="inx__card-img">
                        <img src={p.image} alt="" loading="lazy" />
                        <span className="inx7__no">{String(list.length - i).padStart(2, "0")}</span>
                      </div>
                      <div className="inx__card-body">
                        <h3>{p.title}</h3>
                        <p>{p.dek}</p>
                        <span className="ml inx7__meta">
                          <b>{p.category}</b> {p.dateLabel} <i /> {p.readTime}
                        </span>
                        <div className="inx__card-foot">
                          {p.figure ? (
                            <span className="inx__card-fig">
                              <b className="tnum">{p.figure.value}</b> {p.figure.label}
                            </span>
                          ) : (
                            <span className="link-more">Read</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="sx sx--top0">
          <div className="wrap">
            <Rise className="card inx__cta">
              <div>
                <H lead="See what agents say about your products" accent="this week." size="sm" />
                <p className="sub">The free Agentic Value Report asks the questions your shoppers ask, across five agents, and checks every answer against your own pages the same day.</p>
              </div>
              <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
                Get your report
              </Btn>
            </Rise>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
