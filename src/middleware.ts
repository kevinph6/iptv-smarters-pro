import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const country = request.headers.get('cf-ipcountry') || request.geo?.country || '';
  const userAgent = request.headers.get('user-agent') || '';
  
  console.log('🔥 MIDDLEWARE RUNNING');
  console.log('Hostname:', hostname);
  console.log('Country:', country);
  console.log('Path:', request.nextUrl.pathname);
  
  // Skip API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // GEO-RESTRICTION DISABLED - Website now accessible worldwide
  // const isBot = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider/i.test(userAgent);
  // const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
  // const normalizedCountry = country?.toUpperCase() || '';
  
  // // 1. HANDLE RESTRICTED SUBDOMAIN
  // if (hostname === 'restricted.abonnement-iptv-smarterspro.fr') {
  //   console.log('🎯 On restricted subdomain');
  //   
  //   // If allowed country or bot, redirect to main site
  //   if ((normalizedCountry && allowedCountries.includes(normalizedCountry)) || isBot) {
  //     console.log('✅ Redirecting allowed user to main site');
  //     return NextResponse.redirect(new URL('https://abonnement-iptv-smarterspro.fr', request.url));
  //   }
  //   
  //   // Otherwise, REWRITE to show /geo-restricted content
  //   console.log('🚫 Showing restricted page');
  //   return NextResponse.rewrite(new URL('/geo-restricted', request.url));
  // }
  
  // // 2. GEO-RESTRICTION ON MAIN DOMAIN
  // if (hostname.includes('abonnement-iptv-smarterspro.fr') && !hostname.includes('restricted.')) {
  //   
  //   // Block non-allowed countries
  //   if (normalizedCountry && !allowedCountries.includes(normalizedCountry) && !isBot) {
  //     console.log('🚫 BLOCKING:', normalizedCountry);
  //     return NextResponse.redirect(new URL('https://restricted.abonnement-iptv-smarterspro.fr', request.url));
  //   }
  //   
  //   // Block if no country detected (except bots)
  //   if (!normalizedCountry && !isBot) {
  //     console.log('⚠️ No country - blocking');
  //     return NextResponse.redirect(new URL('https://restricted.abonnement-iptv-smarterspro.fr', request.url));
  //   }
  // }
  
  // 3. PROTECTED ROUTES
  if (request.nextUrl.pathname.startsWith('/vxodnasait')) {
    return handleProtectedRoutes(request);
  }
  
  return NextResponse.next();
}

async function handleProtectedRoutes(request: NextRequest) {
  try {
    const response = await fetch(
      new URL('/api/auth/get-session', request.nextUrl.origin),
      { headers: { cookie: request.headers.get('cookie') || '' } }
    );
    if (!response.ok) return NextResponse.redirect(new URL('/login', request.url));
    const data = await response.json();
    if (!data?.session) return NextResponse.redirect(new URL('/login', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};