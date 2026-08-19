import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { posts } from "@/content/insights";

const InsightsStrip = () => (
  <AnimatedSection id="insights" className="border-t border-border py-14 md:py-20">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading maxWidth="620px">Research from the new shelf</SectionHeading>
        <Link
          to="/insights"
          className="link-more"
        >
          <span data-rule />
          Read all insights
        </Link>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-10 border-t border-border pt-10 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <Link key={p.slug} to={`/insights/${p.slug}`} className="group flex flex-col">
            <div className="overflow-hidden rounded-[10px] border border-border bg-secondary">
              <div className="aspect-[16/10] w-full">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-full w-full scale-[1.02] object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col pt-5">
              <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <span className="text-primary">{p.category}</span>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <span className="tracking-normal normal-case">{p.readTime}</span>
              </div>
              <h3 className="mt-3 font-heading text-[21px] leading-[1.16] text-foreground transition-colors group-hover:text-primary md:text-[23px]">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted-foreground">{p.dek}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[12.5px] font-medium text-foreground">
                Read insight
                <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  </AnimatedSection>
);

export default InsightsStrip;
