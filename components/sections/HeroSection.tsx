import Link from 'next/link';
import {
  IconBrandWhatsapp,
  IconArrowDown,
  IconClock,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-[140px] pb-[96px] md:pt-[180px] md:pb-[130px] bg-black">
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
      <div className="relative z-20 max-w-[1280px] mx-auto px-7 flex flex-col items-center text-center gap-6">
        {/* Título */}
        <h1 className="font-display font-medium text-[2.2rem] leading-[1.15] md:text-[3.2rem] text-white max-w-[680px]">
          Llevamos tu negocio
          <br />
          a la <span className="text-cc-accent font-semibold">nube</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-[1rem] text-white/80 leading-relaxed max-w-[480px]">
          Diseñamos, desarrollamos y hacemos crecer la presencia digital de
          negocios en Colonia del Sacramento.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Button
            variant="primary"
            size="lg"
            asChild
          >
            <a
              href="https://wa.me/59800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <IconBrandWhatsapp size={18} aria-hidden="true" />
              Escribinos por WhatsApp
            </a>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            asChild
          >
            <Link
              href="#servicios"
              className="inline-flex items-center gap-1.5"
            >
              Ver servicios
              <IconArrowDown size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Promesa */}
        <p className="flex items-center gap-1.5 text-[12px] text-white/50">
          <IconClock size={13} aria-hidden="true" className="text-cc-accent" />
          Respondemos en menos de 24 horas
        </p>
      </div>
    </section>
  );
}
