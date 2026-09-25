
/** Ilustración de un hito de Colonia que identifica al servicio en la home.
 *  Se guardan los tamaños intrínsecos porque cada archivo tiene su propia
 *  proporción —el Portón es vertical, la Plaza casi un panorama— y sin ellos
 *  el navegador no puede reservar la caja antes de bajar el SVG. */
export type ServiceIllustration = { src: string; width: number; height: number };

export type ServiceFeature = { title: string; description: string };
export type ServicePlan = {
  name: string;
  price: number;
  period: 'mes';
  description: string;
  items: string[];
  note?: string;
  featured?: boolean;
};
export type Service = {
  slug: string;
  number: string;
  illustration: ServiceIllustration;
  name: string;
  badge: string;
  cardTitle: string;
  cardOutcome: string;
  cardDescription: string;
  heroTitle: string;
  heroDescription: string;
  intro: string;
  features: ServiceFeature[];
  deliverables: string[];
  plans?: ServicePlan[];
  customOption?: string;
  ctaTitle: string;
  ctaDescription: string;
};

// Una sola fuente para la home, el catálogo, las fichas y la navegación.
export const services: Service[] = [
  {
    slug: 'diseno-web', number: '01', illustration: { src: '/iconos/Porton.svg', width: 638, height: 831 }, name: 'Diseño web', badge: 'Diseño web',
    cardTitle: 'Diseño web', cardOutcome: 'Tu negocio tiene una nueva puerta de entrada.',
    cardDescription: 'Sitios propios, rápidos y preparados para convertir visitas en conversaciones o ventas.',
    heroTitle: 'Una web que abre oportunidades.',
    heroDescription: 'Diseño web con criterio de marca, experiencia clara y tecnología preparada para crecer.',
    intro: 'Tu sitio tiene que mostrar quién sos, ayudar a tus clientes a encontrar lo que buscan y funcionar impecablemente en cada pantalla. Diseñamos esa experiencia alrededor de tu negocio, con opciones mensuales claras y un camino a medida cuando el proyecto lo pide.',
    features: [
      { title: 'Diseño con identidad', description: 'Una presencia digital coherente con tu marca y tu público.' },
      { title: 'Experiencia responsive', description: 'Una navegación cómoda y clara en celular, tablet y escritorio.' },
      { title: 'E-commerce', description: 'Un canal de venta online para mostrar productos y recibir pedidos.' },
      { title: 'IA cuando aporta valor', description: 'Créditos de IA incluidos para casos aplicables, como chatbots y automatizaciones web.' },
    ],
    deliverables: ['Diseño y desarrollo web', 'Adaptación a dispositivos', 'Canales de contacto integrados', 'Créditos de IA para casos aplicables'],
    plans: [
      { name: 'Portón', price: 50, period: 'mes', description: 'La puerta de entrada digital para tu negocio.', items: ['Sitio web', 'Diseño adaptable', 'Canales de contacto', 'Créditos de IA para casos aplicables'], note: 'El alcance de los créditos de IA se define en la propuesta.' },
      { name: 'Mercado', price: 80, period: 'mes', description: 'Tu presencia online con un canal para vender.', items: ['Sitio web + e-commerce', 'Diseño adaptable', 'Canales de contacto', 'Créditos de IA para casos aplicables'], note: 'El alcance de los créditos de IA se define en la propuesta.', featured: true },
    ],
    customOption: 'Para funcionalidades, integraciones o experiencias que necesitan un alcance propio, preparamos un presupuesto a medida.',
    ctaTitle: 'Abramos tu próxima puerta digital.', ctaDescription: 'Contanos qué querés construir y encontramos el formato adecuado.',
  },
  {
    slug: 'marketing-digital', number: '02', illustration: { src: '/iconos/Faro.svg', width: 444, height: 662 }, name: 'Marketing digital', badge: 'Marketing digital',
    cardTitle: 'Marketing digital', cardOutcome: 'Una marca visible, con una dirección clara.',
    cardDescription: 'Investigación, pauta y contenido para llegar a las personas correctas.',
    heroTitle: 'Que te encuentren por las razones correctas.',
    heroDescription: 'Marketing digital con investigación de mercado, estrategia de pauta y contenido visual.',
    intro: 'Antes de invertir en anuncios, estudiamos el mercado, la competencia y las oportunidades. Después conectamos Google Ads, Meta Ads y contenido con un plan que tenga sentido para tu marca.',
    features: [
      { title: 'Investigación exhaustiva', description: 'Mercado, competencia y oportunidades reales de pauta.' },
      { title: 'Google Ads', description: 'Campañas de búsqueda orientadas a intención y resultados.' },
      { title: 'Meta Ads', description: 'Campañas en los canales de Meta para ampliar el alcance.' },
      { title: 'Contenido y recursos gráficos', description: 'Piezas visuales alineadas con la estrategia de cada campaña.' },
    ],
    deliverables: ['Investigación de mercado y competencia', 'Estrategia de pauta', 'Contenido y recursos gráficos', 'Seguimiento de campañas'],
    plans: [
      { name: 'Faro', price: 70, period: 'mes', description: 'Hacé visible tu marca cuando te están buscando.', items: ['Google Ads', 'Contenido y recursos gráficos', 'Investigación de mercado y competencia'], note: 'La inversión publicitaria en Google se paga por separado.' },
      { name: 'Horizonte', price: 150, period: 'mes', description: 'Más canales para ampliar tu alcance con criterio.', items: ['Google Ads + Meta Ads', 'Contenido y recursos gráficos', 'Investigación de mercado y competencia'], note: 'La inversión publicitaria en Google y Meta se paga por separado.', featured: true },
    ],
    customOption: 'Para campañas o equipos con necesidades particulares, diseñamos una estrategia y un presupuesto a medida.',
    ctaTitle: 'Démosle dirección a tu crecimiento.', ctaDescription: 'Hablemos de tu mercado y de las oportunidades que todavía no estás aprovechando.',
  },
  {
    slug: 'infraestructura-cloud', number: '03', illustration: { src: '/iconos/Fibonacci.svg', width: 262, height: 161 }, name: 'Infraestructura cloud', badge: 'Infraestructura cloud',
    cardTitle: 'Infraestructura cloud', cardOutcome: 'La base que sostiene todo lo demás.',
    cardDescription: 'Storage, bases de datos, VPS y soporte en las principales nubes empresariales.',
    heroTitle: 'Una base sólida para lo que viene.',
    heroDescription: 'Cloud storage, bases de datos, VPS y soporte para Azure, AWS, Google Cloud y Oracle.',
    intro: 'Diseñamos y acompañamos la infraestructura que necesita tu operación. Desde un servidor virtual hasta una arquitectura distribuida, cada decisión responde a tus datos, tu escala y tus objetivos.',
    features: [
      { title: 'Cloud storage', description: 'Almacenamiento para archivos y activos digitales.' },
      { title: 'Bases de datos', description: 'Soluciones relacionales y no relacionales según el uso de tus datos.' },
      { title: 'Servidores VPS', description: 'Servidores virtuales configurados para tu proyecto.' },
      { title: 'Nube empresarial', description: 'Soporte para Azure, AWS, Google Cloud y Oracle Cloud.' },
    ],
    deliverables: ['Arquitectura según el proyecto', 'Implementación y configuración', 'Soporte técnico', 'Documentación del entorno'],
    ctaTitle: 'Dale una base sólida a tu operación.', ctaDescription: 'Contanos qué sistemas necesitás sostener y diseñamos la infraestructura.',
  },
  {
    slug: 'ia-automatizaciones', number: '04', illustration: { src: '/iconos/Plaza.svg', width: 433, height: 209 }, name: 'IA y automatizaciones', badge: 'IA y automatizaciones',
    cardTitle: 'IA y automatizaciones', cardOutcome: 'Menos tareas repetidas. Más tiempo para decidir.',
    cardDescription: 'Procesos automatizados, IA local y atención al cliente pensada para tu operación.',
    heroTitle: 'La IA tiene que resolver algo concreto.',
    heroDescription: 'Automatización con o sin IA, infraestructura local orientada a la seguridad de datos y agentes para atención y soporte.',
    intro: 'Empezamos por el proceso, no por la herramienta. Identificamos dónde se pierde tiempo, qué se puede automatizar y cuándo la inteligencia artificial aporta valor real.',
    features: [
      { title: 'Procesos automatizados', description: 'Flujos de trabajo con o sin inteligencia artificial.' },
      { title: 'IA local', description: 'Infraestructura sin nube, orientada al control y la seguridad de los datos.' },
      { title: 'Atención al cliente', description: 'Agentes para responder, organizar y derivar consultas.' },
      { title: 'Soporte', description: 'Herramientas para acelerar respuestas y dar continuidad a cada caso.' },
    ],
    deliverables: ['Relevamiento del proceso', 'Diseño del flujo', 'Implementación e integración', 'Documentación y capacitación'],
    ctaTitle: 'Hagamos espacio para el trabajo importante.', ctaDescription: 'Mostranos tu proceso y encontramos dónde automatizar aporta valor.',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
