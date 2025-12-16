"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Loader2, Save, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { BlogEditor } from '@/components/blog-editor';

function NewPostPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [generatingArticle, setGeneratingArticle] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Équipe IPTV PRO',
    category: 'Guides',
    featuredImageUrl: '',
    published: false,
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const title = searchParams.get('title');
    const excerpt = searchParams.get('excerpt');
    const content = searchParams.get('content');

    if (title || excerpt || content) {
      setFormData(prev => ({
        ...prev,
        title: title || prev.title,
        slug: title ? generateSlug(title) : prev.slug,
        excerpt: excerpt || prev.excerpt,
        content: content || prev.content,
      }));

      toast.success('Contenu AI chargé avec succès!');
    }
  }, [searchParams]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

    const getAuthHeaders = () => {
      if (typeof window === 'undefined') return {} as HeadersInit;
      const token = localStorage.getItem('bearer_token');
      return token ? ({ Authorization: `Bearer ${token}` } as HeadersInit) : ({} as HeadersInit);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to create post');
        }

        toast.success('Article créé avec succès!');
        router.push('/vxodnasait');
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la création de l\'article');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


  const handleGenerateArticle = async () => {
    if (!aiTopic.trim()) {
      toast.error('Veuillez entrer un sujet pour l\'article');
      return;
    }

    setGeneratingArticle(true);
    try {
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, keywords: aiKeywords }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      const data = await response.json();

      setFormData({
        ...formData,
        title: data.title || formData.title,
        slug: generateSlug(data.title || formData.title),
        excerpt: data.excerpt || formData.excerpt,
        content: data.content || formData.content,
      });

      toast.success('Article généré avec succès!');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la génération de l\'article');
      console.error(error);
    } finally {
      setGeneratingArticle(false);
    }
  };

  const handleGenerateImage = async () => {
    const topic = aiTopic.trim() || formData.title;
    if (!topic) {
      toast.error('Veuillez entrer un sujet ou un titre d\'abord');
      return;
    }

    setGeneratingImage(true);
    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      const data = await response.json();
      setFormData({ ...formData, featuredImageUrl: data.imageUrl });
      toast.success('Image générée avec succès!');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la génération de l\'image');
      console.error(error);
    } finally {
      setGeneratingImage(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/vxodnasait"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Link>
          <h1 className="text-4xl font-black text-white">Nouvel Article</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Comment choisir le meilleur abonnement IPTV..."
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-white font-semibold mb-2">
              Slug (URL) <span className="text-red-400">*</span>
            </label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
              placeholder="comment-choisir-meilleur-abonnement-iptv"
              required
            />
            <p className="text-white/40 text-sm mt-1">
              URL: /blog/{formData.slug || 'votre-slug'}
            </p>
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-white font-semibold mb-2">
                Catégorie <span className="text-red-400">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="Guides">Guides</option>
                <option value="Tutoriels">Tutoriels</option>
                <option value="Comparatifs">Comparatifs</option>
                <option value="Actualités">Actualités</option>
                <option value="FAQ">FAQ</option>
              </select>
            </div>

            <div>
              <label htmlFor="author" className="block text-white font-semibold mb-2">
                Auteur <span className="text-red-400">*</span>
              </label>
              <select
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="Équipe IPTV PRO">Équipe IPTV PRO</option>
                <option value="Support IPTV">Support IPTV</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-white font-semibold mb-2">
              Extrait (Résumé) <span className="text-red-400">*</span>
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
              placeholder="Un court résumé de 1-2 phrases (150-200 caractères)"
              required
            />
            <p className="text-white/40 text-sm mt-1">{formData.excerpt.length} caractères</p>
          </div>

          {/* Blog Editor with Image Upload */}
          <BlogEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            imageUrl={formData.featuredImageUrl}
            onImageChange={(url) => setFormData({ ...formData, featuredImageUrl: url })}
          />

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              id="published"
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            />
            <label htmlFor="published" className="text-white cursor-pointer">
              Publier immédiatement (décochez pour enregistrer comme brouillon)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Créer l'article
                </>
              )}
            </button>
            <Link href="/vxodnasait" className="px-6 py-3 text-white/60 hover:text-white transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewPostPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      }
    >
      <NewPostPageContent />
    </Suspense>
  );
}
