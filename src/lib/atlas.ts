import { places, powers, REGIONS, type Place, type Power, type RegionId } from "@data/atlas";
import borderIndex from "@/generated/border-coverage.json";

/** Chart series order from the Style Guide: Madder, Ochre, Green, Indigo, Plum, Sea blue. */
export const SERIES = ["#A63D2A", "#D69A3C", "#2E6B5E", "#2E3A8C", "#7A4E8C", "#3E7CB1"] as const;

/** Slider values are plain integers; there is no year 0, so 0 is shown as 1 CE. */
export function sliderToYear(value: number): number {
  return value === 0 ? 1 : value;
}

export function activePowers(year: number): Power[] {
  return powers.filter((p) => p.start <= year && year <= p.end);
}

/** Colour for each power active in a given year, so neighbours at the same time differ. */
export function colourFor(active: Power[]): Map<string, string> {
  return new Map(active.map((p, i) => [p.id, SERIES[i % SERIES.length]]));
}

export function powersByRegion(active: Power[]): { id: RegionId; label: string; powers: Power[] }[] {
  return REGIONS.map((r) => ({ ...r, powers: active.filter((p) => p.regions.includes(r.id)) }));
}

const placeById = new Map(places.map((p) => [p.id, p]));

export function capitalsOf(power: Power): Place[] {
  return power.capitalIds.map((id) => placeById.get(id)).filter((p): p is Place => !!p);
}

export function regionLabel(id: RegionId): string {
  return REGIONS.find((r) => r.id === id)?.label ?? id;
}

/** Provenance of the border layer (Cliopatria release, licence, our changes). */
export const BORDER_SOURCE = {
  source: borderIndex.source,
  release: borderIndex.release,
  url: borderIndex.url,
  licence: borderIndex.licence,
  licenceUrl: borderIndex.licenceUrl,
  changes: borderIndex.changes,
};

// JSON imports type tuples as number[][]; the build script always writes [from, to] pairs.
const coverage = borderIndex.coverage as unknown as Record<string, [number, number][]>;

/** Whether the map has a Cliopatria border for this power in this year. */
export function hasBorder(powerId: string, year: number): boolean {
  return (coverage[powerId] ?? []).some(([from, to]) => from <= year && year <= to);
}

export function borderCoverage(): Record<string, [number, number][]> {
  return coverage;
}
