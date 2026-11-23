import type { Metadata } from "next";
import { BASEMAP_CREDIT, places, powers } from "@data/atlas";
import { BORDER_SOURCE } from "@/lib/atlas";
import { PageHero } from "@/components/editorial/PageHero";
import { AtlasExplorer } from "@/components/atlas/AtlasExplorer";

export const metadata: Metadata = {
  title: "Atlas — who ruled where, and when",
  description:
    "Move through 2,500 years of South Asian history: which powers held which regions, where their capitals were, and who overlapped with whom.",
  alternates: { canonical: "/atlas" },
};

export default function AtlasPage() {
  return (
    <>
      <PageHero
        eyebrow="Atlas"
        title="Who ruled where, and when"
        lead="Drag the slider or press play to watch powers rise and fall across the subcontinent, 600 BCE to 1947."
      />
      <section className="border-y border-border bg-stone pb-20">
        <div className="container-page">
          <AtlasExplorer initialYear={-250} />
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="about-map-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="about-map-heading" className="font-display text-[clamp(30px,3.6vw,40px)] leading-[1.1]">
              About this map
            </h2>
            <div className="mt-4 space-y-3 text-[16px] text-text-2">
              <p>
                <strong className="text-ink">How to read the borders.</strong> Pre-modern states rarely had fixed
                borders: power faded with distance, and many areas paid tribute rather than being ruled directly. The
                shaded areas are one scholarly reconstruction, from the Cliopatria dataset, and are approximate. Where
                Cliopatria has no border for a power in a given year, only its capital is shown.
              </p>
              <p>
                <strong className="text-ink">How to read the regions.</strong> The six regions are deliberately broad.
                A power is listed in a region if it held a large part of it at its height, not throughout its life.
              </p>
              <p>
                <strong className="text-ink">Dates.</strong> Start and end dates are approximate and some are disputed;
                they mark when a power was a major force, not the first or last mention of a ruling family.
              </p>
            </div>
          </div>
          <div className="rounded-[6px] border border-border p-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-3">Provenance</h3>
            <dl className="mt-3 space-y-3 text-[15px]">
              <div>
                <dt className="font-semibold">Base map</dt>
                <dd className="text-text-2">
                  <a href={BASEMAP_CREDIT.url} target="_blank" rel="noopener noreferrer" className="link">
                    {BASEMAP_CREDIT.name}
                  </a>{" "}
                  <span className="text-text-3">
                    {BASEMAP_CREDIT.siteName} <span aria-hidden="true">↗</span>
                  </span>
                  . Licence: {BASEMAP_CREDIT.licence}. Modern coastlines and rivers; ancient coasts and river courses
                  differed.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Borders</dt>
                <dd className="text-text-2">
                  <a href={BORDER_SOURCE.url} target="_blank" rel="noopener noreferrer" className="link">
                    Cliopatria
                  </a>{" "}
                  <span className="text-text-3">
                    github.com <span aria-hidden="true">↗</span>
                  </span>
                  , release {BORDER_SOURCE.release}, from the Seshat Global History Databank (J. S. Bennett and
                  others, <em>Scientific Data</em>, 2025). Licence:{" "}
                  <a href={BORDER_SOURCE.licenceUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {BORDER_SOURCE.licence}
                  </a>
                  . Changes made for this site: {BORDER_SOURCE.changes} Cliopatria&rsquo;s own years are used for each
                  border, so they can differ slightly from the dates in our list.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Powers and dates ({powers.length})</dt>
                <dd className="text-text-2">
                  Compiled for this site from conventional dates in survey histories. Draft: not yet checked line by line
                  against a reference atlas. The planned check is Joseph E. Schwartzberg (ed.), <em>A Historical Atlas
                  of South Asia</em> (University of Chicago Press, 1978).
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Capitals ({places.length})</dt>
                <dd className="text-text-2">
                  Placed at the modern town or site, to about one kilometre. Several powers moved capital; the main ones
                  are shown.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
