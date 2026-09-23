import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';
import { whatsappHref } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand"><Link href="/"><Image src="/brand/logo.svg" alt="Colonia Cloud" width={155} height={34} /></Link><p>Diseño y tecnología con un lugar de origen y muchos lugares a donde llegar.</p></div>
          <nav className="footer-col" aria-label="Servicios"><h3>Servicios</h3>{services.map((service) => <Link key={service.slug} href={`/servicios/${service.slug}`}>{service.name}</Link>)}</nav>
          <nav className="footer-col" aria-label="Colonia Cloud"><h3>Colonia Cloud</h3><Link href="/#productos">Productos</Link><Link href="/#casos">Casos</Link><Link href="/nosotros">Nosotros</Link><Link href="/contacto">Contacto</Link><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Colonia Cloud · Desde Colonia del Sacramento, Uruguay.</span><span><Link href="/privacidad">Privacidad</Link> · <Link href="/terminos">Términos</Link></span></div>
      </div>
    </footer>
  );
}
