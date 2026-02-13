export const dynamic = 'force-dynamic';
export const revalidate = 0;

// All programmatic page slugs — must match src/app/iptv-[slug]/page.tsx
const PROGRAMMATIC_SLUGS = [
  // Device pages
  'samsung', 'firestick', 'lg', 'apple-tv', 'android', 'smart-tv', 'ios', 'android-tv',
  // City pages
  'paris', 'lyon', 'marseille', 'toulouse', 'bordeaux', 'lille', 'nice', 'nantes', 'strasbourg', 'montpellier',
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PROGRAMMATIC_SLUGS.map(slug => {
  const url = `${baseUrl}/iptv-${slug}`;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
