export type Producto = {
  nombre: string;
  slug: string;
  label: string;
  claim: string;
  descripcion: string;
  capacidades: string[];
};

export const productos: Producto[] = [
  {
    nombre: 'Plata Studio', slug: 'plata-studio', label: 'CRM / ERP',
    claim: 'Un sistema que aprende cómo trabaja tu negocio.',
    descripcion: 'CRM y ERP completos con un onboarding de IA que configura la arquitectura personalizada para cada nivel, sin una configuración inicial dedicada.',
    capacidades: ['Gestión comercial y operativa', 'Onboarding guiado por IA', 'Arquitectura adaptada a cada nivel'],
  },
  {
    nombre: 'MarketDeck', slug: 'marketdeck', label: 'SOCIAL MEDIA',
    claim: 'Todas tus redes. Una sola mesa de trabajo.',
    descripcion: 'Plataforma multiplataforma para gestionar redes sociales, con inteligencia artificial y edición de contenido integradas.',
    capacidades: ['Gestión de redes multiplataforma', 'IA integrada al flujo de trabajo', 'Edición de contenido incluida'],
  },
];
