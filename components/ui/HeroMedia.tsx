'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

/**
 * Fondo del hero. La foto es el LCP y se pinta desde el servidor; el video
 * (un bucle de 8 s renderizado con HyperFrames, ver `motion/hero-loop`) se
 * monta después, solo en escritorio y sin movimiento reducido, y aparece con
 * un fundido cuando puede reproducirse. El botón permite pausarlo.
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [withVideo, setWithVideo] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 960px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setWithVideo(wide.matches && !calm.matches);
    sync();
    wide.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      wide.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <div className="hero-media">
        <Image src="/unsplash/rio-atardecer.webp" alt="" fill priority sizes="100vw" />
        {withVideo && (
          <video
            ref={videoRef}
            src="/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(event) => event.currentTarget.setAttribute('data-ready', '')}
          />
        )}
      </div>
      {withVideo && (
        <button type="button" className="hero-toggle" onClick={toggle} aria-label={paused ? 'Reproducir el video de fondo' : 'Pausar el video de fondo'}>
          {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
