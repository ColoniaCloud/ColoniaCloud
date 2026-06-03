'use client';

import { useState, useEffect } from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMobile = window.innerWidth < 768;
    let isScrolled = false;
    let footerVisible = false;

    function update() {
      setIsVisible(footerVisible ? false : isMobile ? true : isScrolled);
    }

    function onScroll() {
      isScrolled = window.scrollY > 300;
      update();
    }

    function onResize() {
      isMobile = window.innerWidth < 768;
      update();
    }

    const footer = document.querySelector('footer');
    let observer: IntersectionObserver | null = null;

    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          footerVisible = entry.isIntersecting;
          update();
        },
        { threshold: 0 }
      );
      observer.observe(footer);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Calcular estado inicial sin esperar el primer evento
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={[
        'fixed bottom-6 right-6 z-40 transition-all duration-300',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none',
      ].join(' ')}
    >
      <a
        href="https://wa.me/59800000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group relative w-14 h-14 rounded-full bg-cc-accent hover:bg-cc-accent-hover flex items-center justify-center shadow-[0_4px_16px_rgba(193,122,90,0.35)] hover:scale-[1.08] transition-all duration-200"
      >
        {/* Tooltip */}
        <span className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-cc-text text-white text-[12px] font-medium px-3 py-1.5 rounded-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Escribínos
        </span>

        <IconBrandWhatsapp size={26} className="text-white" aria-hidden="true" />
      </a>
    </div>
  );
}
