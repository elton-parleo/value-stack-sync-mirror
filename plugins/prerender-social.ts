import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/*
  Writes a static index.html for every public route with that page's own title, description,
  canonical and Open Graph tags, so crawlers and link unfurlers that don't run JavaScript
  (Slack, LinkedIn, X, most AI crawlers) see the right page. The app still boots and takes over.
  Ported from the previous parleo.io build and extended from insights to every route.
*/
const SITE = "https://parleo.io";

type Route = { path: string; title: string; description: string; image?: string; type?: string };

const ROUTES: Route[] = [
  { path: "/product", title: "The platform for winning AI recommendations | Parleo", description: "See how AI agents describe you, fix what they get wrong, and put your best offers in every answer. Share of Algorithm, TrueSync, the value layer, funded offers and a weekly readout in dollars." },
  { path: "/agentic-value-report", title: "The Agentic Value Report | Parleo", description: "A free study of what five AI assistants tell your shoppers about your top products, every answer checked against your own pages, scored and priced." },
  { path: "/about", title: "About Parleo | The team behind the agentic commerce platform", description: "Parleo makes a brand's and a retailer's real value readable, verified and measured everywhere AI agents shop. Meet the founding team and the investors behind it." },
  { path: "/insights", title: "Insights on agentic commerce | Parleo", description: "Research, benchmarks and points of view on how AI shopping agents choose, what they get wrong about price and value, and what brands and retailers can do about it." },
  { path: "/what-is-agentic-commerce", title: "What Is Agentic Commerce? A Definition and Field Guide | Parleo", description: "Agentic commerce is shopping done by AI agents on a buyer's behalf: they search, compare, and increasingly transact. How it works, the protocols behind it, and why agents quote list price instead of your real price.", type: "article" },
];

const grab = (src: string, key: string): string | undefined => {
  const re = new RegExp(`\\b${key}\\s*:\\s*(?:\\n\\s*)?["'\`]([\\s\\S]*?)["'\`]\\s*,`);
  const m = src.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\s+/g, " ").trim() : undefined;
};

const readPosts = (root: string): Route[] => {
  const dir = path.join(root, "src/content/insights");
  if (!fs.existsSync(dir)) return [];
  const out: Route[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".ts") || file === "index.ts" || file === "types.ts") continue;
    const src = fs.readFileSync(path.join(dir, file), "utf8");
    const slug = grab(src, "slug");
    const title = grab(src, "title");
    if (!slug || !title) continue;
    const img = src.match(/const image = ["'](\/[^"']+)["']/);
    out.push({
      path: `/insights/${slug}`,
      title: grab(src, "seoTitle") ?? `${title} | Parleo`,
      description: grab(src, "seoDescription") ?? grab(src, "dek") ?? "",
      image: img ? img[1] : undefined,
      type: "article",
    });
  }
  return out;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const prerenderSocial = (): Plugin => ({
  name: "prerender-social",
  apply: "build",
  closeBundle() {
    if (process.env.ARTIFACT) return;
    const root = process.cwd();
    const dist = path.join(root, "dist");
    const templatePath = path.join(dist, "index.html");
    if (!fs.existsSync(templatePath)) return;
    const template = fs.readFileSync(templatePath, "utf8");
    for (const r of [...ROUTES, ...readPosts(root)]) {
      const url = `${SITE}${r.path}`;
      let html = template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
        .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(r.description)}" />`)
        .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${r.type ?? "website"}" />`)
        .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(r.title.replace(/ \| Parleo$/, ""))}" />`)
        .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(r.description)}" />`)
        .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
        .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(r.title.replace(/ \| Parleo$/, ""))}" />`)
        .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(r.description)}" />`);
      if (r.image) {
        html = html
          .replace(/<meta property="og:image" [^>]*>/, `<meta property="og:image" content="${SITE}${r.image}" />`)
          .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${SITE}${r.image}" />`);
      }
      html = html.replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
      const outDir = path.join(dist, r.path.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
    }
    /* the home page keeps its own canonical */
    fs.writeFileSync(templatePath, template.replace("</head>", `  <link rel="canonical" href="${SITE}/" />\n  </head>`));
  },
});
