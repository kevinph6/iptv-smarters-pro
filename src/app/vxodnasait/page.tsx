"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Calendar, User, Loader2, LogOut, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { authClient, useSession } from '@/lib/auth-client';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featuredImageUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

    // Protect the route - redirect if not authenticated
    useEffect(() => {
      if (!isPending && !session?.user) {
        router.push('/login?redirect=/vxodnasait');
      }
    }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchPosts();
    }
  }, [session]);

    const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/blog?limit=100', {
            credentials: 'include',
          });
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
        const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`);
        if (!confirmed) return;

        try {
          setDeleting(id);
          const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
            credentials: 'include',
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


  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Déconnexion réussie');
      window.location.href = '/login';
    } catch {
      toast.error('Erreur lors de la déconnexion');
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

  // Show loading spinner while checking authentication
  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Chargement...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Chargement des articles...</p>
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
                Bienvenue, {session.user.name || session.user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/vxodnasait/generate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Générer avec IA
              </Link>
              <Link
                href="/vxodnasait/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Nouvel Article
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all duration-300"
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
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
                      Image
                    </th>
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
                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                          {post.featuredImageUrl ? (
                            <img
                              src={post.featuredImageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = '<svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                                }
                              }}
                            />
                          ) : (
                            <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                      </td>
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
                          href={`/vxodnasait/posts/${post.id}`}
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
                href="/vxodnasait/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Créer votre premier article
              </Link>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            href="/vxodnasait/users"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all group"
          >
            <User className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
              Gestion des Utilisateurs
            </h3>
            <p className="text-white/60 text-sm">
              Créez et gérez les comptes éditeurs
            </p>
          </Link>
          <Link
            href="/"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-green-500/50 transition-all group"
          >
            <Eye className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
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