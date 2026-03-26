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

const Demo = () => {
  const [scenario, setScenario] = useState<Scenario>("beauty");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.title = "Parleo — Honey for Agents Demo";
    return () => { document.title = "Parleo"; };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      <Navbar />
      <SignalsCounter />

      {/* Hero */}
      <DemoHero onRequestAccess={() => setContactOpen(true)} />

      {/* Live Demo + Value Explorer */}
      <div id="live-demo" className="mx-auto max-w-content px-5 md:px-20">
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