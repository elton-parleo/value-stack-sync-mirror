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
  quoted?: boolean;
}
export interface RecordRow {
  key: string;
  value: string;
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
  date: string;
  dateModified?: string;
  dateLabel: string;
  category: Category;
  readTime: string;
  /** The one figure the piece is known for, shown beside its title in lists. */
  figure?: { value: string; label: string };
  image: string;
  socialImage?: string;
  imageAlt: string;
  linkedInUrl?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  takeaways?: string[];
  faq?: Faq[];
  keywords?: string[];
  body: Block[];
}
