import Reveal from '@/components/ui/Reveal';

const faqs = [
  { q: '¿Cuánto cuesta empezar?', a: 'Diseño web tiene planes de USD 50 y USD 80 por mes. Marketing digital tiene planes de USD 70 y USD 150 por mes. Infraestructura, IA y proyectos especiales se presupuestan según el alcance.' },
  { q: '¿La inversión en anuncios está incluida?', a: 'No. Los planes de marketing incluyen investigación, estrategia, gestión, contenido y recursos gráficos. La pauta se paga directamente a Google o Meta por separado.' },
  { q: '¿Qué incluyen los créditos de IA de los planes web?', a: 'Son para casos que apliquen a tu proyecto, como chatbots o automatizaciones web. Definimos el uso concreto y su alcance en la propuesta.' },
  { q: '¿La IA puede funcionar sin enviar mis datos a la nube?', a: 'Sí. Dentro de IA y automatizaciones ofrecemos infraestructura local orientada a mantener el control de los datos. La solución se diseña según los requisitos de cada operación.' },
  { q: '¿Trabajan fuera de Colonia?', a: 'Sí. Trabajamos desde Colonia del Sacramento con proyectos en Uruguay y otros mercados.' },
];

export default function FaqSection() {
  return (
    <section id="preguntas" className="site-section faq-section" aria-labelledby="faq-title">
      <div className="site-container">
        <div className="section-intro" style={{ marginInline: 'auto', textAlign: 'center' }}>
          <Reveal as="span" className="eyebrow">Antes de empezar</Reveal>
          <Reveal as="h2" variant="blur-in" id="faq-title" className="display" delay={60}>Preguntas claras.<br />Respuestas directas.</Reveal>
        </div>
        {/* El Reveal renderiza el propio <details> para no romper ni el
            acordeón ni `.faq-list details:last-child`, que es el que cierra
            la lista con el borde de abajo. */}
        <div className="faq-list stagger">{faqs.map(({ q, a }) => <Reveal as="details" key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></Reveal>)}</div>
      </div>
    </section>
  );
}
