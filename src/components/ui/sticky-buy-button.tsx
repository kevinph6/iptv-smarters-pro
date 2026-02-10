"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

interface StickyBuyButtonProps {
  checkoutUrl: string;
  price: string;
  gradient: string;
}

export function StickyBuyButton({ checkoutUrl, price, gradient }: StickyBuyButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`md:hidden fixed bottom-6 left-6 right-6 z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <a 
        href={checkoutUrl} 
        className={`w-full py-5 rounded-2xl bg-gradient-to-r ${gradient} text-white font-black text-center shadow-2xl flex items-center justify-center gap-3 uppercase tracking-tight active:scale-[0.95] transition-transform`}
      >
        <ShoppingCart className="w-5 h-5" />
        Activer — {price}€
      </a>
    </div>
  );
}
