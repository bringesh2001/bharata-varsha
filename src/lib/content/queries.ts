/**
 * Cached, page-facing content queries. Content lives in Git and only changes
 * on deploy, so every query is cached ('use cache') and pages prerender as static HTML.
 */
import { cacheLife } from "next/cache";
import { eras } from "@data/eras";
import { inventions } from "@data/inventions";
import {
  getAllSources,
  getArticles,
  getArticlesForEra,
  getEraArticle,
  getSourcesById,
  loadArticles,
  type Article,
  type ContentType,
} from "./loader";
import { articleHref, CONTENT_TYPE_LABELS } from "./links";
import { eraDateLabel, eraHref, eraNumberLabel } from "./eras";
import type { ArticleFrontmatter, Source } from "./schema";

export type PageArticle = Omit<Article, "filePath">;

function strip(article: Article): PageArticle {
  const { filePath: _filePath, ...rest } = article;
  void _filePath;
  return rest;
}

export async function getEraIdsWithArticles(): Promise<string[]> {
  "use cache";
  cacheLife("max");
  return loadArticles("era").flatMap((a) => a.frontmatter.eraIds.slice(0, 1));
}

export async function getEraPageContent(eraId: string): Promise<{ article: PageArticle; sources: Source[] } | null> {
  "use cache";
  cacheLife("max");
  const article = getEraArticle(eraId);
  if (!article) return null;
  return { article: strip(article), sources: getSourcesById(article.frontmatter.sourceIds) };
}

/** Frontmatter only (no bodies), for listing pages. */
export async function getListing(type: ContentType): Promise<ArticleFrontmatter[]> {
  "use cache";
  cacheLife("max");
  return getArticles(type).map((a) => a.frontmatter);
}

export async function getArticlePage(
  type: ContentType,
  slug: string,
): Promise<{ article: PageArticle; sources: Source[] } | null> {
  "use cache";
  cacheLife("max");
  const article = getArticles(type).find((a) => a.frontmatter.slug === slug);
  if (!article) return null;
  return { article: strip(article), sources: getSourcesById(article.frontmatter.sourceIds) };
}

/** Sources by id, for data-driven pages (inventions, myths). */
export async function getSources(ids: string[]): Promise<Source[]> {
  "use cache";
  cacheLife("max");
  return getSourcesById(ids);
}

export type RelatedLink = { title: string; href: string; kind: string; summary: string };

/** Debates, connections, ideas and inventions that mention an era. */
export async function getRelatedForEra(eraId: string): Promise<RelatedLink[]> {
  "use cache";
  cacheLife("max");
  const articles = getArticlesForEra(eraId).map((a) => ({
    title: a.frontmatter.title,
    href: articleHref(a.frontmatter),
    kind: CONTENT_TYPE_LABELS[a.frontmatter.contentType],
    summary: a.frontmatter.summary,
  }));
  const inv = inventions
    .filter((i) => i.eraIds.includes(eraId))
    .map((i) => ({ title: i.title, href: `/ideas#invention-${i.id}`, kind: "Invention", summary: i.summary }));
  return [...articles, ...inv];
}

export type SearchDoc = { title: string; href: string; kind: string; text: string };

/** Small local search index (build guide: "local content search initially"). */
export async function getSearchIndex(): Promise<SearchDoc[]> {
  "use cache";
  cacheLife("max");
  const eraArticles = loadArticles("era");
  const docs: SearchDoc[] = eras.map((era) => {
    const article = eraArticles.find((a) => a.frontmatter.eraIds[0] === era.id);
    return {
      title: era.title,
      href: eraHref(era),
      kind: `${eraNumberLabel(era)} · ${eraDateLabel(era)}`,
      text: [era.title, era.shortTitle, era.summary, article?.frontmatter.topicIds.join(" "), article?.body]
        .filter(Boolean)
        .join(" "),
    };
  });
  for (const type of ["lens", "connection", "idea"] as const) {
    for (const a of getArticles(type)) {
      docs.push({
        title: a.frontmatter.title,
        href: articleHref(a.frontmatter),
        kind: CONTENT_TYPE_LABELS[type],
        text: [a.frontmatter.title, a.frontmatter.summary, a.frontmatter.topicIds.join(" "), a.body].join(" "),
      });
    }
  }
  for (const i of inventions) {
    docs.push({
      title: i.title,
      href: `/ideas#invention-${i.id}`,
      kind: "Invention",
      text: [i.title, i.summary, i.worldKnowsAs, i.travelled].join(" "),
    });
  }
  for (const s of getAllSources()) {
    docs.push({ title: s.title, href: s.url ?? "#", kind: `Source · ${s.author} · ${s.year}`, text: `${s.title} ${s.author} ${s.note ?? ""}` });
  }
  return docs;
}
