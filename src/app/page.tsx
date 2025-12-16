import dynamic from 'next/dynamic';
import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import OnDemandBanner from '@/components/sections/on-demand-banner';
import StandardPricingCards from '@/components/sections/standard-pricing-cards';
import { PurchaseNotification } from '@/components/ui/purchase-notification';
import type { Metadata } from 'next';

// Dynamically import below-the-fold sections for better performance
const PremiumPricingCards = dynamic(() => import('@/components/sections/premium-pricing-cards'), {
  loading: () => <div className="min-h-[400px] bg-white animate-pulse" />
});

const FeaturesOverview = dynamic(() => import('@/components/sections/features-overview'), {
  loading: () => <div className="min-h-[600px] bg-white animate-pulse" />
});

const QualityFeatures = dynamic(() => import('@/components/sections/quality-features'), {
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />
});

const TrustSignals = dynamic(() => import('@/components/sections/trust-signals'), {
  loading: () => <div className="min-h-[300px] bg-white animate-pulse" />
});

const ReviewsSection = dynamic(() => import('@/components/sections/reviews-section'), {
  loading: () => <div className="min-h-[500px] bg-gray-50 animate-pulse" />
});

const ResellerSection = dynamic(() => import('@/components/sections/reseller-section'), {
  loading: () => <div className="min-h-[400px] bg-black animate-pulse" />
});

const ComparisonSection = dynamic(() => import('@/components/sections/comparison-section'), {
  loading: () => <div className="min-h-[500px] bg-white animate-pulse" />
});

const AppCompatibility = dynamic(() => import('@/components/sections/app-compatibility'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-r from-purple-900 to-pink-900 animate-pulse" />
});

const BlogPreview = dynamic(() => import('@/components/sections/blog-preview'), {
  loading: () => <div className="min-h-[500px] bg-white animate-pulse" />
});

const FaqSection = dynamic(() => import('@/components/sections/faq-section'), {
  loading: () => <div className="min-h-[600px] bg-white animate-pulse" />
});

const Footer = dynamic(() => import('@/components/sections/footer'), {
  loading: () => <div className="min-h-[400px] bg-black animate-pulse" />
});

export const metadata: Metadata = {
  title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV N°1 en France 2025 | Abonnement iptv Premium',
  description: 'IPTV SMARTERS PRO: Découvrez le meilleur abonnement IPTV France. Abonnement iptv premium avec 160 000+ chaînes TV 4K/FHD/HD, 20 000+ films VOD, activation instantanée, support 24/7. IPTV SMARTERS PRO compatible tous appareils. Abonnement iptv stable et fiable.',
};

export default async function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hidden SEO Content - IPTV SMARTERS PRO Keywords */}
      <div className="sr-only" aria-hidden="true">
        <h1>IPTV SMARTERS PRO - Abonnement iptv Premium France</h1>
        <p>IPTV SMARTERS PRO meilleur abonnement iptv France 2025. Abonnement iptv premium 4K avec IPTV SMARTERS PRO. Service abonnement iptv stable et fiable. IPTV SMARTERS PRO activation instantanée. Abonnement iptv pas cher avec IPTV SMARTERS PRO. Meilleur service abonnement iptv France. IPTV SMARTERS PRO compatible tous appareils. Abonnement iptv smart TV, Android, iOS. IPTV SMARTERS PRO support 24/7. Abonnement iptv VOD films et séries. IPTV SMARTERS PRO chaînes mondiales. Abonnement iptv sport en direct.</p>
      </div>
      
      <NavigationHeader />
      <HeroSection />
      <OnDemandBanner />
      
      {/* SEO Text Block - Visible but subtle */}
      <div className="bg-black py-4 text-center">
        <p className="text-white/10 text-xs max-w-7xl mx-auto px-4">
          IPTV SMARTERS PRO • Abonnement iptv • IPTV SMARTERS PRO France • Abonnement iptv premium • IPTV SMARTERS PRO 4K • Abonnement iptv fiable • IPTV SMARTERS PRO stable • Abonnement iptv pas cher • IPTV SMARTERS PRO activation instantanée • Abonnement iptv smart TV • IPTV SMARTERS PRO VOD • Abonnement iptv sport • IPTV SMARTERS PRO 24/7 • Abonnement iptv chaînes mondiales
        </p>
      </div>
      
      <StandardPricingCards />
      <PremiumPricingCards />
      <FeaturesOverview />
      <QualityFeatures />
      
      {/* SEO Text Block - Mid page */}
      <div className="bg-black py-4 text-center border-y border-white/5">
        <p className="text-white/10 text-xs max-w-7xl mx-auto px-4">
          IPTV SMARTERS PRO meilleur service • Abonnement iptv qualité HD • IPTV SMARTERS PRO compatible • Abonnement iptv tous appareils • IPTV SMARTERS PRO installation facile • Abonnement iptv France premium • IPTV SMARTERS PRO serveur stable • Abonnement iptv sans coupure
        </p>
      </div>
      
      <TrustSignals />
      <ReviewsSection />
      <ResellerSection />
      <ComparisonSection />
      <AppCompatibility />
      <BlogPreview />
      <FaqSection />
      
      {/* SEO Text Block - Bottom */}
      <div className="bg-black py-4 text-center border-t border-white/5">
        <p className="text-white/10 text-xs max-w-7xl mx-auto px-4">
          IPTV SMARTERS PRO service premium • Abonnement iptv meilleur prix • IPTV SMARTERS PRO support client • Abonnement iptv garantie • IPTV SMARTERS PRO fiabilité • Abonnement iptv activation rapide • IPTV SMARTERS PRO multi-écrans • Abonnement iptv illimité
        </p>
      </div>
      
      <Footer />
      
      {/* Hidden Footer SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <p>IPTV SMARTERS PRO abonnement iptv France premium 4K FHD HD. Meilleur service IPTV SMARTERS PRO avec abonnement iptv stable. IPTV SMARTERS PRO compatible Smart TV Android iOS. Abonnement iptv activation instantanée avec IPTV SMARTERS PRO. Service abonnement iptv 24/7 support. IPTV SMARTERS PRO VOD films séries. Abonnement iptv sport chaînes mondiales. IPTV SMARTERS PRO pas cher meilleur prix.</p>
      </div>

      {/* Purchase Notification Popup */}
      <PurchaseNotification />
    </main>
  );
}