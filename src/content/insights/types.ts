export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string }
  | { type: "quote"; text: string };

export type Category = "Research" | "Benchmark" | "Point of view";

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
  /** Answer-first summary. Powers the on-page takeaways card and AI answer extraction. */
  takeaways?: string[];
  /** Question-led Q&A block for answer engines. */
  faq?: Faq[];
  keywords?: string[];
  body: Block[];
}
