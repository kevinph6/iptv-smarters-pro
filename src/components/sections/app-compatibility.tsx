"use client";

import Image from "next/image";
import { Layers } from "lucide-react";

interface App {
  name: string;
  icon: string;
}

const apps: App[] = [
  { name: 'SMART IPTV', icon: '/icons/apps/smart-iptv.svg' },
  { name: 'DUPLEX IPTV', icon: '/icons/apps/duplex-iptv.svg' },
  { name: 'FLIX IPTV', icon: '/icons/apps/flix-iptv.svg' },
  { name: 'GSE SMART IPTV', icon: '/icons/apps/gse-smart-iptv.svg' },
  { name: 'HOME IPTV', icon: '/icons/apps/home-iptv.svg' },
  { name: 'iPLAY TV', icon: '/icons/apps/iplaytv.svg' },
  { name: 'IPTV EXTREME', icon: '/icons/apps/iptvextreme.svg' },
  { name: 'KODI', icon: '/icons/apps/kodi.svg' },
  { name: 'MAG', icon: '/icons/apps/mag.svg' },
  { name: 'MyIPTV PLAYER', icon: '/icons/apps/myiptv-player.svg' },
  { name: 'MYTVONLINE', icon: '/icons/apps/mytvonline.svg' },
  { name: 'NET IPTV', icon: '/icons/apps/net-iptv.svg' },
  { name: 'ROYAL IPTV', icon: '/icons/apps/royal-iptv.svg' },
  { name: 'SET IPTV', icon: '/icons/apps/set-iptv.svg' },
  { name: 'SMARTONE IPTV', icon: '/icons/apps/smart-one.svg' },
  { name: 'SMART +', icon: '/icons/apps/smart-plus.svg' },
  { name: 'SMART STB', icon: '/icons/apps/smart-stb.svg' },
  { name: 'SS IPTV', icon: '/icons/apps/ss-iptv.svg' },
  { name: 'STBEMU', icon: '/icons/apps/stebmu.svg' },
  { name: 'TIVIMATE', icon: '/icons/apps/tivimate.svg' },
  { name: 'XBOX', icon: '/icons/apps/xbox.svg' },
  { name: 'VLC PLAYER', icon: '/icons/apps/vlc-player.svg' },
  { name: 'XCIPTV', icon: '/icons/apps/xciptv.svg' },
];

const AppCompatibility = () => {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Applications</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Regardez sur vos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"> applications préférées</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Vous ne voyez pas votre application? Notre <span className="text-cyan-400">abonnement IPTV SMARTERS PRO</span> est disponible sur d{`'`}autres applications
          </p>
          <p className="text-white/70 text-sm mt-2">
            IPTV SMARTERS PRO • Abonnement iptv premium pour toutes les applications IPTV
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {apps.map((app) => (
            <div
              key={app.name}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-500/30 group-hover:-translate-y-2 group-hover:scale-105">
                {/* App Icon */}
                <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.icon}
                    alt={`${app.name} - IPTV SMARTERS PRO compatible`}
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    loading="lazy"
                  />
                </div>
                
                {/* App Name */}
                <p className="text-white/80 text-xs font-bold uppercase tracking-wider text-center group-hover:text-white transition-colors mb-1">
                  {app.name}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm mb-2">
            + Des centaines d{`'`}autres applications compatibles avec IPTV SMARTERS PRO
          </p>
          <p className="text-white/60 text-xs">
            Abonnement iptv • IPTV SMARTERS PRO • Service IPTV Premium France
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppCompatibility;