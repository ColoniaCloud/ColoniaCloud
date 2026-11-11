import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { services } from '@/lib/services';
import { whatsappHref } from '@/lib/contact';
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/brand-icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Colonia Cloud, inicio"><Image src="/brand/logo.svg" alt="" width={160} height={35} /></Link>
            <p>Diseño y tecnología con un lugar de origen y muchos lugares a donde llegar.</p>
          </div>
          <nav className="footer-col" aria-label="Servicios">
            <h3>Servicios</h3>
            {services.map((service) => <Link key={service.slug} href={`/servicios/${service.slug}`}>{service.name}</Link>)}
          </nav>
          <nav className="footer-col" aria-label="Colonia Cloud">
            <h3>Colonia Cloud</h3>
            <Link href="/#casos">Casos</Link>
            <Link href="/#productos">Productos</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/login">Acceso clientes</Link>
          </nav>
          <nav className="footer-col" aria-label="Contacto">
            <h3>Contacto</h3>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} aria-hidden="true" />WhatsApp</a>
            <a href="mailto:comunicacion@colonia.cloud"><Mail size={16} aria-hidden="true" />comunicacion@colonia.cloud</a>
            <a href="https://instagram.com/colonia.cloud" target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} aria-hidden="true" />Instagram</a>
            <a href="https://linkedin.com/company/coloniacloud" target="_blank" rel="noopener noreferrer"><LinkedinIcon size={16} aria-hidden="true" />LinkedIn</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Colonia Cloud · Colonia del Sacramento, Uruguay</span>
          <span><Link href="/privacidad">Privacidad</Link> · <Link href="/terminos">Términos</Link> · <Link href="/contacto">Contacto</Link></span>
        </div>
      </div>
    </footer>
  );
}
