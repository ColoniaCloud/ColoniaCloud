export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden py-[100px] md:py-[130px] bg-black"
      data-navbar-theme="dark"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/drone.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/55 z-10" aria-hidden="true" />

      <div className="relative z-20 max-w-[1280px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Columna 1 — Ícono (cristal líquido estilo Apple) */}
        <div
          className="order-2 md:order-1 flex items-center justify-center md:justify-end"
          aria-hidden="true"
        >
          <div className="relative aspect-[489/496] w-36 sm:w-44 md:w-56 lg:w-64">
            {/* Lente: refracta y aclara el video de fondo dentro de la silueta */}
            <div className="hero-glass-lens animate-hero-lens absolute inset-0" />

            {/* Superficie de cristal: relleno translúcido, borde brillante y
                filtro SVG (desplazamiento líquido + brillo especular) */}
            <div
              className="absolute inset-0"
              style={{ filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.45))' }}
            >
              <svg
                className="animate-hero-icon h-full w-full"
                viewBox="0 0 489 496"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="hero-glass-fill" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                    <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
                  </linearGradient>

                  <linearGradient id="hero-glass-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="72%" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
                  </linearGradient>

                  <filter
                    id="hero-glass-surface"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    colorInterpolationFilters="sRGB"
                  >
                    {/* Ruido orgánico → desplazamiento "líquido" de los bordes */}
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.014 0.02"
                      numOctaves={1}
                      seed={9}
                      result="noise"
                    />
                    <feGaussianBlur in="noise" stdDeviation="1.2" result="noiseBlur" />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noiseBlur"
                      scale={3}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displaced"
                    />

                    {/* Brillo especular del cristal, siguiendo la silueta */}
                    <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="alphaBlur" />
                    <feSpecularLighting
                      in="alphaBlur"
                      surfaceScale={9}
                      specularConstant={0.95}
                      specularExponent={26}
                      lightingColor="#ffffff"
                      result="spec"
                    >
                      <fePointLight x={90} y={70} z={200} />
                    </feSpecularLighting>
                    <feComposite
                      in="spec"
                      in2="SourceAlpha"
                      operator="in"
                      result="specClipped"
                    />

                    <feMerge>
                      <feMergeNode in="displaced" />
                      <feMergeNode in="specClipped" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#hero-glass-surface)">
                  <path
                    d="M238.455 417.179C193.513 417.179 150.411 399.311 118.632 367.507C86.8532 335.703 69 292.567 69 247.589C69 202.611 86.8532 159.476 118.632 127.672C150.411 95.8674 193.513 78 238.455 78L238.455 417.179Z"
                    fill="url(#hero-glass-fill)"
                    stroke="url(#hero-glass-rim)"
                    strokeWidth={1.6}
                  />
                  <path
                    d="M421 417.179C376.058 417.179 332.956 399.311 301.177 367.507C269.398 335.703 251.545 292.567 251.545 247.589C251.545 202.611 269.398 159.476 301.177 127.672C332.956 95.8674 376.058 78 421 78V417.179Z"
                    fill="url(#hero-glass-fill)"
                    stroke="url(#hero-glass-rim)"
                    strokeWidth={1.6}
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Columna 2 — Texto */}
        <div className="order-1 md:order-2 flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h1 className="animate-hero-title font-display font-semibold text-[2.1rem] leading-[1.2] text-white md:text-[2.6rem] lg:text-[3rem] max-w-[560px]">
            Promoviendo la digitalización independiente
          </h1>
        </div>
      </div>
    </section>
  );
}
