import { z } from "zod";

/** Integer year; BCE negative, CE positive, no year 0. */
const year = z
  .number()
  .int()
  .refine((y) => y !== 0, { message: "There is no year 0. Use -1 for 1 BCE and 1 for 1 CE." });

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slugs are lowercase words joined by hyphens");

export const sourceSchema = z.object({
  id: slug,
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number().int(),
  sourceType: z.enum(["book", "primary-translation", "article", "video", "lecture", "map", "inscription"]),
  publisher: z.string().optional(),
  url: z.url().optional(),
  /** Every outside link shows its site name (Style Guide §03). Required whenever `url` is set. */
  siteName: z.string().optional(),
  level: z.enum(["intro", "deeper", "scholarly", "source"]),
  note: z.string().optional(),
  rightsNotes: z.string().optional(),
}).refine((s) => !s.url || !!s.siteName, {
  message: "A source with a url must also give its siteName",
  path: ["siteName"],
});

export type Source = z.infer<typeof sourceSchema>;

export const keyFactSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const rulerSchema = z.object({
  name: z.string().min(1),
  start: year,
  end: year,
  datePrecision: z.enum(["exact", "approximate", "disputed"]).default("approximate"),
});

/** One side of a debate on the Lenses pages. Labelled by its argument, not by nationality. */
export const lensViewSchema = z.object({
  name: z.string().min(1),
  /** How the view is popularly labelled, e.g. "Western lens". Optional: many debates don't split that way. */
  oftenCalled: z.string().optional(),
  summary: z.string().min(1),
  evidence: z.array(z.string().min(1)).min(1),
  heldBy: z.string().min(1),
  sourceIds: z.array(slug).min(1),
});

export const lensBlockSchema = z.object({
  periodLabel: z.string().min(1),
  views: z.array(lensViewSchema).min(2),
  clash: z.string().min(1),
  scholarshipNow: z.string().min(1),
  scholarshipSourceIds: z.array(slug).default([]),
});

const contactPeriodSchema = z.object({ start: year, end: year });

export const connectionBlockSchema = z.object({
  region: z.string().min(1),
  /** Periods of known contact, for the timeline. */
  contactPeriods: z.array(contactPeriodSchema).min(1),
  photoCaption: z.string().optional(),
  events: z
    .array(z.object({ date: z.string().min(1), text: z.string().min(1), sourceId: slug }))
    .min(1),
  parallels: z.array(z.string()).default([]),
  differences: z.array(z.string()).default([]),
  stillDebated: z.array(z.string()).default([]),
});

/**
 * Frontmatter for every MDX article. Mirrors the HistoryArticle type in the
 * build guide (§5), plus a few era-page display fields.
 */
export const articleFrontmatterSchema = z
  .object({
    id: slug,
    slug,
    title: z.string().min(1),
    contentType: z.enum(["era", "lens", "connection", "idea"]),
    summary: z.string().min(1),
    eraIds: z.array(z.string()).default([]),
    topicIds: z.array(slug).default([]),
    dateStart: year.optional(),
    dateEnd: year.optional(),
    datePrecision: z.enum(["exact", "approximate", "disputed"]).optional(),
    sourceIds: z.array(slug).default([]),
    relatedArticleIds: z.array(slug).default([]),
    status: z.enum(["draft", "reviewed", "published"]),
    updatedAt: z.iso.date(),
    readingMinutes: z.number().int().positive().optional(),
    keyFacts: z.array(keyFactSchema).default([]),
    rulers: z.array(rulerSchema).default([]),
    rulersNote: z.string().optional(),
    photoCredit: z.string().optional(),
    /** Sort order on listing pages (lower first). */
    order: z.number().int().default(100),
    lens: lensBlockSchema.optional(),
    connection: connectionBlockSchema.optional(),
  })
  .refine((a) => a.dateStart === undefined || a.dateEnd === undefined || a.dateEnd >= a.dateStart, {
    message: "dateEnd must not be before dateStart",
    path: ["dateEnd"],
  })
  .refine((a) => new Set(a.sourceIds).size === a.sourceIds.length, {
    message: "sourceIds contains duplicates",
    path: ["sourceIds"],
  })
  .refine((a) => (a.contentType === "lens") === !!a.lens, {
    message: "lens articles need a lens block (and only lens articles may have one)",
    path: ["lens"],
  })
  .refine((a) => (a.contentType === "connection") === !!a.connection, {
    message: "connection articles need a connection block (and only connection articles may have one)",
    path: ["connection"],
  });

/** Every source id an article uses anywhere in its frontmatter (views, events, etc.). */
export function frontmatterSourceIds(a: ArticleFrontmatter): string[] {
  return [
    ...(a.lens?.views.flatMap((v) => v.sourceIds) ?? []),
    ...(a.lens?.scholarshipSourceIds ?? []),
    ...(a.connection?.events.map((e) => e.sourceId) ?? []),
  ];
}

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
