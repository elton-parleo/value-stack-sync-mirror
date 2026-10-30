# Preview failure: fix in GitHub (no Lovable changes)

## The exact error
The newest preview build entry ends with:

```text
=== build ===
error: Script not found "build:dev"
```

The preview builder runs `build:dev`. The v8 `package.json` only defines `dev`, `build`, `preview` and `images`. The dev server itself starts fine (`VITE v5.4.11 ready` on port 8080). The earlier rolldown "Tsconfig not found" and "tailwind.config.ts" crashes came from the old site's Vite still running during the swap.

## The fix you'll make in GitHub
In `package.json` scripts, add:

```json
"build:dev": "vite build --mode development"
```

`vite.config.ts` doesn't need any change. Plain CSS, Vite 5 and plugin-react 4 stay as they are.

## Optional, non-blocking
The platform typecheck flags `baseUrl` (TS5102) and a non-relative `paths` entry (TS5090) in `tsconfig.json`. To quiet it: remove `baseUrl` and use `"@/*": ["./src/*"]`. This doesn't block the preview.

## In Lovable
Nothing will be changed. After your commit syncs, the preview should rebuild on its own.
