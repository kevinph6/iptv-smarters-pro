"use client";

import React from 'react';
import {
  Tv2,
  Film,
  Zap,
  Headphones,
  Smartphone,
  Laptop,
  Monitor,
  Gamepad2,
  Tablet,
  Cast,
  Box,
  Apple,
  Globe,
  Wifi,
  Server,
} from 'lucide-react';

const features = [
  {
    icon: Tv2,
    title: "160,000+ Chaînes Mondiales",
    description: "Accédez à toutes les chaînes mondiales en qualité 4K, Full HD et HD. Sports, divertissement, actualités du monde entier.",
    gradient: "from-cyan-500 to-blue-500",
    stats: { value: "4K", label: "Ultra HD" },
  },
  {
    icon: Film,
    title: "20,000+ VOD Films & Séries",
    description: "Bibliothèque illimitée de films et séries incluant Netflix, Amazon Prime et plus.",
    gradient: "from-purple-500 to-pink-500",
    stats: { value: "20K+", label: "Contenus" },
  },
  {
    icon: Zap,
    title: "Activation Instantanée",
    description: "Configuration instantanée par email ou WhatsApp. Commencez à regarder immédiatement.",
    gradient: "from-amber-500 to-orange-500",
    stats: { value: "Instant", label: "Setup" },
  },
  {
    icon: Headphones,
    title: "Support Client 24/7",
    description: "Notre équipe est disponible à tout moment pour vous aider.",
    gradient: "from-emerald-500 to-teal-500",
    stats: { value: "24/7", label: "Disponible" },
  },
];

const devices = [
  { icon: Monitor, name: "Samsung", type: "Smart TV" },
  { icon: Monitor, name: "LG", type: "Smart TV" },
  { icon: Smartphone, name: "Android", type: "Phone/Tablet" },
  { icon: Apple, name: "iOS", type: "iPhone/iPad" },
  { icon: Laptop, name: "PC/Mac", type: "Computer" },
  { icon: Cast, name: "Fire TV", type: "Amazon" },
  { icon: Gamepad2, name: "Xbox", type: "Console" },
  { icon: Box, name: "MAG Box", type: "IPTV Box" },
  { icon: Tablet, name: "Android TV", type: "TV Box" },
  { icon: Cast, name: "Chromecast", type: "Google" },
  { icon: Apple, name: "Apple TV", type: "Apple" },
  { icon: Box, name: "Roku", type: "Streaming" },
];

const FeaturesOverview = () => {
  return (
    <section id="features" className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            IPTV SMARTERS PRO
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              L'abonnement IPTV le plus Complet !
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
            Découvrez pourquoi des milliers de clients nous font confiance pour leur <span className="text-cyan-400">abonnement IPTV</span> et divertissement quotidien avec <span className="text-purple-400">SMARTERS PRO</span>
          </p>
          <p className="text-white/70 text-sm mt-2">
            IPTV SMARTERS PRO • Abonnement iptv premium France • Service IPTV de qualité
          </p>
        </div>

        {/* Features Grid - Hexagonal Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group relative">
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.07]">
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} opacity-10 rounded-bl-[100px]`} />
                  
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                        {feature.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Stats Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                        <span className="text-2xl font-black text-white">{feature.stats.value}</span>
                        <span className="text-white/60 text-sm">{feature.stats.label}</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Devices Section */}
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Wifi className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm">Multi-Appareils</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Compatible avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">tous vos appareils</span>
            </h3>
            <p className="text-white/70 text-sm mt-2">
              IPTV SMARTERS PRO compatible avec tous les appareils • Abonnement iptv universel
            </p>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {devices.map((device, index) => {
              const Icon = device.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-500/30 group-hover:-translate-y-1">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-white/60 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <p className="text-white font-semibold text-sm mb-0.5">{device.name}</p>
                    <p className="text-white/40 text-xs">{device.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/60 text-xs">
              Abonnement iptv compatible • IPTV SMARTERS PRO • Installation facile sur tous appareils
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;