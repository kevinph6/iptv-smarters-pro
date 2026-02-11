import { MetadataRoute } from 'next';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const seoHomeUrl = `${baseUrl}/abonnement-iptv/`;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: seoHomeUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/chaines`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tutoriels`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/remboursement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Tutorial pages
  const tutorialSlugs = ['android', 'ios', 'smart-tv', 'fire-tv', 'pc-mac', 'android-tv'];
  const tutorialPages: MetadataRoute.Sitemap = tutorialSlugs.map(slug => ({
    url: `${baseUrl}/tutoriels/${slug}`,
    lastModified: new Date('2026-02-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Product pages
  const productSlugs = [
    'abonnement-iptv-hd-3-mois', 'abonnement-iptv-hd-6-mois',
    'abonnement-iptv-hd-12-mois', 'abonnement-iptv-hd-24-mois',
    'abonnement-iptv-premium-4k-3-mois', 'abonnement-iptv-premium-4k-6-mois',
    'abonnement-iptv-premium-4k-12-mois', 'abonnement-iptv-premium-4k-24-mois',
  ];
  const productPages: MetadataRoute.Sitemap = productSlugs.map(slug => ({
    url: `${baseUrl}/produits/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic blog posts - fetched from database
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await db
      .select({
        slug: blogPosts.slug,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .all();

    blogPages = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...tutorialPages, ...productPages, ...blogPages];
}
