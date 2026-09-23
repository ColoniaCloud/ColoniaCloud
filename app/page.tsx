import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import ServiceHubSection from '@/components/sections/ServiceHubSection';
import CasosSection from '@/components/sections/CasosSection';
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
      <CasosSection />
      <ProcesoSection />
      <ProductosSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
