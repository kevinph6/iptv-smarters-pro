import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abonnement-iptv-smarterspro.fr';
  
  // Main sitemap.xml now redirects to the sitemap index structure
  // This maintains backward compatibility while using the proper sitemap index format
  const allPages: MetadataRoute.Sitemap = [];

  // Fetch all static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/chaines`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tutoriels`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/remboursement`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.2 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.2 },
  ];

  allPages.push(...staticPages);

  // Fetch all blog posts
  try {
    const { db } = await import('@/db');
    const { blogPosts } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');
    
    const posts = await db
      .select({
        slug: blogPosts.slug,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .all();

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    allPages.push(...blogPages);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Add tutorial pages
  const tutorials = [
    { slug: 'comment-configurer-iptv-smarters-pro', lastModified: new Date('2025-12-01'), priority: 0.7 },
    { slug: 'installation-iptv-android', lastModified: new Date('2025-12-01'), priority: 0.7 },
    { slug: 'configuration-smart-tv', lastModified: new Date('2025-12-01'), priority: 0.7 },
  ];

  const tutorialPages: MetadataRoute.Sitemap = tutorials.map((tutorial) => ({
    url: `${baseUrl}/tutoriels/${tutorial.slug}`,
    lastModified: tutorial.lastModified,
    changeFrequency: 'monthly' as const,
    priority: tutorial.priority,
  }));

  allPages.push(...tutorialPages);

  return allPages;
}