import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Accès Limité - IPTV SMARTERS PRO',
  description: 'Service disponible uniquement en France et territoires français.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GeoRestrictedPage({
  searchParams,
}: {
  searchParams: Promise<{ blocked_country?: string }>;
}) {
  const params = await searchParams;
  const blockedCountry = params.blocked_country;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-3 px-6 py-4">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp"
            alt="IPTV SMARTERS PRO Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-white">IPTV SMARTERS PRO</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-3xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="text-6xl">🔒</span>
              <h1 className="text-4xl font-black md:text-5xl">
                Accès Limité à{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  IPTV SMARTERS PRO
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-300 md:text-xl">
              Merci de votre intérêt pour IPTV SMARTERS PRO. Malheureusement, notre service est actuellement 
              disponible uniquement pour les utilisateurs situés en France et dans les territoires français.
            </p>
            
            {/* Show detected country */}
            {blockedCountry && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-gray-300">
                  Pays détecté: <span className="font-bold text-red-500">{blockedCountry}</span>
                </span>
              </div>
            )}
          </div>

          {/* Restriction Info Box */}
          <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
            <p className="mb-6 text-gray-300">
              Nous restreignons l&apos;accès pour garantir la meilleure expérience à nos clients français 
              et nous conformer aux réglementations de licence.
            </p>

            <div className="mb-4 flex items-start gap-3">
              <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-red-500" />
              <div>
                <h2 className="mb-2 text-xl font-bold text-white">
                  Êtes-vous en dehors de la France?
                </h2>
                <p className="text-gray-300">
                  Si vous voyez ce message et que vous êtes physiquement en France, veuillez:
                </p>
              </div>
            </div>

            <ul className="ml-9 space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-purple-500">•</span>
                <span>Désactiver tout service VPN ou proxy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-purple-500">•</span>
                <span>Recharger la page</span>
              </li>
            </ul>
          </div>

          {/* Allowed Regions */}
          <div className="mb-8 rounded-2xl border border-green-700/50 bg-green-900/20 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">
              Régions autorisées:
            </h3>
            <div className="grid grid-cols-1 gap-3 text-gray-300 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇫🇷</span>
                <span>France (métropolitaine)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇧🇪</span>
                <span>Belgique</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇬🇫</span>
                <span>Guyane française</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇬🇵</span>
                <span>Guadeloupe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇶</span>
                <span>Martinique</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇫</span>
                <span>Saint-Martin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇧🇱</span>
                <span>Saint-Barthélemy</span>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-start gap-3">
              <MessageCircle className="mt-1 h-6 w-6 flex-shrink-0 text-purple-500" />
              <h2 className="text-xl font-bold text-white">Besoin d&apos;aide?</h2>
            </div>
            
            <p className="mb-6 text-gray-300">
              Si vous pensez avoir reçu ce message par erreur, veuillez contacter notre équipe d&apos;assistance.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500" />
                <div>
                  <span className="font-semibold text-red-500">Email:</span>{' '}
                  <a 
                    href="mailto:support@iptvsmarterspro.fr" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    support@iptvsmarterspro.fr
                  </a>
                </div>
              </div>
              
              {/* TEMPORARILY HIDDEN — WhatsApp contact */}
              <div className="hidden items-center gap-3">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <div>
                  <span className="font-semibold text-red-500">WhatsApp:</span>{' '}
                  <a 
                    href="https://wa.me/33123456789" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              IPTV SMARTERS PRO © 2025 - Service IPTV Premium France
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}