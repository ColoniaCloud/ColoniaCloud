import {
  IconMessageCircle,
  IconFileText,
  IconCode,
  IconLifebuoy,
} from '@tabler/icons-react';

const steps = [
  {
    number: '01',
    icon: IconMessageCircle,
    title: 'Consulta',
    description:
      'Nos contás qué necesita tu negocio. Sin formularios largos — una charla por WhatsApp alcanza.',
  },
  {
    number: '02',
    icon: IconFileText,
    title: 'Propuesta',
    description:
      'Te enviamos una propuesta clara con alcance, tiempos y precio. Sin letra chica.',
  },
  {
    number: '03',
    icon: IconCode,
    title: 'Desarrollo',
    description:
      'Trabajamos con revisiones en cada etapa. Vos aprobás antes de avanzar al siguiente paso.',
  },
  {
    number: '04',
    icon: IconLifebuoy,
    title: 'Soporte',
    description:
      'Entregamos y te acompañamos. 30 días de garantía y soporte continuo disponible.',
  },
];

export default function ProcesoSection() {
  return (
    <section id="proceso" className="bg-cc-surface py-[64px]">
      <div className="max-w-[1280px] mx-auto px-7">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
            Cómo trabajamos
          </span>
          <h2 className="font-display font-medium text-[1.75rem] text-cc-text mb-3">
            Simple, claro y sin sorpresas
          </h2>
          <p className="text-[15px] text-cc-text-body max-w-[480px] mx-auto leading-relaxed">
            Cuatro pasos para llevar tu proyecto del primer mensaje a la entrega
            final.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="p-2">
              {/* Número + ícono */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[2rem] font-display font-medium text-cc-accent/30 leading-none">
                  {number}
                </span>
                <div className="w-px h-8 bg-cc-accent/20" aria-hidden="true" />
                <div className="w-9 h-9 rounded-md bg-cc-accent-light flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-cc-accent"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h3 className="font-display font-medium text-[1rem] text-cc-text mb-2">
                {title}
              </h3>
              <p className="text-[13px] text-cc-text-body leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
