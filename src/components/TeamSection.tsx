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

const team = [
  {
    name: "Samar Birwadker",
    title: "Co-Founder · Commercial Strategy",
    bio: "Founded Good&Co (acq. Axel Springer, 25M ARR). VP Marketing at MetaMap. Brand & growth at WPP/AKQA for Nike, Xbox, Google.",
    logos: [
      { name: "AXEL SPRINGER", src: axelSpringerLogo },
      { name: "WPP", src: wppLogo },
      { name: "NIKE", src: nikeLogo },
      { name: "METAMAP", src: metamapLogo },
    ],
    initials: "SB",
    linkedin: "https://www.linkedin.com/in/samarbirwadker/",
  },
  {
    name: "Elton Cheung",
    title: "Co-Founder · Protocol Architecture",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    logos: [
      { name: "RAKUTEN", src: rakutenLogo },
      { name: "GROUPON", src: grouponLogo },
      { name: "ALPHAFLOW", src: alphaflowLogo },
    ],
    initials: "EC",
    linkedin: "https://www.linkedin.com/in/eltoncheung/",
  },
];

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-10 md:py-14">
    <div className="diffusion-glow pointer-events-none absolute right-[10%] top-[30%]" />
    <div className="decorative-line" />
    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-label text-parleo-muted">THE TEAM</span>
      </div>
      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[40px]" style={{ lineHeight: 1.1 }}>
        Seasoned founders &amp; operators<br />who have shipped this before
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div>
              <h3 className="text-[16px] font-bold text-foreground">{t.name}</h3>
              <div className="mt-0.5 flex items-center gap-2">
                <p className="text-[12px] text-parleo-muted">{t.title}</p>
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary/70 transition-colors hover:text-primary">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
            <p className="mt-3 text-[15px] leading-[1.7] text-foreground/55">{t.bio}</p>
            <div className="mt-4 flex flex-wrap items-center gap-5">
              {t.logos.map((l) => (
                <img
                  key={l.name}
                  src={l.src}
                  alt={l.name}
                  className="h-14 w-auto object-contain opacity-50 grayscale transition-all group-hover:opacity-70"
                  loading="lazy"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
