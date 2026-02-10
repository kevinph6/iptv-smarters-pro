export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  
  const sitemaps = [
    {
      loc: `${baseUrl}/page-sitemap.xml`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${baseUrl}/post-sitemap.xml`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${baseUrl}/tutorial-sitemap.xml`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${baseUrl}/product-sitemap.xml`,
      lastmod: new Date().toISOString(),
    },
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
