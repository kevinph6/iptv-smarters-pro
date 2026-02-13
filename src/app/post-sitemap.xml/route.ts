export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  try {
    const { db } = await import('@/db');
    const { blogPosts } = await import('@/db/schema');
    const { eq, desc } = await import('drizzle-orm');

    const posts = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
        featuredImageUrl: blogPosts.featuredImageUrl,
        category: blogPosts.category,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .all();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${posts.map(post => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const lastmod = new Date(post.updatedAt || post.createdAt).toISOString();
  const pubDate = new Date(post.createdAt).toISOString();
  const imageUrl = post.featuredImageUrl
    ? (post.featuredImageUrl.startsWith('http') ? post.featuredImageUrl : `${baseUrl}${post.featuredImageUrl}`)
    : null;

  // Google News tag — only for posts published within the last 2 days (Google News requirement)
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const isRecent = new Date(post.createdAt) > twoDaysAgo;

  const newsTag = isRecent ? `
    <news:news>
      <news:publication>
        <news:name>IPTV Smarters Pro Officiel</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>` : '';

  const imageTag = imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.excerpt || post.title)}</image:caption>
    </image:image>` : '';

  return `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${postUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${postUrl}" />${newsTag}${imageTag}
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
    console.error('Error generating blog sitemap:', error);

    // Fallback — at least include the blog index
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
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
