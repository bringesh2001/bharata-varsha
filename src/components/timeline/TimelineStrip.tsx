import Link from "next/link";
import type { Era } from "@data/eras";
import { ERA_GROUP_LABELS, type EraGroup } from "@data/eras";
import { eraDateLabel, eraHref } from "@/lib/content/eras";
import { ERA_BG } from "@/lib/ui/era-colors";

/** The home-page timeline: not to scale, each era gets equal room. Scrolls sideways on phones. */
export function TimelineStrip({ eras }: { eras: readonly Era[] }) {
  const groups = Object.keys(ERA_GROUP_LABELS) as EraGroup[];
  return (
    <section aria-labelledby="timeline-heading">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="timeline-heading" className="text-[14px] font-semibold uppercase tracking-[0.12em]">
          The timeline
        </h2>
        <p className="text-[13px] text-text-3">Not to scale — each era gets equal room</p>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <ol className="grid min-w-[880px] grid-cols-12 gap-[3px]">
          {eras.map((era) => (
            <li key={era.id}>
              <Link href={eraHref(era)} className="group block min-h-11">
                <span className={`block h-2.5 ${ERA_BG[era.group]}`} aria-hidden="true" />
                <span className="mt-2 block text-[13px] font-semibold leading-tight group-hover:underline">
                  {era.shortTitle}
                </span>
                <span className="block text-[12px] leading-tight text-text-3">{eraDateLabel(era)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-text-2" aria-label="Colour key">
        {groups.map((g) => (
          <li key={g} className="flex items-center gap-2">
            <span className={`inline-block size-2.5 ${ERA_BG[g]}`} aria-hidden="true" />
            {ERA_GROUP_LABELS[g]}
          </li>
        ))}
      </ul>
    </section>
  );
}
