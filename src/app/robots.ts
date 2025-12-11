import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abonnement-iptv-smarterspro.fr';
  
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
          '/*?*utm_source=',
          '/*?*sessionid=',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/vxodnasait/',
          '/api/',
          '/admin/',
          '/login',
          '/register',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
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
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap_index.xml`,
    host: baseUrl,
  };
}