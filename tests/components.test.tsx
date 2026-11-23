// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cite } from "@/components/editorial/Cite";
import { SourceList } from "@/components/editorial/SourceList";
import { PreviousNext } from "@/components/editorial/PreviousNext";
import { getAllSources } from "@/lib/content/loader";
import { getAdjacentEras, getEraBySlug } from "@/lib/content/eras";
import { searchDocs } from "@/lib/search/search";

vi.mock("next/link", async () => {
  const React = await import("react");
  return {
    default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
      React.createElement("a", { href, ...rest }, children),
  };
});

const sources = getAllSources().slice(0, 3);

describe("Cite", () => {
  it("numbers citations by their order in the article's source list", () => {
    render(<Cite id={sources[1].id} sources={sources} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("[2]");
    expect(link).toHaveAttribute("href", `#source-${sources[1].id}`);
  });
});

describe("SourceList", () => {
  it("shows the site name on every outside link and opens it in a new tab", () => {
    render(<SourceList sources={sources} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(sources.filter((s) => s.url).length);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link.textContent).toMatch(/openlibrary\.org|archive\.org/);
    }
  });
});

describe("PreviousNext", () => {
  it("links the Mauryan page to eras 03 and 05", () => {
    const { previous, next } = getAdjacentEras(getEraBySlug("mauryan-empire")!);
    render(<PreviousNext previous={previous} next={next} />);
    expect(screen.getByRole("link", { name: /Mahajanapadas/ })).toHaveAttribute("href", "/eras/mahajanapadas");
    expect(screen.getByRole("link", { name: /Kushans/ })).toHaveAttribute("href", "/eras/post-mauryan");
  });
});

describe("searchDocs", () => {
  const docs = [
    { title: "Mauryan Empire", href: "/eras/mauryan-empire", kind: "Era", text: "Aśoka edicts Pataliputra" },
    { title: "Gupta Empire", href: "/eras/gupta-empire", kind: "Era", text: "Aryabhata Kalidasa" },
  ];
  it("finds matches regardless of case and diacritics", () => {
    expect(searchDocs(docs, "ASOKA").map((d) => d.title)).toEqual(["Mauryan Empire"]);
  });
  it("ranks title matches first", () => {
    expect(searchDocs(docs, "empire")[0]).toBeDefined();
    expect(searchDocs(docs, "gupta")[0].title).toBe("Gupta Empire");
  });
  it("returns nothing for an empty query", () => expect(searchDocs(docs, "  ")).toEqual([]));
});
