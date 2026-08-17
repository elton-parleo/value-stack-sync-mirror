import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostBody from "@/components/insights/PostBody";
import { getPost, posts } from "@/content/insights";

const AUDIT_URL = "https://audit.parleo.io/";

const InsightPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

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

  const url = `https://parleo.io/insights/${post.slug}`;
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>{`${post.title} | Parleo`}</title>
        <meta name="description" content={post.dek} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.dek} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.dek,
            datePublished: post.date,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "Parleo" },
            publisher: { "@type": "Organization", name: "Parleo" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://parleo.io/" },
              { "@type": "ListItem", position: 2, name: "Insights", item: "https://parleo.io/insights" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="site-texture">
        <article className="mx-auto w-full max-w-[720px] px-6 py-12 md:py-16">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[13px] text-foreground/50 transition-colors hover:text-foreground"
          >
            ← Insights
          </Link>

          <div className="mt-7 flex items-center gap-2.5 text-[11.5px] text-foreground/45">
            <span className="text-primary">{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" />
            <span>{post.dateLabel}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" />
            <span>{post.readTime}</span>
          </div>

          <h1
            className="mt-4 text-[32px] font-display text-foreground md:text-[46px]"
            style={{ lineHeight: 1.04, letterSpacing: "-0.036em", textWrap: "balance" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 text-[16px] leading-[1.55] text-foreground/60 md:text-[18px]">{post.dek}</p>

          <figure className="mt-9 overflow-hidden rounded-2xl border border-border bg-secondary">
            <img src={post.image} alt={post.imageAlt} className="w-full" />
          </figure>

          <div className="mt-10">
            <PostBody blocks={post.body} />
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-code-bg px-7 py-9 md:px-9">
            <h2 className="section-heading section-heading-dark" style={{ fontSize: 26 }}>
              Find your own gap
            </h2>
            <p className="section-copy section-copy-dark mt-3 max-w-[420px]">
              Run the free audit and see what agents quote for your catalog, and what your funded value is worth in the answer.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={AUDIT_URL}
                className="btn-lift inline-flex h-11 items-center gap-2 rounded-full bg-background px-6 text-[14px] font-medium text-foreground"
              >
                Run your free audit →
              </a>
              {post.linkedInUrl && (
                <a
                  href={post.linkedInUrl}
                  className="text-[13px] text-background/55 underline decoration-background/25 underline-offset-4 transition-colors hover:text-background"
                >
                  Read the original on LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* More */}
          {more.length > 0 && (
            <div className="mt-14 border-t border-border pt-8">
              <span className="text-[11.5px] tracking-[0.14em] text-foreground/40">MORE INSIGHTS</span>
              <div className="mt-5 flex flex-col divide-y divide-border">
                {more.map((p) => (
                  <Link key={p.slug} to={`/insights/${p.slug}`} className="group py-5">
                    <h3 className="text-[18px] font-heading leading-[1.2] text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <span className="mt-1.5 block text-[12.5px] text-foreground/45">
                      {p.category} · {p.readTime}
                    </span>
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
