import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import FeedSection from "@/components/FeedSection";
import DashboardSection from "@/components/DashboardSection";
import IntegrationSection from "@/components/IntegrationSection";
import TeamSection from "@/components/TeamSection";
import ProtocolSection from "@/components/ProtocolSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background grain-overlay">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <HowItWorks />
    <FeedSection />
    <DashboardSection />
    <IntegrationSection />
    <ProtocolSection />
    <TeamSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
