import { ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';
import Reveal from '@/components/ui/Reveal';

export default function CtaFinalSection() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="site-container">
        <Reveal as="span" className="eyebrow">El próximo paso empieza con una charla</Reveal>
        <Reveal as="h2" variant="blur-in" id="final-title" className="display" delay={60}>¿Y si lo hacemos<br />realidad?</Reveal>
        <Reveal as="p" delay={140}>Contanos qué querés construir. Te ayudamos a encontrar la combinación de diseño y tecnología que tiene sentido para tu negocio.</Reveal>
        <Reveal as="a" className="btn-primary" delay={200} href={whatsappHref('Hola, quiero conversar sobre un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></Reveal>
      </div>
    </section>
  );
}
