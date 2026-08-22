import {
  Code,
  LayoutDashboard,
  Server,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

export type ServiceFeature = {
  title: string;
  description: string;
};

export type SubService = {
  name: string;
  description: string;
};

export type Service = {
  /** Segmento de URL: /servicios/<slug> */
  slug: string;
  icon: LucideIcon;
  /** Etiqueta corta para el badge del hero interno */
  badge: string;
  /** Nombre corto para navegación y metadatos */
  name: string;
  /** Título tal cual se muestra en la tarjeta del home */
  cardTitle: string;
  /** Frase de resultado que acompaña al título en la tarjeta del home. El
   * título nombra la categoría técnica; esto traduce qué gana el cliente. */
  cardOutcome: string;
  /** Descripción corta de la tarjeta del home */
  cardDescription: string;
  /** Título del hero de la página de detalle */
  heroTitle: string;
  /** Bajada del hero / descripción para SEO */
  heroDescription: string;
  /** Párrafo introductorio de la página de detalle */
  intro: string;
  /** Bloques de "En qué consiste" */
  features: ServiceFeature[];
  /** Subservicios incluidos dentro de este servicio principal */
  subServices?: SubService[];
  /** Checklist de "Qué incluye" */
  deliverables: string[];
  ctaTitle: string;
  ctaDescription: string;
};

// El orden define el orden en el grid del home (índice 0 = tarjeta destacada).
export const services: Service[] = [
  {
    slug: 'web-app',
    icon: Code,
    badge: 'Web & App',
    name: 'Web & App',
    cardTitle: 'Web & App',
    cardOutcome: 'Que te encuentren y te compren.',
    cardDescription:
      'Sitios institucionales, tiendas online y aplicaciones a medida, con branding digital y redes sociales incluidos.',
    heroTitle: 'Sitios web y aplicaciones a medida',
    heroDescription:
      'Sitios institucionales, tiendas online y aplicaciones diseñadas a medida. Rápidas, seguras y optimizadas para móviles.',
    intro:
      'Tu sitio web es la primera impresión de tu negocio online. Creamos desde páginas institucionales hasta e-commerce y aplicaciones complejas, siempre con diseño propio, buen rendimiento y foco en convertir visitas en clientes. Además, sumamos branding digital y gestión de redes sociales para que tu presencia online sea consistente de punta a punta.',
    features: [
      {
        title: 'Sitios institucionales',
        description:
          'Presencia profesional con diseño responsive, formularios de contacto y SEO desde el primer día.',
      },
      {
        title: 'Tiendas online',
        description:
          'E-commerce completo con catálogo, carrito, gestión de stock y medios de pago integrados.',
      },
      {
        title: 'Aplicaciones a medida',
        description:
          'Web apps y aplicaciones móviles con funcionalidades específicas para tu operativa.',
      },
      {
        title: 'Diseño UI/UX exclusivo',
        description:
          'Nada de plantillas genéricas: diseñamos una identidad visual que te representa.',
      },
    ],
    subServices: [
      {
        name: 'Digital Branding & RRSS',
        description:
          'Gestión de comunidad, reputación online (ORM), campañas de pauta en Meta y Google Ads, y estrategia de contenidos para tus redes sociales.',
      },
    ],
    deliverables: [
      'Diseño responsive optimizado para móviles',
      'SEO técnico y buenas prácticas de performance',
      'Formularios y medios de contacto integrados',
      'Hosting, dominio y SSL (opcional)',
      '30 días de garantía post-entrega',
    ],
    ctaTitle: '¿Tenés un proyecto web en mente?',
    ctaDescription:
      'Contanos tu idea y te enviamos una propuesta sin compromiso.',
  },
  {
    slug: 'software',
    icon: LayoutDashboard,
    badge: 'Software',
    name: 'Software',
    cardTitle: 'Software',
    cardOutcome: 'Que tu operación deje de vivir en planillas.',
    cardDescription:
      'Soluciones de gestión a medida para tu negocio, con IA y automatizaciones incluidas para ordenar tu operación de punta a punta.',
    heroTitle: 'Software de gestión, IA y automatizaciones',
    heroDescription:
      'Paneles y herramientas a medida para tu operación, potenciados con inteligencia artificial y automatización de procesos.',
    intro:
      'Cuando las planillas y los mensajes sueltos ya no alcanzan, un sistema a medida ordena tu operación. Desarrollamos paneles y herramientas internas que se adaptan a cómo trabajás, no al revés. Además, incorporamos inteligencia artificial y automatización para que las tareas repetitivas se hagan solas.',
    features: [
      {
        title: 'Paneles a medida',
        description:
          'Dashboards con la información que importa para tu negocio, en tiempo real.',
      },
      {
        title: 'Gestión logística',
        description:
          'Control de inventario, pedidos, entregas y recursos desde un solo lugar.',
      },
      {
        title: 'Comunicación centralizada',
        description:
          'Toda la información del proyecto y del equipo, ordenada y accesible.',
      },
      {
        title: 'Decisiones con datos',
        description:
          'Métricas y reportes que te ayudan a decidir con información, no con intuición.',
      },
    ],
    subServices: [
      {
        name: 'IA y automatizaciones',
        description:
          'Agentes de atención 24/7, automatización de flujos entre tus herramientas e integración de modelos de lenguaje en tus procesos productivos.',
      },
    ],
    deliverables: [
      'Relevamiento de tu operativa actual',
      'Diseño funcional y de interfaz',
      'Desarrollo e integración con tus datos',
      'Capacitación del equipo',
      'Mantenimiento y evolución continua',
    ],
    ctaTitle: '¿Tu operación necesita orden?',
    ctaDescription:
      'Contanos cómo trabajás hoy y diseñamos la herramienta que te falta.',
  },
  {
    slug: 'infraestructura-vps',
    icon: Server,
    badge: 'Infraestructura',
    name: 'VPS, dominios y base de datos',
    cardTitle: 'VPS, dominios y base de datos',
    cardOutcome: 'Que no se caiga, y que no lo tengas que mirar vos.',
    cardDescription:
      'Servicio "manejado" de VPS, dominios y bases de datos, con ciberseguridad incluida para proteger tu negocio.',
    heroTitle: 'VPS, dominios y base de datos',
    heroDescription:
      'El servicio "manejado" para que no te preocupes por la infraestructura: configuración, mantenimiento, monitoreo y seguridad.',
    intro:
      'Un servidor mal configurado es una bomba de tiempo. Nos hacemos cargo de tu infraestructura de punta a punta —servidores, dominios y bases de datos— para que vos te dediques a tu negocio. Sumamos también ciberseguridad para proteger tu operación y los datos de tus clientes.',
    features: [
      {
        title: 'VPS manejado',
        description:
          'Configuración, actualizaciones y mantenimiento de tu servidor sin que tengas que tocar nada.',
      },
      {
        title: 'Dominios y DNS',
        description:
          'Gestión de dominios .com y .uy, certificados SSL y registros DNS.',
      },
      {
        title: 'Bases de datos',
        description:
          'Diseño, optimización y administración de tus bases de datos.',
      },
      {
        title: 'Monitoreo y backups',
        description:
          'Copias de seguridad automáticas y vigilancia para evitar caídas.',
      },
    ],
    subServices: [
      {
        name: 'Ciberseguridad',
        description:
          'Auditorías de seguridad, mitigación de urgencias y consultoría para proteger tu negocio y los datos de tus clientes.',
      },
    ],
    deliverables: [
      'Configuración inicial del servidor',
      'Migración de tus sistemas (si aplica)',
      'Certificados SSL y gestión de dominios',
      'Backups automáticos y monitoreo',
      'Mantenimiento y soporte continuo',
    ],
    ctaTitle: '¿Cansado de pelear con servidores?',
    ctaDescription:
      'Dejanos tu infraestructura a nosotros y ganá tranquilidad.',
  },
  {
    slug: 'asesoria',
    icon: Lightbulb,
    badge: 'Asesoría',
    name: 'Asesoría',
    cardTitle: 'Asesoría',
    cardOutcome: 'Que decidas con alguien que ya lo hizo antes.',
    cardDescription:
      'Más que un servicio, es una alianza de intercambio de ideas con el fin de promover la innovación en tu proyecto.',
    heroTitle: 'Asesoría',
    heroDescription:
      'Más que un servicio, una alianza de ideas para promover la innovación en tu proyecto.',
    intro:
      'A veces lo que necesitás no es un producto cerrado, sino un socio tecnológico que piense con vos. Asesoría es un espacio de intercambio de ideas para explorar oportunidades, resolver problemas complejos y llevar la innovación a tu negocio.',
    features: [
      {
        title: 'Consultoría de innovación',
        description:
          'Analizamos tu negocio y detectamos oportunidades donde la tecnología marca la diferencia.',
      },
      {
        title: 'Ideación y prototipado',
        description:
          'Convertimos ideas en prototipos rápidos para validar antes de invertir.',
      },
      {
        title: 'Acompañamiento estratégico',
        description:
          'Te acompañamos en las decisiones tecnológicas de tu proyecto.',
      },
      {
        title: 'Proyectos a medida',
        description:
          'Cuando la idea toma forma, la llevamos a la realidad con el equipo adecuado.',
      },
    ],
    deliverables: [
      'Sesiones de trabajo e ideación',
      'Análisis de oportunidades',
      'Prototipos y pruebas de concepto',
      'Hoja de ruta tecnológica',
      'Acompañamiento en la implementación',
    ],
    ctaTitle: '¿Tenés una idea para explorar?',
    ctaDescription:
      'Sentémonos a conversar y veamos hasta dónde puede llegar.',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
