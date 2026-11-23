import Image from "next/image";
import type { Photo } from "@data/photos";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** "Photo: Author · CC BY-SA 4.0 · Wikimedia Commons ↗" — every real photo carries this (Style Guide §03). */
export function PhotoCredit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <span className={`text-[12px] leading-snug text-text-3 ${className}`}>
      Photo: {photo.author} ·{" "}
      {photo.licenceUrl ? (
        <a href={photo.licenceUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 underline underline-offset-2 hover:text-ink">
          {photo.licence}
        </a>
      ) : (
        photo.licence
      )}{" "}
      ·{" "}
      <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 underline underline-offset-2 hover:text-ink">
        Wikimedia Commons
      </a>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </span>
  );
}

/**
 * A photo with its credit and licence line, or the striped placeholder when no
 * cleared photo exists yet. `framed` crops to the box's aspect ratio.
 */
export function CreditedPhoto({
  photo,
  fallbackCaption,
  className = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showCaption = true,
  rounded = "rounded-[4px]",
  credit = true,
}: {
  photo?: Photo;
  fallbackCaption: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  rounded?: string;
  /** false when the photo sits inside a link: render the credit outside it with <PhotoCredit>. */
  credit?: boolean;
}) {
  if (!photo) {
    return <PhotoPlaceholder caption={fallbackCaption} className={`${className} ${rounded}`} />;
  }
  return (
    <figure className="m-0">
      <div className={`relative overflow-hidden bg-placeholder ${rounded} ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />
      </div>
      {(showCaption || credit) && (
        <figcaption className="mt-2">
          {showCaption && <span className="block text-[13px] text-text-2">{photo.caption}</span>}
          {credit && <PhotoCredit photo={photo} />}
        </figcaption>
      )}
    </figure>
  );
}
