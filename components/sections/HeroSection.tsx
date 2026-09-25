import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';
import Reveal from '@/components/ui/Reveal';

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
          Diseño web, marketing, infraestructura cloud e IA aplicada. Unimos lo creativo y lo técnico para que tu negocio llegue más lejos.
        </p>
        <div className="hero-actions" data-enter="fade-up" style={d(140)}>
          <a className="btn-primary" href={whatsappHref('Hola, quiero hablar de un proyecto con Colonia Cloud.')} target="_blank" rel="noopener noreferrer">
            Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link className="btn-secondary" href="#servicios">Explorar servicios <ArrowDown size={16} aria-hidden="true" /></Link>
        </div>
        <p className="hero-caption" data-enter="fade-up" style={d(180)}>Una conversación clara para empezar. Sin compromiso.</p>

        {/* La tarjeta sigue cayendo debajo del fold en casi todas las
            pantallas, así que acá conviene el observer: con `data-enter` la
            animación se gastaría fuera de cuadro y nadie la vería.

            Desde que el hero se achicó entra entera en 1920x990, y ahí el
            observer le cuesta 244ms de espera desde el primer pintado (CPU 4x,
            5Mbps, mediana de 5). Se queda igual: el LCP lo sigue marcando el
            <h1>, y pasarla a `data-enter` arriesga que la foto —más grande que
            el título— se vuelva el elemento LCP con un fundido de .8s encima. */}
        <Reveal variant="card-lift" className="hero-feature">
          <div className="hero-feature-photo" aria-hidden="true">
            <Image src="/atardecer colonia.webp" alt="" fill priority sizes="(max-width: 700px) 100vw, 1050px" />
          </div>
          <div className="hero-feature-copy">
            <span className="eyebrow">Un punto de partida distinto</span>
            <strong>Hecho en Colonia.<br />Pensado para ir más allá.</strong>
          </div>
          <span className="hero-feature-meta">Colonia del Sacramento · Uruguay</span>
        </Reveal>
      </div>
    </section>
  );
}
