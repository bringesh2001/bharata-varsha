import { describe, expect, it } from "vitest";
import { formatRange, formatYear } from "@/lib/dates/format";

describe("formatYear", () => {
  it("writes BCE for negative years", () => expect(formatYear(-321)).toBe("321 BCE"));
  it("writes CE for first-millennium years", () => expect(formatYear(499)).toBe("499 CE"));
  it("omits CE for later years", () => expect(formatYear(1947)).toBe("1947"));
  it("prefixes c. for approximate years", () => expect(formatYear(-2600, "approximate")).toBe("c. 2600 BCE"));
  it("rejects year 0", () => expect(() => formatYear(0)).toThrow(RangeError));
});

describe("formatRange (house style, Style Guide §04)", () => {
  it.each([
    [-321, -185, "exact", "321–185 BCE"],
    [320, 550, "approximate", "c. 320–550 CE"],
    [-200, 300, "approximate", "c. 200 BCE–300 CE"],
    [-3300, -1300, "approximate", "c. 3300–1300 BCE"],
    [600, 1200, "approximate", "c. 600–1200"],
    [1206, 1526, "exact", "1206–1526"],
  ] as const)("%i to %i (%s) → %s", (start, end, precision, expected) => {
    expect(formatRange(start, end, precision)).toBe(expected);
  });

  it("shows ongoing periods as today", () => expect(formatRange(1947, null)).toBe("1947–today"));
  it("rejects ranges that end before they start", () => expect(() => formatRange(-185, -321)).toThrow(RangeError));
  it("rejects year 0 in a range", () => expect(() => formatRange(-10, 0)).toThrow(RangeError));
});
