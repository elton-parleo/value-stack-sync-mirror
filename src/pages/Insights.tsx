import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts } from "@/content/insights";

const ease = [0.22, 1, 0.36, 1] as const;

const Insights = () => {
  const [lead, ...rest] = posts;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Helmet>
        <title>Insights: research on agentic commerce | Parleo</title>
        <meta
          name="description"
          content="Parleo research and points of view on how AI agents price, rank, and recommend products, and the funded value they can't see."
        />
        <link rel="canonical" href="https://parleo.io/insights" />
        <meta property="og:title" content="Insights: research on agentic commerce | Parleo" />
        <meta property="og:description" content="How AI agents price, rank, and recommend products, and the funded value they can't see." />
        <meta property="og:url" content="https://parleo.io/insights" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Parleo Insights",
            url: "https://parleo.io/insights",
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://parleo.io/insights/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Masthead: title left, running index right */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "88px 100%",
              maskImage: "linear-gradient(to bottom, black, transparent 78%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-40 h-[420px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent 72%)",
              filter: "blur(2px)",
            }}
          />

          <div className="relative mx-auto max-w-content px-6 py-14 md:px-20 md:py-20">
            <div className="grid items-end gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <h1
                  className="font-display max-w-[640px] text-[40px] text-foreground md:text-[62px]"
                  style={{ lineHeight: 0.98, textWrap: "balance", letterSpacing: "-0.02em" }}
                >
                  Insights from the new shelf
                  <span className="ml-2 inline-block h-[10px] w-[10px] translate-y-[-6px] rounded-full bg-primary align-middle md:h-3 md:w-3" />
                </h1>
                <p className="section-copy mt-6 max-w-[460px]">
                  What agents quote, what they rank, and what happens to the value you funded on the
                  way there.
                </p>
              </motion.div>

              {/* Running index */}
              <motion.ol
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease }}
                className="border-t border-border"
              >
                {posts.map((p, i) => (
                  <li key={p.slug} className="border-b border-border">
                    <Link
                      to={`/insights/${p.slug}`}
                      className="group flex items-baseline gap-4 py-3.5"
                    >
                      <span className="w-7 shrink-0 font-mono text-[11px] tabular-nums text-foreground/35 transition-colors group-hover:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[14px] leading-[1.35] text-foreground/70 transition-colors group-hover:text-foreground md:text-[14.5px]">
                        {p.title}
                      </span>
                      <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/30">
                        {p.readTime.replace(" read", "")}
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ol>
            </div>
          </div>
        </section>

        {/* Lead story */}
        {lead && (
          <section className="mx-auto max-w-content px-6 pt-12 md:px-20 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
            >
              <Link to={`/insights/${lead.slug}`} className="group block">
                <div className="relative overflow-hidden bg-secondary">
                  <div className="aspect-[16/10] w-full md:aspect-[21/9]">
                    <img
                      src={lead.image}
                      alt={lead.imageAlt}
                      className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="absolute left-0 top-0 bg-primary px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-primary-foreground">
                    01
                  </span>
                </div>

                <div className="grid gap-6 border-b border-border pb-9 pt-6 md:grid-cols-[1fr_0.62fr] md:gap-14">
                  <div>
                    <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.09em] text-foreground/40">
                      <span className="text-primary">{lead.category}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                      <span>{lead.dateLabel}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                      <span>{lead.readTime}</span>
                    </div>
                    <h2
                      className="mt-3.5 max-w-[620px] font-display text-[30px] leading-[1.04] text-foreground md:text-[44px]"
                      style={{ letterSpacing: "-0.015em", textWrap: "balance" }}
                    >
                      {lead.title}
                    </h2>
                  </div>
                  <div className="flex flex-col justify-end md:border-l md:border-border md:pl-10">
                    <p className="section-copy max-w-[420px]">{lead.dek}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground">
                      Read the piece
                      <span className="inline-block text-primary transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Remaining stories, numbered editorial rows */}
        {rest.length > 0 && (
          <section className="mx-auto max-w-content px-6 pb-14 md:px-20 md:pb-20">
            {rest.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="border-b border-border"
              >
                <Link
                  to={`/insights/${p.slug}`}
                  className="group grid gap-5 py-8 md:grid-cols-[52px_0.62fr_1fr] md:items-start md:gap-10 md:py-11"
                >
                  <span className="hidden font-mono text-[11px] tabular-nums text-foreground/30 transition-colors group-hover:text-primary md:block md:pt-1">
                    {String(i + 2).padStart(2, "0")}
                  </span>

                  <div className="overflow-hidden bg-secondary">
                    <div className="aspect-[4/3]">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.09em] text-foreground/40">
                      <span className="text-primary">{p.category}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                      <span>{p.dateLabel}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
                      <span>{p.readTime}</span>
                    </div>
                    <h3
                      className="mt-3 max-w-[520px] font-heading text-[23px] leading-[1.1] text-foreground md:text-[30px]"
                      style={{ letterSpacing: "-0.012em", textWrap: "balance" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-3.5 max-w-[460px] text-[14px] leading-[1.58] text-muted-foreground md:text-[15px]">
                      {p.dek}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      Read
                      <span className="inline-block text-primary transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </section>
        )}

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
                className="btn-primary shrink-0 self-start md:self-auto"
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
