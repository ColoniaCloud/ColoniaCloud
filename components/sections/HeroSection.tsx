import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Lock } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

// Coreografía de entrada del hero. Va toda con `data-enter` (CSS puro, sin
// observer) porque está arriba del fold: pasarla por IntersectionObserver la
// dejaría esperando a la hidratación.
//
// El <h1> usa `rise` y no `fade-up` a propósito: es el elemento LCP del home,
// y medido sobre este sitio un fundido encima le cuesta +376ms mientras que
// `rise` (solo transform, la opacidad nunca baja de 1) sale gratis. El detalle
// de la medición está en app/globals.css. No cambiar a una variante con fade
// sin volver a medir.
const d = (ms: number) => ({ '--cc-d': `${ms}ms` }) as CSSProperties;

export default function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="site-container hero-content">
        <span className="hero-kicker" data-enter="fade-up"><i aria-hidden="true" /> Desde Colonia del Sacramento</span>
        <h1 id="hero-title" className="display" data-enter="rise">Ideas que avanzan.<br /><em>Tecnología que acompaña.</em></h1>
        <p className="hero-lede" data-enter="fade-up" style={d(80)}>
          Diseño web, marketing, infraestructura cloud e IA aplicada, con un uso consciente de los recursos digitales. Unimos lo creativo y lo técnico para que tu negocio llegue más lejos.
        </p>
        <div className="hero-actions" data-enter="fade-up" style={d(140)}>
          <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
            Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link className="btn-secondary" href="#servicios">Explorar servicios <ArrowDown size={16} aria-hidden="true" /></Link>
        </div>
        <p className="hero-caption" data-enter="fade-up" style={d(180)}>Una conversación clara para empezar. Sin compromiso.</p>

        {/* Va con `data-enter` y no por observer, y con una variante que no
            toca la opacidad. Las dos cosas por lo mismo: esta ventana es el
            elemento más grande del primer print, así que es la que marca el
            LCP. Medido con CPU 4x y 5Mbps, mediana de 5: detrás del observer
            y con `blur-in` encima daba 1408ms, porque queda en opacidad 0
            hasta la hidratación y Chrome registra el LCP recién al final del
            fundido. Pintándola de una y animando solo transform y blur, el
            LCP vuelve a marcarlo el <h1>.

            Ventana de macOS Desktop con controles de semáforo y URL colonia.cloud */}
        <div className="hero-window" data-enter="rise-blur" style={d(220)}>
          <div className="hero-window-bar" aria-hidden="true">
            <div className="hero-window-controls">
              <span className="mac-dot mac-dot-close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
            <div className="hero-window-url">
              <Lock size={12} className="hero-window-lock" />
              <span>colonia.cloud</span>
            </div>
            <div className="hero-window-actions" />
          </div>
          <div className="hero-window-screen">
            <Image src="/atardecer colonia.webp" alt="" fill priority sizes="(max-width: 700px) 100vw, 1050px" />
            <div className="hero-window-sheet">
              <span className="eyebrow">Un punto de partida distinto</span>
              <strong>Hecho en Colonia.<br />Pensado para ir más allá.</strong>
              <span className="hero-window-place">Colonia del Sacramento · Uruguay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
