"use client";

import Image from "next/image";
import { Layers } from "lucide-react";

interface App {
  name: string;
  icon: string;
}

const apps: App[] = [
  { name: 'SMART IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-icon-for-smart-iptv-app-09c4ab27-20251205181036.jpg' },
  { name: 'DUPLEX IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-icon-for-duplex-iptv-st-0f19efe5-20251205181034.jpg' },
  { name: 'FLIX IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-flix-iptv-applicati-0c4fe512-20251205181036.jpg' },
  { name: 'GSE SMART IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-gse-smart-iptv-play-4ccaccfa-20251205181035.jpg' },
  { name: 'HOME IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-home-iptv-app-simpl-7a0ce778-20251205181033.jpg' },
  { name: 'iPLAY TV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-iplay-tv-streaming--b9d49484-20251205181037.jpg' },
  { name: 'IPTV EXTREME', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-iptv-extreme-app-bo-b359a439-20251205181034.jpg' },
  { name: 'KODI', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-kodi-media-player-s-4a3f14d5-20251205181033.jpg' },
  { name: 'MAG', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-mag-iptv-set-top-bo-b282c153-20251205181034.jpg' },
  { name: 'MyIPTV PLAYER', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-myiptv-player-appli-dd920b11-20251205181033.jpg' },
  { name: 'Mytvonline', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-mytvonline-streamin-56c45963-20251205181033.jpg' },
  { name: 'NET IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-net-iptv-applicatio-85ce8496-20251205181033.jpg' },
  { name: 'ROYAL IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-royal-iptv-premium--3a114533-20251205181033.jpg' },
  { name: 'SET IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-set-iptv-app-simple-52b314fd-20251205181037.jpg' },
  { name: 'Smartone IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-smartone-iptv-appli-4cb235a5-20251205181034.jpg' },
  { name: 'SMART +', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-smart-iptv-app-simp-b82ccde7-20251205181036.jpg' },
  { name: 'SMART STB', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-smart-stb-set-top-b-8c24f270-20251205181033.jpg' },
  { name: 'SS IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-ss-iptv-application-0e492234-20251205181033.jpg' },
  { name: 'STBEMU', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-stbemu-emulator-app-58559941-20251205181033.jpg' },
  { name: 'TIVIMATE', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-tivimate-iptv-playe-509ec03e-20251205181034.jpg' },
  { name: 'Xbox', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-xbox-gaming-console-f3a380fe-20251205181033.jpg' },
  { name: 'VLC PLAYER', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-vlc-media-player-si-b48a3277-20251205181033.jpg' },
  { name: 'XCIPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-xciptv-streaming-ap-654244d6-20251205181033.jpg' }
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
          <p className="text-white/30 text-sm mt-2">
            IPTV SMARTERS PRO • Abonnement iptv premium pour toutes les applications IPTV
          </p>
        </div>

        {/* Apps Grid - Hexagonal inspired */}
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
                <div className="relative w-14 h-14 mb-3">
                  <Image
                    src={app.icon}
                    alt={`${app.name} logo IPTV SMARTERS PRO`}
                    fill
                    sizes="56px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                
                {/* App Name */}
                <p className="text-white/70 text-xs font-bold uppercase tracking-wider text-center group-hover:text-white transition-colors mb-1">
                  {app.name}
                </p>
                
                {/* SEO Keywords */}
                <p className="text-white/20 text-[9px] text-center leading-tight">
                  IPTV SMARTERS PRO
                </p>
                <p className="text-white/20 text-[9px] text-center leading-tight">
                  Abonnement iptv
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
          <p className="text-white/20 text-xs">
            Abonnement iptv • IPTV SMARTERS PRO • Service IPTV Premium France
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppCompatibility;