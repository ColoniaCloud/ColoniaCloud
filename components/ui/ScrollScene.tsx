'use client';

import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType, Ref } from 'react';

type OwnProps<T extends ElementType> = {
  as?: T;
  /**
   * `pin`: avance 0→1 mientras se recorre una sección más alta que la
   * pantalla (el hero fijado). Si la sección no es más alta que la pantalla,
   * avanza con lo que ya se scrolleó de ella.
   * `view`: avance 0→1 desde que la sección asoma por abajo hasta que sale
   * por arriba; 0.5 es el centro de la pantalla.
   */
  mode?: 'pin' | 'view';
};

type Props<T extends ElementType> = OwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

/**
 * Escribe el avance del scroll en la variable CSS `--p` del propio elemento.
 * Todo el parallax del sitio sale de ahí: las capas leen `--p` con `calc()`
 * en su `transform`, así que no hay estado de React ni re-render por cuadro.
 *
 * Con movimiento reducido no hace nada y las capas quedan en su valor por
 * defecto (`var(--p, …)`). Solo escucha el scroll mientras la sección está
 * en pantalla.
 */
export default function ScrollScene<T extends ElementType = 'div'>(props: Props<T>) {
  const { as, mode = 'view', ...rest } = props as OwnProps<T> & Record<string, unknown>;
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'pin') {
        const travel = rect.height - vh;
        p = travel > 40 ? -rect.top / travel : -rect.top / rect.height;
      } else {
        p = (vh - rect.top) / (vh + rect.height);
      }
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    };

    const schedule = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });
    observer.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode]);

  return <Tag {...rest} ref={ref as Ref<HTMLElement>} />;
}
