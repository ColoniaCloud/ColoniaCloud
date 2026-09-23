'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

const links = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#casos', label: 'Casos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/" className="site-logo" aria-label="Colonia Cloud, inicio"><Image src="/brand/logo.svg" alt="Colonia Cloud" width={147} height={32} priority /></Link>
        <div className="nav-links">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
        </div>
        <a className="nav-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer">Hablemos <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button>
      </nav>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Hablemos por WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
      </nav>}
    </header>
  );
}
