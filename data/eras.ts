/**
 * The twelve eras — the site's primary, authoritative navigation.
 *
 * Order, titles, date ranges and summaries follow the "India History Hub"
 * prototype. `group` only decides the era colour (Style Guide §01); it is not
 * a replacement taxonomy.
 *
 * Years: BCE negative, CE positive, `null` end = continues today.
 */
import type { DatePrecision } from "@/lib/dates/format";

export type EraGroup = "ancient" | "classical" | "medieval" | "modern";

export type Era = {
  /** Stable canonical ID — never changes, even if the slug does. */
  id: string;
  /** Route slug: /eras/[slug] */
  slug: string;
  order: number;
  title: string;
  /** Short label for the timeline strip. */
  shortTitle: string;
  group: EraGroup;
  start: number;
  end: number | null;
  datePrecision: DatePrecision;
  summary: string;
  /** Caption for the photo placeholder until a credited photo is added. */
  photoCaption: string;
};

export const ERA_GROUP_LABELS: Record<EraGroup, string> = {
  ancient: "Ancient",
  classical: "Classical",
  medieval: "Medieval",
  modern: "Modern",
};

export const eras: readonly Era[] = [
  {
    id: "era-indus",
    slug: "indus-valley-civilisation",
    order: 1,
    title: "Indus Valley Civilisation",
    shortTitle: "Indus Valley",
    group: "ancient",
    start: -3300,
    end: -1300,
    datePrecision: "approximate",
    summary: "Planned cities, drains, seals, and a script nobody has deciphered yet.",
    photoCaption: "Great Bath, Mohenjo-daro",
  },
  {
    id: "era-vedic",
    slug: "vedic-age",
    order: 2,
    title: "The Vedic Age",
    shortTitle: "Vedic Age",
    group: "ancient",
    start: -1500,
    end: -500,
    datePrecision: "approximate",
    summary: "The Vedas are composed and society and ritual take shape in the Gangetic plains.",
    photoCaption: "Rigveda manuscript page",
  },
  {
    id: "era-mahajanapadas",
    slug: "mahajanapadas",
    order: 3,
    title: "Mahajanapadas, Buddha & Mahavira",
    shortTitle: "Mahajanapadas",
    group: "ancient",
    start: -600,
    end: -321,
    datePrecision: "approximate",
    summary: "Sixteen great kingdoms, early cities, and new faiths.",
    photoCaption: "Mahabodhi Temple, Bodh Gaya",
  },
  {
    id: "era-mauryan",
    slug: "mauryan-empire",
    order: 4,
    title: "Mauryan Empire",
    shortTitle: "Mauryan",
    group: "ancient",
    start: -321,
    end: -185,
    datePrecision: "exact",
    summary: "The first empire to cover most of the subcontinent; Ashoka and his edicts.",
    photoCaption: "Lion Capital, Sarnath",
  },
  {
    id: "era-post-mauryan",
    slug: "post-mauryan",
    order: 5,
    title: "Kushans, Satavahanas & the Sangam age",
    shortTitle: "Post-Mauryan",
    group: "classical",
    start: -200,
    end: 300,
    datePrecision: "approximate",
    summary: "Trade with Rome, Gandhara art, and Tamil Sangam poetry.",
    photoCaption: "Gandhara Buddha",
  },
  {
    id: "era-gupta",
    slug: "gupta-empire",
    order: 6,
    title: "Gupta Empire",
    shortTitle: "Gupta",
    group: "classical",
    start: 320,
    end: 550,
    datePrecision: "approximate",
    summary: "Called a “golden age”: Aryabhata, Kalidasa, and temple art.",
    photoCaption: "Ajanta cave paintings",
  },
  {
    id: "era-early-medieval",
    slug: "early-medieval",
    order: 7,
    title: "Regional kingdoms: Cholas, Palas, Rashtrakutas",
    shortTitle: "Early Medieval",
    group: "medieval",
    start: 600,
    end: 1200,
    datePrecision: "approximate",
    summary: "Big regional powers, a Chola navy, and Nalanda at its peak.",
    photoCaption: "Brihadisvara Temple, Thanjavur",
  },
  {
    id: "era-delhi-sultanate",
    slug: "delhi-sultanate",
    order: 8,
    title: "Delhi Sultanate",
    shortTitle: "Delhi Sultanate",
    group: "medieval",
    start: 1206,
    end: 1526,
    datePrecision: "exact",
    summary: "Five dynasties rule from Delhi; new styles of building and governing.",
    photoCaption: "Qutb Minar, Delhi",
  },
  {
    id: "era-vijayanagara",
    slug: "vijayanagara-and-the-deccan",
    order: 9,
    title: "Vijayanagara & the Deccan",
    shortTitle: "Vijayanagara",
    group: "medieval",
    start: 1336,
    end: 1646,
    datePrecision: "exact",
    summary: "A great southern empire and the Deccan sultanates.",
    photoCaption: "Vittala Temple, Hampi",
  },
  {
    id: "era-mughal",
    slug: "mughal-empire",
    order: 10,
    title: "Mughal Empire",
    shortTitle: "Mughal",
    group: "medieval",
    start: 1526,
    end: 1857,
    datePrecision: "exact",
    summary: "Babur to Aurangzeb and beyond; the Marathas rise.",
    photoCaption: "Taj Mahal, Agra",
  },
  {
    id: "era-colonial",
    slug: "colonial-india",
    order: 11,
    title: "Company rule & the British Raj",
    shortTitle: "Colonial",
    group: "modern",
    start: 1757,
    end: 1947,
    datePrecision: "exact",
    summary: "From Plassey to 1857 to the freedom struggle.",
    photoCaption: "Victoria Terminus, Mumbai",
  },
  {
    id: "era-independent",
    slug: "independent-india",
    order: 12,
    title: "Independent India",
    shortTitle: "Modern",
    group: "modern",
    start: 1947,
    end: null,
    datePrecision: "exact",
    summary: "Partition, the Constitution, and the Republic.",
    photoCaption: "Parliament House, New Delhi",
  },
];
