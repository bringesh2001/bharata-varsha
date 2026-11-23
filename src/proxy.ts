import { NextResponse, type NextRequest } from "next/server";
import { eras } from "@data/eras";

const KNOWN_ERA_SLUGS = new Set(eras.map((e) => e.slug));

/**
 * Unknown era slugs must return a real HTTP 404. With Cache Components, a
 * notFound() inside a streamed page can only show the not-found UI under a 200,
 * so we reject unknown slugs here, before rendering starts.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !KNOWN_ERA_SLUGS.has(decodeURIComponent(slug))) {
    // Any unmatched path renders app/not-found.tsx with a 404 status.
    return NextResponse.rewrite(new URL("/_unknown-era", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/eras/:slug",
};
