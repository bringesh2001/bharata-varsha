import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[14px] ${dark ? "text-on-dark-muted" : "text-text-3"}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {c.href && !last ? (
                <Link href={c.href} className={dark ? "text-paper underline underline-offset-[3px]" : "link"}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? (dark ? "text-paper" : "text-ink") : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
