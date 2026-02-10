import type { Metadata } from 'next';
import NetflixHome from './netflix-home';

export const metadata: Metadata = {
  title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV N°1 en France 2026 | Netflix Style',
  description: 'IPTV SMARTERS PRO: Decouvrez le meilleur abonnement IPTV France 2026. Abonnement IPTV premium avec 160 000+ chaines TV 4K/FHD/HD, 20 000+ films VOD, activation instantanee, support 24/7.',
  alternates: {
    canonical: '/home-2/',
  },
  openGraph: {
    url: '/home-2/',
  },
};

export default function Home2Page() {
  return <NetflixHome />;
}
