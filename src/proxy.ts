import { NextResponse, type NextRequest } from "next/server";
import { eras } from "@data/eras";
import manifest from "@/generated/content-manifest.json";

/** Known slugs per section. Era pages exist for every era, written or not. */
const KNOWN: Record<string, Set<string>> = {
  eras: new Set(eras.map((e) => e.slug)),
  lenses: new Set(manifest.lens),
  connections: new Set(manifest.connection),
  ideas: new Set(manifest.idea),
};

/**
 * Unknown slugs must return a real HTTP 404. With Cache Components, a
 * notFound() inside a streamed page can only show the not-found UI under a 200,
 * so we reject unknown slugs here, before rendering starts.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const known = KNOWN[section];
  if (known && slug && !known.has(decodeURIComponent(slug))) {
    // Any unmatched path renders app/not-found.tsx with a 404 status.
    return NextResponse.rewrite(new URL("/_unknown-page", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/eras/:slug", "/lenses/:slug", "/connections/:slug", "/ideas/:slug"],
};
