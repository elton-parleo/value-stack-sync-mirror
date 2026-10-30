import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import { openStart } from "@/components/start";
import Footer from "@/components/Footer";
import PostBody, { RichText } from "@/components/PostBody";
import { Btn, EASE, Glyph2, Reveal } from "@/components/primitives";
import { chronological, getPost, postNumber } from "@/content/insights";
import "./insight-post.css";

const SITE = "https://parleo.io";

function Progress({ target }: { target: React.RefObject<HTMLElement> }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = target.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight - window.innerHeight * 0.6;
      const v = Math.min(1, Math.max(0, (window.scrollY - top) / Math.max(h, 1)));
      setP(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [target]);
  return <div className="post__progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="post__faq">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="post__faq-item">
            <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on}>
              <span>{f.q}</span>
              <i className={on ? "is-open" : ""} />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.34, ease: EASE }} style={{ overflow: "hidden" }}>
                  <p>
                    <RichText text={f.a} />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function InsightPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const ref = useRef<HTMLElement>(null);
  if (!post) return <Navigate to="/insights" replace />;

  const n = postNumber(post.slug);
  const idx = chronological.findIndex((p) => p.slug === post.slug);
  const prev = chronological[idx - 1];
  const next = chronological[idx + 1];
  const url = `${SITE}/insights/${post.slug}`;
  const title = post.seoTitle ?? `${post.title} | Parleo`;
  const desc = post.seoDescription ?? post.dek;
  const img = `${SITE}${post.socialImage ?? post.image}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: post.title,
      description: desc,
      image: img,
      datePublished: post.date,
      dateModified: post.dateModified ?? post.date,
      author: { "@type": "Person", name: post.author ?? "Samar Birwadker", url: "https://www.linkedin.com/in/samarbirwadker/" },
      publisher: { "@type": "Organization", name: "Parleo", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } },
      mainEntityOfPage: url,
      keywords: post.keywords?.join(", "),
      articleSection: post.category,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Parleo", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") } })),
    });
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        {post.keywords && <meta name="keywords" content={post.keywords.join(", ")} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={img} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author ?? "Samar Birwadker"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
      </Helmet>
      <Nav />
      <Progress target={ref} />
      <main className="post">
        <article ref={ref}>
          <header className="post__hero grid-tex">
            <div className="wrap">
              <nav className="post__crumb" aria-label="Breadcrumb">
                <Link to="/insights">Insights</Link>
                <span>/</span>
                <span>No. {String(n).padStart(2, "0")}</span>
              </nav>
              <div className="post__hero-grid">
                <div className="post__hero-copy">
                  <motion.h1 className="post__title serif" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
                    {post.title}
                    <span className="sq" aria-hidden="true" />
                  </motion.h1>
                  <motion.p className="post__dek" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: EASE }}>
                    {post.dek}
                  </motion.p>
                  <motion.div className="post__meta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    <span className="post__cat">{post.category}</span>
                    <span>{post.dateLabel}</span>
                    <span>{post.readTime}</span>
                  </motion.div>
                  <motion.div className="post__by" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <span className="post__avatar">SB</span>
                    <div>
                      <b>{post.author ?? "Samar Birwadker"}</b>
                      <span>Co-founder and CEO, Parleo</span>
                    </div>
                    {post.linkedInUrl && (
                      <a href={post.linkedInUrl} target="_blank" rel="noreferrer" className="link-more">
                        Discuss on LinkedIn
                      </a>
                    )}
                  </motion.div>
                </div>
                <motion.figure className="post__art card" initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
                  <img src={post.image} alt={post.imageAlt} loading="eager" decoding="async" />
                </motion.figure>
              </div>
            </div>
          </header>

          <div className="wrap post__wrap">
            {post.takeaways && (
              <Reveal className="post__short card" amount={0.2}>
                <div className="post__short-head">
                  <Glyph2 name="layers" size={15} />
                  <span>In short</span>
                </div>
                <ol>
                  {post.takeaways.map((t, i) => (
                    <li key={t}>
                      <span className="post__short-n">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            <div className="post__body">
              <PostBody blocks={post.body} />
            </div>

            {post.faq && (
              <section className="post__faq-wrap" aria-labelledby="faq-h">
                <h2 id="faq-h">Questions this piece gets asked</h2>
                <Faq items={post.faq} />
              </section>
            )}

            <div className="post__sig">
              <span className="post__avatar">SB</span>
              <div>
                <b>Samar Birwadker</b>
                <p>Co-founder and CEO of Parleo. Three-time founder, two exits, brand strategy at WPP and AKQA before that. Writes about what agents say about products and what the pages behind them actually hold.</p>
                <a href="https://www.linkedin.com/in/samarbirwadker/" target="_blank" rel="noreferrer" className="link-more">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* next / prev */}
        <section className="section--tight post__nav">
          <div className="wrap">
            <div className="post__nav-grid">
              {prev ? (
                <Link to={`/insights/${prev.slug}`} className="post__nav-card card card--hover">
                  <span className="post__nav-k">Earlier, No. {String(postNumber(prev.slug)).padStart(2, "0")}</span>
                  <b>{prev.title}</b>
                  <span className="link-more">Read</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={`/insights/${next.slug}`} className="post__nav-card card card--hover is-next">
                  <span className="post__nav-k">Next, No. {String(postNumber(next.slug)).padStart(2, "0")}</span>
                  <b>{next.title}</b>
                  <span className="link-more">Read</span>
                </Link>
              ) : (
                <Link to="/insights" className="post__nav-card card card--hover is-next">
                  <span className="post__nav-k">Latest</span>
                  <b>Back to all insights</b>
                  <span className="link-more">Browse</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="section--tight">
          <div className="wrap">
            <div className="post__cta ink-panel">
              <picture>
                <source type="image/webp" srcSet="/img/audit-hands-900.webp 900w, /img/audit-hands-1400.webp 1400w" sizes="(max-width: 900px) 100vw, 1200px" />
                <img src="/img/audit-hands.jpg" alt="" className="ink-panel__img" loading="lazy" style={{ objectPosition: "60% 50%" }} />
              </picture>
              <div className="ink-panel__wash" />
              <div className="ink-panel__grain" />
              <div className="ink-panel__content post__cta-in">
                <div>
                  <h2>See this for your own products.</h2>
                  <p>The free Agentic Value Report asks the questions your shoppers ask, across five agents, and checks every answer against your pages the same day. Read-out in days.</p>
                </div>
                <div className="post__cta-btns">
                  <Btn to="/agentic-value-report" variant="blue" size="lg" arrow>
                    Get your report
                  </Btn>
                  <Btn onClick={() => openStart()} variant="outline-dark" size="lg">
                    Start with your top SKUs
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
