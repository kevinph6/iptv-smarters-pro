"use client";

import { Gift, Crown, Rocket, Star, Gem, Sparkles, Zap } from 'lucide-react';
import React, { useState, useCallback } from 'react';

type PricingPlan = {
  title: string;
  subtitle: string;
  price: string;
  cents: string;
  href: string;
  icon: typeof Zap;
  popular: boolean;
  bonus?: string;
  gradient: string;
  glow: string;
};

type Feature = {
  text: string;
  icon: string;
};

// ── Premium 4K Plans ──
const premiumPlans: PricingPlan[] = [
  {
    title: "3 Mois",
    subtitle: "PREMIUM 4K",
    price: "27",
    cents: "00",
    href: "/produits/abonnement-iptv-premium-4k-3-mois",
    icon: Star,
    popular: false,
    gradient: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/30",
  },
  {
    title: "6 Mois",
    subtitle: "PREMIUM 4K",
    price: "42",
    cents: "00",
    href: "/produits/abonnement-iptv-premium-4k-6-mois",
    icon: Gem,
    popular: false,
    gradient: "from-fuchsia-500 to-purple-600",
    glow: "shadow-fuchsia-500/30",
  },
  {
    title: "12 Mois",
    subtitle: "PREMIUM 4K",
    price: "69",
    cents: "00",
    href: "/produits/abonnement-iptv-premium-4k-12-mois",
    icon: Crown,
    popular: true,
    bonus: "+2 Mois Gratuit",
    gradient: "from-amber-500 to-red-500",
    glow: "shadow-amber-500/30",
  },
  {
    title: "24 Mois",
    subtitle: "PREMIUM 4K",
    price: "100",
    cents: "00",
    href: "/produits/abonnement-iptv-premium-4k-24-mois",
    icon: Rocket,
    popular: false,
    bonus: "+4 Mois Gratuit",
    gradient: "from-red-500 to-rose-600",
    glow: "shadow-red-500/30",
  },
];

const premiumFeatures: Feature[] = [
  { text: "Activation instantanée !", icon: "⚡" },
  { text: "Mise à jour gratuite", icon: "🔄" },
  { text: "120K+ chaînes & VOD", icon: "📺" },
  { text: "Chaînes 4K FHD HD", icon: "🎬" },
  { text: "Chaînes Premium", icon: "⭐" },
  { text: "Contenu adulte (+18)", icon: "🔞" },
  { text: "Rapide et stable", icon: "🚀" },
  { text: "M3U & MAG & Enigma", icon: "📱" },
  { text: "Smart TV & Mobile & PC", icon: "💻" },
  { text: "Serveur disponible", icon: "🔥" },
  { text: "Support 24/7", icon: "💬" },
];

// ── IPTV HD Plans ──
const standardPlans: PricingPlan[] = [
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

const standardFeatures: Feature[] = [
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

// ── Tier config ──
const tiers = {
  premium: {
    plans: premiumPlans,
    features: premiumFeatures,
    badge: "Qualité Supérieure",
    badgeIcon: Crown,
    badgeColor: "text-amber-400",
    badgeBg: "from-red-500/20 to-amber-500/20",
    badgeBorder: "border-red-500/30",
    title: "PACK PREMIUM 4K",
    titleGradient: "from-red-500 via-amber-500 to-red-500",
    subtitle: "Profitez de la meilleure qualité d'image avec nos packs Premium",
    popularLabel: "Meilleure Offre",
    popularGradient: "from-amber-500 to-red-500",
    subtitleColor: "text-amber-400/90",
    bgBlob1: "bg-red-500/10",
    bgBlob2: "bg-amber-500/10",
  },
  standard: {
    plans: standardPlans,
    features: standardFeatures,
    badge: "Tarification Simple",
    badgeIcon: Sparkles,
    badgeColor: "text-cyan-400",
    badgeBg: "from-purple-500/20 to-cyan-500/20",
    badgeBorder: "border-purple-500/30",
    title: "ABONNEMENT IPTV HD",
    titleGradient: "from-cyan-400 via-purple-400 to-pink-400",
    subtitle: "Choisissez un plan qui correspond à vos besoins",
    popularLabel: "Plus Populaire",
    popularGradient: "from-amber-500 to-orange-500",
    subtitleColor: "text-white/60",
    bgBlob1: "bg-cyan-500/10",
    bgBlob2: "bg-purple-500/10",
  },
} as const;

type TierKey = keyof typeof tiers;

const StandardPricingCards = () => {
  const [activeTier, setActiveTier] = useState<TierKey>("premium");
  const [isAnimating, setIsAnimating] = useState(false);

  const switchTier = useCallback((tier: TierKey) => {
    if (tier === activeTier || isAnimating) return;
    setIsAnimating(true);
    // Small delay for fade-out, then switch
    setTimeout(() => {
      setActiveTier(tier);
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  }, [activeTier, isAnimating]);

  const config = tiers[activeTier];
  const BadgeIcon = config.badgeIcon;

  return (
    <section id="pricing" className="relative bg-black py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background Effects - animated with tier change */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <div className={`absolute top-1/2 left-1/4 w-72 sm:w-96 h-72 sm:h-96 ${config.bgBlob1} rounded-full blur-[120px] sm:blur-[150px] transition-colors duration-700`} />
        <div className={`absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 ${config.bgBlob2} rounded-full blur-[120px] sm:blur-[150px] transition-colors duration-700`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wide mb-3">
            NOS ABONNEMENTS IPTV
          </h2>
          <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Choisissez la qualité qui vous convient
          </p>

          {/* ── Toggle Switch ── */}
          <div className="flex justify-center">
            <div className="relative inline-flex items-center bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
              {/* Sliding highlight */}
              <div
                className={`absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-300 ease-out ${
                  activeTier === "premium"
                    ? "left-1.5 bg-gradient-to-r from-red-500/80 to-amber-500/80 shadow-lg shadow-amber-500/20"
                    : "left-[calc(50%+2px)] bg-gradient-to-r from-cyan-500/80 to-blue-500/80 shadow-lg shadow-cyan-500/20"
                }`}
                style={{ width: "calc(50% - 6px)" }}
              />

              <button
                onClick={() => switchTier("premium")}
                aria-pressed={activeTier === "premium"}
                className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-colors duration-300 ${
                  activeTier === "premium"
                    ? "text-white"
                    : "text-white/70 hover:text-white/80"
                }`}
              >
                <Crown className="w-4 h-4" aria-hidden="true" />
                <span>Premium 4K</span>
              </button>

              <button
                onClick={() => switchTier("standard")}
                aria-pressed={activeTier === "standard"}
                className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-colors duration-300 ${
                  activeTier === "standard"
                    ? "text-white"
                    : "text-white/70 hover:text-white/80"
                }`}
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>IPTV HD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tier Badge & Title */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-14 transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.badgeBg} border ${config.badgeBorder} mb-4 transition-colors duration-500`}>
            <BadgeIcon className={`w-4 h-4 ${config.badgeColor}`} />
            <span className={`${config.badgeColor} font-bold text-sm uppercase tracking-wider`}>{config.badge}</span>
          </div>
          <h3 className={`text-xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${config.titleGradient} uppercase tracking-wide transition-colors duration-500`}>
            {config.title}
          </h3>
          <p className="text-white/70 mt-2 text-sm sm:text-lg max-w-2xl mx-auto">
            {config.subtitle}
          </p>
          {activeTier === "premium" && (
            <p className="text-amber-400/70 mt-2 text-xs sm:text-sm">
              Inclut le contenu 4K UHD et le contenu adulte (+18)
            </p>
          )}
        </div>

        {/* ── Pricing Cards ── */}
        <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}>
          {/* Mobile: Vertical Stack */}
          <div className="lg:hidden space-y-4 max-w-md mx-auto">
            {config.plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div key={`${activeTier}-${index}`} className="relative">
                  {plan.popular && (
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r ${config.popularGradient} rounded-full text-xs font-bold text-white whitespace-nowrap`}>
                      {config.popularLabel}
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
                            <p className={`text-xs ${config.subtitleColor} uppercase font-semibold`}>{plan.subtitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-start">
                            <span className="text-sm text-white/70 mt-1">&euro;</span>
                            <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                              {plan.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bonus Badge (Premium only) */}
                      {plan.bonus && (
                        <div className="mb-4 flex justify-center">
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold py-1.5 px-3 rounded-full">
                            <Gift className="w-3.5 h-3.5" />
                            <span>{plan.bonus}</span>
                          </div>
                        </div>
                      )}

                      {/* Features - Compact Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {config.features.map((feature, idx) => (
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
                        <span className="relative text-sm">Choisir ce plan &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: 4-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {config.plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={`${activeTier}-${index}`}
                  className={`group relative ${plan.popular ? "xl:-translate-y-4" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${config.popularGradient} text-white text-sm font-bold shadow-lg shadow-amber-500/30 whitespace-nowrap`}>
                        {config.popularLabel}
                      </div>
                    </div>
                  )}

                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />

                  <div className={`relative h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:scale-[1.02] ${plan.popular ? "border-amber-500/30" : ""}`}>
                    <div className={`h-1.5 bg-gradient-to-r ${plan.gradient}`} />

                    <div className="p-6 pb-4 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg ${plan.glow} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{plan.title}</h3>
                      <p className={`${config.subtitleColor} text-sm uppercase tracking-wider font-semibold`}>{plan.subtitle}</p>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="relative p-6 rounded-2xl bg-black/30 border border-white/5 text-center">
                        <div className="flex items-start justify-center gap-1">
                          <span className="text-2xl font-bold text-white/70 mt-2">&euro;</span>
                          <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                            {plan.price}
                          </span>
                          <span className="text-xl text-white/60 mt-2">.{plan.cents}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-2 font-medium">paiement unique</p>

                        {plan.bonus && (
                          <div className="mt-4 flex justify-center">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-sm font-bold py-2 px-4 rounded-full shadow-lg shadow-amber-500/30">
                              <Gift className="w-4 h-4" />
                              <span>{plan.bonus}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="space-y-3">
                        {config.features.map((feature, featureIndex) => (
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
      </div>
    </section>
  );
};

export default StandardPricingCards;
