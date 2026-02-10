"use client";

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Loader2, Copy, Check, Mail, AlertTriangle, Home } from 'lucide-react';

interface OrderStatus {
  orderNumber: string;
  status: string;
  productTitle: string;
  amount: string;
  currency: string;
  email: string;
  createdAt: string;
  credentials?: {
    username: string;
    password: string;
    serverUrl: string;
    playlistUrl: string;
    expDate: string;
  };
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto flex items-center justify-center animate-pulse">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
          <p className="text-white/60 mt-6">Chargement...</p>
        </div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);

  // Get order number from URL params or session storage
  const orderNumber = searchParams.get('order') || 
    (typeof window !== 'undefined' ? sessionStorage.getItem('pendingOrder') : null);

  const fetchStatus = useCallback(async () => {
    if (!orderNumber) return;

    try {
      // First check our order status
      const response = await fetch(`/api/checkout/status/${orderNumber}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Commande introuvable. Veuillez verifier votre email.');
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setOrder(data);

      // If already provisioned, stop
      if (data.status === 'provisioned' || data.status === 'failed') {
        setLoading(false);
        return;
      }

      // If still pending or paid, also check PayGate status directly
      // This endpoint polls PayGate AND auto-provisions if payment is confirmed
      const checkResp = await fetch(`/api/checkout/check-payment/${orderNumber}`);
      if (checkResp.ok) {
        const checkData = await checkResp.json();
        if (checkData.status === 'provisioned' && checkData.credentials) {
          // Payment confirmed and provisioned! Update local state
          setOrder({
            ...data,
            status: 'provisioned',
            credentials: checkData.credentials,
          });
          setLoading(false);
        }
      }
    } catch {
      setPollCount(prev => prev + 1);
    }
  }, [orderNumber]);

  useEffect(() => {
    if (!orderNumber) {
      setError('Aucun numero de commande trouve.');
      setLoading(false);
      return;
    }

    // Initial fetch
    fetchStatus();

    // Poll every 5 seconds until provisioned or max 60 attempts (5 minutes)
    const interval = setInterval(() => {
      if (order?.status === 'provisioned' || order?.status === 'failed' || pollCount > 60) {
        clearInterval(interval);
        setLoading(false);
        return;
      }
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderNumber, fetchStatus, order?.status, pollCount]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (error) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <Link
            href="/abonnement-iptv/#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl"
          >
            <Home className="w-4 h-4" />
            Retour aux offres
          </Link>
        </div>
      </main>
    );
  }

  // Still loading / polling
  if (loading && (!order || order.status === 'pending' || order.status === 'paid')) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto flex items-center justify-center animate-pulse">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {order?.status === 'paid' ? 'Activation en cours...' : 'Verification du paiement...'}
          </h1>
          <p className="text-white/60 mb-4">
            {order?.status === 'paid'
              ? 'Votre paiement a ete confirme ! Activation de votre abonnement en cours...'
              : 'Nous attendons la confirmation de votre paiement. Cela peut prendre quelques instants.'}
          </p>
          {order && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">
              <p className="text-white/40 text-xs mb-1">Commande</p>
              <p className="text-white font-mono text-sm">{order.orderNumber}</p>
            </div>
          )}
          <p className="text-white/30 text-xs mt-4">
            Ne fermez pas cette page. Verification automatique toutes les 5 secondes...
          </p>
        </div>
      </main>
    );
  }

  // Order provisioned - show credentials
  if (order?.status === 'provisioned' && order.credentials) {
    return (
      <main className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Paiement confirme !
            </h1>
            <p className="text-white/60">
              Votre abonnement <span className="text-white font-semibold">{order.productTitle}</span> est maintenant actif
            </p>
          </div>

          {/* Email Notice */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-cyan-300 text-sm font-semibold">
                Un email avec vos identifiants a ete envoye a :
              </p>
              <p className="text-cyan-400 font-mono text-sm mt-1">{order.email}</p>
            </div>
          </div>

          {/* Credentials Card */}
          <div className="bg-gradient-to-br from-indigo-950 to-cyan-950 border border-indigo-500/30 rounded-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3">
              <h2 className="text-white font-bold text-sm uppercase tracking-wider">
                Vos identifiants IPTV
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Username */}
              <CredentialField
                label="Nom d'utilisateur"
                value={order.credentials.username}
                copied={copied === 'username'}
                onCopy={() => copyToClipboard(order.credentials!.username, 'username')}
              />

              {/* Password */}
              <CredentialField
                label="Mot de passe"
                value={order.credentials.password}
                copied={copied === 'password'}
                onCopy={() => copyToClipboard(order.credentials!.password, 'password')}
              />

              {/* Server URL */}
              <CredentialField
                label="URL du serveur"
                value={order.credentials.serverUrl}
                copied={copied === 'server'}
                onCopy={() => copyToClipboard(order.credentials!.serverUrl, 'server')}
              />

              {/* M3U Playlist */}
              <CredentialField
                label="Lien Playlist M3U"
                value={order.credentials.playlistUrl}
                copied={copied === 'playlist'}
                onCopy={() => copyToClipboard(order.credentials!.playlistUrl, 'playlist')}
                small
              />

              {/* Expiration */}
              <div>
                <p className="text-white/40 text-xs mb-1">Valide jusqu&apos;au</p>
                <p className="text-green-400 font-semibold">
                  {new Date(order.credentials.expDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-3">Details de la commande</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Commande</span>
                <span className="text-white font-mono">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Produit</span>
                <span className="text-white">{order.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Montant</span>
                <span className="text-white font-semibold">{order.amount} {order.currency}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/abonnement-iptv/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <Home className="w-4 h-4" />
              Retour a l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Order failed or unknown status
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">
          {order?.status === 'paid' ? 'Activation en attente' : 'Statut de commande'}
        </h1>
        <p className="text-white/60 mb-6">
          {order?.status === 'paid'
            ? 'Votre paiement est confirme. L\'activation est en cours de traitement. Vous recevrez un email avec vos identifiants.'
            : 'Un probleme est survenu. Veuillez contacter notre support avec votre numero de commande.'}
        </p>
        {order && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <p className="text-white/40 text-xs mb-1">Commande</p>
            <p className="text-white font-mono text-sm">{order.orderNumber}</p>
          </div>
        )}
        <Link
          href="/abonnement-iptv/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl"
        >
          <Home className="w-4 h-4" />
          Retour a l&apos;accueil
        </Link>
      </div>
    </main>
  );
}

// Credential field component
function CredentialField({ label, value, copied, onCopy, small }: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  small?: boolean;
}) {
  return (
    <div>
      <p className="text-white/40 text-xs mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className={`flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono ${small ? 'text-xs' : 'text-sm'} text-cyan-300 break-all`}>
          {value}
        </div>
        <button
          onClick={onCopy}
          className="flex-shrink-0 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          title="Copier"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>
    </div>
  );
}
