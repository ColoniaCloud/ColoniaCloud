'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Clock } from 'lucide-react';

import InteractiveModel from '@/components/three/InteractiveModel';
import { WhatsAppIcon } from '@/components/ui/brand-icons';

const WHATSAPP_URL = 'https://wa.me/59896082266';

// El video de fondo pesa varios MB. En desktop suma; en móvil compite con
// todo lo demás por un ancho de banda que suele ser peor, así que ahí se
// queda solo la imagen (que es el LCP igual). Se decide en el cliente
// porque no alcanza con ocultarlo por CSS: el navegador lo descarga igual.
const DESKTOP_BREAKPOINT_PX = 768;

export default function HeroSection() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`);
    const update = () => setAllowVideo(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[max(90dvh,560px)] w-full items-center overflow-hidden bg-black pt-24 pb-12 md:py-0"
      data-navbar-theme="dark"
    >
      {/* Imagen de fallback: pintado instantáneo (sin esperar al video) y
          respaldo permanente si el video no llega a cargar. next/image la
          sirve optimizada (AVIF/WebP + srcset) y con prioridad de carga por
          ser el LCP de la página. */}
      <Image
        src="/hero-poster.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />

      {/* Background Video — comprimido (h.264, sin audio) y con preload
          liviano; si falla la carga, se oculta y queda la imagen de arriba. */}
      {allowVideo && !videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        >
          <source src="/drone.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      )}

      {/* Overlay de lectura: un poco más oscuro del lado del texto, para que
          el titular y los botones tengan contraste sin apagar toda la toma. */}
      <div
        className="absolute inset-0 z-10 bg-black/55 md:bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.42)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-7 md:grid-cols-[57%_43%] md:gap-10">
        {/* Columna 1 — Mensaje y llamadas a la acción. Primera en el orden de
            lectura en desktop: el peso visual va al mensaje, no al objeto. */}
        <div className="order-1 flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <span className="animate-hero-title inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cc-warm" aria-hidden="true" />
            Colonia del Sacramento, Uruguay
          </span>

          <h1 className="animate-hero-title max-w-[600px] font-display text-[2.1rem] font-semibold leading-[1.15] text-white md:text-[2.6rem] lg:text-[3rem]">
            Sitios, software y nube para que tu negocio funcione mejor
          </h1>

          <p className="animate-hero-paragraph max-w-[500px] text-[16px] leading-relaxed text-white/75 md:text-[17px]">
            Somos un equipo técnico de Colonia. Desarrollamos sitios web,
            tiendas online, sistemas de gestión con inteligencia artificial e
            infraestructura administrada — para comercios de la zona y para
            empresas que operan en Uruguay, Argentina y Europa.
          </p>

          <div className="animate-hero-cta flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-colors duration-150 hover:bg-cc-warm-light"
            >
              <WhatsAppIcon size={18} aria-hidden="true" />
              Pedí tu auditoría gratis
            </a>

            <Link
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur-sm transition-colors duration-150 hover:border-white/60 hover:bg-white/10"
            >
              Ver servicios
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
          </div>

          <p className="animate-hero-cta flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-white/50 md:justify-start">
            <Clock size={13} aria-hidden="true" />
            Auditoría y propuesta sin costo
            <span aria-hidden="true">·</span>
            Respondemos en menos de 24 h hábiles
          </p>
        </div>

        {/* Columna 2 — Ícono 3D interactivo. Decorativo: acompaña, no compite. */}
        <div
          className="order-2 flex items-center justify-center md:justify-end"
          aria-hidden="true"
        >
          <div className="animate-hero-icon relative aspect-square w-[240px] flex-shrink-0 sm:w-[280px] md:w-[360px] lg:w-[420px]">
            <InteractiveModel />
          </div>
        </div>
      </div>
    </section>
  );
}
