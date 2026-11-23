import Link from "next/link";
import type { Era } from "@data/eras";
import { eraHref } from "@/lib/content/eras";
import { ERA_BG } from "@/lib/ui/era-colors";

/** Thin twelve-segment bar at the top of an era page, showing where this era sits. */
export function EraProgress({ eras, currentId }: { eras: readonly Era[]; currentId: string }) {
  return (
    <nav aria-label="All eras">
      <ol className="grid grid-cols-12 gap-[3px]">
        {eras.map((era) => {
          const current = era.id === currentId;
          return (
            <li key={era.id}>
              <Link
                href={eraHref(era)}
                aria-current={current ? "page" : undefined}
                aria-label={`Era ${era.order}: ${era.title}`}
                title={era.title}
                className="flex h-6 items-center"
              >
                <span className={`block h-1 w-full ${current ? ERA_BG[era.group] : "bg-border"}`} />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
