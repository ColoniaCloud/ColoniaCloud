import { ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

export default function CtaFinalSection() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="site-container">
        <span className="eyebrow">El próximo paso empieza con una charla</span>
        <h2 id="final-title" className="display">¿Y si lo hacemos<br />realidad?</h2>
        <p>Contanos qué querés construir. Te ayudamos a encontrar la combinación de diseño y tecnología que tiene sentido para tu negocio.</p>
        <a className="btn-primary" href={whatsappHref('Hola, quiero conversar sobre un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
