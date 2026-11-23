import { eras, ERA_GROUP_LABELS, type Era } from "@data/eras";
import { formatRange } from "@/lib/dates/format";

export function getEras(): readonly Era[] {
  return eras;
}

export function getEraBySlug(slug: string): Era | undefined {
  return eras.find((e) => e.slug === slug);
}

export function getAdjacentEras(era: Era): { previous?: Era; next?: Era } {
  const i = eras.findIndex((e) => e.id === era.id);
  return { previous: eras[i - 1], next: eras[i + 1] };
}

export function eraDateLabel(era: Era): string {
  return formatRange(era.start, era.end, era.datePrecision);
}

/** "Era 04" */
export function eraNumberLabel(era: Era): string {
  return `Era ${String(era.order).padStart(2, "0")}`;
}

export function eraGroupLabel(era: Era): string {
  return ERA_GROUP_LABELS[era.group];
}

/** Canonical URL path for an era — the one place era links are built. */
export function eraHref(era: Pick<Era, "slug">): `/eras/${string}` {
  return `/eras/${era.slug}`;
}
