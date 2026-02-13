import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/vxodnasait/',
          '/api/',
          '/admin/',
          '/login',
          '/register',
          '/checkout/',
          '/geo-check',
          '/geo-restricted',
          '/middleware-test',
          '/test-checkout',
          '/home-2',
          '/_next/',
          // Block URL parameters that create duplicate content
          '/*?*utm_source=',
          '/*?*utm_medium=',
          '/*?*utm_campaign=',
          '/*?*utm_term=',
          '/*?*utm_content=',
          '/*?*gclid=',
          '/*?*fbclid=',
          '/*?*sessionid=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/abonnement-iptv/',
          '/chaines',
          '/blog/',
          '/tutoriels/',
          '/produits/',
          '/confidentialite',
          '/remboursement',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.webp$',
          '/*.avif$',
        ],
        disallow: [
          '/vxodnasait/',
          '/api/',
          '/admin/',
          '/login',
          '/register',
          '/checkout/',
          '/geo-check',
          '/geo-restricted',
          '/middleware-test',
          '/test-checkout',
          '/home-2',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/uploads/',
          '/_next/image',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/vxodnasait/',
          '/api/',
          '/admin/',
          '/login',
          '/register',
          '/checkout/',
          '/geo-check',
          '/geo-restricted',
          '/middleware-test',
          '/test-checkout',
          '/home-2',
        ],
        crawlDelay: 1,
      },
    ],
    // Single sitemap index — Google will discover all sub-sitemaps from it
    sitemap: `${baseUrl}/sitemap_index.xml`,
    host: baseUrl,
  };
}
