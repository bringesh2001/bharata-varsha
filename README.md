# Bharata Varsha · भारतवर्ष

A curated guide to India's history, organised into twelve eras. Built from the
*Codex Build Guide* (v1.0), the *Style Guide* (v1) and the *India History Hub*
prototype.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + tests
npm run build        # production build (all pages prerendered)
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs and the sitemap use the real domain.

## Stack

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · MDX via
`@mdx-js/mdx` · Zod · Vitest + React Testing Library.

## Where things live

```
content/eras/*.mdx          Era articles (MDX + frontmatter)
data/eras.ts                The 12 eras: order, dates, summaries (authoritative navigation)
data/sources.json           Every source, cited by stable id
src/app/                    Routes: /, /eras/[slug], /atlas, /lenses, /connections, /ideas, /search
src/components/editorial/   ArticleBody, Cite, Callout, SourceList, TableOfContents, PreviousNext, …
src/components/timeline/    TimelineStrip, EraProgress
src/lib/content/            Zod schema, loader + validator, cached queries, MDX compile
src/lib/dates/format.ts     BCE/CE display (house style: "c. 320–550 CE", "321–185 BCE")
src/proxy.ts                Returns a real 404 for unknown era slugs
tests/                      Vitest tests (dates, content validation, components, search)
```

Design tokens (colours, fonts, radii) are in `src/app/globals.css` and match the Style Guide.

## Publishing workflow

1. **Research** offline (LLM-assisted is fine). LLM output is not evidence.
2. **Add sources** to `data/sources.json`. Real works only; include `siteName` for any `url`.
3. **Write** `content/eras/<slug>.mdx`. The file name must equal `slug`. Cite claims inline with
   `<Cite id="source-id" />`; use `<Callout kind="note|evidence|debate" title="…">` for callouts.
   Years: BCE negative, CE positive, no year 0.
4. **Validate**: `npm run validate:content` fails on bad frontmatter, unknown era or source ids,
   or a `<Cite>` not listed in `sourceIds`.
5. **Review**: a human checks every claim against its source, then sets `status: reviewed` →
   `published`. Pages that are not `published` show a visible draft notice.
6. **Merge** through Git after `npm run check` and `npm run build` pass.

## Milestone status

| Milestone | Status |
| --- | --- |
| M0 Audit prototype | Done (from the PDF export of the prototype) |
| M1 App scaffold | Done: six routes, navigation, scripts, README |
| M2 Content foundation | Done: typed era index, MDX loading, Zod validation, citations, Mauryan draft |
| M3 Editorial pages | Mostly done: home + era template, TOC, sources, prev/next. Related articles pending |
| M4 Lenses / Connections / Ideas | Placeholder pages only |
| M5 Atlas | Placeholder only (no map, no boundary data) |
| M6 Polish + release | Partly: sitemap, robots, metadata, 404. Playwright, OG images, Vercel config pending |

## Decisions and assumptions

- **shadcn/ui not installed yet.** The Style Guide's components (buttons, pills, cards, badges)
  are simple and built with Tailwind directly. Add shadcn when an interactive primitive
  (dialog, tabs, popover) is needed.
- **Prototype features left out on purpose**: the "Found by AI, picked by you" voting, readers'
  picks, and video/lecture cards with placeholder titles. These would need invented titles or a
  backend, and both guides rule those out for now.
- **Mauryan "Key text: Arthashastra"** became "Key evidence: Ashoka's edicts", because the
  Arthashastra's Mauryan date is disputed (the article explains why).
- **Source links** point to Open Library / Internet Archive *search* pages rather than guessed
  record URLs.
- Era dates for the Mauryan, Delhi Sultanate, Vijayanagara, Mughal, Colonial and Independent
  eras display without "c.", matching the prototype; all others are marked approximate.
