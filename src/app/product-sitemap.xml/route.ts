export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  try {
    const { db } = await import('@/db');
    const { products } = await import('@/db/schema');

    const allProducts = await db
      .select({
        slug: products.slug,
        title: products.title,
        description: products.description,
        images: products.images,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .all();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allProducts.map(product => {
  const productUrl = `${baseUrl}/produits/${product.slug}`;
  const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString();

  // Parse product images (stored as JSON string)
  let imageTags = '';
  try {
    const imgs: string[] = JSON.parse(product.images);
    imageTags = imgs
      .slice(0, 3) // Google recommends max ~1000, but 3 per product is ideal
      .map(img => {
        const imgUrl = img.startsWith('http') ? img : `${baseUrl}${img}`;
        return `
    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${escapeXml(product.title)}</image:title>
      <image:caption>${escapeXml(product.description.substring(0, 200))}</image:caption>
    </image:image>`;
      })
      .join('');
  } catch {
    // images field might not be valid JSON — skip image tags
  }

  return `  <url>
    <loc>${productUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${productUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${productUrl}" />${imageTags}
  </url>`;
}).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error generating product sitemap:', error);

    // Fallback to hardcoded products
    const fallbackSlugs = [
      'abonnement-iptv-hd-3-mois',
      'abonnement-iptv-hd-6-mois',
      'abonnement-iptv-hd-12-mois',
      'abonnement-iptv-hd-24-mois',
      'abonnement-iptv-premium-4k-3-mois',
      'abonnement-iptv-premium-4k-6-mois',
      'abonnement-iptv-premium-4k-12-mois',
      'abonnement-iptv-premium-4k-24-mois',
    ];

    const now = new Date().toISOString();
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackSlugs.map(slug => `  <url>
    <loc>${baseUrl}/produits/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
