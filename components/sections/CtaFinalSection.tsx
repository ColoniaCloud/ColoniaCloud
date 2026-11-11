import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';
import Reveal from '@/components/ui/Reveal';
import ScrollScene from '@/components/ui/ScrollScene';

export default function CtaFinalSection() {
  return (
    <ScrollScene as="section" className="final-cta" aria-labelledby="final-title">
      <div className="final-cta-media" aria-hidden="true">
        <Image src="/unsplash/crepusculo.webp" alt="" fill sizes="100vw" loading="lazy" />
      </div>
      <div className="site-container">
        <Reveal as="span" className="eyebrow">El próximo paso</Reveal>
        <Reveal as="h2" id="final-title" className="display h-xl">¿Y si lo hacemos realidad?</Reveal>
        <Reveal as="p">Contanos qué querés construir. En una charla te decimos por dónde conviene empezar y cuánto cuesta.</Reveal>
        <Reveal className="final-cta-actions">
          <a className="btn-primary" href={whatsappHref('Hola, quiero conversar sobre un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>
          <Link className="btn-ghost" href="/contacto">Prefiero un formulario</Link>
        </Reveal>
      </div>
    </ScrollScene>
  );
}
