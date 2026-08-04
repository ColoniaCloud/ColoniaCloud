import type { MetadataRoute } from 'next';

const BASE_URL = 'https://colonia.cloud';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/gracias', '/login', '/dashboard'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
