"use client";

import { useEffect, useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
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
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogPost | null>(null);

  const categories = [
    'Guides',
    'Tutoriels',
    'Comparatifs',
    'Applications',
    'Support',
    'Sport',
    'VOD',
    'Sécurité',
    'Fonctionnalités',
    'Chaînes',
  ];

  useEffect(() => {
    fetchPost();
  }, [postId]);

    const getAuthHeaders = () => {
      if (typeof window === 'undefined') return {} as HeadersInit;
      const token = localStorage.getItem('bearer_token');
      return token ? ({ Authorization: `Bearer ${token}` } as HeadersInit) : ({} as HeadersInit);
    };

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${postId}`);
        if (!response.ok) throw new Error('Article non trouvé');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error('Erreur lors du chargement de l\'article');
        console.error(error);
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    const handleTitleChange = (title: string) => {
      if (!formData) return;
      setFormData({
        ...formData,
        title,
        // Auto-generate slug from title
        slug: title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove accents
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
          .replace(/^-+|-+$/g, ''), // Remove leading/trailing hyphens
      });
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      
      if (!formData || !formData.title || !formData.slug || !formData.excerpt || !formData.content) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }

      try {
        setSaving(true);
        const response = await fetch(`/api/blog?id=${postId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            author: formData.author,
            category: formData.category,
            featuredImageUrl: formData.featuredImageUrl || null,
            published: formData.published,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Erreur lors de la mise à jour');
        }

        toast.success('Article mis à jour avec succès !');
        router.push('/admin');
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la mise à jour de l\'article');
        console.error(error);
      } finally {
        setSaving(false);
      }
    };


  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au Dashboard
          </Link>
          <h1 className="text-4xl font-black text-white">
            Modifier l'Article
          </h1>
          <p className="text-white/60 mt-2">
            Modifiez les informations de votre article de blog
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="block text-white font-semibold mb-2">
              Titre de l'article <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Guide Complet IPTV SMARTERS PRO 2025"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="block text-white font-semibold mb-2">
              Slug (URL) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="guide-complet-iptv-smarters-pro-2025"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
            <p className="text-white/40 text-sm mt-2">
              URL finale: /blog/{formData.slug}
            </p>
          </div>

          {/* Category and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">
                Catégorie <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">
                Auteur <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              >
                <option value="Équipe IPTV PRO">Équipe IPTV PRO</option>
                <option value="Support IPTV">Support IPTV</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="block text-white font-semibold mb-2">
              Extrait (Résumé) <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brève description de l'article (150-200 caractères)"
              rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              required
            />
            <p className="text-white/40 text-sm mt-2">
              {formData.excerpt.length} caractères
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="block text-white font-semibold mb-2">
              Contenu de l'article (HTML) <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="<h2>Titre de section</h2><p>Votre contenu ici...</p>"
              rows={15}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm"
              required
            />
            <p className="text-white/40 text-sm mt-2">
              Vous pouvez utiliser les balises HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;
            </p>
          </div>

          {/* Featured Image URL */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="block text-white font-semibold mb-2">
              URL Image de Couverture (optionnel)
            </label>
            <input
              type="url"
              value={formData.featuredImageUrl || ''}
              onChange={(e) => setFormData({ ...formData, featuredImageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Published Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-black/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-white font-semibold">
                Publier cet article
              </span>
            </label>
            <p className="text-white/40 text-sm mt-2 ml-8">
              Décochez pour mettre en brouillon
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer les modifications
                </>
              )}
            </button>
            <Link
              href="/admin"
              className="px-6 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
