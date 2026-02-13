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
        content: blogPosts.content,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
        featuredImageUrl: blogPosts.featuredImageUrl,
        category: blogPosts.category,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .limit(50)
      .all();

    const escapeXml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>IPTV Smarters Pro - Blog IPTV France</title>
    <link>${baseUrl}/blog</link>
    <description>Actualités, guides et tutoriels IPTV France. Meilleur abonnement IPTV 2026 avec 160 000+ chaînes 4K. IPTV Smarters Pro.</description>
    <language>fr-FR</language>
    <lastBuildDate>${posts.length > 0 ? new Date(posts[0].createdAt).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <generator>IPTV Smarters Pro</generator>
    <managingEditor>support@iptvsmarterspro.fr (IPTV Smarters Pro)</managingEditor>
    <webMaster>support@iptvsmarterspro.fr (IPTV Smarters Pro)</webMaster>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>IPTV Smarters Pro</title>
      <link>${baseUrl}/blog</link>
    </image>
${posts.map(post => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const pubDate = new Date(post.createdAt).toUTCString();
  const imageUrl = post.featuredImageUrl
    ? (post.featuredImageUrl.startsWith('http') ? post.featuredImageUrl : `${baseUrl}${post.featuredImageUrl}`)
    : `${baseUrl}/og-image.jpg`;
  const excerpt = post.excerpt || '';
  // Strip HTML for description, keep first 300 chars
  const plainExcerpt = excerpt.replace(/<[^>]*>/g, '').slice(0, 300);

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>IPTV Smarters Pro</dc:creator>
      <category>${escapeXml(post.category || 'IPTV')}</category>
      <description>${escapeXml(plainExcerpt)}</description>
      <enclosure url="${escapeXml(imageUrl)}" type="image/png" length="0" />
    </item>`;
}).join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    // Fallback empty RSS if DB is unavailable
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>IPTV Smarters Pro - Blog IPTV France</title>
    <link>${baseUrl}/blog</link>
    <description>Actualités et guides IPTV France 2026.</description>
    <language>fr-FR</language>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}
