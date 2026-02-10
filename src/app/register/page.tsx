"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (!isPending && session?.user) {
      router.push('/vxodnasait');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
      
      {/* Disabled Registration Notice */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/30 rounded-full mb-4">
              <Shield className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Inscription Désactivée
            </h1>
            <p className="text-white/60">
              Sécurité Renforcée Activée
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">
                  Accès Restreint
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  L'inscription publique a été désactivée pour renforcer la sécurité. 
                  Seuls les administrateurs peuvent créer de nouveaux comptes pour les développeurs et rédacteurs.
                </p>
              </div>
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Pourquoi ce changement ?
                </h3>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Protection contre les accès non autorisés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Contrôle strict des permissions utilisateur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Gestion centralisée des comptes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Administrator */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">
              Besoin d'un Compte ?
            </h3>
            <p className="text-white/60 text-sm mb-3">
              Si vous avez besoin d'un compte pour contribuer au contenu ou au développement, 
              veuillez contacter l'administrateur du système.
            </p>
            <p className="text-cyan-400 text-sm font-semibold">
              → Seul l'administrateur peut créer de nouveaux comptes
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              <Lock className="w-5 h-5" />
              Se Connecter
            </Link>
            <Link
              href="/abonnement-iptv/"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all duration-300"
            >
              Retour au Site
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Cette mesure garantit la sécurité et l'intégrité de la plateforme
          </p>
        </div>
      </div>
    </div>
  );
}