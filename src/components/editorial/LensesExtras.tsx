import { readingQuestions } from "@data/schools";

export function BeforeYouStart() {
  return (
    <div className="rounded-[6px] border border-border bg-paper p-5">
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-3">Before you start</p>
      <p className="mt-2 text-[15px] text-text-2">
        &ldquo;Eastern&rdquo; and &ldquo;western&rdquo; are shorthand, not passports. Many Indian historians hold views
        called western, and some western scholars defend views called eastern. We label each view by its argument, show
        the evidence it cites, and say plainly where the evidence is strong.
      </p>
    </div>
  );
}

export function ReadLikeAHistorian() {
  return (
    <section className="section bg-stone" aria-labelledby="historian-heading">
      <div className="container-page">
        <h2 id="historian-heading" className="font-display text-[clamp(32px,4vw,40px)] leading-[1.1]">
          How to read any history like a historian
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {readingQuestions.map((q) => (
            <li key={q.title} className="border-t-2 border-ink/60 pt-4">
              <h3 className="text-[17px] font-semibold">{q.title}</h3>
              <p className="mt-2 text-[15px] text-text-2">{q.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
