import type { ReactNode } from "react";

const KINDS = {
  note: { label: "Note", stripe: "border-t-ink", text: "text-ink" },
  evidence: { label: "Evidence", stripe: "border-t-positive", text: "text-positive" },
  debate: { label: "Debated", stripe: "border-t-negative", text: "text-negative" },
} as const;

export type CalloutKind = keyof typeof KINDS;

/** Source and evidence callouts inside articles. Always carries a text label, never colour alone. */
export function Callout({ kind = "note", title, children }: { kind?: CalloutKind; title: string; children: ReactNode }) {
  const k = KINDS[kind];
  return (
    <aside className={`not-prose my-8 rounded-[6px] border border-border border-t-4 bg-paper p-5 ${k.stripe}`}>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${k.text}`}>{k.label}</p>
      <p className="mt-1 text-[18px] font-semibold leading-snug">{title}</p>
      <div className="mt-2 text-[16px] leading-[1.6] text-text-2">{children}</div>
    </aside>
  );
}
