import { getArticlePage, getListing } from "@/lib/content/queries";
import { clip, ogCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Lenses on Bharata Varsha";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return (await getListing("lens")).map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = await getArticlePage("lens", (await params).slug);
  if (!page) return ogCard({ eyebrow: "Lenses", title: "Not found" });
  const fm = page.article.frontmatter;
  return ogCard({ eyebrow: "Lenses", title: fm.title, subtitle: clip(fm.summary) });
}
