import HeroSection from '@/components/sections/HeroSection';
import ServiceHubSection from '@/components/sections/ServiceHubSection';
import ProcesoSection from '@/components/sections/ProcesoSection';
import TestimoniosSection from '@/components/sections/TestimoniosSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';

export default function HomePage() {
  return (
    <>
      {/* El hero queda fijo (sticky) mientras el hub de servicios, con fondo
          opaco, avanza por encima al hacer scroll. El wrapper acota el rango
          de "pineo" a la altura combinada de ambas secciones. */}
      <div className="relative">
        <HeroSection />
        <ServiceHubSection />
      </div>
      <ProcesoSection />
      <TestimoniosSection />
      <CtaFinalSection />
    </>
  );
}
