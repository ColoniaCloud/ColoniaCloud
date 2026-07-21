'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/brand-icons';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // El header pasa a tema claro (texto/logo blancos) mientras su propio
  // rectángulo se superponga verticalmente con alguna sección de fondo
  // oscuro marcada con data-navbar-theme="dark" (Hero, CTA final, Footer).
  // Se compara contra el rect del header, no contra todo el viewport, para
  // que no cambie apenas la sección oscura asoma más abajo en la pantalla.
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-navbar-theme="dark"]')
    );

    let ticking = false;
    const evaluate = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 150);

      const headerRect = headerEl.getBoundingClientRect();
      const overlapsDarkSection = darkSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top < headerRect.bottom && rect.bottom > headerRect.top;
      });
      setIsDarkTheme(overlapsDarkSection);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerBgClass = isDarkTheme
    ? 'bg-white/5 backdrop-blur-sm border-white/10'
    : 'bg-cc-bg/90 backdrop-blur-md border-black/[0.08]';

  return (
    <header
      ref={headerRef}
      className={[
        'fixed top-4 left-[5vw] w-[90vw] md:left-[7.5vw] md:w-[85vw] lg:left-[12.5vw] lg:w-[75vw] z-50 h-[58px] border rounded-xl transition-all duration-300',
        headerBgClass,
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.04)]',
      ].join(' ')}
    >
      <nav
        aria-label="Navegación principal"
        className="w-full h-full px-6 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center h-8">
          <img
            src="/brand/logo.svg"
            alt="Colonia Cloud Logo"
            className={[
              'h-[26px] w-auto transition-all duration-300',
              isDarkTheme ? 'brightness-0 invert' : '',
            ].join(' ')}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'text-[13px] font-body transition-colors duration-150',
                    isDarkTheme
                      ? isActive
                        ? 'text-white font-medium'
                        : 'text-white/70 hover:text-white'
                      : isActive
                        ? 'text-cc-accent font-medium'
                        : 'text-cc-text-body hover:text-cc-accent',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={[
              'md:hidden transition-colors duration-300',
              isDarkTheme ? 'text-white' : 'text-cc-text-body',
            ].join(' ')}
          >
            {isMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>

          {/* CTA WhatsApp */}
          <Button
            variant="primary"
            size="sm"
            asChild
          >
            <a
              href="https://wa.me/59800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <WhatsAppIcon size={15} aria-hidden="true" />
              Escribinos
            </a>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-[78px] left-[5vw] w-[90vw] bg-cc-bg z-50 border border-black/[0.08] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
            <ul className="px-6 py-4 flex flex-col gap-1 list-none">
              {navLinks.map(({ label, href }, index) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      'block py-3 text-[15px] transition-colors duration-150 hover:text-cc-accent',
                      index < navLinks.length - 1 ? 'border-b border-black/[0.04]' : '',
                      pathname === href ? 'text-cc-accent' : 'text-cc-text-body',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
