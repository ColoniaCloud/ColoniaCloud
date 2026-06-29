import type { Metadata } from 'next';
import Link from 'next/link';
import {
  IconCheck,
  IconClock,
  IconBrandWhatsapp,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Gracias — Colonia Cloud',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-cc-bg py-[64px]">
      <div className="max-w-[480px] mx-auto px-7 flex flex-col items-center text-center gap-5">
        {/* Ícono */}
        <div className="w-16 h-16 rounded-full bg-cc-accent-light flex items-center justify-center mb-2">
          <IconCheck size={32} className="text-cc-accent" aria-hidden="true" />
        </div>

        {/* Título */}
        <h1 className="font-display font-medium text-[1.75rem] text-cc-text">
          ¡Mensaje recibido!
        </h1>

        {/* Descripción */}
        <p className="text-[15px] text-cc-text-body leading-relaxed">
          Te respondemos en menos de 24 horas hábiles por email o WhatsApp.
        </p>

        {/* Promesa */}
        <div className="flex items-center gap-2 bg-cc-surface rounded-lg px-5 py-3">
          <IconClock size={16} className="text-cc-accent flex-shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-cc-text-body">
            Tiempo promedio de respuesta: menos de 24 horas
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Button
            variant="primary"
            asChild
          >
            <a
              href="https://wa.me/59800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <IconBrandWhatsapp size={17} aria-hidden="true" />
              Escribinos ahora
            </a>
          </Button>

          <Button
            variant="secondary"
            asChild
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5"
            >
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
