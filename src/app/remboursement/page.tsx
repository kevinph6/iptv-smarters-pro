import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { Shield, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Remboursement - Abonnement IPTV SMARTERS PRO',
  description: 'Conditions de remboursement pour votre abonnement IPTV SMARTERS PRO. Garantie de satisfaction, delais et procedure de demande de remboursement.',
  keywords: [
    'remboursement iptv', 'politique remboursement', 'garantie iptv',
    'abonnement iptv smarters pro', 'satisfaction client',
  ],
  alternates: { canonical: '/remboursement' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/remboursement',
    title: 'Politique de Remboursement - IPTV SMARTERS PRO',
    description: 'Conditions de remboursement. Garantie de satisfaction.',
    siteName: 'IPTV SMARTERS PRO',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IPTV SMARTERS PRO - Remboursement', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de Remboursement - IPTV SMARTERS PRO',
    description: 'Conditions de remboursement. Garantie de satisfaction.',
    images: ['/og-image.jpg'],
  },
};

export default function RefundPolicyPage() {
  return (
    <main id="main" className="min-h-screen bg-black">
      <NavigationHeader />
      <div className="pt-20"><BreadcrumbNav items={[{ label: 'Politique de Remboursement' }]} /></div>
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-8">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Politique de Remboursement
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
            Conditions de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Remboursement</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Politique claire et transparente pour votre <span className="text-cyan-400 font-semibold">abonnement IPTV SMARTERS PRO</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Important Notice */}
          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important</h3>
                <p className="text-white/70 leading-relaxed">
                  En raison de la nature numérique de notre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong>, 
                  les remboursements sont soumis à des conditions strictes. Veuillez lire attentivement cette politique avant de souscrire.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-cyan-400" />
                Période de Garantie
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Nous offrons une <strong className="text-white">garantie de 24 heures</strong> pour tous nos abonnements IPTV. 
                  Cette période commence dès l'activation de votre abonnement IPTV SMARTERS PRO.
                </p>
                <p>
                  Durant cette période de 24 heures, vous pouvez demander un remboursement complet si le service IPTV ne fonctionne pas 
                  correctement sur votre appareil compatible (Smart TV, Android, iOS, Fire TV, etc.).
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Conditions de Remboursement Acceptées
              </h2>
              <ul className="space-y-3">
                {[
                  'Problèmes techniques majeurs empêchant l\'utilisation du service IPTV',
                  'Impossibilité d\'activer votre abonnement IPTV SMARTERS PRO après 24 heures',
                  'Serveurs IPTV instables avec buffering constant (après test de connexion)',
                  'Chaînes IPTV principales non fonctionnelles (plus de 50% des chaînes)',
                  'Qualité de streaming inférieure à celle promise (4K, Full HD, HD)',
                ].map((condition, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400" />
                Conditions de Remboursement Refusées
              </h2>
              <ul className="space-y-3">
                {[
                  'Demande de remboursement après la période de garantie de 24 heures',
                  'Changement d\'avis après activation de l\'abonnement IPTV',
                  'Problèmes liés à votre connexion internet ou bande passante insuffisante',
                  'Incompatibilité avec des appareils non listés comme compatibles',
                  'Utilisation de l\'abonnement IPTV SMARTERS PRO sur plus d\'appareils que prévu',
                  'Partage des identifiants IPTV avec d\'autres personnes',
                  'Violation des conditions d\'utilisation du service IPTV',
                ].map((condition, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/70">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Procédure de Demande de Remboursement
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Pour demander un remboursement pour votre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong>, 
                  veuillez suivre ces étapes :
                </p>
                <ol className="space-y-3 list-decimal list-inside ml-4">
                  <li>Contactez notre support client par email ou WhatsApp dans les 24 heures</li>
                  <li>Fournissez votre numéro de commande et détails de l'abonnement IPTV</li>
                  <li>Décrivez précisément le problème technique rencontré</li>
                  <li>Envoyez des captures d'écran ou vidéos démontrant le dysfonctionnement</li>
                  <li>Attendez la vérification de notre équipe technique (sous 6 heures)</li>
                  <li>Si approuvé, le remboursement sera traité sous 5-7 jours ouvrés</li>
                </ol>
              </div>
            </div>

            {/* Section 5 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Délais de Remboursement
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Une fois votre demande de remboursement approuvée pour votre <strong className="text-white">abonnement IPTV</strong> :
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Carte bancaire : 5-7 jours ouvrés</li>
                  <li>• PayPal : 3-5 jours ouvrés</li>
                  <li>• Virement bancaire : 7-10 jours ouvrés</li>
                  <li>• Cryptomonnaie : 24-48 heures</li>
                </ul>
                <p className="mt-4">
                  Le montant remboursé sera celui de votre abonnement IPTV SMARTERS PRO moins les frais de transaction (si applicable).
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Support et Assistance IPTV
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Avant de demander un remboursement, nous vous encourageons à contacter notre 
                  <strong className="text-white"> support client 24h/7j</strong>. 
                  Notre équipe technique peut résoudre la plupart des problèmes liés à votre abonnement IPTV :
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Configuration de l'application IPTV SMARTERS PRO</li>
                  <li>• Optimisation des paramètres de streaming IPTV</li>
                  <li>• Résolution des problèmes de buffering</li>
                  <li>• Mise à jour des listes de chaînes IPTV</li>
                  <li>• Assistance pour tous vos appareils compatibles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Questions sur notre Politique de Remboursement ?
            </h2>
            <p className="text-center text-white/70 mb-6">
              Notre équipe support est disponible 24h/7j pour répondre à vos questions sur votre abonnement IPTV SMARTERS PRO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/abonnement-iptv/#contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full text-center hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                Contacter le Support
              </Link>
              <Link
                href="/abonnement-iptv/#pricing"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full text-center hover:bg-white/10 transition-all duration-300"
              >
                Voir les Abonnements IPTV
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
