import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import axelSpringerLogo from "@/assets/logos/axel-springer.png";
import wppLogo from "@/assets/logos/wpp.png";
import nikeLogo from "@/assets/logos/nike.png";
import metamapLogo from "@/assets/logos/metamap.png";
import rakutenLogo from "@/assets/logos/rakuten.png";
import grouponLogo from "@/assets/logos/groupon.png";
import alphaflowLogo from "@/assets/logos/alphaflow.png";

type Founder = {
  name: string;
  title: string;
  bio: string;
  logos: { name: string; src: string }[];
  linkedin: string;
};

const team: Founder[] = [
  {
    name: "Samar Birwadker",
    title: "Co-Founder · Commercial Strategy",
    bio: "Founded Good&Co (acq. Axel Springer, 25M ARR). VP Marketing at MetaMap. Brand & growth at WPP/AKQA for Nike, Xbox, Google.",
    logos: [
      { name: "Axel Springer", src: axelSpringerLogo },
      { name: "WPP", src: wppLogo },
      { name: "Nike", src: nikeLogo },
      { name: "MetaMap", src: metamapLogo },
    ],
    linkedin: "https://www.linkedin.com/in/samarbirwadker/",
  },
  {
    name: "Elton Cheung",
    title: "Co-Founder · Protocol Architecture",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    logos: [
      { name: "Rakuten", src: rakutenLogo },
      { name: "Groupon", src: grouponLogo },
      { name: "AlphaFlow", src: alphaflowLogo },
    ],
    linkedin: "https://www.linkedin.com/in/eltoncheung/",
  },
];

const FounderCard = ({ f, i }: { f: Founder; i: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "-60px" }}
    className="group flex flex-col rounded-2xl border border-border/70 bg-card p-7 transition-all duration-300 hover:border-primary/25 md:p-9"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <h3 className="text-[22px] font-semibold text-foreground md:text-[24px]">{f.name}</h3>
    <div className="mt-2 flex items-center gap-2">
      <p className="text-[14px] text-foreground/60">{f.title}</p>
      <a
        href={f.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${f.name} on LinkedIn`}
        className="text-primary/70 transition-colors hover:text-primary"
      >
        <Linkedin size={16} />
      </a>
    </div>

    <p className="mt-6 text-[16px] leading-[1.65] text-foreground/80">{f.bio}</p>

    <div className="mt-auto flex flex-wrap items-center gap-x-10 gap-y-5 pt-10">
      {f.logos.map((l) => (
        <img
          key={l.name}
          src={l.src}
          alt={`${l.name} logo`}
          className="h-10 w-auto object-contain opacity-70 grayscale transition-opacity duration-300 group-hover:opacity-95 md:h-12"
          loading="lazy"
        />
      ))}
    </div>
  </motion.article>
);

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-14 md:py-20">
    <div className="diffusion-glow pointer-events-none absolute right-[10%] top-[30%]" />

    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2
        className="font-heading text-[36px] text-foreground md:text-[56px]"
        style={{ lineHeight: 1.05 }}
      >
        Seasoned founders & operators
        <br />
        who have shipped this before
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
