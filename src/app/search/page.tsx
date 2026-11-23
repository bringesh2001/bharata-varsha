import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getSearchIndex } from "@/lib/content/queries";
import { searchDocs } from "@/lib/search/search";
import { SearchForm } from "@/components/editorial/SearchForm";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";

  return (
    <>
      <div className="max-w-[640px]">
        <SearchForm defaultValue={query} id="search-page-input" />
      </div>
      {query && <Hits query={query} />}
    </>
  );
}

async function Hits({ query }: { query: string }) {
  const results = searchDocs(await getSearchIndex(), query);
  return (
    <section aria-live="polite" className="mt-10">
      <p className="text-[15px] text-text-3">
        {results.length === 0
          ? `No results for “${query}”.`
          : `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`}
      </p>
      {results.length === 0 ? (
        <p className="mt-4 text-[16px] text-text-2">
          Only a few guides are written so far. Try an era name, or{" "}
          <Link href="/" className="link">
            browse all twelve eras
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-divider rounded-[6px] border border-border bg-paper">
          {results.map((r) => {
            const external = r.href.startsWith("http");
            return (
              <li key={r.href + r.title}>
                {external ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="block p-4 hover:bg-stone">
                    <span className="block text-[13px] text-text-3">{r.kind}</span>
                    <span className="mt-0.5 block font-semibold">
                      {r.title}
                      <span className="ml-1 font-normal text-text-3">
                        {new URL(r.href).hostname} <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <Link href={r.href} className="block p-4 hover:bg-stone">
                    <span className="block text-[13px] text-text-3">{r.kind}</span>
                    <span className="mt-0.5 block font-display text-[22px] leading-tight">{r.title}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <section className="section bg-stone">
      <div className="container-page">
        <p className="eyebrow">Search</p>
        <h1 className="mb-8 mt-3 font-display text-[clamp(40px,5vw,64px)] leading-[1.02]">Find an era, idea or source</h1>
        <Suspense fallback={<p className="text-text-3">Loading search…</p>}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
