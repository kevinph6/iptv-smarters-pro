export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abonnement-iptv-smarterspro.fr';
  
  // Static tutorial pages (expand this list as you add more tutorials)
  const tutorials = [
    { slug: 'comment-configurer-iptv-smarters-pro', lastModified: new Date('2025-12-01'), priority: 0.7 },
    { slug: 'installation-iptv-android', lastModified: new Date('2025-12-01'), priority: 0.7 },
    { slug: 'configuration-smart-tv', lastModified: new Date('2025-12-01'), priority: 0.7 },
  ];

  const tutorialsPage = {
    url: `${baseUrl}/tutoriels`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${tutorialsPage.url}</loc>
    <lastmod>${tutorialsPage.lastModified.toISOString()}</lastmod>
    <changefreq>${tutorialsPage.changeFrequency}</changefreq>
    <priority>${tutorialsPage.priority}</priority>
  </url>
${tutorials.map(tutorial => `  <url>
    <loc>${baseUrl}/tutoriels/${tutorial.slug}</loc>
    <lastmod>${tutorial.lastModified.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${tutorial.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
