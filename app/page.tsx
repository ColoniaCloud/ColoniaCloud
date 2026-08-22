import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import ServiceHubSection from '@/components/sections/ServiceHubSection';
import CasosSection from '@/components/sections/CasosSection';
import ProcesoSection from '@/components/sections/ProcesoSection';
import ProductosSection from '@/components/sections/ProductosSection';
import TestimoniosSection from '@/components/sections/TestimoniosSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';

/**
 * El home tiene que servir a dos lectores distintos sin partirse en dos.
 *
 * El comercio local entra por arriba —hero, servicios, cómo trabajamos— y
 * puede irse al CTA en cualquier momento. Quien evalúa capacidad técnica
 * sigue bajando y encuentra casos, producto propio y preguntas concretas.
 * Por eso las secciones alternan registro: una emocional, una con prueba.
 *
 * Los fondos alternan claro / gris / negro para que ninguna franja larga
 * quede plana.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServiceHubSection />
      <CasosSection />
      <ProcesoSection />
      <ProductosSection />
      <TestimoniosSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
