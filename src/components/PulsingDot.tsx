const PulsingDot = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-block h-2 w-2 rounded-full bg-primary animate-pulse-dot ${className}`}
  />
);

export default PulsingDot;
