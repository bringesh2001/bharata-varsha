/**
 * Photos used on the site. Every photo is a copy of a freely licensed file on
 * Wikimedia Commons, resized for the web. Author, licence and source page were
 * taken from the Commons API (extmetadata), not typed from memory. Tests check
 * that every photo has a credit, an allowed licence and an existing file.
 *
 * To add a photo: download it to public/images/photos/<id>.jpg, add an entry here
 * with the author and licence exactly as Commons gives them, and reference the id.
 */

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Describes what is in the picture, for screen readers. */
  alt: string;
  /** Visible caption: what it is, and anything a reader should know (e.g. the date of the object). */
  caption: string;
  author: string;
  licence: string;
  licenceUrl?: string;
  /** The file's page on Wikimedia Commons. */
  sourceUrl: string;
  /** CSS object-position for cropping, e.g. "50% 30%". */
  focus?: string;
};

const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";
const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/deed.en";
const FAL = "https://artlibre.org/licence/lal/en";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos: Photo[] = [
  {
    id: "great-bath-mohenjo-daro",
    src: "/images/photos/great-bath-mohenjo-daro.jpg",
    width: 1280,
    height: 960,
    alt: "A large, empty rectangular pool lined with brick, with steps at its ends and brick walls around it",
    caption: "The Great Bath at Mohenjo-daro, sealed with bitumen to hold water.",
    author: "Saqib Qayyum",
    licence: "CC BY-SA 3.0",
    licenceUrl: CC_BY_SA_3,
    sourceUrl: commons("Great_bath_view_Mohenjodaro.JPG"),
  },
  {
    id: "rigveda-manuscript",
    src: "/images/photos/rigveda-manuscript.jpg",
    width: 1100,
    height: 1056,
    alt: "Two pages of handwritten Sanskrit in Devanagari script, with a few red marks",
    caption:
      "A Rigveda manuscript from the early 19th century. The hymns are far older: they were passed down by memory for many centuries before being written.",
    author: "Unknown author",
    licence: "Public domain",
    sourceUrl: commons("Rigveda_MS2097.jpg"),
  },
  {
    id: "mahabodhi-temple",
    src: "/images/photos/mahabodhi-temple.jpg",
    width: 1280,
    height: 839,
    alt: "A tall pyramid-shaped temple tower with smaller towers at its corners, in a garden",
    caption:
      "The Mahabodhi Temple at Bodh Gaya, where the Buddha is said to have reached enlightenment. The present temple dates from about the 5th–6th century CE and has been much restored.",
    author: "WeeKeeEditor",
    licence: "CC BY-SA 4.0",
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Mahabodhi_Temple_-_Bodh_Gaya.jpg"),
  },
  {
    id: "lion-capital-sarnath",
    src: "/images/photos/lion-capital-sarnath.jpg",
    width: 960,
    height: 1280,
    alt: "Four polished stone lions seated back to back on a drum carved with wheels and animals, above a bell-shaped base, in a museum",
    caption: "The Lion Capital of Ashoka in the Sarnath Museum, now India's national emblem.",
    author: "lisa bat",
    licence: "CC BY 2.0",
    licenceUrl: CC_BY_2,
    sourceUrl: commons("Lion_capital_of_Ashoka,_Sarnath.jpg"),
    focus: "50% 35%",
  },
  {
    id: "gandhara-buddha",
    src: "/images/photos/gandhara-buddha.jpg",
    width: 936,
    height: 1280,
    alt: "A stone sculpture of the Buddha seated cross-legged in draped robes, with a halo behind his head and hands raised at his chest",
    caption: "Seated Buddha from Gandhara, Kushan period, about 2nd–3rd century CE (Tokyo National Museum).",
    author: "Daderot",
    licence: "Public domain",
    sourceUrl: commons(
      "Seated_Buddha,_Gandhara,_Pakistan,_Kushan_dynasty,_100s-200s_AD,_schist_-_Tokyo_National_Museum_-_Tokyo,_Japan_-_DSC08664.jpg",
    ),
    focus: "50% 30%",
  },
  {
    id: "ajanta-padmapani",
    src: "/images/photos/ajanta-padmapani.jpg",
    width: 1093,
    height: 1280,
    alt: "A faded wall painting of a crowned figure with lowered eyes, surrounded by smaller painted figures",
    caption:
      "The Bodhisattva Padmapani, a wall painting in Cave 1 at Ajanta, late 5th century CE, made under the Vakataka dynasty.",
    author: "Unknown author",
    licence: "Public domain",
    sourceUrl: commons("Bodhisattva_Padmapani,_cave_1,_Ajanta,_India.jpg"),
    focus: "50% 25%",
  },
  {
    id: "brihadisvara-temple",
    src: "/images/photos/brihadisvara-temple.jpg",
    width: 853,
    height: 1280,
    alt: "A very tall carved stone temple tower rising in tiers against the sky",
    caption: "The Brihadisvara Temple at Thanjavur, built by the Chola king Rajaraja I and completed around 1010 CE.",
    author: "Matthew T Rader",
    licence: "CC BY-SA 4.0",
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Brihadisvara_Temple,_Thanjavur,_Tamil_Nadu,_India.jpg"),
    focus: "50% 30%",
  },
  {
    id: "qutb-minar",
    src: "/images/photos/qutb-minar.jpg",
    width: 960,
    height: 1280,
    alt: "A tall fluted red sandstone tower with balconies, seen beside a ruined stone arch",
    caption: "The Qutb Minar in Delhi, begun around 1200 under the first Delhi sultans.",
    author: "A.Savin",
    licence: "FAL",
    licenceUrl: FAL,
    sourceUrl: commons("Qutub_Minar_in_Delhi_03-2016.jpg"),
    focus: "50% 30%",
  },
  {
    id: "vittala-temple-chariot",
    src: "/images/photos/vittala-temple-chariot.jpg",
    width: 1280,
    height: 853,
    alt: "A stone shrine carved as a chariot with large stone wheels and elephant sculptures in front, in a temple courtyard",
    caption: "The stone chariot at the Vittala Temple, Hampi, in the ruins of the Vijayanagara capital.",
    author: "Arian Zwegers",
    licence: "CC BY 2.0",
    licenceUrl: CC_BY_2,
    sourceUrl: commons("Hampi,_Vittala_Temple,_chariot_(6337304059).jpg"),
  },
  {
    id: "taj-mahal",
    src: "/images/photos/taj-mahal.jpg",
    width: 1280,
    height: 842,
    alt: "A white marble domed tomb with four minarets, at the end of a long garden with a pool",
    caption: "The Taj Mahal at Agra, built by Shah Jahan as a tomb for Mumtaz Mahal.",
    author: "Yann; edited by King of Hearts",
    licence: "CC BY-SA 4.0",
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Taj_Mahal,_Agra,_India_edit2.jpg"),
  },
  {
    id: "victoria-terminus",
    src: "/images/photos/victoria-terminus.jpg",
    width: 1280,
    height: 747,
    alt: "A large Gothic Revival railway station with domes, spires and arches",
    caption: "Victoria Terminus in Mumbai (now Chhatrapati Shivaji Maharaj Terminus), completed in 1888.",
    author: "Joe Ravi",
    licence: "CC BY-SA 3.0",
    licenceUrl: CC_BY_SA_3,
    sourceUrl: commons("Chhatrapati_Shivaji_Terminus_(Victoria_Terminus).jpg"),
  },
  {
    id: "sansad-bhavan",
    src: "/images/photos/sansad-bhavan.jpg",
    width: 1280,
    height: 960,
    alt: "A long, low circular building ringed with columns, seen across lawns and flower beds",
    caption: "Sansad Bhavan, the circular Parliament House in New Delhi, used by India's Parliament from 1950 until 2023.",
    author: "Nikhilb239",
    licence: "CC BY-SA 4.0",
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Sansad_Bhavan,_New_Delhi.jpg"),
  },
  {
    id: "ur-carnelian-beads",
    src: "/images/photos/ur-carnelian-beads.jpg",
    width: 1280,
    height: 894,
    alt: "A necklace of long red carnelian beads, with close-ups of two red beads etched with white circles and lines",
    caption:
      "Gold and carnelian beads from the Royal Cemetery at Ur, about 2600–2300 BCE (British Museum). Etched carnelian beads like these are thought to come from the Indus region.",
    author: "Vassil",
    licence: "CC0",
    licenceUrl: CC0,
    sourceUrl: commons(
      "British_Museum_Middle_East_14022019_Gold_and_carnelian_beads_2600-2300_BC_Royal_cemetery_of_Ur_(composite).jpg",
    ),
  },
  {
    id: "arikamedu",
    src: "/images/photos/arikamedu.jpg",
    width: 1280,
    height: 820,
    alt: "Two tall ruined brick pillars and low walls on a grassy site among trees",
    caption: "Arikamedu, near Puducherry, an early historic port where Roman pottery has been excavated.",
    author: "Jayaseerlourdhuraj",
    licence: "CC BY-SA 3.0",
    licenceUrl: CC_BY_SA_3,
    sourceUrl: commons("Arikamedu,_Early_Historic_Site_01.jpg"),
  },
];

export function getPhoto(id: string | undefined): Photo | undefined {
  return id ? photos.find((p) => p.id === id) : undefined;
}
