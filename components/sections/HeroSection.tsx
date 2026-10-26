import HeroGlobe from '@/components/ui/HeroGlobe';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

const headline = 'Tecnología y estrategia digital para hacer crecer tu negocio';
const subheadline = 'Desarrollamos sitios, gestionamos tu marketing y automatizamos procesos, con foco en resultados medibles.';

export default function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="site-container hero-content">
        <div className="hero-copy">
          <Image className="hero-isologo" src="/brand/logo.svg" alt="" aria-hidden="true" width={1931} height={417} priority />
          <h1 id="hero-title" className="display">{headline}</h1>
          <p className="hero-lede">{subheadline}</p>
          <div className="hero-actions">
            <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
              Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link className="btn-secondary" href="#servicios">Explorar servicios <ArrowDown size={16} aria-hidden="true" /></Link>
          </div>
          <p className="hero-caption">Una conversación clara para empezar. Sin compromiso.</p>
        </div>
        <HeroGlobe />
      </div>
    </section>
  );
}
