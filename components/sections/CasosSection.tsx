import { ArrowUpRight, Check } from 'lucide-react';
import { casos } from '@/lib/casos';
import Reveal from '@/components/ui/Reveal';

export default function CasosSection() {
  return (
    <section id="casos" className="site-section on-ink" aria-labelledby="cases-title">
      <div className="site-container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">Casos</Reveal>
          <Reveal as="h2" id="cases-title" className="display h-lg">La prueba está en lo que hacemos.</Reveal>
          <Reveal as="p" className="body-copy">Tres proyectos distintos, cada uno resuelto alrededor de una necesidad concreta.</Reveal>
        </div>

        <div className="case-grid stagger">
          {casos.map((caso) => (
            <Reveal as="article" key={caso.cliente} className="case-card">
              <span className="case-meta">{caso.mercado}</span>
              {/* Los logos son la versión blanca: por eso la sección es oscura.
                  La altura sale de la proporción del archivo para que pesen
                  lo mismo uno apaisado y uno compacto. */}
              <div className="case-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={caso.logo.src} alt="" width={caso.logo.ancho} height={caso.logo.alto} loading="lazy" style={{ height: Math.round(78 / Math.sqrt(caso.logo.ancho / caso.logo.alto)) }} />
              </div>
              <h3 className="case-name">{caso.cliente}</h3>
              <p className="case-rubro">{caso.rubro}</p>
              <p className="case-challenge">{caso.desafio}</p>
              <ul className="case-list" aria-label="Lo que construimos">
                {caso.entregables.slice(0, 4).map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
              </ul>
              {caso.dominio && (
                <a className="case-domain" href={`https://${caso.dominio}`} target="_blank" rel="noopener noreferrer">
                  {caso.dominio} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
