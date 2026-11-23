// Builds public/maps/borders.geojson from a Cliopatria release.
//
// Cliopatria (Seshat Global History Databank) — CC BY 4.0
//   https://github.com/Seshat-Global-History-Databank/cliopatria
//   Bennett et al., "Cliopatria", Scientific Data 12, 247 (2025), doi:10.1038/s41597-025-04516-9
//
// Usage (one-off, when updating the dataset):
//   1. Download and unzip cliopatria.geojson.zip from the release you want.
//   2. node --max-old-space-size=6144 scripts/build-atlas-borders.mjs <path/to/cliopatria.geojson> <release-tag>
//
// Changes we make (required by the licence to be indicated): we keep only the polities linked to
// the Atlas's powers in data/atlas.ts, clip them to South Asia, simplify the outlines, and round
// coordinates. Names, years and shapes are otherwise Cliopatria's.
import fs from "node:fs";
import path from "node:path";
import bboxClip from "@turf/bbox-clip";
import simplify from "@turf/simplify";

const [, , input, release] = process.argv;
if (!input || !release) {
  console.error("Usage: node scripts/build-atlas-borders.mjs <cliopatria.geojson> <release-tag>");
  process.exit(1);
}

/** Atlas power id → Cliopatria polity names. Keep in sync with data/atlas.ts. */
const POWER_TO_CLIOPATRIA = {
  magadha: ["Magadha - Haryanka dynasty", "Magadha - Shaishunaga dynasty", "Nanda Empire"],
  mauryan: ["Maurya Empire"],
  shunga: ["Shunga Empire"],
  "indo-greek": ["Indo-Greeks"],
  "tamil-kingdoms": ["Early Cheras", "Early Cholas", "Early Pandyas"],
  satavahana: ["Satavahana Dynasty"],
  kushan: ["Kushan Empire", "Eastern Kushans"],
  vakataka: ["Vakataka Kingdom"],
  pallava: ["Late Pallava Empire"],
  gupta: ["Gupta Empire"],
  "chalukya-badami": ["Chalukya Dynasty"],
  harsha: ["Harsha's Empire"],
  pratihara: ["Gurjara-Pratihara Dynasty"],
  pala: ["Pala Empire"],
  rashtrakuta: ["Rashtrakuta Dynasty"],
  chola: ["Chola Empire"],
  "delhi-sultanate": ["(Delhi Sultanate)"],
  vijayanagara: ["Vijayanagara Empire"],
  bahmani: ["Bahmani Sultanate"],
  mughal: ["Mughal Empire"],
  maratha: ["Maratha Empire"],
  company: ["British Empire"],
  sikh: ["Sikh Empire"],
  raj: ["British Raj"],
};

const nameToPower = new Map(Object.entries(POWER_TO_CLIOPATRIA).flatMap(([id, names]) => names.map((n) => [n, id])));
const CLIP = [55, 0, 105, 45];
const TOLERANCE = 0.04; // degrees (~4 km): plenty for a subcontinent-scale map
const round = (c) => (typeof c[0] === "number" ? [Math.round(c[0] * 1000) / 1000, Math.round(c[1] * 1000) / 1000] : c.map(round));

function clean(geom) {
  const ring = (r) => {
    const out = r.filter((c) => Array.isArray(c) && c.length >= 2);
    if (out.length && (out[0][0] !== out.at(-1)[0] || out[0][1] !== out.at(-1)[1])) out.push(out[0]);
    return out.length >= 4 ? out : null;
  };
  if (geom.type === "Polygon") {
    const rings = geom.coordinates.map(ring);
    return rings[0] ? { type: "Polygon", coordinates: rings.filter(Boolean) } : null;
  }
  if (geom.type === "MultiPolygon") {
    const polys = geom.coordinates
      .map((p) => {
        const rings = p.map(ring);
        return rings[0] ? rings.filter(Boolean) : null;
      })
      .filter(Boolean);
    return polys.length ? { type: "MultiPolygon", coordinates: polys } : null;
  }
  return null;
}

const fc = JSON.parse(fs.readFileSync(input, "utf8"));
const out = [];
const seen = new Set();
for (const f of fc.features) {
  const p = f.properties;
  const powerId = nameToPower.get(p.Name);
  if (!powerId || p.Type !== "POLITY" || !f.geometry) continue;
  seen.add(p.Name);
  const clipped = bboxClip(f, CLIP);
  const simple = simplify(clipped, { tolerance: TOLERANCE, highQuality: false });
  const geometry = simple.geometry && clean({ type: simple.geometry.type, coordinates: round(simple.geometry.coordinates) });
  if (!geometry) continue;
  out.push({
    type: "Feature",
    properties: { powerId, name: p.Name, from: p.FromYear, to: p.ToYear, wikidata: p.Wikidata || null },
    geometry,
  });
}

const missing = [...nameToPower.keys()].filter((n) => !seen.has(n));
if (missing.length) {
  console.error("Not found in this Cliopatria release:", missing);
  process.exit(1);
}

out.sort((a, b) => a.properties.from - b.properties.from);
const result = {
  type: "FeatureCollection",
  metadata: {
    source: "Cliopatria (Seshat Global History Databank)",
    release,
    url: "https://github.com/Seshat-Global-History-Databank/cliopatria",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "Filtered to the Atlas's powers, clipped to South Asia, simplified (0.04°) and rounded.",
  },
  features: out,
};
const dest = path.join(import.meta.dirname, "..", "public", "maps", "borders.geojson");
fs.writeFileSync(dest, JSON.stringify(result));
console.log(`${out.length} border snapshots for ${Object.keys(POWER_TO_CLIOPATRIA).length} powers → ${dest} (${Math.round(fs.statSync(dest).size / 1024)} KB)`);

// Small index for the text panel: which years each power has a border for, and the provenance.
const coverage = {};
for (const f of out) {
  const { powerId, from, to } = f.properties;
  (coverage[powerId] ??= []).push([from, to]);
}
const index = { ...result.metadata, coverage };
const indexDest = path.join(import.meta.dirname, "..", "src", "generated", "border-coverage.json");
fs.writeFileSync(indexDest, JSON.stringify(index, null, 1) + "\n");
console.log(`coverage index → ${indexDest}`);
