import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import axelSpringerLogo from "@/assets/logos/axel-springer.png";
import wppLogo from "@/assets/logos/wpp.png";
import nikeLogo from "@/assets/logos/nike.png";
import metamapLogo from "@/assets/logos/metamap.png";
import rakutenLogo from "@/assets/logos/rakuten.png";
import grouponLogo from "@/assets/logos/groupon.png";

type Founder = {
  name: string;
  initials: string;
  title: string;
  location: string;
  bio: string;
  highlights: string[];
  logos: { name: string; src: string }[];
  linkedin: string;
};

const team: Founder[] = [
  {
    name: "Samar Birwadker",
    initials: "SB",
    title: "Co-founder, CEO",
    location: "New York",
    bio: "Built and sold consumer software, ran growth for global brands, and spent a decade making messy data legible to the people who buy from it.",
    highlights: [
      "Founded Good&Co. Acquired by Axel Springer, scaled to $25M ARR.",
      "VP Marketing at MetaMap. Identity infrastructure for 100M+ users.",
      "Brand and growth at WPP / AKQA. Nike, Xbox, Google.",
    ],
    logos: [
      { name: "WPP", src: wppLogo },
      { name: "Nike", src: nikeLogo },
      { name: "Axel Springer", src: axelSpringerLogo },
      { name: "MetaMap", src: metamapLogo },
    ],
    linkedin: "https://www.linkedin.com/in/samarbirwadker/",
  },
  {
    name: "Elton Cheung",
    initials: "EC",
    title: "Co-founder, CTO",
    location: "San Francisco",
    bio: "Twenty years building the pricing, loyalty, and card-linked rails the rest of commerce quietly runs on.",
    highlights: [
      "Built the first card-linked offer product at Groupon on Visa, Mastercard, and Amex rails.",
      "Head of Product and Engineering at Rakuten. Loyalty for 15M+ members.",
      "Two decades in loyalty and pricing infrastructure.",
    ],
    logos: [
      { name: "Rakuten", src: rakutenLogo },
      { name: "Groupon", src: grouponLogo },
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
    className="group flex flex-col rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:border-primary/25 md:p-7"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {/* Header */}
    <header className="flex items-start gap-4">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/[0.07] font-display text-[18px] font-semibold tracking-tight text-primary"
      >
        {f.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-semibold text-foreground">{f.name}</h3>
          <a
            href={f.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${f.name} on LinkedIn`}
            className="text-foreground/35 transition-colors hover:text-primary"
          >
            <Linkedin size={15} />
          </a>
        </div>
        <p className="mt-0.5 text-[13px] text-foreground/60">
          {f.title}
          <span className="mx-1.5 text-foreground/25">·</span>
          {f.location}
        </p>
      </div>
    </header>

    {/* Bio */}
    <p className="mt-5 text-[15px] leading-[1.65] text-foreground/80">{f.bio}</p>

    {/* Highlights */}
    <ul className="mt-5 space-y-2.5 border-t border-border/55 pt-5">
      {f.highlights.map((h) => (
        <li key={h} className="flex gap-3 text-[13.5px] leading-[1.55] text-foreground/75">
          <span
            aria-hidden
            className="mt-[9px] h-px w-3 shrink-0 bg-foreground/30"
          />
          <span>{h}</span>
        </li>
      ))}
    </ul>

    {/* Logos */}
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/55 pt-5">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/40">
        Previously
      </span>
      {f.logos.map((l) => (
        <img
          key={l.name}
          src={l.src}
          alt={`${l.name} logo`}
          className="h-7 w-auto object-contain opacity-55 grayscale transition-opacity duration-300 group-hover:opacity-80 md:h-8"
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
      <div className="grid gap-6 md:grid-cols-[1.05fr_1fr] md:items-end md:gap-12">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[48px]"
          style={{ lineHeight: 1.05 }}
        >
          Operators who've shipped this before.
        </h2>
        <p className="text-[16px] leading-[1.6] text-foreground/65 md:text-[18px]">
          Two founders, one bet: the next decade of commerce runs through agents, and someone has to build the layer that keeps merchants in the answer.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
