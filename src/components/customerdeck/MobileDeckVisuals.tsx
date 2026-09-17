import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Eye,
  GitCompareArrows,
  Layers3,
  PackageCheck,
  Radio,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import brooksImage from "@/assets/customerdeck/brooks.png";
import asicsImage from "@/assets/customerdeck/asics.png";
import sauconyImage from "@/assets/customerdeck/saucony.png";
import greeniesImage from "@/assets/customerdeck/greenies.png";
import patagoniaImage from "@/assets/customerdeck/patagonia.png";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const agentDomains: Record<string, string> = {
  ChatGPT: "chatgpt.com",
  Gemini: "gemini.google.com",
  Perplexity: "perplexity.ai",
  Copilot: "copilot.microsoft.com",
};

const Logo = ({ name, domain }: { name: string; domain?: string }) => (
  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/10 bg-background">
    <img src={`https://www.google.com/s2/favicons?domain=${domain ?? agentDomains[name]}&sz=64`} alt="" className="h-4 w-4" />
  </span>
);

export const AgentNetwork = () => (
  <motion.div {...reveal} className="relative mt-10 overflow-hidden rounded-2xl border border-background/15 bg-background/5 p-5">
    <div className="absolute inset-x-0 top-1/2 h-px bg-primary/40" />
    <div className="relative mx-auto w-fit rounded-xl border border-primary/60 bg-code-bg px-4 py-4 shadow-elevated">
      <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-primary"><Database className="h-3.5 w-3.5" /> Product truth</div>
      {['Catalog & variants','Price & availability','Offers & incentives','Content & policy'].map(item => <div key={item} className="mt-2 flex items-center gap-2 text-xs text-background/75"><CheckCircle2 className="h-3.5 w-3.5 text-primary" />{item}</div>)}
    </div>
    <ArrowDown className="relative mx-auto my-4 h-5 w-5 text-primary" />
    <div className="relative grid grid-cols-2 gap-2">
      {Object.keys(agentDomains).map((name, index) => <motion.div key={name} initial={{opacity:0,scale:.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.12 + index*.07}} className="flex items-center gap-2 rounded-full border border-background/15 bg-code-bg/90 px-3 py-2 text-xs"><Logo name={name}/><span>{name}</span><span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /></motion.div>)}
    </div>
  </motion.div>
);

const ProductRow = ({ image, name, note, price, bad = false }: { image: string; name: string; note: string; price: string; bad?: boolean }) => (
  <div className="grid grid-cols-[52px_1fr_auto] items-center gap-3 border-t border-current/10 py-3">
    <div className="flex h-12 items-center justify-center bg-background"><img src={image} alt="" className="h-11 w-12 object-contain" /></div>
    <div><strong className="block text-xs leading-tight">{name}</strong><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 font-mono text-[8px] uppercase ${bad ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success'}`}>{note}</span></div>
    <strong className="text-sm">{price}</strong>
  </div>
);

export const CollapsedFunnel = () => (
  <motion.div {...reveal} className="mt-9">
    <div className="mx-auto flex max-w-[300px] flex-col items-center gap-1.5">
      {['Search results','Retail media','Review sites','Trade spend','Comparison pages','Product pages'].map((label, i) => <div key={label} style={{width:`${100-i*9}%`}} className="border border-foreground/15 bg-secondary px-3 py-1.5 text-center font-mono text-[9px] uppercase text-muted-foreground">{label}</div>)}
      <div className="mt-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">One chat window</div>
    </div>
    <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/15 bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 px-4 py-3"><span className="h-2 w-2 rounded-full bg-foreground/20"/><span className="h-2 w-2 rounded-full bg-foreground/20"/><span className="h-2 w-2 rounded-full bg-foreground/20"/><span className="ml-auto font-mono text-[8px] uppercase text-muted-foreground">AI answer</span></div>
      <div className="p-4"><p className="rounded-xl bg-secondary p-3 text-sm font-medium">What are the best stability running shoes under $150?</p><ProductRow image={brooksImage} name="Brooks Adrenaline GTS 24" note="Wrong price" price="$134" bad/><ProductRow image={asicsImage} name="ASICS GT-2000 13" note="Compared" price="$142"/><ProductRow image={sauconyImage} name="Saucony Guide 17" note="Compared" price="$130"/></div>
    </div>
  </motion.div>
);

export const EraScoreboard = () => {
  const eras = [['Shelf','$8B+','28%'],['Voice','$12B+','39%'],['Search','$200B+','61%'],['Algorithm','~$1T','100%']];
  return <motion.div {...reveal} className="mt-9 border-y border-foreground/15 py-6"><div className="flex h-56 items-end gap-2">{eras.map(([label,value,height],i)=><div key={label} className="flex h-full flex-1 flex-col justify-end"><strong className={`mb-2 text-center text-sm ${i===3?'text-primary':''}`}>{value}</strong><motion.div initial={{height:0}} whileInView={{height}} viewport={{once:true}} transition={{duration:.7,delay:i*.1}} className={i===3?'bg-primary':'bg-foreground/15'} /><span className="mt-2 text-center font-mono text-[8px] uppercase text-muted-foreground">{label}</span></div>)}</div></motion.div>;
};

export const FeedProof = () => (
  <div className="mt-6 rounded-2xl bg-code-bg p-5 text-background">
    {[['Structured feeds','100%'],['Scraped pages','21%']].map(([label,value],i)=><div key={label} className="mb-5 last:mb-0"><div className="mb-2 flex justify-between text-xs"><span>{label}</span><strong className={i===0?'text-primary':''}>{value}</strong></div><div className="h-2 overflow-hidden rounded-full bg-background/10"><motion.div initial={{width:0}} whileInView={{width:value}} viewport={{once:true}} transition={{duration:.8}} className={i===0?'h-full bg-primary':'h-full bg-background/35'} /></div></div>)}
  </div>
);

export const CategoryExposure = () => {
  const groups = [
    ['Already paying',[['Electronics',68,11],['Beauty',47,9],['Fashion + apparel',44,10]]],
    ['Next 24 months',[['Pet',40,10],['Sporting goods',40,8],['Home + furniture',30,8],['Health + wellness',35,6]]],
    ['Where trade spend lives',[['CPG + grocery',58,3]]],
  ] as const;
  return <motion.div {...reveal} className="mt-8 overflow-hidden border-y border-foreground/15">{groups.map(([group,rows])=><div key={group} className="py-5"><p className="mb-4 font-mono text-[9px] uppercase tracking-[0.12em] text-primary">{group}</p>{rows.map(([name,adoption,exposure])=><div key={name} className="mb-4 last:mb-0"><div className="mb-1.5 flex items-end justify-between gap-3"><span className="text-sm font-semibold">{name}</span><span className="font-mono text-[9px] text-muted-foreground">{exposure}% revenue · {adoption}% adoption</span></div><div className="h-2 bg-secondary"><motion.div initial={{width:0}} whileInView={{width:`${adoption}%`}} viewport={{once:true}} className="h-full bg-primary" transition={{duration:.65}} /></div></div>)}</div>)}</motion.div>;
};

const pipeline = [[Layers3,'Unify'],[CircleDollarSign,'Resolve'],[Radio,'Publish'],[RefreshCw,'Verify, daily'],[ScanSearch,'Measure']] as const;
export const PlatformPipeline = () => (
  <motion.div {...reveal} className="mt-9">
    <div className="grid grid-cols-2 gap-2">{[['Master data',Database],['Product content',Sparkles],['Pricing logic',CircleDollarSign],['Incentives + loyalty',UserRound]].map(([label,Icon])=><div key={label as string} className="flex items-center gap-2 border border-foreground/15 bg-surface p-3 text-xs"><Icon className="h-4 w-4 text-primary"/>{label as string}</div>)}</div>
    <ArrowDown className="mx-auto my-4 text-primary"/>
    <div className="rounded-2xl border-t-2 border-primary bg-code-bg p-5 text-background">{pipeline.map(([Icon,label],i)=><div key={label} className="relative flex items-center gap-3 border-b border-background/10 py-3 last:border-0"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${i===3?'bg-primary text-primary-foreground':'bg-background/10'}`}><Icon className="h-4 w-4"/></span><span className="text-sm font-semibold">{label}</span>{i===3&&<span className="ml-auto rounded-full bg-primary/15 px-2 py-1 font-mono text-[8px] uppercase text-primary">Read-back</span>}</div>)}</div>
    <ArrowDown className="mx-auto my-4 text-primary"/>
    <div className="flex flex-wrap justify-center gap-2">{[['Google','google.com'],['OpenAI','openai.com'],['MCP','modelcontextprotocol.io'],['Schema','schema.org']].map(([name,domain])=><span key={name} className="flex items-center gap-2 rounded-full border bg-surface px-3 py-2 text-xs"><Logo name={name} domain={domain}/>{name}</span>)}</div>
    <div className="mx-auto mt-5 flex w-fit items-center gap-3 font-mono text-xs"><span className="text-muted-foreground">#3</span><ArrowRight className="h-4 w-4 text-primary"/><strong className="rounded-full bg-primary px-3 py-1 text-primary-foreground">#1 Best value</strong></div>
  </motion.div>
);

export const PriceReveal = () => {
  const prices=[['List price','$19.99','Seen',100],['Buy once','$17.98','Invisible',90],['Autoship','$17.08','Invisible',85],['First autoship','$11.69','Invisible',58]] as const;
  return <motion.div {...reveal} className="mt-9 overflow-hidden rounded-2xl border border-foreground/15 bg-surface shadow-card"><div className="grid grid-cols-[42%_1fr] bg-code-bg text-background"><div className="flex min-h-48 items-center justify-center p-5"><img src={greeniesImage} alt="Greenies Original dental treats" className="max-h-40 object-contain"/></div><div className="flex flex-col justify-center border-l border-background/10 p-5"><span className="font-mono text-[9px] uppercase text-background/45">Agent quotes</span><strong className="mt-2 text-3xl">$19.99</strong><ArrowDown className="my-3 h-4 w-4 text-primary"/><span className="font-mono text-[9px] uppercase text-primary">Price that wins</span><strong className="mt-1 text-3xl text-primary">$11.69</strong></div></div><div className="p-5">{prices.map(([label,value,state,width])=><div key={label} className="mb-4 last:mb-0"><div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-semibold">{label}</span><div className="flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase ${state==='Seen'?'bg-success/15 text-success':'bg-foreground/5 text-muted-foreground'}`}>{state}</span><strong className="text-sm">{value}</strong></div></div><div className="h-1.5 bg-secondary"><motion.div initial={{width:0}} whileInView={{width:`${width}%`}} viewport={{once:true}} className={state==='Seen'?'h-full bg-foreground/30':'h-full bg-primary'} /></div></div>)}</div></motion.div>;
};

export const SpendReach = () => (
  <motion.div {...reveal} className="mt-9">
    <div className="space-y-2">{[['Trade promotion','$200B+',false],['Retail media','~$69B',false],['Shelf + search','Funded',false],['Product truth','Readable',true]].map(([label,value,live])=><div key={label as string} className={`flex items-center gap-3 border p-3 ${live?'border-primary bg-primary/5':'border-foreground/15 bg-surface'}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full ${live?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground'}`}>{live?<Check className="h-4 w-4"/>:<X className="h-4 w-4"/>}</span><strong className="text-sm">{label as string}</strong><span className={`ml-auto font-mono text-[10px] uppercase ${live?'text-primary':'text-muted-foreground'}`}>{value as string}</span></div>)}</div>
    <div className="mx-auto my-4 h-10 w-px bg-primary" />
    <div className="grid grid-cols-2 gap-3"><div className="border border-foreground/15 bg-surface p-4"><UserRound className="h-5 w-5 text-primary"/><strong className="mt-3 block text-sm">Human shopper</strong><p className="mt-1 text-xs text-muted-foreground">Sees placement, media and promotion.</p></div><div className="border-t-2 border-primary bg-code-bg p-4 text-background"><Sparkles className="h-5 w-5 text-primary"/><strong className="mt-3 block text-sm">AI agent</strong><span className="mt-2 block text-3xl font-bold text-primary">$0</span><p className="text-xs text-background/55">of shelf investment visible</p></div></div>
  </motion.div>
);

export const MemberEconomics = () => (
  <motion.div {...reveal} className="mt-9 overflow-hidden rounded-2xl border border-foreground/15 bg-surface shadow-card"><div className="relative flex min-h-56 items-center justify-center bg-secondary p-5"><span className="absolute left-4 top-4 rounded-full bg-code-bg px-3 py-1 font-mono text-[8px] uppercase text-background">What the agent sees</span><img src={patagoniaImage} alt="Patagonia Down Sweater Hoody" className="max-h-48 object-contain"/></div><div className="p-5"><div className="flex justify-between border-b pb-3 text-sm"><span>Another retailer</span><strong>$319.00</strong></div><div className="flex justify-between pt-3 text-sm"><span>REI sticker price</span><strong>$345.00</strong></div></div><div className="bg-code-bg p-5 text-background"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary">True price · REI member</p>{[['Listed price','$345.00'],['10% Member Reward','−$34.50'],['Co-op Mastercard 5%','−$17.25']].map(([a,b])=><div key={a} className="flex justify-between border-b border-background/10 py-3 text-sm"><span className="text-background/60">{a}</span><strong>{b}</strong></div>)}<div className="mt-5 flex items-end justify-between"><div><span className="font-mono text-[8px] uppercase text-background/45">True cost</span><strong className="block text-4xl text-primary">$293.25</strong></div><span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">$25.75 better</span></div></div></motion.div>
);

const Sparkline = ({ down=false }: { down?: boolean }) => <svg viewBox="0 0 70 22" className="h-6 w-16" aria-hidden="true"><motion.path initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:.8}} d={down?'M2 5 L16 8 L28 7 L40 15 L52 13 L68 19':'M2 18 L15 15 L27 16 L40 8 L53 10 L68 3'} fill="none" stroke="currentColor" strokeWidth="2" className={down?'text-warning':'text-success'}/></svg>;
export const ScoreRing = ({ value=54 }: { value?: number }) => <div className="relative h-28 w-28 shrink-0"><svg viewBox="0 0 120 120" className="h-full w-full -rotate-90"><circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth="8" className="text-current/10"/><motion.circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary" initial={{pathLength:0}} whileInView={{pathLength:value/100}} viewport={{once:true}} transition={{duration:1}}/></svg><strong className="absolute inset-0 flex items-center justify-center text-3xl">{value}</strong></div>;

export const ConsoleVisual = () => (
  <motion.div {...reveal} className="mt-9 overflow-hidden rounded-2xl border-t-2 border-primary bg-background text-foreground shadow-elevated"><div className="flex items-center border-b px-4 py-3"><div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground/20"/><span className="h-2 w-2 rounded-full bg-foreground/20"/><span className="h-2 w-2 rounded-full bg-foreground/20"/></div><span className="mx-auto font-mono text-[8px] uppercase text-muted-foreground">console.parleo.io</span><span className="flex items-center gap-1 font-mono text-[8px] uppercase text-success"><Radio className="h-3 w-3"/>Live</span></div><div className="p-4"><div className="grid grid-cols-2 gap-2">{[['ChatGPT','38%'],['Gemini','24%'],['Perplexity','21%'],['Copilot','17%']].map(([name,value],i)=><div key={name} className="border bg-surface p-3"><div className="flex justify-between"><Logo name={name}/><Sparkline down={i===3}/></div><strong className="mt-2 block text-xl">{value}</strong><span className="text-[10px] text-muted-foreground">Share of Algorithm</span></div>)}</div><div className="my-5 flex items-center gap-5 border-y py-5"><ScoreRing/><div><p className="text-sm font-semibold">Agent Commerce Score</p><p className="mt-1 text-xs text-muted-foreground">41,250 queries<br/>4 platforms</p></div></div><p className="font-mono text-[8px] uppercase tracking-[0.12em] text-primary">Ranked by modeled impact</p>{[['01','Publish member dividend','+$2.1M'],['02','Expose Co-op Mastercard','+$1.2M'],['03','Fix 8 stale variants','+$410K']].map(([rank,title,value])=><div key={rank} className="grid grid-cols-[24px_1fr_auto] items-center gap-2 border-t py-3"><span className="font-mono text-[9px] text-muted-foreground">{rank}</span><span className="text-xs font-semibold">{title}</span><strong className="rounded-full bg-success/10 px-2 py-1 text-xs text-success">{value}</strong></div>)}</div></motion.div>
);

export const SyncVisual = () => (
  <motion.div {...reveal} className="mt-9"><div className="grid grid-cols-2 gap-2">{[['Site schema','schema.org'],['Merchant Center','google.com'],['OpenAI ACP','openai.com'],['Google UCP','google.com'],['Deals API','parleo.io'],['MCP server','modelcontextprotocol.io']].map(([name,domain])=><div key={name} className="flex items-center gap-2 border bg-surface p-3"><Logo name={name} domain={domain}/><div><strong className="block text-[11px]">{name}</strong><span className="font-mono text-[8px] text-success">✓ LIVE</span></div></div>)}</div><div className="my-5 grid grid-cols-[1fr_30px_1fr] items-stretch"><div className="border bg-surface p-3"><span className="font-mono text-[8px] uppercase text-warning">Wrong info</span><strong className="mt-2 block text-xl">$159.99</strong><p className="mt-1 text-[10px] text-muted-foreground">Gemini · Monday</p></div><div className="flex items-center justify-center"><ArrowRight className="h-4 w-4 text-primary"/></div><div className="border-t-2 border-primary bg-secondary p-3"><span className="font-mono text-[8px] uppercase text-success">Best value</span><strong className="mt-2 block text-xl text-primary">$98.00</strong><p className="mt-1 text-[10px] text-muted-foreground">Gemini · Today</p></div></div><div className="rounded-2xl bg-code-bg p-5 text-background"><div className="flex items-center justify-between"><ScoreRing/><div className="text-right"><strong className="block text-3xl text-primary">$3.7M</strong><span className="text-xs text-background/50">recoverable</span></div></div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-background/10 pt-4">{[['09:41','Detected'],['09:43','Resynced'],['09:47','Verified']].map(([time,label],i)=><div key={label}><span className={`mb-2 block h-2 w-2 rounded-full ${i===2?'bg-success':'bg-primary'}`}/><strong className="block font-mono text-[9px]">{time}</strong><span className="text-[10px] text-background/50">{label}</span></div>)}</div></div></motion.div>
);

export const ProductLadder = () => {
  const tiers=[['01','Measure','Diagnostic','Start here'],['02','Show up','AEO + GEO','Visibility'],['03','Render right','TrueSync','Syndication'],['04','Win the price','Agentic pricing','The differentiator']];
  return <motion.div {...reveal} className="mt-9"><div className="mb-6 flex items-center">{tiers.map(([n,,],i)=><div key={n} className="contents"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[9px] ${i===3?'bg-primary text-primary-foreground':'border border-foreground/20 bg-background'}`}>{n}</span>{i<3&&<span className="h-px flex-1 bg-foreground/20"/>}</div>)}</div><div className="space-y-3">{tiers.map(([n,verb,title,badge],i)=><div key={n} className={`border-t-2 p-5 ${i===3?'border-primary bg-code-bg text-background':'border-foreground/20 bg-surface'}`}><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase text-primary">{verb}</span><span className={`rounded-full px-2 py-1 font-mono text-[8px] uppercase ${i===3?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground'}`}>{badge}</span></div><strong className="mt-3 block text-xl">{title}</strong><div className="mt-3 flex gap-2 text-xs text-current/60"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary"/>{i===0?'Benchmark rank, gaps and revenue.':i===1?'Create answer-ready product content.':i===2?'Publish and verify every SKU daily.':'Resolve true value inside the answer.'}</div></div>)}</div></motion.div>;
};

export const AuditPreview = () => <motion.div {...reveal} className="mt-10 overflow-hidden rounded-2xl border-t-2 border-primary bg-background p-5 text-foreground shadow-elevated"><div className="flex items-center justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary">Your audit · day 3</p><strong className="mt-2 block text-lg">Where revenue leaks</strong></div><ScoreRing/></div><div className="mt-5 grid grid-cols-3 divide-x border-y py-4 text-center">{[['8','Drifted'],['12','Invisible'],['40+','Queries']].map(([v,l])=><div key={l}><strong className="block text-xl">{v}</strong><span className="text-[9px] text-muted-foreground">{l}</span></div>)}</div></motion.div>;

const companyDomains: Record<string,string> = {Landor:'landor.com',WPP:'wpp.com','Axel Springer':'axelspringer.com',Nike:'nike.com',Xbox:'xbox.com',Rakuten:'rakuten.com',Groupon:'groupon.com',AlphaFlow:'alphaflow.com'};
export const FounderVisual = ({ initials, role, name, companies, dark=false }: { initials:string; role:string; name:string; companies:string[]; dark?:boolean }) => <motion.div {...reveal} className={`border-t-2 p-6 ${dark?'border-primary bg-code-bg text-background':'border-foreground/20 bg-surface'}`}><div className="flex items-center gap-4"><span className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${dark?'bg-primary text-primary-foreground':'bg-secondary text-primary'}`}>{initials}</span><div><span className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary">{role}</span><strong className="mt-1 block text-2xl">{name}</strong></div></div><div className="mt-5 flex flex-wrap gap-2">{companies.map(company=><span key={company} className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] ${dark?'border-background/15':'border-foreground/15'}`}><Logo name={company} domain={companyDomains[company]}/>{company}</span>)}</div></motion.div>;

export const FeatureTriptych = ({ items }: { items: [string,string][] }) => <div className="mt-6 grid gap-2">{items.map(([title,copy],i)=>{const icons=[GitCompareArrows,ShieldCheck,PackageCheck];const Icon=icons[i]??Eye;return <motion.div key={title} {...reveal} transition={{...reveal.transition,delay:i*.07}} className="grid grid-cols-[42px_1fr] gap-3 border border-foreground/15 bg-surface p-4"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5"/></span><div><strong className="block text-sm">{title}</strong><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p></div></motion.div>})}</div>;