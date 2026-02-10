import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Absolute safety net: "/" must never serve HTML.
// Primary enforcement is in `middleware.ts` (edge). This handler guarantees
// that even without middleware, "/" is still a true 301 to the SEO homepage.
export function GET(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname = '/abonnement-iptv/';
  return NextResponse.redirect(url, 301);
}

export function HEAD(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname = '/abonnement-iptv/';
  return NextResponse.redirect(url, 301);
}

