"use client";

import { Check, MessageCircle, ArrowUpRight, Users, Wallet, Shield } from 'lucide-react';

const features = [
  { icon: Users, text: "Panneau utilisateur facile et utile" },
  { icon: Shield, text: "Serveurs très stables" },
  { icon: Wallet, text: "Les crédits n'expirent jamais" },
  { icon: ArrowUpRight, text: "Assistance à la clientèle 24/7" },
];

const ResellerSection = () => {
  return (
    <section id="revendeur" className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-[32px] blur-2xl" />
          
          <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-[28px] border border-white/10 p-10 md:p-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-8">
              <ArrowUpRight className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Opportunité Business</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Devenez revendeur de l{`'`}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">IPTV SMARTERS PRO</span>
              {" "}et commencez à gagner de l{`'`}argent dès aujourd{`'`}hui.
            </h2>

            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
              Une fois que vous avez enregistré un compte revendeur chez nous, vous avez accès à votre propre panneau revendeur IPTV SMARTERS PRO qui vous permet de gérer vos comptes. L{`'`}ensemble de votre flux de travail peut être automatisé, ce qui signifie que vous n{`'`}avez pas besoin de ressources supplémentaires pour tout gérer.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <Icon className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">{feature.text}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/212628461599"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-105">
                <MessageCircle className="w-6 h-6" />
                <span>Contactez-nous par WhatsApp</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResellerSection;