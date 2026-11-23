import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlePage, getListing } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { formatRange } from "@/lib/dates/format";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StatusNotice } from "@/components/editorial/StatusNotice";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { SourceList } from "@/components/editorial/SourceList";
import { EraLinks } from "@/components/editorial/EraLinks";
import { CreditedPhoto } from "@/components/editorial/CreditedPhoto";
import { getPhoto } from "@data/photos";
import { ContactTimeline } from "@/components/editorial/ContactTimeline";

export async function generateStaticParams() {
  return (await getListing("connection")).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/connections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getArticlePage("connection", slug);
  if (!page) return { title: "Connection not found" };
  const fm = page.article.frontmatter;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: articleHref(fm) },
    openGraph: { title: fm.title, description: fm.summary, type: "article", url: articleHref(fm) },
  };
}

const BOXES = [
  { key: "parallels", label: "Parallels", cls: "text-positive" },
  { key: "differences", label: "Differences", cls: "text-indigo" },
  { key: "stillDebated", label: "Still debated", cls: "text-negative" },
] as const;

export default async function ConnectionPage({ params }: PageProps<"/connections/[slug]">) {
  const { slug } = await params;
  const page = await getArticlePage("connection", slug);
  if (!page || !page.article.frontmatter.connection) notFound();
  const all = await getListing("connection");
  const { article, sources } = page;
  const fm = article.frontmatter;
  const c = fm.connection!;

  return (
    <>
      <section className="bg-stone pb-10 pt-8">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Connections", href: "/connections" }, { label: fm.title }]} />
          <nav aria-label="Regions" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {all.map((x) => {
                const current = x.slug === fm.slug;
                return (
                  <li key={x.id}>
                    <Link
                      href={articleHref(x)}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[15px] font-semibold ${
                        current ? "border-ink bg-ink text-paper" : "border-border-strong hover:bg-paper"
                      }`}
                    >
                      {x.connection?.region}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <section className="border-y border-border bg-paper py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div>
            {fm.dateStart !== undefined && fm.dateEnd !== undefined && (
              <p className="eyebrow">{formatRange(fm.dateStart, fm.dateEnd, fm.datePrecision ?? "approximate")}</p>
            )}
            <h1 className="mt-2 font-display text-[clamp(40px,5vw,56px)] leading-[1.02]">{fm.title}</h1>
            <p className="mt-4 text-[17px] text-text-2">{fm.summary}</p>
            {c.photoCaption && (
              <div className="mt-6">
                <CreditedPhoto photo={getPhoto(c.photoId)} fallbackCaption={c.photoCaption} className="aspect-[4/3]" sizes="340px" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <StatusNotice status={fm.status} updatedAt={fm.updatedAt} />
            <h2 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em]">How they met</h2>
            <ol className="mt-3 divide-y divide-divider border-y border-divider">
              {c.events.map((e) => (
                <li key={e.date + e.text} className="grid gap-2 py-3 sm:grid-cols-[150px_1fr_auto] sm:gap-4">
                  <span className="text-[14px] font-semibold text-madder">{e.date}</span>
                  <span className="text-[15px]">{e.text}</span>
                  <a href={`#source-${e.sourceId}`} className="link self-start text-[14px]">
                    Evidence
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {BOXES.map((b) =>
                c[b.key].length > 0 ? (
                  <section key={b.key} className="rounded-[6px] bg-stone p-4">
                    <h3 className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${b.cls}`}>{b.label}</h3>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px]">
                      {c[b.key].map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </section>
                ) : null,
              )}
            </div>

            <div className="mt-12 max-w-[720px]">
              <ArticleBody body={article.body} sources={sources} />
            </div>

            <div className="mt-10 space-y-2 border-t border-divider pt-6">
              <EraLinks eraIds={fm.eraIds} />
              <p className="text-[15px]">
                <Link href="/atlas" className="link">
                  See it on the Atlas <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container-page max-w-[960px] space-y-14">
          <ContactTimeline items={all} currentSlug={fm.slug} />
          <SourceList sources={sources} />
        </div>
      </section>
    </>
  );
}
