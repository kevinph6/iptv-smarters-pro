export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  
  const products = [
    'abonnement-iptv-hd-3-mois',
    'abonnement-iptv-hd-6-mois',
    'abonnement-iptv-hd-12-mois',
    'abonnement-iptv-hd-24-mois',
    'abonnement-iptv-premium-4k-3-mois',
    'abonnement-iptv-premium-4k-6-mois',
    'abonnement-iptv-premium-4k-12-mois',
    'abonnement-iptv-premium-4k-24-mois',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products.map(slug => `  <url>
    <loc>${baseUrl}/produits/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
