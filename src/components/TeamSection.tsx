import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import landorLogo from "@/assets/logos/landor.png";
import wppLogo from "@/assets/logos/wpp.png";
import axelSpringerLogo from "@/assets/logos/axel-springer.png";
import nikeLogo from "@/assets/logos/nike.png";
import xboxLogo from "@/assets/logos/xbox.png";
import rakutenLogo from "@/assets/logos/rakuten.png";
import grouponLogo from "@/assets/logos/groupon.png";
import alphaflowLogo from "@/assets/logos/alphaflow.png";

type Founder = {
  role: string;
  name: string;
  bio: string;
  bullets: string[];
  logos: { name: string; src: string }[];
};

const team: Founder[] = [
  {
    role: "Co-Founder & CEO",
    name: "Samar Birwadker",
    bio: "Brand strategist turned founder. Builds at the seam of brand, growth, and infrastructure.",
    bullets: [
      "3x founder, 2x exits (SaaS, Fintech)",
      "VP Growth + advisor to 10+ commerce startups",
      "Brand strategy at WPP / AKQA for Nike, Xbox, CPG",
    ],
    logos: [
      { name: "Landor", src: landorLogo },
      { name: "WPP", src: wppLogo },
      { name: "Axel Springer", src: axelSpringerLogo },
      { name: "Nike", src: nikeLogo },
      { name: "Xbox", src: xboxLogo },
    ],
  },
  {
    role: "Co-Founder & CTO",
    name: "Elton Cheung",
    bio: "Two decades shipping marketplace and loyalty infrastructure at scale.",
    bullets: [
      "20 years building commerce infrastructure",
      "Head of Product + Engineering at Rakuten Marketing",
      "5 years at Groupon: marketplace + loyalty infra",
    ],
    logos: [
      { name: "Rakuten", src: rakutenLogo },
      { name: "Groupon", src: grouponLogo },
      { name: "AlphaFlow", src: alphaflowLogo },
    ],
  },
];

const FounderCard = ({ f, i }: { f: Founder; i: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "-60px" }}
    className="group flex flex-col rounded-2xl border border-border/70 bg-card p-8 text-foreground md:p-10"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {/* Role */}
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
        {f.role}
      </span>
    </div>

    {/* Name */}
    <h3
      className="mt-5 font-display text-[30px] font-semibold tracking-tight text-foreground md:text-[36px]"
      style={{ lineHeight: 1.1 }}
    >
      {f.name}
    </h3>

    {/* Divider */}
    <div className="mt-6 h-px w-full bg-foreground/10" />

    {/* Bio */}
    <p className="mt-6 text-[16px] leading-[1.6] text-foreground/70">{f.bio}</p>

    {/* Bullets */}
    <ul className="mt-6 space-y-3.5">
      {f.bullets.map((b) => (
        <li
          key={b}
          className="flex gap-3 text-[15px] leading-[1.55] text-foreground/85"
        >
          <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-primary/70" />
          <span>{b}</span>
        </li>
      ))}
    </ul>

    {/* Prior work */}
    <div className="mt-auto pt-10">
      <div className="mb-5 h-px w-full bg-foreground/10" />
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
        Prior work
      </p>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {f.logos.map((l) => (
          <img
            key={l.name}
            src={l.src}
            alt={`${l.name} logo`}
            className="h-14 w-auto object-contain opacity-75 grayscale transition-opacity hover:opacity-100"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </motion.article>
);

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-16 md:py-20">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2
        className="font-heading text-[40px] text-foreground md:text-[60px]"
        style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
      >
        Built by operators who have shipped both{" "}
        <em
          className="font-serif italic text-primary"
          style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
        >
          brand
        </em>{" "}
        and{" "}
        <em
          className="font-serif italic text-primary"
          style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
        >
          infrastructure
        </em>
        .
      </h2>

      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
