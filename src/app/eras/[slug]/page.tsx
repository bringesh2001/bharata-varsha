import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  eraDateLabel,
  eraGroupLabel,
  eraHref,
  eraNumberLabel,
  getAdjacentEras,
  getEraBySlug,
  getEras,
} from "@/lib/content/eras";
import { getEraPageContent } from "@/lib/content/queries";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EraProgress } from "@/components/timeline/EraProgress";
import { PhotoPlaceholder } from "@/components/editorial/PhotoPlaceholder";
import { StatusNotice } from "@/components/editorial/StatusNotice";
import { TableOfContents } from "@/components/editorial/TableOfContents";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { RulersChart } from "@/components/editorial/RulersChart";
import { SourceList } from "@/components/editorial/SourceList";
import { PreviousNext } from "@/components/editorial/PreviousNext";

export function generateStaticParams() {
  return getEras().map((era) => ({ slug: era.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eras/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const era = getEraBySlug(slug);
  if (!era) return { title: "Era not found" };
  const content = await getEraPageContent(era.id);
  const description = content?.article.frontmatter.summary ?? era.summary;
  return {
    title: `${era.title} (${eraDateLabel(era)})`,
    description,
    alternates: { canonical: eraHref(era) },
    openGraph: { title: era.title, description, url: eraHref(era), type: "article" },
  };
}

export default async function EraPage({ params }: PageProps<"/eras/[slug]">) {
  const { slug } = await params;
  const era = getEraBySlug(slug);
  if (!era) notFound();

  const eras = getEras();
  const { previous, next } = getAdjacentEras(era);
  const content = await getEraPageContent(era.id);
  const fm = content?.article.frontmatter;

  return (
    <>
      {/* Hero */}
      <section className="bg-stone pb-14 pt-6">
        <div className="container-page">
          <EraProgress eras={eras} currentId={era.id} />
          <div className="mt-4">
            <Breadcrumb items={[{ label: "Eras", href: "/" }, { label: eraGroupLabel(era) }, { label: era.title }]} />
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">
                {eraNumberLabel(era)} · {eraDateLabel(era)}
              </p>
              <h1 className="mt-3 font-display text-[clamp(44px,6vw,76px)] leading-[1.02]">{era.title}</h1>
              <p className="mt-5 max-w-[36em] text-[18px] leading-[1.55] text-text-2">{fm?.summary ?? era.summary}</p>
              {fm && fm.keyFacts.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
                  {fm.keyFacts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[12px] uppercase tracking-[0.12em] text-text-3">{f.label}</dt>
                      <dd className="mt-0.5 font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <figure>
              <PhotoPlaceholder caption={era.photoCaption} className="aspect-[5/4]" />
              <figcaption className="mt-2 text-[13px] text-text-3">
                {fm?.photoCredit ?? "Photo to come. Every photo will carry its source and licence here."}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {content && fm ? (
        <>
          {/* Article */}
          <section className="border-y border-border bg-paper py-14 sm:py-20">
            <div className="container-page">
              <StatusNotice status={fm.status} updatedAt={fm.updatedAt} />
              <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,720px)]">
                <aside>
                  <TableOfContents
                    headings={content.article.headings}
                    extra={[
                      ...(fm.rulers.length ? [{ id: "at-a-glance", text: "The era at a glance" }] : []),
                      { id: "sources", text: "Sources and further reading" },
                    ]}
                  />
                </aside>
                <div className="min-w-0">
                  {fm.readingMinutes && (
                    <p className="mb-6 text-[14px] text-text-3">
                      About {fm.readingMinutes} min read · {content.sources.length} sources
                    </p>
                  )}
                  <ArticleBody body={content.article.body} sources={content.sources} />
                </div>
              </div>
            </div>
          </section>

          {/* The era at a glance — the page's one Ink section */}
          {fm.rulers.length > 0 && fm.dateStart !== undefined && fm.dateEnd !== undefined && (
            <section id="at-a-glance" className="section scroll-mt-6 bg-ink text-on-dark" aria-labelledby="glance-heading">
              <div className="container-page">
                <h2 id="glance-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1] text-paper">
                  The era at a glance
                </h2>
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  <RulersChart
                    rulers={fm.rulers}
                    start={fm.dateStart}
                    end={fm.dateEnd}
                    title={`Rulers, ${eraDateLabel(era)}`}
                    note={fm.rulersNote}
                  />
                  <div className="flex flex-col justify-between gap-6 rounded-[6px] border border-on-dark-line p-5">
                    <div>
                      <p className="text-[15px] font-semibold text-paper">Where it happened</p>
                      <p className="mt-2 text-[15px]">
                        A map for this era will appear here once the Atlas is built from vetted, credited boundary
                        data. Until then, no borders are drawn from guesswork.
                      </p>
                    </div>
                    <Link href="/atlas" className="font-semibold text-paper underline underline-offset-4">
                      About the Atlas <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="section bg-stone">
            <div className="container-page max-w-[960px]">
              <SourceList sources={content.sources} />
            </div>
          </section>
        </>
      ) : (
        <section className="section border-y border-border bg-paper" aria-labelledby="in-prep-heading">
          <div className="container-page max-w-[760px]">
            <p className="eyebrow">In preparation</p>
            <h2 id="in-prep-heading" className="mt-2 font-display text-[clamp(32px,4vw,40px)] leading-[1.1]">
              This era guide is being written
            </h2>
            <p className="mt-4 text-[17px] text-text-2">
              Like every era page, it will answer five questions: what happened, how it was run, how people lived, what
              evidence we have, and what is still debated, with numbered sources for each claim.
            </p>
            <p className="mt-6">
              <Link href="/eras/mauryan-empire" className="link font-semibold">
                See a finished example: the Mauryan Empire <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>
      )}

      <div className="border-t-2 border-ink bg-stone py-12">
        <div className="container-page">
          <PreviousNext previous={previous} next={next} />
        </div>
      </div>
    </>
  );
}
