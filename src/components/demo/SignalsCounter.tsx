import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BASE = 1_288_343;
const RATE_PER_SEC = 2.3; // ~2-3 signals per second for realism

const SignalsCounter = () => {
  const [count, setCount] = useState(BASE);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      // Add some randomness to feel organic
      const jitter = Math.sin(elapsed * 0.7) * 0.5 + Math.random() * 0.3;
      setCount(Math.floor(BASE + elapsed * (RATE_PER_SEC + jitter)));
    }, 800 + Math.random() * 400);
    return () => clearInterval(interval);
  }, []);

  const formatted = count.toLocaleString();

  return (
    <div className="border-y border-border bg-card/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3 md:px-20">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--success))]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[14px] text-muted-foreground">
            <motion.span
              key={count}
              initial={{ opacity: 0.6, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-[hsl(var(--success))] tabular-nums"
            >
              {formatted}
            </motion.span>
            {" "}signals collected
          </span>
        </div>
        <span className="rounded-[3px] border border-primary/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
          Private Beta
        </span>
      </div>
    </div>
  );
};

export default SignalsCounter;
