import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';

export default function ServiceHubSection() {
  return (
    <section id="servicios" className="site-section service-section" aria-labelledby="services-title">
      <div className="site-container">
        <div className="section-topline">
          <div className="section-intro">
            <span className="eyebrow">Lo que hacemos / 01—04</span>
            <h2 id="services-title" className="display">Cuatro formas<br />de avanzar.</h2>
            <p className="body-copy">Cada negocio tiene su propio momento. Encontramos el servicio adecuado y lo hacemos trabajar junto a los demás.</p>
          </div>
          <Link href="/servicios" className="section-link">Ver todos los servicios <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="service-grid">
          {services.map(({ slug, number, icon: Icon, cardTitle, cardOutcome, cardDescription }) => (
            <Link className="service-card" href={`/servicios/${slug}`} key={slug}>
              <div className="service-card-top"><span className="service-card-number">{number} / SERVICIO</span><span className="service-card-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span></div>
              <div className="service-card-content">
                <h3>{cardTitle}</h3>
                <p className="service-card-outcome">{cardOutcome}</p>
                <p className="service-card-description">{cardDescription}</p>
                <span className="service-card-bottom">Conocer el servicio <ArrowRight size={18} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
