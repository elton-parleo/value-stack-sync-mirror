import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostBody from "@/components/insights/PostBody";
import { getPost, posts } from "@/content/insights";

const AUDIT_URL = "https://audit.parleo.io/";
const SITE = "https://parleo.io";

const InsightPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-content px-6 py-24 md:px-20">
          <h1 className="section-heading text-foreground">Post not found</h1>
          <Link to="/insights" className="mt-6 inline-block text-[14px] text-primary">
            Back to insights
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const url = `${SITE}/insights/${post.slug}`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${SITE}${post.image}`;
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const author = post.author ?? "Parleo";
  const wordCount = post.body.reduce(
    (n, b) =>
      n +
      ("text" in b ? b.text.split(/\s+/).length : 0) +
      (b.type === "list" ? b.items.join(" ").split(/\s+/).length : 0),
    0,
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>{post.seoTitle ?? `${post.title} | Parleo`}</title>
        <meta name="description" content={post.seoDescription ?? post.dek} />
        <link rel="canonical" href={url} />
        {post.keywords?.length ? <meta name="keywords" content={post.keywords.join(", ")} /> : null}
        <meta name="author" content={author} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.dek} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={post.imageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.dek} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            alternativeHeadline: post.dek,
            description: post.dek,
            abstract: post.takeaways?.join(" ") ?? post.dek,
            datePublished: post.date,
            dateModified: post.dateModified ?? post.date,
            inLanguage: "en-US",
            articleSection: post.category,
            keywords: post.keywords?.join(", "),
            wordCount,
            image: [imageUrl],
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
            isPartOf: { "@type": "Blog", name: "Parleo Insights", url: `${SITE}/insights` },
            author: { "@type": "Person", name: author },
            publisher: {
              "@type": "Organization",
              name: "Parleo",
              url: `${SITE}/`,
              logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "[data-speakable]"],
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          })}
        </script>
      </Helmet>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-primary"
      />

      <Navbar />

      <main className="site-texture">
        <article className="mx-auto w-full max-w-[720px] px-6 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-foreground/45">
            <Link to="/" className="transition-colors hover:text-foreground">
              Parleo
            </Link>
            <span className="px-2 text-foreground/25">/</span>
            <Link to="/insights" className="transition-colors hover:text-foreground">
              Insights
            </Link>
            <span className="px-2 text-foreground/25">/</span>
            <span className="text-foreground/60">{post.category}</span>
          </nav>

          <div className="mt-7 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.09em] text-foreground/40">
            <span className="text-primary">{post.category}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
            <span>{post.dateLabel}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
            <span>{post.readTime}</span>
          </div>

          <h1
            className="mt-4 font-display text-[32px] text-foreground md:text-[46px]"
            style={{ lineHeight: 1.04, letterSpacing: "-0.036em", textWrap: "balance" }}
          >
            {post.title}
            <span className="ml-2 inline-block h-[8px] w-[8px] translate-y-[-6px] rounded-full bg-primary align-middle md:h-2.5 md:w-2.5" />
          </h1>
          <p
            data-speakable
            className="mt-5 text-[16px] leading-[1.55] text-foreground/60 md:text-[18px]"
          >
            {post.dek}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-3.5 text-[12.5px] text-foreground/50">
            <span className="text-foreground/70">{author}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
            <time dateTime={post.date}>{post.dateLabel}</time>
            {post.linkedInUrl && (
              <>
                <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                <a
                  href={post.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary transition-opacity hover:opacity-70"
                >
                  Original on LinkedIn
                </a>
              </>
            )}
          </div>

          <figure className="relative mt-9 overflow-hidden rounded-2xl border border-border bg-secondary">
            <img src={post.image} alt={post.imageAlt} className="w-full" />
            <figcaption className="border-t border-border bg-card px-5 py-3 text-[12px] leading-[1.45] text-foreground/45">
              {post.imageAlt}
            </figcaption>
          </figure>

          {/* Answer-first takeaways */}
          {post.takeaways?.length ? (
            <section
              aria-labelledby="takeaways"
              data-speakable
              className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-[#EAE8E5] px-6 py-6 md:px-8 md:py-7"
            >
              <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full bg-primary" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: "44px 100%",
                  maskImage: "linear-gradient(to bottom, black, transparent 88%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent 88%)",
                }}
              />
              <h2
                id="takeaways"
                className="relative font-heading text-[15px] tracking-[-0.01em] text-foreground"
              >
                The short answer
              </h2>
              <ul className="relative mt-4 flex flex-col gap-3.5">
                {post.takeaways.map((t, i) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="mt-[3px] font-mono text-[10.5px] tabular-nums text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] leading-[1.55] text-foreground/75 md:text-[15px]">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-10">
            <PostBody blocks={post.body} />
          </div>

          {/* Q&A for answer engines */}
          {post.faq?.length ? (
            <section aria-labelledby="faq" className="mt-14 border-t border-border pt-8">
              <h2 id="faq" className="font-heading text-[20px] text-foreground md:text-[24px]">
                Questions this answers
              </h2>
              <div className="mt-5 flex flex-col divide-y divide-border border-y border-border">
                {post.faq.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q}>
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="flex w-full items-start justify-between gap-5 py-4 text-left"
                      >
                        <h3 className="text-[15px] font-medium leading-[1.4] text-foreground md:text-[16px]">
                          {f.q}
                        </h3>
                        <span
                          className={`mt-[2px] shrink-0 text-[15px] text-primary transition-transform duration-300 ${
                            open ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <p className="overflow-hidden pb-4 pr-8 text-[14.5px] leading-[1.62] text-foreground/65 md:text-[15px]">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* CTA */}
          <div className="relative mt-14 overflow-hidden rounded-2xl bg-code-bg px-7 py-9 md:px-9">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-24 h-[300px] w-[360px] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, hsl(var(--primary) / 0.26), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="section-heading section-heading-dark" style={{ fontSize: 26 }}>
                Find your own gap
              </h2>
              <p className="section-copy section-copy-dark mt-3 max-w-[420px]">
                Run the free audit and see what agents quote for your catalog, and what your funded
                value is worth in the answer.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={AUDIT_URL} className="btn-base btn-primary group">
                  Run your free audit
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* More */}
          {more.length > 0 && (
            <div className="mt-14 border-t border-border pt-8">
              <h2 className="font-heading text-[16px] text-foreground">Keep reading</h2>
              <div className="mt-4 flex flex-col divide-y divide-border">
                {more.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/insights/${p.slug}`}
                    className="group grid grid-cols-[84px_1fr] items-center gap-4 py-5"
                  >
                    <div className="overflow-hidden rounded-md bg-secondary">
                      <div className="aspect-[4/3] w-full">
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-heading leading-[1.2] text-foreground transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <span className="mt-1.5 block text-[12.5px] text-foreground/45">
                        {p.category} · {p.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default InsightPost;
