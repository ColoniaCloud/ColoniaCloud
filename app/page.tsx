import HeroSection from '@/components/sections/HeroSection';
import ProductBarSection from '@/components/sections/ProductBarSection';
import ServiceHubSection from '@/components/sections/ServiceHubSection';
import ProcesoSection from '@/components/sections/ProcesoSection';
import TestimoniosSection from '@/components/sections/TestimoniosSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductBarSection />
      <ServiceHubSection />
      <ProcesoSection />
      <TestimoniosSection />
      <CtaFinalSection />
    </>
  );
}
