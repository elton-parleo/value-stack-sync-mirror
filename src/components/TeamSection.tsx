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
  initials: string;
  bio: string;
  bullets: string[];
  logos: { name: string; src: string }[];
  dark?: boolean;
};

const team: Founder[] = [
  {
    role: "Co-Founder & CEO",
    name: "Samar Birwadker",
    initials: "SB",
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
    initials: "EC",
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
    dark: true,
  },
];

const FounderCard = ({ f, i }: { f: Founder; i: number }) => {
  const dark = f.dark;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group flex flex-col rounded-2xl p-8 md:p-10 ${
        dark
          ? "bg-[#0E0E14] text-white"
          : "border border-border/70 bg-card text-foreground"
      }`}
      style={!dark ? { boxShadow: "var(--shadow-card)" } : undefined}
    >
      {/* Role tag */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
            dark ? "text-primary" : "text-primary"
          }`}
        >
          {f.role}
        </span>
      </div>

      {/* Avatar + name */}
      <div className="mt-5 flex items-center gap-4">
        <div
          aria-hidden
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold tracking-tight ${
            dark
              ? "bg-white/[0.06] text-white/85"
              : "bg-foreground/[0.06] text-foreground/80"
          }`}
        >
          {f.initials}
        </div>
        <h3
          className={`font-display text-[30px] font-semibold tracking-tight md:text-[34px] ${
            dark ? "text-white" : "text-foreground"
          }`}
          style={{ lineHeight: 1.1 }}
        >
          {f.name}
        </h3>
      </div>

      {/* Divider */}
      <div
        className={`mt-7 h-px w-full ${dark ? "bg-white/10" : "bg-foreground/10"}`}
      />

      {/* Bio */}
      <p
        className={`mt-7 text-[16px] leading-[1.6] ${
          dark ? "text-white/70" : "text-foreground/70"
        }`}
      >
        {f.bio}
      </p>

      {/* Bullets */}
      <ul className="mt-6 space-y-3.5">
        {f.bullets.map((b) => (
          <li
            key={b}
            className={`flex gap-3 text-[15px] leading-[1.55] ${
              dark ? "text-white/85" : "text-foreground/85"
            }`}
          >
            <span
              aria-hidden
              className={`mt-[11px] h-px w-3 shrink-0 ${
                dark ? "bg-primary/70" : "bg-primary/70"
              }`}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Prior work */}
      <div className="mt-auto pt-10">
        <div
          className={`mb-5 h-px w-full ${dark ? "bg-white/10" : "bg-foreground/10"}`}
        />
        <p
          className={`mb-5 font-mono text-[10px] uppercase tracking-[0.22em] ${
            dark ? "text-white/45" : "text-foreground/45"
          }`}
        >
          Prior work
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          {f.logos.map((l) => (
            <img
              key={l.name}
              src={l.src}
              alt={`${l.name} logo`}
              className={`h-8 w-auto object-contain md:h-9 ${
                dark
                  ? "opacity-80 brightness-0 invert"
                  : "opacity-75 grayscale"
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2
        className="font-heading text-[40px] text-foreground md:text-[60px]"
        style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
      >
        Built by operators who have shipped both{" "}
        <em className="font-serif italic text-primary" style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}>
          brand
        </em>{" "}
        and{" "}
        <em className="font-serif italic text-primary" style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}>
          infrastructure
        </em>
        .
      </h2>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
