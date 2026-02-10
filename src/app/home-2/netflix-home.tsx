"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {
  Play,
  Info,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  Headphones,
  Zap,
  Crown,
  Gem,
  Rocket,
  Gift,
  Shield,
  Lock,
  Server,
  Eye,
  Users,
  ArrowUpRight,
  Award,
  Tv2,
  Film,
  Smartphone,
  Laptop,
  Monitor,
  Gamepad2,
  Tablet,
  Cast,
  Box,
  Apple,
  Menu,
  X,
  MessageCircle,
  Check,
  Sparkles,
  ArrowRight,
  Mail,
  ExternalLink,
  CreditCard,
  HelpCircle,
} from "lucide-react";

// ═══════════════════════════════════════════
// ANIMATIONS & UTILS
// ═══════════════════════════════════════════

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

const reviews = [
  { id: 1, name: "Marie Dubois", date: "Il y a 2 jours", rating: 5, title: "Excellent service, très stable", content: "Abonné depuis 6 mois et vraiment satisfait. Les chaînes françaises sont en parfaite qualité, aucune coupure. Le service client répond rapidement sur WhatsApp. Je recommande vivement !" },
  { id: 2, name: "Laurent Petit", date: "Il y a 5 jours", rating: 5, title: "Meilleur IPTV que j'ai testé", content: "J'ai essayé plusieurs services IPTV avant celui-ci. IPTV Smarters Pro est de loin le plus stable avec une activation instantanée. Les matchs de Ligue 1 sont impeccables en 4K." },
  { id: 3, name: "Sophie Martin", date: "Il y a 1 semaine", rating: 5, title: "Parfait pour toute la famille", content: "Nous avons pris l'abonnement 12 mois et c'est parfait. Les enfants regardent leurs dessins animés, mon mari les sports, et moi mes séries. Plus de 120 000 chaînes, on trouve tout !" },
  { id: 4, name: "Pierre Lefebvre", date: "Il y a 1 semaine", rating: 4, title: "Très bon rapport qualité-prix", content: "Service sérieux et professionnel. L'activation a pris seulement 3 minutes. Quelques micro-coupures de temps en temps mais rien de grave. Content de mon achat." },
  { id: 5, name: "Camille Bernard", date: "Il y a 2 semaines", rating: 5, title: "Installation facile et rapide", content: "Même pour quelqu'un qui n'est pas très technique comme moi, l'installation était super simple. Le guide étape par étape est très clair. Fonctionne parfaitement sur ma Smart TV Samsung." },
  { id: 6, name: "Thomas Rousseau", date: "Il y a 2 semaines", rating: 5, title: "Excellent pour le sport", content: "Fan de foot et de formule 1, j'ai tous les matchs en direct. La qualité 4K est incroyable, c'est comme être au stade. RMC Sport, Canal+, BeIN, tout est là !" },
  { id: 7, name: "Isabelle Moreau", date: "Il y a 3 semaines", rating: 5, title: "Service client au top", content: "J'avais un problème de configuration et le support m'a aidé en moins de 10 minutes via WhatsApp. Très réactifs et professionnels. Le service fonctionne à merveille maintenant." },
  { id: 8, name: "Antoine Simon", date: "Il y a 3 semaines", rating: 4, title: "Bon service, quelques améliorations possibles", content: "Dans l'ensemble très satisfait. Les chaînes françaises sont excellentes. J'aimerais juste avoir plus de chaînes africaines. Sinon rien à redire, service stable et fiable." },
  { id: 9, name: "Julie Garnier", date: "Il y a 1 mois", rating: 5, title: "Fonctionne sur tous mes appareils", content: "J'utilise l'abonnement sur mon iPhone, ma tablette et ma Fire TV Stick. Tout fonctionne parfaitement et je peux regarder dans toutes les pièces. Super pratique !" },
  { id: 10, name: "François Bonnet", date: "Il y a 1 mois", rating: 5, title: "Adieu Netflix et Canal+", content: "J'ai résilié tous mes abonnements streaming. Avec IPTV Smarters Pro j'ai tout ce qu'il me faut pour 10 fois moins cher. Films, séries, sports, documentaires... Un seul abonnement pour tout !" },
  { id: 11, name: "Nathalie Leroy", date: "Il y a 1 mois", rating: 5, title: "Qualité d'image exceptionnelle", content: "La qualité 4K est vraiment au rendez-vous. J'ai une TV 4K et l'image est parfaite. Les films et séries sont en haute définition, aucun souci de buffering." },
  { id: 12, name: "Julien Fournier", date: "Il y a 2 mois", rating: 5, title: "Abonnement 24 mois excellent", content: "J'ai pris l'offre 24 mois avec les 4 mois gratuits. Excellent investissement ! Ça fait maintenant 5 mois et jamais eu le moindre problème. Service ultra stable." },
];

const premiumPlans = [
  { title: "3 Mois", subtitle: "PREMIUM 4K", price: "27", cents: "00", href: "/produits/abonnement-iptv-premium-4k-3-mois", icon: Star, popular: false, bonus: undefined as string | undefined, gradient: "from-rose-500 to-pink-600" },
  { title: "6 Mois", subtitle: "PREMIUM 4K", price: "42", cents: "00", href: "/produits/abonnement-iptv-premium-4k-6-mois", icon: Gem, popular: false, bonus: undefined as string | undefined, gradient: "from-fuchsia-500 to-purple-600" },
  { title: "12 Mois", subtitle: "PREMIUM 4K", price: "69", cents: "00", href: "/produits/abonnement-iptv-premium-4k-12-mois", icon: Crown, popular: true, bonus: "+2 Mois Gratuit", gradient: "from-amber-500 to-red-500" },
  { title: "24 Mois", subtitle: "PREMIUM 4K", price: "100", cents: "00", href: "/produits/abonnement-iptv-premium-4k-24-mois", icon: Rocket, popular: false, bonus: "+4 Mois Gratuit", gradient: "from-red-500 to-rose-600" },
];

const standardPlans = [
  { title: "3 Mois", subtitle: "IPTV HD", price: "19", cents: "00", href: "/produits/abonnement-iptv-hd-3-mois", icon: Zap, popular: false, bonus: undefined as string | undefined, gradient: "from-cyan-500 to-blue-500" },
  { title: "6 Mois", subtitle: "IPTV HD", price: "22", cents: "00", href: "/produits/abonnement-iptv-hd-6-mois", icon: Star, popular: false, bonus: undefined as string | undefined, gradient: "from-purple-500 to-pink-500" },
  { title: "12 Mois", subtitle: "IPTV HD", price: "39", cents: "00", href: "/produits/abonnement-iptv-hd-12-mois", icon: Crown, popular: true, bonus: undefined as string | undefined, gradient: "from-amber-500 to-orange-500" },
  { title: "24 Mois", subtitle: "IPTV HD", price: "59", cents: "00", href: "/produits/abonnement-iptv-hd-24-mois", icon: Rocket, popular: false, bonus: undefined as string | undefined, gradient: "from-emerald-500 to-teal-500" },
];

const premiumFeatures = [
  { text: "Activation instantanée !", icon: "⚡" },
  { text: "Mise à jour gratuite", icon: "🔄" },
  { text: "120K+ chaînes & VOD", icon: "📺" },
  { text: "Chaînes 4K FHD HD", icon: "🎬" },
  { text: "Chaînes Premium", icon: "⭐" },
  { text: "Contenu adulte (+18)", icon: "🔞" },
  { text: "Rapide et stable", icon: "🚀" },
  { text: "M3U & MAG & Enigma", icon: "📱" },
  { text: "Smart TV & Mobile & PC", icon: "💻" },
  { text: "Serveur disponible", icon: "🔥" },
  { text: "Support 24/7", icon: "💬" },
];

const standardFeatures = [
  { text: "Activation instantanée !", icon: "⚡" },
  { text: "Mise à jour gratuite", icon: "🔄" },
  { text: "120K+ chaînes & VOD", icon: "📺" },
  { text: "Chaînes 4K FHD HD", icon: "🎬" },
  { text: "Chaînes Premium", icon: "⭐" },
  { text: "Rapide et stable", icon: "🚀" },
  { text: "M3U & MAG & Enigma", icon: "📱" },
  { text: "Smart TV & Mobile & PC", icon: "💻" },
  { text: "Serveur disponible", icon: "🔥" },
  { text: "Support 24/7", icon: "💬" },
];

const faqData = [
  { question: "Qu'est-ce qu' IPTV Smarters Pro ?", answer: "IPTV Smarters Pro est une application puissante permettant de regarder la télévision en direct, des films, des séries et des chaînes premium via un abonnement IPTV. Elle est compatible avec plusieurs appareils tels que Smart TV, Android, iOS, PC et Fire Stick." },
  { question: "Proposez-vous un abonnement IPTV pour IPTV Smarters Pro ?", answer: "Oui ! Nous proposons des abonnements IPTV de haute qualité compatibles avec IPTV Smarters Pro. Vous aurez accès à des milliers de chaînes internationales, du sport en direct, des films et des séries avec une qualité HD, Full HD et 4K." },
  { question: "Comment activer mon abonnement IPTV sur IPTV Smarters Pro ?", answer: "Immédiatement après votre souscription, un agent vous contactera par e-mail ou WhatsApp pour activer votre abonnement. L'activation est instantanée." },
  { question: "Quels sont les avantages d'un abonnement IPTV Smarters Pro ?", answer: "Les avantages incluent l'accès à plus de 160 000 chaînes mondiales en qualité jusqu'à 4K, une bibliothèque de plus de 20 000 films et séries VOD, une activation instantanée de votre service, et un support client disponible 24h/24 et 7j/7." },
  { question: "Mon abonnement IPTV ne fonctionne pas sur IPTV Smarters Pro, que faire ?", answer: "Si vous rencontrez des difficultés avec votre abonnement, veuillez contacter notre service d'assistance disponible 24/7 par e-mail ou via notre système de tickets. Notre équipe technique est là pour vous aider à résoudre le problème rapidement." },
  { question: "Quels appareils sont compatibles avec IPTV Smarters Pro ?", answer: "Nos abonnements IPTV fonctionnent sur : Smart TV Samsung et LG (WebOS, Tizen), Android TV et Box Android, Fire Stick et Fire TV, PC (Windows, Mac), ainsi que sur smartphones et tablettes (Android, iOS)." },
  { question: "Comment renouveler mon abonnement IPTV ?", answer: "Pour renouveler votre abonnement IPTV, il vous suffit de choisir un nouveau plan de 3, 6, ou 12 mois selon vos besoins et de procéder à l'achat sur notre site." },
  { question: "Votre service IPTV Smarters pro est-il légal et sécurisé ?", answer: "Oui, notre service IPTV est 100% légal et respecte toutes les réglementations en vigueur. De plus, nous incluons un VPN intégré dans nos abonnements pour garantir votre confidentialité et une connexion sécurisée." },
];

const features = [
  { icon: Tv2, title: "160,000+ Chaînes Mondiales", description: "Accédez à toutes les chaînes mondiales en qualité 4K, Full HD et HD. Sports, divertissement, actualités.", gradient: "from-red-600 to-red-800", stat: "4K", image: "/assets/feature-channels.png" },
  { icon: Film, title: "20,000+ VOD Films & Séries", description: "Bibliothèque illimitée de films et séries incluant Netflix, Amazon Prime et plus.", gradient: "from-red-700 to-rose-900", stat: "20K+", image: "/assets/feature-vod.png" },
  { icon: Zap, title: "Activation Instantanée", description: "Configuration instantanée par email ou WhatsApp. Commencez à regarder immédiatement.", gradient: "from-amber-600 to-red-700", stat: "5min", image: "/assets/feature-speed.png" },
  { icon: Headphones, title: "Support Client 24/7", description: "Notre équipe est disponible à tout moment pour vous aider par WhatsApp et email.", gradient: "from-red-800 to-pink-900", stat: "24/7", image: "/assets/feature-support.png" },
];

const devices = [
  { icon: Monitor, name: "Samsung TV" },
  { icon: Monitor, name: "LG TV" },
  { icon: Smartphone, name: "Android" },
  { icon: Apple, name: "iOS" },
  { icon: Laptop, name: "PC/Mac" },
  { icon: Cast, name: "Fire TV" },
  { icon: Gamepad2, name: "Xbox" },
  { icon: Box, name: "MAG Box" },
  { icon: Tablet, name: "Android TV" },
  { icon: Cast, name: "Chromecast" },
  { icon: Apple, name: "Apple TV" },
  { icon: Box, name: "Roku" },
];

const trustMetrics = [
  { icon: Users, value: "50K+", label: "Clients Satisfaits" },
  { icon: ArrowUpRight, value: "99.9%", label: "Disponibilité" },
  { icon: Award, value: "2020", label: "Depuis" },
  { icon: Clock, value: "Instant", label: "Activation" },
];

// ═══════════════════════════════════════════
// NETFLIX NAVIGATION
// ═══════════════════════════════════════════

function NetflixNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
          scrolled
            ? "bg-[#141414]/98 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex h-[68px] items-center justify-between px-4 md:px-12">
          {/* Logo */}
          <Link href="/home-2" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-lg blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp?width=96&height=96&resize=contain"
                  alt="IPTV Smarters Pro"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <span className="font-black text-xl tracking-tight">
              <span className="text-red-600">IPTV</span>{" "}
              <span className="text-white">SMARTERS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: "/home-2#features", label: "Fonctionnalités" },
              { href: "/home-2#pricing", label: "Abonnements" },
              { href: "/home-2#reviews", label: "Avis" },
              { href: "/home-2#faq", label: "FAQ" },
              { href: "/chaines", label: "Chaînes" },
              { href: "/blog", label: "Blog" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#pricing"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-colors duration-200"
            >
              S'abonner
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded flex items-center justify-center text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div className="absolute inset-0 bg-black/95" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[68px] left-0 right-0 bg-[#141414] border-t border-white/10 p-6">
            <nav className="flex flex-col gap-1">
              {[
                { href: "#features", label: "Fonctionnalités" },
                { href: "#pricing", label: "Abonnements" },
                { href: "#reviews", label: "Avis" },
                { href: "#faq", label: "FAQ" },
                { href: "/chaines", label: "Chaînes" },
                { href: "/blog", label: "Blog" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <div className="h-px bg-white/10 my-3" />
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 bg-red-600 text-white font-bold rounded-lg text-center text-sm"
              >
                S'abonner maintenant
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════
// CINEMATIC HERO
// ═══════════════════════════════════════════

function CinematicHero() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = end.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / 86400000),
          h: Math.floor((diff / 3600000) % 24),
          m: Math.floor((diff / 60000) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background cinematic layers */}
      <div className="absolute inset-0 bg-[#141414]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(229,9,20,0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(229,9,20,0.08),transparent_60%)]" />
      
      {/* Animated grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/50 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-red-500/60 rounded-full nf-float-1" />
        <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-red-400/40 rounded-full nf-float-2" />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-white/20 rounded-full nf-float-3" />
        <div className="absolute top-[30%] right-[30%] w-0.5 h-0.5 bg-red-500/50 rounded-full nf-float-1" />
        <div className="absolute top-[70%] left-[60%] w-1 h-1 bg-white/15 rounded-full nf-float-2" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 w-full pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Top badge */}
        <div className="nf-fade-up mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-red-600/20 border border-red-600/30">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-400">
              N°1 en France • +50,000 clients
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="nf-fade-up nf-delay-1">
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-[1.05] tracking-tight max-w-4xl">
            Le Streaming
            <br />
            <span className="text-red-600">Sans Limites</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="nf-fade-up nf-delay-2 mt-5">
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Accédez à plus de{" "}
            <span className="text-white font-semibold">160,000 chaînes</span> en
            4K, des milliers de films et séries VOD. Activation instantanée sur
            tous vos appareils avec{" "}
            <span className="text-red-500 font-semibold">IPTV Smarters Pro</span>.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="nf-fade-up nf-delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded transition-all duration-200 shadow-[0_0_40px_rgba(229,9,20,0.3)] hover:shadow-[0_0_60px_rgba(229,9,20,0.5)]"
          >
            <Play className="w-5 h-5 fill-white" />
            Commencer maintenant
          </a>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded backdrop-blur-sm transition-all duration-200"
          >
            <Info className="w-5 h-5" />
            En savoir plus
          </a>
        </div>

        {/* Stats row */}
        <div className="nf-fade-up nf-delay-4 mt-12 flex flex-wrap gap-6 md:gap-10">
          {[
            { value: "160K+", label: "Chaînes", icon: Globe },
            { value: "20K+", label: "Films & Séries", icon: Film },
            { value: "4K", label: "Ultra HD", icon: Tv2 },
            { value: "24/7", label: "Support", icon: Headphones },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown banner */}
        <div className="nf-fade-up nf-delay-5 mt-12">
          <a href="#pricing" className="group inline-flex items-center gap-4 md:gap-6 px-6 py-3 rounded-lg bg-black/60 border border-red-600/30 hover:border-red-600/60 backdrop-blur-sm transition-all">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">-70% Offre limitée</span>
            </div>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex gap-2">
              {[
                { v: timeLeft.d, l: "J" },
                { v: timeLeft.h, l: "H" },
                { v: timeLeft.m, l: "M" },
                { v: timeLeft.s, l: "S" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-0.5">
                  <span className="bg-red-600/20 rounded px-1.5 py-0.5 text-sm font-black text-white tabular-nums min-w-[28px] text-center">
                    {t.v.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold">{t.l}</span>
                </div>
              ))}
            </div>
            <span className="px-4 py-1.5 bg-red-600 rounded text-xs font-bold text-white group-hover:bg-red-500 transition-colors">
              En profiter →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// CONTENT ROW (Netflix-style horizontal row)
// ═══════════════════════════════════════════

function ContentRow({ title, children }: { title: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/row mb-10 md:mb-14">
      <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 px-4 md:px-12">{title}</h2>
      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}
        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-4 md:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// FEATURES SECTION
// ═══════════════════════════════════════════

function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#141414] pt-8 pb-16 overflow-hidden">
      {/* Netflix red line separator */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />

      <ContentRow title="Pourquoi IPTV Smarters Pro ?">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="nf-card flex-shrink-0 w-[280px] md:w-[320px] group/card relative rounded-md overflow-hidden cursor-pointer"
            >
              <div className={`h-[180px] bg-gradient-to-br ${f.gradient} relative flex items-center justify-center`}>
                <Icon className="w-16 h-16 text-white/30 group-hover/card:text-white/50 transition-colors group-hover/card:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#181818] to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded text-xs font-bold text-white">
                  {f.stat}
                </div>
              </div>
              <div className="bg-[#181818] p-4 border-t-2 border-red-600">
                <h3 className="text-white font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
              </div>
            </div>
          );
        })}
      </ContentRow>

      {/* Devices row */}
      <ContentRow title="Compatible avec tous vos appareils">
        {devices.map((d, i) => {
          const Icon = d.icon;
          return (
            <div
              key={i}
              className="nf-card flex-shrink-0 w-[130px] md:w-[150px] group/card rounded-md overflow-hidden"
            >
              <div className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 hover:border-red-600/30 rounded-md p-5 text-center transition-all duration-300 group-hover/card:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-red-600/10 flex items-center justify-center group-hover/card:bg-red-600/20 transition-colors">
                  <Icon className="w-6 h-6 text-gray-400 group-hover/card:text-red-500 transition-colors" />
                </div>
                <p className="text-white text-xs font-semibold">{d.name}</p>
              </div>
            </div>
          );
        })}
      </ContentRow>
    </section>
  );
}

// ═══════════════════════════════════════════
// ON DEMAND BANNER
// ═══════════════════════════════════════════

function OnDemandSection() {
  return (
    <section className="bg-[#141414] px-4 md:px-12 pb-14">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-red-900/30 via-red-800/20 to-red-900/30 border border-red-600/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.1),transparent_70%)]" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 border border-red-600/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">À la demande</span>
            </div>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
              Vous souhaitez une chaîne ou un film en particulier ?{" "}
              <span className="text-white font-bold">Contactez-nous</span>, nous l'ajoutons à votre abonnement{" "}
              <span className="text-red-500 font-bold">gratuitement sous 24h</span> !
            </p>
            <a
              href="https://wa.me/212628461599"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Demander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// PRICING SECTION (Netflix-style)
// ═══════════════════════════════════════════

function PricingSection() {
  const [tier, setTier] = useState<"premium" | "standard">("premium");

  const plans = tier === "premium" ? premiumPlans : standardPlans;
  const featuresList = tier === "premium" ? premiumFeatures : standardFeatures;

  return (
    <section id="pricing" className="relative bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
            Choisissez votre <span className="text-red-600">abonnement</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Des plans flexibles pour tous les budgets, sans engagement
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
            <button
              onClick={() => setTier("premium")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${
                tier === "premium"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Crown className="w-4 h-4" />
              Premium 4K
            </button>
            <button
              onClick={() => setTier("standard")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${
                tier === "standard"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              IPTV HD
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={`${tier}-${i}`}
                className={`nf-fade-up group relative rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "ring-2 ring-red-600 shadow-[0_0_40px_rgba(229,9,20,0.2)]"
                    : "border border-white/5 hover:border-red-600/30"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider z-10">
                    {tier === "premium" ? "Meilleure Offre" : "Plus Populaire"}
                  </div>
                )}

                <div className={`bg-[#1a1a1a] p-6 h-full flex flex-col ${plan.popular ? "pt-10" : ""}`}>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{plan.title}</h3>
                      <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{plan.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-white/5">
                    <div className="flex items-end gap-1">
                      <span className="text-gray-500 text-lg">€</span>
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-500 text-sm mb-2">.{plan.cents}</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">paiement unique</p>
                    {plan.bonus && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold py-1 px-3 rounded">
                        <Gift className="w-3.5 h-3.5" />
                        {plan.bonus}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-2.5 mb-6">
                    {featuresList.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-300 text-xs">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={plan.href}
                    className={`block w-full py-3.5 rounded font-bold text-center text-sm transition-all duration-300 ${
                      plan.popular
                        ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                        : "bg-white/10 hover:bg-red-600 text-white"
                    }`}
                  >
                    Choisir ce plan
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500 text-xs">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Paiement SSL Sécurisé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Activation Instantanée</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-500" />
            <span>Garantie 24h Remboursement</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// QUALITY + TRUST SECTION
// ═══════════════════════════════════════════

function QualityTrustSection() {
  return (
    <section className="bg-[#141414] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        {/* Trust metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {trustMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="group bg-[#1a1a1a] border border-white/5 hover:border-red-600/30 rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-white mb-1">{m.value}</p>
                <p className="text-gray-500 text-xs">{m.label}</p>
              </div>
            );
          })}
        </div>

        {/* VPN Banner */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-green-900/20 via-green-800/10 to-green-900/20 border border-green-600/20 p-8 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-green-600/20 flex items-center justify-center">
              <Eye className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                IPTV 100% Intraçable avec VPN Intégré
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Notre service inclut une <span className="text-green-400 font-semibold">protection VPN automatique</span> qui masque complètement votre activité. 
                Votre FAI ne peut pas détecter que vous utilisez notre service. <span className="text-green-400 font-bold">Anonymat total garanti.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Security grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Lock, title: "VPN Intégré Gratuit", desc: "Protection automatique sans configuration. Activée dès la première utilisation.", color: "green" },
            { icon: Shield, title: "Totalement Anonyme", desc: "Votre FAI ne peut pas voir que vous utilisez l'IPTV. Trafic chiffré en permanence.", color: "blue" },
            { icon: Server, title: "Serveurs Sécurisés", desc: "Chiffrement militaire sur serveurs européens. Données 100% privées.", color: "purple" },
          ].map((item, i) => {
            const Icon = item.icon;
            const colors: Record<string, string> = {
              green: "border-green-600/20 hover:border-green-600/40",
              blue: "border-blue-600/20 hover:border-blue-600/40",
              purple: "border-purple-600/20 hover:border-purple-600/40",
            };
            const iconColors: Record<string, string> = {
              green: "text-green-400 bg-green-600/10",
              blue: "text-blue-400 bg-blue-600/10",
              purple: "text-purple-400 bg-purple-600/10",
            };
            return (
              <div key={i} className={`bg-[#1a1a1a] border ${colors[item.color]} rounded-lg p-6 transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-lg ${iconColors[item.color]} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Quality features row */}
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
          Pourquoi nous <span className="text-red-600">choisir</span> ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Server, gradient: "from-blue-600 to-cyan-600", title: "Stabilité & Qualité 4K", desc: "Serveur dédié européen de haute qualité avec connexion 20 Gbps. Ouverture des chaînes en moins de 0,5 seconde.", stat: "20 Gbps" },
            { icon: Zap, gradient: "from-amber-600 to-orange-600", title: "Activation Instantanée", desc: "Après la souscription, notre agent vous contacte via email ou WhatsApp. L'activation est instantanée.", stat: "5 min" },
            { icon: Headphones, gradient: "from-emerald-600 to-teal-600", title: "Assistance 24h/7j", desc: "Assistance par ticket et e-mail 24h/24 et 7j/7. Contactez-nous pour toute aide.", stat: "24/7" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group bg-[#1a1a1a] border border-white/5 hover:border-red-600/20 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-1 bg-gradient-to-r ${f.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-black text-red-500">{f.stat}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// REVIEWS SECTION (Netflix style)
// ═══════════════════════════════════════════

function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let pos = 0;

    const scroll = () => {
      if (!isPaused && container) {
        pos += 0.5;
        if (pos >= container.scrollWidth / 2) pos = 0;
        container.scrollLeft = pos;
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section id="reviews" className="bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
              Ce que disent nos <span className="text-red-600">clients</span>
            </h2>
            <p className="text-gray-500 text-sm">Plus de 15 000 clients satisfaits nous font confiance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-black text-xl">4.9/5</span>
            <span className="text-gray-500 text-sm">(2,847 avis)</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden px-4 md:px-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: "auto" }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className="flex-shrink-0 w-[340px] bg-[#1a1a1a] border border-white/5 rounded-lg p-5 hover:border-red-600/20 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Stars */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-700 text-gray-700"}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Vérifié
              </span>
            </div>

            <h3 className="text-white font-bold text-sm mb-2 line-clamp-1">{r.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{r.content}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div>
                <p className="text-white text-xs font-semibold">{r.name}</p>
                <p className="text-gray-600 text-[10px]">{r.date}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 text-xs font-bold">
                {r.name.charAt(0)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-600 text-xs">Défilement automatique • Survolez pour mettre en pause</p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#141414] py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Questions <span className="text-red-600">Fréquentes</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Tout ce que vous devez savoir sur IPTV Smarters Pro
          </p>
        </div>

        <div className="space-y-2">
          {faqData.map((item, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 rounded-lg text-left transition-all duration-300 ${
                  openIdx === i
                    ? "bg-red-600/10 border border-red-600/20"
                    : "bg-[#1a1a1a] border border-white/5 hover:border-red-600/10"
                }`}
              >
                <span className={`font-semibold text-sm pr-4 transition-colors ${openIdx === i ? "text-white" : "text-gray-300"}`}>
                  {item.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center transition-all duration-300 ${
                  openIdx === i ? "bg-red-600 rotate-180" : "bg-white/5"
                }`}>
                  <ChevronDown className={`w-4 h-4 ${openIdx === i ? "text-white" : "text-gray-500"}`} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-[300px]" : "max-h-0"}`}>
                <div className="px-5 pb-5 pt-3">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm mb-3">Vous avez d&apos;autres questions ?</p>
          <a
            href="https://wa.me/212628461599"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600/10 border border-red-600/30 text-red-400 rounded text-sm font-semibold hover:bg-red-600/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════

function NetflixFooter() {
  return (
    <footer className="bg-[#0a0a0a] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        {/* CTA banner */}
        <div className="relative rounded-lg overflow-hidden mb-14">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-red-800/20 to-red-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15),transparent_60%)]" />
          <div className="relative z-10 p-10 md:p-14 text-center">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
              Prêt à commencer votre expérience TV <span className="text-red-600">ultime</span> ?
            </h3>
            <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm">
              Rejoignez plus de 50,000 clients satisfaits. 160,000 chaînes en qualité 4K.
            </p>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors text-sm"
            >
              S&apos;abonner maintenant
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded overflow-hidden">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-black text-lg text-white">IPTV <span className="text-red-600">SMARTERS PRO</span></span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed max-w-sm mb-4">
              IPTV SMARTERS PRO est l&apos;un des principaux fournisseurs mondiaux de technologie IPTV. Notre mission est de fournir le meilleur service de streaming à nos clients.
            </p>
            <a href="mailto:support@example.com" className="inline-flex items-center gap-1.5 text-red-400 text-xs hover:text-red-300 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              support@example.com
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {[
                { href: "/tutoriels", text: "Comment utiliser" },
                { href: "/confidentialite", text: "Politique de confidentialité" },
                { href: "/blog", text: "Blog IPTV" },
                { href: "/remboursement", text: "Politique de remboursement" },
                { href: "/chaines", text: "Chaînes IPTV" },
              ].map((l) => (
                <li key={l.text}>
                  <Link href={l.href} className="text-gray-500 hover:text-white text-xs transition-colors">
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Partenaires</h4>
            <ul className="space-y-2">
              {[
                { href: "#", text: "Meilleur abonnement IPTV" },
                { href: "#", text: "IPTV France" },
              ].map((l) => (
                <li key={l.text}>
                  <a href={l.href} className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Payment methods */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600 text-xs">Méthodes de paiement:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "G Pay", "Crypto"].map((m) => (
              <div key={m} className="px-3 py-1.5 bg-[#1a1a1a] border border-white/5 rounded text-[10px] text-gray-400 font-semibold">
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-xs">Copyright 2026 © All Rights are Reserved</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Confidentialité</Link>
            <Link href="/terms-of-use" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Conditions</Link>
          </div>
        </div>

        {/* DMCA */}
        <div className="mt-6 p-5 rounded-lg bg-[#1a1a1a] border border-white/5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-400 font-bold text-xs mb-1">DMCA Compliance & Copyright Protection</h4>
              <p className="text-gray-700 text-[10px] leading-relaxed">
                We are fully compliant with DMCA regulations. We do not host, upload, or store any video content on our servers. All content is provided by independent third-party sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════

export default function NetflixHome() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <NetflixNav />
      <CinematicHero />
      <FeaturesSection />
      <OnDemandSection />
      <PricingSection />
      <QualityTrustSection />
      <ReviewsSection />
      <FaqSection />
      <NetflixFooter />
    </main>
  );
}
