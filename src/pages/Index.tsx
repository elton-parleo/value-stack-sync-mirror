import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ProblemSection from "@/components/ProblemSection";
import ValueRevealSection from "@/components/ValueRevealSection";
import FeedSection from "@/components/FeedSection";
import DashboardSection from "@/components/DashboardSection";
import HowItWorks from "@/components/HowItWorks";
import IntegrationSection from "@/components/IntegrationSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
    <Navbar />
    <HeroSection />
    <SocialProofSection />
    <ProblemSection />
    <ValueRevealSection />
    <FeedSection />
    <DashboardSection />
    <HowItWorks />
    <IntegrationSection />
    <TeamSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
