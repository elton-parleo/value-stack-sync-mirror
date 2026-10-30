# Preview failure diagnosis (no code changed)

## The exact error
The newest preview build entry ends with:

```text
=== build ===
error: Script not found "build:dev"
```

The preview builder runs `build:dev`. The v8 `package.json` only has `dev`, `build`, `preview` and `images`, so the build stops before Vite runs.

The dev server itself is fine. The latest log shows `VITE v5.4.11 ready` on port 8080. The earlier rolldown "Tsconfig not found" and "Could not resolve tailwind.config.ts" crashes came from the old site's Vite still running while the merge swapped files. They are gone now.

## Minimal fix (package.json only)
Add one script:

```json
"build:dev": "vite build --mode development"
```

No change to `vite.config.ts` is needed. Keep `build` as is. Plain CSS, Vite 5 and plugin-react 4 stay unchanged.

## Separate, non-blocking warning
The platform typecheck (a newer TypeScript compiler) reports `tsconfig.json` `baseUrl` removed (TS5102) and a non-relative `paths` entry (TS5090). This does not stop the preview. If you want it quiet later: drop `baseUrl` and make the path `"@/*": ["./src/*"]`. Your `tsc -b` on TS 5.6 accepts the current file.

## After approval
Add the `build:dev` line, then check the build log shows "build OK" and that the preview shows the v8 site at desktop and 390px.
