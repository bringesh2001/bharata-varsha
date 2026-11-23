import Link from "next/link";
import type { ArticleFrontmatter } from "@/lib/content/schema";
import { articleHref } from "@/lib/content/links";
import { formatRange, formatYear } from "@/lib/dates/format";

const MIN = -3000;
const MAX = 1000;
const TICKS = [-3000, -2000, -1000, 1, 1000];
const BAR_COLOURS = ["bg-madder", "bg-indigo", "bg-positive", "bg-plum", "bg-sea", "bg-era-classical"];

const pct = (y: number) => ((Math.min(Math.max(y, MIN), MAX) - MIN) / (MAX - MIN)) * 100;

/**
 * "When contact happened": one row per connection, bars for each known period
 * of contact. Dates are printed beside each row, so the bars are never the only cue.
 */
export function ContactTimeline({ items, currentSlug }: { items: ArticleFrontmatter[]; currentSlug?: string }) {
  return (
    <figure className="rounded-[6px] border border-border bg-paper p-4 sm:p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="relative ml-[160px] h-6 text-[12px] text-text-3" aria-hidden="true">
            {TICKS.map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pct(t)}%` }}>
                {t === 1 ? "1 CE" : formatYear(t).replace(/ CE$/, " CE")}
              </span>
            ))}
          </div>
          <ul className="space-y-2">
            {items.map((c, i) => {
              const current = c.slug === currentSlug;
              const periods = c.connection?.contactPeriods ?? [];
              return (
                <li key={c.id}>
                  <Link
                    href={articleHref(c)}
                    aria-current={current ? "page" : undefined}
                    className={`grid min-h-11 grid-cols-[160px_1fr] items-center rounded-[4px] px-2 hover:bg-stone ${current ? "bg-stone" : ""}`}
                  >
                    <span className="pr-3 text-[14px] font-semibold">
                      {c.connection?.region}
                      <span className="block text-[12px] font-normal text-text-3">
                        {periods.map((p) => formatRange(p.start, p.end, "approximate")).join("; ")}
                      </span>
                    </span>
                    <span className="relative h-3 rounded-full bg-divider" aria-hidden="true">
                      {periods.map((p) => (
                        <span
                          key={`${p.start}-${p.end}`}
                          className={`absolute inset-y-0 rounded-full ${BAR_COLOURS[i % BAR_COLOURS.length]}`}
                          style={{ left: `${pct(p.start)}%`, width: `${Math.max(pct(p.end) - pct(p.start), 1)}%` }}
                        />
                      ))}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-[13px] text-text-3">
        Each bar is a period of known contact with India. Dates are approximate, and contact rarely stopped completely
        between the bars.
      </figcaption>
    </figure>
  );
}
