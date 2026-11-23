import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-stone">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
        <Link href="/" className="flex min-h-11 items-baseline gap-2">
          <span className="font-display text-[22px] leading-none">Bharata Varsha</span>
          <span className="sr-only">, home</span>
          <span lang="hi" className="text-[15px] leading-none text-madder" aria-hidden="true">
            भारतवर्ष
          </span>
        </Link>
        <nav aria-label="Main">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
