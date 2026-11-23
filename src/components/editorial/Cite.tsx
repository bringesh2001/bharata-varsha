import type { Source } from "@/lib/content/schema";
import { shortCitation } from "@/lib/sources/format";

/**
 * Inline citation marker: a numbered link down to the source list.
 * Numbers follow the order of `sourceIds` in the article frontmatter.
 */
export function Cite({ id, sources }: { id: string; sources: Source[] }) {
  const index = sources.findIndex((s) => s.id === id);
  if (index === -1) {
    // The content validator catches this at test time; render visibly rather than crash a page.
    return <sup className="text-negative">[missing source: {id}]</sup>;
  }
  const source = sources[index];
  return (
    <sup className="ml-0.5">
      <a
        href={`#source-${id}`}
        className="text-[12px] font-semibold text-indigo no-underline hover:underline"
        aria-label={`Source ${index + 1}: ${shortCitation(source)}`}
      >
        [{index + 1}]
      </a>
    </sup>
  );
}
