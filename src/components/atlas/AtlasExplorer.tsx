"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { eras } from "@data/eras";
import { ATLAS_PRESETS, ATLAS_RANGE, powers } from "@data/atlas";
import { activePowers, BORDER_SOURCE, capitalsOf, colourFor, hasBorder, powersByRegion, regionLabel, sliderToYear } from "@/lib/atlas";
import { formatRange, formatYear } from "@/lib/dates/format";

// MapLibre is large: load it only on this page, only in the browser.
const AtlasMap = dynamic(() => import("./AtlasMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-[14px] text-text-3">Loading map…</div>,
});

const STEP = 10;

export function AtlasExplorer({ initialYear = -250 }: { initialYear?: number }) {
  const [value, setValue] = useState(initialYear);
  const [playing, setPlaying] = useState(false);
  const year = sliderToYear(value);
  const active = useMemo(() => activePowers(year), [year]);
  const colours = useMemo(() => colourFor(active), [active]);
  const regions = useMemo(() => powersByRegion(active), [active]);
  const label = formatYear(year);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setValue((v) => {
        if (v + STEP >= ATLAS_RANGE.end) {
          setPlaying(false);
          return ATLAS_RANGE.end;
        }
        return v + STEP;
      });
    }, 160);
    return () => clearInterval(id);
  }, [playing]);

  const eraSlug = (eraId: string) => eras.find((e) => e.id === eraId)?.slug;

  return (
    <div className="space-y-14">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Map + controls */}
        <div className="overflow-hidden rounded-[6px] border border-border bg-paper">
          <div className="relative h-[420px] sm:h-[520px]">
            <p className="sr-only">
              Map of South Asia in {label}, showing the approximate territory and capitals of the powers listed beside it.
              The same information is in the list and region panels.
            </p>
            <AtlasMap year={year} active={active} colours={colours} />
            <p className="pointer-events-none absolute left-3 top-3 max-w-[70%] rounded-[2px] bg-paper/90 px-2 py-1 text-[12px] text-text-2">
              Approximate borders from Cliopatria. Pre-modern borders were rarely fixed lines.
            </p>
          </div>
          <div className="border-t border-border p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!playing && value >= ATLAS_RANGE.end) setValue(ATLAS_RANGE.start);
                  setPlaying((p) => !p);
                }}
                aria-label={playing ? "Pause" : "Play through the years"}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper hover:bg-ink/90"
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <label htmlFor="atlas-year" className="text-[14px]">
                  Year: <output htmlFor="atlas-year" className="font-display text-[24px]">{label}</output>
                </label>
                <input
                  id="atlas-year"
                  type="range"
                  min={ATLAS_RANGE.start}
                  max={ATLAS_RANGE.end}
                  step={1}
                  value={value}
                  aria-valuetext={label}
                  onChange={(e) => {
                    setPlaying(false);
                    setValue(Number(e.target.value));
                  }}
                  className="mt-1 h-11 w-full cursor-pointer accent-ink"
                />
                <div className="flex justify-between text-[12px] text-text-3" aria-hidden="true">
                  <span>600 BCE</span>
                  <span>1 CE</span>
                  <span>1000</span>
                  <span>1947</span>
                </div>
              </div>
            </div>
            <div role="group" aria-label="Jump to a period" className="mt-4 flex flex-wrap gap-2">
              {ATLAS_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={value === p.year}
                  onClick={() => {
                    setPlaying(false);
                    setValue(p.year);
                  }}
                  className={`min-h-11 rounded-full border px-3.5 text-[14px] ${
                    value === p.year ? "border-ink bg-ink text-paper" : "border-border-strong bg-paper hover:bg-stone"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text alternative: everything the map shows, and more */}
        <aside aria-labelledby="in-year" className="flex flex-col rounded-[6px] border border-border bg-paper p-5">
          <h2 id="in-year" className="text-[13px] font-semibold uppercase tracking-[0.12em]">
            In {label}
          </h2>
          <p className="mt-1 text-[15px] text-text-2" aria-live="polite">
            {active.length === 0 ? "No major powers recorded for this year yet." : `${active.length} major power${active.length === 1 ? "" : "s"} on the map`}
          </p>
          <ul className="mt-3 divide-y divide-divider">
            {active.map((p) => {
              const slug = eraSlug(p.eraId);
              const capitals = capitalsOf(p);
              return (
                <li key={p.id} className="py-3">
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="inline-block size-3 shrink-0 rounded-full" style={{ background: colours.get(p.id) }} aria-hidden="true" />
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-text-3">
                    {formatRange(p.start, p.end, p.datePrecision)}
                    {p.datePrecision === "disputed" && " (dates disputed)"} · {p.regions.map(regionLabel).join(", ")}
                  </p>
                  <p className="text-[13px] text-text-3">
                    {hasBorder(p.id, year) ? "Border shown (approximate)" : "No border data for this year; capital only"}
                  </p>
                  {capitals.length > 0 && (
                    <p className="text-[13px] text-text-3">
                      Capital{capitals.length > 1 ? "s" : ""}: {capitals.map((c) => (c.modernName ? `${c.name} (${c.modernName})` : c.name)).join(", ")}
                    </p>
                  )}
                  {slug && (
                    <Link href={`/eras/${slug}`} className="link mt-1 inline-flex min-h-9 items-center text-[14px]">
                      Resources on this era <span aria-hidden="true" className="ml-1">→</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-auto border-t border-divider pt-4 text-[13px] text-text-3">
            Dates are approximate and borders were rarely fixed. Borders:{" "}
            <a href={BORDER_SOURCE.url} target="_blank" rel="noopener noreferrer" className="link">
              Cliopatria
            </a>{" "}
            ({BORDER_SOURCE.licence}). Where historians disagree, the era page explains the debate.
          </p>
        </aside>
      </div>

      {/* Schematic regions */}
      <section aria-labelledby="regions-heading">
        <h2 id="regions-heading" className="font-display text-[clamp(30px,3.6vw,40px)] leading-[1.1]">
          Who held each region in {label}
        </h2>
        <p className="mt-2 text-[15px] text-text-2">
          Schematic: core regions at each power&rsquo;s height. Real control changed within these periods.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <li key={r.id} className="rounded-[6px] border border-border bg-paper p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-3">{r.label}</p>
              {r.powers.length === 0 ? (
                <p className="mt-2 text-[15px] text-text-3">Not recorded yet</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {r.powers.map((p) => (
                    <li key={p.id} className="flex items-center gap-2 text-[15px] font-semibold">
                      <span className="inline-block size-2.5 shrink-0 rounded-full" style={{ background: colours.get(p.id) }} aria-hidden="true" />
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Overlap chart */}
      <section aria-labelledby="overlap-heading">
        <h2 id="overlap-heading" className="font-display text-[clamp(30px,3.6vw,40px)] leading-[1.1]">
          Who overlapped with whom
        </h2>
        <p className="mt-2 text-[15px] text-text-2">Every bar is a dynasty; the line marks the year on the slider.</p>
        <OverlapChart year={year} activeIds={new Set(active.map((p) => p.id))} colours={colours} />
      </section>
    </div>
  );
}

function OverlapChart({ year, activeIds, colours }: { year: number; activeIds: Set<string>; colours: Map<string, string> }) {
  const span = ATLAS_RANGE.end - ATLAS_RANGE.start;
  const pct = (y: number) => ((y - ATLAS_RANGE.start) / span) * 100;
  return (
    <div className="mt-6 overflow-x-auto rounded-[6px] border border-border bg-paper p-4 sm:p-5">
      <table className="w-full min-w-[720px] border-collapse text-[13px]">
        <caption className="sr-only">Dynasties from 600 BCE to 1947, with their dates</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Dynasty</th>
            <th scope="col">Dates</th>
            <th scope="col">Timeline</th>
          </tr>
        </thead>
        <tbody>
          {powers.map((p) => {
            const on = activeIds.has(p.id);
            return (
              <tr key={p.id}>
                <th scope="row" className={`w-[200px] py-1 pr-3 text-left font-normal ${on ? "font-semibold text-ink" : "text-text-2"}`}>
                  {p.name}
                </th>
                <td className="w-[150px] py-1 pr-3 text-text-3">{formatRange(p.start, p.end, p.datePrecision)}</td>
                <td className="relative py-1" aria-hidden="true">
                  <div className="relative h-3 bg-stone">
                    <span
                      className="absolute inset-y-0"
                      style={{
                        left: `${pct(p.start)}%`,
                        width: `${Math.max(pct(p.end) - pct(p.start), 0.6)}%`,
                        background: on ? colours.get(p.id) : "#C9C0AE",
                      }}
                    />
                    <span className="absolute inset-y-[-4px] w-0.5 bg-ink" style={{ left: `${pct(year)}%` }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
