import Link from 'next/link';
import {
  IconCode,
  IconChartBar,
  IconBolt,
  IconArrowRight,
} from '@tabler/icons-react';

const services = [
  {
    icon: IconCode,
    title: 'Desarrollo web y app',
    description:
      'Sitios institucionales, tiendas online y aplicaciones a medida. Diseño UI/UX exclusivo, rápido y optimizado para móviles.',
    href: '/servicios',
  },
  {
    icon: IconChartBar,
    title: 'Marketing digital',
    description:
      'Gestión de redes sociales, campañas publicitarias y estrategia de contenido para hacer crecer tu presencia online.',
    href: '/servicios',
  },
  {
    icon: IconBolt,
    title: 'Automatizaciones',
    description:
      'Conectamos tus herramientas y automatizamos procesos repetitivos. Desde notificaciones hasta integraciones con IA.',
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
            Desde tu primera web hasta automatizar tus procesos — lo hacemos con
            vos, paso a paso.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {services.map(({ icon: Icon, title, description, href }) => (
            <div
              key={title}
              className="group p-[22px] border border-black/10 rounded-lg bg-cc-bg hover:border-cc-accent hover:shadow-[0_0_0_3px_#F5EDE8] transition-all duration-200 cursor-pointer"
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
