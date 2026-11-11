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
      <div className="site-container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">Cómo trabajamos</Reveal>
          <Reveal as="h2" id="process-title" className="display h-lg">Un proceso simple, de la primera charla al día después.</Reveal>
        </div>
        <ol className="process-steps stagger">
          {steps.map((step, index) => (
            <Reveal as="li" className="process-step" key={step.title}>
              <span className="process-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
