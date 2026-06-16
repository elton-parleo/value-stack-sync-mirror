import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StakesSection from "@/components/StakesSection";
import ProblemSection from "@/components/ProblemSection";
import SpineSection from "@/components/SpineSection";
import ShareOfAlgorithmSection from "@/components/ShareOfAlgorithmSection";
import DashboardSection from "@/components/DashboardSection";
import HowItWorks from "@/components/HowItWorks";
import DevTrackHeader from "@/components/dev/DevTrackHeader";
import DeveloperApiSection from "@/components/dev/DeveloperApiSection";
import IntegrationSection from "@/components/IntegrationSection";
import WhyNowSection from "@/components/WhyNowSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
    <Helmet>
      <title>Parleo: The incentive layer for agentic commerce</title>
      <meta name="description" content="Parleo makes loyalty, card-linked offers, and true product value readable across every agent surface. The True Value layer for agentic commerce." />
      <link rel="canonical" href="https://parleo.io/" />
      <meta property="og:title" content="Parleo: The incentive layer for agentic commerce" />
      <meta property="og:description" content="Pre-computed true-cost and product intelligence for AI agents. Loyalty, card-linked offers, and real value in one API call." />
      <meta property="og:url" content="https://parleo.io/" />
    </Helmet>
    <Navbar />
    <main>
      <HeroSection />
      <StakesSection />
      <ProblemSection />
      <SpineSection />
      <ShareOfAlgorithmSection />
      <DashboardSection />
      <HowItWorks />
      <DevTrackHeader />
      <DeveloperApiSection />
      <IntegrationSection />
      <WhyNowSection />
      <TeamSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
