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
  logos: { name: string; src: string; widthClass: string }[];
};

const team: Founder[] = [
  {
    role: "Co-Founder · Commercial Strategy",
    name: "Samar Birwadker",
    bio: "Founded Good&Co (acq. Axel Springer, 25M ARR). VP Marketing at MetaMap. Brand & growth at WPP/AKQA for Nike, Xbox, Google.",
    linkedinUrl: "https://www.linkedin.com/in/samarbirwadker/",
    logos: [
      { name: "Axel Springer", src: axelSpringerLogo, widthClass: "w-[98px]" },
      { name: "WPP", src: wppLogo, widthClass: "w-[92px]" },
      { name: "Nike", src: nikeLogo, widthClass: "w-[56px]" },
      { name: "MetaMap", src: metamapLogo, widthClass: "w-[86px]" },
    ],
  },
  {
    role: "Co-Founder · Protocol Architecture",
    name: "Elton Cheung",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    linkedinUrl: "https://www.linkedin.com/in/eltoncheung/",
    logos: [
      { name: "Rakuten", src: rakutenLogo, widthClass: "w-[90px]" },
      { name: "Groupon", src: grouponLogo, widthClass: "w-[96px]" },
      { name: "AlphaFlow", src: alphaflowLogo, widthClass: "w-[82px]" },
    ],
  },
];

const FounderCard = ({ f, i }: { f: Founder; i: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "-60px" }}
    className="flex min-h-[300px] flex-col rounded-2xl border border-border bg-card p-6 text-foreground md:min-h-[330px] md:p-8 lg:p-9"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <h3 className="text-[22px] font-bold leading-none text-foreground md:text-[24px]">
      {f.name}
    </h3>
    <div className="mt-3 flex items-center gap-2.5 text-[15px] leading-none text-foreground/45 md:text-[16px]">
      <span>{f.role}</span>
      <a
        href={f.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${f.name} on LinkedIn`}
        className="text-primary transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Linkedin className="h-4 w-4" strokeWidth={2.2} />
      </a>
    </div>
    <p className="mt-7 max-w-[620px] text-[17px] leading-[1.55] text-foreground/68 md:text-[18px] lg:text-[19px]">
      {f.bio}
    </p>

    {/* Prior work */}
    <div className="mt-auto pt-9">
      <div className="flex flex-wrap items-center gap-x-9 gap-y-4 md:gap-x-12">
        {f.logos.map((l) => (
          <div key={l.name} className="flex h-14 items-center">
            <img
              src={l.src}
              alt={`${l.name} logo`}
              className={`${l.widthClass} max-h-7 object-contain opacity-42 grayscale transition-opacity hover:opacity-65`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </motion.article>
);

const TeamSection = () => (
  <AnimatedSection id="team" className="relative bg-background py-16 md:py-20">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2 className="section-heading max-w-[900px] text-foreground">
        Built by operators who have shipped brand and infrastructure.
      </h2>

      <div className="mt-9 grid gap-6 md:mt-11 md:grid-cols-2 lg:gap-7">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
