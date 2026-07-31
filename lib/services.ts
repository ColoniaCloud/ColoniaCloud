import {
  Bot,
  Code,
  LayoutDashboard,
  Megaphone,
  ShieldCheck,
  Server,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

export type ServiceFeature = {
  title: string;
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
  /** Checklist de "Qué incluye" */
  deliverables: string[];
  ctaTitle: string;
  ctaDescription: string;
};

// El orden define el orden en el grid del home (índice 0 = tarjeta destacada).
export const services: Service[] = [
  {
    slug: 'ia-automatizaciones',
    icon: Bot,
    badge: 'IA & Automatización',
    name: 'IA y automatizaciones',
    cardTitle: 'Infraestructura de IA y automatizaciones',
    cardDescription:
      'Adaptamos la IA a tu negocio y tu negocio a la IA: desde simples agentes de atención hasta automatizaciones complejas en flujos de producción.',
    heroTitle: 'Infraestructura de IA y automatizaciones',
    heroDescription:
      'Adaptamos la IA a tu negocio y tu negocio a la IA: desde agentes de atención hasta automatizaciones complejas en tus flujos de producción.',
    intro:
      'La inteligencia artificial dejó de ser una promesa a futuro. Hoy podés automatizar tareas repetitivas, responder a tus clientes las 24 horas y tomar mejores decisiones con datos. Diseñamos e implementamos soluciones de IA y automatización pensadas para tu operativa real, no para una demo.',
    features: [
      {
        title: 'Agentes de atención 24/7',
        description:
          'Asistentes que responden consultas frecuentes en WhatsApp, web o redes sociales, y derivan a una persona cuando hace falta.',
      },
      {
        title: 'Automatización de flujos',
        description:
          'Conectamos tus herramientas —reservas, pagos, CRM, planillas— para que las tareas manuales se hagan solas.',
      },
      {
        title: 'IA aplicada a producción',
        description:
          'Integramos modelos de lenguaje y APIs en tus procesos: clasificación, redacción, extracción de datos y más.',
      },
      {
        title: 'Reportes automáticos',
        description:
          'Procesamos tu información y generamos informes claros de forma periódica, sin planillas hechas a mano.',
      },
    ],
    deliverables: [
      'Relevamiento de tus procesos actuales',
      'Diseño del flujo o agente a medida',
      'Implementación e integración con tus herramientas',
      'Documentación y capacitación del equipo',
      'Soporte post-implementación',
    ],
    ctaTitle: '¿Listo para automatizar tu negocio?',
    ctaDescription:
      'Contanos qué tareas te consumen tiempo y armamos una propuesta a medida.',
  },
  {
    slug: 'web-app',
    icon: Code,
    badge: 'Web & App',
    name: 'Web & App',
    cardTitle: 'Web & App',
    cardDescription:
      'Sitios institucionales, tiendas online y aplicaciones a medida. Diseño UI/UX exclusivo, rápido y optimizado para móviles.',
    heroTitle: 'Sitios web y aplicaciones a medida',
    heroDescription:
      'Sitios institucionales, tiendas online y aplicaciones diseñadas a medida. Rápidas, seguras y optimizadas para móviles.',
    intro:
      'Tu sitio web es la primera impresión de tu negocio online. Creamos desde páginas institucionales hasta e-commerce y aplicaciones complejas, siempre con diseño propio, buen rendimiento y foco en convertir visitas en clientes.',
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
    slug: 'software-gestion',
    icon: LayoutDashboard,
    badge: 'Software',
    name: 'Software de gestión',
    cardTitle: 'Software de gestión',
    cardDescription:
      'Creamos soluciones a medida para la gestión de tu proyecto: logística, comunicación y toma de decisiones, todo en un mismo lugar.',
    heroTitle: 'Software de gestión a medida',
    heroDescription:
      'Soluciones para gestionar tu proyecto: logística, comunicación y toma de decisiones, todo en un mismo lugar.',
    intro:
      'Cuando las planillas y los mensajes sueltos ya no alcanzan, un sistema a medida ordena tu operación. Desarrollamos paneles y herramientas internas que se adaptan a cómo trabajás, no al revés.',
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
    slug: 'branding-rrss',
    icon: Megaphone,
    badge: 'Marketing',
    name: 'Digital Branding & RRSS',
    cardTitle: 'Digital Branding & RRSS',
    cardDescription:
      'Nuestro servicio de marketing digital profesional: gestión de comunidad y reputación online (ORM), monitoreo y respuesta a menciones de marca.',
    heroTitle: 'Digital Branding & Redes Sociales',
    heroDescription:
      'Marketing digital profesional: gestión de comunidad, reputación online y campañas que hacen crecer tu marca.',
    intro:
      'Tener redes no alcanza: hay que gestionarlas con estrategia. Nos ocupamos de tu presencia en redes sociales, tu reputación online y tus campañas publicitarias para que tu marca crezca de forma sostenida.',
    features: [
      {
        title: 'Gestión de comunidad',
        description:
          'Publicaciones, diseño gráfico y respuesta a comentarios y mensajes de tu audiencia.',
      },
      {
        title: 'Reputación online (ORM)',
        description:
          'Monitoreo y respuesta a menciones de tu marca para cuidar tu imagen.',
      },
      {
        title: 'Campañas de pauta',
        description:
          'Publicidad en Meta y Google Ads con segmentación geográfica y objetivos claros.',
      },
      {
        title: 'Contenido y estrategia',
        description:
          'Calendario de contenidos y línea gráfica coherente con tu identidad.',
      },
    ],
    deliverables: [
      'Gestión mensual de Instagram y/o Facebook',
      'Diseño gráfico de las publicaciones',
      'Monitoreo de menciones y respuesta',
      'Campañas de pauta publicitaria (opcional)',
      'Reporte mensual de resultados',
    ],
    ctaTitle: '¿Querés hacer crecer tu marca?',
    ctaDescription:
      'Contanos sobre tu negocio y armamos una estrategia para tus redes.',
  },
  {
    slug: 'ciberseguridad',
    icon: ShieldCheck,
    badge: 'Seguridad',
    name: 'Ciberseguridad',
    cardTitle: 'Ciberseguridad',
    cardDescription:
      'Auditorías de seguridad, mitigaciones de urgencia y consultoría para proteger tu negocio.',
    heroTitle: 'Ciberseguridad para tu negocio',
    heroDescription:
      'Auditorías, mitigación de urgencias y consultoría para proteger tu negocio y los datos de tus clientes.',
    intro:
      'Un incidente de seguridad puede costar la confianza de tus clientes y la continuidad de tu negocio. Evaluamos tu exposición, resolvemos urgencias y te ayudamos a construir defensas sólidas y sostenibles.',
    features: [
      {
        title: 'Auditorías de seguridad',
        description:
          'Detectamos vulnerabilidades en tus sitios, sistemas y configuraciones antes de que las encuentre otro.',
      },
      {
        title: 'Mitigación de urgencias',
        description:
          'Respuesta rápida ante ataques, accesos indebidos o sitios comprometidos.',
      },
      {
        title: 'Consultoría y hardening',
        description:
          'Recomendaciones concretas y aplicación de buenas prácticas de seguridad.',
      },
      {
        title: 'Monitoreo continuo',
        description:
          'Vigilancia y alertas para detectar problemas antes de que escalen.',
      },
    ],
    deliverables: [
      'Análisis de vulnerabilidades',
      'Informe con hallazgos y prioridades',
      'Plan de mitigación y remediación',
      'Configuración segura (hardening)',
      'Recomendaciones de monitoreo',
    ],
    ctaTitle: '¿Dudas sobre tu seguridad?',
    ctaDescription:
      'Escribinos y evaluamos juntos la exposición de tu negocio.',
  },
  {
    slug: 'infraestructura-vps',
    icon: Server,
    badge: 'Infraestructura',
    name: 'Infraestructura VPS y dominios',
    cardTitle: 'Infraestructura VPS, dominios y bases de datos',
    cardDescription:
      'Ofrecemos el servicio "manejado" para simplificarte los procesos: configuración, mantenimiento y monitoreo de tu infraestructura.',
    heroTitle: 'Infraestructura VPS, dominios y bases de datos',
    heroDescription:
      'El servicio "manejado" para que no te preocupes por la infraestructura: configuración, mantenimiento y monitoreo.',
    intro:
      'Un servidor mal configurado es una bomba de tiempo. Nos hacemos cargo de tu infraestructura de punta a punta —servidores, dominios y bases de datos— para que vos te dediques a tu negocio.',
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
    slug: 'it-creative',
    icon: Lightbulb,
    badge: 'Innovación',
    name: 'IT Creative',
    cardTitle: 'IT Creative',
    cardDescription:
      'Más que un servicio, es una alianza de intercambio de ideas con el fin de promover la innovación en tu proyecto.',
    heroTitle: 'IT Creative',
    heroDescription:
      'Más que un servicio, una alianza de ideas para promover la innovación en tu proyecto.',
    intro:
      'A veces lo que necesitás no es un producto cerrado, sino un socio tecnológico que piense con vos. IT Creative es un espacio de intercambio de ideas para explorar oportunidades, resolver problemas complejos y llevar la innovación a tu negocio.',
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
