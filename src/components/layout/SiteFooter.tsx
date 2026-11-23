import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-stone">
      <div className="container-page flex flex-col gap-3 py-8 text-[14px] text-text-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Bharata Varsha — a curated guide to India&rsquo;s history</p>
        <p>
          Every claim links to its sources.{" "}
          <Link href="/ideas" className="link">
            Inventions &amp; ideas
          </Link>{" "}
          ·{" "}
          <Link href="/lenses" className="link">
            How historians disagree
          </Link>
        </p>
      </div>
    </footer>
  );
}
