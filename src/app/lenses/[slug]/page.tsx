import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlePage, getListing } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import type { Source } from "@/lib/content/schema";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StatusNotice } from "@/components/editorial/StatusNotice";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { SourceList } from "@/components/editorial/SourceList";
import { SourceLink } from "@/components/editorial/SourceLink";
import { EraLinks } from "@/components/editorial/EraLinks";
import { Pill } from "@/components/editorial/Badge";
import { ReadLikeAHistorian } from "@/components/editorial/LensesExtras";

export async function generateStaticParams() {
  return (await getListing("lens")).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lenses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getArticlePage("lens", slug);
  if (!page) return { title: "Debate not found" };
  const fm = page.article.frontmatter;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: articleHref(fm) },
    openGraph: { title: fm.title, description: fm.summary, type: "article", url: articleHref(fm) },
  };
}

const VIEW_STRIPES = ["border-t-indigo", "border-t-madder", "border-t-positive", "border-t-plum"];

export default async function LensPage({ params }: PageProps<"/lenses/[slug]">) {
  const { slug } = await params;
  const page = await getArticlePage("lens", slug);
  if (!page || !page.article.frontmatter.lens) notFound();
  const debates = await getListing("lens");
  const { article, sources } = page;
  const fm = article.frontmatter;
  const lens = fm.lens!;
  const byId = new Map<string, Source>(sources.map((s) => [s.id, s]));

  return (
    <>
      <section className="bg-stone pb-6 pt-8">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Lenses", href: "/lenses" }, { label: fm.title }]} />
        </div>
      </section>

      <section className="border-b border-border bg-paper pb-16 pt-10">
        <div className="container-page grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <nav aria-label="The debates" className="lg:sticky lg:top-6 lg:self-start">
            <h2 className="font-display text-[30px] leading-tight">The debates</h2>
            <ul className="mt-4 space-y-2">
              {debates.map((d) => {
                const current = d.slug === fm.slug;
                return (
                  <li key={d.id}>
                    <Link
                      href={articleHref(d)}
                      aria-current={current ? "page" : undefined}
                      className={`block rounded-[6px] border p-3 ${
                        current ? "border-ink bg-ink text-paper" : "border-border bg-paper hover:border-border-strong"
                      }`}
                    >
                      <span className={`block text-[12px] ${current ? "text-on-dark-muted" : "text-text-3"}`}>
                        {d.lens?.periodLabel}
                      </span>
                      <span className="mt-0.5 block text-[15px] font-semibold leading-snug">{d.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[14px]">
              <Link href="/lenses" className="link">
                All schools of thought
              </Link>
            </p>
          </nav>

          <article className="min-w-0">
            <p className="eyebrow">{lens.periodLabel}</p>
            <h1 className="mt-2 font-display text-[clamp(36px,4.5vw,52px)] leading-[1.05]">{fm.title}</h1>
            <p className="mt-4 max-w-[44em] text-[17px] text-text-2">{fm.summary}</p>
            <div className="mt-6">
              <StatusNotice status={fm.status} updatedAt={fm.updatedAt} />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              {lens.views.map((v, i) => (
                <section
                  key={v.name}
                  aria-labelledby={`view-${i}`}
                  className={`flex flex-col rounded-[6px] border border-border border-t-4 bg-stone p-5 ${VIEW_STRIPES[i % VIEW_STRIPES.length]}`}
                >
                  {v.oftenCalled && (
                    <p>
                      <Pill>Often called: {v.oftenCalled}</Pill>
                    </p>
                  )}
                  <h2 id={`view-${i}`} className="mt-3 text-[21px] font-semibold">
                    {v.name}
                  </h2>
                  <p className="mt-2 text-[15px]">{v.summary}</p>
                  <h3 className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">
                    Evidence they point to
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] text-text-2">
                    {v.evidence.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[14px]">
                    <span className="font-semibold">Held by:</span> <span className="text-text-2">{v.heldBy}</span>
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">
                      The strongest case for this view
                    </p>
                    {v.sourceIds.map((id) => {
                      const s = byId.get(id);
                      return s ? <SourceLink key={id} source={s} /> : null;
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-[6px] border-2 border-negative/70 p-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-negative">Where they clash</h2>
                <p className="mt-2 text-[15px]">{lens.clash}</p>
              </section>
              <section className="rounded-[6px] border-2 border-ink p-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em]">Where scholarship stands now</h2>
                <p className="mt-2 text-[15px]">{lens.scholarshipNow}</p>
                {lens.scholarshipSourceIds.length > 0 && (
                  <p className="mt-2 text-[13px] text-text-3">
                    See:{" "}
                    {lens.scholarshipSourceIds.map((id, i) => (
                      <span key={id}>
                        {i > 0 && "; "}
                        <a href={`#source-${id}`} className="link">
                          {byId.get(id)?.author.replace(/ \(.*\)/, "")}, {byId.get(id)?.year}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </section>
            </div>

            <div className="mt-12 max-w-[720px]">
              <ArticleBody body={article.body} sources={sources} />
            </div>

            <div className="mt-10 border-t border-divider pt-6">
              <EraLinks eraIds={fm.eraIds} />
            </div>
          </article>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container-page max-w-[960px]">
          <SourceList sources={sources} />
        </div>
      </section>

      <ReadLikeAHistorian />
    </>
  );
}
