"use client";

import React, { useState, useEffect } from 'react';
import { Zap, Globe } from 'lucide-react';

const DiscountBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = end.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / 86400000),
          h: Math.floor((diff / 3600000) % 24),
          m: Math.floor((diff / 60000) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Glow - hidden on mobile to reduce visual noise */}
      <div className="hidden lg:block absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />

      {/* Outer wrapper */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-1.5">

        {/* Banner */}
        <a
          href="#pricing"
          className="group relative flex flex-col items-center justify-center rounded-xl overflow-hidden px-4 py-4 sm:px-6 sm:py-6 md:py-8"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0014] via-[#140025] to-[#0a0014]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(168,85,247,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(236,72,153,0.1),transparent_60%)]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">

            {/* Tag */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">
                Offre limitée — Février uniquement
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>

            {/* Main line */}
            <div className="flex items-center gap-3 md:gap-5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                -70%
              </span>
              <div className="h-8 md:h-10 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="flex flex-col">
                <span className="text-[9px] md:text-xs text-white/70 font-medium italic leading-none">Officiel</span>
                <span className="text-lg sm:text-xl md:text-3xl font-black text-white tracking-tight leading-none">
                  IPTV SMARTERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">PRO</span>
                </span>
              </div>
            </div>

            {/* Countdown row */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-[9px] md:text-[11px] text-white/70 font-semibold uppercase tracking-wider hidden sm:inline">
                Expire dans
              </span>
              <div className="flex gap-1">
                {[
                  { v: timeLeft.d, l: 'J' },
                  { v: timeLeft.h, l: 'H' },
                  { v: timeLeft.m, l: 'M' },
                  { v: timeLeft.s, l: 'S' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-0.5">
                    <span className="bg-white/10 rounded px-1 md:px-1.5 py-0.5 text-[11px] md:text-sm font-black text-white tabular-nums">
                      {t.v.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[8px] md:text-[10px] text-white/70 font-bold">{t.l}</span>
                    {i < 3 && <span className="text-white/50 mx-0.5 text-[10px]">:</span>}
                  </div>
                ))}
              </div>
              <span className="ml-1 md:ml-3 px-3 md:px-4 py-1 md:py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white text-[9px] md:text-xs font-black uppercase tracking-wider group-hover:scale-105 transition-transform">
                En profiter →
              </span>
            </div>
          </div>

          {/* Hover shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </a>
      </div>

      {/* Floating badges */}
      <div className="absolute left-4 top-1/3 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="px-3 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span className="text-white font-semibold text-xs">4K Ultra HD</span>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-1/3 translate-x-1/2 animate-bounce delay-500 hidden lg:block">
        <div className="px-3 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-purple-500/30 shadow-xl">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span className="text-white font-semibold text-xs">Multi-écrans</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DiscountBanner;
