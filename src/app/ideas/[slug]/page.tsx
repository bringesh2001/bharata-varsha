import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlePage, getListing } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { formatRange } from "@/lib/dates/format";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StatusNotice } from "@/components/editorial/StatusNotice";
import { TableOfContents } from "@/components/editorial/TableOfContents";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { SourceList } from "@/components/editorial/SourceList";
import { EraLinks } from "@/components/editorial/EraLinks";
import { NumeralScripts } from "@/components/editorial/NumeralScripts";

export async function generateStaticParams() {
  return (await getListing("idea")).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getArticlePage("idea", slug);
  if (!page) return { title: "Story not found" };
  const fm = page.article.frontmatter;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: articleHref(fm) },
    openGraph: { title: fm.title, description: fm.summary, type: "article", url: articleHref(fm) },
  };
}

export default async function IdeaPage({ params }: PageProps<"/ideas/[slug]">) {
  const { slug } = await params;
  const page = await getArticlePage("idea", slug);
  if (!page) notFound();
  const { article, sources } = page;
  const fm = article.frontmatter;

  return (
    <>
      <section className="bg-ink pb-16 pt-8 text-on-dark">
        <div className="container-page">
          <Breadcrumb dark items={[{ label: "Inventions & ideas", href: "/ideas" }, { label: fm.title }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">
                Story
                {fm.dateStart !== undefined && fm.dateEnd !== undefined
                  ? ` · ${formatRange(fm.dateStart, fm.dateEnd, fm.datePrecision ?? "approximate")}`
                  : ""}
              </p>
              <h1 className="mt-3 font-display text-[clamp(40px,5.5vw,68px)] leading-[1.02] text-paper">{fm.title}</h1>
              <p className="mt-5 text-[18px] leading-[1.55]">{fm.summary}</p>
            </div>
            {fm.topicIds.includes("place-value") && <NumeralScripts />}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper py-14">
        <div className="container-page">
          <StatusNotice status={fm.status} updatedAt={fm.updatedAt} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,720px)]">
            <aside>
              <TableOfContents headings={article.headings} extra={[{ id: "sources", text: "Sources and further reading" }]} />
            </aside>
            <div className="min-w-0">
              <ArticleBody body={article.body} sources={sources} />
              <div className="mt-10 border-t border-divider pt-6">
                <EraLinks eraIds={fm.eraIds} label="Eras in this story" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container-page max-w-[960px]">
          <SourceList sources={sources} />
        </div>
      </section>
    </>
  );
}
