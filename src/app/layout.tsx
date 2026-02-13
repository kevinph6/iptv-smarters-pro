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
        {/* Preconnect to critical third-party origins to reduce connection latency */}
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        {/* Single combined JSON-LD @graph — maximum SERP rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness"],
                  "@id": `${baseUrl}/#organization`,
                  "name": "IPTV SMARTERS PRO",
                  "legalName": "IPTV Smarters Pro France",
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
                  "description": "Meilleur service d'abonnement IPTV en France avec plus de 160 000 chaînes TV en 4K/FHD/HD et 20 000+ contenus VOD. N°1 en France depuis 2020.",
                  "email": "support@iptvsmarterspro.fr",
                  "telephone": "+33-X-XX-XX-XX-XX",
                  "address": { "@type": "PostalAddress", "addressCountry": "FR", "addressRegion": "France" },
                  "areaServed": [
                    { "@type": "Country", "name": "France" },
                    { "@type": "Country", "name": "Belgium" },
                    { "@type": "Country", "name": "Switzerland" },
                    { "@type": "Country", "name": "Canada" }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/iptvsmartersprofrance",
                    "https://twitter.com/iptvsmarterspro",
                    "https://www.youtube.com/@iptvsmarterspro",
                    "https://www.instagram.com/iptvsmarterspro",
                    "https://t.me/iptvsmarterspro"
                  ],
                  "foundingDate": "2020-01-01",
                  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 },
                  "priceRange": "€€",
                  "paymentAccepted": "Credit Card, PayPal, Cryptocurrency",
                  "currenciesAccepted": "EUR",
                  "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" },
                  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "2847", "bestRating": "5", "worstRating": "1" },
                  "review": [
                    { "@type": "Review", "author": { "@type": "Person", "name": "Marc D." }, "datePublished": "2026-01-15", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Service IPTV excellent, plus de 160 000 chaînes et zéro coupure. Activation en 3 minutes!" },
                    { "@type": "Review", "author": { "@type": "Person", "name": "Sophie L." }, "datePublished": "2026-01-22", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Meilleur IPTV que j'ai testé en France. Qualité 4K impeccable sur ma Smart TV Samsung." },
                    { "@type": "Review", "author": { "@type": "Person", "name": "Karim B." }, "datePublished": "2026-02-01", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "IPTV Smarters Pro est top! Tous les matchs de foot en direct, beIN Sports, RMC Sport, tout marche parfaitement." }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "name": "IPTV SMARTERS PRO",
                  "alternateName": ["IPTV Smarters Pro France", "Abonnement IPTV France", "Meilleur IPTV 2026"],
                  "url": seoHomeUrl,
                  "publisher": { "@id": `${baseUrl}/#organization` },
                  "inLanguage": "fr-FR",
                  "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": `${baseUrl}/blog?q={search_term_string}` }, "query-input": "required name=search_term_string" }
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
                  "dateModified": new Date().toISOString(),
                  "inLanguage": "fr-FR",
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/og-image.jpg`,
                    "width": 1200,
                    "height": 630
                  },
                  "breadcrumb": { "@id": `${seoHomeUrl}#breadcrumb` },
                  "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": ["h1", "h2", ".hero-description"]
                  }
                },
                {
                  "@type": "Product",
                  "@id": `${baseUrl}/#product`,
                  "name": "Abonnement IPTV SMARTERS PRO Premium",
                  "description": "Service IPTV premium avec 160 000+ chaînes TV mondiales en qualité 4K/FHD/HD, 20 000+ films et séries VOD, activation instantanée. Meilleur IPTV France 2026.",
                  "image": [`${baseUrl}/og-image.jpg`, `${baseUrl}/logo.png`],
                  "brand": { "@type": "Brand", "name": "IPTV SMARTERS PRO" },
                  "category": "Abonnement IPTV",
                  "sku": "IPTV-SMARTERS-PRO-FR",
                  "mpn": "IPTVSP-2026",
                  "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": "19.00",
                    "highPrice": "100.00",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": `${seoHomeUrl}#pricing`,
                    "offerCount": "8",
                    "seller": { "@id": `${baseUrl}/#organization` }
                  },
                  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "2847", "bestRating": "5", "worstRating": "1" }
                },
                {
                  "@type": "Service",
                  "@id": `${baseUrl}/#service`,
                  "name": "Abonnement IPTV France - IPTV Smarters Pro",
                  "description": "Service d'abonnement IPTV premium en France. Streaming TV en direct avec 160 000+ chaînes, VOD illimitée, activation instantanée et support 24/7.",
                  "provider": { "@id": `${baseUrl}/#organization` },
                  "serviceType": "Streaming IPTV",
                  "areaServed": { "@type": "Country", "name": "France" },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Abonnements IPTV",
                    "itemListElement": [
                      { "@type": "OfferCatalog", "name": "Pack IPTV Standard HD", "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV HD 3 Mois" }, "price": "19.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV HD 6 Mois" }, "price": "22.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV HD 12 Mois" }, "price": "39.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV HD 24 Mois" }, "price": "59.00", "priceCurrency": "EUR" }
                      ]},
                      { "@type": "OfferCatalog", "name": "Pack IPTV Premium 4K", "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV Premium 4K 3 Mois" }, "price": "27.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV Premium 4K 6 Mois" }, "price": "42.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV Premium 4K 12 Mois" }, "price": "69.00", "priceCurrency": "EUR" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IPTV Premium 4K 24 Mois" }, "price": "100.00", "priceCurrency": "EUR" }
                      ]}
                    ]
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": `${baseUrl}/#app`,
                  "name": "IPTV Smarters Pro",
                  "applicationCategory": "MultimediaApplication",
                  "operatingSystem": "Android, iOS, Windows, macOS, Smart TV, Fire OS",
                  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "15420", "bestRating": "5", "worstRating": "1" },
                  "screenshot": `${baseUrl}/og-image.jpg`,
                  "featureList": "TV en direct, VOD, Replay, EPG, Multi-écrans, 4K UHD, Favoris, Enregistrement",
                  "softwareVersion": "3.1.5",
                  "downloadUrl": seoHomeUrl,
                  "author": { "@id": `${baseUrl}/#organization` }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": `${seoHomeUrl}#breadcrumb`,
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": seoHomeUrl },
                    { "@type": "ListItem", "position": 2, "name": "Chaînes IPTV", "item": `${baseUrl}/chaines` },
                    { "@type": "ListItem", "position": 3, "name": "Abonnements IPTV", "item": `${seoHomeUrl}#pricing` },
                    { "@type": "ListItem", "position": 4, "name": "Blog IPTV", "item": `${baseUrl}/blog` },
                    { "@type": "ListItem", "position": 5, "name": "Tutoriels IPTV", "item": `${baseUrl}/tutoriels` }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": `${seoHomeUrl}#faq`,
                  "mainEntity": [
                    { "@type": "Question", "name": "Qu'est-ce que l'IPTV SMARTERS PRO?", "acceptedAnswer": { "@type": "Answer", "text": "IPTV SMARTERS PRO est le meilleur service d'abonnement IPTV en France pour 2026. Il offre plus de 160 000 chaînes TV en 4K/FHD/HD et 20 000+ films et séries VOD. Compatible avec tous les appareils: Smart TV, Android, iOS, Fire TV Stick, PC et Mac." } },
                    { "@type": "Question", "name": "Combien coûte un abonnement IPTV en France en 2026?", "acceptedAnswer": { "@type": "Answer", "text": "L'abonnement IPTV SMARTERS PRO démarre à seulement 19€ pour 3 mois. Nos forfaits: HD 3 mois (19€), 6 mois (22€), 12 mois (39€), 24 mois (59€). Premium 4K: 3 mois (27€), 6 mois (42€), 12 mois (69€), 24 mois (100€). Le meilleur rapport qualité-prix du marché IPTV France." } },
                    { "@type": "Question", "name": "L'IPTV SMARTERS PRO est-il compatible avec ma Smart TV Samsung?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, IPTV Smarters Pro est 100% compatible avec les Smart TV Samsung, LG, Sony, Philips, ainsi que Android TV, Apple TV 4K, Amazon Fire TV Stick, iPhone, iPad, smartphones Android, PC Windows, Mac, MAG, Enigma2 et plus de 20 applications IPTV." } },
                    { "@type": "Question", "name": "Comment installer IPTV Smarters Pro sur Fire TV Stick?", "acceptedAnswer": { "@type": "Answer", "text": "L'installation sur Fire TV Stick prend 5 minutes: 1) Activez les sources inconnues dans les paramètres. 2) Téléchargez Downloader depuis l'Amazon Appstore. 3) Installez IPTV Smarters Pro. 4) Entrez vos identifiants reçus après l'achat. Guide complet disponible sur notre page tutoriels." } },
                    { "@type": "Question", "name": "Combien de temps pour activer mon abonnement IPTV?", "acceptedAnswer": { "@type": "Answer", "text": "L'activation est instantanée et prend maximum 5 minutes après la souscription. Vous recevez vos identifiants par email et WhatsApp immédiatement. Notre support est disponible 24/7 pour vous aider." } },
                    { "@type": "Question", "name": "Quelles chaînes sport sont disponibles sur IPTV Smarters Pro?", "acceptedAnswer": { "@type": "Answer", "text": "Plus de 500 chaînes sport: beIN Sports 1-3, Canal+ Sport, RMC Sport 1-15, Eurosport 1-2, Sky Sports, ESPN, DAZN, NBA TV, NFL Network, LaLiga TV, Premier League et tous les matchs de Ligue 1, Champions League et Europa League en direct." } },
                    { "@type": "Question", "name": "Le service IPTV est-il stable et sans coupure?", "acceptedAnswer": { "@type": "Answer", "text": "Nos serveurs européens dédiés avec connexion 20 Gbps garantissent une stabilité optimale avec une disponibilité de 99.9%. L'ouverture des chaînes se fait en moins de 0,5 seconde. Zapping rapide et qualité d'image constante en 4K/FHD/HD." } },
                    { "@type": "Question", "name": "Y a-t-il un support client disponible 24h/24?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, notre équipe de support est disponible 24h/24, 7j/7 par email, ticket et WhatsApp. Nous vous aidons pour l'installation, la configuration et le dépannage sur tous les appareils. Temps de réponse moyen: moins de 10 minutes." } },
                    { "@type": "Question", "name": "Quelle est la différence entre le pack Standard et Premium 4K?", "acceptedAnswer": { "@type": "Answer", "text": "Le pack Standard offre 120 000+ chaînes en HD/FHD. Le pack Premium 4K ajoute 40 000 chaînes supplémentaires en qualité 4K Ultra HD, des contenus VOD premium exclusifs, un EPG amélioré et une priorité sur les serveurs pour une stabilité maximale." } },
                    { "@type": "Question", "name": "Peut-on utiliser IPTV Smarters Pro sur plusieurs appareils?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, votre abonnement IPTV SMARTERS PRO inclut une connexion simultanée sur 1 appareil. Pour connecter plusieurs écrans en même temps, des options multi-écrans sont disponibles. Vous pouvez installer l'application sur un nombre illimité d'appareils." } },
                    { "@type": "Question", "name": "Comment regarder les chaînes françaises à l'étranger avec IPTV?", "acceptedAnswer": { "@type": "Answer", "text": "Avec IPTV Smarters Pro, vous pouvez regarder toutes les chaînes françaises (TF1, France 2, M6, Canal+) depuis n'importe où dans le monde. Il suffit d'une connexion internet stable. Le service fonctionne dans tous les pays sans restriction géographique." } },
                    { "@type": "Question", "name": "L'IPTV Smarters Pro inclut-il la VOD (films et séries)?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, notre abonnement IPTV inclut plus de 20 000 films et séries en VOD, constamment mis à jour avec les dernières sorties. Catalogue disponible en VF et VOSTFR, avec des catégories: action, comédie, drame, horreur, animation, documentaire et plus." } },
                    { "@type": "Question", "name": "Existe-t-il un test IPTV gratuit avant achat?", "acceptedAnswer": { "@type": "Answer", "text": "Nous offrons la possibilité de tester notre service IPTV. Contactez notre support par WhatsApp pour demander un essai. Nous proposons également une garantie satisfait ou remboursé pour votre tranquillité d'esprit." } }
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
