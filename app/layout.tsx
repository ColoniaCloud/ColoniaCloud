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

export const metadata: Metadata = {
  metadataBase: new URL('https://colonia.cloud'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://colonia.cloud',
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
        <Navbar />
        <main className="pt-0">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
