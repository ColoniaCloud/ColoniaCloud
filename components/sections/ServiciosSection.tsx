import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { CursorCardsContainer, CursorCard } from '@/components/ui/cursor-cards';
import { BorderBeam } from '@/components/ui/border-beam';
import { services } from '@/lib/services';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  isFeatured: boolean;
}

function ServiceCard({ icon: Icon, title, description, href, isFeatured }: ServiceCardProps) {
  const link = (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[13px] text-cc-accent font-medium"
    >
      Ver detalle
      <ArrowRight
        size={14}
        aria-hidden="true"
        className="group-hover:translate-x-1 transition-transform duration-200"
      />
    </Link>
  );

  if (isFeatured) {
    return (
      <CursorCard className="rounded-lg overflow-hidden cursor-pointer sm:col-span-2 lg:col-span-3">
        <BorderBeam colorFrom="#000000" colorTo="#A3A3A3" borderWidth={1.5} duration={8} />

        <div className="relative flex h-full flex-col p-[22px] md:flex-row md:items-center md:gap-8">
          <Icon
            size={40}
            strokeWidth={1.5}
            className="text-cc-accent shrink-0 mb-4 md:mb-0"
            aria-hidden="true"
          />

          <div className="md:flex-1">
            <h3 className="font-display font-medium text-cc-text mb-2 text-[1.375rem]">
              {title}
            </h3>
            <p className="text-[14px] text-cc-text-body leading-relaxed max-w-[720px]">
              {description}
            </p>
          </div>

          <div className="mt-4 md:mt-0 md:self-center md:shrink-0">{link}</div>
        </div>
      </CursorCard>
    );
  }

  return (
    <CursorCard className="rounded-lg overflow-hidden cursor-pointer">
      <div className="relative flex flex-col h-full p-[22px]">
        <Icon
          size={30}
          strokeWidth={1.5}
          className="text-cc-accent mb-4"
          aria-hidden="true"
        />

        <h3 className="font-display font-medium text-cc-text mb-2 text-[1.125rem]">
          {title}
        </h3>

        <p className="text-[14px] text-cc-text-body leading-relaxed mb-5">
          {description}
        </p>

        <div className="mt-auto">{link}</div>
      </div>
    </CursorCard>
  );
}

export default function ServiciosSection() {
  return (
    <section id="servicios" className="bg-cc-bg py-[64px]">
      <div className="max-w-[1280px] mx-auto px-7">
        {/* Encabezado: columna imagen (angosta) + columna título/texto (resto) */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-center mb-12">
          {/* Reservado para animación Lottie */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[220px] aspect-square" />
          </div>

          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
              Nuestros servicios
            </span>
            <h2 className="font-display font-medium text-[1.75rem] text-cc-text mb-3">
              Todo lo que tu negocio necesita online
            </h2>
            <p className="text-[15px] text-cc-text-body max-w-[540px] mx-auto md:mx-0 leading-relaxed">
              Desde inteligencia artificial hasta ciberseguridad — todo el
              ecosistema digital de tu negocio, en un mismo lugar.
            </p>
          </div>
        </div>

        {/* Grid: tarjeta destacada a lo ancho arriba + grid parejo de 6 debajo */}
        <CursorCardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {services.map(({ slug, icon, cardTitle, cardDescription }, index) => (
            <ServiceCard
              key={slug}
              icon={icon}
              title={cardTitle}
              description={cardDescription}
              href={`/servicios/${slug}`}
              isFeatured={index === 0}
            />
          ))}
        </CursorCardsContainer>
      </div>
    </section>
  );
}
