/** "Myth or fact?" — popular claims checked against the evidence. */

export type Verdict = "true" | "mostly-true" | "not-quite" | "no-evidence";

export const VERDICT_LABELS: Record<Verdict, string> = {
  true: "True",
  "mostly-true": "Mostly true",
  "not-quite": "Not quite",
  "no-evidence": "No evidence",
};

export type MythCheck = { id: string; claim: string; verdict: Verdict; explanation: string; sourceIds: string[] };

export const mythChecks: MythCheck[] = [
  {
    id: "zero",
    claim: "India invented zero.",
    verdict: "mostly-true",
    explanation:
      "Zero as a number with rules was first written down in India (Brahmagupta, 628 CE). Babylonians and the Maya had placeholder zeros earlier.",
    sourceIds: ["plofker-2009"],
  },
  {
    id: "sushruta",
    claim: "Sushruta did plastic surgery.",
    verdict: "true",
    explanation:
      "The Sushruta Samhita describes nose reconstruction, and the Indian method influenced British surgeons after a 1794 report.",
    sourceIds: ["bhishagratna-1907", "carpue-1816"],
  },
  {
    id: "pythagoras",
    claim: "Pythagoras took his theorem from India.",
    verdict: "not-quite",
    explanation:
      "Baudhayana stated the rule before Pythagoras, but the Babylonians knew it earlier. It was found more than once, with no proof of copying.",
    sourceIds: ["plofker-2009"],
  },
  {
    id: "vimanas",
    claim: "Ancient Indians flew aircraft (vimanas).",
    verdict: "no-evidence",
    explanation:
      "The Vaimanika Shastra, the usual source, was written in the early 20th century. A 1974 study by engineers at IISc Bangalore found its designs could not fly.",
    sourceIds: ["mukunda-1974"],
  },
];
