import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const country = request.headers.get('cf-ipcountry') || request.geo?.country || '';
  const userAgent = request.headers.get('user-agent') || '';
  
  console.log('🔥 MIDDLEWARE RUNNING');
  console.log('Hostname:', hostname);
  console.log('Country (CF):', request.headers.get('cf-ipcountry'));
  console.log('Country (Vercel):', request.geo?.country);
  console.log('Country (Final):', country);
  console.log('Path:', request.nextUrl.pathname);
  
  // 1. SUBDOMAIN CHECK: Handle restricted subdomain
  if (hostname === 'restricted.abonnement-iptv-smarterspro.fr') {
    const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
    const normalizedCountry = country?.toUpperCase() || '';
    const isBot = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider/i.test(userAgent);
    
    if (normalizedCountry && allowedCountries.includes(normalizedCountry)) {
      console.log('✅ Allowed country on restricted subdomain - redirecting to main site');
      return NextResponse.redirect(new URL('https://abonnement-iptv-smarterspro.fr', request.url));
    }
    
    if (isBot) {
      console.log('🤖 Bot on restricted subdomain - redirecting to main site');
      return NextResponse.redirect(new URL('https://abonnement-iptv-smarterspro.fr', request.url));
    }
    
    console.log('🚫 Blocked country - showing restricted page');
    return NextResponse.rewrite(new URL('/geo-restricted', request.url));
  }
  
  // 2. BOT DETECTION
  const isBot = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider/i.test(userAgent);
  
  // 3. GEO-RESTRICTION
  const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
  
  if (hostname.includes('abonnement-iptv-smarterspro.fr') && 
      !hostname.includes('restricted.') &&
      !request.nextUrl.pathname.startsWith('/api/')) {
    
    const normalizedCountry = country?.toUpperCase() || '';
    
    if (normalizedCountry && !allowedCountries.includes(normalizedCountry) && !isBot) {
      console.log('🚫 BLOCKING COUNTRY:', normalizedCountry);
      return NextResponse.redirect(new URL('https://restricted.abonnement-iptv-smarterspro.fr', request.url));
    }
    
    if (!normalizedCountry && !isBot) {
      console.log('⚠️ No country detected - blocking by default');
      return NextResponse.redirect(new URL('https://restricted.abonnement-iptv-smarterspro.fr', request.url));
    }
  }
  
  // 4. PROTECTED ROUTES - check for session cookie existence
  // The actual session validation happens on the page level via useSession
  if (request.nextUrl.pathname.startsWith('/vxodnasait')) {
    const sessionToken = request.cookies.get('better-auth.session_token');
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
