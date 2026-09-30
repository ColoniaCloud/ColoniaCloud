import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';

export const metadata: Metadata = {
  title: 'Blog — Colonia Cloud',
  description: 'Ideas, guías y novedades sobre diseño web, marketing, infraestructura cloud e inteligencia artificial.',
  alternates: { canonical: '/blog' },
};

// ISR: el listado se regenera como mucho cada 5 minutos y los hooks
// `afterChange` de la colección lo refrescan al publicar o borrar.
export const revalidate = 300;

export default async function BlogPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 24,
  });

  return (
    <>
      <section className="inner-hero" aria-labelledby="blog-title">
        <div className="site-container">
          <span className="eyebrow">Ideas / Colonia Cloud</span>
          <h1 id="blog-title">Ideas para lo que viene.</h1>
          <p>Notas y recursos para tomar mejores decisiones digitales.</p>
        </div>
      </section>

      <section className="interior-section" aria-label="Artículos">
        <div className="site-container">
          {docs.length ? (
            <div className="blog-grid">
              {docs.map((post) => {
                const image = typeof post.coverImage === 'object' ? post.coverImage : null;

                return (
                  <article className="blog-card" key={post.id}>
                    <Link className="blog-card-image" href={`/blog/${post.slug}`} aria-label={`Leer ${post.title}`}>
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt || post.title}
                          fill
                          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 380px"
                        />
                      ) : (
                        <span className="blog-card-placeholder" aria-hidden="true" />
                      )}
                    </Link>
                    <div className="blog-card-copy">
                      <time dateTime={post.publishedAt}>
                        {new Intl.DateTimeFormat('es-UY', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          timeZone: 'America/Montevideo',
                        }).format(new Date(post.publishedAt))}
                      </time>
                      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                      <p>{post.excerpt}</p>
                      <Link className="blog-card-link" href={`/blog/${post.slug}`}>Leer artículo <span aria-hidden="true">↗</span></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blog-empty">
              <span className="eyebrow">Próximamente</span>
              <h2>Estamos preparando nuevas ideas.</h2>
              <p>Mientras tanto, conocé los servicios de Colonia Cloud.</p>
              <Link href="/servicios" className="blog-card-link">Explorar servicios <span aria-hidden="true">↗</span></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
