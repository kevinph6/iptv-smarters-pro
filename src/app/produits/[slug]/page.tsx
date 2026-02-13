import { notFound } from 'next/navigation';
import { Crown, Star, Check, ShoppingCart, Shield, Clock, Gift, ArrowUpRight, Users, Tv, Monitor, Smartphone, Zap, Play, Radio, Film, Globe, Laptop, Smartphone as Mobile } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { StickyBuyButton } from '@/components/ui/sticky-buy-button';
import { StockIndicator } from '@/components/ui/stock-indicator';
import { LiveViewers } from '@/components/ui/live-viewers';
import { RecentPurchases } from '@/components/ui/recent-purchases';
import { ReviewForm } from '@/components/ui/review-form';

type Product = {
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  type: string;
  description: string;
  gradient: string;
  glowColor: string;
  checkoutUrl: string;
  features: string[];
  stock: number;
  viewers: number;
  recentPurchases: number;
  rating: number;
  reviewCount: number;
  popular?: boolean;
  bonus?: string;
  reviews: { author: string; rating: number; comment: string; verified: boolean; date: string }[];
};

const commonReviews = [
  { author: 'Marc L.', rating: 5, comment: 'Le meilleur iptv france 2026 sans aucun doute. Qualité 4k stable et aucune coupure pendant les matchs de foot.', verified: true, date: '2026-01-15' },
  { author: 'Sophie D.', rating: 5, comment: 'Activation instantanée après paiement. Mon iptv fire stick fonctionne à merveille. Je recommande vivement ce service.', verified: true, date: '2026-01-20' },
  { author: 'Thomas B.', rating: 5, comment: 'Service client très réactif. Ils m\'ont aidé à configurer mon abonnement iptv smarters pro en moins de 5 minutes.', verified: true, date: '2026-01-22' },
  { author: 'Lila K.', rating: 4, comment: 'Très bon service, pas mal de chaînes internationales. Parfois des petits lags sur la 4K mais globalement très satisfait.', verified: true, date: '2026-01-25' },
  { author: 'Jean-Pierre M.', rating: 5, comment: 'Enfin un iptv sans coupure ! J\'ai testé plusieurs fournisseurs et celui-ci est de loin le plus stable.', verified: true, date: '2026-01-28' },
  { author: 'Amine R.', rating: 5, comment: 'Superbe interface, zapping rapide. Les films et séries sont mis à jour régulièrement. Top !', verified: true, date: '2026-02-01' },
  { author: 'Claire V.', rating: 5, comment: 'Excellent rapport qualité prix. Toutes les chaînes de sport en direct sans décalage.', verified: true, date: '2026-02-03' },
  { author: 'Nicolas S.', rating: 5, comment: 'Meilleur abonnement iptv que j\'ai eu. L\'application iptv smarters pro est très intuitive.', verified: true, date: '2026-02-05' },
  { author: 'Yasmine H.', rating: 5, comment: 'Installation facile sur ma Smart TV. La qualité d\'image est impressionnante pour le prix.', verified: true, date: '2026-02-07' }
];

const products: Record<string, Product> = {
  'abonnement-iptv-hd-3-mois': {
    title: '3 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '19',
    duration: '3 Mois',
    type: 'HD',
    description: 'Profitez de 3 mois d\'accès illimité à notre service IPTV HD avec plus de 120 000 chaînes et contenus VOD. Activation instantanée et qualité HD garantie.',
    gradient: 'from-blue-600 to-indigo-600',
    glowColor: 'rgba(37, 99, 235, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-hd-3-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité HD Stable', 'Activation Instantanée', 'Support Client 24/7', 'Compatible Tout Support', 'Mise à jour Gratuite'],
    stock: 2, viewers: 142, recentPurchases: 5, rating: 4.7, reviewCount: 127,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-hd-6-mois': {
    title: '6 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '22',
    duration: '6 Mois',
    type: 'HD',
    description: 'Économisez avec notre forfait 6 mois ! Accès complet à toutes les chaînes HD, VOD et contenus premium pendant 6 mois.',
    gradient: 'from-indigo-600 to-violet-600',
    glowColor: 'rgba(79, 70, 229, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-hd-6-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité HD Stable', 'Activation Instantanée', 'Support Client 24/7', 'Compatible Tout Support', 'Mise à jour Gratuite'],
    stock: 4, viewers: 189, recentPurchases: 12, rating: 4.8, reviewCount: 243,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-hd-12-mois': {
    title: '12 Mois IPTV HD',
    subtitle: 'IPTV HD - POPULAIRE',
    price: '39',
    duration: '12 Mois',
    type: 'HD',
    popular: true,
    description: 'Notre offre la plus populaire ! Un an complet d\'accès illimité à notre service IPTV HD premium. Le meilleur rapport qualité-prix.',
    gradient: 'from-violet-600 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-hd-12-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité HD Stable', 'Activation Instantanée', 'Support Client 24/7', 'Compatible Tout Support', 'Mise à jour Gratuite'],
    stock: 3, viewers: 423, recentPurchases: 28, rating: 4.9, reviewCount: 856,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-hd-24-mois': {
    title: '24 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '59',
    duration: '24 Mois',
    type: 'HD',
    description: 'La meilleure valeur ! 2 ans d\'accès illimité à notre service IPTV HD premium. Économisez le plus avec notre forfait longue durée.',
    gradient: 'from-purple-600 to-fuchsia-600',
    glowColor: 'rgba(192, 38, 211, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-hd-24-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité HD Stable', 'Activation Instantanée', 'Support Client 24/7', 'Compatible Tout Support', 'Mise à jour Gratuite'],
    stock: 5, viewers: 156, recentPurchases: 8, rating: 4.8, reviewCount: 412,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-premium-4k-3-mois': {
    title: '3 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '27',
    duration: '3 Mois',
    type: '4K',
    description: 'Découvrez la qualité 4K premium ! 3 mois d\'accès aux meilleures chaînes en ultra haute définition avec IPTV Smarters Pro Officiel.',
    gradient: 'from-rose-600 to-pink-600',
    glowColor: 'rgba(225, 29, 72, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-premium-4k-3-mois',
    features: ['Qualité 4K Ultra HD', '120K+ Chaînes & VOD', 'Anti-Buffering Tech', 'Serveur Ultra-Stable', 'Activation Instantanée', 'Support VIP 24/7'],
    stock: 2, viewers: 234, recentPurchases: 14, rating: 4.9, reviewCount: 189,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-premium-4k-6-mois': {
    title: '6 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '42',
    duration: '6 Mois',
    type: '4K',
    description: 'Forfait Premium 6 mois ! Profitez de la meilleure qualité d\'image 4K avec tous les contenus premium sur IPTV France.',
    gradient: 'from-pink-600 to-rose-600',
    glowColor: 'rgba(219, 39, 119, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-premium-4k-6-mois',
    features: ['Qualité 4K Ultra HD', '120K+ Chaînes & VOD', 'Anti-Buffering Tech', 'Serveur Ultra-Stable', 'Activation Instantanée', 'Support VIP 24/7'],
    stock: 3, viewers: 312, recentPurchases: 19, rating: 4.9, reviewCount: 324,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-premium-4k-12-mois': {
    title: '12 Mois Premium 4K',
    subtitle: 'PREMIUM 4K - MEILLEUR CHOIX',
    price: '69',
    duration: '12 Mois',
    type: '4K',
    popular: true,
    bonus: '+2 Mois Gratuit',
    description: 'Notre meilleure offre Premium 4K ! 12 mois + 2 mois gratuits d\'accès illimité aux chaînes 4K premium sur IPTV France 2026.',
    gradient: 'from-orange-500 to-rose-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-premium-4k-12-mois',
    features: ['+2 Mois GRATUITS', 'Qualité 4K Ultra HD', '120K+ Chaînes & VOD', 'Anti-Buffering Tech', 'Serveur Ultra-Stable', 'Support VIP 24/7'],
    stock: 2, viewers: 867, recentPurchases: 45, rating: 5.0, reviewCount: 1247,
    reviews: [...commonReviews]
  },
  'abonnement-iptv-premium-4k-24-mois': {
    title: '24 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '100',
    duration: '24 Mois',
    type: '4K',
    bonus: '+4 Mois Gratuit',
    description: 'La valeur ultime ! 24 mois + 4 mois gratuits de service Premium 4K. La meilleure expérience IPTV France pour 2 ans.',
    gradient: 'from-red-600 to-orange-600',
    glowColor: 'rgba(220, 38, 38, 0.4)',
    checkoutUrl: '/checkout/abonnement-iptv-premium-4k-24-mois',
    features: ['+4 Mois GRATUITS', 'Qualité 4K Ultra HD', '120K+ Chaînes & VOD', 'Anti-Buffering Tech', 'Serveur Ultra-Stable', 'Support VIP 24/7'],
    stock: 4, viewers: 432, recentPurchases: 22, rating: 4.9, reviewCount: 687,
    reviews: [...commonReviews]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) return { title: 'Produit Non Trouvé' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  return {
    title: `${product.title} - Abonnement IPTV France | IPTV SMARTERS PRO Officiel`,
    description: `${product.description} Meilleur fournisseur IPTV France 2026. Activation instantanée, qualité 4K Ultra HD, serveur stable sans coupure. Profitez de 120 000+ chaînes et VOD.`,
    keywords: `iptv france, abonnement iptv, iptv smarters pro, meilleur iptv 2026, serveur iptv stable, iptv 4k france, iptv premium, ${product.title.toLowerCase()}`,
    alternates: {
      canonical: `/produits/${slug}`,
    },
    openGraph: {
      url: `/produits/${slug}`,
      title: `${product.title} - IPTV SMARTERS PRO Officiel`,
      description: `Profitez du meilleur de l'IPTV en France avec ${product.title}. Qualité 4K, sans coupure, activation immédiate.`,
      images: [{ url: `${baseUrl}/og-image.jpg` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - IPTV SMARTERS PRO Officiel`,
      description: `Le service IPTV n°1 en France. ${product.duration} d'accès premium 4K.`,
      images: [`${baseUrl}/og-image.jpg`],
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug];
  if (!product) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": `${baseUrl}/og-image.jpg`,
    "brand": {
      "@type": "Brand",
      "name": "IPTV SMARTERS PRO"
    },
    "sku": slug,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/produits/${slug}`,
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "IPTV SMARTERS PRO Officiel"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": product.reviews.map(r => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author },
      "reviewRating": { "@type": "Rating", "ratingValue": r.rating },
      "reviewBody": r.comment,
      "datePublished": r.date
    }))
  };

  return (
    <main id="main" className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      
      {/* Sleek Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/abonnement-iptv/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp"
                  alt="IPTV SMARTERS PRO Logo"
                  width={40}
                  height={40}
                  className="object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg leading-none">IPTV SMARTERS PRO</span>
              <span className="text-[8px] text-white/40 uppercase tracking-[0.3em] font-bold">Officiel IPTV</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="/abonnement-iptv/#pricing" className="hover:text-white transition-colors">Abonnements</a>
            <a href="/tutoriels" className="hover:text-white transition-colors">Tutoriels</a>
            <a href="/chaines" className="hover:text-white transition-colors">Chaînes</a>
          </div>
          <a href={product.checkoutUrl} className="bg-white text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-tight hover:bg-white/90 transition-colors">
            Activer
          </a>
        </div>
      </nav>

      {/* Hero Section - Mobile First Layout */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br ${product.gradient} opacity-[0.08] rounded-full blur-[150px] animate-pulse`} />
          <div className={`absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr ${product.gradient} opacity-[0.08] rounded-full blur-[150px] animate-pulse`} style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:items-center">
            
            {/* Mobile: Title & Info FIRST */}
            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <div className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60`}>
                    {product.subtitle}
                  </div>
                  {product.bonus && (
                    <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest text-amber-500">
                      {product.bonus}
                    </div>
                  )}
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Stock
                  </div>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
                  {product.title}
                </h1>
                
                <p className="text-xl text-white/40 font-medium max-w-xl leading-relaxed">
                  {product.description} Abonnement premium optimisé pour la France avec IPTV Smarters Pro Officiel.
                </p>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest">
                    {product.rating}/5 — {product.reviewCount} Avis Vérifiés
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="space-y-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-black tracking-tighter text-white">{product.price}€</span>
                  <span className="text-2xl text-white/20 font-black uppercase tracking-widest">/ {product.duration}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={product.checkoutUrl} className={`flex-[2] py-6 rounded-2xl bg-gradient-to-r ${product.gradient} text-white font-black text-xl text-center shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-tight`}>
                    <ShoppingCart className="w-6 h-6" />
                    Activer Mon Accès
                  </a>
                  <div className="flex-1 px-8 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Mise en service</span>
                    <span className="text-sm font-black text-white uppercase tracking-widest">Instantanée</span>
                  </div>
                </div>
                
                {/* Optional Adult Content Note */}
                <p className="text-white/20 text-[10px] font-medium text-center lg:text-left">
                  * Contenu Adulte (18+) disponible sur demande simple après activation (gratuit).
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-8 py-4 border-y border-white/5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Paiement Sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Support VIP 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Zapping Rapide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual: CLEAN Digital Pass */}
            <div className="order-2 lg:order-1 flex justify-center perspective-2000">
              <div className="relative group w-full max-w-[440px]">
                {/* Simplified Glass Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-[2.5rem] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000`} />
                
                <div className="relative aspect-[4/5] w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.01] group-hover:-rotate-y-12 group-hover:rotate-x-6">
                  {/* Subtle Noise/Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
                  
                  {/* Header Detail */}
                  <div className={`h-2 bg-gradient-to-r ${product.gradient}`} />
                  
                  <div className="p-12 h-full flex flex-col justify-between">
                    <div className="space-y-12">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Product Type</p>
                          <p className="text-lg font-black tracking-tight text-white/80">{product.type} PASS</p>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-2xl border border-white/20`}>
                          {product.type === '4K' ? <Crown className="w-7 h-7 text-white" /> : <Zap className="w-7 h-7 text-white fill-white" />}
                        </div>
                      </div>

                      <div className="space-y-8">
                        {product.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-6 group/item">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-white/30 transition-colors">
                              {i === 0 ? <Tv className="w-6 h-6" /> : i === 1 ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                            </div>
                            <span className="font-black text-sm uppercase tracking-widest text-white/60">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-12 border-t border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tighter text-white">{product.price}€</span>
                        <span className="text-sm font-black text-white/20 uppercase tracking-[0.3em]">Official Access</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-white/40 font-serif text-2xl italic tracking-tight">IPTV Smarters Pro</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Section: Pourquoi choisir notre IPTV France ? */}
      <section className="py-24 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
              Le Meilleur de l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IPTV en France</span> en 2026
            </h2>
            <div className="space-y-6 text-white/60 font-medium text-lg leading-relaxed">
              <p>
                Vous recherchez un <strong className="text-white">abonnement IPTV premium</strong> stable et performant ? Notre service IPTV Smarters Pro Officiel est conçu pour offrir la meilleure expérience de streaming en France.
              </p>
              <p>
                Avec nos serveurs de dernière génération, profitez d'un <strong className="text-white">IPTV sans coupure</strong> même pendant les grands événements sportifs (Ligue 1, Champions League, Formule 1). Nous garantissons une qualité 4K Ultra HD sur plus de 120 000 chaînes internationales et une bibliothèque VOD immense.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Serveurs France</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Anti-Buffering</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Tv className="w-8 h-8 text-white/40" />
              <h4 className="font-black text-sm uppercase tracking-wider">Smart TV</h4>
              <p className="text-[10px] text-white/30 uppercase font-bold">LG, Samsung, Sony, Android TV</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Laptop className="w-8 h-8 text-white/40" />
              <h4 className="font-black text-sm uppercase tracking-wider">Ordinateur</h4>
              <p className="text-[10px] text-white/30 uppercase font-bold">Windows, MacOS, Linux</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Mobile className="w-8 h-8 text-white/40" />
              <h4 className="font-black text-sm uppercase tracking-wider">Mobile</h4>
              <p className="text-[10px] text-white/30 uppercase font-bold">iOS, Android, Tablette</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Monitor className="w-8 h-8 text-white/40" />
              <h4 className="font-black text-sm uppercase tracking-wider">Box TV</h4>
              <p className="text-[10px] text-white/30 uppercase font-bold">Firestick, Mag, Apple TV</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid - More info but CLEAN */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">{feature}</h3>
                <p className="text-sm text-white/40 font-medium leading-relaxed">
                  Technologie de pointe assurant un flux vidéo continu et une stabilité réseau supérieure pour votre abonnement IPTV.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency & Stock - Clean & Centered */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Offre Limitée dans le temps
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Réservez Votre Accès IPTV</h2>
            <p className="text-white/40 font-medium text-lg">Plus de {product.viewers} personnes en France consultent cette offre actuellement.</p>
          </div>
          <CountdownTimer />
          <div className="pt-8">
            <StockIndicator stock={product.stock} />
          </div>
        </div>
      </section>

      {/* Reviews Section - Modern & Clean */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Avis Clients</h2>
              <p className="text-xl text-white/40 font-medium leading-relaxed">
                Ce que nos clients disent de l'expérience <span className="text-white">IPTV France 2026</span> avec Smarters Pro.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-6">
              <div className="text-4xl font-black text-white">{product.rating}</div>
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{product.reviewCount} Évaluations</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-6 hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-white">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm text-white">{review.author}</p>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase">
                      <Check className="w-3.5 h-3.5" /> Vérifié
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/5'}`} />
                  ))}
                </div>
                <p className="text-white/70 font-medium leading-relaxed italic text-lg tracking-tight leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto pt-10 border-t border-white/5">
            <ReviewForm />
          </div>
        </div>
      </section>

      {/* Sticky Mobile Buy Button - Scroll Controlled */}
      <StickyBuyButton 
        checkoutUrl={product.checkoutUrl} 
        price={product.price} 
        gradient={product.gradient} 
      />

      <div className="pb-32 lg:pb-0">
        <RecentPurchases productName={product.title} />
      </div>
      
      {/* Footer Space */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">© 2026 IPTV Smarters Pro France — Tous droits réservés</p>
      </footer>
    </main>
  );
}
