"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Zap, Globe, Clock, Headphones } from 'lucide-react';

const createSeededRandom = (seed: number) => {
  let value = seed;
  return () => {
    const x = Math.sin(value++) * 10000;
    return x - Math.floor(x);
  };
};

const seededRandom = createSeededRandom(42);
const particleStyles = Array.from({ length: 20 }, () => ({
  left: `${10 + seededRandom() * 80}%`,
  top: `${10 + seededRandom() * 80}%`,
  animationDelay: `${seededRandom() * 1.8}s`,
  animationDuration: `${2.2 + seededRandom() * 1.6}s`,
}));

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particleStyles.map((style, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={style}
            />
          ))}
        </div>


      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl pt-16 pb-20">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse delay-100" />
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse delay-200" />
            </div>
            <span className="text-sm text-white/90 font-semibold">N°1 en France • +50,000 clients satisfaits • IPTV SMARTERS PRO</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
            <span className="block">Meilleur Abonnement</span>
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                IPTV N°1 En France
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-10">
            Accédez à plus de <span className="text-cyan-400 font-semibold">160,000 chaînes IPTV</span> mondiales en 4K avec notre <span className="text-purple-400 font-semibold">abonnement IPTV premium</span>, 
            des milliers de films et séries VOD. Installation de votre <span className="text-pink-400 font-semibold">abonnement SMARTERS PRO</span> instantanée sur tous vos appareils.
          </p>
          
          {/* SEO Keywords under hero text */}
          <p className="text-white/20 text-xs mb-8">
            IPTV SMARTERS PRO • Abonnement iptv France • IPTV SMARTERS PRO Premium • Abonnement iptv 4K • IPTV SMARTERS PRO Fiable
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#pricing"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-bold text-lg text-white">Commencer maintenant</span>
              <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#comparison"
              className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-cyan-500/30 transition-all">

              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Play className="w-5 h-5 fill-white" />
              </div>
              Voir la démo
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
          { icon: Globe, value: "160K+", label: "Chaînes", color: "cyan" },
          { icon: Play, value: "20K+", label: "Films & Séries", color: "purple" },
          { icon: Clock, value: "Instant", label: "Activation", color: "pink" },
          { icon: Headphones, value: "24/7", label: "Support", color: "emerald" }].
          map((stat, i) =>
          <div key={i} className="group relative">
              <div className={`absolute inset-0 bg-${stat.color}-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-500/5 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
                {/* SEO Keywords */}
                <p className="text-white/10 text-[8px] mt-1">
                  IPTV SMARTERS PRO
                </p>
                <p className="text-white/10 text-[8px]">
                  Abonnement iptv
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-2 !px-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ba0e4002-35cb-42f6-b185-6a3961472a13-officieliptvsmarterspro-fr/assets/images/officiel-iptv-smarters-1.png"
              alt="IPTV SMARTERS PRO Interface - Abonnement iptv premium"
              width={1200}
              height={600}
              className="rounded-xl w-full h-auto"
              priority />

            
            {/* Floating Elements */}
            <div className="absolute left-4 top-1/3 -translate-x-1/2 animate-bounce">
              <div className="px-4 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-semibold text-sm">4K Ultra HD</span>
                </div>
                <p className="text-white/40 text-[8px] mt-0.5">IPTV SMARTERS PRO</p>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-1/3 translate-x-1/2 animate-bounce delay-500">
              <div className="px-4 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-purple-500/30 shadow-xl">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold text-sm">Multi-écrans</span>
                </div>
                <p className="text-white/40 text-[8px] mt-0.5">Abonnement iptv</p>
              </div>
            </div>
          </div>
          
          {/* SEO Keywords under image */}
          <p className="text-white/20 text-xs text-center mt-4">
            IPTV SMARTERS PRO • Abonnement iptv • Meilleur service IPTV France
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;