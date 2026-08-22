import { ChevronDown } from 'lucide-react';

// Las cuatro fricciones que el UX Spec identifica antes del contacto son
// precio, plazo, qué pasa después de la entrega y si esto aplica a mi caso.
// Contestarlas acá evita que el visitante se vaya a buscar la respuesta a
// otro lado. Va con JSON-LD de FAQPage: Google puede mostrarlas en la SERP.
const preguntas = [
  {
    pregunta: '¿Cuánto cuesta un proyecto?',
    respuesta:
      'No publicamos una lista de precios porque no hay dos proyectos iguales: no cuesta lo mismo una web institucional que un CRM a medida. Lo que sí es fijo es que la auditoría inicial y la propuesta no tienen costo. Terminás con alcance, tiempos y precio cerrado por escrito, sin compromiso de contratar.',
  },
  {
    pregunta: '¿Cuánto demora?',
    respuesta:
      'Un sitio institucional puede estar listo en unas dos semanas. Un sistema a medida depende del relevamiento de tu operativa, así que el cronograma con fechas concretas va siempre en la propuesta, antes de que decidas.',
  },
  {
    pregunta: '¿Trabajan solo con negocios de Colonia?',
    respuesta:
      'Somos de Colonia del Sacramento y trabajamos mucho acá, pero no solo acá. Tenemos proyectos en Uruguay, en Argentina y con una marca alemana que opera en Buenos Aires. La cercanía es una ventaja cuando el cliente es local, no un límite cuando no lo es.',
  },
  {
    pregunta: 'Ya tengo un sitio o un sistema andando. ¿Sirve igual?',
    respuesta:
      'Sí, y suele ser el mejor momento para hablar. La auditoría gratuita arranca justamente por ahí: qué tenés hoy, qué te está costando y qué conviene rehacer, migrar o dejar como está. Migramos sistemas existentes sin empezar de cero cuando no hace falta.',
  },
  {
    pregunta: '¿Qué pasa después de la entrega?',
    respuesta:
      'Entregamos con 30 días de garantía y soporte continuo disponible. Si el proyecto incluye infraestructura, la administramos nosotros: servidor, dominios, certificados SSL, backups automáticos y monitoreo. No te queda un sistema que nadie sabe mantener.',
  },
  {
    pregunta: '¿La inteligencia artificial que usan es real o es marketing?',
    respuesta:
      'Tenemos agentes de IA en producción, dentro de nuestros propios productos. En Plata.studio el agente es open source, autohospedado y auditable: corre en infraestructura propia y los datos de tu negocio no se van a un tercero. Podés revisar qué hace y por qué.',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
    '@type': 'Question',
    name: pregunta,
    acceptedAnswer: { '@type': 'Answer', text: respuesta },
  })),
};

export default function FaqSection() {
  return (
    <section
      id="preguntas"
      aria-labelledby="faq-titulo"
      className="w-full bg-cc-surface py-[64px] md:py-[96px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <div className="mx-auto max-w-[1280px] px-7">
        <div className="mx-auto max-w-[820px]">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center rounded-full bg-cc-warm-light px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cc-warm-deep">
              Preguntas frecuentes
            </span>

            <h2
              id="faq-titulo"
              className="font-display text-[1.75rem] font-medium leading-[1.2] text-cc-text md:text-[2.25rem]"
            >
              Lo que todos preguntan antes de escribirnos
            </h2>
          </div>

          {/* `details`/`summary` nativos: acordeón accesible por teclado y
              funcional sin JavaScript, y el texto de las respuestas queda en
              el HTML para los buscadores aunque esté colapsado. */}
          <div className="mt-10 flex flex-col gap-3">
            {preguntas.map(({ pregunta, respuesta }) => (
              <details
                key={pregunta}
                className="group rounded-xl border border-black/[0.08] bg-cc-bg px-5 py-4 transition-colors open:border-cc-warm/40 hover:border-black/20 md:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-cc-text [&::-webkit-details-marker]:hidden">
                  {pregunta}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="flex-shrink-0 text-cc-muted transition-transform duration-200 group-open:rotate-180 group-open:text-cc-warm"
                  />
                </summary>

                <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-cc-text-body md:text-[15px]">
                  {respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
