import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/editorial/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Lenses — how historians disagree",
  description: "The big debates about India's past: each view, the evidence it cites, and where the evidence stands.",
  alternates: { canonical: "/lenses" },
};

export default function LensesPage() {
  return (
    <SectionPlaceholder
      eyebrow="Lenses"
      title="Eastern lens, western lens"
      lead="The same past, told in different ways. Here you’ll find the big debates, the evidence each side points to, and where they really disagree."
      milestone="milestone M4"
      aside={
        <div className="mt-4 border-t border-divider pt-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-3">Before you start</p>
          <p className="mt-2 text-[15px] text-text-2">
            &ldquo;Eastern&rdquo; and &ldquo;western&rdquo; are shorthand, not passports. Many Indian historians hold
            views called western, and some western scholars hold views called eastern. We label each view by its
            argument.
          </p>
        </div>
      }
      plans={[
        { title: "Schools of thought", text: "Orientalist, nationalist, Marxist, subaltern, indigenist and global approaches, with named authors and works." },
        { title: "The debates", text: "Each debate sets the views side by side, lists the evidence each one cites, and says where scholarship stands now." },
        { title: "Read like a historian", text: "Who wrote it and when, what kind of evidence it uses, what it leaves out, and whether it serves today’s politics." },
      ]}
      rules={[
        "Label each view by its argument, not by the nationality of the people who hold it.",
        "Cite individual authors and works, not “eastern” or “western” historians as blocs.",
        "Show the evidence each side itself cites, and say plainly where the evidence is strong.",
      ]}
    />
  );
}
