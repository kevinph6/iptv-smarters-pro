import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { ShareButton } from './share-button';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);

  return posts[0] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Article non trouve' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const seoHomeUrl = `${baseUrl}/abonnement-iptv/`;

  // Generate dynamic keywords from title and category
  const titleWords = post.title.toLowerCase().split(/[\s:,\-–]+/).filter((w: string) => w.length > 3);
  const dynamicKeywords = [
    'iptv', 'abonnement iptv', 'iptv smarters pro', 'iptv france',
    'meilleur iptv', 'iptv pas cher', 'iptv 4k', 'iptv streaming',
    post.category?.toLowerCase() || 'iptv',
    ...titleWords.slice(0, 5),
  ];

  return {
    title: `${post.title} | IPTV Smarters Pro`,
    description: post.excerpt,
    keywords: [...new Set(dynamicKeywords)],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: 'IPTV SMARTERS PRO',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.featuredImageUrl
        ? [{ url: `${baseUrl}${post.featuredImageUrl}`, width: 1200, height: 630, alt: post.title }]
        : [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImageUrl ? [`${baseUrl}${post.featuredImageUrl}`] : [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const seoHomeUrl = `${baseUrl}/abonnement-iptv/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImageUrl ? `${baseUrl}${post.featuredImageUrl}` : `${baseUrl}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "IPTV SMARTERS PRO",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    "articleSection": post.category,
    "inLanguage": "fr-FR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": seoHomeUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };

  // Extract FAQ schema from content (H3 questions followed by paragraphs)
  const faqRegex = /<h3>(.*?\?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  const faqItems: { question: string; answer: string }[] = [];
  let faqMatch;
  while ((faqMatch = faqRegex.exec(post.content)) !== null) {
    faqItems.push({
      question: faqMatch[1].replace(/<[^>]*>/g, ''),
      answer: faqMatch[2].replace(/<[^>]*>/g, '').trim(),
    });
  }

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <NavigationHeader />

      {/* Article Header */}
      <article className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li><Link href="/abonnement-iptv/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-white/80 truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour au Blog
          </Link>

          {/* Category Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            </div>
            <ShareButton title={post.title} excerpt={post.excerpt} />
          </div>

          {/* Featured Image or Gradient Hero */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 relative h-[300px] md:h-[500px] bg-gradient-to-br from-cyan-900/40 to-purple-900/40">
            {post.featuredImageUrl ? (
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 right-6 w-40 h-40 border-2 border-white rounded-full" />
                  <div className="absolute bottom-6 left-6 w-28 h-28 border-2 border-white rounded-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-7xl drop-shadow-lg block mb-4">📺</span>
                    <p className="text-white/80 text-sm font-medium max-w-md px-4">{post.category} • IPTV SMARTERS PRO</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:text-white prose-headings:mb-4 prose-headings:mt-8
              prose-h2:text-3xl prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-cyan-400 prose-h2:to-purple-400
              prose-h3:text-2xl prose-h3:text-white
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-purple-400 prose-a:transition-colors
              prose-strong:text-white prose-strong:font-bold
              prose-ul:text-white/80 prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
              prose-ol:text-white/80 prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
              prose-li:mb-2
              prose-code:text-cyan-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/60"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Pret a Demarrer avec <span className="text-cyan-400">IPTV SMARTERS PRO</span> ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Profitez de plus de 160 000 chaines et 20 000+ contenus VOD avec notre abonnement IPTV premium.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/abonnement-iptv/#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                S&apos;abonner Maintenant
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Voir Plus d&apos;Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
