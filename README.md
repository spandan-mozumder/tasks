# Tasks — Solana-Backed Todo App

Professional, concise README for the repository. Contains the frontend (Next.js + TypeScript + Tailwind) and on-chain programs (Anchor/Rust).

## Project Overview

`tasks` is a small todo application that demonstrates a modern full-stack dApp architecture:

- Frontend: Next.js (app router) + TypeScript with Tailwind CSS for UI and subtle animations.
- Wallet integrations: Solana wallet adapter to connect users and sign transactions.
- On-chain: Anchor (Rust) programs under `programs/` implementing task storage and operations.

This repository is useful as a reference for integrating a React/Next.js app with Solana Anchor programs, including deployment and local development flows.

## Contents

- `app/` — Next.js frontend (primary developer focus for UI changes). Contains `package.json` for frontend dependencies.
- `programs/` — Anchor program source code (Rust) and configuration.
- `migrations/` — deployment scripts for Anchor/solana setup.
- `tests/` — integration tests (Anchor/test framework).
- `client/` — small client tooling and helpers.
- `public/` — static assets (icons, images).

## Tech Stack

- Next.js (app directory) + TypeScript
- Tailwind CSS + PostCSS
- Radix UI primitives and lucide-react icons
- Sonner for toasts
- Solana Anchor (Rust) for on-chain program logic
- Anchor test harness + TypeScript tests

## Quick Start — Frontend (development)

Prerequisites:

- Node.js (LTS recommended)
- npm (comes with Node)
- For Solana development: `solana-cli`, `anchor` (if you will run programs locally)

Steps:

```bash
cd app
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

Notes:

- If `npm install` fails with registry/tarball errors, try:

```bash
npm install --legacy-peer-deps
```

or pin problematic packages in `app/package.json` `overrides`.

## Build & Production

```bash
cd app
npm run build
npm run start
```

The project uses Next.js Turbopack by default for builds. You may see a warning about multiple lockfiles if a lockfile exists at the repo root — either remove the top-level lockfile if unused or set `turbopack.root` in `next.config.js` to the `app` directory.

## Solana / Anchor (local dev)

This repository contains Anchor programs under `programs/`. To set up local Anchor development:

1. Install Anchor and Solana CLI (see Anchor docs).
2. Start a local validator and run Anchor tests or deploy:

```bash
# from the repository root
anchor test
# or to deploy locally
cd programs/constant
anchor build
anchor deploy
```

Refer to the Anchor docs for local cluster setup, airdrops, and keypair configuration.

## Testing

- Frontend components: add Jest/React Testing Library if you want unit tests for React components.
- Integration: Anchor tests under `tests/` can be run with `anchor test`.

## Linting and Formatting

Run TypeScript checks and ESLint (Next.js includes ESLint):

```bash
cd app
npm run lint
npm run format
```

Add or adjust rules in `app/.eslintrc` and `app/.prettierrc` as needed.

## CI / Deployment Recommendations

- Add a GitHub Actions pipeline that runs `npm ci`, `npm run build`, and `npm run lint` on `push`/`pull_request`.
- If deploying to Vercel, connect the `app/` directory as the project root or set `build` to run from `app/`.

Example GitHub Actions job snippet:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: cd app && npm ci
      - run: cd app && npm run build
      - run: cd app && npm run lint
```

## Troubleshooting

- Missing types / TS errors: ensure you ran `npm install` inside `app/` so `node_modules` and `@types/*` are available.
- Tailwind/PostCSS editor warnings: PostCSS-only directives (e.g., `@apply`) may cause editor lint warnings; the actual build processes them correctly.
- NPM registry 404s: pin or override problematic packages in `app/package.json` and rerun `npm install --legacy-peer-deps`.

## Contribution Guidelines

- Keep PRs small and focused.
- Run the dev server locally and include screenshots for UI changes.
- Describe any changes to on-chain program interfaces in the PR.

## License

This repository does not contain a license file. Add a `LICENSE` if you intend to make the project open source.

---

If you'd like, I can also:

- Add a GitHub Actions workflow file to `.github/workflows/ci.yml`.
- Add `turbopack.root` to `next.config.js` to silence the workspace-root warning.

Tell me which of those you'd like and I'll add them.

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
