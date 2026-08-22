'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
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
  outcome: string;
  description: string;
  icon: string;
  span?: string;
  featured?: boolean;
  horizontal?: boolean;
}

// La tarjeta entera es el enlace. Antes solo lo era el texto "Ir al
// servicio", que en móvil es un blanco de pocos milímetros; como adentro no
// hay ningún otro control, envolver todo en un Link no genera enlaces
// anidados ni suma paradas de tabulación.
function BentoServiceCard({
  slug,
  title,
  outcome,
  description,
  icon,
  span,
  featured = false,
  horizontal = false,
}: BentoServiceCardProps) {
  return (
    <Link
      href={`/servicios/${slug}`}
      className={[
        'group flex flex-col gap-4 rounded-xl border p-5 transition-all duration-200 sm:p-6',
        'hover:-translate-y-0.5 hover:border-cc-warm/50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-warm focus-visible:ring-offset-2',
        horizontal ? 'sm:flex-row sm:items-center sm:gap-8' : '',
        featured
          ? 'min-h-[200px] border-cc-warm/25 bg-cc-warm-light/45'
          : 'min-h-[160px] border-black/10 bg-cc-bg',
        span ?? '',
      ].join(' ')}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className={[
          'flex-shrink-0 transition-transform duration-300 group-hover:scale-105',
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

          {/* Traducción del título técnico a lo que gana el cliente: el
              dueño de un comercio no busca "VPS", busca no quedarse sin
              sitio un sábado a la noche. */}
          <p className="mt-1 text-[13px] font-medium text-cc-warm-deep">
            {outcome}
          </p>

          <p
            className={[
              'mt-2.5 leading-relaxed text-cc-text-body',
              featured ? 'max-w-[440px] text-[15px]' : 'text-[14px]',
            ].join(' ')}
          >
            {description}
          </p>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-cc-text transition-all group-hover:gap-2 group-hover:text-cc-warm-deep">
          Ir al servicio
          <ArrowRight size={12} aria-hidden="true" />
        </span>
      </div>
    </Link>
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
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="w-full bg-cc-bg py-[72px] md:py-[104px]"
    >
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
            {/* La animación va en el wrapper y no en la imagen: así el faro
                puede servirse con next/image, que lo entrega como WebP/AVIF
                al tamaño real en pantalla en vez de mandar el PNG de 2 MB. */}
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={faroImageVariants}
              className="-mb-3"
            >
              <Image
                src="/punta-faro.png"
                alt=""
                aria-hidden="true"
                width={212}
                height={220}
                sizes="212px"
                className="mx-auto h-[220px] w-auto object-contain [mask-image:linear-gradient(to_bottom,black_35%,transparent_85%)]"
              />
            </motion.div>

            <div>
              <h2
                id="servicios-titulo"
                className="font-display text-[1.75rem] font-medium leading-[1.2] text-cc-text md:text-[2.25rem]"
              >
                Nuestros servicios
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-cc-text-body">
                Soluciones pensadas para sostenerse en el tiempo: te las
                dejamos andando y te acompañamos después.
              </p>

              {/* La auditoría gratuita es el argumento que más baja la
                  barrera para escribir. Antes vivía en negrita adentro del
                  párrafo; acá es un elemento propio y se ve. */}
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-cc-warm-light px-4 py-2 text-[13px] font-medium text-cc-warm-deep">
                <BadgeCheck size={15} aria-hidden="true" />
                Todos empiezan con una auditoría gratuita
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
                outcome={service.cardOutcome}
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
