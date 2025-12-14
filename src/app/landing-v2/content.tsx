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
  Plus,
  Tv as TvIcon,
  Apple,
  Chrome
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Data & Assets ---

const HERO_MODES = [
  {
    id: 'smarters',
    bg: "https://images.unsplash.com/photo-1593784991095-a20506948430?q=80&w=2648&auto=format&fit=crop", // Modern dark setup
    title: "IPTV SMARTERS PRO",
    subtitle: "LE LECTEUR N°1 MONDIAL",
    keywords: ["INTERFACE PREMIUM", "MULTI-ÉCRANS", "GUIDE TV (EPG)"],
    color: "text-purple-500",
    accent: "bg-purple-600"
  },
  {
    id: 'france',
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop", // Paris/France vibe or just premium
    title: "ABONNEMENT IPTV FRANCE",
    subtitle: "CHAÎNES FRANÇAISES & LOCALES",
    keywords: ["CANAL+ & BEIN", "AMAZON LIGUE 1", "RMC SPORT"],
    color: "text-blue-500",
    accent: "bg-blue-600"
  },
  {
    id: '4k',
    bg: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2669&auto=format&fit=crop", // Cinema/Netflix
    title: "ABONNEMENT IPTV 4K",
    subtitle: "QUALITÉ D'IMAGE CINÉMA",
    keywords: ["4K HDR10+", "DOLBY ATMOS", "FILMS & SÉRIES"],
    color: "text-red-500",
    accent: "bg-red-600"
  },
  {
    id: 'fiable',
    bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // Tech/Server
    title: "IPTV SMARTERS PRO FIABLE",
    subtitle: "STABILITÉ INÉGALÉE",
    keywords: ["ANTI-FREEZE 8.0", "UPTIME 99.9%", "SERVEURS DÉDIÉS"],
    color: "text-emerald-500",
    accent: "bg-emerald-600"
  }
];

const DEVICES = [
  { name: 'Smart TV', icon: TvIcon, desc: 'Samsung, LG, Sony, Android TV' },
  { name: 'Box Android', icon: BoxIcon, desc: 'Nvidia Shield, Xiaomi Mi Box' },
  { name: 'Apple', icon: Apple, desc: 'Apple TV, iPhone, iPad, Mac' },
  { name: 'Smartphone', icon: Smartphone, desc: 'Android & iOS' },
  { name: 'PC / Mac', icon: Monitor, desc: 'VLC, Smarters Player' },
  { name: 'Fire Stick', icon: Chrome, desc: 'Amazon Fire TV Stick' },
];

function BoxIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}

const STEPS = [
  { num: '01', title: 'Choisissez votre offre', desc: 'Sélectionnez le forfait adapté à vos besoins parmi nos offres premium.' },
  { num: '02', title: 'Recevez vos accès', desc: 'Vos identifiants vous sont envoyés instantanément par email et WhatsApp.' },
  { num: '03', title: 'Profitez !', desc: 'Connectez-vous sur IPTV Smarters Pro et profitez de vos contenus.' },
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
  { name: "Thomas L.", location: "Paris", text: "J'ai testé 5 fournisseurs IPTV, c'est le seul qui tient la route pendant les gros matchs de LDC. Pas une seule coupure.", rating: 5, verified: true, date: "Il y a 2 jours" },
  { name: "Sarah M.", location: "Lyon", text: "La qualité 4K est bluffante sur ma TV OLED. Le catalogue de films est mis à jour tous les jours, c'est impressionnant.", rating: 5, verified: true, date: "Il y a 5 jours" },
  { name: "Karim B.", location: "Marseille", text: "Support client au top sur WhatsApp. Ils m'ont aidé à configurer mon boîtier en 5 minutes. Je recommande !", rating: 5, verified: true, date: "Il y a 1 semaine" },
  { name: "Julien R.", location: "Bordeaux", text: "Enfin un service stable ! L'anti-freeze fonctionne vraiment. Je ne changerai plus.", rating: 5, verified: true, date: "Il y a 2 semaines" },
];

const PRICING_PREMIUM = [
  {
    id: 'prm-3-mois',
    title: '3 MOIS',
    subtitle: 'DÉCOUVERTE',
    price: '27',
    cents: '00',
    href: '/payment?plan=prm-3-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0', 'Replay 48h', 'Support Standard'],
    color: 'emerald',
    popular: false
  },
  {
    id: 'prm-12-mois',
    title: '12 MOIS',
    subtitle: 'OFFRE POPULAIRE',
    price: '69',
    cents: '00',
    href: '/payment?plan=prm-12-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0 (IA)', 'Serveurs Prioritaires', 'Replay 7 Jours', 'Support VIP WhatsApp'],
    bonus: 'TOP VENTE',
    color: 'amber',
    popular: true
  },
  {
    id: 'prm-24-mois',
    title: 'A VIE (2 ANS)',
    subtitle: 'TRANQUILLITÉ TOTALE',
    price: '100',
    cents: '00',
    href: '/payment?plan=prm-24-mois',
    features: ['+160 000 Chaînes & VOD', 'Qualité 4K / Ultra HD', 'Anti-Freeze 8.0 (IA)', 'Serveurs Dédiés', 'Replay 7 Jours', 'Support VIP Prioritaire'],
    bonus: 'MEILLEUR RAPPORT PRIX',
    color: 'rose',
    popular: false
  }
];

const CHANNELS = [
  "CANAL+", "BEIN SPORTS", "RMC SPORT", "NETFLIX", "DISNEY+", "PRIME VIDEO", "HBO", "APPLE TV+", "EUROSPORT", "TF1 4K", "M6 4K"
];

// --- Glitch Text Component ---
const GlitchText = ({ text, color = "text-white", className = "" }: { text: string, color?: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
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
      }, 200);
    }, 3500); // Faster transition for "TV channel switching" feel
    return () => clearInterval(interval);
  }, []);

  const mode = HERO_MODES[currentMode];

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Background Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, scale: 1.2, filter: 'brightness(0.2)' }}
          animate={{ opacity: 1, scale: 1, filter: 'brightness(0.5)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={mode.bg}
            alt={mode.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center mt-[-50px]">
        
        {/* Live Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-red-500 font-mono text-sm tracking-widest uppercase font-bold">LIVE SIGNAL</span>
        </motion.div>

        {/* Glitch Title */}
        <div className="relative mb-4 w-full h-[120px] md:h-[180px] flex items-center justify-center overflow-visible">
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl mx-auto leading-none">
             <GlitchText key={glitchTrigger} text={mode.title} className="uppercase" />
           </h1>
        </div>

        {/* Subtitle / Description */}
        <motion.div
            key={`sub-${currentMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-xl md:text-3xl font-bold tracking-widest uppercase mb-12 ${mode.color}`}
        >
            {mode.subtitle}
        </motion.div>

        {/* Dynamic Keywords */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12">
          <AnimatePresence mode="wait">
            {mode.keywords.map((kw, i) => (
               <motion.div
                 key={`${mode.id}-${i}`}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 * i }}
                 className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3"
               >
                 <CheckCircle size={16} className={mode.color} />
                 <span className="text-sm md:text-base font-bold text-white">{kw}</span>
               </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
           <button 
             onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full md:w-auto px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.6)] flex items-center justify-center gap-3 group"
           >
             <Play size={24} fill="black" className="group-hover:text-red-600 transition-colors" />
             COMMANDER MAINTENANT
           </button>

           <button 
             onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full md:w-auto px-12 py-6 border border-white/20 bg-black/40 backdrop-blur-xl rounded-full font-bold text-xl text-white hover:bg-white/10 transition-colors"
           >
             EN SAVOIR PLUS
           </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const DevicesSection = () => {
    return (
        <section className="py-20 bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">COMPATIBLE AVEC TOUS VOS ÉCRANS</h2>
                    <p className="text-gray-400">Installez votre abonnement sur tous vos appareils préférés.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {DEVICES.map((device, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <device.icon size={32} className="text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-1">{device.name}</h3>
                            <p className="text-xs text-gray-500 text-center">{device.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StepsSection = () => {
    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {STEPS.map((step, i) => (
                        <div key={i} className="relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                            <div className="absolute -top-6 -left-6 text-8xl font-black text-white/5 select-none">{step.num}</div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                            <p className="text-gray-400 relative z-10">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function LandingV2Content() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 origin-left z-50" style={{ scaleX }} />
      
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
      `}</style>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-40 transition-all duration-300 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <Play size={20} fill="black" className="text-black ml-1" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden md:block text-white">IPTV SMARTERS PRO</span>
           </div>
           
           <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Avantages</a>
              <a href="#channels" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Chaînes</a>
              <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Abonnements</a>
              <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Aide</a>
           </div>

           <button 
             onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
           >
             ESPACE CLIENT
           </button>
        </div>
      </nav>

      {/* --- Hero --- */}
      <HeroSection />

      {/* --- Trustpilot Bar --- */}
      <div className="bg-[#fcfbf3] py-6 border-b border-gray-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
           <div className="flex items-center gap-4">
              <div className="flex flex-col">
                 <div className="flex items-center gap-2 mb-1">
                    <Star size={24} fill="#00b67a" className="text-[#00b67a]" />
                    <span className="font-black text-2xl text-black">Trustpilot</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <div key={i} className="bg-[#00b67a] p-1"><Star size={14} fill="white" className="text-white"/></div>)}
                    </div>
                    <span className="text-sm font-bold text-gray-600">Excellent 4.9/5</span>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 overflow-hidden md:ml-12">
               <div className="flex gap-8 animate-marquee whitespace-nowrap">
                   {REVIEWS.map((review, i) => (
                       <div key={i} className="flex flex-col min-w-[300px]">
                           <div className="flex gap-1 mb-1">
                               {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#00b67a" className="text-[#00b67a]" />)}
                           </div>
                           <p className="text-black text-sm font-medium truncate">"{review.text}"</p>
                           <span className="text-gray-400 text-xs">{review.name} • {review.date}</span>
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
               <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white">POURQUOI NOUS CHOISIR ?</h2>
               <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                 La meilleure infrastructure IPTV en Europe. Stabilité garantie.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-blue-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 transition-transform">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Anti-Freeze 8.0</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Technologie propriétaire de mise en mémoire tampon prédictive. Zéro coupure, même pendant les finales de Coupe du Monde.
                  </p>
               </TiltCard>

               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-purple-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 text-purple-500 group-hover:scale-110 transition-transform">
                    <Monitor size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">4K Ultra HD</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Flux natifs en 4K HDR10+. Redécouvrez vos films et matchs avec une clarté cristalline. Compatible Dolby Vision.
                  </p>
               </TiltCard>

               <TiltCard className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 relative group hover:border-green-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 text-green-500 group-hover:scale-110 transition-transform">
                    <Headphones size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Support France 24/7</h3>
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
      
      {/* --- Devices Section --- */}
      <DevicesSection />

      {/* --- Steps Section --- */}
      <StepsSection />

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-32 px-6 relative bg-black">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="text-6xl font-black tracking-tighter mb-8 text-white">NOS OFFRES PREMIUM</h2>
               <p className="text-gray-400 text-lg">Rejoignez l'élite IPTV dès aujourd'hui. Satisfait ou remboursé.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
               {PRICING_PREMIUM.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative rounded-3xl p-[1px] ${plan.popular ? 'bg-gradient-to-b from-purple-500 to-blue-500 scale-105 z-10 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                     <div className="bg-[#080808] rounded-[23px] p-8 h-full flex flex-col relative overflow-hidden">
                        {plan.popular && (
                           <div className="absolute -right-12 top-8 bg-blue-600 text-white font-black text-xs px-12 py-1 rotate-45 shadow-lg">
                             POPULAIRE
                           </div>
                        )}
                        
                        <div className="text-center mb-8">
                           <h3 className="text-2xl font-bold mb-2 text-white">{plan.title}</h3>
                           <p className={`text-xs font-bold tracking-widest uppercase opacity-70 ${plan.popular ? 'text-blue-400' : 'text-gray-500'}`}>{plan.subtitle}</p>
                        </div>

                        <div className="text-center mb-8">
                           <span className="text-6xl font-black tracking-tighter text-white">{plan.price}€</span>
                           <span className="text-lg text-gray-500 font-bold block">/ période</span>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                               <Check size={16} className={`text-blue-500 mt-0.5 min-w-[16px]`} />
                               <span className="text-left">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <button 
                          onClick={() => router.push(plan.href)}
                          className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:scale-[1.02] ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
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
          <h2 className="text-4xl font-black text-center mb-16 text-white">Questions Fréquentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-lg text-white">{item.q}</span>
                    <ChevronDown className="group-open:rotate-180 transition-transform text-white" />
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
      <footer className="py-20 px-6 border-t border-white/10 bg-black text-white">
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