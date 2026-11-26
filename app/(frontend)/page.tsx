import type { Metadata } from 'next';
import TemporaryLanding from '@/components/landing/TemporaryLanding';

// Portada temporal. El home completo (HeroSection, TrustBarSection, etc.)
// vuelve revirtiendo el commit que introdujo esta portada.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <TemporaryLanding />;
}
