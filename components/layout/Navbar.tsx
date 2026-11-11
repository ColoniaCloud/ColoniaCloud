'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, LogIn, Menu, X } from 'lucide-react';

const links = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/#casos', label: 'Casos' },
  { href: '/#productos', label: 'Productos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // El header es transparente mientras está sobre un hero oscuro (el primer
  // bloque con `data-dark-top`) y pasa a sólido cuando el scroll lo deja
  // atrás. En páginas sin hero oscuro el CSS ya lo muestra sólido.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('main > [data-dark-top]');
      const limit = hero ? hero.offsetTop + hero.offsetHeight - 76 : 20;
      setSolid(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Con el menú móvil abierto la página de atrás no debe moverse.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`site-header${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
        <nav className="site-nav" aria-label="Navegación principal">
          <Link href="/" className="site-logo" aria-label="Colonia Cloud, inicio">
            <Image src="/brand/logo.svg" alt="" width={148} height={32} priority />
          </Link>
          <div className="site-nav-right">
            <div className="nav-links">
              {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
            </div>
            <Link className="nav-client" href="/login"><LogIn size={16} aria-hidden="true" />Clientes</Link>
            <Link className="nav-cta" href="/contacto">Hablemos <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}
          <Link className="mobile-nav-cta" href="/contacto" onClick={() => setOpen(false)}>Hablemos de tu proyecto</Link>
          <Link className="mobile-nav-client" href="/login" onClick={() => setOpen(false)}>Acceso clientes</Link>
        </nav>
      )}
    </>
  );
}
