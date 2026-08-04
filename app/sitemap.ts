import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';

const BASE_URL = 'https://colonia.cloud';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/nosotros`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacidad`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terminos`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map(({ slug }) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
