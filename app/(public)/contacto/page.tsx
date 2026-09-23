import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import ContactForm from '@/components/ui/ContactForm';
import { whatsappHref } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contacto — Colonia Cloud',
  description: 'Contanos tu proyecto. Hablemos por WhatsApp o dejanos un mensaje.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return <>
    <InternalHero badge="Contacto" title="Una buena idea empieza hablando." description="Contanos qué tenés en mente. Te ayudamos a encontrar el siguiente paso." />
    <section className="interior-section"><div className="site-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 45 }}>
      <div><span className="eyebrow">Canal directo</span><h2 className="interior-title" style={{ marginTop: 15 }}>Escribinos por WhatsApp.</h2><p className="body-copy" style={{ maxWidth: 410, marginTop: 20 }}>Es la forma más simple de empezar. Contanos qué necesitás y te respondemos en menos de 24 horas hábiles.</p><a className="btn-primary" style={{ marginTop: 28 }} href={whatsappHref('Hola, quiero conversar sobre un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a><div style={{ display: 'grid', gap: 14, marginTop: 48, color: '#b8b9c3', fontSize: 13 }}><span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Clock3 size={16} color="#ffb88a" aria-hidden="true" />Respuesta en menos de 24 horas hábiles</span><span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MapPin size={16} color="#ffb88a" aria-hidden="true" />Colonia del Sacramento, Uruguay</span></div></div>
      <div style={{ padding: 'clamp(24px,4vw,40px)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, background: '#1b1e29' }}><span className="eyebrow">Otra forma de contacto</span><div style={{ marginTop: 25 }}><ContactForm /></div></div>
    </div></section>
  </>;
}
