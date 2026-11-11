import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';
import Reveal from '@/components/ui/Reveal';

// Los planes salen de lib/services.ts: si cambia un precio ahí, cambia acá.
const plans = services.flatMap((service) => (service.plans ?? []).map((plan) => ({ ...plan, service: service.name, slug: service.slug })));

export default function PlanesSection() {
  return (
    <section id="planes" className="site-section" aria-labelledby="plans-title">
      <div className="site-container">
        <div className="plans-head">
          <div className="section-head">
            <Reveal as="span" className="eyebrow">Planes mensuales</Reveal>
            <Reveal as="h2" id="plans-title" className="display h-lg">Precios claros para empezar.</Reveal>
          </div>
          <Reveal><Link href="/servicios" className="section-link">Comparar planes <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal>
        </div>

        <div className="plan-strip stagger">
          {plans.map((plan) => (
            <Reveal as="article" className="plan-mini" key={plan.name}>
              <span className="plan-mini-service">{plan.service}</span>
              <h3>{plan.name}</h3>
              <p className="plan-mini-desc">{plan.description}</p>
              <p className="plan-mini-price">USD {plan.price}<small>/ {plan.period}</small></p>
              <Link className="plan-mini-link" href={`/servicios/${plan.slug}`} aria-label={`Ver el plan ${plan.name} de ${plan.service}`}>Ver qué incluye <ArrowRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          ))}
        </div>
        <p className="plans-note">Infraestructura cloud, IA y proyectos a medida se presupuestan según el alcance. En marketing, la inversión publicitaria se paga aparte a Google o Meta.</p>
      </div>
    </section>
  );
}
