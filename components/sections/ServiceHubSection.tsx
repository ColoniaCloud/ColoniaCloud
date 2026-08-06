import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { services } from '@/lib/services';

const SITE_URL = 'https://colonia.cloud';

// Datos estructurados (schema.org) de los 4 servicios, para que los
// buscadores entiendan la oferta sin depender solo del texto visible.
const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'Service',
    position: index + 1,
    name: service.name,
    description: service.cardDescription,
    url: `${SITE_URL}/servicios/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Colonia Cloud',
      url: SITE_URL,
    },
  })),
};

// Layout tipo bento: el servicio de Desarrollo web & App es el destacado
// (índice 0 en lib/services.ts, ver comentario ahí) y ocupa el ancho
// completo arriba; Asesoría cierra el grid también a ancho completo.
const BENTO_LAYOUT: Record<string, { span?: string; featured?: boolean }> = {
  'web-app': { span: 'sm:col-span-2', featured: true },
  asesoria: { span: 'sm:col-span-2' },
};

interface BentoServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  span?: string;
  featured?: boolean;
}

function BentoServiceCard({
  slug,
  title,
  description,
  icon: Icon,
  span,
  featured = false,
}: BentoServiceCardProps) {
  return (
    <div
      className={[
        'group flex flex-col justify-between rounded-xl border border-black/10 bg-cc-bg p-5 transition-colors hover:border-black/25 hover:shadow-[0_0_0_3px_var(--cc-accent-light)] sm:p-6',
        featured ? 'bg-cc-accent-light/40 border-black/15 min-h-[200px]' : 'min-h-[160px]',
        span ?? '',
      ].join(' ')}
    >
      <div>
        <div
          className={[
            'flex items-center justify-center rounded-md bg-cc-accent-light',
            featured ? 'h-11 w-11' : 'h-9 w-9',
          ].join(' ')}
        >
          <Icon
            size={featured ? 22 : 18}
            strokeWidth={1.75}
            className="text-cc-accent"
            aria-hidden="true"
          />
        </div>

        <h3
          className={[
            'font-display font-medium text-cc-text mt-4',
            featured ? 'text-[1.375rem]' : 'text-[1.125rem]',
          ].join(' ')}
        >
          {title}
        </h3>

        <p
          className={[
            'text-cc-text-body leading-relaxed mt-2',
            featured ? 'max-w-[440px] text-[14px]' : 'text-[13px]',
          ].join(' ')}
        >
          {description}
        </p>
      </div>

      <Link
        href={`/servicios/${slug}`}
        aria-label={`Ir al servicio de ${title}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-cc-text transition-all group-hover:gap-2"
      >
        Ir al servicio
        <ArrowRight size={12} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function ServiceHubSection() {
  return (
    <section id="servicios" className="w-full bg-cc-bg py-[64px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-7 md:grid-cols-2 md:gap-12">
        {/* Columna 1 — Fondo dotted glow + título y párrafo, centrado */}
        <div className="relative flex min-h-[280px] flex-col items-center justify-center rounded-xl px-6 py-10 text-center md:border-r md:border-black/[0.08] md:py-0 md:pr-10">
          <DotPattern
            glow
            className="text-black/60 [mask-image:radial-gradient(380px_circle_at_center,white,transparent)]"
          />

          <div className="relative z-10 max-w-[380px]">
            <h2 className="font-display text-[1.75rem] font-medium text-cc-text">
              Nuestros servicios
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-cc-text-body">
              Nuestros servicios están enfocados en proveer soluciones
              inteligentes y pensadas para ser sostenidas a largo plazo.{' '}
              <strong className="font-medium text-cc-text">
                Todos nuestros servicios cuentan con una auditoría previa y
                gratuita.
              </strong>
            </p>
          </div>
        </div>

        {/* Columna 2 — Bento grid de servicios, foco en Desarrollo web & App */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const layout = BENTO_LAYOUT[service.slug];
            return (
              <BentoServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.cardTitle}
                description={service.cardDescription}
                icon={service.icon}
                span={layout?.span}
                featured={layout?.featured}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
