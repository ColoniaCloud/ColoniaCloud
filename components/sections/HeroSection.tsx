import Link from 'next/link';
import {
  IconMapPin,
  IconBrandWhatsapp,
  IconArrowDown,
  IconClock,
} from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <section className="bg-cc-bg pt-[72px] pb-[64px]">
      <div className="max-w-[1280px] mx-auto px-7 flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[12px] font-medium">
          <IconMapPin size={13} aria-hidden="true" />
          Colonia del Sacramento, Uruguay
        </span>

        {/* Título */}
        <h1 className="font-display font-medium text-[2.2rem] leading-[1.15] md:text-[2.8rem] text-cc-text max-w-[640px]">
          Llevamos tu negocio
          <br />
          a la <span className="text-cc-accent">nube</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-[1rem] text-cc-text-body leading-relaxed max-w-[480px]">
          Diseñamos, desarrollamos y hacemos crecer la presencia digital de
          negocios en Colonia del Sacramento.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <a
            href="https://wa.me/59800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cc-accent hover:bg-cc-accent-hover text-white rounded-md px-7 py-3.5 text-[15px] font-medium transition-colors duration-150"
          >
            <IconBrandWhatsapp size={18} aria-hidden="true" />
            Escribinos por WhatsApp
          </a>

          <Link
            href="#servicios"
            className="inline-flex items-center gap-1.5 border border-black/20 hover:border-cc-accent text-cc-text-body hover:text-cc-accent rounded-md px-7 py-3.5 text-[15px] font-medium transition-colors duration-150"
          >
            Ver servicios
            <IconArrowDown size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Promesa */}
        <p className="flex items-center gap-1.5 text-[12px] text-cc-muted">
          <IconClock size={13} aria-hidden="true" />
          Respondemos en menos de 24 horas
        </p>
      </div>
    </section>
  );
}
