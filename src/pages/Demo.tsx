import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Scenario } from "@/components/demo/scenarioData";
import DemoHero from "@/components/demo/DemoHero";
import LiveDemo from "@/components/demo/LiveDemo";
import DemoSandbox from "@/components/demo/DemoSandbox";
import ShoppingIntelligence from "@/components/demo/ShoppingIntelligence";
import MerchantNetwork from "@/components/demo/MerchantNetwork";
import ForDevelopers from "@/components/demo/ForDevelopers";
import DemoFooterCTA from "@/components/demo/DemoFooterCTA";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const Demo = () => {
  const [scenario, setScenario] = useState<Scenario>("beauty");
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Parleo — Honey for Agents Demo";
    return () => { document.title = "Parleo"; };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background grain-overlay">
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "h-12 border-b border-border bg-background/90 backdrop-blur-xl" : "h-14 bg-background/60 backdrop-blur-md"}`}>
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
              </svg>
              PARLEO
            </Link>
            <Link to="/" className="text-[13px] text-parleo-muted transition-colors hover:text-foreground">← Back to Home</Link>
          </div>
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center rounded-[4px] bg-foreground px-4 text-[13px] font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.97]"
            style={{ height: 34 }}
          >
            Request Demo
          </button>
        </div>
      </nav>

      {/* 1. Hero */}
      <DemoHero onRequestAccess={() => setContactOpen(true)} />

      {/* 2. Live Demo */}
      <div id="live-demo">
        <LiveDemo scenario={scenario} onScenarioChange={setScenario} />
      </div>

      {/* 3. Try It Yourself */}
      <DemoSandbox scenario={scenario} />

      {/* 4. How It Works */}
      <ShoppingIntelligence />

      {/* 5. The Network */}
      <MerchantNetwork />

      {/* 6. For Developers */}
      <ForDevelopers />

      {/* 7. Footer CTA */}
      <DemoFooterCTA />
      <Footer />

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Demo;
