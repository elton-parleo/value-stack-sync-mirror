export type Source = {
  id: string;
  n: number;
  publisher: string;
  title: string;
  date: string;
  url: string;
  kind: "Analytics" | "Forecast" | "Survey" | "Primary" | "Research" | "Reference";
};

/**
 * Every figure on the agentic commerce guide resolves to one of these.
 * Ordered by first appearance on the page.
 */
export const SOURCES: Source[] = [
  {
    id: "adobe",
    n: 1,
    publisher: "Adobe Digital Insights",
    title: "AI traffic grows but retail sites lag in AI search visibility",
    date: "April 16, 2026",
    url: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
    kind: "Analytics",
  },
  {
    id: "dc360",
    n: 2,
    publisher: "Digital Commerce 360",
    title: "Ecommerce trends: AI's key conversion metric is improving",
    date: "April 23, 2026",
    url: "https://www.digitalcommerce360.com/2026/04/23/ecommerce-trends-ai-key-conversion-metric/",
    kind: "Analytics",
  },
  {
    id: "techcrunch",
    n: 3,
    publisher: "TechCrunch",
    title: "AI traffic to US retailers rose 393% in Q1, and it's boosting their revenue too",
    date: "April 16, 2026",
    url: "https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/",
    kind: "Analytics",
  },
  {
    id: "morganstanley",
    n: 4,
    publisher: "Morgan Stanley Research",
    title: "Agentic commerce impact could reach $385 billion by 2030",
    date: "December 8, 2025",
    url: "https://www.morganstanley.com/insights/articles/agentic-commerce-market-impact-outlook",
    kind: "Forecast",
  },
  {
    id: "bain",
    n: 5,
    publisher: "Bain & Company",
    title: "2030 forecast: how agentic AI will reshape US retail",
    date: "December 17, 2025",
    url: "https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/",
    kind: "Forecast",
  },
  {
    id: "mckinsey",
    n: 6,
    publisher: "McKinsey QuantumBlack",
    title: "The automation curve in agentic commerce",
    date: "January 28, 2026",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce",
    kind: "Forecast",
  },
  {
    id: "bcg",
    n: 7,
    publisher: "Boston Consulting Group",
    title: "Agentic commerce: the next disruption in retail and payments",
    date: "2025",
    url: "https://media-publications.bcg.com/Agentic-Commerce.pdf",
    kind: "Forecast",
  },
  {
    id: "gartner",
    n: 8,
    publisher: "Gartner",
    title: "20% of commerce could be agentic by 2030",
    date: "2026",
    url: "https://www.gartner.com/en/articles/agentic-commerce",
    kind: "Forecast",
  },
  {
    id: "openai",
    n: 9,
    publisher: "OpenAI",
    title: "Buy it in ChatGPT: Instant Checkout and the Agentic Commerce Protocol",
    date: "September 29, 2025",
    url: "https://openai.com/index/buy-it-in-chatgpt/",
    kind: "Primary",
  },
  {
    id: "stripe",
    n: 10,
    publisher: "Stripe",
    title: "Stripe powers Instant Checkout in ChatGPT",
    date: "September 29, 2025",
    url: "https://stripe.com/newsroom/news/openai-instant-checkout",
    kind: "Primary",
  },
  {
    id: "ap2",
    n: 11,
    publisher: "Google Cloud",
    title: "Announcing the Agent Payments Protocol (AP2)",
    date: "September 16, 2025",
    url: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol",
    kind: "Primary",
  },
  {
    id: "atlas",
    n: 12,
    publisher: "Agentic Commerce Atlas",
    title: "Agentic commerce timeline",
    date: "June 18, 2026",
    url: "https://agenticcommerceatlas.com/landscape/agentic-commerce-timeline/",
    kind: "Reference",
  },
  {
    id: "acpchangelog",
    n: 13,
    publisher: "Agentic Commerce Protocol tracker",
    title: "Changelog and timeline",
    date: "June 2026",
    url: "https://agenticcommerceprotocol.info/changelog",
    kind: "Reference",
  },
  {
    id: "shoppingcomp",
    n: 14,
    publisher: "arXiv:2511.22978",
    title: "ShoppingComp: a real-world benchmark for LLM shopping agents",
    date: "November 2025",
    url: "https://arxiv.org/abs/2511.22978",
    kind: "Research",
  },
  {
    id: "webshop",
    n: 15,
    publisher: "arXiv:2207.01206",
    title: "WebShop: scalable real-world web interaction with grounded language agents",
    date: "2022",
    url: "https://arxiv.org/abs/2207.01206",
    kind: "Research",
  },
  {
    id: "ecomagent",
    n: 16,
    publisher: "arXiv:2606.17698",
    title: "EComAgentBench: benchmarking shopping agents on long-horizon tasks",
    date: "June 16, 2026",
    url: "https://arxiv.org/abs/2606.17698",
    kind: "Research",
  },
  {
    id: "loyalty",
    n: 17,
    publisher: "Burnt (analysis of 2024 annual reports)",
    title: "The $30 billion liability inside loyalty programs",
    date: "2025",
    url: "https://burnt.com/blog-the-30-billion-liability-inside-loyalty-programs-and-how-fraud-makes-it-worse",
    kind: "Research",
  },
];

export const byId = (id: string) => SOURCES.find((s) => s.id === id);
