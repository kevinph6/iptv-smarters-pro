'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
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
  Headphones
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Assets & Data ---
const CHANNELS = [
  { name: "TF1", color: "bg-blue-600" },
  { name: "M6", color: "bg-red-600" },
  { name: "Canal+", color: "bg-black" },
  { name: "BeIN Sports", color: "bg-purple-700" },
  { name: "RMC Sport", color: "bg-orange-600" },
  { name: "Netflix", color: "bg-red-700" },
  { name: "Prime Video", color: "bg-blue-400" },
  { name: "Disney+", color: "bg-blue-900" },
  { name: "Canal+ Sport", color: "bg-black" },
  { name: "Eurosport", color: "bg-blue-800" },
  { name: "HBO", color: "bg-black" },
  { name: "Apple TV+", color: "bg-gray-800" },
];

const APPS = [
  { name: 'SMART IPTV', color: 'from-blue-600 to-blue-400', initials: 'SI' },
  { name: 'DUPLEX PLAY', color: 'from-purple-600 to-indigo-400', initials: 'DP' },
  { name: 'FLIX IPTV', color: 'from-green-500 to-emerald-400', initials: 'FI' },
  { name: 'IBO PLAYER', color: 'from-red-500 to-orange-400', initials: 'IB' },
  { name: 'NET IPTV', color: 'from-cyan-500 to-blue-400', initials: 'NI' },
  { name: 'SET IPTV', color: 'from-pink-500 to-rose-400', initials: 'ST' },
];

const PRICING_STANDARD = [
  {
    id: 'std-3-mois',
    title: '3 MOIS',
    subtitle: 'PACK DÉCOUVERTE',
    price: '19',
    cents: '00',
    href: '/payment?plan=std-3-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7', 'Livraison Immédiate'],
    popular: false,
    color: 'blue'
  },
  {
    id: 'std-6-mois',
    title: '6 MOIS',
    subtitle: 'PACK CONFORT',
    price: '22',
    cents: '00',
    href: '/payment?plan=std-6-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7', 'Anti-Freeze Basic'],
    popular: false,
    color: 'indigo'
  },
  {
    id: 'std-12-mois',
    title: '12 MOIS',
    subtitle: 'PACK EXPERT',
    price: '39',
    cents: '00',
    href: '/payment?plan=std-12-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support Prioritaire', 'Anti-Freeze Basic'],
    popular: true,
    color: 'violet'
  },
  {
    id: 'std-24-mois',
    title: '24 MOIS',
    subtitle: 'PACK FIDÉLITÉ',
    price: '59',
    cents: '00',
    href: '/payment?plan=std-24-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support Prioritaire', 'Garantie Étendue'],
    popular: false,
    color: 'purple'
  }
];

const PRICING_PREMIUM = [
  {
    id: 'prm-3-mois',
    title: '3 MOIS',
    subtitle: 'ELITE 4K',
    price: '27',
    cents: '00',
    href: '/payment?plan=prm-3-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD Réelle', 'Anti-Freeze 8.0 AI', 'Serveurs VIP France', 'Replay 7 Jours'],
    popular: false,
    color: 'emerald'
  },
  {
    id: 'prm-6-mois',
    title: '6 MOIS',
    subtitle: 'ELITE 4K',
    price: '42',
    cents: '00',
    href: '/payment?plan=prm-6-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD Réelle', 'Anti-Freeze 8.0 AI', 'Serveurs VIP France', 'Replay 7 Jours'],
    popular: false,
    color: 'teal'
  },
  {
    id: 'prm-12-mois',
    title: '12 MOIS',
    subtitle: 'ELITE 4K',
    price: '69',
    cents: '00',
    href: '/payment?plan=prm-12-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD Réelle', 'Anti-Freeze 8.0 AI', 'Serveurs VIP France', 'Replay 7 Jours'],
    bonus: '+2 MOIS OFFERTS',
    popular: true,
    color: 'amber'
  },
  {
    id: 'prm-24-mois',
    title: '24 MOIS',
    subtitle: 'ELITE 4K',
    price: '100',
    cents: '00',
    href: '/payment?plan=prm-24-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD Réelle', 'Anti-Freeze 8.0 AI', 'Serveurs VIP France', 'Replay 7 Jours'],
    bonus: '+4 MOIS OFFERTS',
    popular: false,
    color: 'rose'
  }
];

const FAQ = [
  { q: "Pourquoi IPTV Smarters Pro est le N°1 en France ?", a: "Grâce à notre infrastructure de serveurs locaux basés en France et en Europe, nous garantissons une latence quasi-nulle et une stabilité inégalée (Anti-Freeze 8.0). Compatible avec toutes les box et Smart TV." },
  { q: "Comment se passe l'installation ?", a: "C'est immédiat. Dès votre paiement validé, vous recevez un tutoriel complet et vos codes d'accès par Email et WhatsApp. En 5 minutes, vous regardez vos chaînes préférées." },
  { q: "La qualité 4K est-elle garantie ?", a: "Oui, si votre connexion internet le permet (>15 Mbps), vous accéderez à nos flux 4K UHD natifs. Nous proposons aussi du FHD et HD pour les connexions plus modestes." },
  { q: "Puis-je utiliser l'abonnement sur plusieurs écrans ?", a: "Nos abonnements sont optimisés pour un usage sur un écran à la fois pour garantir la stabilité, mais vous pouvez configurer l'accès sur plusieurs appareils (TV, Téléphone, Tablette) et basculer de l'un à l'autre." },
  { q: "Quelles chaînes et VOD sont incluses ?", a: "Tout est inclus : Canal+, BeIN Sports, RMC Sport, Netflix, Prime Video, Disney+, Apple TV+, et des milliers de chaînes internationales (FR, BE, CH, CA, US, UK, AR, etc.)." },
  { q: "Y a-t-il une garantie de remboursement ?", a: "Absolument. Si vous rencontrez des problèmes techniques non résolus dans les 30 premiers jours, nous vous remboursons intégralement." }
];

const REVIEWS = [
  { name: "Marc H.", loc: "Paris", text: "J'ai testé 5 fournisseurs avant eux. C'est le jour et la nuit. Pas un seul buffer pendant le match du PSG hier. La 4K est sublime.", rating: 5, date: "Il y a 2 jours" },
  { name: "Sophie T.", loc: "Bordeaux", text: "Le catalogue VOD est impressionnant, c'est comme avoir Netflix + Disney + Prime combinés mais pour 10x moins cher. L'interface Smarters est top.", rating: 5, date: "Il y a 5 jours" },
  { name: "Yassine B.", loc: "Lyon", text: "Service client au top sur WhatsApp, ils m'ont aidé à configurer ma télé Samsung en 10 minutes. Je recommande à 100%.", rating: 5, date: "Il y a 1 semaine" },
];

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const MagneticButton = ({ children, className = "", onClick, primary = false }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden group transition-all duration-300 ${className} ${primary ? 'bg-white text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]' : 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5'}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};

// New Component for Simulated Video
const StreamSimulation = () => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Moving Particles */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"
      />
      
      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
        >
          <Play size={32} className="fill-white ml-2" />
        </motion.div>
        <div className="text-center">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-bold tracking-widest text-xl mb-1"
          >
            4K ULTRA HD
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-mono">LIVE FEED • 60FPS • HDR10+</span>
          </div>
        </div>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
            className="absolute top-1/2 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-white">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default function LandingV2Content() {
  const router = useRouter();
  const [pricingMode, setPricingMode] = useState<'standard' | 'premium'>('premium');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPricing = pricingMode === 'premium' ? PRICING_PREMIUM : PRICING_STANDARD;

  const scrollToPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <ScrollProgress />
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] animate-pulse-slow delay-75" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-20 brightness-150 contrast-150" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Play size={14} className="fill-white ml-0.5" />
            </div>
            <span className="font-bold tracking-tight text-sm">IPTV SMARTERS PRO</span>
          </div>

          <div className="hidden md:flex items-center gap-2 backdrop-blur-md bg-black/50 px-2 py-2 rounded-full border border-white/10">
            {['Accueil', 'Fonctionnalités', 'Tarifs', 'Avis', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item === 'Accueil' ? 'hero' : item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="px-5 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <a href="#reseller" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Revendeur ?</a>
             <button 
                onClick={scrollToPricing}
                className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10"
             >
               S'abonner
             </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 inline-flex flex-col items-center"
          >
             <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
               <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-medium tracking-wide uppercase text-gray-300">Serveurs France : Opérationnels</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 mix-blend-overlay opacity-90">
               <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">CINÉMA</span>
               <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">ILLIMITÉ</span>
             </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Découvrez <span className="text-white font-bold">IPTV SMARTERS PRO</span>. L'abonnement IPTV Premium qui redéfinit vos soirées. 
            <span className="block mt-2 text-blue-400">4K UHD • Anti-Freeze 8.0 • +160,000 Contenus</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <MagneticButton primary onClick={scrollToPricing}>
              <Play size={18} className="fill-black" /> Commencer l'Essai
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              <ArrowRight size={18} /> Découvrir l'Offre
            </MagneticButton>
          </motion.div>
        </div>

        {/* 3D Floating Elements Simulation */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/4 left-[10%] w-64 h-96 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 opacity-40 blur-[2px] rotate-[-12deg]"
           />
           <motion.div 
             animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute top-1/3 right-[10%] w-72 h-80 rounded-2xl bg-gradient-to-bl from-gray-900 to-black border border-white/10 opacity-40 blur-[1px] rotate-[12deg]"
           />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 mix-blend-difference"
        >
           <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- Marquee --- */}
      <div className="relative z-20 bg-white/5 backdrop-blur-sm border-y border-white/5 py-10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
          {[...CHANNELS, ...CHANNELS, ...CHANNELS].map((c, i) => (
            <div key={i} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
               <div className={`w-3 h-3 rounded-full ${c.color}`} />
               <span className="text-2xl font-bold tracking-tight">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Features Section --- */}
      <section id="features" className="relative z-20 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:flex items-end justify-between">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4 block">Pourquoi Nous ?</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                L'EXCELLENCE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-red-500">
                  À LA FRANÇAISE
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Une infrastructure pensée pour la performance. Oubliez les coupures.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                 <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">4K HDR</div>
                 <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">DOLBY ATMOS</div>
                 <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">AI UPSCALING</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <FeatureCard 
               icon={Zap} 
               title="Anti-Freeze 8.0" 
               desc="Notre technologie propriétaire d'IA prédictive élimine le buffering avant qu'il n'arrive. Une fluidité parfaite pour vos matchs." 
               delay={0}
             />
             <FeatureCard 
               icon={Monitor} 
               title="4K Ultra HD" 
               desc="La plus haute définition du marché. Des couleurs éclatantes et des détails précis pour une immersion totale dans vos films." 
               delay={0.2}
             />
             <FeatureCard 
               icon={Globe} 
               title="Mondial & Local" 
               desc="Accédez aux chaînes du monde entier tout en profitant d'une priorisation des serveurs français pour une latence minimale." 
               delay={0.4}
             />
             <div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[400px] group border border-white/5 bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                
                {/* Simulated VOD Interface Background */}
                <div className="absolute inset-0 grid grid-cols-4 gap-2 opacity-30 transform rotate-[-5deg] scale-110 pointer-events-none p-4">
                   {[...Array(16)].map((_, i) => (
                     <div 
                       key={i} 
                       className={`aspect-[2/3] rounded-lg border border-white/5 animate-pulse ${
                         i % 3 === 0 ? 'bg-red-500/20' : i % 2 === 0 ? 'bg-blue-500/20' : 'bg-gray-500/20'
                       }`}
                       style={{ animationDelay: `${i * 0.1}s` }} 
                     />
                   ))}
                </div>

                <div className="absolute bottom-10 left-10 z-20 max-w-lg">
                   <h3 className="text-3xl font-bold mb-4">VOD Illimitée & Mise à Jour</h3>
                   <p className="text-gray-300 text-lg">
                     Netflix, Prime Video, Disney+, Apple TV+. Tout est là, mis à jour quotidiennement. 
                     Ne payez plus pour 10 abonnements différents.
                   </p>
                </div>
             </div>
             <FeatureCard 
               icon={Headphones} 
               title="Support VIP 24/7" 
               desc="Une équipe d'experts français disponibles jour et nuit sur WhatsApp et Email pour vous assister." 
               delay={0.6}
             />
          </div>
        </div>
      </section>

      {/* --- Compatibility --- */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-bold mb-16">Compatible Partout</h2>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16">
             {APPS.map((app, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 whileHover={{ y: -10 }}
                 className="flex flex-col items-center gap-4 group cursor-pointer"
               >
                 <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${app.color} p-[1px] shadow-xl group-hover:shadow-2xl group-hover:shadow-${app.color.split('-')[1]}-500/30 transition-all duration-300`}>
                   <div className="w-full h-full rounded-[23px] bg-black flex items-center justify-center relative overflow-hidden">
                     <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                     <span className={`text-2xl font-black bg-gradient-to-br ${app.color} bg-clip-text text-transparent`}>
                       {app.initials}
                     </span>
                   </div>
                 </div>
                 <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors">{app.name}</span>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="relative z-20 py-32 px-6 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">ABONNEMENTS</h2>
            
            {/* Custom Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <button 
                onClick={() => setPricingMode('standard')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${pricingMode === 'standard' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                STANDARD (HD)
              </button>
              <button 
                onClick={() => setPricingMode('premium')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${pricingMode === 'premium' ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Crown size={14} fill="currentColor" />
                PREMIUM (4K)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
            {currentPricing.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`relative group rounded-3xl p-[1px] ${plan.popular ? 'bg-gradient-to-b from-amber-500 to-red-600' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <div className="h-full bg-[#050505] rounded-[23px] p-6 flex flex-col relative overflow-hidden">
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-red-500" />
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-black italic tracking-wide mb-1">{plan.title}</h3>
                    <p className={`text-xs font-bold tracking-widest uppercase text-${plan.color}-500`}>{plan.subtitle}</p>
                  </div>

                  <div className="flex items-start gap-1 mb-8">
                    <span className="text-lg font-bold text-gray-500 mt-2">€</span>
                    <span className="text-7xl font-black tracking-tighter">{plan.price}</span>
                    <span className="text-lg font-bold text-gray-500 mt-2">.{plan.cents}</span>
                  </div>

                  {(plan as any).bonus && (
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/30 text-amber-500 text-xs font-bold animate-pulse">
                        {(plan as any).bonus}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle size={16} className={plan.popular ? "text-amber-500" : "text-gray-600"} />
                        <span className="text-sm font-medium text-gray-400">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => router.push(plan.href)}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white hover:shadow-lg hover:shadow-amber-900/40' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    CHOISIR CE PACK
                  </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
          
          <p className="text-center text-gray-500 mt-12 flex items-center justify-center gap-2">
            <Lock size={14} /> Paiement 100% Sécurisé par Stripe & SSL
          </p>
        </div>
      </section>

      {/* --- Comparison Video Section --- */}
      <section id="comparison" className="relative z-20 py-32 px-6 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-50" />
               <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl bg-black">
                 <StreamSimulation />
                 <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    <div>
                      <div className="text-white font-bold">LIVE PREVIEW</div>
                      <div className="text-xs text-gray-300">4K HDR • 60 FPS</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Activity size={20} className="text-green-400" />
                    </div>
                 </div>
               </div>
            </div>
            
            <div>
               <h2 className="text-4xl md:text-5xl font-bold mb-8">
                 NE LAISSEZ PAS UNE <br />
                 <span className="text-red-500">MAUVAISE QUALITÉ</span> GÂCHER VOS MATCHS
               </h2>
               <p className="text-gray-400 text-lg mb-10">
                 La plupart des fournisseurs IPTV low-cost surchargent leurs serveurs. 
                 Chez IPTV Smarters Pro, nous limitons le nombre d'utilisateurs par serveur pour garantir une bande passante dédiée.
               </p>
               
               <div className="space-y-4">
                 <div className="p-4 rounded-xl bg-green-900/10 border border-green-500/20 flex items-center justify-between">
                    <span className="font-bold text-green-400">IPTV SMARTERS PRO</span>
                    <span className="text-sm text-green-500">100% STABLE</span>
                 </div>
                 <div className="p-4 rounded-xl bg-red-900/10 border border-red-500/20 flex items-center justify-between opacity-60">
                    <span className="font-bold text-red-400">AUTRES FOURNISSEURS</span>
                    <span className="text-sm text-red-500">COUPURES FRÉQUENTES</span>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Reseller --- */}
      <section id="reseller" className="relative z-20 py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-block p-4 rounded-full bg-green-500/10 mb-6">
             <TrendingUp size={32} className="text-green-500" />
           </div>
           <h2 className="text-4xl font-bold mb-6">Devenez Partenaire & Gagnez</h2>
           <p className="text-gray-400 text-lg mb-10">
             Rejoignez notre programme revendeur. Achetez des crédits en gros, revendez au prix que vous voulez. 
             Panel complet, marque blanche, et support dédié.
           </p>
           <button 
             onClick={() => window.open('https://wa.me/212628461599', '_blank')}
             className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:brightness-110 transition-all flex items-center gap-2 mx-auto"
           >
             <MessageCircle size={20} />
             CONTACTER SUR WHATSAPP
           </button>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="relative z-20 py-24 px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Questions Fréquentes</h2>
            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <div key={i} className="group bg-white/5 rounded-2xl border border-white/5 overflow-hidden transition-all hover:bg-white/10">
                   <details className="group">
                     <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                       <span className="font-bold text-lg">{item.q}</span>
                       <ChevronDown className="transition-transform group-open:rotate-180" />
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
      <footer className="relative z-20 pt-24 pb-12 px-6 bg-black border-t border-white/10">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
               <h3 className="text-2xl font-black tracking-tighter mb-6">IPTV SMARTERS PRO</h3>
               <p className="text-gray-500 max-w-sm mb-6">
                 Le leader incontesté de l'IPTV en France. Qualité premium, technologie de pointe et satisfaction client sont nos priorités.
               </p>
               <div className="flex gap-4">
                 {/* Socials placeholders */}
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"><Globe size={18}/></div>
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"><MessageCircle size={18}/></div>
               </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Navigation</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Accueil</a></li>
                <li><a href="#pricing" className="hover:text-blue-500 transition-colors">Abonnements</a></li>
                <li><a href="#features" className="hover:text-blue-500 transition-colors">Chaînes & VOD</a></li>
                <li><a href="#tutorial" className="hover:text-blue-500 transition-colors">Tutoriels</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Légal</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="/confidentialite" className="hover:text-blue-500 transition-colors">Confidentialité</a></li>
                <li><a href="/remboursement" className="hover:text-blue-500 transition-colors">Remboursement</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
            <p>© 2025 IPTV SMARTERS PRO. Tous droits réservés.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
               <span>Sécurisé par Stripe</span>
               <span>Hébergé en Europe</span>
            </div>
         </div>
      </footer>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}