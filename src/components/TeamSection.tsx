import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import LifestyleAccent from "./LifestyleAccent";
import wppLogo from "@/assets/logos/wpp-tight.png";
import axelSpringerLogo from "@/assets/logos/axel-springer-tight.png";
import nikeLogo from "@/assets/logos/nike-tight.png";
import landorLogo from "@/assets/logos/landor.png.asset.json";
import rakutenLogo from "@/assets/logos/rakuten-tight.png";
import grouponLogo from "@/assets/logos/groupon-tight.png";
import alphaflowLogo from "@/assets/logos/alphaflow-tight.png";

type Founder = {
  index: string;
  role: string;
  name: string;
  bio: string;
  linkedinUrl: string;
  logos: { name: string; src: string; widthClass: string }[];
};

const team: Founder[] = [
  {
    index: "01",
    role: "Co-Founder · Commercial Strategy",
    name: "Samar Birwadker",
    bio: "Brand strategist turned founder. Builds at the seam of brand, growth, and infrastructure. 3x founder, 2x exits (SaaS, Fintech). VP Growth + advisor & investor in 10+ startups. Brand strategy at WPP / AKQA for Nike, Xbox, CPG.",
    linkedinUrl: "https://www.linkedin.com/in/samarbirwadker/",
    logos: [
      { name: "Axel Springer", src: axelSpringerLogo, widthClass: "w-[88px]" },
      { name: "WPP", src: wppLogo, widthClass: "w-[82px]" },
      { name: "Nike", src: nikeLogo, widthClass: "w-[50px]" },
      { name: "Landor", src: landorLogo.url, widthClass: "w-[78px]" },
    ],
  },
  {
    index: "02",
    role: "Co-Founder · Protocol Architecture",
    name: "Elton Cheung",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    linkedinUrl: "https://www.linkedin.com/in/eltoncheung/",
    logos: [
      { name: "Rakuten", src: rakutenLogo, widthClass: "w-[80px]" },
      { name: "Groupon", src: grouponLogo, widthClass: "w-[86px]" },
      { name: "AlphaFlow", src: alphaflowLogo, widthClass: "w-[72px]" },
    ],
  },
];

const FounderCard = ({ f, i }: { f: Founder; i: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "-60px" }}
    className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 text-foreground transition-all duration-300 hover:border-primary/20 md:p-9"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {/* faint radial wash on hover */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(60% 60% at 100% 0%, hsl(213 99% 50% / 0.05) 0%, transparent 70%)",
      }}
    />

    {/* index + role row */}
    <div className="relative flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/35">
        {f.index}
      </span>
      <span className="h-px w-6 bg-border" />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
        {f.role}
      </span>
    </div>

    {/* name + linkedin */}
    <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
      <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[30px]">
        {f.name}
      </h3>
      <a
        href={f.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${f.name} on LinkedIn`}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground/55 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary"
      >
        <Linkedin className="h-3.5 w-3.5" strokeWidth={2.2} />
      </a>
    </div>

    {/* hairline */}
    <div className="relative mt-5 h-px w-full bg-border/70" />

    {/* bio */}
    <p className="relative mt-5 max-w-[560px] text-[15px] leading-[1.6] text-foreground/65 md:text-[16px]">
      {f.bio}
    </p>

    {/* prior work */}
    <div className="relative mt-7">
      <div className="font-mono text-[10px] tracking-[0.2em] text-foreground/35">
        PREVIOUSLY
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
        {f.logos.map((l) => (
          <div key={l.name} className="flex h-7 items-center">
            <img
              src={l.src}
              alt={`${l.name} logo`}
              className={`${l.widthClass} max-h-5 object-contain opacity-40 grayscale transition-opacity duration-300 group-hover:opacity-70`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>

  </motion.article>
);

const TeamSection = () => (
  <AnimatedSection id="team" className="relative overflow-hidden bg-background py-16 md:py-20">
    <LifestyleAccent variant="fashion" corner="tr" size={48} opacity={0.42} blur={6} />
    {/* subtle blue light burn */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(40% 50% at 92% 12%, hsl(213 99% 50% / 0.06) 0%, transparent 70%)",
      }}
    />
    <div className="relative z-10 mx-auto max-w-content px-6 md:px-20">

      <SectionHeading
        eyebrowNumber="06"
        eyebrow="Team"
        accent="brand and infrastructure"
        maxWidth="820px"
      >
        Built by operators who have shipped
      </SectionHeading>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:gap-6">
        {team.map((f, i) => (
          <FounderCard key={f.name} f={f} i={i} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
