"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Shield, Lock, Mail, ArrowLeft, Loader2, Check, CreditCard, Smartphone, Globe, Tv, Zap, Clock, Star, Crown, Users, Headphones, RefreshCw, Gift, User, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';

// Product data matching the main product pages
const PRODUCTS: Record<string, {
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  durationMonths: number;
  type: string;
  gradient: string;
  features: string[];
  bonus?: string;
  popular?: boolean;
  channels: string;
  vod: string;
  quality: string;
  connections: string;
  support: string;
}> = {
  'test-iptv-3-mois': {
    title: 'TEST 3 Mois IPTV',
    subtitle: 'TEST MODE',
    price: '11',
    duration: '3 Mois',
    durationMonths: 3,
    type: 'HD',
    gradient: 'from-green-600 to-emerald-600',
    features: ['Test product - 3 mois', 'Package ID: 6', 'Prix: $11 USD'],
    channels: 'TEST',
    vod: 'TEST',
    quality: 'HD',
    connections: '1',
    support: 'Test',
  },
  'abonnement-iptv-hd-3-mois': {
    title: '3 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '19',
    duration: '3 Mois',
    durationMonths: 3,
    type: 'HD',
    gradient: 'from-blue-600 to-indigo-600',
    features: ['120 000+ chaînes TV', 'VOD Films & Séries', 'Qualité HD/FHD', 'Support 24/7', 'Multi-appareils', 'EPG & Catch-Up TV'],
    channels: '120 000+',
    vod: '20 000+',
    quality: 'HD / Full HD',
    connections: '1 écran',
    support: '24/7',
  },
  'abonnement-iptv-hd-6-mois': {
    title: '6 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '22',
    duration: '6 Mois',
    durationMonths: 6,
    type: 'HD',
    gradient: 'from-indigo-600 to-violet-600',
    features: ['120 000+ chaînes TV', 'VOD Films & Séries', 'Qualité HD/FHD', 'Support 24/7', 'Multi-appareils', 'EPG & Catch-Up TV'],
    channels: '120 000+',
    vod: '20 000+',
    quality: 'HD / Full HD',
    connections: '1 écran',
    support: '24/7',
  },
  'abonnement-iptv-hd-12-mois': {
    title: '12 Mois IPTV HD',
    subtitle: 'IPTV HD - LE PLUS POPULAIRE',
    price: '39',
    duration: '12 Mois',
    durationMonths: 12,
    type: 'HD',
    gradient: 'from-violet-600 to-purple-600',
    features: ['120 000+ chaînes TV', 'VOD Films & Séries', 'Qualité HD/FHD', 'Support 24/7', 'Multi-appareils', 'EPG & Catch-Up TV'],
    popular: true,
    channels: '120 000+',
    vod: '20 000+',
    quality: 'HD / Full HD',
    connections: '1 écran',
    support: '24/7',
  },
  'abonnement-iptv-hd-24-mois': {
    title: '24 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '59',
    duration: '24 Mois',
    durationMonths: 24,
    type: 'HD',
    gradient: 'from-purple-600 to-fuchsia-600',
    features: ['120 000+ chaînes TV', 'VOD Films & Séries', 'Qualité HD/FHD', 'Support 24/7', 'Multi-appareils', 'EPG & Catch-Up TV'],
    channels: '120 000+',
    vod: '20 000+',
    quality: 'HD / Full HD',
    connections: '1 écran',
    support: '24/7',
  },
  'abonnement-iptv-premium-4k-3-mois': {
    title: '3 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '27',
    duration: '3 Mois',
    durationMonths: 3,
    type: '4K',
    gradient: 'from-rose-600 to-pink-600',
    features: ['160 000+ chaînes TV', 'VOD 4K Films & Séries', 'Qualité 4K Ultra HD', 'Contenu adulte (+18)', 'Support VIP 24/7', 'EPG & Catch-Up TV'],
    channels: '160 000+',
    vod: '20 000+',
    quality: '4K Ultra HD',
    connections: '1 écran',
    support: 'VIP 24/7',
  },
  'abonnement-iptv-premium-4k-6-mois': {
    title: '6 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '42',
    duration: '6 Mois',
    durationMonths: 6,
    type: '4K',
    gradient: 'from-fuchsia-600 to-purple-600',
    features: ['160 000+ chaînes TV', 'VOD 4K Films & Séries', 'Qualité 4K Ultra HD', 'Contenu adulte (+18)', 'Support VIP 24/7', 'EPG & Catch-Up TV'],
    channels: '160 000+',
    vod: '20 000+',
    quality: '4K Ultra HD',
    connections: '1 écran',
    support: 'VIP 24/7',
  },
  'abonnement-iptv-premium-4k-12-mois': {
    title: '12 Mois Premium 4K',
    subtitle: 'PREMIUM 4K - MEILLEURE OFFRE',
    price: '69',
    duration: '12 Mois',
    durationMonths: 12,
    type: '4K',
    gradient: 'from-orange-500 to-rose-500',
    features: ['160 000+ chaînes TV', 'VOD 4K Films & Séries', 'Qualité 4K Ultra HD', 'Contenu adulte (+18)', '+2 Mois GRATUITS', 'Support VIP 24/7'],
    bonus: '+2 Mois Gratuit',
    popular: true,
    channels: '160 000+',
    vod: '20 000+',
    quality: '4K Ultra HD',
    connections: '1 écran',
    support: 'VIP 24/7',
  },
  'abonnement-iptv-premium-4k-24-mois': {
    title: '24 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '100',
    duration: '24 Mois',
    durationMonths: 24,
    type: '4K',
    gradient: 'from-red-600 to-orange-600',
    features: ['160 000+ chaînes TV', 'VOD 4K Films & Séries', 'Qualité 4K Ultra HD', 'Contenu adulte (+18)', '+4 Mois GRATUITS', 'Support VIP 24/7'],
    bonus: '+4 Mois Gratuit',
    channels: '160 000+',
    vod: '20 000+',
    quality: '4K Ultra HD',
    connections: '1 écran',
    support: 'VIP 24/7',
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CheckoutPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = PRODUCTS[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Produit introuvable</h1>
          <Link href="/abonnement-iptv/#pricing" className="text-cyan-400 hover:text-cyan-300 underline">
            Retour aux offres
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate name
    if (customerName.trim().length < 2) {
      setError('Veuillez entrer votre nom complet.');
      return;
    }

    // Validate emails match
    if (email !== confirmEmail) {
      setError('Les adresses email ne correspondent pas.');
      return;
    }

    // Validate phone
    const phoneDigits = customerPhone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setError('Numéro de téléphone/WhatsApp invalide (minimum 8 chiffres).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, customerName: customerName.trim(), customerPhone: customerPhone.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue. Veuillez réessayer.');
        setLoading(false);
        return;
      }

      // Store order number for the success page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingOrder', data.orderNumber);
        sessionStorage.setItem('pendingOrderEmail', email);
      }

      // Redirect to payment page
      window.location.href = data.paymentUrl;
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      {/* Secure Header */}
      <nav className="bg-black/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href={`/produits/${slug}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Retour au produit</span>
          </Link>
          <a href="/abonnement-iptv/" className="flex items-center gap-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp"
              alt="IPTV SMARTERS PRO"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="font-black text-sm tracking-tight hidden sm:inline">IPTV SMARTERS PRO</span>
          </a>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>SSL Sécurisé</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
            Finaliser votre commande
          </h1>
          <p className="text-white/40 text-sm md:text-base">
            Vous êtes à un pas de votre abonnement IPTV
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Left: Checkout Form */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            
            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white/60">1</div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider hidden sm:inline">Produit choisi</span>
              </div>
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center text-xs font-bold text-white`}>2</div>
                <span className="text-xs font-bold text-white uppercase tracking-wider hidden sm:inline">Vos informations</span>
              </div>
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/30">3</div>
                <span className="text-xs font-bold text-white/30 uppercase tracking-wider hidden sm:inline">Paiement</span>
              </div>
            </div>

            {/* Customer Info Form */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Vos informations</h2>
                  <p className="text-white/40 text-xs">Nécessaires pour activer et vous livrer votre abonnement</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="customerName" className="block text-white/70 text-sm font-semibold mb-2">
                    Nom complet <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Prénom et Nom"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all disabled:opacity-50 text-base"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm font-semibold mb-2">
                    Adresse email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all disabled:opacity-50 text-base"
                    />
                  </div>
                </div>

                {/* Confirm Email */}
                <div>
                  <label htmlFor="confirmEmail" className="block text-white/70 text-sm font-semibold mb-2">
                    Confirmer l&apos;email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      id="confirmEmail"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="Confirmez votre email"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all disabled:opacity-50 text-base"
                    />
                    {confirmEmail && email === confirmEmail && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* WhatsApp / Phone Field */}
                <div>
                  <label htmlFor="customerPhone" className="block text-white/70 text-sm font-semibold mb-2">
                    WhatsApp / Téléphone <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="tel"
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all disabled:opacity-50 text-base"
                    />
                  </div>
                  <p className="text-white/30 text-xs mt-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Pour le support technique et l&apos;assistance à l&apos;installation
                  </p>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                  <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-300 text-sm font-semibold">Important</p>
                    <p className="text-amber-200/60 text-xs mt-1">
                      Vérifiez bien votre adresse email. Vos identifiants de connexion IPTV (nom d&apos;utilisateur, mot de passe et lien M3U) seront envoyés automatiquement à cette adresse après confirmation du paiement.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !customerName || !email || !confirmEmail || !customerPhone}
                  className="group relative w-full py-5 rounded-xl font-black text-center overflow-hidden transition-all duration-300 shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} transition-all duration-300 group-hover:brightness-110`} />
                  <span className="relative text-white text-lg flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Préparation du paiement...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Payer {product.price}€ — Activation Instantanée
                      </>
                    )}
                  </span>
                </button>

                {/* Payment Methods Icons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <CreditCard className="w-4 h-4" />
                    <span>Carte bancaire</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Smartphone className="w-4 h-4" />
                    <span>Apple / Google Pay</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Globe className="w-4 h-4" />
                    <span>Crypto (USDC)</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Trust & Security */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Paiement Sécurisé</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-amber-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Activation Instant</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <Headphones className="w-6 h-6 text-cyan-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Support 24/7</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <RefreshCw className="w-6 h-6 text-purple-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Remboursement 14j</span>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Questions fréquentes</h3>
              <div className="space-y-3">
                <details className="group bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-white/80 hover:text-white transition-colors">
                    Comment recevoir mes identifiants ?
                    <span className="text-white/30 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-white/50 text-sm">
                    Après confirmation du paiement, vos identifiants IPTV (nom d&apos;utilisateur, mot de passe et lien M3U/serveur) sont envoyés automatiquement par email. L&apos;activation est instantanée.
                  </div>
                </details>
                <details className="group bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-white/80 hover:text-white transition-colors">
                    Sur quels appareils puis-je regarder ?
                    <span className="text-white/30 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-white/50 text-sm">
                    Compatible avec tous les appareils : Smart TV (Samsung, LG, Sony), Fire TV Stick, Android TV, iPhone, iPad, Android, PC Windows, Mac, MAG Box et plus de 20 applications IPTV.
                  </div>
                </details>
                <details className="group bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-white/80 hover:text-white transition-colors">
                    Puis-je être remboursé ?
                    <span className="text-white/30 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-white/50 text-sm">
                    Oui ! Vous bénéficiez d&apos;une garantie satisfait ou remboursé de 14 jours. Si le service ne vous convient pas, contactez notre support pour un remboursement intégral.
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="sticky top-20">
              {/* Product Card */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${product.gradient}`} />
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white/40 text-xs font-bold uppercase tracking-wider">
                      Récapitulatif de commande
                    </h2>
                    {product.popular && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        Populaire
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      {product.type === '4K' ? <Crown className="w-7 h-7 text-white" /> : <Tv className="w-7 h-7 text-white" />}
                    </div>
                    <div>
                      <p className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient} font-bold text-xs uppercase tracking-wider`}>
                        {product.subtitle}
                      </p>
                      <h3 className="text-xl font-black text-white mt-0.5">{product.title}</h3>
                      <p className="text-white/40 text-sm mt-0.5">Durée : {product.duration}</p>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Tv className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[10px] font-bold text-white/40 uppercase">Chaînes</span>
                      </div>
                      <p className="text-sm font-bold text-white">{product.channels}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[10px] font-bold text-white/40 uppercase">VOD</span>
                      </div>
                      <p className="text-sm font-bold text-white">{product.vod}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-bold text-white/40 uppercase">Qualité</span>
                      </div>
                      <p className="text-sm font-bold text-white">{product.quality}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-bold text-white/40 uppercase">Connexion</span>
                      </div>
                      <p className="text-sm font-bold text-white">{product.connections}</p>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus Badge */}
                  {product.bonus && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold py-2.5 px-4 rounded-xl">
                        <Gift className="w-5 h-5 text-amber-400" />
                        {product.bonus}
                      </div>
                    </div>
                  )}

                  {/* Price Summary */}
                  <div className="border-t border-white/10 pt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Abonnement {product.duration}</span>
                      <span className="text-white font-semibold">{product.price}€</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Frais d&apos;activation</span>
                      <span className="text-emerald-400 font-semibold text-sm">Gratuit</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-lg">Total à payer</span>
                        <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                          {product.price}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h4 className="text-white/80 text-sm font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Après le paiement
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-[10px] font-black">1</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Confirmation instantanée</p>
                      <p className="text-white/40 text-xs">Paiement vérifié en temps réel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-[10px] font-black">2</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Activation automatique</p>
                      <p className="text-white/40 text-xs">Votre abonnement IPTV est créé</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-[10px] font-black">3</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Email avec identifiants</p>
                      <p className="text-white/40 text-xs">Username, password et lien M3U</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-[10px] font-black">4</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Profitez de vos chaînes !</p>
                      <p className="text-white/40 text-xs">Installez sur tous vos appareils</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/20 text-xs">
          <p>&copy; 2026 IPTV Smarters Pro — Tous droits réservés</p>
          <div className="flex items-center gap-4">
            <Link href="/confidentialite" className="hover:text-white/40 transition-colors">Confidentialité</Link>
            <Link href="/remboursement" className="hover:text-white/40 transition-colors">Remboursement</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
