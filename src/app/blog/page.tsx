import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog IPTV France - Guides, Tutoriels & Actualités IPTV SMARTERS PRO 2025',
  description: 'Découvrez nos guides complets, tutoriels et actualités IPTV. Optimisez votre abonnement IPTV SMARTERS PRO avec nos conseils d\'experts. Blog IPTV France mis à jour régulièrement avec les meilleures astuces pour le streaming.',
  keywords: [
    'blog iptv',
    'guide iptv',
    'tutoriel iptv',
    'actualités iptv',
    'iptv smarters pro guide',
    'configurer iptv',
    'installer iptv',
    'iptv france blog',
    'meilleur iptv 2025',
    'iptv conseils',
    'iptv astuces',
    'streaming iptv',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog IPTV France - Guides & Actualités IPTV SMARTERS PRO',
    description: 'Guides complets, tutoriels et actualités pour optimiser votre abonnement IPTV. Conseils d\'experts pour le streaming IPTV.',
    type: 'website',
    url: '/blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog IPTV SMARTERS PRO - Guides et Tutoriels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPTV France - Guides & Actualités',
    description: 'Guides complets et tutoriels IPTV. Optimisez votre expérience IPTV SMARTERS PRO.',
    images: ['/og-image.jpg'],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
