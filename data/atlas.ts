/**
 * Atlas data.
 *
 * DELIBERATELY NO TERRITORY POLYGONS. The build guide forbids drawing borders
 * from unverified guesses. Instead we record:
 *   - each power's dates and the broad regions it held at its height (schematic), and
 *   - its capitals as points (modern locations of the sites, rounded to ~1 km).
 * Polygon layers can be added later from a vetted, licensed dataset.
 *
 * Years: BCE negative, CE positive. Status: draft, awaiting editorial review.
 */
import type { DatePrecision } from "@/lib/dates/format";

export type RegionId = "northwest" | "north" | "east" | "west" | "deccan" | "south";

export const REGIONS: { id: RegionId; label: string }[] = [
  { id: "northwest", label: "Northwest" },
  { id: "north", label: "North & Gangetic plain" },
  { id: "east", label: "East" },
  { id: "west", label: "West" },
  { id: "deccan", label: "Deccan" },
  { id: "south", label: "South" },
];

/** `labelSide: "left"` puts the map label on the left of the dot, to avoid colliding with a nearby capital. */
export type Place = { id: string; name: string; modernName?: string; lon: number; lat: number; labelSide?: "left" };

/** Capital sites. Coordinates are those of the modern town or site, rounded to 2 decimals. */
export const places: Place[] = [
  { id: "rajagriha", name: "Rajagriha", modernName: "Rajgir", lon: 85.42, lat: 25.03, labelSide: "left" },
  { id: "pataliputra", name: "Pataliputra", modernName: "Patna", lon: 85.14, lat: 25.61 },
  { id: "vidisha", name: "Vidisha", lon: 77.81, lat: 23.52 },
  { id: "sagala", name: "Sagala", modernName: "Sialkot", lon: 74.53, lat: 32.49 },
  { id: "taxila", name: "Taxila", lon: 72.83, lat: 33.75, labelSide: "left" },
  { id: "madurai", name: "Madurai", lon: 78.12, lat: 9.93, labelSide: "left" },
  { id: "uraiyur", name: "Uraiyur", modernName: "Tiruchirappalli", lon: 78.69, lat: 10.83 },
  { id: "pratishthana", name: "Pratishthana", modernName: "Paithan", lon: 75.38, lat: 19.48 },
  { id: "purushapura", name: "Purushapura", modernName: "Peshawar", lon: 71.58, lat: 34.01 },
  { id: "mathura", name: "Mathura", lon: 77.67, lat: 27.49 },
  { id: "kanchipuram", name: "Kanchipuram", lon: 79.7, lat: 12.83 },
  { id: "badami", name: "Vatapi", modernName: "Badami", lon: 75.68, lat: 15.92 },
  { id: "kannauj", name: "Kanyakubja", modernName: "Kannauj", lon: 79.92, lat: 27.05 },
  { id: "manyakheta", name: "Manyakheta", modernName: "Malkhed", lon: 77.16, lat: 17.19 },
  { id: "thanjavur", name: "Thanjavur", lon: 79.14, lat: 10.79 },
  { id: "delhi", name: "Delhi", lon: 77.21, lat: 28.61 },
  { id: "vijayanagara", name: "Vijayanagara", modernName: "Hampi", lon: 76.46, lat: 15.33 },
  { id: "gulbarga", name: "Gulbarga", modernName: "Kalaburagi", lon: 76.83, lat: 17.33, labelSide: "left" },
  { id: "bidar", name: "Bidar", lon: 77.52, lat: 17.91 },
  { id: "agra", name: "Agra", lon: 78.01, lat: 27.18, labelSide: "left" },
  { id: "raigad", name: "Raigad", lon: 73.44, lat: 18.23, labelSide: "left" },
  { id: "pune", name: "Pune", lon: 73.86, lat: 18.52 },
  { id: "calcutta", name: "Calcutta", modernName: "Kolkata", lon: 88.36, lat: 22.57 },
  { id: "lahore", name: "Lahore", lon: 74.34, lat: 31.55 },
];

export type Power = {
  id: string;
  name: string;
  start: number;
  end: number;
  datePrecision: DatePrecision;
  /** Broad regions held at the power's height. Schematic: real extents changed within the period. */
  regions: RegionId[];
  eraId: string;
  capitalIds: string[];
};

export const powers: Power[] = [
  { id: "magadha", name: "Magadha kingdom", start: -600, end: -321, datePrecision: "approximate", regions: ["north", "east"], eraId: "era-mahajanapadas", capitalIds: ["rajagriha", "pataliputra"] },
  { id: "mauryan", name: "Mauryan Empire", start: -321, end: -185, datePrecision: "approximate", regions: ["northwest", "north", "east", "west", "deccan"], eraId: "era-mauryan", capitalIds: ["pataliputra"] },
  { id: "shunga", name: "Shunga dynasty", start: -185, end: -75, datePrecision: "approximate", regions: ["north", "east"], eraId: "era-post-mauryan", capitalIds: ["pataliputra", "vidisha"] },
  { id: "indo-greek", name: "Indo-Greek kingdoms", start: -180, end: -10, datePrecision: "approximate", regions: ["northwest"], eraId: "era-post-mauryan", capitalIds: ["sagala", "taxila"] },
  { id: "tamil-kingdoms", name: "Cheras, Cholas & Pandyas", start: -300, end: 300, datePrecision: "approximate", regions: ["south"], eraId: "era-post-mauryan", capitalIds: ["madurai", "uraiyur"] },
  { id: "satavahana", name: "Satavahanas", start: -100, end: 220, datePrecision: "disputed", regions: ["deccan", "west"], eraId: "era-post-mauryan", capitalIds: ["pratishthana"] },
  { id: "kushan", name: "Kushan Empire", start: 30, end: 375, datePrecision: "approximate", regions: ["northwest", "north"], eraId: "era-post-mauryan", capitalIds: ["purushapura", "mathura"] },
  { id: "vakataka", name: "Vakatakas", start: 250, end: 500, datePrecision: "approximate", regions: ["deccan"], eraId: "era-gupta", capitalIds: [] },
  { id: "pallava", name: "Pallavas", start: 275, end: 897, datePrecision: "approximate", regions: ["south"], eraId: "era-early-medieval", capitalIds: ["kanchipuram"] },
  { id: "gupta", name: "Gupta Empire", start: 320, end: 550, datePrecision: "approximate", regions: ["north", "east", "west"], eraId: "era-gupta", capitalIds: ["pataliputra"] },
  { id: "chalukya-badami", name: "Chalukyas of Badami", start: 543, end: 753, datePrecision: "approximate", regions: ["deccan", "west"], eraId: "era-early-medieval", capitalIds: ["badami"] },
  { id: "harsha", name: "Harsha's kingdom", start: 606, end: 647, datePrecision: "approximate", regions: ["north"], eraId: "era-early-medieval", capitalIds: ["kannauj"] },
  { id: "pratihara", name: "Gurjara-Pratiharas", start: 730, end: 1036, datePrecision: "approximate", regions: ["north", "west"], eraId: "era-early-medieval", capitalIds: ["kannauj"] },
  { id: "pala", name: "Palas", start: 750, end: 1161, datePrecision: "approximate", regions: ["east"], eraId: "era-early-medieval", capitalIds: [] },
  { id: "rashtrakuta", name: "Rashtrakutas", start: 753, end: 982, datePrecision: "approximate", regions: ["deccan"], eraId: "era-early-medieval", capitalIds: ["manyakheta"] },
  { id: "chola", name: "Imperial Cholas", start: 848, end: 1279, datePrecision: "approximate", regions: ["south"], eraId: "era-early-medieval", capitalIds: ["thanjavur"] },
  { id: "delhi-sultanate", name: "Delhi Sultanate", start: 1206, end: 1526, datePrecision: "exact", regions: ["northwest", "north"], eraId: "era-delhi-sultanate", capitalIds: ["delhi"] },
  { id: "vijayanagara", name: "Vijayanagara Empire", start: 1336, end: 1646, datePrecision: "approximate", regions: ["south"], eraId: "era-vijayanagara", capitalIds: ["vijayanagara"] },
  { id: "bahmani", name: "Bahmani Sultanate", start: 1347, end: 1527, datePrecision: "approximate", regions: ["deccan"], eraId: "era-vijayanagara", capitalIds: ["gulbarga", "bidar"] },
  { id: "mughal", name: "Mughal Empire", start: 1526, end: 1857, datePrecision: "exact", regions: ["northwest", "north", "east", "west"], eraId: "era-mughal", capitalIds: ["agra", "delhi"] },
  { id: "maratha", name: "Maratha Empire", start: 1674, end: 1818, datePrecision: "exact", regions: ["west", "deccan"], eraId: "era-mughal", capitalIds: ["raigad", "pune"] },
  { id: "company", name: "East India Company rule", start: 1757, end: 1858, datePrecision: "exact", regions: ["east"], eraId: "era-colonial", capitalIds: ["calcutta"] },
  { id: "sikh", name: "Sikh Empire", start: 1799, end: 1849, datePrecision: "exact", regions: ["northwest"], eraId: "era-colonial", capitalIds: ["lahore"] },
  { id: "raj", name: "British Raj", start: 1858, end: 1947, datePrecision: "exact", regions: ["northwest", "north", "east", "west", "deccan", "south"], eraId: "era-colonial", capitalIds: ["calcutta", "delhi"] },
];

export const ATLAS_RANGE = { start: -600, end: 1947 } as const;

/** Quick-jump presets under the slider. */
export const ATLAS_PRESETS: { label: string; year: number }[] = [
  { label: "Mahajanapadas", year: -500 },
  { label: "Ashoka", year: -250 },
  { label: "Kushans & Satavahanas", year: 100 },
  { label: "Guptas", year: 400 },
  { label: "Harsha & Pallavas", year: 630 },
  { label: "Cholas", year: 1000 },
  { label: "Sultanate & Vijayanagara", year: 1400 },
  { label: "Mughals", year: 1600 },
  { label: "Company rule", year: 1800 },
  { label: "Raj", year: 1900 },
];

/** Provenance for the base map — shown on the page. */
export const BASEMAP_CREDIT = {
  name: "Natural Earth (1:50m land, rivers and lakes)",
  url: "https://www.naturalearthdata.com/",
  siteName: "naturalearthdata.com",
  licence: "Public domain",
};
