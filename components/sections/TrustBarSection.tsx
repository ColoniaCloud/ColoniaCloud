import Reveal from '@/components/ui/Reveal';

export default function TrustBarSection() {
  return (
    <section className="signal-bar" aria-label="Áreas de trabajo">
      <div className="site-container signal-inner">
        <Reveal as="p">Un equipo. Cuatro disciplinas conectadas.</Reveal>
        {/* Las cuatro disciplinas entran juntas, como un bloque: escalonarlas
            una por una le daría a una barra de paso más peso del que tiene. */}
        <Reveal className="signal-items" delay={80}><span>Diseño</span><span>Marketing</span><span>Cloud</span><span>Inteligencia artificial</span></Reveal>
      </div>
    </section>
  );
}
