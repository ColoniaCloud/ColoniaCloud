'use client';

import { useState } from 'react';
import Image from 'next/image';
import InteractiveModel from '@/components/three/InteractiveModel';

export default function HeroSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex h-[90vh] min-h-[560px] w-full items-center overflow-hidden bg-black"
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
      {!videoFailed && (
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

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/55" aria-hidden="true" />

      <div className="relative z-20 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-7 md:grid-cols-[35%_65%] md:gap-16">
        {/* Columna 1 — Ícono 3D interactivo (movido desde la sección de servicios) */}
        <div
          className="order-2 flex items-center justify-center md:order-1 md:justify-end"
          aria-hidden="true"
        >
          <div className="animate-hero-icon relative aspect-square w-[326px] flex-shrink-0 sm:w-[381px] md:w-[490px] lg:w-[544px]">
            <InteractiveModel />
          </div>
        </div>

        {/* Columna 2 — Texto */}
        <div className="order-1 flex flex-col items-center gap-4 text-center md:order-2 md:items-start md:text-left">
          <h1 className="animate-hero-title max-w-[560px] font-display text-[2.1rem] font-semibold leading-[1.2] text-white md:text-[2.6rem] lg:text-[3rem]">
            Soluciones digitales hechas acá!
          </h1>
          <p className="animate-hero-paragraph max-w-[480px] text-[15px] leading-relaxed text-white/70 md:text-[16px]">
            En ColoniaCloud creamos soluciones digitales enfocadas en la
            logística, administración y marketing de negocios locales.
          </p>
        </div>
      </div>
    </section>
  );
}
