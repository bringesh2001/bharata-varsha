/** "Shared roots and echoes" on the Connections page. */

export type SharedRoot = {
  id: string;
  title: string;
  status: "proven" | "debated";
  rows: { label: string; value: string }[];
  sourceIds: string[];
};

export const sharedRoots: SharedRoot[] = [
  {
    id: "father",
    title: "“Father”",
    status: "proven",
    rows: [
      { label: "Sanskrit", value: "pitṛ" },
      { label: "Greek", value: "patḗr" },
      { label: "Latin", value: "pater" },
      { label: "English", value: "father" },
    ],
    sourceIds: ["mallory-adams-2006"],
  },
  {
    id: "sky-father",
    title: "The sky father",
    status: "proven",
    rows: [
      { label: "Vedic", value: "Dyaus Pitā" },
      { label: "Greek", value: "Zeus Patēr" },
      { label: "Roman", value: "Jupiter" },
    ],
    sourceIds: ["mallory-adams-2006"],
  },
  {
    id: "flood",
    title: "The great flood",
    status: "debated",
    rows: [
      { label: "India", value: "Manu, warned by a fish (Shatapatha Brahmana)" },
      { label: "Mesopotamia", value: "Utnapishtim (Epic of Gilgamesh)" },
      { label: "Hebrew Bible", value: "Noah (Genesis)" },
    ],
    sourceIds: ["eggeling-1882"],
  },
];
