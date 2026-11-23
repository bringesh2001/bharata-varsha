import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/editorial/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Inventions & ideas from India",
  description: "Mathematics, medicine, materials, games and philosophy: what began in India, how it travelled, and how strong the evidence is.",
  alternates: { canonical: "/ideas" },
};

export default function IdeasPage() {
  return (
    <SectionPlaceholder
      eyebrow="Inventions & ideas"
      title="Born in India, known by other names"
      lead="Many ideas and things the world uses every day travelled out of India through Persia, the Arab world and Europe, often picking up new names on the way."
      milestone="milestone M4"
      plans={[
        { title: "Explore the inventions", text: "Mathematics, medicine and science, materials and craft, games and mind, each with how it travelled and what the world calls it." },
        { title: "Lost in translation", text: "Word journeys that show ideas moving between languages, with links to their etymologies." },
        { title: "Myth or fact?", text: "Popular claims checked against the evidence, with a clear verdict: true, mostly true, not quite, or no evidence." },
      ]}
      rules={[
        "Every entry carries an evidence badge: strong evidence, widely accepted, debated, or also found elsewhere.",
        "Credit where it’s due: where other cultures found the same thing, we say so.",
        "Real achievements don’t need exaggeration. No overclaiming.",
      ]}
    />
  );
}
