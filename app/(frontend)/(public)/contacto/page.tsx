import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import ContactForm from '@/components/ui/ContactForm';
import { whatsappHref } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contacto · Colonia Cloud',
  description: 'Contanos tu proyecto. Hablemos por WhatsApp o dejanos un mensaje.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return <>
    <InternalHero badge="Contacto" title="Una buena idea empieza hablando." description="Contanos qué tenés en mente. Te ayudamos a encontrar el siguiente paso." photo="/unsplash/faro-arboles.webp" />
    <section className="interior-section"><div className="site-container split-grid" style={{ alignItems: 'start' }}>
      <div><span className="eyebrow">Canal directo</span><h2 className="interior-title" style={{ marginTop: 15 }}>Escribinos por WhatsApp.</h2><p className="body-copy" style={{ maxWidth: 410, marginTop: 20 }}>Es la forma más simple de empezar. Contanos qué necesitás y te respondemos en menos de 24 horas hábiles.</p><a className="btn-primary" style={{ marginTop: 28 }} href={whatsappHref('Hola, quiero conversar sobre un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a><div className="contact-notes"><span><Clock3 size={16} aria-hidden="true" />Respuesta en menos de 24 horas hábiles</span><span><MapPin size={16} aria-hidden="true" />Colonia del Sacramento, Uruguay</span></div></div>
      <div className="contact-card"><span className="eyebrow">Otra forma de contacto</span><div style={{ marginTop: 25 }}><ContactForm /></div></div>
    </div></section>
  </>;
}
