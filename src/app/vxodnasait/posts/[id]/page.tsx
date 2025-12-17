"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { BlogEditor } from '@/components/blog-editor';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    featuredImageUrl: '',
    published: false,
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user && params.id) {
      fetchPost();
    }
  }, [session, params.id]);

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${params.id}`, {
          cache: 'no-store',
          credentials: 'include',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
          }
        });
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const post = await response.json();
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          featuredImageUrl: post.featuredImageUrl || '',
          published: post.published,
        });
      } catch (error) {
        toast.error('Erreur lors du chargement de l\'article');
        console.error(error);
        router.push('/vxodnasait');
      } finally {
        setLoading(false);
      }
    };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/blog?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...formData,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update post');
      }

      toast.success('Article mis à jour avec succès!');
      router.push('/vxodnasait');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour de l\'article');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !session?.user || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/vxodnasait"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Link>
          <h1 className="text-4xl font-black text-white">
            Modifier l'Article
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <p className="text-white/40 text-sm mt-1">
              {formData.excerpt.length} caractères
            </p>
          </div>

          <BlogEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            imageUrl={formData.featuredImageUrl}
            onImageChange={(url) => setFormData({ ...formData, featuredImageUrl: url })}
          />

          <div className="flex items-center gap-3">
            <input
              id="published"
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            />
            <label htmlFor="published" className="text-white cursor-pointer">
              Publier (décochez pour enregistrer comme brouillon)
            </label>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              href="/vxodnasait"
              className="px-6 py-3 text-white/60 hover:text-white transition-colors"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
