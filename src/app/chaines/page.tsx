import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Tv, Film, Trophy, Music, Globe, BookOpen, Baby, Heart, ShoppingCart, Newspaper, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chaines IPTV - 160000+ Chaines Mondiales en 4K/Full HD | IPTV SMARTERS PRO',
  description: '160000+ chaines IPTV mondiales avec votre abonnement IPTV SMARTERS PRO. Sport, films, series, documentaires, enfants en qualite 4K Full HD HD. Toutes les chaines francaises et internationales.',
  keywords: [
    'chaines iptv', 'iptv france', 'chaines sport iptv', 'bein sports iptv',
    'canal+ iptv', 'abonnement iptv', 'iptv smarters pro', 'chaines 4k',
    'chaines iptv france', 'liste chaines iptv', 'iptv sport', 'iptv cinema',
  ],
  alternates: {
    canonical: '/chaines',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/chaines',
    title: 'Chaines IPTV - 160000+ Chaines Mondiales 4K | IPTV SMARTERS PRO',
    description: '160000+ chaines IPTV mondiales. Sport, films, series, documentaires en 4K/FHD/HD.',
    siteName: 'IPTV SMARTERS PRO',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chaines IPTV SMARTERS PRO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chaines IPTV - 160000+ Chaines 4K | IPTV SMARTERS PRO',
    description: '160000+ chaines IPTV mondiales. Sport, films, series en 4K/FHD/HD.',
    images: ['/og-image.jpg'],
  },
};

const channelCategories = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Sport IPTV',
    count: '500+',
    description: 'Toutes les chaînes sport en direct',
    channels: [
      'BeIN Sports 1-3 HD',
      'Canal+ Sport HD',
      'RMC Sport 1-15 HD',
      'Eurosport 1-2 4K',
      'L\'Équipe HD',
      'SFR Sport 1-5 HD',
      'Premier League Pass',
      'LaLiga TV',
      'Bundesliga TV',
      'NBA TV HD',
      'ESPN HD',
      'Sky Sports 1-12 HD',
    ],
    gradient: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
  },
  {
    icon: <Film className="w-8 h-8" />,
    title: 'Cinéma & Séries IPTV',
    count: '300+',
    description: 'Chaînes de films et séries en 4K',
    channels: [
      'Canal+ Cinéma HD',
      'Canal+ Séries HD',
      'OCS Max HD',
      'OCS City HD',
      'OCS Choc HD',
      'Ciné+ Premier 4K',
      'Ciné+ Frisson HD',
      'Ciné+ Émotion HD',
      'Action HD',
      'Paramount Channel HD',
      'TCM Cinéma HD',
      'Warner TV HD',
    ],
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    icon: <Tv className="w-8 h-8" />,
    title: 'Chaînes Généralistes',
    count: '200+',
    description: 'Toutes les grandes chaînes françaises',
    channels: [
      'TF1 4K',
      'France 2 4K',
      'France 3 HD',
      'France 5 HD',
      'M6 4K',
      'Arte HD',
      'C8 HD',
      'W9 HD',
      'TMC HD',
      'TFX HD',
      'NRJ12 HD',
      'LCP HD',
    ],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Documentaires IPTV',
    count: '150+',
    description: 'Culture, histoire, sciences',
    channels: [
      'National Geographic 4K',
      'Discovery Channel HD',
      'Histoire TV HD',
      'Planète+ HD',
      'Ushuaïa TV HD',
      'RMC Découverte HD',
      'Science & Vie TV HD',
      'Trek HD',
      'Animaux HD',
      'Chasse & Pêche HD',
      'Seasons HD',
      'BBC Earth HD',
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: 'Chaînes Enfants',
    count: '100+',
    description: 'Divertissement pour les plus jeunes',
    channels: [
      'Disney Channel HD',
      'Disney Junior HD',
      'Gulli HD',
      'Canal J HD',
      'Tiji HD',
      'Piwi+ HD',
      'Cartoon Network HD',
      'Boomerang HD',
      'Nickelodeon HD',
      'Nick Jr HD',
      'Téva HD',
      'Game One HD',
    ],
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: 'Musique & Divertissement',
    count: '120+',
    description: 'Clips, concerts et variétés',
    channels: [
      'MTV HD',
      'MTV Hits HD',
      'NRJ Hits HD',
      'MCM HD',
      'Trace Urban HD',
      'Trace Tropical HD',
      'BET HD',
      'Mezzo HD',
      'Stingray Music',
      'Virgin Radio TV HD',
      'Fun Radio HD',
      'RFM TV HD',
    ],
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    title: 'Info & Actualités IPTV',
    count: '80+',
    description: 'Chaînes d\'information en continu',
    channels: [
      'BFM TV HD',
      'CNews HD',
      'LCI HD',
      'France Info HD',
      'Euronews HD',
      'France 24 HD',
      'CNN International HD',
      'BBC World News HD',
      'Al Jazeera HD',
      'Sky News HD',
      'Bloomberg HD',
      'CNBC HD',
    ],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Chaînes Internationales',
    count: '158000+',
    description: 'Monde entier en streaming',
    channels: [
      'Chaînes UK (2000+)',
      'Chaînes US (3000+)',
      'Chaînes Arabes (5000+)',
      'Chaînes Maghreb (4000+)',
      'Chaînes Espagne (1500+)',
      'Chaînes Italie (1500+)',
      'Chaînes Allemagne (2000+)',
      'Chaînes Portugal (1000+)',
      'Chaînes Turquie (2000+)',
      'Chaînes Afrique (3000+)',
      'Chaînes Asie (5000+)',
      'Et plus de 100 pays',
    ],
    gradient: 'from-teal-500/20 to-cyan-500/20',
    border: 'border-teal-500/30',
    iconColor: 'text-teal-400',
  },
];

export default function ChannelsPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationHeader />
      <div className="pt-20"><BreadcrumbNav items={[{ label: 'Chaines IPTV' }]} /></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-8">
            <Tv className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Chaînes IPTV Premium
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">160 000+</span> Chaînes IPTV
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-8">
            Accédez au catalogue le plus complet avec votre <span className="text-cyan-400 font-semibold">abonnement IPTV SMARTERS PRO</span>. 
            Toutes vos chaînes favorites en qualité 4K, Full HD et HD.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { number: '160K+', label: 'Chaînes IPTV' },
              { number: '20K+', label: 'Films & Séries VOD' },
              { number: '100%', label: 'Qualité 4K/FHD' },
              { number: '24/7', label: 'Support Client' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Catégories de <span className="text-cyan-400">Chaînes IPTV</span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Explorez toutes les catégories disponibles avec votre abonnement IPTV SMARTERS PRO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {channelCategories.map((category, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border ${category.border} hover:scale-105 transition-all duration-500`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${category.iconColor} mb-6`}>
                  {category.icon}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    <span className={`px-3 py-1 rounded-full bg-white/10 text-sm font-bold ${category.iconColor}`}>
                      {category.count}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{category.description}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {category.channels.map((channel, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${category.iconColor.replace('text-', 'bg-')}`} />
                      {channel}
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-cyan-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Qualité de Streaming <span className="text-cyan-400">IPTV</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Tv className="w-10 h-10" />,
                title: 'Qualité 4K/Full HD',
                description: 'Toutes les chaînes IPTV principales en ultra haute définition 4K et Full HD pour une expérience de streaming optimale',
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: 'Serveurs Mondiaux',
                description: 'Infrastructure IPTV avec serveurs répartis en Europe pour une connexion stable et rapide avec votre abonnement IPTV SMARTERS PRO',
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: 'Zéro Buffering',
                description: 'Technologie anti-buffering avancée pour un streaming IPTV fluide sans coupures ni ralentissements',
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Commencez votre <span className="text-cyan-400">Abonnement IPTV</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Activez votre abonnement IPTV SMARTERS PRO maintenant et profitez de 160 000 chaînes en quelques minutes. 
              Support 24/7 et activation instantanée garantie.
            </p>
            <Link
              href="/abonnement-iptv/#pricing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
            >
              Voir les Offres IPTV
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
