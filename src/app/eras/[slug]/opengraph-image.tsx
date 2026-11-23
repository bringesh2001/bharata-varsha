import { getEraBySlug, getEras, eraDateLabel, eraNumberLabel } from "@/lib/content/eras";
import { clip, ogCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Era guide on Bharata Varsha";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getEras().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const era = getEraBySlug((await params).slug);
  if (!era) return ogCard({ eyebrow: "Bharata Varsha", title: "Era not found" });
  return ogCard({ eyebrow: `${eraNumberLabel(era)} · ${eraDateLabel(era)}`, title: era.title, subtitle: clip(era.summary) });
}
