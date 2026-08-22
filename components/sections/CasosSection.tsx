import { ArrowUpRight, Check } from 'lucide-react';

import { casos } from '@/lib/casos';

// Prueba de capacidad, no adorno: cada caso se lee como desafío → qué
// construimos → resultado. Es la sección que sostiene el carril "cliente
// grande" del home; el resto de la página habla sobre todo al comercio
// local.
export default function CasosSection() {
  return (
    <section
      id="casos"
      aria-labelledby="casos-titulo"
      className="w-full bg-cc-surface py-[72px] md:py-[104px]"
    >
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="max-w-[620px]">
          <span className="mb-4 inline-flex items-center rounded-full bg-cc-warm-light px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cc-warm-deep">
            Casos
          </span>

          <h2
            id="casos-titulo"
            className="font-display text-[1.75rem] font-medium leading-[1.2] text-cc-text md:text-[2.25rem]"
          >
            Proyectos que ya están funcionando
          </h2>

          <p className="mt-4 text-[16px] leading-relaxed text-cc-text-body">
            De un comercio que abre sus puertas a una marca europea con
            operación en Buenos Aires. Distinto tamaño, mismo criterio: la
            tecnología tiene que sostener el negocio, no al revés.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso) => (
            <article
              key={caso.cliente}
              className="flex flex-col rounded-xl border border-black/[0.08] bg-cc-bg p-6 md:p-7"
            >
              <header className="border-b border-black/[0.07] pb-5">
                <h3 className="font-display text-[1.25rem] font-medium text-cc-text">
                  {caso.cliente}
                </h3>

                {caso.dominio && (
                  <a
                    href={`https://${caso.dominio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[13px] text-cc-warm-deep transition-all hover:gap-1.5 hover:underline"
                  >
                    {caso.dominio}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}

                <p className="mt-3 text-[13px] leading-snug text-cc-text-body">
                  {caso.rubro}
                </p>
                <p className="mt-0.5 text-[12px] text-cc-muted">
                  {caso.mercado}
                </p>
              </header>

              <div className="pt-5">
                <h4 className="text-[11px] font-medium uppercase tracking-wide text-cc-muted">
                  El desafío
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-cc-text-body">
                  {caso.desafio}
                </p>
              </div>

              <div className="pt-5">
                <h4 className="text-[11px] font-medium uppercase tracking-wide text-cc-muted">
                  Qué construimos
                </h4>
                <ul className="mt-2.5 flex list-none flex-col gap-2">
                  {caso.entregables.map((entregable) => (
                    <li
                      key={entregable}
                      className="flex items-start gap-2 text-[14px] leading-snug text-cc-text-label"
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 text-cc-warm"
                      />
                      {entregable}
                    </li>
                  ))}
                </ul>
              </div>

              {/* `mt-auto` alinea el resultado al pie en las tres tarjetas,
                  aunque cada caso tenga distinta cantidad de entregables. */}
              <div className="mt-auto pt-6">
                <div className="rounded-lg border-l-[3px] border-l-cc-warm bg-cc-warm-light/50 px-4 py-3.5">
                  <h4 className="text-[11px] font-medium uppercase tracking-wide text-cc-warm-deep">
                    Resultado
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-cc-text-label">
                    {caso.resultado}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
