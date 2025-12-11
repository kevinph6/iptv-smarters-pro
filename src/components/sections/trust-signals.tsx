'use client';

import { Shield, Clock, Users, Award, Lock, Zap, HeadphonesIcon, TrendingUp, Eye, Server } from 'lucide-react';
import Image from 'next/image';

const trustMetrics = [
  {
    icon: Users,
    value: '50K+',
    label: 'Clients Satisfaits',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: TrendingUp,
    value: '99.9%',
    label: 'Temps de Disponibilité',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Award,
    value: 'Depuis 2020',
    label: 'Années d\'Expérience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    value: 'Instant',
    label: 'Activation Instantanée',
    color: 'from-orange-500 to-red-500'
  }
];

const trustBadges = [
  {
    icon: Shield,
    title: 'Paiement Sécurisé SSL',
    description: 'Transactions cryptées 256-bit',
    color: 'cyan'
  },
  {
    icon: Lock,
    title: 'Données Protégées',
    description: 'Confidentialité garantie',
    color: 'purple'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support 24/7',
    description: 'Assistance disponible',
    color: 'green'
  },
  {
    icon: Zap,
    title: 'Serveurs Européens',
    description: 'Connexion 20 Gbps',
    color: 'orange'
  }
];

export default function TrustSignals() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4">
            Confiance & Sécurité
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Pourquoi Nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Choisir ?</span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Notre Promesse</span>
          </h3>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Plus de <span className="text-cyan-400 font-bold">50 000 clients</span> satisfaits nous font confiance pour leur 
            <span className="text-purple-400 font-bold"> abonnement IPTV SMARTERS PRO</span>. Service premium, sécurisé et fiable.
          </p>
        </div>

        {/* NEW: VPN & Privacy Promise Section */}
        <div className="mb-16">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-green-500/30 overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4">
                  IPTV 100% Intraçable avec VPN Intégré
                </h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Notre service IPTV SMARTERS PRO inclut une <span className="text-green-400 font-bold">protection VPN automatique</span> qui masque complètement votre activité. 
                  Votre <span className="text-blue-400 font-semibold">fournisseur d'accès Internet (FAI)</span> ne peut pas détecter, surveiller ou savoir que vous utilisez notre service IPTV. 
                  <span className="block mt-3 text-green-400 font-bold text-lg">Anonymat total garanti.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Privacy Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-green-500/[0.02] backdrop-blur-sm border border-green-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">VPN Intégré Gratuit</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Chaque connexion est automatiquement protégée par notre VPN intégré. 
              <span className="text-green-400 font-semibold"> Aucune configuration nécessaire</span> - 
              la protection est activée dès votre première utilisation.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/[0.02] backdrop-blur-sm border border-blue-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Totalement Anonyme</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Votre fournisseur d'accès (Orange, Free, SFR, Bouygues) 
              <span className="text-blue-400 font-semibold"> ne peut pas voir</span> que vous utilisez l'IPTV. 
              Votre trafic est chiffré et masqué en permanence.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-purple-500/[0.02] backdrop-blur-sm border border-purple-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Server className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Serveurs Sécurisés</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Nos serveurs européens utilisent 
              <span className="text-purple-400 font-semibold"> un chiffrement de niveau militaire</span>. 
              Vos données et votre historique restent privés à 100%.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-cyan-500/[0.02] backdrop-blur-sm border border-cyan-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Politique Zéro Log</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Nous ne conservons <span className="text-cyan-400 font-semibold">aucun journal de connexion</span> ou 
              historique de visionnage. Votre vie privée est notre priorité absolue.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-500/[0.02] backdrop-blur-sm border border-orange-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Anti-Détection FAI</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Notre technologie rend votre trafic IPTV 
              <span className="text-orange-400 font-semibold"> invisible pour votre FAI</span>. 
              Aucun risque de limitation de bande passante.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-pink-500/5 to-pink-500/[0.02] backdrop-blur-sm border border-pink-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Protection Instantanée</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              Le VPN s'active automatiquement dès votre premier lancement. 
              <span className="text-pink-400 font-semibold"> Pas de configuration compliquée</span> - 
              vous êtes protégé immédiatement.
            </p>
          </div>
        </div>

        {/* Privacy Banner */}
        <div className="mb-16 text-center">
          <div className="inline-block p-6 md:p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/30">
            <p className="text-base md:text-lg text-white/80 mb-3">
              <span className="text-green-400 font-bold">100% Anonyme</span> • 
              <span className="text-blue-400 font-bold"> VPN Inclus</span> • 
              <span className="text-purple-400 font-bold"> Zéro Log</span> • 
              <span className="text-cyan-400 font-bold"> Chiffrement Total</span>
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-white">
              Regardez l'IPTV en <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Toute Confidentialité</span>
            </p>
          </div>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            const colorClasses = {
              cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
              purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
              green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
              orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400'
            };
            
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${colorClasses[badge.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[badge.color as keyof typeof colorClasses].split(' ')[1]} border ${colorClasses[badge.color as keyof typeof colorClasses].split(' ')[2]}`}>
                  <Icon className={`w-6 h-6 ${colorClasses[badge.color as keyof typeof colorClasses].split(' ')[3]}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Security Section */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Paiement <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">100% Sécurisé</span>
              </h3>
              <p className="text-white/70 text-lg mb-6">
                Toutes les transactions sont cryptées avec la technologie SSL de niveau bancaire. 
                Vos données personnelles et bancaires sont protégées à 100%.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-white font-semibold text-sm">✓ Cryptage SSL 256-bit</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-white font-semibold text-sm">✓ PCI DSS Compliant</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-white font-semibold text-sm">✓ Garantie 24h</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative w-64 h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/trust-and-security-badges-collection-for-dc4ad78d-20251205185304.jpg"
                  alt="Trust badges"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee Banner */}
        <div className="mt-8 text-center p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-green-400" />
            <h4 className="text-xl font-bold text-white">
              Garantie Satisfait ou Remboursé 24h
            </h4>
          </div>
          <p className="text-white/70">
            Si vous n'êtes pas satisfait, nous vous remboursons intégralement sous 24 heures. Sans questions.
          </p>
        </div>
      </div>
    </section>
  );
}