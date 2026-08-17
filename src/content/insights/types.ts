export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string }
  | { type: "quote"; text: string };

export type Category = "Research" | "Benchmark" | "Point of view";

export interface Post {
  slug: string;
  title: string;
  dek: string;
  date: string;          // ISO
  dateLabel: string;
  category: Category;
  readTime: string;
  image: string;
  imageAlt: string;
  linkedInUrl?: string;
  body: Block[];
}
