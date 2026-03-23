import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";

const protocols = [
  {
    name: "Stripe ACP",
    desc: "Agent checkout",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    name: "Anthropic MCP",
    desc: "Model context",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Google AP2",
    desc: "Agent payments",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Visa TAP",
    desc: "Card auth",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const stats = [
  { value: 50, prefix: "<", suffix: "ms", label: "Response latency", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" className="mx-auto mb-2 opacity-40">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  )},
  { value: 0, prefix: "", suffix: "", label: "PII transmitted", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" className="mx-auto mb-2 opacity-40">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
  { value: 38, prefix: "", suffix: "+", label: "Merchant integrations", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" className="mx-auto mb-2 opacity-40">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )},
  { value: 2.4, prefix: "", suffix: "M", label: "Monthly logic calls", decimals: 1, icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" className="mx-auto mb-2 opacity-40">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
];

const CountUp = ({ value, prefix = "", suffix = "", decimals = 0, duration = 1.6 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

const ProtocolSection = () => (
  <AnimatedSection className="py-16 md:py-24" style={{ background: "#F8F7F6" }}>
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="rounded-xl border border-transparent bg-card/50 p-5 text-center transition-all duration-300 hover:border-border hover:shadow-card-hover"
          >
            {s.icon}
            <p className="text-[32px] font-bold text-foreground md:text-[40px]">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-1 text-[13px] text-parleo-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="decorative-line my-10" />

      {/* Protocol row */}
      <div className="text-center">
        <span className="font-label text-parleo-muted">PROTOCOL NATIVE</span>
        <p className="mt-3 text-[17px] font-medium text-foreground">
          Ships on the protocols that define agentic commerce.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {protocols.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
            >
              <span className="text-primary/50 transition-colors group-hover:text-primary">{p.icon}</span>
              <span className="text-[13px] font-medium text-foreground">{p.name}</span>
              <span className="text-[10px] text-parleo-muted">· {p.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default ProtocolSection;
