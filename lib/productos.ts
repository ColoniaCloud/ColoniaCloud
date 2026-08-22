/**
 * Productos propios de Colonia Cloud.
 *
 * Van en el home como prueba de capacidad técnica: no son servicios que se
 * contratan desde acá, son software que construimos y mantenemos nosotros.
 * Para un cliente grande, esto pesa más que cualquier adjetivo sobre
 * "soluciones innovadoras".
 */

export type Producto = {
  nombre: string;
  /** Qué es, en una línea */
  claim: string;
  descripcion: string;
  /** Capacidades concretas — lo que un evaluador técnico busca */
  capacidades: string[];
};

export const productos: Producto[] = [
  {
    nombre: 'Plata.studio',
    claim: 'Gestión de negocio con IA auditable',
    descripcion:
      'Sistema de gestión que integra CRM y ERP con un agente de IA open source, autohospedado y auditable. El onboarding configura el software según cómo trabaja cada negocio.',
    capacidades: [
      'CRM + ERP integrados',
      'Agente de IA open source y autohospedado',
      'Captación de leads con scraping profesional',
      'Auditoría y calificación de leads',
      'Análisis de procesos y atención al cliente',
    ],
  },
  {
    nombre: 'NL360.site',
    claim: 'Desarrollo web multiagente',
    descripcion:
      'Plataforma de IA multiagente para construir sitios web modernos y tiendas online sobre tecnología JavaScript, con agentes especializados que acompañan el negocio después del lanzamiento.',
    capacidades: [
      'Sitios y tiendas online en JavaScript',
      'Agente de marketing conectado al CRM de Plata.studio',
      'Agente de ventas orientado al cierre',
      'Agente mentor para el equipo',
    ],
  },
  {
    nombre: 'MarketDeck',
    claim: 'Agentes de IA en tus canales',
    descripcion:
      'Plataforma para auditar, gestionar e integrar agentes de IA en los canales por donde ya te escriben tus clientes.',
    capacidades: [
      'Integración con WhatsApp, SMS y email',
      'Agentes en redes sociales',
      'Auditoría del comportamiento de cada agente',
      'Gestión centralizada de todos los canales',
    ],
  },
];

/**
 * Capacidades técnicas transversales — la franja de credenciales que
 * acompaña a los productos. Cada una tiene respaldo en un servicio real de
 * `lib/services.ts` o en un caso de `lib/casos.ts`.
 */
export const capacidades: { titulo: string; detalle: string }[] = [
  {
    titulo: 'Infraestructura administrada',
    detalle:
      'VPS, dominios, DNS y bases de datos con backups automáticos, SSL y monitoreo. Vos no tocás un servidor.',
  },
  {
    titulo: 'IA autohospedada y auditable',
    detalle:
      'Modelos y agentes corriendo en infraestructura propia, con los datos de tu negocio bajo tu control.',
  },
  {
    titulo: 'Sistemas a medida',
    detalle:
      'CRM, ERP, POS, e-learning y paneles internos construidos sobre la operativa real de cada cliente.',
  },
  {
    titulo: 'Ciberseguridad',
    detalle:
      'Auditorías de seguridad, mitigación de urgencias y consultoría para proteger la operación y los datos.',
  },
];
