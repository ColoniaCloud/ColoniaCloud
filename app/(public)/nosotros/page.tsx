import type { Metadata } from 'next';
import { IconShieldCheck, IconMapPin, IconUsers } from '@tabler/icons-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';

export const metadata: Metadata = {
  title: 'Nosotros — Colonia Cloud',
  description:
    'Quiénes somos y por qué trabajamos desde Colonia del Sacramento.',
};

const valores = [
  {
    icon: IconShieldCheck,
    title: 'Claridad ante todo',
    description:
      'Propuestas sin letra chica. Precios directos. Proceso explicado paso a paso.',
  },
  {
    icon: IconMapPin,
    title: 'Conocemos el mercado local',
    description:
      'Trabajamos desde Colonia. Entendemos la estacionalidad, el cliente y el ritmo del negocio local.',
  },
  {
    icon: IconUsers,
    title: 'Relación directa',
    description:
      'Sin intermediarios ni cuentas ejecutivas. Hablás directo con quien hace el trabajo.',
  },
];

const stats = [
  { value: '100%', label: 'Servicio digital — sin fronteras' },
  { value: '24hs', label: 'Tiempo máximo de respuesta' },
  { value: '30 días', label: 'Garantía post-entrega' },
];

export default function NosotrosPage() {
  return (
    <>
      <InternalHero
        badge="Nosotros"
        title="Un equipo local que entiende tu negocio"
        description="Somos de Colonia del Sacramento. Conocemos el mercado, los negocios y las personas."
      />

      {/* Misión */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
                Nuestra misión
              </span>
              <h2 className="font-display font-medium text-[1.5rem] text-cc-text mt-3 mb-4">
                Que cada negocio de Colonia tenga presencia digital de calidad
              </h2>
              <p className="text-[15px] text-cc-text-body leading-relaxed mb-4">
                Colonia Cloud nació de una observación simple: muchos negocios locales
                excelentes son invisibles online. Restaurantes llenos en temporada que no
                aparecen en Google. Comercios con productos únicos sin tienda online.
                Profesionales de primer nivel sin presencia digital.
              </p>
              <p className="text-[15px] text-cc-text-body leading-relaxed">
                Nuestra misión es cambiar eso. Con tecnología accesible, precios honestos y
                un proceso claro que no requiere conocimientos técnicos de tu parte.
              </p>
            </div>

            {/* Valores */}
            <div className="flex flex-col gap-4">
              {valores.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-cc-accent-light rounded-md flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-cc-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-[15px] text-cc-text">{title}</p>
                    <p className="text-[13px] text-cc-text-body leading-relaxed mt-0.5">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Colonia */}
      <section className="py-[64px] bg-cc-surface">
        <div className="max-w-[1280px] mx-auto px-7 text-center">
          <h2 className="font-display font-medium text-[1.5rem] text-cc-text mb-4">
            Por qué desde Colonia del Sacramento
          </h2>
          <p className="text-[15px] text-cc-text-body max-w-[580px] mx-auto leading-relaxed mb-10">
            Colonia del Sacramento es una ciudad con identidad propia, turismo internacional
            y una economía local activa. Los negocios que invierten en su presencia digital
            hoy tienen una ventaja real frente a los que esperan.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[700px] mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <dt className="font-display font-medium text-[2rem] text-cc-accent">
                  {value}
                </dt>
                <dd className="text-[13px] text-cc-muted mt-1">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <SectionCta
            title="¿Querés trabajar con nosotros?"
            description="Contanos tu proyecto y te respondemos en menos de 24 horas."
          />
        </div>
      </section>
    </>
  );
}
