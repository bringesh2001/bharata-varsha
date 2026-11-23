import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@data/photos";
import { BASEMAP_CREDIT } from "@data/atlas";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Every photo on Bharata Varsha, with its author, licence and source.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Image credits"
        title="Who made the pictures"
        lead="Every photo on this site is freely licensed and comes from Wikimedia Commons. Here is each one, with its author, licence and original file."
      />
      <section className="section border-t border-border bg-paper" aria-labelledby="photos-heading">
        <div className="container-page">
          <h2 id="photos-heading" className="sr-only">
            Photos
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li key={p.id} className="flex flex-col overflow-hidden rounded-[6px] border border-border bg-paper">
                <div className="relative aspect-[4/3] bg-placeholder">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: p.focus ?? "50% 50%" }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 text-[14px]">
                  <p className="text-text-2">{p.caption}</p>
                  <dl className="mt-auto grid grid-cols-[70px_1fr] gap-x-3 gap-y-1 border-t border-divider pt-3">
                    <dt className="text-text-3">Author</dt>
                    <dd>{p.author}</dd>
                    <dt className="text-text-3">Licence</dt>
                    <dd>
                      {p.licenceUrl ? (
                        <a href={p.licenceUrl} target="_blank" rel="noopener noreferrer" className="link">
                          {p.licence}
                        </a>
                      ) : (
                        p.licence
                      )}
                    </dd>
                    <dt className="text-text-3">Source</dt>
                    <dd>
                      <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="link">
                        Wikimedia Commons
                      </a>{" "}
                      <span className="text-text-3">
                        commons.wikimedia.org <span aria-hidden="true">↗</span>
                      </span>
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[48em] text-[15px] text-text-2">
            Photos have been resized for the web; otherwise they are unchanged. Photos under CC BY-SA and the Free Art
            Licence may be reused under the same licence. The Atlas base map is{" "}
            <a href={BASEMAP_CREDIT.url} target="_blank" rel="noopener noreferrer" className="link">
              {BASEMAP_CREDIT.name}
            </a>{" "}
            ({BASEMAP_CREDIT.licence}).
          </p>
        </div>
      </section>
    </>
  );
}
