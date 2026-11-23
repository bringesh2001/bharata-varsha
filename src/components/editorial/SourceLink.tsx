import type { Source } from "@/lib/content/schema";
import { sourceTypeLabel } from "@/lib/sources/format";

/**
 * "Book · Title   openlibrary.org ↗" — a link straight to a source (Style Guide §03).
 * Every outside link shows its site name and ↗ and opens in a new tab.
 */
export function SourceLink({ source, dark = false }: { source: Source; dark?: boolean }) {
  const body = (
    <>
      <span className="min-w-0">
        <span className="font-semibold">{sourceTypeLabel(source)}</span>
        <span className={dark ? "text-on-dark-muted" : "text-text-3"}> · </span>
        {source.title}
        <span className={dark ? "text-on-dark-muted" : "text-text-3"}> ({source.author}, {source.year})</span>
      </span>
      {source.url && (
        <span className={`shrink-0 text-[13px] ${dark ? "text-on-dark-muted" : "text-text-3"}`}>
          {source.siteName} <span aria-hidden="true">↗</span>
        </span>
      )}
    </>
  );
  const cls = `flex min-h-11 items-center justify-between gap-3 rounded-[4px] border px-3 py-2 text-[14px] ${
    dark ? "border-on-dark-line text-paper hover:bg-white/5" : "border-border bg-paper hover:border-border-strong"
  }`;
  return source.url ? (
    <a href={source.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
