import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import FeedSection from "@/components/FeedSection";
import DashboardSection from "@/components/DashboardSection";
import IntegrationSection from "@/components/IntegrationSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const AnnouncementBanner = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="relative flex items-center justify-center bg-primary px-6 py-2">
    <Link to="/demo" className="text-[13px] font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90">
      HONEY FOR AGENTS — TRY THE LIVE DEMO →
    </Link>
    <button onClick={(e) => { e.preventDefault(); onDismiss(); }} className="absolute right-4 text-primary-foreground/80 transition-opacity hover:opacity-100" aria-label="Dismiss">
      ×
    </button>
  </div>
);

const Index = () => {
  const [showBanner, setShowBanner] = useState(() => !sessionStorage.getItem("banner_dismissed"));

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("banner_dismissed", "1");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      {showBanner && <AnnouncementBanner onDismiss={handleDismiss} />}
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeedSection />
      <DashboardSection />
      <HowItWorks />
      <IntegrationSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
