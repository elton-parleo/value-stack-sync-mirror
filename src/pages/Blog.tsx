import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/blog/PostCard";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import {
  categories,
  formatDate,
  posts,
  readingTime,
  searchIndex,
} from "@/content/blog/posts";

const Blog = () => {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  );
  const featured = sorted.find((p) => p.featured) ?? sorted[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const matchQ = !q || searchIndex(p).includes(q);
      return matchCat && matchQ;
    });
  }, [sorted, active, query]);

  const rest = filtered.filter((p) => p.slug !== featured.slug || active !== "All" || query);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    categories.forEach((c) => (map[c] = posts.filter((p) => p.category === c).length));
    return map;
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>Parleo Blog: agentic commerce, true cost, and loyalty</title>
        <meta
          name="description"
          content="Field notes on agentic commerce: Share of Algorithm, true cost resolution, machine-readable loyalty, and the engineering behind agent-facing pricing."
        />
        <link rel="canonical" href="https://parleo.io/blog" />
        <meta property="og:title" content="Parleo Blog: agentic commerce, true cost, and loyalty" />
        <meta
          property="og:description"
          content="Field notes on agentic commerce from the team building the incentive layer for AI agents."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://parleo.io/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Parleo Blog",
            url: "https://parleo.io/blog",
            blogPost: sorted.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.date,
              author: { "@type": "Person", name: p.author.name },
              url: `https://parleo.io/blog/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Masthead */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 light-burn-cool opacity-90" />
          <div className="relative mx-auto max-w-content px-5 pb-10 pt-10 md:px-20 md:pb-14 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div className="max-w-[22ch]">
                <h1 className="section-heading text-foreground">Field notes</h1>
                <p className="section-copy mt-4 max-w-[42ch]">
                  How agents pick products, what true cost resolution takes, and why loyalty has to
                  become machine-readable.
                </p>
              </div>
              <div className="flex w-full items-center gap-3 md:w-[300px]">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/35"
                    size={15}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles"
                    aria-label="Search articles"
                    className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-3 text-[13.5px] text-foreground outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Category rail */}
            <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {["All", ...categories].map((c) => {
                const on = active === c;
                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-foreground/60 hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {c}
                    <span className={`tabular-nums ${on ? "text-background/55" : "text-foreground/35"}`}>
                      {counts[c] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-content px-5 md:px-20">
          <div className="section-divider" />
        </div>

        {/* Featured */}
        {active === "All" && !query && (
          <section className="mx-auto max-w-content px-5 pt-10 md:px-20 md:pt-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/25 hover:shadow-card-hover md:grid-cols-[1.15fr_1fr]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary md:aspect-auto md:h-full">
                  <img
                    src={featured.cover}
                    alt={featured.coverAlt}
                    className="img-editorial h-full w-full object-cover grayscale-[0.18] group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em]">
                    <span className="text-primary">Featured</span>
                    <span className="h-px w-4 bg-border" />
                    <span className="text-foreground/40">{featured.category}</span>
                  </div>
                  <h2 className="mt-4 text-[24px] font-bold leading-[1.1] tracking-[-0.03em] text-foreground md:text-[34px]">
                    {featured.title}
                  </h2>
                  <p className="section-copy mt-3.5 max-w-[46ch]">{featured.dek}</p>
                  <div className="mt-6 flex items-center gap-2 text-[12px] text-foreground/45">
                    <span className="font-medium text-foreground/70">{featured.author.name}</span>
                    <span className="h-px w-3 bg-border" />
                    <span>{formatDate(featured.date)}</span>
                    <span className="h-px w-3 bg-border" />
                    <span className="tabular-nums">{readingTime(featured)} min read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Grid */}
        <section className="mx-auto max-w-content px-5 py-12 md:px-20 md:py-16">
          {rest.length === 0 ? (
            <p className="section-copy py-10 text-center">
              Nothing matches that yet. Try a different term or category.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-content px-5 pb-16 md:px-20 md:pb-24">
          <NewsletterSignup />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
