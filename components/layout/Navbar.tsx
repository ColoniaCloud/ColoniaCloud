'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/brand-icons';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/services';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const closeServicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isServicesActive = pathname.startsWith('/servicios');

  const openServicesMenu = () => {
    if (closeServicesTimeout.current) clearTimeout(closeServicesTimeout.current);
    setIsServicesOpen(true);
  };
  const scheduleCloseServicesMenu = () => {
    if (closeServicesTimeout.current) clearTimeout(closeServicesTimeout.current);
    closeServicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

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
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeServicesTimeout.current) clearTimeout(closeServicesTimeout.current);
    };
  }, []);

  const headerBgClass = isDarkTheme
    ? 'bg-white/5 backdrop-blur-sm border-white/10'
    : 'bg-cc-bg/90 backdrop-blur-md border-black/[0.08]';

  return (
    <header
      ref={headerRef}
      className={[
        'fixed top-4 left-1/2 -translate-x-1/2 w-[var(--cc-container)] z-50 h-[58px] border rounded-xl transition-all duration-300',
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
          <li>
            <Link
              href="/"
              className={[
                'text-[13px] font-body transition-colors duration-150',
                isDarkTheme
                  ? pathname === '/'
                    ? 'text-white font-medium'
                    : 'text-white/70 hover:text-white'
                  : pathname === '/'
                    ? 'text-cc-accent font-medium'
                    : 'text-cc-text-body hover:text-cc-accent',
              ].join(' ')}
            >
              Inicio
            </Link>
          </li>

          {/* Servicios — trigger de megamenú */}
          <li
            className="relative"
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={isServicesOpen}
              onClick={() => setIsServicesOpen((prev) => !prev)}
              className={[
                'flex items-center gap-1 text-[13px] font-body transition-colors duration-150',
                isDarkTheme
                  ? isServicesActive
                    ? 'text-white font-medium'
                    : 'text-white/70 hover:text-white'
                  : isServicesActive
                    ? 'text-cc-accent font-medium'
                    : 'text-cc-text-body hover:text-cc-accent',
              ].join(' ')}
            >
              Servicios
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={['transition-transform duration-200', isServicesOpen ? 'rotate-180' : ''].join(' ')}
              />
            </button>

            {/* Panel del megamenú */}
            {isServicesOpen && (
              <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[640px] max-w-[calc(90vw)] bg-cc-bg border border-black/[0.08] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-5 z-50">
                <div className="grid grid-cols-2 gap-1.5">
                  {services.map(({ slug, icon: Icon, name, cardDescription }) => (
                    <Link
                      key={slug}
                      href={`/servicios/${slug}`}
                      className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-cc-surface transition-colors"
                    >
                      <div className="w-9 h-9 bg-cc-accent-light rounded-md flex items-center justify-center flex-shrink-0">
                        <Icon size={17} strokeWidth={1.5} className="text-cc-accent" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-medium text-[14px] text-cc-text group-hover:text-cc-accent transition-colors">
                          {name}
                        </p>
                        <p className="text-[13px] text-cc-text-body leading-snug line-clamp-2 mt-0.5">
                          {cardDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-black/[0.06]">
                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-1.5 text-[13px] text-cc-accent font-medium hover:gap-2 transition-all duration-150"
                  >
                    Ver todos los servicios
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {navLinks
            .filter(({ href }) => href !== '/')
            .map(({ label, href }) => {
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
              href="https://wa.me/59896082266"
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
          <div className="fixed top-[78px] left-[2.5vw] w-[95vw] bg-cc-bg z-50 border border-black/[0.08] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto">
            <ul className="px-6 py-4 flex flex-col gap-1 list-none">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={[
                    'block py-3 text-[15px] transition-colors duration-150 hover:text-cc-accent border-b border-black/[0.04]',
                    pathname === '/' ? 'text-cc-accent' : 'text-cc-text-body',
                  ].join(' ')}
                >
                  Inicio
                </Link>
              </li>

              {/* Servicios — acordeón mobile */}
              <li className="border-b border-black/[0.04]">
                <div className="flex items-center justify-between">
                  <Link
                    href="/servicios"
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      'block py-3 text-[15px] transition-colors duration-150 hover:text-cc-accent',
                      isServicesActive ? 'text-cc-accent' : 'text-cc-text-body',
                    ].join(' ')}
                  >
                    Servicios
                  </Link>
                  <button
                    type="button"
                    aria-label={isMobileServicesOpen ? 'Ocultar servicios' : 'Mostrar servicios'}
                    aria-expanded={isMobileServicesOpen}
                    onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                    className="p-2 -mr-2 text-cc-text-body"
                  >
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={['transition-transform duration-200', isMobileServicesOpen ? 'rotate-180' : ''].join(' ')}
                    />
                  </button>
                </div>
                {isMobileServicesOpen && (
                  <ul className="pb-3 flex flex-col gap-0.5 list-none">
                    {services.map(({ slug, icon: Icon, name }) => (
                      <li key={slug}>
                        <Link
                          href={`/servicios/${slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 py-2 pl-2 text-[13.5px] text-cc-text-body hover:text-cc-accent transition-colors"
                        >
                          <Icon size={15} strokeWidth={1.5} className="text-cc-accent flex-shrink-0" aria-hidden="true" />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {navLinks
                .filter(({ href }) => href !== '/')
                .map(({ label, href }, index, arr) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={[
                        'block py-3 text-[15px] transition-colors duration-150 hover:text-cc-accent',
                        index < arr.length - 1 ? 'border-b border-black/[0.04]' : '',
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
