import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { Smartphone, Tv, Monitor, Play, BookOpen, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutoriels IPTV - Guide Installation IPTV SMARTERS PRO sur Tous Appareils',
  description: 'Guides complets pour installer votre abonnement IPTV SMARTERS PRO sur Android, iOS, Smart TV, Fire TV, PC. Tutoriels détaillés avec images.',
  keywords: 'tutoriel iptv, installer iptv, configuration iptv smarters pro, guide iptv android, iptv smart tv, iptv fire tv, iptv ios',
};

const tutorials = [
  {
    title: 'Android (Téléphone & Tablette)',
    description: 'Installation complète de votre abonnement IPTV SMARTERS PRO sur Android. Google Play Store ou APK direct.',
    icon: <Smartphone className="w-10 h-10" />,
    slug: 'android',
    duration: '5 min',
    difficulty: 'Facile',
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
  },
  {
    title: 'iOS (iPhone & iPad)',
    description: 'Guide détaillé pour configurer IPTV SMARTERS PRO sur App Store. Installation en 3 étapes simples.',
    icon: <Smartphone className="w-10 h-10" />,
    slug: 'ios',
    duration: '5 min',
    difficulty: 'Facile',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Smart TV (Samsung & LG)',
    description: 'Installation IPTV sur Smart TV Samsung et LG avec Smart IPTV, SS IPTV. Configuration pas à pas.',
    icon: <Tv className="w-10 h-10" />,
    slug: 'smart-tv',
    duration: '10 min',
    difficulty: 'Moyen',
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    title: 'Amazon Fire TV Stick',
    description: 'Tutoriel complet Fire TV Stick 4K. Downloader, installation APK, activation abonnement IPTV.',
    icon: <Play className="w-10 h-10" />,
    slug: 'fire-tv',
    duration: '8 min',
    difficulty: 'Facile',
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    iconColor: 'text-orange-400',
  },
  {
    title: 'PC & Mac (Windows/MacOS)',
    description: 'Configuration IPTV sur ordinateur. VLC Player, Kodi, IPTV Smarters Windows. Liste M3U.',
    icon: <Monitor className="w-10 h-10" />,
    slug: 'pc-mac',
    duration: '7 min',
    difficulty: 'Facile',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    title: 'Android TV & Box IPTV',
    description: 'Installation sur Android TV, Nvidia Shield, Mi Box, Box IPTV. Application SMARTERS PRO.',
    icon: <Tv className="w-10 h-10" />,
    slug: 'android-tv',
    duration: '6 min',
    difficulty: 'Facile',
    gradient: 'from-teal-500/20 to-green-500/20',
    border: 'border-teal-500/30',
    iconColor: 'text-teal-400',
  },
];

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-8">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Guides & Tutoriels IPTV
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
            Comment Utiliser <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IPTV SMARTERS PRO</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto">
            Guides d'installation complets pour configurer votre <span className="text-cyan-400 font-semibold">abonnement IPTV SMARTERS PRO</span> sur tous vos appareils. 
            Tutoriels détaillés avec captures d'écran et vidéos explicatives.
          </p>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Choisissez Votre <span className="text-cyan-400">Appareil</span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Sélectionnez votre appareil pour accéder au tutoriel détaillé d'installation de votre abonnement IPTV
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Link
                key={index}
                href={`/tutoriels/${tutorial.slug}`}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${tutorial.gradient} backdrop-blur-sm border ${tutorial.border} hover:-translate-y-2 transition-all duration-500`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${tutorial.iconColor} mb-6 group-hover:scale-110 transition-transform`}>
                  {tutorial.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{tutorial.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {tutorial.description}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    <span className="text-xs font-semibold text-white">{tutorial.duration}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    <span className="text-xs font-semibold text-white">{tutorial.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span className={tutorial.iconColor}>Voir le tutoriel</span>
                  <ArrowRight className={`w-4 h-4 ${tutorial.iconColor} group-hover:translate-x-1 transition-transform`} />
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-cyan-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Pourquoi nos <span className="text-cyan-400">Tutoriels</span> ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: 'Guides Détaillés',
                description: 'Chaque étape expliquée clairement avec captures d\'écran pour installer votre abonnement IPTV SMARTERS PRO sans difficulté',
              },
              {
                icon: <Play className="w-10 h-10" />,
                title: 'Vidéos Tutoriels',
                description: 'Vidéos HD pour suivre l\'installation IPTV en temps réel. Configuration SMARTERS PRO expliquée visuellement',
              },
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: 'Support 24/7',
                description: 'Notre équipe disponible 24h/7j pour vous aider si besoin. Assistance gratuite pour tous vos appareils IPTV',
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Questions <span className="text-cyan-400">Fréquentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Combien de temps prend l\'installation de l\'abonnement IPTV ?',
                a: 'L\'installation de IPTV SMARTERS PRO prend entre 5 et 10 minutes selon votre appareil. Nos tutoriels sont conçus pour une configuration rapide de votre abonnement IPTV.',
              },
              {
                q: 'Puis-je installer mon abonnement IPTV sur plusieurs appareils ?',
                a: 'Oui, votre abonnement IPTV SMARTERS PRO peut être installé sur plusieurs appareils. Consultez les conditions de votre pack pour le nombre d\'appareils simultanés autorisés.',
              },
              {
                q: 'Que faire si l\'installation IPTV ne fonctionne pas ?',
                a: 'Notre support client 24h/7j est disponible pour vous aider. Contactez-nous par email ou WhatsApp pour une assistance personnalisée concernant votre abonnement IPTV.',
              },
              {
                q: 'Les tutoriels sont-ils à jour avec la dernière version IPTV SMARTERS PRO ?',
                a: 'Oui, tous nos guides sont régulièrement mis à jour pour refléter les dernières versions de l\'application IPTV SMARTERS PRO et des systèmes d\'exploitation.',
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prêt à Commencer votre <span className="text-cyan-400">IPTV</span> ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Souscrivez à votre abonnement IPTV SMARTERS PRO et suivez nos tutoriels pour profiter de 160 000 chaînes en 5 minutes
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
            >
              S'abonner Maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
