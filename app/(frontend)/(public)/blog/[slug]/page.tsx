import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getPayload } from 'payload';
import config from '@payload-config';

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

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  if (!post) return { title: 'Artículo no encontrado — Colonia Cloud' };

  return {
    title: `${post.title} — Colonia Cloud`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: typeof post.coverImage === 'object' && post.coverImage.url
        ? [post.coverImage.url]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  if (!post) notFound();

  const image = typeof post.coverImage === 'object' ? post.coverImage : null;
  const publishedDate = new Intl.DateTimeFormat('es-UY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Montevideo',
  }).format(new Date(post.publishedAt));

  return (
    <article className="blog-post">
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