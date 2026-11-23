// Writes src/generated/content-manifest.json: the slug of every MDX article, by type.
// The proxy uses it to return a real 404 for unknown slugs before rendering starts.
// Runs automatically before dev, build and test (see package.json).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dirs = { era: "eras", lens: "lenses", connection: "connections", idea: "ideas" };
const manifest = {};
for (const [type, dir] of Object.entries(dirs)) {
  const full = path.join(root, "content", dir);
  manifest[type] = fs.existsSync(full)
    ? fs.readdirSync(full).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, "")).sort()
    : [];
}
const out = path.join(root, "src", "generated", "content-manifest.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n");
console.log("content manifest:", Object.entries(manifest).map(([k, v]) => `${k}=${v.length}`).join(" "));
