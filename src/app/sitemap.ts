import type { MetadataRoute } from "next";
import { eraHref, getEras } from "@/lib/content/eras";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ["", "/atlas", "/lenses", "/connections", "/ideas"];
  return [
    ...sections.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getEras().map((era) => ({ url: `${SITE_URL}${eraHref(era)}` })),
  ];
}
