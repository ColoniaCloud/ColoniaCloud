import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';
import PlanGrid from '@/components/ui/PlanGrid';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Servicios — Colonia Cloud',
  description: 'Diseño web, marketing digital, infraestructura cloud e IA y automatizaciones desde Colonia del Sacramento.',
  alternates: { canonical: '/servicios' },
};

export default function ServiciosPage() {
  return <>
    <InternalHero badge="Servicios" title="Cada avance necesita una buena base." description="Cuatro disciplinas conectadas para resolver lo que tu negocio necesita hoy y preparar lo que viene." />
    <section className="interior-section" aria-labelledby="all-services-title">
      <div className="site-container">
        <span className="eyebrow">Nuestra oferta / 01—04</span>
        <h2 id="all-services-title" className="interior-title" style={{ marginTop: 16, marginBottom: 37 }}>Elegí por dónde empezar.</h2>
        {services.map((service) => <article className="service-overview" key={service.slug}>
          <span className="number">{service.number}</span>
          <div><h2>{service.name}</h2><p>{service.cardDescription}</p></div>
          <Link href={`/servicios/${service.slug}`}>Ver servicio <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>)}
      </div>
    </section>

    {services.filter((service) => service.plans).map((service) => <section className="interior-section interior-alt" key={service.slug} aria-labelledby={`${service.slug}-plans`}>
      <div className="site-container">
        <span className="eyebrow">{service.number} / {service.name}</span>
        <h2 id={`${service.slug}-plans`} className="interior-title" style={{ marginTop: 15 }}>Planes para empezar con claridad.</h2>
        <p className="body-copy" style={{ maxWidth: 680, marginTop: 18 }}>{service.intro}</p>
        <PlanGrid plans={service.plans!} serviceName={service.name} customOption={service.customOption} />
      </div>
    </section>)}

    <section className="interior-section"><div className="site-container"><SectionCta title="La solución correcta empieza con una conversación." description="Contanos en qué etapa está tu negocio y armamos el camino juntos." /></div></section>
  </>;
}
