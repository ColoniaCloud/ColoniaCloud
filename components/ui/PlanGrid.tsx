import { Check, ArrowUpRight } from 'lucide-react';
import type { ServicePlan } from '@/lib/services';
import { whatsappHref } from '@/lib/contact';

export default function PlanGrid({ plans, serviceName, customOption }: { plans: ServicePlan[]; serviceName: string; customOption?: string }) {
  return <>
    <div className="plan-grid">
      {plans.map((plan) => <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
        <span className="eyebrow">Plan mensual / {serviceName}</span>
        <h3 style={{ marginTop: 13 }}>{plan.name}</h3>
        <p className="plan-description">{plan.description}</p>
        <div className="plan-price">USD {plan.price}<small> / {plan.period}</small></div>
        <ul>{plan.items.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>
        {plan.note && <p className="plan-note">{plan.note}</p>}
        <a className="btn-primary" href={whatsappHref(`Hola, quiero consultar por el plan ${plan.name} de ${serviceName}.`)} target="_blank" rel="noopener noreferrer">Consultar por {plan.name} <ArrowUpRight size={16} aria-hidden="true" /></a>
      </article>)}
    </div>
    {customOption && <div className="custom-plan"><div><span className="eyebrow">Una propuesta propia</span><h3 style={{ fontFamily: 'var(--cc-font-display)', fontSize: 24, marginTop: 7 }}>A medida</h3><p>{customOption}</p></div><a className="section-link" href={whatsappHref(`Hola, necesito una propuesta a medida de ${serviceName}.`)} target="_blank" rel="noopener noreferrer">Contanos tu idea <ArrowUpRight size={16} aria-hidden="true" /></a></div>}
  </>;
}
