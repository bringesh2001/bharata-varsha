"use client";

import { useState } from "react";
import { INVENTION_CATEGORIES, type Invention, type InventionCategory } from "@data/inventions";
import type { Source } from "@/lib/content/schema";
import { EvidenceBadge } from "./Badge";
import { SourceLink } from "./SourceLink";

const STRIPE: Record<InventionCategory, string> = {
  mathematics: "border-t-madder",
  medicine: "border-t-positive",
  materials: "border-t-era-classical",
  games: "border-t-indigo",
};

type Filter = "all" | InventionCategory;

/**
 * Inventions grid with category filter pills. Without JavaScript every card is
 * still shown (the filter only hides cards); the pills are real buttons.
 */
export function InventionsExplorer({ items, sources }: { items: Invention[]; sources: Record<string, Source> }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = items.filter((i) => filter === "all" || i.category === filter);
  const options: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...(Object.entries(INVENTION_CATEGORIES) as [InventionCategory, string][]).map(([id, label]) => ({ id, label })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className={`min-h-11 rounded-full border px-4 text-[15px] font-semibold ${
                filter === o.id ? "border-ink bg-ink text-paper" : "border-border-strong bg-paper hover:bg-stone"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="text-[14px] text-text-3" aria-live="polite">
          {visible.length} of {items.length} shown
        </p>
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((inv) => (
          <li
            key={inv.id}
            id={`invention-${inv.id}`}
            className={`flex scroll-mt-6 flex-col rounded-[6px] border border-border border-t-4 bg-paper p-5 target:ring-2 target:ring-indigo ${STRIPE[inv.category]}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">
                {INVENTION_CATEGORIES[inv.category]} · {inv.dateLabel}
              </p>
              <EvidenceBadge level={inv.evidence} />
            </div>
            <h3 className="mt-3 text-[20px] font-semibold leading-snug">{inv.title}</h3>
            <p className="mt-2 text-[15px] text-text-2">{inv.summary}</p>
            <dl className="mt-4 grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 border-t border-divider pt-4 text-[14px]">
              <dt className="text-text-3">How it travelled</dt>
              <dd>{inv.travelled}</dd>
              <dt className="text-text-3">World knows it as</dt>
              <dd className="font-semibold">{inv.worldKnowsAs}</dd>
            </dl>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">Go to the sources</p>
            <div className="mt-2 space-y-2">
              {inv.sourceIds.map((id) => (sources[id] ? <SourceLink key={id} source={sources[id]} /> : null))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
