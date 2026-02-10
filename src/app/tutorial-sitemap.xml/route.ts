export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  
  // Tutorial slugs must match `src/app/tutoriels/[slug]/page.tsx`
  const tutorials = [
    { slug: 'android', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'ios', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'smart-tv', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'fire-tv', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'pc-mac', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'android-tv', lastModified: new Date('2026-02-01'), priority: 0.7 },
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
