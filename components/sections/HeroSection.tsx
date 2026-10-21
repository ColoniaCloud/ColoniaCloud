import HeroVideo from '@/components/ui/HeroVideo';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

const headline = 'Tecnología y estrategia digital para hacer crecer tu negocio';
const subheadline = 'Desarrollamos sitios, gestionamos tu marketing y automatizamos procesos, con foco en resultados medibles.';

// La animación se resuelve en CSS para que el titular esté presente en el HTML
// inicial y no dependa de la hidratación.
const d = (ms: number) => ({ '--cc-d': `${ms}ms` }) as CSSProperties;
const wordDelay = (ms: number) => ({ '--hero-word-delay': `${ms}ms` }) as CSSProperties;

function AnimatedWords({ text, start, step }: { text: string; start: number; step: number }) {
  const words = text.split(' ');
  return words.map((word, index) => (
    <span className="hero-word" key={`${word}-${index}`} style={wordDelay(start + index * step)}>
      {word}
      {index < words.length - 1 ? '\u00a0' : null}
    </span>
  ));
}

export default function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <HeroVideo />
      <div className="site-container hero-content">
        <div className="hero-copy">
          <Image className="hero-isologo" src="/brand/logo.svg" alt="" aria-hidden="true" width={1931} height={417} priority />
          <h1 id="hero-title" className="display"><AnimatedWords text={headline} start={480} step={75} /></h1>
          <p className="hero-lede"><AnimatedWords text={subheadline} start={1120} step={48} /></p>
          <div className="hero-actions" data-enter="fade-up" style={d(1750)}>
            <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
              Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link className="btn-secondary" href="#servicios">Explorar servicios <ArrowDown size={16} aria-hidden="true" /></Link>
          </div>
          <p className="hero-caption" data-enter="fade-up" style={d(1850)}>Una conversación clara para empezar. Sin compromiso.</p>
        </div>
      </div>
    </section>
  );
}
