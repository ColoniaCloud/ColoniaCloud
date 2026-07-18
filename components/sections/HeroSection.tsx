import Link from 'next/link';
import { IconArrowDown } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import ContactModal from '@/components/ui/ContactModal';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-[100px] pb-[64px] md:pt-[130px] md:pb-[90px] bg-black">
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

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Columna 1 — Ícono */}
        <div className="order-2 md:order-1 flex items-center justify-center md:justify-start">
          <svg
            viewBox="0 0 489 496"
            fill="currentColor"
            aria-hidden="true"
            className="animate-hero-icon h-auto w-36 text-white sm:w-44 md:w-56 lg:w-64"
          >
            <path d="M238.455 417.179C193.513 417.179 150.411 399.311 118.632 367.507C86.8532 335.703 69 292.567 69 247.589C69 202.611 86.8532 159.476 118.632 127.672C150.411 95.8674 193.513 78 238.455 78L238.455 417.179Z" />
            <path d="M421 417.179C376.058 417.179 332.956 399.311 301.177 367.507C269.398 335.703 251.545 292.567 251.545 247.589C251.545 202.611 269.398 159.476 301.177 127.672C332.956 95.8674 376.058 78 421 78V417.179Z" />
          </svg>
        </div>

        {/* Columna 2 — Texto */}
        <div className="order-1 flex flex-col items-center gap-6 text-center md:order-2">
          {/* Título */}
          <h1 className="animate-hero-title font-display font-semibold text-[2.1rem] leading-[1.2] text-white md:text-[2.6rem] lg:text-[3rem] max-w-[560px]">
            Promoviendo la excelencia digital del departamento
          </h1>

          {/* Subtítulo */}
          <p className="text-[1rem] text-white/80 leading-relaxed max-w-[440px]">
            Diseñamos, desarrollamos y proveemos todos los servicios digitales
            para la actualización e innovación de su empresa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <ContactModal triggerClassName="bg-white hover:bg-cc-accent-light text-black" />

            <Button
              variant="secondary"
              size="lg"
              asChild
            >
              <Link
                href="#servicios"
                className="inline-flex items-center gap-1.5"
              >
                Servicios
                <IconArrowDown size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
