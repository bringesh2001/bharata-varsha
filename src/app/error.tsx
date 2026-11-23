"use client";

import Link from "next/link";

/** Shown if a page fails while rendering. Keeps the site's look and offers a way on. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section bg-stone">
      <div className="container-page max-w-[720px]">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-display text-[clamp(40px,5vw,64px)] leading-[1.02]">This page didn&rsquo;t load</h1>
        <p className="mt-5 text-[18px] text-text-2">Please try again. If it keeps happening, the eras are a good place to start.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center rounded-[4px] bg-ink px-5 font-semibold text-paper hover:bg-ink/90"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-[4px] border border-ink px-5 font-semibold hover:bg-paper">
            Browse the eras
          </Link>
        </div>
      </div>
    </section>
  );
}
