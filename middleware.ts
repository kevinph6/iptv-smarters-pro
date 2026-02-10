import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const country = request.headers.get('cf-ipcountry') || (request as NextRequest & { geo?: { country?: string } }).geo?.country || '';
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;
  const seoHomePath = '/abonnement-iptv/';
  const isBot = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider/i.test(userAgent);

  // Normalize "/abonnement-iptv" → "/abonnement-iptv/" (permanent, no chains)
  if (pathname === '/abonnement-iptv') {
    const url = request.nextUrl.clone();
    url.pathname = seoHomePath;
    return NextResponse.redirect(url, 301);
  }
  
  // 1. SUBDOMAIN CHECK: Handle restricted subdomain
  if (hostname === 'restricted.officieliptvsmarterspro.fr') {
    const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
    const normalizedCountry = country?.toUpperCase() || '';
    
    // Restricted subdomain "/" must also permanently redirect to the SEO homepage (single hop).
    if (pathname === '/') {
      const target = new URL(`https://officieliptvsmarterspro.fr${seoHomePath}`, request.url);
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 301);
    }
    
    if (normalizedCountry && allowedCountries.includes(normalizedCountry)) {
      return NextResponse.redirect(new URL('https://officieliptvsmarterspro.fr', request.url), 301);
    }
    
    if (isBot) {
      return NextResponse.redirect(new URL('https://officieliptvsmarterspro.fr', request.url), 301);
    }
    
    return NextResponse.rewrite(new URL('/geo-restricted', request.url));
  }

  // 2. GEO-RESTRICTION
  const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
  
  if (hostname.includes('officieliptvsmarterspro.fr') && 
      !hostname.includes('restricted.') &&
      !request.nextUrl.pathname.startsWith('/api/')) {
    
    const normalizedCountry = country?.toUpperCase() || '';

    // Root must NEVER serve HTML; ensure a true 301 and avoid geo-bypass for bots.
    // For humans, keep geo routing but do it in a single hop (no redirect chains).
    if (pathname === '/') {
      if (isBot) {
        const url = request.nextUrl.clone();
        url.pathname = seoHomePath;
        return NextResponse.redirect(url, 301);
      }

      const isAllowed = normalizedCountry && allowedCountries.includes(normalizedCountry);
      if (isAllowed) {
        const url = request.nextUrl.clone();
        url.pathname = seoHomePath;
        return NextResponse.redirect(url, 301);
      }

      const target = new URL(`https://restricted.officieliptvsmarterspro.fr${seoHomePath}`, request.url);
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 301);
    }
    
    if (normalizedCountry && !allowedCountries.includes(normalizedCountry) && !isBot) {
      return NextResponse.redirect(new URL('https://restricted.officieliptvsmarterspro.fr', request.url), 301);
    }
    
    if (!normalizedCountry && !isBot) {
      return NextResponse.redirect(new URL('https://restricted.officieliptvsmarterspro.fr', request.url), 301);
    }
  }
  
  const response = NextResponse.next();

  // ── Performance headers for all pages ──
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Enable early hints for faster resource loading
  response.headers.set('Link', [
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
    '<https://slelguoygbfzlpylpxfs.supabase.co>; rel=preconnect; crossorigin',
  ].join(', '));

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
