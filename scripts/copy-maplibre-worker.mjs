// Copies MapLibre's web worker into public/ so the browser can load it.
// MapLibre builds the worker URL at runtime (import.meta.url), which bundlers
// cannot follow, so AtlasMap points setWorkerUrl() at this copy instead.
// Runs automatically before dev and build (see package.json); the copy is gitignored.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "node_modules", "maplibre-gl", "dist", "maplibre-gl-worker.mjs");
const destDir = path.join(root, "public", "vendor", "maplibre");
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, path.join(destDir, "maplibre-gl-worker.mjs"));
console.log("maplibre worker copied");
