'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ElementType, ReactNode, Ref } from 'react';

// Variantes definidas en app/globals.css (sección "Animaciones de entrada").
// Para lo que está arriba del fold no se usa este componente sino el atributo
// `data-enter`, que es CSS puro: meter el hero detrás de un observer retrasa
// el LCP hasta después de la hidratación.
export type RevealVariant =
  | 'fade-up'
  | 'blur-in'
  | 'card-lift'
  | 'image-scale'
  | 'clip-up'
  | 'line-rise';

type Props = {
  children: ReactNode;
  /** Etiqueta a renderizar. Por defecto `div`; usar `figure`, `li`, etc. según el caso. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Retardo en ms. Para grillas escalonadas: 0, 80, 160… */
  delay?: number;
  /** Porción del elemento que tiene que verse para disparar la entrada. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  threshold = 0.15,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute('data-reveal-visible', '');

    // Sin IntersectionObserver, o con movimiento reducido, no hay animación
    // que valga: mostramos el contenido de una y no observamos nada.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        show();
        // Una sola vez: al volver a subir el contenido se queda como está.
        observer.disconnect();
      },
      // El -10% de abajo evita que dispare cuando el elemento todavía está
      // asomando apenas por el borde inferior.
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      data-reveal={variant}
      className={className}
      style={delay ? ({ ...style, '--cc-d': `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
