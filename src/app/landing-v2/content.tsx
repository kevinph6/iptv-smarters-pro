'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
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
  Wifi,
  Cpu,
  Server,
  Lock,
  MessageCircle,
  HelpCircle,
  Layers,
  Crown,
  Gift,
  Rocket,
  TrendingUp,
  Users,
  Wallet,
  Shield,
  Activity,
  Download,
  Headphones,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Data & Assets ---

const HERO_SLIDES = [
  {
    id: 'cinema',
    title: "CINÉMA ILLIMITÉ",
    subtitle: "Derniers Blockbusters en 4K HDR",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    accent: "from-red-600 to-orange-600",
    color: "text-red-500"
  },
  {
    id: 'football',
    title: "LE MEILLEUR DU FOOT",
    subtitle: "Ligue 1 • Champions League • Premier League",
    image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2525&auto=format&fit=crop",
    accent: "from-green-600 to-emerald-600",
    color: "text-green-500"
  },
  {
    id: 'series',
    title: "SÉRIES EXCLUSIVES",
    subtitle: "Netflix • Disney+ • Amazon Prime • Apple TV+",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=3456&auto=format&fit=crop",
    accent: "from-blue-600 to-purple-600",
    color: "text-blue-500"
  }
];

const REVIEWS = [
  { name: "Thomas L.", location: "Paris", text: "J'ai testé 5 fournisseurs IPTV, c'est le seul qui tient la route pendant les gros matchs de LDC. Pas une seule coupure.", rating: 5, verified: true },
  { name: "Sarah M.", location: "Lyon", text: "La qualité 4K est bluffante sur ma TV OLED. Le catalogue de films est mis à jour tous les jours, c'est impressionnant.", rating: 5, verified: true },
  { name: "Karim B.", location: "Marseille", text: "Support client au top sur WhatsApp. Ils m'ont aidé à configurer mon boîtier en 5 minutes. Je recommande !", rating: 5, verified: true },
  { name: "Julien R.", location: "Bordeaux", text: "Enfin un service stable ! L'anti-freeze fonctionne vraiment. Je ne changerai plus.", rating: 5, verified: true },
];

const PRICING_PREMIUM = [
  {
    id: 'prm-3-mois',
    title: '3 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '27',
    cents: '00',
    href: '/payment?plan=prm-3-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0 (IA)', 'Serveurs France Prioritaires', 'Replay 7 Jours'],
    color: 'emerald',
    popular: false
  },
  {
    id: 'prm-12-mois',
    title: '12 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '69',
    cents: '00',
    href: '/payment?plan=prm-12-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0 (IA)', 'Serveurs France Prioritaires', 'Replay 7 Jours', 'Support VIP WhatsApp'],
    bonus: '+2 MOIS OFFERTS',
    color: 'amber',
    popular: true
  },
  {
    id: 'prm-24-mois',
    title: '24 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '100',
    cents: '00',
    href: '/payment?plan=prm-24-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0 (IA)', 'Serveurs France Prioritaires', 'Replay 7 Jours', 'Support VIP WhatsApp'],
    bonus: '+4 MOIS OFFERTS',
    color: 'rose',
    popular: false
  }
];

const CHANNELS = [
  "CANAL+", "BEIN SPORTS", "RMC SPORT", "NETFLIX", "DISNEY+", "PRIME VIDEO", "HBO", "APPLE TV+", "EUROSPORT", "TF1 4K", "M6 4K"
];

// --- Components ---

const TrustPilotStars = () => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center">
        <Star size={16} fill="white" className="text-white" />
      </div>
    ))}
  </div>
);

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>
      
      {/* Dynamic Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4 pt-20">
        <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-6 ${slide.color}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-white">IPTV SMARTERS PRO</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 drop-shadow-2xl">
             <span className="block text-white mix-blend-overlay opacity-50 absolute inset-0 blur-2xl transform translate-y-4">{slide.title}</span>
             <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
               {slide.title}
             </span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-light text-gray-200 tracking-wide mb-10 max-w-3xl mx-auto drop-shadow-lg">
            {slide.subtitle}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <button 
               onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
               className={`px-10 py-5 rounded-full font-bold text-lg bg-white text-black hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] flex items-center gap-3`}
             >
               <Play size={20} fill="black" /> COMMENCER MAINTENANT
             </button>
             <button 
               onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-5 rounded-full font-bold text-lg border border-white/30 bg-black/30 backdrop-blur-md hover:bg-white/10 transition-colors flex items-center gap-3"
             >
               DÉCOUVRIR <ArrowRight size={20} />
             </button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((s, i) => (
          <div 
            key={s.id} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-white' : 'w-4 bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default function LandingV2Content() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 origin-left z-50" style={{ scaleX }} />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-40 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Play size={20} fill="white" className="text-white ml-1" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden md:block">IPTV SMARTERS PRO</span>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1 text-green-400 font-bold text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SERVEURS FRANCE : 100% STABLE
              </div>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform"
              >
                S'ABONNER
              </button>
           </div>
        </div>
      </nav>

      {/* --- Hero Section with Carousel --- */}
      <section className="relative h-screen w-full bg-black">
        <HeroSlider />
      </section>

      {/* --- Trustpilot Bar --- */}
      <div className="relative z-20 bg-[#1c1c1c] border-y border-white/5 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-2xl font-black tracking-tight">Excellent</h3>
                <TrustPilotStars />
                <p className="text-xs text-gray-400 mt-1">Basé sur <span className="underline">1,250+ avis</span></p>
              </div>
              <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle size={16} className="text-green-500" /> Vendeur Vérifié
              </div>
           </div>
           
           {/* Marquee Reviews */}
           <div className="flex-1 overflow-hidden relative mask-linear-fade">
              <div className="flex animate-marquee gap-8 items-center">
                 {REVIEWS.map((review, i) => (
                   <div key={i} className="flex-shrink-0 w-80 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => <div key={j} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center"><Star size={10} fill="white" className="text-white"/></div>)}
                        </div>
                        <span className="text-xs text-gray-400">{review.date || "Il y a 2 jours"}</span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2">"{review.text}"</p>
                      <p className="text-xs font-bold text-gray-500 mt-2">{review.name}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* --- Why Choose Us (3D Tilt) --- */}
      <section id="features" className="py-32 px-6 relative z-10 bg-black">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">L'Expérience Ultime</span>
               <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">POURQUOI NOUS CHOISIR ?</h2>
               <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                 Nous ne sommes pas un simple revendeur. Nous sommes un fournisseur direct avec notre propre infrastructure.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <TiltCard className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 text-blue-500">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Anti-Freeze 8.0</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Notre technologie exclusive analyse le réseau en temps réel pour prévenir les coupures avant qu'elles n'arrivent. Idéal pour les matchs en direct.
                  </p>
               </TiltCard>

               <TiltCard className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 relative">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-6 text-purple-500">
                    <Monitor size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">4K Ultra HD Réelle</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Profitez d'une qualité d'image native en 3840x2160 pixels. HDR10+ et Dolby Atmos supportés pour une immersion cinéma à la maison.
                  </p>
               </TiltCard>

               <TiltCard className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 relative">
                  <div className="w-16 h-16 rounded-2xl bg-green-600/20 flex items-center justify-center mb-6 text-green-500">
                    <Headphones size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Support 24/7 Français</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Une équipe dédiée basée en France vous assiste jour et nuit. Installation guidée par appel vidéo ou WhatsApp si besoin.
                  </p>
               </TiltCard>
            </div>
         </div>
      </section>

      {/* --- Live Stream Preview --- */}
      <section className="py-20 bg-gradient-to-b from-black to-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <div className="aspect-video w-full relative">
                 <Image 
                   src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop"
                   alt="Soccer Match"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/40" />
                 
                 {/* UI Overlay */}
                 <div className="absolute top-8 left-8 flex items-center gap-4">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold text-xs animate-pulse">EN DIRECT</div>
                    <div className="text-white font-bold drop-shadow-md">PSG vs OM</div>
                 </div>

                 <div className="absolute bottom-8 left-8 right-8">
                    <div className="h-1 bg-white/30 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-red-600 w-[85%]" />
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                       <span>85:02</span>
                       <span>4K HDR • 50 FPS • 18 Mbps</span>
                    </div>
                 </div>

                 {/* Play Button Center */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/30 transition-all group-hover:scale-110">
                       <Play size={40} fill="white" className="ml-2" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-32 px-6 relative bg-black">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="text-6xl font-black tracking-tighter mb-8">NOS OFFRES PREMIUM</h2>
               <p className="text-gray-400 text-lg">Rejoignez l'élite. Satisfait ou remboursé sous 30 jours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
               {PRICING_PREMIUM.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative rounded-3xl p-[1px] ${plan.popular ? 'bg-gradient-to-b from-amber-400 to-orange-600 scale-110 z-10 shadow-[0_0_50px_rgba(245,158,11,0.3)]' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                     <div className="bg-[#080808] rounded-[23px] p-8 h-full flex flex-col">
                        {plan.popular && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            Best Seller
                          </div>
                        )}
                        
                        <div className="text-center mb-8">
                           <h3 className="text-3xl font-black italic mb-2">{plan.title}</h3>
                           <p className={`text-sm font-bold tracking-widest uppercase text-${plan.color}-500`}>{plan.subtitle}</p>
                        </div>

                        <div className="text-center mb-8 relative">
                           <span className="text-2xl font-bold text-gray-500 align-top">€</span>
                           <span className="text-7xl font-black tracking-tighter text-white">{plan.price}</span>
                           <span className="text-lg font-bold text-gray-500">.{plan.cents}</span>
                           {(plan as any).bonus && (
                             <div className="mt-2 text-amber-500 font-bold text-sm animate-pulse">{(plan as any).bonus}</div>
                           )}
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                               <div className={`p-1 rounded-full bg-${plan.color}-500/10`}>
                                 <Check size={14} className={`text-${plan.color}-500`} />
                               </div>
                               {feat}
                            </li>
                          ))}
                        </ul>

                        <button 
                          onClick={() => router.push(plan.href)}
                          className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:scale-[1.02] ${plan.popular ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          Choisir ce pack
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 px-6 border-t border-white/10 bg-[#050505]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Play size={20} fill="white" />
               </div>
               <span className="font-bold text-xl">IPTV SMARTERS PRO</span>
            </div>
            <div className="text-gray-500 text-sm">
               © 2025 IPTV Smarters Pro. Tous droits réservés.
            </div>
            <div className="flex gap-4">
               <Image src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" width={80} height={30} className="opacity-50 grayscale hover:grayscale-0 transition-all" />
            </div>
         </div>
      </footer>

      <style jsx global>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
