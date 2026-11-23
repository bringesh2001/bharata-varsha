import type { Metadata } from "next";
import Link from "next/link";
import { schools } from "@data/schools";
import { BeforeYouStart, ReadLikeAHistorian } from "@/components/editorial/LensesExtras";
import { getListing } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  title: "Lenses — how historians disagree",
  description: "The big debates about India's past: each view, the evidence it cites, and where the evidence stands.",
  alternates: { canonical: "/lenses" },
};

export default async function LensesPage() {
  const debates = await getListing("lens");
  return (
    <>
      <PageHero
        eyebrow="Lenses"
        title="Eastern lens, western lens"
        lead="The same past, told in different ways. Here are the big debates, the evidence each side points to, and where they really disagree."
        aside={<BeforeYouStart />}
      >
        <section aria-labelledby="schools-heading" className="mt-14">
          <h2 id="schools-heading" className="text-[14px] font-semibold uppercase tracking-[0.12em]">
            Schools of thought, oldest first
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {schools.map((s) => (
              <li key={s.id} className={`rounded-[6px] border border-border border-t-4 bg-paper p-4 ${s.color}`}>
                <p className="text-[13px] text-text-3">{s.period}</p>
                <h3 className="mt-1 text-[17px] font-semibold leading-snug">{s.name}</h3>
                <p className="mt-2 text-[14px] text-text-2">{s.summary}</p>
                <p className="mt-3 text-[13px] text-text-3">{s.people}</p>
              </li>
            ))}
          </ol>
        </section>
      </PageHero>

      <section className="section border-y border-border bg-paper" aria-labelledby="debates-heading">
        <div className="container-page">
          <h2 id="debates-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            The debates
          </h2>
          <p className="mt-2 text-[17px] text-text-2">
            Each debate shows both views side by side. More debates will be added as they are written and reviewed.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {debates.map((d) => (
              <li key={d.id} className="flex">
                <Link
                  href={articleHref(d)}
                  className="group flex w-full flex-col rounded-[6px] border border-border border-t-4 border-t-ink bg-paper p-6 hover:border-border-strong"
                >
                  <span className="eyebrow">{d.lens?.periodLabel}</span>
                  <span className="mt-2 font-display text-[28px] leading-[1.1] group-hover:underline">{d.title}</span>
                  <span className="mt-3 text-[15px] text-text-2">{d.summary}</span>
                  <span className="mt-4 text-[14px] text-text-3">
                    {d.lens?.views.map((v) => v.name).join(" · ")}
                  </span>
                  <span className="mt-4 font-semibold text-indigo">
                    Read the debate <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReadLikeAHistorian />
    </>
  );
}
