import type { ArticleFrontmatter } from "./schema";

const BASE: Record<ArticleFrontmatter["contentType"], string> = {
  era: "/eras",
  lens: "/lenses",
  connection: "/connections",
  idea: "/ideas",
};

export const CONTENT_TYPE_LABELS: Record<ArticleFrontmatter["contentType"], string> = {
  era: "Era",
  lens: "Debate",
  connection: "Connection",
  idea: "Idea",
};

/** The one place article URLs are built. Era articles share their era's slug. */
export function articleHref(fm: Pick<ArticleFrontmatter, "contentType" | "slug">): string {
  return `${BASE[fm.contentType]}/${fm.slug}`;
}
