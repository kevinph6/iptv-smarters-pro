"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const CONSENT_KEY = "iptv-gdpr-consent";

export default function GdprConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasConsent = typeof window !== "undefined" && localStorage.getItem(CONSENT_KEY);
    if (!hasConsent) {
      setOpen(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[380px]">
      <div className="rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-white space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="space-y-1 text-sm leading-relaxed">
            <p className="font-semibold text-white">Cookies & conformité RGPD</p>
            <p className="text-white/70">
              Nous utilisons des cookies essentiels et de mesure d'audience pour sécuriser et améliorer votre expérience IPTV SMARTERS PRO.
              Consultez notre politique de confidentialité pour en savoir plus.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={accept}
            className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(6,182,212,0.35)] hover:opacity-95 transition"
          >
            Accepter
          </button>
          <Link
            href="/confidentialite"
            className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/30 transition"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}
