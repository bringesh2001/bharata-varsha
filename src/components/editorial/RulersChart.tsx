import type { ArticleFrontmatter } from "@/lib/content/schema";
import { formatRange } from "@/lib/dates/format";

type Ruler = ArticleFrontmatter["rulers"][number];

/**
 * Reign bars for an Ink (dark) section. Bars are positioned within the era's
 * own date range. The dates are also printed, so nothing relies on the bars alone.
 */
export function RulersChart({
  rulers,
  start,
  end,
  title,
  note,
}: {
  rulers: Ruler[];
  start: number;
  end: number;
  title: string;
  note?: string;
}) {
  const span = end - start;
  return (
    <figure className="rounded-[6px] border border-on-dark-line p-4 sm:p-5">
      <figcaption className="mb-4 text-[15px] font-semibold text-paper">{title}</figcaption>
      <ul className="space-y-4">
        {rulers.map((r) => {
          const left = ((r.start - start) / span) * 100;
          const width = Math.max(((r.end - r.start) / span) * 100, 2);
          return (
            <li key={r.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-[14px]">
                <span className="font-semibold text-paper">{r.name}</span>
                <span className="text-on-dark-muted">{formatRange(r.start, r.end, r.datePrecision)}</span>
              </div>
              <div className="relative mt-1.5 h-2 bg-on-dark-line/60" aria-hidden="true">
                <span className="absolute inset-y-0 bg-era-ancient" style={{ left: `${left}%`, width: `${width}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-4 text-[13px] text-on-dark-muted">{note}</p>}
    </figure>
  );
}
