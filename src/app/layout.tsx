import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://abonnement-iptv-smarterspro.fr'),
  title: {
    default: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025 | Abonnement IPTV Premium 4K',
    template: '%s | IPTV SMARTERS PRO - Abonnement IPTV France'
  },
  description: 'IPTV SMARTERS PRO: Meilleur abonnement IPTV France 2025. Plus de 160 000 chaînes TV 4K/FHD/HD, 20 000+ films VOD, activation instantanée en 5min, support 24/7. Compatible Smart TV, Android, iOS, FireStick. Abonnement IPTV stable et premium.',
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
  authors: [{ name: 'IPTV SMARTERS PRO', url: 'https://abonnement-iptv-smarterspro.fr' }],
  creator: 'IPTV SMARTERS PRO',
  publisher: 'IPTV SMARTERS PRO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'IPTV SMARTERS PRO - Abonnement IPTV France',
    title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025 | 160K Chaînes 4K',
    description: 'Abonnement IPTV premium avec 160 000+ chaînes TV 4K/FHD/HD, 20 000+ films VOD. Activation instantanée, compatible tous appareils. Support 24/7. Meilleur IPTV France 2025.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV SMARTERS PRO - Meilleur Abonnement IPTV France 2025',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abonnement-iptv-smarterspro.fr';
  
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IPTV SMARTERS PRO",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp",
                "width": 200,
                "height": 200
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ba0e4002-35cb-42f6-b185-6a3961472a13-officieliptvsmarterspro-fr/assets/images/officiel-iptv-smarters-1.png",
                "width": 1200,
                "height": 630
              },
              "description": "Meilleur service d'abonnement IPTV en France avec plus de 160 000 chaînes TV en 4K/FHD/HD et 20 000+ contenus VOD. Activation instantanée en 5 minutes, compatible tous appareils, support client 24/7.",
              "email": "support@iptvsmarterspro.fr",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "France"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
              },
              "slogan": "Meilleur Abonnement IPTV N°1 en France 2025"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Abonnement IPTV SMARTERS PRO Premium",
              "description": "Service IPTV premium avec 160 000+ chaînes TV mondiales en qualité 4K/FHD/HD, 20 000+ films et séries VOD, activation instantanée en 5 minutes, support client 24/7. Compatible Smart TV, Android, iOS, FireStick, Apple TV, Box IPTV.",
              "image": `${baseUrl}/og-image.jpg`,
              "brand": {
                "@type": "Brand",
                "name": "IPTV SMARTERS PRO"
              },
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "19.00",
                "highPrice": "100.00",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "url": `${baseUrl}/#pricing`,
                "priceValidUntil": "2025-12-31",
                "offerCount": "8"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
              },
              "category": "IPTV Subscription Service"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Qu'est-ce que l'IPTV SMARTERS PRO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "IPTV SMARTERS PRO est le meilleur service d'abonnement IPTV en France pour 2025. Il propose plus de 160 000 chaînes TV en direct en qualité 4K, FHD et HD, ainsi que plus de 20 000 films et séries VOD. Compatible avec tous les appareils: Smart TV Samsung et LG, Android TV, Apple TV, Amazon Fire TV Stick, iPhone, iPad, téléphones Android, tablettes, PC Windows, Mac, Box IPTV, MAG, Enigma2, et plus de 20 applications IPTV populaires."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Combien coûte l'abonnement IPTV SMARTERS PRO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'abonnement IPTV SMARTERS PRO commence à partir de 19€ pour 3 mois. Plans disponibles: 3 mois (19€), 6 mois (22€), 12 mois (39€ + 2 mois gratuits), 24 mois (59€ + 4 mois gratuits). Pack Premium 4K: 3 mois (27€), 6 mois (42€), 12 mois (69€ + 2 mois gratuits), 24 mois (100€ + 4 mois gratuits)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "L'IPTV SMARTERS PRO est-il compatible avec mon appareil?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, IPTV SMARTERS PRO est compatible avec tous les appareils: Smart TV Samsung et LG, Android TV, Apple TV, Amazon Fire TV Stick, iPhone, iPad, téléphones Android, tablettes, PC Windows, Mac, Box IPTV, MAG, Enigma2, et plus de 20 applications IPTV populaires."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Combien de temps faut-il pour activer mon abonnement IPTV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'activation de votre abonnement IPTV SMARTERS PRO est instantanée et prend maximum 5 minutes. Après votre souscription, notre équipe vous contactera immédiatement par email ou WhatsApp pour activer votre service."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelles chaînes sont disponibles avec IPTV SMARTERS PRO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "IPTV SMARTERS PRO offre plus de 160 000 chaînes mondiales incluant toutes les chaînes françaises (TF1, France 2, M6, Canal+), chaînes sportives (RMC Sport, beIN Sports, Eurosport), cinéma, documentaires, enfants, et plus. Qualité 4K, FHD et HD disponible."
                  }
                },
                {
                  "@type": "Question",
                  "name": "L'IPTV SMARTERS PRO est-il stable et sans coupure?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, IPTV SMARTERS PRO utilise des serveurs européens dédiés de haute qualité avec connexion 20 Gbps. Le service est ultra-stable, sans coupure, avec ouverture des chaînes en moins de 0,5 seconde. Garantie de disponibilité 99.9%."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Y a-t-il un support client pour IPTV SMARTERS PRO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, notre assistance client IPTV est disponible 24h/24 et 7j/7. Support par ticket, email et WhatsApp. Notre équipe d'experts vous aide pour l'installation, configuration et résolution de problèmes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelle est la différence entre IPTV Standard et Premium 4K?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'abonnement IPTV Standard offre 120 000+ chaînes HD/FHD. Le Pack Premium 4K ajoute 40 000 chaînes supplémentaires en qualité 4K ultra-haute définition, plus de contenus VOD premium, et du contenu adulte protégé par mot de passe."
                  }
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "IPTV SMARTERS PRO",
              "url": baseUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "IPTV SMARTERS PRO",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/logo.png`
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": baseUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Chaînes IPTV",
                  "item": `${baseUrl}/chaines`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Blog IPTV",
                  "item": `${baseUrl}/blog`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Tutoriels IPTV",
                  "item": `${baseUrl}/tutoriels`
                }
              ]
            })
          }}
        />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta name="language" content="fr" />
        <meta httpEquiv="content-language" content="fr" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="identifier-URL" content={baseUrl} />
        <meta name="subject" content="IPTV, Abonnement IPTV, IPTV SMARTERS PRO, Streaming TV" />
        <meta name="abstract" content="Meilleur service d'abonnement IPTV en France avec 160 000+ chaînes 4K/FHD/HD" />
        <meta name="topic" content="IPTV, Television Streaming, VOD, Entertainment" />
        <meta name="summary" content="IPTV SMARTERS PRO - Abonnement IPTV premium France avec activation instantanée, 160K+ chaînes TV, support 24/7" />
        <meta name="designer" content="IPTV SMARTERS PRO" />
        <meta name="copyright" content="IPTV SMARTERS PRO 2025" />
        <meta name="reply-to" content="support@iptvsmarterspro.fr" />
        <meta name="owner" content="IPTV SMARTERS PRO" />
        <meta name="url" content={baseUrl} />
        <meta name="pagename" content="IPTV SMARTERS PRO - Meilleur Abonnement IPTV France" />
        <link rel="alternate" hrefLang="fr" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </head>
        <body className={`${inter.className} antialiased`}>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="4333d292-4a82-4247-86b6-117a058e7bdd"
          />
          <ErrorReporter />
          {children}
          <VisualEditsMessenger />
        </body>

    </html>
  );
}
