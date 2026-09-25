import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';
import Reveal from '@/components/ui/Reveal';

export default function ServiceHubSection() {
  return (
    <section id="servicios" className="site-section service-section" aria-labelledby="services-title">
      <div className="site-container">
        <div className="section-topline">
          <div className="section-intro">
            <Reveal as="span" className="eyebrow">Lo que hacemos / 01—04</Reveal>
            {/* blur-in solo en el titular: sobre texto de 14px el desenfoque
                se ve sucio y cuesta GPU de más en móvil. */}
            <Reveal as="h2" variant="blur-in" id="services-title" className="display" delay={60}>Cuatro formas<br />de avanzar.</Reveal>
            <Reveal as="p" className="body-copy" delay={140}>Cada negocio tiene su propio momento. Encontramos el servicio adecuado y lo hacemos trabajar junto a los demás.</Reveal>
          </div>
          <Reveal as={Link} href="/servicios" className="section-link" delay={200}>Ver todos los servicios <ArrowUpRight size={16} aria-hidden="true" /></Reveal>
        </div>
        {/* El Reveal renderiza el propio <Link>, sin nodo intermedio: la grilla
            tiene que seguir viendo a las cards como hijas directas para que
            .service-card:nth-child(n)::before le dé a cada una su glow. */}
        <div className="service-grid stagger">
          {services.map(({ slug, number, illustration, cardTitle, cardOutcome, cardDescription }) => (
            <Reveal as={Link} className="service-card" href={`/servicios/${slug}`} key={slug}>
              {/* Decorativa: el nombre del servicio ya está en el <h3>, así que
                  va con alt vacío para que el lector de pantalla no lo repita.
                  `unoptimized` porque el optimizador de Next no procesa SVG, y
                  diferida porque la sección cae debajo del fold. */}
              <Image
                className="service-card-art"
                src={illustration.src}
                width={illustration.width}
                height={illustration.height}
                alt=""
                aria-hidden="true"
                loading="lazy"
                unoptimized
              />
              <div className="service-card-top"><span className="service-card-number">{number} / SERVICIO</span></div>
              <div className="service-card-content">
                <h3>{cardTitle}</h3>
                <p className="service-card-outcome">{cardOutcome}</p>
                <p className="service-card-description">{cardDescription}</p>
                <span className="service-card-bottom">Conocer el servicio <ArrowRight size={18} aria-hidden="true" /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
