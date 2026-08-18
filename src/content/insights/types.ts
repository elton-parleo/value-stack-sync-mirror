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

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string }
  | { type: "quote"; text: string }
  | { type: "pillars"; total: number; items: Pillar[] }
  | { type: "leaks"; total: number; items: Leak[] };


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
