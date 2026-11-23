/** Schools of thought on the Lenses page, oldest first (from the prototype). */

export type School = { id: string; period: string; name: string; summary: string; people: string; color: string };

/** `color` is a literal Tailwind border class (chart series order, Style Guide §01). */
export const schools: School[] = [
  {
    id: "orientalist",
    period: "Late 1700s–1800s",
    name: "Orientalist & colonial",
    summary: "Studied Sanskrit and ancient texts, but often cast India as timeless and in need of British rule.",
    people: "William Jones, James Mill, Max Müller",
    color: "border-t-plum",
  },
  {
    id: "nationalist",
    period: "Late 1800s–1940s",
    name: "Nationalist",
    summary: "Answered colonial writers with a proud past: golden ages, early science, resistance to foreign rule.",
    people: "R. C. Majumdar, K. P. Jayaswal, V. D. Savarkar",
    color: "border-t-era-classical",
  },
  {
    id: "marxist",
    period: "1950s onward",
    name: "Marxist & social",
    summary: "Looked at land, labour, class and economy rather than kings and religions.",
    people: "D. D. Kosambi, R. S. Sharma, Irfan Habib",
    color: "border-t-madder",
  },
  {
    id: "subaltern",
    period: "1980s onward",
    name: "Subaltern studies",
    summary: "History from below: peasants, tribes and those missing from official records.",
    people: "Ranajit Guha and colleagues",
    color: "border-t-positive",
  },
  {
    id: "indigenist",
    period: "1990s onward",
    name: "Indigenist",
    summary:
      "Sees Indian civilisation as native and continuous, and challenges colonial-era frameworks such as Aryan migration.",
    people: "Shrikant Talageri, Koenraad Elst",
    color: "border-t-sea",
  },
  {
    id: "connected",
    period: "1990s onward",
    name: "Connected & global",
    summary: "Puts India in conversation with the world: trade, travel and shared ideas across borders.",
    people: "Sanjay Subrahmanyam, Richard Eaton",
    color: "border-t-indigo",
  },
];

export const readingQuestions = [
  {
    title: "Who wrote it, and when?",
    text: "A colonial officer in 1817 and a nationalist in 1909 had different reasons to tell the story their way.",
  },
  {
    title: "What kind of evidence?",
    text: "Inscriptions, texts, digs, coins and DNA each answer different questions, and each has limits.",
  },
  {
    title: "What's left out?",
    text: "Court chronicles skip peasants, women and lower castes; that gap is what subaltern history tries to fill.",
  },
  {
    title: "Does it serve today's politics?",
    text: "Every one of these debates is also argued in the present. Notice when a claim matters more for now than for then.",
  },
];
