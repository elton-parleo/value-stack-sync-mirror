import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ProblemSection from "@/components/ProblemSection";
import FeedSection from "@/components/FeedSection";
import DashboardSection from "@/components/DashboardSection";
import HowItWorks from "@/components/HowItWorks";
import IntegrationSection from "@/components/IntegrationSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
    <Helmet>
      <title>Parleo — The incentive layer for AI commerce</title>
      <meta name="description" content="Parleo gives AI agents a pre-computed true-cost and product-intelligence layer in a single API call. Loyalty, card offers, and real value — readable and transactable." />
      <link rel="canonical" href="https://parleo.io/" />
      <meta property="og:title" content="Parleo — The incentive layer for AI commerce" />
      <meta property="og:description" content="Parleo gives AI agents a pre-computed true-cost and product-intelligence layer in a single API call. Loyalty, card offers, and real value — readable and transactable." />
      <meta property="og:url" content="https://parleo.io/" />
    </Helmet>
    <Navbar />
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <FeedSection />
      <DashboardSection />
      <HowItWorks />
      <IntegrationSection />
      <TeamSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;


export default Index;
