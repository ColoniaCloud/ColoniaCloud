'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { services } from '@/lib/services';

// Iconos ilustrados por servicio, reemplazan los íconos lucide en las
// cards del bento grid del home.
const CARD_ICONS: Record<string, string> = {
  'web-app': '/iconos/Fibonacci.svg',
  software: '/iconos/Faro.svg',
  'infraestructura-vps': '/iconos/Plaza.svg',
  asesoria: '/iconos/Porton.svg',
};

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
// completo arriba; Asesoría cierra el grid también a ancho completo. Esas
// dos cards anchas muestran el ícono al costado en desktop; las angostas
// (Software, VPS) lo mantienen arriba.
const BENTO_LAYOUT: Record<string, { span?: string; featured?: boolean; horizontal?: boolean }> = {
  'web-app': { span: 'sm:col-span-2', featured: true, horizontal: true },
  asesoria: { span: 'sm:col-span-2', horizontal: true },
};

interface BentoServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  span?: string;
  featured?: boolean;
  horizontal?: boolean;
}

function BentoServiceCard({
  slug,
  title,
  description,
  icon,
  span,
  featured = false,
  horizontal = false,
}: BentoServiceCardProps) {
  return (
    <div
      className={[
        'group flex flex-col gap-4 rounded-xl border border-black/10 bg-cc-bg p-5 transition-colors hover:border-black/25 hover:shadow-[0_0_0_3px_var(--cc-accent-light)] sm:p-6',
        horizontal ? 'sm:flex-row sm:items-center sm:gap-8' : '',
        featured ? 'bg-cc-accent-light/40 border-black/15 min-h-[200px]' : 'min-h-[160px]',
        span ?? '',
      ].join(' ')}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className={[
          'flex-shrink-0',
          horizontal ? 'h-14 w-14 sm:h-20 sm:w-20' : 'h-8 w-8',
        ].join(' ')}
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3
            className={[
              'font-display font-medium text-cc-text',
              featured ? 'text-[1.375rem]' : 'text-[1.125rem]',
            ].join(' ')}
          >
            {title}
          </h3>

          <p
            className={[
              'text-cc-text-body leading-relaxed mt-2',
              featured ? 'max-w-[440px] text-[15px]' : 'text-[14px]',
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
    </div>
  );
}

// Fade-in-up de la foto del faro que corona el texto de la columna 1.
const faroImageVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ServiceHubSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="servicios" className="w-full bg-cc-bg py-[64px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-7 md:grid-cols-2 md:gap-12">
        {/* Columna 1 — Fondo dotted glow + título y párrafo, centrado */}
        <div className="relative flex flex-col items-center justify-center rounded-xl px-6 py-10 text-center md:min-h-[280px] md:py-0 md:pr-10">
          <DotPattern
            glow
            className="text-black/60 [mask-image:radial-gradient(380px_circle_at_center,white,transparent)]"
          />

          <div className="relative z-10 max-w-[380px]">
            <motion.img
              src="/punta-faro.png"
              alt=""
              aria-hidden="true"
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={faroImageVariants}
              className="mx-auto -mb-3 h-[220px] w-auto object-contain [mask-image:linear-gradient(to_bottom,black_35%,transparent_85%)]"
            />

            <div>
              <h2 className="font-display text-[1.75rem] font-medium text-cc-text">
                Nuestros servicios
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-cc-text-body">
                Nuestros servicios están enfocados en proveer soluciones
                inteligentes y pensadas para ser sostenidas a largo plazo.{' '}
                <strong className="font-medium text-cc-text">
                  Todos nuestros servicios cuentan con una auditoría previa y
                  gratuita.
                </strong>
              </p>
            </div>
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
                icon={CARD_ICONS[service.slug]}
                span={layout?.span}
                featured={layout?.featured}
                horizontal={layout?.horizontal}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
