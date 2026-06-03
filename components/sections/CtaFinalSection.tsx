import { IconBrandWhatsapp, IconClock } from '@tabler/icons-react';

export default function CtaFinalSection() {
  return (
    <section className="bg-black py-[72px]">
      <div className="max-w-[1280px] mx-auto px-7 flex flex-col items-center text-center gap-6">
        {/* Título */}
        <h2 className="font-display font-medium text-[1.8rem] md:text-[2.2rem] leading-[1.2] text-white max-w-[520px]">
          ¿Listo para llevar tu negocio a la nube?
        </h2>

        {/* Subtítulo */}
        <p className="text-[15px] text-white/55 max-w-[380px] leading-relaxed">
          Contanos qué necesitás. Sin compromiso, sin formularios largos.
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/59800000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cc-accent hover:bg-cc-accent-hover text-white rounded-md px-8 py-4 text-[16px] font-medium transition-colors duration-150"
        >
          <IconBrandWhatsapp size={20} aria-hidden="true" />
          Escribinos por WhatsApp
        </a>

        {/* Promesa */}
        <p className="flex items-center gap-1.5 text-[12px] text-white/35">
          <IconClock size={13} aria-hidden="true" />
          Respondemos en menos de 24 horas hábiles
        </p>
      </div>
    </section>
  );
}
