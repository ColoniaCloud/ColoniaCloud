import Link from 'next/link';
import {
  IconRobot,
  IconLayoutDashboard,
  IconBulb,
  IconCode,
  IconSpeakerphone,
  IconServer,
  IconShieldLock,
  IconArrowRight,
} from '@tabler/icons-react';

const services = [
  {
    icon: IconRobot,
    title: 'Infraestructura de IA y automatizaciones',
    description:
      'Adaptamos la IA a tu negocio y tu negocio a la IA: desde simples agentes de atención hasta automatizaciones complejas en flujos de producción.',
    href: '/servicios',
  },
  {
    icon: IconLayoutDashboard,
    title: 'Software de gestión',
    description:
      'Creamos soluciones a medida para la gestión de tu proyecto: logística, comunicación y toma de decisiones, todo en un mismo lugar.',
    href: '/servicios',
  },
  {
    icon: IconBulb,
    title: 'IT Creative',
    description:
      'Más que un servicio, es una alianza de intercambio de ideas con el fin de promover la innovación en tu proyecto.',
    href: '/servicios',
  },
  {
    icon: IconCode,
    title: 'Web & App',
    description:
      'Sitios institucionales, tiendas online y aplicaciones a medida. Diseño UI/UX exclusivo, rápido y optimizado para móviles.',
    href: '/servicios',
  },
  {
    icon: IconSpeakerphone,
    title: 'Digital Branding & RRSS',
    description:
      'Nuestro servicio de marketing digital profesional: gestión de comunidad y reputación online (ORM), monitoreo y respuesta a menciones de marca.',
    href: '/servicios',
  },
  {
    icon: IconServer,
    title: 'Infraestructura VPS, dominios y bases de datos',
    description:
      'Ofrecemos el servicio "manejado" para simplificarte los procesos: configuración, mantenimiento y monitoreo de tu infraestructura.',
    href: '/servicios',
  },
  {
    icon: IconShieldLock,
    title: 'Ciberseguridad',
    description:
      'Auditorías de seguridad, mitigaciones de urgencia y consultoría para proteger tu negocio.',
    href: '/servicios',
  },
];

export default function ServiciosSection() {
  return (
    <section id="servicios" className="bg-cc-bg py-[64px]">
      <div className="max-w-[1280px] mx-auto px-7">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
            Nuestros servicios
          </span>
          <h2 className="font-display font-medium text-[1.75rem] text-cc-text mb-3">
            Todo lo que tu negocio necesita online
          </h2>
          <p className="text-[15px] text-cc-text-body max-w-[480px] mx-auto leading-relaxed">
            Desde inteligencia artificial hasta ciberseguridad — todo el
            ecosistema digital de tu negocio, en un mismo lugar.
          </p>
        </div>

        {/* Grid tipo masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-10">
          {services.map(({ icon: Icon, title, description, href }) => (
            <div
              key={title}
              className="group mb-5 break-inside-avoid p-[22px] border border-black/10 rounded-lg bg-cc-bg hover:border-cc-accent hover:shadow-[0_0_0_3px_var(--cc-accent-light)] transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-md bg-cc-accent-light flex items-center justify-center mb-4">
                <Icon size={20} className="text-cc-accent" aria-hidden="true" />
              </div>

              <h3 className="font-display font-medium text-[1.125rem] text-cc-text mb-2">
                {title}
              </h3>

              <p className="text-[14px] text-cc-text-body leading-relaxed mb-5">
                {description}
              </p>

              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-[13px] text-cc-accent font-medium"
              >
                Ver detalle
                <IconArrowRight
                  size={14}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
