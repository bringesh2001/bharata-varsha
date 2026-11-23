import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/editorial/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Atlas — who ruled where, and when",
  description: "A historical map of the subcontinent with a period selector, built from vetted, credited boundary data.",
  alternates: { canonical: "/atlas" },
};

export default function AtlasPage() {
  return (
    <SectionPlaceholder
      eyebrow="Atlas"
      title="Who ruled where, and when"
      lead="Move through the centuries and see which powers held which regions, which overlapped, and where to read more about each."
      milestone="milestone M5"
      plans={[
        { title: "One map, many periods", text: "A period selector from about 600 BCE to 1947, showing the major powers of each time." },
        { title: "Who overlapped with whom", text: "A chart of dynasties side by side, because many ruled at the same time, not one after another." },
        { title: "A text version of every map", text: "Each map view is also given as a plain list of powers and regions, for screen readers and slow connections." },
      ]}
      rules={[
        "Borders come only from vetted historical datasets, never from guesses, and every layer shows its source and licence.",
        "Each layer is labelled “approximate representation” where the evidence is uncertain; pre-modern borders were rarely fixed lines.",
        "Every power on the map links to its era page.",
      ]}
    />
  );
}
