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
  title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV N°1 en France 2026 | Abonnement IPTV Premium',
  description: 'IPTV SMARTERS PRO: Decouvrez le meilleur abonnement IPTV France 2026. Abonnement IPTV premium avec 160 000+ chaines TV 4K/FHD/HD, 20 000+ films VOD, activation instantanee, support 24/7. Compatible tous appareils. Abonnement IPTV stable et fiable.',
  alternates: {
    canonical: '/abonnement-iptv/',
  },
  openGraph: {
    url: '/abonnement-iptv/',
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

