import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Media, Post } from '@/payload-types';

const SITE_URL = 'https://colonia.cloud';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function findPublishedPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  });
  return docs[0];
}

const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' ? (value as Media) : null;

const absolute = (url?: string | null) => (url ? new URL(url, SITE_URL).href : undefined);

// Lo que el editor escribió en la pestaña SEO gana; si no lo tocó, caemos a
// los campos del artículo. Para compartir en redes preferimos el recorte
// `og` (1200x630) antes que el original.
function resolveSeo(post: Post) {
  const cover = asMedia(post.coverImage);
  const social = asMedia(post.meta?.image) ?? cover;
  const author = post.author && typeof post.author === 'object' ? post.author : null;

  return {
    title: post.meta?.title || `${post.title} · Colonia Cloud`,
    description: post.meta?.description || post.excerpt,
    noindex: Boolean(post.meta?.noindex),
    cover,
    authorName: author?.name || 'Colonia Cloud',
    socialImage: absolute(social?.sizes?.og?.url || social?.url),
  };
}

// ISR: la página se regenera como mucho cada 5 minutos, y los hooks
// `afterChange` de la colección la refrescan al publicar. Con `force-dynamic`
// cada visita pegaba contra SQLite y el CDN no cacheaba nada.
export const revalidate = 300;

// Sin `generateStaticParams` Next trata la ruta como totalmente dinámica y no
// la cachea nunca. Con esto los artículos publicados se prerenderizan en el
// build y los que se publiquen después se generan en la primera visita y
// quedan cacheados (`dynamicParams` es true por defecto).
export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true },
  });
  return docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  if (!post) return { title: 'Artículo no encontrado · Colonia Cloud' };

  const seo = resolveSeo(post);

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
    authors: [{ name: seo.authorName }],
    openGraph: {
      type: 'article',
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [seo.authorName],
      images: seo.socialImage ? [seo.socialImage] : undefined,
    },
  };
}

function articleJsonLd(post: Post, seo: ReturnType<typeof resolveSeo>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: seo.description,
    image: seo.socialImage ? [seo.socialImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: seo.authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Colonia Cloud',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    inLanguage: 'es-UY',
  };
}

function breadcrumbJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  if (!post) notFound();

  const seo = resolveSeo(post);
  const image = seo.cover;
  const publishedDate = new Intl.DateTimeFormat('es-UY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Montevideo',
  }).format(new Date(post.publishedAt));

  return (
    <article className="blog-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post, seo)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(post)) }}
      />
      <header className="blog-post-header">
        <div className="site-container">
          <Link href="/blog" className="blog-back">← Todos los artículos</Link>
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </header>
      {image?.url && (
        <figure className="blog-post-cover site-container">
          <Image src={image.url} alt={image.alt || post.title} width={image.width || 1440} height={image.height || 960} priority />
        </figure>
      )}
      <div className="blog-post-content">
        <RichText data={post.content} />
      </div>
    </article>
  );
}
