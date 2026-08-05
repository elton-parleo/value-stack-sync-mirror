import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Check, Link2, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import ArticleBody from "@/components/blog/ArticleBody";
import PostCard from "@/components/blog/PostCard";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import ContactFormDialog from "@/components/ContactFormDialog";
import {
  formatDate,
  getPost,
  readingTime,
  relatedPosts,
} from "@/content/blog/posts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const headings = useMemo(
    () =>
      post
        ? post.body
            .map((b, i) => (b.type === "h2" ? { id: `s-${i}`, text: b.text } : null))
            .filter((x): x is { id: string; text: string } => Boolean(x))
        : [],
    [post],
  );

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings, slug]);

  if (!post) return <NotFound />;

  const url = `https://parleo.io/blog/${post.slug}`;
  const related = relatedPosts(post);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>{`${post.title} | Parleo`}</title>
        <meta name="description" content={post.dek.slice(0, 155)} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.dek.slice(0, 155)} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.dek,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
            publisher: { "@type": "Organization", name: "Parleo" },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: post.tags.join(", "),
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-primary"
      />

      <main>
        {/* Article head */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 light-burn-cool opacity-80" />
          <div className="relative mx-auto max-w-content px-5 pb-8 pt-8 md:px-20 md:pt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} /> All articles
            </Link>
            <div className="mt-6 max-w-[62ch]">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em]">
                <span className="text-primary">{post.category}</span>
                <span className="h-px w-4 bg-border" />
                <span className="text-foreground/40">{formatDate(post.date)}</span>
                <span className="h-px w-4 bg-border" />
                <span className="text-foreground/40 tabular-nums">{readingTime(post)} min read</span>
              </div>
              <h1
                className="mt-4 text-[30px] font-bold leading-[1.06] tracking-[-0.035em] text-foreground md:text-[46px]"
                style={{ textWrap: "balance" }}
              >
                {post.title}
              </h1>
              <p className="mt-4 text-[16px] leading-[1.6] text-foreground/60 md:text-[18px]">
                {post.dek}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-foreground">
                    {post.author.name}
                  </span>
                  {post.author.linkedin && (
                    <a
                      href={post.author.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${post.author.name} on LinkedIn`}
                      className="text-foreground/40 transition-colors hover:text-primary"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  <span className="text-[12.5px] text-foreground/45">{post.author.role}</span>
                </div>
                <button
                  onClick={copyLink}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] text-foreground/60 transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {copied ? <Check size={13} /> : <Link2 size={13} />}
                  {copied ? "Link copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="mx-auto max-w-content px-5 md:px-20">
          <div
            className="overflow-hidden rounded-2xl bg-secondary"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={post.cover}
              alt={post.coverAlt}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </section>

        {/* Body + TOC */}
        <section className="mx-auto max-w-content px-5 py-12 md:px-20 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0 max-w-[68ch]">
              <ArticleBody blocks={post.body} />

              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[11px] text-foreground/55"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Inline CTA */}
              <div className="mt-10 rounded-2xl border-t-2 border-primary bg-secondary/70 px-6 py-7 md:px-8">
                <h3 className="font-heading text-[20px] text-foreground md:text-[24px]">
                  See true cost resolved on your own catalog
                </h3>
                <p className="section-copy mt-2 max-w-[48ch]">
                  We run a resolution pass on ten of your SKUs and show what an agent sees before
                  and after.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setContactOpen(true)}
                    className="btn-lift h-11 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85"
                  >
                    <span>Request demo</span>
                  </button>
                  <a
                    href="https://parleo.io/demo"
                    className="inline-flex h-11 items-center rounded-full border border-primary/30 bg-primary/[0.04] px-6 text-[14px] font-medium text-foreground transition-colors hover:border-primary/50"
                  >
                    How it works
                  </a>
                </div>
              </div>
            </div>

            {/* TOC */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/40">
                    Contents
                  </div>
                  <nav className="mt-4 flex flex-col gap-2.5 border-l border-border pl-4">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`relative text-[13px] leading-snug transition-colors ${
                          activeHeading === h.id
                            ? "text-foreground"
                            : "text-foreground/45 hover:text-foreground/75"
                        }`}
                      >
                        {activeHeading === h.id && (
                          <span className="absolute -left-[17px] top-1 h-4 w-px bg-primary" />
                        )}
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto max-w-content px-5 pb-14 md:px-20">
            <div className="section-divider mb-8" />
            <h2 className="font-heading text-[22px] text-foreground md:text-[28px]">
              Related reading
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-content px-5 pb-16 md:px-20 md:pb-24">
          <NewsletterSignup compact />
        </section>
      </main>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default BlogPost;
