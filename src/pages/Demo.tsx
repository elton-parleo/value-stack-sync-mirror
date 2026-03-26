import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Scenario, scenarios } from "@/components/demo/scenarioData";
import DemoHero from "@/components/demo/DemoHero";
import ShoppingIntelligence from "@/components/demo/ShoppingIntelligence";
import LiveDemo from "@/components/demo/LiveDemo";
import DemoSandbox from "@/components/demo/DemoSandbox";
import ForDevelopers from "@/components/demo/ForDevelopers";
import DemoFooterCTA from "@/components/demo/DemoFooterCTA";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const scenarioKeys: Scenario[] = ["beauty", "outdoor", "electronics"];

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

      {/* Sticky scenario picker */}
      <div className="sticky top-12 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-content items-center gap-1 px-6 py-2 md:px-20">
          {scenarioKeys.map((key) => {
            const s = scenarios[key];
            const active = key === scenario;
            return (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
                  active ? "bg-primary/[0.08] text-primary" : "text-parleo-muted hover:text-foreground"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <DemoHero scenario={scenario} onScenarioChange={setScenario} />
      <ShoppingIntelligence />
      <LiveDemo scenario={scenario} />
      <DemoSandbox scenario={scenario} />
      <ForDevelopers />
      <DemoFooterCTA />
      <Footer />

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Demo;
