import type { Source } from "@/lib/content/schema";
import { sourceLevelLabel, sourceTypeLabel } from "@/lib/sources/format";

/** Numbered sources at the foot of an article. Every outside link shows its site name and ↗. */
export function SourceList({ sources, headingId = "sources" }: { sources: Source[]; headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="font-display text-[clamp(28px,3.2vw,36px)] leading-[1.1]">
        Sources and further reading
      </h2>
      <p className="mt-2 text-[15px] text-text-2">
        Numbers match the markers in the text. Links open a library or archive search in a new tab.
      </p>
      <ol className="mt-6 divide-y divide-divider rounded-[6px] border border-border bg-paper">
        {sources.map((s, i) => (
          <li key={s.id} id={`source-${s.id}`} className="scroll-mt-6 p-4 target:bg-stone sm:p-5">
            <div className="flex gap-4">
              <span className="w-6 shrink-0 text-right font-semibold text-text-3">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-text-3">
                  <span className="font-semibold text-ink">{sourceTypeLabel(s)}</span> · {s.author} · {s.year}
                  {s.publisher ? ` · ${s.publisher}` : ""}
                </p>
                <p className="mt-0.5 font-semibold leading-snug">{s.title}</p>
                {s.note && <p className="mt-1 text-[15px] text-text-2">{s.note}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-[12px] font-semibold">
                    {sourceLevelLabel(s)}
                  </span>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-[15px] font-semibold text-indigo hover:underline"
                    >
                      Find it<span className="ml-1.5 font-normal text-text-3">{s.siteName}</span>
                      <span aria-hidden="true" className="ml-1">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
