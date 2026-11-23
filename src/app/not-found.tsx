import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-stone">
      <div className="container-page max-w-[720px]">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-3 font-display text-[clamp(44px,6vw,72px)] leading-[1.02]">Lost to history</h1>
        <p className="mt-5 text-[18px] text-text-2">
          We couldn&rsquo;t find that page. It may have moved, or the address may be mistyped.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-[4px] bg-ink px-5 font-semibold text-paper hover:bg-ink/90"
          >
            Browse the eras
          </Link>
          <Link
            href="/search"
            className="inline-flex min-h-11 items-center rounded-[4px] border border-ink px-5 font-semibold hover:bg-paper"
          >
            Search
          </Link>
        </div>
      </div>
    </section>
  );
}
