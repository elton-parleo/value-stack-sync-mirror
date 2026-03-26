export const LipstickIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="6" rx="1" />
    <rect x="7" y="8" width="10" height="14" rx="2" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

export const BootIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 21h10l3-7-3-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v6l-3 2 3 7z" />
    <line x1="9" y1="8" x2="15" y2="8" />
  </svg>
);

export const HeadphonesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
  </svg>
);

export const getScenarioIcon = (icon: string) => {
  switch (icon) {
    case "lipstick": return <LipstickIcon />;
    case "boot": return <BootIcon />;
    case "headphones": return <HeadphonesIcon />;
    default: return <LipstickIcon />;
  }
};
