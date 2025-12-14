import type { Metadata } from 'next';
import LandingV2Content from './content';

export const metadata: Metadata = {
  title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025 | 4K UHD | Premium & Fiable',
  description: 'IPTV SMARTERS PRO: Découvrez le meilleur abonnement IPTV France 2025. +160,000 Chaînes 4K/FHD et VOD. Anti-Freeze, Stable, Activation Immédiate. Testez IPTV SMARTERS PRO Premium maintenant !',
  alternates: {
    canonical: 'https://iptv-smarters-pro.fr/landing-v2',
  },
  keywords: 'IPTV SMARTERS PRO, Abonnement iptv France, IPTV SMARTERS PRO Premium, Abonnement iptv 4K, IPTV SMARTERS PRO Fiable, code iptv smarters pro, meilleur iptv france, iptv anti freeze',
  openGraph: {
    title: 'IPTV SMARTERS PRO - Abonnement IPTV N°1 en France',
    description: 'Profitez de plus de 160 000 chaînes et VOD en 4K. Le meilleur service IPTV Smarters Pro en France.',
    type: 'website',
    locale: 'fr_FR',
  }
};

export default function LandingV2Page() {
  return (
    <main>
       {/* Hidden SEO Content - Maximized for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025</h1>
        <p>Vous recherchez le <strong>meilleur abonnement IPTV France</strong> ? <strong>IPTV SMARTERS PRO</strong> est la solution ultime pour regarder vos chaînes préférées en <strong>4K Ultra HD</strong>. Notre service <strong>IPTV SMARTERS PRO Premium</strong> est reconnu pour sa stabilité et sa fiabilité.</p>
        
        <h2>Pourquoi choisir IPTV SMARTERS PRO ?</h2>
        <ul>
           <li><strong>IPTV SMARTERS PRO Fiable</strong> : Serveurs haute performance avec technologie Anti-Freeze.</li>
           <li><strong>Abonnement IPTV 4K</strong> : Qualité d'image exceptionnelle pour les films, séries et le sport.</li>
           <li><strong>IPTV SMARTERS PRO Premium</strong> : Accès à plus de 160,000 chaînes mondiales et VOD.</li>
           <li>Support complet pour l'application <strong>IPTV Smarters Pro</strong> sur Samsung, LG, Android et Apple TV.</li>
        </ul>

        <h3>Abonnement IPTV France - Offres Exclusives</h3>
        <p>Découvrez nos forfaits adaptés à tous les budgets. Que vous cherchiez un <strong>code IPTV Smarters Pro</strong> pour 12 mois ou un test 24h, nous avons ce qu'il vous faut. Rejoignez des milliers de clients satisfaits qui ont choisi <strong>IPTV SMARTERS PRO</strong> comme leur fournisseur TV principal.</p>
        
        <h3>Installation Facile de IPTV Smarters Pro</h3>
        <p>Notre équipe vous guide pas à pas pour installer l'application <strong>IPTV Smarters Pro</strong> sur tous vos appareils connectés. Profitez de l'IPTV en France, Belgique, Suisse et partout dans le monde sans coupure.</p>
      </div>
      
      <LandingV2Content />
    </main>
  );
}