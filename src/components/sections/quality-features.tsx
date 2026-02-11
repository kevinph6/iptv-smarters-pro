"use client";

import { Server, Zap, Headset, Sparkles } from 'lucide-react';
import React from 'react';

const featuresData = [
  {
    icon: Server,
    gradient: "from-blue-500 to-cyan-500",
    title: 'Stabilité & Qualité 4K / FHD',
    description: 'IPTV SMARTERS PRO utilise un serveur dédié européen de haute qualité avec une connexion à 20 Gbps. L\'ouverture de nos chaînes de télévision prendra moins de 0,5 seconde.',
    stat: "20 Gbps",
    statLabel: "Connexion",
  },
  {
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    title: 'Activation instantanée',
    description: "Immédiatement après la souscription, notre Agent vous contactera via email ou Whatsapp pour l'activation de votre Abonnement. L'activation est instantanée.",
    stat: "Instant",
    statLabel: "Activation",
  },
  {
    icon: Headset,
    gradient: "from-emerald-500 to-teal-500",
    title: 'Assistance client 24h/7j',
    description: "Nous avons une assistance par ticket et par e-mail 24h/24 et 7j/7. Veuillez nous contacter si vous avez besoin d'aide.",
    stat: "24/7",
    statLabel: "Support",
  },
];

const QualityFeatures = () => {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Notre Promesse</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Pourquoi nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">choisir</span> ?
          </h2>
          <p className="text-white/70 text-sm mt-3">
            IPTV SMARTERS PRO • Abonnement iptv stable • Meilleur IPTV France • Service premium IPTV SMARTERS PRO
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative"
              >
                {/* Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Stat Badge */}
                    <div className="text-right">
                      <p className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                        {feature.stat}
                      </p>
                      <p className="text-white/40 text-xs uppercase tracking-wider">{feature.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* SEO Keywords */}
                  <div className="border-t border-white/5 pt-3 mt-3">
                    <p className="text-white/10 text-[9px] leading-tight">
                      IPTV SMARTERS PRO • Abonnement iptv premium
                    </p>
                    <p className="text-white/10 text-[9px] leading-tight mt-0.5">
                      Service IPTV fiable • IPTV SMARTERS PRO France
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom SEO text */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-xs">
            IPTV SMARTERS PRO • Abonnement iptv • Qualité garantie • Support 24/7 • Activation instantanée
          </p>
        </div>
      </div>
    </section>
  );
};

export default QualityFeatures;