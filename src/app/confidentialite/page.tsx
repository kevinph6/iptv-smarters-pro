import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Lock, Shield, Eye, Database, UserCheck, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialite - Abonnement IPTV SMARTERS PRO',
  description: 'Protection de vos donnees personnelles pour votre abonnement IPTV SMARTERS PRO. Conformite RGPD, securite et confidentialite garanties.',
  keywords: [
    'confidentialite iptv', 'protection donnees', 'rgpd iptv',
    'securite abonnement iptv', 'vie privee smarters pro',
  ],
  alternates: { canonical: '/confidentialite' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/confidentialite',
    title: 'Politique de Confidentialite - IPTV SMARTERS PRO',
    description: 'Protection de vos donnees personnelles. Conformite RGPD.',
    siteName: 'IPTV SMARTERS PRO',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IPTV SMARTERS PRO - Confidentialité', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de Confidentialite - IPTV SMARTERS PRO',
    description: 'Protection de vos donnees personnelles. Conformite RGPD.',
    images: ['/og-image.jpg'],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationHeader />
      <div className="pt-20"><BreadcrumbNav items={[{ label: 'Politique de Confidentialite' }]} /></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-8">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Politique de Confidentialité
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
            Protection de vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Données</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Nous prenons la confidentialité de votre <span className="text-cyan-400 font-semibold">abonnement IPTV SMARTERS PRO</span> très au sérieux
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <p className="text-white/70 leading-relaxed">
              <strong className="text-white">IPTV SMARTERS PRO</strong> s'engage à protéger la confidentialité de tous les utilisateurs 
              de notre service <strong className="text-white">abonnement IPTV</strong>. Cette politique explique comment nous collectons, 
              utilisons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              <strong className="text-white">Dernière mise à jour :</strong> 15 Janvier 2025
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-cyan-400" />
                Collecte des Données
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Lors de la souscription à votre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong>, nous collectons les informations suivantes :
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Informations personnelles :</strong> Nom, prénom, adresse email pour l'activation de votre abonnement IPTV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Informations de paiement :</strong> Données de transaction (cryptées) pour sécuriser votre abonnement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Informations techniques :</strong> Adresse IP, type d'appareil, système d'exploitation pour optimiser le service IPTV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Données d'utilisation :</strong> Chaînes IPTV regardées, durée de connexion, VOD consultés (anonymisées)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Identifiants de connexion :</strong> Codes M3U, URL de streaming pour votre application IPTV SMARTERS PRO</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-400" />
                Utilisation des Données
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Les données collectées sont utilisées exclusivement pour :
                </p>
                <ul className="space-y-3">
                  {[
                    'Activer et gérer votre abonnement IPTV SMARTERS PRO',
                    'Fournir un accès aux 160 000+ chaînes IPTV et 20 000+ VOD',
                    'Améliorer la qualité du streaming IPTV (4K, Full HD, HD)',
                    'Assurer le support client 24h/7j pour votre abonnement IPTV',
                    'Envoyer des notifications importantes concernant votre service IPTV',
                    'Prévenir la fraude et protéger nos serveurs IPTV',
                    'Optimiser la stabilité et performance de notre réseau IPTV',
                  ].map((usage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <UserCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{usage}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-cyan-400 font-semibold">
                  Nous ne vendons JAMAIS vos données personnelles à des tiers.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                Sécurité des Données
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Votre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong> est protégé par des mesures de sécurité avancées :
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      icon: <Lock className="w-5 h-5 text-cyan-400" />,
                      title: 'Cryptage SSL/TLS',
                      desc: 'Toutes les données transmises sont cryptées 256-bit'
                    },
                    {
                      icon: <Shield className="w-5 h-5 text-purple-400" />,
                      title: 'Serveurs Sécurisés',
                      desc: 'Infrastructure IPTV protégée contre les intrusions'
                    },
                    {
                      icon: <Database className="w-5 h-5 text-green-400" />,
                      title: 'Stockage Protégé',
                      desc: 'Données de votre abonnement IPTV sécurisées'
                    },
                    {
                      icon: <UserCheck className="w-5 h-5 text-blue-400" />,
                      title: 'Accès Restreint',
                      desc: 'Seul le personnel autorisé accède aux données'
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        {item.icon}
                        <h3 className="font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-orange-400" />
                Partage des Données
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Vos informations liées à votre <strong className="text-white">abonnement IPTV</strong> peuvent être partagées uniquement dans ces cas :
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Processeurs de paiement :</strong> Pour traiter vos transactions d'abonnement IPTV de manière sécurisée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Fournisseurs de services :</strong> Hébergement serveurs IPTV, CDN pour le streaming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Obligations légales :</strong> Si requis par la loi française ou européenne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Support technique :</strong> Pour résoudre les problèmes de votre service IPTV SMARTERS PRO</span>
                  </li>
                </ul>
                <p className="mt-4">
                  Tous nos partenaires sont soumis à des accords de confidentialité stricts concernant les données d'abonnement IPTV.
                </p>
              </div>
            </div>

            {/* Section 5 - RGPD Rights */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Vos Droits RGPD
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants concernant votre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong> :
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    'Droit d\'accès à vos données personnelles',
                    'Droit de rectification des informations',
                    'Droit à l\'effacement (droit à l\'oubli)',
                    'Droit à la limitation du traitement',
                    'Droit à la portabilité des données',
                    'Droit d\'opposition au traitement',
                    'Droit de retirer votre consentement',
                    'Droit de déposer une plainte',
                  ].map((right, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <UserCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{right}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  Pour exercer ces droits concernant votre abonnement IPTV, contactez-nous par email avec une preuve d'identité.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Cookies et Technologies de Suivi
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Notre site web et service <strong className="text-white">IPTV SMARTERS PRO</strong> utilisent des cookies pour :
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Cookies essentiels :</strong> Fonctionnement du site et authentification IPTV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Cookies de performance :</strong> Analyser l'utilisation du service IPTV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Cookies de préférence :</strong> Mémoriser vos paramètres de streaming</span>
                  </li>
                </ul>
                <p className="mt-4">
                  Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Conservation des Données
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Nous conservons vos données d'<strong className="text-white">abonnement IPTV</strong> selon ces durées :
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Données de compte : Durée de votre abonnement IPTV actif + 1 an</li>
                  <li>• Historique de transactions : 10 ans (obligation légale comptable)</li>
                  <li>• Logs de connexion IPTV : 12 mois</li>
                  <li>• Données de support : 3 ans après résolution</li>
                  <li>• Cookies : Maximum 13 mois</li>
                </ul>
                <p className="mt-4">
                  Après ces périodes, vos données sont supprimées de manière sécurisée de nos serveurs IPTV.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Questions sur la Confidentialité ?
            </h2>
            <p className="text-center text-white/70 mb-6">
              Pour toute question concernant la protection de vos données ou votre <strong className="text-white">abonnement IPTV SMARTERS PRO</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/abonnement-iptv/#contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full text-center hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                Nous Contacter
              </Link>
              <Link
                href="/abonnement-iptv/#pricing"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full text-center hover:bg-white/10 transition-all duration-300"
              >
                S'abonner Maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
