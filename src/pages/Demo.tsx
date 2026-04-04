import { useState, useEffect } from "react";
import { type Scenario } from "@/components/demo/scenarioData";
import Navbar from "@/components/Navbar";
import SignalsCounter from "@/components/demo/SignalsCounter";
import DemoHero from "@/components/demo/DemoHero";
import LiveDemo from "@/components/demo/LiveDemo";
import DemoSandbox from "@/components/demo/DemoSandbox";
import ShoppingIntelligence from "@/components/demo/ShoppingIntelligence";
import MerchantNetwork from "@/components/demo/MerchantNetwork";
import ForDevelopers from "@/components/demo/ForDevelopers";
import DemoStats from "@/components/demo/DemoStats";
import DemoFooterCTA from "@/components/demo/DemoFooterCTA";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";
import lifestylePortrait from "@/assets/lifestyle-editorial-portrait.jpg";

const Demo = () => {
  const [scenario, setScenario] = useState<Scenario>("beauty");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.title = "Parleo · Honey for Agents Demo";
    return () => { document.title = "Parleo"; };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background grain-overlay">
      {/* Ambient background accents — matching homepage editorial warmth */}
      <div className="pointer-events-none absolute left-0 top-[15%] h-[400px] w-[250px] overflow-hidden opacity-[0.03] blur-[6px] md:h-[600px] md:w-[350px] md:opacity-[0.04]">
        <img src={lifestylePortrait} alt="" className="h-full w-full object-cover" style={{ filter: 'grayscale(60%)', mixBlendMode: 'multiply' }} />
      </div>
      <div className="pointer-events-none absolute right-0 top-[45%] h-[350px] w-[200px] overflow-hidden opacity-[0.03] blur-[6px] md:h-[500px] md:w-[300px] md:opacity-[0.04]">
        <img src={lifestyleRetail} alt="" className="h-full w-full object-cover" style={{ filter: 'grayscale(60%)', mixBlendMode: 'multiply' }} />
      </div>
      {/* Subtle radial glow accents */}
      <div className="pointer-events-none absolute left-[20%] top-[30%] h-[500px] w-[500px] rounded-full opacity-[0.03]" style={{
        background: 'radial-gradient(circle, hsl(213 99% 50%) 0%, transparent 70%)'
      }} />
      <div className="pointer-events-none absolute right-[10%] top-[60%] h-[400px] w-[400px] rounded-full opacity-[0.02]" style={{
        background: 'radial-gradient(circle, hsl(213 99% 50%) 0%, transparent 70%)'
      }} />

      <Navbar />
      <SignalsCounter />

      {/* Hero */}
      <DemoHero onRequestAccess={() => setContactOpen(true)} />

      {/* Live Demo + Value Explorer */}
      <div id="live-demo" className="relative mx-auto max-w-content px-5 md:px-20">
        <LiveDemo scenario={scenario} onScenarioChange={setScenario} />
        <div className="pb-8 md:pb-12">
          <DemoSandbox scenario={scenario} />
        </div>
      </div>

      <ShoppingIntelligence />
      <MerchantNetwork />
      <ForDevelopers />
      <DemoStats />
      <DemoFooterCTA />
      <Footer />

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Demo;
