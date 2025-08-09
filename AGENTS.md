# Repository Guidelines

## Project Structure & Module Organization
- Root app: `app/` – Vue 3 + Vite source.
- Source: `app/src/` (e.g., `App.vue`, `main.js`, components).
- Static assets: `app/public/`.
- Build output: `app/dist/` (generated, not committed).
- CI: `.github/workflows/auto-deploy.yml` builds on `release` and deploys to `gh-pages`.

## Build, Test, and Development Commands
- `cd app && npm install`: install dependencies (first run/after updates).
- `npm run dev`: start Vite dev server with HMR.
- `npm run build`: production build to `app/dist`.
- `npm run preview`: serve the production build locally.
- CI deploy: pushing to `release` triggers build and `ghp-import` to `gh-pages`.

## Coding Style & Naming Conventions
- Language: JavaScript + Vue SFCs (`<script setup>`), Vuetify for UI.
- Indentation: 2 spaces. Keep a consistent semicolon style (prefer none).
- Components: PascalCase filenames (e.g., `VideoGrid.vue`); template tags kebab-case.
- Variables/functions: camelCase; constants: UPPER_SNAKE_CASE.
- Organize by feature under `app/src/` where practical; keep reusable UI in `components/`.

## Testing Guidelines
- No formal unit tests configured yet.
- Preferred setup (when adding tests): Vitest + Vue Test Utils under `app/src/__tests__/*.{spec,test}.js`.
- For now, validate via `npm run dev`, check console warnings, and verify key flows (video playback, layout, dark mode).

## Commit & Pull Request Guidelines
- Commit messages: short, imperative (e.g., "Add grid view", "Fix base URL").
- Scope PRs narrowly; avoid mixing refactors with feature/bugfix.
- PR checklist: summary, steps to reproduce/verify, before/after screenshots for UI, linked issues, and notes on breaking changes.
- Optional prefixes for clarity (e.g., `UI:`, `build:`, `chore:`).

## Deployment & CI Notes
- GitHub Actions builds on `release` and force-pushes `app/dist` to `gh-pages`.
- Public URL: `https://yasu-kun.github.io/livecamera/`.
- If routes/assets break on Pages, ensure Vite `base` matches the repo path when building.

## Security & Configuration Tips
- Do not commit secrets; Pages deploy uses repo write permissions.
- CI uses Node 22.x—match locally for parity.
