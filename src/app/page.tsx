import Link from "next/link";
import { getEras } from "@/lib/content/eras";
import { getEraIdsWithArticles } from "@/lib/content/queries";
import { EraCard } from "@/components/editorial/EraCard";
import { SearchForm } from "@/components/editorial/SearchForm";
import { TimelineStrip } from "@/components/timeline/TimelineStrip";

const TRY_SEARCHES = ["Ashoka", "Pataliputra", "Megasthenes"];

const LEARNING_QUESTIONS = [
  { title: "What happened?", text: "The story of the period in order, with dates marked approximate where they are." },
  { title: "How was it run?", text: "Rulers, officials, taxes and law, and how far power really reached." },
  { title: "How did people live?", text: "Farming, trade, towns, families and faith, not just kings." },
  { title: "What's the evidence?", text: "Inscriptions, texts, digs and coins, and what each can and can't tell us." },
  { title: "What's still debated?", text: "Where historians disagree, what each side argues, and why." },
];

export default async function HomePage() {
  const eras = getEras();
  const withArticles = new Set(await getEraIdsWithArticles());

  return (
    <>
      {/* Hero */}
      <section className="bg-stone pb-16 pt-14 sm:pt-20">
        <div className="container-page">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">5,000 years · 12 eras · one library</p>
              <h1 className="mt-4 font-display text-[clamp(44px,6vw,76px)] leading-[1.02]">
                India&rsquo;s past, sorted into eras you can actually study.
              </h1>
              <p className="mt-6 max-w-[34em] text-[18px] leading-[1.55] text-text-2">
                Clear guides to every period, from the Indus cities to the Republic, with the evidence and sources
                behind each claim.
              </p>
            </div>
            <div>
              <SearchForm />
              <p className="mt-3 flex flex-wrap items-center gap-2 text-[14px] text-text-3">
                Try:
                {TRY_SEARCHES.map((q) => (
                  <Link
                    key={q}
                    href={`/search?q=${encodeURIComponent(q)}`}
                    className="inline-flex min-h-9 items-center rounded-full border border-border-strong px-3 text-ink hover:bg-paper"
                  >
                    {q}
                  </Link>
                ))}
              </p>
            </div>
          </div>
          <div className="mt-14">
            <TimelineStrip eras={eras} />
          </div>
        </div>
      </section>

      {/* Explore by era */}
      <section className="section border-y border-border bg-paper" aria-labelledby="explore-heading">
        <div className="container-page">
          <h2 id="explore-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Explore by era
          </h2>
          <p className="mt-2 text-[17px] text-text-2">
            Start anywhere. Each era page follows the same five questions, so you can compare periods easily.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eras.map((era) => (
              <li key={era.id} className="flex">
                <EraCard era={era} hasArticle={withArticles.has(era.id)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How each era page works */}
      <section className="section bg-stone" aria-labelledby="questions-heading">
        <div className="container-page">
          <h2 id="questions-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Five questions for every era
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {LEARNING_QUESTIONS.map((q) => (
              <li key={q.title} className="border-t-2 border-ink/60 pt-4">
                <h3 className="font-display text-[24px] leading-tight">{q.title}</h3>
                <p className="mt-2 text-[15px] text-text-2">{q.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Beyond the timeline */}
      <section className="section border-t border-border bg-paper" aria-labelledby="beyond-heading">
        <div className="container-page">
          <h2 id="beyond-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            Beyond the timeline
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Link href="/ideas" className="group rounded-[6px] bg-ink p-6 text-on-dark sm:p-8">
              <p className="eyebrow !text-on-dark-accent">Inventions</p>
              <h3 className="mt-2 font-display text-[30px] leading-[1.1] text-paper">
                Born in India, known by other names
              </h3>
              <p className="mt-3 text-[15px]">
                How Indian numerals became &ldquo;Arabic&rdquo;, how jyā became &ldquo;sine&rdquo;, and which claims
                the evidence does and doesn&rsquo;t support.
              </p>
              <p className="mt-5 font-semibold text-paper group-hover:underline">
                See the inventions <span aria-hidden="true">→</span>
              </p>
            </Link>
            <Link href="/lenses" className="group rounded-[6px] border border-border border-t-4 border-t-indigo bg-paper p-6 sm:p-8">
              <p className="eyebrow">Lenses</p>
              <h3 className="mt-2 font-display text-[30px] leading-[1.1]">Eastern lens, western lens</h3>
              <p className="mt-3 text-[15px] text-text-2">
                The big debates about India&rsquo;s past: what each view argues, the evidence it cites, and where they
                truly clash.
              </p>
              <p className="mt-5 font-semibold text-indigo group-hover:underline">
                Explore the debates <span aria-hidden="true">→</span>
              </p>
            </Link>
            <Link href="/connections" className="group rounded-[6px] border border-border border-t-4 border-t-positive bg-paper p-6 sm:p-8">
              <p className="eyebrow">Connections</p>
              <h3 className="mt-2 font-display text-[30px] leading-[1.1]">India and the ancient world</h3>
              <p className="mt-3 text-[15px] text-text-2">
                Mesopotamia, Persia, Greece, Rome, China and Southeast Asia: who met whom, and what they exchanged.
              </p>
              <p className="mt-5 font-semibold text-indigo group-hover:underline">
                See the connections <span aria-hidden="true">→</span>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
