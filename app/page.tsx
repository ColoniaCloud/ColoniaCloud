import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import ServiciosSection from '@/components/sections/ServiciosSection';
import ProcesoSection from '@/components/sections/ProcesoSection';
import TestimoniosSection from '@/components/sections/TestimoniosSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServiciosSection />
      <ProcesoSection />
      <TestimoniosSection />
      <CtaFinalSection />
    </>
  );
}
