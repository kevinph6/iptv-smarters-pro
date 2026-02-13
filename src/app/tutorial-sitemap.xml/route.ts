export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  const tutorials = [
    {
      slug: 'android',
      title: 'Installation IPTV SMARTERS PRO sur Android',
      description: 'Guide complet pour installer IPTV Smarters Pro sur smartphone et tablette Android',
    },
    {
      slug: 'ios',
      title: 'Installation IPTV SMARTERS PRO sur iPhone/iPad (iOS)',
      description: 'Guide complet pour installer IPTV Smarters Pro sur iPhone et iPad',
    },
    {
      slug: 'smart-tv',
      title: 'Installation IPTV sur Smart TV Samsung/LG',
      description: 'Guide complet pour installer IPTV Smarters Pro sur Smart TV Samsung et LG',
    },
    {
      slug: 'fire-tv',
      title: 'Installation IPTV sur Fire TV Stick Amazon',
      description: 'Guide complet pour installer IPTV Smarters Pro sur Fire TV Stick',
    },
    {
      slug: 'pc-mac',
      title: 'Installation IPTV sur PC Windows et Mac',
      description: 'Guide complet pour installer IPTV Smarters Pro sur ordinateur PC et Mac',
    },
    {
      slug: 'android-tv',
      title: 'Installation IPTV sur Android TV / Box TV',
      description: 'Guide complet pour installer IPTV Smarters Pro sur Android TV et Box TV',
    },
  ];

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/tutoriels</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/tutoriels" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/tutoriels" />
  </url>
${tutorials.map(t => `  <url>
    <loc>${baseUrl}/tutoriels/${t.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/tutoriels/${t.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/tutoriels/${t.slug}" />
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>${escapeXml(t.title)}</image:title>
      <image:caption>${escapeXml(t.description)}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
