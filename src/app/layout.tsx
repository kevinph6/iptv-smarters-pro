import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditsMessengerDeferred from "../visual-edits/VisualEditsMessengerDeferred";
import ErrorReporter from "@/components/ErrorReporter";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { OrchidsScript } from "@/components/OrchidsScript";

const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr'),
  title: {
    default: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2026 | Abonnement IPTV Premium 4K',
    template: '%s | IPTV SMARTERS PRO - Abonnement IPTV France'
  },
  description: 'IPTV SMARTERS PRO: Meilleur abonnement IPTV France 2026. Plus de 160 000 chaînes TV 4K/FHD/HD, 20 000+ films VOD, activation instantanée en 5min, support 24/7. Compatible Smart TV, Android, iOS, FireStick. Abonnement IPTV stable et premium.',
  keywords: [
    'iptv',
    'abonnement iptv',
    'iptv smarters pro',
    'iptv france',
    'iptv premium',
    'iptv 4k',
    'meilleur iptv',
    'iptv pas cher',
    'iptv fiable',
    'iptv stable',
    'abonnement iptv france',
    'iptv smarters pro france',
    'abonnement iptv premium',
    'iptv france premium',
    'meilleur abonnement iptv',
    'iptv 4k france',
    'iptv pas cher france',
    'iptv fiable france',
    'iptv smart tv',
    'iptv android',
    'iptv apple tv',
    'iptv samsung',
    'iptv lg',
    'iptv firestick',
    'iptv box',
    'iptv activation instantanée',
    'iptv vod',
    'iptv sport',
    'chaînes iptv',
    'iptv streaming',
    'iptv 24/7',
    'smart iptv',
    'ss iptv',
    'set iptv',
    'flix iptv',
    'duplex iptv',
    'net iptv',
  ],
  authors: [{ name: 'IPTV SMARTERS PRO', url: 'https://officieliptvsmarterspro.fr/abonnement-iptv/' }],
  creator: 'IPTV SMARTERS PRO',
  publisher: 'IPTV SMARTERS PRO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'IPTV SMARTERS PRO - Abonnement IPTV France',
    title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2026 | 160K Chaînes 4K',
    description: 'Abonnement IPTV premium avec 160 000+ chaînes TV 4K/FHD/HD, 20 000+ films VOD. Activation instantanée, compatible tous appareils. Support 24/7. Meilleur IPTV France 2026.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2026',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2026',
    description: '160K+ chaînes TV 4K/FHD/HD | 20K+ films VOD | Activation instantanée | Support 24/7',
    images: ['/og-image.jpg'],
    creator: '@iptvsmarterspro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Ka-PXBBWg2iC5A13iVwtzBqsfEDXR6cZT4nK3kreoZA',
    yandex: 'your-yandex-verification-code',
    other: {
      'bing': 'your-bing-verification-code',
    },
  },
  category: 'technology',
  classification: 'IPTV Service, Streaming, Entertainment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const seoHomeUrl = `${baseUrl}/abonnement-iptv/`;
  
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Single combined JSON-LD @graph — reduces DOM nodes vs 5 separate script tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  "name": "IPTV SMARTERS PRO",
                  "url": seoHomeUrl,
                  "logo": {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#logo`,
                    "url": `${baseUrl}/logo.png`,
                    "contentUrl": `${baseUrl}/logo.png`,
                    "width": 512,
                    "height": 512,
                    "caption": "IPTV SMARTERS PRO"
                  },
                  "image": { "@id": `${baseUrl}/#logo` },
                  "description": "Meilleur service d'abonnement IPTV en France avec plus de 160 000 chaînes TV en 4K/FHD/HD et 20 000+ contenus VOD.",
                  "email": "support@iptvsmarterspro.fr",
                  "address": { "@type": "PostalAddress", "addressCountry": "FR" },
                  "sameAs": [],
                  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "2847", "bestRating": "5", "worstRating": "1" }
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "name": "IPTV SMARTERS PRO",
                  "alternateName": "IPTV Smarters Pro - Abonnement IPTV France",
                  "url": seoHomeUrl,
                  "publisher": { "@id": `${baseUrl}/#organization` },
                  "inLanguage": "fr-FR",
                  "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": `${baseUrl}/search?q={search_term_string}` }, "query-input": "required name=search_term_string" }
                },
                {
                  "@type": "WebPage",
                  "@id": `${seoHomeUrl}#webpage`,
                  "url": seoHomeUrl,
                  "name": "IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2026",
                  "description": "Meilleur abonnement IPTV France 2026. Plus de 160 000 chaînes TV 4K/FHD/HD, 20 000+ films VOD, activation instantanée en 5min, support 24/7.",
                  "isPartOf": { "@id": `${baseUrl}/#website` },
                  "about": { "@id": `${baseUrl}/#organization` },
                  "datePublished": "2025-01-15T08:00:00+01:00",
                  "dateModified": "2026-02-13T10:00:00+01:00",
                  "inLanguage": "fr-FR",
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/og-image.jpg`,
                    "width": 1200,
                    "height": 630
                  },
                  "breadcrumb": { "@id": `${seoHomeUrl}#breadcrumb` }
                },
                {
                  "@type": "Product",
                  "name": "Abonnement IPTV SMARTERS PRO Premium",
                  "description": "Service IPTV premium avec 160 000+ chaînes TV mondiales en qualité 4K/FHD/HD, 20 000+ films et séries VOD, activation instantanée.",
                  "image": `${baseUrl}/og-image.jpg`,
                  "brand": { "@type": "Brand", "name": "IPTV SMARTERS PRO" },
                  "offers": { "@type": "AggregateOffer", "lowPrice": "19.00", "highPrice": "100.00", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": `${seoHomeUrl}#pricing`, "offerCount": "8" },
                  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "2847", "bestRating": "5", "worstRating": "1" }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": `${seoHomeUrl}#breadcrumb`,
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": seoHomeUrl },
                    { "@type": "ListItem", "position": 2, "name": "Chaînes IPTV", "item": `${baseUrl}/chaines` },
                    { "@type": "ListItem", "position": 3, "name": "Blog IPTV", "item": `${baseUrl}/blog` },
                    { "@type": "ListItem", "position": 4, "name": "Tutoriels IPTV", "item": `${baseUrl}/tutoriels` }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    { "@type": "Question", "name": "Qu'est-ce que l'IPTV SMARTERS PRO?", "acceptedAnswer": { "@type": "Answer", "text": "IPTV SMARTERS PRO est le meilleur service d'abonnement IPTV en France pour 2026. Plus de 160 000 chaînes TV en 4K/FHD/HD et 20 000+ films VOD. Compatible tous appareils." } },
                    { "@type": "Question", "name": "Combien coûte l'abonnement IPTV?", "acceptedAnswer": { "@type": "Answer", "text": "À partir de 19€ pour 3 mois. Plans: 3 mois (19€), 6 mois (22€), 12 mois (39€), 24 mois (59€). Pack Premium 4K: 3 mois (27€), 6 mois (42€), 12 mois (69€), 24 mois (100€)." } },
                    { "@type": "Question", "name": "L'IPTV est-il compatible avec mon appareil?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, compatible Smart TV Samsung/LG, Android TV, Apple TV, Fire TV Stick, iPhone, iPad, Android, PC, Mac, MAG, Enigma2 et 20+ applications IPTV." } },
                    { "@type": "Question", "name": "Combien de temps pour activer?", "acceptedAnswer": { "@type": "Answer", "text": "Activation instantanée en maximum 5 minutes après souscription. Contact immédiat par email ou WhatsApp." } },
                    { "@type": "Question", "name": "Quelles chaînes disponibles?", "acceptedAnswer": { "@type": "Answer", "text": "160 000+ chaînes: TF1, France 2, M6, Canal+, RMC Sport, beIN Sports, Eurosport, cinéma, documentaires et plus en 4K/FHD/HD." } },
                    { "@type": "Question", "name": "Le service est-il stable?", "acceptedAnswer": { "@type": "Answer", "text": "Serveurs européens dédiés 20 Gbps. Ultra-stable, ouverture des chaînes en moins de 0,5 seconde. Disponibilité 99.9%." } },
                    { "@type": "Question", "name": "Y a-t-il un support client?", "acceptedAnswer": { "@type": "Answer", "text": "Support 24h/24 7j/7 par ticket, email et WhatsApp pour installation, configuration et dépannage." } },
                    { "@type": "Question", "name": "Différence Standard vs Premium 4K?", "acceptedAnswer": { "@type": "Answer", "text": "Standard: 120 000+ chaînes HD/FHD. Premium 4K: 40 000 chaînes supplémentaires en 4K UHD + contenus VOD premium." } }
                  ]
                }
              ]
            })
          }}
        />
        <link rel="alternate" hrefLang="fr" href={seoHomeUrl} />
        <link rel="alternate" hrefLang="x-default" href={seoHomeUrl} />
      </head>
        <body className={`${inter.className} antialiased`}>
          <OrchidsScript />
          <ErrorReporter />
          {children}
          <WhatsAppButton />
          <VisualEditsMessengerDeferred />
        </body>

    </html>
  );
}
