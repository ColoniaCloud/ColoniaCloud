'use client';

import { useEffect, useState } from 'react';

/**
 * Video de fondo de la portada temporal (`public/drone.mp4`, el que usaba el
 * hero antes del bucle de HyperFrames). El póster se pinta desde el servidor;
 * con movimiento reducido el video no se monta y queda solo la imagen.
 */
export default function LandingVideo() {
  const [withVideo, setWithVideo] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setWithVideo(!calm.matches);
    sync();
    calm.addEventListener('change', sync);
    return () => calm.removeEventListener('change', sync);
  }, []);

  return (
    <div className="landing-media" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/drone-poster.jpg" alt="" fetchPriority="high" />
      {withVideo && (
        <video
          src="/drone.mp4"
          poster="/drone-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(event) => event.currentTarget.setAttribute('data-ready', '')}
        />
      )}
    </div>
  );
}
