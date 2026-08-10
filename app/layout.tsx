import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--cc-font-body',
  display: 'swap',
});

const title = 'Colonia Cloud — Llevamos tu negocio a la nube';
const description =
  'Web & App, Software, VPS/dominios/bases de datos y Asesoría: el ecosistema digital completo para negocios en Colonia del Sacramento, Uruguay.';

const SITE_URL = 'https://colonia.cloud';

// Datos estructurados (schema.org) de la organización, para búsquedas
// locales ("agencia digital Colonia del Sacramento") y el panel de
// conocimiento de Google. Sin PostalAddress/geo porque es un servicio
// 100% digital sin local físico al público.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Colonia Cloud',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.svg`,
  image: `${SITE_URL}/hero-poster.webp`,
  description,
  areaServed: {
    '@type': 'City',
    name: 'Colonia del Sacramento',
    containedInPlace: { '@type': 'Country', name: 'Uruguay' },
  },
  sameAs: [
    'https://instagram.com/colonia.cloud',
    'https://linkedin.com/company/coloniacloud',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://wa.me/59896082266',
    areaServed: 'UY',
    availableLanguage: 'Spanish',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: 'Colonia Cloud',
    locale: 'es_UY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={dmSans.variable}>
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <Navbar />
        <main className="pt-0">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
