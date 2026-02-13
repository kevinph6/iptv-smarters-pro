import { NextResponse } from "next/server";

// Convenience endpoint for GSC: keep /sitemap.xml working.
// We serve the sitemap index from /sitemap_index.xml.
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/sitemap_index.xml", request.url), 301);
}

export function HEAD(request: Request) {
  return NextResponse.redirect(new URL("/sitemap_index.xml", request.url), 301);
}

