import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts } from "@/content/insights";

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
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="site-texture">
        <section className="relative overflow-hidden border-b border-border py-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(40% 50% at 80% 15%, hsl(213 99% 50% / 0.09) 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-content px-6 md:px-20">
            <h1
              className="font-display max-w-[820px] text-[38px] text-foreground md:text-[58px]"
              style={{ lineHeight: 1.0, letterSpacing: "-0.038em", textWrap: "balance" }}
            >
              Insights from the new shelf
            </h1>
            <p className="section-copy mt-5 max-w-[520px]">
              What agents quote, what they rank, and what happens to the value you funded on the way there.
            </p>
          </div>
        </section>

        {/* Lead */}
        {lead && (
          <section className="mx-auto max-w-content px-6 py-12 md:px-20 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/insights/${lead.slug}`}
                className="group grid gap-8 md:grid-cols-2 md:items-center"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                  <img
                    src={lead.image}
                    alt={lead.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 text-[11.5px] text-foreground/45">
                    <span className="text-primary">{lead.category}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/20" />
                    <span>{lead.dateLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/20" />
                    <span>{lead.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-[28px] font-heading leading-[1.1] text-foreground md:text-[38px]">
                    {lead.title}
                  </h2>
                  <p className="section-copy mt-4 max-w-[460px]">{lead.dek}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground">
                    Read
                    <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <section className="mx-auto max-w-content px-6 pb-16 md:px-20 md:pb-24">
            <div className="grid gap-x-10 gap-y-0 border-t border-border md:grid-cols-2">
              {rest.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border"
                >
                  <Link to={`/insights/${p.slug}`} className="group flex flex-col gap-3 py-8">
                    <div className="flex items-center gap-2.5 text-[11.5px] text-foreground/45">
                      <span className="text-primary">{p.category}</span>
                      <span className="h-1 w-1 rounded-full bg-foreground/20" />
                      <span>{p.dateLabel}</span>
                      <span className="h-1 w-1 rounded-full bg-foreground/20" />
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-[21px] font-heading leading-[1.16] text-foreground transition-colors group-hover:text-primary md:text-[24px]">
                      {p.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-foreground/58 md:text-[14.5px]">{p.dek}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
