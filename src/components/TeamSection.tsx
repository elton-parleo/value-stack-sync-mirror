import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const team = [
  {
    name: "Samar Birwadker",
    title: "Co-Founder · Commercial Strategy",
    bio: "Founded Good&Co (acq. Axel Springer, 25M ARR). VP Marketing at MetaMap. Brand & growth at WPP/AKQA for Nike, Xbox, Google.",
    logos: [
      { name: "AXEL SPRINGER", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="3" x2="12" y2="21" /></svg>
      )},
      { name: "WPP", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
      )},
      { name: "NIKE", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18L10 6l4 8 8-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )},
      { name: "METAMAP", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
      )},
    ],
    initials: "SB",
    linkedin: "https://www.linkedin.com/in/samarbirwadker/",
  },
  {
    name: "Elton Cheung",
    title: "Co-Founder · Protocol Architecture",
    bio: "Head of Product & Engineering at Rakuten. 5 years scaling marketplace infra at Groupon. Fintech architect at AlphaFlow.",
    logos: [
      { name: "RAKUTEN", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" /></svg>
      )},
      { name: "GROUPON", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
      )},
      { name: "ALPHAFLOW", icon: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )},
    ],
    initials: "EC",
    linkedin: "https://www.linkedin.com/in/eltoncheung/",
  },
];

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute right-[10%] top-[30%]" />
    <div className="decorative-line" />
    <div className="mx-auto max-w-content px-6 pt-8 md:px-20">
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
        Built by people who've<br />shipped this before.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div>
              <h3 className="text-[16px] font-bold text-foreground">{t.name}</h3>
              <div className="mt-0.5 flex items-center gap-2">
                <p className="text-[12px] text-parleo-muted">{t.title}</p>
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-parleo-muted/50 transition-colors hover:text-primary">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-[1.7] text-foreground/50">{t.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {t.logos.map((l) => (
                <span
                  key={l.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-parleo-muted/70 transition-colors group-hover:border-primary/10 group-hover:text-parleo-muted"
                >
                  <span className="opacity-50">{l.icon}</span>
                  {l.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default TeamSection;
