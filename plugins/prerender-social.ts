import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const SITE = "https://parleo.io";

interface PostMeta {
  slug: string;
  title: string;
  dek: string;
  seoTitle?: string;
  seoDescription?: string;
  imageBase: string;
  imageAlt: string;
  date: string;
}

const grab = (src: string, key: string): string | undefined => {
  // matches: key: "value" | key: 'value' | key:\n    "value"
  const re = new RegExp(`\\b${key}\\s*:\\s*(?:\\n\\s*)?["'\`]([\\s\\S]*?)["'\`]\\s*,`);
  const m = src.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\s+/g, " ").trim() : undefined;
};

const readPosts = (root: string): PostMeta[] => {
  const dir = path.join(root, "src/content/insights");
  if (!fs.existsSync(dir)) return [];
  const out: PostMeta[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".ts") || file === "index.ts" || file === "types.ts") continue;
    const src = fs.readFileSync(path.join(dir, file), "utf8");
    const slug = grab(src, "slug");
    const title = grab(src, "title");
    if (!slug || !title) continue;
    const imgMatch = src.match(/import\s+image\s+from\s+["'](.+?)["']/);
    out.push({
      slug,
      title,
      dek: grab(src, "dek") ?? "",
      seoTitle: grab(src, "seoTitle"),
      seoDescription: grab(src, "seoDescription"),
      imageAlt: grab(src, "imageAlt") ?? title,
      date: grab(src, "date") ?? "",
      imageBase: imgMatch ? path.basename(imgMatch[1]).replace(/\.[^.]+$/, "") : "",
    });
  }
  return out;
};


interface StaticRoute {
  path: string;
  title: string;
  ogTitle: string;
  description: string;
}

const staticRoutes: StaticRoute[] = [
  {
    path: "/what-is-agentic-commerce",
    title: "What Is Agentic Commerce? A Definition and Field Guide | Parleo",
    ogTitle: "What is agentic commerce?",
    description:
      "Agentic commerce is shopping done by AI agents on a buyer's behalf: they search, compare, and increasingly transact. How it works, the protocols behind it, and why agents quote list price instead of your real price.",
  },
];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Emits a static HTML file per insight route with real per-article
 * Open Graph / Twitter tags, so social crawlers (Slack, LinkedIn, X)
 * that do not execute JS see the article's own title, summary and image.
 * The app itself still boots and takes over client-side.
 */
export const prerenderSocial = (): Plugin => ({
  name: "prerender-social",
  apply: "build",
  closeBundle() {
    const root = process.cwd();
    const dist = path.join(root, "dist");
    const templatePath = path.join(dist, "index.html");
    if (!fs.existsSync(templatePath)) return;
    const template = fs.readFileSync(templatePath, "utf8");

    const assetDir = path.join(dist, "assets");
    const assets = fs.existsSync(assetDir) ? fs.readdirSync(assetDir) : [];
    const findAsset = (base: string) =>
      base ? assets.find((f) => f.startsWith(`${base}-`) || f === base) : undefined;

    for (const post of readPosts(root)) {
      const url = `${SITE}/insights/${post.slug}`;
      const asset = findAsset(post.imageBase);
      const image = asset ? `${SITE}/assets/${asset}` : undefined;
      const title = post.seoTitle ?? `${post.title} | Parleo`;
      const description = post.seoDescription ?? post.dek;

      let html = template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
        .replace(
          /<meta name="description"[^>]*>/,
          `<meta name="description" content="${esc(description)}" />`,
        )
        .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article" />`)
        .replace(
          /<meta property="og:title"[^>]*>/,
          `<meta property="og:title" content="${esc(post.title)}" />`,
        )
        .replace(
          /<meta property="og:description"[^>]*>/,
          `<meta property="og:description" content="${esc(description)}" />`,
        )
        .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
        .replace(
          /<meta name="twitter:title"[^>]*>/,
          `<meta name="twitter:title" content="${esc(post.title)}" />`,
        )
        .replace(
          /<meta name="twitter:description"[^>]*>/,
          `<meta name="twitter:description" content="${esc(description)}" />`,
        );

      if (image) {
        html = html
          .replace(
            /<meta property="og:image"[^>]*>/,
            `<meta property="og:image" content="${image}" />\n    <meta property="og:image:alt" content="${esc(post.imageAlt)}" />`,
          )
          .replace(
            /<meta name="twitter:image"[^>]*>/,
            `<meta name="twitter:image" content="${image}" />`,
          );
      }

      html = html.replace(
        "</head>",
        `  <link rel="canonical" href="${url}" />\n  </head>`,
      );

      const outDir = path.join(dist, "insights", post.slug);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
    }

    for (const route of staticRoutes) {
      const url = `${SITE}${route.path}`;
      const html = template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
        .replace(
          /<meta name="description"[^>]*>/,
          `<meta name="description" content="${esc(route.description)}" />`,
        )
        .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article" />`)
        .replace(
          /<meta property="og:title"[^>]*>/,
          `<meta property="og:title" content="${esc(route.ogTitle)}" />`,
        )
        .replace(
          /<meta property="og:description"[^>]*>/,
          `<meta property="og:description" content="${esc(route.description)}" />`,
        )
        .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
        .replace(
          /<meta name="twitter:title"[^>]*>/,
          `<meta name="twitter:title" content="${esc(route.ogTitle)}" />`,
        )
        .replace(
          /<meta name="twitter:description"[^>]*>/,
          `<meta name="twitter:description" content="${esc(route.description)}" />`,
        )
        .replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);

      const outDir = path.join(dist, route.path.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
    }
  },
});
