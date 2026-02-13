"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/abonnement-iptv/', label: 'Accueil' },
  { href: '/chaines', label: 'Chaînes' },
  { href: '/blog', label: 'Blog' },
  { href: '/abonnement-iptv/#faq', label: 'FAQ' },
];

const NavigationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Use rAF-throttled scroll handler to avoid forced reflows
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[1000] transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-sm border-b border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/abonnement-iptv/" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-transparent">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp?width=96&height=96&resize=contain"
                  alt="IPTV Smarters Pro Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' }}
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white">
                IPTV <span className="text-cyan-400">SMARTERS PRO</span>
              </span>
              <span className="text-[10px] text-cyan-400/60 uppercase tracking-[0.2em]">Abonnement IPTV</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-1/2 transition-[width] duration-200" />
              </Link>
            ))}
            
            {/* Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMenuDropdownOpen(true)}
              onMouseLeave={() => setMenuDropdownOpen(false)}
            >
              <button
                className="relative px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group flex items-center gap-1"
              >
                <span className="relative z-10">Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-1/2 transition-[width] duration-200" />
              </button>
              
              {/* Dropdown */}
              <div className={`absolute top-full left-0 mt-2 w-56 transition-[opacity,transform] duration-200 ${
                menuDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-black/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden">
                  <Link
                    href="/tutoriels"
                    className="block px-5 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-cyan-500/10 transition-colors duration-200"
                  >
                    Comment l'utiliser
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/abonnement-iptv/#pricing"
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-8 py-3 bg-black rounded-full border border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">S'abonner</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95" onClick={closeMenu} />
        <div className={`absolute top-24 left-4 right-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/20 p-8 transition-[opacity,transform] duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="px-5 py-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-500/20 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Menu Dropdown */}
            <Link
              href="/tutoriels"
              onClick={closeMenu}
              className="px-5 py-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-500/20 transition-colors duration-200 font-medium"
            >
              Comment l'utiliser
            </Link>
            
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-4" />
            <Link
              href="/abonnement-iptv/#pricing"
              onClick={closeMenu}
              className="px-5 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-center"
            >
              S'abonner maintenant
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;