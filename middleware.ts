import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // 1. SUBDOMAIN CHECK: Rewrite restricted subdomain to /geo-restricted page
  if (hostname === 'restricted.abonnement-iptv-smarterspro.fr') {
    return NextResponse.rewrite(new URL('/geo-restricted', request.url));
  }
  
  // 2. PROTECTED ROUTES: Check authentication for admin area
  if (pathname.startsWith('/vxodnasait')) {
    const sessionCookie = request.cookies.get('better-auth.session_token');
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};