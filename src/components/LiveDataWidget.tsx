import { motion } from "framer-motion";
import PulsingDot from "./PulsingDot";

const metrics = [
  { label: "AGENT QUERIES", value: "147,892", sub: "today" },
  { label: "RESPONSE TIME", value: "<50", sub: "ms avg" },
  { label: "INCENTIVE CALLS", value: "2.4M", sub: "this month" },
];

const LiveDataWidget = () => (
  <motion.div
    className="w-full max-w-[360px] rounded-xl border border-border bg-card p-5 transition-shadow duration-500 hover:shadow-elevated"
    style={{ boxShadow: "var(--shadow-elevated)" }}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PulsingDot />
        <span className="font-label-wide text-primary">Live Network</span>
      </div>
      <span className="text-[10px] text-parleo-muted">Updated 12s ago</span>
    </div>

    <div className="my-4 decorative-line" />

    {/* Metrics */}
    <div className="space-y-3.5">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex items-baseline justify-between"
        >
          <span className="font-label text-parleo-muted">{m.label}</span>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              className="text-xl font-bold text-foreground"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            >
              {m.value}
            </motion.span>
            <span className="text-[10px] text-parleo-muted">{m.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="my-4 decorative-line" />

    {/* Mini sparkline */}
    <div>
      <span className="font-label text-parleo-muted">QUERY VOLUME · 7 DAYS</span>
      <svg viewBox="0 0 200 48" className="mt-2 h-12 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(213,99%,50%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(213,99%,50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,38 L33,28 L66,32 L100,18 L133,22 L166,10 L200,6 L200,48 L0,48 Z" fill="url(#sparkGrad)" />
        <motion.path
          d="M0,38 L33,28 L66,32 L100,18 L133,22 L166,10 L200,6"
          fill="none"
          stroke="hsl(213,99%,50%)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="200" cy="6" r="3"
          fill="hsl(213,99%,50%)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
        />
      </svg>
    </div>

    {/* Bottom merchants */}
    <div className="mt-3 flex items-center justify-between">
      <div className="flex -space-x-1.5">
        {[0.9, 0.7, 0.5, 0.35].map((o, i) => (
          <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-secondary text-[8px] font-bold text-foreground" style={{ opacity: o }}>
            {["N", "A", "S", "+"][i]}
          </div>
        ))}
      </div>
      <span className="text-[10px] text-parleo-muted">38 merchants connected</span>
    </div>
  </motion.div>
);

export default LiveDataWidget;
