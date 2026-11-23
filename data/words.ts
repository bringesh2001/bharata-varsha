/** "Lost in translation": word journeys that show ideas moving between languages. */

export type WordStep = { form: string; language: string };

export type WordJourney = {
  word: string;
  steps: WordStep[];
  note: string;
  /** Etymology reference. Every outside link shows its site name. */
  url: string;
  siteName: string;
};

const etym = (w: string) => ({ url: `https://www.etymonline.com/word/${w}`, siteName: "etymonline.com" });

export const wordJourneys: WordJourney[] = [
  {
    word: "sine",
    steps: [
      { form: "jyā", language: "Sanskrit: bowstring" },
      { form: "jība", language: "Arabic" },
      { form: "sinus", language: "Latin: fold, bay" },
      { form: "sine", language: "English" },
    ],
    note: "Arabic writes jība without vowels, so later readers took it as jayb (“fold”), and translators turned it into the Latin sinus.",
    ...etym("sine"),
  },
  {
    word: "sugar",
    steps: [
      { form: "śarkarā", language: "Sanskrit" },
      { form: "shakar", language: "Persian" },
      { form: "sukkar", language: "Arabic" },
      { form: "zucchero", language: "Italian" },
      { form: "sugar", language: "English" },
    ],
    note: "Indians learned to crystallise cane juice into lasting grains of sugar, which made it a trade good.",
    ...etym("sugar"),
  },
  {
    word: "candy",
    steps: [
      { form: "khaṇḍa", language: "Sanskrit: piece" },
      { form: "qand", language: "Persian, Arabic" },
      { form: "candy", language: "English" },
    ],
    note: "Same journey as sugar: pieces of crystallised cane sugar.",
    ...etym("candy"),
  },
  {
    word: "chess",
    steps: [
      { form: "chaturaṅga", language: "Sanskrit: four divisions" },
      { form: "chatrang", language: "Middle Persian" },
      { form: "shatranj", language: "Arabic" },
      { form: "chess", language: "English" },
    ],
    note: "Named after the four divisions of an Indian army: infantry, cavalry, elephants and chariots. The English word comes via Old French; the game's name changed along the way.",
    ...etym("chess"),
  },
  {
    word: "shampoo",
    steps: [
      { form: "chāmpo", language: "Hindi: press, massage" },
      { form: "shampoo", language: "English" },
    ],
    note: "First meant a head massage. Sake Dean Mahomed made “shampooing” baths fashionable in Brighton in the early 1800s.",
    ...etym("shampoo"),
  },
  {
    word: "indigo",
    steps: [
      { form: "indikón", language: "Greek: the Indian dye" },
      { form: "indicum", language: "Latin" },
      { form: "indigo", language: "English" },
    ],
    note: "The colour's name literally means “from India”.",
    ...etym("indigo"),
  },
];
