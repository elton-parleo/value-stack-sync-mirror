# Migration Plan: Move parleo.io hosting to Vercel (Option 2)

Goal: Serve the Lovable-built landing page from Vercel so `parleo.io` and the audit app can share a single origin.

## Phase 1 - Link Lovable to GitHub
- In the Lovable editor, open the Plus (+) menu in the chat input.
- Choose GitHub → Connect project.
- Authorize the Lovable GitHub app.
- Select the GitHub account/org (Parleo org recommended) and create the repository.
- Confirm two-way sync is active and the initial code push succeeds.
- Share the repo URL with the agent.

## Phase 2 - Import into Vercel
- In Vercel, import the new GitHub repository as a project.
- Use default Vite settings (build command: `vite build`, output directory: `dist`).
- Add the production environment variables from the current Lovable project (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, etc.).
- Deploy and confirm the `.vercel.app` preview builds correctly.

## Phase 3 - Point DNS to Vercel
- In Vercel project settings, add the custom domains `parleo.io` and `www.parleo.io`.
- Copy the DNS records Vercel provides (A, CNAME, or nameservers).
- In Namecheap, update the DNS records to Vercel's values (or change nameservers if Vercel asks for full delegation).
- Wait for DNS propagation and confirm Vercel marks the domains as active/verified.
- Verify the site loads on `parleo.io` from Vercel.

## Phase 4 - Disconnect Lovable custom domain
- Only after Vercel is serving `parleo.io` correctly:
  - Open Project Settings → Domains in Lovable.
  - Remove `parleo.io` and `www.parleo.io`, or at least unset `parleo.io` as primary.
- Lovable preview/published URLs will keep working, but `parleo.io` will no longer be served by Lovable.

## Phase 5 - Merge /audit on the same domain
- Coordinate with Elton to route `/audit` to the audit app from the Vercel project (rewrites/proxy or monorepo).
- Ensure PostHog, lemlist, and Formspree tracking still fire on the new origin.

## Rollback
- Keep the Lovable project and GitHub sync intact. If anything fails during DNS cutover, revert Namecheap DNS back to Lovable (`185.158.133.1` A records) while investigating.
