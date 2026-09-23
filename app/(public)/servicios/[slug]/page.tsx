import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';
import PlanGrid from '@/components/ui/PlanGrid';
import { services, getService } from '@/lib/services';

type Params = { slug: string };
const SITE_URL = 'https://colonia.cloud';

export function generateStaticParams(): Params[] { return services.map((service) => ({ slug: service.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: `${service.name} — Colonia Cloud`, description: service.heroDescription, alternates: { canonical: `/servicios/${slug}` } };
}

export default async function ServicioDetallePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const otherServices = services.filter((item) => item.slug !== slug);
  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${SITE_URL}/servicios` },
    { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/servicios/${slug}` },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <InternalHero badge={service.badge} title={service.heroTitle} description={service.heroDescription} />
    <section className="interior-section">
      <div className="site-container">
        <Link href="/servicios" className="section-link"><ArrowLeft size={15} aria-hidden="true" /> Todos los servicios</Link>
        <p className="body-copy" style={{ maxWidth: 800, marginTop: 37, fontSize: 19 }}>{service.intro}</p>
        <h2 className="interior-title" style={{ marginTop: 62 }}>Qué podemos construir.</h2>
        <div className="feature-grid">{service.features.map((feature) => <article className="feature-tile" key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
      </div>
    </section>
    {service.plans && <section className="interior-section interior-alt"><div className="site-container"><span className="eyebrow">Planes mensuales</span><h2 className="interior-title" style={{ marginTop: 15 }}>Una forma clara de empezar.</h2><PlanGrid plans={service.plans} serviceName={service.name} customOption={service.customOption} /></div></section>}
    <section className={`interior-section${service.plans ? '' : ' interior-alt'}`}><div className="site-container"><span className="eyebrow">El trabajo detrás</span><h2 className="interior-title" style={{ marginTop: 15 }}>Qué incluye el servicio.</h2><ul style={{ listStyle: 'none', display: 'grid', gap: 17, marginTop: 31, padding: 0 }}>{service.deliverables.map((item) => <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#d9d6db', fontSize: 15 }}><Check size={18} color="#ffb88a" aria-hidden="true" />{item}</li>)}</ul></div></section>
    <section className="interior-section"><div className="site-container"><SectionCta title={service.ctaTitle} description={service.ctaDescription} message={`Hola, quiero consultar por el servicio de ${service.name}.`} /></div></section>
    <section className="interior-section interior-alt"><div className="site-container"><span className="eyebrow">Explorá también</span><h2 className="interior-title" style={{ marginTop: 15, marginBottom: 27 }}>Otras formas de avanzar.</h2>{otherServices.map((item) => <article className="service-overview" key={item.slug}><span className="number">{item.number}</span><div><h2>{item.name}</h2><p>{item.cardDescription}</p></div><Link href={`/servicios/${item.slug}`}>Ver servicio <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}</div></section>
  </>;
}
