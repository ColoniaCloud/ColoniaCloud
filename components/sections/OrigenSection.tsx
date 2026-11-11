import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ScrollScene from '@/components/ui/ScrollScene';

const stats = [
  { value: '4', label: 'disciplinas en un mismo equipo' },
  { value: '2', label: 'productos propios de software' },
  { value: '<24 h', label: 'hábiles para responder tu consulta' },
];

export default function OrigenSection() {
  return (
    <ScrollScene as="section" id="origen" className="site-section origin-section" aria-labelledby="origin-title">
      <div className="site-container origin-layout">
        <div className="origin-copy">
          <Reveal as="span" className="eyebrow">De dónde venimos</Reveal>
          <Reveal as="h2" id="origin-title" className="display h-lg">Hecho en Colonia. Pensado para tu negocio.</Reveal>
          <Reveal as="p" className="body-copy">Trabajamos desde Colonia del Sacramento con comercios, marcas y empresas de Uruguay y la región. Conocemos el mercado local y hablamos claro: qué vamos a hacer, cuánto cuesta y qué resultado buscamos.</Reveal>
          <Reveal><Link href="/nosotros" className="section-link">Conocer al equipo <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal>
          <Reveal as="dl" className="origin-stats">
            {stats.map(({ value, label }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </Reveal>
        </div>

        {/* Tres fotos, tres velocidades: cada una lee `--p` de la sección con
            un factor distinto (ver .origin-collage en globals.css). */}
        <div className="origin-collage">
          <figure className="c-a">
            <Image src="/unsplash/faro-ruinas.webp" alt="El faro de Colonia del Sacramento junto a las ruinas del convento" fill sizes="(max-width: 959px) 54vw, 28vw" />
            <figcaption>Faro de Colonia</figcaption>
          </figure>
          <figure className="c-b">
            <Image src="/unsplash/calle-al-rio.webp" alt="Calle empedrada del casco histórico que baja hacia el río" fill sizes="(max-width: 959px) 40vw, 20vw" />
          </figure>
          <figure className="c-c">
            <Image src="/unsplash/auto-antiguo.webp" alt="Auto antiguo frente a una casa cubierta de enredaderas en Colonia" fill sizes="(max-width: 959px) 44vw, 22vw" />
          </figure>
        </div>
      </div>
    </ScrollScene>
  );
}
