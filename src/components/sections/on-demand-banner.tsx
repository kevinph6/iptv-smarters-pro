import { Sparkles, MessageCircle, Star } from 'lucide-react';

const OnDemandBanner = () => {
  return (
    <section className="relative bg-black py-8 overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative">
          {/* Glow effect - hidden on mobile */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
          
          <div className="relative bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-10">
            {/* Corner decorations - hidden on mobile */}
            <div className="hidden sm:block absolute top-4 left-4">
              <Star className="w-5 h-5 text-cyan-400/30" />
            </div>
            <div className="hidden sm:block absolute top-4 right-4">
              <Sparkles className="w-5 h-5 text-purple-400/30" />
            </div>
            <div className="hidden sm:block absolute bottom-4 left-4">
              <Sparkles className="w-5 h-5 text-pink-400/30" />
            </div>
            <div className="hidden sm:block absolute bottom-4 right-4">
              <Star className="w-5 h-5 text-cyan-400/30" />
            </div>
            
            <div className="text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">À la demande</span>
              </div>
              
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Vous souhaitez une chaîne ou un film en particulier pour votre <span className="text-white font-semibold">abonnement IPTV</span> ? 
                <span className="text-white font-semibold"> Contactez-nous</span>, nous l'ajoutons à votre <span className="text-cyan-400 font-bold">abonnement SMARTERS PRO</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bold"> gratuitement sous 24h</span> !
              </p>

              {/* TEMPORARILY HIDDEN — WhatsApp button */}
              <a
                href="https://wa.me/212628461599"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Demander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section header for pricing - hidden on mobile where pricing appears before this banner */}
      <div className="hidden lg:block container mx-auto px-6 max-w-6xl mt-16 text-center">
        <span className="inline-block text-cyan-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">Tarification Simple</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">abonnement</span>
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Des plans flexibles adaptés à vos besoins avec un accès illimité à tout notre contenu
        </p>
      </div>
    </section>
  );
};

export default OnDemandBanner;