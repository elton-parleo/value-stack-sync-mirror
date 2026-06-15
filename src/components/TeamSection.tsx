import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import wppLogo from "@/assets/logos/wpp.png";
import nikeLogo from "@/assets/logos/nike.png";
import rakutenLogo from "@/assets/logos/rakuten.png";
import grouponLogo from "@/assets/logos/groupon.png";

const team = [
  {
    name: "Samar Birwadker",
    title: "Co-Founder · Commercial Strategy",
    bio: "Founded Good&Co (acquired by Axel Springer, scaled to $25M ARR). VP Marketing at MetaMap. Brand and growth at WPP / AKQA for Nike, Xbox, Google.",
    logos: [
      { name: "WPP", src: wppLogo },
      { name: "NIKE", src: nikeLogo },
    ],
    initials: "SB",
    linkedin: "https://www.linkedin.com/in/samarbirwadker/",
  },
  {
    name: "Elton Cheung",
    title: "Co-Founder · Protocol Architecture",
    bio: "Built the first card-linked offer product at Groupon on Visa, Mastercard, and Amex rails. Head of Product and Engineering at Rakuten. 20 years in loyalty and pricing infrastructure.",
    logos: [
      { name: "RAKUTEN", src: rakutenLogo },
      { name: "GROUPON", src: grouponLogo },
    ],
    initials: "EC",
    linkedin: "https://www.linkedin.com/in/eltoncheung/",
  },
];

const TeamSection = () => (
  <AnimatedSection id="team" className="section-grid relative bg-background py-10 md:py-14">
    <div className="diffusion-glow pointer-events-none absolute right-[10%] top-[30%]" />

    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      <h2 className="font-heading text-[28px] text-foreground md:text-[40px]" style={{ lineHeight: 1.1 }}>
        Operators who've shipped this before.
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
            <p className="mt-3 text-[15px] leading-[1.7] text-foreground/70">{t.bio}</p>
            <div className="mt-4 flex flex-wrap items-center gap-5">
              {t.logos.map((l) => (
                <img
                  key={l.name}
                  src={l.src}
                  alt={`${l.name} logo`}
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
