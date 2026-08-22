import { capacidades, productos } from '@/lib/productos';

// Franja oscura de capacidad técnica. Va después de "Cómo trabajamos"
// a propósito: quien solo quería una web ya encontró lo que buscaba y sigue
// hacia el CTA; quien está evaluando si tenemos espalda técnica, acá tiene
// producto propio y no adjetivos.
export default function ProductosSection() {
  return (
    <section
      id="productos"
      aria-labelledby="productos-titulo"
      className="w-full bg-black py-[80px] md:py-[112px]"
      data-navbar-theme="dark"
    >
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="max-w-[660px]">
          <span className="mb-4 inline-flex items-center rounded-full border border-cc-warm/40 bg-cc-warm/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cc-warm">
            Producto propio
          </span>

          <h2
            id="productos-titulo"
            className="font-display text-[1.75rem] font-medium leading-[1.2] text-white md:text-[2.25rem]"
          >
            No solo desarrollamos: también construimos nuestro propio software
          </h2>

          <p className="mt-4 text-[16px] leading-relaxed text-white/60">
            Tres plataformas que diseñamos, mantenemos y usamos nosotros
            mismos. Es lo que nos permite resolver con producto —y no
            improvisando— cuando un proyecto necesita CRM, agentes de IA o
            automatización de canales.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {productos.map((producto) => (
            <article
              key={producto.nombre}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cc-warm/40 md:p-7"
            >
              <h3 className="font-display text-[1.25rem] font-medium text-white">
                {producto.nombre}
              </h3>

              <p className="mt-1 text-[13px] font-medium text-cc-warm">
                {producto.claim}
              </p>

              <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                {producto.descripcion}
              </p>

              <ul className="mt-5 flex list-none flex-col gap-2 border-t border-white/10 pt-5">
                {producto.capacidades.map((capacidad) => (
                  <li
                    key={capacidad}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-white/75"
                  >
                    <span
                      className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-cc-warm"
                      aria-hidden="true"
                    />
                    {capacidad}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Capacidades transversales — cierran la franja con lo que aplica a
            cualquier proyecto, no solo a los productos propios. */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h3 className="text-[11px] font-medium uppercase tracking-wide text-white/40">
            Capacidad técnica
          </h3>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {capacidades.map(({ titulo, detalle }) => (
              <div key={titulo}>
                <dt className="font-display text-[15px] font-medium text-white">
                  {titulo}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                  {detalle}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
