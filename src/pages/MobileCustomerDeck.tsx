import { ArrowDown, ArrowUpRight, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import beautyImage from "@/assets/lifestyle-beauty-flatlay.jpg";
import fashionImage from "@/assets/lifestyle-fashion.jpg";
import retailImage from "@/assets/lifestyle-retail-moment.jpg";
import techImage from "@/assets/lifestyle-tech.jpg";
import portraitImage from "@/assets/lifestyle-editorial-portrait.jpg";
import {
  AgentNetwork,
  AuditPreview,
  CategoryExposure,
  CollapsedFunnel,
  ConsoleVisual,
  EraScoreboard,
  FeatureTriptych,
  FeedProof,
  FounderVisual,
  MemberEconomics,
  PlatformPipeline,
  PriceReveal,
  ProductLadder,
  SpendReach,
  SyncVisual,
} from "@/components/customerdeck/MobileDeckVisuals";

const surfaces = ["Site schema", "Google Merchant Center", "OpenAI ACP", "Google UCP", "MCP + API"];

const Frame = ({ number, children, dark = false, image }: { number: string; children: React.ReactNode; dark?: boolean; image?: string }) => (
  <section id={`deck-${number}`} className={dark ? "relative overflow-hidden border-t-[6px] border-primary bg-code-bg text-background" : "relative overflow-hidden border-t-[6px] border-primary bg-background text-foreground"}>
    {image && <img src={image} alt="" className="absolute inset-y-0 right-0 h-full w-[82%] object-cover opacity-20 [mask-image:linear-gradient(to_right,transparent,black_45%)]" />}
    <span aria-hidden="true" className="pointer-events-none absolute -right-2 top-24 font-mono text-[108px] font-bold leading-none text-current/[0.035]">{number}</span>
    <div className="relative mx-auto min-h-[100svh] max-w-lg px-5 pb-20 pt-20">
      <div className="mb-12 flex items-center justify-between border-b border-current/15 pb-3 font-mono text-[10px] uppercase tracking-[0.12em]">
        <span>Parleo</span><span>{number === "A1" ? "Appendix" : `${number} / 12`}</span>
      </div>
      {children}
    </div>
  </section>
);

const Title = ({ children }: { children: React.ReactNode }) => <h2 className="text-[38px] font-bold leading-[1.02] tracking-normal text-balance">{children}</h2>;
const Lead = ({ children }: { children: React.ReactNode }) => <p className="mt-5 text-[18px] leading-[1.45] text-current/65">{children}</p>;
const Label = ({ children }: { children: React.ReactNode }) => <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{children}</p>;
const Rule = () => <div className="my-8 h-px bg-current/15" />;
const Metric = ({ value, children }: { value: string; children: React.ReactNode }) => <div className="border-t border-current/15 py-5"><strong className="block text-4xl font-bold leading-none text-primary">{value}</strong><span className="mt-2 block text-sm leading-snug text-current/65">{children}</span></div>;
const Row = ({ title, value, note }: { title: string; value?: string; note: string }) => <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-current/15 py-4"><div><strong className="block text-base">{title}</strong><span className="mt-1 block text-sm leading-snug text-current/55">{note}</span></div>{value && <strong className="text-right text-lg text-primary">{value}</strong>}</div>;
const Step = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => <div className="border-t border-current/15 py-5"><div className="mb-2 flex items-baseline gap-3"><span className="font-mono text-[10px] text-primary">{number}</span><strong className="text-xl">{title}</strong></div><p className="text-[15px] leading-relaxed text-current/60">{children}</p></div>;

const MobileCustomerDeck = () => (
  <div className="bg-background md:hidden">
    <header className="sticky inset-x-0 top-0 z-50 border-b border-background/10 bg-code-bg/95 px-4 py-2.5 text-background backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <Link to="/" className="text-sm font-bold" aria-label="Go to Parleo homepage">PARLEO</Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="px-1.5 py-2 text-[11px] font-medium text-background/70">Home</Link>
          <Button asChild size="sm" className="h-8 px-3 text-[11px]">
            <a href="https://parleo.io/audit/">Free audit</a>
          </Button>
          <a href="/customerdeck-presentation.html" aria-label="Open desktop presentation" className="p-2 text-background/70"><Monitor className="h-4 w-4" /></a>
        </div>
      </div>
    </header>

    <Frame number="01" dark image={beautyImage}>
      <div className="flex min-h-[72svh] flex-col justify-between">
        <div>
          <Label>Introduction, September 2026</Label>
          <h1 className="mt-6 max-w-[11ch] text-[52px] font-bold leading-[0.98] tracking-normal text-balance">Your next customer just asked an AI what to buy.</h1>
          <Lead>Parleo is the agentic commerce platform: your catalog, content, pricing and incentives, published to every AI surface, verified back, and proven in revenue.</Lead>
        </div>
        <div>
          <AgentNetwork />
          <p className="mt-8 text-sm">Samar Birwadker · samar@parleo.io · parleo.io</p>
        </div>
      </div>
      <a href="#deck-02" className="absolute bottom-6 right-5 text-background/60" aria-label="Continue"><ArrowDown /></a>
    </Frame>

    <Frame number="02" image={techImage}>
      <Title>The e-commerce funnel is collapsing into a single chat window</Title>
      <Lead>15% of shoppers go to an AI first, and more than 50% use one somewhere in the journey. LLMs and agents completely bypass your funnel.</Lead>
      <CollapsedFunnel />
      <div className="mt-9 grid grid-cols-3 gap-x-4"><Metric value="+393%">AI-referred traffic, YoY</Metric><Metric value="11×">AI-attributed orders, Shopify</Metric><Metric value="-25%">organic traffic absorbed</Metric></div>
      <Lead>Differentiation just became a data problem. The brand whose full catalog, live price and real offer reach every surface an agent reads is the brand that gets recommended.</Lead>
      <p className="mt-8 text-xs text-muted-foreground">Salesforce, State of Agentic Commerce 2026. Adobe, Q1 2026. Shopify, 2026. Bain, 2025. Answer and prices simulated.</p>
    </Frame>

    <Frame number="03">
      <Title>Every era of commerce had a scoreboard. This one is Share of Algorithm</Title>
      <Lead>The last three decided where your budget went. This one decides whether you get recommended at all.</Lead>
      <EraScoreboard />
      <Rule /><Label>Three pillars. Eight dimensions. One score.</Label>
      <Step number="01" title="Visibility">Are you in the room?</Step><Step number="02" title="Accessibility">Can agents read your data?</Step><Step number="03" title="True Value">Is your real offer in the answer? Parleo only.</Step>
      <FeedProof />
      <p className="text-sm text-muted-foreground">99.9% of feed offers take ChatGPT’s Best Price top slot. Profound Research, ~1M offers, 2026.</p>
    </Frame>

    <Frame number="04" image={fashionImage}>
      <Title>Waiting has a price in every category</Title>
      <Lead>The share of your revenue agents will decide by 2030, category by category. The adoption column is not a forecast, it is already measured.</Lead>
      <Metric value="20%">of all US retail sales were AI-influenced last holiday. $262B. Salesforce, holiday 2025 actuals.</Metric>
      <div className="my-8 border-y-2 border-primary py-6"><Label>For a $2B brand at a 35% online mix</Label><strong className="mt-2 block text-5xl">$105M - $175M</strong><p className="mt-2 text-sm text-muted-foreground">decided by agents by 2030. Modeled from category online share × Bain’s 15-25% agentic band.</p></div>
      <Label>Revenue decided by agents / Shop with AI</Label>
      <CategoryExposure />
      <p className="mt-6 font-semibold">Every quarter of waiting compounds: each sale an agent gives away trains the algorithm against you.</p>
    </Frame>

    <Frame number="05">
      <Title>One platform puts your whole product truth inside the answer</Title><Lead>Winning here takes more than mentions. Your value has to be visible, portable and transactable. Parleo makes it all three.</Lead>
      <PlatformPipeline />
      <div className="mt-4"><Step number="01" title="Unify">One canonical record for every SKU, offer and rule.</Step><Step number="02" title="Resolve">Rules engine, seven incentive classes, entitled prices computed.</Step><Step number="03" title="Publish">Compiled per surface, pushed to every protocol.</Step><Step number="04" title="Verify, daily">We read every surface back and ask the agents what they see. Wrong info, stale prices and missing products are caught the moment they drift.</Step><Step number="05" title="Measure">Rank and revenue, attributed into your analytics.</Step></div>
      <div className="my-8 flex flex-wrap gap-2">{surfaces.map(x=><span key={x} className="rounded-full border px-3 py-1 text-xs">{x}</span>)}</div>
      <p className="text-xl font-semibold">Everyone syndicates. Nobody reads back. The read-back is the difference.</p>
      <p className="mt-5 text-sm text-muted-foreground">Your catalog, right everywhere. Published and tracked per protocol. Loyalty, rewards and customized pricing resolved inside the answer.</p>
    </Frame>

    <Frame number="06" image={beautyImage}>
      <Title>When the agent sees your real offer, you win the sale you already funded</Title><Lead>Same product page, same prices. The only change is what the agent can read.</Lead>
      <PriceReveal />
      <div className="mt-7 bg-code-bg p-6 text-background"><Label>Today</Label><p className="mt-3 text-xl">The agent quotes <strong>$19.99</strong>. The price that wins is <strong className="text-primary">$11.69</strong>.</p><p className="mt-3 text-sm text-background/60">You funded a 41.5% incentive. The agent never saw it, so the discount you paid for converts for someone else.</p></div>
      <div className="border-t-2 border-primary bg-secondary p-6"><Label>With Parleo</Label><p className="mt-3 text-xl font-semibold">The agent quotes $11.69 and you win the recommendation.</p><p className="mt-2 text-sm text-muted-foreground">Your best offer resolves inside the answer, tagged best value.</p></div>
      <p className="mt-8 text-xs text-muted-foreground">Chewy published prices, verified Aug 2026. Answers simulated. Eligibility applies.</p>
    </Frame>

    <Frame number="07">
      <Title>Brands: the first to feed the agent owns the recommendation</Title><Lead>The $200B+ that wins the human shelf becomes your edge in the answer. Most of your category has not connected it yet.</Lead>
      <SpendReach />
      <p className="my-8 text-xl font-semibold">Shelf, search bids, co-op, endcaps, JBP, sampling and brand work never reach the answer.</p>
      <Step number="01" title="Render right">No wrong sizes, dead variants or stale prices.</Step><Step number="02" title="Carry the promotion">The offers you already fund reach the decision.</Step><Step number="03" title="Know the value">Track rank and what moving up is worth per query, platform and dollar.</Step>
      <p className="mt-6 text-sm font-semibold">Standing still compounds: every sale the agent gives away trains the algorithm against you. NIQ, 2026.</p>
    </Frame>

    <Frame number="08" image={retailImage}>
      <Title>Retailers: your loyalty program is the advantage agents can’t copy</Title><Lead>Member economics only you hold. Put them in the answer and the comparison flips for good.</Lead>
      <MemberEconomics />
      <p className="my-6 text-lg font-semibold">Agent recommends the other store. Best actual value is invisible.</p>
      <FeatureTriptych items={[["Win the comparison","On true member economics, not sticker."],["Keep the customer","As shopping moves into agents."],["Give nothing away","Member prices resolve with zero PII. Nothing exported."]]} />
    </Frame>

    <Frame number="09" dark>
      <Title>Run your agent channel from one console</Title><Lead>The audit measures the gap. TrueSync closes it. The console proves it.</Lead>
      <ConsoleVisual />
      <Metric value="$3.7M">recoverable in the agent channel. Modeled sample account.</Metric>
      <p className="mt-6 text-xs text-background/45">Sample account, modeled values. Your data replaces this in the diagnostic.</p>
    </Frame>

    <Frame number="10">
      <Title>TrueSync: complete syndication across all agentic protocols</Title><Lead>Publish every SKU to every surface, check what the agent actually says, and fix drift before it costs a sale.</Lead>
      <SyncVisual />
      <p className="my-7 text-lg font-semibold">One master record, compiled per surface. Every SKU, every variant, every price, verified back daily.</p>
    </Frame>

    <Frame number="11">
      <Title>Start with the diagnostic. Build to full pricing power</Title><Lead>Four products, one progression. Enter where you are, expand when the numbers prove it.</Lead>
      <ProductLadder />
      <div className="mt-10"><Step number="01 · Start here" title="Diagnostic · Free audit">Know what the agent channel does to your revenue. Rank across four platforms, infrastructure gaps, modeled recoverable revenue and a sequenced roadmap. Everyone starts here. Days, not weeks.</Step><Step number="02" title="AEO + GEO · Visibility">Answer-ready product content, citations that carry your claims and mention lift measured monthly. Being in the room is necessary, not sufficient.</Step><Step number="03" title="TrueSync · Syndication">Publish once, correct everywhere, verified back daily. Site schema, GMC, ACP, UCP, MCP + API. Per-SKU control, drift alerts, read-back proof and analytics attribution.</Step><Step number="04 · The differentiator" title="Agentic pricing">Price and reward every shopper inside the answer. Identity-matched entitled pricing, incentive optimization, deep LLM integration and zero PII.</Step></div>
      <p className="mt-6 text-lg font-semibold">Most customers start with the diagnostic and deploy TrueSync first. The incentive layer is where the margin lives.</p><p className="mt-3 text-sm text-muted-foreground">Keep Profound or Bluefish for mention tracking. Parleo runs the layer beneath.</p>
      <Button asChild className="mt-8"><a href="https://parleo.io/audit">Run the free audit <ArrowUpRight /></a></Button>
    </Frame>

    <Frame number="12" dark image={portraitImage}>
      <div className="flex min-h-[72svh] flex-col justify-between">
        <div><Label>Start here</Label><h2 className="mt-6 text-[52px] font-bold leading-[0.98] tracking-normal">Own your Share of Algorithm.</h2><Lead>Start with the free audit: how agents describe, rank and price your top products against competitors, where your catalog has drifted, and the fastest fixes. No systems access. Read-out in days.</Lead><Button asChild size="lg" className="mt-8"><a href="https://parleo.io/audit">Run the free audit <ArrowUpRight /></a></Button><p className="mt-4 text-sm text-background/55">Or reply with your top SKUs and three competitors.</p></div>
        <div><Label>Your audit, day 3</Label><p className="mt-3 text-lg">Your brand benchmarked: rank on 40+ real queries, four platforms, three competitors.</p><AuditPreview /><p className="mt-8 text-sm">Samar Birwadker · samar@parleo.io</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-background/40">Parleo, Inc. 2026 · San Francisco</p></div>
      </div>
    </Frame>

    <Frame number="A1">
      <Title>Built by operators who have shipped both brand and infrastructure.</Title>
      <div className="mt-10 border-t-2 border-primary py-6"><Label>Co-founder & CEO</Label><h3 className="mt-3 text-3xl font-bold">Samar Birwadker</h3><p className="mt-2 text-muted-foreground">Brand strategist turned founder. Builds at the seam of brand, growth, and infrastructure.</p><ul className="mt-5 space-y-2 text-sm"><li>3× founder, 2× exits: SaaS, Fintech</li><li>VP Growth + advisor to 10+ commerce startups</li><li>Brand strategy at WPP / AKQA for Nike, Xbox, CPG</li></ul><p className="mt-5 text-xs text-muted-foreground">Prior work: Landor · WPP · Axel Springer · Nike · Xbox</p></div>
      <div className="border-t-2 border-primary py-6"><Label>Co-founder & CTO</Label><h3 className="mt-3 text-3xl font-bold">Elton Cheung</h3><p className="mt-2 text-muted-foreground">Two decades shipping marketplace and loyalty infrastructure at scale.</p><ul className="mt-5 space-y-2 text-sm"><li>20 years building commerce infrastructure</li><li>Head of Product + Engineering at Rakuten Marketing</li><li>5 years at Groupon: marketplace + loyalty infra</li></ul><p className="mt-5 text-xs text-muted-foreground">Prior work: Rakuten · Groupon · AlphaFlow</p></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><FounderVisual initials="SB" role="Brand + growth" name="Samar" companies={["Landor","Nike","Xbox"]} /><FounderVisual initials="EC" role="Product + engineering" name="Elton" companies={["Rakuten","Groupon","AlphaFlow"]} dark /></div>
      <Rule/><p className="text-sm">parleo.io · linkedin.com/company/parleo-sf</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Parleo, Inc. 2026</p>
    </Frame>
  </div>
);

export default MobileCustomerDeck;