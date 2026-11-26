'use client';

import { usePathname } from 'next/navigation';

/**
 * Mientras `/` muestra la portada temporal, el menú, el pie y el botón de
 * WhatsApp no se renderizan ahí; en el resto de las rutas siguen igual.
 */
export default function HideOnLanding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <>{children}</>;
}
