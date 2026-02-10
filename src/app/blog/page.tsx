import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

export const metadata: Metadata = {
  title: 'Blog IPTV France 2026 - Guides, Tutoriels, Comparatifs & Avis | IPTV Smarters Pro',
  description: 'Blog IPTV France : guides complets, comparatifs, tutoriels d\'installation et avis sur les meilleurs abonnements IPTV. Conseils d\'experts pour choisir le meilleur IPTV pas cher, installer sur Smart TV, Fire Stick et profiter de l\'IPTV 4K sans coupure.',
  keywords: [
    'blog iptv',
    'guide iptv france',
    'meilleur abonnement iptv',
    'iptv pas cher',
    'iptv smarters pro',
    'iptv france 2026',
    'abonnement iptv france',
    'iptv 4k',
    'iptv sans coupure',
    'installer iptv smart tv',
    'iptv fire stick',
    'iptv sport',
    'comparatif iptv',
    'test iptv gratuit',
    'vod iptv',
    'iptv legal france',
    'iptv streaming',
    'meilleur iptv 2026',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog IPTV France 2026 - Guides, Comparatifs & Avis | IPTV Smarters Pro',
    description: 'Guides complets, comparatifs et tutoriels pour choisir et installer votre abonnement IPTV en France. Meilleur IPTV pas cher, 4K, sport et VOD.',
    type: 'website',
    locale: 'fr_FR',
    url: '/blog',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog IPTV Smarters Pro France - Guides et Comparatifs IPTV 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPTV France 2026 - Guides & Comparatifs',
    description: 'Guides, comparatifs et avis IPTV France. Trouvez le meilleur abonnement IPTV pas cher avec IPTV Smarters Pro.',
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
