import type { MetadataRoute } from "next";
import { eraHref, getEras } from "@/lib/content/eras";
import { getListing } from "@/lib/content/queries";
import { articleHref } from "@/lib/content/links";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = ["", "/atlas", "/lenses", "/connections", "/ideas", "/credits"];
  const articles = (await Promise.all((["lens", "connection", "idea"] as const).map((t) => getListing(t)))).flat();
  return [
    ...sections.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getEras().map((era) => ({ url: `${SITE_URL}${eraHref(era)}` })),
    ...articles.map((a) => ({ url: `${SITE_URL}${articleHref(a)}`, lastModified: a.updatedAt })),
  ];
}
