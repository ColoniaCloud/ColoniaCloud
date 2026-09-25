import { ArrowUpRight } from 'lucide-react';
import { casos } from '@/lib/casos';
import Reveal from '@/components/ui/Reveal';

export default function CasosSection() {
  return (
    <section id="casos" className="site-section cases-section" aria-labelledby="cases-title">
      <div className="site-container">
        <div className="section-intro">
          <Reveal as="span" className="eyebrow">Trabajo real / Casos seleccionados</Reveal>
          <Reveal as="h2" variant="blur-in" id="cases-title" className="display" delay={60}>La prueba está<br />en lo que hacemos.</Reveal>
          <Reveal as="p" className="body-copy" delay={140}>Proyectos distintos, resueltos alrededor de una necesidad concreta. Estos son algunos de los desafíos que nos confiaron.</Reveal>
        </div>
        {/* El Reveal renderiza el propio <article>, sin nodo intermedio: la
            grilla necesita a las cards como hijas directas y `.case-card:first-child`
            tiene su propio fondo. */}
        <div className="case-grid stagger">
          {casos.map((caso, index) => (
            <Reveal as="article" key={caso.cliente} className="case-card">
              <span className="eyebrow">Caso 0{index + 1} / {caso.mercado}</span>
              <h3>{caso.cliente}</h3>
              {caso.dominio && <a className="case-domain" href={`https://${caso.dominio}`} target="_blank" rel="noopener noreferrer">{caso.dominio} <ArrowUpRight size={14} aria-hidden="true" /></a>}
              <p style={{ marginTop: 18 }}>{caso.desafio}</p>
              <div className="case-result"><strong>Lo que construimos</strong><p>{caso.entregables.slice(0, 3).join(' · ')}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
