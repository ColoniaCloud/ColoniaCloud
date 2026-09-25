import Image from 'next/image';
import { whatsappHref } from '@/lib/contact';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const steps = [
  { title: 'Escuchamos', text: 'Entendemos el negocio, el problema y lo que querés lograr.' },
  { title: 'Trazamos el camino', text: 'Te proponemos un alcance claro, con prioridades y presupuesto.' },
  { title: 'Construimos juntos', text: 'Diseñamos, implementamos y ajustamos con vos en cada etapa.' },
  { title: 'Seguimos cerca', text: 'Acompañamos la operación y la evolución de lo que pusimos en marcha.' },
];

export default function ProcesoSection() {
  return (
    <section id="proceso" className="site-section process-section" aria-labelledby="process-title">
      <div className="site-container process-grid">
        {/* `image-scale` es la variante lenta (1.2s): la foto entra por detrás
            del texto, no al mismo ritmo. El recorte lo da el overflow hidden
            que ya tiene `.process-photo`, así que el zoom no se desborda. */}
        <Reveal as="figure" variant="image-scale" className="process-photo">
          <Image src="/fotos/atardecer.webp" alt="Atardecer sobre el río y las calles de Colonia del Sacramento" fill sizes="(max-width: 700px) 100vw, 45vw" />
          <figcaption>La mirada nace acá.</figcaption>
        </Reveal>
        <div>
          <Reveal as="span" className="eyebrow">Cómo trabajamos</Reveal>
          <Reveal as="h2" variant="blur-in" id="process-title" className="display" style={{ fontSize: 'clamp(2.8rem,5vw,5rem)', marginTop: 17 }} delay={60}>Buenas ideas.<br />Trabajo bien hecho.</Reveal>
          <Reveal as="p" className="body-copy" style={{ marginTop: 20 }} delay={140}>La tecnología funciona mejor cuando el proceso es claro y el diálogo continúa después de lanzar.</Reveal>
          {/* Los cuatro pasos son una secuencia, y el escalonado los lee en
              orden: 01, 02, 03, 04. Es el lugar del home donde más sentido
              tiene, porque el contenido ya es una progresión. */}
          <div className="process-list stagger">
            {steps.map((step, i) => <Reveal className="process-step" key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></Reveal>)}
          </div>
          <Reveal as="a" className="section-link" style={{ marginTop: 22 }} href={whatsappHref('Hola, quiero conversar sobre un proyecto y conocer cómo trabajan.')} target="_blank" rel="noopener noreferrer">Empecemos a conversar <ArrowUpRight size={16} aria-hidden="true" /></Reveal>
        </div>
      </div>
    </section>
  );
}
