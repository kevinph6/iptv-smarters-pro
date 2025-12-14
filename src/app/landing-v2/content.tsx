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
  Wifi,
  Cpu,
  Server,
  Lock,
  MessageCircle,
  HelpCircle,
  Layers,
  Crown,
  Gift,
  Rocket
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  { name: "Canal+ Sport", color: "bg-black" },
  { name: "Eurosport", color: "bg-blue-800" },
  { name: "HBO", color: "bg-black" },
  { name: "OCS", color: "bg-orange-500" },
];

const APPS = [
  { name: 'SMART IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-icon-for-smart-iptv-app-09c4ab27-20251205181036.jpg' },
  { name: 'DUPLEX', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-icon-for-duplex-iptv-st-0f19efe5-20251205181034.jpg' },
  { name: 'FLIX IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-flix-iptv-applicati-0c4fe512-20251205181036.jpg' },
  { name: 'GSE SMART', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-gse-smart-iptv-play-4ccaccfa-20251205181035.jpg' },
  { name: 'NET IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-icon-for-net-iptv-applicatio-85ce8496-20251205181033.jpg' },
  { name: 'ROYAL IPTV', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/transparent-logo-for-royal-iptv-premium--3a114533-20251205181033.jpg' },
];

const PRICING_STANDARD = [
  {
    id: 'std-3-mois',
    title: '3 MOIS',
    subtitle: 'IPTV HD',
    price: '19',
    cents: '00',
    href: '/payment?plan=std-3-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7'],
    popular: false,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'std-6-mois',
    title: '6 MOIS',
    subtitle: 'IPTV HD',
    price: '22',
    cents: '00',
    href: '/payment?plan=std-6-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7'],
    popular: false,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'std-12-mois',
    title: '12 MOIS',
    subtitle: 'IPTV HD',
    price: '39',
    cents: '00',
    href: '/payment?plan=std-12-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7'],
    popular: true,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'std-24-mois',
    title: '24 MOIS',
    subtitle: 'IPTV HD',
    price: '59',
    cents: '00',
    href: '/payment?plan=std-24-mois',
    features: ['120K+ Chaînes & VOD', 'Qualité FHD/HD', 'Support 24/7'],
    popular: false,
    gradient: 'from-emerald-500 to-teal-500'
  }
];

const PRICING_PREMIUM = [
  {
    id: 'prm-3-mois',
    title: '3 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '27',
    cents: '00',
    href: '/payment?plan=prm-3-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD', 'Anti-Freeze 3.0', '+18 Inclus'],
    popular: false,
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'prm-6-mois',
    title: '6 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '42',
    cents: '00',
    href: '/payment?plan=prm-6-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD', 'Anti-Freeze 3.0', '+18 Inclus'],
    popular: false,
    gradient: 'from-fuchsia-500 to-purple-600'
  },
  {
    id: 'prm-12-mois',
    title: '12 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '69',
    cents: '00',
    href: '/payment?plan=prm-12-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD', 'Anti-Freeze 3.0', '+18 Inclus'],
    bonus: '+2 Mois Gratuit',
    popular: true,
    gradient: 'from-amber-500 to-red-500'
  },
  {
    id: 'prm-24-mois',
    title: '24 MOIS',
    subtitle: 'PREMIUM 4K',
    price: '100',
    cents: '00',
    href: '/payment?plan=prm-24-mois',
    features: ['160K+ Chaînes & VOD', 'Qualité 4K/UHD', 'Anti-Freeze 3.0', '+18 Inclus'],
    bonus: '+4 Mois Gratuit',
    popular: false,
    gradient: 'from-red-500 to-rose-600'
  }
];

const FAQ = [
  { q: "Qu'est-ce qu'IPTV Smarters Pro ?", a: "IPTV Smarters Pro est l'application leader pour regarder la télévision en direct, films et séries via notre abonnement IPTV premium. Compatible Smart TV, Android, iOS, PC." },
  { q: "Comment activer mon abonnement IPTV ?", a: "L'activation est instantanée. Après paiement, vous recevez vos identifiants par email et WhatsApp. Notre équipe vous assiste si besoin." },
  { q: "Quels appareils sont compatibles ?", a: "Tout est compatible : Smart TV (Samsung/LG), Android Box, Apple TV, PC/Mac, Smartphone/Tablette, FireStick, Mag, etc." },
  { q: "La qualité est-elle vraiment 4K ?", a: "Oui, nos serveurs diffusent en 4K UHD, FHD et HD selon votre débit internet. Technologie anti-freeze incluse." },
  { q: "Est-ce sécurisé ?", a: "Absolument. Paiement sécurisé via Stripe, connexion chiffrée SSL, et VPN inclus pour votre confidentialité." },
  { q: "Puis-je tester avant ?", a: "Oui, contactez-nous pour un test. Nos offres sont garanties satisfait ou remboursé." }
];

const REVIEWS = [
  { name: "Thomas D.", loc: "Paris", text: "Franchement bluffé. La qualité 4K est réelle, pas de coupure pendant les matchs. Le service client a répondu en 2 min un dimanche.", rating: 5 },
  { name: "Sarah L.", loc: "Lyon", text: "Je ne regarde plus que ça. L'interface est fluide, toutes les séries Netflix et Prime sont là. Meilleur investissement de l'année.", rating: 5 },
  { name: "Karim B.", loc: "Marseille", text: "Installation super simple sur ma Samsung TV. Ça marche nickel, merci pour l'activation rapide.", rating: 5 },
];

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
    <span className="relative z-10 flex items-center gap-2 justify-center text-center w-full">{children}</span>
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
  const [pricingMode, setPricingMode] = useState<'standard' | 'premium'>('premium');
  const heroRef = useRef(null);

  // Parallax Text
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentPricing = pricingMode === 'premium' ? PRICING_PREMIUM : PRICING_STANDARD;

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
            <a href="#pricing" className="hover:text-white transition-colors">Abonnements</a>
            <a href="#comparison" className="hover:text-white transition-colors">Comparatif</a>
            <a href="#reseller" className="hover:text-white transition-colors">Revendeur</a>
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
              <a href="#comparison" onClick={() => setIsMenuOpen(false)}>Comparatif</a>
              <a href="#reseller" onClick={() => setIsMenuOpen(false)}>Revendeur</a>
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
              <span className="text-sm font-medium text-gray-300">N°1 en France • Abonnement IPTV Premium • 50,000+ Clients</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
              LE FUTUR DE LA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                TÉLÉVISION EST ICI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Accédez à <span className="text-white font-bold">IPTV SMARTERS PRO</span> : 160,000+ chaînes et films en 4K Ultra HD. 
              Abonnement IPTV stable, sans coupure. Installation immédiate.
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
            
            {/* Visible SEO Line - Tech Style */}
            <div className="mt-12 flex justify-center gap-8 text-[10px] text-gray-600 font-mono uppercase tracking-widest opacity-60">
              <span>System: Online</span>
              <span>Server: France/Europe</span>
              <span>Status: IPTV SMARTERS PRO ACTIVATED</span>
              <span>Mode: 4K UHD</span>
            </div>
          </motion.div>
        </div>

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
              IPTV SMARTERS PRO : Une technologie de pointe développée pour les passionnés de divertissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  Profitez d'une qualité d'image cristalline sur tous vos appareils avec votre abonnement IPTV. Smart TV, Smartphone, Tablette, PC.
                  Compatible avec IPTV Smarters Pro, Tivimate, et plus.
                </p>
              </div>
              <div className="absolute right-[-50px] bottom-[-50px] md:right-0 md:bottom-0 opacity-50">
                 <div className="w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600" 
                alt="4K TV IPTV SMARTERS PRO" 
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover mask-image-gradient opacity-60 group-hover:scale-105 transition-transform duration-700 hidden md:block"
                style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
              />
            </motion.div>

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
                  Technologie Anti-Freeze 3.0. Fini les chargements interminables. Abonnement IPTV stable sans coupure.
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

            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 bg-gray-900/50 border border-white/10 backdrop-blur-sm group"
            >
               <div className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center mb-6 text-green-500">
                  <Film size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">VOD Illimitée</h3>
                <p className="text-gray-400 mb-6">
                  +160,000 Films et Séries. Netflix, Prime Video, Disney+, Canal+ Séries inclus dans votre abonnement IPTV.
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
                      Infrastructure hébergée en Europe pour une latence minimale. Vos données sont protégées et votre connexion est anonymisée via VPN intégré.
                    </p>
                 </div>
                 <div className="flex-1 relative h-48 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1558494949-efc02570fbc9?auto=format&fit=crop&q=80&w=600" 
                      alt="Servers IPTV SMARTERS PRO" 
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

      {/* Tech Specs Section */}
      <section className="relative z-20 py-12 px-6 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: "Qualité", value: "4K UHD / FHD", icon: Zap },
             { label: "Latence", value: "< 0.5s", icon: Wifi },
             { label: "Uptime", value: "99.9%", icon: Server },
             { label: "Sécurité", value: "AES-256 SSL", icon: Lock },
           ].map((spec, i) => (
             <div key={i} className="flex flex-col items-center justify-center text-center p-4">
                <spec.icon className="text-white/20 mb-3" size={32} />
                <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">{spec.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-20 py-32 px-6 bg-black/50 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Tarification Simple</span>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Commencez l'Expérience</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              IPTV SMARTERS PRO vous propose les meilleurs tarifs. Choisissez le pass qui vous correspond.
            </p>
            
            {/* Toggle Switch */}
            <div className="inline-flex bg-white/10 p-1 rounded-full backdrop-blur-md border border-white/10">
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
                <Crown size={14} />
                PREMIUM (4K)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {currentPricing.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className={`relative p-1 rounded-3xl ${plan.popular ? 'bg-gradient-to-b ' + plan.gradient : 'bg-gray-800/50'}`}
              >
                <div className="bg-[#0a0a0a] rounded-[22px] p-6 h-full flex flex-col relative overflow-hidden border border-white/5">
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-red-500 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow-lg">
                      Best Seller
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-200 mb-1">{plan.title}</h3>
                  <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">{plan.subtitle}</p>
                  
                  <div className="flex items-start gap-1 mb-6">
                    <span className="text-2xl font-bold text-gray-500 mt-2">€</span>
                    <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${plan.gradient}`}>
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-500 mt-2">.{plan.cents}</span>
                  </div>

                  {/* Bonus Badge for Premium */}
                  {(plan as any).bonus && (
                    <div className="mb-6 flex justify-center">
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold py-1.5 px-3 rounded-full animate-pulse">
                        <Gift className="w-3.5 h-3.5" />
                        <span>{(plan as any).bonus}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-amber-500/20 text-amber-500' : 'bg-gray-700 text-gray-400'}`}>
                          <CheckCircle size={10} />
                        </div>
                        <span className="text-gray-400 text-sm font-medium leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <GlowingButton 
                    primary={plan.popular} 
                    className="w-full !px-4 !py-3 !text-sm"
                    onClick={() => router.push(plan.href)}
                  >
                    CHOISIR
                    <ArrowRight size={14} />
                  </GlowingButton>
                  
                  <p className="text-center text-gray-600 text-[10px] mt-4 flex items-center justify-center gap-1">
                    <Lock size={10} /> Paiement Sécurisé
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <ShieldCheck size={18} />
              Garantie 30 Jours Satisfait ou Remboursé • Abonnement IPTV Pas Cher
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section (New) */}
      <section id="comparison" className="relative z-20 py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Qualité Supérieure</span>
               </div>
               <h2 className="text-4xl font-bold mb-6">IPTV SMARTERS vs Autres</h2>
               <p className="text-gray-400 mb-8 text-lg">
                 Ne vous contentez pas de moins. Découvrez la différence de qualité, de stabilité et de support avec notre abonnement IPTV Premium.
               </p>
               
               <div className="space-y-4">
                 {[
                   { label: "Qualité 4K UHD Réelle", us: true, them: false },
                   { label: "Anti-Freeze 3.0 (Sans coupure)", us: true, them: false },
                   { label: "Replay & Contrôle du Direct", us: true, them: false },
                   { label: "Support Français 24/7", us: true, them: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-medium">{item.label}</span>
                      <div className="flex items-center gap-8">
                         <div className="flex flex-col items-center gap-1">
                           <span className="text-[10px] text-gray-500 uppercase">Nous</span>
                           <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><CheckCircle size={14} /></div>
                         </div>
                         <div className="flex flex-col items-center gap-1 opacity-30">
                           <span className="text-[10px] text-gray-500 uppercase">Autres</span>
                           <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><X size={14} /></div>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
               <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
                  <video
                      className="w-full h-full object-cover opacity-80"
                      autoPlay
                      muted
                      loop
                      playsInline
                      src="https://darkorchid-goldfish-662671.hostingersite.com/wp-content/uploads/2025/10/ISP-FRANCE-2024.mp4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-sm font-bold text-white mb-1">Démonstration Live</p>
                    <p className="text-xs text-gray-400">Qualité 4K HDR • 60 FPS</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Compatibility (New) */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-12">Compatible avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Toutes Vos Apps</span></h2>
           
           <div className="flex flex-wrap justify-center gap-8 md:gap-12">
             {APPS.map((app, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group">
                 <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                   <Image src={app.icon} alt={app.name} width={60} height={60} className="object-contain" unoptimized />
                 </div>
                 <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">{app.name}</span>
               </div>
             ))}
           </div>
           
           <p className="mt-12 text-gray-500 text-sm">Et bien plus encore: VLC, Kodi, Smart STB, STB Emu, MyTVOnline...</p>
        </div>
      </section>

      {/* Reseller Section (New) */}
      <section id="reseller" className="relative z-20 py-24 px-6 border-t border-white/5 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-green-900/5" />
        <div className="max-w-5xl mx-auto relative z-10">
           <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-3xl p-8 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Opportunité Business</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Devenez Revendeur IPTV</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Gérez vos propres clients avec notre panel revendeur intuitif. Tarifs préférentiels, marque blanche, et support dédié.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                 {[{icon:Users, t:"Gestion Facile"}, {icon:Shield, t:"Panel Stable"}, {icon:Wallet, t:"Crédits Illimités"}, {icon:MessageCircle, t:"Support VIP"}].map((f, i) => (
                   <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center gap-2">
                     <f.icon className="text-green-500" size={24} />
                     <span className="text-sm font-bold">{f.t}</span>
                   </div>
                 ))}
              </div>

              <GlowingButton className="!border-green-500/50 !text-green-400 hover:!bg-green-500/10" onClick={() => window.open('https://wa.me/212628461599', '_blank')}>
                <MessageCircle size={18} />
                CONTACTER SUR WHATSAPP
              </GlowingButton>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-20 py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-gray-400">Tout ce que vous devez savoir sur IPTV SMARTERS PRO</p>
          </div>
          
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-lg">{item.q}</span>
                  <ChevronDown className="transition-transform group-open:rotate-180 text-gray-500" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews (Keep existing but update style) */}
      <section id="reviews" className="relative z-20 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Avis Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
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
              Le leader français de la télévision IP. Abonnement IPTV Premium 4K. Support local et technologie de pointe.
            </p>
            <div className="flex gap-4">
               <span className="px-3 py-1 rounded border border-white/10 flex items-center gap-2"><Lock size={12}/> SSL Sécurisé</span>
               <span className="px-3 py-1 rounded border border-white/10 flex items-center gap-2"><ShieldCheck size={12}/> Stripe</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Abonnements IPTV</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Chaînes TV</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Support</a></li>
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
        
        {/* Hidden Footer SEO Content */}
        <div className="sr-only" aria-hidden="true">
          <p>IPTV SMARTERS PRO abonnement iptv France premium 4K FHD HD. Meilleur service IPTV SMARTERS PRO avec abonnement iptv stable. IPTV SMARTERS PRO compatible Smart TV Android iOS. Abonnement iptv activation instantanée avec IPTV SMARTERS PRO. Service abonnement iptv 24/7 support. IPTV SMARTERS PRO VOD films séries. Abonnement iptv sport chaînes mondiales. IPTV SMARTERS PRO pas cher meilleur prix.</p>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2025 IPTV SMARTERS PRO. Tous droits réservés.</span>
          <div className="flex gap-4">
            <span>IPTV SMARTERS PRO France</span>
            <span>Abonnement IPTV Premium</span>
          </div>
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