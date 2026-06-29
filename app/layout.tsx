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

export const metadata: Metadata = {
  title: 'Colonia Cloud — Llevamos tu negocio a la nube',
  description:
    'Desarrollo web, marketing digital y automatizaciones para negocios en Colonia del Sacramento, Uruguay.',
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
