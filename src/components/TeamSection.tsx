import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import wppLogo from "@/assets/logos/wpp-tight.png";
import axelSpringerLogo from "@/assets/logos/axel-springer-tight.png";
import nikeLogo from "@/assets/logos/nike-tight.png";
import metamapLogo from "@/assets/logos/metamap-tight.png";
import rakutenLogo from "@/assets/logos/rakuten-tight.png";
import grouponLogo from "@/assets/logos/groupon-tight.png";
import alphaflowLogo from "@/assets/logos/alphaflow-tight.png";

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
    className="flex min-h-[330px] flex-col rounded-[18px] border border-border bg-card p-7 text-foreground md:min-h-[360px] md:p-9 lg:min-h-[492px] lg:p-12"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <h3 className="font-display text-[24px] font-semibold leading-none text-foreground md:text-[28px]">
      {f.name}
    </h3>
    <div className="mt-5 flex items-center gap-3 text-[18px] leading-none text-foreground/45 md:text-[20px] lg:text-[24px]">
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
    <p className="mt-9 max-w-[760px] text-[22px] leading-[1.65] text-foreground/70 md:text-[26px] lg:text-[30px]">
      {f.bio}
    </p>

    {/* Prior work */}
    <div className="mt-auto pt-12">
      <div className="flex flex-wrap items-center gap-x-12 gap-y-5 md:gap-x-16 lg:gap-x-20">
        {f.logos.map((l) => (
          <div key={l.name} className="flex h-14 items-center">
            <img
              src={l.src}
              alt={`${l.name} logo`}
              className="max-h-14 max-w-[140px] object-contain opacity-45 grayscale transition-opacity hover:opacity-70 md:max-w-[160px]"
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
    <div className="mx-auto max-w-[1840px] px-6 md:px-11">
      <h2
        className="mx-auto max-w-content font-display text-[34px] text-foreground md:text-[48px]"
        style={{ lineHeight: 1 }}
      >
        Built by operators who have shipped brand and infrastructure.
      </h2>

      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:gap-9">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
