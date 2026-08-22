/**
 * Casos de clientes que se muestran en el home.
 *
 * Cada caso sigue la misma estructura —desafío, qué construimos, resultado—
 * porque es la lectura que necesita un cliente grande: qué problema había,
 * con qué se resolvió y en qué terminó. Los `entregables` son la prueba de
 * capacidad técnica: cuanto más específicos, mejor.
 */

export type Caso = {
  /** Nombre del cliente tal como se muestra */
  cliente: string;
  /** Dominio visible; se usa también como enlace externo. Opcional. */
  dominio?: string;
  /** Rubro + mercado, para que se entienda el contexto de un vistazo */
  rubro: string;
  mercado: string;
  /** El problema o la situación de partida */
  desafio: string;
  /** Lo que se construyó — cada ítem es una pieza concreta */
  entregables: string[];
  /** En qué terminó. Sin números inventados: solo lo verificable. */
  resultado: string;
};

export const casos: Caso[] = [
  {
    cliente: 'Kristallfilm',
    dominio: 'kristallfilm.com',
    rubro: 'Láminas de protección solar, de pintura y de seguridad',
    mercado: 'Marca alemana · Operación en Buenos Aires',
    desafio:
      'Una marca alemana que entra al mercado argentino con local propio necesitaba vender online y en mostrador con la misma información, y no tenía área técnica que sostuviera esa operación.',
    entregables: [
      'Sitio web institucional de la marca',
      'Tienda online con catálogo por vehículo y arquitectura',
      'CRM a medida para el seguimiento comercial',
      'POS móvil para que los vendedores cierren ventas fuera del mostrador',
      'Gestión integral del área tecnológica del local comercial',
    ],
    resultado:
      'Ecommerce, mostrador y equipo comercial trabajando sobre un mismo sistema, con el área tecnológica del local administrada por nosotros de punta a punta.',
  },
  {
    cliente: 'ATR Poker',
    rubro: 'Plataforma de juego y formación online',
    mercado: 'Producto digital multiplataforma',
    desafio:
      'Un producto 100% digital que dependía de captar tráfico por buscadores y de formar a sus usuarios dentro de la propia plataforma.',
    entregables: [
      'Sitio web de la plataforma',
      'Aplicación móvil multiplataforma',
      'Gestión integral avanzada de SEO',
      'Sistema de e-learning a medida',
    ],
    resultado:
      'Web y app sobre una misma base, con la captación orgánica gestionada de forma continua y la formación de usuarios resuelta dentro del producto.',
  },
  {
    cliente: 'Ceromarket',
    dominio: 'ceromarket.com.uy',
    rubro: 'Comercio y venta online',
    mercado: 'Uruguay',
    desafio:
      'Un negocio que abría sus puertas y necesitaba ser conocido rápido, sin una marca previa que lo respaldara.',
    entregables: [
      'Sitio web y presencia online de la marca',
      'Estrategia de posicionamiento orgánico desde el lanzamiento',
      'Campaña en redes sociales acompañando la apertura',
    ],
    resultado:
      'El negocio se hizo conocido en poco tiempo desde la apertura, apoyado en el posicionamiento orgánico del sitio y en la campaña en redes.',
  },
];
