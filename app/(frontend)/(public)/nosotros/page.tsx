import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, MessageSquareText, ShieldCheck } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';

export const metadata: Metadata = {
  title: 'Nosotros — Colonia Cloud',
  description: 'Diseño y tecnología desde Colonia del Sacramento, Uruguay. Conocé la forma en que trabajamos.',
  alternates: { canonical: '/nosotros' },
};

const principles = [
  { icon: MapPin, title: 'Una mirada con origen', text: 'Trabajamos desde Colonia del Sacramento y llevamos esa cercanía a proyectos dentro y fuera de Uruguay.' },
  { icon: MessageSquareText, title: 'Conversaciones claras', text: 'Explicamos lo que proponemos, por qué lo proponemos y qué necesita el negocio para avanzar.' },
  { icon: ShieldCheck, title: 'Pensado para sostenerse', text: 'Diseño y tecnología que se pueden operar, cuidar y mejorar después del lanzamiento.' },
];

export default function NosotrosPage() {
  return <>
    <InternalHero badge="Nosotros" title="Una forma cercana de hacer tecnología." description="Con base en Colonia del Sacramento y la mirada puesta en lo que viene." />
    <section className="interior-section"><div className="site-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 55, alignItems: 'center' }}>
      <div><span className="eyebrow">Nuestro punto de partida</span><h2 className="interior-title" style={{ marginTop: 15 }}>La tecnología cobra sentido cuando entiende a las personas.</h2><p className="body-copy" style={{ marginTop: 24, fontSize: 16 }}>Colonia Cloud nace de una idea simple: cada negocio merece herramientas digitales que respondan a su realidad. Escuchamos primero. Después combinamos diseño, marketing, cloud e inteligencia artificial para resolver lo que importa.</p><p className="body-copy" style={{ marginTop: 15, fontSize: 16 }}>El trabajo puede suceder en distintos países. La forma de trabajar sigue siendo directa, humana y clara.</p></div>
      <figure style={{ position: 'relative', minHeight: 440, overflow: 'hidden', borderRadius: 20, border: '1px solid rgba(255,255,255,.12)' }}><Image src="/fotos/aerea-centro.jpg" alt="Vista aérea del centro histórico de Colonia del Sacramento" fill sizes="(max-width: 700px) 100vw, 45vw" style={{ objectFit: 'cover' }} /><figcaption style={{ position: 'absolute', bottom: 17, right: 17, padding: '8px 11px', borderRadius: 8, background: 'rgba(10,12,18,.8)', color: '#f5eee8', fontSize: 11, letterSpacing: '.1em' }}>COLONIA DEL SACRAMENTO</figcaption></figure>
    </div></section>
    <section className="interior-section interior-alt"><div className="site-container"><span className="eyebrow">Lo que nos guía</span><h2 className="interior-title" style={{ marginTop: 15 }}>Tres principios. Una misma forma de trabajar.</h2><div className="feature-grid">{principles.map(({ icon: Icon, title, text }) => <article className="feature-tile" key={title}><Icon size={22} color="#ffb88a" aria-hidden="true" /><h3 style={{ marginTop: 22 }}>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="interior-section"><div className="site-container"><SectionCta title="Conozcamos tu proyecto." description="Una buena solución empieza por entender qué querés cambiar." /></div></section>
  </>;
}
