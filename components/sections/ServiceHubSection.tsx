import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';
import Reveal from '@/components/ui/Reveal';

export default function ServiceHubSection() {
  return (
    <section id="servicios" className="site-section" aria-labelledby="services-title">
      <div className="site-container service-layout">
        <div className="service-aside">
          <Reveal as="span" className="eyebrow">Servicios</Reveal>
          <Reveal as="h2" id="services-title" className="display h-lg">Cuatro formas de avanzar.</Reveal>
          <Reveal as="p" className="body-copy">Cada negocio tiene su momento. Elegí por dónde empezar: lo hacemos trabajar junto a lo que ya tenés, con precios claros desde el primer día.</Reveal>
          <Reveal><Link href="/servicios" className="section-link">Ver todos los planes <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal>
        </div>

        <ul className="service-list stagger">
          {services.map(({ slug, number, illustration, cardTitle, cardOutcome, cardDescription, plans }) => {
            const from = plans ? Math.min(...plans.map((plan) => plan.price)) : null;
            return (
              <Reveal as="li" className="service-row" key={slug}>
                <span className="service-row-number" aria-hidden="true">{number}</span>
                <div>
                  <h3>{cardTitle}</h3>
                  <p className="service-row-outcome">{cardOutcome}</p>
                  <p className="service-row-description">{cardDescription}</p>
                  <div className="service-row-meta">
                    <span className="price-tag">{from ? <>Desde USD {from} <small>/ mes</small></> : 'Presupuesto a medida'}</span>
                    <Link className="service-row-link" href={`/servicios/${slug}`}>Conocer el servicio <ArrowRight size={17} aria-hidden="true" /></Link>
                  </div>
                </div>
                {/* Ilustración de un hito de Colonia. Decorativa: el nombre del
                    servicio ya está en el <h3>. `unoptimized` porque el
                    optimizador de Next no procesa SVG. */}
                <Image className="service-row-art" src={illustration.src} width={illustration.width} height={illustration.height} alt="" aria-hidden="true" loading="lazy" unoptimized />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
