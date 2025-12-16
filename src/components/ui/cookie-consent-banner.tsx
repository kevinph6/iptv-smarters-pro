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

              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                  <Cookie className="w-5 h-5 text-cyan-400" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    Cookies
                    <Shield className="w-4 h-4 text-cyan-400" />
                  </h2>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter ou refuser les cookies non-essentiels.
                  </p>
                </div>
              </div>



              {showSettings && (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-xs">Essentiels</h3>
                        <p className="text-[10px] text-white/60 mt-0.5">Requis pour le site</p>
                      </div>
                      <div className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold rounded-full">
                        Actif
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-xs">Analytiques</h3>
                        <p className="text-[10px] text-white/60 mt-0.5">Google Analytics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-3">
                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                      </label>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-xs">Marketing</h3>
                        <p className="text-[10px] text-white/60 mt-0.5">Publicité ciblée</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-3">
                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                      </label>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-xs">Préférences</h3>
                        <p className="text-[10px] text-white/60 mt-0.5">Paramètres</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-3">
                        <input
                          type="checkbox"
                          checked={consent.preferences}
                          onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {!showSettings && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Personnaliser
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}

                {showSettings ? (
                  <>
                    <button
                      onClick={handleSavePreferences}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="w-full px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                      Retour
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleRejectAll}
                      className="px-4 py-2.5 bg-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      Accepter
                    </button>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-white/50 text-center mt-3">
                <Link href="/confidentialite" className="text-cyan-400 hover:text-cyan-300 underline">
                  Politique de Confidentialité
                </Link>
              </p>
          </div>
        </div>
      </div>
    </>
  );
}
