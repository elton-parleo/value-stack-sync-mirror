import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  delay?: number;
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className = "", style, id, delay = 0 }, ref) => (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  )
);

AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
