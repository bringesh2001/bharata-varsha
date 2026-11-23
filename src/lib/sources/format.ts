import type { Source } from "@/lib/content/schema";

const TYPE_LABELS: Record<Source["sourceType"], string> = {
  book: "Book",
  "primary-translation": "Primary source",
  article: "Article",
  video: "Video",
  lecture: "Lecture",
  map: "Map",
  inscription: "Inscription",
};

const LEVEL_LABELS: Record<Source["level"], string> = {
  intro: "Intro",
  deeper: "Deeper",
  scholarly: "Scholarly",
  source: "Source",
};

export function sourceTypeLabel(s: Source): string {
  return TYPE_LABELS[s.sourceType];
}

export function sourceLevelLabel(s: Source): string {
  return LEVEL_LABELS[s.level];
}

/** "Thapar, 1961" — strips "(translator)" and uses the surname. */
export function shortCitation(s: Source): string {
  const firstAuthor = s.author.replace(/\s*\(.*?\)\s*/g, "").split(/,| and /)[0].trim();
  const surname = firstAuthor.split(/\s+/).pop() ?? firstAuthor;
  return `${surname}, ${s.year}`;
}

/** "Romila Thapar. Aśoka and the Decline of the Mauryas. Oxford University Press, 1961." */
export function fullCitation(s: Source): string {
  const pub = s.publisher ? `${s.publisher}, ${s.year}` : String(s.year);
  return `${s.author}. ${s.title}. ${pub}.`;
}
