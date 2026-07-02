# sentinel-docs

Documentation site for Sentinel, built with Next.js and Fumadocs.

This repo has two main jobs:

- render the custom homepage at `/`
- render the documentation site at `/docs`

Fumadocs provides the docs content pipeline, sidebar/navigation wiring, MDX rendering, search integration, and OpenAPI page support. Sentinel-specific content lives in this repo.

## Local Development

Clone the repo:

```bash
git clone git@github.com:testpress/sentinel-docs.git
cd sentinel-docs
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
pnpm dev
pnpm build
pnpm types:check
pnpm lint
pnpm openapi:generate
```

What they do:

- `pnpm dev`: runs the local Next.js dev server
- `pnpm build`: builds the site and exports the static output to `out/`
- `pnpm types:check`: regenerates Fumadocs MDX types, runs Next typegen, then runs TypeScript checks
- `pnpm lint`: runs `oxlint`
- `pnpm openapi:generate`: regenerates the API reference MDX files from the live OpenAPI schema

## How Fumadocs Fits This Repo

At a high level:

- `content/docs` stores the documentation content as MDX and `meta.json`
- `source.config.ts` tells `fumadocs-mdx` where the docs content lives
- `src/lib/source.ts` loads that content into the Fumadocs source API
- `src/app/docs/[[...slug]]/page.tsx` renders docs pages from the loaded source
- `src/lib/layout.shared.tsx` defines the shared docs navigation structure

The moving parts work together like this:

1. MDX files under `content/docs` are registered through `source.config.ts`
2. Fumadocs generates the `collections` bindings used by `src/lib/source.ts`
3. The docs route reads pages from that source and renders them inside the Fumadocs docs layout
4. Navigation menus and top-level section links are defined in `src/lib/layout.shared.tsx`

## Repo Structure

Key directories and files:

```text
src/app/(home)/              Homepage route group
src/app/docs/                Documentation route layout and page renderer
src/app/api/search/route.ts  Search endpoint for docs
src/lib/source.ts            Fumadocs source loader
src/lib/layout.shared.tsx    Shared home/docs navigation config
src/lib/openapi.ts           OpenAPI page helpers
content/docs/                All MDX documentation content
scripts/generate-openapi.mjs OpenAPI generation script
source.config.ts             Fumadocs MDX source configuration
.github/workflows/           CI and GitHub Pages deployment
```

## Documentation Sections

The current docs live under `content/docs` in these top-level folders:

- `getting-started`
- `backend-integration`
- `js-sdk`
- `api-reference`

These folders map directly to docs routes:

- `content/docs/getting-started/*` -> `/docs/getting-started/*`
- `content/docs/backend-integration/*` -> `/docs/backend-integration/*`
- `content/docs/js-sdk/*` -> `/docs/js-sdk/*`
- `content/docs/api-reference/*` -> `/docs/api-reference/*`

Each section usually has:

- an `index.mdx` landing page
- one or more additional `.mdx` pages
- a `meta.json` file that controls sidebar ordering and labels

## Homepage, Content, and Docs Layout

There are two separate UI surfaces in this repo:

### Homepage

`src/app/(home)/page.tsx` is the custom homepage. This is where the integration-oriented landing page lives.

`src/app/(home)/layout.tsx` wraps that page in the Fumadocs home layout.

Use this area for:

- homepage messaging
- integration overview
- install snippets
- route cards into the docs

Do not put long-form docs content here.

### Documentation Pages

`src/app/docs/layout.tsx` and `src/app/docs/[[...slug]]/page.tsx` power the docs site under `/docs`.

Use this area for:

- tutorials
- setup guides
- backend integration details
- JS SDK usage
- API reference content

### Content

`content/docs` is the source of truth for written documentation. The docs route renders content from here through Fumadocs.

## Add a New Document

To add a new doc page:

1. Pick the correct section folder under `content/docs`
2. Create a new `.mdx` file
3. Add frontmatter with at least `title` and `description`
4. Update that folder's `meta.json` so the page appears in the sidebar in the right order
5. Link to it from related docs if needed

Example:

```text
content/docs/js-sdk/troubleshooting.mdx
```

Example frontmatter:

```mdx
---
title: Troubleshooting
description: Common SDK integration issues and fixes
---
```

After adding a page, run:

```bash
pnpm types:check
```

That catches MDX/source issues early.

## Update an Existing Document

To update docs content:

1. Edit the relevant `.mdx` file in `content/docs`
2. If the title or ordering changed, update `meta.json` too
3. Run `pnpm types:check`
4. Preview locally with `pnpm dev`

For homepage-only updates, edit `src/app/(home)/page.tsx` instead.

## How the Sidebar and Navigation Work

There are two layers of navigation:

- content-level navigation from `meta.json` files inside `content/docs`
- top-level product/docs navigation from `src/lib/layout.shared.tsx`

Use `meta.json` when you want to:

- reorder pages inside a section
- rename sidebar labels
- hide or regroup docs pages

Use `src/lib/layout.shared.tsx` when you want to:

- change the top navigation menu
- change the docs section entry points
- change homepage/doc-layout shared links

## Regenerate the API Reference

The API reference pages are generated from the live OpenAPI schema, not maintained by hand.

Run:

```bash
pnpm openapi:generate
```

What this does:

- fetches the schema from `https://app.tpsentinel.com/api/openapi.json`
- generates MDX files into `content/docs/api-reference`
- creates one page per operation
- updates the API reference index metadata used by the docs site

Source of this behavior:

- script: [scripts/generate-openapi.mjs](/home/hari/workspace/sentinel-docs/scripts/generate-openapi.mjs)

Important notes:

- generated files in `content/docs/api-reference` may be overwritten
- if the schema changes, route filenames and page content may change
- avoid hand-editing generated operation pages unless you are prepared to lose those edits on the next generation pass

Recommended workflow when updating the API docs:

1. Run `pnpm openapi:generate`
2. Review the diff in `content/docs/api-reference`
3. Run `pnpm types:check`
4. Run `pnpm build` if the changes are substantial

## Build and Static Export

This site is deployed as a static export.

Build locally with:

```bash
pnpm build
```

The static output is written to:

```text
out/
```

This repo is configured so `next build` produces the export used for hosting.

## Deployment Flow

Deployment is handled by GitHub Actions through:

- [.github/workflows/deploy-pages.yml](/home/hari/workspace/sentinel-docs/.github/workflows/deploy-pages.yml)

The workflow runs on pushes to `main` and on manual dispatch.

Build job flow:

1. Check out the repo
2. Install `pnpm`
3. Install Node.js 22
4. Configure GitHub Pages
5. Set deployment environment variables
6. Install dependencies with `pnpm install --frozen-lockfile`
7. Regenerate the OpenAPI docs with `pnpm openapi:generate`
8. Build the site with `pnpm build`
9. Upload `out/` as the Pages artifact

Deploy job flow:

1. Take the uploaded Pages artifact
2. Deploy it to GitHub Pages

The workflow also creates `out/.nojekyll` before upload.

## Site URL and Base Path

The Pages workflow currently sets:

- `NEXT_PUBLIC_BASE_PATH=`
- `NEXT_PUBLIC_SITE_URL=https://developer.tpsentinel.com`

That means the site is being deployed at the root of the configured domain rather than under a repository subpath.

If this changes in the future:

- update the workflow environment variables
- verify static asset paths
- verify metadata and canonical URLs

## Recommended Change Workflow

For normal content edits:

1. Update MDX or homepage code
2. Run `pnpm types:check`
3. Preview with `pnpm dev`
4. Commit and push

For API reference updates:

1. Run `pnpm openapi:generate`
2. Review generated diffs
3. Run `pnpm types:check`
4. Commit and push

For deployment-sensitive changes:

1. Run `pnpm build`
2. Confirm `out/` is produced successfully
3. Push to `main` or trigger the workflow manually

## Notes for Maintainers

- Treat `content/docs/api-reference` as generated output
- Treat `content/docs/getting-started`, `backend-integration`, and `js-sdk` as hand-authored content
- Keep homepage copy focused on orientation and routing; detailed product explanation belongs in docs pages
- If navigation feels wrong, check both `meta.json` and `src/lib/layout.shared.tsx`
