import type { Heading } from "@/lib/content/loader";

/**
 * In-page contents. A plain list of anchor links: works without JavaScript,
 * sticky beside the article on wide screens, a collapsible box on phones.
 */
export function TableOfContents({ headings, extra = [] }: { headings: Heading[]; extra?: Heading[] }) {
  const items = [...headings, ...extra];
  if (items.length === 0) return null;
  const list = (
    <ol className="space-y-1 text-[15px]">
      {items.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="block py-1.5 text-text-2 hover:text-ink hover:underline">
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="rounded-[6px] border border-border bg-paper p-4 lg:hidden">
        <summary className="min-h-11 cursor-pointer content-center font-semibold">On this page</summary>
        <nav aria-label="On this page (mobile)" className="mt-2">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="sticky top-6 hidden lg:block">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-3">On this page</p>
        {list}
      </nav>
    </>
  );
}
