import { ArrowUpRight } from 'lucide-react';
import { casos } from '@/lib/casos';

export default function CasosSection() {
  return (
    <section id="casos" className="site-section cases-section" aria-labelledby="cases-title">
      <div className="site-container">
        <div className="section-intro">
          <span className="eyebrow">Trabajo real / Casos seleccionados</span>
          <h2 id="cases-title" className="display">La prueba está<br />en lo que hacemos.</h2>
          <p className="body-copy">Proyectos distintos, resueltos alrededor de una necesidad concreta. Estos son algunos de los desafíos que nos confiaron.</p>
        </div>
        <div className="case-grid">
          {casos.map((caso, index) => (
            <article key={caso.cliente} className="case-card">
              <span className="eyebrow">Caso 0{index + 1} / {caso.mercado}</span>
              <h3>{caso.cliente}</h3>
              {caso.dominio && <a className="case-domain" href={`https://${caso.dominio}`} target="_blank" rel="noopener noreferrer">{caso.dominio} <ArrowUpRight size={14} aria-hidden="true" /></a>}
              <p style={{ marginTop: 18 }}>{caso.desafio}</p>
              <div className="case-result"><strong>Lo que construimos</strong><p>{caso.entregables.slice(0, 3).join(' · ')}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
