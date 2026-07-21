import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  LayoutDashboard,
  Lightbulb,
  Code,
  Megaphone,
  Server,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { CursorCardsContainer, CursorCard } from '@/components/ui/cursor-cards';
import { BorderBeam } from '@/components/ui/border-beam';

const services = [
  {
    icon: Bot,
    title: 'Infraestructura de IA y automatizaciones',
    description:
      'Adaptamos la IA a tu negocio y tu negocio a la IA: desde simples agentes de atención hasta automatizaciones complejas en flujos de producción.',
    href: '/servicios',
  },
  {
    icon: Code,
    title: 'Web & App',
    description:
      'Sitios institucionales, tiendas online y aplicaciones a medida. Diseño UI/UX exclusivo, rápido y optimizado para móviles.',
    href: '/servicios',
  },
  {
    icon: LayoutDashboard,
    title: 'Software de gestión',
    description:
      'Creamos soluciones a medida para la gestión de tu proyecto: logística, comunicación y toma de decisiones, todo en un mismo lugar.',
    href: '/servicios',
  },
  {
    icon: Megaphone,
    title: 'Digital Branding & RRSS',
    description:
      'Nuestro servicio de marketing digital profesional: gestión de comunidad y reputación online (ORM), monitoreo y respuesta a menciones de marca.',
    href: '/servicios',
  },
  {
    icon: ShieldCheck,
    title: 'Ciberseguridad',
    description:
      'Auditorías de seguridad, mitigaciones de urgencia y consultoría para proteger tu negocio.',
    href: '/servicios',
  },
  {
    icon: Server,
    title: 'Infraestructura VPS, dominios y bases de datos',
    description:
      'Ofrecemos el servicio "manejado" para simplificarte los procesos: configuración, mantenimiento y monitoreo de tu infraestructura.',
    href: '/servicios',
  },
  {
    icon: Lightbulb,
    title: 'IT Creative',
    description:
      'Más que un servicio, es una alianza de intercambio de ideas con el fin de promover la innovación en tu proyecto.',
    href: '/servicios',
  },
];

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  isFeatured: boolean;
}

function ServiceCard({ icon: Icon, title, description, href, isFeatured }: ServiceCardProps) {
  return (
    <CursorCard
      className={`rounded-lg overflow-hidden cursor-pointer ${
        isFeatured ? 'sm:col-span-2 lg:col-span-1 lg:row-span-3' : ''
      }`}
    >
      {isFeatured && <BorderBeam colorFrom="#000000" colorTo="#A3A3A3" borderWidth={1.5} duration={8} />}

      <div className="relative flex flex-col h-full p-[22px]">
        <Icon
          size={isFeatured ? 40 : 30}
          strokeWidth={1.5}
          className="text-cc-accent mb-4"
          aria-hidden="true"
        />

        <h3
          className={`font-display font-medium text-cc-text mb-2 ${
            isFeatured ? 'text-[1.375rem]' : 'text-[1.125rem]'
          }`}
        >
          {title}
        </h3>

        <p className="text-[14px] text-cc-text-body leading-relaxed mb-5">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[13px] text-cc-accent font-medium mt-auto"
        >
          Ver detalle
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </CursorCard>
  );
}

export default function ServiciosSection() {
  return (
    <section id="servicios" className="bg-cc-bg py-[64px]">
      <div className="max-w-[1280px] mx-auto px-7">
        {/* Encabezado: columna imagen (35%) + columna título/texto (resto) */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-8 md:gap-12 items-center mb-12">
          <div className="flex justify-center md:justify-start">
            <img
              src="/atardecer-mask.png"
              alt=""
              aria-hidden="true"
              className="w-full max-w-[280px] md:max-w-none h-auto"
            />
          </div>

          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
              Nuestros servicios
            </span>
            <h2 className="font-display font-medium text-[1.75rem] text-cc-text mb-3">
              Todo lo que tu negocio necesita online
            </h2>
            <p className="text-[15px] text-cc-text-body max-w-[480px] mx-auto md:mx-0 leading-relaxed">
              Desde inteligencia artificial hasta ciberseguridad — todo el
              ecosistema digital de tu negocio, en un mismo lugar.
            </p>
          </div>
        </div>

        {/* Grid: tarjeta destacada a la izquierda + grid parejo de 6 a la derecha */}
        <CursorCardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-5 mt-10">
          {services.map(({ icon, title, description, href }, index) => (
            <ServiceCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              href={href}
              isFeatured={index === 0}
            />
          ))}
        </CursorCardsContainer>
      </div>
    </section>
  );
}
