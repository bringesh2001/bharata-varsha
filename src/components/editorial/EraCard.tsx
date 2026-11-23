import Link from "next/link";
import type { Era } from "@data/eras";
import { eraDateLabel, eraHref, eraNumberLabel } from "@/lib/content/eras";
import { ERA_BORDER_TOP } from "@/lib/ui/era-colors";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export function EraCard({ era, hasArticle }: { era: Era; hasArticle: boolean }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[6px] border border-border border-t-4 bg-paper ${ERA_BORDER_TOP[era.group]}`}
    >
      <PhotoPlaceholder caption={era.photoCaption} className="aspect-[4/3] rounded-none" />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[13px] text-text-3">
          {eraNumberLabel(era)} · {eraDateLabel(era)}
        </p>
        <h3 className="font-display text-[24px] leading-[1.1]">
          {/* The whole card is clickable via the stretched link. */}
          <Link href={eraHref(era)} className="after:absolute after:inset-0 group-hover:underline">
            {era.title}
          </Link>
        </h3>
        <p className="text-[15px] text-text-2">{era.summary}</p>
        <p className="mt-auto pt-2 text-[13px] text-text-3">
          {hasArticle ? "Era guide · draft" : "Era guide in preparation"}
        </p>
      </div>
    </article>
  );
}
