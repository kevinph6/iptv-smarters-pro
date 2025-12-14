import type { Metadata } from 'next';
import LandingV2Content from './content';

export const metadata: Metadata = {
  title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV N°1 en France 2025 | 4K UHD',
  description: 'IPTV SMARTERS PRO: Découvrez le meilleur abonnement IPTV France 2025. +160,000 Chaînes 4K/FHD et VOD. Anti-Freeze, Stable, Activation Immédiate. Testez IPTV SMARTERS PRO maintenant !',
  alternates: {
    canonical: 'https://iptv-smarters-pro.fr/landing-v2',
  },
  keywords: 'IPTV SMARTERS PRO, abonnement iptv, iptv france, meilleur iptv, iptv 4k, iptv premium, abonnement iptv smarters pro, code iptv smarters pro, iptv pas cher, iptv stable'
};

export default function LandingV2Page() {
  return (
    <main>
       {/* Hidden SEO Content - Maximized for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025</h1>
        <p>Bienvenue sur le site officiel de <strong>IPTV SMARTERS PRO</strong>, le leader de l'<strong>abonnement IPTV</strong> en France et en Europe.</p>
        
        <h2>Pourquoi choisir notre Abonnement IPTV Premium ?</h2>
        <p>Notre service <strong>IPTV SMARTERS PRO</strong> offre une qualité d'image exceptionnelle en <strong>4K Ultra HD</strong>, FHD et HD. Avec plus de <strong>160 000 chaînes</strong> en direct et une bibliothèque VOD de 20 000 films et séries (Netflix, Amazon Prime, Disney+, Canal+), vous ne manquerez plus jamais vos programmes préférés.</p>
        
        <h3>Compatibilité Totale</h3>
        <p>L'<strong>abonnement IPTV SMARTERS PRO</strong> est compatible avec tous vos appareils : <strong>Smart TV</strong> (Samsung, LG, Android TV), Boitiers Android (Nvidia Shield, Xiaomi Mi Box), Apple TV, Smartphones et Tablettes (iOS, Android), PC (Windows, Mac) et MAG.</p>
        
        <h3>Stabilité et Fiabilité</h3>
        <p>Fini les coupures ! Nos serveurs <strong>IPTV SMARTERS PRO</strong> sont équipés de la technologie <strong>Anti-Freeze 3.0</strong> garantissant une fluidité parfaite même lors des grands événements sportifs (Ligue des Champions, Premier League, Ligue 1, NBA).</p>
        
        <h3>Support Client 24/7</h3>
        <p>Notre équipe de support <strong>IPTV SMARTERS PRO</strong> est disponible 24h/24 et 7j/7 pour vous aider à l'installation et à l'activation de votre <strong>abonnement iptv</strong>.</p>
        
        <h4>Nos Offres d'Abonnement IPTV</h4>
        <ul>
            <li>Abonnement IPTV 3 Mois</li>
            <li>Abonnement IPTV 6 Mois</li>
            <li>Abonnement IPTV 12 Mois (Best Seller)</li>
            <li>Abonnement IPTV 24 Mois</li>
        </ul>
        <p>Profitez du <strong>meilleur abonnement iptv</strong> du marché avec <strong>IPTV SMARTERS PRO</strong>. Activation immédiate et paiement sécurisé.</p>
      </div>
      
      <LandingV2Content />
    </main>
  );
}