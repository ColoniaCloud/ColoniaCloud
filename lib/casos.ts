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
  /**
   * Logo del cliente en versión blanca sobre transparente (las cards son
   * oscuras). `ancho` y `alto` son las proporciones del archivo: la card las
   * usa para igualar el peso visual entre logos anchos y compactos.
   */
  logo: { src: string; ancho: number; alto: number };
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
    logo: { src: '/casos/kristallfilm.svg', ancho: 1305, alto: 215 },
  },
  {
    cliente: 'Abraxas Joyería',
    dominio: 'joyasabraxas.com',
    rubro: 'Joyería artesanal',
    mercado: 'Montevideo · Envíos a todo Uruguay',
    desafio:
      'Una joyería artesanal que necesitaba vender en todo el país con una tienda a la altura de sus piezas, sin perder la atención personalizada.',
    entregables: [
      'Tienda online headless con WooCommerce y Next.js',
      'Catálogo por colecciones con pagos por MercadoPago',
      'Blog, newsletter y atención por WhatsApp',
      'SEO técnico y datos estructurados de joyería',
    ],
    resultado:
      'Una tienda rápida y cuidada que vende a todo Uruguay, con el catálogo administrado por la marca desde WordPress.',
    logo: { src: '/casos/abraxas.png', ancho: 374, alto: 86 },
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
    logo: { src: '/casos/ceromarket.png', ancho: 448, alto: 190 },
  },
];
