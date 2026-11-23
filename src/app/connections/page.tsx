import type { Metadata } from "next";
import Link from "next/link";
import { sharedRoots } from "@data/shared-roots";
import { getListing, getSources } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { PageHero } from "@/components/editorial/PageHero";
import { ContactTimeline } from "@/components/editorial/ContactTimeline";
import { PhotoPlaceholder } from "@/components/editorial/PhotoPlaceholder";
import { Pill } from "@/components/editorial/Badge";
import { shortCitation } from "@/lib/sources/format";
import { formatRange } from "@/lib/dates/format";

export const metadata: Metadata = {
  title: "Connections — India and the ancient world",
  description: "Trade, travel and the exchange of ideas between India and other regions, linked to eras and sources.",
  alternates: { canonical: "/connections" },
};

export default async function ConnectionsPage() {
  const connections = await getListing("connection");
  const rootSources = await getSources([...new Set(sharedRoots.flatMap((r) => r.sourceIds))]);
  const sourceById = new Map(rootSources.map((s) => [s.id, s]));

  return (
    <>
      <PageHero
        eyebrow="Connections"
        title="India was never alone: links to the ancient world"
        lead="Trade with Mesopotamia over 4,000 years ago, Roman ships riding the monsoon. See who met whom, what they shared, and where they differed."
      >
        <section aria-labelledby="contact-heading" className="mt-12">
          <h2 id="contact-heading" className="text-[14px] font-semibold uppercase tracking-[0.12em]">
            When contact happened
          </h2>
          <p className="mb-4 mt-1 text-[14px] text-text-3">Pick a row to see the details.</p>
          <ContactTimeline items={connections} />
        </section>
      </PageHero>

      <section className="section border-y border-border bg-paper" aria-labelledby="stories-heading">
        <div className="container-page">
          <h2 id="stories-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            The stories
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {connections.map((c) => (
              <li key={c.id} className="flex">
                <Link
                  href={articleHref(c)}
                  className="group flex w-full flex-col overflow-hidden rounded-[6px] border border-border bg-paper hover:border-border-strong"
                >
                  {c.connection?.photoCaption && (
                    <PhotoPlaceholder caption={c.connection.photoCaption} className="aspect-[16/7] rounded-none" />
                  )}
                  <span className="flex flex-1 flex-col p-5">
                    <span className="eyebrow">
                      {c.connection?.contactPeriods.map((p) => formatRange(p.start, p.end, "approximate")).join(", ")}
                    </span>
                    <span className="mt-2 font-display text-[30px] leading-[1.1] group-hover:underline">{c.title}</span>
                    <span className="mt-2 text-[15px] text-text-2">{c.summary}</span>
                    <span className="mt-4 font-semibold text-indigo">
                      See the connection <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The page's one Ink section */}
      <section className="section bg-ink text-on-dark" aria-labelledby="roots-heading">
        <div className="container-page">
          <h2 id="roots-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1] text-paper">
            Shared roots and echoes
          </h2>
          <p className="mt-2 text-[16px] text-on-dark-muted">
            Some links are proven by language; others are similar stories whose connection is still argued.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {sharedRoots.map((r) => (
              <li key={r.id} className="rounded-[6px] border border-on-dark-line p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[19px] font-semibold text-paper">{r.title}</h3>
                  <Pill tone="dark">{r.status === "proven" ? "Proven link" : "Debated"}</Pill>
                </div>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[14px]">
                  {r.rows.map((row) => (
                    <div key={row.label} className="contents">
                      <dt className="text-on-dark-muted">{row.label}</dt>
                      <dd className="font-semibold text-paper">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13px] text-on-dark-muted">
                  Source:{" "}
                  {r.sourceIds.map((id, i) => {
                    const s = sourceById.get(id);
                    if (!s) return null;
                    return (
                      <span key={id}>
                        {i > 0 && "; "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-4">
                          {shortCitation(s)}
                        </a>{" "}
                        <span>{s.siteName}</span> <span aria-hidden="true">↗</span>
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
