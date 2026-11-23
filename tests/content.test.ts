import { describe, expect, it } from "vitest";
import { eras } from "@data/eras";
import {
  ContentValidationError,
  extractHeadings,
  findBrokenReferences,
  parseArticle,
  validateAllContent,
} from "@/lib/content/loader";
import { slugify } from "@/lib/content/slugify";

const validFrontmatter = `---
id: test-era
slug: test-era
title: Test era
contentType: era
summary: A test.
eraIds: [era-mauryan]
sourceIds: [thapar-1961]
status: draft
updatedAt: 2026-11-22
---
`;

describe("the real content in /content and /data", () => {
  it("passes schema validation and has no broken references", () => {
    const { articles, problems } = validateAllContent();
    expect(problems).toEqual([]);
    expect(articles.length).toBeGreaterThan(0);
  });

  it("includes the Mauryan seed article with sources and a table of contents", () => {
    const mauryan = validateAllContent().articles.find((a) => a.frontmatter.id === "mauryan-empire");
    expect(mauryan).toBeDefined();
    expect(mauryan!.frontmatter.sourceIds.length).toBeGreaterThanOrEqual(5);
    expect(mauryan!.headings.map((h) => h.text)).toContain("What remains debated?");
  });

  it("has twelve eras with unique ids and slugs, in order", () => {
    expect(eras).toHaveLength(12);
    expect(new Set(eras.map((e) => e.id)).size).toBe(12);
    expect(new Set(eras.map((e) => e.slug)).size).toBe(12);
    eras.forEach((e, i) => expect(e.order).toBe(i + 1));
  });
});

describe("parseArticle", () => {
  it("parses valid frontmatter and converts YAML dates to ISO strings", () => {
    const a = parseArticle(`${validFrontmatter}\n## First part\n\nText.`, "content/eras/test-era.mdx");
    expect(a.frontmatter.updatedAt).toBe("2026-11-22");
    expect(a.headings).toEqual([{ id: "first-part", text: "First part" }]);
  });

  it("rejects an unknown status", () => {
    const bad = validFrontmatter.replace("status: draft", "status: final");
    expect(() => parseArticle(bad, "content/eras/test-era.mdx")).toThrow(ContentValidationError);
  });

  it("rejects year 0", () => {
    const bad = validFrontmatter.replace("status: draft", "status: draft\ndateStart: 0");
    expect(() => parseArticle(bad, "content/eras/test-era.mdx")).toThrow(/no year 0/);
  });

  it("rejects a slug that does not match the file name", () => {
    expect(() => parseArticle(validFrontmatter, "content/eras/other.mdx")).toThrow(/must match the file name/);
  });
});

describe("findBrokenReferences", () => {
  const known = {
    eraIds: new Set(["era-mauryan"]),
    sourceIds: new Set(["thapar-1961"]),
    articleIds: new Set<string>(),
  };

  it("flags a <Cite> whose source is not listed in sourceIds", () => {
    const a = parseArticle(`${validFrontmatter}\nText <Cite id="lahiri-2015" />`, "content/eras/test-era.mdx");
    expect(findBrokenReferences(a, known)).toEqual(['<Cite id="lahiri-2015"> is not listed in sourceIds']);
  });

  it("flags unknown era ids", () => {
    const a = parseArticle(validFrontmatter.replace("era-mauryan", "era-atlantis"), "content/eras/test-era.mdx");
    expect(findBrokenReferences(a, known)).toContain('unknown era id "era-atlantis"');
  });
});

describe("headings and slugs", () => {
  it("ignores headings inside code fences", () => {
    expect(extractHeadings("## Real\n```\n## Not real\n```\n## Also real")).toHaveLength(2);
  });
  it("makes stable anchor ids", () => {
    expect(slugify("Aśoka & the Mauryas?")).toBe("asoka-and-the-mauryas");
  });
});

describe("structured data files", () => {
  it("are valid and every source, era and place reference exists", async () => {
    const { validateDataFiles } = await import("@/lib/content/validate-data");
    expect(validateDataFiles()).toEqual([]);
  });

  it("the content manifest matches the MDX files (run `npm run content:manifest` if this fails)", async () => {
    const manifest = (await import("@/generated/content-manifest.json")).default as Record<string, string[]>;
    const { articles } = validateAllContent();
    for (const type of ["era", "lens", "connection", "idea"] as const) {
      const slugs = articles.filter((a) => a.frontmatter.contentType === type).map((a) => a.frontmatter.slug).sort();
      expect(manifest[type]).toEqual(slugs);
    }
  });
});
