'use client';

import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, Ref } from 'react';

// Variantes definidas en app/globals.css (sección "Animaciones de entrada").
// Para lo que está arriba del fold no se usa este componente sino el atributo
// `data-enter`, que es CSS puro: meter el hero detrás de un observer retrasa
// el LCP hasta después de la hidratación.
export type RevealVariant =
  | 'fade-up'
  | 'rise'
  | 'rise-blur'
  | 'blur-in'
  | 'card-lift'
  | 'image-scale'
  | 'clip-up'
  | 'line-rise';

type OwnProps<T extends ElementType> = {
  /** Etiqueta o componente a renderizar. Por defecto `div`. */
  as?: T;
  variant?: RevealVariant;
  /** Retardo en ms. Para escalonar una grilla entera conviene la clase
   *  `.stagger` en el contenedor, que además se apaga sola en móvil. */
  delay?: number;
  /** Porción del elemento que tiene que verse para disparar la entrada. */
  threshold?: number;
};

// Polimórfico y con reenvío de props para poder envolver un `Link` o un
// `figure` sin agregar un nodo extra: si metiéramos un wrapper, selectores
// como `.service-card:nth-child(2)` dejarían de encontrar a sus elementos.
type Props<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

export default function Reveal<T extends ElementType = 'div'>(props: Props<T>) {
  const {
    as,
    variant = 'fade-up',
    delay = 0,
    threshold = 0.15,
    ...rest
  } = props as OwnProps<T> & { style?: CSSProperties; [key: string]: unknown };

  const Tag = (as ?? 'div') as ElementType;
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

  const style = delay
    ? ({ ...rest.style, '--cc-d': `${delay}ms` } as CSSProperties)
    : rest.style;

  return <Tag {...rest} ref={ref as Ref<HTMLElement>} data-reveal={variant} style={style} />;
}
