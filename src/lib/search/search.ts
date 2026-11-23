import type { SearchDoc } from "@/lib/content/queries";

function normalise(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Simple ranked keyword search: every word must appear; title matches rank
 * above body matches. Good enough until content outgrows it.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 20): SearchDoc[] {
  const terms = normalise(query).split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return [];
  return docs
    .map((doc) => {
      const title = normalise(doc.title);
      const text = normalise(doc.text);
      if (!terms.every((t) => title.includes(t) || text.includes(t))) return null;
      const score = terms.reduce((sum, t) => sum + (title.includes(t) ? 10 : 0) + (text.split(t).length - 1), 0);
      return { doc, score };
    })
    .filter((r): r is { doc: SearchDoc; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.doc);
}
