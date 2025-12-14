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
  Check,
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Data & Assets ---

const HERO_MODES = [
  {
    id: 'cinema',
    bg: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
    title: "LE MEILLEUR DU CINÉMA",
    keywords: ["FILMS 4K HDR", "DERNIERS BLOCKBUSTERS", "VOD ILLIMITÉE"],
    color: "text-red-500",
    accent: "bg-red-600"
  },
  {
    id: 'football',
    bg: "https://images.unsplash.com/photo-1489944942854-e160ccf54634?q=80&w=2670&auto=format&fit=crop",
    title: "100% FOOTBALL & SPORT",
    keywords: ["LIGUE 1 & PREMIER LEAGUE", "CHAMPIONS LEAGUE", "FORMULE 1 & NBA"],
    color: "text-green-500",
    accent: "bg-green-600"
  },
  {
    id: 'series',
    bg: "https://images.unsplash.com/photo-1522869635100-1f4906a1cee9?q=80&w=2670&auto=format&fit=crop",
    title: "SÉRIES EN EXCLUSIVITÉ",
    keywords: ["NETFLIX & DISNEY+", "AMAZON PRIME VIDEO", "MISES À JOUR QUOTIDIENNES"],
    color: "text-blue-500",
    accent: "bg-blue-600"
  }
];

const FAQ_ITEMS = [
  {
    q: "Comment installer IPTV SMARTERS PRO ?",
    a: "L'installation est très simple. Une fois votre abonnement validé, vous recevrez nos tutoriels détaillés pour Smart TV, Android Box, Apple TV, PC et Smartphone. Notre support est aussi là pour vous aider en direct sur WhatsApp."
  },
  {
    q: "La qualité est-elle vraiment 4K ?",
    a: "Oui, nous diffusons les chaînes en qualité native (4K, FHD, HEVC). Il est recommandé d'avoir une connexion internet d'au moins 12 Mbps pour profiter de la 4K sans interruption."
  },
  {
    q: "Puis-je utiliser l'abonnement sur plusieurs écrans ?",
    a: "Nos abonnements standard sont pour 1 écran à la fois. Cependant, vous pouvez installer l'application sur autant d'appareils que vous voulez. Pour une utilisation simultanée, contactez le support pour une offre multi-écrans."
  },
  {
    q: "Y a-t-il une garantie de remboursement ?",
    a: "Absolument. Si vous n'êtes pas satisfait ou si le service ne fonctionne pas chez vous, nous vous remboursons intégralement dans les 30 jours suivant votre achat."
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

// --- Glitch Text Component ---
const GlitchText = ({ text, color = "text-white" }: { text: string, color?: string }) => {
  return (
    <div className="relative inline-block group">
      <span className={`relative z-10 ${color}`}>{text}</span>
      <span className={`absolute top-0 left-0 -z-10 w-full h-full ${color} opacity-50 animate-glitch-1`}>{text}</span>
      <span className={`absolute top-0 left-0 -z-10 w-full h-full ${color} opacity-50 animate-glitch-2`}>{text}</span>
    </div>
  );
};

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

const HeroSection = () => {
  const [currentMode, setCurrentMode] = useState(0);
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger(prev => prev + 1);
      setTimeout(() => {
        setCurrentMode((prev) => (prev + 1) % HERO_MODES.length);
      }, 200); // Small delay for glitch effect transition
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const mode = HERO_MODES[currentMode];

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={mode.bg}
            alt={mode.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Top Tag */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
             <div className={`w-2 h-2 rounded-full ${mode.accent} animate-pulse`} />
             <span className="text-sm font-bold tracking-[0.2em] text-white/80">IPTV SMARTERS PRO™</span>
          </div>
        </motion.div>

        {/* Glitch Title */}
        <div className="relative mb-6">
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
             <GlitchText key={glitchTrigger} text={mode.title} />
           </h1>
        </div>

        {/* Dynamic Keywords (Glitch Effect in place) */}
        <div className="h-12 md:h-16 mb-12 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-2xl md:text-4xl font-bold tracking-wide ${mode.color} uppercase flex gap-4`}
            >
              {mode.keywords.map((kw, i) => (
                <span key={i} className="flex items-center gap-4">
                   {i > 0 && <span className="text-white/20">•</span>}
                   {kw}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
           <button 
             onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
             className="group relative px-10 py-5 bg-white text-black font-black text-lg rounded-full overflow-hidden hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]"
           >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
             <span className="relative flex items-center gap-3">
               <Play size={20} fill="black" /> COMMENCER L'ESSAI
             </span>
           </button>

           <button 
             onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full font-bold text-lg text-white hover:bg-white/10 transition-colors flex items-center gap-3"
           >
             DÉCOUVRIR <ChevronDown size={20} />
           </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};

export default function LandingV2Content() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50" style={{ scaleX }} />
      
      {/* Global Glitch Styles */}
      <style jsx global>{`
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(15% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(55% 0 10% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 1px); }
        }
        .animate-glitch-1 {
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .bg-scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
          background-size: 100% 4px;
        }
      `}</style>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-40 transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <Play size={20} fill="black" className="text-black ml-1" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden md:block text-white">IPTV SMARTERS PRO</span>
           </div>
           
           <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Fonctionnalités</a>
              <a href="#channels" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Chaînes</a>
              <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tarifs</a>
              <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FAQ</a>
           </div>

           <button 
             onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
           >
             ESPACE MEMBRE
           </button>
        </div>
      </nav>

      {/* --- Hero --- */}
      <HeroSection />

      {/* --- Trustpilot Bar --- */}
      <div className="bg-[#fcfbf3] py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <Star size={32} fill="#00b67a" className="text-[#00b67a]" />
              <div className="flex flex-col">
                 <span className="font-black text-xl text-black leading-none">Trustpilot</span>
                 <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                       {[1,2,3,4,5].map(i => <div key={i} className="bg-[#00b67a] p-1"><Star size={12} fill="white" className="text-white"/></div>)}
                    </div>
                    <span className="text-sm font-bold text-gray-600">4.9/5 • Excellent</span>
                 </div>
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-8 overflow-hidden">
              <div className="flex gap-2 items-center text-black font-medium text-sm">
                 <CheckCircle size={16} className="text-black" />
                 <span>Plus de 5,000 clients satisfaits en France</span>
              </div>
              <div className="flex gap-2 items-center text-black font-medium text-sm">
                 <ShieldCheck size={16} className="text-black" />
                 <span>Paiement 100% Sécurisé</span>
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
                 La meilleure infrastructure IPTV en Europe. Stabilité garantie.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-blue-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 transition-transform">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Anti-Freeze 8.0</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Technologie propriétaire de mise en mémoire tampon prédictive. Zéro coupure, même pendant les finales de Coupe du Monde.
                  </p>
               </TiltCard>

               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-purple-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 text-purple-500 group-hover:scale-110 transition-transform">
                    <Monitor size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">4K Ultra HD</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Flux natifs en 4K HDR10+. Redécouvrez vos films et matchs avec une clarté cristalline. Compatible Dolby Vision.
                  </p>
               </TiltCard>

               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-green-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 text-green-500 group-hover:scale-110 transition-transform">
                    <Headphones size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Support France 24/7</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Une équipe d'experts basée en France disponible jour et nuit sur WhatsApp et Email pour vous aider en moins de 5 minutes.
                  </p>
               </TiltCard>
            </div>
         </div>
      </section>

      {/* --- Live Stream Preview --- */}
      <section className="py-20 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <div className="aspect-video w-full relative">
                 <Image 
                   src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2525&auto=format&fit=crop"
                   alt="Live Sports"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                 
                 {/* UI Overlay */}
                 <div className="absolute top-8 left-8 flex items-center gap-4">
                    <div className="bg-red-600 text-white px-4 py-1.5 rounded font-bold text-sm animate-pulse flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span> EN DIRECT
                    </div>
                    <div className="text-white font-bold drop-shadow-md text-xl">CANAL+ FOOT</div>
                 </div>

                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                    <div className="flex items-center justify-between text-white mb-4">
                       <div>
                          <h4 className="text-2xl font-bold">Paris SG vs Olympique de Marseille</h4>
                          <p className="text-gray-300">Ligue 1 Uber Eats • J25</p>
                       </div>
                       <div className="text-right hidden md:block">
                          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded text-sm font-mono">BITRATE: 18.5 MBPS</div>
                          <div className="text-green-400 text-sm mt-1 font-mono">SIGNAL: EXCELLENT</div>
                       </div>
                    </div>
                    <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 w-[98%]" />
                    </div>
                 </div>

                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                       <Play size={30} fill="white" className="ml-1" />
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
               <h2 className="text-6xl font-black tracking-tighter mb-8 text-white">NOS OFFRES PREMIUM</h2>
               <p className="text-gray-400 text-lg">Rejoignez l'élite IPTV dès aujourd'hui.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
               {PRICING_PREMIUM.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative rounded-3xl p-[1px] ${plan.popular ? 'bg-gradient-to-b from-white to-gray-400 scale-105 z-10 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                     <div className="bg-[#080808] rounded-[23px] p-8 h-full flex flex-col relative overflow-hidden">
                        {plan.popular && (
                           <div className="absolute -right-12 top-8 bg-white text-black font-black text-xs px-12 py-1 rotate-45 shadow-lg">
                             POPULAIRE
                           </div>
                        )}
                        
                        <div className="text-center mb-8">
                           <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                           <p className={`text-xs font-bold tracking-widest uppercase opacity-70`}>{plan.subtitle}</p>
                        </div>

                        <div className="text-center mb-8">
                           <span className="text-6xl font-black tracking-tighter text-white">{plan.price}€</span>
                           <span className="text-lg text-gray-500 font-bold block">/ période</span>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                               <Check size={16} className={`text-white mt-0.5 min-w-[16px]`} />
                               <span className="text-left">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <button 
                          onClick={() => router.push(plan.href)}
                          className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:scale-[1.02] ${plan.popular ? 'bg-white text-black shadow-lg hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          Commander
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">Questions Fréquentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-lg">{item.q}</span>
                    <ChevronDown className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 px-6 border-t border-white/10 bg-black">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                   <Play size={20} fill="black" />
                 </div>
                 <span className="font-bold text-xl">IPTV SMARTERS PRO</span>
               </div>
               <p className="text-gray-500 text-sm max-w-xs">
                 Le leader français de l'IPTV Premium. Qualité 4K, Anti-Freeze et Support 24/7.
               </p>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-400">
               <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
               <a href="#" className="hover:text-white transition-colors">Conditions</a>
               <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex gap-4 items-center">
               <div className="text-xs text-gray-600 font-bold uppercase tracking-wider">Paiement Sécurisé</div>
               <div className="flex gap-2 opacity-50">
                  <div className="w-8 h-5 bg-gray-700 rounded"></div>
                  <div className="w-8 h-5 bg-gray-700 rounded"></div>
                  <div className="w-8 h-5 bg-gray-700 rounded"></div>
               </div>
            </div>
         </div>
         <div className="text-center text-gray-800 text-xs mt-12">
            © 2025 IPTV SMARTERS PRO. Tous droits réservés.
         </div>
      </footer>
    </div>
  );
}