/**
 * Historical date display.
 *
 * Years are stored as integers: BCE years are negative, CE years positive
 * (321 BCE = -321, 550 CE = 550). There is no year 0. `null` for an end year
 * means "ongoing" and is shown as "today".
 *
 * House style (Style Guide §04): "c. 320–550 CE", "321–185 BCE",
 * "c. 200 BCE–300 CE", "1206–1526". The CE suffix is only written where a
 * reader might otherwise mistake the era: when a range crosses from BCE to CE,
 * or when every CE year in it falls in the first millennium.
 */

export type DatePrecision = "exact" | "approximate" | "disputed";

const EN_DASH = "–";

function assertYear(year: number): void {
  if (!Number.isInteger(year) || year === 0) {
    throw new RangeError(`Invalid historical year: ${year}. Use negative numbers for BCE; there is no year 0.`);
  }
}

/** A single year: -321 → "321 BCE", 499 → "499 CE", 1947 → "1947". */
export function formatYear(year: number, precision: DatePrecision = "exact"): string {
  assertYear(year);
  const prefix = precision === "exact" ? "" : "c. ";
  if (year < 0) return `${prefix}${-year} BCE`;
  return `${prefix}${year}${year < 1000 ? " CE" : ""}`;
}

/** A range of years. `end === null` means the period continues today. */
export function formatRange(
  start: number,
  end: number | null,
  precision: DatePrecision = "exact",
): string {
  assertYear(start);
  if (end !== null) {
    assertYear(end);
    if (end < start) throw new RangeError(`Range ends (${end}) before it starts (${start}).`);
  }

  const prefix = precision === "exact" ? "" : "c. ";

  if (end === null) {
    return `${prefix}${formatYear(start)}${EN_DASH}today`;
  }

  // Both BCE: "321–185 BCE"
  if (start < 0 && end < 0) {
    return `${prefix}${-start}${EN_DASH}${-end} BCE`;
  }

  // Crosses the era boundary: "200 BCE–300 CE"
  if (start < 0 && end > 0) {
    return `${prefix}${-start} BCE${EN_DASH}${end} CE`;
  }

  // Both CE: add "CE" only within the first millennium.
  const suffix = end < 1000 ? " CE" : "";
  return `${prefix}${start}${EN_DASH}${end}${suffix}`;
}

/** Sort key helper: earliest first, open-ended ranges treated as ongoing. */
export function compareByStart(a: { start: number }, b: { start: number }): number {
  return a.start - b.start;
}
