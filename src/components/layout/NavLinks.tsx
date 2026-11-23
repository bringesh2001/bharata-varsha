"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { href: "/", label: "Eras", match: (p: string) => p === "/" || p.startsWith("/eras") },
  { href: "/atlas", label: "Atlas", match: (p: string) => p.startsWith("/atlas") },
  { href: "/lenses", label: "Lenses", match: (p: string) => p.startsWith("/lenses") },
  { href: "/connections", label: "Connections", match: (p: string) => p.startsWith("/connections") },
  { href: "/ideas", label: "Inventions", match: (p: string) => p.startsWith("/ideas") },
  { href: "/search", label: "Search", match: (p: string) => p.startsWith("/search") },
] as const;

export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="flex flex-wrap items-center gap-x-1 text-[15px]">
      {NAV_ITEMS.map((item) => {
        const active = item.match(pathname);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center px-2.5 underline-offset-[6px] hover:underline ${
                active ? "underline decoration-2" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
