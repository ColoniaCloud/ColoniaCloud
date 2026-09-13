import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';
import { services, getService } from '@/lib/services';

type Params = { slug: string };

const SITE_URL = 'https://colonia.cloud';

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

// Cualquier slug fuera del catálogo devuelve 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Colonia Cloud`,
    description: service.heroDescription,
    alternates: { canonical: `/servicios/${slug}` },
  };
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);

  // Migas de pan para Google: muestra "Inicio › Servicios › X" en el
  // resultado en vez de la URL cruda. Refleja el enlace "Volver a servicios".
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${SITE_URL}/servicios` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/servicios/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InternalHero
        icon={service.icon}
        badge={service.badge}
        title={service.heroTitle}
        description={service.heroDescription}
      />

      {/* Introducción + "En qué consiste" */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-[13px] text-cc-text-body hover:text-cc-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Volver a servicios
          </Link>

          <p className="text-[16px] md:text-[17px] text-cc-text-body leading-relaxed max-w-[760px] mb-12">
            {service.intro}
          </p>

          <h2 className="font-display font-medium text-[1.5rem] text-cc-text mb-6">
            En qué consiste
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="border border-black/10 rounded-xl p-6 bg-cc-bg"
              >
                <h3 className="font-display font-medium text-[1.0625rem] text-cc-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-cc-text-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subservicios incluidos */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="py-[64px] bg-cc-bg">
          <div className="max-w-[1280px] mx-auto px-7">
            <h2 className="font-display font-medium text-[1.5rem] text-cc-text mb-6">
              También incluye
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.subServices.map((sub) => (
                <div
                  key={sub.name}
                  className="border border-cc-accent/20 rounded-xl p-6 bg-cc-surface"
                >
                  <span className="inline-block text-[11px] bg-cc-accent-light text-cc-accent rounded-sm px-2 py-0.5 font-medium mb-3">
                    Subservicio
                  </span>
                  <h3 className="font-display font-medium text-[1.0625rem] text-cc-text mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-[15px] text-cc-text-body leading-relaxed">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qué incluye */}
      <section className="py-[64px] bg-cc-surface">
        <div className="max-w-[1280px] mx-auto px-7">
          <h2 className="font-display font-medium text-[1.5rem] text-cc-text mb-6">
            Qué incluye
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-[820px] list-none">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-cc-accent-light flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-cc-accent" aria-hidden="true" />
                </span>
                <span className="text-[14px] text-cc-text-body leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <SectionCta title={service.ctaTitle} description={service.ctaDescription} />
        </div>
      </section>

      {/* Otros servicios */}
      <section className="py-[64px] bg-cc-surface">
        <div className="max-w-[1280px] mx-auto px-7">
          <h2 className="font-display font-medium text-[1.5rem] text-cc-text mb-6">
            Otros servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map(({ slug: otherSlug, icon: Icon, name, cardDescription }) => (
              <Link
                key={otherSlug}
                href={`/servicios/${otherSlug}`}
                className="group border border-black/10 rounded-xl p-5 bg-cc-bg hover:border-cc-accent transition-colors flex flex-col"
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  className="text-cc-accent mb-3"
                  aria-hidden="true"
                />
                <h3 className="font-display font-medium text-[1rem] text-cc-text mb-1.5">
                  {name}
                </h3>
                <p className="text-[14px] text-cc-text-body leading-relaxed mb-4 line-clamp-2">
                  {cardDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-cc-accent font-medium mt-auto">
                  Ver detalle
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
