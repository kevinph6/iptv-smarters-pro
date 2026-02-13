import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

export const metadata: Metadata = {
  title: 'Blog IPTV France 2026 - Guides, Tutoriels, Comparatifs & Avis | IPTV Smarters Pro',
  description: 'Blog IPTV France : guides complets, comparatifs, tutoriels d\'installation et avis sur les meilleurs abonnements IPTV. Conseils d\'experts pour choisir le meilleur IPTV pas cher, installer sur Smart TV, Fire Stick et profiter de l\'IPTV 4K sans coupure.',
  keywords: [
    'blog iptv',
    'guide iptv france',
    'meilleur abonnement iptv',
    'iptv pas cher',
    'iptv smarters pro',
    'iptv france 2026',
    'abonnement iptv france',
    'iptv 4k',
    'iptv sans coupure',
    'installer iptv smart tv',
    'iptv fire stick',
    'iptv sport',
    'comparatif iptv',
    'test iptv gratuit',
    'vod iptv',
    'iptv legal france',
    'iptv streaming',
    'meilleur iptv 2026',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog IPTV France 2026 - Guides, Comparatifs & Avis | IPTV Smarters Pro',
    description: 'Guides complets, comparatifs et tutoriels pour choisir et installer votre abonnement IPTV en France. Meilleur IPTV pas cher, 4K, sport et VOD.',
    type: 'website',
    locale: 'fr_FR',
    url: '/blog',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog IPTV Smarters Pro France - Guides et Comparatifs IPTV 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPTV France 2026 - Guides & Comparatifs',
    description: 'Guides, comparatifs et avis IPTV France. Trouvez le meilleur abonnement IPTV pas cher avec IPTV Smarters Pro.',
    images: [`${baseUrl}/og-image.jpg`],
  },
};

async function BlogItemListSchema() {
  try {
    const { db } = await import('@/db');
    const { blogPosts } = await import('@/db/schema');
    const { eq, desc } = await import('drizzle-orm');

    const posts = await db
      .select({
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        featuredImageUrl: blogPosts.featuredImageUrl,
        createdAt: blogPosts.createdAt,
        author: blogPosts.author,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .limit(20)
      .all();

    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Blog IPTV France 2026 - Guides, Comparatifs & Avis",
      "description": "Guides complets, comparatifs et tutoriels pour choisir et installer votre abonnement IPTV en France.",
      "url": `${baseUrl}/blog`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": posts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `${baseUrl}/blog/${post.slug}`,
            "image": post.featuredImageUrl
              ? (post.featuredImageUrl.startsWith('http') ? post.featuredImageUrl : `${baseUrl}${post.featuredImageUrl}`)
              : `${baseUrl}/og-image.jpg`,
            "datePublished": post.createdAt,
            "author": { "@type": "Person", "name": post.author },
            "publisher": {
              "@type": "Organization",
              "name": "IPTV SMARTERS PRO",
              "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
            }
          }
        }))
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  } catch {
    return null;
  }
}

export default async function BlogPage() {
  return (
    <>
      <BlogItemListSchema />
      <BlogPageClient />
    </>
  );
}
