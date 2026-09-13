import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';

const BASE_URL = 'https://colonia.cloud';

// El sitemap se genera en el build, así que `lastModified` es la fecha del
// deploy: cualquier push puede tocar cualquier página. Si en algún momento
// hace falta precisión por URL, reemplazar por fechas manuales.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/nosotros`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contacto`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terminos`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map(({ slug }) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
