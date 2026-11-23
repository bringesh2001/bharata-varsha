import Link from "next/link";
import { eras } from "@data/eras";
import { eraDateLabel, eraHref } from "@/lib/content/eras";

/** "Go to the era →" links for an article's eraIds. */
export function EraLinks({ eraIds, label = "Go to the era" }: { eraIds: string[]; label?: string }) {
  const list = eras.filter((e) => eraIds.includes(e.id));
  if (list.length === 0) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px]">
      <span className="font-semibold">{label}:</span>
      {list.map((e) => (
        <Link key={e.id} href={eraHref(e)} className="link inline-flex min-h-11 items-center">
          {e.title} <span className="ml-1 text-text-3 no-underline">({eraDateLabel(e)})</span>
          <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      ))}
    </p>
  );
}
