import type { ComponentType, SVGProps } from 'react';
import {
  AnthropicIcon,
  AwsIcon,
  CiscoIcon,
  GoogleCloudIcon,
  MetaIcon,
  OracleIcon,
  RedhatIcon,
} from '@/components/ui/brand-icons';
import ContactModal from '@/components/ui/ContactModal';
import LandingVideo from '@/components/landing/LandingVideo';
import LandingLogo from '@/components/landing/LandingLogo';

type Marca = { nombre: string; Icono: ComponentType<SVGProps<SVGSVGElement> & { size?: number }> };

const certificaciones: Marca[] = [
  { nombre: 'Cisco', Icono: CiscoIcon },
  { nombre: 'Red Hat', Icono: RedhatIcon },
  { nombre: 'Amazon Web Services', Icono: AwsIcon },
];

const partners: Marca[] = [
  { nombre: 'Google Cloud', Icono: GoogleCloudIcon },
  { nombre: 'Anthropic', Icono: AnthropicIcon },
  { nombre: 'Oracle', Icono: OracleIcon },
  { nombre: 'Meta', Icono: MetaIcon },
];

// Orden de entrada de cada marca: las dos filas comparten una sola secuencia
// para que el escalonado siga de una fila a la otra sin reiniciarse.
type FilaProps = { titulo: string; marcas: Marca[]; desde: number };

function FilaDeMarcas({ titulo, marcas, desde }: FilaProps) {
  return (
    <div className="landing-row">
      <p className="landing-row-title" style={{ '--i': desde } as React.CSSProperties}>{titulo}</p>
      <ul className="landing-logos">
        {marcas.map(({ nombre, Icono }, i) => (
          <li key={nombre} style={{ '--i': desde + i + 1 } as React.CSSProperties}>
            <Icono size={22} aria-hidden="true" />
            <span>{nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Portada temporal: reemplaza al home completo por un tiempo corto. El resto
 * de las rutas sigue funcionando; el menú y el pie se ocultan solo en `/`
 * (ver `components/layout/HideOnLanding.tsx`). Para volver al home completo,
 * revertir el commit que la introdujo.
 */
export default function TemporaryLanding() {
  return (
    <section className="landing" aria-labelledby="landing-title">
      <LandingVideo />
      <div className="landing-overlay" aria-hidden="true" />

      <div className="landing-content">
        <h1 id="landing-title" className="landing-logo">
          <LandingLogo />
        </h1>

        <p className="landing-text">
          Desarrollamos sistemas de tecnología que fusionan la eficiencia en funcionalidad, consumo de
          recursos, privacidad completa e interfaces productivas. Trabajamos para clientes que exigen
          máxima autonomía y en nuestros propios productos que mantienen la misma esencia.
        </p>

        <div className="landing-rows">
          <FilaDeMarcas titulo="Dev Certified:" marcas={certificaciones} desde={0} />
          <FilaDeMarcas titulo="Dev Partner:" marcas={partners} desde={certificaciones.length + 1} />
        </div>

        <ContactModal triggerLabel="¿Querés contactarte?" inlineSuccess triggerClassName="landing-cta" />
      </div>
    </section>
  );
}
