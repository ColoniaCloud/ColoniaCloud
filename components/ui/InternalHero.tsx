import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceIllustration } from '@/lib/services';

type Props = {
  badge: string;
  title: string;
  description: string;
  /** Ilustración del servicio. Sin ella el hero queda como estaba: una sola
   *  columna de texto, que es lo que usan contacto, nosotros y las legales. */
  illustration?: ServiceIllustration;
};

export default function InternalHero({ badge, title, description, illustration }: Props) {
  return (
    <section className={`inner-hero${illustration ? ' inner-hero-con-arte' : ''}`}>
      <div className="site-container">
        <div className="inner-hero-copy">
          <span className="eyebrow">Colonia Cloud / {badge}</span>
          <h1 className="display">{title}</h1>
          <p>{description}</p>
        </div>
        {illustration && (
          /* `rise-blur` y no una variante con fundido: sube y se enfoca sin que
             la opacidad baje de 1. El titular es el elemento LCP de esta página
             y la ilustración es lo segundo más grande; una entrada que apague
             la opacidad puede costarle caro a la métrica si el orden cambia. */
          <Image
            className="inner-hero-art"
            src={illustration.src}
            width={illustration.width}
            height={illustration.height}
            alt=""
            aria-hidden="true"
            data-enter="rise-blur"
            style={{ '--cc-d': '260ms' } as CSSProperties}
            priority
            unoptimized
          />
        )}
      </div>
    </section>
  );
}
