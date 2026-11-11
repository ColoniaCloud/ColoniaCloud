import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import ServiceHubSection from '@/components/sections/ServiceHubSection';
import OrigenSection from '@/components/sections/OrigenSection';
import CasosSection from '@/components/sections/CasosSection';
import PlanesSection from '@/components/sections/PlanesSection';
import ProcesoSection from '@/components/sections/ProcesoSection';
import ProductosSection from '@/components/sections/ProductosSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';

// Título y descripción se heredan del layout; el canonical va acá y no en el
// layout para que no lo hereden las rutas noindex ni el 404.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServiceHubSection />
      <OrigenSection />
      <CasosSection />
      <PlanesSection />
      <ProcesoSection />
      <ProductosSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
