'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Zap, Globe, Clock, Headphones, 
  Check, Star, Crown, Rocket, Sparkles, Server, 
  Tv2, Film, Monitor, Smartphone, Apple, Laptop, 
  Cast, Gamepad2, Box, Tablet, Wifi,
  MessageCircle, TrendingUp, Users, Wallet, Shield, 
  ChevronDown, HelpCircle
} from 'lucide-react';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { PurchaseNotification } from '@/components/ui/purchase-notification';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  })
};

export default function LandingV2() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <NavigationHeader />

      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <PricingSection />
        <FeaturesSection />
        <ReviewsSection />
        <ResellerSection />
        <ComparisonSection />
        <DevicesSection />
        <FaqSection />
        <CTASection />
      </main>

      <Footer />
      <PurchaseNotification />
    </div>
  );
}

// --- SECTIONS ---

function HeroSection() {
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-cyan-100/80 uppercase">
              IPTV Smarters Pro • N°1 en France
            </span>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Le Futur du <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
              Streaming Premium
            </span>
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={2}
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            Accédez à <span className="text-cyan-400 font-semibold">160,000+ chaînes</span> et <span className="text-purple-400 font-semibold">20,000+ films</span> en 4K Ultra HD. 
            L'expérience IPTV ultime, stable et sans coupure.
          </motion.p>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <a href="#pricing" className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Commencer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a href="#features" className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" /> Découvrir
              </span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="relative w-full max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-[80px] -z-10" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
              <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ba0e4002-35cb-42f6-b185-6a3961472a13-officieliptvsmarterspro-fr/assets/images/officiel-iptv-smarters-1.png"
                alt="IPTV Smarters Pro Interface"
                width={1400}
                height={800}
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                priority
              />
              <FloatingBadge icon={Zap} text="4K Ultra HD" color="cyan" position="top-10 left-10" delay={1} />
              <FloatingBadge icon={Globe} text="Mondial" color="purple" position="bottom-20 right-10" delay={1.2} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({ icon: Icon, text, color, position, delay }: any) {
  const colorClasses = {
    cyan: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      className={`absolute ${position} backdrop-blur-md border px-4 py-2 rounded-xl flex items-center gap-3 shadow-xl ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-bold text-sm">{text}</span>
    </motion.div>
  );
}

function StatsSection() {
  const stats = [
    { value: "160K+", label: "Chaînes TV", icon: Tv2, color: "from-cyan-400 to-blue-500" },
    { value: "20K+", label: "Films & Séries", icon: Film, color: "from-purple-400 to-pink-500" },
    { value: "Instant", label: "Activation", icon: Zap, color: "from-amber-400 to-orange-500" },
    { value: "24/7", label: "Support Client", icon: Headphones, color: "from-emerald-400 to-green-500" },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={i}
              className="text-center group cursor-default"
            >
              <div className="mb-4 inline-flex p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                <stat.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-2 text-white">{stat.value}</h3>
              <p className="text-white/40 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { title: "3 Mois", price: "19", period: "EUR", icon: Zap, features: ["IPTV HD", "Activation Instantanée", "Support Standard"], gradient: "from-cyan-500 to-blue-600" },
    { title: "6 Mois", price: "22", period: "EUR", icon: Star, features: ["IPTV HD + VOD", "Haute Stabilité", "Support Prioritaire"], gradient: "from-purple-500 to-pink-600" },
    { title: "12 Mois", price: "39", period: "EUR", icon: Crown, features: ["Tout Illimité", "4K Ultra HD", "Support VIP 24/7"], gradient: "from-amber-500 to-orange-600", popular: true },
    { title: "24 Mois", price: "59", period: "EUR", icon: Rocket, features: ["Offre Suprême", "Multi-Écrans", "Garantie Totale"], gradient: "from-emerald-500 to-teal-600" },
  ];

  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Choisis ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Passeport</span>
          </motion.h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Des tarifs transparents pour une expérience sans limites. 
            Rejoignez l'élite du streaming dès maintenant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      custom={index}
      className={`relative group rounded-3xl p-1 transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'bg-gradient-to-b from-amber-500/50 to-orange-500/50' : 'bg-white/10 hover:bg-white/20'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      <div className="h-full bg-[#0A0A0A] rounded-[22px] p-8 flex flex-col relative overflow-hidden">
        {plan.popular && (
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
            BEST SELLER
          </div>
        )}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
          <plan.icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-5xl font-black text-white">{plan.price}€</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feat: string, j: number) => (
            <li key={j} className="flex items-center gap-3 text-white/70 text-sm">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              {feat}
            </li>
          ))}
        </ul>
        <a 
          href={`/produits/abonnement-iptv-hd-${plan.title.toLowerCase().replace(' ', '-')}`}
          className={`w-full py-4 rounded-xl font-bold text-center text-white bg-gradient-to-r ${plan.gradient} opacity-90 hover:opacity-100 transition-opacity relative overflow-hidden`}
        >
          <span className="relative z-10">Commander</span>
        </a>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  const features = [
    { title: "4K Ultra HD", desc: "Qualité d'image cristalline", icon: Tv2, span: "col-span-1 md:col-span-2" },
    { title: "Anti-Freeze", desc: "Technologie 0 coupure", icon: Server, span: "col-span-1" },
    { title: "Replay 7J", desc: "Ne ratez plus rien", icon: Clock, span: "col-span-1" },
    { title: "Compatible", desc: "Tous vos appareils", icon: Smartphone, span: "col-span-1 md:col-span-2" },
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-black mb-6 leading-tight">
              La Puissance <br />
              <span className="text-cyan-400">Sans Limites.</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Découvrez une technologie de pointe conçue pour les passionnés de divertissement exigeants.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Serveurs Haute Performance",
                "Mise à jour automatique",
                "EPG (Guide des programmes)",
                "Support Technique 24/7"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${feat.span} group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-8 transition-all hover:border-cyan-500/30 overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <feat.icon className="w-24 h-24 text-white rotate-12 transform group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-white/50">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    { name: "Marie Dubois", rating: 5, title: "Excellent service", content: "Abonné depuis 6 mois et vraiment satisfait. Les chaînes françaises sont en parfaite qualité.", verified: true },
    { name: "Laurent Petit", rating: 5, title: "Meilleur IPTV", content: "IPTV Smarters Pro est de loin le plus stable avec une activation instantanée. Les matchs sont impeccables.", verified: true },
    { name: "Sophie Martin", rating: 5, title: "Parfait", content: "Plus de 120 000 chaînes, on trouve tout ! Idéal pour la famille.", verified: true },
    { name: "Pierre Lefebvre", rating: 4, title: "Bon rapport qualité-prix", content: "Service sérieux et professionnel. L'activation a pris seulement 3 minutes.", verified: true },
    { name: "Thomas Rousseau", rating: 5, title: "Top pour le sport", content: "Fan de foot, j'ai tous les matchs en direct. La qualité 4K est incroyable.", verified: true },
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl font-black mb-4">Ils nous font <span className="text-cyan-400">confiance</span></h2>
        <div className="flex justify-center gap-1 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-cyan-500 text-cyan-500" />)}
        </div>
        <p className="text-white/50">4.9/5 basé sur 15,000+ avis</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-6 pl-6"
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={i} className="min-w-[350px] p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? "fill-cyan-500 text-cyan-500" : "fill-white/20 text-white/20"}`} />
                  ))}
                </div>
                {review.verified && <div className="text-xs font-bold text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Vérifié</div>}
              </div>
              <h3 className="font-bold text-lg mb-2">{review.title}</h3>
              <p className="text-white/60 text-sm mb-4">{review.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div className="text-sm font-medium">{review.name}</div>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
      </div>
    </section>
  );
}

function ResellerSection() {
  const benefits = [
    { icon: Users, text: "Gestion Facile" },
    { icon: Shield, text: "Stabilité Maximale" },
    { icon: Wallet, text: "Crédits Illimités" },
    { icon: TrendingUp, text: "Support Dédié" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-[3rem] border border-green-500/20 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-bold text-sm uppercase">Opportunité Business</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Devenez <span className="text-green-400">Revendeur</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Générez des revenus récurrents en rejoignant le réseau IPTV N°1 en France. Plateforme de gestion incluse.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {benefits.map((b, i) => (
              <div key={i} className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <b.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="font-semibold">{b.text}</p>
              </div>
            ))}
          </div>

          <a href="https://wa.me/212628461599" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-black font-bold text-lg rounded-xl hover:bg-green-400 transition-colors">
            <MessageCircle className="w-5 h-5" /> Contacter sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">La Différence <span className="text-purple-400">Premium</span></h2>
          <p className="text-white/50">Pourquoi choisir IPTV Smarters Pro ?</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-xl mb-4 text-cyan-400">IPTV Standard</h3>
              <ul className="space-y-3 opacity-60">
                <li className="flex gap-2"><Check className="w-5 h-5" /> Qualité HD/FHD</li>
                <li className="flex gap-2"><Check className="w-5 h-5" /> 10,000 Chaînes</li>
                <li className="flex gap-2"><Check className="w-5 h-5" /> Support Email</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-bold bg-purple-500 px-3 py-1 rounded-full">NOTRE OFFRE</div>
              <h3 className="font-bold text-2xl mb-4 text-white">IPTV Smarters Pro</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 font-medium"><Check className="w-5 h-5 text-purple-400" /> 4K Ultra HD & HEVC</li>
                <li className="flex gap-3 font-medium"><Check className="w-5 h-5 text-purple-400" /> 160,000+ Chaînes & VOD</li>
                <li className="flex gap-3 font-medium"><Check className="w-5 h-5 text-purple-400" /> Anti-Freeze Technology 3.0</li>
                <li className="flex gap-3 font-medium"><Check className="w-5 h-5 text-purple-400" /> Support VIP WhatsApp 24/7</li>
              </ul>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video group bg-black">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>
            </div>
            <video 
              src="https://darkorchid-goldfish-662671.hostingersite.com/wp-content/uploads/2025/10/ISP-FRANCE-2024.mp4"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DevicesSection() {
  const devices = [
    { name: "Samsung", icon: Monitor },
    { name: "Android", icon: Smartphone },
    { name: "Apple TV", icon: Apple },
    { name: "PC / Mac", icon: Laptop },
    { name: "Chromecast", icon: Cast },
    { name: "Xbox", icon: Gamepad2 },
  ];

  return (
    <section className="py-20 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 text-center">
        <p className="text-white/40 uppercase tracking-widest text-sm mb-12">Compatible avec tout votre écosystème</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          {devices.map((device, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                <device.icon className="w-8 h-8 text-white/60 group-hover:text-white" />
              </div>
              <span className="text-xs font-medium text-white/40 group-hover:text-white/80">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { q: "Qu'est-ce qu' IPTV Smarters Pro ?", a: "IPTV Smarters Pro est une application puissante permettant de regarder la télévision en direct, des films, des séries et des chaînes premium via un abonnement IPTV." },
    { q: "Comment activer mon abonnement ?", a: "Immédiatement après votre souscription, un agent vous contactera par e-mail ou WhatsApp pour activer votre abonnement. L'activation est instantanée." },
    { q: "Puis-je utiliser l'abonnement sur plusieurs appareils ?", a: "Oui, notre abonnement est compatible multi-écrans selon le plan choisi." },
    { q: "Proposez-vous un remboursement ?", a: "Nous offrons une garantie de satisfaction. Contactez le support si vous rencontrez des problèmes techniques majeurs." }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Questions <span className="text-pink-400">Fréquentes</span></h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-white/60"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 via-purple-900/40 to-pink-900/40" />
        <Image 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ba0e4002-35cb-42f6-b185-6a3961472a13-officieliptvsmarterspro-fr/assets/images/officiel-iptv-smarters-1.png"
          alt="Background"
          fill
          className="object-cover opacity-10 blur-sm"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Prêt à changer de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              Dimension ?
            </span>
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Rejoignez plus de 50,000 clients satisfaits et découvrez la télévision comme vous ne l'avez jamais vue.
          </p>
          <a 
            href="#pricing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform"
          >
            Obtenir mon accès maintenant <ArrowRight className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
