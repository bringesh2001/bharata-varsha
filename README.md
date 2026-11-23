# Bharata Varsha · भारतवर्ष

A curated, source-aware guide to India's history, organised into twelve eras. Built from the
*Codex Build Guide* (v1.0), the *Style Guide* (v1) and the *India History Hub* prototype.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + unit/content tests
npm run build        # production build (every page prerendered)
npm run test:e2e     # Playwright smoke, accessibility (axe) and 404 tests against the build
```

`npm run test:e2e` uses the installed Microsoft Edge locally. To use Playwright's own Chromium
instead: `npx playwright install chromium` and set `PW_CHANNEL=chromium`.

## Stack

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · MDX via
`@mdx-js/mdx` · Zod · MapLibre GL (Atlas only, lazy-loaded) · Vitest + React Testing Library ·
Playwright + axe-core.

## Where things live

```
content/eras|lenses|connections|ideas/*.mdx   Articles: MDX body + validated frontmatter
data/eras.ts            The 12 eras (authoritative navigation)
data/sources.json       Every source, cited by stable id
data/inventions.ts      Inventions cards          data/myths.ts     Myth-or-fact checks
data/words.ts           Word journeys             data/schools.ts   Schools of thought
data/shared-roots.ts    Shared roots (Connections)
data/atlas.ts           Atlas powers, regions, capitals (no polygons; see below)
data/photos.ts          Photo credits and licences      public/images/photos/  Photo files
public/maps/            Natural Earth base map (public domain), clipped to South Asia
src/app/                Routes (/, /eras, /atlas, /lenses, /connections, /ideas, /search)
src/components/         layout/, editorial/, timeline/, atlas/
src/lib/content/        Zod schemas, loader + validators, cached queries, MDX compile
src/lib/dates/          BCE/CE formatting (house style)
src/proxy.ts            Real 404s for unknown slugs
scripts/                Build-time helpers (content manifest, MapLibre worker copy)
tests/  e2e/            Vitest and Playwright tests
```

Design tokens (colours, fonts, radii) are in `src/app/globals.css` and match the Style Guide.

## Publishing workflow

1. **Research** offline (LLM-assisted is fine). LLM output is not evidence.
2. **Add sources** to `data/sources.json`. Real works only; a `url` needs a `siteName`.
3. **Write** an MDX file in the right `content/` folder. The file name must equal `slug`.
   - Cite inline with `<Cite id="source-id" />`; callouts with
     `<Callout kind="note|evidence|debate" title="…">`.
   - Lens articles need a `lens:` block (views, evidence, clash, scholarship now); connection
     articles need a `connection:` block (contact periods, events, parallels…). See the existing
     files for the shape.
   - Years: BCE negative, CE positive, no year 0.
4. **Validate**: `npm test` fails on bad frontmatter, unknown era/source/place ids, any `<Cite>`
   or frontmatter source not listed in `sourceIds`, and a stale content manifest.
5. **Review**: a person checks every claim against its source, then sets `status: reviewed` →
   `published`. Anything not `published` shows a visible draft notice.
6. **Merge** through Git. CI (`.github/workflows/ci.yml`) runs typecheck, lint, tests, build and
   the Playwright suite on every push.

## Deploy (Vercel)

1. On vercel.com, **Add New → Project → Import** the GitHub repo. The framework is detected as
   Next.js; no `vercel.json` is needed.
2. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the live URL (for canonical links, the
   sitemap and social previews).
3. Every push to `master` deploys; pull requests get preview URLs.

`npm run build` runs `prebuild` automatically, which regenerates the content manifest and copies
MapLibre's web worker into `public/vendor/`, so no extra build settings are needed.

## Milestone status

| Milestone | Status |
| --- | --- |
| M0 Audit prototype | Done |
| M1 App scaffold | Done |
| M2 Content foundation | Done: typed index, MDX, Zod validation, citations, Mauryan article |
| M3 Editorial pages | Done: home, era template, TOC, sources, prev/next, related content |
| M4 Lenses / Connections / Ideas | Done: listings and detail pages; 7 debates, 6 connections, 1 story, 12 inventions, 6 word journeys, 4 myth checks |
| M5 Atlas | Done: MapLibre map, period slider and presets, legend, text alternative, overlap chart, provenance, fallback |
| M6 Polish + release | Done: sitemap, robots, metadata, Open Graph images, 404 and error pages, e2e + axe tests, CI, deploy docs |

## Decisions and known gaps

- **All content is `draft`** until a person reviews it. It was written with LLM assistance from
  real, cited works, but it has not been checked line by line against those works.
- **No territory polygons on the Atlas.** The build guide forbids borders drawn from guesses. The
  map shows capitals, and the text lists the broad regions each power held. Add polygons later
  from a vetted, licensed dataset (for example one derived from Schwartzberg's *Historical Atlas
  of South Asia*), with provenance in `data/atlas.ts`.
- **Source links go to search pages** (Open Library, Internet Archive, Google Scholar) rather than
  guessed record URLs. Replace them with exact records during review.
- **Not yet written:** 7 of 12 era guides (Vedic, Mahajanapadas, Post-Mauryan, Early Medieval,
  Delhi Sultanate, Vijayanagara, Independent India); the diamonds card (no source yet).
- **Left out on purpose:** the prototype's AI-voting section and video/lecture cards with
  placeholder titles (they would need invented titles or a backend).
- **shadcn/ui not installed.** The Style Guide's components are simple enough for plain
  Tailwind. Add shadcn when a complex primitive (dialog, combobox) is needed.
- **Photos** are copies of freely licensed Wikimedia Commons files in `public/images/photos/`,
  with author, licence and source in `data/photos.ts` (taken from the Commons API). Every photo
  shows its credit, and `/credits` lists them all. Tests fail if a photo lacks a credit, has a
  licence outside CC0 / public domain / CC BY / CC BY-SA / FAL, or its file is missing. No
  database or storage service is needed at this scale.
- Fonts: Gloock is bundled in `assets/fonts/` (SIL OFL, licence alongside) for social images.
