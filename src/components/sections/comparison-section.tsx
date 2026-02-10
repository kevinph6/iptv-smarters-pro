"use client";

import React from 'react';
import { Play, Monitor } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section id="comparison" className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[200px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Monitor className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Comparaison</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Comparaison entre les packs
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              IPTV SMARTERS et IPTV PREMIUM
            </span>
          </h2>
        </div>

        {/* Video Container */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
            {/* Video Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-white/40 text-sm font-medium">Démonstration vidéo</span>
              </div>
            </div>
            
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/og-image.jpg"
                src="https://darkorchid-goldfish-662671.hostingersite.com/wp-content/uploads/2025/10/ISP-FRANCE-2024.mp4"
              >
                Votre navigateur ne prend pas en charge la balise vidéo.
              </video>
              
              {/* Play Button Overlay (shown when not playing) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Highlights */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
            <p className="text-cyan-400 font-bold text-lg mb-1">IPTV Standard</p>
            <p className="text-white/50 text-sm">120K+ chaînes • HD/FHD</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center">
            <p className="text-purple-400 font-bold text-lg mb-1">IPTV Premium</p>
            <p className="text-white/50 text-sm">120K+ chaînes • 4K/FHD + Contenu exclusif</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;