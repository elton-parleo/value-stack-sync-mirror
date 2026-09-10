export interface Pillar {
  name: string;
  points: number;
  question: string;
  dimensions: { label: string; points: number }[];
  note?: string;
  highlight?: boolean;
}

export interface Leak {
  name: string;
  points: number;
  test: string;
  detail: string;
  highlight?: boolean;
}

export interface FlowStep {
  label: string;
  title: string;
  text: string;
  /** Something that falls out of the pipeline at this step. */
  drop?: string;
}

export interface BarItem {
  label: string;
  value: number;
  display: string;
  note?: string;
  highlight?: boolean;
}

export interface LadderItem {
  label: string;
  price: string;
  note?: string;
  /** The rung the agent actually quoted. */
  quoted?: boolean;
}

export interface RecordRow {
  key: string;
  value: string;
  /** Rendered greyed out: present in the data, absent from the agent's read. */
  unread?: boolean;
}

export interface EraItem {
  era: string;
  unit: string;
  spend: string;
  period: string;
  current?: boolean;
}

export interface GridItem {
  value: string;
  label: string;
  source?: string;
}

export interface Source {
  claim: string;
  source: string;
  date: string;
  url?: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string }
  | { type: "quote"; text: string }
  | { type: "pillars"; total: number; items: Pillar[] }
  | { type: "leaks"; total: number; items: Leak[] }
  | { type: "flow"; steps: FlowStep[]; caption?: string }
  | { type: "bars"; title?: string; items: BarItem[]; max?: number; caption?: string }
  | { type: "ladder"; title: string; items: LadderItem[]; caption?: string }
  | { type: "record"; title: string; rows: RecordRow[]; caption?: string; legend?: [string, string] }
  | { type: "eras"; items: EraItem[]; caption?: string }
  | { type: "grid"; items: GridItem[]; caption?: string }
  | { type: "sources"; items: Source[] };


export type Category = "Research" | "Benchmark" | "Point of view" | "Framework";

export interface Faq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  dek: string;
  date: string;          // ISO
  dateModified?: string; // ISO
  dateLabel: string;
  category: Category;
  readTime: string;
  image: string;
  /** Dedicated 1200x630 social card. Falls back to the article image. */
  socialImage?: string;
  imageAlt: string;
  linkedInUrl?: string;
  author?: string;
  /** Overrides for the <title> and meta description when SEO copy differs from the headline. */
  seoTitle?: string;
  seoDescription?: string;
  /** Answer-first summary. Powers the on-page takeaways card and AI answer extraction. */
  takeaways?: string[];
  /** Question-led Q&A block for answer engines. */
  faq?: Faq[];
  keywords?: string[];
  body: Block[];
}
