import dynamic from 'next/dynamic';
import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import OnDemandBanner from '@/components/sections/on-demand-banner';
import StandardPricingCards from '@/components/sections/standard-pricing-cards';
import type { Metadata } from 'next';

// ── Dynamically import below-the-fold sections ──
// These load AFTER the critical above-the-fold content (hero + pricing)
// Using ssr: false for pure-client sections to reduce server render time
const FeaturesOverview = dynamic(() => import('@/components/sections/features-overview'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});

const QualityFeatures = dynamic(() => import('@/components/sections/quality-features'), {
  loading: () => <div className="min-h-[400px] bg-gray-50" />,
});

const TrustSignals = dynamic(() => import('@/components/sections/trust-signals'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});

const ReviewsSection = dynamic(() => import('@/components/sections/reviews-section'), {
  loading: () => <div className="min-h-[500px] bg-gray-50" />,
});

const ResellerSection = dynamic(() => import('@/components/sections/reseller-section'), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

const ComparisonSection = dynamic(() => import('@/components/sections/comparison-section'), {
  loading: () => <div className="min-h-[500px] bg-white" />,
});

const AppCompatibility = dynamic(() => import('@/components/sections/app-compatibility'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-r from-purple-900 to-pink-900" />,
});

const BlogPreview = dynamic(() => import('@/components/sections/blog-preview'), {
  loading: () => <div className="min-h-[500px] bg-white" />,
});

const FaqSection = dynamic(() => import('@/components/sections/faq-section'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});

const SeoContentSection = dynamic(() => import('@/components/sections/seo-content-section'), {
  loading: () => <div className="min-h-[300px] bg-black" />,
});

const Footer = dynamic(() => import('@/components/sections/footer'), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

// Non-critical client widget - lazy load
const PurchaseNotification = dynamic(
  () => import('@/components/ui/purchase-notification').then((m) => m.PurchaseNotification),
  { loading: () => null }
);

export const metadata: Metadata = {
  title: 'Abonnement IPTV France 2026 | IPTV Smarters Pro N°1 Premium 4K',
  description: 'Meilleur abonnement IPTV France 2026. 160 000+ chaînes 4K, 20 000+ VOD, activation 5min, support 24/7. Dès 19€. IPTV Smarters Pro, N°1 en France.',
  keywords: [
    'abonnement iptv', 'iptv france', 'iptv smarters pro', 'meilleur iptv', 'iptv 4k',
    'abonnement iptv france', 'iptv premium', 'iptv pas cher', 'iptv stable', 'iptv fiable',
    'abonnement iptv premium', 'meilleur abonnement iptv', 'iptv 4k france', 'iptv smart tv',
    'iptv firestick', 'iptv samsung', 'iptv lg', 'iptv android', 'iptv apple tv',
    'iptv sport', 'iptv vod', 'chaînes iptv', 'iptv streaming', 'iptv 2026',
  ],
  alternates: {
    canonical: '/abonnement-iptv/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/abonnement-iptv/',
    siteName: 'IPTV SMARTERS PRO',
    title: 'Abonnement IPTV France 2026 | IPTV Smarters Pro 4K Premium',
    description: '160 000+ chaînes 4K, 20 000+ VOD, activation instantanée. Le meilleur abonnement IPTV France 2026 dès 19€.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IPTV Smarters Pro - Abonnement IPTV France 2026', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abonnement IPTV France 2026 | IPTV Smarters Pro',
    description: '160 000+ chaînes 4K | 20 000+ VOD | Activation 5min | Dès 19€',
    images: ['/og-image.jpg'],
    creator: '@iptvsmarterspro',
  },
};

export default function AbonnementIptvPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationHeader />
      <HeroSection />
      {/* On mobile: pricing first, then on-demand banner. On desktop: original order preserved via CSS order */}
      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <OnDemandBanner />
        </div>
        <div className="order-1 lg:order-2">
          <StandardPricingCards />
        </div>
      </div>
      <FeaturesOverview />
      <QualityFeatures />
      <TrustSignals />
      <ReviewsSection />
      <ResellerSection />
      <ComparisonSection />
      <AppCompatibility />
      <BlogPreview />
      <FaqSection />
      <SeoContentSection />
      <Footer />

      {/* Purchase Notification Popup */}
      <PurchaseNotification />
    </main>
  );
}

