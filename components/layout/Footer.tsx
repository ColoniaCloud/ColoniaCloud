import Link from 'next/link';
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/brand-icons';

const serviciosLinks = [
  { label: 'Desarrollo web', href: '/servicios' },
  { label: 'Marketing digital', href: '/servicios' },
  { label: 'Automatizaciones', href: '/servicios' },
  { label: 'Hosting y soporte', href: '/servicios' },
];

const empresaLinks = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/colonia.cloud', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/coloniacloud', icon: LinkedinIcon },
  { label: 'WhatsApp', href: 'https://wa.me/59896082266', icon: WhatsAppIcon },
];

const columnHeadingClass =
  'text-[11px] font-medium text-white/35 uppercase tracking-wider mb-4';
const navLinkClass =
  'block text-[13px] text-white/60 hover:text-white transition-colors duration-150 mb-2 last:mb-0';

export default function Footer() {
  return (
    <footer className="bg-black" data-navbar-theme="dark">
      <div className="max-w-[1280px] mx-auto px-7 py-8">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-8">
          {/* Columna 1 — Brand */}
          <div>
            <div className="flex items-center h-8">
              <img
                src="/brand/logo.svg"
                alt="Colonia Cloud Logo"
                className="h-[26px] w-auto brightness-0 invert"
              />
            </div>

            <p className="text-[14px] text-white/50 mt-3">
              Llevamos tu negocio a la nube
            </p>

            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] rounded-md bg-white/[0.07] hover:bg-white flex items-center justify-center transition-colors duration-150 text-white/70 hover:text-black"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Servicios */}
          <div>
            <p className={columnHeadingClass}>Servicios</p>
            <nav aria-label="Servicios">
              {serviciosLinks.map(({ label, href }) => (
                <Link key={label} href={href} className={navLinkClass}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3 — Empresa */}
          <div>
            <p className={columnHeadingClass}>Empresa</p>
            <nav aria-label="Empresa">
              {empresaLinks.map(({ label, href }) => (
                <Link key={label} href={href} className={navLinkClass}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[13px] text-white/30">
            © 2025 Colonia Cloud. Todos los derechos reservados.
          </p>
          <p className="text-[13px] text-white/30">colonia.cloud</p>
        </div>
      </div>
    </footer>
  );
}
