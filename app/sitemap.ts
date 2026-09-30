import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { services } from '@/lib/services';

const BASE_URL = 'https://colonia.cloud';

// El sitemap se genera en el build, así que `lastModified` es la fecha del
// deploy: cualquier push puede tocar cualquier página. Si en algún momento
// hace falta precisión por URL, reemplazar por fechas manuales.
const lastModified = new Date();

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/nosotros`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contacto`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terminos`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map(({ slug }) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const payload = await getPayload({ config });
  // Los artículos marcados como `noindex` en la pestaña SEO no entran: pedirle
  // a Google que no indexe una URL y listarla en el sitemap es contradictorio.
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { 'meta.noindex': { not_equals: true } },
      ],
    },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  });
  const blogRoutes: MetadataRoute.Sitemap = docs.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: updatedAt ? new Date(String(updatedAt)) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
