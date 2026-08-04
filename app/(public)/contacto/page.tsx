import type { Metadata } from 'next';
import { Clock, MapPin, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/brand-icons';
import InternalHero from '@/components/ui/InternalHero';
import ContactForm from '@/components/ui/ContactForm';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contacto — Colonia Cloud',
  description: 'Contactanos por WhatsApp o formulario. Respondemos en menos de 24 horas.',
};

const infoItems = [
  { icon: Clock, text: 'Respondemos en menos de 24 horas hábiles' },
  { icon: MapPin, text: 'Colonia del Sacramento, Uruguay' },
  { icon: ShieldCheck, text: 'Sin compromiso ni costo por consultar' },
];

export default function ContactoPage() {
  return (
    <>
      <InternalHero
        badge="Contacto"
        title="Hablemos"
        description="Contanos qué necesitás. Sin compromiso y sin formularios largos."
      />

      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Columna izquierda — WhatsApp */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
                  Canal principal
                </span>
                <h2 className="font-display font-medium text-[1.375rem] text-cc-text mt-2 mb-1">
                  Escribinos por WhatsApp
                </h2>
                <p className="text-[14px] text-cc-text-body leading-relaxed">
                  Es la forma más rápida de hablar con nosotros. Respondemos en menos de 24
                  horas hábiles.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-fit"
                asChild
              >
                <a
                  href="https://wa.me/59896082266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <WhatsAppIcon size={20} aria-hidden="true" />
                  Abrir WhatsApp
                </a>
              </Button>

              <div className="flex flex-col gap-3 mt-2">
                {infoItems.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon size={16} className="text-cc-accent flex-shrink-0" aria-hidden="true" />
                    <span className="text-[13px] text-cc-text-body">{text}</span>
                  </div>
                ))}
              </div>

              {/* Separador */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-black/[0.08]" />
                <span className="text-[12px] text-cc-muted px-2">
                  o si preferís dejarnos un mensaje
                </span>
                <div className="flex-1 h-px bg-black/[0.08]" />
              </div>
            </div>

            {/* Columna derecha — Formulario */}
            <ContactForm />

          </div>
        </div>
      </section>
    </>
  );
}
