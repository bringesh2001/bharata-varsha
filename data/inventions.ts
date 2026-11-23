/**
 * Inventions & Ideas cards (from the prototype). Each card goes straight to its
 * sources (Style Guide §03): no detail pages. Every `sourceIds` entry must exist
 * in data/sources.json (checked by tests).
 */

export type InventionCategory = "mathematics" | "medicine" | "materials" | "games";

export type EvidenceLevel = "strong" | "widely-accepted" | "debated" | "also-found-elsewhere";

export type Invention = {
  id: string;
  title: string;
  category: InventionCategory;
  dateLabel: string;
  evidence: EvidenceLevel;
  summary: string;
  travelled: string;
  worldKnowsAs: string;
  eraIds: string[];
  sourceIds: string[];
};

export const INVENTION_CATEGORIES: Record<InventionCategory, string> = {
  mathematics: "Mathematics",
  medicine: "Medicine & science",
  materials: "Materials & craft",
  games: "Games & mind",
};

export const inventions: Invention[] = [
  {
    id: "decimal-zero",
    title: "Decimal numbers and zero",
    category: "mathematics",
    dateLabel: "c. 500–628 CE",
    evidence: "strong",
    summary:
      "Ten symbols and place value let anyone write any number and calculate on paper, replacing Roman numerals and the abacus.",
    travelled: "India → Baghdad → North Africa → Europe",
    worldKnowsAs: "Arabic numerals",
    eraIds: ["era-gupta", "era-early-medieval"],
    sourceIds: ["plofker-2009", "colebrooke-1817", "sigler-2002"],
  },
  {
    id: "sine",
    title: "The sine function",
    category: "mathematics",
    dateLabel: "499 CE",
    evidence: "strong",
    summary:
      "Aryabhata's Aryabhatiya includes a table of sines, a basis of the trigonometry later used in astronomy and navigation.",
    travelled: "Through Arabic astronomy to medieval Europe",
    worldKnowsAs: "sine (from jyā)",
    eraIds: ["era-gupta"],
    sourceIds: ["clark-1930", "plofker-2009"],
  },
  {
    id: "kerala-series",
    title: "Infinite series for π and sine",
    category: "mathematics",
    dateLabel: "c. 1400",
    evidence: "debated",
    summary:
      "Madhava of Sangamagrama and the Kerala school found series that European mathematicians such as Gregory, Newton and Leibniz reached two to three centuries later.",
    travelled: "Unclear. Some suggest Jesuits in Kerala carried the ideas to Europe; there is no proof.",
    worldKnowsAs: "The Gregory and Leibniz series",
    eraIds: ["era-vijayanagara"],
    sourceIds: ["sarma-2008", "plofker-2009"],
  },
  {
    id: "virahanka-sequence",
    title: "The “Fibonacci” sequence",
    category: "mathematics",
    dateLabel: "c. 600–1150 CE",
    evidence: "also-found-elsewhere",
    summary:
      "While counting rhythms in Sanskrit and Prakrit poetry, Virahanka and later Hemachandra described the sequence 1, 2, 3, 5, 8… before Fibonacci.",
    travelled: "No known link to Europe; probably found again independently",
    worldKnowsAs: "Fibonacci numbers",
    eraIds: ["era-early-medieval"],
    sourceIds: ["singh-1985"],
  },
  {
    id: "right-angle-rule",
    title: "The right-angle rule",
    category: "mathematics",
    dateLabel: "c. 800–500 BCE",
    evidence: "also-found-elsewhere",
    summary:
      "Baudhayana's Sulba Sutra states the rule while giving instructions for building fire altars, before Pythagoras. The Babylonians knew such triangles earlier still.",
    travelled: "Found in several places independently",
    worldKnowsAs: "Pythagorean theorem",
    eraIds: ["era-vedic"],
    sourceIds: ["plofker-2009"],
  },
  {
    id: "rhinoplasty",
    title: "Plastic surgery of the nose",
    category: "medicine",
    dateLabel: "First millennium BCE (text date approximate)",
    evidence: "strong",
    summary:
      "The Sushruta Samhita describes rebuilding a nose with a flap of skin. A 1794 report in London on an Indian operation inspired J. C. Carpue's operations, published in 1816.",
    travelled: "India → British surgeons → modern plastic surgery",
    worldKnowsAs: "The “Indian method” of rhinoplasty",
    eraIds: ["era-mahajanapadas", "era-colonial"],
    sourceIds: ["bhishagratna-1907", "carpue-1816"],
  },
  {
    id: "cotton",
    title: "Growing and weaving cotton",
    category: "materials",
    dateLabel: "By c. 5000 BCE",
    evidence: "strong",
    summary:
      "Cotton fibres preserved in a copper bead at Mehrgarh are among the oldest known. For centuries, Indian cotton cloth was traded across the world.",
    travelled: "Indian Ocean and later European trade",
    worldKnowsAs: "calico, chintz, cotton cloth",
    eraIds: ["era-indus"],
    sourceIds: ["moulherat-2002"],
  },
  {
    id: "crystal-sugar",
    title: "Crystal sugar",
    category: "materials",
    dateLabel: "First millennium CE (approximate)",
    evidence: "strong",
    summary:
      "Indians learned to boil cane juice into crystals that kept and travelled, turning sugar into a long-distance trade good.",
    travelled: "India → Persia → Arab world → Mediterranean",
    worldKnowsAs: "sugar, candy",
    eraIds: ["era-gupta"],
    sourceIds: ["mintz-1985"],
  },
  {
    id: "wootz-steel",
    title: "Wootz crucible steel",
    category: "materials",
    dateLabel: "Late centuries BCE onward",
    evidence: "strong",
    summary:
      "High-carbon steel made in sealed crucibles in South India and Sri Lanka, with a watery pattern when forged.",
    travelled: "Exported as ingots to Persia and Syria",
    worldKnowsAs: "“Damascus” steel blades",
    eraIds: ["era-post-mauryan"],
    sourceIds: ["srinivasan-2004"],
  },
  {
    id: "chess",
    title: "Chess",
    category: "games",
    dateLabel: "c. 6th century CE",
    evidence: "widely-accepted",
    summary: "Chaturanga, a war game played on an 8×8 board, is the earliest known form of chess.",
    travelled: "India → Persia (shatranj) → Arab world → Europe",
    worldKnowsAs: "chess",
    eraIds: ["era-gupta", "era-early-medieval"],
    sourceIds: ["murray-1913"],
  },
  {
    id: "snakes-and-ladders",
    title: "Snakes and ladders",
    category: "games",
    dateLabel: "Medieval",
    evidence: "strong",
    summary: "Moksha patam, or gyan chaupar, taught karma: ladders were virtues, snakes were vices.",
    travelled: "Taken to Britain in the 19th century, and later sold in the USA as Chutes and Ladders",
    worldKnowsAs: "Snakes and ladders",
    eraIds: ["era-mughal", "era-colonial"],
    sourceIds: ["topsfield-2006"],
  },
  {
    id: "yoga",
    title: "Yoga and meditation",
    category: "games",
    dateLabel: "Ancient; Yoga Sutras c. 2nd century BCE–5th century CE",
    evidence: "strong",
    summary: "Patanjali's Yoga Sutras gathered older practices of breath, posture and focus into a system.",
    travelled:
      "Vivekananda's 1893 Chicago talks, then 20th-century teachers; the UN declared an International Day of Yoga in 2014",
    worldKnowsAs: "yoga, meditation",
    eraIds: ["era-post-mauryan", "era-independent"],
    sourceIds: ["bryant-2009"],
  },
];
