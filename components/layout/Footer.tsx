import Link from 'next/link';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from '@tabler/icons-react';

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
  { label: 'Instagram', href: '#', icon: IconBrandInstagram },
  { label: 'LinkedIn', href: '#', icon: IconBrandLinkedin },
  { label: 'WhatsApp', href: '#', icon: IconBrandWhatsapp },
];

const columnHeadingClass =
  'text-[11px] font-medium text-white/35 uppercase tracking-wider mb-4';
const navLinkClass =
  'block text-[13px] text-white/60 hover:text-cc-accent transition-colors duration-150 mb-2 last:mb-0';

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-[1280px] mx-auto px-7 py-8">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-8">
          {/* Columna 1 — Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-7 h-7 bg-cc-accent rounded-md flex items-center justify-center shrink-0"
              >
                <span className="text-white font-display text-[13px] font-medium leading-none">
                  CC
                </span>
              </span>
              <span className="font-display text-[15px] text-white">
                Colonia Cloud
              </span>
            </div>

            <p className="text-[13px] text-white/50 mt-3">
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
                  className="w-[30px] h-[30px] rounded-md bg-white/[0.07] hover:bg-cc-accent flex items-center justify-center transition-colors duration-150 text-white/70 hover:text-white"
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
          <p className="text-[12px] text-white/30">
            © 2025 Colonia Cloud. Todos los derechos reservados.
          </p>
          <p className="text-[12px] text-white/30">colonia.cloud</p>
        </div>
      </div>
    </footer>
  );
}
