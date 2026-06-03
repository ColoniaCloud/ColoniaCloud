import { IconStarFilled } from '@tabler/icons-react';

const testimonios = [
  {
    quote:
      'En dos semanas teníamos el sitio listo. Ahora los clientes nos encuentran en Google y nos llegan consultas todos los días.',
    initial: 'M',
    name: 'Marcela R.',
    role: 'Restaurante, Colonia del Sacramento',
  },
  {
    quote:
      'Me explicaron todo sin tecnicismos. El proceso fue muy claro y el resultado superó lo que esperaba.',
    initial: 'D',
    name: 'Diego S.',
    role: 'Comercio de ropa, Colonia del Sacramento',
  },
  {
    quote:
      'Automatizamos las respuestas de WhatsApp de mi consultorio. Ahora pierdo mucho menos tiempo y mis pacientes están más conformes.',
    initial: 'L',
    name: 'Laura M.',
    role: 'Profesional de la salud, Colonia del Sacramento',
  },
];

export default function TestimoniosSection() {
  return (
    <section className="bg-cc-bg py-[64px]">
      <div className="max-w-[1280px] mx-auto px-7">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
            Testimonios
          </span>
          <h2 className="font-display font-medium text-[1.75rem] text-cc-text mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[15px] text-cc-text-body max-w-[480px] mx-auto leading-relaxed">
            Negocios de Colonia que ya están creciendo online.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {testimonios.map(({ quote, initial, name, role }) => (
            <div
              key={name}
              className="bg-cc-surface border-l-[3px] border-l-cc-accent border border-black/[0.07] rounded-tr-lg rounded-br-lg p-6"
            >
              {/* Estrellas */}
              <div className="flex items-center gap-0.5 mb-4" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled
                    key={i}
                    size={14}
                    className="text-cc-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Cita */}
              <p className="text-[14px] text-cc-text-body leading-relaxed italic mb-5">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Separador */}
              <div className="h-px bg-black/[0.06] mb-4" aria-hidden="true" />

              {/* Autor */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cc-accent-light flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-medium text-[14px] text-cc-accent">
                    {initial}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-cc-text">
                    {name}
                  </span>
                  <span className="text-[12px] text-cc-muted">{role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
