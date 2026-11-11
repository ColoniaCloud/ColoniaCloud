import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import HeroMedia from '@/components/ui/HeroMedia';
import ScrollScene from '@/components/ui/ScrollScene';
import { whatsappHref } from '@/lib/contact';

const proof = ['Planes mensuales desde USD 50', 'Respuesta en menos de 24 h hábiles', 'Sin compromiso'];

export default function HeroSection() {
  return (
    <ScrollScene as="section" mode="pin" className="hero" id="inicio" data-dark-top="" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-frame">
          <HeroMedia />
          <div className="hero-shade" aria-hidden="true" />
        </div>

        {/* Recorte del faro de Colonia: capa de primer plano del parallax.
            Decorativo, y solo se muestra en escritorio (ver globals.css). */}
        <Image className="hero-faro" src="/faro-recorte.webp" alt="" aria-hidden="true" width={1444} height={1500} sizes="(min-width: 960px) 92vh, 1px" loading="lazy" />

        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Agencia digital · Colonia del Sacramento</span>
            <h1 id="hero-title" className="display h-xl">Web, marketing y tecnología para negocios que quieren <em>crecer</em>.</h1>
            <p className="hero-lede">Sitios web desde USD 50 al mes, campañas, infraestructura cloud e inteligencia artificial. Un solo equipo, de acá, que te atiende de cerca.</p>
            <div className="hero-actions">
              <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
                Hablemos por WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link className="btn-ghost" href="#servicios">Ver servicios y precios <ArrowDown size={16} aria-hidden="true" /></Link>
            </div>
            <ul className="hero-proof">
              {proof.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
        </div>

        {/* Segundo tiempo del hero: aparece cuando la foto ya es una ventana. */}
        <p className="hero-second display">Un lugar de origen. Muchos lugares a donde llegar.</p>
        <p className="hero-coords">34°28′ S · 57°51′ O — Colonia del Sacramento, Uruguay</p>
      </div>
    </ScrollScene>
  );
}
