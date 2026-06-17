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
    className="flex min-h-[330px] flex-col rounded-2xl border border-border bg-card p-7 text-foreground md:min-h-[360px] md:p-9"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <h3 className="font-display text-[24px] font-semibold leading-none text-foreground md:text-[28px]">
      {f.name}
    </h3>
    <div className="mt-4 flex items-center gap-3 text-[18px] leading-none text-foreground/45 md:text-[20px]">
      <span>{f.role}</span>
      <a
        href={f.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${f.name} on LinkedIn`}
        className="text-primary transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Linkedin className="h-5 w-5" strokeWidth={2.2} />
      </a>
    </div>
    <p className="mt-8 max-w-[760px] text-[24px] leading-[1.65] text-foreground/70 md:text-[28px]">
      {f.bio}
    </p>

    {/* Prior work */}
    <div className="mt-auto pt-10">
      <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
        {f.logos.map((l) => (
          <div key={l.name} className="flex h-14 items-center">
            <img
              src={l.src}
              alt={`${l.name} logo`}
              className="max-h-14 max-w-[140px] object-contain opacity-45 grayscale transition-opacity hover:opacity-70"
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
