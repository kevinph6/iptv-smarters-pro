import { Metadata } from 'next';
import Link from 'next/link';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  // Fetch posts server-side so all links appear in the initial HTML for Googlebot
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      author: blogPosts.author,
      category: blogPosts.category,
      featuredImageUrl: blogPosts.featuredImageUrl,
      createdAt: blogPosts.createdAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt))
    .limit(50)
    .all();

  // Schema.org structured data
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-black">
        <NavigationHeader />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
                Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IPTV</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Guides complets, tutoriels et actualités pour votre <span className="text-cyan-400 font-semibold">abonnement IPTV SMARTERS PRO</span>. 
                Découvrez comment optimiser votre expérience de streaming IPTV.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-lg">Aucun article disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article 
                    key={post.id}
                    className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500" />
                    
                    <div className="relative p-6">
                      {/* Category Badge */}
                      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-white/60 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-purple-400 transition-colors group/link"
                      >
                        Lire l&apos;article
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Prêt à Profiter de l&apos;<span className="text-cyan-400">IPTV SMARTERS PRO</span> ?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Plus de 160 000 chaînes, 20 000+ VOD, activation instantanée. Votre abonnement IPTV commence maintenant.
              </p>
              <Link
                href="/abonnement-iptv/#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                S&apos;abonner Maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
