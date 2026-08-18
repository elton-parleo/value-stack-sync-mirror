import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, postNumber } from "@/content/insights";
import type { Category } from "@/content/insights";

const ease = [0.22, 1, 0.36, 1] as const;

const categories: ("All" | Category)[] = [
  "All",
  ...Array.from(new Set(posts.map((p) => p.category))),
];

const Insights = () => {
  const [active, setActive] = useState<"All" | Category>("All");
  const visiblePosts = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>Insights: research on agentic commerce | Parleo</title>
        <meta
          name="description"
          content="Parleo research and points of view on how AI agents price, rank, and recommend products, and the funded value they can't see."
        />
        <link rel="canonical" href="https://parleo.io/insights" />
        <meta
          name="keywords"
          content="agentic commerce, AI shopping agents, agentic search, loyalty pricing, true cost, merchant feeds"
        />
        <meta property="og:title" content="Insights: research on agentic commerce | Parleo" />
        <meta
          property="og:description"
          content="How AI agents price, rank, and recommend products, and the funded value they can't see."
        />
        <meta property="og:url" content="https://parleo.io/insights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insights: research on agentic commerce | Parleo" />
        <meta
          name="twitter:description"
          content="How AI agents price, rank, and recommend products, and the funded value they can't see."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Parleo Insights",
            url: "https://parleo.io/insights",
            description:
              "Research, benchmarks, and points of view on how AI agents price, rank, and recommend products.",
            inLanguage: "en-US",
            publisher: { "@type": "Organization", name: "Parleo", url: "https://parleo.io/" },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.dek,
              datePublished: p.date,
              articleSection: p.category,
              author: { "@type": "Person", name: p.author ?? "Parleo" },
              url: `https://parleo.io/insights/${p.slug}`,
              image: `https://parleo.io${p.image}`,
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://parleo.io/" },
              { "@type": "ListItem", position: 2, name: "Insights", item: "https://parleo.io/insights" },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Masthead */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "88px 100%",
              maskImage: "linear-gradient(to bottom, black, transparent 82%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 82%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-36 h-[360px] w-[460px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--primary) / 0.12), transparent 72%)",
              filter: "blur(2px)",
            }}
          />

          <div className="relative mx-auto max-w-content px-6 py-12 md:px-20 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <h1
                  className="max-w-[620px] font-display text-[34px] leading-[1] text-foreground md:text-[46px]"
                  style={{ letterSpacing: "-0.03em", textWrap: "balance" }}
                >
                  Insights from the new shelf
                  <span className="ml-2 inline-block h-[9px] w-[9px] translate-y-[-5px] rounded-full bg-primary align-middle md:h-2.5 md:w-2.5" />
                </h1>
                <p className="section-copy mt-5 max-w-[520px]">
                  Essays, frameworks, and field notes on the incentives, infrastructure, and
                  merchant strategy behind agentic commerce.
                </p>
              </motion.div>

              {/* Topic filter */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const count =
                      cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;
                    const selected = active === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-foreground/10 bg-card/60 text-foreground/60 hover:border-foreground/25 hover:text-foreground"
                        }`}
                      >
                        {cat}
                        <span
                          className={`ml-1.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                            selected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-foreground/5 text-foreground/40"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[12.5px] leading-[1.5] text-foreground/45">
                  {visiblePosts.length} {visiblePosts.length === 1 ? "piece" : "pieces"} in this
                  view.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Editorial list */}
        <section className="mx-auto max-w-content px-6 pb-16 md:px-20 md:pb-24">
          {visiblePosts.length === 0 ? (
            <div className="py-16">
              <p className="section-copy text-foreground/55">No pieces match this topic yet.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {visiblePosts.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  className="relative border-b border-border"
                >
                  <Link
                    to={`/insights/${p.slug}`}
                    className="group relative grid grid-cols-[120px_1fr] items-start gap-4 py-7 transition-colors md:grid-cols-[44px_180px_1fr] md:items-start md:gap-8 md:py-10"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-x-5 inset-y-0 rounded-lg bg-foreground/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-[-20px] top-1/2 h-0 w-[2px] -translate-y-1/2 bg-primary transition-all duration-500 group-hover:h-[62%]"
                    />

                    <span className="relative hidden pt-1 font-mono text-[11px] tabular-nums text-foreground/25 transition-colors group-hover:text-primary md:block">
                      {String(postNumber(p.slug)).padStart(2, "0")}
                    </span>

                    <div className="relative overflow-hidden rounded-md border border-border/70 bg-secondary">
                      <div className="aspect-[4/3] w-full md:aspect-[4/3]">
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          loading="lazy"
                          sizes="(max-width: 768px) 120px, 180px"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(to top, hsl(var(--primary) / 0.14), transparent 60%)",
                        }}
                      />
                    </div>


                    <div className="relative flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.09em] text-foreground/40">
                        <span className="text-primary">{p.category}</span>
                        <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                        <span>{p.dateLabel}</span>
                        <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                        <span>{p.readTime}</span>
                      </div>
                      <h2
                        className="mt-2.5 max-w-[560px] font-heading text-[22px] leading-[1.08] text-foreground transition-colors group-hover:text-foreground/80 md:text-[28px]"
                        style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
                      >
                        {p.title}
                      </h2>
                      <p className="mt-2.5 max-w-[520px] text-[14px] leading-[1.55] text-muted-foreground md:text-[15px]">
                        {p.dek}
                      </p>
                      {p.takeaways?.[0] && (
                        <p className="mt-3 hidden max-w-[520px] border-l border-primary/30 pl-3 text-[13px] leading-[1.5] text-foreground/50 md:block">
                          {p.takeaways[0]}
                        </p>
                      )}

                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                        Read
                        <span className="inline-block text-primary transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Closing band */}
        <section className="border-t border-border bg-[#0E0E14]">
          <div className="relative mx-auto max-w-content overflow-hidden px-6 py-14 md:px-20 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[420px] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, hsl(var(--primary) / 0.28), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <h2
                  className="max-w-[520px] font-display text-[28px] leading-[1.06] text-white md:text-[40px]"
                  style={{ letterSpacing: "-0.015em", textWrap: "balance" }}
                >
                  See what agents quote for your brand
                </h2>
                <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.6] text-white/55 md:text-[15px]">
                  The average brand we score sits at 59 out of 100. The audit takes one URL and
                  returns the gaps in under a minute.
                </p>
              </div>
              <a
                href="https://audit.parleo.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-primary group shrink-0 self-start md:self-auto"
              >
                Run your free audit
                <span data-slot="arrow">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
