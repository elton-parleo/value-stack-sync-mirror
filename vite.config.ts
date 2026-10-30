import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
import { prerenderSocial } from "./plugins/prerender-social";

// ARTIFACT=1 builds a relative-path, hash-routed copy for claude.ai artifact previews (dist-artifact/).
const artifact = !!process.env.ARTIFACT;

export default defineConfig(({ mode }) => ({
  // Lovable's sandbox proxies the dev server on [::]:8080.
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [react(), !artifact && mcpPlugin(), prerenderSocial(), mode === "development" && componentTagger()].filter(Boolean) as PluginOption[],
  base: artifact ? "./" : "/",
  define: { __HASH_ROUTER__: JSON.stringify(artifact) },
  resolve: { alias: { "@": "/src" } },
  build: {
    target: "es2020",
    cssCodeSplit: false,
    outDir: artifact ? "dist-artifact" : "dist",
    rollupOptions: {
      output: {
        manualChunks: { vendor: ["react", "react-dom", "react-router-dom"], motion: ["framer-motion"] },
      },
    },
  },
}));
