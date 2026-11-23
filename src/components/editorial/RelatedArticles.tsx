import Link from "next/link";
import type { RelatedLink } from "@/lib/content/queries";

/** "Go deeper" links from an era to the debates, connections and ideas that mention it. */
export function RelatedArticles({ items, title = "Go deeper", id = "related" }: { items: RelatedLink[]; title?: string; id?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-display text-[clamp(28px,3.2vw,36px)] leading-[1.1]">
        {title}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href} className="flex">
            <Link
              href={item.href}
              className="group flex w-full flex-col rounded-[6px] border border-border bg-paper p-4 hover:border-border-strong"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">{item.kind}</span>
              <span className="mt-1 text-[17px] font-semibold leading-snug group-hover:underline">{item.title}</span>
              <span className="mt-1 line-clamp-3 text-[14px] text-text-2">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
