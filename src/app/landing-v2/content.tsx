'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Monitor, 
  Smartphone, 
  Tv, 
  Cast, 
  CheckCircle, 
  Star, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Award,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Film,
  Wifi
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Assets & Data ---
const CHANNELS = [
  { name: "TF1", color: "bg-blue-600" },
  { name: "M6", color: "bg-red-600" },
  { name: "Canal+", color: "bg-black" },
  { name: "BeIN", color: "bg-purple-700" },
  { name: "RMC", color: "bg-orange-600" },
  { name: "Netflix", color: "bg-red-700" },
  { name: "Prime", color: "bg-blue-400" },
  { name: "Disney+", color: "bg-blue-900" },
];

const PRICING = [
  {
    id: '12-mois',
    title: 'PASS PREMIUM 12 MOIS',
    price: '49.99€',
    period: '/an',
    save: 'Économisez 70%',
    features: [
      'Accès 160,000+ Chaînes & VOD',
      'Qualité 4K / FHD / HD / SD',
      'Compatible Tous Appareils',
      'Sans Coupure (Anti-Freeze)',
      'Support Prioritaire 24/7',
      'Activation Immédiate',
      'Garantie Satisfait ou Remboursé'
    ],
    popular: true,
    accent: 'from-amber-400 to-yellow-600'
  },
  {
    id: '6-mois',
    title: 'PASS DÉCOUVERTE 6 MOIS',
    price: '29.99€',
    period: '/6 mois',
    save: '',
    features: [
      'Accès 160,000+ Chaînes & VOD',
      'Qualité 4K / FHD / HD',
      'Compatible Tous Appareils',
      'Sans Coupure',
      'Support Standard',
      'Activation Rapide'
    ],
    popular: false,
    accent: 'from-blue-400 to-blue-600'
  }
];

const REVIEWS = [
  { name: "Thomas D.", loc: "Paris", text: "Franchement bluffé. La qualité 4K est réelle, pas de coupure pendant les matchs. Le service client a répondu en 2 min un dimanche.", rating: 5 },
  { name: "Sarah L.", loc: "Lyon", text: "Je ne regarde plus que ça. L'interface est fluide, toutes les séries Netflix et Prime sont là. Meilleur investissement de l'année.", rating: 5 },
  { name: "Karim B.", loc: "Marseille", text: "Installation super simple sur ma Samsung TV. Ça marche nickel, merci pour l'activation rapide.", rating: 5 },
];

// --- Components ---

const GlowingButton = ({ children, primary = false, className = "", onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative px-8 py-4 rounded-full font-bold text-lg tracking-wide overflow-hidden group ${className} ${primary ? 'text-white' : 'text-white border border-white/20'}`}
  >
    {primary && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x" />
    )}
    {!primary && (
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
    )}
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse-slow" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse-slow delay-1000" />
    <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[100px] animate-pulse-slow delay-2000" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
  </div>
);

export default function LandingV2Content() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // Parallax Text
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Play className="text-white fill-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              IPTV SMARTERS PRO
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#channels" className="hover:text-white transition-colors">Chaînes</a>
            <a href="#reviews" className="hover:text-white transition-colors">Avis</a>
            <a href="#faq" className="hover:text-white transition-colors">Aide</a>
            <GlowingButton primary className="!py-2 !px-6 !text-sm" onClick={scrollToPricing}>
              S'abonner
            </GlowingButton>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#features" onClick={() => setIsMenuOpen(false)}>Fonctionnalités</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Tarifs</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Avis</a>
              <button onClick={() => { setIsMenuOpen(false); scrollToPricing(); }} className="text-blue-500">
                Commencer Maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-10" />
        
        {/* Animated Background Video Simulation */}
        <div className="absolute inset-0 opacity-30">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593784991095-a20506948430?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-zoom-slow" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div style={{ y: yText, opacity: opacityText }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">N°1 en France • 50,000+ Clients Actifs</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
              LE FUTUR DE LA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                TÉLÉVISION EST ICI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Accédez à <span className="text-white font-bold">160,000+</span> chaînes et films en 4K Ultra HD. 
              Sans coupure. Sans engagement. L'excellence à la française.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <GlowingButton primary onClick={scrollToPricing}>
                <Play size={20} className="fill-white" />
                COMMENCER L'ESSAI
              </GlowingButton>
              <GlowingButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                DÉCOUVRIR L'OFFRE
              </GlowingButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gray-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="relative z-20 bg-black/50 border-y border-white/5 backdrop-blur-sm py-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {[...CHANNELS, ...CHANNELS, ...CHANNELS].map((channel, i) => (
            <div key={i} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
              <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center text-xs font-bold`}>
                {channel.name}
              </div>
              <span className="text-xl font-bold tracking-widest">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid (Bento) */}
      <section id="features" className="relative z-20 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pourquoi Choisir <span className="text-blue-500">L'Excellence ?</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Une technologie de pointe développée pour les passionnés de divertissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 min-h-[400px] rounded-3xl p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 text-blue-500">
                  <Monitor size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Multi-Écrans 4K HDR</h3>
                <p className="text-gray-400 text-lg max-w-md">
                  Profitez d'une qualité d'image cristalline sur tous vos appareils. Smart TV, Smartphone, Tablette, PC.
                  Compatible avec toutes les applications IPTV majeures.
                </p>
              </div>
              {/* Graphic Element */}
              <div className="absolute right-[-50px] bottom-[-50px] md:right-0 md:bottom-0 opacity-50">
                 <div className="w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600" 
                alt="4K TV" 
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover mask-image-gradient opacity-60 group-hover:scale-105 transition-transform duration-700 hidden md:block"
                style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
              />
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 bg-gray-900/50 border border-white/10 backdrop-blur-sm flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-6 text-purple-500">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Zapping Instantané</h3>
                <p className="text-gray-400">
                  Technologie Anti-Freeze 3.0. Fini les chargements interminables. Changez de chaîne en moins de 0.5 seconde.
                </p>
              </div>
              <div className="mt-8 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                />
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 bg-gray-900/50 border border-white/10 backdrop-blur-sm group"
            >
               <div className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center mb-6 text-green-500">
                  <Film size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">VOD Illimitée</h3>
                <p className="text-gray-400 mb-6">
                  +20,000 Films et Séries. Netflix, Prime Video, Disney+, Canal+ Séries inclus dans votre abonnement.
                </p>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-700 flex items-center justify-center text-xs text-white">
                    +20k
                  </div>
                </div>
            </motion.div>

            {/* Feature 4 - Large */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center mb-6 text-red-500">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Serveurs Français Sécurisés</h3>
                    <p className="text-gray-400 text-lg">
                      Infrastructure hébergée en Europe pour une latence minimale. Vos données sont protégées et votre connexion est anonymisée.
                    </p>
                 </div>
                 <div className="flex-1 relative h-48 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1558494949-efc02570fbc9?auto=format&fit=crop&q=80&w=600" 
                      alt="Servers" 
                      className="w-full h-full object-cover rounded-xl opacity-60"
                    />
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-mono text-green-500">SYSTEM: ONLINE</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - The Converter */}
      <section id="pricing" className="relative z-20 py-32 px-6 bg-black/50 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Tarification Simple</span>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Commencez l'Expérience</h2>
            <p className="text-gray-400 text-xl">Choisissez le pass qui vous correspond. Activation immédiate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -10 }}
                className={`relative p-1 rounded-3xl ${plan.popular ? 'bg-gradient-to-b ' + plan.accent : 'bg-gray-800'}`}
              >
                <div className="bg-[#0a0a0a] rounded-[22px] p-8 h-full flex flex-col relative overflow-hidden">
                  {plan.popular && (
                    <div className="absolute top-6 right-6 px-4 py-1 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-xs rounded-full uppercase tracking-wider">
                      Meilleure Vente
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-gray-200 mb-2">{plan.title}</h3>
                  <div className="flex items-end gap-2 mb-2">
                    <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${plan.popular ? 'from-white to-gray-400' : 'from-gray-400 to-gray-600'}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 mb-2 font-medium">{plan.period}</span>
                  </div>
                  {plan.save && <span className="text-green-500 font-bold text-sm mb-8">{plan.save}</span>}
                  
                  <div className="flex-1 space-y-4 mb-10">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 min-w-[20px] h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-amber-500/20 text-amber-500' : 'bg-gray-700 text-gray-400'}`}>
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <GlowingButton 
                    primary={plan.popular} 
                    className="w-full justify-center"
                    onClick={() => router.push('/payment?plan=' + plan.id)}
                  >
                    COMMANDER MAINTENANT
                    <ArrowRight size={18} />
                  </GlowingButton>
                  
                  <p className="text-center text-gray-600 text-xs mt-4">Paiement 100% Sécurisé via Stripe</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <ShieldCheck size={18} />
              Garantie 30 Jours Satisfait ou Remboursé
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Reviews */}
      <section id="reviews" className="relative z-20 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Ils nous font confiance</h2>
              <div className="space-y-6">
                {REVIEWS.map((review, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex gap-1 text-yellow-500 mb-2">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-300 italic mb-4">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.loc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10">
                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                   <Globe className="text-blue-500" />
                   Couverture Mondiale
                 </h3>
                 <p className="text-gray-400 mb-8">
                   Nos serveurs sont répartis stratégiquement pour garantir la meilleure stabilité où que vous soyez.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                   {['France', 'Belgique', 'Suisse', 'Canada', 'Espagne', 'USA'].map((country) => (
                     <div key={country} className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-mono text-sm">{country}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Play className="text-white fill-white" size={16} />
               </div>
               <span className="text-lg font-bold text-white">IPTV SMARTERS PRO</span>
            </div>
            <p className="max-w-xs mb-6">
              Le leader français de la télévision IP. Qualité premium, support local, et technologie de pointe.
            </p>
            <div className="flex gap-4">
               <span className="px-3 py-1 rounded border border-white/10">SSL Sécurisé</span>
               <span className="px-3 py-1 rounded border border-white/10">Stripe</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Abonnements</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Chaînes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutoriels</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs">
          © 2025 IPTV SMARTERS PRO. Tous droits réservés.
        </div>
      </footer>
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes zoom-slow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-zoom-slow {
          animation: zoom-slow 20s infinite alternate ease-in-out;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
