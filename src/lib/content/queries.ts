/**
 * Cached, page-facing content queries. Content lives in Git and only changes
 * on deploy, so every query is cached ('use cache') and pages prerender as static HTML.
 */
import { cacheLife } from "next/cache";
import { getAllSources, getEraArticle, getSourcesById, loadArticles, type Article } from "./loader";
import type { Source } from "./schema";

export async function getEraIdsWithArticles(): Promise<string[]> {
  "use cache";
  cacheLife("max");
  return loadArticles("era").flatMap((a) => a.frontmatter.eraIds.slice(0, 1));
}

export async function getEraPageContent(
  eraId: string,
): Promise<{ article: Omit<Article, "filePath">; sources: Source[] } | null> {
  "use cache";
  cacheLife("max");
  const article = getEraArticle(eraId);
  if (!article) return null;
  const { filePath: _filePath, ...rest } = article;
  void _filePath;
  return { article: rest, sources: getSourcesById(article.frontmatter.sourceIds) };
}

export type SearchDoc = { title: string; href: string; kind: string; text: string };

/** Small local search index (build guide: "local content search initially"). */
export async function getSearchIndex(): Promise<SearchDoc[]> {
  "use cache";
  cacheLife("max");
  const { eras } = await import("@data/eras");
  const { eraHref, eraDateLabel, eraNumberLabel } = await import("./eras");
  const articles = loadArticles("era");
  const docs: SearchDoc[] = eras.map((era) => {
    const article = articles.find((a) => a.frontmatter.eraIds[0] === era.id);
    return {
      title: era.title,
      href: eraHref(era),
      kind: `${eraNumberLabel(era)} · ${eraDateLabel(era)}`,
      text: [era.title, era.shortTitle, era.summary, article?.frontmatter.topicIds.join(" "), article?.body]
        .filter(Boolean)
        .join(" "),
    };
  });
  for (const s of getAllSources()) {
    docs.push({ title: s.title, href: s.url ?? "#", kind: `Source · ${s.author} · ${s.year}`, text: `${s.title} ${s.author} ${s.note ?? ""}` });
  }
  return docs;
}
