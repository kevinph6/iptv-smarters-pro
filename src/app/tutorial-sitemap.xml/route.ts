export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  
  const tutorials = [
    { slug: 'android', title: 'Installer IPTV Smarters Pro sur Android', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'ios', title: 'Installer IPTV Smarters Pro sur iPhone/iPad (iOS)', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'smart-tv', title: 'Installer IPTV sur Smart TV Samsung/LG', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'fire-tv', title: 'Installer IPTV sur Fire TV Stick Amazon', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'pc-mac', title: 'Installer IPTV sur PC Windows et Mac', lastModified: new Date('2026-02-01'), priority: 0.7 },
    { slug: 'android-tv', title: 'Installer IPTV sur Android TV / Box TV', lastModified: new Date('2026-02-01'), priority: 0.7 },
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
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
