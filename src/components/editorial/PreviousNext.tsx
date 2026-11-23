import Link from "next/link";
import type { Era } from "@data/eras";
import { eraDateLabel, eraHref, eraNumberLabel } from "@/lib/content/eras";

export function PreviousNext({ previous, next }: { previous?: Era; next?: Era }) {
  return (
    <nav aria-label="Previous and next era" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={eraHref(previous)}
          className="group rounded-[6px] border border-border bg-stone p-4 hover:bg-paper"
        >
          <span className="block text-[13px] text-text-3">
            <span aria-hidden="true">← </span>Before: {eraNumberLabel(previous)} · {eraDateLabel(previous)}
          </span>
          <span className="mt-1 block font-display text-[22px] leading-tight group-hover:underline">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={eraHref(next)}
          className="group rounded-[6px] border border-border bg-stone p-4 text-right hover:bg-paper"
        >
          <span className="block text-[13px] text-text-3">
            After: {eraNumberLabel(next)} · {eraDateLabel(next)}
            <span aria-hidden="true"> →</span>
          </span>
          <span className="mt-1 block font-display text-[22px] leading-tight group-hover:underline">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
