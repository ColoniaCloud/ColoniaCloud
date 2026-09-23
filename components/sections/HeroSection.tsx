import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

export default function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="site-container hero-content">
        <span className="hero-kicker"><i aria-hidden="true" /> Desde Colonia del Sacramento</span>
        <h1 id="hero-title" className="display">Ideas que avanzan.<br /><em>Tecnología que acompaña.</em></h1>
        <p className="hero-lede">
          Diseño web, marketing, infraestructura cloud e IA aplicada. Unimos lo creativo y lo técnico para que tu negocio llegue más lejos.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
            Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link className="btn-secondary" href="#servicios">Explorar servicios <ArrowDown size={16} aria-hidden="true" /></Link>
        </div>
        <p className="hero-caption">Una conversación clara para empezar. Sin compromiso.</p>

        <div className="hero-feature">
          <div className="hero-feature-photo" aria-hidden="true">
            <Image src="/atardecer colonia.webp" alt="" fill priority sizes="(max-width: 700px) 100vw, 1050px" />
          </div>
          <div className="hero-feature-copy">
            <span className="eyebrow">Un punto de partida distinto</span>
            <strong>Hecho en Colonia.<br />Pensado para ir más allá.</strong>
          </div>
          <span className="hero-feature-meta">Colonia del Sacramento · Uruguay</span>
        </div>
      </div>
    </section>
  );
}
