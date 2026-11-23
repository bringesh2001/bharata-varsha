import { z } from "zod";
import { eras } from "@data/eras";
import { inventions } from "@data/inventions";
import { mythChecks } from "@data/myths";
import { wordJourneys } from "@data/words";
import { sharedRoots } from "@data/shared-roots";
import { places, powers, REGIONS } from "@data/atlas";
import { getAllSources } from "./loader";

const year = z.number().int().refine((y) => y !== 0, "There is no year 0");

const inventionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(["mathematics", "medicine", "materials", "games"]),
  dateLabel: z.string().min(1),
  evidence: z.enum(["strong", "widely-accepted", "debated", "also-found-elsewhere"]),
  summary: z.string().min(1),
  travelled: z.string().min(1),
  worldKnowsAs: z.string().min(1),
  eraIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
});

const placeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  modernName: z.string().optional(),
  // South Asia bounds: a typo in a coordinate would otherwise silently move a capital.
  lon: z.number().min(60).max(98),
  lat: z.number().min(5).max(38),
  labelSide: z.literal("left").optional(),
});

const powerSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    start: year,
    end: year,
    datePrecision: z.enum(["exact", "approximate", "disputed"]),
    regions: z.array(z.enum(REGIONS.map((r) => r.id) as [string, ...string[]])).min(1),
    eraId: z.string(),
    capitalIds: z.array(z.string()),
  })
  .refine((p) => p.end > p.start, "end must be after start");

/** Validates every structured data file and all of its cross-references. Returns a list of problems. */
export function validateDataFiles(): string[] {
  const problems: string[] = [];
  const sourceIds = new Set(getAllSources().map((s) => s.id));
  const eraIds = new Set(eras.map((e) => e.id));
  const placeIds = new Set(places.map((p) => p.id));

  const check = <T,>(label: string, schema: z.ZodType<T>, items: unknown[]) => {
    items.forEach((item, i) => {
      const r = schema.safeParse(item);
      if (!r.success) problems.push(`${label}[${i}]: ${r.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
    });
  };
  const unique = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) problems.push(`${label}: duplicate id "${id}"`);
      seen.add(id);
    }
  };
  const refs = (label: string, ids: string[], known: Set<string>, kind: string) => {
    for (const id of ids) if (!known.has(id)) problems.push(`${label}: unknown ${kind} "${id}"`);
  };

  check("inventions", inventionSchema, inventions);
  unique("inventions", inventions.map((x) => x.id));
  for (const inv of inventions) {
    refs(`inventions/${inv.id}`, inv.sourceIds, sourceIds, "source");
    refs(`inventions/${inv.id}`, inv.eraIds, eraIds, "era");
  }

  unique("myths", mythChecks.map((m) => m.id));
  for (const m of mythChecks) {
    if (m.sourceIds.length === 0) problems.push(`myths/${m.id}: needs at least one source`);
    refs(`myths/${m.id}`, m.sourceIds, sourceIds, "source");
  }

  for (const w of wordJourneys) {
    if (w.steps.length < 2) problems.push(`words/${w.word}: needs at least two steps`);
    if (!w.url.startsWith("https://") || !w.siteName) problems.push(`words/${w.word}: needs an https url and siteName`);
  }

  for (const r of sharedRoots) refs(`shared-roots/${r.id}`, r.sourceIds, sourceIds, "source");

  check("places", placeSchema, places);
  unique("places", places.map((p) => p.id));
  check("powers", powerSchema, powers);
  unique("powers", powers.map((p) => p.id));
  for (const p of powers) {
    refs(`powers/${p.id}`, [p.eraId], eraIds, "era");
    refs(`powers/${p.id}`, p.capitalIds, placeIds, "place");
  }

  return problems;
}
