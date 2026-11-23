import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const STRIPES = ["#A63D2A", "#D69A3C", "#2E6B5E", "#2E3A8C"];

/** Shared Open Graph card: Ink ground, era-colour stripe, Gloock title (Style Guide colours). */
export async function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const gloock = await fs.readFile(path.join(process.cwd(), "assets", "fonts", "Gloock-Regular.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#1A1A2E" }}>
        <div style={{ display: "flex", height: 14 }}>
          {STRIPES.map((c) => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#E9A27A", fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ color: "#FFFFFF", fontFamily: "Gloock", fontSize: title.length > 48 ? 62 : 80, lineHeight: 1.05, marginTop: 20 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ color: "#D4D4DE", fontSize: 30, lineHeight: 1.4, marginTop: 24, maxWidth: 1000 }}>{subtitle}</div>
            )}
          </div>
          <div style={{ color: "#B9B9C8", fontFamily: "Gloock", fontSize: 34 }}>Bharata Varsha</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Gloock", data: gloock, weight: 400, style: "normal" }] },
  );
}

/** Keeps preview subtitles to a readable length. */
export function clip(text: string, max = 150): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
