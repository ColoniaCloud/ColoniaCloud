import Image from 'next/image';
import { whatsappHref } from '@/lib/contact';
import { ArrowUpRight } from 'lucide-react';

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
        <figure className="process-photo">
          <Image src="/fotos/atardecer.webp" alt="Atardecer sobre el río y las calles de Colonia del Sacramento" fill sizes="(max-width: 700px) 100vw, 45vw" />
          <figcaption>La mirada nace acá.</figcaption>
        </figure>
        <div>
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 id="process-title" className="display" style={{ fontSize: 'clamp(2.8rem,5vw,5rem)', marginTop: 17 }}>Buenas ideas.<br />Trabajo bien hecho.</h2>
          <p className="body-copy" style={{ marginTop: 20 }}>La tecnología funciona mejor cuando el proceso es claro y el diálogo continúa después de lanzar.</p>
          <div className="process-list">
            {steps.map((step, i) => <div className="process-step" key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}
          </div>
          <a className="section-link" style={{ marginTop: 22 }} href={whatsappHref('Hola, quiero conversar sobre un proyecto y conocer cómo trabajan.')} target="_blank" rel="noopener noreferrer">Empecemos a conversar <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
