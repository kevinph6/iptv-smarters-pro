'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Settings, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { getCookieConsent, setCookieConsent, type CookieConsent } from '@/lib/cookie-consent';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookieConsent(allConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setCookieConsent(minimalConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent(consent);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={() => setShowBanner(false)}
      />
      
        <div className="fixed bottom-4 right-4 z-[9999] animate-in slide-in-from-bottom duration-500">
          <div className="w-[400px] max-w-[calc(100vw-2rem)] bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            
            <div className="relative p-5">
            <button
              onClick={handleRejectAll}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                <Cookie className="w-8 h-8 text-cyan-400" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  Cookies et Confidentialité
                  <Shield className="w-5 h-5 text-cyan-400" />
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience sur <strong className="text-cyan-400">IPTV SMARTERS PRO</strong>. 
                  Les cookies essentiels sont nécessaires au fonctionnement du site. Vous pouvez accepter ou refuser les cookies non-essentiels.
                </p>
              </div>
            </div>

            {!showSettings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-cyan-400" />
                    Cookies Essentiels
                  </h3>
                  <p className="text-xs text-white/60">Nécessaires au fonctionnement (toujours actifs)</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    Conformité RGPD
                  </h3>
                  <p className="text-xs text-white/60">Protection de vos données personnelles</p>
                </div>
              </div>
            )}

            {showSettings && (
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-sm">Cookies Essentiels</h3>
                      <p className="text-xs text-white/60 mt-1">Requis pour le fonctionnement du site (authentification, sécurité)</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                        Toujours actif
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">Cookies Analytiques</h3>
                      <p className="text-xs text-white/60 mt-1">Nous aident à comprendre l'utilisation du site (Google Analytics)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={consent.analytics}
                        onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">Cookies Marketing</h3>
                      <p className="text-xs text-white/60 mt-1">Publicité ciblée et réseaux sociaux (Facebook, Google Ads)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">Cookies de Préférences</h3>
                      <p className="text-xs text-white/60 mt-1">Mémorisent vos paramètres et préférences de streaming</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={consent.preferences}
                        onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Settings className="w-4 h-4" />
                {showSettings ? 'Masquer les paramètres' : 'Personnaliser'}
                {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSettings ? (
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
                >
                  Enregistrer mes préférences
                </button>
              ) : (
                <>
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Refuser tout
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
                  >
                    Accepter tout
                  </button>
                </>
              )}
            </div>

            <p className="text-xs text-white/50 text-center mt-4">
              En utilisant notre site, vous acceptez notre{' '}
              <Link href="/confidentialite" className="text-cyan-400 hover:text-cyan-300 underline">
                Politique de Confidentialité
              </Link>
              . Vos données sont protégées selon le RGPD.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
