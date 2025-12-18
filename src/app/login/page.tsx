"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient, useSession, clearSessionFromStorage } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
      if (!isPending && session?.user) {
        const redirect = searchParams.get('redirect') || '/vxodnasait';
        router.push(redirect);
      }
    }, [session, isPending, router, searchParams]);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      toast.success('Compte créé avec succès! Veuillez vous connecter.');
    }
  }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email || !password) {
        toast.error('Veuillez remplir tous les champs');
        return;
      }

      setLoading(true);
      
      try {
        const result = await authClient.signIn.email({
          email,
          password,
          rememberMe,
        });

        if (result.error) {
          toast.error('Email ou mot de passe invalide. Veuillez réessayer.');
          setLoading(false);
          return;
        }

        if (result.data?.user) {
            // Store session in localStorage as fallback for iframe environments
            if (typeof window !== 'undefined') {
              try {
                const sessionData = {
                  user: result.data.user,
                  session: result.data.session || { id: 'local', expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
                };
                localStorage.setItem('better-auth-session', JSON.stringify(sessionData));
              } catch {}
            }
            toast.success('Connexion réussie!');
            const redirect = searchParams.get('redirect') || '/vxodnasait';
            // Use router.push with a small delay to ensure state is updated
            setTimeout(() => {
              router.push(redirect);
            }, 100);
          } else {
            toast.error('Erreur de connexion. Veuillez réessayer.');
            setLoading(false);
          }
      } catch (err) {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
        console.error(err);
        setLoading(false);
      }
    };

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      
      {/* Login card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Admin Login
            </h1>
            <p className="text-white/60">
              IPTV SMARTERS PRO - Tableau de bord
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white/80 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-white/60 cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 text-center">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <p className="text-white/40 text-xs">
                <Lock className="w-3 h-3 inline mr-1" />
                L'inscription est réservée aux administrateurs
              </p>
            </div>
          </div>
        </div>

        {/* Return to site link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}