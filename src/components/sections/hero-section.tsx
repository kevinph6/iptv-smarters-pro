import { ArrowRight, Play, Globe, Clock, Headphones } from 'lucide-react';
import DiscountBanner from './discount-banner';

const HeroSection = () => {
  return (
    <section className="relative lg:min-h-screen overflow-hidden bg-black pt-20">
      {/* Mesh Gradient Background - pure CSS, no JS cost */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl pt-10 sm:pt-16 pb-10 sm:pb-20">
        {/* Badge */}
        <div className="flex justify-center mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse delay-100" />
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse delay-200" />
            </div>
            <span className="text-xs sm:text-sm text-white/90 font-semibold">N°1 en France<span className="hidden sm:inline"> • +50,000 clients satisfaits</span> • IPTV SMARTERS PRO</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5 sm:mb-8 font-sans">
            <span className="block">IPTV Smarters Pro</span>
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Meilleur Abonnement IPTV France
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

          {/* Short mobile paragraph */}
          <p className="sm:hidden text-base text-white/60 leading-relaxed max-w-md mx-auto mb-6">
            Regardez toutes les chaînes françaises en 4K. Fonctionne sur tous vos appareils.
          </p>
          {/* Full desktop paragraph */}
          <p className="hidden sm:block text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-10">
            Accédez à plus de <span className="text-cyan-400 font-semibold">160,000 chaînes IPTV</span> mondiales en 4K avec notre <span className="text-purple-400 font-semibold">abonnement IPTV premium</span>, 
            des milliers de films et séries VOD. Installation de votre <span className="text-pink-400 font-semibold">abonnement SMARTERS PRO</span> instantanée sur tous vos appareils.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 lg:mb-16">
            <a
              href="#pricing"
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-bold text-base sm:text-lg text-white">Commencer maintenant</span>
              <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#comparison"
              className="hidden sm:inline-flex group items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-cyan-500/30 transition-all">

              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Play className="w-5 h-5 fill-white" />
              </div>
              Voir la démo
            </a>
          </div>
        </div>

        {/* Stats Cards - hidden on mobile to reduce visual overload */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
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
              </div>
            </div>
          )}
        </div>

        {/* Hero Banner with Discount */}
        <DiscountBanner />
      </div>
    </section>
  );
};

export default HeroSection;
