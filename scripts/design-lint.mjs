#!/usr/bin/env node
// Design lint: counts the patterns DESIGN.md bans or rations and fails when a budget is exceeded.
// usage: node scripts/design-lint.mjs [srcDir]
import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || path.resolve(path.dirname(new URL(import.meta.url).pathname), "../src");
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(css|tsx?|md)$/.test(f.name)) files.push(p);
  }
})(root);

const BANNED_WORDS = ["spine", "lands", "landed", "sticker price", "vibes", "delve", "tapestry", "testament", "beacon", "realm", "multifaceted", "game-changer", "game changer", "transformative", "revolutionary", "seamless", "synergy", "paradigm", "holistic", "myriad", "foster", "embark", "pivotal", "unlock", "elevate", "empower", "leverage", "landscape", "journey", "quietly", "it is important to note"];

// [label, regex, file filter, budget (0 = banned), note]
const RULES = [
  ["italic type", /font-style:\s*italic|<em[\s>]|<i>/g, /\.(css|tsx)$/, 0, "no italic anywhere, serif or sans"],
  ["infinite loops", /repeat:\s*Infinity|repeatCount="indefinite"|animation[^;]*infinite/g, /\.(css|tsx)$/, 1, "one ambient loop per site at most, inside the demo"],
  ["pulse / blink / caret / float keyframes", /@keyframes\s+[\w-]*(pulse|blink|caret|float|bob|glow|shimmer|breath)/gi, /\.css$/, 0, ""],
  ["radial halos", /radial-gradient\(/g, /\.css$/, 0, "no glows or halos"],
  ["glass / blur", /backdrop-filter|filter:\s*blur/g, /\.css$/, 0, ""],
  ["soft shadows (blur >= 24px)", /box-shadow:[^;]*\b(2[4-9]|[3-9]\d|\d{3})px/g, /\.css$/, 0, "hairline or fill, never a soft drop shadow"],
  ["grid-line backgrounds", /background(-image)?:[^;]*linear-gradient\([^;]*1px/g, /\.css$/, 0, "grid only inside diagrams"],
  ["design-system atmosphere classes", /bg-grid-fine|site-texture|diffusion-glow|light-burn|atmos-|texture-dots|grain-overlay|pulse-dot|caret-blink|border-pulse/g, /\.(css|tsx)$/, 0, "retired on the site, Oct 23"],
  ["count-up numbers",/<CountUp/g, /\.tsx$/, 1, "one numbers band per site"],
  ["scroll reveals", /<Rise|whileInView/g, /\.tsx$/, 24, "reveal the first object of a section, not every element"],
  ["mono labels", /className="ml[\s"]/g, /\.tsx$/, 30, "machine text only"],
  ["em / en dashes in copy", /[–—]/g, /\.(tsx|ts|md)$/, 0, ""],
];

const out = [];
let failed = 0;
for (const [label, re, filt, budget, note] of RULES) {
  let n = 0;
  const where = {};
  for (const f of files.filter((f) => filt.test(f))) {
    const m = fs.readFileSync(f, "utf8").match(re);
    if (m) {
      n += m.length;
      where[path.relative(root, f)] = m.length;
    }
  }
  const ok = n <= budget;
  if (!ok) failed++;
  out.push({ label, n, budget, ok, note, top: Object.entries(where).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k}:${v}`).join(" ") });
}

// banned words in user-facing strings (tsx text + content files)
let bw = 0;
const bwWhere = [];
for (const f of files.filter((f) => /\.(tsx|ts|md)$/.test(f))) {
  const t = fs.readFileSync(f, "utf8").replace(/import[^\n]*\n/g, "").replace(/className="[^"]*"/g, "");
  for (const w of BANNED_WORDS) {
    const m = t.match(new RegExp(`\\b${w}\\b`, "gi"));
    if (m) {
      bw += m.length;
      bwWhere.push(`${path.relative(root, f)}:${w}`);
    }
  }
}
out.push({ label: "banned words", n: bw, budget: 0, ok: bw === 0, note: "", top: bwWhere.slice(0, 4).join(" ") });
if (bw) failed++;

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("rule", 40) + pad("count", 7) + pad("budget", 8) + "status   worst files");
for (const r of out) console.log(pad(r.label, 40) + pad(r.n, 7) + pad(r.budget, 8) + pad(r.ok ? "ok" : "OVER", 9) + r.top);
console.log(failed ? `\n${failed} rule(s) over budget` : "\nall within budget");
process.exit(failed ? 1 : 0);
