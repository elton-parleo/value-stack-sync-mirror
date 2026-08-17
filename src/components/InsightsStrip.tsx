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

      <div className="mt-10 grid overflow-hidden border-y border-border md:grid-cols-[1.35fr_0.825fr_0.825fr]">
        {posts.slice(0, 3).map((p, index) => (
          <Link
            key={p.slug}
            to={`/insights/${p.slug}`}
            className={`group flex flex-col py-6 md:py-0 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}
          >
            <div className={`overflow-hidden bg-secondary ${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <div className={`flex flex-1 flex-col px-1 pt-5 md:p-6 ${index === 0 ? "md:pl-0 md:pr-8" : ""}`}>
              <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
                <span className="text-primary">{p.category}</span>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <span>{p.readTime}</span>
              </div>
              <h3 className={`mt-3 font-heading leading-[1.12] text-foreground transition-colors group-hover:text-primary ${index === 0 ? "text-[25px] md:text-[31px]" : "text-[20px] md:text-[22px]"}`}>{p.title}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.5] text-muted-foreground">{p.dek}</p>
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
