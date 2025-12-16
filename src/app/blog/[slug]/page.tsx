"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { Calendar, User, ArrowLeft, Loader2, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featuredImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      // Update document title and meta description dynamically
      document.title = `${post.title} | Blog IPTV SMARTERS PRO`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', post.title);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = post.title;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }
    }
  }, [post]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/blog/slug/${slug}`);
      
      if (!response.ok) {
        throw new Error('Article non trouvé');
      }
      
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copié dans le presse-papier !');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papier !');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <NavigationHeader />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Chargement de l'article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black">
        <NavigationHeader />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-black text-white mb-4">Article non trouvé</h1>
            <p className="text-white/60 mb-8">
              Désolé, l'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />

      {/* Article Header */}
      <article className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto px-6">
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
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager</span>
            </button>
          </div>

            {/* Featured Image */}
            {post.featuredImageUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={post.featuredImageUrl}
                  alt={`${post.title} - Guide complet IPTV SMARTERS PRO France`}
                  className="w-full h-auto"
                  loading="eager"
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
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
              Prêt à Démarrer avec <span className="text-cyan-400">IPTV SMARTERS PRO</span> ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Profitez de plus de 160 000 chaînes et 20 000+ contenus VOD avec notre abonnement IPTV premium.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                S'abonner Maintenant
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Voir Plus d'Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}