import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/editorial/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Connections — India and the ancient world",
  description: "Trade, travel and the exchange of ideas between India and other regions, linked to eras and sources.",
  alternates: { canonical: "/connections" },
};

export default function ConnectionsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Connections"
      title="India was never alone: links to the ancient world"
      lead="See who met whom, what they traded and shared, and where they differed, from the Indus cities onward."
      milestone="milestone M4"
      plans={[
        { title: "When contact happened", text: "A timeline of known contact with Mesopotamia, Egypt, Persia, Greece and Rome, China and Southeast Asia." },
        { title: "How they met", text: "For each region: the dated evidence of contact, the parallels, the differences, and what is still debated." },
        { title: "Shared roots and echoes", text: "Links proven by language, set apart from similar stories whose connection is still argued." },
      ]}
      rules={[
        "Every story links to the eras it belongs to and to its sources.",
        "Proven links and debated parallels are marked differently, with a text label as well as colour.",
        "Influence and “who was first” claims get the most careful sourcing of all.",
      ]}
    />
  );
}
