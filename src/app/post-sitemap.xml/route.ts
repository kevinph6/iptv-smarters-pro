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
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
        featuredImageUrl: blogPosts.featuredImageUrl,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .all();

    const blogPage = {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    };

    // Build sitemap with image tags for better SEO
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${blogPage.url}</loc>
    <lastmod>${blogPage.lastModified.toISOString()}</lastmod>
    <changefreq>${blogPage.changeFrequency}</changefreq>
    <priority>${blogPage.priority}</priority>
  </url>
${posts.map(post => {
  const imageTag = post.featuredImageUrl 
    ? `
    <image:image>
      <image:loc>${post.featuredImageUrl.startsWith('http') ? post.featuredImageUrl : `${baseUrl}${post.featuredImageUrl}`}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>` 
    : '';
  return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
}).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
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
