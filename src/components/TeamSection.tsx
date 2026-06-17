import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import wppLogo from "@/assets/logos/wpp.png";
import axelSpringerLogo from "@/assets/logos/axel-springer.png";
import nikeLogo from "@/assets/logos/nike.png";
import metamapLogo from "@/assets/logos/metamap.png";
import rakutenLogo from "@/assets/logos/rakuten.png";
import grouponLogo from "@/assets/logos/groupon.png";
import alphaflowLogo from "@/assets/logos/alphaflow.png";

type Founder = {
  role: string;
  name: string;
  bio: string;
  linkedinUrl: string;
  logos: { name: string; src: string }[];
};

const team: Founder[] = [
  {
    role: "Co-Founder · Commercial Strategy",
    name: "Samar Birwadker",
    bio: "Founded Good&Co (acq. Axel Springer, 25M ARR). VP Marketing at MetaMap. Brand & growth at WPP/AKQA for Nike, Xbox, Google.",
    linkedinUrl: "https://www.linkedin.com/in/samarbirwadker/",
    logos: [
      { name: "Axel Springer", src: axelSpringerLogo },
      { name: "WPP", src: wppLogo },
      { name: "Nike", src: nikeLogo },
      { name: "MetaMap", src: metamapLogo },
    ],
  },
  {
    role: "Co-Founder · Protocol Architecture",
    name: "Elton Cheung",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    linkedinUrl: "https://www.linkedin.com/in/eltoncheung/",
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
    className="group flex flex-col rounded-2xl border border-border/70 bg-card p-6 text-foreground md:p-8"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <p className="text-[14px] font-medium text-primary">{f.role}</p>
    <h3
      className="mt-3 font-display text-[30px] text-foreground md:text-[36px]"
      style={{ lineHeight: 1.1 }}
    >
      {f.name}
    </h3>
    <p className="mt-4 border-t border-border pt-4 text-[16px] leading-[1.5] text-foreground/65">{f.bio}</p>

    {/* Bullets */}
    <ul className="mt-5 space-y-3">
      {f.bullets.map((b) => (
        <li
          key={b}
          className="flex gap-3 text-[15px] leading-[1.45] text-foreground/85"
        >
          <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-primary" />
          <span>{b}</span>
        </li>
      ))}
    </ul>

    {/* Prior work */}
    <div className="mt-auto pt-8">
      <div className="mb-5 h-px w-full bg-foreground/10" />
      <p className="mb-5 text-[13px] font-medium text-foreground/45">Prior work</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-5 sm:grid-cols-4">
        {f.logos.map((l) => (
          <div key={l.name} className="flex h-12 items-center">
            <img
            src={l.src}
            alt={`${l.name} logo`}
            className="max-h-10 max-w-[112px] object-contain opacity-80 grayscale transition-opacity hover:opacity-100"
            loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </motion.article>
);

const TeamSection = () => (
  <AnimatedSection id="team" className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2
        className="max-w-[860px] font-display text-[34px] text-foreground md:text-[48px]"
        style={{ lineHeight: 1 }}
      >
        Built by operators who have shipped brand and infrastructure.
      </h2>

      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
