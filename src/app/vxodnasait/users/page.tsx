"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, ArrowLeft, Mail, User as UserIcon, Calendar, Loader2, Shield, AlertTriangle, Edit2, Trash2, Key, X, Sparkles, RefreshCw, Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { generateStrongPassword, calculatePasswordStrength } from '@/lib/password-generator';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: number;
}

export default function UsersManagement() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showGeneratedPasswordOptions, setShowGeneratedPasswordOptions] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'writer',
  });
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'writer',
  });
  const [passwordData, setPasswordData] = useState({
    userId: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  // Protect the route and check admin role
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    } else if (session?.user) {
      checkAdminRole();
    }
  }, [session, isPending, router]);

  const checkAdminRole = async () => {
    try {
        const response = await fetch('/api/users', {
          credentials: 'include',
        });
      
      if (response.status === 403) {
        toast.error('Accès refusé - Droits administrateur requis');
        router.push('/vxodnasait');
        return;
      }

      if (!response.ok) throw new Error('Failed to verify admin role');
      
      const data = await response.json();
      setUsers(data.users || []);
      setCurrentUserRole(data.currentUserRole);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la vérification des permissions');
      router.push('/vxodnasait');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (newUser.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setCreating(true);

      try {
        const response = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newUser),
        });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create user');
      }

      const result = await response.json();
      toast.success(`Utilisateur ${result.user.role} créé avec succès!`);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'writer' });
      checkAdminRole();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création de l\'utilisateur');
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editUser.name || !editUser.email) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setEditing(true);

      try {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(editUser),
        });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user');
      }

      toast.success('Utilisateur mis à jour avec succès!');
      setShowEditModal(false);
      setSelectedUser(null);
      checkAdminRole();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
      console.error(error);
    } finally {
      setEditing(false);
    }
  };

  const handlePasswordClick = (user: User) => {
    setPasswordData({
      userId: user.id,
      userName: user.name,
      password: '',
      confirmPassword: '',
    });
    setShowPasswordModal(true);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordData.password || !passwordData.confirmPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (passwordData.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setChangingPassword(true);

      try {
        const response = await fetch('/api/users', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            id: passwordData.userId,
            password: passwordData.password,
          }),
        });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to change password');
      }

      toast.success('Mot de passe modifié avec succès!');
      setShowPasswordModal(false);
      setPasswordData({ userId: '', userName: '', password: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du changement de mot de passe');
      console.error(error);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.email === session?.user?.email) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.name}" ?\n\nCette action est irréversible.`)) {
      return;
    }

    setDeleting(user.id);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/users?id=${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      toast.success(`Utilisateur "${user.name}" supprimé avec succès`);
      checkAdminRole();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: {
        label: 'Administrateur',
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30',
        textColor: 'text-red-400',
      },
      dev: {
        label: 'Développeur',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/30',
        textColor: 'text-blue-400',
      },
      writer: {
        label: 'Rédacteur',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-500/30',
        textColor: 'text-purple-400',
      },
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.writer;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} border ${config.borderColor} ${config.textColor} text-xs font-semibold`}>
        <Shield className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const handleGeneratePassword = () => {
    const password = generateStrongPassword(16, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    setGeneratedPassword(password);
    setShowGeneratedPasswordOptions(true);
  };

  const handleAcceptGeneratedPassword = () => {
    if (showPasswordModal) {
      setPasswordData({
        ...passwordData,
        password: generatedPassword,
        confirmPassword: generatedPassword,
      });
    } else if (showCreateModal) {
      setNewUser({
        ...newUser,
        password: generatedPassword,
      });
    }
    toast.success('Mot de passe généré accepté!');
    setShowGeneratedPasswordOptions(false);
  };

  const handleRejectGeneratedPassword = () => {
    setGeneratedPassword('');
    setShowGeneratedPasswordOptions(false);
    toast.info('Générez un nouveau mot de passe ou créez le vôtre');
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast.success('Mot de passe copié dans le presse-papiers!');
  };

  const getPasswordStrength = (password: string) => {
    return calculatePasswordStrength(password);
  };

  if (isPending || !session?.user || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!currentUserRole || currentUserRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/vxodnasait"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Gestion des Utilisateurs
              </h1>
              <p className="text-white/60">
                Créez et gérez les comptes administrateurs, développeurs et rédacteurs
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Nouvel Utilisateur
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Total Utilisateurs</div>
              <div className="text-3xl font-bold text-white">{users.length}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Administrateurs</div>
              <div className="text-3xl font-bold text-red-400">
                {users.filter(u => u.role === 'admin').length}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Développeurs</div>
              <div className="text-3xl font-bold text-blue-400">
                {users.filter(u => u.role === 'dev').length}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Rédacteurs</div>
              <div className="text-3xl font-bold text-purple-400">
                {users.filter(u => u.role === 'writer').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-400 font-semibold mb-1">
              Sécurité Renforcée
            </h3>
            <p className="text-white/60 text-sm">
              Seuls les administrateurs peuvent créer, modifier ou supprimer des comptes utilisateurs. Les utilisateurs ne peuvent plus s'inscrire publiquement.
            </p>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Utilisateur
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Rôle
                  </th>
                  <th className="text-left px-6 py-4 text-white/80 font-semibold text-sm">
                    Date de création
                  </th>
                  <th className="text-right px-6 py-4 text-white/80 font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.role === 'admin' ? 'from-red-500 to-pink-500' : user.role === 'dev' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'} flex items-center justify-center`}>
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {user.name}
                          </div>
                          {user.email === session.user.email && (
                            <div className="text-cyan-400 text-xs font-semibold">
                              (Vous)
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Modifier l'utilisateur"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePasswordClick(user)}
                          className="p-2 text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                          title="Changer le mot de passe"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          disabled={deleting === user.id || user.email === session.user.email}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title={user.email === session.user.email ? "Vous ne pouvez pas supprimer votre propre compte" : "Supprimer l'utilisateur"}
                        >
                          {deleting === user.id ? (
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

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40 mb-4">Aucun utilisateur pour le moment</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Créer le premier utilisateur
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Créer un Utilisateur
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setGeneratedPassword('');
                  setShowGeneratedPasswordOptions(false);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 font-semibold mb-2">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/80 font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="editor@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-white/80 font-semibold">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    Générer automatiquement
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {newUser.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/60">Force du mot de passe :</span>
                      <span className={`text-xs font-semibold text-${getPasswordStrength(newUser.password).color}-400`}>
                        {getPasswordStrength(newUser.password).feedback}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${getPasswordStrength(newUser.password).color}-400 transition-all`}
                        style={{ width: `${(getPasswordStrength(newUser.password).score / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-white/40 text-xs mt-1">
                  Minimum 8 caractères
                </p>
              </div>

              {showGeneratedPasswordOptions && generatedPassword && (
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold">Mot de passe généré :</p>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Copier le mot de passe"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-black/30 rounded-lg px-4 py-3 font-mono text-sm text-white break-all">
                    {generatedPassword}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAcceptGeneratedPassword}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectGeneratedPassword}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                    >
                      <X className="w-4 h-4" />
                      Rejeter
                    </button>
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                      title="Générer un nouveau mot de passe"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="role" className="block text-white/80 font-semibold mb-2">
                  Rôle
                </label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="writer" className="bg-[#1a1a1a]">Rédacteur - Peut créer et éditer des articles</option>
                  <option value="dev" className="bg-[#1a1a1a]">Développeur - Accès technique complet</option>
                  <option value="admin" className="bg-[#1a1a1a]">Administrateur - Contrôle total</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Création...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Créer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewUser({ name: '', email: '', password: '', role: 'writer' });
                    setGeneratedPassword('');
                    setShowGeneratedPasswordOptions(false);
                  }}
                  className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Modifier l'Utilisateur
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-6">
              <div>
                <label htmlFor="edit-name" className="block text-white/80 font-semibold mb-2">
                  Nom complet
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-email" className="block text-white/80 font-semibold mb-2">
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-role" className="block text-white/80 font-semibold mb-2">
                  Rôle
                </label>
                <select
                  id="edit-role"
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="writer" className="bg-[#1a1a1a]">Rédacteur</option>
                  <option value="dev" className="bg-[#1a1a1a]">Développeur</option>
                  <option value="admin" className="bg-[#1a1a1a]">Administrateur</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  disabled={editing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5" />
                      Mettre à jour
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Changer le Mot de Passe
              </h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setGeneratedPassword('');
                  setShowGeneratedPasswordOptions(false);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm">
                Modifier le mot de passe pour : <span className="text-white font-semibold">{passwordData.userName}</span>
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="new-password" className="block text-white/80 font-semibold">
                    Nouveau mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    Générer automatiquement
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.password}
                    onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/60">Force du mot de passe :</span>
                      <span className={`text-xs font-semibold text-${getPasswordStrength(passwordData.password).color}-400`}>
                        {getPasswordStrength(passwordData.password).feedback}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${getPasswordStrength(passwordData.password).color}-400 transition-all`}
                        style={{ width: `${(getPasswordStrength(passwordData.password).score / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-white/40 text-xs mt-1">
                  Minimum 8 caractères
                </p>
              </div>

              {showGeneratedPasswordOptions && generatedPassword && (
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold">Mot de passe généré :</p>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Copier le mot de passe"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-black/30 rounded-lg px-4 py-3 font-mono text-sm text-white break-all">
                    {generatedPassword}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAcceptGeneratedPassword}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectGeneratedPassword}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                    >
                      <X className="w-4 h-4" />
                      Rejeter
                    </button>
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                      title="Générer un nouveau mot de passe"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="confirm-password" className="block text-white/80 font-semibold mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {changingPassword ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Modification...
                    </>
                  ) : (
                    <>
                      <Key className="w-5 h-5" />
                      Changer le mot de passe
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ userId: '', userName: '', password: '', confirmPassword: '' });
                    setGeneratedPassword('');
                    setShowGeneratedPasswordOptions(false);
                  }}
                  className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}