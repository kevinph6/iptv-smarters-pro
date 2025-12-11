"use client";

import { Check, Zap, Crown, Rocket, Star, Sparkles } from 'lucide-react';
import React from 'react';

const pricingPlans = [
  {
    title: "3 Mois",
    subtitle: "IPTV HD",
    price: "19",
    cents: "00",
    href: "/produits/abonnement-iptv-hd-3-mois",
    icon: Zap,
    popular: false,
    gradient: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/30",
  },
  {
    title: "6 Mois",
    subtitle: "IPTV HD",
    price: "22",
    cents: "00",
    href: "/produits/abonnement-iptv-hd-6-mois",
    icon: Star,
    popular: false,
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/30",
  },
  {
    title: "12 Mois",
    subtitle: "IPTV HD",
    price: "39",
    cents: "00",
    href: "/produits/abonnement-iptv-hd-12-mois",
    icon: Crown,
    popular: true,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/30",
  },
  {
    title: "24 Mois",
    subtitle: "IPTV HD",
    price: "59",
    cents: "00",
    href: "/produits/abonnement-iptv-hd-24-mois",
    icon: Rocket,
    popular: false,
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
];

const features = [
  { text: "Activation instantanée !", icon: "⚡" },
  { text: "Mise à jour gratuite", icon: "🔄" },
  { text: "120K+ chaînes & VOD", icon: "📺" },
  { text: "Chaînes 4K FHD HD", icon: "🎬" },
  { text: "Chaînes Premium", icon: "⭐" },
  { text: "Rapide et stable", icon: "🚀" },
  { text: "M3U & MAG & Enigma", icon: "📱" },
  { text: "Smart TV & Mobile & PC", icon: "💻" },
  { text: "Serveur disponible", icon: "🔥" },
  { text: "Support 24/7", icon: "💬" },
];

const StandardPricingCards = () => {
  return (
    <section id="pricing" className="relative bg-black py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[120px] sm:blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 rounded-full blur-[120px] sm:blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Tarification Simple</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wide">
            ABONNEMENT IPTV HD
          </h2>
          <p className="text-white/70 mt-2 text-sm sm:text-lg max-w-2xl mx-auto">
            Choisissez un plan qui correspond à vos besoins
          </p>
        </div>

        {/* Mobile: Simple Vertical Scroll */}
        <div className="lg:hidden space-y-4 max-w-md mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white whitespace-nowrap">
                    ⭐ Plus Populaire
                  </div>
                )}
                
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-30`} />
                
                <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${plan.gradient}`} />
                  
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg ${plan.glow}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                          <p className="text-xs text-white/60 uppercase">{plan.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-start">
                          <span className="text-sm text-white/60 mt-1">€</span>
                          <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                            {plan.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features - Compact Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-sm flex-shrink-0">{feature.icon}</span>
                          <span className="text-white/90 text-[10px] leading-tight">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={plan.href}
                      className="block w-full py-3 rounded-xl font-bold text-center text-white relative overflow-hidden group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} group-active:scale-95 transition-transform`} />
                      <span className="relative text-sm">Choisir ce plan →</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`group relative ${plan.popular ? 'xl:-translate-y-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-lg shadow-amber-500/30 whitespace-nowrap">
                      ⭐ Plus Populaire
                    </div>
                  </div>
                )}

                <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className={`relative h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:scale-[1.02] ${plan.popular ? 'border-amber-500/30' : ''}`}>
                  <div className={`h-1.5 bg-gradient-to-r ${plan.gradient}`} />
                  
                  <div className="p-6 pb-4 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg ${plan.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.title}</h3>
                    <p className="text-white/60 text-sm uppercase tracking-wider font-semibold">{plan.subtitle}</p>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="relative p-6 rounded-2xl bg-black/30 border border-white/5 text-center">
                      <div className="flex items-start justify-center gap-1">
                        <span className="text-2xl font-bold text-white/60 mt-2">€</span>
                        <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                          {plan.price}
                        </span>
                        <span className="text-xl text-white/40 mt-2">.{plan.cents}</span>
                      </div>
                      <p className="text-white/50 text-sm mt-2 font-medium">paiement unique</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="space-y-3">
                      {features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="text-lg flex-shrink-0">{feature.icon}</span>
                          <span className="text-white/80 leading-relaxed">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={plan.href}
                      className="group/btn relative block w-full py-4 rounded-xl font-bold text-center overflow-hidden transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} transition-transform duration-300 group-hover/btn:scale-105`} />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative text-white text-lg font-bold">Choisir ce plan</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StandardPricingCards;