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
          '/*?*utm_source=',
          '/*?*utm_=',
          '/*?*utm_medium=',
          '/*?*utm_campaign=',
          '/*?*utm_term=',
          '/*?*utm_content=',
          '/*?*gclid=',
          '/*?*fbclid=',
          '/*?*sessionid=',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog/',
          '/tutoriels/',
          '/produits/',
          '/abonnement-iptv/',
          '/chaines',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.webp$',
        ],
        disallow: [
          '/vxodnasait/',
          '/api/',
          '/admin/',
          '/login',
          '/register',
          '/checkout/',
          '/geo-check',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/uploads/',
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
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap_index.xml`,
    ],
    host: baseUrl,
  };
}
