import type { Metadata } from 'next';
import LandingV2Content from './content';

export const metadata: Metadata = {
  title: 'IPTV SMARTERS PRO - L\'Expérience TV Premium N°1 en France',
  description: 'Le futur de la télévision est ici. Abonnement IPTV Premium 4K/UHD stable et sans coupure. +160,000 chaînes et VOD. Support français 24/7. Essai immédiat.',
  alternates: {
    canonical: 'https://iptv-smarters-pro.fr/landing-v2',
  }
};

export default function LandingV2Page() {
  return (
    <main>
       {/* Hidden SEO Content - Preserved from Original */}
      <div className="sr-only" aria-hidden="true">
        <h1>IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025</h1>
        <p>Découvrez l'excellence avec IPTV SMARTERS PRO. Notre abonnement iptv premium offre plus de 160 000 chaînes en 4K, FHD et HD. Profitez d'une bibliothèque VOD de 20 000+ films et séries.</p>
        <p>Pourquoi choisir notre abonnement iptv ? Stabilité garantie, sans coupure (anti-freeze), activation instantanée et support client 24/7 en français. Compatible avec Smart TV, Android, iOS, Mag, et PC.</p>
        <h2>Abonnement IPTV Pas Cher et Fiable</h2>
        <p>Profitez du meilleur rapport qualité-prix. Nos serveurs haute performance assurent une diffusion fluide des chaînes de sport, cinéma, et documentaires du monde entier.</p>
      </div>
      
      <LandingV2Content />
    </main>
  );
}
