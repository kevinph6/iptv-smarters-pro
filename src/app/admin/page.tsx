"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Calendar, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?limit=100');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des articles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return;

    try {
      setDeleting(id);
      const response = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');

      toast.success('Article supprimé avec succès');
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    } finally {
      setDeleting(null);
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

  if (loading) {
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
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/60">
                Gérez vos articles de blog IPTV SMARTERS PRO
              </p>
            </div>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Nouvel Article
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Total Articles</div>
              <div className="text-3xl font-bold text-white">{posts.length}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Publiés</div>
              <div className="text-3xl font-bold text-green-400">
                {posts.filter(p => p.published).length}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Brouillons</div>
              <div className="text-3xl font-bold text-yellow-400">
                {posts.filter(p => !p.published).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Titre
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Catégorie
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Auteur
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Statut
                  </th>
                  <th className="text-right px-6 py-4 text-white/80 font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-white/40 text-sm mt-1">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          Publié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                          Brouillon
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-cyan-400"
                          title="Voir l'article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-purple-400"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-red-400 disabled:opacity-50"
                          title="Supprimer"
                        >
                          {deleting === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40 mb-4">Aucun article pour le moment</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Créer votre premier article
              </Link>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/blog"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-500/50 transition-all group"
          >
            <Eye className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
              Voir le Blog Public
            </h3>
            <p className="text-white/60 text-sm">
              Consultez votre blog tel que vos visiteurs le voient
            </p>
          </Link>
          <Link
            href="/"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all group"
          >
            <Eye className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
              Retour au Site
            </h3>
            <p className="text-white/60 text-sm">
              Retournez à la page d'accueil IPTV SMARTERS PRO
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
