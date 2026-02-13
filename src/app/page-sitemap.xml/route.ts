export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  const staticPages = [
    {
      url: `${baseUrl}/abonnement-iptv/`,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/chaines`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutoriels`,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/confidentialite`,
      changefreq: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/remboursement`,
      changefreq: 'monthly',
      priority: 0.3,
    },
  ];

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${page.url}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
