// Franja de confianza, inmediatamente debajo del hero. Reemplaza a la vieja
// barra de nombres de productos: en este punto de la página el visitante
// todavía no sabe quiénes somos, así que lo que necesita ver no son marcas
// propias sino a quién le trabajamos y hasta dónde llegamos. Los productos
// propios pasaron a `ProductosSection`, más abajo, donde ya tienen contexto.

const rubros = [
  'Comercios y gastronomía',
  'E-commerce y retail',
  'Industria y marcas',
  'Profesionales y estudios',
];

export default function TrustBarSection() {
  return (
    <section
      aria-label="Rubros y mercados en los que trabajamos"
      className="relative w-full overflow-hidden bg-black py-5"
      data-navbar-theme="dark"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,#1a1a1a_50%,#000000_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-3 px-7 lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex flex-col items-center gap-x-5 gap-y-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
          <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-white/45 sm:text-[11px]">
            Trabajamos con
          </span>

          <ul className="flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            {rubros.map((rubro) => (
              <li
                key={rubro}
                className="whitespace-nowrap text-[12px] font-medium text-white/85 sm:text-[13px]"
              >
                {rubro}
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-center gap-2 whitespace-nowrap text-[12px] text-white/55 sm:text-[13px]">
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-warm"
            aria-hidden="true"
          />
          Proyectos en Uruguay, Argentina y Europa
        </p>
      </div>
    </section>
  );
}
