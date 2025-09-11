# tasks

A small Next.js + TypeScript frontend paired with Solana Anchor programs for simple task management. This repository contains a modern React (Next.js app-router) frontend in `app/` and on-chain programs/resources under `programs/` and `tests/`.

## Tech stack

- Next.js (app directory) + TypeScript
- Tailwind CSS + PostCSS for styling
- Radix UI primitives + lucide-react icons
- Sonner for toasts
- Solana Anchor programs (Rust) in `programs/`

## Repo layout (important paths)

- `app/` — Next.js application (the main frontend). Look here first for dev commands and package.json used for the site.
- `app/app/` — Next.js `app` directory: `layout.tsx`, `page.tsx`, `globals.css`, and app components.
- `app/components/` — UI components (Header, Footer, Tasks, UI primitives).
- `programs/` — Anchor program source (Rust) and program manifests.
- `tests/` — test scripts (integration/e2e with Anchor/ts tooling).
- `migrations/`, `client/`, `public/` — misc deployment and static assets.

## Quick start (frontend)

Prerequisites: Node.js (LTS recommended), npm.

1. Open the frontend folder:

   cd app

2. Install dependencies:

   npm install

3. Run the dev server:

   npm run dev

Visit http://localhost:3000 to view the site.

Notes:
- If `npm install` fails due to registry/tarball issues, try adding or adjusting package overrides in `app/package.json` (for example pinning problematic versions) and run:

  npm install --legacy-peer-deps

- Tailwind/PostCSS-only directives (e.g. `@apply`, custom PostCSS rules) are present in `app/app/globals.css`. The editor may show syntax warnings if PostCSS isn’t running; the full build will process these directives.

## Build / Production

From `app/`:

  npm run build
  npm run start

## What changed (recent frontend improvements)

- Layout modularized: `Header` and `Footer` components added and integrated into the root layout.
- Visual polish: gradient background utilities and subtle animations added to `globals.css`.
- SEO: metadata expanded in `layout.tsx` and JSON-LD structured data injected.
- Small UX tweaks: favicon displayed in the header and the task input handler restored to the original behavior.

## Troubleshooting

- If you see TypeScript errors complaining about missing modules or types, make sure you ran `npm install` inside `app/` so `node_modules` and `@types/*` are available.
- If a package tarball is not found during install (404 for a specific version), pin a known-good version in `app/package.json` `overrides` and re-run `npm install --legacy-peer-deps`.

## Contributing

- Keep changes small and focused. Edit UI components in `app/components/` and page/layout changes in `app/app/`.
- Run the dev server locally and verify visual changes before opening PRs.

## License

This repository does not include an explicit license file. Add `LICENSE` if you intend to publish under an open-source license.

---

If you want, I can add a short `CONTRIBUTING.md`, a `sitemap.xml` generator, or a CI workflow to run lint/tests on push.
