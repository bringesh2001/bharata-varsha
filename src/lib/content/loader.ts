import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { eras } from "@data/eras";
import sourcesJson from "@data/sources.json";
import { articleFrontmatterSchema, sourceSchema, type ArticleFrontmatter, type Source } from "./schema";
import { slugify } from "./slugify";

export type ContentType = ArticleFrontmatter["contentType"];

const DIR_BY_TYPE: Record<ContentType, string> = {
  era: "eras",
  lens: "lenses",
  connection: "connections",
  idea: "ideas",
};

export type Heading = { id: string; text: string };

export type Article = {
  frontmatter: ArticleFrontmatter;
  /** MDX body without frontmatter. */
  body: string;
  /** Level-2 headings, used for the table of contents. */
  headings: Heading[];
  filePath: string;
};

export class ContentValidationError extends Error {
  constructor(
    public readonly filePath: string,
    public readonly problems: string[],
  ) {
    super(`Invalid content in ${filePath}:\n  - ${problems.join("\n  - ")}`);
    this.name = "ContentValidationError";
  }
}

/** Extracts `## ` headings, ignoring fenced code blocks. */
export function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) headings.push({ id: slugify(match[1]), text: match[1] });
  }
  return headings;
}

/** Parses and validates one MDX file's text. Pure: no file system access. */
export function parseArticle(raw: string, filePath: string): Article {
  const { data, content } = matter(raw);
  // gray-matter parses YAML dates into Date objects; the schema expects ISO strings.
  if (data.updatedAt instanceof Date) data.updatedAt = data.updatedAt.toISOString().slice(0, 10);

  const parsed = articleFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      filePath,
      parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`),
    );
  }
  const expectedSlug = path.basename(filePath).replace(/\.mdx$/, "");
  if (parsed.data.slug !== expectedSlug) {
    throw new ContentValidationError(filePath, [`slug "${parsed.data.slug}" must match the file name "${expectedSlug}"`]);
  }
  return { frontmatter: parsed.data, body: content, headings: extractHeadings(content), filePath };
}

/** Checks that every era, source and related-article ID an article uses actually exists. */
export function findBrokenReferences(
  article: Article,
  known: { eraIds: Set<string>; sourceIds: Set<string>; articleIds: Set<string> },
  body: string = article.body,
): string[] {
  const fm = article.frontmatter;
  const problems: string[] = [];
  for (const id of fm.eraIds) if (!known.eraIds.has(id)) problems.push(`unknown era id "${id}"`);
  for (const id of fm.sourceIds) if (!known.sourceIds.has(id)) problems.push(`unknown source id "${id}"`);
  for (const id of fm.relatedArticleIds) if (!known.articleIds.has(id)) problems.push(`unknown related article id "${id}"`);

  // Every <Cite id="..."/> in the body must be listed in the article's sourceIds.
  const listed = new Set(fm.sourceIds);
  for (const m of body.matchAll(/<Cite\s+[^>]*id=["']([^"']+)["']/g)) {
    if (!listed.has(m[1])) problems.push(`<Cite id="${m[1]}"> is not listed in sourceIds`);
  }
  return problems;
}

// ---------------------------------------------------------------------------
// File-system backed queries
// ---------------------------------------------------------------------------

export function getAllSources(): Source[] {
  return sourcesJson.map((s, i) => {
    const parsed = sourceSchema.safeParse(s);
    if (!parsed.success) {
      throw new ContentValidationError(
        `data/sources.json[${i}]`,
        parsed.error.issues.map((iss) => `${iss.path.join(".")}: ${iss.message}`),
      );
    }
    return parsed.data;
  });
}

export function getSourcesById(ids: string[]): Source[] {
  const byId = new Map(getAllSources().map((s) => [s.id, s]));
  return ids.map((id) => byId.get(id)).filter((s): s is Source => !!s);
}

export function loadArticles(type: ContentType): Article[] {
  // Statically scoped to content/ so the bundler only traces that folder.
  const dir = path.join(process.cwd(), "content", DIR_BY_TYPE[type]);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((f) => {
      const filePath = path.join(dir, f);
      const article = parseArticle(fs.readFileSync(filePath, "utf8"), filePath);
      if (article.frontmatter.contentType !== type) {
        throw new ContentValidationError(filePath, [`contentType "${article.frontmatter.contentType}" does not match folder "${DIR_BY_TYPE[type]}"`]);
      }
      return article;
    });
}

/** Loads all content and validates every cross-reference. Used by tests and `npm run validate:content`. */
export function validateAllContent(): { articles: Article[]; problems: string[] } {
  const types: ContentType[] = ["era", "lens", "connection", "idea"];
  const articles = types.flatMap((t) => loadArticles(t));
  const known = {
    eraIds: new Set(eras.map((e) => e.id)),
    sourceIds: new Set(getAllSources().map((s) => s.id)),
    articleIds: new Set(articles.map((a) => a.frontmatter.id)),
  };
  const problems: string[] = [];
  const seenIds = new Set<string>();
  for (const a of articles) {
    if (seenIds.has(a.frontmatter.id)) problems.push(`${a.filePath}: duplicate article id "${a.frontmatter.id}"`);
    seenIds.add(a.frontmatter.id);
    for (const p of findBrokenReferences(a, known)) problems.push(`${a.filePath}: ${p}`);
  }
  return { articles, problems };
}

/** The era article for an era, if one has been written. Drafts are included and flagged in the UI. */
export function getEraArticle(eraId: string): Article | undefined {
  return loadArticles("era").find((a) => a.frontmatter.eraIds[0] === eraId);
}
