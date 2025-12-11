# Repository Guidelines

This guide keeps contributions consistent for the Ignite Cookbook docs site (Docusaurus 3).

## Project Structure & Module Organization
- `docs/` holds MDX recipes; `docs/recipes/` and `docs/communityRecipes/` group most content.
- `blog/` contains posts; `static/` stores shared assets (images, downloads).
- `src/` contains custom theme/layout code and React components.
- `docusaurus.config.ts`, `sidebars.js`, and `tsconfig.json` define site config, sidebar ordering, and TS settings; keep `build/` as generated output only.

## Build, Test, and Development Commands
- `yarn start` — run the dev server at http://localhost:3000 with hot reload.
- `yarn build` — produce the static site in `build/`; catches broken MDX and config issues.
- `yarn serve` — preview the production build locally.
- `yarn clear` — reset caches if builds act stale.
- `yarn typecheck` — TypeScript checks for `src/` custom code (Node 18+ required).
- `yarn deploy` — publish via the configured Docusaurus deploy target (use with care).

## Coding Style & Naming Conventions
- Markdown/MDX files use frontmatter (`title`, `sidebar_position`, `description`, `tags`, `last_update`); keep headings in Title Case and include concise intros.
- Prefer PascalCase filenames for recipes (mirrors existing pattern) and descriptive slugs; place new assets in `static/img/...` and reference with absolute paths.
- React/TypeScript: PascalCase components, camelCase helpers, 2-space indentation, and import from relative paths or `baseUrl` (`.`) aliases as in the repo.

## Testing Guidelines
- No formal test suite; before pushing, run `yarn typecheck` and `yarn build` to catch MDX/TS errors and broken config.
- For content-heavy changes, spot-check pages via `yarn start` (dev) or `yarn serve` (prod build) to verify links, code blocks, and embeds.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages with optional scope (e.g., `recipe: add expo router notes`, `fix: update vision camera hooks`); follow the existing history style.
- PRs should summarize what changed, list the affected docs/pages, and link any related issues. Include screenshots or preview URLs for visual/layout changes and note the local commands you ran (`yarn build`, `yarn typecheck`).

## Docs & Content Tips
- Keep recipes focused on actionable steps with code blocks labeled (```` ```ts``, ```bash```); prefer small, runnable snippets over large dumps.
- Update `sidebars.js` when adding new sections so content appears in navigation; mind ordering via `sidebar_position`.
- When deprecating or archiving content, move it under `docs/archive/` and note the last known working versions in the frontmatter.
