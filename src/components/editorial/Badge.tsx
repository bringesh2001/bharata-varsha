import type { EvidenceLevel } from "@data/inventions";
import type { Verdict } from "@data/myths";
import { VERDICT_LABELS } from "@data/myths";

const EVIDENCE: Record<EvidenceLevel, { label: string; cls: string }> = {
  strong: { label: "Strong evidence", cls: "border-positive text-positive" },
  "widely-accepted": { label: "Widely accepted", cls: "border-positive text-positive" },
  debated: { label: "Debated", cls: "border-negative text-negative" },
  "also-found-elsewhere": { label: "Also found elsewhere", cls: "border-indigo text-indigo" },
};

/** Outline badge for evidence strength (Style Guide §03). Text label, never colour alone. */
export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const e = EVIDENCE[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${e.cls}`}>
      {e.label}
    </span>
  );
}

const VERDICT_CLS: Record<Verdict, string> = {
  true: "bg-positive",
  "mostly-true": "bg-positive",
  "not-quite": "bg-caution",
  "no-evidence": "bg-negative",
};

/** Filled badge for myth-or-fact verdicts. */
export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold text-paper ${VERDICT_CLS[verdict]}`}>
      {VERDICT_LABELS[verdict]}
    </span>
  );
}

/** Generic outline pill, e.g. "Proven link" / "Debated". */
export function Pill({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "positive" | "negative" | "dark" }) {
  const cls = {
    ink: "border-border-strong text-ink",
    positive: "border-positive text-positive",
    negative: "border-negative text-negative",
    dark: "border-on-dark-line text-on-dark",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${cls}`}>
      {children}
    </span>
  );
}
