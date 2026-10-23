'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bot, Mail, Menu, X } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/brand-icons';

const links = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#casos', label: 'Casos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' site-header-scrolled' : ''}`}>
      <div className="site-topbar">
        <div className="site-header-inner site-topbar-inner">
          <div className="site-socials" aria-label="Redes sociales">
            <a href="https://instagram.com/colonia.cloud" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={16} aria-hidden="true" /></a>
            <a href="https://www.facebook.com/search/top?q=Colonia%20Cloud" target="_blank" rel="noopener noreferrer" aria-label="Buscar Colonia Cloud en Facebook"><span className="facebook-mark" aria-hidden="true">f</span></a>
            <a href="https://linkedin.com/company/coloniacloud" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={17} aria-hidden="true" /></a>
          </div>
          <div className="site-socials" aria-label="Contacto directo">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={17} aria-hidden="true" /></a>
            <a href="mailto:comunicacion@colonia.cloud" aria-label="Correo electrónico"><Mail size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="site-nav-shell"><nav className="site-nav site-header-inner" aria-label="Navegación principal">
        <Link href="/" className="site-logo" aria-label="Colonia Cloud, inicio"><Image src="/brand/logo.svg" alt="Colonia Cloud" width={147} height={32} priority /></Link>
        <div className="site-nav-right">
          <div className="nav-links">
            {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
          </div>
          <Link className="nav-cta" href="/login">Acceso clientes</Link>
          <button className="bot-trigger" type="button" disabled title="Agente disponible próximamente" aria-label="Agente disponible próximamente"><Bot size={22} aria-hidden="true" /></button>
          <button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button>
        </div>
      </nav></div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link className="mobile-client-link" href="/login" onClick={() => setOpen(false)}>Acceso clientes</Link>
      </nav>}
    </header>
  );
}
