import { NextResponse, type NextRequest } from "next/server";

const SEO_HOME_PATH = "/abonnement-iptv/";
const ALLOWED_COUNTRIES = ["FR", "BE", "GF", "GP", "MQ", "MF", "BL"];

function withBaseHeaders(response: NextResponse) {
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

function isAlwaysAllowedPath(pathname: string) {
  // Never geo-block or redirect critical discovery endpoints.
  if (pathname === "/robots.txt") return true;
  if (pathname.endsWith(".xml")) return true; // sitemap index + sub-sitemaps (+ future sitemaps)
  if (pathname.endsWith(".txt")) return true; // IndexNow key verification + other TXT files
  if (pathname === "/blog/feed.xml") return true; // RSS feed
  if (pathname === "/og-image.jpg") return true; // OG image for crawlers
  if (pathname === "/logo.png") return true; // Logo for schema
  return false;
}

function safeUrlHostFromEnv(envValue: string | undefined): string | null {
  if (!envValue) return null;
  try {
    return new URL(envValue).host.toLowerCase();
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || "";
  const hostname = hostHeader.split(":")[0].toLowerCase();
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider/i.test(userAgent);

  const envCanonicalHost = safeUrlHostFromEnv(process.env.NEXT_PUBLIC_SITE_URL);
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local");
  const isPreview =
    hostname.endsWith(".vercel.app") ||
    hostname.endsWith(".orchids.dev") ||
    hostname.includes("localhost");

  const canonicalHost = envCanonicalHost || hostname.replace(/^restricted\./, "");
  const protocol = isLocalhost ? request.nextUrl.protocol : "https:";
  const canonicalOrigin = `${protocol}//${canonicalHost}`;
  const restrictedHost = `restricted.${canonicalHost}`;
  const restrictedOrigin = `${protocol}//${restrictedHost}`;
  const isRestrictedSubdomain = hostname === restrictedHost || hostname.startsWith("restricted.");

  const geoCountry = (request as NextRequest & { geo?: { country?: string } }).geo?.country;
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    geoCountry ||
    "";
  const normalizedCountry = country.toUpperCase();

  // Always allow discovery endpoints (robots + sitemaps), otherwise GSC/indexing can fail.
  if (isAlwaysAllowedPath(pathname)) {
    return withBaseHeaders(NextResponse.next());
  }

  // Optional: if a canonical host is configured, 301 everything to it (preserve path/query).
  // This is the correct way to consolidate backlinks across old domains/subdomains.
  if (!isLocalhost && !isPreview && envCanonicalHost) {
    if (hostname !== canonicalHost && hostname !== restrictedHost) {
      const target = new URL(canonicalOrigin);
      target.pathname = pathname;
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
  }

  // Normalize "/abonnement-iptv" → "/abonnement-iptv/" (permanent, no chains)
  if (pathname === "/abonnement-iptv") {
    const url = request.nextUrl.clone();
    url.pathname = SEO_HOME_PATH;
    return withBaseHeaders(NextResponse.redirect(url, 301));
  }
  
  // 1. SUBDOMAIN CHECK: Handle restricted subdomain
  if (isRestrictedSubdomain) {
    
    // Restricted subdomain "/" must also permanently redirect to the SEO homepage (single hop).
    if (pathname === "/") {
      const target = new URL(`${canonicalOrigin}${SEO_HOME_PATH}`, request.url);
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
    
    // If someone hits the restricted host but is allowed (or is a crawler),
    // 301 them back to the canonical host (preserve path/query to avoid losing backlinks).
    if ((normalizedCountry && ALLOWED_COUNTRIES.includes(normalizedCountry)) || isBot) {
      const target = new URL(`${canonicalOrigin}${pathname}`, request.url);
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
    
    return withBaseHeaders(NextResponse.rewrite(new URL("/geo-restricted", request.url)));
  }

  // 2. GEO-RESTRICTION
  if (
    hostname === canonicalHost &&
    !request.nextUrl.pathname.startsWith("/api/")
  ) {

    // Root must NEVER serve HTML; ensure a true 301 and avoid geo-bypass for bots.
    // For humans, keep geo routing but do it in a single hop (no redirect chains).
    if (pathname === "/") {
      if (isBot) {
        const url = request.nextUrl.clone();
        url.pathname = SEO_HOME_PATH;
        return withBaseHeaders(NextResponse.redirect(url, 301));
      }

      const isAllowed = normalizedCountry && ALLOWED_COUNTRIES.includes(normalizedCountry);
      if (isAllowed) {
        const url = request.nextUrl.clone();
        url.pathname = SEO_HOME_PATH;
        return withBaseHeaders(NextResponse.redirect(url, 301));
      }

      const target = new URL(`${restrictedOrigin}${SEO_HOME_PATH}`, request.url);
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
    
    // Blocked (or unknown) countries → restricted subdomain (preserve path/query).
    if (normalizedCountry && !ALLOWED_COUNTRIES.includes(normalizedCountry) && !isBot) {
      const target = new URL(`${restrictedOrigin}${pathname}`, request.url);
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
    
    if (!normalizedCountry && !isBot) {
      const target = new URL(`${restrictedOrigin}${pathname}`, request.url);
      target.search = request.nextUrl.search;
      return withBaseHeaders(NextResponse.redirect(target, 301));
    }
  }
  
  return withBaseHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
