import type { Metadata } from 'next';
import {
  IconCode,
  IconChartBar,
  IconBolt,
  IconServer,
  IconInfoCircle,
} from '@tabler/icons-react';
import InternalHero from '@/components/ui/InternalHero';
import SectionCta from '@/components/ui/SectionCta';

export const metadata: Metadata = {
  title: 'Servicios — Colonia Cloud',
  description:
    'Desarrollo web, marketing digital y automatizaciones para negocios en Colonia del Sacramento.',
};

// ── Datos ──────────────────────────────────────────────────────────────────

type PricingCard = {
  name: string;
  badge: string;
  price: string;
  description: string;
  tipo: string;
  featured?: boolean;
};

const webCards: PricingCard[] = [
  {
    name: 'Sitio esencial',
    badge: 'WordPress',
    price: 'Desde USD 250',
    description:
      'Presencia online institucional hasta 5 páginas. Diseño responsive, formulario de contacto y SEO básico incluidos.',
    tipo: 'Pago único',
  },
  {
    name: 'Tienda online',
    badge: 'WooCommerce',
    price: 'Desde USD 400',
    description:
      'E-commerce completo con catálogo, carrito, gestión de stock y medios de pago integrados.',
    tipo: 'Pago único',
  },
  {
    name: 'Sitio premium',
    badge: 'Desarrollo propio',
    price: 'Desde USD 600',
    description:
      'Diseño UI/UX exclusivo, funcionalidades a medida e integraciones con sistemas externos.',
    tipo: 'Pago único',
    featured: true,
  },
  {
    name: 'Tienda online premium',
    badge: 'Desarrollo propio',
    price: 'Desde USD 800',
    description:
      'E-commerce robusto sin dependencia de WordPress. Mayor velocidad, control total del código y escalabilidad.',
    tipo: 'Pago único',
  },
  {
    name: 'App móvil',
    badge: 'iOS / Android',
    price: 'Cotización',
    description:
      'Aplicación nativa, híbrida o multiplataforma según las necesidades del proyecto. Stack a medida.',
    tipo: 'Por proyecto',
  },
];

const mktCards: PricingCard[] = [
  {
    name: 'Presencia activa',
    badge: 'Mensual',
    price: 'Desde USD 100/mes',
    description:
      'Gestión de Instagram y/o Facebook. 8–12 publicaciones mensuales con diseño gráfico, respuesta a comentarios y reporte mensual.',
    tipo: 'Mensual',
  },
  {
    name: 'Crecimiento',
    badge: 'Mensual',
    price: 'Cotización',
    description:
      'Todo lo del plan Presencia activa + campañas Meta Ads con segmentación geográfica, Google Business y estrategia de contenido mensual.',
    tipo: 'Mensual',
  },
];

const autoCards: PricingCard[] = [
  {
    name: 'Flujo simple',
    badge: 'Por proyecto',
    price: 'Desde USD 400',
    description:
      'Relevamiento, diseño e implementación de una automatización puntual. Documentación y capacitación incluidas.',
    tipo: 'Por proyecto',
  },
  {
    name: 'Sistema integrado',
    badge: 'Por proyecto',
    price: 'Cotización',
    description:
      'Múltiples flujos conectados, integración de herramientas del negocio (CRM, reservas, pagos) e incorporación de IA. Soporte post-implementación 30 días.',
    tipo: 'Por proyecto',
  },
];

const faqs = [
  {
    q: '¿Cómo es el proceso de pago?',
    a: 'Se trabaja con una señal del 50% antes de iniciar el proyecto y el saldo restante antes de la entrega final. Aceptamos transferencia bancaria, criptomonedas (USDT/BTC/ETH) y efectivo en Colonia del Sacramento.',
  },
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Depende del alcance. Un sitio esencial puede estar listo en 1–2 semanas. Un sitio premium con funcionalidades a medida puede tomar 4–6 semanas. Lo definimos juntos en la propuesta.',
  },
  {
    q: '¿Qué pasa si necesito cambios después de la entrega?',
    a: 'Todos los desarrollos incluyen 30 días de garantía post-entrega para corrección de errores. Los cambios de alcance o nuevas funcionalidades se cotizan por separado.',
  },
  {
    q: '¿Trabajan con clientes fuera de Colonia del Sacramento?',
    a: 'Sí. Nuestro servicio es 100% digital y trabajamos con clientes en todo Uruguay y el exterior. La comunicación es por WhatsApp y email.',
  },
];

// ── Sub-componentes locales ────────────────────────────────────────────────

function SubHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: 'true' }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-9 h-9 bg-cc-accent-light rounded-md flex items-center justify-center">
        <Icon size={18} className="text-cc-accent" aria-hidden="true" />
      </div>
      <h2 className="font-display font-medium text-[1.375rem] text-cc-text">{title}</h2>
    </div>
  );
}

function PricingCardEl({ card }: { card: PricingCard }) {
  const isPriceCotizacion = card.price === 'Cotización';
  return (
    <div
      className={[
        'border rounded-xl p-6 bg-cc-bg flex flex-col h-full',
        card.featured
          ? 'border-[1.5px] border-cc-accent bg-[#F5EDE8]/40'
          : 'border-black/10',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-1 gap-2">
        <span className="font-display font-medium text-[1rem] text-cc-text">
          {card.name}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
          {card.featured && (
            <span className="text-[11px] bg-cc-accent-light text-cc-accent rounded-sm px-2 py-0.5 font-medium">
              Más popular
            </span>
          )}
          <span className="text-[11px] bg-cc-surface text-cc-text-label rounded-sm px-2 py-0.5 font-medium">
            {card.badge}
          </span>
        </div>
      </div>

      {/* Precio */}
      <div className="mt-3 mb-4">
        {isPriceCotizacion ? (
          <span className="font-display font-medium text-[1.25rem] text-cc-accent">
            Cotización
          </span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-[12px] text-cc-muted">Desde</span>
            <span className="font-display font-medium text-[1.5rem] text-cc-accent leading-none">
              {card.price.replace('Desde ', '')}
            </span>
          </div>
        )}
      </div>

      {/* Descripción */}
      <p className="text-[13px] text-cc-text-body leading-relaxed mb-5 flex-1">
        {card.description}
      </p>

      {/* Tipo */}
      <div className="mt-auto pt-4 border-t border-black/[0.06] flex items-center gap-1 text-[12px] text-cc-muted">
        <IconInfoCircle size={13} aria-hidden="true" />
        {card.tipo}
      </div>
    </div>
  );
}

// ── Página ─────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  return (
    <>
      <InternalHero
        badge="Servicios"
        title="Lo que podemos hacer por tu negocio"
        description="Tres líneas de servicio pensadas para negocios locales que quieren crecer online."
      />

      {/* Desarrollo web & App */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <SubHeader icon={IconCode} title="Desarrollo web & App" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {webCards.map((card) => (
              <PricingCardEl key={card.name} card={card} />
            ))}
            {/* Add-on */}
            <div className="col-span-full bg-cc-surface border border-black/10 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
              <IconServer
                size={20}
                className="text-cc-accent flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-display font-medium text-[1rem] text-cc-text">
                  Hosting, dominio y soporte anual
                </span>
                <span className="text-[13px] text-cc-text-body mt-0.5">
                  Hosting + dominio .com o .uy + SSL + soporte técnico y actualizaciones.
                  Desde USD 200/año.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing digital */}
      <section className="py-[64px] bg-cc-surface">
        <div className="max-w-[1280px] mx-auto px-7">
          <SubHeader icon={IconChartBar} title="Marketing digital" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px]">
            {mktCards.map((card) => (
              <PricingCardEl key={card.name} card={card} />
            ))}
          </div>
          <p className="mt-4 text-[12px] text-cc-muted flex items-center gap-1.5">
            <IconInfoCircle size={13} aria-hidden="true" />
            El presupuesto de pauta publicitaria lo abona el cliente directamente a Meta o Google.
          </p>
        </div>
      </section>

      {/* Automatizaciones */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <SubHeader icon={IconBolt} title="Automatizaciones" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px]">
            {autoCards.map((card) => (
              <PricingCardEl key={card.name} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[64px] bg-cc-surface">
        <div className="max-w-[1280px] mx-auto px-7">
          <div className="text-center mb-10">
            <h2 className="font-display font-medium text-[1.75rem] text-cc-text">
              Preguntas frecuentes
            </h2>
          </div>
          <dl className="max-w-[680px] mx-auto flex flex-col divide-y divide-black/[0.06]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-5">
                <dt className="font-display font-medium text-[1rem] text-cc-text mb-2">
                  {q}
                </dt>
                <dd className="text-[14px] text-cc-text-body leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[1280px] mx-auto px-7">
          <SectionCta
            title="¿No encontrás lo que buscás?"
            description="Contanos tu caso y armamos una propuesta a medida."
          />
        </div>
      </section>
    </>
  );
}
