import Image from 'next/image';
import type { ServiceIllustration } from '@/lib/services';
import ScrollScene from '@/components/ui/ScrollScene';

type Props = {
  badge: string;
  title: string;
  description: string;
  /** Ilustración del servicio (un hito de Colonia), a la derecha del titular. */
  illustration?: ServiceIllustration;
  /** Foto de fondo, con parallax suave. Decorativa: va con `alt` vacío. */
  photo?: string;
};

export default function InternalHero({ badge, title, description, illustration, photo }: Props) {
  return (
    // `data-dark-top` le avisa al header que arranca sobre fondo oscuro.
    <ScrollScene as="section" mode="pin" data-dark-top="" className={`inner-hero${illustration ? ' inner-hero-con-arte' : ''}`}>
      {photo && (
        <div className="inner-hero-media" aria-hidden="true">
          <Image src={photo} alt="" fill priority sizes="100vw" />
        </div>
      )}
      <div className="site-container">
        <div className="inner-hero-copy">
          <span className="eyebrow">{badge}</span>
          <h1 className="display">{title}</h1>
          <p>{description}</p>
        </div>
        {illustration && (
          <Image className="inner-hero-art" src={illustration.src} width={illustration.width} height={illustration.height} alt="" aria-hidden="true" priority unoptimized />
        )}
      </div>
    </ScrollScene>
  );
}
