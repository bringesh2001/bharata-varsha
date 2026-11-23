import type { Metadata } from "next";
import Link from "next/link";
import { inventions } from "@data/inventions";
import { mythChecks } from "@data/myths";
import { wordJourneys } from "@data/words";
import { getListing, getSources } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { PageHero } from "@/components/editorial/PageHero";
import { InventionsExplorer } from "@/components/editorial/InventionsExplorer";
import { VerdictBadge } from "@/components/editorial/Badge";
import { NumeralScripts } from "@/components/editorial/NumeralScripts";
import { shortCitation } from "@/lib/sources/format";

export const metadata: Metadata = {
  title: "Inventions & ideas from India",
  description:
    "Mathematics, medicine, materials and games: what began in India, how it travelled, and how strong the evidence is.",
  alternates: { canonical: "/ideas" },
};

export default async function IdeasPage() {
  const stories = await getListing("idea");
  const featured = stories[0];
  const ids = [...new Set([...inventions.flatMap((i) => i.sourceIds), ...mythChecks.flatMap((m) => m.sourceIds)])];
  const sources = Object.fromEntries((await getSources(ids)).map((s) => [s.id, s]));

  return (
    <>
      <PageHero
        eyebrow="Inventions & ideas"
        title="Born in India, known by other names"
        lead="Numbers, sine, sugar, chess, shampoo. Many things the world uses every day started in India and travelled through Persia, the Arab world and Europe, often picking up new names on the way."
      />

      {/* Featured story — the page's one Ink section */}
      {featured && (
        <section className="section bg-ink text-on-dark" aria-labelledby="featured-heading">
          <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Featured story</p>
              <h2 id="featured-heading" className="mt-3 font-display text-[clamp(36px,4.5vw,52px)] leading-[1.05] text-paper">
                {featured.title}
              </h2>
              <p className="mt-4 text-[17px]">{featured.summary}</p>
              <p className="mt-6">
                <Link
                  href={articleHref(featured)}
                  className="inline-flex min-h-11 items-center rounded-[4px] bg-paper px-5 font-semibold text-ink hover:bg-stone"
                >
                  Read the story <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </p>
            </div>
            <NumeralScripts />
          </div>
        </section>
      )}

      <section className="section bg-stone" aria-labelledby="words-heading">
        <div className="container-page">
          <h2 id="words-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Lost in translation
          </h2>
          <p className="mt-2 text-[17px] text-text-2">Follow the words and you can follow the ideas.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {wordJourneys.map((w) => (
              <li key={w.word} className="flex flex-col rounded-[6px] border border-border bg-paper p-5">
                <h3 className="font-display text-[30px] leading-none">{w.word}</h3>
                <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label={`How the word ${w.word} travelled`}>
                  {w.steps.map((s, i) => (
                    <li key={s.form + s.language} className="flex items-center gap-2">
                      <span className="rounded-[4px] bg-stone px-2.5 py-1.5">
                        <span className="block text-[15px] font-semibold leading-tight">{s.form}</span>
                        <span className="block text-[12px] text-text-3">{s.language}</span>
                      </span>
                      {i < w.steps.length - 1 && (
                        <span aria-hidden="true" className="text-madder">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[14px] text-text-2">{w.note}</p>
                <p className="mt-auto pt-4 text-[14px]">
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                    Word history
                  </a>{" "}
                  <span className="text-text-3">
                    {w.siteName} <span aria-hidden="true">↗</span>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-y border-border bg-paper" aria-labelledby="inventions-heading">
        <div className="container-page">
          <h2 id="inventions-heading" className="mb-8 font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Explore the inventions
          </h2>
          <InventionsExplorer items={inventions} sources={sources} />
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="myths-heading">
        <div className="container-page">
          <h2 id="myths-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Myth or fact?
          </h2>
          <p className="mt-2 max-w-[40em] text-[17px] text-text-2">
            Real achievements don&rsquo;t need exaggeration. Here are claims you&rsquo;ll see online, checked against the
            evidence.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {mythChecks.map((m) => (
              <li key={m.id} className="flex flex-col rounded-[6px] border border-border bg-paper p-5">
                <h3 className="text-[18px] font-semibold leading-snug">&ldquo;{m.claim.replace(/\.$/, "")}.&rdquo;</h3>
                <p className="mt-3">
                  <VerdictBadge verdict={m.verdict} />
                </p>
                <p className="mt-3 text-[14px] text-text-2">{m.explanation}</p>
                <p className="mt-auto pt-4 text-[14px]">
                  <span className="font-semibold">See the evidence: </span>
                  {m.sourceIds.map((id, i) => {
                    const s = sources[id];
                    if (!s) return null;
                    return (
                      <span key={id}>
                        {i > 0 && "; "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                          {shortCitation(s)}
                        </a>{" "}
                        <span className="text-text-3">
                          {s.siteName} <span aria-hidden="true">↗</span>
                        </span>
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] text-text-3">
            Every entry on this page is a draft awaiting editorial review against its sources.
          </p>
        </div>
      </section>
    </>
  );
}
