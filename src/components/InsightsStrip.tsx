import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { posts } from "@/content/insights";

const InsightsStrip = () => (
  <AnimatedSection id="insights" className="py-14 md:py-20">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading maxWidth="620px">Research from the new shelf</SectionHeading>
        <Link
          to="/insights"
          className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/60 transition-colors hover:text-foreground"
        >
          All insights
          <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <Link
            key={p.slug}
            to={`/insights/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <div className="flex items-center gap-2.5 text-[11.5px] text-foreground/45">
                <span className="text-primary">{p.category}</span>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <span>{p.readTime}</span>
              </div>
              <h3 className="card-heading leading-[1.18]">{p.title}</h3>
              <p className="text-[13.5px] leading-[1.5] text-foreground/58">{p.dek}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default InsightsStrip;
