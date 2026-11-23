import Image from "next/image";
import Link from "next/link";
import type { Era } from "@data/eras";
import { getPhoto } from "@data/photos";
import { eraDateLabel, eraHref, eraNumberLabel } from "@/lib/content/eras";
import { ERA_BORDER_TOP } from "@/lib/ui/era-colors";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { PhotoCredit } from "./CreditedPhoto";

export function EraCard({ era, hasArticle }: { era: Era; hasArticle: boolean }) {
  const photo = getPhoto(era.photoId);
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[6px] border border-border border-t-4 bg-paper ${ERA_BORDER_TOP[era.group]}`}
    >
      {photo ? (
        <div className="relative aspect-[4/3] bg-placeholder">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: photo.focus ?? "50% 50%" }}
          />
        </div>
      ) : (
        <PhotoPlaceholder caption={era.photoCaption} className="aspect-[4/3] rounded-none" />
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[13px] text-text-3">
          {eraNumberLabel(era)} · {eraDateLabel(era)}
        </p>
        <h3 className="font-display text-[24px] leading-[1.1]">
          {/* The whole card is clickable via the stretched link; credit links sit above it. */}
          <Link href={eraHref(era)} className="after:absolute after:inset-0 group-hover:underline">
            {era.title}
          </Link>
        </h3>
        <p className="text-[15px] text-text-2">{era.summary}</p>
        <p className="mt-auto pt-2 text-[13px] text-text-3">
          {hasArticle ? "Era guide · draft" : "Era guide in preparation"}
        </p>
        {photo && <PhotoCredit photo={photo} className="block border-t border-divider pt-2" />}
      </div>
    </article>
  );
}
